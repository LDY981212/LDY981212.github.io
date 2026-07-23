"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ease } from "@/utils/FramerVariants";

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setVisible(value > 0.2);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="맨 위로"
          title="맨 위로"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease }}
          className="fixed bottom-[2rem] right-[2rem] z-30 flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full border border-line bg-surface text-[1.8rem] text-ink shadow-[var(--shadow)] transition-colors hover:border-accent hover:text-accent"
        >
          ↑
        </motion.a>
      )}
    </AnimatePresence>
  );
}
