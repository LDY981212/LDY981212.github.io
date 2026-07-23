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
    <section
      id="skills"
      className="flex scroll-mt-[9rem] flex-col items-center overflow-x-hidden bg-surface-2 px-[1.5rem] py-[9rem] md:px-[2rem] lg:px-[4rem]"
    >
      <SectionHeading title="SKILLS" eyebrow="TypeScript · Next.js 중심" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex w-full max-w-[120rem] flex-col gap-[1rem]"
      >
        {groups.map((group) => (
          <motion.div
            key={group.label}
            variants={itemsVariants}
            className="flex flex-col gap-[1.6rem] rounded-[1.4rem] border border-line bg-surface p-[2rem] md:flex-row md:items-center md:gap-[3rem] md:p-[2.4rem]"
          >
            <div className="flex shrink-0 items-center gap-[1.2rem] md:w-[18rem]">
              <span className="flex h-[4rem] w-[4rem] items-center justify-center rounded-[1rem] bg-accent-soft text-[2rem] text-accent">
                <Icon name={group.icon} />
              </span>
              <span className="text-[1.8rem] font-bold text-ink">
                {group.label}
              </span>
            </div>

            <ul className="flex min-w-0 flex-wrap gap-[1rem]">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={`rounded-[0.9rem] px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-bold whitespace-nowrap ${item.chip}`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
