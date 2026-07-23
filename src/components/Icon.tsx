import type { SVGProps } from "react";

/**
 * 사이트 전체가 쓰는 단일 아이콘 세트.
 *
 * 기존에는 SVG 파일 7개와 PNG 3개가 섞여 있어서 획 굵기와 채색 방식이 제각각이고,
 * 색이 파일에 박혀 있어 다크 모드에서 어두워졌다. 전부 currentColor를 쓰는
 * 인라인 스트로크 아이콘으로 통일하면 테마와 크기를 부모가 정할 수 있다.
 */
const paths: Record<string, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  cake: (
    <>
      <path d="M12 5.5V4m0 1.5c-.7-.9-.4-1.9.4-2.5" />
      <path d="M4 20h16" />
      <path d="M5 20v-5.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V20" />
      <path d="M5 16c1.2 0 1.2 1.2 2.3 1.2S8.6 16 9.8 16s1.2 1.2 2.3 1.2S13.4 16 14.6 16s1.2 1.2 2.3 1.2S18.1 16 19 16" />
      <path d="M9 12.5v-2M15 12.5v-2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 7.1 5.3a2 2 0 0 0 2.2 0L20.2 7" />
    </>
  ),
  school: (
    <>
      <path d="m12 3.5 9 4.5-9 4.5L3 8l9-4.5Z" />
      <path d="M6.5 10.2V15c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.8" />
      <path d="M21 8v5" />
    </>
  ),
  github: (
    <path d="M9.2 20.5v-2.6c-2.9.6-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.2.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.6 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 2v3.5" />
  ),
  code: (
    <>
      <path d="m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.5h18M9.5 9.5v10" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6 1.2A3.6 3.6 0 0 1 17 18.5Z" />
      <path d="M12 15.5v-4m0 0-1.6 1.6M12 11.5l1.6 1.6" />
    </>
  ),
  wrench: (
    <path d="M15.5 3.5a5 5 0 0 0-4.4 7.3l-7 7a1.8 1.8 0 0 0 2.6 2.6l7-7A5 5 0 0 0 20 6.6l-2.7 2.7-2.6-2.6L17.4 4a5 5 0 0 0-1.9-.5Z" />
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V6M17 20v-9" />
    </>
  ),
  bug: (
    <>
      <rect x="8" y="7.5" width="8" height="11" rx="4" />
      <path d="M8 12H4.5M16 12H19.5M8.5 8.5 6 6M15.5 8.5 18 6M8.5 17 6 19.5M15.5 17 18 19.5" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m10.5 9 4.5 3-4.5 3V9Z" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  arrowUp: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
  arrowDown: <path d="M12 5v14m0 0 6-6m-6 6-6-6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10.5 13.5" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
};

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | string;
}

export default function Icon({ name, size = "1em", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
