"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import SectionHeading from "./SectionHeading";
import Icon, { type IconName } from "./Icon";

interface ProfileField {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  /** 이메일·전화·URL처럼 글자를 하나씩 읽는 값은 모노로 둔다. */
  mono?: boolean;
}

const fields: ProfileField[] = [
  { icon: "user", label: "이름", value: "이도엽" },
  { icon: "cake", label: "생년월일", value: "1998.12.12", mono: true },
  { icon: "pin", label: "위치", value: "경기도 부천시" },
  {
    icon: "phone",
    label: "연락처",
    value: "010-4465-8427",
    href: "tel:01044658427",
    mono: true,
  },
  {
    icon: "mail",
    label: "이메일",
    value: "wjflrkwlak@gmail.com",
    href: "mailto:wjflrkwlak@gmail.com",
    mono: true,
  },
  { icon: "school", label: "학력", value: "한양대학교 생체공학과" },
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/LDY981212",
    href: "https://github.com/LDY981212",
    mono: true,
  },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="flex scroll-mt-[9rem] flex-col items-center bg-paper px-[1.5rem] py-[9rem] md:px-[2rem]"
    >
      <SectionHeading title="PROFILES" eyebrow="이도엽 · 한양대 생체공학" />

      <motion.dl
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid w-full max-w-[120rem] grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-3"
      >
        {fields.map((field) => (
          <motion.div
            key={field.label}
            variants={itemsVariants}
            className="flex min-w-0 items-center gap-[1.4rem] rounded-[1.2rem] border border-line bg-surface px-[1.6rem] py-[1.4rem] transition-colors hover:border-accent"
          >
            <span className="flex h-[4rem] w-[4rem] shrink-0 items-center justify-center rounded-[1rem] bg-accent-soft text-[2rem] text-accent">
              <Icon name={field.icon} />
            </span>
            <div className="flex min-w-0 flex-col gap-[0.2rem]">
              <dt className="mono text-[1.1rem] uppercase tracking-[0.14em] text-muted">
                {field.label}
              </dt>
              <dd
                className={`min-w-0 break-all text-[1.4rem] font-semibold text-ink ${
                  field.mono ? "mono" : ""
                }`}
              >
                {field.href ? (
                  <a
                    href={field.href}
                    target={field.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      field.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="transition-colors hover:text-accent"
                  >
                    {field.value}
                  </a>
                ) : (
                  field.value
                )}
              </dd>
            </div>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
