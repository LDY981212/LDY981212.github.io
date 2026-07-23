"use client";

import { useEffect, useState } from "react";
import sections, { SectionId } from "@/constants/sections";

/**
 * 지금 화면에서 읽고 있는 섹션을 돌려준다.
 *
 * rootMargin 위쪽을 고정 헤더 높이만큼 밀어서, 헤더에 가려진 부분은
 * "보이는 것"으로 세지 않는다. 아래쪽을 크게 깎아 화면 상단에 걸친 섹션
 * 하나만 활성으로 남긴다.
 */
export default function useActiveSection(headerHeight = 80) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: `-${headerHeight}px 0px -55% 0px`, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headerHeight]);

  return active;
}
