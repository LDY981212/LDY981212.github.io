// 내비게이션과 섹션이 같은 목록을 보게 해서 둘이 어긋날 수 없게 한다.
// eyebrow는 순번이 아니라 그 섹션이 실제로 담고 있는 정보를 적는다.
export type SectionId = "about" | "skills" | "projects" | "career";

export interface SectionMeta {
  id: SectionId;
  nav: string;
  title: string;
  eyebrow?: string;
}

const sections: SectionMeta[] = [
  {
    id: "about",
    nav: "Profiles",
    title: "PROFILES",
  },
  {
    id: "skills",
    nav: "Skills",
    title: "SKILLS",
    eyebrow: "주력 TypeScript · Next.js",
  },
  {
    id: "projects",
    nav: "Projects",
    title: "PROJECTS",
    eyebrow: "5건 · 2024–2025",
  },
  {
    id: "career",
    nav: "Career",
    title: "CAREER",
  },
];

export default sections;
