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

// blur는 transform이 아니라서 MotionConfig reducedMotion="user"가 걸러주지 못한다.
// 모션 줄이기를 켠 사용자에게도 화면이 흐려졌다 선명해지므로 쓰지 않는다.
export const itemsVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

// 뷰포트 설정도 한 곳에서 관리한다. once:true라 스크롤을 되감아도 다시 튀지 않는다.
export const viewportOnce = { once: true, margin: "-12%" } as const;
