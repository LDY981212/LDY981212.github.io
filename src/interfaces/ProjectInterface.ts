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
  projectRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setProjectName: Dispatch<SetStateAction<string>>;
}

export interface ProjectModalProps {
  project: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
