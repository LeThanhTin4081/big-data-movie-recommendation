# Quy tắc Viết Code (Agent Code Rules)

Khi viết hoặc sinh mã nguồn (code) cho dự án này, AI Agent và các thành viên phải tuân thủ nghiêm ngặt các quy tắc sau:

1. **Chuẩn logic:** Code phải được thiết kế theo cấu trúc module, logic rõ ràng, tối ưu về mặt hiệu năng.
2. **Ghi chú từng hàm:** Mỗi hàm (function) hoặc class đều phải có comment mô tả mục đích đầu vào và đầu ra bằng ký tự `#`.
3. **Không sử dụng Icon:** TUYỆT ĐỐI KHÔNG chèn các biểu tượng cảm xúc (emoji/icons) vào trong mã nguồn hoặc comment.
4. **Phân cách rõ ràng:** Sử dụng dải dấu `#` và `=` để phân cách giữa các hàm hoặc các phần logic lớn trong file code, giúp dễ nhìn và dễ bảo trì. 

**Ví dụ chuẩn:**

# ==============================================================================
# HÀM XỬ LÝ LÀM SẠCH DỮ LIỆU
# ==============================================================================
def clean_movie_data(df):
    # Xóa các dòng có giá trị null
    cleaned_df = df.dropna()
    return cleaned_df
