"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import sections from "@/constants/sections";
import useActiveSection from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Nav({ isScrolled }: { isScrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const active = useActiveSection();

  const { scrollYProgress } = useScroll();
  // 원본 진행값을 그대로 쓰면 휠 한 칸마다 바가 뚝뚝 끊긴다.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div
        className={`w-full transition-colors duration-300 ${
          isScrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-lg"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-[1rem] px-[1.5rem] py-[1.2rem] md:px-[4rem] lg:px-[8rem]">
          <a
            href="#top"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className="flex shrink-0 items-center gap-[0.8rem] md:gap-[1rem]"
          >
            <span className="relative block h-[3.2rem] w-[3.2rem] shrink-0 md:h-[4rem] md:w-[4rem]">
              <Image
                src={
                  logoHovered
                    ? "/images/home_logo.svg"
                    : "/images/home_logo_light.svg"
                }
                alt="홈으로"
                fill
              />
            </span>
            <span
              className={`display whitespace-nowrap text-[1.4rem] font-black transition-colors md:text-[1.8rem] lg:text-[2rem] ${
                logoHovered ? "text-accent" : "text-ink"
              }`}
            >
              LDY&apos;s Portfolio
            </span>
          </a>

          <nav className="hidden items-center gap-[2.4rem] md:flex lg:gap-[3.2rem]">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={`relative py-[0.4rem] text-[1.4rem] font-bold transition-colors lg:text-[1.6rem] ${
                  active === section.id
                    ? "text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                {section.nav}
                {active === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[0.2rem] left-0 h-[0.2rem] w-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-[0.8rem]">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              className="flex h-[4.4rem] w-[4.4rem] cursor-pointer flex-col items-center justify-center gap-[0.5rem] md:hidden"
            >
              <span aria-hidden className="h-[0.2rem] w-[2rem] bg-ink" />
              <span aria-hidden className="h-[0.2rem] w-[2rem] bg-ink" />
              <span aria-hidden className="h-[0.2rem] w-[1.2rem] self-start ml-[1.2rem] bg-accent" />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-[0.2rem] w-full origin-left bg-accent"
        />
      </div>

      <MobileMenu
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
