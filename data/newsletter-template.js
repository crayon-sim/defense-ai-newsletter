/**
 * ============================================================
 * 새 뉴스레터 추가 템플릿
 * ============================================================
 * 사용 방법:
 * 1. 이 파일을 복사해 data/newsletter-{호수}.js 로 저장
 *    예: data/newsletter-43.js
 * 2. 아래 데이터를 실제 내용으로 채움
 * 3. config.js의 files 배열 맨 앞에 새 파일 경로 추가
 *    예: "data/newsletter-43.js",
 * ============================================================
 */
(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 43,                          // ← 호수 번호
    title: "국방 AI(AI+IT) 뉴스레터 제43호",
    period: "2026. 3. 1. ~ 7.",      // ← 해당 주의 기간
    date: "2026-03-07",              // ← 발행일 (YYYY-MM-DD)
    articles: [

      // ──── 기사 1 ────
      {
        id: "43-1",                  // ← "{호수}-{순번}" 형식
        newsletter_id: 43,           // ← 호수 번호
        topic_en: "DoW - Example",   // ← 영문 주제(키워드) — 표지 왼쪽 열
        topic_kr: "예시 주제",        // ← 한국어 주제 설명
        title: "Article title in English",  // ← 기사 원제
        title_kr: "기사 한국어 제목",         // ← 한국어 제목
        source: "Defense One",       // ← 출처 (Defense One / MeriTalk / Federal News Network 등)
        url: "https://www.defenseone.com/article-url",  // ← 실제 기사 URL (없으면 "")
        keywords: ["키워드1", "키워드2", "키워드3"],  // ← 3~7개 권장
        summary: "200자 내외 한국어 요약 텍스트를 여기에 작성합니다. 기사의 핵심 내용과 전략적 함의를 간결하게 서술합니다.",
        date: "2026-03-05"           // ← 기사 날짜 (YYYY-MM-DD)
      },

      // ──── 기사 2 ────
      {
        id: "43-2",
        newsletter_id: 43,
        topic_en: "USAF - CCA",
        topic_kr: "미 공군의 무인협업전투기(CCA)",
        title: "Second article title",
        title_kr: "두 번째 기사 제목",
        source: "MeriTalk",
        url: "",
        keywords: ["CCA", "공군", "무인기"],
        summary: "두 번째 기사 요약 내용.",
        date: "2026-03-03"
      },

      // 이하 기사 추가...

    ]
  });
})();
