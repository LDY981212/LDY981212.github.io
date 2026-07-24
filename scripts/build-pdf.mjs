// 포트폴리오 PDF 생성기.
//
//   npm run pdf            → build/pdf/ 에 portfolio.html · 이도엽_포트폴리오.pdf 생성
//   npm run pdf -- <디렉터리>  → 원하는 위치에 생성
//
// 사이트와 PDF가 어긋나지 않도록 프로젝트·커리어 데이터는 src/constants 를
// 그대로 읽는다. 즉 projectItems.ts 만 고치면 PDF도 따라온다.
// PDF 렌더링은 headless Chrome(Skia)이 담당한다. Chrome이 없으면 HTML까지만
// 만들고 끝내므로, 필요하면 그 HTML을 브라우저에서 직접 인쇄하면 된다.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
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
  // 최상위 배열은 줄머리 "];" 로 닫힌다 (내부 배열은 "]," 로 닫힘).
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

// --- 사이트와 동일한 정렬: 진행중 우선 → 시작월 내림차순 ---
const startMonth = (c) => {
  const m = c.match(/(\d{4})\.(\d{2})/);
  return m ? Number(m[1]) * 100 + Number(m[2]) : 0;
};
const isOngoing = (c) => c.includes("진행중");
projectItems.sort((a, b) => {
  const o = Number(isOngoing(b.created)) - Number(isOngoing(a.created));
  return o !== 0 ? o : startMonth(b.created) - startMonth(a.created);
});

const profile = [
  ["이름", "이도엽"],
  ["생년월일", "1998.12.12"],
  ["위치", "경기도 부천시"],
  ["연락처", "010-4465-8427"],
  ["이메일", "ldoyeop12@gmail.com"],
  ["학력", "한양대학교 생체공학과"],
  ["GitHub", "github.com/LDY981212"],
];

const skills = [
  ["Language", ["TypeScript", "JavaScript"]],
  [
    "Frontend",
    ["Next.js (React)", "Zustand", "React-Query", "Tailwind CSS", "Redux Toolkit", "Storybook"],
  ],
  ["DevOps", ["AWS", "Vercel"]],
];

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const chips = (arr) =>
  arr.map((s) => `<span class="chip">${esc(s)}</span>`).join("");

function projectHTML(p, i) {
  const stack = p.stack
    .filter((s) => s.detail && s.detail.trim())
    .map(
      (s) =>
        `<div class="row"><div class="row-k mono">${esc(s.name)}</div><div class="row-v">${esc(s.detail)}</div></div>`
    )
    .join("");
  const contrib = p.contribution
    .map((c) => {
      const items = c.detail
        .filter((d) => d.trim())
        .map((d) => `<li>${esc(d)}</li>`)
        .join("");
      return `<div class="sub"><h4>${esc(c.head)}</h4>${items ? `<ul>${items}</ul>` : ""}</div>`;
    })
    .join("");
  const trouble = (p.solution || [])
    .map(
      (s) => `
      <div class="star">
        <h4>${esc(s.head)}</h4>
        <div class="star-line"><span class="tag t-sit">상황</span>${esc(s.situation)}</div>
        <div class="star-line"><span class="tag t-task">과제</span>${esc(s.task)}</div>
        <div class="star-line"><span class="tag t-act">행동</span>${esc(s.action)}</div>
        <div class="star-line"><span class="tag t-res">결과</span>${esc(s.result)}</div>
      </div>`
    )
    .join("");

  return `
  <section class="project ${i === 0 ? "" : "break"}">
    <div class="p-head">
      <div>
        <div class="p-title">${esc(p.title)}</div>
        <div class="p-sub">${esc(p.subTitle)}</div>
      </div>
      <div class="p-date mono">${esc(p.created)}</div>
    </div>
    <ul class="p-points">${p.content.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    ${p.link ? `<div class="p-link mono">${esc(p.link)}</div>` : ""}
    ${p.github ? `<div class="p-link mono">${esc(p.github)}</div>` : ""}

    <div class="block-h">STACK</div>
    <div class="rows">${stack}</div>

    <div class="block-h">CONTRIBUTION</div>
    ${contrib}

    ${trouble ? `<div class="block-h">TROUBLE SHOOTING</div>${trouble}` : ""}
  </section>`;
}

function careerHTML(c) {
  const items = c.content
    .map(
      (it) => `
      <div class="sub">
        <h4>${esc(it.header)} <span class="mono c-year">${esc(it.year)}</span></h4>
        <p>${esc(it.infor)}</p>
      </div>`
    )
    .join("");
  return `
    <div class="career">
      <div class="c-head">
        <div>
          <div class="c-title">${esc(c.title)}</div>
          <div class="c-date mono">${esc(c.created)}</div>
        </div>
        <div class="chips">${chips(c.stack)}</div>
      </div>
      ${items}
    </div>`;
}

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>이도엽 · 프론트엔드 개발자 포트폴리오</title>
<style>
  @page { size: A4; margin: 16mm 15mm; }
  * { box-sizing: border-box; }
  :root { --accent:#2f6bff; --ink:#0b1020; --muted:#5b6478; --line:#e2e6ee; --soft:#eef2f9; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: -apple-system, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif;
    color: var(--ink); font-size: 10.5px; line-height: 1.65; margin: 0;
  }
  .mono { font-family: "SF Mono", ui-monospace, Menlo, monospace; }
  h1,h2,h3,h4 { margin: 0; }

  /* Cover */
  .cover { border-bottom: 2px solid var(--ink); padding-bottom: 14px; margin-bottom: 18px; }
  .eyebrow { font-size: 9px; letter-spacing: .18em; color: var(--muted); text-transform: uppercase; }
  .name { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; margin-top: 6px; }
  .role { font-size: 13px; color: var(--muted); margin-top: 2px; }
  .lead { font-size: 11px; margin-top: 10px; max-width: 60ch; }
  .lead b { color: var(--accent); }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 28px; margin-top: 12px; }
  .pf { display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--line); }
  .pf-k { width: 62px; color: var(--muted); font-size: 9px; letter-spacing:.08em; text-transform:uppercase; flex:none; }
  .pf-v { font-weight: 600; }

  /* Section heading */
  .sec-h { display:flex; align-items:baseline; gap:12px; margin: 22px 0 12px; }
  .sec-h h2 { font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
  .sec-h .rule { flex:1; height:1px; background: var(--line); }
  .sec-h .note { font-size: 9px; color: var(--muted); letter-spacing:.1em; }

  /* Skills */
  .skill-row { display:flex; gap:14px; padding:7px 0; border-bottom:1px solid var(--line); align-items:baseline; }
  .skill-k { width: 90px; flex:none; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
  .chips { display:flex; flex-wrap:wrap; gap:5px; }
  .chip { background: var(--soft); color: var(--accent); border-radius: 5px; padding: 2px 8px; font-size: 9.5px; font-weight:600;
          font-family:"SF Mono", ui-monospace, Menlo, monospace; }

  /* Career */
  .career { border-left: 2px solid var(--line); padding-left: 16px; margin-bottom: 20px; }
  .c-head { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:8px; }
  .c-title { font-size: 14px; font-weight: 800; }
  .c-date { font-size: 9.5px; color: var(--muted); margin-top: 2px; }
  .c-year { color: var(--muted); font-weight: 400; font-size: 9px; }

  /* Project */
  .project { padding-top: 4px; }
  .break { break-before: page; }
  .p-head { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
            border-bottom: 2px solid var(--ink); padding-bottom: 8px; margin-bottom: 10px; }
  .p-title { font-size: 20px; font-weight: 800; letter-spacing:-0.01em; }
  .p-sub { font-size: 10.5px; color: var(--muted); margin-top: 3px; max-width: 62ch; }
  .p-date { font-size: 9.5px; color: var(--muted); white-space: nowrap; }
  .p-points { margin: 0 0 8px; padding-left: 16px; }
  .p-points li { margin: 1px 0; }
  .p-link { font-size: 9.5px; color: var(--accent); border-left: 2px solid var(--accent); padding-left: 8px; margin: 6px 0; }

  .block-h { font-size: 10px; font-weight: 800; letter-spacing:.12em; color: var(--accent);
             border-bottom: 1px solid var(--line); padding-bottom: 3px; margin: 14px 0 8px; }
  .rows { display:flex; flex-direction:column; gap:6px; }
  .row { display:flex; gap:12px; break-inside: avoid; }
  .row-k { width: 120px; flex:none; color: var(--accent); font-weight: 700; font-size: 9.5px; border-left:2px solid var(--accent); padding-left:8px; }
  .row-v { color:#333; }

  .sub { margin-bottom: 8px; break-inside: avoid; }
  .sub h4 { font-size: 11px; font-weight: 700; margin-bottom: 2px; }
  .sub ul { margin: 0; padding-left: 16px; }
  .sub li { margin: 1px 0; color:#333; }
  .sub p { margin: 2px 0; color:#333; }

  .star { background: var(--soft); border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; break-inside: avoid; }
  .star h4 { font-size: 11px; margin-bottom: 6px; }
  .star-line { margin: 3px 0; padding-left: 42px; position: relative; color:#333; }
  .tag { position:absolute; left:0; top:0; font-size: 8.5px; font-weight:800; font-family:"SF Mono",monospace; }
  .t-sit{color:#e11d48;} .t-task{color:#d97706;} .t-act{color:var(--accent);} .t-res{color:#059669;}

  .foot { margin-top: 24px; border-top: 1px solid var(--line); padding-top: 8px; font-size: 8.5px; color: var(--muted); }
</style></head>
<body>
  <div class="cover">
    <div class="eyebrow">Frontend · TypeScript / Next.js</div>
    <div class="name">이도엽 <span style="font-size:16px;color:var(--muted);font-weight:600;">Lee Doyeop</span></div>
    <div class="role">프론트엔드 개발자 · 웨이온(WaiOn) 재직 중</div>
    <div class="lead">더 나은 <b>사용자 경험</b>을 깊이 고민하고, 끊임없이 의심하며 성장하는 프론트엔드 개발자입니다.</div>
    <div class="grid2">
      ${profile.map(([k, v]) => `<div class="pf"><div class="pf-k">${esc(k)}</div><div class="pf-v${k === "GitHub" || k === "이메일" || k === "연락처" || k === "생년월일" ? " mono" : ""}">${esc(v)}</div></div>`).join("")}
    </div>
  </div>

  <div class="sec-h"><h2>SKILLS</h2><div class="rule"></div><div class="note">주력 TypeScript · Next.js</div></div>
  ${skills.map(([k, arr]) => `<div class="skill-row"><div class="skill-k">${esc(k)}</div><div class="chips">${chips(arr)}</div></div>`).join("")}

  <div class="sec-h"><h2>CAREER</h2><div class="rule"></div></div>
  ${careerItems.map(careerHTML).join("")}

  <div class="sec-h break"><h2>PROJECTS</h2><div class="rule"></div><div class="note">${projectItems.length}건 · 2024–2026</div></div>
  ${projectItems.map((p, i) => projectHTML(p, i)).join("")}

  <div class="foot">© 2026 이도엽 · ldoyeop12@gmail.com · github.com/LDY981212 · https://ldy981212.github.io</div>
</body></html>`;

const htmlPath = path.join(OUT_DIR, "portfolio.html");
fs.writeFileSync(htmlPath, html);
console.log(
  `projects=${projectItems.length} careers=${careerItems.length} order=${projectItems.map((p) => p.title).join(", ")}`
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

const pdfPath = path.join(OUT_DIR, "이도엽_포트폴리오.pdf");
execFileSync(chrome, [
  "--headless",
  "--disable-gpu",
  // 여백·용지는 HTML의 @page 규칙을 따르게 두고, Chrome 기본 머리말/꼬리말만 끈다.
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  `file://${htmlPath}`,
]);
console.log(`pdf  → ${pdfPath}`);
