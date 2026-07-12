(function () {
  window.NEWSLETTERS = window.NEWSLETTERS || [];
  window.NEWSLETTERS.push({
    id: 61,
    title: "국방 AI(AI+IT) 뉴스레터 제61호",
    period: "2026.7.5~11",
    date: "2026-07-11",
    key_theme: "Anthropic 퇴출 시한 임박·이란전 드론 손실 교훈 — 미군 AI 공급망·드론 전력 전면 재편",
    insights: [
      {
        color: "#B71C1C",
        title: "🚫 AFRL, Anthropic 9월 1일 퇴출 명령 — 국방 AI 공급망 전면 교체",
        body: "AFRL이 국방부 전체 시한(9월 29일)보다 한 달 앞선 9월 1일을 계약업체 퇴출 시한으로 설정했다. 헤그세스 장관의 '공급망 위협' 지정(2월 27일) 이후 범위가 축소됐지만, 방산 계약 전반에서 Anthropic이 제거된다. Anthropic 소송 결과에 따라 이미 진행된 퇴출 작업을 되돌려야 할 가능성도 있다."
      },
      {
        color: "#1565C0",
        title: "🛸 DIU MMA 사업 착수 — 이란전 리퍼 30대 손실로 저비용 드론 시대 개막",
        body: "이란 작전에서 MQ-9A 30대(총 최대 15억 달러)를 잃은 후 DIU가 MMA(Massed Modular Aircraft) 사업을 발표했다. 3,000만 달러 이하, FY2031까지 20대 확보가 목표다. 계약 후 21개월 내 프로토타입 비행을 요구하며 OTA 방식으로 발주해 비전통적 업체 참여를 촉진한다."
      },
      {
        color: "#2E7D32",
        title: "🤖 육군 101공수사단 여단: AI는 참모 지원, 방책 개발은 인간만 가능",
        body: "101공수사단 3rd MBCT가 1년간 LLM 기반 참모부서 챗봇을 운용한 결과, 경고명령 30분 내 하달·방어계획 72시간 조기 완성에는 기여했으나 COA(방책) 개발에는 부적합하다는 결론을 내렸다. 'LLM은 3차원 공간을 이해하지 못한다'는 이유로 숙련 참모진의 용병술적 전문성이 대체 불가 영역임을 확인했다."
      },
      {
        color: "#6A1B9A",
        title: "🕵️ CIA 국장 래트클리프: '스마트 리스크'로 AI 전면 도입 — 획득 3년→6개월",
        body: "CIA 국장 래트클리프가 AWS 서밋 DC에서 AI 도입 가속화를 선언했다. 신규 획득 프레임워크를 통해 평균 3년 걸리던 계약을 약 6개월로 단축해 약 400건을 처리했다. 부국장 엘리스는 분석관 업무에 AI '동료'를 통합해 핵심 판단 초안·문장 교정·트렌드 플래깅을 지원할 계획을 발표했다."
      },
      {
        color: "#FF8F00",
        title: "🛡️ JIATF 401 C-UAS 핸드북: 4P 위협평가·5D 방어원칙 공통 언어 정립",
        body: "JIATF 401이 '소형 드론, 큰 문제' 지침서를 발간해 범정부·산업계·학계 공통 어휘와 원칙을 정립했다. 4P(조작자-플랫폼-통제방식-탑재물) 위협평가와 5D(탐지-거부-교란-격퇴-기강) 방어원칙을 제시한다. AI는 탐지·의사결정 지원에 한정하며 'AI는 결정하지 않는다'는 원칙을 명시했다."
      }
    ],
    articles: [
      {
        id: "61-1",
        newsletter_id: 61,
        topic_en: "Digital Strategy",
        topic_kr: "디지털 전략",
        title: "Seizing the digital advantage at DOD",
        title_kr: "국방부 CIO 데이비스의 디지털 우위 전략 — 정책기관에서 워파이터 중심으로",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/defense/2026/07/seizing-digital-advantage-dod/414648/",
        keywords: ["Digital Advantage", "CIO", "Kirstyn Davis", "GenAI.mil", "ATO reform"],
        summary: "국방부 CIO 커스틴 데이비스가 4대 전환 축(①디지털 기반 구축·②애자일 역량·③전장 사이버보안·④인력 재교육)을 제시했다. RMF/ATO를 전면 정비해 부서 간 상호인정(inheritance)을 추진하고, 획득 주기를 6개월 단위 애자일 방식으로 전환한다. GenAI.mil은 사용자 130만 명, 에이전트 10만 개 이상을 기록했고 2주 걸리던 업무를 2시간으로 단축한 사례도 등장했다. 학위보다 스킬 기반 채용을 강조하며 재향군인 전환 지원 등 생애주기형 인력모델 구축이 추진되고 있다.",
        date: "2026-07-07"
      },
      {
        id: "61-2",
        newsletter_id: 61,
        topic_en: "AI Governance & Oversight",
        topic_kr: "AI 거버넌스·감독",
        title: "Warren Seeks AI Contract Details From Pentagon, Tech Firms",
        title_kr: "워런 상원의원, 국방부·AI 기업에 군사 AI 계약 공개 요구",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/warren-seeks-ai-contract-details-from-pentagon-tech-firms/",
        keywords: ["Warren", "AI contract", "IL6", "IL7", "oversight"],
        summary: "엘리자베스 워런 상원의원이 7월 6일 헤그세스 국방장관 및 SpaceX·OpenAI·Google·NVIDIA·Microsoft·AWS·Oracle 7개 기업 CEO들에게 서한을 발송해 기밀망(IL6/IL7) AI 운용 계약의 세부 내용 공개를 요구했다. '합법적 작전 용도'라는 포괄적 문구만 공개된 상황에서 민간인 감시·인권 침해 가능성, 자율무기 인간 감독 부재, Anthropic 압박 정황 등을 지적했다. DoD와 7개 기업 모두에 7월 20일까지 비기밀 형태의 답변을 요구했다.",
        date: "2026-07-06"
      },
      {
        id: "61-3",
        newsletter_id: 61,
        topic_en: "Counter-UAS",
        topic_kr: "대드론(C-UAS)",
        title: "DOD Drone Task Force Releases Counter-Drone Handbook",
        title_kr: "국방부 JIATF 401, 'Small Drones, Big Problems' C-UAS 원칙 지침서 발간",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/dod-drone-task-force-releases-counter-drone-handbook/",
        keywords: ["C-UAS", "JIATF 401", "counter-drone", "4P framework", "5D framework"],
        summary: "JIATF 401이 'Small Drones, Big Problems: A First Principles Approach to Countering-UAS'를 발간했다. 4P 위협평가(조작자-플랫폼-통제방식-탑재물)와 5D 방어원칙(탐지-거부-교란-격퇴-기강)을 제시한다. Operation Epic Fury(미-이란 충돌) 및 우크라이나 Operation Spider's Web 사례를 활용했다. AI는 탐지·데이터 융합·의사결정 지원에 한정하며 'AI는 결정하지 않는다, 사람이 결정한다'는 원칙을 명시했다.",
        date: "2026-07-08"
      },
      {
        id: "61-4",
        newsletter_id: 61,
        topic_en: "Drone Acquisition",
        topic_kr: "드론 획득",
        title: "DIU seeks cheaper drones to carry out Reaper missions",
        title_kr: "DIU, 이란전 리퍼 30대 손실 후 저비용 대량생산 MMA 사업 착수",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/07/diu-seeks-cheaper-drones-to-carry-out-reaper-missions/",
        keywords: ["DIU", "MMA", "Massed Modular Aircraft", "MQ-9A", "OTA"],
        summary: "이란 작전에서 MQ-9A 리퍼 약 30대(기체당 최대 5,000만 달러)를 잃은 후, DIU가 'Massed Modular Aircraft(MMA)' 사업 공고를 발표했다. 계약 후 21개월 내 실물 크기 프로토타입 비행, FY2031까지 임무 준비 드론 20대 확보가 목표다. 핵심 요구: 최소 2,800파운드 페이로드, 8,000해리 자체 전개, 높은 모듈성. 기체 3,000만 달러 이상은 '초정밀 고가'로 규정. OTA 방식으로 7월 23일까지 제안서를 접수한다.",
        date: "2026-07-07"
      },
      {
        id: "61-5",
        newsletter_id: 61,
        topic_en: "AI Adoption",
        topic_kr: "AI 도입",
        title: "Army Air Assault brigade found AI tools ill-suited to tactical planning",
        title_kr: "육군 101공수사단 여단, AI 전술기획 한계 확인 — 방책 개발은 인간 필수",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/06/army-air-assault-brigade-found-ai-tools-ill-suited-to-tactical-planning/",
        keywords: ["Army", "LLM", "tactical planning", "JRTC", "101st Airborne"],
        summary: "101공수사단 예하 3rd MBCT가 1년간 LLM 기반 챗봇을 S1~S4 참모부서에 구축·운용 후 JRTC 훈련에서 평가했다. AI는 경고명령 30분 내 하달, 임무분석 지원, 방어계획 72시간 조기 완성에 기여했다. 그러나 방책 개발(COA Development)에는 AI를 사용하지 않았다. 'LLM은 3차원 공간을 이해하지 못한다'는 이유에서다. 이미 수립된 방책을 AI로 '레드팀' 검증하는 방식은 활용했으며, 대당 750달러 1회용 공격드론(ABE 1.01)도 자체 생산했다.",
        date: "2026-06-25"
      },
      {
        id: "61-6",
        newsletter_id: 61,
        topic_en: "AI Supply Chain",
        topic_kr: "AI 공급망",
        title: "Air Force pushing contractors to purge Anthropic by Sept. 1: Memo",
        title_kr: "AFRL, 계약업체에 Anthropic 9월 1일까지 전면 퇴출 요구",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/07/air-force-pushing-contractors-to-purge-anthropic-by-sept-1-memo/",
        keywords: ["AFRL", "Anthropic", "purge", "supply chain", "Hegseth"],
        summary: "공군연구소(AFRL)가 7월 9일 계약업체들에 9월 1일까지 모든 Anthropic 제품·서비스를 제거하라고 요구했다. 국방부 전체 시한(9월 29일)보다 약 한 달 앞선 조치다. 헤그세스 장관이 2월 27일 Anthropic을 '공급망 위협'으로 지정한 이후 범위가 축소돼 방산 계약 관련 업무에만 적용 중이다. 8월 1일까지 사용 현황 전수 조사 후 9월 1일 제거 완료가 요구된다. Anthropic은 소송을 계속 진행 중이다.",
        date: "2026-07-10"
      },
      {
        id: "61-7",
        newsletter_id: 61,
        topic_en: "Intelligence AI",
        topic_kr: "정보·첩보 AI",
        title: "CIA will take 'smart risks' and 'course correct' as it adopts AI, director says",
        title_kr: "CIA 국장: '스마트한 리스크'로 AI 전면 도입 — 획득 절차 3년→6개월 단축",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/06/cia-will-take-smart-risks-and-course-correct-it-adopts-ai-director-says/414542/",
        keywords: ["CIA", "Ratcliffe", "AI adoption", "smart risks", "acquisition reform"],
        summary: "CIA 국장 존 래트클리프가 6월 30일 AWS 서밋 DC 연설에서 '리스크 없는 접근법은 없다'며 '스마트한 리스크'로 AI 도입에 나서겠다고 밝혔다. 부국장 마이클 엘리스는 분석관 워크플로우에 AI '동료'를 통합해 핵심 판단 초안·문장 교정·트렌드 플래깅을 지원하는 계획을 발표했다. CIA는 신규 획득 프레임워크를 통해 평균 3년 걸리던 획득 절차를 약 6개월로 단축해 약 400건의 계약을 체결했다. '코드를 다루는 것이 인적자산을 다루는 것만큼 익숙해져야 한다'고 강조했다.",
        date: "2026-07-01"
      },
      {
        id: "61-8",
        newsletter_id: 61,
        topic_en: "Ground Robotics",
        topic_kr: "지상 로봇",
        title: "Ukrainian ground robot maker doubles production, eyes ventures with foreign partners",
        title_kr: "우크라이나 Trinity Robotics, 생산량 2배 확대 — 서방 방산기업 투자 유치",
        source: "Defense News",
        url: "https://www.defensenews.com/global/europe/2026/07/09/ukrainian-ground-robot-maker-doubles-production-eyes-ventures-with-foreign-partners/",
        keywords: ["Trinity Robotics", "Konyk One", "UGV", "Ukraine", "Brave1"],
        summary: "우크라이나 Trinity Robotics가 스웨덴 투자사(Front Ventures, Hede Capital) 및 Defence Builder Fund I로부터 50만 유로 이상을 유치해 Konyk One(460kg, 적재 300kg, 45km 항속) 생산을 월 60~70대에서 150대 이상으로 확대할 계획이다. 200대 이상이 우크라이나군 20~25개 부대에 배치됐으며 NATO 규격인증을 완료했다. DevDroid-Kongsberg, UUT-KNDS, ARX Robotics 등 서방 자본과 결합하는 최근 추세와 궤를 같이한다. 우크라이나 정부는 2026년 UGV 5만 대 생산을 목표로 하고 있다.",
        date: "2026-07-09"
      },
      {
        id: "61-9",
        newsletter_id: 61,
        topic_en: "Agentic AI",
        topic_kr: "에이전틱 AI",
        title: "Dell's Roese: Governance, Agentic AI Will Define Government's Next AI Phase",
        title_kr: "Dell CTO: '거버넌스와 에이전틱 AI가 정부의 차세대 AI 단계를 정의한다'",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/dells-roese-governance-agentic-ai-will-define-governments-next-ai-phase/",
        keywords: ["Dell", "agentic AI", "governance", "POC prison", "data accessibility"],
        summary: "Dell CTO/CAIO 존 로즈가 향후 12~18개월 내 정부 AI 시장은 생성형 AI 1단계(챗봇)에서 에이전틱 AI 2단계(자율 업무 수행)로 전환될 것이라고 진단했다. 핵심 메시지: 명확한 거버넌스 없는 조직은 'POC 감옥'에 갇히고, '50개 과제 파이프라인'보다 '완주하는 2개 과제'가 중요하다. 모델 성능보다 데이터 접근성이 관건이며, 특히 지식 그래프를 통한 전문 영역 지식 접근이 에이전트 성능을 좌우한다고 강조했다.",
        date: "2026-07-07"
      },
      {
        id: "61-10",
        newsletter_id: 61,
        topic_en: "Space-based ISR",
        topic_kr: "우주 ISR",
        title: "BlackSky Advances AI That Spots Targets, Assesses Strike Damage From Space",
        title_kr: "BlackSky Gen-3 AI, 자동 표적식별·전투피해평가 R&D 계약 수주",
        source: "The Defense Post",
        url: "https://thedefensepost.com/2026/07/09/blacksky-gen3-ai-battle-assessment/",
        keywords: ["BlackSky", "ATR", "BDA", "Gen-3", "space ISR"],
        summary: "BlackSky(NYSE: BKSY)가 Gen-3 AI 솔루션 개발을 위한 다수의 미국 R&D 계약을 수주했다. 자동표적인식(ATR) 알고리즘을 정부 기밀 워크플로우에 통합하고, AI 기반 전투피해평가(BDA) 애널리틱스를 개발한다. Gen-3 위성군은 35cm 해상도, 영상 수집 후 최단 60분 내 분석정보 전달, 35종 이상 전술 표적 자동 탐지를 지원한다. BKSY 주가는 연초 대비 약 45% 상승했으며 2026 FY 매출 약 30% 성장이 전망된다.",
        date: "2026-07-09"
      }
    ]
  });
})();
