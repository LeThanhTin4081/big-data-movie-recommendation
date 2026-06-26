"use client";

// MOVIE CARD COMPONENT - VỚI ẢNH POSTER THẬT
// Hiển thị poster phim từ TMDB, có hiệu ứng hover đẹp
// Fallback gradient đẹp khi ảnh không load được

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [realPosterUrl, setRealPosterUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showHoverCard, setShowHoverCard] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Xóa timeout khi unmount
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('t3v_favorites') || '[]');
      setIsFavorite(favs.includes(movie.movie_id));
    } catch (e) {}
    
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [movie.movie_id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('t3v_favorites') || '[]');
      let newFavs;
      if (isFavorite) {
        newFavs = favs.filter((id: number) => id !== movie.movie_id);
        setIsFavorite(false);
      } else {
        newFavs = [...favs, movie.movie_id];
        setIsFavorite(true);
      }
      localStorage.setItem('t3v_favorites', JSON.stringify(newFavs));
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (e) {}
  };

  // Fetch poster from local map if the current image is a placeholder
  useEffect(() => {
    // Only fetch if it's the placeholder and no real poster url is set yet
    if ((movie.poster_url.includes("placeholder.com") || imgError) && !realPosterUrl) {
      fetch('/poster_map.json')
        .then(res => res.json())
        .then(map => {
          if (map[movie.movie_id]) {
            setRealPosterUrl(map[movie.movie_id]);
            setImgError(false); // Reset error state to render image
          } else {
            setImgError(true); // Force fallback if no image mapped
          }
        })
        .catch(err => {
          setImgError(true);
        });
    }
  }, [movie.movie_id, movie.poster_url, imgError, realPosterUrl]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const popW = window.innerWidth < 640 ? 280 : 340;
        
        let left = rect.left + rect.width / 2 - popW / 2;
        const margin = 24;
        if (left < margin) left = margin;
        if (left + popW > window.innerWidth - margin) {
          left = window.innerWidth - popW - margin;
        }

        const top = rect.top + rect.height / 2;

        setPopupStyle({
          position: "fixed",
          top: `${top}px`,
          left: `${left}px`,
          width: `${popW}px`,
          transform: "translate(0, -50%)",
          zIndex: 99999,
        });
        setShowHoverCard(true);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowHoverCard(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

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
        ref={cardRef}
        className="movie-card group relative flex-shrink-0 w-[155px] sm:w-[170px] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ scrollSnapAlign: "start" }}
      >
      {/* POSTER PHIM */}
      <div className="relative aspect-[2/3] w-full bg-gray-900 overflow-hidden rounded-lg shadow-lg">

        {/* Ảnh poster hoặc fallback gradient đẹp */}
        {(!imgError && (realPosterUrl || !movie.poster_url.includes("placeholder.com"))) ? (
          <Image
            src={realPosterUrl || movie.poster_url}
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

        {/* Nút Yêu Thích (Heart) */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 ${("quality" in movie && (movie as Movie).quality) ? "right-12" : "right-2"} z-20 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            isFavorite 
              ? "bg-red-500/90 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
              : "bg-black/50 text-white/70 hover:bg-black/80 hover:text-white border border-white/20"
          } ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? "0" : "2"} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

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

      {/* HOVER CARD POPUP - SỬ DỤNG PORTAL ĐỂ KHÔNG BỊ CẮT XÉN */}
      {showHoverCard && typeof document !== "undefined" && createPortal(
        <div
          className="bg-gray-900 rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] ring-1 ring-white/20 transition-all duration-300 animate-in zoom-in-95 fade-in cursor-default"
          style={popupStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            // Ngăn sự kiện click bọt lên thẻ Link bên dưới nếu click vào các nút phụ
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {/* Backdrop Ảnh (Top) */}
          <div className="relative aspect-video w-full bg-black">
            {!imgError && realPosterUrl ? (
              <Image
                src={realPosterUrl}
                alt={movie.title}
                fill
                unoptimized
                className="object-cover opacity-80"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`} />
            )}
            {/* Nút Play to bự giữa ảnh */}
            <Link href={`/movie/${movie.movie_id}`} className="absolute inset-0 flex items-center justify-center group/play">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md group-hover/play:bg-orange-600 group-hover/play:scale-110 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/40 group-hover/play:border-orange-500">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              </div>
            </Link>
            {/* Gradient đáy che mượt */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-black text-xl leading-tight line-clamp-1 drop-shadow-lg">{movie.title}</h3>
            </div>
          </div>

          {/* Nội dung bên dưới */}
          <div className="px-4 pb-4 pt-1 bg-[#111111]">
            {/* Nút hành động */}
            <div className="flex items-center gap-3 mb-4">
              <Link href={`/movie/${movie.movie_id}`}>
                <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-md font-bold hover:bg-gray-200 transition-colors shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                  Phát
                </button>
              </Link>
              <button className="w-9 h-9 border-2 border-gray-500 text-white rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition bg-black/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </button>
              <button 
                onClick={toggleFavorite}
                className={`w-9 h-9 border-2 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite 
                    ? "border-red-500 bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                    : "border-gray-500 bg-black/50 text-white hover:border-white hover:bg-white/10"
                }`}
              >
                <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? "0" : "2"} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thông tin rating, year, quality */}
            <div className="flex items-center gap-3 mb-3 text-[13px] font-bold">
              <span className="text-green-500 text-sm">★ {rating.toFixed(1)} Điểm</span>
              <span className="text-gray-300">{"year" in movie ? movie.year : "N/A"}</span>
              <span className="border border-gray-500 px-1.5 py-0.5 text-[10px] text-gray-300 rounded-sm">HD</span>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {movie.genres.slice(0, 3).map((g) => (
                <span key={g} className="text-[11px] font-medium text-gray-300 border border-gray-700 bg-gray-800/80 px-2.5 py-0.5 rounded-full">{g}</span>
              ))}
            </div>

            {/* Mô tả tự sinh siêu ngầu */}
            <p className="text-[13px] text-gray-400 line-clamp-3 leading-relaxed">
              {movie.description || `Một tác phẩm điện ảnh xuất sắc thuộc thể loại ${movie.genres.slice(0, 2).join(", ")}, mang đến những khung hình mãn nhãn và cốt truyện lôi cuốn. Được giới phê bình đánh giá cao và thu hút hàng triệu lượt xem trên toàn cầu.`}
            </p>
          </div>
        </div>,
        document.body
      )}

    </div>
    </Link>
  );
}
