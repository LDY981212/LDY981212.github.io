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
          " 사전 학습된 모델을 사용하여 이미 잘 학습된 특징을 기반으로 3D U-Net 모델에 적용했으며, 사전 학습된 모델의 가중치를 3D U-Net에 적용하여, 보다 빠르고 정확하게 병리학적 패턴을 인식할 수 있었습니다.",
      },
    ],
    stack: ["Python", "Tensorflow"],
  },
];

export default careerItems;
