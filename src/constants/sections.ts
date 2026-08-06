// 내비게이션과 섹션이 같은 목록을 보게 해서 둘이 어긋날 수 없게 한다.
// 순서는 화면에 놓인 순서와 같아야 한다. useActiveSection이 이 배열로
// IntersectionObserver를 걸기 때문에 어긋나면 활성 표시가 튄다.
// eyebrow는 순번이 아니라 그 섹션이 실제로 담고 있는 정보를 적는다.
import { featuredItems } from "./projectItems";

export type SectionId = "impact" | "projects" | "career" | "skills" | "about";

export interface SectionMeta {
  id: SectionId;
  nav: string;
  title: string;
  eyebrow?: string;
}

const sections: SectionMeta[] = [
  {
    id: "impact",
    nav: "Highlights",
    title: "HIGHLIGHTS",
  },
  {
    id: "projects",
    nav: "Projects",
    title: "PROJECTS",
    // 카드로 세우는 건수만 센다. 아카이브까지 더해 "8건"이라고 적으면
    // 정작 볼 것이 넷이라는 신호가 다시 사라진다.
    eyebrow: `${featuredItems.length}건 · 2024–2026`,
  },
  {
    id: "career",
    nav: "Career",
    title: "CAREER",
  },
  {
    id: "skills",
    nav: "Skills",
    title: "SKILLS",
    eyebrow: "주력 TypeScript · Next.js",
  },
  {
    id: "about",
    nav: "Profiles",
    title: "PROFILES",
  },
];

export default sections;
