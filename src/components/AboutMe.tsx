import { AboutMeProps } from "@/interfaces/AboutMeInterface";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemsVariants } from "@/utils/FramerVariants";

export default function AboutMe({ aboutRef }: AboutMeProps) {
  return (
    <div ref={aboutRef} className="flex flex-col items-center py-[9rem]">
      <h1 className="font-black lg:text-[5rem] md:text-[4rem] sm:text-[3rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-300">
        PROFILES
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="grid lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-4 md:grid-rows-2 sm:grid-cols-2 sm:grid-rows-4 gap-y-[3rem] lg:px-[8rem] md:px-[1rem] sm:px-[0.6rem]"
      >
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.6rem]"
        >
          <Image
            src="/images/avatar.svg"
            alt="아바타 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              이름
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              이도엽
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/birthday.svg"
            alt="생일 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              생년월일
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              1998.12.12
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/location.svg"
            alt="위치 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              위치
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              경기도 부천시
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/call.svg"
            alt="전화 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              연락처
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              010-4465-8427
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/email.svg"
            alt="이메일 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              이메일
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              wjflrkwlak@gmail.com
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/school.svg"
            alt="학교 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              학력
            </span>
            <span className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-gray-700">
              한양대학교 생체공학과
            </span>
          </div>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          className="flex items-center lg:gap-[2rem] md:gap-[1rem] sm:gap-[0.8rem]"
        >
          <Image
            src="/images/github.svg"
            alt="깃헙 이미지"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-[0.6rem] text-left text-nowrap">
            <span className="block font-bold lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-600">
              github
            </span>
            <a
              className="block font-medium lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1rem] text-blue-300"
              href="https://github.com/LDY981212"
            >
              https://github.com/LDY981212
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
