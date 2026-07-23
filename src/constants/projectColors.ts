import projectItems from "./projectItems";

// 프로젝트 카드 뱃지와 모달 헤더가 항상 같은 색을 쓰도록 id 기준으로 고정한다.
// (이전에는 두 컴포넌트가 각각 Math.random()으로 섞어서 서로 다른 색이 나왔다.)
const bgColors = [
  "bg-blue-800",
  "bg-green-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-yellow-700",
];

const projectColors: Record<string, string> = Object.fromEntries(
  projectItems.map((item, index) => [item.id, bgColors[index % bgColors.length]])
);

export default projectColors;
