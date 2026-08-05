import type { Metadata } from "next";
import "../styles/globals.css";
import localFont from "next/font/local";

const SITE_URL = "https://ldy981212.github.io";
const TITLE = "LDY's Portfolio";
const DESCRIPTION = "프론트엔드 개발자 이도엽 포트폴리오입니다.";

export const metadata: Metadata = {
  // 정적 export라 이 값이 없으면 og:image가 localhost 절대경로로 박힌다.
  // 카카오톡 스크래퍼는 상대경로를 못 읽으므로 필수.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "LDY 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

// 서브셋은 npm run font 가 만든다(prebuild 로 자동 실행). 원본 2MB 를 그대로 쓰면
// 폰트가 늦게 도착해 폴백에서 교체되는 순간 히어로와 내비게이션이 함께 밀린다.
// 라이브 실측으로 첫 방문 CLS 0.034 가 여기서 나왔다.
//
// display 가 "optional" 인 이유: swap 은 늦게 도착한 폰트로 반드시 교체하므로
// 시프트가 남는다. optional 은 짧은 차단 구간 안에 도착하지 않으면 그 방문에는
// 교체하지 않아 시프트가 생길 경로 자체가 없다. 서브셋이 177KB 라 대부분의
// 방문에서는 제때 도착하고, 못 받은 방문에도 폰트는 캐시돼 다음부터 적용된다.
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.subset.woff2",
  display: "optional",
  weight: "45 920",
  variable: "--font-pretendard",
});

// 정적 export라 서버에서 테마를 알 수 없다. 첫 페인트 전에 동기로 실행해야
// 라이트 화면이 번쩍인 뒤 다크로 바뀌는 현상이 없다.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
