# Kế hoạch Huấn luyện Mô hình AI (Machine Learning)

Phase tiếp theo (Ngày 4 & 5) là linh hồn của toàn bộ đồ án: **Xây dựng Hệ thống Gợi ý Phim bằng Trí tuệ nhân tạo**.

## 1. Mục tiêu cốt lõi
- Xây dựng mô hình học máy bằng thuật toán **ALS (Alternating Least Squares)** của thư viện Spark MLlib (chuẩn công nghiệp cho Collaborative Filtering).
- Tính toán sai số **RMSE (Root Mean Square Error)** để đánh giá độ chính xác của AI.
- Dùng AI dự đoán và xuất ra danh sách **Top 10 phim gợi ý cho TẤT CẢ khách hàng**.
- Lưu danh sách gợi ý ra định dạng Parquet để chuẩn bị đẩy lên MongoDB cho Giao diện Web.

## 2. Hình thức triển khai
- Giống như phần Data, chúng ta sẽ viết code trên **Jupyter Notebook (`train_als_notebook.ipynb`)** để bạn có thể chạy từng ô, nhìn thấy AI học như thế nào, sai số là bao nhiêu và tận mắt xem AI gợi ý phim gì cho khách hàng.

> [!IMPORTANT]
> **User Review Required:**
> Bạn có muốn tiếp tục áp dụng cách làm cũ (tôi chia code ra thành từng Ô (Cell) để bạn tự copy dán vào Jupyter Notebook và bấm chạy) không? 
> Nếu bạn đồng ý, tôi sẽ bắt tay vào viết Code AI ngay lập tức!

## 3. Các bước thực hiện (Cells trong Notebook)
1. **Khởi tạo và Nạp dữ liệu:** Nạp 2 file Parquet mà bạn vừa tạo thành công ở phần trước.
2. **Tiền xử lý ML:** Chia dữ liệu thành 2 tập (80% để Train - dạy AI học, 20% để Test - làm bài kiểm tra).
3. **Huấn luyện Mô hình:** Chạy thuật toán ALS.
4. **Đánh giá AI (RMSE):** Chấm điểm xem AI dự đoán lệch bao nhiêu sao (Stars).
5. **Dự đoán toàn hệ thống:** Yêu cầu AI nhả ra 10 bộ phim hay nhất cho từng user trong tổng số 943 users.
6. **Lưu kết quả:** Xuất file `user_recommendations.parquet` vào thư mục `data/`.

## 4. Kế hoạch kiểm thử (Verification Plan)
- Đảm bảo điểm số RMSE dao động quanh mức **0.9** (nghĩa là AI dự đoán chỉ lệch chưa tới 1 sao so với điểm thật, đây là mức điểm rất đẹp cho đồ án sinh viên).
- Đảm bảo thư mục `data/user_recommendations.parquet` được tạo ra thành công.
