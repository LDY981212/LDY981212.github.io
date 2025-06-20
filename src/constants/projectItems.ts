import { ProjectItems } from "@/interfaces/ProjectInterface";

const projectItems: ProjectItems[] = [
  {
    id: "1",
    title: "개인 포트폴리오 웹",
    created: "2025.05 (1人 개인 프로젝트)",
    subTitle: "개인 포트폴리오 웹",
    content: [
      "Next.js의 SSR을 통해 SEO 최적화",
      "Framer-motion의 부드러운 효과로 사용자 경험 향상",
      "샤용자 경험 향상을 위한 UI & UX 디자인",
    ],
    stack: [
      {
        name: "Typescript",
        detail:
          "코드 작성 중 타입 관련 오류를 컴파일 단계에서 미리 감지하여 런타임 오류를 줄일 수 있으며, 가독성 측면에서 변수나 함수의 의도를 쉽게 이해할 수 있기 때문에 JS 대신 TS를 선택했습니다.",
      },
      {
        name: "Next.js",
        detail:
          "파일 기반 라우팅으로 유지보수 하기가 쉽고, SSR 또는 SSG를 통해 SEO 최적화 향상에 도움이 되었습니다. ",
      },
      {
        name: "Tailwind CSS",
        detail:
          "별도의 CSS 파일을 작성하지 않아도 되니 디렉토리 구조를 더욱 깔끔하게 관리할 수 있으며, 커스텀하기에도 편리하여 tailwind를 선택해 사용하였습니다.",
      },
    ],
    link: "https://ldy981212.github.io",
    router: "individual",
    intro: "",
    contribution: [
      {
        head: "Framer-motion의 부드러운 효과로 사용자 경험 향상",
        detail: [
          "Framer motion의 애니메이션 효과를 이용하여 웹 목적의 맞게 사용자의 흥미를 끌었습니다.",
        ],
      },
      {
        head: "샤용자 경험 향상을 위한 UI & UX 디자인",
        detail: [
          "사용자 입장에서 직접 디자인을 하였기 때문에 디자인적으로 불편한 부분을 수정하기 수월했으며, PC & mobile 사이즈에 따라 반응형 디자인을 적용함으로써 유연하게 웹을 이용 가능하게 할 수 있었습니다. ",
        ],
      },
    ],
    solution: [
      {
        head: "Tailwind CSS 4.0 에러",
        situation:
          "Tailwind CSS를 적용하는데 있어 커스텀 색상이나 크기가 적용되지 않는 문제점이 있습니다.",
        task: "Tailwind CSS의 커스텀 설정 및 효과가 잘 적용되는 것입니다.",
        result: "알맞게 설정을 한 후 tailwind css가 잘 적용되었습니다.",
        action:
          "tailwind.config.js로 설정하는 것이 아닌 Tailwind CSS의 버전이 4.0으로 업데이트 되면서 기본 설정 및 커스텀 속성 값들을 선언하는 부분이 달라졌기 때문에 공식 문서를 확인한 후 초기 설정과 커스텀 속성 설정 과정을 수정했습니다.",
      },
    ],
    github: "https://github.com/LDY981212/LDY981212.github.io",
  },
  {
    id: "2",
    title: "Moving",
    created: "2025.01 ~ 2025.02 (6人 팀 프로젝트)",
    subTitle:
      "사용자들이 다양한 이사 서비스를 편리하게 요청하고, 이사 업체로부터 견적을 받을 수 있게 돕는 온라인 웹 서비스",
    content: [
      "프로필 등록 & 수정 페이지 제작",
      "견적 요청 & 수정 페이지 제작",
      "리뷰 페이지 제작",
      "실시간 채팅 페이지 제작",
    ],
    stack: [
      {
        name: "Typescript",
        detail:
          "코드 작성 중 타입 관련 오류를 컴파일 단계에서 미리 감지하여 런타임 오류를 줄일 수 있으며, 가독성 측면에서 변수나 함수의 의도를 쉽게 이해할 수 있기 때문에 JS 대신 TS를 선택했습니다.",
      },
      {
        name: "Next.js",
        detail:
          "App router의 서버 컴포넌트를 이용해 서버에서 데이터를 미리 처리해 클라이언트 로드 속도를 개선했으며, 페이지별로 SSR, CSR 등 유연하게 선택해 데이터를 모두 받아오는 페이지는 SSR로 구성 그리고 검색, 페이지네이션 등 클라이언트에서 이뤄줘야 하는 기능들은 CSR로 구현해 SEO 및 페이지 로딩 속도 향상에 도움이 되었습니다.",
      },
      {
        name: "Tailwind CSS",
        detail:
          "별도의 CSS 파일을 작성하지 않아도 되니 디렉토리 구조를 더욱 깔끔하게 관리할 수 있으며, 커스텀하기에도 편리하여 tailwind를 선택해 사용하였습니다.",
      },
      {
        name: "Storybook",
        detail:
          " 각 컴포넌트를 독립적으로 개발할 수 있으며, 컴포넌트의 변경사항 및 UI를 실시간으로 확인할 수 있기 때문에 팀 내 빠른 피드백을 위해 기용했습니다.",
      },
      { name: "Jest", detail: "" },
      {
        name: "Redux Toolkit",
        detail:
          " Redux보다 코드를 간결하게 작성할 수 있게 도와주며, Next의 next-redux-wrapper라는 라이브러리를 통해 SSR/CSR 간 상태를 일관성 있게 관리할 수 있기 때문에 기용했습니다.",
      },
      {
        name: "Tanstack Query",
        detail:
          "서버에서 받아온 데이터를 자동으로 캐시해서 불필요한 요청을 줄였으며, 서버 상태와 클라이언트 상태를 분리하여, 클라이언트에서만 필요한 상태와 서버에서 가져오는 데이터를 구분하고 관리했습니다.",
      },
    ],
    link: "종료된 서비스 입니다.",
    router: "moving",
    intro:
      "이사 서비스 시장은 기존에 오프라인 중심으로 운영되었으며, 고객들은 여러 업체에 일일이 연락하여 견적을 비교하는 불편함을 겪었습니다. Moving은 이러한 문제를 해결하기 위해 온라인에서 손쉽게 이사 견적을 비교하고, 신뢰할 수 있는 이사 업체를 찾을 수 있도록 지원하는 플랫폼으로 등장하였습니다.디지털화된 이사 견적 시스템을 통해 고객들은 보다 효율적인 비용 비교와 업체 선택이 가능하며, 이사 업체들도 온라인을 통해 더 많은 고객을 만날 수 있는 기회를 얻게 됩니다.이제 사용자는 Moving을 통해 보다 간편하고 투명한 이사 경험을 할 수 있습니다.",
    contribution: [
      {
        head: "프로필 등록 & 수정 페이지 (일반유저 & 기사님)",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "사진 첨부 및 캘린더 기능 컴포넌트로 구현",
          "Redux 전역 상태 관리로 프로필에 대한 데이터 관리",
          "validation 사용자 훅 구현",
          "프로필 수정 전 로그인 한 유저가 소셜로그인 유저일 때 social verify 기능 구현",
        ],
      },
      {
        head: "견적 요청 & 수정 페이지",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "각 견적 요청 상황에 맞는 Empty ui 구현",
        ],
      },
      {
        head: "리뷰 페이지",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "Tanstack query를 사용해 데이터 리스트 비동기 페이지네이션 기능 구현 및 prefetching 이용하여 SSR 구현",
        ],
      },
      {
        head: "실시간 채팅 페이지",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "Socket io를 이용해 단방향 통신이 아닌 양방향 통신을 사용함으로써 실시간 채팅 기능 구현",
          "Socket으로 통신하는 이벤트 바디에 image 타입을 옵셔널로 설정해놓고 이미지 파일의 이름을 http 요청을 통해 s3 버켓에 이미지를 업로드 한 후 이미지를 보여주는 이미지 전송 기능 구현",
          "채팅 갯수는 최대 10개로 다른 채팅 어플리케이션과 똑같이 스크롤을 올릴수록 바로 전 채팅했던 내역들을 무한 스크롤로 보여주는 기능 구현",
          "Soket을 이용해 채팅 상대방의 온라인 상태, 상대가 채팅을 적고 있는지에 대한 유무 등에 대한 기능 구현",
        ],
      },
      {
        head: "소셜로그인 검증 페이지",
        detail: [
          "access token을 사용해 google, naver, kakao의 소셜로그인 검증페이지로 이동 후 검증이 완료되면 원하는 페이지로 redirect 해주는 기능 구현",
        ],
      },
    ],
    solution: [
      {
        head: "Redux 전역 상태 관리를 사용하는 과정에서 페이지 새로고침하면 상태값이 초기화되는 문제점",
        situation:
          "저장해 둔 redux 상태 값이 페이지가 새로고침 되거나 리렌더링이 되면 상태값이 초기화 되는 문제점이 있습니다.",
        task: "새로고침이나 리렌더링 이후에도 상태값이 초기화 되지 않도록 하는 것입니다.",
        result:
          "새로고침이나 리렌더링을 진행해도 상태값이 더 이상 초기화 되지 않아서 다른 페이지에도 전역 상태 관리값을 원활하게 사용할 수 있었습니다.",
        action:
          "Redux persist 라이브러리를 사용해 원하는 redux 상태값을 업데이트할 때 로컬스토리지 또는 세션스토리지 등에 자동으로 저장을 시켜서 새로고침 및 리렌더링에도 문제가 되지 않도록 했습니다.",
      },
      {
        head: "Next SSR 환경에서 redux persist가 저장소에 접근하지 못할 때 나타나는 문제점",
        situation:
          "Redux persist를 사용해 상태 값을 자동으로 세션스토리지에 저장하도록 설정했었는데 ssr에서도 자동으로 저장되도록 로직이 흘러가서 세션스토리지를 사용 못하는 ssr에서 에러가 발생했습니다.",
        task: "SSR 환경에서도 redux persist가 저장소에 접근 가능하도록 하는 것입니다.",
        result:
          "SSR 페이지에서 더 이상 저장소에 접근하지 못한다는 redux ssr 에러 없이 잘 작동이 되었습니다.",
        action:
          "CSR에서는 세션 스토리지를 사용하도록 설정했고 ssr에서는 아무 동작도 하지 않는 가짜 스토리지를 만들어서 사용해 에러를 방지했습니다.",
      },
      {
        head: "Jest 테스트 코드 작성 시 svg 이미지 파일 여러 개 모킹할 때 생긴 문제점",
        situation:
          "Jest test 코드를 작성할 때 svg 이미지를 여러 개 모킹해서 사용하면 가장 최신에 모킹된 svg 이미지로 모두 바뀌어 버리는 에러가 발생했습니다.",
        task: "SVG 이미지를 여러 개 모킹했을 때 제대로 모킹이 되는지 확인하는 부분과 원하는 테스트를 진행하는 것입니다.",
        result:
          "그 결과 svg 모킹은 실패했지만 원하는 테스팅 결과를 얻을 수 있었습니다.",
        action:
          "우선 관련 이슈를 겪고 있는 여러 케이스를 찾아봤지만 이슈만 있을 뿐 해결책은 없었습니다. 그래서 svg 모킹하는 방식 대신 이미지에 data-startype이라고 속성을 줘서 테스트를 진행할 때 그 속성이 담긴 값으로 예측을 진행했습니다.",
      },
      {
        head: "실시간 채팅 페이지에서 이미지를 보여주는 과정에서 문제점",
        situation:
          "실시간 채팅 페이지에서 이미지를 선택 후 서버에 소켓으로 전송하고 http 요청으로 채팅 내역의 이미지를 받아오는 과정에서 에러가 발생했습니다. ",
        task: "채팅 내역에 이미지가 잘 보이게 하는 것입니다.",
        result:
          "소켓으로 이미지를 전송했을 때 서버에 잘 도착을 했고, 채팅창에도 이미지가 잘 보였습니다.",
        action:
          "소켓으로 서버에 이미지를 보낼 땐 postImage http요청의 response 값으로 받은 값을 보냈고 react-query 채팅 내역을 보여주는 캐시에는 직접적인 url이 아닌 previewUrl 즉 임시로 만든 URL.createObjectURL(file)의 string을 보여줘서 서버에서 s3 bucket url을 받기 전 채팅 내역에 미리보기 형식으로 이미지를 보여줬습니다.",
      },
    ],
    videos: "https://www.youtube.com/embed/HBW6C_YK2gY",
    github: "https://github.com/FS2-Part4-Team3/2-Moving-3-FE",
  },
  {
    id: "3",
    title: "HanCook",
    created: "2024.11 ~ 2024.12 (6人 팀 프로젝트)",
    subTitle: "전 세계 외국인들을 대상으로 한 한국 요리 커뮤니티 웹 서비스",
    content: [
      "작업물 페이지 제작",
      "회원가입 페이지 제작",
      "레시피 & 챌린지 리스트 페이지 제작",
    ],
    stack: [
      {
        name: "Typescript",
        detail:
          "코드 작성 중 타입 관련 오류를 컴파일 단계에서 미리 감지하여 런타임 오류를 줄일 수 있으며, 가독성 측면에서 변수나 함수의 의도를 쉽게 이해할 수 있기 때문에 JS 대신 TS를 선택했습니다.",
      },
      {
        name: "Next.js",
        detail:
          "App router의 서버 컴포넌트를 이용해 서버에서 데이터를 미리 처리해 클라이언트 로드 속도를 개선했으며, 페이지별로 SSR, CSR 등 유연하게 선택해 데이터를 모두 받아오는 페이지는 SSR로 구성 그리고 검색, 페이지네이션 등 클라이언트에서 이뤄줘야 하는 기능들은 CSR로 구현해 SEO 및 페이지 로딩 속도 향상에 도움이 되었습니다.",
      },
      {
        name: "Tailwind CSS",
        detail:
          "별도의 CSS 파일을 작성하지 않아도 되니 디렉토리 구조를 더욱 깔끔하게 관리할 수 있으며, 커스텀하기에도 편리하여 tailwind를 선택해 사용하였습니다.",
      },
      {
        name: "Storybook",
        detail:
          " 각 컴포넌트를 독립적으로 개발할 수 있으며, 컴포넌트의 변경사항 및 UI를 실시간으로 확인할 수 있기 때문에 팀 내 빠른 피드백을 위해 기용했습니다.",
      },
      {
        name: "Zustand",
        detail:
          "Zustand를 사용한 이유는 소규모 프로젝트에서 적합했으며, 간단한 상태 관리만 필요했기 때문에 사용했습니다.그로 인해 User의 상태나 자주 사용하는 상태들을 전역적으로 관리함으로써 재사용하기가 편했고, prop drilling의 문제점인 가독성 저하와 유지보수의 어려움을 방지할 수 있었습니다.",
      },
      {
        name: "Tanstack Query",
        detail:
          "서버에서 받아온 데이터를 자동으로 캐시해서 불필요한 요청을 줄였으며, 서버 상태와 클라이언트 상태를 분리하여, 클라이언트에서만 필요한 상태와 서버에서 가져오는 데이터를 구분하고 관리했습니다.",
      },
    ],
    link: "종료된 서비스 입니다.",
    router: "hancook",
    intro:
      "이 웹사이트는 외국인들이 한국 요리를 배우고 직접 도전하며, 한국 문화를 체험할 수 있도록 설계된 글로벌 플랫폼입니다. 다양한 난이도의 레시피를 제공하며, 현지에서 구하기 어려운 재료를 대체할 수 있는 방안도 안내합니다. 각 요리의 문화적 배경과 스토리를 소개하여 단순한 요리 체험을 넘어 한국 문화를 깊이 이해할 수 있는 기회를 제공합니다. 또한, 사용자가 요리를 완성하면 사진이나 영상을 업로드할 수 있고, 피드백을 통해 전 세계 요리 애호가들과 소통하고, 자신만의 요리 결과물을 자랑할 수도 있습니다.",
    contribution: [
      {
        head: "작업물 페이지",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "Tanstack query를 이용해 댓글 무한 스크롤 기능 구현",
          "Optimistic update를 활용해 작업물 좋아요 기능 구현",
          "임시 작성 중인 작업물 페이지의 내용 불러오기 기능 구현",
        ],
      },
      {
        head: "회원가입 페이지 제작",
        detail: ["페이지에 해당하는 컴포넌트 및 반응형 구현"],
      },
      {
        head: "레시피 & 챌린지 리스트 페이지 제작",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "검색, 정렬, 비동기 페이지네이션 기능 구현",
          "Data list 불러올 때 tanstack query의 prefetching 이용하여 SSR 구현 ",
        ],
      },
      {
        head: "각 페이지 유저 권한에 따른 router 설정",
        detail: [""],
      },
      {
        head: "axios interceptor를 이용해  요청 보낼 때 accessToken이 필요한 요청에 header에 자동 삽입 및 401 unauthorized 되었을 때 refreshToken 자동 요청해 accessToken 재발급 기능 설정",
        detail: [""],
      },
      {
        head: "Lighthouse 성능 개선",
        detail: [
          "Next.config에서 AVIF와 WebP 두 이미지 형식을 지원하도록 설정",
          "LocalFont와 swap 속성을 활용하여 외부 폰트 서버 의존도를 줄이고, 폰트 파일을 로컬에 미리 로딩하도록 설정",
        ],
      },
    ],
    solution: [
      {
        head: "레시피 페이지 Next app router에서 SSR을 위한 데이터 prefetching의 어려움",
        situation:
          "SSR을 하려는 페이지에서 prefetching을 하기 위해 getServerSideProp함수를 사용하였는데 dev 과정에서는 문제가 에러가 없었지만 build시 문제가 생겼습니다.",
        task: "데이터 전체를 받아오는 page에서 클라이언트 컴포넌트로 넘어가 CSR을 하기 전에 미리 데이터를 prefetching 해오는 것입니다.",
        result:
          "서버에서 데이터를 가져와 SSR이 구현되었고 가져온 데이터를 클라이언트 컴포넌트로 전달시켜 CSR 구현이 가능하게 되었습니다.",
        action:
          "Next app router의 공식 문서를 확인해 본 결과 getServerSideProp 등 prefetching 해주는 함수는 app router에서는 지원이 안된다는 것을 알고 tanstack query의 prefetchQuery를 이용해 사전로딩 한 후 dehydrate로 서버에서 쿼리 데이터를 직렬화하여 HydrationBoundary로 클라이언트로 전달할 수 있게 해줬습니다.",
      },
      {
        head: "refreshToken을 이용해 accessToken을 재발급 하는 과정에서의 어려움",
        situation:
          "RefreshToken을 쿠키로 받아서 로그인을 하면 자동으로 refreshToken이 application의 cookie 목록에 있어야 하는데 계속 발급이 되지 않아서 accessToken을 갱신하는데 문제가 생겼습니다.",
        task: "오류코드가 401 unatuhorizaed나 accessToken이 만료되었을 때 refreshToken을 이용하여 accessToken의 만료 시간을 갱신하는 것 입니다.",
        result:
          "로그인 시 refreshToken을 token으로 받아서 클라이언트에서 accessToken 갱신 요청 시 body에 refreshToken을 담아서 api 요청을 보낸 결과 갱신이 잘 이루어졌습니다.",
        action:
          "정확한 원인은 파악하지 못했으나, 일정상 쿠키로 refreshToken을 받아 갱신하는 작업에 너무 시간이 들었기 때문에 쿠키가 아닌 token으로 받아서 갱신하기로 수정했습니다.",
      },
      {
        head: "작업물 페이지에서 피드백 수정 삭제 기능을 만들 때 어려움",
        situation:
          "useMutaion을 사용해 수정 & 삭제 api를 구현 후  onClick prop으로 handle함수를 내려줬는데 수정 & 삭제 기능을 실행하면 data의 id가 들어가지 않는 에러가 나왔습니다.",
        task: "댓글 수정 및 삭제 기능이 정상적으로 작동되도록 api 호출 함수에 수정 & 삭제하려는 data의 id를 넣어줘야 합니다.",
        result:
          "댓글 수정 & 삭제 기능이 정상 작동하며 data의 id가 api 요청함수에 잘 들어가는 것을 확인했습니다.",
        action:
          "handler 함수에서 mutate를 실행하는 부분에 async await을 사용해 비동기적 처리를 다 기다리고 다음 코드로 넘어가도록 설정했습니다.",
      },
    ],
    videos: "https://www.youtube.com/embed/OPhg9NHXJT8",
    github: "https://github.com/2-Docthru-team1/2-Docthru-team1-FE",
  },
  {
    id: "4",
    title: "View My Startup",
    created: "2024.09 ~ 2024.10 (5人 팀 프로젝트)",
    subTitle:
      "개인 투자자들이 스타트업 정보를 제공받고, 누적 투자금액, 매출액, 고용 인원 등을 기준으로 스타트업을 비교하여 투자 결과를 확인할 수 있는 모의 투자 웹 서비스",
    content: [
      "기업 비교 모달 & 결과 UI 제작",
      "나의 기업 비교 선택 페이지 제작",
      "기업 관련 create & read api 제작",
    ],
    stack: [
      {
        name: "Javascript",
        detail:
          "프론트/백 구분 없이 한 언어로 협업할 수 있어 초기 개발 속도를 빠르게 가져갈 수 있었습니다.",
      },
      {
        name: "React",
        detail:
          "SPA 환경에서 빠른 사용자 경험과 유지보수가 필요한 UI 구성에 React가 가장 적합했습니다. ",
      },
      {
        name: "Express.js",
        detail:
          "프로젝트 초기에는 복잡한 백엔드보다는 빠르게 API를 설계하고 프론트와 연결하는 것이 중요했기 때문에 Express를 선택했습니다",
      },
      {
        name: "PostgreSQL",
        detail:
          "프로젝트에서 사용자, 게시글, 댓글 등의 명확한 관계형 데이터 구조가 필요했고, PostgreSQL은 신뢰성과 성능 면에서 가장 적합한 선택이었습니다.",
      },
    ],
    link: "종료된 서비스 입니다.",
    router: "startup",
    intro:
      "개인 투자자들의 스타트업에 대한 관심이 증가하고 있지만, 스타트업 정보의 접근성은 여전히 부족합니다. 이러한 시장 가능성을 바탕으로, 개인 투자자들이 스타트업 정보를 제공받고, 누적 투자 금액, 매출액, 고용 인원 등을 기준으로 스타트업을 비교하여 투자 결과를 확인할 수 있는 모의 투자 서비스입니다. 우리 서비스는 다른 서비스와의 차별점으로 번거롭게 로그인 할 필요없이 임의의 닉네임과 비밀번호만을 이용하여 모의 투자 시뮬레이션을 진행할 수 있으며, 비교 분석을 통해 성과를 기준으로 평가하고, 최적의 투자 대상을 결정해 투자할 수 있습니다.",
    contribution: [
      {
        head: "기업 비교 모달 & 결과 UI 제작",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "비교할 기업 선택 페이지에서 비교하기 버튼을 누르면 비교 결과 테이블과 나의 기업 순위 테이블을 보여주는 UI 구현",
        ],
      },
      {
        head: "나의 기업 비교 선택 페이지 제작",
        detail: [
          "페이지에 해당하는 컴포넌트 및 반응형 구현",
          "내 기업 및 비교할 기업을 모달에서 선택 후 그 기업들을 보여주는 UI 구현",
        ],
      },
      {
        head: "기업 관련 create & read api 제작",
        detail: [
          "모달 공통으로 전체 기업 리스트를 조회하는 API 설계 (페이지네이션, 검색, 정렬)",
          "내 기업 선택 모달에서 필요한 최근에 선택된 5개의 기업들을 조회하는 API 설계 (정렬)",
          "비교한 기업 리스트를 조회하는 API 설계.",
        ],
      },
    ],
    solution: [
      {
        head: "비교 결과 페이지 session 기록에 대한 문제점",
        situation:
          "기업 비교 페이지에서 기업을 비교한 후 다른 페이지에 갔다가 다시 기업 비교 페이지에 돌아오면 비교 결과가 남아 있기를 원하지만, 페이지가 초기화 되는 것이 문제였습니다.",
        task: "기업 비교 페이지에서 기업을 비교한 후 다른 페이지에 갔다가 다시 비교 페이지에 돌아와도 나의 sessionId가 할당되서 선택된 기업들로 비교한 결과가 페이지에 구현되도록 하는 것 입니다.",
        result:
          "기업 비교 후 다른 페이지를 갔다 와도 session으로 할당된 기업 리스트들이 UI로 렌더링되었습니다.",
        action:
          "결과 페이지가 아닌 전에 나의 sessionId가 할당된 선택한 기업 UI가 남아있는 비교할 기업 선택 페이지를 render하는 것으로 바꾸어서 해결하기 위해서 백엔드에서 sessionId를 where로 받아서 선택한 기업을 조회해주는 api를 설계하고, 프론트에서 useEffect 훅으로 sessionId를 디펜던시로 줘서 만약 sessionId가 있으면 선택한 기업을 조회해주는 기능을 설계했습니다. ",
      },
      {
        head: "드롭다운 컴포넌트에서 데이터 오류의 문제점",
        situation:
          "비교결과 페이지에 드롭다운 컴포넌트를 적용할 때 UI는 잘 나왔지만, 데이터가 드롭다운 카테고리에 따라 데이터의 정렬이 되지 않았습니다.",
        task: "비교 결과 페이지에서 드롭다운 기능이 잘 구현되도록 하는 것 입니다.",
        result: "비교 결과 페이지에서 드롭다운 기능이 잘 작동되었습니다.",
        action:
          "드롭다운으로 정렬하는 데이터의 api 파일의 정렬에 대한 상태함수를 만들어 prop으로 넘겨주고, CompareDropdown 컴포넌트의 prop인 setSortOption을 사용하는 MySelection 컴포넌트에서 api파일의 prop을 드롭다운 컴포넌트의 prop으로 넘겨주었습니다.  ",
      },
    ],
    videos: "https://www.youtube.com/embed/wKgFSlF35l4",
    github: "https://github.com/season2-3team/season2-View-My-Startup-3team-FE",
  },
];

export default projectItems;
