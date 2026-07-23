/**
 * 히어로 배경.
 *
 * 원래는 포인터를 따라오는 그라디언트 빛무리 두 개가 격자 위에 떠 있었다.
 * 그 조합은 지금 "모던 히어로 배경"의 기본값이라 어느 사이트에나 붙어 있고,
 * 회전하는 강조어와 형광펜까지 겹치면 움직이는 것이 너무 많아진다.
 * 배경은 조용히 두고 모션 예산은 문장 하나에 몰아준다.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 0.1rem, transparent 0.1rem), linear-gradient(90deg, var(--grid-line) 0.1rem, transparent 0.1rem)",
          backgroundSize: "5.6rem 5.6rem",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)",
        }}
      />
    </div>
  );
}
