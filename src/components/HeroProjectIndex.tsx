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
 * 프로젝트가 열 개를 넘기면서 한 줄씩 쌓은 목록은 "~ 진행중"이 매 줄 반복돼
 * 읽을 거리가 제목이 아니라 날짜가 됐다. 진행 상태는 머리에 한 번만 적고,
 * 소속으로 묶은 뒤 넓은 화면에서는 열로 펼쳐 높이를 줄였다.
 *
 * 아카이브로 내린 프로젝트는 여기 싣지 않는다.
 */

const isWork = (created: string) => created.includes("웨이온");
const isOngoing = (created: string) => created.includes("진행중");

const groups = [
  { label: "WaiOn · 실무", items: featuredItems.filter((p) => isWork(p.created)) },
  { label: "개인", items: featuredItems.filter((p) => !isWork(p.created)) },
].filter((g) => g.items.length > 0);

const ongoingCount = featuredItems.filter((p) => isOngoing(p.created)).length;

export default function HeroProjectIndex() {
  let order = 0;

  return (
    <motion.nav
      aria-label="프로젝트 바로가기"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 1, ease }}
      className="mt-[3.2rem] w-full md:mt-[4rem]"
    >
      <div className="mono flex items-center justify-between border-b border-ink/80 pb-[0.8rem] text-[1.1rem] text-muted md:text-[1.2rem]">
        <span className="font-bold tracking-[0.08em] text-ink">PROJECTS</span>
        <span className="flex items-center gap-[0.6rem]">
          <span aria-hidden className="size-[0.7rem] rounded-full bg-accent" />
          {ongoingCount === featuredItems.length
            ? `모두 진행 중 · ${featuredItems.length}`
            : `진행 중 ${ongoingCount} / ${featuredItems.length}`}
        </span>
      </div>

      <div className="flex flex-col gap-[2rem] pt-[1.6rem] md:gap-[2.4rem] md:pt-[2rem]">
        {groups.map((group) => (
          <div key={group.label} role="group" aria-label={group.label}>
            <p className="mono mb-[0.4rem] text-[1.1rem] text-muted md:text-[1.2rem]">
              {group.label}
              <span className="ml-[0.6rem] text-muted/60">{group.items.length}</span>
            </p>
            <ul className="grid grid-cols-1 gap-x-[3.2rem] md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((project) => {
                order += 1;
                return (
                  <li key={project.id}>
                    <a
                      href={`#project-${project.id}`}
                      className="group/row flex items-center gap-[1rem] border-b border-line py-[0.9rem] md:py-[1.1rem]"
                    >
                      <span className="mono w-[2.2rem] shrink-0 text-[1.1rem] text-muted/70 transition-colors group-hover/row:text-accent">
                        {String(order).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[1.4rem] font-semibold text-ink transition-colors group-hover/row:text-accent md:text-[1.5rem]">
                        {project.title}
                      </span>
                      <Icon
                        name="arrowUp"
                        size="1.2rem"
                        className="shrink-0 rotate-135 text-muted/50 transition-all duration-300 group-hover/row:translate-x-[0.3rem] group-hover/row:text-accent"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
