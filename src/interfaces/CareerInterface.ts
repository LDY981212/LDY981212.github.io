export interface CareerItems {
  id: string;
  title: string;
  created: string;
  content: CareerContent[];
  stack: string[];
  /** 로고 이미지 경로. 없으면 logoText(또는 제목 앞 2글자)를 텍스트로 표시한다. */
  imageUrl?: string;
  logoText?: string;
}

export interface CareerContent {
  id: string;
  header: string;
  year: string;
  infor: string;
}
