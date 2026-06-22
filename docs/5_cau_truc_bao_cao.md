# Cấu trúc Báo cáo (Word Document) & Yêu cầu Hình ảnh

> [!IMPORTANT]
> Báo cáo cần dài khoảng 20-25 trang. Hãy đảm bảo chụp đủ 3 hình ảnh dưới đây trong quá trình chạy code để chèn vào báo cáo và slide.

## I. Yêu cầu Hình ảnh chụp màn hình (Screenshots)
1.  **Ảnh 1 (Chứng minh xử lý Big Data):** Chụp lại đoạn log in ra màn hình ở Bước 3 khi Spark load dữ liệu lên: `[BIG DATA INFO] Quy mô tập dữ liệu thực tế: 100,000 bản ghi tương tác.`
2.  **Ảnh 2 (Chứng minh độ chính xác):** Chụp lại kết quả chỉ số sai số ở Bước 4 sau khi Spark MLlib chạy xong: `==> Chỉ số sai số hệ thống (RMSE) đạt: ...`
3.  **Ảnh 3 (Giao diện trực quan):** Chụp ảnh toàn bộ màn hình trình duyệt giao diện trang Web (phần Gradio có màu xanh/trắng trực quan) đang hiển thị danh sách 5 bộ phim gợi ý sau khi bạn nhập một User ID vào.

---

## II. Cấu trúc chi tiết file báo cáo

### CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG GỢI Ý VÀ THÁCH THỨC DỮ LIỆU LỚN
**1.1.** Bối cảnh bài toán cá nhân hóa trải nghiệm người dùng trong kỷ nguyên số.
**1.2.** Hạn chế của kiến trúc cơ sở dữ liệu quan hệ (RDBMS) truyền thống khi xử lý dữ liệu quy mô lớn (Lecture 01).
**1.3.** Đề xuất giải pháp kỹ thuật: Kết hợp mô hình tính toán In-Memory Apache Spark và cơ sở dữ liệu phi quan hệ MongoDB.

### CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ KIẾN TRÚC HỆ THỐNG ĐỀ XUẤT
**2.1.** Kiến trúc phân tán của Apache Spark (Luồng làm việc giữa Driver Program, Cluster Manager và Worker Nodes - Lecture 04).
**2.2.** Cơ chế lưu trữ phi quan hệ hướng tài liệu (MongoDB Document Store) phục vụ lớp tối ưu truy vấn Serving Layer (Lecture 05).
**2.3.** Nguyên lý thuật toán Lọc cộng tác (Collaborative Filtering) và phương pháp tối ưu hóa phân rã ma trận ALS (Alternating Least Squares).

### CHƯƠNG 3: TRIỂN KHAI PIPELINE ETL VÀ PHÂN TÍCH KHAI PHÁ DỮ LIỆU THẬT
**3.1.** Đặc trưng và cấu trúc tập dữ liệu thực tế MovieLens từ phòng nghiên cứu GroupLens (Đại học Minnesota).
**3.2.** Quy trình nạp dữ liệu (Data Ingestion) và tiền xử lý làm sạch dữ liệu lớn bằng Spark DataFrame API (Lecture 04).
**3.3.** Khai phá dữ liệu (EDA) thông qua ngôn ngữ truy vấn phân tán Spark SQL.

### CHƯƠNG 4: THỬ NGHIỆM ĐÁNH GIÁ MÔ HÌNH VÀ TRIỂN KHAI ỨNG DỤNG DEMO
**4.1.** Quy trình huấn luyện mô hình học máy song song và các tham số tinh chỉnh tránh Overfitting trên cụm.
**4.2.** Đánh giá độ chính xác của hệ thống dựa trên chỉ số sai số RMSE.
**4.3.** Thiết kế giao diện ứng dụng Web tương tác độ trễ thấp thông qua việc đồng bộ dữ liệu sang lớp MongoDB Serving Layer.
