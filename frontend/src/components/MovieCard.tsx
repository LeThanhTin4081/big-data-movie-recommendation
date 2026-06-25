"use client";

// MOVIE CARD COMPONENT - VỚI ẢNH POSTER THẬT
// Hiển thị poster phim từ TMDB, có hiệu ứng hover đẹp
// Fallback gradient đẹp khi ảnh không load được

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie, Recommendation } from "@/lib/types";

// Props cho MovieCard
interface MovieCardProps {
  movie: Movie | Recommendation;
  variant?: "default" | "recommendation";
  index?: number;
}

// Màu gradient fallback khi không load được ảnh
// Mỗi phim có màu khác nhau dựa trên movie_id
const FALLBACK_GRADIENTS = [
  "from-blue-950 via-blue-900 to-slate-900",
  "from-red-950 via-red-900 to-slate-900",
  "from-purple-950 via-purple-900 to-slate-900",
  "from-emerald-950 via-emerald-900 to-slate-900",
  "from-amber-950 via-amber-900 to-slate-900",
  "from-indigo-950 via-indigo-900 to-slate-900",
  "from-pink-950 via-pink-900 to-slate-900",
  "from-teal-950 via-teal-900 to-slate-900",
];

// Component MovieCard chính
export default function MovieCard({
  movie,
  variant = "default",
  index = 0,
}: MovieCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isRecommendation = "predicted_rating" in movie;
  const rating = isRecommendation
    ? (movie as Recommendation).predicted_rating
    : (movie as Movie).rating;

  const fallbackGradient =
    FALLBACK_GRADIENTS[movie.movie_id % FALLBACK_GRADIENTS.length];

  // Lấy chữ cái đầu tên phim để hiển thị trong fallback
  const titleInitial = movie.title.charAt(0).toUpperCase();

  return (
    <Link href={`/movie/${movie.movie_id}`} passHref>
      <div
        className="movie-card group relative flex-shrink-0 w-[155px] sm:w-[170px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ scrollSnapAlign: "start" }}
      >
      {/* POSTER PHIM */}
      <div className="relative aspect-[2/3] w-full bg-gray-900 overflow-hidden rounded-lg shadow-lg">

        {/* Ảnh poster hoặc fallback gradient đẹp */}
        {!imgError ? (
          <Image
            src={movie.poster_url}
            alt={movie.title}
            fill
            unoptimized
            className={`object-cover object-center transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 155px, 170px"
          />
        ) : (
          // Fallback gradient với tên phim rõ ràng
          <div
            className={`absolute inset-0 bg-gradient-to-b ${fallbackGradient} flex flex-col items-center justify-center p-3`}
          >
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
              <span className="text-white/80 font-black text-2xl">{titleInitial}</span>
            </div>
            <span className="text-white/70 text-xs text-center leading-tight line-clamp-3 font-medium">
              {movie.title}
            </span>
          </div>
        )}

        {/* Gradient overlay mờ phía dưới khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge thứ hạng (chỉ hiển thị trong phần gợi ý) */}
        {variant === "recommendation" && (
          <div className="absolute top-2 left-2 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-lg z-10">
            <span className="text-white text-xs font-black">{index + 1}</span>
          </div>
        )}

        {/* Badge chất lượng (HD, Full HD, 4K) */}
        {"quality" in movie && (movie as Movie).quality && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20">
              {(movie as Movie).quality}
            </span>
          </div>
        )}

        {/* Nút play xuất hiện khi hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-12 h-12 bg-orange-500/90 hover:bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 transform transition-transform duration-200 hover:scale-110">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Thông tin rating + thể loại xuất hiện khi hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2.5 z-10 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex items-center gap-1 mb-1.5">
            <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-400 text-xs font-bold">{rating.toFixed(1)}</span>
            <span className="text-gray-400 text-[10px]">
              {isRecommendation ? "dự đoán" : "/ 5.0"}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[9px] bg-white/20 backdrop-blur-sm text-gray-200 px-1.5 py-0.5 rounded font-medium"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TÊN PHIM BÊN DƯỚI POSTER */}
      <div className="pt-2 pb-1 px-0.5">
        <h3 className="text-white text-xs font-semibold leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors duration-200">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500 text-[10px]">
            {"year" in movie ? movie.year : ""}
          </span>
          <span
            className={`text-[10px] font-bold ${
              isRecommendation ? "text-green-400" : "text-yellow-500"
            }`}
          >
            ★ {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
