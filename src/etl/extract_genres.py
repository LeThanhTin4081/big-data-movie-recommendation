import pandas as pd
import json

def process_genres():
    # 19 genres defined in u.genre
    genre_names = [
        "Unknown", "Action", "Adventure", "Animation", "Children's", 
        "Comedy", "Crime", "Documentary", "Drama", "Fantasy", 
        "Film-Noir", "Horror", "Musical", "Mystery", "Romance", 
        "Sci-Fi", "Thriller", "War", "Western"
    ]
    
    # Define columns for u.item
    columns = ["movie_id", "movie_title", "release_date", "video_release_date", "imdb_url"] + genre_names
    
    # Read u.item
    df = pd.read_csv("../../data/ml-100k/u.item", sep="|", encoding="ISO-8859-1", names=columns, header=None)
    
    # Convert 1-hot encoding to list of genres
    def get_genres(row):
        genres = []
        for genre in genre_names:
            if row[genre] == 1:
                genres.append(genre)
        if len(genres) == 0:
            genres.append("Unknown")
        return genres

    df["genres"] = df.apply(get_genres, axis=1)
    
    # Keep only necessary columns
    df_clean = df[["movie_id", "movie_title", "genres"]]
    
    # Save to parquet
    df_clean.to_parquet("../../data/processed_items.parquet", index=False)
    print("Đã cập nhật file processed_items.parquet với dữ liệu thể loại (genres) thật!")
    
    # Also we should update the original clean_data_notebook but since it fails encoding, we just leave it for now, 
    # the processed_items.parquet is updated.

if __name__ == "__main__":
    process_genres()
