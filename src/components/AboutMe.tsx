import Image from "next/image";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import SectionHeading from "./SectionHeading";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="flex scroll-mt-[9rem] flex-col items-center bg-paper py-[9rem]"
    >
      <SectionHeading title="PROFILES" eyebrow="이도엽 · 한양대 생체공학" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-x-[1rem] gap-y-[3rem] px-[1.5rem] md:grid-cols-4 md:px-[1rem] lg:grid-cols-4 lg:px-[8rem]"
      >
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/avatar.svg"
            alt="아바타 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              이름
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              이도엽
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/birthday.svg"
            alt="생일 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              생년월일
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              1998.12.12
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/location.svg"
            alt="위치 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              위치
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              경기도 부천시
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/call.svg"
            alt="전화 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              연락처
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              010-4465-8427
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/email.svg"
            alt="이메일 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              이메일
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              wjflrkwlak@gmail.com
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/school.svg"
            alt="학교 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              학력
            </span>
            <span className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-ink">
              한양대학교 생체공학과
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center gap-[0.8rem] md:gap-[1rem] lg:gap-[2rem]"
        >
          <Image
            src="/images/github.svg"
            alt="깃헙 이미지"
            width={80}
            height={80}
            className="w-[4rem] h-[4rem] shrink-0 md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem]"
          />
          <div className="flex flex-col gap-[0.6rem] text-left min-w-0 break-words">
            <span className="block font-bold text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] text-muted">
              github
            </span>
            <a
              className="block font-medium text-[1.1rem] md:text-[1.2rem] lg:text-[1.6rem] text-accent break-all mono"
              href="https://github.com/LDY981212"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/LDY981212
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
