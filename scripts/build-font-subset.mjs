// Pretendard 서브셋 생성기.
//
//   npm run font        → public/fonts/PretendardVariable.subset.woff2 생성
//
// prebuild 로 걸려 있어 npm run build 때마다 다시 만든다. 손으로 돌릴 일은 없다.
//
// 왜 필요한가. 원본 Pretendard Variable 은 2MB 다. display: swap 이면 폰트가
// 도착하기 전까지 폴백으로 그려지고, 도착하는 순간 글자 폭이 바뀌면서 히어로와
// 내비게이션이 함께 밀린다. 라이브에서 실측하니 첫 방문 기준 CLS 0.034 · 643ms
// 지점의 시프트 1건이었고, 폰트 요청을 막거나 캐시가 warm 이면 0이었다.
// 로컬 서버에서는 폰트가 즉시 도착해 이 시프트가 드러나지 않는다.
//
// 그래서 두 가지를 같이 한다.
//   1. 실제로 쓰는 글자만 남겨 2MB → 약 155KB. 첫 페인트 전에 도착할 확률이 높아진다.
//   2. layout.tsx 에서 display: "optional". 늦게 도착하면 그 방문에는 폴백을 쓰고
//      교체하지 않는다. 즉 시프트가 발생할 경로 자체가 없다.
//
// 글자 목록은 src/ 를 훑어서 만든다. 새 문구를 넣어도 빌드할 때 자동으로 포함되므로
// 목록이 낡아 글자가 두부로 깨질 일은 없다. 다만 src/ 밖(예: 런타임에 받아오는
// 문자열)에서 글자가 온다면 여기 잡히지 않는다. 지금 이 사이트는 전부 정적이다.
import fs from "node:fs";
import path from "node:path";
import subsetFont from "subset-font";

const REPO = path.resolve(import.meta.dirname, "..");
const SRC = path.join(REPO, "public/fonts/PretendardVariable.woff2");
const OUT = path.join(REPO, "public/fonts/PretendardVariable.subset.woff2");

// layout.tsx 의 weight 와 같은 범위여야 한다. 좁히면 font-light·font-black 이 깨진다.
const WEIGHT = { min: 45, max: 920 };

/** src/ 아래 모든 소스에서 쓰인 문자를 모은다. */
function collectFromSource() {
  const chars = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx|js|jsx|css|md)$/.test(entry.name)) {
        for (const ch of fs.readFileSync(full, "utf8")) chars.add(ch);
      }
    }
  };
  walk(path.join(REPO, "src"));
  return chars;
}

/**
 * 소스에 아직 없어도 넣어두는 여유분.
 *
 * ASCII 전체와 흔한 문장부호·기호는 문구를 조금 고칠 때마다 서브셋이 바뀌는 것을
 * 막아준다. 한글 음절 전체(U+AC00–D7A3)는 넣지 않는다. 넣으면 1.7MB 가 되어
 * 서브셋의 의미가 사라진다 — 실제로 재보고 뺐다.
 */
function safetyMargin() {
  const chars = new Set();
  const add = (from, to) => {
    for (let c = from; c <= to; c += 1) chars.add(String.fromCodePoint(c));
  };
  add(0x20, 0x7e); // ASCII 인쇄 가능
  add(0xa0, 0xff); // 라틴-1 보충
  add(0x2010, 0x203a); // 각종 대시·따옴표·말줄임표
  add(0x2190, 0x2193); // 화살표
  add(0x3131, 0x3163); // 한글 자모 (ㄱ ㄴ ㄷ … ㅣ)
  "·※→←↑↓★☆○●◎△▲▽▼□■◇◆…‥「」『』〈〉《》〔〕【】₩％‰℃㎡".split("").forEach((c) => chars.add(c));
  return chars;
}

const used = collectFromSource();
const margin = safetyMargin();
const all = new Set([...used, ...margin]);
// 제어문자는 글리프가 없다.
const text = [...all].filter((c) => c.codePointAt(0) > 0x1f).sort().join("");

const source = fs.readFileSync(SRC);
const subset = await subsetFont(source, text, {
  targetFormat: "woff2",
  variationAxes: { wght: WEIGHT },
});
fs.writeFileSync(OUT, subset);

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
console.log(
  `글자 ${text.length}자 (소스 ${used.size} + 여유분) · ` +
    `${kb(source.length)} → ${kb(subset.length)} ` +
    `(${(100 - (subset.length / source.length) * 100).toFixed(1)}% 감소)`
);
console.log(`→ ${path.relative(REPO, OUT)}`);

if (subset.length >= source.length) {
  console.error("서브셋이 원본보다 크거나 같습니다. 글자 목록을 확인하세요.");
  process.exit(1);
}
