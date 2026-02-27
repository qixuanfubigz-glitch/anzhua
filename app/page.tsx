"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IgnitionBackground from "./components/IgnitionBackground";
import GooeyNav from "./components/GooeyNav";
import { GlareCard } from "@/components/ui/glare-card";
import GlareCardCarousel from "./components/GlareCardCarousel";
import ScriptCopyBar from "./components/ScriptCopyBar";
import TutorialStep01 from "./components/tutorial/TutorialStep01";
import TutorialStep02 from "./components/tutorial/TutorialStep02";
import TutorialStep03 from "./components/tutorial/TutorialStep03";

type ConfigId = "general" | "vibe" | "ai";

const CONFIGS: Record<ConfigId, { script: string; accent: string }> = {
  general: {
    script: "irm http://localhost:3000/api/config1 | iex",
    accent: "#38bdf8", // blue
  },
  vibe: {
    script: "irm get.oneclickcode.dev/vibe | iex",
    accent: "#a855f7", // purple
  },
  ai: {
    script: "irm get.oneclickcode.dev/ai | iex",
    accent: "#facc15", // gold
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export default function Home() {
  const [selectedConfig, setSelectedConfig] = useState<ConfigId>("general");
  const currentConfig = CONFIGS[selectedConfig];

  return (
    <main className="min-h-screen bg-black">
      {/* Full-screen Hero: animation fills entire first viewport */}
      <motion.section
        className="relative min-h-screen w-full overflow-hidden bg-black"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <IgnitionBackground />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-tight"
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            One Click, Endless
            <br />
            Possibilities.
          </motion.h1>
          <motion.p
            className="mt-5 text-white/90 text-base sm:text-lg font-semibold leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Setup your dev environment in seconds.
            <br />
            Code without limits.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.0, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <motion.a
              href="#one-script-section"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[#0C0C0C] bg-white hover:bg-white/95 transition-colors duration-200 shadow-lg select-none"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="#one-script-section"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-white/80 bg-white/[0.08] border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.18] transition-colors duration-200 select-none"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Learn More
            </motion.a>
          </motion.div>
          <motion.p
            className="mt-10 text-xs text-white/50"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            v1.0.0 | macOS / Windows / Linux | Install via PowerShell
          </motion.p>
        </div>
      </motion.section>

      {/* Two-column: Slogan + Description (left) | GooeyNav (right) */}
      <section id="one-script-section" className="w-full bg-black border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                One script for the whole stack.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
                Initialize your entire development environment with a single command. No more manual configuration.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-[64px] flex items-center rounded-full bg-white/[0.06] border border-white/[0.08] px-2 py-1">
                <GooeyNav
                  items={[
                    { label: "Mac", href: "#" },
                    { label: "Windows", href: "#" },
                    { label: "Linux", href: "#" },
                  ]}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Config Cards 区域 */}
      <section id="configs-section" className="relative w-full bg-black py-12 sm:py-16">
        {/* Hero 与 Config 交界：横线 + 中心蓝色光晕 */}
        <div className="absolute left-0 right-0 top-0 flex justify-center overflow-hidden pointer-events-none">
          <div
            className="h-[200px] w-[min(100vw,1200px)] opacity-70"
            style={{
              background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 65%)",
              filter: "blur(80px)",
            }}
            aria-hidden
          />
        </div>
        <div
          className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          aria-hidden
        />
        <GlareCardCarousel>
          <button
            type="button"
            onClick={() => setSelectedConfig("general")}
            className="h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-[32px]"
          >
            <GlareCard className="relative flex flex-col !bg-[#0a192f] overflow-hidden">
            {/* 黑色图层：加深整体 */}
            <div className="absolute inset-0 z-0 bg-black/50" aria-hidden />
            {/* 参考卡：极淡星点纹理 */}
            <div
              className="absolute inset-0 z-0 opacity-[0.12]"
              aria-hidden
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* 中间竖条从上到下亮、左右两边深 */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.5) 100%)",
              }}
              aria-hidden
            />
            {/* Config Card 1 文字内容 */}
            <div className="relative z-10 flex h-full w-full flex-col p-8">
              <h3 className="font-bold text-xl text-white">General Dev Suite</h3>
              <p className="mt-1 font-mono text-xs tracking-tight text-zinc-400">C + C++ + Python + VS Code</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">Instant setup for C, C++, and Python environments in VS Code with &quot;one-click&quot; execution. Integrated with essential optimization extensions.</p>
              <div className="flex-1 min-h-4" />
              <div className="inline-flex flex-wrap gap-2">
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">🏆 Competitive Programming</span>
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">🐍 Scripting &amp; Automation</span>
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">🛠️ Mini Projects</span>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-zinc-600">Optimized for Performance &amp; Stability</p>
            </div>
          </GlareCard>
          </button>
          <button
            type="button"
            onClick={() => setSelectedConfig("vibe")}
            className="h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-[32px]"
          >
          <GlareCard className="relative flex flex-col !bg-[#0a192f] overflow-hidden">
            {/* 黑色图层：加深整体 */}
            <div className="absolute inset-0 z-0 bg-black/50" aria-hidden />
            {/* 参考卡：极淡星点纹理 */}
            <div
              className="absolute inset-0 z-0 opacity-[0.12]"
              aria-hidden
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* 中间竖条从上到下亮、左右两边深 */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.5) 100%)",
              }}
              aria-hidden
            />
            {/* Config Card 2 文字内容 */}
            <div className="relative z-10 flex h-full w-full flex-col p-8">
              <h3 className="font-bold text-xl text-white">Vibe Coding Suite</h3>
              <p className="mt-1 font-mono text-xs tracking-tight text-zinc-400">Cursor + Claude Code / CLI Agent</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">The ultimate AI-native development setup. Integrated Claude Code directly within the Cursor terminal for seamless agentic coding.</p>
              <div className="flex-1 min-h-4" />
              <div className="inline-flex flex-wrap gap-2">
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">✨ Intent-Driven</span>
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">🧠 Agentic Autopilot</span>
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">💬 Chat-to-Code</span>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-zinc-600">The Most Recommended Setup for 2026</p>
            </div>
          </GlareCard>
          </button>
          <button
            type="button"
            onClick={() => setSelectedConfig("ai")}
            className="h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-[32px]"
          >
          <GlareCard className="relative flex flex-col !bg-[#0a192f] overflow-hidden">
            {/* 黑色图层：加深整体 */}
            <div className="absolute inset-0 z-0 bg-black/50" aria-hidden />
            {/* 参考卡：极淡星点纹理 */}
            <div
              className="absolute inset-0 z-0 opacity-[0.12]"
              aria-hidden
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* 中间竖条从上到下亮、左右两边深 */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.5) 100%)",
              }}
              aria-hidden
            />
            {/* Config Card 3 文字内容 */}
            <div className="relative z-10 flex h-full w-full flex-col p-8">
              <h3 className="font-bold text-xl text-white">AI &amp; Data Science Suite</h3>
              <p className="mt-1 font-mono text-xs tracking-tight text-zinc-400">VS Code + Jupyter + PyTorch + Conda</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">The gold standard for AI research in VS Code. Seamlessly integrated with Jupyter Notebooks and Python Data Science tools.</p>
              <div className="flex-1 min-h-4" />
              <div className="inline-flex flex-wrap gap-2">
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">📓 Jupyter Native</span>
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs text-zinc-300">🚀 GPU Accelerated</span>
              </div>
              <div className="mt-4 flex justify-end">
                <a
                  href="#"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Learn more
                </a>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-zinc-600">Ready for Research &amp; Production</p>
            </div>
          </GlareCard>
          </button>
        </GlareCardCarousel>
        <div className="mt-10 px-6">
          <ScriptCopyBar
            script={currentConfig.script}
            promptChar=">"
            accentColor={currentConfig.accent}
            selectionKey={selectedConfig}
          />
        </div>

        {/* Tutorial：三张步骤卡片 */}
        <div className="mx-auto mt-14 grid w-full max-w-[1056px] grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.1] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
            <TutorialStep01 />
          </div>
          <div className="rounded-xl border border-white/[0.1] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
            <TutorialStep02 />
          </div>
          <div className="rounded-xl border border-white/[0.1] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
            <TutorialStep03 />
          </div>
        </div>
      </section>
    </main>
  );
}
