"use client";

import projectItems from "@/constants/projectItems";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemsVariants } from "@/utils/FramerVariants";
import { ProjectProps } from "@/interfaces/ProjectInterface";

export default function Project({
  projectRef,
  setProjectName,
  setIsOpen,
}: ProjectProps) {
  const bgColors = [
    "bg-blue-800",
    "bg-green-700",
    "bg-purple-700",
    "bg-pink-700",
    "bg-yellow-700",
  ];
  const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledColors = shuffleArray(bgColors);
    const newMap: { [key: string]: string } = {};
    projectItems.forEach((item, index) => {
      newMap[item.id] = shuffledColors[index % shuffledColors.length];
    });
    setColorMap(newMap);
  }, []);

  return (
    <div
      className="flex flex-col items-center py-[9rem] bg-gray-100"
      ref={projectRef}
    >
      <h1 className="font-black text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        PROJECTS
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-2 gap-[4rem]  max-w-[120rem]"
      >
        {projectItems &&
          projectItems.map((projectItem) => (
            <motion.div
              variants={itemsVariants}
              key={projectItem.id}
              className="flex flex-col gap-[1rem] p-[2.5rem] rounded-[1rem] shadow-[0_0_0.5rem_0_rgba(68,68,68,0.4)]"
            >
              <div className="flex flex-col gap-[1rem]">
                <div
                  className={`w-fit px-[1.5rem] py-[1rem] rounded-[1rem] text-white font-extrabold ${
                    colorMap[projectItem.id]
                  } text-[1.5rem] text-center`}
                >
                  {projectItem.title}
                </div>
                <h2 className="text-[1.2rem] text-gray-600 font-medium border-b border-gray-400 pb-[1rem]">
                  {projectItem.created}
                </h2>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <h2 className="text-black text-[1.8rem] font-bold">
                  {projectItem.subTitle}
                </h2>
                <ul className="list-disc pl-6 text-gray-700">
                  {projectItem.content.map((item, index) => (
                    <li className="text-[1.4rem]" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={projectItem.link}
                  className="text-[1.5rem] text-blue-700 border-l-[0.4rem] pl-[1rem] border-blue-800"
                >
                  {projectItem.link}
                </a>
              </div>
              <div className="flex flex-col gap-[1.6rem]">
                <div className="flex flex-wrap gap-[1rem]">
                  {projectItem.stack.map((teck, index) => (
                    <div
                      key={index}
                      className="flex w-fit p-[1rem] rounded-[1rem] border border-blue-400 bg-blue-100 text-[1.4rem]"
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
                  className="hover:bg-black hover:text-white w-fit px-[1rem] py-[0.5rem] cursor-pointer rounded-[0.8rem] border border-gray-400 font-bold text-[1.2rem] text-black"
                >
                  자세히 알아보기
                </button>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
