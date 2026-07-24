"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/utils/FramerVariants";

const EMAIL = "ldoyeop12@gmail.com";
const GITHUB = "https://github.com/LDY981212";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드가 막힌 브라우저에서는 옆의 메일 링크로 열면 된다.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="border-t border-line bg-surface-2 px-[1.5rem] py-[8rem] md:px-[4rem] lg:px-[8rem]">
      <div className="mx-auto flex max-w-[120rem] flex-col gap-[5rem]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-[2rem]"
        >
          <span className="mono text-[1.1rem] uppercase tracking-[0.22em] text-muted md:text-[1.2rem]">
            Contact
          </span>
          <h2 className="display max-w-[24ch] text-[2.4rem] font-light leading-[1.35] text-ink md:text-[3.6rem] lg:text-[4.4rem]">
            <span className="font-black">새로운 기회</span>를
            <br />
            찾고 있습니다.
          </h2>
          <p className="max-w-[36ch] text-[1.5rem] leading-[1.7] text-muted">
            제안이나 궁금한 점이 있다면 편하게 연락 주세요.
          </p>

          <div className="mt-[1rem] flex flex-wrap items-center gap-[1.2rem]">
            <button
              type="button"
              onClick={copyEmail}
              className="mono flex h-[5rem] cursor-pointer items-center gap-[1rem] rounded-full bg-accent px-[2.4rem] text-[1.4rem] font-bold text-accent-ink transition-transform hover:scale-[1.03]"
            >
              {copied ? "복사했습니다" : EMAIL}
              <span aria-hidden>{copied ? "✓" : "⧉"}</span>
            </button>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="mono flex h-[5rem] items-center rounded-full border border-line px-[2.4rem] text-[1.4rem] font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? "이메일 주소를 클립보드에 복사했습니다." : ""}
          </p>
        </motion.div>

        <div className="flex flex-col gap-[1.6rem] border-t border-line pt-[3rem] md:flex-row md:items-center md:justify-between">
          <p className="mono text-[1.2rem] text-muted">
            © 2026 이도엽 · Built with Next.js &amp; Tailwind CSS
          </p>
          <a
            href="#top"
            className="mono text-[1.2rem] text-muted transition-colors hover:text-accent"
          >
            맨 위로 ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
