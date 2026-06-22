import os
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, IntegerType, StringType
from pyspark.sql.functions import col

def create_spark_session():
    """Khởi tạo và trả về Spark Session."""
    return SparkSession.builder \
        .appName("MovieRecommendation-ETL") \
        .master("local[*]") \
        .getOrCreate()

def load_and_clean_data(spark):
    """
    Nạp dữ liệu u.data và u.item, làm sạch và nối dữ liệu.
    """
    # Đường dẫn file (tương đối từ thư mục gốc project)
    data_path = os.path.join("data", "ml-100k", "u.data")
    item_path = os.path.join("data", "ml-100k", "u.item")

    # 1. Nạp u.data (chứa thông tin rating: user_id, item_id, rating, timestamp)
    # File u.data được phân cách bằng tab (\t)
    rating_schema = StructType([
        StructField("user_id", IntegerType(), True),
        StructField("movie_id", IntegerType(), True),
        StructField("rating", IntegerType(), True),
        StructField("timestamp", IntegerType(), True)
    ])
    
    ratings_df = spark.read.csv(data_path, sep="\t", schema=rating_schema)

    # Làm sạch: loại bỏ giá trị null và trùng lặp
    ratings_df = ratings_df.dropna().dropDuplicates()

    # 2. Nạp u.item (chứa thông tin phim: movie_id, movie_title, ...)
    # File u.item phân cách bằng '|'. Dataset u.item được mã hóa 'latin-1'
    items_df = spark.read.csv(item_path, sep="|", encoding="latin-1")
    
    # Chỉ lấy 2 cột đầu (movie_id và movie_title)
    items_df = items_df.select(
        col("_c0").cast(IntegerType()).alias("movie_id"),
        col("_c1").cast(StringType()).alias("movie_title")
    )
    
    # Làm sạch danh sách phim
    items_df = items_df.dropna().dropDuplicates(["movie_id"])

    # 3. Kết hợp 2 DataFrame để lấy tên phim (dùng cho việc truy vấn trực quan EDA)
    joined_df = ratings_df.join(items_df, on="movie_id", how="inner")
    
    return ratings_df, items_df, joined_df

def run_eda(spark, joined_df):
    """
    Chạy Spark SQL để thực hiện Khai phá dữ liệu (EDA).
    """
    # Đăng ký thành một bảng tạm (temporary view) để dùng SQL
    joined_df.createOrReplaceTempView("movies_ratings")

    print("\n[EDA] --- Top 5 phim được đánh giá nhiều nhất ---")
    top_5_query = """
        SELECT movie_title, COUNT(*) as num_ratings, ROUND(AVG(rating), 2) as avg_rating
        FROM movies_ratings
        GROUP BY movie_title
        ORDER BY num_ratings DESC
        LIMIT 5
    """
    top_5_df = spark.sql(top_5_query)
    top_5_df.show(truncate=False)
    
    print("\n[EDA] --- Phân bố số lượng đánh giá theo từng mức điểm (1-5) ---")
    rating_dist_query = """
        SELECT rating, COUNT(*) as count
        FROM movies_ratings
        GROUP BY rating
        ORDER BY rating DESC
    """
    rating_dist_df = spark.sql(rating_dist_query)
    rating_dist_df.show()

def run_etl():
    spark = create_spark_session()
    
    print("=> Bắt đầu luồng ETL...")
    ratings_df, items_df, joined_df = load_and_clean_data(spark)
    
    print(f"Tổng số bản ghi rating sau khi làm sạch: {ratings_df.count()}")
    print(f"Tổng số phim sau khi làm sạch: {items_df.count()}")
    
    # Thực hiện EDA
    run_eda(spark, joined_df)
    
    # Xuất DataFrame sạch ra định dạng Parquet để module ML (Machine Learning) sử dụng
    output_rating_path = os.path.join("data", "processed_ratings.parquet")
    output_item_path = os.path.join("data", "processed_items.parquet")
    
    print(f"\n=> Đang lưu dữ liệu rating sạch xuống: {output_rating_path}")
    ratings_df.write.mode("overwrite").parquet(output_rating_path)
    
    print(f"=> Đang lưu dữ liệu danh sách phim sạch xuống: {output_item_path}")
    items_df.write.mode("overwrite").parquet(output_item_path)
    
    print("\n=> Luồng ETL hoàn tất thành công!")
    spark.stop()

if __name__ == "__main__":
    run_etl()
