export interface CareerProps {
  careerRef: React.RefObject<HTMLDivElement | null>;
}

export interface CareerItems {
  id: string;
  title: string;
  created: string;
  content: CareerContent[];
  stack: string[];
}

export interface CareerContent {
  id: string;
  header: string;
  year: string;
  infor: string;
}
