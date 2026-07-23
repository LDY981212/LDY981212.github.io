import type { Metadata } from "next";
import "../styles/globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "LDY's Portfolio",
  description: "프론트엔드 개발자 이도엽 포트폴리오입니다.",
  icons: {
    icon: "/favicon.ico",
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
