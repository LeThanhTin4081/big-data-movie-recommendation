"use client";

// AD BANNER — LPBANK VISA — COMPACT 145px VERSION

import { useState, useEffect, useCallback } from "react";
import {
  CreditCard, Gift, Ticket, Globe, Lock, Smartphone, Trophy, Star, Tv, ChevronRight,
} from "lucide-react";

// Types
interface Slide {
  id: number;
  accentFrom: string;
  accentTo: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  bigNumber: string;
  bigLabel: string;
  badges: { icon: string; text: string }[];
  ctaText: string;
  cardLabels: string[];
}

// Data
const SLIDES: Slide[] = [
  {
    id: 0,
    accentFrom: "#FFD700",
    accentTo: "#FF8C00",
    tagline: "Ưu đãi thẻ tín dụng quốc tế LPBank",
    headline: "Chi tiêu thả ga",
    headlineAccent: "Hoàn tiền tối đa",
    subtext: "Áp dụng với thẻ tín dụng quốc tế LPBank Visa",
    bigNumber: "5",
    bigLabel: "triệu đồng",
    badges: [
      { icon: "creditcard", text: "Hoàn 2,5 Triệu" },
      { icon: "gift", text: "Hoàn 1,2 Triệu" },
      { icon: "ticket", text: "Hoàn 500K" },
    ],
    ctaText: "Đăng ký ngay",
    cardLabels: ["LPBank Platinum", "LPBank Signature", "LPBank Gold"],
  },
  {
    id: 1,
    accentFrom: "#FFC700",
    accentTo: "#E6A800",
    tagline: "Đại tiệc siêu hời cùng LPBank Visa",
    headline: "Thanh toán muôn nơi",
    headlineAccent: "Hoàn tiền siêu hời",
    subtext: "Ưu đãi tại Shopee, Be, Uniqlo và hơn 1000 đối tác",
    bigNumber: "45%",
    bigLabel: "hoàn tiền",
    badges: [
      { icon: "globe", text: "Du lịch" },
      { icon: "star", text: "Tiện ích" },
      { icon: "tv", text: "Mua sắm" },
    ],
    ctaText: "Khám phá ngay",
    cardLabels: ["Visa Cashback", "Visa Voucher", "Visa Premium"],
  },
  {
    id: 2,
    accentFrom: "#FFD000",
    accentTo: "#FFB300",
    tagline: "Mở thẻ online — Nhận ngay ưu đãi",
    headline: "Thẻ quyền năng",
    headlineAccent: "Quà tặng bất tận",
    subtext: "Thẻ Visa LPBank — Trải nghiệm đỉnh cao",
    bigNumber: "0đ",
    bigLabel: "phí thường niên",
    badges: [
      { icon: "smartphone", text: "1 Phút mở thẻ" },
      { icon: "lock", text: "Bảo mật cao" },
      { icon: "trophy", text: "Đặc quyền VIP" },
    ],
    ctaText: "Mở thẻ ngay",
    cardLabels: ["Debit Card", "Credit Card", "Premium Card"],
  },
];

// Icon helper
function Ico({ name, size = 14 }: { name: string; size?: number }) {
  const p = { size, strokeWidth: 2.2 };
  switch (name) {
    case "creditcard": return <CreditCard {...p} />;
    case "gift": return <Gift {...p} />;
    case "ticket": return <Ticket {...p} />;
    case "globe": return <Globe {...p} />;
    case "lock": return <Lock {...p} />;
    case "smartphone": return <Smartphone {...p} />;
    case "trophy": return <Trophy {...p} />;
    case "star": return <Star {...p} />;
    case "tv": return <Tv {...p} />;
    default: return null;
  }
}

// Mini Visa Card
function MiniCard({ label, accent, rotate, lift, isCenter }: {
  label: string; accent: string; rotate: number; lift: number; isCenter?: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 transition-all duration-500"
      style={{
        width: 110, height: 68,
        transform: `rotate(${rotate}deg) translateY(${lift}px) scale(${isCenter ? 1.06 : 1})`,
        marginLeft: rotate === 0 ? -20 : rotate > 0 ? -20 : 0,
        zIndex: isCenter ? 10 : 5,
        filter: isCenter
          ? `drop-shadow(0 4px 14px ${accent}55)`
          : "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
      }}
    >
      <div
        className="w-full h-full rounded-lg p-2 flex flex-col justify-between relative overflow-hidden"
        style={{
          background: isCenter
            ? "linear-gradient(135deg, #1a1505 0%, #0d0d0d 50%, #1a1505 100%)"
            : "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
          border: `1px solid ${isCenter ? accent : "rgba(255,255,255,0.1)"}`,
        }}
      >
        {/* decorative rings */}
        <svg className="absolute right-[-8px] top-[-8px] w-[50px] h-[50px] pointer-events-none" style={{ opacity: 0.12 }}>
          <circle cx="25" cy="25" r="12" stroke={accent} strokeWidth="0.8" fill="none" />
          <circle cx="25" cy="25" r="18" stroke={accent} strokeWidth="0.5" fill="none" />
          <circle cx="25" cy="25" r="24" stroke={accent} strokeWidth="0.3" fill="none" />
        </svg>

        {/* top: bank name + label */}
        <div className="flex items-start justify-between z-10">
          <div>
            <div className="text-[7px] font-black text-white tracking-tight leading-none">
              LPBank<span className="inline-block w-[3px] h-[3px] rounded-full ml-[2px] align-middle" style={{ background: accent }} />
            </div>
            <div className="text-[4.5px] text-white/35 tracking-wider uppercase mt-[2px]">{label}</div>
          </div>
          {/* contactless icon thay cho chip vàng */}
          <svg className="w-[10px] h-[10px] text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M8.5 16.5a5 5 0 010-9" />
            <path d="M12 19a9 9 0 010-14" />
            <path d="M15.5 21.5a13 13 0 010-19" />
          </svg>
        </div>

        {/* bottom: number + VISA */}
        <div className="flex items-end justify-between z-10">
          <div className="text-[6px] font-mono text-white/50 tracking-[0.15em]">•••• 9999</div>
          <div className="text-[8px] font-black tracking-tight text-white/60">VISA</div>
        </div>
      </div>
    </div>
  );
}

// MAIN COMPONENT
export default function AdBanner() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);

  const goTo = useCallback((i: number) => {
    if (i === idx || fade) return;
    setFade(true);
    setTimeout(() => { setIdx(i); setFade(false); }, 300);
  }, [idx, fade]);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIdx(p => (p + 1) % SLIDES.length);
        setFade(false);
      }, 300);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;
  const s = SLIDES[idx];

  return (
    <div className="w-full select-none relative overflow-hidden" style={{ height: 145 }}>

      {/* BG gradient */}
      <div
        className="absolute inset-0 transition-all duration-600"
        style={{ background: `linear-gradient(100deg, #0c0c14 0%, #0c0c14 40%, ${s.accentFrom}08 70%, ${s.accentFrom}12 100%)` }}
      />
      {/* radial glow behind big number */}
      <div
        className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[260px] h-[200px] rounded-full pointer-events-none transition-all duration-600"
        style={{ background: `radial-gradient(ellipse, ${s.accentFrom}12 0%, transparent 70%)` }}
      />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-[3px]">
        <div className="flex items-center gap-1.5">
          <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: s.accentFrom }} />
          <span className="text-[9px] font-semibold uppercase tracking-[2px] text-white/35">Quảng cáo tài trợ</span>
        </div>
        <button onClick={() => setVisible(false)} aria-label="Đóng" className="text-white/25 hover:text-white transition-colors p-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* CONTENT ROW */}
      <div className="relative z-20 h-full flex items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto pt-5 pb-4 px-4">

        {/* LEFT COLUMN: Text */}
        <div
          className="flex-shrink-0 flex flex-col justify-center gap-2 transition-all duration-300 w-[340px] md:w-[400px]"
          style={{ opacity: fade ? 0 : 1, transform: fade ? "translateX(-6px)" : "translateX(0)" }}
        >
          {/* brand pill & tagline */}
          <div className="flex items-center gap-3 mb-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[9px] font-black text-white/80 tracking-tight">VISA</span>
              <span className="w-px h-2 bg-white/15" />
              <span className="text-[9px] font-black text-white/80 tracking-tight">LPBank<span className="inline-block w-1 h-1 rounded-full ml-[2px] align-middle" style={{ background: s.accentFrom }} /></span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[1.5px] leading-none" style={{ color: s.accentFrom }}>
              {s.tagline}
            </p>
          </div>

          {/* headline */}
          <div className="leading-none mb-1">
            <div className="text-white font-black text-xl md:text-2xl lg:text-[28px] tracking-tight leading-[1.1]">{s.headline}</div>
            <div className="font-black text-xl md:text-2xl lg:text-[28px] tracking-tight leading-[1.1]" style={{ color: s.accentFrom }}>{s.headlineAccent}</div>
          </div>

          {/* subtext */}
          <p className="text-[11px] text-white/50 w-full truncate">{s.subtext}</p>
        </div>

        {/* CENTER COLUMN: Badges + CTA */}
        <div
          className="hidden lg:flex flex-shrink-0 flex-col justify-center gap-3 transition-all duration-300 px-8 border-l border-white/10"
          style={{ opacity: fade ? 0 : 1, transform: fade ? "scale(0.95)" : "scale(1)", minWidth: "160px" }}
        >
          <div className="flex flex-col gap-2">
            {s.badges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1 rounded-md w-max"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: s.accentFrom }}><Ico name={b.icon} size={12} /></span>
                <span className="text-[10px] text-white/70 font-semibold">{b.text}</span>
              </div>
            ))}
          </div>

          <a
            href="#visa-lpbank"
            className="inline-flex items-center justify-center gap-1.5 font-black text-[10px] px-4 py-2 rounded-full hover:brightness-110 transition-all hover:scale-[1.03] active:scale-[0.97] w-max mt-1"
            style={{ background: `linear-gradient(135deg, ${s.accentFrom}, ${s.accentTo})`, color: "#000", boxShadow: `0 2px 10px ${s.accentFrom}30` }}
          >
            {s.ctaText}
            <ChevronRight size={13} strokeWidth={3} />
          </a>
        </div>

        {/* RIGHT: 3 Visa cards fan */}
        <div
          className="hidden md:flex flex-shrink-0 items-center justify-center transition-all duration-300 w-[240px]"
          style={{ opacity: fade ? 0 : 1, transform: fade ? "translateX(8px)" : "translateX(0)" }}
        >
          <MiniCard label={s.cardLabels[0]} accent={s.accentFrom} rotate={-7} lift={3} />
          <MiniCard label={s.cardLabels[1]} accent={s.accentFrom} rotate={0} lift={-4} isCenter />
          <MiniCard label={s.cardLabels[2]} accent={s.accentFrom} rotate={7} lift={3} />
        </div>

      </div>

      {/* BOTTOM BAR: dots + info */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-[3px]">
        <div className="flex items-center gap-1">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === idx ? 14 : 5, height: 4, background: i === idx ? s.accentFrom : "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>
        <span className="text-[10px] text-white/25 tracking-wide">Từ 12/09/2026 — 12/12/2026</span>
      </div>

      {/* accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-40 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo}60, transparent)` }} />
    </div>
  );
}