(function () {
  if (!window.NEWSLETTERS) window.NEWSLETTERS = [];
  window.NEWSLETTERS.push({
    id: 48,
    title: "국방 AI(AI+IT) 뉴스레터 제48호",
    period: "2026. 4. 5. ~ 11.",
    date: "2026-04-11",
    key_theme: "펜타곤 R&D 1/3 삭감 · GA-ASI YFQ-42A 추락 · Anthropic Glasswing·CIA AI 동료",
    insights: [
      {
        color: "#f87171",
        title: "✂️ 펜타곤 R&D 예산 1/3(45억 달러) 삭감",
        body: "FY2027 국방예산 총 1.5조 달러 규모이나 R&D는 역행 삭감. 우주군 26억 달러, 육군 1.7억 달러 등 부담. 반면 중국 R&D 지출은 2000년 대비 23배 증가(5,690억 달러). 민간 VC 방산 투자로 일부 보완 가능하나 DoD 계약 변덕·편의해지 조항이 기업 선행투자 저해"
      },
      {
        color: "#fbbf24",
        title: "💥 GA-ASI YFQ-42A 'Dark Merlin' 추락, CCA 시험 중단",
        body: "2026년 4월 6일 팜데일 Gray Butte Field Airport 이륙 직후 추락. CCA 프로그램 최초 공개 비행 사고. 생산 결정(약 6개월 내)·FY2027 10억 달러 예산 배경에서 발생. 경쟁사 Anduril YFQ-44A는 Arsenal-1 양산 착수·AMRAAM 장착 시험 완료로 상대적 우위"
      },
      {
        color: "#34d399",
        title: "🔐 Anthropic Glasswing·Claude Mythos: 제로데이 자동 탐지 AI",
        body: "Mythos Preview, 모든 주요 OS·브라우저에서 고위험 취약점 수천 건 이미 발견. NSA·IC 비공식 논의 진행 중. 공세-방어 이중활용 위험 부각. Anthropic-DoD 소송 진행 중 발표돼 정부-Anthropic 관계 재조정 가능성 시사"
      },
      {
        color: "#818cf8",
        title: "🤖 CIA AI '동료' 수년 내, '자율 임무 파트너' 10년 내 목표",
        body: "부국장 Ellis, SCSP 행사서 공개 발표. CIA 작년 AI 프로젝트 300건+ 관리·최초 AI 생성 정보보고서 작성. 다중 공급업체 전략으로 '단일 기업 변덕' 위험 차단 검토. 비밀경호국도 10명 AI 임베딩 프로그램 가동"
      },
      {
        color: "#60a5fa",
        title: "📊 육군 ADOC 창설·Scarlet Dragon 상용데이터 통합 실험",
        body: "Army Data Operations Center, 2026년 4월 3일 가동. 창설 즉시 7개 부대 데이터 충돌 요청 접수. Scarlet Dragon 훈련은 처음으로 상용 데이터셋 전장 통합 검증. 군수 보고 18~24시간 지연 문제 확인, Maven Smart System 직접 피딩 방안 검토"
      }
    ],
    articles: [
      {
        id: "48-1",
        newsletter_id: 48,
        topic_en: "Pentagon - R&D Budget",
        topic_kr: "펜타곤의 연구개발 예산 삭감",
        title: "Budget would cut Pentagon research by one-third. Can industry compensate?",
        title_kr: "미 국방부 R&D 예산 1/3 삭감 — 민간 산업이 공백을 메울 수 있는가?",
        source: "Defense One",
        url: "https://www.defenseone.com/policy/2026/04/budget-would-cut-pentagon-research-third-can-industry-compensate/412634/",
        keywords: ["R&D 예산", "FY2027", "국방예산", "기초연구", "응용연구", "중국", "방산 스타트업", "벤처캐피털"],
        summary: "트럼프 행정부 FY2027 국방예산안에서 R&D 예산이 약 1/3(45억 달러) 삭감된다. 기초연구 37억 달러, 응용연구 13억 달러 감소. 우주군이 26억 달러로 가장 큰 부담. 예산안은 삭감 이유를 '불필요한 지출과 woke 낭비'로 모호하게 설명. 반면 중국은 R&D 지출을 2000년 대비 23배(5,690억 달러) 증가. 민간 VC 방산 투자로 일부 보완 가능하나, DoD 계약 편의해지 조항이 기업 선행투자 동기를 구조적으로 제한.",
        date: "2026-04-07"
      },
      {
        id: "48-2",
        newsletter_id: 48,
        topic_en: "DIU - OMEN",
        topic_kr: "DIU의 항공 상황인식 플랫폼 'OMEN'",
        title: "DIU wants 'moving map' to help aircrews with situational awareness",
        title_kr: "DIU, 항공승무원 상황인식 강화를 위한 'OMEN' 플랫폼 프로토타입 공모",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/04/diu-wants-moving-map-to-help-aircrews-with-situational-awareness/",
        keywords: ["DIU", "OMEN", "Open Mission Engine", "전술 이동지도", "항공승무원", "상황인식", "DDIL", "JADC2"],
        summary: "미 방위혁신단(DIU)이 노후 수송·급유기(KC-135, C-17 등)의 실시간 전장인식 문제 해결을 위해 OMEN(Open Mission Engine) 플랫폼 프로토타입 공모를 개시. OMEN은 이기종 데이터 피드를 통합하여 아군 위치·위협·임무 업데이트를 실시간 시각화하는 전술 이동지도를 첫 응용사례로 제시. Battle Network, Unified Data Library, NOTAM 통합, DDIL 환경 운용 적합성 필수. 제안서 마감 2026년 4월 15일, 프로토타입 성공 시 비경쟁 후속 양산 계약 가능.",
        date: "2026-04-07"
      },
      {
        id: "48-3",
        newsletter_id: 48,
        topic_en: "DIU - OMEN",
        topic_kr: "DIU의 항공 상황인식 플랫폼 'OMEN'",
        title: "The Pentagon Wants a \"Moving Map\" for War: DIU's New Push to Upgrade Aircrew Awareness",
        title_kr: "DIU의 항공승무원 전장인식 현대화 추진: OMEN 및 전술 이동지도 플랫폼",
        source: "DIIE Substack",
        url: "https://diie.substack.com/p/the-pentagon-wants-a-moving-map-for",
        keywords: ["DIU", "OMEN", "전술 이동지도", "JADC2", "소프트웨어 정의", "개방형 아키텍처", "DDIL"],
        summary: "미 국방부 JADC2 전환 가속화 맥락에서 DIU가 OMEN(Open Mission Engine) 플랫폼 개발업체를 공모. OMEN은 복수 데이터 소스·앱·도구를 단일 인터페이스에 통합하는 플러그앤플레이 구조. 첫 응용사례인 전술 이동지도는 단순 항법 도구를 넘어 아군·동맹군 위치, 위협, 공역 활동, 임무 업데이트를 실시간 표시하는 '살아있는 작전 디스플레이'로 기획. DDIL 환경 성능 유지 필수. 프로토타입 성공 시 직접 양산 전환 메커니즘 적용.",
        date: "2026-04-08"
      },
      {
        id: "48-4",
        newsletter_id: 48,
        topic_en: "U.S. Army - Scarlet Dragon",
        topic_kr: "미 육군의 데이터 통합 실험 'Scarlet Dragon'",
        title: "Army's Scarlet Dragon exercise adds commercial data to battlefield data flows",
        title_kr: "미 육군 Scarlet Dragon 훈련, 상용 데이터셋 전장 통합 실험",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/04/armys-scarlet-dragon-exercise-adds-commercial-data-to-battlefield-data-flows/",
        keywords: ["Scarlet Dragon", "XVIII Airborne Corps", "상용 데이터", "TITAN", "Maven Smart System", "DDIL", "Kill Chain", "LPI/LPD"],
        summary: "미 육군 제XVIII공수군단이 2026년 3월 30일 포트 브래그에서 분기별 Scarlet Dragon 훈련을 완료. 이번 훈련은 처음으로 상용 데이터셋의 전장 통합 가능성을 본격 실험. 우크라이나 지원 경험 교훈으로 법무 검토 후 상용 데이터 구매·활용 제도 정비 완료. TITAN 시스템 간 데이터 이동 기술 문제 다수 식별. 군수 보고 데이터 전술→군단 이상 전달에 18~24시간 지연 확인, Maven Smart System 직접 피딩 방안 검토. 최종 목표는 지휘관 예측적 군수 시각화 대시보드 구축.",
        date: "2026-04-07"
      },
      {
        id: "48-5",
        newsletter_id: 48,
        topic_en: "U.S. Army - ADOC",
        topic_kr: "미 육군의 데이터 운영센터",
        title: "Army operations center is trying to solve battlefield data problems in real time",
        title_kr: "미 육군 데이터 운영센터(ADOC) 창설 및 전장 데이터 통합 과제",
        source: "Defense Scoop",
        url: "https://defensescoop.com/2026/04/07/army-data-operations-center-plans-adoc/",
        keywords: ["ADOC", "Army Data Operations Center", "다영역작전", "NGC2", "데이터 통합", "클라우드", "Jeth Rey", "180일 시범"],
        summary: "미 육군 데이터 운영센터(ADOC)가 2026년 4월 3일 공식 가동. 창설 직후 7개 부대·기관으로부터 데이터 충돌 해소 요청 접수. 워파이터 참여 셀·피니시 셀·데이터 관리 셀 3개 구조로 즉각 문제 해결과 장기 정책 개선 동시 추진. 동맹군 데이터를 NGC2에 통합하여 단일 화면 비교 사례 제시. 180일 시범 운용 후 상설 여부 결정. LTG 제스 레이: '현대 전장의 핵심은 더 빠른 의사결정을 가능케 하는 데이터 우위'.",
        date: "2026-04-07"
      },
      {
        id: "48-6",
        newsletter_id: 48,
        topic_en: "USAF - CCA(GA-ASI)",
        topic_kr: "미 공군(GA-ASI)의 CCA 시험 비행 중단",
        title: "General Atomics pauses drone wingman flight tests after crash",
        title_kr: "General Atomics YFQ-42A CCA 시험 비행 중 추락, 비행시험 일시 중단",
        source: "Defense One",
        url: "https://www.defenseone.com/defense-systems/2026/04/general-atomics-pauses-drone-wingman-flight-tests-after-crash/412664/",
        keywords: ["CCA", "YFQ-42A", "Dark Merlin", "General Atomics", "Anduril", "YFQ-44A", "반자율", "드론 윙맨"],
        summary: "2026년 4월 6일 GA-ASI의 YFQ-42A 'Dark Merlin'이 팜데일 Gray Butte Field Airport 이륙 직후 추락. CCA 프로그램 최초 공개 비행 사고. 인명 피해 없음, 탑재 안전 시스템 정상 작동. GA-ASI 비행시험 일시 중단. 생산 결정 6개월 내·FY2027 약 10억 달러 예산 배경. 경쟁사 Anduril은 YFQ-44A Arsenal-1 공장 양산 착수·AMRAAM 장착 시험 완료. Northrop Grumman도 YFQ-48A로 합류. YFQ-42A는 2025년 8월 초도비행, 2026년 2월 반자율 임무 시연 완료 이력.",
        date: "2026-04-08"
      },
      {
        id: "48-7",
        newsletter_id: 48,
        topic_en: "U.S. Secret Service - AI Program",
        topic_kr: "미 비밀경호국의 AI 프로그램",
        title: "Secret Service is embedding AI experts across the agency",
        title_kr: "미 비밀경호국(Secret Service), AI 전문가 내부 임베딩 프로그램 가동",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/04/secret-service-embedding-ai-experts-across-agency/412646/",
        keywords: ["비밀경호국", "Secret Service", "AI 임베딩", "Chris Kraft", "AI Corps", "DHS", "역량 내재화"],
        summary: "미 비밀경호국이 AI 전문가 10명을 기관 전반에 임베딩하는 'AI Program' 워킹그룹 발족. CIO Chris Kraft(전 DHS AI Corps 창설자) 주도. 전문가들이 특정 부서 난제 해결 후 다른 부서로 순환. '외주 계약보다 연방 직원으로 내부에 두는 것이 훨씬 가치 있다'는 원칙. 8,000명 직원 전체에 AI 내재화 목표. 이미 번호판 판독 AI·안면인식 기술 활용 중. AI 런치앤런 정기 개최로 학습 문화 조성.",
        date: "2026-04-09"
      },
      {
        id: "48-8",
        newsletter_id: 48,
        topic_en: "CIA - AI Coworker",
        topic_kr: "CIA의 AI 동료(Coworker) 계획",
        title: "CIA plans for 'AI coworkers', deputy director says",
        title_kr: "CIA의 AI '동료(Coworker)' 통합 계획 — 부국장 공개 발언 분석",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/04/cia-plans-ai-coworkers-deputy-director-says/412744/",
        keywords: ["CIA", "AI 동료", "자율 임무 파트너", "Michael Ellis", "SCSP", "Anthropic", "공급업체 다변화", "정보공동체"],
        summary: "CIA 부국장 Michael Ellis, SCSP 행사에서 수년 내 AI 동료를 분석관 워크플로에 통합, 10년 내 자율 임무 파트너 운용 비전 발표. 지난해 CIA 300건+ AI 프로젝트 관리·역사상 최초 AI 생성 정보보고서 작성. 사이버정보센터를 독립 임무센터로 격상, '최상의 AI 모델을 활용하는 측이 막대한 권력'을 가짐. Anthropic 직접 언급 없이 '단일 기업 변덕에 AI 활용 좌우되면 안 된다'며 다중 공급업체 전략 검토. 중국 등 적성국 기술 추적 보고 건수 두 배 확대.",
        date: "2026-04-09"
      },
      {
        id: "48-9",
        newsletter_id: 48,
        topic_en: "GSA - AI Procurement Guidance",
        topic_kr: "GSA의 연방 AI 조달 지침 초안",
        title: "Trade and industry groups warn of risks in GSA's draft AI procurement guidance",
        title_kr: "GSA 연방 AI 조달 지침 초안 — 업계 단체들의 집중 반발",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/acquisition/2026/04/trade-and-industry-groups-warn-risks-gsas-draft-ai-procurement-guidance/412614/",
        keywords: ["GSA", "AI 조달", "GSAR 552.239-7001", "MAS", "BSA", "Anthropic", "lawful use", "서비스 제공자 조항"],
        summary: "GSA가 2026년 3월 6일 AI 조달 조항 초안 GSAR 552.239-7001을 발표. 정부에 광범위한 데이터 소유권·AI '임의 합법 목적' 활용권 부여, 외국산 AI 금지, 계약업체가 3자 AI 제공업체 준수까지 보장 의무. BSA(OpenAI·Microsoft 등 포함)는 경쟁 저해·비용 증가 위험 비판. Americans for Responsible Innovation은 lawful use 범위 모호성으로 감시·심리 프로파일링 가능성 우려. GSA는 의견 제출 마감을 4월 3일로 연장. 2026년 봄 MAS Refresh 32에 포함 예정.",
        date: "2026-04-08"
      },
      {
        id: "48-10",
        newsletter_id: 48,
        topic_en: "Lessons from Wars",
        topic_kr: "드론 위협 시대의 생존성 전략",
        title: "Nowhere is Safe",
        title_kr: "'지상은 더 이상 안전하지 않다': 드론 위협 시대의 생존성 전략 재고",
        source: "Steve Blank Blog",
        url: "https://steveblank.com/2026/04/09/nowhere-is-safe/",
        keywords: ["드론 위협", "생존성", "지하화", "Steve Blank", "우크라이나", "비대칭 전쟁", "방공", "터널"],
        summary: "실리콘밸리 창업·국방혁신 전문가 Steve Blank가 드론이 지상 전역을 경합 공간으로 만들었다고 진단. THAAD·패트리어트 등 방공 체계가 수천 기 드론 비대칭 공격에 역부족. 정유시설·데이터센터 등 민간 인프라 전체 위험 노출. 해법으로 지하화(15~30피트 터널) 제시: ISR 비가시, 드론 침입 불가, 벙커버스터 외 위협 생존. 우크라이나 약 500마일 드론 방지 망터널 설치, 2026년 말 2,500마일 목표. 현 미군 교범은 물리적 방호 사실상 미반영. 국가 전체 생존성 전략 수립 촉구.",
        date: "2026-04-09"
      },
      {
        id: "48-11",
        newsletter_id: 48,
        topic_en: "Mission-oriented AI",
        topic_kr: "미 연방정부의 임무 중심 AI 도입 원칙",
        title: "'AI Is Not the Outcome': Feds Urged to Focus on Mission, Not Hype",
        title_kr: "'AI는 목적이 아니다': 미 연방정부 AI 도입의 임무 중심 접근 원칙",
        source: "MeriTalk",
        url: "https://meritalk.com/articles/ai-is-not-the-outcome-feds-urged-to-focus-on-mission-not-hype/",
        keywords: ["임무 중심 AI", "MeriTalk", "Splunk GovSummit", "국무부", "CISA", "인력 준비태세", "AI 거버넌스"],
        summary: "워싱턴 Splunk GovSummit에서 연방 사이버보안 리더들이 AI 도입의 임무 중심 접근 원칙 강조. 국무부 Manny Medrano: 'AI는 목적이 아니며, 목적은 임무 성공. 도입 전 달성하려는 임무를 먼저 정의해야.' CISA 전 CIO Bob Costello: 체크박스 채우기식 도입 경계, '어떤 문제를 해결하려 하는가?'가 핵심. 인력 준비태세를 AI 확대 도입의 최우선 과제로 제시. 인턴십 등 다양한 경로로 직원들이 새로운 기술에 편안함을 느낄 수준까지 준비시켜야.",
        date: "2026-04-08"
      },
      {
        id: "48-12",
        newsletter_id: 48,
        topic_en: "Anthropic - Project Glasswing",
        topic_kr: "Anthropic의 사이버보안 AI 프로젝트",
        title: "Anthropic's Glasswing initiative raises questions for US cyber operations",
        title_kr: "Project Glasswing과 Claude Mythos: 미 정보기관이 주목하는 Anthropic의 사이버 취약점 탐지 AI",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/cybersecurity/2026/04/anthropics-glasswing-initiative-raises-questions-us-cyber-operations/412721/",
        keywords: ["Project Glasswing", "Claude Mythos", "Anthropic", "제로데이", "NSA", "사이버 취약점", "이중 활용", "공급망 위험"],
        summary: "Anthropic이 AI 기반 사이버 방어 역량 구축을 위한 Project Glasswing 공개. Claude Mythos Preview는 모든 주요 OS·브라우저에서 제로데이 취약점 수천 건 이미 발견, 인간 개입 없이 자율 익스플로잇 능력 보유. AWS·Apple·Cisco·Google·Microsoft 등 선별 파트너에 방어 목적 제한 접근권 부여. NSA 분석관들 비공식 논의 진행. Hunted Labs: '미국 적대국 손에 넘어갈 위험 충분'. Anthropic-DoD 소송 진행 중 발표, 관계 재조정 가능성. FDD: '정부는 Anthropic과 화해해야'.",
        date: "2026-04-10"
      },
      {
        id: "48-13",
        newsletter_id: 48,
        topic_en: "OpenAI - Trusted Access",
        topic_kr: "OpenAI의 AI Guardrail 원칙",
        title: "OpenAI national security lead endorses 'appropriate human judgment' in AI",
        title_kr: "OpenAI 국가안보 총괄, 국방 AI에 '적절한 인간 판단' 원칙 지지 표명",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/04/openai-national-security-lead-endorses-appropriate-human-judgment-ai/412738/",
        keywords: ["OpenAI", "Trusted Access", "인간 판단", "Sasha Baker", "SCSP", "국가안보", "Spud", "AI Guardrail"],
        summary: "OpenAI 국가안보정책 총괄 Sasha Baker, SCSP 컨퍼런스에서 '적절한 인간 판단' 원칙 지지. Anthropic 공급망 위험 지정 직후 DoD 분류망 환경용 AI 계약 신속 체결한 OpenAI의 입장 표명. Trusted Access 프로그램을 사용자 프로토콜 등 안전장치 포함 AI 접근 체계로 소개. 신모델 'Spud' 개발 중, 출시 전 사이버보안 점검 최우선. OpenAI 엔지니어 의회·백악관·국방부 직접 파견으로 정책 입안자들에게 AI 기술 사실 전달·전략적 도입 촉진 활동 추진.",
        date: "2026-04-10"
      }
    ]
  });
})();
