"use client";

// THANH ĐIỀU HƯỚNG (NAVBAR)
// Giao diện dark theme, có logo, menu, ô tìm kiếm và Nút Đăng nhập/Mua gói

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";
import PricingModal from "./PricingModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  // State cho Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Thêm nền đặc khi cuộn xuống để tránh chồng chéo nội dung
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-[#0a0a0a]/95 shadow-lg shadow-black/50 backdrop-blur-md border-b border-white/5" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO VÀ TÊN TRANG */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  T3V <span className="text-orange-500">Play</span>
                </span>
              </a>

              {/* MENU CHÍNH - Ẩn trên màn hình nhỏ */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/"
                  className="text-white font-medium text-sm px-3 py-1.5 rounded hover:bg-white/10 transition-colors"
                >
                  Trang chủ
                </Link>
                <a
                  href="/#popular"
                  className="text-gray-300 text-sm px-3 py-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
                >
                  Phim phổ biến
                </a>
                <Link
                  href="/recommend"
                  className="text-gray-300 text-sm px-3 py-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
                >
                  Gợi ý cho bạn
                </Link>
                <a
                  href="/#about"
                  className="text-gray-300 text-sm px-3 py-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
                >
                  Về dự án
                </a>
              </div>
            </div>

            {/* PHẦN BÊN PHẢI: Tìm kiếm + Đăng nhập + Mua gói */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Ô tìm kiếm mở rộng */}
              <div className="relative hidden sm:block">
                {isSearchOpen ? (
                  <div className="flex items-center bg-white/5 border border-gray-600 rounded-lg overflow-hidden">
                    <input
                      type="text"
                      placeholder="Tìm kiếm phim..."
                      className="bg-transparent text-white text-sm px-3 py-1.5 w-48 outline-none placeholder:text-gray-500"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }
                      }}
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <button
                      className="px-2 text-gray-400 hover:text-white"
                      onClick={() => setIsSearchOpen(false)}
                      aria-label="Đóng tìm kiếm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Mở tìm kiếm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Nút Đăng nhập / User Profile */}
              {user ? (
                <div className="flex items-center gap-3 relative group">
                  <div className="flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400 font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-white text-xs font-bold leading-tight">{user.name}</p>
                      <p className="text-gray-500 text-[10px] leading-tight">User ID: {user.userId}</p>
                    </div>
                  </div>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-[#111118] border border-white/10 rounded-xl p-2 shadow-2xl">
                      <div className="px-3 py-2 border-b border-white/5 md:hidden">
                        <p className="text-white text-xs font-bold">{user.name}</p>
                        <p className="text-gray-500 text-[10px]">User ID: {user.userId}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-gray-300 hover:text-white text-sm font-semibold px-2 sm:px-3 py-1.5 transition-colors whitespace-nowrap"
                >
                  Đăng nhập
                </button>
              )}

              {/* Nút Mua gói */}
              <button
                onClick={() => setIsPricingOpen(true)}
                className="btn-glow hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-1.5 rounded transition-colors whitespace-nowrap glow-orange"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Mua gói
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Render Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
}
