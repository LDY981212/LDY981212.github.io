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

export default function Project({ setProjectName, setIsOpen }: ProjectProps) {
  return (
    <section
      id="projects"
      className="flex scroll-mt-[9rem] flex-col items-center bg-surface-2 py-[9rem] px-[1.5rem] md:px-[2rem]"
    >
      <SectionHeading title="PROJECTS" eyebrow="4건 · 2024–2025" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid w-full grid-cols-1 gap-[2rem] md:grid-cols-2 md:gap-[4rem] max-w-[120rem]"
      >
        {projectItems &&
          projectItems.map((projectItem) => (
            <TiltCard
              variants={itemsVariants}
              key={projectItem.id}
              className="flex flex-col gap-[1rem] p-[2.5rem] rounded-[1.4rem] bg-surface border border-line shadow-[var(--shadow)]"
            >
              <div className="flex flex-col gap-[1rem]">
                <div
                  className={`w-fit px-[1.5rem] py-[1rem] rounded-[1rem] text-white font-extrabold ${
                    projectColors[projectItem.id]
                  } text-[1.5rem] text-center`}
                >
                  {projectItem.title}
                </div>
                <h2 className="mono text-[1.2rem] text-muted font-medium border-b border-line pb-[1rem]">
                  {projectItem.created}
                </h2>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <h2 className="text-ink text-[1.8rem] font-bold">
                  {projectItem.subTitle}
                </h2>
                <ul className="list-disc pl-6 text-muted">
                  {projectItem.content.map((item, index) => (
                    <li className="text-[1.4rem]" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
                <ConditionalLink href={projectItem.link}>
                  {projectItem.link}
                </ConditionalLink>
              </div>
              <div className="flex flex-col gap-[1.6rem]">
                <div className="flex flex-wrap gap-[1rem]">
                  {projectItem.stack.map((teck, index) => (
                    <div
                      key={index}
                      className="flex w-fit p-[1rem] rounded-[0.8rem] border border-transparent bg-accent-soft text-accent mono text-[1.3rem]"
                    >
                      {teck.name}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsOpen(true);
                    setProjectName(projectItem.router);
                  }}
                  className="w-fit px-[1.6rem] py-[0.9rem] cursor-pointer rounded-full bg-accent text-accent-ink font-bold text-[1.3rem] transition-transform hover:scale-[1.04]"
                >
                  자세히 알아보기
                </button>
              </div>
            </TiltCard>
          ))}
      </motion.div>
    </section>
  );
}
