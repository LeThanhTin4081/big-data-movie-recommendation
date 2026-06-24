"use client";

// SCROLL PROGRESS BAR
// Thanh tiến trình cuộn trang - hiển thị ở trên cùng

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"
        style={{
          width: "0%",
          boxShadow: "0 0 10px rgba(249,115,22,0.8), 0 0 20px rgba(249,115,22,0.4)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
