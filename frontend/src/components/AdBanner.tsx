"use client";

// ==============================================================================
// AD BANNER - QUẢNG CÁO LIÊN QUAN ĐẾN PHIM
// Kiểu FPT Play: quảng cáo gói xem phim, phim mới, ưu đãi
// Có ticker phim chạy ngang phía dưới
// ==============================================================================

import { useState, useEffect } from "react";
import Image from "next/image";

// ------------------------------------------------------------------------------
// Dữ liệu các phim đang quảng cáo / nổi bật
// ------------------------------------------------------------------------------
const AD_MOVIES = [
  {
    id: 1,
    poster: "https://image.tmdb.org/t/p/w92/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    title: "The Shawshank Redemption",
    year: "1994",
    badge: "MỚI",
    badgeColor: "#f97316",
  },
  {
    id: 2,
    poster: "https://image.tmdb.org/t/p/w92/3bhkrj58Vtu7enYsLcdn3yDjhW8.jpg",
    title: "The Godfather",
    year: "1972",
    badge: "4K",
    badgeColor: "#a855f7",
  },
  {
    id: 3,
    poster: "https://image.tmdb.org/t/p/w92/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    title: "Schindler's List",
    year: "1993",
    badge: "HD",
    badgeColor: "#3b82f6",
  },
];

// ------------------------------------------------------------------------------
// Các tin tức / phim chạy trong ticker
// ------------------------------------------------------------------------------
const TICKER_ITEMS = [
  { text: "Star Wars (1977) - Phim được đánh giá cao nhất - 4.4/5 sao", color: "#f97316" },
  { text: "The Shawshank Redemption - Tuyệt phẩm điện ảnh - 4.5/5 sao", color: "#facc15" },
  { text: "The Godfather (1972) - Bố già huyền thoại - 4.3/5 sao", color: "#a855f7" },
  { text: "Pulp Fiction (1994) - Kinh điển Quentin Tarantino - 4.2/5 sao", color: "#ec4899" },
  { text: "Schindler's List - Oscar phim hay nhất - 4.5/5 sao", color: "#22c55e" },
  { text: "Fargo (1996) - Giải thưởng Emmy - 4.2/5 sao", color: "#3b82f6" },
  { text: "The Silence of the Lambs - Kinh dị tâm lý đỉnh cao - 4.3/5 sao", color: "#ef4444" },
  { text: "Forrest Gump (1994) - Câu chuyện cảm động - 4.0/5 sao", color: "#f97316" },
  { text: "Toy Story (1995) - Hoạt hình Pixar kinh điển - 3.9/5 sao", color: "#06b6d4" },
  { text: "Raiders of the Lost Ark - Cuộc phiêu lưu Indiana Jones - 4.3/5 sao", color: "#facc15" },
];

// ------------------------------------------------------------------------------
// Component mini poster phim
// ------------------------------------------------------------------------------
function MoviePoster({
  movie,
}: {
  movie: (typeof AD_MOVIES)[0];
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="relative flex-shrink-0 group">
      <div className="relative w-10 h-14 rounded overflow-hidden">
        {!imgErr ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgErr(true)}
            sizes="40px"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16" />
            </svg>
          </div>
        )}
        {/* Badge góc trên */}
        <div
          className="absolute top-0.5 left-0.5 px-1 py-px rounded text-[9px] font-black text-white leading-none shadow"
          style={{ background: movie.badgeColor }}
        >
          {movie.badge}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Component chính AdBanner
// ------------------------------------------------------------------------------
export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);

  // Chuyển qua lại giữa các quảng cáo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Nội dung các quảng cáo xoay vòng
  const ADS = [
    {
      label: "PHIM HOT",
      labelColor: "#f97316",
      title: "XEM PHIM KHÔNG GIỚI HẠN",
      titleColor: "linear-gradient(90deg, #ffffff 0%, #fbbf24 100%)",
      subtitle: "1,682 bộ phim kinh điển - Cập nhật mỗi ngày",
      highlightText: "MIỄN PHÍ",
      highlightColor: "#f97316",
    },
    {
      label: "ƯU ĐÃI",
      labelColor: "#22c55e",
      title: "GÓI PRO GIẢM 30%",
      titleColor: "linear-gradient(90deg, #4ade80 0%, #ffffff 100%)",
      subtitle: "Xem phim chất lượng 4K - Không quảng cáo",
      highlightText: "CÓ HẠN",
      highlightColor: "#22c55e",
    },
    {
      label: "MỚI RA MẮT",
      labelColor: "#a855f7",
      title: "PHIM MỚI TUẦN NÀY",
      titleColor: "linear-gradient(90deg, #c084fc 0%, #ffffff 100%)",
      subtitle: "The Godfather, Star Wars, Pulp Fiction và nhiều hơn",
      highlightText: "XEM NGAY",
      highlightColor: "#a855f7",
    },
  ];

  const ad = ADS[currentAd];

  if (!isVisible) return null;

  return (
    <div className="relative w-full z-40 overflow-hidden" style={{ background: "#0a0f1a" }}>
      {/* -------------------------------------------------------------------- */}
      {/* BANNER CHÍNH */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #05111f 0%, #0a1a35 35%, #0d2040 60%, #071018 100%)",
          minHeight: "88px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Hiệu ứng ánh sáng nền động */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{
            background:
              currentAd === 0
                ? "radial-gradient(ellipse at 15% 50%, rgba(249,115,22,0.10) 0%, transparent 55%)"
                : currentAd === 1
                ? "radial-gradient(ellipse at 15% 50%, rgba(34,197,94,0.10) 0%, transparent 55%)"
                : "radial-gradient(ellipse at 15% 50%, rgba(168,85,247,0.10) 0%, transparent 55%)",
          }}
        />

        {/* Đường kẻ màu sắc trên */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-700"
          style={{
            background:
              currentAd === 0
                ? "linear-gradient(90deg, transparent 0%, #f97316 40%, #facc15 60%, transparent 100%)"
                : currentAd === 1
                ? "linear-gradient(90deg, transparent 0%, #22c55e 40%, #06b6d4 60%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, #a855f7 40%, #ec4899 60%, transparent 100%)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 h-full">
          <div className="flex items-center h-[88px] gap-4 sm:gap-6">

            {/* ---------------------------------------------------------------- */}
            {/* PHẦN 1: NHÃN QUẢNG CÁO + LOGO */}
            {/* ---------------------------------------------------------------- */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Nhãn "QUẢNG CÁO" nhỏ */}
              <div className="hidden sm:flex flex-col items-center gap-1">
                <span className="text-gray-600 text-[9px] uppercase tracking-widest">
                  Quảng cáo
                </span>
                {/* Mini logo */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-xs transition-all duration-500"
                  style={{
                    background: ad.labelColor,
                    boxShadow: `0 0 14px ${ad.labelColor}60`,
                  }}
                >
                  T3V
                </div>
              </div>

              {/* Đường ngăn dọc */}
              <div className="hidden sm:block w-px h-12 bg-white/8" />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* PHẦN 2: NỘI DUNG CHÍNH */}
            {/* ---------------------------------------------------------------- */}
            <div className="flex-1 flex items-center gap-5 overflow-hidden min-w-0">

              {/* Tiêu đề và mô tả */}
              <div className="min-w-0 flex-shrink-0">
                {/* Label nhỏ bên trên */}
                <div
                  className="text-[10px] font-black uppercase tracking-[3px] mb-0.5 transition-colors duration-500"
                  style={{ color: ad.labelColor }}
                >
                  {ad.label}
                </div>

                {/* Tiêu đề lớn - gradient */}
                <div
                  className="text-xl sm:text-2xl font-black leading-none mb-1 transition-all duration-500"
                  style={{
                    background: ad.titleColor,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {ad.title}
                </div>

                {/* Mô tả nhỏ */}
                <div className="text-gray-400 text-xs hidden sm:block">
                  {ad.subtitle}
                </div>
              </div>

              {/* Đường ngăn */}
              <div className="hidden md:block w-px h-14 bg-white/8 flex-shrink-0" />

              {/* ---------------------------------------------------------------- */}
              {/* PHẦN 3: MINI POSTER CÁC PHIM */}
              {/* ---------------------------------------------------------------- */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {AD_MOVIES.map((m) => (
                  <MoviePoster key={m.id} movie={m} />
                ))}
                {/* Text số lượng phim */}
                <div className="flex flex-col items-center ml-1">
                  <span className="text-white font-black text-lg leading-none">
                    1,682
                  </span>
                  <span className="text-gray-500 text-[10px] leading-tight">
                    bộ phim
                  </span>
                </div>
              </div>

              {/* Đường ngăn */}
              <div className="hidden lg:block w-px h-14 bg-white/8 flex-shrink-0" />

              {/* ---------------------------------------------------------------- */}
              {/* PHẦN 4: CÁC TÍNH NĂNG NỔI BẬT */}
              {/* ---------------------------------------------------------------- */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                {[
                  { icon: "★", label: "4.5/5", sub: "Đánh giá TB" },
                  { icon: "▶", label: "FULL HD", sub: "Chất lượng cao" },
                  { icon: "⚡", label: "Nhanh", sub: "Không buffer" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center px-3 py-2 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-xs" style={{ color: ad.labelColor }}>
                        {item.icon}
                      </span>
                      <span className="text-white text-xs font-black">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-gray-500 text-[10px] mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* PHẦN 5: NÚT HÀNH ĐỘNG + ĐÓNG */}
            {/* ---------------------------------------------------------------- */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
              {/* Highlight badge */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg flex-shrink-0 transition-all duration-500"
                style={{
                  background: `${ad.highlightColor}20`,
                  border: `1px solid ${ad.highlightColor}40`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: ad.highlightColor }}
                />
                <span
                  className="text-xs font-black"
                  style={{ color: ad.highlightColor }}
                >
                  {ad.highlightText}
                </span>
              </div>

              {/* Nút CTA chính */}
              <a
                href="#recommend"
                className="btn-glow text-white text-sm font-black px-5 py-2.5 rounded-lg transition-all duration-500 whitespace-nowrap flex-shrink-0"
                style={{
                  background: ad.labelColor,
                  boxShadow: `0 0 16px ${ad.labelColor}50`,
                }}
              >
                Xem ngay
              </a>

              {/* Nút đóng */}
              <button
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                aria-label="Đóng banner"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Các dot chỉ báo quảng cáo đang hiện */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {ADS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentAd(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentAd ? "16px" : "6px",
                height: "6px",
                background: i === currentAd ? ADS[i].labelColor : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Chuyển đến quảng cáo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TICKER - PHIM CHẠY NGANG PHÍA DƯỚI */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="ticker-wrap py-1.5 overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Label bên trái cố định */}
        <div className="flex items-center">
          <div
            className="flex-shrink-0 flex items-center gap-2 px-4 border-r"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              PHIM HOT
            </span>
          </div>

          {/* Nội dung ticker cuộn */}
          <div className="flex-1 overflow-hidden">
            <div className="ticker-inner animate-ticker inline-flex gap-12">
              {/* Lặp 2 lần để cuộn vô tận */}
              {[...Array(2)].map((_, repeatIdx) => (
                <span
                  key={repeatIdx}
                  className="inline-flex items-center gap-12"
                >
                  {TICKER_ITEMS.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 flex-shrink-0"
                    >
                      {/* Điểm phân cách */}
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      {/* Tên phim và thông tin */}
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {item.text}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
