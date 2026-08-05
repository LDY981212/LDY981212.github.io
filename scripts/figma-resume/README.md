# 이력서 Figma 플러그인

`npm run resume` 를 실행하면 PDF와 함께 `build/pdf/figma/` 에 Figma 플러그인이 만들어진다.
Figma는 밖에서 `.fig` 파일을 만들 수 없어서, Figma 안에서 실행하면 이력서를 통째로
그려 주는 플러그인 형태로 낸다. 결과물은 오토레이아웃 프레임과 실제 텍스트 레이어라
기존 Figma 이력서처럼 그대로 편집할 수 있다.

## 쓰는 법

1. `npm run resume`
2. Figma 데스크톱 앱에서 새 디자인 파일을 연다 (브라우저 버전은 개발 플러그인을 못 읽는다)
3. 메뉴 → **플러그인 → 개발 → 매니페스트에서 플러그인 가져오기…**
4. `build/pdf/figma/manifest.json` 선택
5. 메뉴 → 플러그인 → 개발 → **이력서 - 이도엽** 실행

A4(595×842) 페이지 프레임이 가로로 나열되고, 내용이 넘치면 자동으로 다음 장으로 넘어간다.

## 고칠 때

- **내용** (경력·프로젝트·성과 문단): `scripts/build-resume-pdf.mjs`
  → PDF와 Figma가 같은 데이터를 쓰므로 한 번만 고치면 둘 다 반영된다.
- **레이아웃·색·글자 크기**: `scripts/figma-resume/plugin-template.js`

## 알아 둘 점

- 폰트는 Pretendard → Noto Sans KR → Apple SD Gothic Neo → Inter 순으로 찾아 쓴다.
  Figma에 설치된 첫 번째 것을 고르고, 실행 후 알림에 어떤 폰트를 썼는지 표시된다.
- 프로필 사진은 넣을 방법이 없어 회색 사각형(`PHOTO — 사진으로 교체하세요`)으로 둔다.
  Figma에서 이미지를 그 위에 끌어다 놓으면 된다.
- `layoutSizingHorizontal` 은 오토레이아웃 부모에 붙인 뒤에만 지정할 수 있다.
  그래서 붙이기와 크기 지정을 `add(parent, node, sizing)` 하나로 묶어 두었다.
