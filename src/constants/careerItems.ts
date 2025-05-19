import { CareerItems } from "@/interfaces/CareerInterface";

const careerItems: CareerItems[] = [
  {
    id: "1",
    title: "한양대학교 뇌영상분석 연구실 CNA",
    created: "2023.12 - 2024.02 (3개월)",
    content: [
      {
        id: "1",
        header: "DLB와 AD를 더 정확히 분류하기 위해 관련 모델 수정 및 적용",
        year: "2023.12 - 2024.02",
        infor:
          " 사전 학습 데이터 기반 3D U-Net 모델 적용 및 모델의 가중치를 3D U-Net에 적용",
      },
    ],
    stack: ["Python", "Tensorflow"],
    imageUrl: "/images/cna.png",
  },
];

export default careerItems;
