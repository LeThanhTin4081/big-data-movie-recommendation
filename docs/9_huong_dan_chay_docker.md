# 🐳 Cẩm Nang Sử Dụng Docker Dành Cho Nhóm Data/AI

> Tài liệu này tổng hợp tất cả các câu lệnh "sống còn" để thao tác với môi trường Apache Spark & Jupyter bằng Docker trong suốt quá trình làm đồ án. Bạn chỉ cần copy và dán vào Terminal là chạy mượt mà.

---

## 1. Đầu ngày làm việc (Khởi động dự án)
Mỗi khi bạn mở máy tính lên và muốn code đồ án, việc đầu tiên là phải "đánh thức" con quái vật Docker dậy.

Mở Terminal của VS Code và gõ:
```bash
docker-compose up -d
```
*(Chữ `-d` viết tắt của "detached", giúp Docker chạy ngầm bên dưới mà không làm kẹt Terminal của bạn).*

---

## 2. Truy cập Môi trường Code (Jupyter Lab)
Sau khi bật Docker xong, bạn không cần gõ lệnh gì thêm, cứ mở trình duyệt web (Chrome/Edge) và truy cập vào địa chỉ:
👉 **http://localhost:8888**

Tại giao diện Web này, bạn có thể bấm **Run (▶️)** để chạy các file Notebook (có đuôi `.ipynb`) cực kỳ trực quan:
*   🧹 **ETL:** Chạy file `clean_data_notebook.ipynb`
*   📊 **EDA:** Chạy file `eda_notebook.ipynb`
*   🤖 **AI/ML:** Chạy file `train_als_notebook.ipynb`

---

## 3. Chạy Code bằng lệnh Terminal (Dành cho Pro)
Nếu bạn lười mở web và thích phong cách "như hacker", bạn có thể ép Docker chạy thẳng các file Python (`.py`) từ cửa sổ Terminal của VS Code.

**Cú pháp chung:** 
`docker exec -it movie_spark_env python work/<đường-dẫn-file>`

**Ví dụ chạy các file (Nếu bạn xài file .py):**
```bash
# Chạy Làm sạch dữ liệu (Clean)
docker exec -it movie_spark_env python work/src/etl/clean_data.py

# Chạy Khai phá dữ liệu (EDA)
docker exec -it movie_spark_env python work/src/etl/eda.py

# Chạy Máy học (Machine Learning)
docker exec -it movie_spark_env python work/src/ml/train_als.py
```

---

## 4. Cuối ngày làm việc (Tắt máy nghỉ ngơi)
Khi đã code xong, lưu file xong và chuẩn bị đi ngủ, tuyệt đối không được để Docker chạy qua đêm vì nó sẽ ngốn rất nhiều RAM của máy tính.

Tắt toàn bộ máy ảo bằng lệnh:
```bash
docker-compose down
```

---
> 💡 **Mẹo:** Gõ xong lệnh số (4) thì hãy nhớ dùng `git add .`, `git commit` và `git push` để đẩy thành quả của cả ngày lên GitHub nhé!
