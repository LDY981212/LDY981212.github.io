"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import SectionHeading from "./SectionHeading";
import Icon, { type IconName } from "./Icon";

interface SkillGroup {
  icon: IconName;
  label: string;
  items: { name: string; chip: string }[];
}

// 각 도구의 브랜드 색을 유지하되, 다크 카드에 묻히는 색만 다크에서 반전시킨다.
const groups: SkillGroup[] = [
  {
    icon: "code",
    label: "Language",
    items: [
      { name: "TypeScript", chip: "bg-blue-900 dark:bg-blue-500 text-white" },
      { name: "JavaScript", chip: "bg-yellow-300 text-black" },
    ],
  },
  {
    icon: "layout",
    label: "Frontend",
    items: [
      {
        name: "Next.js (React)",
        chip: "bg-black text-white dark:bg-white dark:text-black",
      },
      {
        name: "Zustand",
        chip: "bg-gray-600 text-white dark:bg-gray-300 dark:text-black",
      },
      { name: "React-Query", chip: "bg-red-400 text-white" },
      { name: "Tailwind CSS", chip: "bg-sky-500 text-white" },
      { name: "Redux Toolkit", chip: "bg-purple-500 text-white" },
      { name: "Storybook", chip: "bg-pink-500 text-white" },
    ],
  },
  {
    icon: "cloud",
    label: "DevOps",
    items: [
      { name: "AWS", chip: "bg-orange-400 text-white" },
      {
        name: "Vercel",
        chip: "bg-black text-white dark:bg-white dark:text-black",
      },
    ],
  },
];

export default function Skills() {
  return (
    // 세 줄짜리 표다. 가장 조이는 섹션.
    <section
      id="skills"
      className="flex scroll-mt-[9rem] justify-center overflow-x-hidden bg-surface-2 px-[1.5rem] py-[6rem] md:px-[4rem] lg:px-[8rem]"
    >
      <div className="w-full max-w-[120rem]">
        <SectionHeading title="SKILLS" eyebrow="TypeScript · Next.js 중심" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="border-t border-line"
        >
          {groups.map((group) => (
            <motion.div
              key={group.label}
              variants={itemsVariants}
              className="flex flex-col gap-[1.2rem] border-b border-line py-[1.8rem] md:flex-row md:items-center md:gap-[3rem]"
            >
              <div className="flex shrink-0 items-center gap-[1rem] md:w-[16rem]">
                <span className="text-[1.8rem] text-accent">
                  <Icon name={group.icon} />
                </span>
                <span className="mono text-[1.3rem] uppercase tracking-[0.12em] text-muted">
                  {group.label}
                </span>
              </div>

              <ul className="flex min-w-0 flex-wrap gap-[0.8rem]">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={`rounded-[0.6rem] px-[1.1rem] py-[0.7rem] text-[1.3rem] font-bold whitespace-nowrap ${item.chip}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
