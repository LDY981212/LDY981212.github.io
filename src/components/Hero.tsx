"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import heroWords, { objectParticle } from "@/constants/heroWords";
import { ease } from "@/utils/FramerVariants";
import HeroBackground from "./HeroBackground";

const WORD_INTERVAL_MS = 2600;

// 라인 단위 마스크 리빌. 부모가 overflow-hidden이라 글자가 아래에서 밀려 올라온다.
const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.75, delay: 0.15 + i * 0.1, ease },
  }),
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % heroWords.length);
    }, WORD_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const word = heroWords[wordIndex];

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-[1.5rem] py-[10rem]"
    >
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mono mb-[2.4rem] flex items-center gap-[0.8rem] text-[1.1rem] uppercase tracking-[0.22em] text-muted md:text-[1.3rem]"
        >
          <span aria-hidden className="h-[0.1rem] w-[2.4rem] bg-accent" />
          Frontend Developer · Bucheon, KR
        </motion.span>

        <h1 className="display text-center text-[2.2rem] font-black leading-[1.45] text-ink md:text-[3.4rem] lg:text-[4.6rem]">
          <Line index={0}>안녕하세요.</Line>
          <Line index={1}>
            더 나은{" "}
            <Marker>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: "0.3em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-0.3em" }}
                  transition={{ duration: 0.35, ease }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </AnimatePresence>
              {objectParticle(word)}
            </Marker>{" "}
            고민하고,
          </Line>
          <Line index={2}>
            끊임없이 <span className="text-accent">성장</span>하는
          </Line>
          <Line index={3}>
            프론트엔드 개발자 <span className="text-accent">이도엽</span>입니다.
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          className="mt-[4rem] flex flex-wrap items-center justify-center gap-[1.2rem]"
        >
          <a
            href="#about"
            className="flex h-[4.8rem] items-center rounded-full bg-accent px-[2.4rem] text-[1.4rem] font-bold text-accent-ink transition-transform hover:scale-[1.04] md:h-[5.4rem] md:px-[3rem] md:text-[1.6rem]"
          >
            더 알아보기 ↓
          </a>
          <a
            href="https://github.com/LDY981212"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[4.8rem] items-center rounded-full border border-line px-[2.4rem] text-[1.4rem] font-bold text-ink transition-colors hover:border-accent hover:text-accent md:h-[5.4rem] md:px-[3rem] md:text-[1.6rem]"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-[3rem] left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mono block text-[1rem] uppercase tracking-[0.2em] text-muted"
        >
          scroll
        </motion.span>
      </motion.span>
    </section>
  );
}

function Line({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate="show"
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * 회전하는 단어 위를 지나가는 형광펜. 사이트에서 앰버를 쓰는 유일한 자리다.
 *
 * 절대배치 막대는 line-height가 큰 문단에서 글자 아래로 떨어져 밑줄처럼 보인다.
 * 배경 그라디언트로 그으면 글자 높이에 붙고, 단어 길이가 바뀌어도 알아서 따라온다.
 */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      layout
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{
        backgroundSize: { duration: 0.7, delay: 0.9, ease },
        layout: { duration: 0.35, ease },
      }}
      style={{
        backgroundImage:
          "linear-gradient(transparent 52%, var(--marker) 52%, var(--marker) 92%, transparent 92%)",
        backgroundRepeat: "no-repeat",
      }}
      className="inline-block whitespace-nowrap px-[0.1em]"
    >
      {children}
    </motion.span>
  );
}
