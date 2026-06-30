# 🍿 Hệ Thống Gợi Ý Phim Quy Mô Lớn (Big Data)

Chào mừng đến với kho lưu trữ (Repository) mã nguồn mở của dự án **Thiết kế và Triển khai Hệ thống Gợi ý Phim Quy mô lớn**. Dự án áp dụng kiến trúc chuẩn của Dữ liệu lớn (Big Data) bao gồm **Apache Spark** (Xử lý phân tán) và **MongoDB** (Lớp lưu trữ MongoDB tốc độ cao).


## 🚀 Kiến trúc Hệ thống
1. **Luồng tính toán ẩn (Offline):** Dữ liệu thô $\rightarrow$ `src/etl` (Làm sạch) $\rightarrow$ `src/ml` (Chạy AI/ALS).
2. **Luồng phục vụ (Online):** Kết quả AI $\rightarrow$ `src/nosql` (Lưu trữ) $\rightarrow$ `src/web` (Giao diện siêu tốc).

## 👥 Phân Công Công Việc
Xem chi tiết tại: [Kế hoạch 1 Tuần](docs/1_ke_hoach_nhom_1_tuan.md).....

---

## ⚠️ Hướng Dẫn Cho Các Thành Viên (Quan Trọng!)

> [!WARNING]
> **KHÔNG BAO GIỜ PUSH DATA LÊN GITHUB!**
> Đây là dự án Big Data, dữ liệu có thể từ vài MB đến hàng chục GB. Việc nhồi nhét cục data lên GitHub sẽ làm "nổ" dung lượng kho lưu trữ, gây lỗi kẹt mạng và cho thấy sự thiếu chuyên nghiệp. Thư mục `data/` đã được cấu hình ẩn đi trong `.gitignore`.

### Cần làm gì khi Pull / Clone code về máy?

Vì Git không chứa data và mật khẩu bảo mật, nên khi bạn tải code về máy tính cá nhân, bạn phải thực hiện **2 bước bắt buộc** dưới đây:

#### BƯỚC 1: Cấu hình biến môi trường (.env)
1. Copy file `.env.example` và đổi tên bản sao thành `.env` (chỉ có dấu chấm và chữ env).
2. Mở file `.env` lên và điền chuỗi kết nối MongoDB thật (do nhóm trưởng cung cấp) vào biến `MONGO_URI`.

#### BƯỚC 2: Tải dữ liệu MovieLens (ml-100k)
Mở Terminal (PowerShell) trực tiếp tại thư mục gốc của dự án và chạy lần lượt các lệnh sau:

```powershell
# 1. Tạo thư mục data và chui vào đó
mkdir data
cd data

# 2. Tải Dataset về máy
Invoke-WebRequest -Uri "https://files.grouplens.org/datasets/movielens/ml-100k.zip" -OutFile "ml-100k.zip"

# 3. Giải nén Dataset
Expand-Archive -Path "ml-100k.zip" -DestinationPath "." -Force

# 4. Dọn dẹp thùng rác (Xóa file zip cho nhẹ máy)
Remove-Item -Path "ml-100k.zip" -Force
```

Sau khi chạy xong, bạn sẽ thấy thư mục `data/ml-100k` xuất hiện đầy đủ trên máy bạn (gồm file `u.data` và `u.item`). Lúc này bạn có thể bắt tay vào code phần Spark ETL được rồi!

## 📂 Cấu Trúc Thư Mục Chuẩn

Dự án được phân chia thành các module độc lập giúp các thành viên dễ dàng code và quản lý:

```text
bigdata_project/
├── data/               # Thư mục chứa dữ liệu thô (Dataset). Đã được .gitignore chặn để không đẩy lên Github.
├── docs/               # Thư mục chứa tài liệu: Kế hoạch, báo cáo Word, cấu trúc Slide, cẩm nang Git.
│   ├── 1_ke_hoach_nhom_1_tuan.md
│   ├── 2_gioi_thieu_du_lieu.md
│   ├── 3_cam_nang_git.md
│   ├── 4_tong_quan_de_tai.md
│   ├── 5_cau_truc_bao_cao.md
│   └── 6_cau_truc_slide.md
├── frontend/           # Mã nguồn giao diện Web Demo (Next.js, Tailwind CSS)
├── src/                # Mã nguồn chính của luồng Big Data (Source code)
│   ├── etl/            # Chứa script nạp dữ liệu và làm sạch bằng Spark SQL.
│   ├── ml/             # Chứa script huấn luyện thuật toán ALS phân tán (Spark MLlib).
│   └── nosql/          # Chứa script đồng bộ kết quả ma trận từ Spark sang MongoDB.
├── .env.example        # File mẫu chứa cấu hình biến môi trường (Ví dụ: Link kết nối DB).
├── docker-compose.yml  # File cấu hình Docker để chạy môi trường Spark và Web.
├── .gitignore          # File cấu hình Git để ẩn các file không cần thiết (cache, log, data).
└── README.md           # File tổng quan bạn đang đọc.
```