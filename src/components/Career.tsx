import careerItems from "@/constants/careerItems";
import { CareerProps } from "@/interfaces/CareerInterface";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemsVariants } from "@/utils/FramerVariants";

export default function Career({ careerRef }: CareerProps) {
  return (
    <div
      ref={careerRef}
      className="flex flex-col items-center py-[9rem] bg-gray-200 pb-[16rem]"
    >
      <h1 className="font-black text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        Career
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="flex flex-col self-start pl-[20rem]"
      >
        {careerItems &&
          careerItems.map((careerItem) => (
            <motion.div
              variants={itemsVariants}
              key={careerItem.id}
              className="flex gap-[5rem]"
            >
              <div className="flex justify-center items-center w-[22rem] h-[22rem] bg-black rounded-full border-gray-400">
                <Image
                  src={careerItem.imageUrl}
                  alt="cna 로고"
                  width={100}
                  height={100}
                />
              </div>
              <div className="bg-gray-400 w-[0.1rem]"></div>
              <div className="flex flex-col gap-[2.5rem]">
                <div className="flex flex-col gap-[0.6rem]">
                  <h1 className="text-[2rem] font-extrabold">
                    {careerItem.title}
                  </h1>
                  <h3 className="text-[1.6rem] text-gray-500">
                    {careerItem.created}
                  </h3>
                  <div className="flex flex-row gap-[1rem]">
                    {careerItem.stack.map((stackItem, index) => (
                      <div
                        key={index}
                        className="bg-black text-white text-[1.6rem] px-[1rem] py-[0.6rem] rounded-[1rem]"
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
                      <h1 className="text-[1.4rem] font-bold">
                        {contentItem.header}
                      </h1>
                      <h3 className="text-[1.4rem] text-gray-500">
                        {contentItem.year}
                      </h3>
                      <span className="text-[1.4rem]">{contentItem.infor}</span>
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
