"use client";

import { motion } from "framer-motion";
import { featuredItems } from "@/constants/projectItems";
import { ease } from "@/utils/FramerVariants";
import Icon from "./Icon";

/**
 * 히어로 하단의 프로젝트 목차.
 *
 * 문장 네 줄로는 100dvh를 채울 수 없어 상단이 통째로 비어 있었다. 장식으로
 * 메우는 대신 첫 화면이 목차 역할을 하게 했다. 보러 온 사람이 가장 먼저 찾는
 * 것이 작업물이다. 새 정보를 지어내지 않고 이미 있는 데이터만 쓴다.
 *
 * 아카이브로 내린 프로젝트는 여기 싣지 않는다. 첫 화면 목차에 여덟 줄이
 * 깔리면 어느 것을 보라는 것인지가 다시 사라진다.
 */
export default function HeroProjectIndex() {
  return (
    <motion.nav
      aria-label="프로젝트 바로가기"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 1, ease }}
      className="mt-[3.2rem] w-full max-w-[76rem] border-t border-line md:mt-[4rem]"
    >
      {featuredItems.map((project) => (
        <a
          key={project.id}
          href={`#project-${project.id}`}
          className="group/row flex items-baseline gap-[1.2rem] border-b border-line py-[1.1rem] md:py-[1.3rem]"
        >
          <span className="min-w-0 flex-1 truncate text-[1.4rem] font-semibold text-ink transition-colors group-hover/row:text-accent md:text-[1.6rem]">
            {project.title}
          </span>
          <span className="mono shrink-0 text-[1.1rem] text-muted md:text-[1.2rem]">
            {/* "2025.01 ~ 2025.02 (6人 팀 프로젝트)"에서 기간만 남긴다. */}
            {project.created.split(" (")[0]}
          </span>
          <Icon
            name="arrowUp"
            size="1.3rem"
            className="shrink-0 rotate-135 text-muted transition-transform duration-300 group-hover/row:translate-x-[0.3rem] group-hover/row:text-accent"
          />
        </a>
      ))}
    </motion.nav>
  );
}
