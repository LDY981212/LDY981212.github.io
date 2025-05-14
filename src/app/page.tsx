"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import { motion } from "framer-motion";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const scrollToRefWidthOffset = (
    ref: React.RefObject<HTMLElement | null>,
    offset = 30
  ) => {
    if (ref.current) {
      const top = ref.current.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, []);

  return (
    <div>
      <header className="fixed w-full z-20">
        <Nav
          isScrolled={isScrolled}
          onClickLogo={() => {
            headerRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          onClickAbout={() => scrollToRefWidthOffset(aboutRef)}
          onClickSkills={() => scrollToRefWidthOffset(skillsRef)}
        />
      </header>
      <div
        ref={headerRef}
        className="relative w-full h-[50em] bg-cover bg-center bg-no-repeat bg-[url('/images/keyboard-933568_1280.jpg')]"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 1 },
          }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white"
        >
          <h2 className="font-black text-center text-white text-[4rem]">
            안녕하세요.
            <br /> 더 나은 <span className="text-blue-300">사용자 경험</span>
            을 고민하고,
            <br /> 끊임없이 <span className="text-blue-300">성장</span>하는
            <br />
            프론트엔드 개발자 <span className="text-blue-300">이도엽</span>
            입니다.
          </h2>
          <motion.button
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
            onClick={() => scrollToRefWidthOffset(aboutRef)}
            className="mt-[4rem] px-[1rem] py-[1rem] w-[16rem] h-[5rem] text-[1.6rem] hover:bg-blue-800 transition-colors duration-300 bg-blue-500 text-white rounded-full cursor-pointer"
          >
            더 알아보기 ↓
          </motion.button>
        </motion.div>
      </div>
      <AboutMe aboutRef={aboutRef} />
      <Skills skillRef={skillsRef} />
    </div>
  );
}
