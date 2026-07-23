// 히어로 첫 강조 자리에서 돌아가는 단어들.
// "끊임없이 성장하는"이라고 쓰는 대신 문장이 실제로 계속 바뀌게 한다.
const heroWords = [
  "사용자 경험",
  "성능",
  "접근성",
  "AI 활용",
  "유지보수",
];

/** 받침 유무로 목적격 조사를 고른다. 단어를 늘려도 조사를 따로 적을 필요가 없다. */
export function objectParticle(word: string): "을" | "를" {
  const trimmed = word.trim();
  const code = trimmed.charCodeAt(trimmed.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return "을";
  return (code - 0xac00) % 28 === 0 ? "를" : "을";
}

export default heroWords;
