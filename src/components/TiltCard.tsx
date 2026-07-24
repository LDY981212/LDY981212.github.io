"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

// 4도. 원래 6도였는데, 스포트라이트를 걷어내고 나니 기울기만으로도 충분하고
// 각도가 작을수록 카드 안의 글이 덜 일그러진다.
const MAX_TILT_DEG = 4;

interface TiltCardProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variants?: Variants;
  onClick?: () => void;
}

/**
 * 포인터를 따라 살짝 기우는 카드.
 *
 * 터치 기기와 prefers-reduced-motion에서는 정적인 카드로 떨어진다.
 */
export default function TiltCard({
  children,
  id,
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
      id={id}
      variants={variants}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      // 자식을 감싸는 div를 두면 호출부가 지정한 flex·gap·mt-auto가 그 div에
      // 걸려 정작 내용에는 적용되지 않는다.
      className={`group relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
