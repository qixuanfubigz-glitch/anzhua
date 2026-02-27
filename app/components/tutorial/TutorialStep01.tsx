"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY_DURATION = 1.2;

export default function TutorialStep01() {
  const [pressed, setPressed] = React.useState<"win" | "x" | null>("win");

  React.useEffect(() => {
    const t = setInterval(() => {
      setPressed((prev) => (prev === "win" ? "x" : "win"));
    }, KEY_DURATION * 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-white/50">
        Step 01 · Open terminal
      </p>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-end gap-2">
          {/* [ Win ] key - no Admin bubble */}
          <motion.div
            className="rounded-md border-2 border-b-4 border-zinc-700 border-b-zinc-950 bg-zinc-800 px-4 py-2.5 font-mono text-sm font-medium text-zinc-300"
            animate={{
              y: pressed === "win" ? 2 : 0,
              backgroundColor: pressed === "win" ? "rgb(255 255 255)" : "rgb(39 39 42)",
              color: pressed === "win" ? "rgb(10 10 10)" : "rgb(212 212 216)",
            }}
            transition={{ duration: 0.08, ease: "easeOut" }}
          >
            Win
          </motion.div>
          {/* [ X ] key - Admin 只在 X 按下后出现 */}
          <div className="relative">
            <motion.div
              className="rounded-md border-2 border-b-4 border-zinc-700 border-b-zinc-950 bg-zinc-800 px-4 py-2.5 font-mono text-sm font-medium text-zinc-300"
              animate={{
                y: pressed === "x" ? 2 : 0,
                backgroundColor: pressed === "x" ? "rgb(255 255 255)" : "rgb(39 39 42)",
                color: pressed === "x" ? "rgb(10 10 10)" : "rgb(212 212 216)",
              }}
              transition={{ duration: 0.08, ease: "easeOut" }}
            >
              X
            </motion.div>
          </div>
        </div>
        {/* 预留 Admin 位置，格子大小不变 */}
        <div className="flex h-8 w-full items-center justify-center">
          <AnimatePresence>
            {pressed === "x" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-zinc-900 shadow-lg"
              >
                Admin
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-center text-sm text-white/60">
        Press <kbd className="rounded border border-white/20 bg-white/10 px-1 font-mono text-xs">Win</kbd> + <kbd className="rounded border border-white/20 bg-white/10 px-1 font-mono text-xs">X</kbd>, then choose &quot;Terminal (Admin)&quot;.
      </p>
    </div>
  );
}
