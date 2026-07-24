import careerItems from "@/constants/careerItems";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  viewportOnce,
} from "@/utils/FramerVariants";
import SectionHeading from "./SectionHeading";

export default function Career() {
  return (
    <section
      id="career"
      className="flex scroll-mt-[9rem] justify-center bg-paper px-[1.5rem] py-[9rem] md:px-[4rem] lg:px-[8rem]"
    >
      <div className="w-full max-w-[120rem]">
        <SectionHeading title="CAREER" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex w-full flex-col gap-[6rem] md:gap-[8rem]"
        >
          {careerItems &&
            careerItems.map((careerItem) => (
              <motion.div
                variants={itemsVariants}
                key={careerItem.id}
                className="flex gap-[2rem] md:gap-[4rem] lg:gap-[5rem]"
              >
                <div className="flex shrink-0 justify-center items-center w-[8rem] h-[8rem] md:w-[12rem] md:h-[12rem] bg-ink rounded-full">
                  {careerItem.imageUrl ? (
                    <div className="relative w-[4.4rem] h-[4.4rem] md:w-[7rem] md:h-[7rem]">
                      <Image
                        src={careerItem.imageUrl}
                        alt={`${careerItem.title} 로고`}
                        fill
                      />
                    </div>
                  ) : (
                    // 로고 이미지가 없으면 약어를 텍스트로 대신 보여준다.
                    <span className="mono text-[1.4rem] md:text-[2rem] font-black tracking-[0.1em] text-paper">
                      {careerItem.logoText ?? careerItem.title.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="bg-line w-[0.1rem] shrink-0"></div>
                <div className="flex flex-col min-w-0 gap-[1.5rem] md:gap-[2.5rem] break-words overflow-hidden w-full">
                  <div className="flex flex-col gap-[0.6rem]">
                    <h1 className="text-[1.6rem] md:text-[2rem] font-extrabold">
                      {careerItem.title}
                    </h1>
                    <h3 className="text-[1.2rem] md:text-[1.6rem] text-muted mono">
                      {careerItem.created}
                    </h3>
                    <div className="flex flex-row flex-wrap gap-[1rem]">
                      {careerItem.stack.map((stackItem, index) => (
                        <div
                          key={index}
                          className="bg-ink text-paper mono text-[1.2rem] md:text-[1.6rem] px-[1rem] py-[0.6rem] rounded-[1rem] whitespace-nowrap"
                        >
                          {stackItem}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[2rem]">
                    {careerItem.content.map((contentItem) => (
                      <div
                        key={contentItem.id}
                        className="flex flex-col gap-[0.6rem]"
                      >
                        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold">
                          {contentItem.header}
                        </h1>
                        <h3 className="text-[1.2rem] md:text-[1.4rem] text-muted mono">
                          {contentItem.year}
                        </h3>
                        <span className="text-[1.2rem] md:text-[1.4rem]">
                          {contentItem.infor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
