import { CareerItems } from "@/interfaces/CareerInterface";

const careerItems: CareerItems[] = [
  {
    id: "2",
    title: "웨이온 (WaiOn)",
    created: "2025.12 - 현재 (재직 중)",
    imageUrl: "/images/waion.png",
    logoFull: true,
    content: [
      {
        id: "1",
        header: "Webinow — 웨비나 SaaS 프론트엔드",
        year: "2025.12 - 현재",
        infor:
          "랜딩 페이지와 리포트 대시보드(퍼널·라인·파이·바 차트 및 차트 데이터를 텍스트로 변환하는 커스텀 컴포넌트), 수료증·커스텀 신청·서포트 관리 페이지를 제작하고 Nx 모노레포 Storybook 구조를 구성했습니다.",
      },
      {
        id: "2",
        header: "ClipNow — AI 영상 클리핑 서비스 풀스택",
        year: "2026.04 - 현재",
        infor:
          "단어 단위 자막 타이밍·카라오케 렌더링, AI 음성 인식·영상 이해, 외부 렌더링 API 파이프라인(웹훅·레이트 리밋), 주요 SNS 연동을 구현하고, 동시 작업 가드·구조화 로깅 등 백엔드 인프라를 담당했습니다.",
      },
      {
        id: "3",
        header: "Player — 웨비나 영상 플레이어",
        year: "2026.01 - 현재",
        infor:
          "Vimeo·HLS 기반 플레이어에 유튜브 표준 컨트롤 바·키보드 단축키를 구현하고, 라이브·다시보기·미리보기 모드와 채팅·영상 패널 동기화, 게스트 모드 등을 개발했습니다.",
      },
      {
        id: "4",
        header: "WAION Vision — 공장 비전 시스템 UI",
        year: "2026.07 - 현재",
        infor:
          "edge·master 콘솔 등 비전 팩토리 시스템의 프론트엔드를 새로 구성 중입니다.",
      },
      {
        id: "5",
        header: "Edge Vision AI 랜딩 — 다국어 제품 소개 사이트",
        year: "2026.08 - 현재",
        infor:
          "next-intl 기반 한국어·영어·인도네시아어 라우팅과 메시지 정합성 검사 CLI를 도입하고, 11개 상세 페이지의 정보구조·내비게이션·모션을 재설계했으며 폰트 서브셋(2,009KB → 94KB)·영상 인코딩·이미지 변환 폭 조정으로 전송량을 줄였습니다.",
      },
      {
        id: "6",
        header: "WAION 코퍼레이트 랜딩 — 회사 소개 사이트",
        year: "2026.09 - 현재",
        infor:
          "빌더 기반 기존 사이트를 대체하는 코퍼레이트 랜딩을 기획 문서부터 혼자 맡아, 10개 섹션과 헤더·푸터·문의 폼을 구현하고 레퍼런스의 GSAP 모션을 motion 라이브러리로 재현했습니다.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Nx", "Hono", "Drizzle ORM"],
  },
  {
    id: "1",
    title: "한양대학교 뇌영상분석 연구실 CNA",
    created: "2023.12 - 2024.02 (3개월)",
    content: [
      {
        id: "1",
        header: "DLB와 AD를 더 정확히 분류하기 위해 관련 모델 수정 및 적용",
        year: "2023.12 - 2024.02",
        infor:
          " 사전 학습 데이터 기반 3D U-Net 모델 적용 및 모델의 가중치를 3D U-Net에 적용",
      },
    ],
    stack: ["Python", "Tensorflow"],
    imageUrl: "/images/cna.png",
  },
];

export default careerItems;
