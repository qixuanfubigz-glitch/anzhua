"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FLY_DURATION = 1.8;
const LOOP_DELAY = 0.6;
const CYCLE_MS = (FLY_DURATION + LOOP_DELAY) * 1000;

export default function TutorialStep02() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const flashAt = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    };
    const firstFlash = setTimeout(flashAt, FLY_DURATION * 1000);
    const id = setInterval(flashAt, CYCLE_MS);
    return () => {
      clearTimeout(firstFlash);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-white/50">
        Step 02 · Copy / paste the script
      </p>
      <div className="relative flex items-center justify-center gap-6 sm:gap-8">
        {/* Clipboard icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5">
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70"
          >
            <rect x="6" y="2" width="10" height="14" rx="1.5" />
            <path d="M8 6h6M8 10h6M8 14h4" />
          </svg>
        </div>

        {/* Flying code block */}
        <motion.div
          className="absolute left-6 h-3 w-11 rounded bg-white/50 sm:left-8 sm:w-12"
          animate={{
            x: 88,
          }}
          transition={{
            duration: FLY_DURATION,
            repeat: Infinity,
            repeatDelay: LOOP_DELAY,
            ease: "easeInOut",
          }}
        />

        {/* Mini terminal with three dots */}
        <div className="relative flex h-14 w-24 shrink-0 flex-col overflow-hidden rounded-lg border border-white/20 bg-zinc-950">
          <div className="flex gap-1 px-2 py-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
          </div>
          <div className="flex-1 px-2 pb-2" />
          <motion.div
            className="absolute inset-0 rounded-lg bg-white/35"
            animate={{ opacity: flash ? 1 : 0 }}
            transition={{ duration: 0.08 }}
          />
        </div>
      </div>
      <p className="text-center text-sm text-white/60">
        Copy the command above and paste it into PowerShell or Terminal.
      </p>
    </div>
  );
}
