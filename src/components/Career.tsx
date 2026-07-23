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
      className="flex scroll-mt-[9rem] flex-col items-center bg-paper px-[1.5rem] py-[9rem]"
    >
      <SectionHeading
        title="CAREER"
        eyebrow="한양대 뇌영상분석 연구실 CNA"
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex w-full max-w-[120rem] flex-col"
      >
        {careerItems &&
          careerItems.map((careerItem) => (
            <motion.div
              variants={itemsVariants}
              key={careerItem.id}
              className="flex gap-[2rem] md:gap-[4rem] lg:gap-[5rem]"
            >
              <div className="flex shrink-0 justify-center items-center w-[9rem] h-[9rem] md:w-[16rem] md:h-[16rem] lg:w-[20rem] lg:h-[20rem] bg-ink rounded-full">
                <div className="relative w-[4rem] h-[4rem] md:w-[8rem] md:h-[8rem] lg:w-[10rem] lg:h-[10rem]">
                  <Image src={careerItem.imageUrl} alt="cna 로고" fill />
                </div>
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
    </section>
  );
}
