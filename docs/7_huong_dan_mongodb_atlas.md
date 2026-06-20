# Hướng Dẫn Khởi Tạo MongoDB Atlas (Miễn Phí) Cho Làm Việc Nhóm

> [!NOTE]
> Chỉ cần **1 NGƯỜI DUY NHẤT** trong nhóm làm các bước này (Nên giao cho **Thành viên 2** - phụ trách NoSQL/Web). Sau khi làm xong, chỉ cần gửi chuỗi kết nối cho các bạn khác là xong.

---

## Bước 1: Đăng ký tài khoản
1. Truy cập vào trang chủ: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Bấm **"Sign Up with Google"** để tạo tài khoản nhanh bằng Gmail.
3. Khi nó hỏi vài câu khảo sát mục đích dùng, cứ chọn "Learn MongoDB" hoặc "Build a new application".

## Bước 2: Tạo Cụm Database (Cluster)
1. Ở giao diện chính, chọn nút **"Build a Database"** (hoặc "Create").
2. **CỰC KỲ QUAN TRỌNG:** Chọn gói **M0 FREE** (Gói miễn phí vĩnh viễn, không cần nhập thẻ Visa). Đừng lỡ tay bấm gói có phí nha!
3. Chọn Provider là **AWS** hoặc **Google Cloud**, khu vực (Region) thì chọn **Singapore** (ap-southeast-1) cho mạng nó tải về Việt Nam cho nhanh.
4. Đặt tên Cụm ở ô *Cluster Name* (Ví dụ: `BigDataCluster`) rồi bấm **Create**.

## Bước 3: Cài đặt Bảo mật (Database Access & Network)
*Đây là bước để cho phép các máy tính của nhóm bạn được quyền kết nối vào.*

**A. Tạo tài khoản truy cập Database:**
1. Nó sẽ hiện ra bảng Quickstart, tạo User.
2. Nhập **Username** (ví dụ: `admin`) và **Password** (ví dụ: `pass123456`). 
3. *Lưu ý: Mật khẩu này là để code chọc vào DB, không phải mật khẩu nick MongoDB của bạn. Nhớ lưu lại pass này ra Notepad.* Bấm **Create User**.

**B. Cấu hình Mạng (Network Access):**
1. Ở phần "Where would you like to connect from?", chọn **My Local Environment**.
2. Ở ô IP Address, nhập vào `0.0.0.0/0` (Nghĩa là cho phép MỌI mạng wifi đều có thể kết nối vào). Bấm **Add Entry**. 
*(Mặc định nó chỉ cho IP nhà bạn vào, khi lên trường demo dùng wifi trường sẽ bị chặn. Nên để `0.0.0.0/0` là tốt nhất cho làm nhóm).*
3. Bấm **Finish and Close**.

## Bước 4: Lấy Chuỗi Kết Nối (Connection String)
1. Ở giao diện chính của Cluster vừa tạo, bấm nút **Connect**.
2. Chọn **Drivers** (vì mình sẽ dùng Python kết nối).
3. Bước 1 chọn Python, Version 3.6 or later.
4. Bước 3 bạn sẽ thấy một cái đoạn mã giống thế này:
   `mongodb+srv://admin:<password>@bigdatacluster.xxxx.mongodb.net/?retryWrites=true&w=majority`
5. Bấm nút **Copy** để sao chép đoạn mã này.

## Bước 5: Cập nhật vào file .env cho toàn nhóm
1. Quay lại VS Code, mở file `.env` lên.
2. Dán đoạn mã vừa Copy vào biến `MONGO_URI`.
3. Nhớ thay chữ `<password>` trong đường link thành cái Mật khẩu `pass123456` mà bạn đã tạo ở Bước 3. (Lưu ý: Xóa luôn cả 2 dấu ngoặc `< >` đi nhé).

**Ví dụ một file `.env` chuẩn:**
```env
MONGO_URI=mongodb+srv://admin:pass123456@bigdatacluster.xxxx.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=movie_recommendation_db
MONGO_COLLECTION_NAME=user_recommendations
```

🎉 **XONG!** Bây giờ bạn chỉ việc gửi cái nội dung file `.env` chuẩn kia cho 3 người còn lại trong nhóm là hệ thống cơ sở dữ liệu đã thông suốt!
