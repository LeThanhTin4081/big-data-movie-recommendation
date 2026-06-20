# Cấu trúc Slide Thuyết trình & Kịch bản Demo

## I. Cấu trúc 9 trang Slide
*   **Slide 1: Trang mở đầu** – Tên đề tài chuẩn hóa, tên Giảng viên hướng dẫn, tên môn học và danh sách các thành viên thực hiện.
*   **Slide 2: Đặt vấn đề** – Nhu cầu cá nhân hóa dịch vụ giải trí (như Netflix, Spotify). Số lượng bản ghi tương tác lên tới hàng triệu khiến máy đơn lẻ bị quá tải về CPU và RAM (Lecture 02).
*   **Slide 3: Thách thức công nghệ** – Tại sao các câu lệnh JOIN của SQL truyền thống thất bại khi nhân các ma trận thưa khổng lồ. Sự cần thiết của bộ nhớ RAM phân tán của Spark (Lecture 04).
*   **Slide 4: Sơ đồ kiến trúc Pipeline hệ thống** – Vẽ luồng dữ liệu rõ ràng: Tệp thô CSV $\rightarrow$ Spark Cluster (Tính toán ẩn) $\rightarrow$ Đóng gói sang NoSQL Database $\rightarrow$ Giao diện Web (Tương tác trực diện với người dùng).
*   **Slide 5: Khai phá dữ liệu (EDA)** – Chèn trực tiếp ảnh chụp bảng kết quả từ câu lệnh Spark SQL (Danh sách các bộ phim thật có nhiều lượt review nhất). Chứng minh nhóm đã làm việc trên dữ liệu thực tế.
*   **Slide 6: Thuật toán hệ thống** – Giải thích ngắn gọn cơ chế phân rã ma trận ALS, cách Spark phân bổ các Task tính toán song song xuống các Worker Nodes để tìm ra điểm yêu thích dự đoán.
*   **Slide 7: Kết quả kiểm thử** – Đưa ra chỉ số sai số RMSE thu được sau quá trình huấn luyện để chứng minh mô hình có độ chính xác cao.
*   **Slide 8: TRỌNG TÂM DEMO SẢN PHẨM** – Chiếu màn hình giao diện Web khi nhập User ID thật, kết quả danh sách các tên phim hiển thị mượt mà ngay lập tức. Giải thích rõ: Web chạy nhanh là nhờ lấy kết quả sẵn từ NoSQL chứ không bắt Spark tính lại từ đầu.
*   **Slide 9: Kết luận & Hướng phát triển** – Tổng kết lại những phần đã hoàn thiện theo nội dung môn học và định hướng nâng cấp hệ thống sang luồng xử lý thời gian thực (Spark Structured Streaming - Lecture 04).

---

## II. Kịch bản & Thông điệp Thuyết trình (Elevator Pitch)

> [!TIP]
> **Thông điệp cốt lõi để ăn điểm:**
> "Nhóm em không chạy mô hình trên máy đơn lẻ với dữ liệu giả. Hệ thống được thiết kế theo chuẩn Big Data: Tách biệt phần Tính toán phân tán (Spark) và phần Truy vấn tốc độ cao (NoSQL). Nhờ vậy, hệ thống vừa có thể xử lý lượng dữ liệu khổng lồ, vừa đảm bảo trải nghiệm người dùng trên Web cực kỳ mượt mà."

### Mô tả Web Demo
Trang Web Demo của nhóm mình sẽ mô phỏng lại cách mà Netflix hay Amazon gợi ý sản phẩm cho khách hàng. Khi chạy Demo, giao diện sẽ có một ô nhập mang tên **User ID** (Mã khách hàng) và một nút bấm **"Gợi ý"**.
*   **Thao tác:** Nhập một số bất kỳ đại diện cho khách hàng (ví dụ: `250`). Hệ thống lập tức hiện 5 bộ phim (Star Wars, Toy Story...) kèm điểm dự đoán (VD: 4.5/5★).
*   **Đặc điểm:** Tốc độ siêu nhanh, độ trễ < 0.1s.

### Giải thích Hệ thống chạy ẩn (Cho Hội đồng)
Để trang Web chạy mượt mà, hệ thống chia làm 2 phần:
1.  **Phần xử lý nặng (Apache Spark - Chạy ẩn Offline):** Nạp hàng trăm nghìn đánh giá, làm sạch, chạy thuật toán ALS để tính toán sẵn danh sách phim cho từng người. Việc này làm trước.
2.  **Phần lưu trữ và hiển thị (NoSQL & Web - Chạy Online):** Kết quả của Spark được đóng gói vào NoSQL. Khi nhập User ID trên Web, hệ thống chỉ việc "nhấc" kết quả từ NoSQL ra, không bắt Spark tính lại, giúp tốc độ phản hồi cực kỳ nhanh chóng.
