"use client";

// MOVIE ROW - HÀNG PHIM VỚI NÚT ĐIỀU HƯỚNG VÀ TOP 10 BADGE
// Nút trái/phải, số thứ tự kiểu Netflix, hover overlay

import { useRef, useState, useCallback, useEffect } from "react";
import { Movie, Recommendation } from "@/lib/mock-data";
import MovieCard from "./MovieCard";
import ScrollReveal from "./ScrollReveal";

// Props
interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: (Movie | Recommendation)[];
  id?: string;
  accentColor?: string;
  showTop10?: boolean;
}

// Component MovieRow
export default function MovieRow({
  title,
  subtitle,
  movies,
  id,
  accentColor = "bg-orange-500",
  showTop10 = false,
}: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Cuộn ngang khi bấm nút mũi tên
  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 175 + 14;
    const scrollBy = cardWidth * 3;

    el.scrollBy({
      left: dir === "right" ? scrollBy : -scrollBy,
      behavior: "smooth",
    });
  }, []);

  // Cập nhật trạng thái nút khi cuộn
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);
  
  useEffect(() => {
    updateScrollState();
  }, [movies, updateScrollState]);

  return (
    <ScrollReveal>
      <section id={id} className="py-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
          {/* TIÊU ĐỀ */}
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-1 h-7 ${accentColor} rounded-full`}
                style={{
                  boxShadow:
                    accentColor.includes("orange")
                      ? "0 0 10px rgba(249,115,22,0.6)"
                      : undefined,
                }}
              />
              <div>
                <h2 className="text-white text-xl font-black leading-tight tracking-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-gray-600 text-xs mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Nút điều hướng */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  canScrollLeft
                    ? "glass border-white/20 hover:border-orange-500/50 hover:scale-110"
                    : "opacity-20 cursor-not-allowed border-white/10 bg-transparent"
                }`}
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
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  canScrollRight
                    ? "glass border-white/20 hover:border-orange-500/50 hover:scale-110"
                    : "opacity-20 cursor-not-allowed border-white/10 bg-transparent"
                }`}
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
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* DANH SÁCH PHIM */}
          <div
            ref={scrollRef}
            className="movie-row-scroll"
            onScroll={updateScrollState}
          >
            {movies.map((movie, index) => (
              <div key={movie.movie_id} className="relative">
                {/* Số thứ tự kiểu Netflix Top 10 */}
                {showTop10 && index < 10 && (
                  <span className="top10-number">{index + 1}</span>
                )}
                <div className={showTop10 ? "ml-8" : ""}>
                  <MovieCard movie={movie} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
