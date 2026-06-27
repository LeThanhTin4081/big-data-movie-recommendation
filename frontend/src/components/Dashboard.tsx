"use client";

import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

const GENRES = ["All", "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Western"];

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // Fetch Trending Movies (Fixed)
  useEffect(() => {
    const fetchTrending = async () => {
      setLoadingTrending(true);
      try {
        const res = await fetch(`/api/movies/trending?limit=5`);
        const data = await res.json();
        if (data.success) {
          setTrendingMovies(data.movies);
        }
      } catch (error) {
        console.error("Error fetching trending:", error);
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  // Fetch Recommended Movies (Filtered by Genre)
  useEffect(() => {
    const fetchRecommended = async () => {
      if (!user?.userId) {
        setRecommendedMovies([]);
        setLoadingRecommended(false);
        return;
      }
      
      setLoadingRecommended(true);
      try {
        let url = `/api/recommend?userId=${user.userId}`;
        if (selectedGenre !== "All") {
          url += `&genre=${encodeURIComponent(selectedGenre)}`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          // Lấy tối đa 5 phim
          setRecommendedMovies(data.recommendations.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching recommended:", error);
      } finally {
        setLoadingRecommended(false);
      }
    };
    fetchRecommended();
  }, [user, selectedGenre]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Genre Pills */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedGenre === genre
                ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700/50"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Top 5 Phim Thịnh Hành (Cố định) */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Top 5 phim thịnh hành nhất</h2>
        </div>
        
        {loadingTrending ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton aspect-[2/3] w-full max-w-[220px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trendingMovies.map((movie, index) => (
              <MovieCard key={movie.movie_id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Top 5 Phim Bạn Có Thể Thích (Filter theo Genre) */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Top 5 phim bạn có thể thích</h2>
        </div>
        
        {!user?.userId ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">Vui lòng đăng nhập để xem phim gợi ý cá nhân hóa.</p>
          </div>
        ) : loadingRecommended ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton aspect-[2/3] w-full max-w-[220px] rounded-lg" />
            ))}
          </div>
        ) : recommendedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendedMovies.map((movie, index) => (
              <MovieCard key={movie.movie_id} movie={movie} variant="recommendation" index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">Không tìm thấy phim gợi ý nào thuộc thể loại "{selectedGenre}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
