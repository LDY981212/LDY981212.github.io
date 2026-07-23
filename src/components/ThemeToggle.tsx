"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // layout.tsx의 인라인 스크립트가 이미 data-theme을 찍었지만, 서버 렌더 시점에는
  // 알 수 없다. 마운트 후에 실제 값을 읽어 서버/클라이언트 마크업을 일치시킨다.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // 사파리 프라이빗 모드 등에서 막히면 이번 세션만 적용된다.
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className={`relative flex h-[3.2rem] w-[5.6rem] shrink-0 items-center rounded-full border border-line bg-surface-2 px-[0.4rem] transition-colors hover:border-accent cursor-pointer ${className}`}
    >
      <span
        aria-hidden
        className="flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-accent text-[1.2rem] leading-none text-accent-ink transition-transform duration-300 will-change-transform"
        style={{ transform: `translateX(${isDark ? "2.4rem" : "0"})` }}
      >
        {theme === null ? "" : isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
