"use client";

import projectItems from "@/constants/projectItems";
import projectColors from "@/constants/projectColors";
import { ProjectModalProps } from "@/interfaces/ProjectInterface";
import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ease } from "@/utils/FramerVariants";
import Icon, { type IconName } from "./Icon";

export default function ProjectModal({
  project,
  setIsOpen,
}: ProjectModalProps) {
  const projectItem = projectItems.find((item) => project === item.router);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      // 모달이 떠 있는 동안 포커스가 뒤쪽 페이지로 새어나가지 않게 가둔다.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), iframe"
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  if (!projectItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setIsOpen(false)}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-[1.2rem] backdrop-blur-sm md:p-[3rem]"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={projectItem.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease }}
        className="relative flex max-h-[92vh] w-full max-w-[96rem] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-surface shadow-[var(--shadow)]"
      >
        {/* 헤더는 스크롤과 함께 사라지지 않는다. 내용이 길어도 어느 프로젝트를
            보고 있는지, 닫는 방법이 무엇인지 계속 보여야 한다. */}
        <header
          className={`flex shrink-0 items-start justify-between gap-[1.2rem] px-[2rem] py-[1.8rem] md:px-[3rem] ${
            projectColors[projectItem.id]
          }`}
        >
          <div className="flex min-w-0 flex-col gap-[0.4rem]">
            <span className="mono text-[1.1rem] uppercase tracking-[0.18em] text-white/70">
              {projectItem.created}
            </span>
            <h2 className="display text-[2rem] font-black text-white md:text-[2.8rem]">
              {projectItem.title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-[0.8rem]">
            {projectItem.github && (
              <a
                href={projectItem.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 저장소 열기"
                title="GitHub 저장소 열기"
                className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white/15 text-[2rem] text-white transition-colors hover:bg-white/30"
              >
                <Icon name="github" />
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
              title="닫기"
              className="flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center rounded-full bg-white/15 text-[2rem] text-white transition-colors hover:bg-white/30"
            >
              <Icon name="close" />
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-[3.6rem] overflow-y-auto px-[2rem] py-[3rem] md:px-[3rem] md:py-[3.6rem]">
          {projectItem.intro && (
            <p className="max-w-[70ch] text-[1.6rem] leading-[1.7] text-muted">
              {projectItem.intro}
            </p>
          )}

          <Block icon="wrench" title="STACK" caption="쓴 이유">
            <dl className="flex flex-col gap-[1.2rem]">
              {projectItem.stack.map((stack) => (
                <div
                  key={stack.name}
                  className="flex flex-col gap-[0.6rem] border-l-[0.3rem] border-accent pl-[1.4rem] md:flex-row md:gap-[2rem]"
                >
                  <dt className="mono shrink-0 text-[1.4rem] font-bold text-accent md:w-[14rem]">
                    {stack.name}
                  </dt>
                  <dd className="text-[1.5rem] leading-[1.7] text-muted">
                    {stack.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block icon="chart" title="CONTRIBUTION" caption="맡은 일">
            <div className="flex flex-col gap-[1.6rem]">
              {projectItem.contribution.map((contribution) => (
                <div key={contribution.head} className="flex flex-col gap-[0.8rem]">
                  <h4 className="text-[1.6rem] font-bold text-ink">
                    {contribution.head}
                  </h4>
                  <ul className="flex list-disc flex-col gap-[0.4rem] pl-[2rem] text-[1.5rem] leading-[1.7] text-muted">
                    {contribution.detail
                      .filter((detail) => detail.trim() !== "")
                      .map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block icon="bug" title="TROUBLE SHOOTING" caption="상황 → 결과">
            <div className="flex flex-col gap-[1.6rem]">
              {projectItem.solution.map((solution) => (
                <article
                  key={solution.head}
                  className="flex flex-col gap-[1.4rem] rounded-[1.2rem] border border-line bg-surface-2 p-[1.8rem] md:p-[2.2rem]"
                >
                  <h4 className="text-[1.7rem] font-bold text-ink">
                    {solution.head}
                  </h4>
                  {/* 상황→과제→행동→결과는 순서가 곧 논리라, 번호 대신 세로 흐름으로 읽히게 둔다. */}
                  <dl className="flex flex-col gap-[1rem]">
                    <Star label="상황" tone="text-rose-500">
                      {solution.situation}
                    </Star>
                    <Star label="과제" tone="text-amber">
                      {solution.task}
                    </Star>
                    <Star label="행동" tone="text-accent">
                      {solution.action}
                    </Star>
                    <Star label="결과" tone="text-emerald-500">
                      {solution.result}
                    </Star>
                  </dl>
                </article>
              ))}
            </div>
          </Block>

          {projectItem.videos && (
            <Block icon="play" title="DEMO VIDEO" caption="시연">
              <div className="overflow-hidden rounded-[1.2rem] border border-line">
                <iframe
                  className="aspect-video w-full"
                  src={projectItem.videos}
                  title={`${projectItem.title} 데모 영상`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Block>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({
  icon,
  title,
  caption,
  children,
}: {
  icon: IconName;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-[1.6rem]">
      <header className="flex items-center gap-[1rem] border-b border-line pb-[1.2rem]">
        <span className="flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-[0.8rem] bg-accent-soft text-[1.8rem] text-accent">
          <Icon name={icon} />
        </span>
        <h3 className="display text-[1.8rem] font-black text-ink md:text-[2.2rem]">
          {title}
        </h3>
        <span className="mono text-[1.1rem] uppercase tracking-[0.16em] text-muted">
          {caption}
        </span>
      </header>
      {children}
    </section>
  );
}

function Star({
  label,
  tone,
  children,
}: {
  label: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[0.3rem] md:flex-row md:gap-[1.4rem]">
      <dt
        className={`mono shrink-0 text-[1.2rem] font-bold uppercase tracking-[0.12em] md:w-[5rem] md:pt-[0.3rem] ${tone}`}
      >
        {label}
      </dt>
      <dd className="text-[1.5rem] leading-[1.7] text-muted">{children}</dd>
    </div>
  );
}
