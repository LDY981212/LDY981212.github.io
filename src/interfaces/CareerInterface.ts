export interface CareerItems {
  id: string;
  title: string;
  created: string;
  content: CareerContent[];
  stack: string[];
  imageUrl: string;
}

export interface CareerContent {
  id: string;
  header: string;
  year: string;
  infor: string;
}
