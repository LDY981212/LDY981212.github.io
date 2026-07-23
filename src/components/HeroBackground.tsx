"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * 스톡 사진 대신 쓰는 히어로 배경.
 *
 * 격자는 프론트엔드가 매일 다루는 레이아웃의 은유이고, 그 위에 뜬 두 개의 빛무리가
 * 포인터를 느리게 따라온다. 이미지 최적화가 꺼진 정적 export라 파일을 받지 않는
 * CSS 그라디언트로만 만들었다.
 */
export default function HeroBackground() {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.4);

  // 곧바로 따라오면 산만하다. 무겁게 감속시켜 "떠 있는" 느낌을 만든다.
  const glowX = useSpring(pointerX, { stiffness: 40, damping: 24, mass: 1.2 });
  const glowY = useSpring(pointerY, { stiffness: 40, damping: 24, mass: 1.2 });

  const blueLeft = useTransform(glowX, (v) => `calc(${v * 100}% - 35vmax)`);
  const blueTop = useTransform(glowY, (v) => `calc(${v * 100}% - 35vmax)`);
  const amberRight = useTransform(
    glowX,
    (v) => `calc(${(1 - v) * 100}% - 26vmax)`
  );
  const amberBottom = useTransform(
    glowY,
    (v) => `calc(${(1 - v) * 100}% - 26vmax)`
  );

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth);
      pointerY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--glow-a) 0%, transparent 62%)",
          left: blueLeft,
          top: blueTop,
        }}
      />
      <motion.div
        className="absolute h-[52vmax] w-[52vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--glow-b) 0%, transparent 62%)",
          right: amberRight,
          bottom: amberBottom,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 0.1rem, transparent 0.1rem), linear-gradient(90deg, var(--grid-line) 0.1rem, transparent 0.1rem)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 45%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 45%, #000 20%, transparent 78%)",
        }}
      />

      {/* 히어로 아래쪽을 페이지 배경으로 자연스럽게 넘긴다. */}
      <div className="absolute inset-x-0 bottom-0 h-[16rem] bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
