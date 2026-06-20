# Tài liệu Đề tài: Hệ thống Gợi ý Phim Quy mô lớn (Big Data)

## 1. Tên đề tài
**Thiết kế và Triển khai Hệ thống Gợi ý Phim Quy mô lớn dựa trên Kiến trúc Tính toán Phân tán Apache Spark và Lớp Lưu trữ NoSQL**

## 2. Bài toán thực tế
Dự án sử dụng **dữ liệu thật (MovieLens Dataset)** với hàng trăm nghìn đến hàng triệu lượt đánh giá phim thực tế từ người dùng, giải quyết bài toán xử lý khối lượng dữ liệu khổng lồ mà các hệ thống cơ sở dữ liệu truyền thống (RDBMS) khó đáp ứng được về mặt hiệu năng.

## 3. Kiến trúc Hệ thống (Kiến trúc 2 luồng)
Để đảm bảo đúng bản chất của một hệ thống Dữ liệu lớn (Big Data) và tối ưu hóa hiệu năng, hệ thống được thiết kế theo mô hình phân tách giữa môi trường tính toán và môi trường phục vụ (tương đồng với một phần của Lambda Architecture):

### Luồng 1: Xử lý ẩn (Offline Batch Processing - Apache Spark)
Đây là môi trường "tính toán nặng", được chạy định kỳ ở hậu trường.
- **Công cụ:** Apache Spark Cluster (Spark SQL, Spark MLlib).
- **Quy trình:** 
  1. **Nạp dữ liệu & ETL:** Nạp dữ liệu thô từ MovieLens, làm sạch và chuẩn hóa dữ liệu bằng Spark SQL.
  2. **Huấn luyện mô hình:** Chạy thuật toán học máy **ALS (Alternating Least Squares)** trên tập dữ liệu đánh giá khổng lồ.
  3. **Tính toán trước (Pre-computation):** Thuật toán tính toán ma trận và sinh ra danh sách 5 bộ phim gợi ý phù hợp nhất cho **từng** người dùng.

### Luồng 2: Phục vụ trực tuyến (Online Serving - Web & NoSQL)
Đây là môi trường "trưng bày", yêu cầu tốc độ phản hồi tính bằng mili-giây.
- **Công cụ:** Cơ sở dữ liệu NoSQL (MongoDB) và Giao diện Web (Gradio / Streamlit).
- **Quy trình:**
  1. **Lưu trữ kết quả:** Toàn bộ kết quả (danh sách phim đã gợi ý cho từng người dùng) từ cụm Spark được đổ thẳng vào MongoDB. MongoDB lưu trữ dưới dạng Document (JSON) giúp việc truy xuất cực kỳ tối ưu.
  2. **Giao diện Web:** Web app kết nối **trực tiếp và duy nhất** với MongoDB. Khi người dùng nhập `User ID`, Web chỉ thực hiện một truy vấn đọc đơn giản trên MongoDB.
  3. **Tốc độ:** Nhờ việc dữ liệu đã được tính sẵn và ưu thế đọc nhanh của NoSQL, hệ thống chỉ mất **chưa tới 0.1 giây** để hiển thị kết quả.

## 4. Ưu điểm nổi bật của Kiến trúc (Luận điểm bảo vệ đề tài)

> [!IMPORTANT]
> Đây là những điểm mấu chốt cần nhấn mạnh khi thuyết trình để đạt điểm tối đa.

1. **Tránh nghẽn hệ thống (No Bottlenecks):** 
   Spark tính toán ma trận lớn rất nặng và mất thời gian. Nếu cho Web truy vấn trực tiếp vào Spark, mỗi khi nhập User ID hệ thống sẽ bị treo. Việc tách biệt việc tính toán (Spark) và truy vấn phục vụ (NoSQL) là **kiến trúc chuẩn công nghiệp (Industry Standard)** được dùng tại các công ty lớn như Netflix, Shopee.

2. **Sử dụng đúng công nghệ cho đúng mục đích:**
   - **Apache Spark:** Tối ưu cho tính toán phân tán, xử lý khối lượng dữ liệu khổng lồ (Heavy computation).
   - **MongoDB:** Tối ưu cho việc lưu trữ linh hoạt và truy xuất dữ liệu tốc độ cao (Fast retrieval).

3. **Sản phẩm trực quan, trải nghiệm người dùng cao (UX):**
   Hệ thống có một trang Web Demo hoàn chỉnh (Gradio/Streamlit) thay vì chỉ chạy code trên terminal. Thầy cô trong hội đồng có thể trực tiếp nhập thử User ID và thấy danh sách tên phim thật hiển thị mượt mà, trực quan ngay lập tức. Điều này chứng minh dự án có tính hoàn thiện cao và sẵn sàng áp dụng vào thực tế (Production-ready).
