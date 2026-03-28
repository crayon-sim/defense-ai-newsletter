(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 46,
    title: "국방 AI(AI+IT) 뉴스레터 제46호",
    period: "2026. 3. 22. ~ 28.",
    date: "2026-03-28",
    key_theme: "Anthropic-DoD 판결 · 드론 조달 혁신 · 러-이란 드론 전술 전이",
    insights: [
      {
        color: "#f87171",
        title: "⚖️ 연방법원, Anthropic 블랙리스트 차단",
        body: "판사 Rita Lin이 DoD의 Anthropic 공급망 위험 지정을 '수정헌법 제1조 위반 보복'으로 규정, 예비 금지명령 인용. AI 기업의 윤리적 안전장치가 법적 보호를 받을 수 있음을 확인한 첫 선례"
      },
      {
        color: "#fbbf24",
        title: "🚁 드론 조달 패러다임 전환",
        body: "미 육군 UAS 마켓플레이스 개설(AWS 협력·30개 시스템 등록)과 Anduril Arsenal-1 CCA 양산 동시 착수. '빠른 조달·상용부품·클라우드 플랫폼'이 전통 방산 조달 체계를 대체하는 신호탄"
      },
      {
        color: "#f97316",
        title: "🌐 러-이란-북-중 드론 전술 전이 가속",
        body: "이란이 러시아의 소모적 반복 공격 전술을 채택, 우크라이나 군인들 '하나의 전쟁'이라 경고. 드론 기술·전술이 권위주의 4국 연대를 통해 한반도까지 확산되는 구조적 위협 구체화"
      },
      {
        color: "#34d399",
        title: "🇩🇪🇳🇱 유럽 국방 AI·드론 제도화",
        body: "독일 육군 AI 기반 전시 의사결정 체계(Maven 비교기준), 네덜란드군 NATO 최초 여단급 드론 전담부대 편제화. ODNI AI 프레임워크 + FedRAMP 500 돌파와 맞물려 AI 거버넌스 구조화 가속"
      }
    ],
    articles: [
      {
        id: "46-1",
        newsletter_id: 46,
        topic_en: "Pentagon - AI Guardrail",
        topic_kr: "미 전쟁부의 AI 가드레일",
        title: "Judge blocks DOD's ban on Anthropic, calls it First Amendment retaliation",
        title_kr: "연방법원, DoD의 Anthropic 블랙리스트 명령 차단 — '수정헌법 제1조 위반 보복'",
        source: "Washington Technology",
        url: "https://www.washingtontechnology.com/companies/2026/03/judge-blocks-dods-ban-anthropic-calls-it-first-amendment-retaliation/412451/",
        keywords: ["Anthropic", "DoD", "공급망 위험", "수정헌법 제1조", "예비 금지명령", "Rita Lin 판사", "AI 가드레일"],
        summary: "캘리포니아 북부 연방지방법원 Rita F. Lin 판사는 2026년 3월 26일 Anthropic의 예비 금지명령 신청을 인용하며 DoD의 Anthropic 블랙리스트 명령을 차단했다. 43쪽 판결문에서 ① DoD 내부 메모가 Anthropic의 '언론을 통한 적대적 행동' 때문에 위험 등급을 상향했다고 명시한 점에서 수정헌법 제1조 위반, ② 사전 통지·이의 기회 미부여로 수정헌법 제5조 위반, ③ DoD가 Anthropic이 '파괴 공작원이 될 수 있다'는 합법적 근거를 제시하지 못한 점에서 권한 남용을 확인했다. 금지명령은 7일 후 발효되며 정부는 제9순회항소법원에 긴급 집행정지를 신청할 수 있다.",
        date: "2026-03-26"
      },
      {
        id: "46-2",
        newsletter_id: 46,
        topic_en: "Pentagon - AI Guardrail",
        topic_kr: "미 전쟁부의 AI 가드레일",
        title: "Judge Questions Pentagon's Supply Chain Risk Label of Anthropic",
        title_kr: "연방 판사, 펜타곤의 Anthropic 공급망 위험 지정에 이의 제기",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/judge-questions-pentagons-supply-chain-risk-label-of-anthropic/",
        keywords: ["Anthropic", "공급망 위험", "DoD", "연방법원", "AI 조달", "AI 안전장치", "OpenAI"],
        summary: "연방 판사가 DoD의 Anthropic 공급망 위험 지정이 미국 기업에 통상 외국 적대 세력에게만 부과하는 조항을 적용한 전례 없는 조치라는 점을 문제 삼았다. 갈등은 Anthropic이 자율 살상 무기 운용 및 대규모 감시에 대한 Claude 사용 제한을 고수하면서 시작됐으며, 협상 결렬 후 Trump 대통령이 전 정부 차원의 사용 금지를 명령했다. 같은 날 DoD는 OpenAI와 별도 계약을 체결해 경쟁 구도가 더욱 부각됐다.",
        date: "2026-03-26"
      },
      {
        id: "46-3",
        newsletter_id: 46,
        topic_en: "Pentagon - AI Guardrail",
        topic_kr: "미 전쟁부의 AI 가드레일",
        title: "Sen. Warren Presses Hegseth on Anthropic Dispute",
        title_kr: "워런 상원의원, Anthropic 분쟁 관련 헤그세스 국방장관에 해명 촉구",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/sen-warren-presses-hegseth-on-anthropic-dispute/",
        keywords: ["Elizabeth Warren", "Hegseth", "Anthropic", "Defense Production Act", "공급망 위험", "OpenAI", "AI 거버넌스"],
        summary: "Elizabeth Warren 상원의원이 3월 23일 Hegseth 장관에게 서한을 보내 Anthropic 공급망 위험 지정의 위법성을 지적하고 해명을 요구했다. 특히 DoD가 협상 중 Defense Production Act 발동을 위협(서비스 필수성 전제)하면서 동시에 공급망 위험(안보 위협) 지정을 내린 것은 자기 모순이라고 비판했다. Warren은 공급망 위험 지정과 같은 날 체결된 OpenAI 계약에 대해서도 AI 벤더 간 경쟁이 정치적 정렬에 의해 좌우되는 선례라며 Hegseth와 Sam Altman 모두에게 4월 6일까지 답변을 요구했다.",
        date: "2026-03-23"
      },
      {
        id: "46-4",
        newsletter_id: 46,
        topic_en: "Pentagon - AI Guardrail",
        topic_kr: "미 전쟁부의 AI 가드레일",
        title: "Will too much AI weaken troops' judgement?",
        title_kr: "군사 AI의 진짜 위험: 킬러 로봇이 아닌 인간 판단력의 약화",
        source: "Defense One",
        url: "https://www.defenseone.com/technology/2026/03/military-ai-troops-judgement/412390/",
        keywords: ["AI 과의존", "인지 능력 약화", "cognitive surrender", "LLM", "공군연구소", "Human-in-the-Loop", "군사 AI"],
        summary: "공군연구소가 Cell에 발표한 연구에 따르면 LLM의 광범위한 사용이 사용자 사고를 동질화해 비선형적·직관적 판단을 위축시킨다. Wharton 연구진은 'cognitive surrender'—AI 판단이 틀렸음을 알면서도 따르는 현상—을 확인했으며, 프린스턴 연구는 LLM의 아첨형 응답이 편향을 강화한다고 밝혔다. Pentagon은 AI 도구 배치 속도에 쫓겨 사용자 인지 능력 보호 조치나 AI 영향 모니터링 체계를 갖추지 못하고 있다는 지적이 제기됐다.",
        date: "2026-03-24"
      },
      {
        id: "46-5",
        newsletter_id: 46,
        topic_en: "Pentagon - REEF",
        topic_kr: "미 전쟁부의 수중 드론 대응 공동(미영) 프로젝트",
        title: "US and UK teaming up to destroy underwater drones",
        title_kr: "미-영, 수중 드론 대응 공동 프로젝트 REEF 착수 — DIU 공개 입찰 개시",
        source: "Defense News",
        url: "https://www.defensenews.com/naval/2026/03/23/us-and-uk-teaming-up-to-destroy-underwater-drones/",
        keywords: ["REEF", "DIU", "counter-UUV", "수중 드론", "미영 협력", "kill chain", "Human-in-the-Loop"],
        summary: "미국 DIU와 영국 UK Defence Innovation이 항만·주요 인프라를 위협하는 수중 드론(UUV·ROV·반잠수정)에 공동 대응하기 위한 REEF 프로젝트 입찰을 공개했다. 요구 시스템은 Detect-Track-Classify-Defeat 전체 kill chain을 커버해야 하며, AI/ML 기반 위협 분류와 Human-in-the-Loop 의사결정이 필수다. 입찰 마감은 4월 3일로, non-kinetic 방식(네트·기포 차단막)이 우선시된다.",
        date: "2026-03-23"
      },
      {
        id: "46-6",
        newsletter_id: 46,
        topic_en: "U.S. Army - UAS Marketplace",
        topic_kr: "미 육군의 UAS 마켓플레이스",
        title: "Army Launches Online Marketplace for Drones",
        title_kr: "미 육군, 드론 조달 온라인 마켓플레이스 출범",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/army-launches-online-marketplace-for-drones/",
        keywords: ["UAS Marketplace", "드론 조달", "AWS", "FMS", "drone dominance", "Group 1-2", "획득 혁신"],
        summary: "미 육군이 AWS 및 Army Enterprise Cloud Management Agency와 협력해 개발한 UAS 마켓플레이스를 공개했다. 현재 30개 Group 1·2 드론이 등록되어 있으며, 2026년 여름까지 Group 3 추가 예정이다. Amazon 방식의 별점 피드백 시스템으로 실시간 시장 수요 신호를 형성하며, 동맹국 FMS 간소화까지 목표로 한다. 'drone dominance' 전략 목표를 직접 지원하도록 설계됐다.",
        date: "2026-03-24"
      },
      {
        id: "46-7",
        newsletter_id: 46,
        topic_en: "U.S. Army - UAS Marketplace",
        topic_kr: "미 육군의 UAS 마켓플레이스",
        title: "Army's digital marketplace for drones is officially open",
        title_kr: "미 육군, UAS 마켓플레이스 공식 개설 — 드론 획득 체계의 'Amazon식' 전환",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/03/armys-digital-marketplace-for-drones-is-officially-open/",
        keywords: ["UAS Marketplace", "CSO", "Group 1-3", "Gauntlet", "드론 지배", "FMS", "방산 혁신"],
        summary: "미 육군이 2026년 3월 24일 UAS 마켓플레이스를 공식 출범시켰다. CSO(Commercial Solutions Opening)를 통해 업체가 제품을 등록하면 군인이 Amazon처럼 별점으로 평가하는 구조다. 현재 30개 시스템 등록, Gauntlet 수상작 및 101st·25th 사단 자체 개발 드론도 향후 포함 예정이다. 주요 책임관은 이 마켓플레이스가 Group 1~3 드론 조달의 주요 방식으로 자리잡을 것이라고 밝혔다.",
        date: "2026-03-24"
      },
      {
        id: "46-8",
        newsletter_id: 46,
        topic_en: "U.S. Army - Lessons from Ukraine",
        topic_kr: "우크라이나의 교훈",
        title: "Lessons from Ukraine are shaping US Army's drones, training, comms",
        title_kr: "우크라이나 교훈이 미 육군의 드론·훈련·통신 체계를 바꾸고 있다",
        source: "Defense One",
        url: "https://www.defenseone.com/defense-systems/2026/03/army-needs-more-realistic-drone-training-more-versatile-drones/412389/",
        keywords: ["우크라이나 교훈", "GPS 재밍", "광섬유 드론", "C2 감청", "전자기 침묵", "counter-UAS", "JTIF-401"],
        summary: "Security Assistance Group-Ukraine 소속 Burr Miller 대령이 AUSA Global Force Symposium에서 우크라이나 전장 교훈을 산업계에 직접 전달했다. 핵심은 ①GPS 의존 탈피(시각·자기·복합 항법), ②C2 링크 재밍·감청 대응(위성·RF·셀룰러 전환), ③광섬유 드론의 전자전 무력화 가치, ④분산 기동·전자기 침묵, ⑤5,000달러 미만 low-cost counter-UAS 확대다. JTIF-401이 counter-UAS 교리 수립과 온라인 마켓플레이스를 병행 추진 중이다.",
        date: "2026-03-25"
      },
      {
        id: "46-9",
        newsletter_id: 46,
        topic_en: "U.S. Army - C2(NGC2)",
        topic_kr: "미 육군의 C2 현대화",
        title: "Army C2 to see more budget line consolidation in FY27, says service undersecretary",
        title_kr: "미 육군 C2 예산 통합 가속화 및 NGC2 현대화 전략 (FY27)",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/03/army-c2-to-see-more-budget-line-consolidation-in-fy27-says-service-undersecretary/",
        keywords: ["NGC2", "C2 현대화", "예산 통합", "FY27", "WIN-T", "Agile Procurement", "C2 Now"],
        summary: "미 육군 차관 Michael Obadal이 FY27 예산에서 NGC2 관련 예산 라인을 추가로 35% 통합할 계획을 발표했다. NGC2 전체 예산은 20% 증가하며, FY27에 최초 1개 사단에 Full Stack 배치 예정이다. 현재 25th·4th 보병사단에서 프로토타입 진행 중이며, 'C2 Now' 사업으로 노후 WIN-T를 30개월 계획으로 전 부대 교체한다. 의회는 FY26 NDAA에서 종합보고서 제출 전까지 NGC2 예산의 50% 이상 집행을 제한한 상태다.",
        date: "2026-03-25"
      },
      {
        id: "46-10",
        newsletter_id: 46,
        topic_en: "USAF - CCA",
        topic_kr: "미 공군의 CCA(Anduril 양산)",
        title: "Air Force Officials Say They're Beating Cost Goal for CCA Drones",
        title_kr: "미 공군 CCA 드론, F-35 대비 비용 목표 초과 달성",
        source: "Air & Space Forces Magazine",
        url: "https://www.airandspaceforces.com/air-force-beating-goal-cost-cca-drones/",
        keywords: ["CCA", "YFQ-44A", "YFQ-42A", "비용 목표", "Increment 2", "Anduril", "General Atomics"],
        summary: "Col. Timothy Helfrich가 Defense One 주최 패널에서 CCA 프로그램이 Kendall의 비용 목표(F-35의 약 1/3, ~3,400만 달러)를 달성했을 뿐 아니라 크게 상회한다고 밝혔다. Increment 2는 현재 9개 기업과 협력 중이며 활주로 독립 운용·2,000마일 이상 항속거리가 핵심 기준이다. 저비용 다량과 고성능 소량 모두를 포함하는 스펙트럼 접근법으로 데이터 기반 최적 조합을 선택할 방침이다.",
        date: "2026-03-25"
      },
      {
        id: "46-11",
        newsletter_id: 46,
        topic_en: "USAF - CCA",
        topic_kr: "미 공군의 CCA(Anduril 양산)",
        title: "As Fury production starts, Anduril pledging a different production approach at Arsenal-1",
        title_kr: "Anduril, 오하이오 Arsenal-1 공장서 Fury 자율전투드론 양산 착수",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/03/as-fury-production-starts-anduril-pledging-a-different-production-approach-at-arsenal-1/",
        keywords: ["Arsenal-1", "Fury", "YFQ-44", "양산", "상용부품", "자동화 최소화", "Anduril"],
        summary: "Anduril이 오하이오 Arsenal-1 공장에서 Fury(YFQ-44) 양산을 개시했다. 약 10억 달러 투입, 최종 7개 동·직원 4,000명 규모로 확장 예정이다. 핵심 생산 철학은 ①알루미늄 기체, ②민수용 범용 부품 최대 활용, ③주조·단조 배제, ④유연 생산 환경이다. 3교대 풀가동 시 연간 150대 생산 가능하며, 2026년 말까지 Roadrunner·Barracuda 생산 라인도 가동 예정이다.",
        date: "2026-03-23"
      },
      {
        id: "46-12",
        newsletter_id: 46,
        topic_en: "USAF - CCA",
        topic_kr: "미 공군의 CCA(Anduril 양산)",
        title: "Look Inside Anduril's New Factory as Collaborative Combat Aircraft Production Begins",
        title_kr: "Anduril, CCA 양산 개시 — Arsenal-1 공장 내부 공개",
        source: "Air & Space Forces Magazine",
        url: "https://www.airandspaceforces.com/look-anduril-new-factory-cca-production/",
        keywords: ["Arsenal-1", "Fury", "CCA", "22개 스테이션", "상용부품 94%", "연간 50대", "방산 혁신"],
        summary: "Anduril이 Arsenal-1 공장을 언론에 공개했다. 22개 워크스테이션 구성으로 초기 4개는 기체 조립, 중반부에 착륙 장치·날개·엔진, 마지막에 기능 시험이 배치된다. Fury 부품의 94%는 상용품이며 비즈니스제트 엔진을 탑재한다. 초기 연간 50대 목표, 장기적으로 150대 확장 계획이다. 올여름 첫 생산 항공기 출고 예상이며, 연내 250명·향후 10년간 4,000명 고용 방침이다.",
        date: "2026-03-23"
      },
      {
        id: "46-13",
        newsletter_id: 46,
        topic_en: "ODNI - AI Adoption Framework",
        topic_kr: "미 ODNI의 AI 도입 프레임워크",
        title: "ODNI is building a framework to boost spy agencies' AI adoption",
        title_kr: "ODNI, 정보기관 AI 도입 가속화 프레임워크 구축 착수",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/03/odni-building-framework-boost-spy-agencies-ai-adoption/412408/",
        keywords: ["ODNI", "AI 프레임워크", "Zero Trust", "위협 헌팅 자동화", "In-Q-Tel", "IC 클라우드", "Tulsi Gabbard"],
        summary: "ODNI가 정보공동체(IC) 전반의 AI 도입 가속화를 위한 정책 프레임워크와 표준을 개발 중이다. 1년간의 성과로 ①사이버보안 현대화, ②Zero Trust 전략 도입, ③위협 헌팅 자동화 확대, ④DoW와 기밀 클라우드 공동 활용(비용 50% 절감), ⑤AI 거버넌스·표준 개발, ⑥In-Q-Tel의 ODNI 관할 편입 추진을 공개했다. DNI Gabbard 취임 후 첫 번째 주요 사이버보안 발표다.",
        date: "2026-03-24"
      },
      {
        id: "46-14",
        newsletter_id: 46,
        topic_en: "GSA - FedRAMP",
        topic_kr: "미 GSA의 FedRAMP 인증 성과",
        title: "FedRAMP Hits 500 Authorized Cloud Services",
        title_kr: "FedRAMP, 승인 클라우드 서비스 500개 돌파 — FedRAMP 20x 현대화와 맞물린 이정표",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/fedramp-hits-500-authorized-cloud-services/",
        keywords: ["FedRAMP", "FedRAMP 20x", "클라우드 보안", "자동화", "502개", "GSA", "AI 조달"],
        summary: "2026년 3월 27일 기준 FedRAMP 마켓플레이스에 502개의 승인 클라우드 서비스가 등재됐으며, 심사 진행 중인 서비스도 75개에 달한다. GSA가 3월 출범시킨 FedRAMP 20x는 자동화 기반 지속적 모니터링을 통해 승인 처리 기간을 수개월에서 수 주로 단축하는 것이 목표다. stackArmor CEO는 'FedRAMP 5,000개도 멀지 않았다'며 AI·양자 솔루션의 연방 도입 가속화를 전망했다.",
        date: "2026-03-27"
      },
      {
        id: "46-15",
        newsletter_id: 46,
        topic_en: "NSF - AI-Ready America Initiative",
        topic_kr: "미 NSF의 AI-Ready American 이니셔티브",
        title: "NSF Launches AI-Ready America Initiative With Nationwide Hub Funding",
        title_kr: "NSF, 전국 허브 네트워크 기반 'AI-Ready America' 이니셔티브 출범",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/nsf-launches-ai-ready-america-initiative-with-nationwide-hub-funding/",
        keywords: ["NSF", "AI-Ready America", "TechAccess", "코디네이션 허브", "AI 인력", "다부처 협력", "AI Action Plan"],
        summary: "NSF가 모든 주·준주에 AI 중심 허브를 설치하는 'TechAccess: AI-Ready America' 이니셔티브를 출범했다. 농무부(NIFA)·노동부·SBA와 협력해 최대 56개 허브를 운영하며 허브당 연간 최대 100만 달러를 3년간 지원한다. 3대 목표는 ①전 직종 AI 리터러시 확대, ②중소기업·지방정부 AI 도입 지원, ③실습 중심 학습 경로 구축이다. 코디네이션 허브 LOI 마감은 6월 16일이다.",
        date: "2026-03-25"
      },
      {
        id: "46-16",
        newsletter_id: 46,
        topic_en: "Iran - Drone Tactics",
        topic_kr: "이란의 러시아 드론 전술 채택",
        title: "Iran is adopting Russian drone tactics, Ukrainian troops say",
        title_kr: "이란, 러시아 드론 전술 채택 — 우크라이나 군인들의 증언",
        source: "Defense One",
        url: "https://www.defenseone.com/threats/2026/03/iran-adopting-russian-drone-tactics-ukrainian-troops-say/412434/",
        keywords: ["이란 드론 전술", "러시아 Shahed", "소모전", "우크라이나 교훈", "하나의 전쟁", "러-이란-북-중", "counter-UAS"],
        summary: "우크라이나 군인들이 German Marshall Fund 행사에서 이란이 '지난해 7월부터' 러시아의 소모적 반복 공격 전술을 채택했다고 증언했다. 이란은 2월 28일 이후 2,000발 이상의 단방향 공격 UAV를 발사했으며, CNN에 따르면 러시아가 이란에 드론 전술 '구체적 조언'을 제공 중이다. 우크라이나 측은 '러시아-이란-북한-중국은 하나의 전쟁'이라고 경고하며, 자국의 저비용 요격 드론 기술·음향 탐지 네트워크에 대한 11개국 이상의 수요가 급증하고 있다고 밝혔다.",
        date: "2026-03-25"
      },
      {
        id: "46-17",
        newsletter_id: 46,
        topic_en: "German Army - AI Plan",
        topic_kr: "독일 육군의 AI 기반 의사결정 체계 구축",
        title: "German army eyes AI tools to expedite wartime decision-making",
        title_kr: "독일 육군의 AI 기반 전시 의사결정 체계 구축 추진",
        source: "Defense News",
        url: "https://www.defensenews.com/global/europe/2026/03/25/german-army-eyes-ai-tools-to-expedite-wartime-decision-making/",
        keywords: ["독일 육군", "AI 의사결정", "Freuding", "Palantir Maven", "Human-in-the-Loop", "데이터 주권", "NATO 표준"],
        summary: "독일 육군 참모총장 Christian Freuding 중장이 우크라이나 전장 데이터와 AI로 전시 의사결정 속도를 획기적으로 단축하는 체계 구축을 추진한다고 밝혔다. 현재 수백 명·수일이 필요한 작업을 AI로 대체해 '적의 의사결정 사이클 무력화'가 목표다. Human-in-the-Loop 원칙을 고수하며, 미국산(Palantir Maven)과 유럽산 솔루션을 비교 검토 중이다. 데이터 주권 고려하면서도 신속 구현을 우선시하며, NATO 표준과의 정렬을 강조했다.",
        date: "2026-03-25"
      },
      {
        id: "46-18",
        newsletter_id: 46,
        topic_en: "Dutch Armed Forces - Drone Units",
        topic_kr: "네덜란드군의 드론 전담부대 편제화",
        title: "Dutch armed forces to add drone operators to combat brigades",
        title_kr: "네덜란드군, 전투여단에 드론 전담부대 편제 도입 — NATO 최초 사례",
        source: "Defense News",
        url: "https://www.defensenews.com/global/europe/2026/03/23/dutch-armed-forces-to-add-drone-operators-to-combat-brigades/",
        keywords: ["네덜란드군", "드론 전담부대", "여단급 편제", "NATO 최초", "counter-drone", "우크라이나 교훈", "Eichelsheim"],
        summary: "네덜란드군 총사령관 Onno Eichelsheim 대장이 전투여단 단위에 드론 및 대드론 전담부대를 유기적으로 편제하는 조직 혁신을 발표했다. 우크라이나 전쟁에서 UAS가 적 표적 파괴의 80% 이상을 담당한다는 데이터에 근거한 결정으로, NATO 동맹국 중 최초의 여단급 드론 전담 편제 사례다. 독일·프랑스·이탈리아·폴란드·영국 5개국의 저비용 요격 드론 공동개발 합의와 맞물려 유럽 드론 전력 제도화가 가속화되는 흐름이다.",
        date: "2026-03-22"
      }
    ]
  });
})();
