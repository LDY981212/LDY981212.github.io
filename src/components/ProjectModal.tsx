"use client";

import projectItems from "@/constants/projectItems";
import { ProjectModalProps } from "@/interfaces/ProjectInterface";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectModal({
  project,
  setIsOpen,
}: ProjectModalProps) {
  const projectItem = projectItems.find((item) => project === item.router);
  const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});
  const bgColors = [
    "bg-blue-800",
    "bg-green-700",
    "bg-purple-700",
    "bg-pink-700",
    "bg-yellow-700",
  ];

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!projectItem) return;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-50 flex justify-center items-center">
      <div
        className="bg-white flex flex-col items-center rounded-lg w-[80vw] max-h-[80vh] overflow-y-auto relative gap-[3rem] pb-[10rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex flex-col items-center bg-blue-400 w-full py-[1.2rem] ${
            colorMap[projectItem.id]
          }`}
        >
          <h1 className="text-white text-[4rem] font-bold">
            {projectItem.title}
          </h1>
          <h3 className="text-gray-200 text-[1.6rem]">{projectItem.created}</h3>
        </div>

        <span className="text-[1.6rem] px-[24rem] text-center border-b border-gray-300 pb-[3rem]">
          {projectItem.intro}
        </span>

        <div className="flex flex-col px-[24rem] gap-[1rem]">
          <h1 className="text-[3rem] font-bold">🛠️ STACK</h1>
          {projectItem.stack.map((stack, index) => (
            <div key={index} className="flex flex-col ">
              <div className="bg-gray-100 text-[2rem] font-semibold p-[0.5rem] flex items-center pl-[1rem]">
                {stack.name}
              </div>
              <div className="pl-[1rem] py-[0.6rem] text-[1.6rem]">
                {stack.detail}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col px-[24rem] gap-[1rem]">
          <h1 className="text-[3rem] font-bold">📊 CONTRIBUTION</h1>
          {projectItem.contribution.map((contribution, index) => (
            <div key={index} className="flex flex-col ">
              <div className="bg-gray-100 text-[2rem] font-semibold p-[0.5rem] flex items-center pl-[1rem]">
                {contribution.head}
              </div>
              {contribution.detail
                .filter((detail) => detail.trim() !== "")
                .map((detail, index) => (
                  <ul
                    key={index}
                    className="pl-[3rem] py-[0.6rem] text-[1.6rem] list-disc"
                  >
                    <li>{detail}</li>
                  </ul>
                ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col px-[24rem] gap-[1rem]">
          <h1 className="text-[3rem] font-bold">🐞 TROUBLE SHOOTING</h1>
          {projectItem.solution.map((solution, index) => (
            <div key={index} className="flex flex-col">
              <div className="bg-gray-100 text-[2rem] font-semibold p-[0.5rem] flex items-center pl-[1rem]">
                {solution.head}
              </div>
              <div className="pl-[1rem] py-[0.6rem] text-[1.6rem] flex flex-col gap-[1rem]">
                <span>
                  <span className="font-bold text-red-400">[상황]</span>{" "}
                  {solution.situation}
                </span>
                <span>
                  <span className="font-bold text-green-500">[과제]</span>{" "}
                  {solution.task}
                </span>
                <span>
                  <span className="font-bold text-blue-500">[행동]</span>{" "}
                  {solution.action}
                </span>
                <span>
                  <span className="font-bold text-blue-900">[결과]</span>{" "}
                  {solution.result}
                </span>
              </div>
            </div>
          ))}
        </div>

        {projectItem.videos && (
          <div className="flex flex-col px-[24rem] gap-[1rem]">
            <h1 className="text-[3rem] font-bold">📽️ DEMO VIDEO</h1>
            <div>
              <iframe
                className="w-[80rem] h-[40rem]"
                src={projectItem.videos}
                title="Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col ">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-[8rem] right-[8rem] text-white font-bold text-[1.8rem] bg-blue-400 rounded-full w-[4rem] h-[4rem] cursor-pointer"
        >
          ✕
        </button>
        <div className="bg-blue-100 rounded-full absolute top-[14rem] right-[8rem] w-[4rem] h-[4rem] flex justify-center items-center cursor-pointer">
          <a href={projectItem.github} target="_blank">
            <Image
              src="/images/github.svg"
              alt="깃헙 이미지"
              width={36}
              height={36}
            />
          </a>
        </div>
        <span className="text-[1rem] text-blue-200 absolute top-[18.4rem] right-[8.2rem]">
          GitHub
        </span>
      </div>
    </div>
  );
}
