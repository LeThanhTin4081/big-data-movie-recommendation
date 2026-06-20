# Giới thiệu Tập dữ liệu MovieLens 100k (Dành cho báo cáo)

> [!NOTE]
> Tài liệu này mô tả cấu trúc của tập dữ liệu thực tế MovieLens 100k được sử dụng trong dự án. Các thành viên phụ trách viết Báo cáo (Chương 3) có thể sử dụng trực tiếp nội dung này.

Tập dữ liệu **MovieLens 100k** được thu thập và phân phối bởi nhóm nghiên cứu GroupLens (Đại học Minnesota). Đây là một trong những bộ dữ liệu chuẩn mực nhất (benchmark dataset) được dùng để huấn luyện và đánh giá các hệ thống gợi ý (Recommendation Systems) trên toàn thế giới.

Trong toàn bộ thư mục `data/ml-100k`, hệ thống của chúng ta chỉ tập trung nạp và xử lý **2 tệp dữ liệu cốt lõi** dưới đây. Các tệp tin khác (như chia sẵn train/test hay thông tin nhân khẩu học) được lược bỏ nhằm tối ưu hóa đường ống dữ liệu (Data Pipeline).

---

## 1. Tệp dữ liệu Tương tác (u.data)

Đây là tệp dữ liệu quan trọng nhất, đóng vai trò là "nguồn nhiên liệu" để huấn luyện thuật toán học máy phân tán ALS.

- **Quy mô:** 100.000 bản ghi (lượt đánh giá).
- **Phạm vi:** Dữ liệu từ 943 người dùng đánh giá trên 1.682 bộ phim. Mỗi người dùng trong tập dữ liệu này đều đã đánh giá ít nhất 20 bộ phim.
- **Cấu trúc dữ liệu:** Các trường được ngăn cách nhau bởi ký tự Tab (`\t`).
- **Các trường thông tin (Schema):**
  1. `user_id`: Mã định danh duy nhất của người dùng (từ 1 đến 943).
  2. `item_id`: Mã định danh duy nhất của bộ phim (từ 1 đến 1682).
  3. `rating`: Điểm đánh giá (từ 1 đến 5 sao).
  4. `timestamp`: Thời điểm đánh giá (tính theo Unix Timestamp).

*Ví dụ một dòng dữ liệu:* `196    242    3    881250949`
*(Người dùng số 196 đã đánh giá phim số 242 ở mức 3 sao vào thời điểm 881250949).*

---

## 2. Tệp dữ liệu Thông tin Phim (u.item)

Tệp dữ liệu này được sử dụng như một bảng tham chiếu (Lookup Table). Khi mô hình học máy đưa ra kết quả gợi ý là các con số (`item_id`), hệ thống Web sẽ dùng bảng này để dịch ngược ra tên phim thực tế để hiển thị cho người dùng.

- **Quy mô:** 1.682 bản ghi (bộ phim).
- **Cấu trúc dữ liệu:** Các trường được ngăn cách nhau bởi ký tự gạch đứng (`|`).
- **Các trường thông tin chính (Schema):**
  1. `movie_id`: Mã định danh của bộ phim (Khớp với `item_id` ở tệp `u.data`).
  2. `movie_title`: Tên bộ phim và năm phát hành.
  3. `release_date`: Ngày công chiếu.
  4. `video_release_date`: Ngày phát hành video.
  5. `IMDb_URL`: Đường dẫn thông tin phim trên trang IMDb.
  6. Các cột phía sau (từ cột số 6 trở đi): Là các biến nhị phân (0 hoặc 1) biểu thị 19 thể loại phim khác nhau (Action, Comedy, Romance...).

*Ví dụ một dòng dữ liệu:* `1|Toy Story (1995)|01-Jan-1995||http://us.imdb.com/M/title-exact?Toy%20Story%20(1995)|0|0|0|1|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0`
*(Phim số 1 là Toy Story, phát hành năm 1995, thuộc các thể loại: Hoạt hình, Trẻ em, Hài hước).*

---

## 3. Lý do loại bỏ các tệp dữ liệu khác

Để tránh việc phải xử lý các thông tin dư thừa gây quá tải RAM cho hệ thống Spark, chúng ta chủ động bỏ qua các tệp:

- `u.user` (Tuổi, giới tính, nghề nghiệp): Thuật toán **Lọc cộng tác (Collaborative Filtering)** chỉ cần dựa trên hành vi tương tác ma trận (ai chấm điểm phim nào) là đủ để tìm ra sở thích, không cần quan tâm đến đặc điểm nhân khẩu học.
- `u1.base` đến `u5.base` (Các tệp chia sẵn): Spark có sẵn cơ chế `randomSplit()` để chia tự động tập Huấn luyện (Train) và Kiểm thử (Test) trực tiếp trên RAM, do đó không cần nạp các tệp chia nhỏ có sẵn này.
