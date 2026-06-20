# Hướng Dẫn Xem & Quản Lý Dữ Liệu MongoDB

Sau khi luồng mã nguồn Spark chạy xong và đẩy kết quả lên Database thành công, bạn sẽ muốn "tận mắt" xem dữ liệu gợi ý phim đang nằm trên đám mây trông như thế nào. Bạn có 2 cách cực kỳ chuyên nghiệp để làm việc này:

---

## Cách 1: Xem trực tiếp trên trang web MongoDB Atlas
*(Cách này thường dùng cho Nhóm trưởng - người đang giữ tài khoản đăng nhập web)*

1. **Đăng nhập:** Truy cập vào link [https://cloud.mongodb.com/](https://cloud.mongodb.com/) và đăng nhập bằng tài khoản Gmail ban nãy.
2. **Vào kho dữ liệu:** Ở giao diện màn hình chính (chỗ chữ Cluster0), bạn sẽ thấy một nút tên là **Browse Collections** (Lướt xem bộ sưu tập). Hãy click vào đó!
3. **Chiêm ngưỡng thành quả:** 
   * Cột bên trái sẽ hiện ra tên Database (`movie_recommendation_db`) và tên Bảng (`user_recommendations`).
   * Cột bên phải sẽ xổ ra hàng ngàn dòng dữ liệu (Documents) chứa danh sách phim được gợi ý cho từng User dưới dạng chuẩn JSON.
   * Tại đây, bạn có thể bấm biểu tượng cái bút ✏️ để sửa data bằng tay, hoặc biểu tượng thùng rác 🗑️ để xóa dòng nếu test bị lỗi.

---

## Cách 2: Dùng phần mềm MongoDB Compass (Khuyên dùng cho Team)
*(Cách này xịn xò hơn, dành cho tất cả các thành viên trong nhóm mà KHÔNG CẦN tài khoản đăng nhập web)*

Thay vì lên web chậm chạp, các kỹ sư Data thường dùng app cài trên máy tính:

1. **Tải app:** Tải và cài đặt phần mềm chính chủ [MongoDB Compass](https://www.mongodb.com/products/tools/compass).
2. **Dán link kết nối:** Mở app lên, màn hình đầu tiên sẽ hiện ra cái ô to đùng yêu cầu nhập "URI". Bạn hãy dán cái đường link dòng số 3 (cái `MONGO_URI` chứa sẵn tên và pass) của nhóm vào đó rồi bấm **Connect**.
3. **Lướt dữ liệu như lướt Facebook:** Giao diện bên trong cực kỳ trực quan, đẹp mắt. Các bạn làm Web (TV2) có thể thoải mái lọc dữ liệu, viết câu lệnh query test thử tốc độ, hay thậm chí xuất (Export) dữ liệu đó ngược ra lại thành file CSV để làm báo cáo một cách dễ dàng.

> [!TIP]
> Việc dùng Compass rất tiện vì 3 bạn còn lại trong team không cần biết mật khẩu nick Gmail hay tài khoản trang web của bạn. Họ chỉ cần có cái URI là chọc được vào kho data chung để làm việc!
