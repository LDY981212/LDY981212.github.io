export interface ProjectItems {
  id: string;
  title: string;
  created: string;
  subTitle: string;
  content: string[];
  stack: string[];
  link: string;
}

export interface ProjectProps {
  projectRef: React.RefObject<HTMLDivElement | null>;
}
