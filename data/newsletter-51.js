(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 51,
    title: "국방 AI(AI+IT) 뉴스레터 제51호",
    period: "2026. 4. 26. ~ 5. 2.",
    date: "2026-05-02",
    key_theme: "이란 전쟁 60일 $25B · DoD 빅테크 8사 기밀망 계약·Anthropic 배제 · 백악관 Anthropic 허용 가이던스",
    insights: [
      {
        color: "#f87171",
        title: "💣 Operation Epic Fury 60일 $25B — 호르무즈 봉쇄·정밀무기 고갈",
        body: "공식 $25B, 실제 추정 $40-50B(CNN)~$67B(비용 추적기). 탄약·정밀유도무기에 '대부분' 소진, 일부 표적에 재래식 폭탄 전환. MQ-9 24대 손실($720M+). 9개 미군 기지 피격, 요르단 THAAD 레이더 파괴. 호르무즈 봉쇄로 휘발유 갤런당 $8 돌파. 이란 탄도미사일 비축 절반 잔존"
      },
      {
        color: "#fbbf24",
        title: "🤖 GenAI.mil Gemini 3.1 Pro 추가 · 130만 명 사용·10만+ 에이전트",
        body: "출시 8주 만에 GenAI.mil 통합. 활성 사용자 130만 명(최대 300만 명 권한 보유). 바이브 코딩으로 10만+ AI 에이전트 자체 구축. 해군모집 DB 구축 수년→3개월, 연 10주 노동력 절감. DLA 연구소장 SOW 초안 수주→수시간, 100만 달러 예산 확보"
      },
      {
        color: "#34d399",
        title: "🔐 DoD, 빅테크 8사 IL6/IL7 기밀망 AI 풀스택 계약 — Anthropic 배제",
        body: "SpaceX·OpenAI·Google·NVIDIA·Reflection·Microsoft·AWS·Oracle과 일괄 계약(2026.5.1). 클라우드·GPU·위성통신·프런티어 모델 풀스택 구조. Anthropic 완전 배제. DoD CTO는 Mythos를 '국가안보의 분수령'이라면서 공급망 위험 지정 유지. Anthropic은 소송 2건 제기"
      },
      {
        color: "#818cf8",
        title: "⚖️ 백악관, Anthropic 연방 사용 허용 가이던스 초안 작성",
        body: "supply chain risk 우회 허용 가이던스 + AI 행정명령 초안 병행. Mythos 연방 배포 핵심. Amodei CEO-Wiles 비서실장·Bessent 재무장관 회동, Trump 'shaping up' 언급. 그러나 자율무기·대량감시 red line 유지 전망. 백악관은 Mythos 70개사 추가 확대엔 오히려 반대"
      },
      {
        color: "#60a5fa",
        title: "🚁 SOCOM '전 수준' AI 자율성 + MQ-9 드론 모선화 $75.8M",
        body: "SOCOM 사령관 Bradley, SASC 청문: 전장 감지·적 감시·폭력 투사 3대 기능에 AI 자율성 통합. MQ-9→공중 C2 노드 전환, FY2027 $75.8M(3배 증액). Group 2·3 드론 93+10대, swarm carrier pod 16기 조달. Armed Overwatch 75→53대 축소, 유인→무인 포트폴리오 재편"
      }
    ],
    articles: [
      {
        id: "51-1",
        newsletter_id: 51,
        topic_en: "Pentagon - Spending on Iran War",
        topic_kr: "미 국방부의 이란 전쟁 지출",
        title: "Sixty days in, Pentagon estimates $25B spent on Iran war",
        title_kr: "미 국방부, 對이란 전쟁 60일간 $250억 지출… 보충예산 요청 예고",
        source: "Defense One",
        url: "https://www.defenseone.com/policy/2026/04/sixty-days-pentagon-estimates-25b-spent-iran-war/413208/",
        keywords: ["Operation Epic Fury", "이란 전쟁", "$25B", "보충예산", "호르무즈", "정밀무기 고갈", "Jules Hurst", "HASC"],
        summary: "Operation Epic Fury 60일차 HASC 청문에서 감사관 Jules Hurst, $25B 지출 공식 증언. '대부분'이 탄약·정밀유도무기 소진. CNN 복수 소식통: 기지 피해 복구비 미포함 시 실제 $40-50B 근접. Tomahawk 교체단가 $2M→$3-3.5M, Patriot 인터셉터 $1-2M→$4-5M으로 급등(Bilmes). 9개 미군 기지 피격, 요르단 THAAD 레이더 파괴. 호르무즈 봉쇄로 휘발유 갤런당 $8 돌파. Adam Smith 의원: '목표 달성 계획 없다' 출구전략 부재 지적. 정밀무기 고갈로 일부 표적에 dumb bomb 전환.",
        date: "2026-04-28"
      },
      {
        id: "51-2",
        newsletter_id: 51,
        topic_en: "Pentagon - Spending on Iran War",
        topic_kr: "미 국방부의 이란 전쟁 지출",
        title: "Pentagon leaders place $25 billion price tag on Operation Epic Fury",
        title_kr: "Operation Epic Fury — Breaking Defense 추가 보도",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/04/pentagon-leaders-place-25-billon-price-tag-on-operation-epic-fury/",
        keywords: ["Operation Epic Fury", "$200B 보충예산", "MQ-9 손실", "FY2027", "War Powers Act", "호르무즈", "주독미군", "Maritime Freedom Construct"],
        summary: "Hurst 감사관, $200B 보충예산 추정치 '부정확' 부인. FY2027 $1.5조 = 기본 $1.15T + Reconciliation $350B 구조. MQ-9 Reaper 24대 손실(CBS 보도, 대당 $30M+ 기준 $720M+). ISR 자산 대규모 소모로 한반도 유사시 미군 ISR 가용성 영향. Trump, 주독미군 감축 시사. 'Maritime Freedom Construct' 다국적 연합체 동맹국 타진. War Powers Act 60일 시한 '휴전 중 정지' 주장. 이란 탄도미사일 비축 절반 잔존. 실제 비용 추정: $25B(공식)→$67B(비용 추적기)→$1조(장기 누적 분석).",
        date: "2026-04-28"
      },
      {
        id: "51-3",
        newsletter_id: 51,
        topic_en: "Pentagon - GenAI.mil",
        topic_kr: "미 국방부의 GenAI.mil 활용 현황",
        title: "Pentagon adds Google's latest model to GenAI.mil as usage soars",
        title_kr: "Pentagon, GenAI.mil에 Google Gemini 3.1 Pro 추가… 사용자 130만 명 돌파",
        source: "Defense One",
        url: "https://www.defenseone.com/defense-systems/2026/04/pentagon-adds-googles-latest-model-genaimil-usage-soars/413126/",
        keywords: ["GenAI.mil", "Gemini 3.1 Pro", "Google Cloud", "IL5", "에이전틱 AI", "CDAO", "바이브 코딩", "해군모집사령부"],
        summary: "DoD GenAI.mil에 Google Gemini 3.1 Pro 공식 통합. 출시 8주 만에 제공. 활성 사용자 130만 명(최대 300만 명 권한), 1개월 만에 100만 명 확보. IL5 환경 운용. 바이브 코딩으로 10만+ AI 에이전트 자체 구축, 모두 ATO IL5 승인. 해군모집사령부: DB 구축 수년→3개월, 연 10주 노동력 절감. DLA 연구소장: SOW 초안 수주→수시간, $1M 예산 확보. CDO Kliger: '중국 통제적 협력 구조 vs 미국 자발적 협업 구조'. OpenAI·xAI 통합 계획에 이은 다중 벤더 기조.",
        date: "2026-04-29"
      },
      {
        id: "51-4",
        newsletter_id: 51,
        topic_en: "Pentagon - Classified Networks AI Agreements",
        topic_kr: "미 국방부의 기밀망 AI 통합 계약",
        title: "DOD Inks AI Deal With Major Tech Firms",
        title_kr: "美 국방부, 8개 빅테크와 기밀망 AI 통합 계약 체결 — Anthropic 배제 지속",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/dod-inks-ai-deal-with-major-tech-firms/",
        keywords: ["IL6", "IL7", "기밀망 AI", "SpaceX", "OpenAI", "NVIDIA", "Anthropic 배제", "Department of War"],
        summary: "DoD(전쟁부), 2026년 5월 1일 SpaceX·OpenAI·Google·NVIDIA·Reflection·Microsoft·AWS·Oracle 8사와 IL6(Secret)/IL7(Top Secret) 기밀망 AI 통합 일괄 계약. warfighting·intelligence·enterprise operations 3대 영역 적용. 클라우드·GPU·위성통신·프런티어 모델 풀스택 조달 구조. Anthropic 완전 배제: 대규모 국내 감시·완전자율무기 사용 거부로 공급망 위험 지정 유지. DoD CTO Emil Michael은 Mythos를 '국가안보의 분수령'이라 평가하면서 모순된 입장. Anthropic은 보복성 소송 2건 제기. 기밀망 배치 시점 미공개.",
        date: "2026-05-01"
      },
      {
        id: "51-5",
        newsletter_id: 51,
        topic_en: "SOCOM - AI & Autonomy",
        topic_kr: "미 특전사의 AI 및 자율화",
        title: "SOCOM adding AI, autonomy 'at every level,' commander says",
        title_kr: "SOCOM, '전 수준에서' AI·자율성 통합 가속 — Bradley 사령관 SASC 청문 증언",
        source: "Defense One",
        url: "https://www.defenseone.com/technology/2026/04/socom-adding-ai-autonomy-every-level-commander-says/413186/",
        keywords: ["SOCOM", "Frank Bradley", "AI 자율성", "Maven Smart System", "Beacon AI", "SOF Renaissance", "비대칭전", "소모형 드론"],
        summary: "SOCOM 사령관 Adm. Frank Bradley, SASC 청문: AI·자율성이 '모든 수준'에서 통합 중. 핵심 기능: 전장 감지·적 지속 감시·폭력 투사. Beacon AI와 4년 $49.5M 조종사 보조 시스템 계약. Maven Smart System 조기 도입 기준점. 비국가 행위자·스타트업·우크라이나군 등 소규모 조직이 AI 투자수익률 우위. SOCOM은 고비용 플랫폼에 묶인 해군 대비 신기술 통합 용이. 신규 RFP: 해양 자율성·인적 성능·C2·확장 가능한 효과 4대 영역. 우크라이나 SOF와 양방향 학습 관계 인정.",
        date: "2026-04-28"
      },
      {
        id: "51-6",
        newsletter_id: 51,
        topic_en: "SOCOM - MQ-9 Drone Mothership",
        topic_kr: "미 특전사의 드론 모선화 추진",
        title: "SOCOM Plans MQ-9 Drone Mothership as Armed Overwatch Fleet Shrinks",
        title_kr: "美 SOCOM, MQ-9 Reaper '드론 모선(Mothership)'화 추진",
        source: "The Defense Post",
        url: "https://thedefensepost.com/2026/04/30/socom-mq-9-drone/",
        keywords: ["MQ-9 드론 모선", "SOCOM", "Armed Overwatch", "OA-1K", "Anduril", "swarm carrier pod", "Group 2/3 드론", "AFSOC"],
        summary: "SOCOM FY2027 예산에 MQ-9 드론 모선화 $75.8M 책정(FY2026 $24.9M 대비 3배+ 증액). MQ-9→공중 C2 노드로 역할 진화. FY2027 조달: Group 2 드론 93대·Group 3 드론 10대·swarm carrier pod 16기·지상통제 인터페이스 5조. Group 3는 스텔스 형상으로 SEAD 등 운동성 임무 투입 관측. 자드론 공급은 Anduril(ALTIUS-600)·AeroVironment(Switchblade 600) 등 비전통 방산기업 주도. 동시에 Armed Overwatch OA-1K Skyraider II 75→53대 축소: 분쟁공역에서 저속 유인기 생존성 한계 반영. 유인 저강도 자산→무인 고생존 자산 포트폴리오 재편 명확화.",
        date: "2026-04-30"
      },
      {
        id: "51-7",
        newsletter_id: 51,
        topic_en: "White House - AI Guardrails",
        topic_kr: "백악관의 Anthropic 지침",
        title: "White House is drafting plans to permit federal Anthropic use",
        title_kr: "백악관, Anthropic 연방정부 사용 허용 위한 가이던스 초안 작성",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/04/white-house-drafting-plans-permit-federal-anthropic-use/413202/",
        keywords: ["Anthropic", "공급망 위험 우회", "Mythos", "백악관 가이던스", "Dario Amodei", "Susie Wiles", "Project Glasswing", "red line"],
        summary: "백악관, 연방기관이 공급망 위험 지정을 우회해 Anthropic 도구를 사용할 수 있도록 하는 가이던스 초안 작성 중. Mythos 사이버 모델 연방 배포가 핵심. AI 행정명령 초안도 병행. Amodei CEO-Wiles 비서실장·Bessent 재무장관 회동, Trump 'shaping up'. Mythos 전략적 위상: 32단계 기업망 침투 완수, CTF 73% 해결, zero-day 자율 탐지. NSA 이미 기밀망 운용 중. 잔존 쟁점: Pentagon 분쟁 해소 불확실, 자율무기·감시 red line 유지 전망. 백악관은 Mythos 70개사 추가 확대 계획엔 반대 의사 전달.",
        date: "2026-04-29"
      },
      {
        id: "51-8",
        newsletter_id: 51,
        topic_en: "Federal CIO - AI Competency",
        topic_kr: "미 연방 CIO의 AI 기술 역량 강조",
        title: "Federal CIO Says AI, Tech Skills to Become Core Competencies for All Feds",
        title_kr: "미 연방 CIO, 'AI·기술역량을 全 연방 공무원의 핵심역량으로'",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/federal-cio-says-ai-tech-skills-to-become-core-competencies-for-all-feds/",
        keywords: ["Federal CIO", "Greg Barbaccia", "AI 핵심역량", "US Tech Force", "학위요건 폐지", "민관 순환 경력", "OPM", "Workday Federal Forum"],
        summary: "연방 CIO Greg Barbaccia, Workday Federal Forum: AI·기술역량을 모든 연방 공무원의 핵심역량으로 격상 공식 천명. '기술·AI 역량 없이는 전진 불가'. US Tech Force(OPM 2025년 12월 출범): 초기경력 기술인재를 2년 임기제로 연방 전반 배치. OPM, 일부 직위 학위요건 철폐로 기술인재 상위 직급 진입 가능화. 민관 이원적 경력관 탈피, 단기 정부 근무 후 민간 복귀 가능한 유연한 경력경로 모델 확산. AI·LLM 활용 인재에게 '워드프로세서만 응시하게 하는 환경은 채용·유지 부적절' 지적.",
        date: "2026-04-28"
      },
      {
        id: "51-9",
        newsletter_id: 51,
        topic_en: "GSA - OneGov",
        topic_kr: "GSA의 OneGov 1년 성과",
        title: "A year of OneGov: Over a billion in savings and still growing",
        title_kr: "미 GSA OneGov 이니셔티브 출범 1주년: 11억 달러 비용 절감과 연방 AI 조달 통합 가속화",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/ideas/2026/04/year-onegov-over-billion-savings-and-still-growing/413189/",
        keywords: ["OneGov", "GSA", "11억 달러 절감", "연방 IT 조달", "1달러 AI", "표준화 계약", "AI Action Plan", "Michael Lynch"],
        summary: "GSA, OneGov Initiative 출범 1주년 성과 발표(2026년 4월 29일): 납세자 11억 달러 절감 달성, 연말까지 15억 달러 전망. 16개 CFO Act 기관 등 70개 정부조직, 340만 명 사용자 참여. Microsoft·Adobe·Google·ServiceNow 등 20개 단일 통합 계약, 최대 90% 할인 확보. 일부 기관은 ChatGPT 등 AI 도구를 1달러에 도입. 사이버보안 표준화·행정 부담 경감 병행. 향후 6~9개월간 단기 거래의 장기·확장형 전환 발표 예정. AI Action Plan과 연동된 정부 전반 AI 채택 가속화 기제.",
        date: "2026-04-29"
      },
      {
        id: "51-10",
        newsletter_id: 51,
        topic_en: "GSA - OneGov",
        topic_kr: "GSA의 OneGov 1년 성과",
        title: "GSA's OneGov Initiative Saved $1.1B in First Year",
        title_kr: "GSA OneGov 이니셔티브, 첫해 11억 달러 절감 — MeriTalk 보도",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/gsas-onegov-initiative-saved-1-1b-in-first-year/",
        keywords: ["OneGov", "GSA", "Edward Forst", "Laura Stanton", "장기 확장형", "Anthropic", "OpenAI", "AI 인프라"],
        summary: "GSA Administrator Edward Forst·FAS 청장 직대 Laura Stanton·GSA 부청장 Michael Lynch 공식 발표. 1년차 11억 달러 절감, 연말 15억 달러 전망. OneGov 계약 참여 기업군: Anthropic·Google·Meta·Microsoft·OpenAI·Palo Alto Networks·ServiceNow·xAI 등. 단기 일괄거래에서 장기·확장형 프로그램으로 전환 단계 진입. 트럼프 행정부 조달 통합 행정명령 및 AI Action Plan 이행 핵심 수단. AI 인프라 확장·기관 협업 심화 중점 추진 예정.",
        date: "2026-04-29"
      }
    ]
  });
})();
