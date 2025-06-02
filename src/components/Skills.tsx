import { SkillsProps } from "@/interfaces/SkillsInterface";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Skills({ skillRef }: SkillsProps) {
  return (
    <div
      ref={skillRef}
      className="flex flex-col items-center py-[9rem] md:px-[2rem] sm:px-[1rem] bg-blue-300"
    >
      <h1 className="font-black lg:text-[5rem] md:text-[4rem] sm:text-[3rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-300">
        SKILLS
      </h1>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.3, duration: 0.5 },
        }}
        className="flex flex-col w-full bg-blue-100 rounded-[2rem] py-[2rem] px-[3rem] gap-[3rem] shadow-2xl"
      >
        <div className="flex items-center lg:gap-[5rem] md:gap-[4rem] sm:gap-[2rem]">
          <div className="flex gap-[1.2rem] items-center">
            <Image
              src="/images/language.png"
              alt="언어 이미지"
              width={60}
              height={60}
            />
            <span className="font-bold text-[2rem]">Language</span>
          </div>
          <div className="flex gap-[1.5rem] text-nowrap md:flex-wrap sm:flex-wrap">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-blue-900 text-[1.6rem] text-white ">
              TypeScript
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-yellow-300 text-[1.6rem] text-black ">
              JavaScript
            </div>
          </div>
        </div>
        <div className="flex items-center lg:gap-[6rem] md:gap-[5rem] sm:gap-[8rem]">
          <div className="flex gap-[1.2rem] items-center">
            <Image
              src="/images/frontend.png"
              alt="프론트엔드 언어 이미지"
              width={60}
              height={60}
            />
            <span className="font-bold text-[2rem]">Frontend</span>
          </div>
          <div className="flex gap-[1.5rem] text-nowrap md:flex-wrap sm:flex-wrap">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-black text-[1.6rem] text-white ">
              Next.js (React)
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-gray-600 text-[1.6rem] text-white ">
              Zustand
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-red-400 text-[1.6rem] text-white ">
              React-Query
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-sky-300 text-[1.6rem] text-white ">
              Tailwind CSS
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-purple-500 text-[1.6rem] text-white ">
              Redux Toolkit
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-pink-500 text-[1.6rem] text-white ">
              Storybook
            </div>
          </div>
        </div>
        <div className="flex items-center lg:gap-[7rem] md:gap-[6rem] sm:gap-[2rem]">
          <div className="flex gap-[1.2rem] items-center">
            <Image
              src="/images/dev.png"
              alt="데브옵스 언어 이미지"
              width={60}
              height={60}
            />
            <span className="font-bold text-[2rem]">DevOps</span>
          </div>
          <div className="flex gap-[1.5rem]">
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-orange-400 text-[1.6rem] text-white ">
              AWS
            </div>
            <div className="p-[1rem] font-bold text-center rounded-[1.2rem] bg-black text-[1.6rem] text-white ">
              Vercel
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
