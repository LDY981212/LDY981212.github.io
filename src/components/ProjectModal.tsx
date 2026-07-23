"use client";

import projectItems from "@/constants/projectItems";
import projectColors from "@/constants/projectColors";
import { ProjectModalProps } from "@/interfaces/ProjectInterface";
import Image from "next/image";
import { useEffect } from "react";

export default function ProjectModal({
  project,
  setIsOpen,
}: ProjectModalProps) {
  const projectItem = projectItems.find((item) => project === item.router);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  if (!projectItem) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-[1.5rem] md:p-[3rem]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={projectItem.title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col bg-surface rounded-[1.4rem] overflow-hidden w-full max-w-[110rem] max-h-[95vh]"
      >
        <div className="absolute top-[1.2rem] right-[1.2rem] z-10 flex items-center gap-[0.8rem]">
          <a
            href={projectItem.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 저장소 열기"
            title="GitHub 저장소 열기"
            className="flex w-[4rem] h-[4rem] items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <Image
              src="/images/github.svg"
              alt=""
              width={24}
              height={24}
              className="w-[2.4rem] h-[2.4rem]"
            />
          </a>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="닫기"
            title="닫기"
            className="flex w-[4rem] h-[4rem] items-center justify-center rounded-full bg-white/90 hover:bg-white text-[1.8rem] font-bold text-black cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center overflow-y-auto gap-[3rem] pb-[6rem]">
          <div
            className={`flex flex-col items-center w-full pb-[1.2rem] pt-[6rem] px-[2rem] md:pt-[1.2rem] md:px-[11rem] ${
              projectColors[projectItem.id]
            }`}
          >
            <h1 className="text-white text-[2.4rem] md:text-[4rem] font-bold text-center">
              {projectItem.title}
            </h1>
            <h3 className="text-gray-200 text-[1.4rem] md:text-[1.6rem] text-center">
              {projectItem.created}
            </h3>
          </div>

          {projectItem.intro && (
            <span className="text-[1.6rem] px-[2rem] lg:px-[8rem] text-center border-b border-line pb-[3rem]">
              {projectItem.intro}
            </span>
          )}

          <div className="flex flex-col w-full px-[2rem] lg:px-[8rem] gap-[1rem]">
            <h1 className="text-[2.4rem] md:text-[3rem] font-bold">🛠️ STACK</h1>
            {projectItem.stack.map((stack, index) => (
              <div key={index} className="flex flex-col ">
                <div className="bg-surface-2 text-ink text-[1.8rem] md:text-[2rem] font-semibold p-[0.8rem] rounded-[0.6rem] flex items-center pl-[1rem]">
                  {stack.name}
                </div>
                <div className="pl-[1rem] py-[0.6rem] text-[1.6rem]">
                  {stack.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full px-[2rem] lg:px-[8rem] gap-[1rem]">
            <h1 className="text-[2.4rem] md:text-[3rem] font-bold">
              📊 CONTRIBUTION
            </h1>
            {projectItem.contribution.map((contribution, index) => (
              <div key={index} className="flex flex-col ">
                <div className="bg-surface-2 text-ink text-[1.8rem] md:text-[2rem] font-semibold p-[0.8rem] rounded-[0.6rem] flex items-center pl-[1rem]">
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

          <div className="flex flex-col w-full px-[2rem] lg:px-[8rem] gap-[1rem]">
            <h1 className="text-[2.4rem] md:text-[3rem] font-bold">
              🐞 TROUBLE SHOOTING
            </h1>
            {projectItem.solution.map((solution, index) => (
              <div key={index} className="flex flex-col">
                <div className="bg-surface-2 text-ink text-[1.8rem] md:text-[2rem] font-semibold p-[0.8rem] rounded-[0.6rem] flex items-center pl-[1rem]">
                  {solution.head}
                </div>
                <div className="pl-[1rem] py-[0.6rem] text-[1.6rem] flex flex-col gap-[1rem]">
                  <span>
                    <span className="font-bold text-rose-500">[상황]</span>{" "}
                    {solution.situation}
                  </span>
                  <span>
                    <span className="font-bold text-emerald-500">[과제]</span>{" "}
                    {solution.task}
                  </span>
                  <span>
                    <span className="font-bold text-accent">[행동]</span>{" "}
                    {solution.action}
                  </span>
                  <span>
                    <span className="font-bold text-ink">[결과]</span>{" "}
                    {solution.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {projectItem.videos && (
            <div className="flex flex-col w-full px-[2rem] lg:px-[8rem] gap-[1rem]">
              <h1 className="text-[2.4rem] md:text-[3rem] font-bold ">
                📽️ DEMO VIDEO
              </h1>
              <div className="w-full ">
                <iframe
                  className="w-full aspect-video"
                  src={projectItem.videos}
                  title="Project Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
