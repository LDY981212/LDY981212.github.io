"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/utils/FramerVariants";
import HeroBackground from "./HeroBackground";
import HeroProjectIndex from "./HeroProjectIndex";
import Icon from "./Icon";

// 라인 단위 마스크 리빌. 부모가 overflow-hidden이라 글자가 아래에서 밀려 올라온다.
const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.75, delay: 0.15 + i * 0.1, ease },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full justify-center overflow-hidden px-[1.5rem] pb-[4rem] pt-[10rem] md:px-[4rem] lg:px-[8rem]"
    >
      <HeroBackground />

      {/* 다른 섹션과 같은 max-w-[120rem] 컨테이너를 쓴다. 히어로만 이게 없으면
          화면이 넓어질수록 히어로 왼쪽 끝과 섹션 제목 왼쪽 끝이 어긋난다. */}
      <div className="relative z-10 flex w-full max-w-[120rem] flex-col">
        {/* 문장을 화면 아래쪽에 앉혀 포스터처럼 읽히게 한다. 가운데 정렬은
            축이 하나뿐이라 배치를 결정한 흔적이 남지 않는다. */}
        <div className="mt-auto flex flex-col items-start">
          <h1 className="display max-w-[22ch] text-[2.4rem] font-light leading-[1.4] text-ink md:text-[3.8rem] lg:text-[5.2rem]">
            <Line index={0}>안녕하세요.</Line>
            <Line index={1}>
              <Marker>
                <span className="font-black">사용자 경험을</span>
              </Marker>{" "}
              깊이 고민하고,
            </Line>
            <Line index={2}>
              끊임없이 <span className="font-black text-accent">의심하는</span>
            </Line>
            <Line index={3}>
              프론트엔드 개발자{" "}
              <span className="font-black text-accent">이도엽</span>입니다.
            </Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
            className="mt-[3.2rem] flex w-full flex-wrap items-center gap-[1.2rem]"
          >
            <div className="flex flex-wrap items-center gap-[1.2rem]">
              <a
                href="#impact"
                className="flex h-[4.8rem] items-center gap-[0.8rem] rounded-full bg-accent px-[2.4rem] text-[1.4rem] font-bold text-accent-ink transition-transform hover:scale-[1.03] md:h-[5.2rem] md:px-[2.8rem] md:text-[1.5rem]"
              >
                더 알아보기
                <Icon name="arrowDown" size="1.6rem" />
              </a>
              <a
                href="https://github.com/LDY981212"
                target="_blank"
                rel="noopener noreferrer"
                className="mono flex h-[4.8rem] items-center gap-[0.6rem] px-[0.4rem] text-[1.4rem] font-bold text-muted transition-colors hover:text-accent md:h-[5.2rem] md:text-[1.5rem]"
              >
                GitHub
                <Icon name="external" size="1.5rem" />
              </a>
            </div>
          </motion.div>

          <HeroProjectIndex />
        </div>
      </div>
    </section>
  );
}

function Line({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
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
 * 강조 문구 위를 지나가는 형광펜. 사이트에서 앰버를 쓰는 유일한 자리다.
 *
 * 절대배치 막대는 line-height가 큰 문단에서 글자 아래로 떨어져 밑줄처럼 보인다.
 * 배경 그라디언트로 그으면 글자 높이에 붙고, 글자가 바뀌어도 알아서 따라온다.
 *
 * 원래 이 자리에서 단어 다섯 개가 2.6초마다 돌아갔다. 그 회전이 시프트를
 * 만들었다. AnimatePresence mode="wait"가 이전 단어를 먼저 지우는 바람에 그
 * 사이 슬롯이 조사만 남는 폭으로 붕괴했고, layout prop이 폭 변화를 애니메이션해
 * 그동안 뒷 문장이 계속 밀렸다. 4분 체류 기준 CLS 0.113 · 시프트 92건으로,
 * 하필 그 자리에 "사용자 경험"이 떠 있었다. 문구를 고정해 0으로 만들었다.
 * 형광펜은 backgroundSize만 움직여 레이아웃에 영향을 주지 않으므로 남긴다.
 */
function Marker({ children }: { children: React.ReactNode }) {
  // backgroundSize는 transform이 아니라 MotionConfig가 걸러주지 못한다.
  // 모션 줄이기를 켠 사용자에게는 형광펜을 처음부터 그어진 상태로 둔다.
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={{ backgroundSize: reduceMotion ? "100% 100%" : "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 0.7, delay: 0.9, ease }}
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
