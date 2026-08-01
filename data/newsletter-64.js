(function () {
  window.NEWSLETTERS = window.NEWSLETTERS || [];
  window.NEWSLETTERS.push({
    id: 64,
    title: "국방 AI(AI+IT) 뉴스레터 제64호",
    period: "2026.7.26~8.1",
    date: "2026-08-01",
    key_theme: "Anthropic의 이중 위기(공급망 리스크 소송 vs 자체 AI 침해사고)와 CCA '선택적 소모성' 개념 공식화 — 신뢰·자율성 논쟁이 동시에 격화된 한 주",
    insights: [
      {
        color: "#C62828",
        title: "⚖️ Anthropic 공급망 리스크 소송 — 연방판사 \"증거 불충분\", 그러나 DoD는 9월 29일 퇴출 시한 유지",
        body: "샌프란시스코 연방법원 Rita F. Lin 판사가 DoD의 Anthropic 공급망 리스크 지정 근거(킬스위치 작동 가능성)에 증거가 불충분하다고 재차 지적. 그러나 예비 금지명령이 DoD의 소프트웨어 제거를 막지 않아 9월 29일 시한은 유지, CTO 에밀 마이클은 대체 인프라 전환이 이미 3분의 2 완료됐다고 발표. 항소법원과의 판단 차이로 대법원행 가능성도 상존."
      },
      {
        color: "#FF8F00",
        title: "🚨 Anthropic 자체 AI 침해사고 — Claude가 평가 중 3개 조직 무단 침투, 샌드박스 설정 오류가 원인",
        body: "Anthropic이 Claude Opus 4.7·Mythos 5 등 3개 모델이 보안 평가 중 격리 환경 설정 오류로 실제 인터넷에 접속, 3개 조직 네트워크에 무단 침투했다고 자진 공개. 최신 모델은 실제 시스템임을 인지하자 스스로 공격을 중단해 '신중한 낙관'을 언급했으나, OpenAI GPT-5.6의 유사 사고 공개 직후 발생해 AI 평가 환경 보안 전반에 대한 업계 우려가 재점화."
      },
      {
        color: "#1565C0",
        title: "✈️ CCA \"선택적 소모성(Optionally Attritable)\" 개념 공식화 — 완전 소모품과 장기운용의 절충점",
        body: "공군이 CCA를 '완전 소모성'도 '장기 운용'도 아닌 '선택적 소모성'으로 공식 재정의, 지휘관 판단에 따라 고위험 임무에서만 손실을 감수. 이는 2022~2024년 저비용·완전소모성 노선에서 벗어난 것으로, 공군장관 Troy Meink도 유사 발언. Increment 2는 최대 6개 설계가 프로토타입 단계 진출 예정(2027년 5월), Anduril·GA 외 신규 업체 진입 가능성도 열림."
      },
      {
        color: "#2E7D32",
        title: "🤝 CENTCOM-UAE \"Talon Synapse\" AI TF 창설 — 이란전 UAE 기여와 대UAE 수출통제 완화가 배경",
        body: "CENTCOM이 UAE와 최초의 양자 군사 AI 태스크포스 'Talon Synapse'(아부다비, 약 20명 규모) 창설 발표. 정보지원·핵심인프라 보호가 중점 임무이며, 발표 시점이 상무부의 대UAE 첨단 AI칩 수출통제 완화와 맞물림. 전직 국방 고위관리는 기밀공유 범위·사이버방어 태세 등 실질적 가치가 불분명하다고 회의적 평가, 의회는 중국의 UAE 내 영향력을 우려."
      },
      {
        color: "#6A1B9A",
        title: "🔓 오픈소스 AI 얼라이언스 결성 — NVIDIA 주도 37개사, OpenAI·Anthropic은 불참",
        body: "NVIDIA 주도로 37개 기업이 'Open Secure AI Alliance' 결성, GPT-5.6의 Hugging Face 침해 사건 시 오픈소스 모델(GLM 5.2)로 신속 대응했던 사례를 근거로 오픈소스 AI의 국방 보안 가치를 강조. 정부에 일괄 규제 대신 오픈 AI를 '방어 자산'으로 인식할 것을 촉구. 중국의 Anthropic Fable 모델 증류 의혹과 시기적으로 맞물려 정치적 긴장도 내포."
      }
    ],
    articles: [
      {
        id: "64-1",
        newsletter_id: 64,
        topic_en: "Pentagon - Cloud: Shared Responsibility Model",
        topic_kr: "미 국방부의 클라우드 현대화",
        title: "Defense Officials Urge Agencies to Define Responsibilities Before Cloud Modernization",
        title_kr: "미 국방부, 클라우드 현대화 이전 \"책임소재 사전 정의\" 강조",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/defense-officials-urge-agencies-to-define-responsibilities-before-cloud-modernization/",
        keywords: ["클라우드", "공유책임모델", "AFRL", "USMC", "930gov"],
        summary: "930gov 컨퍼런스에서 AFRL Gordon Deng·USMC Dave Raley가 클라우드 서비스 모델(IaaS/PaaS/관리형) 도입 전 '공유책임모델'로 보안·운영·컴플라이언스 책임소재를 사전 정의해야 한다고 강조. 인프라 통제권을 더 유지할수록 필요 인력도 증가하며, 관리형 서비스 확대가 컴플라이언스 가시성 저하로 이어지지 않는다고 반박.",
        date: "2026-07-29"
      },
      {
        id: "64-2",
        newsletter_id: 64,
        topic_en: "Pentagon - Supply Chain Risk(Anthropic)",
        topic_kr: "미 국방부의 공급망 리스크 소송",
        title: "Judge Questions Pentagon Evidence Behind Anthropic Supply-Chain Risk Designation",
        title_kr: "Anthropic-DoD 공급망 리스크 소송, 연방판사 \"정부 증거 불충분\" 지적",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/judge-questions-pentagon-evidence-behind-anthropic-supply-chain-risk-designation/",
        keywords: ["Anthropic", "공급망리스크", "소송", "Rita Lin", "킬스위치"],
        summary: "샌프란시스코 연방법원 Rita F. Lin 판사가 7월 30일 심리에서 DoD의 Anthropic 공급망 리스크 지정 근거(모델 킬스위치 작동 가능성)가 불충분하다고 재차 지적. 예비 금지명령에도 DoD는 9월 29일까지 Anthropic 소프트웨어 완전 제거를 추진 중이며, CTO 에밀 마이클은 대체 인프라 전환이 3분의 2 완료됐다고 밝힘. 항소법원과 판단이 갈릴 경우 대법원행 가능성.",
        date: "2026-07-31"
      },
      {
        id: "64-3",
        newsletter_id: 64,
        topic_en: "JIATF-401 - cUAS Award",
        topic_kr: "미 드론 TF의 cUAS 계약",
        title: "JIATF-401 awards CACI $500M for non-kinetic cUAS",
        title_kr: "JIATF-401, CACI와 5억 달러 규모 비살상 cUAS 계약 체결",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/07/jiatf-401-awards-caci-500m-for-non-kinetic-cuas/",
        keywords: ["JIATF-401", "CACI", "SkyValor", "cUAS", "Domestic Shield"],
        summary: "국방부 대드론 허브 JIATF-401이 CACI International에 3년·5억 달러 규모 IDIQ 계약 체결, RF 감지·AI 기반 전자전으로 소형드론을 저피해 무력화하는 'SkyValor' 시스템을 '도메스틱 쉴드' 프로그램에 배치. 자동 탐지·교전 알고리즘으로 최대 64km 밖 표적 포착. 앞서 7월 초 AeroVironment와도 유사 규모 계약 체결한 바 있어 국경·이란전 수요로 대드론 조달이 가속화되는 흐름.",
        date: "2026-07-30"
      },
      {
        id: "64-4",
        newsletter_id: 64,
        topic_en: "U.S. CENTCOM - Task Force Talon Synapse",
        topic_kr: "미국-UAE 간 군사 AI TF",
        title: "CENTCOM announces US-UAE task force on AI",
        title_kr: "CENTCOM, 美-UAE 최초 양자 군사 AI 태스크포스 \"Talon Synapse\" 창설",
        source: "Breaking Defense",
        url: "https://breakingdefense.com/2026/07/centcom-announces-us-uae-task-force-on-ai/",
        keywords: ["CENTCOM", "UAE", "Talon Synapse", "AI협력", "수출통제완화"],
        summary: "CENTCOM이 UAE와 최초의 양자 군사 AI 태스크포스 'Talon Synapse'(아부다비, 미-UAE 전문가 약 20명) 창설 발표, 정보지원·핵심인프라 보호·역내 안보 모니터링이 중점 임무. 발표 시점이 상무부의 대UAE 첨단 AI칩·서버 수출통제 완화와 맞물리며, UAE는 이란과의 교전에서 요격·정보제공 등으로 미 이익에 기여한 점이 배경. 전직 국방 고위관리는 실질적 가치가 미지수라 평가, 의회는 중국의 UAE 영향력을 우려.",
        date: "2026-07-28"
      },
      {
        id: "64-5",
        newsletter_id: 64,
        topic_en: "U.S. Navy - Investment Horizons Model",
        topic_kr: "미 해군의 기술 확산 모델",
        title: "Navy CTO Says Pentagon Must Prioritize Scaling Proven Technologies",
        title_kr: "미 해군 CTO, \"펜타곤은 신기술 발명보다 검증된 기술의 확산을 우선해야\"",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/navy-cto-says-pentagon-must-prioritize-scaling-proven-technologies/",
        keywords: ["해군", "Investment Horizons", "IAK", "기술확산", "Justin Fanelli"],
        summary: "해군 CTO Justin Fanelli가 930gov에서 '발명보다 채택·확산 역량 우선'을 강조, 획득주기를 기존 17년에서 18개월~2년으로 단축 목표. Horizon 3(탐색)→2(확산)→1(운영)→0(퇴출)의 4단계 '투자 지평' 모델과 Innovation Adoption Kit(IAK)를 통해 파편화된 개발을 줄이고 성과지표 기반 신속 확산·레거시 퇴출을 병행.",
        date: "2026-07-28"
      },
      {
        id: "64-6",
        newsletter_id: 64,
        topic_en: "USAF - Optionally Attritable CCA",
        topic_kr: "선택적 손실허용/소모성 CCA 개념",
        title: "Air Force Official: CCAs Will Be 'Optionally Attritable'",
        title_kr: "CCA \"선택적 손실허용/소모성(Optionally Attritable)\" 개념 공식화",
        source: "Air & Space Forces Magazine",
        url: "https://www.airandspaceforces.com/air-force-official-cca-optionally-attritable/",
        keywords: ["CCA", "선택적소모성", "YFQ-42A", "YFQ-44A", "Helfrich"],
        summary: "공군 전투기 획득담당관 Timothy Helfrich 대령이 CCA를 완전 소모성도 장기운용도 아닌 '선택적 소모성'으로 공식 재정의, 지휘관 판단에 따라 고위험 임무에서만 손실 감수. 2022~2024년 완전소모성 노선에서 벗어난 개념 재정립으로, 공군장관 Troy Meink도 유사 발언. GA의 YFQ-42A(내부 무장창)·Anduril의 YFQ-44A(외부 탑재, 7월 15일 실사격 완료)는 대당 3천만 달러 미만 목표를 상회 달성 중.",
        date: "2026-07-30"
      },
      {
        id: "64-7",
        newsletter_id: 64,
        topic_en: "USAF - CCA Increment 2",
        topic_kr: "미 공군 CCA Increment 2 설계 프로토타입",
        title: "Up to six designs could move ahead in Air Force's next robot-wingman effort",
        title_kr: "미 공군 CCA Increment 2, 최대 6개 설계안 프로토타입 단계 진출 전망",
        source: "Defense One",
        url: "https://www.defenseone.com/defense-systems/2026/07/cca-usaf-robot-wingman/415093/",
        keywords: ["CCA Increment 2", "프로토타입", "Anduril", "General Atomics", "Fury"],
        summary: "공군 CCA Increment 2 개념정제 계약이 2027년 5월경 마무리되며 최대 6개 설계안이 프로토타입 단계로 진출 전망. 2025년 12월 기준 9개사가 계약 획득, 추가 11개사가 경쟁자격 유지 중이며 신규 업체 진입 가능성도 열림. Increment 1에서는 보잉·록히드마틴·노스롭그루먼이 초기 자금은 받았으나 최종적으로 Anduril·GA만 양산 진입, 이번 주 Anduril이 첫 Fury CCA를 오하이오 공장에서 공개.",
        date: "2026-07-29"
      },
      {
        id: "64-8",
        newsletter_id: 64,
        topic_en: "NIST - AITE",
        topic_kr: "NIST의 AI 평가 플랫폼",
        title: "NIST unveils new AI evaluation platform",
        title_kr: "NIST, 신규 AI 평가 플랫폼 'AITE' 출범",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/07/nist-unveils-new-ai-evaluation-platform/415035/",
        keywords: ["NIST", "AITE", "AI평가", "CAISI", "블라인드데이터"],
        summary: "NIST가 7월 27일 'AI Technology Evaluation(AITE)' 프로그램 출범, 격리된 테스트베드에서 비공개 데이터로 AI 모델을 평가하는 자발적 참여 방식. 초기 3대 영역은 양자과학·유전체학·공공안전이며 대형 비전-언어 모델의 이미지 분석 과제부터 8월 착수. 5월 CAISI가 발표한 Google DeepMind·Microsoft·xAI 3개사 모델 평가 협력의 연장선.",
        date: "2026-07-27"
      },
      {
        id: "64-9",
        newsletter_id: 64,
        topic_en: "OMB - AI Cyber Deployment",
        topic_kr: "OMB의 AI 사이버 방어 도입 지연 이슈 제기",
        title: "OMB Says Compliance Still Slows AI Cyber Deployment",
        title_kr: "OMB, \"규제 준수 부담이 AI 사이버 방어 도입 지연시켜\"",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/omb-says-compliance-still-slows-ai-cyber-deployment/",
        keywords: ["OMB", "컴플라이언스", "AI사이버방어", "FBI", "Mythos"],
        summary: "OMB 사이버보안 담당 Nick Polk가 930gov에서 낡은 컴플라이언스 프로세스가 AI 사이버 방어체계 실전 배치의 최대 장애물이라 지적, 섀도우 IT 등 전체 공격표면 파악 미흡도 언급. FBI 사이버국 Todd Hemmen은 AI로 침투~유출 소요시간이 '일 단위'에서 '분 단위'로 단축됐다 경고하며, Anthropic Mythos 모델의 취약점 발견 능력이 적성국에 넘어갈 경우의 위험을 지적.",
        date: "2026-07-28"
      },
      {
        id: "64-10",
        newsletter_id: 64,
        topic_en: "GAO - AI Privacy Guidance",
        topic_kr: "GAO의 AI 프라이버시 가이드라인 지연 지적",
        title: "GAO Official: OMB 'Lagging' on AI Privacy Guidance",
        title_kr: "GAO, OMB의 AI 프라이버시 가이드라인 대응 \"지연\" 지적",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/gao-official-omb-lagging-on-ai-privacy-guidance/",
        keywords: ["GAO", "OMB", "AI프라이버시", "Cruz Cain", "연방프라이버시법"],
        summary: "GAO IT·사이버보안팀 국장 Marisol Cruz Cain이 930gov에서 OMB의 AI 프라이버시 지침이 기술 발전 속도에 뒤처져 있다고 지적, GAO의 3월 권고(위험사례 제공·생애주기 전반 지침 발간)에 OMB가 수개월째 무응답이라 밝힘. 1974년 제정 프라이버시법이 AI 이전 시대 법률이며 미국이 포괄적 연방 프라이버시법을 여전히 갖추지 못했다고 지적, NIST 등이 AI 모델 프라이버시 감사 모델을 마련하길 기대.",
        date: "2026-07-28"
      },
      {
        id: "64-11",
        newsletter_id: 64,
        topic_en: "GSA - U.S. Digital Corps",
        topic_kr: "GSA의 U.S. Digital Corps 졸업생 배출",
        title: "GSA Celebrates Largest Graduating Class of U.S. Digital Corps Fellows",
        title_kr: "GSA, 역대 최대 규모의 U.S. Digital Corps 졸업 기수 배출",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/gsa-celebrates-largest-graduating-class-of-u-s-digital-corps-fellows/",
        keywords: ["GSA", "Digital Corps", "펠로우십", "AI인재", "OPM"],
        summary: "GSA가 7월 29일 15개 연방기관에 배치됐던 청년 IT 인재 71명의 2년 펠로우십 수료식 개최, AI 도입 가속화·사이버보안·부정수급 방지 등 핵심 IT 현대화 프로젝트를 수행하며 트럼프 행정부의 'America's AI Action Plan'과 연계 업무에 참여. GSA청장 Edward Forst는 기술현대화의 핵심이 '인재'라 강조, OPM처장 Scott Kupor는 기존 관행에 '왜'라는 질문을 던질 것을 당부.",
        date: "2026-07-30"
      },
      {
        id: "64-12",
        newsletter_id: 64,
        topic_en: "DoS - GenAI Playbook",
        topic_kr: "미 국무부의 GenAI 플레이북",
        title: "State Dept. Releases GenAI Playbook",
        title_kr: "국무부 GenAI 플레이북 발간 — StateChat 사례 기반 연방기관용 로드맵",
        source: "MeriTalk",
        url: "https://www.meritalk.com/articles/state-dept-releases-genai-playbook/",
        keywords: ["국무부", "StateChat", "GenAI플레이북", "에이전틱AI", "TMF"],
        summary: "국무부가 자체 생성형 AI 'StateChat'(2026년 6월 기준 전 세계 재외공관 98%, 6만 2천여 명 사용) 성공 경험을 바탕으로 타 부처용 'GenAI 플레이북' 발표. 알파(150명)→베타(8,000명)→전사(62,000명+) 단계적 확산, FISMA High ATO 획득에 약 1년 소요. 사용자 설문 90%가 시간절감을 보고했으며, 향후 다중 AI 에이전트가 협업하는 '에이전틱 AI' 체계로의 전환을 제시.",
        date: "2026-07-27"
      },
      {
        id: "64-13",
        newsletter_id: 64,
        topic_en: "Ukraine - Stone Cloak",
        topic_kr: "영국 재밍 시스템(Stone Cloak)의 우크라이나 기술 이전",
        title: "How the U.K. is helping Ukraine hit Russian targets",
        title_kr: "영국, 우크라이나의 대러시아 타격 지원 — Stone Cloak 재밍 시스템 기술 이전",
        source: "Defense One",
        url: "https://www.defenseone.com/technology/2026/07/how-uk-helping-ukraine-hit-russian-targets/415077/",
        keywords: ["영국", "우크라이나", "Stone Cloak", "기술이전", "Breakstop"],
        summary: "영국이 러시아 방공망 무력화용 디지털 재머 'Stone Cloak' 디자인 권한을 우크라이나에 이전, 현지 대량생산을 가능케 함. 7월 26일 포츠머스 해군기지 젤렌스키-버넘 정상회담에서 공개, 기존 완제품 공급(Storm Shadow 등) 방식에서 IP 이전 중심으로 전환. 2024년부터 진행 중인 'Breakstop' 공동개발 장거리 타격 드론은 개념부터 실전배치까지 24개월 이내로 스톰섀도우보다 훨씬 빠르고 저비용.",
        date: "2026-07-29"
      },
      {
        id: "64-14",
        newsletter_id: 64,
        topic_en: "Anthropic - AI Breach",
        topic_kr: "Anthropic AI의 무단접근 이슈",
        title: "Anthropic confirms its AI breached 3 organizations during testing",
        title_kr: "Anthropic, 자체 평가 과정서 3개 조직 시스템 무단접근 인정",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/cybersecurity/2026/07/anthropic-confirms-its-ai-breached-3-organizations-during-testing/415138/",
        keywords: ["Anthropic", "Claude", "AI침해", "샌드박스", "Irregular"],
        summary: "Anthropic이 Claude Opus 4.7·Mythos 5 등 모델이 평가 중 격리환경 설정 오류로 인터넷에 접속해 3개 조직 네트워크에 무단 침투했다고 자진 공개. 141,006건 평가 전수 검토 결과 3건에서 발생, 원인은 평가 파트너 Irregular와의 '오해'로 인터넷 접근 권한이 부여된 것. 최신 모델은 실제 시스템 접촉을 인지하자 스스로 공격 중단, OpenAI GPT-5.6 사고 공개 직후 발생해 AI 평가 환경 보안 우려 재점화.",
        date: "2026-07-31"
      },
      {
        id: "64-15",
        newsletter_id: 64,
        topic_en: "Open Secure AI Alliance",
        topic_kr: "오픈소스 AI 얼라이언스 결성",
        title: "Over 30 companies form open-source AI alliance",
        title_kr: "오픈소스 AI 얼라이언스 결성 — NVIDIA 주도 37개사",
        source: "Nextgov/FCW",
        url: "https://www.nextgov.com/artificial-intelligence/2026/07/over-30-companies-form-open-source-ai-alliance/415028/",
        keywords: ["오픈소스AI", "NVIDIA", "Open Secure AI Alliance", "GLM", "국방보안스택"],
        summary: "NVIDIA 주도로 37개 하드웨어·소프트웨어 기업이 'Open Secure AI Alliance' 결성, GPT-5.6의 Hugging Face 침해 사고 시 오픈소스 모델(GLM 5.2)로 즉시 대응했던 사례를 근거로 오픈소스 AI의 보안 가치를 강조. OpenAI·Anthropic은 불참. NVIDIA는 파이썬 기반 에이전트 저장소 공개, 정책입안자들에 오픈 AI 모델을 안보자산으로 인식하고 일괄규제를 지양할 것을 촉구.",
        date: "2026-07-27"
      },
      {
        id: "64-16",
        newsletter_id: 64,
        topic_en: "Drone - Ejection-seat Makers",
        topic_kr: "유인기 사출좌석 제조사의 드론 시대 대응",
        title: "As drones take over, ejection-seat makers prepare for a pilotless battlefield",
        title_kr: "무인기 시대의 사출좌석 제조사 — Martin-Baker의 대응",
        source: "Defense One",
        url: "https://www.defenseone.com/threats/2026/07/ejection-seat-unmanned-aircraft/415008/",
        keywords: ["Martin-Baker", "Collins Aerospace", "사출좌석", "CCA", "Sidekick"],
        summary: "무인기 확산에 사출좌석 전문업체들이 사업 다각화 추진. Martin-Baker는 드론 제조사에 발사시스템·전자모듈·탑재체 파괴 기술 지원을 타진, Collins Aerospace(RTX)는 기존 사출좌석 공급과 함께 CCA용 자율비행 소프트웨어 'Sidekick' 개발에 직접 투자. GCAP·F-47·F/A-XX 등 차세대 유인기 사업이 지속돼 유인기용 사출좌석 수요는 장기 안정적 전망, 판버러에서 Pratt & Whitney·Raytheon도 CCA 관련 이정표 발표.",
        date: "2026-07-24"
      }
    ]
  });
})();
