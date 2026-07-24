"use client";

import { useMemo, useState } from "react";
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

// 웨이온 재직 중 진행한 프로젝트. 나머지는 개인/부트캠프 프로젝트로 본다.
const COMPANY_ROUTERS = new Set(["webinow", "player", "clipnow"]);
const isCompany = (router: string) => COMPANY_ROUTERS.has(router);

type Filter = "all" | "company" | "personal";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "company", label: "회사" },
  { key: "personal", label: "개인" },
];

export default function Project({ setProjectName, setIsOpen }: ProjectProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const openModal = (router: string) => {
    setProjectName(router);
    setIsOpen(true);
  };

  const counts = useMemo(() => {
    const company = projectItems.filter((p) => isCompany(p.router)).length;
    return { all: projectItems.length, company, personal: projectItems.length - company };
  }, []);

  const visibleItems = projectItems.filter((p) => {
    if (filter === "all") return true;
    return filter === "company" ? isCompany(p.router) : !isCompany(p.router);
  });

  return (
    <section
      id="projects"
      className="flex scroll-mt-[9rem] justify-center bg-surface-2 px-[1.5rem] py-[11rem] md:px-[4rem] lg:px-[8rem]"
    >
      <div className="w-full max-w-[120rem]">
        <SectionHeading title="PROJECTS" eyebrow="8건 · 2024–2026" />

        <div
          role="tablist"
          aria-label="프로젝트 분류"
          className="mb-[2.4rem] flex flex-wrap gap-[0.6rem] md:mb-[3rem]"
        >
          {FILTERS.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.key)}
                className={`mono flex cursor-pointer items-center gap-[0.6rem] rounded-full border px-[1.4rem] py-[0.7rem] text-[1.3rem] font-bold transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[1.1rem] ${
                    active ? "text-accent-ink/70" : "text-muted"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          // filter가 바뀌면 key도 바뀌어 카드가 다시 stagger 리빌된다.
          key={filter}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2 md:gap-[2.4rem]"
        >
          {visibleItems.map((projectItem) => (
            <TiltCard
              key={projectItem.id}
              id={`project-${projectItem.id}`}
              variants={itemsVariants}
              // 카드 전체가 클릭 대상이다. 호버 이펙트가 이미 "누를 수 있다"고
              // 말하고 있는데 버튼만 반응하면 어긋난다. 키보드 사용자는 아래
              // 버튼으로 같은 곳에 도달하므로 여기에 role을 더 붙이지 않는다.
              onClick={() => openModal(projectItem.router)}
              className="flex h-full scroll-mt-[10rem] cursor-pointer flex-col gap-[1.8rem] rounded-[0.8rem] border border-line bg-surface p-[2.4rem] transition-colors hover:border-accent"
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
                  className="mono flex w-fit cursor-pointer items-center gap-[0.6rem] py-[0.4rem] text-[1.3rem] font-bold text-muted transition-colors group-hover:text-accent"
                >
                  자세히 알아보기
                  <Icon
                    name="arrowUp"
                    size="1.4rem"
                    className="rotate-90 transition-transform duration-300 group-hover:translate-x-[0.3rem]"
                  />
                </button>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
