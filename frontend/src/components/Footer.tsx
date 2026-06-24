"use client";

import { useState } from "react";

function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110 shadow-lg"
      style={{ background: "#f97316", boxShadow: "0 4px 20px rgba(249,115,22,0.45)" }}
      aria-label="Lên đầu trang"
    >
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Helper: danh sách link nối bởi dấu "|"
// ──────────────────────────────────────────────────────────────────────────────
function LinkRow({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-1">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center">
          <a
            href={item.href ?? "#"}
            className="text-xs transition-colors duration-200 hover:text-orange-400 whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {item.label}
          </a>
          {i < items.length - 1 && (
            <span className="mx-2 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Footer chính
// ──────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <footer
        id="about"
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* ============================================================ */}
        {/* PHẦN CHÍNH – compact 1 dòng giống FPT Play                    */}
        {/* ============================================================ */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] gap-8 items-start">

            {/* ── CỘT 1: LOGO + BADGE + MXH ── */}
            <div className="flex flex-col gap-3 min-w-[140px]">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 group w-fit">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: "#f97316", boxShadow: "0 4px 14px rgba(249,115,22,0.4)" }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-black text-xl">
                  <span className="text-white">T3V</span>
                  <span style={{ color: "#f97316" }}> Play</span>
                </span>
              </a>

              {/* DMCA + Đã thông báo */}
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-black"
                  style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ background: "#f97316" }}>
                    <span className="text-white text-[7px] font-black">D</span>
                  </div>
                  <span className="text-gray-400">DMCA</span>
                  <span className="text-[9px]" style={{ color: "#22c55e" }}>PROTECTED</span>
                </div>

                <div
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px]"
                  style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg className="w-3 h-3 flex-shrink-0" style={{ color: "#3b82f6" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400 text-[10px]">Đã thông báo</span>
                </div>
              </div>

              {/* Mạng xã hội */}
              <div className="flex items-center gap-2">
                <a href="#" aria-label="Facebook"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "#1877f2", boxShadow: "0 2px 8px rgba(24,119,242,0.35)" }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="Youtube"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "#ff0000", boxShadow: "0 2px 8px rgba(255,0,0,0.35)" }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ── CỘT 2: SẢN PHẨM & DỊCH VỤ ── */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-sm mb-1">Sản phẩm & Dịch vụ</h3>

              <LinkRow items={[
                { label: "Giới thiệu" },
                { label: "Các gói dịch vụ" },
                { label: "Trung tâm hỗ trợ" },
                { label: "Thông tin" },
              ]} />

              <LinkRow items={[
                { label: "Quảng cáo" },
                { label: "Mua gói" },
                { label: "Bảo hành" },
              ]} />
            </div>

            {/* ── CỘT 3: QUY ĐỊNH & THÔNG TIN ── */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-sm mb-1">Quy định & Thông tin</h3>

              <LinkRow items={[
                { label: "Điều khoản sử dụng" },
                { label: "Chính sách thanh toán" },
                { label: "Chính sách bảo mật" },
              ]} />

              <LinkRow items={[{ label: "Cam kết quyền riêng tư" }]} />

              <LinkRow items={[
                { label: "Liên hệ" },
                { label: "Hotline: 1900 6600", href: "tel:19006600" },
                { label: "Email: hotro@movierec.vn", href: "mailto:hotro@movierec.vn" },
              ]} />
            </div>

            {/* ── CỘT 4: TẢI ỨNG DỤNG ── */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              <h3 className="text-white font-bold text-sm mb-1">Tải ứng dụng trên</h3>

              {/* App Store */}
              <a href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)"; }}
              >
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.79.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-[10px] leading-none mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Tải về trên</div>
                  <div className="text-white font-bold text-sm leading-none">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)"; }}
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76c.37.21.8.24 1.2.08l11.35-6.55-2.54-2.54-10.01 9.01z" fill="#EA4335" />
                  <path d="M20.82 10.42L17.6 8.57l-2.85 2.85 2.85 2.85 3.25-1.87c.93-.53.93-1.45-.03-1.98z" fill="#FBBC04" />
                  <path d="M3.18.24C2.77.45 2.5.89 2.5 1.47v21.06c0 .58.27 1.02.68 1.23l12.08-11.88L3.18.24z" fill="#4285F4" />
                  <path d="M13.01 12L3.18.24l-.0-.0 10.01 9.01 2.54-2.54L4.38.15c-.39-.23-.83-.22-1.2.09L13.01 12z" fill="#34A853" />
                </svg>
                <div>
                  <div className="text-[10px] leading-none mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Tải trên</div>
                  <div className="text-white font-bold text-sm leading-none">Google Play</div>
                </div>
              </a>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* DÒNG DƯỚI – thông tin pháp lý                                */}
        {/* ============================================================ */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 py-4">
            <div className="text-center space-y-1">
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Người đại diện: Nhóm 5  — Đồ án môn BigData
              </p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Trường Đại học Giao Thông Vận Tải TP.HCM | Chuyên ngành : Khoa học dữ liệu
              </p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Dataset: MovieLens 100K — GroupLens Research, University of Minnesota
              </p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
                Giao diện tham khảo: FPT Play &nbsp;|&nbsp; © {new Date().getFullYear()} T3V Play. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}