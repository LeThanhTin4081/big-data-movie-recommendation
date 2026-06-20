# Cẩm nang sử dụng Git cho Nhóm 4 Người (Dự án Big Data)

> [!TIP]
> **Lệnh chuyển về nhánh main:** Để chuyển từ nhánh hiện tại (ví dụ: `tin`) về lại nhánh `main`, bạn chỉ cần copy và dán lệnh sau vào Terminal:
> ```bash
> git checkout main
> ```

---

## 1. Quy trình làm việc nhóm chuẩn (Daily Workflow)
Khi làm việc nhóm, để tránh việc code của người này đè lên người kia, các bạn hãy tuân thủ quy trình 5 bước sau:

### Bước 1: Lấy code mới nhất của cả nhóm về máy
*(Làm việc này mỗi ngày trước khi bắt đầu code)*
```bash
git checkout main
git pull origin main
```

### Bước 2: Tạo nhánh riêng và làm việc trên đó
Ví dụ bạn Tin phụ trách code luồng ETL:
```bash
git checkout -b tin
```
*(Nếu nhánh `tin` đã tồn tại, chỉ cần gõ `git checkout tin` - bỏ chữ `-b` đi)*

### Bước 3: Lưu lại các thay đổi sau khi code xong
```bash
git status       # Xem các file đã thay đổi (màu đỏ là chưa thêm, màu xanh là đã thêm)
git add .        # Đưa TẤT CẢ thay đổi vào danh sách chuẩn bị lưu (để ý dấu chấm)
git commit -m "Đã hoàn thành luồng ETL làm sạch dữ liệu"  # Chốt lưu kèm lời nhắn
```

### Bước 4: Đẩy nhánh của bạn lên GitHub
```bash
git push -u origin tin
```

### Bước 5: Gộp code (Merge) vào nhánh chính
Sau khi nhóm review code của bạn Tin thấy ổn, nhóm trưởng sẽ gộp code vào `main` để cả nhóm dùng chung:
```bash
git checkout main
git merge tin
git push origin main
```

---

## 2. Các câu lệnh cứu nguy (Troubleshooting)

*   **Lỡ tay sửa hỏng code và muốn quay về trạng thái lúc vừa tải về (Xóa mọi thay đổi chưa commit):**
    ```bash
    git checkout .
    ```
    > [!WARNING]
    > Hãy cẩn thận, lệnh này sẽ xóa vĩnh viễn các đoạn code bạn vừa gõ mà chưa kịp `git commit`.

*   **Muốn xem lại lịch sử ai đã lưu (commit) lúc nào:**
    ```bash
    git log --oneline
    ```

*   **Lỡ gõ `git add .` nhưng muốn rút lại một file cụ thể (vì file đó quá nặng hoặc là dữ liệu mật):**
    ```bash
    git reset HEAD <tên-file>
    ```
