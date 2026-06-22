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

