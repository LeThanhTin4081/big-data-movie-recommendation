# Cẩm Nang Git - Các Lệnh Cơ Bản và Nâng Cao Dành Cho Team

## 1. Các lệnh Git Cơ Bản (Ai cũng phải biết)
*   **Tải toàn bộ code từ GitHub về máy tính mới:** `git clone <link-repo>`
*   **Cập nhật code mới nhất từ kho chung về máy:** `git pull origin main`
*   **Kiểm tra trạng thái các file:** `git status` (Xem file nào bị thay đổi màu đỏ/xanh).
*   **Thêm file vào danh sách lưu:** `git add .` (Dấu `.` nghĩa là thêm tất cả).
*   **Lưu lại (Commit) kèm lời nhắn:** `git commit -m "Lời nhắn của bạn"`
*   **Đẩy code lên GitHub:** `git push origin <tên-nhánh>`

## 2. Quy Trình Làm Việc Nhóm (Không lo bị đè code)
**Bước 1:** Tải code mới nhất về trước khi code:
```bash
git checkout main
git pull origin main
```
**Bước 2:** Tạo nhánh riêng cho tính năng bạn đang làm:
```bash
git checkout -b <tên-của-bạn-hoặc-tên-tính-năng> 
# Ví dụ: git checkout -b tin_lam_etl
```
**Bước 3:** Code, test, và lưu thay đổi:
```bash
git add .
git commit -m "Hoàn thành phần ETL làm sạch dữ liệu"
```
**Bước 4:** Đẩy nhánh của bạn lên GitHub:
```bash
git push -u origin <tên-nhánh-của-bạn>
```

## 3. Quy Trình Gộp Code (Merge) dành cho Nhóm Trưởng
Sau khi một thành viên code xong và đẩy nhánh lên, nhóm trưởng sẽ gộp nhánh đó vào nhánh `main`:
```bash
git checkout main          # Về nhánh chính
git pull origin main       # Lấy bản mới nhất phòng hờ
git merge <tên-nhánh-phụ>  # Gộp nhánh phụ vào nhánh chính
git push origin main       # Đẩy nhánh chính đã gộp lên GitHub
```

## 4. Các Lệnh Cứu Nguy (Troubleshooting)
*   **Lỡ tay sửa bậy, muốn xóa sạch để quay lại từ đầu (Chưa commit):** `git checkout .`
*   **Xem lịch sử ai đã lưu cái gì:** `git log --oneline`
*   **Đã `git add .` nhưng muốn rút lại:** `git reset HEAD`
*   **Chuyển qua lại giữa các nhánh:** `git checkout <tên-nhánh>`
