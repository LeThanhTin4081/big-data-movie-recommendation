 1. Nếu ID người dùng trên web bị trùng với ID trong tập train thì sao?
Thực chất trong đồ án này, việc trùng ID không phải là lỗi, mà là chúng ta đang CỐ TÌNH làm như vậy (Simulate/Mô phỏng).

Tập dữ liệu MovieLens 100k có đúng 943 người dùng. Khi bạn tạo ô "Nhập User ID" trên web (với các ví dụ 1, 42, 100), bản chất là hệ thống đang cho phép người dùng thực tế "nhập vai" thành 1 trong 943 người dùng lịch sử đó. 
Mục đích là để kiểm chứng xem: *"Với dữ liệu lịch sử rating của anh User số 42 này, mô hình ALS đã học được gì và nó sẽ phỏng đoán anh ta thích bộ phim nào tiếp theo?"

2. Làm sao biết phần dự đoán đó là cho ID trên web chứ không phải tập train?
Câu trả lời là: Hai ID này là MỘT.
Quy trình hoạt động của thuật toán (Collaborative Filtering - Lọc cộng tác) diễn ra như sau:
- Bước 1 (Offline): Apache Spark đọc 100.000 đánh giá, xây dựng ma trận và huấn luyện ra mô hình ALS. Spark tiến hành dự đoán sẵn (Pre-calculate) Top 10 phim tiếp theo cho toàn bộ 943 người dùng này và lưu sẵn vào MongoDB.
- Bước 2 (Online - Trên Web): Khi bạn gõ số `42` trên web, web không hề bắt Spark chạy lại mô hình (vì chạy Big Data mất vài chục phút). Web chỉ đơn giản là gọi API vào MongoDB, lôi đúng kết quả đã dự đoán sẵn của User `42` ra và hiển thị trong 0.1 giây.


3. CÂU HỎI MỞ RỘNG (Giảng viên rất hay hỏi):
"Vậy nếu một người dùng MỚI TINH vừa đăng ký tài khoản trên web (ví dụ: User ID = 9999), người này không hề có mặt trong 943 người của tập train. Mô hình ALS sẽ gợi ý thế nào?"

Cách trả lời "ăn điểm" tuyệt đối:
Thưa thầy/cô, đây chính là Cold-Start Problem (Vấn đề khởi đầu lạnh) - một bài toán nan giải và kinh điển của mọi hệ thống gợi ý dùng Collaborative Filtering. Với người dùng mới tinh, mô hình ALS hoàn toàn "tịt ngòi" vì ma trận (Matrix) của nó không hề tồn tại vector của người này (người này chưa từng xem hay chấm điểm phim nào).

Để giải quyết vấn đề này trên web thực tế, hệ thống của em sẽ được thiết kế 2 lớp (Fallback):
1. Lớp 1 (Giải quyết Cold-Start): Vì không có dữ liệu để ALS phân tích, hệ thống sẽ tự động chuyển sang chiến lược "An toàn", đó là hiển thị Các bộ phim Phổ biến nhất (Trending/Popular) hoặc Phim mới ra mắt. (Đó là lý do phần Trang chủ web hiện tại em luôn để Row "Phim phổ biến" lên đầu tiên).
2. Lớp 2 (Thu thập & Cập nhật): Trong quá trình người dùng mới này lướt web, click xem phim, hoặc đánh giá phim, hệ thống sẽ lưu log lại. Đến nửa đêm, hệ thống Big Data (Apache Spark) sẽ lấy tập log này, gộp chung với MovieLens cũ và huấn luyện lại (Retrain) mô hình. Sáng hôm sau, người dùng 9999 đã chính thức có mặt trong ma trận và bắt đầu nhận được các gợi ý cá nhân hóa từ ALS