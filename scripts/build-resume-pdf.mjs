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
  headline: "사용자 경험과 성능을 기준으로 판단하는 프론트엔드 개발자",
  paragraphs: [
    "평소 애용하던 서비스에서 느린 로딩과 검색 노출 문제로 불편했던 경험을 계기로, 화면을 만들 때 늘 사용자 관점에서 먼저 확인하는 습관이 생겼습니다. 팀 프로젝트에서는 TanStack Query의 캐싱과 prefetching, 서버 컴포넌트를 함께 사용해 초기 로딩 속도와 SEO를 개선했고, Suspense·ErrorBoundary로 로딩과 에러가 화면 전체를 무너뜨리지 않도록 다뤘습니다.",
    "현재는 웨이온(WaiOn)에서 웨비나 SaaS <b>Webinow</b>의 리포트 대시보드와 영상 <b>Player</b>, AI 영상 클리핑 서비스 <b>ClipNow</b>를 개발하고 있습니다. ClipNow에서는 프론트엔드뿐 아니라 Hono·Drizzle ORM 기반 API 서버와 외부 렌더링 파이프라인까지 맡아, 레이트 리밋·동시 작업 가드처럼 서비스가 실제로 견뎌야 하는 지점을 다루고 있습니다.",
    "앞으로도 화면이 <b>얼마나 빨리, 얼마나 안정적으로</b> 사용자에게 도달하는지를 기준으로 판단하는 개발자로 성장하는 것이 목표입니다.",
  ],
};

const skills = [
  ["Language", ["TypeScript", "JavaScript"]],
  [
    "Frontend",
    [
      "Next.js (React)",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Redux Toolkit",
      "React Hook Form + Zod",
      "Storybook",
      "Recharts",
      "Jest",
      "MSW",
    ],
  ],
  ["Backend", ["Hono", "Drizzle ORM", "PostgreSQL", "Express.js"]],
  ["DevOps · Tooling", ["Nx", "AWS (S3)", "Vercel", "GitHub Actions", "Chromatic"]],
];

// 도구를 "써봤다"가 아니라 "어디까지 이해하고 있다"를 적는 자리.
const skillNotes = [
  "HTML / CSS · 시맨틱 태그를 쓰는 이유와 Position, Display, Box Model 등 레이아웃 속성을 이해하고 있습니다.",
  "JavaScript · 호이스팅, 스코프, 클로저와 배열 메서드(forEach, map, filter 등), 비동기 처리 흐름을 이해하고 있습니다.",
  "TypeScript · 타입 추론과 명시적 타입 지정, 인터페이스, 제네릭을 사용해 컴포넌트 props와 API 응답 타입을 설계합니다.",
  "React · Hook의 동작 원리와 단방향 데이터 흐름을 이해하고, 상태를 어디에 두어야 하는지 기준을 갖고 판단합니다.",
  "Next.js · 서버 컴포넌트와 클라이언트 컴포넌트의 경계, SSR·SSG를 활용한 로딩 속도와 SEO 최적화 방법을 이해하고 있습니다.",
  "협업 · Storybook으로 컴포넌트를 문서화하고, Jest 테스트와 GitHub Actions CI, 코드 컨벤션 기반의 코드 리뷰에 익숙합니다.",
];

// 성과 문단(picks)은 두 가지로 적는다.
//   { head, from: n } → projectItems.ts 의 solution[n] 을 상황→행동→결과로 잇는다
//   { head, body }    → 포트폴리오에 없는 이력서 전용 문장을 직접 적는다
// 제목은 손으로 쓴다. solution.head 는 "~문제점"으로 끝나 이력서 어조와 맞지 않는다.
const careerHighlights = {
  "웨이온 (WaiOn)": [
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
      project: "WAION Vision",
      role: "공장 비전 시스템 UI · 프론트엔드",
      bullets: ["edge · master 콘솔 등 비전 팩토리 시스템의 프론트엔드를 새로 구성 중입니다."],
      picks: [],
    },
  ],
};

// 개인 프로젝트와 입사 전 팀 프로젝트.
const sideProjects = [
  {
    title: "개인 포트폴리오 웹",
    team: "1인 개인 프로젝트 · 기획 · 디자인 · 개발",
    picks: [
      { head: "첫 화면의 누적 레이아웃 시프트를 실측해 제거 (4분 체류 CLS 0.113 → 0)", from: 0 },
      { head: "배포된 주소에서 재측정해 폰트 교체로 남던 시프트까지 제거", from: 1 },
    ],
  },
  {
    title: "FlowIt",
    team: "팀 프로젝트 (FE) · FE 4명",
    picks: [
      { head: "서버·클라이언트 공용 fetch 래퍼로 인증 흐름 일원화", from: 0 },
      { head: "미들웨어 라우팅 가드로 인증 상태에 따른 접근 제어", from: 1 },
      { head: "MSW 목 서버로 백엔드 완성 전 화면 개발 진행", from: 2 },
    ],
  },
  {
    title: "Moving",
    team: "팀 프로젝트 (FE) · FE 3명, BE 3명",
    picks: [
      {
        head: "Socket.io 양방향 통신으로 실시간 채팅 구현 및 서버 부하 감소",
        body: "폴링 방식으로 실시간 채팅을 구현하면 요청 횟수가 늘어나며 성능이 저하되는 문제가 있었습니다. Socket.io로 서버와 클라이언트의 연결을 유지해 필요할 때만 메시지를 전송하도록 바꾸고, 상대방의 온라인 상태·입력 중 표시·무한 스크롤 채팅 내역까지 함께 구현해 폴링 대비 서버 부하를 크게 줄였습니다.",
      },
      { head: "Redux Persist로 새로고침 이후에도 전역 상태 유지", from: 0 },
    ],
  },
  {
    title: "HanCook",
    team: "팀 프로젝트 (FE) · FE 3명, BE 3명",
    picks: [
      {
        head: "Axios Interceptor를 활용한 인증 관리 최적화",
        body: "accessToken이 만료될 때마다 사용자가 다시 로그인해야 했고, 토큰 관리 로직이 여러 곳에 흩어져 일관성 있게 처리하기 어려웠습니다. Axios Interceptor로 모든 API 요청에 accessToken을 자동으로 삽입하고 401 응답 시 refreshToken으로 재발급하도록 중앙화했습니다. 불필요한 인증 절차가 줄어 사용자 경험이 개선되었고, 인증 로직의 재사용성이 높아져 유지보수가 쉬워졌습니다.",
      },
      { head: "App Router에서 prefetchQuery · dehydrate로 SSR 구현", from: 0 },
    ],
  },
];

const education = [
  {
    title: "코드잇 클라우드 기반 풀스택 엔지니어 부트캠프",
    status: "수료",
    date: "2024.07 ~ 2025.02",
    body: [
      "state와 hook의 사용법에 그치지 않고 개념과 원리까지 배운 덕분에 React의 동작 방식을 깊이 이해할 수 있었습니다. 상태 관리와 컴포넌트 간 데이터 흐름, 각 hook이 왜 그 상황에 필요한지를 기준을 갖고 판단하게 되었습니다.",
      "팀 프로젝트에서 변수·상수 네이밍 등 코드 컨벤션을 정해 사용했습니다. 일관된 스타일 덕분에 코드 리뷰에서 스타일 논의가 줄고 더 중요한 논의에 집중할 수 있었고, 컨벤션이 개발 효율과 팀워크에 실제로 기여한다는 것을 경험했습니다.",
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
  const p = byTitle[project];
  return picks.map((pick) => {
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
      const meta = p ? period(p.created) : "";
      const stack = p ? p.stack.map((s) => s.name) : [];
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

  .job { border-left: 2px solid var(--line); padding-left: 13px; margin-bottom: 12px; break-inside: avoid; }
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

  <div class="sec-h"><h2>PROJECTS</h2><div class="rule"></div></div>
  ${sideProjects.map(sideProjectHTML).join("")}

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
          period: p ? period(p.created) : "",
          stack: p ? p.stack.map((s) => s.name) : [],
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
