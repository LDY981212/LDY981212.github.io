"use client";

import React from "react";
import { ConditionalLinkProps } from "@/interfaces/ConditinalLinkInterface";

export default function ConditionalLink({
  href,
  children,
}: ConditionalLinkProps) {
  const isKorean = /[가-힣]/.test(children);

  // 한글이면 링크가 아니라 "종료된 서비스입니다" 같은 안내 문구다.
  if (isKorean) {
    return (
      <p className="border-l-[0.3rem] border-line py-[0.4rem] pl-[1.2rem] text-[1.4rem] text-muted">
        {children}
      </p>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // 카드 전체가 모달을 여는 클릭 대상이라, 링크 클릭까지 모달로 새지 않게 막는다.
      onClick={(e) => e.stopPropagation()}
      className="mono block w-full overflow-hidden border-l-[0.3rem] border-accent py-[0.4rem] pl-[1.2rem] text-[1.4rem] break-words text-accent transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}
