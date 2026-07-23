"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import sections, { SectionId } from "@/constants/sections";
import { ease } from "@/utils/FramerVariants";

interface MobileMenuProps {
  open: boolean;
  active: SectionId | null;
  onClose: () => void;
}

export default function MobileMenu({ open, active, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      // 메뉴가 열려 있는 동안 포커스가 뒤쪽 페이지로 새어나가지 않게 가둔다.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
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
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-md md:hidden"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="사이트 메뉴"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease }}
            className="flex h-full flex-col px-[2rem] pt-[2rem] pb-[4rem]"
          >
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="메뉴 닫기"
                className="flex h-[4.4rem] w-[4.4rem] cursor-pointer items-center justify-center rounded-full border border-line text-[1.8rem] text-ink"
              >
                ✕
              </button>
            </div>

            <nav className="mt-[4rem] flex flex-col">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index + 0.1, duration: 0.4, ease }}
                  className="flex min-h-[6.4rem] flex-col justify-center gap-[0.2rem] border-b border-line"
                >
                  <span
                    className={`display text-[2.8rem] font-black ${
                      active === section.id ? "text-accent" : "text-ink"
                    }`}
                  >
                    {section.nav}
                  </span>
                  {section.eyebrow && (
                    <span className="mono text-[1.1rem] text-muted">
                      {section.eyebrow}
                    </span>
                  )}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-[0.6rem]">
              <a
                href="mailto:wjflrkwlak@gmail.com"
                className="mono text-[1.4rem] text-accent"
              >
                wjflrkwlak@gmail.com
              </a>
              <a
                href="https://github.com/LDY981212"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[1.4rem] text-muted"
              >
                github.com/LDY981212
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
