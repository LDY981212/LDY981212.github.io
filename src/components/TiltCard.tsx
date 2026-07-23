"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const MAX_TILT_DEG = 6;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

/**
 * 포인터를 따라 살짝 기울고, 커서 자리에 옅은 빛이 도는 카드.
 *
 * 기울기는 6도까지만 준다. 그 이상은 카드 안의 글이 읽기 불편해진다.
 * 터치 기기와 prefers-reduced-motion에서는 정적인 카드로 떨어진다.
 */
export default function TiltCard({
  children,
  className = "",
  variants,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(py, [0, 1], [MAX_TILT_DEG, -MAX_TILT_DEG]),
    { stiffness: 220, damping: 24 }
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    { stiffness: 220, damping: 24 }
  );

  const spotX = useTransform(px, (v) => `${v * 100}%`);
  const spotY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(24rem circle at ${spotX} ${spotY}, var(--glow-a), transparent 70%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className={`group relative ${className}`}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
