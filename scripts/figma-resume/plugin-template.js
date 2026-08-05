// 이력서 Figma 플러그인 (본문). 앞에 DATA 상수가 주입된 상태로 실행된다.
// 빌드: npm run resume → build/pdf/figma/{manifest.json, code.js}
//
// 기존 Figma 이력서의 양식을 그대로 따른다.
//   사진 + 인사말 → 연락처 여러 열 → 소개 → 회색 형광펜 섹션 제목 → 2단 프로젝트
// 모든 요소는 오토레이아웃 + 실제 텍스트 레이어라 Figma에서 그대로 수정할 수 있다.
//
// 주의: layoutSizingHorizontal 은 "오토레이아웃 부모에 붙인 뒤"에만 지정할 수 있다.
// 그래서 붙이기와 크기 지정을 add() 하나로 묶어 순서를 강제한다.

const PAGE_W = 595; // A4 pt
const PAGE_H = 842;
const PAD_X = 56;
const PAD_TOP = 56;
const PAD_BOTTOM = 48;
const BODY_W = PAGE_W - PAD_X * 2;

const INK = hex("#1a1a1a");
const BODY = hex("#333333");
const MUTED = hex("#767676");
const LINK = hex("#1b57d6");
const MARK = hex("#e9e9e9");
const LINE = hex("#dddddd");
const SOFT = hex("#f4f6fa");

function hex(h) {
  return {
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  };
}
const solid = (c) => [{ type: "SOLID", color: c }];

// --- 폰트: 설치된 것 중 한글이 되는 걸 우선으로 고른다 ---
const FONT_CANDIDATES = ["Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Inter"];
let FAMILY = "Inter";
const WEIGHT = { regular: "Regular", medium: "Medium", bold: "Bold" };

async function pickFont() {
  for (const family of FONT_CANDIDATES) {
    try {
      await figma.loadFontAsync({ family, style: "Regular" });
      await figma.loadFontAsync({ family, style: "Bold" });
      FAMILY = family;
      // Medium 이 없는 패밀리가 있어서, 실패하면 Regular 로 대체한다.
      try {
        await figma.loadFontAsync({ family, style: "Medium" });
        WEIGHT.medium = "Medium";
      } catch (e) {
        WEIGHT.medium = "Regular";
      }
      return;
    } catch (e) {
      /* 다음 후보 */
    }
  }
  throw new Error("한글을 쓸 수 있는 폰트를 찾지 못했습니다.");
}

// --- 만들기 도우미 ---

function frame(name, opts) {
  const o = opts || {};
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = o.dir === "H" ? "HORIZONTAL" : "VERTICAL";
  f.itemSpacing = o.gap == null ? 0 : o.gap;
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.fills = o.fill ? solid(o.fill) : [];
  f.clipsContent = false;
  const p = o.pad || [0, 0, 0, 0]; // [위, 오른쪽, 아래, 왼쪽]
  f.paddingTop = p[0];
  f.paddingRight = p[1];
  f.paddingBottom = p[2];
  f.paddingLeft = p[3];
  if (o.radius) f.cornerRadius = o.radius;
  if (o.align) f.counterAxisAlignItems = o.align;
  return f;
}

function text(chars, opts) {
  const o = opts || {};
  const t = figma.createText();
  t.fontName = { family: FAMILY, style: o.weight || WEIGHT.regular };
  t.fontSize = o.size || 9.5;
  t.characters = String(chars);
  t.fills = solid(o.color || BODY);
  t.lineHeight = { unit: "PERCENT", value: o.leading || 160 };
  t.textAutoResize = "HEIGHT";
  if (o.underline) t.textDecoration = "UNDERLINE";
  return t;
}

/**
 * 부모에 붙인 뒤 가로 크기를 지정한다.
 *   add(parent, node)        → 그대로 (hug)
 *   add(parent, node, "FILL")→ 남는 폭 채우기
 *   add(parent, node, 140)   → 140pt 고정
 */
function add(parent, node, sizing) {
  parent.appendChild(node);
  if (sizing === "FILL") {
    node.layoutSizingHorizontal = "FILL";
  } else if (typeof sizing === "number") {
    node.resize(sizing, node.height);
    node.layoutSizingHorizontal = "FIXED";
  }
  return node;
}

function rule() {
  const r = figma.createRectangle();
  r.name = "divider";
  r.resize(BODY_W, 1);
  r.fills = solid(LINE);
  return r;
}

/** 원본 이력서의 회색 형광펜 섹션 제목. */
function sectionTitle(label) {
  const box = frame("섹션/" + label, { pad: [2, 7, 3, 7], fill: MARK, radius: 2 });
  add(box, text(label, { size: 14, weight: WEIGHT.bold, color: INK, leading: 150 }));
  return box;
}

function bulletList(items, opts) {
  const o = opts || {};
  const list = frame("list", { gap: o.gap == null ? 2 : o.gap });
  items.forEach((item) => {
    const row = frame("item", { dir: "H", gap: 6 });
    add(row, text("•", { size: o.size || 9.5, color: MUTED, leading: o.leading || 160 }), 9);
    add(
      row,
      text(item, { size: o.size || 9.5, color: o.color || BODY, leading: o.leading || 160 }),
      "FILL"
    );
    add(list, row, "FILL");
  });
  return list;
}

/** 스택 칩 묶음. 오토레이아웃 줄바꿈을 쓴다. */
function chipRow(names) {
  const wrap = frame("stack", { dir: "H", gap: 4 });
  wrap.layoutWrap = "WRAP";
  wrap.counterAxisSpacing = 4;
  names.forEach((n) => {
    const chip = frame("chip", { pad: [2, 6, 2, 6], fill: SOFT, radius: 3 });
    add(chip, text(n, { size: 8, weight: WEIGHT.medium, color: MUTED, leading: 140 }));
    add(wrap, chip);
  });
  return wrap;
}

/** 성과 문단: 파란 제목 + 설명. */
function highlight(h) {
  const box = frame("성과", { gap: 2, pad: [6, 9, 7, 9], fill: SOFT, radius: 4 });
  add(box, text(h.head, { size: 9.5, weight: WEIGHT.bold, color: LINK, leading: 150 }), "FILL");
  add(box, text(h.body, { size: 9, color: BODY, leading: 165 }), "FILL");
  return box;
}

// --- 페이지 조립 ---

const pages = [];
let page = null;

function newPage() {
  page = frame("page", {
    gap: 13,
    pad: [PAD_TOP, PAD_X, PAD_BOTTOM, PAD_X],
    fill: hex("#ffffff"),
  });
  page.name = "이력서 - 이도엽 / p" + (pages.length + 1);
  page.resize(PAGE_W, PAGE_H);
  page.primaryAxisSizingMode = "FIXED";
  page.counterAxisSizingMode = "FIXED";
  page.clipsContent = true;
  page.x = pages.length * (PAGE_W + 60);
  page.y = 0;
  pages.push(page);
  figma.currentPage.appendChild(page);
  return page;
}

function contentHeight(f) {
  let h = f.paddingTop + f.paddingBottom;
  f.children.forEach((c, i) => {
    h += c.height + (i > 0 ? f.itemSpacing : 0);
  });
  return h;
}

/**
 * 블록을 현재 페이지에 붙이고, 넘치면 다음 페이지로 옮긴다.
 * 오토레이아웃은 붙이는 즉시 높이가 갱신되므로 붙여 보고 판단할 수 있다.
 * keepWithPrev: 바로 앞 블록(섹션 제목 등)이 페이지 끝에 홀로 남지 않게 같이 데려온다.
 */
function place(node, opts) {
  const o = opts || {};
  add(page, node, "FILL");
  if (contentHeight(page) <= PAGE_H || page.children.length <= 1) return node;

  const prev = pages[pages.length - 1];
  newPage();
  if (o.keepWithPrev && prev.children.length > 1) {
    const orphan = prev.children[prev.children.length - 2];
    add(page, orphan, "FILL");
  }
  add(page, node, "FILL");
  return node;
}

// --- 섹션들 ---

function buildHeader() {
  const head = frame("머리", { dir: "H", gap: 20, align: "MIN" });

  const photo = figma.createRectangle();
  photo.name = "PHOTO — 사진으로 교체하세요";
  photo.resize(78, 96);
  photo.fills = solid(hex("#e8eaee"));
  photo.cornerRadius = 2;
  add(head, photo);

  const hi = frame("인사말", { gap: 4 });
  DATA.greeting.forEach((line) =>
    add(hi, text(line, { size: 15, weight: WEIGHT.bold, color: INK, leading: 150 }))
  );
  add(head, hi, "FILL");
  place(head);

  const cols = frame("연락처", { dir: "H", gap: 12 });
  cols.layoutWrap = "WRAP";
  cols.counterAxisSpacing = 10;
  const colW = (BODY_W - 12 * 3) / 4;
  DATA.contacts.forEach((c) => {
    const col = frame("항목", { gap: 2 });
    add(col, text(c.label, { size: 9, weight: WEIGHT.bold, color: INK, leading: 150 }));
    add(
      col,
      text(c.value, {
        size: 9,
        color: c.link ? LINK : BODY,
        underline: !!c.link,
        leading: 150,
      })
    );
    add(cols, col, colW);
  });
  place(cols);
}

function buildIntro() {
  const box = frame("소개", { gap: 7 });
  add(box, text(DATA.intro.headline, { size: 13, weight: WEIGHT.bold, color: INK, leading: 150 }), "FILL");
  DATA.intro.paragraphs.forEach((p) =>
    add(box, text(p, { size: 9.5, color: BODY, leading: 170 }), "FILL")
  );
  place(box);
}

function buildSkills() {
  place(sectionTitle("스킬"));
  const box = frame("스킬 목록", { gap: 6 });
  DATA.skills.forEach((g) => {
    const row = frame("줄", { dir: "H", gap: 12, align: "MIN" });
    add(row, text(g.label, { size: 9, weight: WEIGHT.bold, color: INK }), 92);
    add(row, chipRow(g.items), "FILL");
    add(box, row, "FILL");
  });
  add(box, bulletList(DATA.skillNotes, { gap: 3 }), "FILL");
  place(box, { keepWithPrev: true });
}

function buildJob(job) {
  const box = frame("업무/" + job.project, { gap: 5 });

  const head = frame("제목", { dir: "H", gap: 10, align: "MIN" });
  const left = frame("이름", { dir: "H", gap: 5, align: "MIN" });
  add(left, text(job.project, { size: 11.5, weight: WEIGHT.bold, color: INK, leading: 150 }));
  add(left, text(job.role, { size: 8.5, color: MUTED, leading: 200 }));
  add(head, left, "FILL");
  add(head, text(job.period, { size: 8.5, color: MUTED, leading: 200 }));
  add(box, head, "FILL");

  if (job.stack && job.stack.length) add(box, chipRow(job.stack), "FILL");
  add(box, bulletList(job.bullets), "FILL");
  (job.highlights || []).forEach((h) => add(box, highlight(h), "FILL"));
  return box;
}

function buildCareer() {
  place(sectionTitle("경력"));
  DATA.career.forEach((co, i) => {
    const head = frame("회사", { dir: "H", gap: 10, align: "MIN" });
    add(head, text(co.company, { size: 13, weight: WEIGHT.bold, color: INK, leading: 150 }));
    add(head, frame("여백", {}), "FILL");
    add(head, text(co.period, { size: 9, color: MUTED, leading: 210 }));
    place(head, { keepWithPrev: i === 0 });
    place(rule());
    co.jobs.forEach((j) => place(buildJob(j)));
  });
}

function buildProject(p) {
  const box = frame("프로젝트/" + p.title, { gap: 6 });

  const title = frame("제목", { gap: 2 });
  add(title, text(p.title, { size: 13, weight: WEIGHT.bold, color: INK, leading: 150 }));
  add(title, text(p.subTitle, { size: 9, color: MUTED, leading: 160 }), "FILL");
  add(box, title, "FILL");

  // 원본 이력서와 같은 2단: 왼쪽 메타 / 오른쪽 내용
  const cols = frame("본문", { dir: "H", gap: 16, align: "MIN" });
  const meta = frame("메타", { gap: 5 });
  add(meta, text(p.period, { size: 8.5, color: MUTED, leading: 160 }));
  add(meta, text(p.team, { size: 8.5, color: MUTED, leading: 160 }));
  add(cols, meta, 140);
  add(meta, chipRow(p.stack), "FILL");

  const main = frame("내용", { gap: 6 });
  add(main, bulletList(p.content), "FILL");
  p.highlights.forEach((h) => add(main, highlight(h), "FILL"));
  add(cols, main, "FILL");

  add(box, cols, "FILL");
  return box;
}

function buildProjects() {
  place(sectionTitle("프로젝트"));
  DATA.projects.forEach((p, i) => place(buildProject(p), { keepWithPrev: i === 0 }));
}

function buildEducation() {
  place(sectionTitle("교육 · 학력"));
  DATA.education.forEach((e, i) => {
    const box = frame("교육", { gap: 3 });
    const head = frame("제목", { dir: "H", gap: 8, align: "MIN" });
    const left = frame("이름", { dir: "H", gap: 5, align: "MIN" });
    add(left, text(e.title, { size: 11, weight: WEIGHT.bold, color: INK, leading: 150 }));
    add(left, text(e.status, { size: 8.5, weight: WEIGHT.bold, color: LINK, leading: 195 }));
    add(head, left, "FILL");
    add(head, text(e.date, { size: 8.5, color: MUTED, leading: 195 }));
    add(box, head, "FILL");
    e.body.forEach((b) => add(box, text(b, { size: 9, color: BODY, leading: 170 }), "FILL"));
    place(box, { keepWithPrev: i === 0 });
  });
}

async function main() {
  await pickFont();
  newPage();

  buildHeader();
  place(rule());
  buildIntro();
  buildSkills();
  buildCareer();
  buildProjects();
  buildEducation();

  figma.currentPage.selection = pages;
  figma.viewport.scrollAndZoomIntoView(pages);
  figma.notify("이력서 " + pages.length + "장을 만들었습니다. (폰트: " + FAMILY + ")");
  figma.closePlugin();
}

main().catch((e) => {
  figma.notify("오류: " + e.message, { error: true });
  figma.closePlugin();
});
