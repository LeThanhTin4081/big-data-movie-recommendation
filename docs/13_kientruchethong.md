# KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

Dưới đây là sơ đồ kiến trúc hệ thống trực quan và chi tiết phân tích từng khối của dự án. Hệ thống hoạt động theo mô hình **Batch Processing Pipeline (Xử lý theo lô)** đối với phần AI, kết hợp với **Web Application (Ứng dụng trực tuyến)** đối với phần giao diện người dùng.

## Sơ Đồ Luồng Hoạt Động (Flowchart)

*Bạn có thể copy đoạn code sinh ra sơ đồ này dán thẳng vào Draw.io (chọn mục Thêm > Nâng cao > Mermaid) để nó tự động vẽ ra luôn nhé!*

```mermaid
graph TD
    %% Định nghĩa các Style màu sắc
    classDef source fill:#f9f,stroke:#333,stroke-width:2px;
    classDef spark fill:#f96,stroke:#333,stroke-width:2px;
    classDef mongo fill:#9f9,stroke:#333,stroke-width:2px;
    classDef web fill:#6cf,stroke:#333,stroke-width:2px;

    %% Khối 1: Data Source
    subgraph Khối 1: Data Source
        A1[(u.data - Lịch sử Rating)]:::source
        A2[(u.item - Thông tin Phim)]:::source
    end

    %% Khối 2: Apache Spark
    subgraph Khối 2: Xử lý & Phân tích Dữ liệu (Apache Spark)
        B1(Data Cleaning & Xử lý Null/Trùng lặp):::spark
        B2(Lưu ra định dạng Parquet):::spark
        B3(EDA - Trực quan hóa dữ liệu):::spark
        B4(Model Training - ALS & Grid Search):::spark
        B5(Lưu kết quả Gợi ý ra Parquet):::spark
    end

    %% Khối 3: MongoDB
    subgraph Khối 3: Lưu trữ & Phân phối (MongoDB Atlas)
        C1{ETL Loader - Python Script}:::mongo
        C2[(Collection: movies)]:::mongo
        C3[(Collection: user_recommendations)]:::mongo
        C4[(Collection: users)]:::mongo
    end

    %% Khối 4: Web App
    subgraph Khối 4: Ứng dụng người dùng (Next.js)
        D1(Backend API: /api/recommend):::web
        D2(Backend API: /api/auth):::web
        D3([Frontend UI: Giao diện Web]):::web
    end

    %% Các luồng đi (Arrows)
    A1 -->|Đọc file CSV| B1
    A2 -->|Đọc file CSV| B1
    
    B1 --> B2
    B2 -->|Đọc file sạch| B3
    B2 -->|Đọc file sạch| B4
    B4 -->|Tạo Top 10 Phim| B5
    
    B5 -->|Đọc file Parquet kết quả| C1
    A2 -.->|Đọc file Phim gốc| C1
    
    C1 -->|Insert JSON| C2
    C1 -->|Insert Embedded JSON| C3
    
    D3 -->|Gửi User ID| D1
    D3 -->|Login/Đăng ký| D2
    
    D1 -->|Truy vấn O1 siêu tốc| C3
    D2 -->|Xác thực Hash Password| C4
    
    C3 -->|Trả về JSON Top 10 Phim| D1
    D1 -->|Render ra Màn hình| D3
```

---

## Phân tích Chi tiết 4 Khối (Modules)

### 1. Khối Dữ liệu nguồn (Data Source)
*Đây là nơi xuất phát của dữ liệu thô ban đầu.*
- **Đầu vào:** Tập dữ liệu MovieLens 100K dạng file Text/CSV (`u.data` chứa lịch sử rating, `u.item` chứa thông tin bộ phim).
- **Lưu trữ:** Local File System (Thư mục `/data` trên máy tính).

### 2. Khối Xử lý & Phân tích Dữ liệu (Data Processing & ML - Apache Spark)
*Đây là "bộ não" tính toán nặng (Heavy Lifting) của hệ thống. Chạy ngầm (Offline) định kỳ để tạo ra dữ liệu thông minh.*
- **Công nghệ lõi:** Apache Spark (PySpark), Spark SQL, Spark MLlib.
- **Tiểu module 2.1 - Làm sạch (Data Cleaning):** Đọc file thô -> Định nghĩa Schema -> Drop Null -> Drop Duplicates -> Lưu ra định dạng nén cột **Parquet**.
- **Tiểu module 2.2 - Khám phá (EDA):** Đọc file Parquet -> Phân tích thống kê -> Vẽ biểu đồ trực quan hóa (Matplotlib/Seaborn).
- **Tiểu module 2.3 - Huấn luyện mô hình (Model ALS Training):**
  - **Input:** File Rating Parquet sạch.
  - **Xử lý:** Thuật toán ALS (Alternating Least Squares) + Grid Search (Tuning tham số Rank, maxIter, RegParam).
  - **Output:** Suy luận và dự đoán Top 10 phim xuất sắc nhất cho toàn bộ 943 User -> Ghi đè kết quả ra file **Parquet**.

### 3. Khối Lưu trữ & Phân phối (Serving Layer - MongoDB)
*Làm cầu nối trung gian lưu trữ kết quả tính toán của AI để phục vụ Ứng dụng Web truy vấn tốc độ cao.*
- **Công nghệ lõi:** MongoDB Atlas (Cloud NoSQL Database).
- **Tiểu module 3.1 - ETL Loader (`mongo_loader.py`):** Script Python đọc file Parquet (chứa kết quả dự đoán của ML) -> Join với bảng dữ liệu phim -> Biến đổi thành JSON lồng nhau (Embedded Document) -> Đẩy lên Cloud MongoDB.
- **Tiểu module 3.2 - Database Collections:** 
  - `movies`: Danh mục thông tin phim.
  - `user_recommendations`: Chứa mảng 10 phim gợi ý đã được tính toán sẵn (Pre-calculated) cho từng user cụ thể.
  - `users`: Quản lý tài khoản đăng nhập web.

### 4. Khối Ứng dụng người dùng (Web Application)
*Đây là phần tương tác trực tiếp với End-User theo thời gian thực (Online).*
- **Công nghệ lõi:** Next.js (React), Tailwind CSS, NextAuth.
- **Tiểu module 4.1 - Backend API (Next.js Route Handlers):**
  - `/api/auth`: Xử lý đăng nhập, mã hóa mật khẩu, cấp phiên (Session).
  - `/api/recommend`: Nhận User ID từ Client -> Truy vấn Index trực tiếp vào MongoDB lấy Document từ `user_recommendations` -> Trả kết quả JSON về với tốc độ cực nhanh (< 100ms).
- **Tiểu module 4.2 - Frontend UI (Giao diện):**
  - Trang Đăng nhập (Login).
  - Trang chủ (Dashboard) render danh sách Poster phim siêu mượt.
