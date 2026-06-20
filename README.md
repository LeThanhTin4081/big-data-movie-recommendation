# 🍿 Hệ Thống Gợi Ý Phim Quy Mô Lớn (Big Data)

Chào mừng đến với kho lưu trữ (Repository) mã nguồn mở của dự án **Thiết kế và Triển khai Hệ thống Gợi ý Phim Quy mô lớn**. Dự án áp dụng kiến trúc chuẩn của Dữ liệu lớn (Big Data) bao gồm **Apache Spark** (Xử lý phân tán) và **MongoDB** (Lớp lưu trữ NoSQL tốc độ cao).

## 📂 Cấu Trúc Thư Mục Chuẩn

Dự án được phân chia thành các module độc lập giúp các thành viên dễ dàng code và quản lý:

```text
bigdata_project/
├── data/               # Thư mục chứa dữ liệu thô (Dataset). Đã được .gitignore để không đẩy file nặng lên Github.
├── docs/               # Thư mục chứa tài liệu: Kế hoạch, báo cáo Word, cấu trúc Slide.
│   ├── 1_week_team_plan.md
│   ├── project_proposal.md
│   ├── report_structure.md
│   └── slide_presentation.md
├── src/                # Mã nguồn chính của dự án (Source code)
│   ├── etl/            # Chứa script nạp dữ liệu và làm sạch bằng Spark SQL.
│   ├── ml/             # Chứa script huấn luyện thuật toán ALS phân tán (Spark MLlib).
│   ├── nosql/          # Chứa script đồng bộ kết quả ma trận từ Spark sang MongoDB.
│   └── web/            # Chứa mã nguồn giao diện Gradio/Streamlit tương tác trực tiếp NoSQL.
├── .gitignore          # File cấu hình Git để ẩn các file không cần thiết (cache, log, data).
└── README.md           # File tổng quan bạn đang đọc.
```

## 🚀 Kiến trúc Hệ thống
1. **Luồng tính toán ẩn (Offline):** Dữ liệu thô $\rightarrow$ `src/etl` (Làm sạch) $\rightarrow$ `src/ml` (Chạy AI/ALS).
2. **Luồng phục vụ (Online):** Kết quả AI $\rightarrow$ `src/nosql` (Lưu trữ) $\rightarrow$ `src/web` (Giao diện siêu tốc).

## 👥 Phân Công Công Việc
Xem chi tiết tại: [Kế hoạch 1 Tuần](docs/1_week_team_plan.md).
