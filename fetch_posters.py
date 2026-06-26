"""
Script tải ảnh poster cho toàn bộ 1,682 bộ phim trong MovieLens 100k
Sử dụng OMDB API (nguồn ảnh từ Amazon - không bị chặn tại VN)
Kết quả lưu vào file JSON tĩnh để web đọc offline, không cần gọi API lúc chạy
"""
import json
import time
import re
import os
import requests

# Đọc danh sách phim từ u.item
ITEM_FILE = os.path.join("data", "ml-100k", "u.item")
OUTPUT_FILE = os.path.join("frontend", "public", "poster_map.json")

API_KEYS = [
    "720c3666",
    "f12ba140"
]

def clean_title(raw_title):
    """Làm sạch tên phim: bỏ năm, bỏ ký tự đặc biệt"""
    # Tách năm ra khỏi title: "Toy Story (1995)" -> "Toy Story", "1995"
    match = re.match(r'^(.*?)\s*\((\d{4})\)\s*$', raw_title)
    if match:
        return match.group(1).strip(), match.group(2)
    return raw_title.strip(), None

def fetch_poster(title, year, api_key):
    """Gọi OMDB API lấy poster URL"""
    params = {"apikey": api_key, "t": title}
    if year:
        params["y"] = year
    try:
        res = requests.get("http://www.omdbapi.com/", params=params, timeout=8)
        data = res.json()
        if data.get("Response") == "True" and data.get("Poster") and data.get("Poster") != "N/A":
            return data["Poster"]
    except Exception:
        pass
    
    # Thử lại không có năm (mở rộng tìm kiếm)
    if year:
        try:
            res = requests.get("http://www.omdbapi.com/", params={"apikey": api_key, "t": title}, timeout=8)
            data = res.json()
            if data.get("Response") == "True" and data.get("Poster") and data.get("Poster") != "N/A":
                return data["Poster"]
        except Exception:
            pass
    
    # Thử tìm bằng search (s=) thay vì exact title (t=)
    try:
        res = requests.get("http://www.omdbapi.com/", params={"apikey": api_key, "s": title, "type": "movie"}, timeout=8)
        data = res.json()
        if data.get("Response") == "True" and data.get("Search"):
            first = data["Search"][0]
            if first.get("Poster") and first["Poster"] != "N/A":
                return first["Poster"]
    except Exception:
        pass
    
    return None

def main():
    # Đọc u.item
    movies = []
    with open(ITEM_FILE, "r", encoding="latin-1") as f:
        for line in f:
            parts = line.strip().split("|")
            if len(parts) >= 2:
                movie_id = int(parts[0])
                raw_title = parts[1]
                movies.append((movie_id, raw_title))
    
    print(f"Đã đọc {len(movies)} bộ phim từ u.item")
    
    # Load kết quả cũ nếu có (để tiếp tục nếu bị ngắt giữa chừng)
    poster_map = {}
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            poster_map = json.load(f)
        print(f"Đã load {len(poster_map)} poster từ lần chạy trước")
    
    key_index = 0
    success = 0
    fail = 0
    skipped = 0
    failed_titles = []
    
    for i, (movie_id, raw_title) in enumerate(movies):
        # Bỏ qua nếu đã có poster rồi
        if str(movie_id) in poster_map:
            skipped += 1
            continue
        
        title, year = clean_title(raw_title)
        api_key = API_KEYS[key_index % len(API_KEYS)]
        
        poster_url = fetch_poster(title, year, api_key)
        
        if poster_url:
            poster_map[str(movie_id)] = poster_url
            success += 1
            status = "OK"
        else:
            failed_titles.append(f"  ID={movie_id}: {raw_title}")
            fail += 1
            status = "MISS"
        
        # In tiến trình
        total_done = success + fail + skipped
        print(f"[{total_done}/{len(movies)}] {status} | {raw_title}")
        
        # Luân phiên API key mỗi request
        key_index += 1
        
        # Nghỉ 0.2 giây giữa mỗi request tránh bị rate limit
        time.sleep(0.2)
        
        # Lưu tiến trình mỗi 50 phim
        if (success + fail) % 50 == 0:
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(poster_map, f, ensure_ascii=False, indent=2)
            print(f"  -> Đã lưu tiến trình ({len(poster_map)} posters)")
    
    # Lưu kết quả cuối cùng
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(poster_map, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"HOÀN TẤT!")
    print(f"  Thành công : {success + skipped} / {len(movies)}")
    print(f"  Thất bại   : {fail}")
    print(f"  File lưu   : {OUTPUT_FILE}")
    print(f"{'='*60}")
    
    if failed_titles:
        print(f"\nDanh sách {fail} phim không tìm được poster:")
        for t in failed_titles:
            print(t)

if __name__ == "__main__":
    main()
