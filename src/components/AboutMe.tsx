import { AboutMeProps } from "@/interfaces/AboutMeInterface";
import Image from "next/image";

export default function AboutMe({ aboutRef }: AboutMeProps) {
  return (
    <div ref={aboutRef} className="flex flex-col items-center py-[9rem]">
      <h1 className="font-black text-[7rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-300">
        ABOUT ME
      </h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-x-[20rem] gap-y-[5rem]">
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/avatar.svg"
            alt="아바타 이미지"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              이름
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              이도엽
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/birthday.svg"
            alt="생일 이미지"
            width={120}
            height={120}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              생년월일
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              98.12.12
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/location.svg"
            alt="위치 이미지"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              위치
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              경기도 부천시
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/call.svg"
            alt="전화 이미지"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              연락처
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              010-4465-8427
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/email.svg"
            alt="이메일 이미지"
            width={120}
            height={120}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              이메일
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              wjflrkwlak@gmail.com
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2rem]">
          <Image
            src="/images/school.svg"
            alt="학교 이미지"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-[1rem] text-left">
            <span className="block font-bold text-[2rem] text-gray-600">
              학력
            </span>
            <span className="block font-medium text-[1.8rem] text-gray-700">
              한양대학교 생체공학과
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
