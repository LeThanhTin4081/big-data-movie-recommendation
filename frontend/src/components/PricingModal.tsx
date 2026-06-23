"use client";

// ==============================================================================
// PRICING MODAL - TRANG MUA GÓI / XEM GÓI DỊCH VỤ
// Hiển thị 3 gói: Miễn phí, Pro, Premium kiểu FPT Play
// ==============================================================================

import { useState, useEffect } from "react";

// ------------------------------------------------------------------------------
// Props
// ------------------------------------------------------------------------------
interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

// ------------------------------------------------------------------------------
// Cấu hình các gói dịch vụ
// ------------------------------------------------------------------------------
const PLANS = [
  {
    id: "free",
    name: "Miễn phí",
    price: "0",
    period: "mãi mãi",
    color: "#6b7280",
    gradient: "from-gray-800 to-gray-900",
    badge: null,
    features: [
      { text: "Gợi ý 5 phim / ngày", included: true },
      { text: "Xem thông tin phim cơ bản", included: true },
      { text: "Tìm kiếm phim", included: true },
      { text: "Lưu danh sách yêu thích", included: false },
      { text: "Gợi ý không giới hạn", included: false },
      { text: "Xuất kết quả Excel/PDF", included: false },
    ],
    cta: "Đăng ký miễn phí",
    ctaStyle: "border border-gray-600 text-gray-300 hover:border-gray-400 hover:bg-gray-800/50",
  },
  {
    id: "pro",
    name: "Pro",
    price: "79,000",
    period: "tháng",
    color: "#f97316",
    gradient: "from-orange-950 to-gray-900",
    badge: "Phổ biến nhất",
    features: [
      { text: "Tất cả tính năng Miễn phí", included: true },
      { text: "Gợi ý không giới hạn", included: true },
      { text: "Lưu danh sách yêu thích", included: true },
      { text: "Lọc phim theo thể loại", included: true },
      { text: "Xuất kết quả Excel/PDF", included: false },
      { text: "API truy xuất dữ liệu", included: false },
    ],
    cta: "Dùng thử 7 ngày miễn phí",
    ctaStyle: "bg-orange-500 hover:bg-orange-600 text-white glow-orange border border-orange-500",
  },
  {
    id: "premium",
    name: "Premium",
    price: "199,000",
    period: "tháng",
    color: "#a855f7",
    gradient: "from-purple-950 to-gray-900",
    badge: "Nhiều tính năng nhất",
    features: [
      { text: "Tất cả tính năng Pro", included: true },
      { text: "API truy xuất dữ liệu", included: true },
      { text: "Xuất kết quả Excel/PDF", included: true },
      { text: "Phân tích hành vi xem phim", included: true },
      { text: "Hỗ trợ ưu tiên 24/7", included: true },
      { text: "Custom recommendation model", included: true },
    ],
    cta: "Nâng cấp Premium",
    ctaStyle: "bg-purple-600 hover:bg-purple-700 text-white border border-purple-600",
  },
];

// ------------------------------------------------------------------------------
// Component chính PricingModal
// ------------------------------------------------------------------------------
export default function PricingModal({
  isOpen,
  onClose,
  onOpenLogin,
}: PricingModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Tính giá khi chọn yearly (giảm 20%)
  const getPrice = (price: string) => {
    if (price === "0") return "0";
    const num = parseInt(price.replace(/,/g, ""));
    if (billing === "yearly") {
      return Math.floor(num * 0.8).toLocaleString("vi-VN");
    }
    return price;
  };

  const handleActionClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <div
      className="modal-overlay animate-overlayIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-modalIn rounded-2xl relative scrollbar-hide"
        style={{
          background: "linear-gradient(145deg, #0d0d14 0%, #0a0a10 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Glow trên */}
        <div
          className="sticky top-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), rgba(168,85,247,0.5), transparent)" }}
        />

        {/* Nút đóng */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 pb-10">
          {/* ---------------------------------------------------------------- */}
          {/* HEADER */}
          {/* ---------------------------------------------------------------- */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider">
                Mua gói
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Chọn gói phù hợp với bạn
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
              Hệ thống gợi ý phim cá nhân hóa dựa trên Big Data và AI. Nâng tầm trải nghiệm điện ảnh của bạn ngay hôm nay.
            </p>

            {/* Toggle monthly / yearly */}
            <div className="inline-flex items-center gap-2 glass rounded-xl p-1.5">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  billing === "monthly"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Hàng tháng
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  billing === "yearly"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Hàng năm
                <span className="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* CÁC GÓI DỊCH VỤ */}
          {/* ---------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col ${
                  selectedPlan === plan.id
                    ? "scale-[1.03] z-10"
                    : "hover:scale-[1.02]"
                }`}
                style={{
                  background:
                    selectedPlan === plan.id
                      ? `linear-gradient(145deg, ${plan.color}15 0%, rgba(10,10,16,0.95) 100%)`
                      : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${
                    selectedPlan === plan.id
                      ? `${plan.color}80`
                      : "rgba(255,255,255,0.08)"
                  }`,
                  boxShadow:
                    selectedPlan === plan.id
                      ? `0 0 40px ${plan.color}25, 0 20px 40px rgba(0,0,0,0.4)`
                      : "none",
                }}
              >
                {/* Badge phổ biến */}
                {plan.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap"
                    style={{ background: plan.color }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Tiêu đề gói */}
                <div className="mb-6 border-b border-white/5 pb-6">
                  <div
                    className="text-sm font-black uppercase tracking-widest mb-3"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-4xl font-black text-white leading-none">
                      {getPrice(plan.price)}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-gray-500 text-sm font-medium mb-1">
                        đ/{plan.period}
                      </span>
                    )}
                    {plan.price === "0" && (
                      <span className="text-gray-500 text-sm font-medium mb-1">
                        VNĐ
                      </span>
                    )}
                  </div>
                  {billing === "yearly" && plan.price !== "0" ? (
                    <p className="text-green-400 text-xs font-semibold">
                      Tiết kiệm 20% so với hàng tháng
                    </p>
                  ) : (
                    <div className="h-4"></div> /* Spacer để giữ height */
                  )}
                </div>

                {/* Danh sách tính năng */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.included ? "" : "opacity-30"
                        }`}
                        style={{
                          background: feature.included ? `${plan.color}30` : "rgba(255,255,255,0.05)",
                          border: `1px solid ${feature.included ? plan.color : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {feature.included ? (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? "text-gray-300" : "text-gray-600 line-through decoration-gray-700"}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={handleActionClick}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center text-gray-500 text-xs max-w-2xl mx-auto">
            Bằng việc đăng ký, bạn đồng ý với các Điều khoản sử dụng và Chính sách bảo mật của chúng tôi. Bạn có thể hủy gia hạn bất kỳ lúc nào tại trang quản lý tài khoản.
          </div>
        </div>
      </div>
    </div>
  );
}
