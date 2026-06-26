"use client";

// LOGIN MODAL - GIAO DIỆN ĐĂNG NHẬP / ĐĂNG KÝ / QUÊN MẬT KHẨU
// Modal full-screen với glass morphism, 2 tab chính + luồng quên mật khẩu 3 bước

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

// Props
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Các tab chính
type MainTab = "login" | "register" | "genre";
// Các bước trong luồng quên mật khẩu
type ForgotStep = "email" | "otp" | "newPassword";

// Component chính LoginModal
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register: signUp } = useAuth();

  // Tab chính: login | register
  const [tab, setTab] = useState<MainTab>("login");

  // Trạng thái luồng quên mật khẩu
  const [isForgot, setIsForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");

  // Các trường nhập liệu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Thể loại phim yêu thích
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const AVAILABLE_GENRES = ["Hành động", "Phiêu lưu", "Tình cảm", "Hài hước", "Kinh dị", "Tâm lý", "Hoạt hình", "Viễn tưởng"];

  // Refs cho các ô OTP
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Đóng modal khi bấm Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Khóa cuộn trang khi modal mở; reset state khi modal đóng
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset toàn bộ về giao diện ban đầu khi đóng modal
      setTab("login");
      setIsForgot(false);
      setForgotStep("email");
      setEmail("");
      setPassword("");
      setName("");
      setOtpValues(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccessMessage("");
      setShowPassword(false);
      setShowNewPassword(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Reset toàn bộ form về trạng thái ban đầu
  const resetAll = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOtpValues(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccessMessage("");
    setIsForgot(false);
    setForgotStep("email");
    setSelectedGenres([]);
    setTab("login");
  };

  // Xử lý chuyển tab chính
  const switchTab = (t: MainTab) => {
    setTab(t);
    setError("");
    setSuccessMessage("");
  };

  // Mở luồng quên mật khẩu
  const openForgot = () => {
    setIsForgot(true);
    setForgotStep("email");
    setError("");
    setSuccessMessage("");
  };

  // Quay về đăng nhập
  const backToLogin = () => {
    resetAll();
    setTab("login");
  };

  // Xử lý nhập OTP từng ô
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // chỉ nhận chữ số
    const next = [...otpValues];
    next[index] = value.slice(-1); // chỉ lấy ký tự cuối
    setOtpValues(next);
    setError("");
    // Tự động chuyển sang ô tiếp theo
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace trong OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Xử lý dán OTP
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setOtpValues(paste.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  // ---- BƯỚC 1: Gửi OTP về email ----
  const handleSendOtp = async () => {
    if (!email) {
      setError("Vui lòng nhập địa chỉ Email!");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok && data.success) {
        setSuccessMessage("Mã OTP đã được gửi vào Gmail của bạn!");
        setForgotStep("otp");
        setTimeout(() => setSuccessMessage(""), 3000);
        // Focus vào ô OTP đầu tiên sau khi chuyển bước
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(data.error || "Gửi OTP thất bại!");
      }
    } catch {
      setIsLoading(false);
      setError("Lỗi kết nối máy chủ!");
    }
  };

  // ---- BƯỚC 2: Xác thực OTP ----
  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (otp.length < 6) {
      setError("Vui lòng nhập đủ 6 chữ số của mã OTP!");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok && data.success) {
        setForgotStep("newPassword");
        setError("");
      } else {
        setError(data.error || "Mã OTP không hợp lệ!");
      }
    } catch {
      setIsLoading(false);
      setError("Lỗi kết nối máy chủ!");
    }
  };

  // ---- BƯỚC 3: Đặt mật khẩu mới ----
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ mật khẩu mới!");
      return;
    }
    if (newPassword.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp!");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok && data.success) {
        setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển về đăng nhập...");
        setTimeout(() => {
          backToLogin();
        }, 2500);
      } else {
        setError(data.error || "Đặt lại mật khẩu thất bại!");
      }
    } catch {
      setIsLoading(false);
      setError("Lỗi kết nối máy chủ!");
    }
  };

  // ---- Xử lý submit form đăng nhập / đăng ký ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (tab === "register") {
      if (!name) {
        setError("Vui lòng nhập họ tên");
        return;
      }
      if (password.length < 8) {
        setError("Mật khẩu phải có ít nhất 8 ký tự");
        return;
      }
      // Chuyển sang bước chọn thể loại thay vì đăng ký luôn
      setTab("genre");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      onClose();
      resetAll();
    } else {
      setError(result.error || "Đã xảy ra lỗi!");
    }
  };

  // ---- Xử lý submit bước chọn thể loại (Đăng ký thực sự) ----
  const handleGenreSubmit = async () => {
    if (selectedGenres.length === 0) {
      setError("Vui lòng chọn ít nhất 1 thể loại bạn yêu thích!");
      return;
    }

    setIsLoading(true);
    setError("");
    const result = await signUp(name, email, password, selectedGenres);
    setIsLoading(false);

    if (result.success) {
      onClose();
      resetAll();
    } else {
      setError(result.error || "Đã xảy ra lỗi khi tạo tài khoản!");
    }
  };

  // ---- Tiêu đề động theo bước ----
  const getForgotTitle = () => {
    if (forgotStep === "email") return "Quên mật khẩu";
    if (forgotStep === "otp") return "Nhập mã xác thực";
    return "Mật khẩu mới";
  };

  const getForgotSubtitle = () => {
    if (forgotStep === "email") return "Nhập email để nhận mã OTP xác thực";
    if (forgotStep === "otp") return `Nhập mã 6 chữ số đã gửi đến ${email}`;
    return "Tạo mật khẩu mới cho tài khoản của bạn";
  };

  return (
    <div
      className="modal-overlay animate-overlayIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md animate-modalIn">
        {/* CARD MODAL */}
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
            {/* LOGO + TIÊU ĐỀ */}
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
                {isForgot
                  ? getForgotSubtitle()
                  : tab === "login"
                  ? "Đăng nhập để nhận gợi ý phim cá nhân hóa"
                  : "Tạo tài khoản để bắt đầu trải nghiệm"}
              </p>
            </div>

            {/* LUỒNG QUÊN MẬT KHẨU */}
            {isForgot ? (
              <div>
                {/* Thanh tiến trình 3 bước */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {(["email", "otp", "newPassword"] as ForgotStep[]).map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          forgotStep === step
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                            : (forgotStep === "otp" && step === "email") || (forgotStep === "newPassword" && step !== "newPassword")
                            ? "bg-orange-500/30 text-orange-400"
                            : "bg-white/5 text-gray-600"
                        }`}
                      >
                        {(forgotStep === "otp" && step === "email") || (forgotStep === "newPassword" && step !== "newPassword") ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : i + 1}
                      </div>
                      {i < 2 && <div className={`w-8 h-px ${i < ["email","otp","newPassword"].indexOf(forgotStep) ? "bg-orange-500/50" : "bg-white/10"}`} />}
                    </div>
                  ))}
                </div>

                <h3 className="text-white font-bold text-center text-base mb-5">{getForgotTitle()}</h3>

                {/* BƯỚC 1: Nhập Email */}
                {forgotStep === "email" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder="example@gmail.com"
                        className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                        onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      />
                    </div>
                    {error && <ErrorBox message={error} />}
                    {successMessage && <SuccessBox message={successMessage} />}
                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide mt-2"
                    >
                      {isLoading ? <LoadingSpinner text="Đang gửi mã..." /> : "Gửi mã OTP"}
                    </button>
                  </div>
                )}

                {/* BƯỚC 2: Nhập OTP */}
                {forgotStep === "otp" && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-3 text-center">
                        Mã xác thực (6 chữ số)
                      </label>
                      {/* Các ô nhập OTP */}
                      <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                        {otpValues.map((val, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className={`w-11 h-13 text-center text-xl font-black rounded-xl border transition-all duration-200 outline-none bg-black/40 text-white ${
                              val
                                ? "border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                                : "border-white/10 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                            }`}
                            style={{ height: "52px" }}
                          />
                        ))}
                      </div>
                      <p className="text-center text-gray-600 text-xs mt-3">
                        Không nhận được mã?{" "}
                        <button
                          type="button"
                          onClick={() => { setOtpValues(["","","","","",""]); setError(""); handleSendOtp(); }}
                          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                        >
                          Gửi lại
                        </button>
                      </p>
                    </div>
                    {error && <ErrorBox message={error} />}
                    {successMessage && <SuccessBox message={successMessage} />}
                    <button
                      onClick={handleVerifyOtp}
                      disabled={isLoading || otpValues.join("").length < 6}
                      className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide"
                    >
                      {isLoading ? <LoadingSpinner text="Đang xác thực..." /> : "Xác nhận mã OTP"}
                    </button>
                  </div>
                )}

                {/* BƯỚC 3: Đặt mật khẩu mới */}
                {forgotStep === "newPassword" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                          placeholder="Tối thiểu 8 ký tự"
                          className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                        >
                          <EyeIcon show={showNewPassword} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                        Xác nhận mật khẩu
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                        placeholder="Nhập lại mật khẩu mới"
                        className="w-full bg-black/40 border border-white/10 focus:border-orange-500 text-white placeholder:text-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                      />
                    </div>
                    {error && <ErrorBox message={error} />}
                    {successMessage && <SuccessBox message={successMessage} />}
                    <button
                      onClick={handleResetPassword}
                      disabled={isLoading}
                      className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide mt-2"
                    >
                      {isLoading ? <LoadingSpinner text="Đang cập nhật..." /> : "Đặt lại mật khẩu"}
                    </button>
                  </div>
                )}

                <p className="text-center mt-5">
                  <button
                    type="button"
                    onClick={backToLogin}
                    className="text-orange-400 hover:text-orange-300 text-xs font-semibold transition-colors"
                  >
                    ← Quay lại Đăng nhập
                  </button>
                </p>
              </div>
            ) : tab === "genre" ? (
              /* FORM CHỌN THỂ LOẠI (BƯỚC 2 CỦA ĐĂNG KÝ) */
              <div className="animate-fade-in">
                <h3 className="text-white font-bold text-center text-lg mb-2">Chọn thể loại yêu thích</h3>
                <p className="text-gray-400 text-xs text-center mb-6">
                  Giúp chúng tôi cá nhân hóa trải nghiệm và đưa ra gợi ý phim phù hợp nhất cho bạn.
                </p>

                <div className="flex flex-wrap gap-2.5 justify-center mb-6">
                  {AVAILABLE_GENRES.map(genre => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => {
                          setError("");
                          if (isSelected) {
                            setSelectedGenres(prev => prev.filter(g => g !== genre));
                          } else {
                            setSelectedGenres(prev => [...prev, genre]);
                          }
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                          isSelected 
                            ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30" 
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white"
                        }`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>

                {error && <ErrorBox message={error} />}

                <button
                  onClick={handleGenreSubmit}
                  disabled={isLoading}
                  className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide mt-2"
                >
                  {isLoading ? <LoadingSpinner text="Đang xử lý..." /> : "Hoàn tất đăng ký"}
                </button>

                <p className="text-center mt-5">
                  <button
                    type="button"
                    onClick={() => switchTab("register")}
                    className="text-gray-500 hover:text-gray-300 text-xs font-semibold transition-colors"
                  >
                    ← Quay lại điền thông tin
                  </button>
                </p>
              </div>
            ) : (
              /* FORM ĐĂNG NHẬP / ĐĂNG KÝ */
              <div className="animate-fade-in">
                {/* Tab chuyển đổi */}
                <div className="flex p-1 glass rounded-xl mb-6 relative">
                  {(["login", "register"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => switchTab(t)}
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
                          onClick={openForgot}
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
                        <EyeIcon show={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Thông báo lỗi */}
                  {error && <ErrorBox message={error} />}
                  {successMessage && <SuccessBox message={successMessage} />}

                  {/* Nút submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-all duration-200 glow-orange text-sm tracking-wide mt-2"
                  >
                    {isLoading
                      ? <LoadingSpinner text="Đang xử lý..." />
                      : tab === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                  </button>
                </form>

                {/* Link chuyển tab */}
                <p className="text-center text-gray-600 text-xs mt-6 relative z-10">
                  {tab === "login" ? (
                    <>
                      Chưa có tài khoản?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("register")}
                        className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                      >
                        Đăng ký miễn phí
                      </button>
                    </>
                  ) : (
                    <>
                      Đã có tài khoản?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("login")}
                        className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                      >
                        Đăng nhập ngay
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}
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

// Component con: Icon con mắt (ẩn/hiện mật khẩu)
function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

// Component con: Hộp thông báo lỗi
function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
      <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-red-400 text-xs">{message}</span>
    </div>
  );
}

// Component con: Hộp thông báo thành công
function SuccessBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-green-400 text-xs">{message}</span>
    </div>
  );
}

// Component con: Spinner loading
function LoadingSpinner({ text }: { text: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {text}
    </span>
  );
}
