# Kế hoạch Thực hiện Dự án Big Data (Thời hạn 1 Tuần)
**Quy mô nhóm:** 4 thành viên (Phân bổ công việc đồng đều: 3 Code chính chia theo từng module, 1 Quản lý Docs/Slide/Testing).

## Phân chia Vai trò (Roles) - Đã cập nhật chia đều
*   **🧑‍💻 Thành viên 1 (Data Engineer):** Phụ trách môi trường Apache Spark, code luồng nạp và làm sạch dữ liệu (ETL) trong `clean_data.py`. 
*   **🤖 Thành viên 2 (Data Scientist):** Code huấn luyện mô hình Machine Learning (ALS), đánh giá sai số RMSE trong `train_als.py`.
*   **👨‍💻 Thành viên 3 (Fullstack Developer):** Thiết lập database MongoDB (`mongo_loader.py`) và xây dựng giao diện Web bằng Next.js (`frontend/`).
*   **📝 Thành viên 4 (BA / QA / Technical Writer):** Phụ trách toàn bộ tài liệu Báo cáo Word, thiết kế Slide thuyết trình, Testing toàn hệ thống. *(Đặc biệt: TV4 có thể vắng mặt Ngày 1, công việc hoàn toàn độc lập và dồn vào các ngày sau mà không làm block team).*

---

## Lịch trình Chi tiết (7 Ngày)

### Ngày 1: Khởi tạo, Phân tích hệ thống và Setup Môi trường
*   **TV 1, TV 2 & TV 3:** Tải dữ liệu MovieLens. Thiết lập môi trường chạy code. Tạo file `.env` và thiết lập kết nối MongoDB. Phân tích format dữ liệu đầu vào.
*   **TV 4:** *(Nghỉ phép)* - Không ảnh hưởng đến tiến độ hiện tại.

### Ngày 2: Xử lý dữ liệu (ETL) và Khởi tạo Báo cáo
*   **TV 1:** Dùng Spark DataFrame để nạp dữ liệu, làm sạch (xử lý Null, drop duplicates), ép kiểu dữ liệu chuẩn bị cho Model.
*   **TV 2 & TV 3:** Phối hợp thiết kế cấu trúc JSON/Dictionary để chuẩn bị lưu trữ vào MongoDB.
*   **TV 4:** Bắt tay vào viết **Chương 1 & Chương 2** (Word). Tạo template Slide chuyên nghiệp và phác thảo dàn ý Slide.

### Ngày 3: Khai phá dữ liệu (EDA) và Dựng khung UI
*   **TV 1:** Dùng Spark SQL chạy truy vấn ra Top 5 bộ phim hot nhất, tổng lượt rating.
*   **TV 2:** Bắt đầu setup code mô hình Spark MLlib ALS.
*   **TV 3:** Code khung giao diện Web Next.js (có ô nhập User ID và nút Gợi ý). Viết test bằng Playwright.
*   **TV 4:** Cập nhật số liệu EDA từ TV1 vào Báo cáo/Slide. Tìm kiếm hình ảnh minh họa kiến trúc đưa vào báo cáo.

### Ngày 4: Train Mô hình (ML) và Tích hợp MongoDB
*   **TV 1 & TV 2:** Chạy huấn luyện thuật toán ALS. Tối ưu tham số để ra chỉ số RMSE tốt nhất.
*   **TV 3:** Code phần kết nối Spark với MongoDB (viết hàm Batch Insert đẩy kết quả lên DB).
*   **TV 4:** Đưa chỉ số RMSE vào **Chương 4** (Phần đánh giá). Chèn RMSE vào Slide. Rà soát chuẩn hóa font chữ báo cáo.

### Ngày 5: Hoàn thiện Web Demo và Ghép nối toàn hệ thống
*   **TV 2:** Sinh ra danh sách Top 5 phim gợi ý cho *toàn bộ* người dùng và xuất file dataframe.
*   **TV 3:** Nối giao diện Next.js với MongoDB thông qua API Routes. Đảm bảo gõ User ID trên Web trả về danh sách phim từ MongoDB dưới 0.1 giây.
*   **TV 4:** Chạy thử Web Demo. Chụp các ảnh màn hình quan trọng (Log data, RMSE, Web UI) chèn vào Word và Slide Demo.

### Ngày 6: Testing & Bug Fixing (Giai đoạn gỡ lỗi)
*   **TV 1, 2, 3:** Nhập thử các User ID bất thường xem Web có sập không. Tinh chỉnh mã nguồn sạch đẹp. Cập nhật README.md.
*   **TV 4:** Nối toàn bộ file Word thành bản Final (20-25 trang). Làm mục lục tự động. Hoàn thiện toàn bộ Slide.

### Ngày 7: Tổng duyệt (Dry-run)
*   **Cả 4 thành viên:** Họp nhóm Online/Offline. Thuyết trình nháp từ đầu đến cuối canh thời gian. Test thử Web Demo đảm bảo mọi thứ trơn tru. Xuất file PDF để nộp.

---

## 🚦 Sơ Đồ Phụ Thuộc Công Việc (Dependencies)
1. **Khâu đẩy dữ liệu (Ngày 4-5):** **TV 3** (MongoDB) cần đợi **TV 2** (ML) ra file data chuẩn để đẩy. Tuy nhiên TV 3 có thể tạo schema mẫu đẩy thử trước.
2. **Khâu hình ảnh minh chứng:** **TV 4** (Docs/Slide) bắt buộc phải theo sát tiến độ code của TV 1, 2, 3 để lấy số liệu thực tế. Công việc của TV 4 hoàn toàn linh động theo thời gian cá nhân.
3. **Làm việc độc lập:** Các TV 1, 2, 3 code trên các module tách biệt (`etl`, `ml`, `web/mongodb`) nên không sợ đụng code (conflict) khi dùng Git.
