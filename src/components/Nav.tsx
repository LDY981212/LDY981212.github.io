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
      className={`w-full overflow-hidden flex justify-between items-center lg:px-[20rem] md:px-[8rem] sm:px-[6rem] py-[1.5rem]  ${
        isScrolled
          ? "text-white bg-gray-400 border-b border-gray-400 shadow-lg"
          : "text-gray-400"
      }`}
    >
      <div
        className="flex lg:gap-[1.5rem] md:gap-[1rem] sm:gap-[0.8rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative lg:w-[5rem] lg:h-[5rem] md:w-[4rem] md:h-[4rem] sm:w-[3rem] h-[3rem]">
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
          className={`lg:text-[2.6rem] md:text-[2rem] sm:text-[1.4rem] font-bold cursor-pointer break-words ${
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
      <div className="flex lg:gap-[3.5rem] md:gap-[3.5rem] sm:gap-[1rem] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1rem] font-bold ">
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
