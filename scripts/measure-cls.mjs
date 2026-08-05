// 레이아웃 시프트(CLS) 실측기.
//
//   npm run build && npx serve out -l 4321
//   npm run cls                       → 1440x900 에서 60초 관찰
//   npm run cls -- 240 390 844        → 초 · 폭 · 높이 지정
//
// 왜 필요했는지는 projectItems.ts 의 "첫 화면의 강조어 회전" 항목에 적혀 있다.
// 요약하면, 히어로 강조어가 2.6초마다 회전하며 뒷 문장을 밀어내고 있었는데
// 한 번의 값이 작아서 눈으로는 문제로 보이지 않았다. 회전이 무기한 반복되므로
// CLS 는 체류 시간에 비례해 계속 쌓이고, 4분이면 "good" 기준 0.1 을 넘겼다.
// 그래서 눈이 아니라 수치로 확인하는 절차를 남긴다.
//
// PerformanceObserver 를 페이지 스크립트보다 먼저 심어야 첫 페인트 직후의
// 시프트까지 잡힌다. addInitScript 를 쓰는 이유가 그것이다.
//
// 헤드리스로 도는 이유: 백그라운드 탭에서는 requestAnimationFrame 이 멈춰
// 애니메이션이 진행되지 않고, 렌더가 없으니 layout-shift 엔트리도 나오지 않는다.
import { chromium } from "playwright-core";

const URL = process.env.CLS_URL ?? "http://localhost:4321";
const seconds = Number(process.argv[2] ?? 60);
const vw = Number(process.argv[3] ?? 1440);
const vh = Number(process.argv[4] ?? 900);

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);

const { existsSync } = await import("node:fs");
const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("Chrome 을 찾지 못했습니다. CHROME_PATH 로 경로를 지정하세요.");
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-first-run", "--no-default-browser-check"],
});
const page = await browser.newPage({ viewport: { width: vw, height: vh } });

await page.addInitScript(() => {
  window.__cls = { total: 0, entries: [] };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // 사용자 입력 직후 500ms 안의 시프트는 CLS 에서 제외된다. 같은 규칙을 쓴다.
      if (entry.hadRecentInput) continue;
      window.__cls.total += entry.value;
      window.__cls.entries.push({
        t: Math.round(entry.startTime),
        v: Number(entry.value.toFixed(5)),
        nodes: (entry.sources ?? []).map((s) => {
          const node = s.node;
          if (!node) return "?";
          const cls =
            typeof node.className === "string" ? node.className.slice(0, 30) : "";
          return node.nodeName + (cls ? `.${cls}` : "");
        }),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
});

await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(seconds * 1000);

const { total, entries } = await page.evaluate(() => ({
  total: Number(window.__cls.total.toFixed(5)),
  entries: window.__cls.entries,
}));
await browser.close();

console.log(`\n${URL} · ${seconds}초 · ${vw}x${vh}`);
console.log(`누적 CLS ${total}   시프트 ${entries.length}건`);
for (const e of entries.slice(0, 20)) {
  console.log(`  ${String(e.t).padStart(6)}ms  ${e.v.toFixed(5)}  ${e.nodes.join(", ")}`);
}
if (entries.length > 20) console.log(`  ... 외 ${entries.length - 20}건`);

// 0.1 을 넘으면 Core Web Vitals 기준으로 "good" 을 벗어난다.
if (total > 0.1) {
  console.error(`\nCLS ${total} — "good" 기준(0.1)을 넘었습니다.`);
  process.exit(1);
}
