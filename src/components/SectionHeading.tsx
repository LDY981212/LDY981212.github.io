"use client";

import { motion } from "framer-motion";
import { ease } from "@/utils/FramerVariants";
import sections, { type SectionId } from "@/constants/sections";

/**
 * 좌측 마스트헤드.
 *
 * 이전에는 [모노 eyebrow → 초대형 중앙 제목 → 짧은 중앙 밑줄]을 네 섹션이
 * 똑같이 반복했다. 제목을 왼쪽에 붙이고 남는 자리를 괘선으로 채우면 축이
 * 하나 더 생기고, 오른쪽 끝의 메타 정보가 그 줄을 마무리한다.
 *
 * 제목과 eyebrow는 sections.ts에서만 읽는다. 예전에는 각 섹션이 문자열을
 * 직접 들고 있어서 프로젝트 건수 "8건"이 sections.ts와 Project.tsx 두 곳에
 * 적혀 있었고, 한쪽만 고치면 조용히 어긋났다.
 */
export default function SectionHeading({ id }: { id: SectionId }) {
  const meta = sections.find((section) => section.id === id);
  if (!meta) return null;

  const { title, eyebrow } = meta;

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
