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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
