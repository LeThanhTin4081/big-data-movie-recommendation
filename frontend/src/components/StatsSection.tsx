"use client";

// STATS SECTION - SỐ LIỆU DỰ ÁN VỚI ANIMATED COUNTER
// Hiển thị các con số quan trọng khi scroll đến

import { useEffect, useRef, useState } from "react";
import { BarChart3, Users, Clapperboard, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Hàm đếm số lên đến target
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration]);

  return count;
}

// Component một ô stat đơn lẻ
interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  icon: React.ReactNode;
  delay: number;
  started: boolean;
}

function StatItem({
  value,
  label,
  suffix = "",
  prefix = "",
  color,
  icon,
  delay,
  started,
}: StatItemProps) {
  const [localStart, setLocalStart] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setLocalStart(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  const count = useCountUp(value, 2000, localStart);

  return (
      <div
        className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center transition-all duration-700 hover:-translate-y-3 hover:bg-white/[0.02] overflow-hidden group/card"
      >
        {/* Ánh sáng nền (Ambient glow) */}
        <div 
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover/card:opacity-40 transition-opacity duration-700 pointer-events-none" 
          style={{ background: color }}
        />

        {/* Icon */}
        <div
          className="relative z-10 w-16 h-16 rounded-2xl p-[1px] mx-auto mb-6 shadow-2xl group-hover/card:scale-110 transition-transform duration-500"
          style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
        >
          <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
            <div style={{ color }}>
              {icon}
            </div>
          </div>
        </div>

        {/* Số đếm */}
        <div
          className="text-4xl font-extrabold mb-1 tabular-nums tracking-tight"
          style={{ color }}
        >
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </div>

        {/* Nhãn */}
        <div className="text-gray-400 text-sm font-medium">{label}</div>

        {/* Glow effect phía dưới */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
  );
}

// Component StatsSection chính
export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 100000,
      label: "Lượt đánh giá",
      suffix: "+",
      color: "#f97316",
      delay: 0,
      icon: <BarChart3 className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      value: 943,
      label: "Người dùng",
      color: "#3b82f6",
      delay: 150,
      icon: <Users className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      value: 1682,
      label: "Bộ phim",
      color: "#a855f7",
      delay: 300,
      icon: <Clapperboard className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      value: 5,
      label: "Gợi ý / Người dùng",
      prefix: "Top ",
      color: "#22c55e",
      delay: 450,
      icon: <Sparkles className="w-8 h-8" strokeWidth={1.5} />,
    },
  ];

  return (
    <ScrollReveal>
      <section ref={ref} className="py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} started={started} />
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
