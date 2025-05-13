import { NavProps } from "@/interfaces/NavInterface";

export default function Nav({
  isScrolled,
  onClickLogo,
  onClickAbout,
}: NavProps) {
  return (
    <div
      className={`flex justify-between items-center px-[30rem] py-[2.5rem]  ${
        isScrolled
          ? "text-white bg-gray-400 border-b border-gray-400 shadow-lg"
          : "text-gray-400"
      }`}
    >
      <button
        className="text-[3.2rem] font-bold cursor-pointer hover:text-blue-500"
        onClick={onClickLogo}
      >
        LDY&apos;s Portfolio
      </button>
      <div className="flex gap-[3.5rem] text-[2.2rem] font-bold ">
        <button
          onClick={onClickAbout}
          className="cursor-pointer hover:text-blue-500"
        >
          About me
        </button>
        <button className="cursor-pointer hover:text-blue-500">Skills</button>
        <button className="cursor-pointer hover:text-blue-500">
          Archiving
        </button>
        <button className="cursor-pointer hover:text-blue-500">Projects</button>
        <button className="cursor-pointer hover:text-blue-500">Career</button>
      </div>
    </div>
  );
}
