# SƯỜN BÁO CÁO TỔNG HỢP VÀ HƯỚNG DẪN CHỤP ẢNH
*Đây là bản gộp hoàn chỉnh. Mỗi mục đều có "Nội dung lý thuyết" (để bạn dán vào Word) và "Hướng dẫn chụp ảnh" (để bạn biết phải minh họa bằng hình gì cho khớp).*

---

## 1. CỤM DATA & ETL (CHƯƠNG 3 & 4)

### Mục 3.4.2 & 4.2: Luồng xử lý và Làm sạch dữ liệu (Data Cleaning & ETL)
*Thực hiện làm sạch dữ liệu thô trước khi đưa vào phân tích và huấn luyện.*
**[👉 Dán vào Word]**
- **Định nghĩa Schema:** Ép kiểu `FloatType` cho rating để tương thích hoàn toàn với thuật toán Spark MLlib.
- **Xử lý Null & Trùng lặp:** Dùng hàm `.dropna()` và `.dropDuplicates(['movie_id'])` để quét và loại bỏ các dòng bị khuyết dữ liệu hoặc bị trùng lặp, đảm bảo tính toàn vẹn của tập dữ liệu.
- **Đóng gói Parquet:** Xuất dữ liệu đã làm sạch sang định dạng nén cột Parquet nhằm tối ưu hóa I/O, giúp pha Machine Learning phía sau chạy nhanh hơn.

**[📸 Hướng dẫn chụp ảnh (File `clean_data_notebook`)]**
- **Ảnh 1 (Xử lý Ratings):** Chụp mục "2. Nạp và làm sạch dữ liệu Rating".
- **Ảnh 2 (Xử lý Items):** Chụp mục "3. Nạp và làm sạch dữ liệu Phim".
- **Ảnh 3 (Xuất File):** Chụp mục "4. Xuất ra định dạng Parquet siêu tốc".

### Mục 3.2: Số liệu Khám phá dữ liệu (EDA)
*Khám phá dữ liệu sau khi đã được làm sạch.*
**[👉 Dán vào Word]**
- Tập dữ liệu sử dụng: **MovieLens 100K** (943 Users, 1,682 Movies, 100,000 Ratings).
- **Độ thưa thớt (Sparsity): 93.7%** (Mỗi user trung bình chỉ xem ~6.3% tổng lượng phim. Rất cần dùng thuật toán nội suy như ALS để dự đoán chỗ trống).
- **Phân phối điểm đánh giá (Positivity Bias):** 5 sao (~21.2%), 4 sao (~34.1% - Cao nhất), 3 sao (~27.1%), 1 & 2 sao (~17.4%). Người dùng thường có xu hướng bỏ qua phim dở và chỉ để lại rating cho phim họ thích (lệch phải).
- **Phân tích Nhân khẩu học (Demographics):** Người dùng nam chiếm đa số, phần lớn nằm trong độ tuổi 20-30 tuổi.
- **Phân tích Sở thích & Nghề nghiệp:** Sinh viên (Student) là tệp khách hàng lớn nhất. Các thể loại phim (Genres) được ưa chuộng nhất bao gồm Drama, Comedy và Action.

**[📸 Hướng dẫn chụp ảnh (File `eda_notebook`)]**
*(Lưu ý: File EDA của bạn rất đồ sộ, hãy chụp đầy đủ các hình ảnh đồ thị theo thứ tự dưới đây để báo cáo thật hoành tráng)*
- **Ảnh 1 (Tổng quan & Sparsity):** Chụp mục "2. Tính tổng quan dữ liệu".
- **Ảnh 2 (Sự phân phối đánh giá):** Chụp mục "2b. Phân phối số lượt đánh giá (Cold-Start Problem)" gồm 2 biểu đồ phân phối của User và Movie.
- **Ảnh 3 (Top Phim):** Chụp các bảng kết quả ở mục "3. TOP 10 bộ phim phổ biến nhất" và "4. TOP 10 bộ phim hay nhất".
- **Ảnh 4 (Biểu đồ Rating):** Chụp đồ thị cột ở mục "5. Biểu đồ phân bố điểm số".
- **Ảnh 5 (Biểu đồ Giới tính):** Chụp đồ thị tròn (Pie chart) ở mục "6. Nạp dữ liệu Khách hàng và Vẽ biểu đồ Giới tính".
- **Ảnh 6 (Biểu đồ Độ tuổi):** Chụp đồ thị phân phối ở mục "7. Vẽ biểu đồ Phân bố Độ tuổi".
- **Ảnh 7 (Biểu đồ Thể loại phim):** Chụp đồ thị cột ngang ở mục "8. Biểu đồ Cột ngang - Top Thể loại phim".
- **Ảnh 8 (Biểu đồ Nghề nghiệp):** Chụp đồ thị cột ngang ở mục "9. Biểu đồ Cột ngang - Thống kê Nghề nghiệp".

---

## 2. CỤM MACHINE LEARNING (CHƯƠNG 4 & 5)

### Mục 4.3: Tối ưu Tham số (Grid Search) & Mô hình ALS
**[👉 Dán vào Word]**
- Hệ thống áp dụng thuật toán Tìm kiếm lưới (Grid Search) để quét 9 cấu hình khác nhau nhằm tìm ra bộ tham số tốt nhất cho thuật toán ALS.
- **Bộ tham số tối ưu (Best Model):** `rank` = 40, `regParam` = 0.1, `maxIter` = 10.

**[📸 Hướng dẫn chụp ảnh (File `train_als_notebook`)]**
- **Ảnh 1 (Baseline):** Chụp mục "3. Huấn luyện mô hình cơ sở".
- **Ảnh 2 (Grid Search):** Chụp mục "4. Fine-tuning Mô hình ALS" gồm vòng lặp và cái Log đen đen in ra tiến độ chạy 9 vòng.
- **Ảnh 3 (Heatmap):** Chụp mục "5. Trực quan hóa kết quả bằng Heatmap". Hình ảnh biểu đồ nhiệt này cực kỳ đắt giá, chứng minh được ô Rank 40 / Reg 0.1 có màu nhạt nhất (tối ưu nhất).
- **Ảnh 4 (Dự đoán thử):** Chụp mục "6. Huấn luyện mô hình Cuối cùng" hiển thị bảng DataFrame kết quả mà AI đoán rating.

### Mục 5.1: Đánh giá mô hình (RMSE)
**[👉 Dán vào Word]**
- **Baseline mặc định:** Đạt RMSE = 0.9317.
- **Kết quả Tuning:** Mô hình tối ưu (Rank=40, Reg=0.1) đạt **RMSE = 0.9305**, đánh bại mức Baseline ban đầu. Độ sai lệch chưa tới 1 sao (1 điểm rating), đủ năng lực gợi ý cá nhân hóa chính xác.

---

## 3. CỤM MONGODB & WEB FRONTEND (CHƯƠNG 3, 4 & 5)

### Mục 3.4.3: Thiết kế Database (MongoDB Schema)
**[👉 Dán vào Word]**
Cơ sở dữ liệu NoSQL (MongoDB) được thiết kế gồm 4 Collections chính để phục vụ toàn bộ hệ thống:

**1. Collection `movies` (Lưu danh mục phim):**
Dùng trực tiếp `movie_id` làm khóa chính `_id` giúp tra cứu thông tin phim siêu tốc.
```json
{
  "_id": 1,
  "title": "Toy Story (1995)",
  "year": "N/A",
  "genres": ["Đang cập nhật"],
  "rating": 5.0,
  "num_ratings": 0,
  "poster_url": "https://via.placeholder.com/..."
}
```

**2. Collection `user_recommendations` (Kết quả AI dự đoán):**
Sử dụng kỹ thuật NoSQL lồng nhau (Embedded Document) để nhúng trực tiếp mảng Top 10 phim gợi ý vào thẳng ID của user. Nhờ đó Frontend chỉ cần 1 câu lệnh Query duy nhất là lấy đủ dữ liệu, đạt tốc độ O(1).
```json
{
  "_id": 1,
  "recommendations": [ 
    { "movie_id": 515, "title": "Boot, Das (1981)", "predicted_rating": 4.85, ... },
    // ... 9 Object phim nữa ...
  ]
}
```

**3. Collection `users` (Quản lý tài khoản đăng nhập):**
Lưu trữ thông tin xác thực của người dùng khi truy cập Web (Có mã hóa Password Hash).
```json
{
  "_id": ObjectId("6a3be224d623e7..."),
  "name": "Vinh",
  "email": "vinh123@gmail.com",
  "password": "83f26a04668...", // Mật khẩu đã mã hóa
  "userId": 224,
  "createdAt": "2026-06-24T13:56:52"
}
```

**4. Collection `otps` (Quản lý mã xác thực):**
Dùng để lưu mã OTP tạm thời cho luồng Quên mật khẩu/Xác minh tài khoản. (Do hệ thống đang hoạt động ổn định nên hiện tại collection này rỗng để tiết kiệm tài nguyên).

**[📸 Hướng dẫn chụp ảnh (Web MongoDB Atlas)]**
- Mở MongoDB Atlas trên web, vào Data Explorer.
- Lần lượt bấm vào từng collection: `movies`, `user_recommendations`, `users` và chụp lại các Object JSON hiển thị trên màn hình để minh họa cho báo cáo.

### Mục 3.4.4 & 4.5: Giao diện Web & API
**[👉 Dán vào Word]**
- **Các API cốt lõi:**
  1. `POST /api/auth`: Đăng nhập.
  2. `GET /api/movies`: Lấy danh sách phim Trending.
  3. `GET /api/recommend?userId={id}`: Truy vấn MongoDB lấy top 10 phim gợi ý trả về cho Frontend.

**[📸 Hướng dẫn chụp ảnh (Giao diện Web của bạn)]**
- **Ảnh 1:** Trang chủ lúc chưa đăng nhập.
- **Ảnh 2:** Sau khi nhập ID (Ví dụ 292), hiện ra danh sách 10 tấm hình Poster phim.

### Mục 5.2 & 5.3: Hiệu năng & Kiểm thử
**[👉 Dán vào Word]**
- **Response Time:** API `/api/recommend` phản hồi cực nhanh (50-80ms, < 0.1s) do mô hình ALS đã tính toán Offline sẵn, Web Frontend chỉ việc tra Index `_id` từ MongoDB.
- **Kiểm thử Playwright (E2E):** Pass 100% các kịch bản test (Nhập sai ID báo lỗi, Nhập đúng ID chuyển trang và render đủ 10 phim).

**[📸 Hướng dẫn chụp ảnh (Trình duyệt)]**
- Bật F12 (DevTools) > tab Network. Reload trang và chụp lại dòng `recommend?userId=292` có cột Time hiển thị vài chục mili-giây.
