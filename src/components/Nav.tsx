"use client";

import { NavProps } from "@/interfaces/NavInterface";
import Image from "next/image";
import { useState } from "react";

export default function Nav({
  isScrolled,
  onClickLogo,
  onClickAbout,
  onClickSkills,
  onClickProjects,
  onClickCareer,
}: NavProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full overflow-hidden flex justify-between items-center px-[1.5rem] md:px-[8rem] lg:px-[20rem] py-[1.5rem]  ${
        isScrolled
          ? "text-white bg-gray-400 border-b border-gray-400 shadow-lg"
          : "text-gray-400"
      }`}
    >
      <div
        className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[1.5rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative shrink-0 w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem]">
          <Image
            src={
              isHovered
                ? "/images/home_logo.svg"
                : "/images/home_logo_light.svg"
            }
            alt="홈 로고 이미지"
            fill
          />
        </div>

        <button
          className={`text-[1.2rem] whitespace-nowrap md:text-[2rem] lg:text-[2.6rem] font-bold cursor-pointer ${
            isHovered
              ? "text-blue-500"
              : isScrolled
              ? "text-white"
              : "text-gray-400"
          }`}
          onClick={onClickLogo}
        >
          LDY&apos;s Portfolio
        </button>
      </div>
      <div className="flex shrink-0 gap-[0.6rem] text-[1.3rem] whitespace-nowrap md:gap-[3.5rem] md:text-[1.4rem] lg:gap-[3.5rem] lg:text-[1.8rem] font-bold ">
        <button
          onClick={onClickAbout}
          className="cursor-pointer hover:text-blue-500"
        >
          Profiles
        </button>
        <button
          onClick={onClickSkills}
          className="cursor-pointer hover:text-blue-500"
        >
          Skills
        </button>
        <button
          onClick={onClickProjects}
          className="cursor-pointer hover:text-blue-500"
        >
          Projects
        </button>
        <button
          onClick={onClickCareer}
          className="cursor-pointer hover:text-blue-500"
        >
          Career
        </button>
      </div>
    </div>
  );
}
