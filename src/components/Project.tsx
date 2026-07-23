"use client";

import projectItems from "@/constants/projectItems";
import projectColors from "@/constants/projectColors";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import { ProjectProps } from "@/interfaces/ProjectInterface";
import ConditionalLink from "./ConditionalLink";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import Icon from "./Icon";

export default function Project({ setProjectName, setIsOpen }: ProjectProps) {
  const openModal = (router: string) => {
    setProjectName(router);
    setIsOpen(true);
  };

  return (
    <section
      id="projects"
      className="flex scroll-mt-[9rem] flex-col items-center bg-surface-2 px-[1.5rem] py-[9rem] md:px-[2rem]"
    >
      <SectionHeading title="PROJECTS" eyebrow="4건 · 2024–2025" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid w-full max-w-[120rem] grid-cols-1 gap-[2rem] md:grid-cols-2 md:gap-[3rem]"
      >
        {projectItems.map((projectItem) => (
          <TiltCard
            key={projectItem.id}
            variants={itemsVariants}
            // 카드 전체가 클릭 대상이다. 호버 이펙트가 이미 "누를 수 있다"고
            // 말하고 있는데 버튼만 반응하면 어긋난다. 키보드 사용자는 아래
            // 버튼으로 같은 곳에 도달하므로 여기에 role을 더 붙이지 않는다.
            onClick={() => openModal(projectItem.router)}
            className="flex h-full cursor-pointer flex-col gap-[1.8rem] rounded-[1.4rem] border border-line bg-surface p-[2.4rem] shadow-[var(--shadow)] transition-colors hover:border-accent"
          >
            <header className="flex flex-col gap-[1rem]">
              <span
                className={`w-fit rounded-[0.9rem] px-[1.4rem] py-[0.8rem] text-[1.4rem] font-extrabold text-white ${
                  projectColors[projectItem.id]
                }`}
              >
                {projectItem.title}
              </span>
              <p className="mono border-b border-line pb-[1.2rem] text-[1.2rem] font-medium text-muted">
                {projectItem.created}
              </p>
            </header>

            <div className="flex flex-col gap-[1.2rem]">
              <h3 className="text-[1.8rem] font-bold leading-[1.5] text-ink">
                {projectItem.subTitle}
              </h3>
              <ul className="flex list-disc flex-col gap-[0.4rem] pl-[2rem] text-[1.4rem] leading-[1.6] text-muted">
                {projectItem.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <ConditionalLink href={projectItem.link}>
              {projectItem.link}
            </ConditionalLink>

            {/* mt-auto가 카드 높이가 달라도 스택과 버튼을 바닥에 맞춰준다. */}
            <div className="mt-auto flex flex-col gap-[1.6rem] border-t border-line pt-[1.8rem]">
              <ul className="flex flex-wrap gap-[0.8rem]">
                {projectItem.stack.map((teck, index) => (
                  <li
                    key={index}
                    className="mono rounded-[0.8rem] bg-accent-soft px-[1rem] py-[0.7rem] text-[1.3rem] text-accent"
                  >
                    {teck.name}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(projectItem.router);
                }}
                className="flex w-fit cursor-pointer items-center gap-[0.6rem] rounded-full bg-accent px-[1.6rem] py-[0.9rem] text-[1.3rem] font-bold text-accent-ink transition-transform hover:scale-[1.04]"
              >
                자세히 알아보기
                <Icon name="arrowUp" className="rotate-90" size="1.4rem" />
              </button>
            </div>
          </TiltCard>
        ))}
      </motion.div>
    </section>
  );
}
