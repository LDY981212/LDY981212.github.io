import careerItems from "@/constants/careerItems";
import { CareerProps } from "@/interfaces/CareerInterface";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemsVariants } from "@/utils/FramerVariants";

export default function Career({ careerRef }: CareerProps) {
  return (
    <div
      ref={careerRef}
      className="flex flex-col items-center py-[9rem] px-[1.5rem] bg-gray-200 pb-[21rem]"
    >
      <h1 className="font-black text-[3rem] md:text-[4rem] lg:text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        CAREER
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="flex w-full flex-col self-start md:pl-[2rem] lg:pl-[20rem]"
      >
        {careerItems &&
          careerItems.map((careerItem) => (
            <motion.div
              variants={itemsVariants}
              key={careerItem.id}
              className="flex gap-[2rem] md:gap-[4rem] lg:gap-[5rem]"
            >
              <div className="flex shrink-0 justify-center items-center w-[11rem] h-[8rem] md:w-[30rem] md:h-[20rem] lg:w-[33rem] lg:h-[22rem] bg-black rounded-full border-gray-400">
                <div className="relative w-[4rem] h-[4rem] md:w-[8rem] md:h-[8rem] lg:w-[10rem] lg:h-[10rem]">
                  <Image src={careerItem.imageUrl} alt="cna 로고" fill />
                </div>
              </div>
              <div className="bg-gray-400 w-[0.1rem]"></div>
              <div className="flex flex-col min-w-0 gap-[1.5rem] md:gap-[2.5rem] break-words overflow-hidden w-full">
                <div className="flex flex-col gap-[0.6rem]">
                  <h1 className="text-[1.6rem] md:text-[2rem] font-extrabold">
                    {careerItem.title}
                  </h1>
                  <h3 className="text-[1.2rem] md:text-[1.6rem] text-gray-500">
                    {careerItem.created}
                  </h3>
                  <div className="flex flex-row flex-wrap gap-[1rem]">
                    {careerItem.stack.map((stackItem, index) => (
                      <div
                        key={index}
                        className="bg-black text-white text-[1.2rem] md:text-[1.6rem] px-[1rem] py-[0.6rem] rounded-[1rem] whitespace-nowrap"
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
                      <h3 className="text-[1.2rem] md:text-[1.4rem] text-gray-500">
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
  );
}
