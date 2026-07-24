export interface CareerItems {
  id: string;
  title: string;
  created: string;
  content: CareerContent[];
  stack: string[];
  /** 로고 이미지 경로. 없으면 logoText(또는 제목 앞 2글자)를 텍스트로 표시한다. */
  imageUrl?: string;
  /** 로고가 자체 배경을 가진 정사각형 아이콘이면 원 전체를 채운다. */
  logoFull?: boolean;
  logoText?: string;
}

export interface CareerContent {
  id: string;
  header: string;
  year: string;
  infor: string;
}
