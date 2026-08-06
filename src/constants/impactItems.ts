/**
 * 히어로 바로 아래에 세우는 핵심 성과.
 *
 * 여기 적는 수치는 전부 프로젝트 모달의 트러블슈팅에 근거가 있는 것만 쓴다.
 * 카드를 누르면 그 근거가 있는 모달이 열리므로, 요약과 원본이 어긋나면
 * 바로 들킨다. 인상만 주는 형용사("최적화", "대폭 개선")는 넣지 않는다.
 */
export interface ImpactItem {
  /** 카드에서 가장 크게 읽히는 값. 단위를 포함한 짧은 문자열. */
  metric: string;
  label: string;
  body: string;
  project: string;
  /** 근거가 있는 프로젝트 모달의 router. */
  router: string;
}

const impactItems: ImpactItem[] = [
  {
    metric: "25건",
    label: "동시 처리 한계",
    body: "열몇 건에서 서버가 다운되던 영상 처리 파이프라인입니다. 병목이 디스크가 아니라 메모리 압박이라는 것을 직접 만든 부하 스크립트와 자원 측정기로 확정하고, 검토 중이던 디스크 증설안을 폐기했습니다. 단계별로 다른 상한을 건 세마포어로 25건 전부 실패·타임아웃 없이 처리했고, 스왑은 발생하지 않았습니다.",
    project: "ClipNow",
    router: "clipnow",
  },
  {
    metric: "매초 → 0",
    label: "시청 화면 전체 재렌더",
    body: "영상 패널과 채팅 패널을 포함한 화면 전체가 1초마다 다시 그려지고 있었습니다. 매초 갱신이 필요한 값과 화면이 실제로 바뀌어야 하는 시점을 분리해, 시청 모드가 전환될 때만 바뀌는 상태만 남겼습니다.",
    project: "Player",
    router: "player",
  },
  {
    metric: "0.113 → 0",
    label: "이 페이지의 CLS",
    body: "히어로 강조어가 2.6초마다 회전하며 뒷 문장을 밀어내고 있었습니다. 실제 Chrome에 PerformanceObserver를 붙여 재니 4분 체류 기준 0.113 · 시프트 92건. 고치고 로컬에서 0을 확인했는데, 배포 후 라이브에서 다시 재보니 2MB 폰트가 늦게 교체되며 생기는 시프트가 따로 남아 있었습니다. 폰트를 177KB로 줄이고 폴백 지표까지 잡아 라이브 콜드 로드에서도 0입니다.",
    project: "개인 포트폴리오 웹",
    router: "individual",
  },
];

export default impactItems;
