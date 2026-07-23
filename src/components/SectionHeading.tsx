"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  eyebrow: string;
}

export default function SectionHeading({ title, eyebrow }: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-[6rem] flex flex-col items-center gap-[1.2rem]"
    >
      <span className="mono flex items-center gap-[0.8rem] text-[1.1rem] tracking-[0.18em] text-muted uppercase md:text-[1.2rem]">
        <span aria-hidden className="h-[0.1rem] w-[2rem] bg-accent" />
        {eyebrow}
      </span>
      <h2 className="display font-black text-[3rem] text-ink md:text-[4rem] lg:text-[5rem]">
        {title}
      </h2>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="h-[0.2rem] w-[8rem] origin-center bg-accent"
      />
    </motion.header>
  );
}
