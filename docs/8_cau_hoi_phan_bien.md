# Tài Liệu Ôn Tập Phản Biện Đồ Án (Dành cho Hội đồng)

> Tài liệu này được dùng làm "Vũ khí bí mật" để trả lời các câu hỏi hóc búa từ Hội đồng Giám khảo trong ngày bảo vệ đồ án, đặc biệt là các câu hỏi xoáy vào bản chất của "Big Data".

---

## Câu Hỏi Chí Mạng (Kinh Điển)

**🗣️ Hội đồng hỏi:**
> *"Thầy thấy code ETL và EDA của nhóm em viết rất ngắn, nhiều chỗ chỉ có 1-2 dòng, giống hệt code Python thường chạy trên máy tính cá nhân. Vậy đồ án này gọi là Big Data ở cái chỗ nào?"*

---

## 💡 Hướng Dẫn Trả Lời (Ăn điểm A+)

Dạ thưa Thầy/Cô, sức mạnh Big Data của dự án nhóm em không nằm ở việc viết mã nguồn dài hay ngắn, mà nó nằm ở **Kiến trúc Tính toán Phân tán (Distributed Computing) ở tầng đáy (Under the hood) của Apache Spark**. 

Sự khác biệt giữa code Python thông thường và code đồ án của nhóm em nằm ở 3 điểm cốt lõi sau:

### 1. Kiến trúc Master-Worker & Khả năng Scale-Out
- **Code Python/Pandas thường:** Chỉ chạy trên đúng 1 nhân (1 Core) của CPU. Nếu dữ liệu lên tới hàng chục GB, hệ thống sẽ bị văng lỗi tràn RAM (Out of Memory) ngay lập tức.
- **Spark trong đồ án của nhóm:** Ngay từ dòng khởi tạo `SparkSession.builder.master("local[*]").getOrCreate()`, em đã thiết lập kiến trúc Big Data. Tham số `local[*]` cho phép Spark tự động "phân thân" ra, huy động toàn bộ 100% số nhân CPU hiện có để chạy song song. 
- **Khả năng mở rộng:** Trong thực tế doanh nghiệp, nếu thay dòng chữ đó bằng địa chỉ của một cụm Cluster (ví dụ 1000 máy chủ), thì 1 dòng code ngắn ngủi của nhóm em sẽ tự động được xé nhỏ ra và giao việc cho 1000 máy tính cùng xử lý song song mà **không cần sửa lại bất kỳ dòng code nào**.

### 2. Tính toán Lười biếng (Lazy Evaluation)
- Khi em viết câu lệnh nạp dữ liệu `ratings_df = spark.read.parquet()`, Spark **không hề** nhồi nhét toàn bộ dữ liệu vào bộ nhớ RAM như cách Python truyền thống vẫn làm.
- Thay vào đó, Spark chỉ tạo ra một Kế hoạch Thực thi (DAG). Chỉ khi nào em gọi các hành động (Action) như `.show()` hay `.write`, Spark mới bắt đầu chạy dọc theo đường ống để xử lý. Kỹ thuật này giúp hệ thống của em không bao giờ bị tràn RAM dù dữ liệu có lớn đến mức Terabyte.

### 3. Tối ưu hóa với Catalyst Optimizer
- Khi em gõ các câu lệnh SQL ngắn gọn trong phần Khai phá dữ liệu (ví dụ `GROUP BY`, `JOIN`), các câu lệnh này sẽ được đưa qua bộ não **Catalyst Optimizer**.
- Bộ não này tự động phân tích và chuyển đổi mã nguồn bậc cao của em thành các tác vụ chạy bằng mã máy (Tungsten Engine) bằng ngôn ngữ Scala/Java ở tầng đáy sao cho tối ưu hóa tốc độ I/O và CPU nhất có thể.

---

> [!TIP]
> **Chốt hạ:**
> *"Thay vì tự viết các vòng lặp xử lý đa luồng thủ công phức tạp và dễ sinh lỗi, nhóm em áp dụng **DataFrame API chuẩn của Spark**. Nhờ đó, mã nguồn cực kỳ tối giản, thanh lịch, nhưng động cơ bên dưới lại là một cỗ máy phân tán khổng lồ."*
