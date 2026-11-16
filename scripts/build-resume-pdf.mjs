// 이력서 PDF 생성기. (포트폴리오는 scripts/build-pdf.mjs)
//
//   npm run resume            → build/pdf/ 에 resume.html · 이력서 - 이도엽.pdf 생성
//   npm run resume -- <디렉터리>  → 원하는 위치에 생성
//
// 포트폴리오와 어긋나지 않도록 경력·프로젝트의 사실 데이터(기간·스택·문제 해결
// 서술)는 src/constants 를 그대로 읽는다. 이력서에만 필요한 문장(자기소개·교육·
// 학력·성과 제목)은 이 파일 안에서 관리한다.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const OUT_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(REPO, "build/pdf");
fs.mkdirSync(OUT_DIR, { recursive: true });

// --- TS 배열 리터럴만 뽑아 평가한다 (타입·정렬 코드는 제외) ---
function extractArray(file, declStart) {
  const src = fs.readFileSync(path.join(REPO, file), "utf8");
  const start = src.indexOf(declStart);
  const rest = src.slice(start + declStart.length);
  const end = rest.indexOf("\n];");
  const literal = rest.slice(0, end) + "\n]";
  return new Function(`return ${literal};`)();
}

const projectItems = extractArray(
  "src/constants/projectItems.ts",
  "const projectItems: ProjectItems[] ="
);
const careerItems = extractArray(
  "src/constants/careerItems.ts",
  "const careerItems: CareerItems[] ="
);

const byTitle = Object.fromEntries(projectItems.map((p) => [p.title, p]));
const careerByTitle = Object.fromEntries(careerItems.map((c) => [c.title, c]));

// ---------------------------------------------------------------- 이력서 내용

const profile = [
  ["생년월일", "1998.12.12"],
  ["연락처", "010-4465-8427"],
  ["이메일", "ldoyeop12@gmail.com"],
  ["GitHub", "github.com/LDY981212"],
  ["포트폴리오", "ldy981212.github.io"],
  ["학력", "한양대학교 생체공학과 졸업"],
];

const intro = {
  headline: "추정이 아니라 측정으로 판단하는 프론트엔드 개발자",
  paragraphs: [
    "웨이온(WaiOn)에서 웨비나 SaaS <b>Webinow</b>의 리포트 대시보드와 영상 <b>Player</b>로 시작해, 지금은 AI 영상 클리핑 <b>ClipNow</b>, 대학 기술이전 플랫폼 <b>CUK TLO</b>, 자막 제작 스튜디오 <b>LingoNow Studio</b>와 실시간 통역 자막 <b>LingoNow</b>를 맡고 있습니다. 화면에서 끝나지 않고 API 서버·DB·백그라운드 작업까지 함께 다루며, 회사·제품 랜딩 사이트 세 개는 기획부터 런칭·운영까지 담당했습니다.",
    "문제를 추정으로 풀지 않으려 합니다. ClipNow 서버가 동시 작업 열몇 건에서 멈췄을 때 모니터링은 디스크 병목을 가리켰지만, 부하 스크립트와 자원 측정기를 직접 만들어 재보니 원인은 메모리 압박이었습니다. 증설안을 접고 단계별 세마포어로 바꿔 <b>동시 처리 한계를 25건</b>으로 올렸습니다. 자막 정확도는 방송사 자막과 프레임 오차를 재는 평가 도구부터 만든 뒤 개선해 <b>3프레임 이내 아웃 포인트를 0.47에서 0.69로</b> 올렸고, 관리자 화면은 쿼리 계획과 인증 왕복을 걷어내 <b>397ms를 89ms로</b> 줄였습니다.",
    "리포트를 화면 그대로 PDF로 내보내고, 재생 엔진 셋의 차이를 어댑터 하나로 감추고, 실시간 번역의 상류 연결을 교체 가능한 링크로 감싸 브라우저를 건드리지 않고 세션을 바꿔 끼우는 것처럼, 기능을 더할 때 고칠 곳이 늘지 않는 구조를 고릅니다. 앞으로도 서비스가 <b>얼마나 빨리, 얼마나 안정적으로</b> 사용자에게 닿는지를 수치로 확인하며 판단하는 개발자로 성장하려 합니다.",
  ],
};

const skills = [
  ["Language", ["TypeScript", "JavaScript", "Python"]],
  [
    "Frontend",
    [
      "Next.js (React)",
      "Svelte 5",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "motion",
      "next-intl",
      "Storybook",
      "Chart.js",
    ],
  ],
  ["Backend", ["Hono", "FastAPI", "Drizzle ORM", "PostgreSQL", "Supabase", "SQLite"]],
  ["DevOps · Tooling", ["Nx", "Vercel", "AWS (S3)", "GitHub Actions", "Vitest", "Playwright", "ffmpeg"]],
];

// 도구를 "써봤다"가 아니라 "실무에서 어디까지 다뤘다"를 적는 자리.
const skillNotes = [
  "Next.js · 서버/클라이언트 컴포넌트 경계와 정적 프리렌더링·요청 시 렌더링을 페이지 성격에 맞게 고르고, DB를 읽는 페이지를 요청 시 렌더링으로 선언해 CI 빌드가 DB 없이 돌게 했습니다.",
  "성능 · Lighthouse 3회 중앙값, 화면 응답 반복 측정처럼 같은 조건으로 재고, 폰트 서브셋·영상 재인코딩·모바일 전용 전환 분기·쿼리 재구성 중 원인에 맞는 처방을 고릅니다.",
  "백엔드 · Hono·FastAPI API 서버, Drizzle 트랜잭션과 lock_version 동시 수정 방지, 예약 작업·별도 워커 프로세스로 무거운 작업을 요청 경로에서 분리해 봤습니다.",
  "실시간 · 음성 번역 WebSocket 프록시와 세션 교체, 디코더 비용을 고려한 스크롤 연동 영상 탐색처럼 끊김이 바로 보이는 화면을 다뤘습니다.",
  "다국어 · next-intl과 자체 i18n 런타임으로 한국어·영어·일본어·인도네시아어 화면을 운영하고, 로케일 간 메시지 불일치를 CLI와 테스트로 잡습니다.",
  "협업 · 설계 문서와 결정 기록을 남기고, Storybook으로 컴포넌트를 문서화하며 Vitest·GitHub Actions로 린트·타입 검사·테스트를 CI에서 돌립니다.",
];

// 성과 문단(picks)은 두 가지로 적는다.
//   { head, from: n } → projectItems.ts 의 solution[n] 을 상황→행동→결과로 잇는다
//   { head, body }    → 포트폴리오에 없는 이력서 전용 문장을 직접 적는다
// 제목은 손으로 쓴다. solution.head 는 "~문제점"으로 끝나 이력서 어조와 맞지 않는다.
const careerHighlights = {
  "웨이온 (WaiOn)": [
    {
      project: "LingoNow Studio 자막 제작",
      role: "자막 제작 스튜디오 · 풀스택",
      bullets: [
        "일본어 대본을 음성과 강제 정렬하는 인·아웃 경로와 방송 자막 대비 프레임 오차 평가 도구 구축",
        "자막 번역 기능을 설계 문서부터 배치 워커·API·화면·SRT/CSV 내보내기까지 구현 (취소·부분 결과 보존·중복 실행 방지)",
        "바닐라 JS 스튜디오를 Svelte 5 + strict TS로 6단계 이관, 이관 전후 엔진 출력이 바이트 단위로 같은지 대조",
        "한국어·일본어·영어 UI와 오류 코드화, 방송 자막 파일 가져오기·내보내기와 결과 비교 엑셀",
      ],
      picks: [
        { head: "평가 도구부터 만들어 방송 자막 기준 3프레임 이내 아웃 포인트 0.47 → 0.69", from: 0 },
        { head: "23.976fps에서 10분에 14프레임 밀리던 타임코드 계산 수정과 서버·브라우저 반올림 통일", from: 1 },
      ],
    },
    {
      project: "LingoNow 실시간 통역 자막",
      role: "실시간 통역 자막 웹앱 · 풀스택",
      bullets: [
        "운영 중인 서비스를 이어받아, 모델 오류 시 브라우저 재연결 없이 예비 세션으로 교체하는 서버 측 핫스왑과 45분 선제 교체 구현",
        "막힌 항목 건너뛰기·6초 지연 예산·FLIP 줄 전환으로 자막 흐름을 고치고 서버·브라우저 구간별 p50/p95 지연 계측",
        "운영 콘솔을 시맨틱 토큰 기반으로 재설계, 새로고침·배포 후 자동 복구와 한국어·일본어·영어 UI",
      ],
      picks: [
        { head: "통역 중 F5·배포에도 끊기지 않도록 새로고침 방지와 같은 설정 복구 흐름 설계", from: 2 },
      ],
    },
    {
      project: "CUK TLO 기술이전 플랫폼",
      role: "대학 기술이전 플랫폼 · 풀스택",
      bullets: [
        "KIPRIS Plus 특허 수집과 공개 특허 검색·IPC 선버스트, 전임교원 243명과 발명자를 대조해 등록 특허 1,309건 중 318건으로 수집 범위 확정",
        "회원·관리자 인증(이메일 OTP·개인정보 AES-256-GCM 암호화·계정별 시도 제한)과 문의·상담 접수부터 관리자 처리·메일 회신까지의 흐름",
        "콘텐츠·운영 설정·특허 검토·통계 관리자 콘솔을 60개 테이블 Drizzle 스키마 위에 구현, 백그라운드 작업을 Vercel Cron으로 이전",
        "Vitest 972개 테스트와 GitHub Actions 검사, 개발 서버 멈춤을 Turbopack 캐시 18GB와 DB 풀 중복 생성으로 특정해 해결",
      ],
      picks: [
        { head: "쿼리 계획과 인증 왕복을 걷어내 관리자 응답 단축 (감사 기록 397ms → 89ms)", from: 2 },
        { head: "계정 존재 여부를 드러내지 않는 로그인·인증 메일 시도 제한", from: 1 },
      ],
    },
    {
      project: "ClipNow",
      role: "AI 영상 클리핑 서비스 · 풀스택",
      bullets: [
        "단어 단위 자막 타이밍 데이터 인프라 구축 및 카라오케(단어 단위 강조) 렌더링 구현",
        "음성 인식 API 전사 · 멀티모달 AI 영상 이해 연동, 도메인 키워드 부스트로 인식 정확도 개선",
        "외부 렌더링 API 파이프라인과 웹훅 인프라 재설계, tus 프로토콜 기반 대용량 이어올리기 업로드 구현",
        "Hono · Drizzle ORM 기반 API 서버, 주요 SNS 연동 토큰 암호화, pino 구조화 로깅 담당",
      ],
      picks: [
        { head: "병목을 실측으로 뒤집어 동시 처리 한계를 25건까지 확대", from: 0 },
        { head: "렌더 단계 병목을 특정해 전체 처리 p95 2.5배 단축", from: 1 },
      ],
    },
    {
      project: "Webinow",
      role: "웨비나 SaaS · 프론트엔드",
      bullets: [
        "참여 현황 리포트 대시보드의 퍼널·라인·파이·가로 바 차트 컴포넌트 제작",
        "차트 데이터를 문장으로 변환해 보여주는 커스텀 컴포넌트·플러그인 제작",
        "랜딩·커스텀 신청·수료증·서포트 관리 페이지 제작 및 API 연동",
        "Nx 모노레포에 Storybook 구조를 적용하고 공통 컴포넌트 스토리 작성",
      ],
      picks: [{ head: "화면과 동일한 레이아웃으로 리포트를 PDF 출력", from: 0 }],
    },
    {
      project: "Player",
      role: "웨비나 영상 플레이어 · 프론트엔드",
      bullets: [
        "Vimeo · HLS 기반 플레이어와 라이브 링크 embed 로직 구현",
        "컨트롤 바를 유튜브 표준 스타일로 통일하고 키보드 단축키·전체화면 구현",
        "라이브·다시보기·미리보기 시청 모드와 채팅·Q&A 패널 동기화, 게스트 모드 구현",
      ],
      picks: [
        { head: "재생 엔진 셋의 차이를 어댑터로 감춰 공용 기능을 한 벌로 유지", from: 0 },
      ],
    },
    {
      project: "회사·제품 랜딩 사이트 3종",
      role: "Edge Vision AI · WAION · Webinow · 기획~운영",
      period: "2026.08 ~ 진행중",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "motion", "Lenis", "ffmpeg"],
      bullets: [
        "Edge Vision AI (2인): 한국어·영어·인도네시아어 3개 로케일과 메시지 정합성 검사 CLI, 10개 상세 페이지 정보구조 재설계, 폰트 2,009KB → 94KB",
        "WAION 코퍼레이트 (1인): 기존 빌더 사이트 진단·기획 문서부터 waion.ai 런칭까지, 페이지별 SEO·구조화 데이터·RSS·GA4, 모바일 Lighthouse 71 → 88",
        "Webinow 제품 소개 (1인): 스크롤 연동 히어로 영상과 4단계 제품 투어, 웨비나 API 기반 목록·백오피스 문의 접수로 webinow.co.kr 런칭",
      ],
      picks: [
        { project: "Edge Vision AI 랜딩", head: "폰에서만 끊기던 페이지 이동을 GPU 비용으로 특정해 전환 435ms → 54ms", from: 3 },
        { project: "WAION 코퍼레이트 랜딩", head: "연출을 줄이지 않고 모바일 첫 화면 바이트를 덜어 LCP 6.56초 → 3.90초", from: 0 },
      ],
    },
    {
      project: "WAION Vision",
      role: "공장 비전 검사 시스템 UI · 프론트엔드",
      period: "2026.07",
      stack: ["Next.js", "TypeScript", "Nx", "Drizzle ORM (SQLite)", "WebSocket"],
      bullets: [
        "엣지 PC에서 도는 운영자 검사 콘솔 재설계, 카메라 모니터 전용 창과 3열 카메라 레이아웃",
        "품질 검사 대시보드에 판정 카드·NG/NR 사유 표시와 교대 목표·근무 시간 확정, 필요 속도(pcs/h) 실시간 계산",
        "공장·라인 식별을 빌드가 아닌 기동 시 환경 값으로 노출하고, agent 없이 실제 엔진 스트림을 띄우는 개발 모드 추가",
      ],
      picks: [
        {
          head: "레이어 밖 CSS 한 줄 때문에 앱 전체 아이콘 크기 지정이 무시되던 문제 해결",
          body: "앱 전체 아이콘 101개 중 크기를 지정한 100개가 지정과 무관하게 24px로 그려지고 있었습니다. 아이콘 폰트 규칙이 어떤 @layer에도 속하지 않았는데, 레이어 밖 CSS는 모든 레이어를 이긴다는 캐스케이드 규칙 때문에 그 font-size가 Tailwind의 text-* 유틸리티를 누르고 있었습니다. 규칙을 @layer base로 옮겨 유틸리티가 정상 동작하게 하고, 크기를 지정하지 않은 아이콘은 기존 24px 기본값을 유지했습니다.",
        },
      ],
    },
  ],
};


// 이력서에는 실무 프로젝트만 싣는다. 개인·부트캠프 프로젝트는 포트폴리오 웹에만 남긴다.
const sideProjects = [];

const education = [
  {
    title: "코드잇 클라우드 기반 풀스택 엔지니어 부트캠프",
    status: "수료",
    date: "2024.07 ~ 2025.02",
    body: [
      "state와 hook의 사용법에 그치지 않고 개념과 원리까지 배운 덕분에 React의 동작 방식을 깊이 이해할 수 있었습니다. 상태 관리와 컴포넌트 간 데이터 흐름, 각 hook이 왜 그 상황에 필요한지를 기준을 갖고 판단하게 되었습니다.",
    ],
  },
];

const schooling = [
  {
    title: "한양대학교 생체공학과",
    status: "졸업",
    date: "2020.03 ~ 2024.08",
    body: ["학사 졸업. 재학 중 뇌영상분석 연구실(CNA)에서 의료 영상 딥러닝 분석을 수행했습니다."],
  },
];

// ---------------------------------------------------------------- 프로필 사진
//
// scripts/assets/photo.{jpg,jpeg,png,webp} 에 사진을 두면 커버 오른쪽 칸에 들어간다.
// 다른 경로를 쓰려면 RESUME_PHOTO=/path/to/photo.jpg npm run resume.
// 파일이 없으면 같은 크기의 빈 칸(3:4)이 대신 그려진다.

const PHOTO_EXT = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const photoFile = [
  process.env.RESUME_PHOTO,
  ...Object.keys(PHOTO_EXT).map((ext) => path.join(REPO, `scripts/assets/photo${ext}`)),
].find((p) => p && fs.existsSync(p));

const photoHTML = photoFile
  ? `<div class="photo"><img alt="프로필 사진" src="data:${
      PHOTO_EXT[path.extname(photoFile).toLowerCase()] || "image/jpeg"
    };base64,${fs.readFileSync(photoFile).toString("base64")}"></div>`
  : `<div class="photo empty"><span class="ph-l">PHOTO</span><span class="ph-s">3 : 4</span></div>`;

// ---------------------------------------------------------------- 렌더링

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const chips = (arr) => arr.map((s) => `<span class="chip">${esc(s)}</span>`).join("");

/** solution 항목을 이력서용 한 문단으로 잇는다: 상황 → 행동 → 결과. */
const narrative = (s) =>
  [s.situation, s.action, s.result].map((t) => String(t).trim()).join(" ");

/** picks 를 {head, body} 로 풀어낸다. HTML·Figma 양쪽이 같은 문장을 쓴다. */
function resolvePicks(project, picks = []) {
  return picks.map((pick) => {
    const p = byTitle[pick.project ?? project];
    const body =
      pick.body ?? (p && p.solution && p.solution[pick.from] && narrative(p.solution[pick.from]));
    if (!body) throw new Error(`성과 문단을 찾지 못했습니다: ${project} / ${pick.head}`);
    return { head: pick.head, body };
  });
}

/** 기간에서 괄호 설명을 뗀다. "2025.01 ~ 2025.02 (2개월)" → "2025.01 ~ 2025.02" */
const period = (created) => created.replace(/\s*\(.*\)$/, "");

function highlightHTML(project, picks = []) {
  return resolvePicks(project, picks)
    .map((h) => `<div class="hl"><h5>${esc(h.head)}</h5><p>${esc(h.body)}</p></div>`)
    .join("");
}

function careerHTML(c) {
  const highlights = careerHighlights[c.title] || [];
  const items = highlights
    .map((h) => {
      const p = byTitle[h.project];
      const meta = h.period ?? (p ? period(p.created) : "");
      const stack = h.stack ?? (p ? p.stack.map((s) => s.name) : []);
      return `
      <div class="job">
        <div class="job-head">
          <h4>${esc(h.project)} <span class="job-role">${esc(h.role)}</span></h4>
          ${meta ? `<span class="job-date mono">${esc(meta)}</span>` : ""}
        </div>
        ${stack.length ? `<div class="chips tight">${chips(stack)}</div>` : ""}
        <ul>${h.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${highlightHTML(h.project, h.picks)}
      </div>`;
    })
    .join("");

  return `
    <div class="career">
      <div class="c-head">
        <div class="c-title">${esc(c.title)}</div>
        <div class="c-date mono">${esc(c.created)}</div>
      </div>
      ${items}
    </div>`;
}

function sideProjectHTML(sp) {
  const p = byTitle[sp.title];
  if (!p) return "";
  const stack = p.stack.map((s) => s.name);
  const links = [p.github, p.link && p.link.startsWith("http") ? p.link : null]
    .filter(Boolean)
    .map((l) => `<span class="mono link">${esc(l)}</span>`)
    .join("");

  return `
  <div class="proj">
    <div class="p-head">
      <div>
        <div class="p-title">${esc(p.title)}</div>
        <div class="p-sub">${esc(p.subTitle)}</div>
      </div>
      <div class="p-meta">
        <div class="p-date mono">${esc(period(p.created))}</div>
        <div class="p-team">${esc(sp.team)}</div>
      </div>
    </div>
    <div class="chips tight">${chips(stack)}</div>
    <ul class="p-points">${p.content.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    ${highlightHTML(sp.title, sp.picks)}
    ${links ? `<div class="links">${links}</div>` : ""}
  </div>`;
}

function eduHTML(e) {
  return `
    <div class="edu">
      <div class="e-head">
        <h4>${esc(e.title)} <span class="e-status">${esc(e.status)}</span></h4>
        <span class="e-date mono">${esc(e.date)}</span>
      </div>
      ${e.body.map((b) => `<p>${esc(b)}</p>`).join("")}
    </div>`;
}

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>이력서 · 이도엽 프론트엔드 개발자</title>
<style>
  @page { size: A4; margin: 15mm 14mm; }
  * { box-sizing: border-box; }
  :root { --accent:#2f6bff; --ink:#0b1020; --muted:#5b6478; --line:#e2e6ee; --soft:#eef2f9; --body:#2c3242; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: -apple-system, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif;
    color: var(--ink); font-size: 10.5px; line-height: 1.62; margin: 0;
  }
  .mono { font-family: "SF Mono", ui-monospace, Menlo, monospace; }
  h1,h2,h3,h4,h5 { margin: 0; }
  p { margin: 0; }

  /* 머리 */
  .cover { border-bottom: 2px solid var(--ink); padding-bottom: 14px;
           display: flex; align-items: flex-start; gap: 20px; }
  .cover-main { flex: 1; min-width: 0; }

  /* 증명사진 칸(3:4). 본문 카드와 같은 소프트 배경·라운드를 쓴다. */
  .photo { flex: none; width: 96px; height: 128px; border-radius: 6px; overflow: hidden;
           background: var(--soft); border: 1px solid var(--line); }
  .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .photo.empty { border-style: dashed; display: flex; flex-direction: column;
                 align-items: center; justify-content: center; gap: 3px; color: var(--muted); }
  .ph-l { font-size: 8.5px; letter-spacing: .18em; font-weight: 700; }
  .ph-s { font-size: 8px; letter-spacing: .1em; }
  .eyebrow { font-size: 9px; letter-spacing: .18em; color: var(--muted); text-transform: uppercase; }
  .name { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; margin-top: 6px; }
  .name span { font-size: 15px; color: var(--muted); font-weight: 600; margin-left: 6px; }
  .role { font-size: 12.5px; color: var(--accent); font-weight: 700; margin-top: 3px; }
  .now { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; margin-top: 14px; }
  .pf { display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--line); }
  .pf-k { width: 62px; color: var(--muted); font-size: 9px; letter-spacing:.08em; text-transform:uppercase; flex:none; padding-top:1px; }
  .pf-v { font-weight: 600; }

  /* 섹션 제목 */
  /* 제목만 페이지 끝에 홀로 남지 않게 다음 블록과 붙여 둔다. */
  .sec-h { display:flex; align-items:baseline; gap:12px; margin: 20px 0 10px; break-after: avoid; }
  .sec-h h2 { font-size: 16px; font-weight: 800; letter-spacing: -0.01em; }
  .sec-h .rule { flex:1; height:1px; background: var(--line); }

  .lead p { margin-bottom: 6px; color: var(--body); max-width: 92ch; }
  .lead b { color: var(--accent); }

  /* 스킬 */
  .skill-row { display:flex; gap:14px; padding:6px 0; border-bottom:1px solid var(--line); align-items:baseline; }
  .skill-k { width: 96px; flex:none; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
  .chips { display:flex; flex-wrap:wrap; gap:4px; }
  .chips.tight { margin: 4px 0 6px; }
  .chip { background: var(--soft); color: var(--accent); border-radius: 5px; padding: 2px 7px; font-size: 9px; font-weight:600;
          font-family:"SF Mono", ui-monospace, Menlo, monospace; }
  .notes { margin: 8px 0 0; padding-left: 15px; }
  .notes li { margin: 2px 0; color: var(--body); }

  /* 경력 */
  /* 회사 블록은 한 페이지를 넘길 만큼 길다. 통째로 묶으면 앞 페이지가 비므로
     안에서 쪼개지게 두고, 대신 프로젝트 단위(.job)와 성과 문단(.hl)만 지킨다. */
  .career { margin-bottom: 14px; }
  .c-head { display:flex; justify-content:space-between; align-items:baseline; gap:12px;
            border-bottom:1px solid var(--ink); padding-bottom:5px; margin-bottom:9px; break-after: avoid; }
  .c-title { font-size: 14.5px; font-weight: 800; }
  .c-date { font-size: 9.5px; color: var(--muted); white-space:nowrap; }

  .job { border-left: 2px solid var(--line); padding-left: 13px; margin-bottom: 12px; }
  /* 프로젝트가 길어 통째로 넘기면 앞 페이지 절반이 빈다. 머리·목록·성과 문단 단위로만 묶는다. */
  .job-head, .job .chips { break-after: avoid; }
  .job ul { break-inside: avoid; }
  .job-head { display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
  .job-head h4 { font-size: 11.5px; font-weight: 800; }
  .job-role { font-size: 9.5px; color: var(--muted); font-weight: 500; }
  .job-date { font-size: 9px; color: var(--muted); white-space:nowrap; }
  .job ul { margin: 3px 0 0; padding-left: 15px; }
  .job li { margin: 1px 0; color: var(--body); }

  /* 성과 문단 */
  .hl { background: var(--soft); border-radius: 6px; padding: 7px 10px; margin-top: 6px; break-inside: avoid; }
  .hl h5 { font-size: 10.5px; font-weight: 800; color: var(--accent); margin-bottom: 2px; }
  .hl p { color: var(--body); }

  /* 프로젝트 */
  .proj { margin-bottom: 14px; break-inside: avoid-page; }
  .p-head { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
            border-bottom:1px solid var(--ink); padding-bottom:5px; }
  .p-title { font-size: 13.5px; font-weight: 800; }
  .p-sub { font-size: 10px; color: var(--muted); margin-top: 2px; max-width: 64ch; }
  .p-meta { text-align: right; white-space: nowrap; }
  .p-date { font-size: 9.5px; color: var(--muted); }
  .p-team { font-size: 9px; color: var(--muted); }
  .p-points { margin: 0 0 4px; padding-left: 15px; }
  .p-points li { margin: 1px 0; color: var(--body); }
  .links { margin-top: 5px; display:flex; flex-wrap:wrap; gap:10px; }
  .link { font-size: 8.5px; color: var(--accent); }

  /* 교육·학력 */
  .edu { border-left: 2px solid var(--line); padding-left: 13px; margin-bottom: 11px; break-inside: avoid; }
  .e-head { display:flex; justify-content:space-between; align-items:baseline; gap:10px; margin-bottom:3px; }
  .e-head h4 { font-size: 11.5px; font-weight: 800; }
  .e-status { font-size: 9.5px; color: var(--accent); font-weight: 700; }
  .e-date { font-size: 9px; color: var(--muted); white-space:nowrap; }
  .edu p { color: var(--body); margin-bottom: 3px; }

  .foot { margin-top: 20px; border-top: 1px solid var(--line); padding-top: 7px; font-size: 8.5px; color: var(--muted); }
</style></head>
<body>
  <div class="cover">
    <div class="cover-main">
      <div class="eyebrow">Resume · Frontend Developer</div>
      <div class="name">이도엽 <span>Lee Doyeop</span></div>
      <div class="role">${esc(intro.headline)}</div>
      <div class="now">웨이온(WaiOn) 프론트엔드 개발자 재직 중 · 2025.12 ~ 현재</div>
      <div class="grid2">
        ${profile
          .map(
            ([k, v]) =>
              `<div class="pf"><div class="pf-k">${esc(k)}</div><div class="pf-v${
                ["GitHub", "이메일", "연락처", "생년월일", "포트폴리오"].includes(k) ? " mono" : ""
              }">${esc(v)}</div></div>`
          )
          .join("")}
      </div>
    </div>
    ${photoHTML}
  </div>

  <div class="sec-h"><h2>INTRODUCE</h2><div class="rule"></div></div>
  <div class="lead">${intro.paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

  <div class="sec-h"><h2>SKILLS</h2><div class="rule"></div></div>
  ${skills
    .map(
      ([k, arr]) =>
        `<div class="skill-row"><div class="skill-k">${esc(k)}</div><div class="chips">${chips(arr)}</div></div>`
    )
    .join("")}
  <ul class="notes">${skillNotes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>

  <div class="sec-h"><h2>CAREER</h2><div class="rule"></div></div>
  ${careerHTML(careerByTitle["웨이온 (WaiOn)"])}

  ${
    sideProjects.length
      ? `<div class="sec-h"><h2>PROJECTS</h2><div class="rule"></div></div>
  ${sideProjects.map(sideProjectHTML).join("")}`
      : ""
  }

  <div class="sec-h"><h2>EDUCATION</h2><div class="rule"></div></div>
  ${education.map(eduHTML).join("")}
  ${schooling.map(eduHTML).join("")}

  <div class="foot">이도엽 · ldoyeop12@gmail.com · 010-4465-8427 · github.com/LDY981212 · https://ldy981212.github.io</div>
</body></html>`;

const htmlPath = path.join(OUT_DIR, "resume.html");
fs.writeFileSync(htmlPath, html);
console.log(
  `career=${Object.keys(careerHighlights).length} sideProjects=${sideProjects.map((s) => s.title).join(", ")}`
);
console.log(
  photoFile
    ? `photo → ${photoFile}`
    : `photo → 없음(빈 칸으로 출력). scripts/assets/photo.jpg 에 사진을 두면 들어갑니다.`
);
console.log(`html → ${htmlPath}`);

// --- headless Chrome으로 인쇄 ---
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = CHROME_CANDIDATES.find((c) => fs.existsSync(c));

if (!chrome) {
  console.warn(
    "Chrome을 찾지 못해 HTML까지만 만들었습니다. CHROME_PATH 환경 변수로 지정하거나 위 HTML을 브라우저에서 인쇄하세요."
  );
  process.exit(0);
}

const pdfPath = path.join(OUT_DIR, "이력서 - 이도엽.pdf");
execFileSync(chrome, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  `file://${htmlPath}`,
]);
console.log(`pdf  → ${pdfPath}`);

// ------------------------------------------------- Figma 플러그인 (같은 데이터)
//
// Figma 는 파일을 밖에서 생성할 방법이 없다. 대신 Figma 안에서 실행하면 이력서를
// 통째로 그려 주는 플러그인을 만든다. 텍스트·오토레이아웃 레이어로 들어가므로
// 기존 Figma 이력서처럼 그대로 수정할 수 있다.

const stripTags = (s) => String(s).replace(/<[^>]+>/g, "");

const figmaData = {
  greeting: ["안녕하세요.", "프론트엔드 개발자 이도엽입니다."],
  contacts: [
    { label: "전화번호", value: "010-4465-8427" },
    { label: "이메일", value: "ldoyeop12@gmail.com" },
    { label: "GitHub", value: "https://github.com/LDY981212", link: true },
    { label: "포트폴리오", value: "https://ldy981212.github.io", link: true },
    { label: "생년월일", value: "1998. 12. 12" },
  ],
  intro: {
    headline: intro.headline,
    paragraphs: intro.paragraphs.map(stripTags),
  },
  skills: skills.map(([label, items]) => ({ label, items })),
  skillNotes,
  career: careerItems
    .filter((c) => careerHighlights[c.title])
    .map((c) => ({
      company: c.title,
      period: c.created,
      jobs: careerHighlights[c.title].map((h) => {
        const p = byTitle[h.project];
        return {
          project: h.project,
          role: h.role,
          period: h.period ?? (p ? period(p.created) : ""),
          stack: h.stack ?? (p ? p.stack.map((s) => s.name) : []),
          bullets: h.bullets,
          highlights: resolvePicks(h.project, h.picks),
        };
      }),
    })),
  projects: sideProjects.map((sp) => {
    const p = byTitle[sp.title];
    return {
      title: p.title,
      subTitle: p.subTitle,
      period: period(p.created),
      team: sp.team,
      stack: p.stack.map((s) => s.name),
      content: p.content,
      highlights: resolvePicks(sp.title, sp.picks),
    };
  }),
  education: [...education, ...schooling],
};

const FIGMA_DIR = path.join(OUT_DIR, "figma");
fs.mkdirSync(FIGMA_DIR, { recursive: true });

const template = fs.readFileSync(
  path.join(REPO, "scripts/figma-resume/plugin-template.js"),
  "utf8"
);
fs.writeFileSync(
  path.join(FIGMA_DIR, "code.js"),
  `// 자동 생성 파일입니다. 고치려면 scripts/build-resume-pdf.mjs 와\n` +
    `// scripts/figma-resume/plugin-template.js 를 수정하고 npm run resume 를 실행하세요.\n` +
    `const DATA = ${JSON.stringify(figmaData, null, 2)};\n\n${template}`
);
fs.writeFileSync(
  path.join(FIGMA_DIR, "manifest.json"),
  JSON.stringify(
    {
      name: "이력서 - 이도엽",
      id: "resume-doyeop-local",
      api: "1.0.0",
      main: "code.js",
      editorType: ["figma"],
      documentAccess: "dynamic-page",
      networkAccess: { allowedDomains: ["none"] },
    },
    null,
    2
  ) + "\n"
);
console.log(`figma → ${FIGMA_DIR}/manifest.json (Figma → 플러그인 → 개발 → 매니페스트 가져오기)`);
