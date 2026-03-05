/**
 * 국방 AI(AI+IT) 뉴스레터 아카이브 설정 파일
 *
 * 새 뉴스레터 추가 방법:
 * 1. data/ 폴더에 newsletter-{호수}.js 파일 생성
 * 2. 아래 NEWSLETTER_FILES 배열 맨 앞에 파일 경로 추가
 *    (최신 호수가 배열 앞에 오도록 내림차순 정렬)
 */
window.NEWSLETTER_CONFIG = {
  // 로드할 뉴스레터 파일 목록 (최신 순으로 정렬)
  files: [
    "data/newsletter-42.js",
    "data/newsletter-41.js",
    // "data/newsletter-40.js",
    "data/newsletter-10.js",
    "data/newsletter-9.js",
    "data/newsletter-8.js",
    "data/newsletter-7.js",
    "data/newsletter-6.js",
    "data/newsletter-5.js",
    "data/newsletter-4.js",
    "data/newsletter-3.js",
    "data/newsletter-2.js",
    "data/newsletter-1.js",
  ],

  // 사이트 정보
  siteTitle: "국방 AI(AI+IT) 뉴스레터 아카이브",
  siteSubtitle: "매주 국방 AI 및 정보기술 관련 기사 검색 데이터베이스",
  author: "Seungbae Sim (Crayon) with ChatGPT + Gemini + Claude + Perplexity",
};
