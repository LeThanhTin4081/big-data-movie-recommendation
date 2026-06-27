import json
import re
import requests
import time

OMDB_KEYS = ["thewdb"]
current_key_idx = 0

def get_omdb_key():
    return OMDB_KEYS[current_key_idx]

def rotate_key():
    pass

def clean_title(raw_title):
    year_match = re.search(r'\((\d{4})\)', raw_title)
    year = year_match.group(1) if year_match else ""
    title = re.sub(r'\(\d{4}\)', '', raw_title).strip()
    title = re.sub(r'\(.*?\)', '', title).strip()
    if title.endswith(', The'): title = 'The ' + title[:-5]
    elif title.endswith(', A'): title = 'A ' + title[:-3]
    elif title.endswith(', An'): title = 'An ' + title[:-4]
    elif title.endswith(', Il'): title = 'Il ' + title[:-4]
    elif title.endswith(', Le'): title = 'Le ' + title[:-4]
    elif title.endswith(', La'): title = 'La ' + title[:-4]
    return title.strip(), year

movies = {}
with open('data/ml-100k/u.item', 'r', encoding='latin-1') as f:
    for line in f:
        parts = line.strip().split('|')
        if len(parts) > 1:
            movies[parts[0]] = parts[1]

map_path = 'frontend/public/poster_map.json'
with open(map_path, 'r', encoding='utf-8') as f:
    posters = json.load(f)

missing = [(mid, title) for mid, title in movies.items() if mid not in posters]
print(f"Bắt đầu tìm {len(missing)} phim còn thiếu bằng Search API...")

added_count = 0

for mid, raw_title in missing:
    title, year = clean_title(raw_title)
    success = False
    
    url = f"http://www.omdbapi.com/?s={requests.utils.quote(title)}&y={year}&apikey=thewdb"
    try:
        resp = requests.get(url, timeout=5)
        data = resp.json()
        
        if data.get("Response") == "True" and "Search" in data:
            for item in data["Search"]:
                if item.get("Type") == "movie" and item.get("Poster") and item.get("Poster") != "N/A":
                    poster_url = item["Poster"]
                    head_resp = requests.head(poster_url, timeout=5)
                    if head_resp.status_code == 200:
                        posters[mid] = poster_url
                        added_count += 1
                        print(f"OK | {title} ({year}) -> {poster_url}")
                        success = True
                        break
    except Exception as e:
        pass
            
    if not success:
        print(f"MISS | {title} ({year})")
        
    time.sleep(0.1)

with open(map_path, 'w', encoding='utf-8') as f:
    json.dump(posters, f, indent=2, ensure_ascii=False)

print(f"\nHoàn tất! Đã tìm và thêm thành công {added_count} ảnh sống.")
