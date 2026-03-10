(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 21,
    title: "국방 AI(AI+IT) 뉴스레터 제21호",
    period: "2025. 9. 28. ~ 10. 4.",
    date: "2025-10-04",
    articles: [
      {
        id: "21-1",
        newsletter_id: 21,
        topic_en: "Military AI Guardrails",
        topic_kr: "군사적 AI 안전장치",
        title: "Military AI needs guardrails—not to slow it down, but to keep it useful",
        title_kr: "군사 AI에는 가드레일이 필요하다 — 속도를 늦추기 위한 것이 아니라 유용성을 유지하기 위해",
        source: "Defense One",
        url: "https://www.defenseone.com/ideas/2025/09/military-ai-needs-guardrailsnot-slow-it-down-keep-it-useful/408452/",
        keywords: ["AI 가드레일", "군사 AI", "안전장치", "Volt Typhoon", "내부 위협"],
        summary: "상업용 AI의 가드레일을 단순히 제거하는 것이 아니라, 군사적 맥락에 맞는 새로운 안전장치 설계가 필요하다. 외부 해커(중국 Volt Typhoon 등)뿐 아니라 AI를 악용할 수 있는 내부 불만 세력도 위협이며, 트럼프 행정부가 AI 책임을 R&D 부문으로 이관한 것은 속도와 안전의 균형을 맞추는 적절한 조치로 평가된다.",
        date: "2025-09-29"
      },
      {
        id: "21-2",
        newsletter_id: 21,
        topic_en: "U.S. Army - Ivy Sting 1",
        topic_kr: "미 육군의 NGC2 실험",
        title: "In NGC2 first, Army uses beta artillery data tool in howitzer strike at Ivy Sting 1",
        title_kr: "NGC2 최초 사례: 육군, Ivy Sting 1 훈련에서 베타 포병 데이터 툴(AXS) 활용",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2025/10/in-ngc2-first-army-uses-beta-artillery-data-tool-in-howitzer-strike-at-ivy-sting-1/",
        keywords: ["NGC2", "AXS", "Ivy Sting", "포병 데이터", "지휘통제"],
        summary: "포트 카슨의 4사단이 M777A2 곡사포로 NGC2 생태계의 신규 앱인 Artillery Execution Suite(AXS) 베타 버전을 활용해 실시간 타격을 시연했다. AXS는 기존 AFATDS를 대체하는 통합 C2 플랫폼으로, 부대가 자리를 잡기 전부터 사격 통신이 가능할 정도로 반응 속도를 향상시켰다.",
        date: "2025-10-02"
      },
      {
        id: "21-3",
        newsletter_id: 21,
        topic_en: "U.S. Army - NGC2 Cybersecurity",
        topic_kr: "미 육군 NGC2의 사이버보안 결함",
        title: "Army says it's mitigated 'critical' cybersecurity deficiencies in early NGC2 prototype",
        title_kr: "육군, NGC2 초기 프로토타입의 심각한 사이버보안 결함 약 3주 내 완화",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2025/10/army-says-its-mitigated-critical-cybersecurity-deficiencies-in-early-ngc2-prototype/",
        keywords: ["NGC2", "사이버보안", "RBAC", "제로 트러스트", "Palantir"],
        summary: "NGC2 초기 프로토타입에서 역할 기반 접근 통제 부재, Palantir 앱의 코드 취약성(최대 200개 이상), 거버넌스 미흡 등 심각한 사이버보안 결함이 발견됐다. 육군은 약 3주 내에 완화 조치를 완료했으며, 초기 설계 단계부터 보안을 내재화하겠다는 입장을 밝혔다.",
        date: "2025-10-01"
      },
      {
        id: "21-4",
        newsletter_id: 21,
        topic_en: "DARPA - AI Security",
        topic_kr: "AI 보안 취약점",
        title: "DARPA Official Highlights AI Security Gaps",
        title_kr: "DARPA 관계자, AI의 새로운 보안 취약점 경고",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/darpa-official-highlights-ai-security-gaps/",
        keywords: ["DARPA", "AI 보안", "적대적 공격", "역공학", "Constellation"],
        summary: "DARPA 매튜 투렉 부국장은 AI가 적대적 공격, 모델 역공학, 학습 데이터셋 무결성 문제 등 기존 소프트웨어를 넘어서는 새로운 보안 위협을 초래한다고 경고했다. DARPA는 사이버사령부와 협력하는 Constellation 프로그램과 AI Cyber Challenge를 통해 정부·민간 협력 기반의 안전한 AI 채택을 추진 중이다.",
        date: "2025-09-30"
      },
      {
        id: "21-5",
        newsletter_id: 21,
        topic_en: "VA - AI Adoption Strategy",
        topic_kr: "미 보훈부의 AI 전략",
        title: "VA Plans Gradual AI Rollout in Federal EHR",
        title_kr: "미 보훈부, 연방 전자건강기록(EHR)에 AI 단계적 도입 계획",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/va-plans-gradual-ai-rollout-in-federal-ehr/",
        keywords: ["VA", "EHR", "AI 전략", "앰비언트 스크라이브", "이중 경로"],
        summary: "미 보훈부는 AI 전략을 업데이트하며 검증된 AI 도구만 연방 EHR에 단계적으로 통합하는 이중 경로(조기 실험 + 표준화) 방식을 채택했다. 2024년 AI 활용 사례가 전년 대비 100건 이상 증가했으며, 대표 사례로 NLP 기반 앰비언트 스크라이브 도구가 의사 행정 부담을 절감하고 있다.",
        date: "2025-09-30"
      },
      {
        id: "21-6",
        newsletter_id: 21,
        topic_en: "DoS - AI Strategy",
        topic_kr: "미 국무부의 AI 전략",
        title: "State Department Unveils AI Strategy to Modernize Diplomacy",
        title_kr: "미 국무부, 외교 현대화를 위한 AI 전략 공개",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/state-department-unveils-ai-strategy-to-modernize-diplomacy/",
        keywords: ["국무부", "AI.State", "StateChat", "에이전틱 AI", "제로 트러스트"],
        summary: "미 국무부는 AI 자원 저장소 AI.State, 생성형 AI 챗봇 StateChat, 에이전틱 AI 기반 행정·위기대응 자동화 등을 포함한 AI 전략을 발표했다. 멀티클라우드·제로 트러스트 인프라와 AI 위험 등록부를 구축하며, 1,400개 이상의 데이터 자산을 공유하는 Data.State 플랫폼으로 부처 간 협력을 강화한다.",
        date: "2025-09-30"
      },
      {
        id: "21-7",
        newsletter_id: 21,
        topic_en: "GAO - Contract Data Reporting",
        topic_kr: "계약 데이터 보고 감사결과",
        title: "GAO: Half of Federal Agencies Fall Short on Contract Data Reporting",
        title_kr: "GAO: 연방 기관 절반, FPDS 계약 데이터 보고 기준 미달",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/gao-half-of-federal-agencies-fall-short-on-contract-data-reporting/",
        keywords: ["GAO", "FPDS", "계약 데이터", "투명성", "OMB"],
        summary: "GAO는 FPDS에 계약 지출을 보고한 70개 연방 기관 중 36개만이 데이터 품질 보고서를 완료했으며, CFO법 대상 24개 기관 중 OMB 요건을 전부 충족한 곳은 없다고 밝혔다. HHS, VA, 해군이 시정조치계획을 미비한 것으로 지적됐으며, GAO는 OMB·GSA 등에 총 12개 권고 사항을 제시했다.",
        date: "2025-09-25"
      },
      {
        id: "21-8",
        newsletter_id: 21,
        topic_en: "CAISI - AI Model Evaluation (MeriTalk)",
        topic_kr: "NIST CAISI의 AI 모델 평가",
        title: "CAISI Report Finds American AI Dominates, DeepSeek Lags",
        title_kr: "CAISI 보고서: 미국 AI 우세, DeepSeek 성능·보안·비용 모두 뒤처져",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/caisi-report-finds-american-ai-dominates-deepseek-lags/",
        keywords: ["CAISI", "DeepSeek", "AI 벤치마크", "탈옥 공격", "CCP 편향"],
        summary: "NIST CAISI가 19개 벤치마크에서 DeepSeek을 미국 AI 모델(GPT-5, Claude Opus 4 등)과 비교한 결과, 미국 모델이 성능·비용 효율·보안 모든 면에서 우위를 보였다. DeepSeek은 탈옥 공격에 최대 94% 응답한 반면 미국 모델은 8% 수준이며, CCP 내러티브를 미국 모델 대비 4배 더 자주 반영하는 것으로 나타났다.",
        date: "2025-09-30"
      },
      {
        id: "21-9",
        newsletter_id: 21,
        topic_en: "CAISI - AI Model Evaluation (NIST)",
        topic_kr: "NIST CAISI DeepSeek 평가 원문",
        title: "CAISI Evaluation of DeepSeek AI Models Finds Shortcomings and Risks",
        title_kr: "NIST CAISI, DeepSeek AI 모델 평가: 결함과 위험 발견",
        source: "NIST",
        url: "https://www.nist.gov/news-events/news/2025/09/caisi-evaluation-deepseek-ai-models-finds-shortcomings-and-risks",
        keywords: ["NIST", "CAISI", "DeepSeek", "AI 안전성", "모델 평가"],
        summary: "NIST CAISI가 DeepSeek의 R1, V3.1 등 모델을 평가한 공식 결과 발표로, 소프트웨어 공학·사이버보안 영역에서의 성능 격차, 운영 비용 비효율, 탈옥 공격 취약성, 중국 정부 내러티브 편향 등 다각적 위험 요소를 확인했다.",
        date: "2025-09-30"
      },
      {
        id: "21-10",
        newsletter_id: 21,
        topic_en: "NATO - Counter-Drone",
        topic_kr: "NATO의 대드론 전략",
        title: "NATO needs accelerated counter-drone tech to fend off Russian incursions: Official",
        title_kr: "NATO, 러시아 드론 침범 대응 위해 C-UAS 기술 신속 배치 촉구",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2025/09/nato-needs-accelerated-counter-drone-tech-to-fend-off-russian-incursions-official/",
        keywords: ["NATO", "C-UAS", "대드론", "Eastern Sentry", "러시아 드론"],
        summary: "NATO 연합군합동사령부 사령관은 대드론 체계를 수년이 아닌 수개월 내에 배치해야 한다고 강조하며, 수천 달러짜리 드론을 백만 달러 미사일로 격추하는 비효율을 지적했다. 폴란드 상공 드론 침범 이후 Eastern Sentry 작전이 개시됐으며, NATO는 방공능력 400% 증강을 목표로 저비용 C-UAS 확보를 추진하고 있다.",
        date: "2025-09-29"
      },
      {
        id: "21-11",
        newsletter_id: 21,
        topic_en: "AI-guided Drone Threats",
        topic_kr: "드론 위협: AI의 역할",
        title: "AI will make drone threats a nightmare ‒ it could also save us",
        title_kr: "AI가 드론 위협을 악몽으로 만들 것이다 — 동시에 우리를 구할 수도 있다",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2025/09/ai-will-make-drone-threats-a-nightmare-it-could-also-save-us/",
        keywords: ["AI 드론 방어", "Sanctum", "록히드 마틴", "C-UAS", "드론 군집"],
        summary: "AI/머신러닝은 복잡한 전자기 환경에서 드론 신호를 식별하고, 군집 공격 시 우선순위 기반 대응 전략을 실시간으로 제시할 수 있다. 록히드 마틴의 Sanctum C-UAS 체계는 개방형 아키텍처로 다양한 센서·무기 시스템과 통합 가능하며, AI 기반 탐지·추적·타겟팅 기능을 실증하고 있다.",
        date: "2025-09-29"
      }
    ]
  });
})();
