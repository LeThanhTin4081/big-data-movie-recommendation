export interface Movie {
  movie_id: number;
  title: string;
  title_vn?: string;
  year: string;
  genres: string[];
  rating: number;
  num_ratings: number;
  poster_url: string;
  backdrop_url?: string;
  description?: string;
  duration?: string;
  quality?: string;
}

export interface Recommendation {
  movie_id: number;
  title: string;
  predicted_rating: number;
  genres: string[];
  poster_url: string;
}
