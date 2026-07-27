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

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
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
