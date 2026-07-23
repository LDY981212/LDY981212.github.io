import type { Variants } from "framer-motion";

// 사이트 전체가 같은 이징을 쓴다. 빠르게 튀어나와 부드럽게 멎는 곡선.
export const ease = [0.16, 1, 0.3, 1] as const;

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const itemsVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(0.6rem)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0rem)",
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

// 뷰포트 설정도 한 곳에서 관리한다. once:true라 스크롤을 되감아도 다시 튀지 않는다.
export const viewportOnce = { once: true, margin: "-12%" } as const;
