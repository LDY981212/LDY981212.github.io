"use client";

import { motion } from "framer-motion";
import impactItems from "@/constants/impactItems";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import { ProjectProps } from "@/interfaces/ProjectInterface";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

/**
 * 히어로 다음에 오는 첫 섹션.
 *
 * 원래 이 자리에는 PROFILES가 있었다. 생년월일과 연락처를 먼저 읽히게 두면
 * 정작 봐야 할 것이 PROFILES · SKILLS · 카드 · 모달 네 겹 뒤로 밀린다.
 * 실제로 측정한 수치 세 개를 앞으로 꺼내고, 각 카드에서 근거가 있는 모달로
 * 바로 들어가게 한다. 다 읽지 않는 사람이 기본값이라고 보고 배치했다.
 */
export default function Impact({ setProjectName, setIsOpen }: ProjectProps) {
  return (
    <section
      id="impact"
      className="flex scroll-mt-[9rem] justify-center bg-paper px-[1.5rem] py-[7rem] md:px-[4rem] lg:px-[8rem]"
    >
      <div className="w-full max-w-[120rem]">
        <SectionHeading id="impact" />

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-3 md:gap-[2.4rem]"
        >
          {impactItems.map((item) => (
            <motion.li key={item.label} variants={itemsVariants}>
              <button
                type="button"
                onClick={() => {
                  setProjectName(item.router);
                  setIsOpen(true);
                }}
                className="group flex h-full w-full cursor-pointer flex-col gap-[1.4rem] rounded-[0.8rem] border border-line bg-surface p-[2.4rem] text-left transition-colors hover:border-accent"
              >
                <div className="flex flex-col gap-[0.4rem]">
                  <strong className="display block text-[3.2rem] font-black leading-[1.1] text-accent md:text-[3.6rem]">
                    {item.metric}
                  </strong>
                  <span className="text-[1.5rem] font-bold text-ink">
                    {item.label}
                  </span>
                </div>

                <p className="text-[1.4rem] leading-[1.7] text-muted">
                  {item.body}
                </p>

                <span className="mono mt-auto flex items-center gap-[0.6rem] pt-[0.4rem] text-[1.2rem] font-bold text-muted transition-colors group-hover:text-accent">
                  {item.project}
                  <Icon
                    name="arrowUp"
                    size="1.3rem"
                    className="rotate-90 transition-transform duration-300 group-hover:translate-x-[0.3rem]"
                  />
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
