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
    value: "ldoyeop@gmail.com",
    href: "mailto:ldoyeop@gmail.com",
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
    // 여기는 사실 나열이라 조이고, 정작 봐야 할 PROJECTS에 여백을 몰아준다.
    <section
      id="about"
      className="flex scroll-mt-[9rem] justify-center bg-paper px-[1.5rem] py-[7rem] md:px-[4rem] lg:px-[8rem]"
    >
      <div className="w-full max-w-[120rem]">
        <SectionHeading title="PROFILES" />

        <motion.dl
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 border-t border-line md:grid-cols-2 md:gap-x-[4rem]"
        >
          {fields.map((field) => (
            <motion.div
              key={field.label}
              variants={itemsVariants}
              className="flex min-w-0 items-center gap-[1.4rem] border-b border-line py-[1.4rem]"
            >
              <span className="shrink-0 text-[1.8rem] text-accent">
                <Icon name={field.icon} />
              </span>
              <dt className="mono w-[7rem] shrink-0 text-[1.1rem] uppercase tracking-[0.12em] text-muted">
                {field.label}
              </dt>
              <dd
                className={`min-w-0 flex-1 break-all text-[1.4rem] font-medium text-ink md:text-[1.5rem] ${
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
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
