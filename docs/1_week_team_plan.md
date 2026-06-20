# Kế hoạch Thực hiện Dự án Big Data (Thời hạn 1 Tuần)
**Quy mô nhóm:** 4 thành viên (Phân bổ: 2 Code chính, 2 Hỗ trợ Docs/Test).

## Phân chia Vai trò (Roles)
*   **🧑‍💻 Thành viên 1 (Việc Nặng - Data Engineer/Data Scientist):** Phụ trách môi trường Apache Spark, viết luồng dữ liệu ETL (làm sạch dữ liệu) và huấn luyện mô hình Machine Learning phân tán (ALS).
*   **👨‍💻 Thành viên 2 (Việc Nặng - Backend/Frontend Engineer):** Phụ trách thiết lập NoSQL (MongoDB), viết API đẩy dữ liệu từ Spark sang NoSQL, và xây dựng giao diện Web hiển thị (Gradio/Streamlit).
*   **📝 Thành viên 3 (Việc Nhẹ - Technical Writer/BA):** Chuyên viết tài liệu lý thuyết, phụ trách Chương 1 & 2 của file Word báo cáo và lên kịch bản thuyết trình.
*   **📊 Thành viên 4 (Việc Nhẹ - Tester/Slide Designer):** Thiết kế Slide, chạy thử Web Demo, chụp ảnh màn hình làm minh chứng và phụ trách Chương 3 & 4 (ghi nhận kết quả chạy model).

---

## Lịch trình Chi tiết (7 Ngày)

### Ngày 1: Khởi tạo và Phân tích hệ thống
*   **TV 1 & TV 2:** Tải dữ liệu MovieLens. Thiết lập môi trường chạy code (Google Colab hoặc Local máy ảo). Bàn bạc thống nhất format dữ liệu (JSON/CSV) sẽ truyền cho nhau.
*   **TV 3:** Viết **Chương 1** (Đặt vấn đề, tính cấp thiết).
*   **TV 4:** Khởi tạo template Slide chuyên nghiệp, phác thảo các tiêu đề trang Slide (từ Slide 1 đến Slide 4).

### Ngày 2: Xử lý dữ liệu (ETL) và Bắt đầu viết báo cáo
*   **TV 1:** Dùng Spark DataFrame để nạp dữ liệu, làm sạch (xử lý Null, drop duplicates), ép kiểu dữ liệu chuẩn bị cho Model.
*   **TV 2:** Khởi tạo Database NoSQL (MongoDB). Thiết kế schema (Key-Value) để chuẩn bị hứng dữ liệu gợi ý.
*   **TV 3:** Viết **Chương 2** (Cơ sở lý thuyết về Spark, NoSQL, thuật toán ALS).
*   **TV 4:** Hỗ trợ TV 3 tìm kiếm hình ảnh minh họa kiến trúc Spark và NoSQL đưa vào file Word.

### Ngày 3: Khai phá dữ liệu (EDA) và Dựng khung UI
*   **TV 1:** Dùng Spark SQL chạy truy vấn ra Top 5 bộ phim hot nhất, tổng số lượt rating. **(Giao kết quả cho TV 4 chụp ảnh)**.
*   **TV 2:** Code khung giao diện Web cơ bản (có ô nhập User ID và nút Gợi ý).
*   **TV 3:** Rà soát lại Chương 1 và 2, chuẩn hóa font chữ, format Word.
*   **TV 4:** Đưa số liệu EDA của TV1 vào Slide 5. Cập nhật **Chương 3** (Phần 3.1 và 3.2).

### Ngày 4: Train Mô hình (ML) và Tích hợp NoSQL
*   **TV 1:** Code phần Spark MLlib, huấn luyện thuật toán ALS. Chạy vòng lặp tối ưu tham số. In ra chỉ số sai số RMSE.
*   **TV 2:** Viết hàm đẩy hàng loạt kết quả (Batch Insert) từ môi trường của TV 1 sang bộ nhớ MongoDB.
*   **TV 3:** Soạn kịch bản thuyết trình (Elevator pitch về kiến trúc 2 luồng).
*   **TV 4:** Đưa chỉ số RMSE vào **Chương 4** (Phần đánh giá). Chèn RMSE vào Slide 7.

### Ngày 5: Hoàn thiện Web Demo và Ghép nối toàn hệ thống
*   **TV 1:** Sinh ra danh sách Top 5 phim gợi ý cho *toàn bộ* người dùng và bàn giao file kết quả/Dataframe cho TV 2.
*   **TV 2:** Nối giao diện Web với MongoDB. Đảm bảo khi gõ User ID trên Web thì trả về danh sách phim từ MongoDB dưới 0.1 giây.
*   **TV 3 & TV 4:** Ghi nhận lại toàn bộ luồng chạy. TV 4 tiến hành **chụp 3 ảnh màn hình quan trọng** (Log data, RMSE, và Web UI) để chèn vào Word và Slide Demo.

### Ngày 6: Testing & Bug Fixing (Giai đoạn gỡ lỗi)
*   **TV 1 & TV 2:** Nhập thử các User ID bất thường (âm, chữ cái, ngoài khoảng) xem Web có sập không. Tinh chỉnh mã nguồn sạch đẹp để "show code" (vì không dùng code cũ nữa).
*   **TV 3:** Nối toàn bộ file Word thành bản Final (20-25 trang). Làm mục lục tự động.
*   **TV 4:** Hoàn thiện Slide 8 và 9. Chuẩn bị kịch bản Demo trực tiếp trên lớp.

### Ngày 7: Tổng duyệt (Dry-run)
*   **Cả 4 thành viên:** Họp nhóm Online/Offline.
*   **TV 1 & TV 2:** Đóng gói source code và mô tả cách cài đặt (README.md) phòng trường hợp thầy cô đòi tự chạy.
*   **TV 3 & TV 4:** Thuyết trình nháp từ đầu đến cuối canh thời gian. Test thử Web Demo đảm bảo mọi thứ trơn tru. Xuất file PDF để nộp.

---
> [!TIP]
> **Lời khuyên cho 2 bạn việc nhẹ (TV 3 & 4):** Dù không code chính, hai bạn phải là người "thuộc làu làu" kịch bản tại sao lại dùng Spark và MongoDB (như trong Slide Presentation đã vạch ra). Nếu bị thầy cô "xoáy" hỏi xoáy đáp xoay, hai bạn đứng ra đỡ đạn phần lý thuyết sẽ giúp nhóm lấy trọn vẹn điểm cộng làm việc nhóm!
