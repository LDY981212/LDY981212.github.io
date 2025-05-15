import { CareerProps } from "@/interfaces/CareerInterface";

export default function Career({ careerRef }: CareerProps) {
  return (
    <div
      ref={careerRef}
      className="flex flex-col items-center py-[9rem] bg-gray-100"
    >
      <h1 className="font-black text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        Career
      </h1>
    </div>
  );
}
