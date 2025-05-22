"use client";

import projectItems from "@/constants/projectItems";
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

  if (!projectItem) return;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-50 flex justify-center items-center">
      <div
        className="bg-white p-6 flex flex-col items-center rounded-lg w-[80vw] max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div>{projectItem.title}</div>
      </div>
      <div className="flex flex-col ">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-[4rem] right-[8rem] text-white font-bold text-[1.8rem] bg-blue-400 rounded-full w-[3.6rem] h-[3.6rem] cursor-pointer"
        >
          ✕
        </button>
        <div className="bg-blue-100 rounded-full absolute top-[10rem] right-[8rem] w-[4rem] h-[4rem] flex justify-center items-center cursor-pointer">
          <Image
            src="/images/github.svg"
            alt="깃헙 이미지"
            width={36}
            height={36}
          />
        </div>
      </div>
    </div>
  );
}
