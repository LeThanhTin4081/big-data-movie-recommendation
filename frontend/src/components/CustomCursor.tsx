"use client";

// ==============================================================================
// CUSTOM CURSOR - Con trỏ tùy chỉnh
// Dot cam + ring theo sau, hiệu ứng hover khi di qua các element tương tác
// ==============================================================================

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, input, [role='button'], .movie-card"
      );
      setIsHovering(!!isInteractive);
    };

    // Animation loop: ring theo sau dot với độ trễ
    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          transform: isHovering ? "translate(-50%, -50%) scale(1.8)" : "translate(-50%, -50%)",
          background: isHovering ? "white" : "var(--color-accent)",
          transition: "transform 0.15s, background 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          width: isHovering ? "52px" : "36px",
          height: isHovering ? "52px" : "36px",
          borderColor: isHovering ? "var(--color-accent)" : "rgba(249, 115, 22, 0.6)",
        }}
      />
    </>
  );
}
