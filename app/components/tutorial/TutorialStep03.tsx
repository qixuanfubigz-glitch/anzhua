"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TutorialStep03() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-white/50">
        Step 03 · Engine start
      </p>
      <motion.div
        className="rounded-lg border-2 border-b-4 border-zinc-700 border-b-zinc-950 bg-zinc-800 px-6 py-3 font-mono text-sm font-medium text-zinc-300"
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            "drop-shadow(0 0 6px rgba(255,255,255,0.15))",
            "drop-shadow(0 0 14px rgba(255,255,255,0.35))",
            "drop-shadow(0 0 6px rgba(255,255,255,0.15))",
          ],
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          filter: {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        Enter
      </motion.div>
      <p className="text-center text-sm text-white/60">
        Press Enter to start the one-click setup.
      </p>
    </div>
  );
}
