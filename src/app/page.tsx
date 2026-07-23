"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Project from "@/components/Project";
import Career from "@/components/Career";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // reducedMotion="user"면 OS에서 모션 줄이기를 켠 사용자에게 framer-motion이
    // 이동·회전·스케일을 통째로 건너뛴다. CSS 미디어쿼리는 JS 애니메이션까지 막지 못한다.
    <MotionConfig reducedMotion="user">
      {/* 섹션 이동은 앵커 + scroll-margin-top으로 처리한다. 오프셋을 자바스크립트로
          계산하지 않으니 헤더 높이가 바뀌어도 어긋날 일이 없다. */}
      <header className="fixed inset-x-0 top-0 z-30">
        <Nav isScrolled={isScrolled} />
      </header>

      <main>
        <Hero />
        <AboutMe />
        <Skills />
        <Project setIsOpen={setIsOpen} setProjectName={setProjectName} />
        <Career />
      </main>

      <Footer />
      <BackToTop />

      {isOpen && <ProjectModal project={projectName} setIsOpen={setIsOpen} />}
    </MotionConfig>
  );
}
