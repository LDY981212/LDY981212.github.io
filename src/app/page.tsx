"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, []);

  return (
    <div className="h-[1000rem]">
      <header className="fixed w-full z-20">
        <Nav
          isScrolled={isScrolled}
          onClickLogo={() => {
            headerRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          onClickAbout={() => {
            aboutRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </header>
      <div
        ref={headerRef}
        className="relative w-full h-[80em] bg-cover bg-center bg-no-repeat bg-[url('/images/keyboard-933568_1280.jpg')]"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h2 className="font-black text-center text-white text-[6rem]">
            안녕하세요.
            <br /> 더 나은 사용자 경험을 고민하고,
            <br />
            끊임없이 성장하는 프론트엔드 개발자 이도엽입니다.
          </h2>
          <button
            onClick={() => {
              aboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 px-6 py-3 w-[18rem] h-[6rem] text-[1.8rem] hover:bg-blue-800 transition-colors duration-300 bg-blue-500 text-white rounded-full cursor-pointer"
          >
            더 알아보기 ↓
          </button>
        </div>
      </div>
      <AboutMe aboutRef={aboutRef} />
    </div>
  );
}
