"use client";

// HERO BANNER - NÂNG CẤP TOÀN DIỆN
// Ken Burns effect, progress bar, thumbnail strip, particle effects

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FEATURED_MOVIES } from "@/lib/mock-data";

// Thời gian mỗi slide (ms)
const SLIDE_DURATION = 7000;

// Component Particle nhỏ trang trí
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute bottom-0 rounded-full opacity-0"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        background: `rgba(249, 115, 22, ${0.3 + Math.random() * 0.4})`,
        animation: `particleFloat ${3 + Math.random() * 3}s ease-out ${delay}s infinite`,
        boxShadow: `0 0 ${size * 2}px rgba(249,115,22,0.4)`,
      }}
    />
  );
}

// Component ThumbnailStrip - Danh sách thumbnail dưới hero
function ThumbnailStrip({
  currentIndex,
  onSelect,
}: {
  currentIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="absolute bottom-6 right-6 z-20 hidden lg:flex gap-3">
      {FEATURED_MOVIES.map((movie, i) => (
        <button
          key={movie.movie_id}
          onClick={() => onSelect(i)}
          className={`relative w-28 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
            i === currentIndex
              ? "ring-2 ring-orange-500 scale-110 shadow-lg shadow-orange-500/30"
              : "opacity-50 hover:opacity-80 hover:scale-105"
          }`}
        >
          <Image
            src={movie.backdrop_url || movie.poster_url}
            alt={movie.title}
            fill
            unoptimized
            className="object-cover"
            sizes="112px"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-1 left-1 right-1">
            <p className="text-white text-[9px] font-bold truncate leading-tight">
              {movie.title.replace(/\s*\(\d{4}\)\s*$/, "")}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

// Component chính HeroBanner
export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const movie = FEATURED_MOVIES[currentIndex];

  // Hàm chuyển slide
  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setPrevIndex(currentIndex);
    setProgress(0);
    startTimeRef.current = Date.now();

    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
      setPrevIndex(null);
    }, 500);
  }, [currentIndex, isTransitioning]);

  const goToNext = useCallback(() => {
    const next = (currentIndex + 1) % FEATURED_MOVIES.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  // Cập nhật progress bar theo thời gian thực
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        goToNext();
      } else {
        progressRef.current = setTimeout(tick, 50);
      }
    };

    progressRef.current = setTimeout(tick, 50);
    return () => {
      if (progressRef.current) clearTimeout(progressRef.current);
    };
  }, [currentIndex, goToNext]);

  // Các particle ngẫu nhiên
  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 0.7,
    x: 10 + i * 11,
    size: 3 + (i % 3) * 2,
  }));

  return (
    <section className="relative w-full h-[90vh] min-h-[650px] overflow-hidden bg-black noise-overlay">
      {/* ẢNH BACKDROP VỚI KEN BURNS EFFECT */}
      {FEATURED_MOVIES.map((m, i) => (
        <div
          key={m.movie_id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === currentIndex
              ? "opacity-100"
              : i === prevIndex
              ? "opacity-0"
              : "opacity-0"
          }`}
          style={{ zIndex: i === currentIndex ? 1 : 0 }}
        >
          {!imgErrors[i] ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={m.backdrop_url || m.poster_url}
                alt={m.title}
                fill
                priority={i === 0}
                unoptimized
                className={`object-cover object-top ${
                  i === currentIndex && !isTransitioning ? "ken-burns" : ""
                }`}
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [i]: true }))
                }
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 70% 30%, 
                  ${i === 0 ? "#1e3a5f" : i === 1 ? "#2d1b69" : "#1a0e0a"} 0%, 
                  #050505 80%
                )`,
              }}
            />
          )}
        </div>
      ))}

      {/* GRADIENT LAYERS - Tạo chiều sâu cinematic */}
      <div className="absolute inset-0 z-10">
        {/* Gradient trái - cho chữ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        {/* Gradient dưới - chuyển tiếp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* PARTICLES */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="relative z-20 h-full flex items-end pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-14 w-full">
          <div
            key={currentIndex}
            className={`max-w-[600px] ${
              isTransitioning
                ? "opacity-0 -translate-x-6"
                : "opacity-100 translate-x-0"
            }`}
            style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
          >
            {/* Thể loại */}
            <div
              className="flex items-center gap-2 mb-5 animate-slideInLeft"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-0.5">
                {movie.genres.map((genre, i) => (
                  <span key={genre} className="flex items-center">
                    <span className="text-orange-400 font-bold text-xs tracking-[3px] uppercase">
                      {genre}
                    </span>
                    {i < movie.genres.length - 1 && (
                      <span className="text-orange-600/50 mx-2 text-xs">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Tên phim - siêu to */}
            <div
              className="mb-5 animate-slideInLeft"
              style={{ animationDelay: "0.2s" }}
            >
              <h1 className="text-[72px] sm:text-[90px] font-black text-white leading-[0.9] tracking-tight mb-2">
                {movie.title.replace(/\s*\(\d{4}\)\s*$/, "").toUpperCase()}
              </h1>
              {movie.title_vn && (
                <h2
                  className="text-4xl sm:text-5xl font-black leading-tight glow-orange-text"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316 0%, #facc15 60%, #f97316 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradientShift 4s linear infinite",
                  }}
                >
                  {movie.title_vn}
                </h2>
              )}
            </div>

            {/* Thông tin */}
            <div
              className="flex items-center gap-3 mb-6 flex-wrap animate-slideInLeft"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-400 font-black text-sm">
                  {movie.rating.toFixed(1)}
                </span>
                <span className="text-gray-400 text-xs">
                  ({movie.num_ratings.toLocaleString()})
                </span>
              </div>

              <span className="glass border border-white/20 text-white text-xs font-black px-3 py-1.5 rounded-lg tracking-widest">
                {movie.quality}
              </span>

              <span className="text-gray-300 text-sm font-semibold">
                {movie.year}
              </span>

              {movie.duration && (
                <span className="text-gray-400 text-sm flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {movie.duration}
                </span>
              )}
            </div>

            {/* Mô tả */}
            {movie.description && (
              <p
                className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md animate-slideInLeft line-clamp-3"
                style={{ animationDelay: "0.35s" }}
              >
                {movie.description}
              </p>
            )}

            {/* Các nút */}
            <div
              className="flex items-center gap-4 animate-slideInLeft"
              style={{ animationDelay: "0.45s" }}
            >
              <button className="btn-glow flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-full transition-all duration-200 glow-orange text-sm tracking-wide">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Xem ngay
              </button>

              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all duration-200 hover:scale-110 group">
                <svg
                  className="w-5 h-5 text-white group-hover:text-orange-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>

              <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all duration-200 hover:scale-110 group">
                <svg
                  className="w-4 h-4 text-white group-hover:text-orange-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* THUMBNAIL STRIP - Góc dưới phải */}
      <ThumbnailStrip currentIndex={currentIndex} onSelect={goToSlide} />

      {/* PROGRESS BARS - Cho từng slide */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex">
        {FEATURED_MOVIES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="flex-1 h-[3px] bg-white/15 overflow-hidden relative"
          >
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 absolute left-0 top-0"
              style={{
                width:
                  i < currentIndex
                    ? "100%"
                    : i === currentIndex
                    ? `${progress}%`
                    : "0%",
                transition:
                  i === currentIndex ? "none" : "width 0.3s ease",
                boxShadow: "0 0 6px rgba(249,115,22,0.8)",
              }}
            />
          </button>
        ))}
      </div>

      {/* MŨI TÊN ĐIỀU HƯỚNG */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 hidden lg:flex">
        <button
          onClick={() =>
            goToSlide(
              (currentIndex - 1 + FEATURED_MOVIES.length) %
                FEATURED_MOVIES.length
            )
          }
          className="w-10 h-10 glass rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="w-10 h-10 glass rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
