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
          "next-intl 기반 한국어·영어·인도네시아어 라우팅과 메시지 정합성 검사 CLI를 도입하고, 10개 상세 페이지의 정보구조·내비게이션·모션을 재설계했으며 폰트 서브셋(2,009KB → 94KB)·영상 인코딩·모바일 전환 비용 절감(435ms → 54ms)으로 전송량과 이동 렉을 줄였습니다.",
      },
      {
        id: "6",
        header: "WAION 코퍼레이트 랜딩 — 회사 소개 사이트",
        year: "2026.09 - 현재",
        infor:
          "빌더 기반 기존 사이트를 대체하는 waion.ai를 기획 문서부터 런칭까지 혼자 맡아, 홈 10개 섹션과 회사 소개·솔루션·제품·소식·블로그·문의 페이지, SEO·GA4·RSS를 구현하고 Lighthouse 모바일 점수를 71에서 88로 올렸습니다.",
      },
      {
        id: "7",
        header: "Webinow 제품 소개 사이트 — 마케팅 랜딩",
        year: "2026.09 - 현재",
        infor:
          "마케팅 초안과 디자인 시안을 바탕으로 홈·제품 소개·사용 방법·요금제·웨비나 목록 페이지를 혼자 제작해 webinow.co.kr로 런칭하고, 스크롤에 맞춰 재생되는 히어로 영상과 웨비나 API 연동, 도입 문의 접수를 구현했습니다.",
      },
      {
        id: "8",
        header: "CUK TLO — 가톨릭대학교 기술이전 플랫폼 풀스택",
        year: "2026.09 - 현재",
        infor:
          "KIPRIS 특허 수집 파이프라인과 특허 검색, 회원·관리자 인증, 문의·상담 접수와 관리자 처리, 콘텐츠·운영 설정·통계 콘솔을 Next.js·Supabase·Drizzle로 구현하고, 감사 기록 화면 397ms → 89ms 등 관리자 응답을 실측하며 줄였습니다. Vitest 테스트 970여 개로 검증합니다.",
      },
      {
        id: "9",
        header: "LingoNow — 실시간 통역 자막 웹앱",
        year: "2026.10 - 현재",
        infor:
          "운영 중인 lingonow.ai를 이어받아, 번역 세션이 모델 오류로 끊길 때 브라우저 재연결 없이 예비 세션으로 바꾸는 서버 측 교체 구조와 자막 지연 예산·p50/p95 계측, 운영 콘솔 재설계, 새로고침·배포 후 복구, 한국어·일본어·영어 UI를 구현했습니다.",
      },
      {
        id: "10",
        header: "LingoNow Studio — 자막 제작 스튜디오",
        year: "2026.10 - 현재",
        infor:
          "일본어 대본 기반 인·아웃 정렬로 방송 자막 기준 3프레임 이내 아웃 포인트 비율을 0.47~0.49에서 0.69~0.71로 올리고, 자막 번역 기능 전체와 프론트엔드의 Svelte 5 + TS 이관, 소수 프레임레이트 타임코드 오차 수정을 맡았습니다.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Nx", "Hono", "Drizzle ORM", "Supabase", "FastAPI", "Svelte"],
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
