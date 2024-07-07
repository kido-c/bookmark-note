# 나만의 북마크 관리를 위한 나의 서비스, Bookmark-Note

> **북마크 등록을 위한 구글 확장 프로그램 설치**
>
> [Bookmark-Note Extension](https://chromewebstore.google.com/detail/bookmark-note/jmaccghdoemejhfpdlgojbbglpnippkn?hl=ko&utm_source=ext_sidebar)
>
> **배포 링크**  
> [Bookmark-Note](http://ec2-3-36-48-175.ap-northeast-2.compute.amazonaws.com/)

## 목차

- [나만의 북마크 관리를 위한 나의 서비스, Bookmark-Note](#나만의-북마크-관리를-위한-나의-서비스-bookmark-note)
  - [목차](#목차)
  - [소개 : Bookmark-Note는 다음과 같은 목적으로 탄생습니다.](#소개--bookmark-note는-다음과-같은-목적으로-탄생습니다)
  - [주요 기능](#주요-기능)
  - [설치 방법](#설치-방법)
  - [Comming Soon!](#comming-soon)

## 소개 : Bookmark-Note는 다음과 같은 목적으로 탄생습니다.

> 기존 브라우저 북마크의 제한적인 북마크관리에서 좀 더 많은 정보를 가진 북마크 관리를 하기 위함입니다.  
> 단순히 링크를 복사해서 등록하는 것이 아닌 확장프로그램을 통해 사용성이 높은 북마크 관리를 할 수 있습니다.

<image src="./doc/image/확장프로그램캡쳐.png" width='500' >
<image src="./doc/image/북마크캡쳐.png" width='500'>
<image src="./doc/image/북마크어플리케이션캡쳐.png" width='1000' >

## 주요 기능

- 북마크를 `확장프로그램`을 통해 간단히 저장할 수 있습니다.
- 카테고리별로 북마크 정리할 수 있습니다.
- 북마크의 내용을 간단히 등록 / 수정할 수 있습니다.
- 해당 페이지를 접근하지 않고 어플리케이션 `내부 브라우저(iframe)`로 직 / 간접적으로 페이지의 내용을 확인할 수 있습니다.
- 해당 북마크를 공유했을 때 나타나는 `OG Image`를 미리 확인할 수 있습니다.

## 설치 방법

로컬에서 북마크 어플리케이션을 설치하고 실행하려면 다음 단계를 따르세요:

1. **레포지토리 복제:**

   ```sh
   git clone https://github.com/kido-c/bookmark-note.git
   ```

2. **의존성 설치:**

   ```sh
   npm install
   ```

3. **어플리케이션 시작:**

   ```sh
   npm run build
   npm run dev

   ! prisma를 통해 환경에 따른 DB연결이 동시에 진행됩니다.
   ```

## Comming Soon!

> 추후 진행될 추가 기능들 입니다.

- [ ] 기존의 북마크를 파일형태로 업로드 할 수 있는 기능을 구현합니다.
- [ ] 카테고리 or 태그를 통해 북마크를 검색할 수 있습니다.
- [ ] 크롬 브라우저에 북마크를 다시 등록할 수 있도록 파일형태의 북마크 export 기능을 구현합니다.
- [ ] 드래그앤 드랍으로 간편하게 카테고리를 변경할 수 있는 기능을 구현합니다.
- [ ] 초기 유저를 위한 온보딩 튜토리얼 UI를 구현합니다.
