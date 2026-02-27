"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Threads = dynamic(() => import("./Threads"), { ssr: false });

const THREADS_COLOR: [number, number, number] = [
  0.8235294117647058,
  0.807843137254902,
  0.8901960784313725,
];

export default function IgnitionBackground() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <Threads
        color={THREADS_COLOR}
        amplitude={2.3}
        distance={0}
        enableMouseInteraction
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  );
}
