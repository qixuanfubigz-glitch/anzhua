"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const DEFAULT_SCRIPT = "irm get.oneclickcode.dev | iex";

function fireCopyConfetti(origin: { x: number; y: number }) {
  confetti({
    particleCount: 28,
    spread: 52,
    origin,
    startVelocity: 18,
    scalar: 0.7,
    colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
  });
}

export default function ScriptCopyBar({
  script = DEFAULT_SCRIPT,
  promptChar = ">",
  accentColor = "#38bdf8",
  selectionKey = "default",
}: {
  script?: string;
  promptChar?: ">" | "$";
  accentColor?: string;
  selectionKey?: string;
}) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    if (buttonRef.current && typeof window !== "undefined") {
      const rect = buttonRef.current.getBoundingClientRect();
      fireCopyConfetti({
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      });
    }
    setTimeout(() => setCopied(false), 2000);
  }, [script]);

  const accentBorder = `${accentColor}66`;
  const accentGlow = `${accentColor}99`;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[1056px] rounded-xl border border-t-white/20 bg-[#0a0a0a]/90 backdrop-blur-md"
      style={{
        borderColor: accentBorder,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: `0 0 60px -18px ${accentGlow}, 0 0 0 1px rgba(255,255,255,0.08) inset`,
      }}
      transition={{
        opacity: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
        y: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
        boxShadow: { duration: 0.45, ease: "easeOut" },
      }}
    >
      {/* ripple / pulse when config changes */}
      <motion.div
        key={selectionKey}
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0.35, 0], scaleX: [0, 1.15] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor}33 50%, transparent 100%)`,
          transformOrigin: "left center",
        }}
        aria-hidden
      />

      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
        {/* 左侧极简符号 */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-medium text-white/50 tabular-nums">
          {promptChar}
        </span>
        {/* 脚本内容：滑动 + 淡入 */}
        <motion.code
          key={selectionKey}
          className="min-w-0 flex-1 truncate font-mono text-sm text-white/90 sm:text-base"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {script}
        </motion.code>
        {/* 复制按钮 */}
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={copy}
          className="relative shrink-0 rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white/90 hover:border-white/[0.14] min-w-[4.5rem]"
          whileTap={{ scale: 0.94 }}
          animate={copied ? { scale: [0.95, 1.05, 1] } : { scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <span className="flex items-center justify-center gap-1">
            {copied ? (
              <>
                <svg
                  className="h-3.5 w-3.5 text-emerald-300"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.5L6.00001 11.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Copied</span>
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 text-white/80"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="4"
                    width="8"
                    height="9"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="9"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    opacity="0.65"
                  />
                </svg>
                <span>Copy</span>
              </>
            )}
          </span>
        </motion.button>
      </div>

      {/* Copied tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-none absolute right-6 -top-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-900 shadow-lg"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
