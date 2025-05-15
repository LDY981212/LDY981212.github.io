export interface ProjectItems {
  id: string;
  title: string;
  created: string;
  subTitle: string;
  content: ContentDetails[];
  stack: TechStacks[];
  link: string;
}

export interface ContentDetails {
  text: string;
}

export interface TechStacks {
  text: string;
}
