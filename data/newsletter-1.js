// 국방 AI(AI+IT) 뉴스레터 제1호 데이터
(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 1,
    title: "국방 AI(AI+IT) 뉴스레터 제1호",
    period: "2025. 5. 11. ~ 17.",
    date: "2025-05-17",
    articles: [
      {
        id: "1-1",
        newsletter_id: 1,
        topic_en: "CEO, CIO, CAIO - AI Savviness",
        topic_kr: "CEO·CIO·CAIO의 AI 전문성",
        title: "Most CEOs think their CIOs lack AI savviness",
        title_kr: "대부분의 CEO, CIO의 AI 전문성에 의문 제기",
        source: "CIO",
        url: "https://www.cio.com/article/3984507/most-ceos-think-their-cios-lack-ai-savviness.html",
        keywords: ["AI 역량", "CIO", "CAIO", "Gartner", "C-레벨", "디지털 전환"],
        summary: "Gartner 조사 결과, CEO의 44%만이 자사 CIO가 AI 요구를 충족할 만큼 충분한 AI 전문성을 갖추고 있다고 응답했다. CEO들은 AI를 단순한 IT 도구가 아닌 조직 혁신의 핵심 기술로 인식하는 반면, CIO들은 데이터 품질·보안·비용·규제 준수 등 현실적 제약을 더 잘 이해하고 있어 인식 차이가 발생하고 있다.",
        date: "2025-05-15"
      },
      {
        id: "1-2",
        newsletter_id: 1,
        topic_en: "DoD - SWFT (Software Fast Track)",
        topic_kr: "국방부의 소프트웨어 패스트 트랙(SWFT)",
        title: "DoD Takes First Steps in Launching SWFT Initiative",
        title_kr: "국방부, 소프트웨어 패스트 트랙(SWFT) 이니셔티브 첫 걸음",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/dod-takes-first-steps-in-launching-swft-initiative/",
        keywords: ["SWFT", "소프트웨어 획득", "DoD CIO", "ATO", "사이버보안", "SBOM"],
        summary: "미국 국방부가 소프트웨어 패스트 트랙(SWFT) 이니셔티브의 초기 단계를 시작했다. DoD CIO실이 주도하며 90일 집중 개발 기간을 통해 프레임워크를 수립하고 2025년 6월 1일 공식 출범 예정이다. 소프트웨어를 12개 위험 특성으로 평가하고 AI 도구가 백엔드에서 자동으로 분석하여 디지털 ATO 승인 절차를 간소화한다.",
        date: "2025-05-14"
      },
      {
        id: "1-3",
        newsletter_id: 1,
        topic_en: "DoD - XaaS (Anything-as-a-Service)",
        topic_kr: "국방부의 서비스형 모든 것(XaaS)",
        title: "Pentagon to Implement 'Anything-as-a-Service' Pilot Program",
        title_kr: "국방부, 'Anything-as-a-Service' 파일럿 프로그램 시행 예정",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/pentagon-to-implement-anything-as-a-service-pilot-program/",
        keywords: ["XaaS", "SaaS", "DaaS", "조달", "NDAA", "클라우드", "디지털 전환"],
        summary: "미국 국방부가 FY2024 NDAA에 의해 의무화된 XaaS 파일럿 프로그램을 시행한다. SaaS·DaaS·우주 서비스 등 소비 기반 솔루션을 통해 실시간으로 역량에 접근하고 신기술을 신속히 통합하는 것이 목표다. 기존 복잡한 조달 절차를 간소화하고 승인된 계약은 일부 가격 데이터 및 경쟁 규정 면제 혜택을 받는다.",
        date: "2025-05-12"
      },
      {
        id: "1-4",
        newsletter_id: 1,
        topic_en: "U.S. Army - Enterprise LLM Workspace",
        topic_kr: "미 육군의 엔터프라이즈 LLM 워크스페이스",
        title: "Army launches Army Enterprise LLM Workspace, the revolutionary AI platform that wrote this article",
        title_kr: "육군, Army Enterprise LLM Workspace 출시 — 이 기사를 작성한 혁신적 AI 플랫폼",
        source: "U.S. Army",
        url: "https://www.army.mil/article/285537/army_launches_army_enterprise_llm_workspace_the_revolutionary_ai_platform_that_wrote_this_article",
        keywords: ["LLM", "생성형 AI", "육군", "Ask Sage", "GenAI", "CUI", "SaaS"],
        summary: "미 육군이 'Army Enterprise LLM Workspace' 생성형 AI 플랫폼을 공식 출시했다. Ask Sage 기반으로 Azure OpenAI Gov, AWS Bedrock Gov, Google Gemini 등과 통합되어 있으며 CUI 인증을 획득했다. 인사 직무 설명서 30만 건을 일주일 만에 재분류(사람이 하면 5.7년 소요)하는 등 실제 업무에 적용되고 있으며, 30일 무료 체험 후 토큰 기반 구독으로 운영된다.",
        date: "2025-05-15"
      },
      {
        id: "1-5",
        newsletter_id: 1,
        topic_en: "U.S. Navy - DON GPT",
        topic_kr: "미 해군의 DON GPT",
        title: "Department of the Navy Deploys 'DON GPT' in Flank Speed",
        title_kr: "해군성, Flank Speed에 'DON GPT' 배치",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/department-of-the-navy-deploys-don-gpt-in-flank-speed/",
        keywords: ["DON GPT", "해군", "Flank Speed", "생성형 AI", "Azure OpenAI", "IL5"],
        summary: "미 해군성이 자체 개발한 생성형 AI 도구 'DON GPT'를 클라우드 협업 플랫폼 Flank Speed(IL5)에 배치했다. Microsoft Azure OpenAI 기반으로 IL5 보안 수준을 갖추며 IL6로 확장 가능하다. 해군과 해병대 68만 명 이상의 인력이 문서 작성, 데이터 분석, 질의응답 등 일상 업무에 활용할 수 있다.",
        date: "2025-05-14"
      },
      {
        id: "1-6",
        newsletter_id: 1,
        topic_en: "U.S. Air Force - F-47 + CCA",
        topic_kr: "미 공군의 F-47 및 협업전투기(CCA)",
        title: "Air Force Reveals Range and Inventory Goals for F-47, CCAs",
        title_kr: "공군, F-47 및 CCA 작전 반경·도입 목표 공개",
        source: "Air & Space Forces Magazine",
        url: "https://www.airandspaceforces.com/air-force-reveals-range-and-inventory-goals-for-f-47-ccas/",
        keywords: ["F-47", "CCA", "NGAD", "공군", "유무인 협업", "스텔스", "보잉"],
        summary: "미국 공군이 차세대 전투기 F-47의 작전 반경(1,000해리 이상, F-22의 약 2배)과 도입 목표(185기 이상)를 공개했다. F-47은 F-22를 대체할 6세대 유인 전투기로 보잉이 개발하며 Stealth++ 등급이다. 함께 운용될 협업 전투기(CCA)는 700해리 이상의 작전 반경을 가지며 1,000기 이상 도입 예정으로, YFQ-42A와 YFQ-44A 두 기종이 개발 중이다.",
        date: "2025-05-15"
      }
    ]
  });
})();
