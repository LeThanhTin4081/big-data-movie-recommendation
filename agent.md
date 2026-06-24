# Quy tắc Viết Code (Agent Code Rules)

Khi viết hoặc sinh mã nguồn (code) cho dự án này, AI Agent và các thành viên phải tuân thủ nghiêm ngặt các quy tắc sau:

1. **Chuẩn logic:** Code phải được thiết kế theo cấu trúc module, logic rõ ràng, tối ưu về mặt hiệu năng.
2. **Ghi chú từng hàm:** Mỗi hàm (function) hoặc class đều phải có comment mô tả mục đích đầu vào và đầu ra bằng ký tự `#`.
3. **Không sử dụng Icon:** TUYỆT ĐỐI KHÔNG chèn các biểu tượng cảm xúc (emoji/icons) vào trong mã nguồn hoặc comment.
4. **Tối giản (Minimalist):** Mã nguồn phải sạch sẽ, tinh gọn. Sử dụng ghi chú ngắn gọn bằng dấu `#` trên đầu mỗi hàm. TUYỆT ĐỐI KHÔNG sử dụng các dải phân cách cồng kềnh như `# ========` HAY `"---------"` để tránh làm rối mắt, đặc biệt là trong môi trường Jupyter Notebook.

**Ví dụ chuẩn:**

# Hàm xử lý làm sạch dữ liệu
def clean_movie_data(df):
    # Xóa các dòng có giá trị null
    cleaned_df = df.dropna()
    return cleaned_df
