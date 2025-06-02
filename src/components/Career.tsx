import careerItems from "@/constants/careerItems";
import { CareerProps } from "@/interfaces/CareerInterface";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemsVariants } from "@/utils/FramerVariants";

export default function Career({ careerRef }: CareerProps) {
  return (
    <div
      ref={careerRef}
      className="flex flex-col items-center py-[9rem] bg-gray-200 pb-[21rem]"
    >
      <h1 className="font-black lg:text-[5rem] md:text-[4rem] sm:text-[3rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        CAREER
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="flex flex-col self-start lg:pl-[20rem] md:pl-[2rem] sm:pl-[1rem]"
      >
        {careerItems &&
          careerItems.map((careerItem) => (
            <motion.div
              variants={itemsVariants}
              key={careerItem.id}
              className="flex lg:gap-[5rem] md:gap-[4rem] sm:gap-[2rem]"
            >
              <div className="flex justify-center items-center lg:w-[22rem] lg:h-[22rem] md:w-[20rem] md:h-[20rem] sm:w-[18rem] sm:h-[18rem] bg-black rounded-full border-gray-400">
                <div className="relative lg:w-[10rem] lg:h-[10rem] md:w-[8rem] md:h-[8rem] sm:w-[6rem] sm:h-[6rem] ">
                  <Image src={careerItem.imageUrl} alt="cna 로고" fill />
                </div>
              </div>
              <div className="bg-gray-400 w-[0.1rem]"></div>
              <div className="flex flex-col lg:gap-[2.5rem] md:gap-[2.5rem] sm:gap-[1.5rem] break-words overflow-hidden w-full">
                <div className="flex flex-col gap-[0.6rem]">
                  <h1 className="lg:text-[2rem] md:text-[2rem] sm:text-[1.6rem] font-extrabold">
                    {careerItem.title}
                  </h1>
                  <h3 className="lg:text-[1.6rem] md:text-[1.6rem] sm:text-[1.2rem] text-gray-500">
                    {careerItem.created}
                  </h3>
                  <div className="flex flex-row gap-[1rem]">
                    {careerItem.stack.map((stackItem, index) => (
                      <div
                        key={index}
                        className="bg-black text-white lg:text-[1.6rem] md:text-[1.6rem] sm:text-[1.2rem] px-[1rem] py-[0.6rem] rounded-[1rem]"
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
                      <h1 className="lg:text-[1.4rem] md:text-[1.4rem] sm:text-[1.2rem] font-bold">
                        {contentItem.header}
                      </h1>
                      <h3 className="lg:text-[1.4rem] md:text-[1.4rem] sm:text-[1.2rem] text-gray-500">
                        {contentItem.year}
                      </h3>
                      <span className="lg:text-[1.4rem] md:text-[1.4rem] sm:text-[1.2rem]">
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
