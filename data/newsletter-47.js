(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 47,
    title: "국방 AI(AI+IT) 뉴스레터 제47호",
    period: "2026. 3. 29. ~ 4. 4.",
    date: "2026-04-04",
    key_theme: "Claude·Maven 실전 역할 · FY27 1.5조 달러 국방예산 · Saronic 90억 달러 USV 스타트업",
    insights: [
      {
        color: "#f87171",
        title: "🤖 Claude의 CENTCOM 실제 역할 공개",
        body: "Claude는 Maven Smart System의 '부가적 인터페이스'로 표적화 직접 추천이 아닌 모듈 간 동기화·운용자 인터페이스 역할. 이란 미나브 여학교 오폭(175명 사망)은 AI 속도가 데이터 검증 능력을 초과할 때의 구조적 위험을 실증"
      },
      {
        color: "#fbbf24",
        title: "💰 FY2027 국방예산 1.5조 달러 요청",
        body: "전년 대비 44% 증가(4,450억 달러↑). Golden Dome 미사일 방어(1,850억), 드론 전력·Counter-UAS, GenAI.mil 지원 포함. 레거시 유지비 삭감→차세대 R&D·획득으로 구조 전환 공식화"
      },
      {
        color: "#34d399",
        title: "🚤 Saronic, 92.5억 달러 가치로 Series D 완료",
        body: "Kleiner Perkins 주도 17.5억 달러 조달. 미 해군 3.92억 달러 계약 보유, Port Alpha 조선소 건설로 연간 20척+ 생산 목표. 우크라이나 전쟁·이란 작전이 입증한 드론 보트 전술 가치가 방산 스타트업 투자 붐 견인"
      },
      {
        color: "#818cf8",
        title: "🏛️ 연방 AI·IT 거버넌스 집중화",
        body: "OMB IT계약 월별보고 의무화, DoD CIO 4대 IT혁신계획(데이터 우위·결심 지배), HHS OCIO 통합, Microsoft Copilot 정부클라우드 확장, 정부기관 82% AI에이전트 도입 완료(IDC 조사)"
      }
    ],
    articles: [
      {
        id: "47-1",
        newsletter_id: 47,
        topic_en: "Pentagon - Claude in MSS",
        topic_kr: "Claude AI의 역할",
        title: "What the Claude AI chatbot really does for CENTCOM",
        title_kr: "Claude AI가 CENTCOM에서 실제로 하는 일 — Maven Smart System 내 통합 모듈로서의 역할",
        source: "RealClearDefense",
        url: "https://www.realcleardefense.com/2026/03/31/what_the_claude_ai_chatbot_really_does_for_centcom_1173708.html",
        keywords: ["Claude", "CENTCOM", "Maven Smart System", "Palantir", "표적화", "BDA", "Human-in-the-Loop"],
        summary: "Claude는 Maven Smart System(구 Google Project Maven, 현 Palantir 운영)의 핵심 구성요소가 아닌 부가적 인터페이스로 기능한다. 표적 생성·무장 매칭·타격 피해평가 모듈 간 동기화를 지원하며, AI는 수일·수시간 걸리던 표적화 절차를 수초로 단축한다. 그러나 이란 미나브 여학교 오폭(175명 사망)은 AI 기반 표적화 속도가 데이터 검증 능력을 초과할 때의 구조적 위험을 노출시켰다. Maven은 4월 8일 NGA에서 CDAO로 이관 예정이다.",
        date: "2026-03-31"
      },
      {
        id: "47-2",
        newsletter_id: 47,
        topic_en: "Pentagon - Anthropic Issues",
        topic_kr: "Anthropic 금지 조치의 파장",
        title: "Vendors struggle to navigate the Anthropic ban's fallout",
        title_kr: "Anthropic 금지 조치 파장 — 연방 기술 계약업체의 불확실성과 대응",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/acquisition/2026/04/vendors-struggle-navigate-anthropic-bans-fallout/412563/",
        keywords: ["Anthropic 금지", "연방 계약업체", "공급망 위험", "GSA 초안", "법적 함정", "Claude 전환", "AI 거버넌스"],
        summary: "연방판사의 금지명령에도 불구하고 정부와 거래하는 기술 계약업체들은 공식 지침 부재로 심각한 혼란에 빠져 있다. Claude를 스택에 내재화한 기업들은 대고객 제품에서 Gemini 등으로 교체를 추진 중이며, 내부 코딩 사용의 규제 범위도 불명확하다. 정치적 심사 우려와 GSA 초안의 부실한 안전 조치도 문제다. 정부 측은 '규율 있는 구매자' 메시지를 업계에 전달하고 있다.",
        date: "2026-04-01"
      },
      {
        id: "47-3",
        newsletter_id: 47,
        topic_en: "Pentagon - AI Agent",
        topic_kr: "군 특화 AI 에이전트 'WarClaw'",
        title: "Startup takes a different approach to AI assistants",
        title_kr: "Edgerunner AI, 군 특화 AI 에이전트 'WarClaw' 공개",
        source: "Defense One",
        url: "https://www.defenseone.com/technology/2026/04/startup-takes-different-approach-ai-assistants/412545/",
        keywords: ["WarClaw", "Edgerunner AI", "군사 AI 에이전트", "오프라인 운용", "OPSEC", "Human-in-the-Loop", "Space Force"],
        summary: "참전용사 출신 Tyler Saltsman이 설립한 Edgerunner AI가 4월 1일 군 특화 AI 에이전트 WarClaw를 공개했다. 군사 특화 데이터셋 훈련, 오프라인 온프레미스 운용(OPSEC), 감사 추적 투명성, Human-in-the-Loop 설계가 핵심 차별점이다. LLM 기반 에이전트가 군 지휘관 명령을 98% 비율로 거부한다는 Harvard·MIT 연구를 근거로, Space Force·SOCOM·NGC2 체계와 협력 계약을 완료했다.",
        date: "2026-04-01"
      },
      {
        id: "47-4",
        newsletter_id: 47,
        topic_en: "Pentagon - IT Overhaul Plan",
        topic_kr: "펜타곤의 IT 혁신 계획",
        title: "DOD CIO Pitches IT Overhaul Plan",
        title_kr: "DoD CIO, 펜타곤 IT 전면 혁신 4대 계획 제시",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/dod-cio-pitches-it-overhaul-plan/",
        keywords: ["DoD CIO", "데이터 우위", "결심 지배", "네트워크 현대화", "레거시 IT", "Zero Trust", "Mission Partner Environment"],
        summary: "DoD CIO Kristen Davies가 하원 군사위 청문회에서 '데이터 우위·결심 지배' 구현을 위한 4대 IT 혁신 축을 제시했다. ①네트워크 백본 현대화(5G·해저케이블·위성, 상용 클라우드 확대), ②레거시 IT 교체(애자일·SaaS·MPE 배치), ③사이버보안 강화(체크리스트→리스크 기반·Zero Trust·DIB 전체 보안), ④사이버 인력 채용·교육 2배 투자다.",
        date: "2026-03-26"
      },
      {
        id: "47-5",
        newsletter_id: 47,
        topic_en: "White House - FY2027 Defense Budget Request",
        topic_kr: "미 백악관의 FY27 국방예산 요청",
        title: "White House Proposes $1.5T Defense Budget for 2027",
        title_kr: "미 백악관, FY2027 국방예산 1조 5천억 달러 요청",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/white-house-proposes-1-5t-defense-budget-for-2027/",
        keywords: ["FY2027 국방예산", "1.5조 달러", "Golden Dome", "드론 전력", "GenAI.mil", "방산 획득 개혁", "조정 예산"],
        summary: "트럼프 행정부가 4월 3일 FY2027 국방예산 1.5조 달러를 의회에 요청했다. 전년 대비 44% 증가로, 1.1조 달러는 기반 재량 예산, 3,500억 달러는 신기술·혁신 획득용 조정 재원이다. Golden Dome 미사일 방어(1,850억 달러, 2035년 완료), 드론·Counter-UAS 전례 없는 투자, GenAI.mil 플랫폼 지원, 레거시 유지비 삭감 후 차세대 R&D 전환이 핵심이다.",
        date: "2026-04-03"
      },
      {
        id: "47-6",
        newsletter_id: 47,
        topic_en: "GSA - FedRAMP Cybersecurity Service",
        topic_kr: "FedRAMP의 사이버보안 서비스 조직 출범",
        title: "New FedRAMP Cybersecurity Service to Hire 15 Employees",
        title_kr: "FedRAMP, 사이버보안 서비스 조직(FRCS) 공식 출범 및 15명 채용 착수",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/new-fedramp-cybersecurity-service-to-hire-15-employees/",
        keywords: ["FedRAMP", "FRCS", "FedRAMP 20x", "사이버보안", "2년 임기", "민관 인력 순환", "GS-13~15"],
        summary: "GSA 산하 FedRAMP이 신설 조직 FRCS(FedRAMP Cybersecurity Service)를 출범하고 GS-13~15 등급 직원 15명을 2년 임기로 채용한다. 1년차 FedRAMP 팀 근무 후 2년차에 타 연방기관 보안팀에 임시 배치하는 민관 순환 구조가 핵심이다. 클라우드 서비스 구성·운영 경험 보안 엔지니어나 FedRAMP 독립 평가자 경험자를 우선 선발하며, 4월 말 채용 공고 게시 예정이다.",
        date: "2026-04-02"
      },
      {
        id: "47-7",
        newsletter_id: 47,
        topic_en: "Israel - Defense Budget",
        topic_kr: "이스라엘의 국방예산 증액",
        title: "Israel approves $45B defense budget as Iran war rages",
        title_kr: "이스라엘, 2026년 국방예산 약 448억 달러 승인 — 이란 전쟁 지속 속 역대 최대 규모",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/03/israel-approves-45b-defense-budget-as-iran-war-rages/",
        keywords: ["이스라엘 국방예산", "448억 달러", "Operation Roaring Lion", "Elbit Systems", "다중전선", "이란 전쟁", "공중 보급"],
        summary: "이스라엘 크네세트가 3월 30일 448억 달러 규모의 역대 최대 국방예산을 승인했다. 전년 대비 94.8억 달러 증가로, 2월 28일 개시된 Operation Roaring Lion(대이란 공습)이 직접적 배경이다. Elbit Systems와 155mm 포탄 4,800만 달러 계약 체결, 화물기 200편으로 8,000톤 군사장비 공수, 하마스·헤즈볼라와의 다중전선 상황이 반영됐다.",
        date: "2026-03-30"
      },
      {
        id: "47-8",
        newsletter_id: 47,
        topic_en: "Ukraine - DIB Innovation",
        topic_kr: "우크라이나의 방산 혁신 모델",
        title: "How Ukraine's defense industry innovates at the speed of modern war",
        title_kr: "우크라이나 방산의 현대전 혁신 모델: 교훈과 제도적 함의",
        source: "Defense One",
        url: "https://www.defenseone.com/ideas/2026/04/ukraine-defense-industry-innovates-modern-war/412594/",
        keywords: ["우크라이나 방산", "분산형 OODA", "드론 생태계", "LUCAS 드론", "Loke", "SkyFall", "획득 개혁"],
        summary: "우크라이나 드론 제조업체가 침공 전 7개에서 현재 약 500개로 확대됐으며, 2025년 400만 대(NATO 전체 합산 초과)를 생산했다. 핵심은 기술이 아닌 분산형 OODA 루프 아키텍처다. Pentagon은 SkyFall·Skycutter 드론이 자체 평가에서 99.3점(미국 경쟁제품 10점 이상 앞섬)을 기록해 우크라이나산 요격 드론 구매 협상 중이다. 스웨덴 Loke(84일 개발) 및 미국 LUCAS 드론도 이 원칙의 서방 적용 사례로 제시됐다.",
        date: "2026-04-02"
      },
      {
        id: "47-9",
        newsletter_id: 47,
        topic_en: "U.S. - AI Adoption",
        topic_kr: "미국 공공부문의 Agentic AI 도입 현황",
        title: "Most government leaders say they outpace private sector on AI adoption, survey says",
        title_kr: "미 공공부문 Agentic AI 도입 현황: 정부기관, 민간 선도 주장",
        source: "Government Executive",
        url: "https://www.govexec.com/management/2026/03/most-government-leaders-say-they-outpace-private-sector-ai-adoption-survey-says/412531/",
        keywords: ["Agentic AI", "공공부문", "IDC", "Salesforce", "AI 에이전트", "82%", "정부 AI 도입"],
        summary: "IDC·Salesforce 조사에 따르면 정부기관의 82%가 이미 AI 에이전트를 도입했으며, 60%는 민간보다 도입 속도가 앞선다고 자평했다. 71%가 향후 1년 내 확대 계획, 51%는 PC보다 변혁적이라고 응답했다. 공공부문 가속 요인은 데이터 자동화·민원 대응 등 공통 활용사례의 집중성이다. 89%는 2030년까지 인간·AI 에이전트 협업 구조가 될 것으로 전망한다.",
        date: "2026-03-31"
      },
      {
        id: "47-10",
        newsletter_id: 47,
        topic_en: "OMB - IT Contract Reporting",
        topic_kr: "OMB의 IT 계약 보고 의무화 조치",
        title: "OMB Mandates Monthly IT Contract Reporting for Agencies",
        title_kr: "OMB, 연방기관 IT 계약 월별 보고 의무화 지시",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/omb-mandates-monthly-it-contract-reporting-for-agencies/",
        keywords: ["OMB", "IT 계약 보고", "Russell Vought", "DOGE", "중복 IT 투자", "연방 CIO", "조달 투명성"],
        summary: "OMB 국장 Russell Vought가 민간 연방기관들에 5월부터 새로 승인된 IT 계약 월간 보고서를 매월 10일까지 제출하도록 의무화했다. DOGE 정부효율화 기조 하에 IT 조달 중앙집중화 추진이 목적이며, DoD와 소규모 기관은 제외된다. 연방 CIO Greg Barbaccia는 중복 솔루션 식별과 실제 활용 기반 구매 간소화가 목표라고 밝혔으며, 벤더 가격·활용률 데이터 공개 의무도 즉시 발효된다.",
        date: "2026-04-01"
      },
      {
        id: "47-11",
        newsletter_id: 47,
        topic_en: "HHS - CIO Reorganization",
        topic_kr: "HHS의 IT 조직 통합",
        title: "HHS Restores OCIO Oversight of CTO, CAIO, and CDO Roles",
        title_kr: "HHS, CTO·CAIO·CDO 역할 OCIO 산하로 재통합",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/hhs-restores-ocio-oversight-of-cto-caio-and-cdo-roles/",
        keywords: ["HHS", "OCIO", "CAIO", "CTO", "CDO", "ONC", "AI 거버넌스"],
        summary: "HHS가 2024년 7월 개편을 번복해 CTO·CAIO·CDO 감독 권한을 ASTP/ONC에서 OCIO로 재이관했다. CIO Clark Minor는 '클라우드·사이버보안·데이터·AI의 통합 기반을 제공하기 위한 조치'라고 설명했다. 기술 리더십을 분산형 전문 조직보다 CIO 중심 통합 체계로 운영하는 것이 실무 효율에서 우위임을 시사하는 연방 AI 거버넌스 시행착오 사례다.",
        date: "2026-04-03"
      },
      {
        id: "47-12",
        newsletter_id: 47,
        topic_en: "Microsoft Gov. Cloud - Copilot",
        topic_kr: "공공 클라우드 내 Copilot 도구 확장",
        title: "Microsoft expands Copilot agentic tools in government clouds",
        title_kr: "Microsoft, 정부 클라우드 전반에 Copilot 에이전틱 도구 확장",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/04/microsoft-expands-copilot-agentic-tools-government-clouds/412588/",
        keywords: ["Microsoft Copilot", "GCC-High", "DoD 클라우드", "Analyst 에이전트", "Agent Builder", "OneGov", "Anthropic 협력"],
        summary: "Microsoft가 4월 3일 GCC·GCC-High·DoD 클라우드 전반에 Copilot 에이전틱 4종(Researcher·Analyst·Agent Builder·Copilot Studio Publishing)을 공식 제공한다고 발표했다. Analyst 에이전트는 전 환경에서 이용 가능하며 패턴 감지·요약 생성 기능을 갖춘다. GSA OneGov 협약을 통해 할인가 접근 가능하다. Anthropic과 협력한 'Copilot Cowork'는 Claude의 다단계 작업 기술을 M365에 통합한다.",
        date: "2026-04-03"
      },
      {
        id: "47-13",
        newsletter_id: 47,
        topic_en: "Saronic - $9B Valuation",
        topic_kr: "Saronic(USV 기업)의 투자 유치",
        title: "AI boat maker Saronic smashes $9 billion valuation",
        title_kr: "Saronic, Series D 17.5억 달러 조달 — 기업가치 92.5억 달러 돌파",
        source: "Defense One",
        url: "https://www.defenseone.com/business/2026/03/ai-boat-maker-saronic-smashes-9-billion-valuation/412527/",
        keywords: ["Saronic", "USV", "자율 수상함", "Series D", "Kleiner Perkins", "Port Alpha", "미 해군"],
        summary: "오스틴 소재 자율 함정 스타트업 Saronic Technologies가 Kleiner Perkins 주도 17.5억 달러 Series D를 완료해 기업가치 92.5억 달러를 달성했다. 미 해군 3.92억 달러 계약 보유, 임직원 1,300명 이상이다. 조달 자금은 Port Alpha 조선소 건설과 루이지애나 기존 조선소 30만 평방피트 확장에 투입해 연간 20척+ 생산을 목표로 한다. 드론 보트의 실전 검증(러-우 전쟁, 이란 작전)이 방산 스타트업 투자 붐을 견인하고 있다.",
        date: "2026-03-31"
      }
    ]
  });
})();
