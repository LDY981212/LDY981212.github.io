"use client";

import React from "react";
import { ConditionalLinkProps } from "@/interfaces/ConditinalLinkInterface";

export default function ConditionalLink({
  href,
  children,
}: ConditionalLinkProps) {
  const isKorean = /[가-힣]/.test(children);

  if (isKorean) {
    return (
      <span className="text-[1.5rem] text-gray-500 border-l-[0.4rem] pl-[1rem] border-blue-800">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[1.5rem] text-blue-700 border-l-[0.4rem] pl-[1rem] border-blue-800"
    >
      {children}
    </a>
  );
}
