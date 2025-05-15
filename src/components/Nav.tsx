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
}: NavProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex justify-between items-center px-[20rem] py-[1.5rem]  ${
        isScrolled
          ? "text-white bg-gray-400 border-b border-gray-400 shadow-lg"
          : "text-gray-400"
      }`}
    >
      <div
        className="flex gap-[1.5rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={
            isHovered ? "/images/home_logo.svg" : "/images/home_logo_light.svg"
          }
          alt="홈 로고 이미지"
          width={50}
          height={50}
        />
        <button
          className={`text-[2.6rem] font-bold cursor-pointer ${
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
      <div className="flex gap-[3.5rem] text-[1.8rem] font-bold ">
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
        <button className="cursor-pointer hover:text-blue-500">Career</button>
      </div>
    </div>
  );
}
