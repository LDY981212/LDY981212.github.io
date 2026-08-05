import { Dispatch, SetStateAction } from "react";

export interface ProjectItems {
  id: string;
  title: string;
  created: string;
  subTitle: string;
  content: string[];
  stack: Stack[];
  link: string;
  router: string;
  intro: string;
  contribution: Contribution[];
  solution: Solution[];
  videos?: string;
  github?: string;
  /**
   * 카드와 모달 대신 한 줄 목록으로만 노출한다.
   *
   * 데이터를 지우지 않는 이유는 scripts/build-resume-pdf.mjs 가 이 배열의
   * solution 을 인덱스로 참조하기 때문이다. 항목을 삭제하면 이력서 PDF가
   * 조용히 다른 내용을 싣는다. 웹에서 덜어내는 것과 이력서에서 지우는 것은
   * 별개의 결정이라 플래그로만 나눈다.
   */
  archived?: boolean;
  /** 아카이브 행에 한 줄로 적는 요약. 카드의 subTitle 은 길어서 줄바꿈이 난다. */
  archiveNote?: string;
}

interface Solution {
  head: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface Contribution {
  head: string;
  detail: string[];
}

interface Stack {
  name: string;
  detail: string;
}

export interface ProjectProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setProjectName: Dispatch<SetStateAction<string>>;
}

export interface ProjectModalProps {
  project: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
