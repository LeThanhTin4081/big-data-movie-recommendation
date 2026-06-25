"use client";

// STATS SECTION - SỐ LIỆU DỰ ÁN VỚI ANIMATED COUNTER
// Hiển thị các con số quan trọng khi scroll đến

import { useEffect, useRef, useState } from "react";
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
    <div className="relative group">
      <div
        className="glass rounded-2xl p-6 text-center transition-all duration-300 group-hover:scale-105 overflow-hidden"
        style={{
          borderColor: `${color}30`,
          boxShadow: `0 0 30px ${color}10`,
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>

        {/* Số đếm */}
        <div
          className="text-4xl font-black mb-1 tabular-nums"
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
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      value: 943,
      label: "Người dùng",
      color: "#3b82f6",
      delay: 150,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      value: 1682,
      label: "Bộ phim",
      color: "#a855f7",
      delay: 300,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      value: 5,
      label: "Gợi ý / Người dùng",
      prefix: "Top ",
      color: "#22c55e",
      delay: 450,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
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
