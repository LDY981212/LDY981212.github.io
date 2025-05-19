import { ProjectItems } from "@/interfaces/ProjectInterface";

const projectItems: ProjectItems[] = [
  {
    id: "1",
    title: "개인 포트폴리오 웹",
    created: "2025.05 (1人 개인 프로젝트)",
    subTitle: "개인 포트폴리오 웹",
    content: [
      "Next.js의 SSR을 통해 SEO 최적화",
      "Framer-motion의 부드러운 효과로 사용자 경험 향상",
    ],
    stack: ["Typescript", "Next.js", "Tailwind CSS"],
    link: "https://ldy981212.github.io",
    router: "individual",
  },
  {
    id: "2",
    title: "Moving",
    created: "2025.01 ~ 2025.02 (6人 팀 프로젝트)",
    subTitle:
      "사용자들이 다양한 이사 서비스를 편리하게 요청하고, 이사 업체로부터 견적을 받을 수 있게 돕는 온라인 웹 서비스",
    content: [
      "프로필 등록 & 수정 페이지 제작",
      "견적 요청 & 수정 페이지 제작",
      "리뷰 페이지 제작",
      "실시간 채팅 페이지 제작",
    ],
    stack: [
      "Typescript",
      "Next.js",
      "Tailwind CSS",
      "Storybook",
      "Jest",
      "Redux Toolkit",
      "Tanstack Query",
    ],
    link: "https://moving.com",
    router: "moving",
  },
  {
    id: "3",
    title: "HanCook",
    created: "2024.11 ~ 2024.12 (6人 팀 프로젝트)",
    subTitle: "전 세계 외국인들을 대상으로 한 한국 요리 커뮤니티 웹 서비스",
    content: [
      "작업물 페이지 제작",
      "로그인 & 회원가입 페이지 제작",
      "레시피 & 챌린지 리스트 페이지 제작",
    ],
    stack: [
      "Typescript",
      "Next.js",
      "Tailwind CSS",
      "Storybook",
      "Zustand",
      "Tanstack Query",
    ],
    link: "https://hancook.com",
    router: "hancook",
  },
  {
    id: "4",
    title: "View My Startup",
    created: "2024.09 ~ 2024.10 (5人 팀 프로젝트)",
    subTitle:
      "개인 투자자들이 스타트업 정보를 제공받고, 누적 투자금액, 매출액, 고용 인원 등을 기준으로 스타트업을 비교하여 투자 결과를 확인할 수 있는 모의 투자 웹 서비스",
    content: [
      "기업 비교 모달 & 결과 UI 제작",
      "나의 기업 비교 선택 페이지 제작",
      "기업 관련 create & read api 제작",
    ],
    stack: ["Javascript", "React", "Express.js", "PostgreSQL"],
    link: "https://viewMyStartup.com",
    router: "startup",
  },
];

export default projectItems;
