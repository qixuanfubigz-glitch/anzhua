"use client";

import React, { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

export default function GlareCardCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const scroll = useCallback((direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const step = direction === "left" ? -SCROLL_STEP : SCROLL_STEP;
    el.scrollBy({ left: step, behavior: "smooth" });
  }, []);

  return (
    <motion.div ref={sectionRef} className="relative w-full">
      {/* 左边缘淡出（与 section 背景 #0a192f 一致） */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent"
        aria-hidden
      />
      {/* 右边缘淡出 */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent"
        aria-hidden
      />

      {/* 滑轨：卡片进入视口时 stagger + spring 动画 */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto overflow-y-hidden gap-6 pt-6 pb-14 scrollbar-hide scroll-smooth pl-[max(2rem,calc(50vw-528px))] pr-[max(2rem,calc(50vw-528px))]"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[320px] h-[396px]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.2,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>

      {/* 导航按钮：在卡片下面一点 */}
      <div className="absolute right-8 sm:right-16 bottom-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 hover:bg-white/10 hover:border-white/20 transition-colors"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 hover:bg-white/10 hover:border-white/20 transition-colors"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
