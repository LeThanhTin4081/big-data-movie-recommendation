import os
import sys
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

# Module: NoSQL Integration (Pure Pandas Version)

def main():
    print("1. Đang tải cấu hình biến môi trường...")
    load_dotenv(dotenv_path='../../.env')
    
    MONGO_URI = os.getenv("MONGO_URI")
    DB_NAME = os.getenv("MONGO_DB_NAME", "movie_recommendation_db")
    
    if not MONGO_URI:
        print("LỖI: Không tìm thấy MONGO_URI trong file .env!")
        sys.exit(1)
        
    print("2. Khởi tạo kết nối MongoDB Atlas...")
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
        
    print("3. Đang nạp dữ liệu Parquet bằng Pandas...")
    movies_df = pd.read_parquet("../../data/processed_items.parquet")
    recs_df = pd.read_parquet("../../data/user_recommendations.parquet")
    
    # BƯỚC A: ĐẨY DANH MỤC PHIM VÀO COLLECTION 'movies'
    print("\n[BƯỚC A] Đang xử lý Collection 'movies'...")
    movies_pd = movies_df.copy()
    
    # Cấu trúc lại Json: Đổi movie_id thành _id
    movies_pd.rename(columns={"movie_id": "_id", "movie_title": "title"}, inplace=True)
    
    # Bổ sung các trường Fake bắt buộc để khớp với Interface Movie
    movies_pd["year"] = "N/A"
    movies_pd["genres"] = movies_pd["genres"].apply(list)
    movies_pd["rating"] = 5.0
    movies_pd["num_ratings"] = 0
    movies_pd["poster_url"] = "https://via.placeholder.com/342x513.png?text=No+Poster"
    
    movies_records = movies_pd.to_dict("records")
    
    movies_col = db["movies"]
    movies_col.drop() 
    print(f"-> Đang Insert {len(movies_records)} bộ phim vào MongoDB...")
    movies_col.insert_many(movies_records)
    print("-> Hoàn tất Collection 'movies'!")
    
    # BƯỚC B: XỬ LÝ VÀ ĐẨY COLLECTION 'user_recommendations'
    print("\n[BƯỚC B] Đang xử lý Collection 'user_recommendations' (JOIN dữ liệu)...")
    
    # Giải nén mảng recommendations (Explode)
    exploded = recs_df.explode("recommendations").reset_index(drop=True)
    
    # Tách dữ liệu bên trong dict thành các cột riêng biệt
    rec_details = pd.json_normalize(exploded['recommendations'])
    exploded = pd.concat([exploded.drop(['recommendations'], axis=1), rec_details], axis=1)
    
    # Nối với bảng movies để lấy tên phim
    joined = pd.merge(exploded, movies_df, on="movie_id", how="left")
    
    # Xây dựng lại dict theo cấu trúc Frontend yêu cầu
    joined['movie_details'] = joined.apply(
        lambda row: {
            "movie_id": row['movie_id'],
            "title": row['movie_title'],
            "predicted_rating": row['rating'],
            "genres": list(row['genres']),
            "poster_url": "https://via.placeholder.com/342x513.png?text=No+Poster"
        }, axis=1
    )
    
    # Gom nhóm theo user_id
    final_pd = joined.groupby('user_id')['movie_details'].apply(list).reset_index()
    final_pd.rename(columns={'user_id': '_id', 'movie_details': 'recommendations'}, inplace=True)
    
    recs_records = final_pd.to_dict("records")
    
    recs_col = db["user_recommendations"]
    recs_col.drop()
    print(f"-> Đang Batch Insert {len(recs_records)} danh sách gợi ý vào MongoDB...")
    recs_col.insert_many(recs_records)
    print("-> Hoàn tất Collection 'user_recommendations'!")
    
    print("\n")
    print("THÀNH CÔNG! Đã đẩy toàn bộ dữ liệu lên MongoDB.")
    print("Backend Next.js đã có thể kết nối và truy xuất ngay lập tức.")

if __name__ == "__main__":
    main()
