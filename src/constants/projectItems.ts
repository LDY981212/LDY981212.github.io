import { ProjectItems } from "@/interfaces/ProjectInterface";

const projectItems: ProjectItems[] = [
  {
    id: "1",
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
    link: "www.moving.com",
  },
  {
    id: "2",
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
    link: "www.hancook.com",
  },
];

export default projectItems;
