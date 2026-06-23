"use client";

// ==============================================================================
// LOGIN MODAL - GIAO DIỆN ĐĂNG NHẬP
// Modal full-screen với glass morphism, 2 tab: Đăng nhập / Đăng ký
// ==============================================================================

import { useState, useEffect } from "react";

// ------------------------------------------------------------------------------
// Props
// ------------------------------------------------------------------------------
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ------------------------------------------------------------------------------
// Component chính LoginModal
// ------------------------------------------------------------------------------
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Đóng modal khi bấm Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Khóa cuộn trang khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // ----------------------------------------------------------------------------
  // Xử lý submit form (mock)
  // ----------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (tab === "register" && !name) {
      setError("Vui lòng nhập họ tên");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);

    // Mock: đóng modal sau "đăng nhập" thành công
    onClose();
  };

  return (
    <div
      className="modal-overlay animate-overlayIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md animate-modalIn">
        {/* ------------------------------------------------------------------ */}
        {/* CARD MODAL */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #111118 0%, #0d0d14 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Glow phía trên */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)" }}
          />

          {/* Hình nền trang trí */}
          <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(249,115,22,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="p-8 relative">
            {/* -------------------------------------------------------------- */}
            {/* LOGO + TIÊU ĐỀ */}
            {/* -------------------------------------------------------------- */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-black text-2xl">
                  <span className="text-white">T3V </span>
                  <span className="text-orange-500">Play</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {tab === "login"
                  ? "Đăng nhập để nhận gợi ý phim cá nhân hóa"
                  : "Tạo tài khoản để bắt đầu trải nghiệm"}
              </p>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* TAB CHUYỂN ĐỔI */}
            {/* -------------------------------------------------------------- */}
            <div className="flex p-1 glass rounded-xl mb-6 relative">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(""); }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                    tab === t
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {t === "login" ? "Đăng nhập" : "Đăng ký"}
                </button>
              ))}
            </div>

            {/* -------------------------------------------------------------- */}
            {/* FORM */}
            {/* -------------------------------------------------------------- */}
            <form onSubmit={handleSubmit} className="space-y-4 relative">
              {/* Họ tên - chỉ hiển thị khi đăng ký */}
              {tab === "register" && (
                <div>
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                />
              </div>

              {/* Mật khẩu */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Mật khẩu
                  </label>
                  {tab === "login" && (
                    <button
                      type="button"
                      className="text-orange-400 text-xs hover:text-orange-300 transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Thông báo lỗi */}
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-400 text-xs">{error}</span>
                </div>
              )}

              {/* Nút submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  tab === "login" ? "Đăng nhập" : "Tạo tài khoản"
                )}
              </button>
            </form>

            {/* -------------------------------------------------------------- */}
            {/* ĐĂNG NHẬP VỚI MẠNG XÃ HỘI */}
            {/* -------------------------------------------------------------- */}
            <div className="mt-6 relative">
              <div className="relative flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-gray-600 text-xs">Hoặc tiếp tục với</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* Google */}
                <button className="flex items-center justify-center gap-2.5 glass border border-white/10 hover:border-white/30 rounded-xl py-2.5 transition-all duration-200 group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Google</span>
                </button>

                {/* Facebook */}
                <button className="flex items-center justify-center gap-2.5 glass border border-white/10 hover:border-white/30 rounded-xl py-2.5 transition-all duration-200 group">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Facebook</span>
                </button>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* LINK CHUYỂN TAB */}
            {/* -------------------------------------------------------------- */}
            <p className="text-center text-gray-600 text-xs mt-6 relative z-10">
              {tab === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button
                type="button"
                onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                {tab === "login" ? "Đăng ký miễn phí" : "Đăng nhập ngay"}
              </button>
            </p>
          </div>

          {/* Nút đóng góc trên phải */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
