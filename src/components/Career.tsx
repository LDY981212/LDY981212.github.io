import careerItems from "@/constants/careerItems";
import { CareerProps } from "@/interfaces/CareerInterface";
import Image from "next/image";

export default function Career({ careerRef }: CareerProps) {
  return (
    <div
      ref={careerRef}
      className="flex flex-col items-center py-[9rem] bg-gray-100"
    >
      <h1 className="font-black text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        Career
      </h1>
      <div>
        <div className="relative w-[10rem] h-[12rem] rounded-full">
          <Image src="/images/cna.png" alt="cna 로고" fill />
        </div>
        <div>
          {careerItems &&
            careerItems.map((careerItem) => (
              <div key={careerItem.id}>
                <h1>{careerItem.title}</h1>
                <h3>{careerItem.created}</h3>
                <div>{careerItem.stack}</div>
                {careerItem.content.map((contentItem) => (
                  <div key={contentItem.id}>
                    <h1>{contentItem.header}</h1>
                    <h3>{contentItem.year}</h3>
                    <span>{contentItem.infor}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
