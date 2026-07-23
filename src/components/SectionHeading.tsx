"use client";

import { motion } from "framer-motion";
import { ease } from "@/utils/FramerVariants";

interface SectionHeadingProps {
  title: string;
  /**
   * 오른쪽 끝에 붙는 메모. 아래 내용을 보면 바로 알 수 있는 것은 적지 않는다.
   * 반복되는 장식이 되면 섹션 넷이 똑같아 보이고, 그게 "찍어낸 느낌"의 정체다.
   */
  eyebrow?: string;
}

/**
 * 좌측 마스트헤드.
 *
 * 이전에는 [모노 eyebrow → 초대형 중앙 제목 → 짧은 중앙 밑줄]을 네 섹션이
 * 똑같이 반복했다. 제목을 왼쪽에 붙이고 남는 자리를 괘선으로 채우면 축이
 * 하나 더 생기고, 오른쪽 끝의 메타 정보가 그 줄을 마무리한다.
 */
export default function SectionHeading({ title, eyebrow }: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease }}
      className="mb-[4rem] flex w-full flex-wrap items-baseline gap-x-[1.6rem] gap-y-[0.6rem] md:mb-[5rem] md:flex-nowrap"
    >
      <h2 className="display text-[3.2rem] font-light leading-none text-ink md:text-[4.4rem] lg:text-[5.6rem]">
        {title}
      </h2>
      <span aria-hidden className="h-[0.1rem] min-w-[2rem] flex-1 bg-line" />
      {eyebrow && (
        <span className="mono shrink-0 text-[1.1rem] tracking-[0.14em] text-muted md:text-[1.2rem]">
          {eyebrow}
        </span>
      )}
    </motion.header>
  );
}
