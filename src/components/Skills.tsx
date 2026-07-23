import Image from "next/image";
import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/utils/FramerVariants";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex scroll-mt-[9rem] flex-col items-center overflow-x-hidden py-[9rem] px-[1.5rem] md:px-[2rem] lg:px-[4rem] bg-surface-2"
    >
      <SectionHeading title="SKILLS" eyebrow="TypeScript · Next.js 중심" />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col w-full max-w-[120rem] bg-surface border border-line rounded-[2rem] py-[2rem] px-[1.5rem] md:px-[3rem] gap-[3rem] shadow-[var(--shadow)]"
      >
        <div className="flex flex-col md:flex-row items-center gap-[2rem] md:gap-[3rem]">
          <div className="flex gap-[1.2rem] items-center w-full md:w-[18rem] md:shrink-0">
            <Image
              src="/images/language.png"
              alt="언어 이미지"
              width={60}
              height={60}
              className="shrink-0"
            />
            <span className="font-bold text-[2rem] text-ink">Language</span>
          </div>
          <div className="flex flex-wrap gap-[1.5rem] w-full min-w-0">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-blue-900 text-[1.6rem] text-white ">
              TypeScript
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-yellow-300 text-[1.6rem] text-black ">
              JavaScript
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-[2rem] md:gap-[3rem]">
          <div className="flex gap-[1.2rem] items-center w-full md:w-[18rem] md:shrink-0">
            <Image
              src="/images/frontend.png"
              alt="프론트엔드 언어 이미지"
              width={60}
              height={60}
              className="shrink-0"
            />
            <span className="font-bold text-[2rem] text-ink">Frontend</span>
          </div>
          <div className="flex flex-wrap gap-[1.5rem] w-full min-w-0">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-black text-[1.6rem] text-white ">
              Next.js (React)
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-gray-600 text-[1.6rem] text-white ">
              Zustand
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-red-400 text-[1.6rem] text-white ">
              React-Query
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-sky-300 text-[1.6rem] text-white ">
              Tailwind CSS
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-purple-500 text-[1.6rem] text-white ">
              Redux Toolkit
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-pink-500 text-[1.6rem] text-white ">
              Storybook
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-[2rem] md:gap-[3rem]">
          <div className="flex gap-[1.2rem] items-center w-full md:w-[18rem] md:shrink-0">
            <Image
              src="/images/dev.png"
              alt="데브옵스 언어 이미지"
              width={60}
              height={60}
              className="shrink-0"
            />
            <span className="font-bold text-[2rem] text-ink">DevOps</span>
          </div>
          <div className="flex flex-wrap gap-[1.5rem] w-full min-w-0">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-orange-400 text-[1.6rem] text-white ">
              AWS
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] whitespace-nowrap bg-black text-[1.6rem] text-white ">
              Vercel
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
