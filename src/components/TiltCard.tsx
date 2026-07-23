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
  onClick?: () => void;
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
  onClick,
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
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      // isolate가 스택 컨텍스트를 만들어 -z-10인 스포트라이트가 카드 배경 위,
      // 내용 아래에 놓인다. 자식을 감싸는 div를 두면 호출부가 지정한
      // flex·gap·mt-auto가 그 div에 걸려 정작 내용에는 적용되지 않는다.
      className={`group relative isolate ${className}`}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {children}
    </motion.div>
  );
}
