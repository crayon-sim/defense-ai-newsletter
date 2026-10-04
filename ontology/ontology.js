/**
 * 국방 AI(AI+IT) 뉴스레터 아카이브 — 온톨로지 페이지(ontology.html) 앱
 *
 * config.js에 등록된 뉴스레터 파일과 엔터티 사전(ontology/entities.js)을 읽어
 * 오브젝트·속성·링크(시맨틱)와 액션·함수(키네틱)를 브라우저에서 구성한다.
 * 그래프는 d3(v7)로 그린다. 온톨로지 개념은 Palantir Foundry 문서를 참고했다.
 */
(function () {
  'use strict';

  // ───────── 공통 도우미 ─────────
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const fmt = n => Number(n).toLocaleString('ko-KR');
  const tc = t => 'var(--t-' + t + ')';
  const pct = (a, b) => (b ? (100 * a / b).toFixed(1) : '0.0') + '%';
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const store = {
    get(k, d) { try { const v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경 */ } },
  };
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  // ───────── 별칭 규칙 (사전 → 매칭기) ─────────
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function compileAlias(a) {
    try {
      if (a && typeof a === 'object') return { kind: 're', re: new RegExp(a.r, a.f || ''), src: a };
      let s = String(a), cs = false;
      if (s.startsWith('=')) { cs = true; s = s.slice(1); }
      if (/^[\x00-\x7F]+$/.test(s)) return { kind: 're', re: new RegExp('(?<![A-Za-z0-9])' + reEsc(s) + '(?![A-Za-z0-9])', cs ? '' : 'i'), src: s };
      const compact = s.replace(/\s+/g, '').toLowerCase();
      return compact.length <= 2 ? { kind: 'exact', str: s, src: s } : { kind: 'compact', str: compact, src: s };
    } catch (err) { return null; }
  }
  const prepText = text => ({ full: text, compact: text.replace(/\s+/g, '').toLowerCase() });
  function hit(c, T) {
    if (c.kind === 'exact') return T.full.includes(c.str);
    if (c.kind === 'compact') return T.compact.includes(c.str);
    return c.re.test(T.full);
  }

  // ───────── 아카이브 데이터 → 온톨로지 ─────────
  // config.js에 등록된 뉴스레터 파일(window.NEWSLETTERS)과 엔터티 사전(window.ONTOLOGY_DICT)으로
  // 페이지를 열 때마다 새로 구성한다. 새 호가 추가되면 별도 작업 없이 반영된다.
  function buildOntology(DICT, NLS) {
    if (!DICT || !Array.isArray(DICT.ENTITIES)) throw new Error('엔터티 사전(ontology/entities.js)을 읽지 못했습니다');
    const seen = new Set();
    // 호 번호가 문자열로 저장된 파일(예: id: "52")도 숫자로 맞춘다
    const issues = NLS.filter(Boolean).map(n => Object.assign({}, n, { id: Number(n.id) }))
      .filter(n => Number.isFinite(n.id) && !seen.has(n.id) && seen.add(n.id)).sort((a, b) => a.id - b.id);
    if (!issues.length) throw new Error('뉴스레터 데이터를 읽지 못했습니다');
    const ser = x => (x instanceof RegExp ? { r: x.source, f: x.flags.replace('g', '') } : x);
    const E = DICT.ENTITIES.map(e => {
      const a = (e.a || []).map(ser);
      return { id: e.id, t: e.t, n: e.n, e: e.e || e.n, p: e.p || {}, rel: e.rel || [], hub: !!e.hub, a, comp: a.map(compileAlias).filter(Boolean) };
    });
    const matchAll = T => {
      const out = [];
      for (let i = 0; i < E.length; i++) { const c = E[i].comp; for (let k = 0; k < c.length; k++) if (hit(c[k], T)) { out.push(i); break; } }
      return out;
    };
    const cat = {};
    Object.keys(DICT.SRC_CAT || {}).forEach(c => DICT.SRC_CAT[c].forEach(s => { cat[s] = c; }));
    const sources = [], srcIdx = new Map();
    const getSrc = raw => {
      const s = String(raw || '').trim(), n = (DICT.SRC_NORM || {})[s] || s;
      if (!srcIdx.has(n)) { srcIdx.set(n, sources.length); sources.push([n, cat[n] || '종합·경제·IT 언론']); }
      return srcIdx.get(n);
    };
    const rows = [], hits = new Array(E.length).fill(0);
    issues.forEach(nl => (nl.articles || []).forEach((a, k) => {
      const kw = (a.keywords || []).map(x => String(x).trim()).filter(Boolean);
      const T = prepText([a.title, a.title_kr, a.summary, kw.join(' | '), a.topic_en, a.topic_kr].join(' ¦ '));
      const ents = matchAll(T);
      ents.forEach(i => { hits[i]++; });
      rows.push({ a, nl, kw, ents, T, src: getSrc(a.source), id: a.id || nl.id + '-' + (k + 1) });
    }));
    const kwCount = new Map();
    rows.forEach(r => r.kw.forEach(k => kwCount.set(k, (kwCount.get(k) || 0) + 1)));
    const entKw = E.map(() => []), unmapped = [];
    let kwOcc = 0, kwMappedOcc = 0, kwMappedUnique = 0;
    kwCount.forEach((c, k) => {
      const m = matchAll(prepText(k));
      kwOcc += c;
      if (m.length) { kwMappedOcc += c; kwMappedUnique++; m.forEach(i => entKw[i].push([k, c])); }
      else unmapped.push([k, c]);
    });
    entKw.forEach(l => l.sort((x, y) => y[1] - x[1]));
    // 언급된 오브젝트와, 그 오브젝트가 속성으로 가리키는 오브젝트만 남긴다
    const ref = new Set(['us']);
    E.forEach((e, i) => {
      if (!hits[i]) return;
      const p = e.p;
      ['country', 'parent', 'aff', 'affc', 'dev', 'iss'].forEach(k => { if (p[k]) ref.add(p[k]); });
      (p.op || []).forEach(x => ref.add(x)); (p.ctr || []).forEach(x => ref.add(x)); e.rel.forEach(x => ref.add(x));
    });
    const newIdx = [], ents = [];
    E.forEach((e, i) => {
      if (!hits[i] && !ref.has(e.id)) { newIdx[i] = -1; return; }
      newIdx[i] = ents.length;
      ents.push(Object.assign(e, { kw: entKw[i].slice(0, 14), kwN: entKw[i].length, kwOcc: entKw[i].reduce((s, x) => s + x[1], 0) }));
    });
    let links = 0;
    const arts = rows.map(r => {
      const es = r.ents.map(i => newIdx[i]).filter(i => i >= 0), a = r.a;
      links += es.length;
      return [r.id, r.nl.id, a.date || r.nl.date || '', r.src, a.title || '', a.title_kr || '', a.summary || '', a.url || '', a.topic_en || '', r.kw, es, a.topic_kr || '', r.T];
    });
    return {
      meta: { latest: issues[issues.length - 1].date || '', dict: DICT.VERSION || '', issues: issues.length, articles: arts.length, kwUnique: kwCount.size, kwOcc, kwMappedOcc, kwMappedUnique, links, unmappedTop: unmapped.sort((x, y) => y[1] - x[1]).slice(0, 40) },
      issues: issues.map(n => [n.id, n.period || '', n.date || '', n.key_theme || '']),
      sources, ents, arts,
    };
  }

  // ───────── 데이터 ─────────
  let D;
  try { D = buildOntology(window.ONTOLOGY_DICT, window.NEWSLETTERS || []); }
  catch (err) {
    const m = document.getElementById('boot-msg');
    if (m) m.textContent = '온톨로지를 구성하지 못했습니다: ' + err.message + '. 새로고침해 보세요.';
    return;
  }
  const ISS = D.issues.map(([id, period, date, theme]) => ({ id, period, date, theme }));
  const NI = ISS.length;
  const IX = new Map(ISS.map((x, k) => [x.id, k]));
  const FIRST = ISS[0].id, LAST = ISS[NI - 1].id;
  const YEAR_MARKS = [];
  ISS.forEach((x, k) => { if (k && x.date.slice(0, 4) !== ISS[k - 1].date.slice(0, 4)) YEAR_MARKS.push({ k, year: x.date.slice(0, 4) }); });
  const LAST_YEAR_K = YEAR_MARKS.length ? YEAR_MARKS[YEAR_MARKS.length - 1].k : 0;
  const SRC = D.sources.map(([name, cat], i) => ({ i, name, cat, arts: [] }));
  const ENTS = D.ents.map((e, i) => Object.assign({}, e, { i, arts: [], trend: new Array(NI).fill(0) }));
  const EID = new Map(ENTS.map(e => [e.id, e]));
  const ARTS = D.arts.map(([id, issue, date, src, en, kr, sum, url, topic, kw, ents, topicKr, T], i) =>
    ({ i, id, issue, k: IX.get(issue), date, src, en, kr, sum, url, topic: topic || '', topicKr: topicKr || '', kw: Array.isArray(kw) ? kw : kw ? kw.split('|') : [], ents, T }));
  const ISS_ARTS = ISS.map(() => []);
  ARTS.forEach(a => {
    SRC[a.src].arts.push(a.i);
    ISS_ARTS[a.k].push(a.i);
    a.ents.forEach(j => { const e = ENTS[j]; e.arts.push(a.i); e.trend[a.k]++; });
  });
  function nextPeriod() {
    const d = new Date(ISS[NI - 1].date + 'T00:00:00');
    if (isNaN(d)) return '';
    const s = new Date(d), e = new Date(d);
    s.setDate(d.getDate() + 1); e.setDate(d.getDate() + 7);
    const f = (x, y, m) => (y ? x.getFullYear() + '.' : '') + (m ? (x.getMonth() + 1) + '.' : '') + x.getDate();
    const newYear = e.getFullYear() !== s.getFullYear();
    return f(s, true, true) + '~' + f(e, newYear, newYear || e.getMonth() !== s.getMonth());
  }
  const byRecent = (x, y) => (ARTS[y].date > ARTS[x].date ? 1 : ARTS[y].date < ARTS[x].date ? -1 : ARTS[y].issue - ARTS[x].issue);

  const ENT_TYPES = ['org', 'company', 'person', 'country', 'program', 'model', 'policy', 'domain', 'event'];
  const TYPE_META = {
    issue:   { ko: '뉴스레터 호', api: 'NewsletterIssue', pk: 'issueId', title: 'period', desc: '매주 발행된 뉴스레터 한 호. 발행 기간과 핵심 주제를 가진다.' },
    article: { ko: '기사', api: 'Article', pk: 'articleId', title: 'titleKr', desc: '뉴스레터에 수록된 기사 한 건. 한·영 제목, 요약, 키워드, 원문 URL을 가진다.' },
    source:  { ko: '출처', api: 'Source', pk: 'sourceName', title: 'sourceName', desc: '기사를 보도한 매체·기관. 표기가 다른 이름을 하나로 합치고 7개 분류로 나눴다.' },
    org:     { ko: '기관', api: 'Organization', desc: '정부 부처, 군, 정보기관, 국제기구, 연구기관. 상위 기관 링크로 계층을 이룬다.' },
    company: { ko: '기업', api: 'Company', desc: '프론티어 AI 랩, 빅테크·클라우드, 방산 테크, 전통 방산 기업.' },
    person:  { ko: '인물', api: 'Person', desc: '정책 결정자와 기업 리더. 소속 기관이나 소속 기업으로 연결된다.' },
    country: { ko: '국가·지역', api: 'Country', desc: '국가와 지역. 미국 기준 진영(동맹·경쟁·적대)을 속성으로 가진다.' },
    program: { ko: '사업·프로그램', api: 'Program', desc: '국방·정부의 AI 사업, 무기체계, 플랫폼, 조달 수단. 운용 기관과 참여 기업으로 연결된다.' },
    model:   { ko: 'AI 모델', api: 'AiModel', desc: 'LLM, 자율·지휘통제 소프트웨어 등 AI 모델과 플랫폼 제품. 개발사로 연결된다.' },
    policy:  { ko: '정책·제도', api: 'Policy', desc: '법률, 행정명령, 인증·획득 제도, 국가 전략. 주관 기관으로 연결된다.' },
    domain:  { ko: '기술·임무 영역', api: 'MissionDomain', desc: '드론, 사이버, 생성형 AI처럼 기사들이 다루는 기술·임무 영역.' },
    event:   { ko: '사건·행사', api: 'Event', desc: '무력 충돌, 정책 분쟁, 보안 사고, 컨퍼런스. 관련 오브젝트로 연결된다.' },
  };
  ENT_TYPES.forEach(t => { TYPE_META[t].pk = 'objectId'; TYPE_META[t].title = 'nameKr'; });

  // 유형별 고유 속성: [API 이름, 표시 이름, 기본 유형, 값, 참조 방식]
  const PROP_DEFS = {
    org:     [['category', '카테고리', 'String', e => e.p.cat], ['countryId', '소속 국가', 'String · FK', e => e.p.country, 'ref'], ['parentId', '상위 기관', 'String · FK', e => e.p.parent, 'ref']],
    company: [['category', '카테고리', 'String', e => e.p.cat], ['countryId', '본사 국가', 'String · FK', e => e.p.country, 'ref']],
    person:  [['role', '직책', 'String', e => e.p.role], ['organizationId', '소속 기관', 'String · FK', e => e.p.aff, 'ref'], ['companyId', '소속 기업', 'String · FK', e => e.p.affc, 'ref']],
    country: [['bloc', '진영', 'String', e => e.p.bloc]],
    program: [['category', '카테고리', 'String', e => e.p.cat], ['operatorIds', '운용 기관', 'Array<String> · FK', e => e.p.op, 'refs'], ['contractorIds', '참여 기업', 'Array<String> · FK', e => e.p.ctr, 'refs']],
    model:   [['modelKind', '모델 유형', 'String', e => e.p.kind], ['developerId', '개발사', 'String · FK', e => e.p.dev, 'ref']],
    policy:  [['policyKind', '제도 유형', 'String', e => e.p.kind], ['issuerId', '주관 기관', 'String · FK', e => e.p.iss, 'ref']],
    domain:  [['domainGroup', '영역 분류', 'String', e => e.p.cat]],
    event:   [['eventKind', '사건 유형', 'String', e => e.p.kind], ['period', '기간', 'String', e => e.p.period], ['relatedIds', '관련 오브젝트', 'Array<String> · FK', e => e.rel, 'refs']],
  };
  // 언급 대상 인터페이스의 공유 속성
  const SHARED = [
    ['objectId', '기본 키', 'String', 'PK', e => e.id],
    ['nameKr', '이름', 'String', '타이틀', e => e.n],
    ['nameEn', '영문 이름', 'String', '', e => e.e],
    ['aliases', '별칭', 'Array<String>', '', e => e.a.length ? e.a : null],
    ['mentionCount', '언급 기사 수', 'Integer', '파생', e => e.hub ? null : e.arts.length],
    ['firstIssue', '최초 언급 호', 'Integer', '파생', e => e.first],
    ['lastIssue', '최근 언급 호', 'Integer', '파생', e => e.last],
  ];

  const LINK_TYPES = [
    { id: 'publishedIn', ko: '수록 호', inv: '수록 기사', from: 'article', to: 'issue', card: 'N:1', impl: '외래 키 · Article.issueId' },
    { id: 'reportedBy', ko: '출처', inv: '보도 기사', from: 'article', to: 'source', card: 'N:1', impl: '외래 키 · Article.sourceName' },
    { id: 'mentions', ko: '언급', inv: '언급한 기사', from: 'article', to: 'mentionable', card: 'N:N', impl: '조인 테이블 · article_mentions' },
    { id: 'belongsToCountry', ko: '소속 국가', inv: '소속 기관', from: 'org', to: 'country', card: 'N:1', impl: '외래 키 · Organization.countryId' },
    { id: 'parentOrganization', ko: '상위 기관', inv: '하위 기관', from: 'org', to: 'org', card: 'N:1', impl: '외래 키 · Organization.parentId' },
    { id: 'headquarteredIn', ko: '본사 국가', inv: '본사 소재 기업', from: 'company', to: 'country', card: 'N:1', impl: '외래 키 · Company.countryId' },
    { id: 'affiliatedOrg', ko: '소속 기관', inv: '소속 인물', from: 'person', to: 'org', card: 'N:1', impl: '외래 키 · Person.organizationId' },
    { id: 'affiliatedCompany', ko: '소속 기업', inv: '소속 인물', from: 'person', to: 'company', card: 'N:1', impl: '외래 키 · Person.companyId' },
    { id: 'developedBy', ko: '개발사', inv: '개발 모델', from: 'model', to: 'company', card: 'N:1', impl: '외래 키 · AiModel.developerId' },
    { id: 'operatedBy', ko: '운용 기관', inv: '운용 사업', from: 'program', to: 'org', card: 'N:N', impl: '조인 테이블 · program_operators' },
    { id: 'contractedWith', ko: '참여 기업', inv: '참여 사업', from: 'program', to: 'company', card: 'N:N', impl: '조인 테이블 · program_contractors' },
    { id: 'issuedBy', ko: '주관 기관', inv: '주관 정책·제도', from: 'policy', to: 'org', card: 'N:1', impl: '외래 키 · Policy.issuerId' },
    { id: 'involves', ko: '관련 오브젝트', inv: '관련 사건', from: 'event', to: 'mentionable', card: 'N:N', impl: '조인 테이블 · event_related' },
    { id: 'coMentionedWith', ko: '동시 언급', inv: '동시 언급', from: 'mentionable', to: 'mentionable', card: 'N:N', impl: '파생 · 같은 기사에 함께 언급된 횟수(가중치)', derived: true },
  ];
  const LT = Object.fromEntries(LINK_TYPES.map(l => [l.id, l]));
  const endKo = t => (t === 'mentionable' ? '언급 대상' : TYPE_META[t].ko);

  // 큐레이션(스키마) 링크 인스턴스
  const CLINKS = [];
  ENTS.forEach(e => {
    const p = e.p || {};
    const add = (lt, id) => { const t = EID.get(id); if (t && t !== e) CLINKS.push({ lt, s: e.i, t: t.i }); };
    if (e.t === 'org') { if (p.country) add('belongsToCountry', p.country); if (p.parent) add('parentOrganization', p.parent); }
    if (e.t === 'company' && p.country) add('headquarteredIn', p.country);
    if (e.t === 'person') { if (p.aff) add('affiliatedOrg', p.aff); if (p.affc) add('affiliatedCompany', p.affc); }
    if (e.t === 'model' && p.dev) add('developedBy', p.dev);
    if (e.t === 'program') { (p.op || []).forEach(x => add('operatedBy', x)); (p.ctr || []).forEach(x => add('contractedWith', x)); }
    if (e.t === 'policy' && p.iss) add('issuedBy', p.iss);
    if (e.t === 'event') (e.rel || []).forEach(x => add('involves', x));
  });
  const OUT = ENTS.map(() => []), INN = ENTS.map(() => []);
  CLINKS.forEach(l => { OUT[l.s].push(l); INN[l.t].push(l); });

  const LABEL_FIX = { stanford: '스탠퍼드대', ev_anthropic: 'Anthropic 분쟁', ev_contain: '모델 격리 이탈', ev_ukrwar: '우크라이나 전쟁', ev_dmdc: 'DMDC 유출', ev_epicfury: '이란전', ev_cnhack: '중국 사이버 공작', ev_distill: '중국 모델 증류', indopac: '인도태평양' };
  function shortLabel(e) {
    if (LABEL_FIX[e.id]) return LABEL_FIX[e.id];
    const m = /^(.+?)\(([^()]+)\)$/.exec(e.n);
    if (m) return /^[A-Z0-9][A-Z0-9\-.&]{1,8}$/.test(m[2]) ? m[2] : m[1].trim();
    return e.n;
  }
  ENTS.forEach(e => {
    e.total = e.arts.length;
    e.arts.sort(byRecent);
    const f = e.trend.findIndex(v => v > 0);
    e.first = f >= 0 ? ISS[f].id : null;
    let l = -1; for (let k = NI - 1; k >= 0; k--) if (e.trend[k]) { l = k; break; }
    e.last = l >= 0 ? ISS[l].id : null;
    e.label = shortLabel(e);
  });
  const RANKED = ENTS.filter(e => !e.hub).sort((a, b) => b.total - a.total || a.i - b.i);

  // ───────── 기간별 언급·동시 언급 집계 ─────────
  const periodCache = new Map();
  function periodStats(from, to) {
    const key = from + '-' + to;
    if (periodCache.has(key)) return periodCache.get(key);
    const cnt = new Int32Array(ENTS.length);
    const pairs = new Map();
    let nArts = 0;
    for (const a of ARTS) {
      if (a.issue < from || a.issue > to) continue;
      nArts++;
      const es = a.ents;
      for (let x = 0; x < es.length; x++) {
        cnt[es[x]]++;
        for (let y = x + 1; y < es.length; y++) {
          const u = Math.min(es[x], es[y]), v = Math.max(es[x], es[y]);
          const k = u * 1024 + v;
          pairs.set(k, (pairs.get(k) || 0) + 1);
        }
      }
    }
    const adj = ENTS.map(() => []);
    for (const [k, w] of pairs) { const u = k >> 10, v = k & 1023; adj[u].push([v, w]); adj[v].push([u, w]); }
    adj.forEach(l => l.sort((p, q) => q[1] - p[1] || p[0] - q[0]));
    const r = { from, to, cnt, pairs, adj, nArts };
    periodCache.set(key, r);
    return r;
  }
  const ALL = periodStats(FIRST, LAST);
  const cosine = (P, a, b, w) => w / Math.sqrt(P.cnt[a] * P.cnt[b]);

  // ───────── 별칭 규칙 활용 ─────────
  const compiled = e => e.comp || (e.comp = e.a.map(compileAlias).filter(Boolean));
  function matchText(text) {
    const T = prepText(text);
    const out = [];
    for (const e of ENTS) {
      if (e.hub) continue;
      for (const c of compiled(e)) if (hit(c, T)) { out.push({ e, alias: c.src }); break; }
    }
    return out;
  }
  const artText = a => a.T || (a.T = prepText([a.en, a.kr, a.sum, a.kw.join(' | '), a.topic, a.topicKr].join(' ¦ ')));
  function reHuman(src) {
    let out = '', i = 0;
    while (i < src.length) {
      if (src[i] === '\\') { out += src.slice(i, i + 2); i += 2; continue; }
      if (src.startsWith('(?<!', i) || src.startsWith('(?<=', i) || src.startsWith('(?!', i) || src.startsWith('(?=', i)) {
        let depth = 0, j = i;
        for (; j < src.length; j++) { if (src[j] === '\\') { j++; continue; } if (src[j] === '(') depth++; else if (src[j] === ')') { depth--; if (!depth) break; } }
        i = j + 1; continue;
      }
      out += src[i++];
    }
    out = out.replace(/\\d/g, 'N').replace(/\\s[?*+]?/g, ' ').replace(/\\(.)/g, '$1');
    const runs = out.match(/[가-힣A-Za-z0-9][가-힣A-Za-z0-9 .\-]*/g) || [];
    const best = runs.map(s => s.trim()).sort((a, b) => b.length - a.length)[0];
    return best || src;
  }
  function aliasPill(a) {
    if (a && typeof a === 'object') return `<span class="alias re" title="정규식 규칙: ${esc(a.r)}">${esc(reHuman(a.r))}</span>`;
    return `<span class="alias">${esc(String(a).replace(/^=/, ''))}</span>`;
  }

  // ───────── 상태 ─────────
  const isDefOrg = id => { const o = EID.get(id); return !!o && o.t === 'org' && /국방|군종|통합전투|정보기관/.test(o.p.cat || ''); };
  const SETS = [
    { id: 'all', ko: '전체 오브젝트', desc: '모든 오브젝트 유형에서 언급이 많은 순서로 채웁니다.', test: () => true },
    { id: 'mil', ko: '미 국방 조직·사업', desc: '미 국방·정보 기관, 그 기관이 운용하는 사업, 소속 인물.', test: e => (e.t === 'org' && e.p.country === 'us' && isDefOrg(e.id)) || (e.t === 'program' && (e.p.op || []).some(isDefOrg)) || (e.t === 'person' && !!e.p.aff && isDefOrg(e.p.aff)) },
    { id: 'ai', ko: 'AI 기업·모델', desc: 'AI 랩·빅테크·인프라 기업, AI 모델, 기업 인물, AI 기술 영역.', test: e => e.t === 'model' || (e.t === 'company' && /AI|빅테크|반도체|엔터프라이즈|데이터/.test(e.p.cat || '')) || (e.t === 'person' && !!e.p.affc) || (e.t === 'domain' && e.p.cat === 'AI 기술') },
    { id: 'unmanned', ko: '무인·자율 전력', desc: '드론·자율무기·대드론 영역, 무인기·자율 사업, 방산 테크 기업.', test: e => ['d_uxs', 'd_auto', 'd_cuas', 'd_robot', 'd_amd', 'd_ew', 'jiatf401'].includes(e.id) || (e.t === 'program' && /무인|드론|자율|미사일|전투기/.test(e.p.cat || '')) || (e.t === 'company' && e.p.cat === '방산 테크') },
    { id: 'rivals', ko: '경쟁국·분쟁', desc: '미국 외 국가, 분쟁·공작 사건, 외국군, 중국 AI 기업, 동맹 기구.', test: e => (e.t === 'country' && e.id !== 'us') || (e.t === 'event' && e.p.kind !== '컨퍼런스·행사') || (e.t === 'org' && /외국|국제기구/.test(e.p.cat || '')) || (e.t === 'company' && e.p.cat === '중국 AI') },
    { id: 'gov', ko: '거버넌스·조달 제도', desc: '정책·제도, 획득·거버넌스 영역, 행정부·의회·연방 민간기관.', test: e => e.t === 'policy' || (e.t === 'domain' && /획득|거버넌스/.test(e.p.cat || '')) || (e.t === 'org' && /행정부|입법|민간기관/.test(e.p.cat || '')) },
    { id: 'ego', ko: '주변 탐색', desc: '선택한 오브젝트와 동시 언급 상위 오브젝트, 스키마 링크로 연결된 오브젝트.', test: null },
  ];
  const state = {
    tab: 'graph', sel: null, from: FIRST, to: LAST,
    types: new Set(ENT_TYPES), set: 'all', egoOf: null,
    showCo: true, showSchema: true, minW: 3, k: 4, maxN: 90,
  };

  // ───────── 툴팁 ─────────
  const tip = $('#tip');
  function showTip(ev, html) { tip.innerHTML = html; tip.hidden = false; moveTip(ev); }
  function moveTip(ev) {
    if (tip.hidden) return;
    const pad = 14, r = tip.getBoundingClientRect();
    let x = ev.clientX + pad, y = ev.clientY + pad;
    if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - pad;
    tip.style.left = Math.max(4, x) + 'px'; tip.style.top = Math.max(4, y) + 'px';
  }
  function hideTip() { tip.hidden = true; }

  // ───────── HTML 조각 ─────────
  const chip = (e, n) => `<button type="button" class="chip" data-ent="${e.i}" title="${esc(e.n)}"><i style="background:${tc(e.t)}"></i>${esc(e.label)}${n != null ? ` <span class="num">${n}</span>` : ''}</button>`;
  const refChip = id => { const t = EID.get(id); return t ? chip(t) : `<code>${esc(id)}</code>`; };
  const NULL = '<span class="null">null</span>';
  const issueLink = k => `<button type="button" class="link-issue" data-issue="${k}">제${k}호</button> <span class="muted">${esc(ISS[IX.get(k)].date)}</span>`;
  const propRow = (ko, api, v) => `<div class="prop"><dt>${ko}<code>${api}</code></dt><dd>${v}</dd></div>`;
  function chipList(list, max) {
    const m = max || 18;
    const sorted = list.slice().sort((a, b) => b.total - a.total);
    return `<div class="chips">${sorted.slice(0, m).map(e => chip(e)).join('')}${sorted.length > m ? `<span class="chip-more">외 ${sorted.length - m}개</span>` : ''}</div>`;
  }
  function valHTML(v, ref) {
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) return NULL;
    if (ref === 'ref') return `<div class="chips">${refChip(v)}</div>`;
    if (ref === 'refs') return `<div class="chips">${v.map(refChip).join('')}</div>`;
    return esc(v);
  }

  function sparkSVG(trend, t, opt) {
    const o = opt || {};
    const W = 340, H = o.h || 80, pt = 15, pb = 17, ih = H - pt - pb, bw = W / NI;
    const max = Math.max(1, ...trend);
    let peak = 0; trend.forEach((v, k) => { if (v > trend[peak]) peak = k; });
    let bars = '', hits = '';
    for (let k = 0; k < NI; k++) {
      const v = trend[k], x = k * bw, id = ISS[k].id;
      if (v) {
        const h = Math.max(1.5, v / max * ih);
        const out = o.period !== false && (id < state.from || id > state.to);
        bars += `<rect class="sp-bar${out ? ' out' : ''}" x="${(x + .5).toFixed(2)}" y="${(pt + ih - h).toFixed(2)}" width="${Math.max(1, bw - 1).toFixed(2)}" height="${h.toFixed(2)}" style="fill:${tc(t)}"></rect>`;
      }
      hits += `<rect class="sp-hit" data-issue="${id}" x="${x.toFixed(2)}" y="${pt - 4}" width="${bw.toFixed(2)}" height="${ih + 4}"><title>제${id}호 · ${esc(ISS[k].date)} · ${v}건</title></rect>`;
    }
    const marks = YEAR_MARKS.map(m => {
      const x = m.k * bw, end = x > W - 70;
      return `<line class="sp-year" x1="${x.toFixed(2)}" x2="${x.toFixed(2)}" y1="${pt - 6}" y2="${pt + ih}"></line>` +
        (x < 34 ? '' : `<text class="sp-ax" x="${(end ? x - 3 : x + 3).toFixed(1)}" y="${H - 4}"${end ? ' text-anchor="end"' : ''}>${m.year} · ${ISS[m.k].id}호</text>`);
    }).join('');
    const px = Math.min(W - 8, Math.max(8, peak * bw + bw / 2));
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="호별 언급 추이, 최대 제${ISS[peak].id}호 ${trend[peak]}건">
      <line class="sp-base" x1="0" x2="${W}" y1="${pt + ih + .5}" y2="${pt + ih + .5}"></line>
      ${marks}
      ${bars}
      ${trend[peak] ? `<text class="sp-peak" x="${px.toFixed(1)}" y="${pt - 4}" text-anchor="middle">${trend[peak]}</text>` : ''}
      <text class="sp-ax" x="0" y="${H - 4}">${FIRST}호</text>
      <text class="sp-ax" x="${W}" y="${H - 4}" text-anchor="end">${LAST}호</text>
      ${hits}
    </svg>`;
  }

  // ───────── 오브젝트 그래프 ─────────
  const G = { inited: false, nodes: [], edges: [], byI: new Map(), nbr: new Map(), userZoomed: false };
  function egoMembers(i, P) {
    const m = new Set();
    if (i == null) return m;
    m.add(i);
    P.adj[i].slice(0, 24).forEach(([j]) => { if (!ENTS[j].hub) m.add(j); });
    OUT[i].forEach(l => m.add(l.t)); INN[i].forEach(l => m.add(l.s));
    return m;
  }
  function buildGraph() {
    const P = periodStats(state.from, state.to);
    const set = SETS.find(s => s.id === state.set) || SETS[0];
    const ego = set.id === 'ego' ? egoMembers(state.egoOf, P) : null;
    const inSet = e => (ego ? ego.has(e.i) : set.test(e));
    const selI = state.sel && state.sel.kind === 'ent' ? state.sel.i : -1;
    const cand = ENTS.filter(e => !e.hub && P.cnt[e.i] > 0 && state.types.has(e.t) && inSet(e))
      .sort((a, b) => P.cnt[b.i] - P.cnt[a.i] || a.i - b.i);
    const nodes = cand.slice(0, state.maxN);
    const force = i => { if (i != null && i >= 0 && !ENTS[i].hub && P.cnt[i] > 0 && !nodes.includes(ENTS[i])) nodes.push(ENTS[i]); };
    if (ego) force(state.egoOf);
    force(selI);
    const inG = new Set(nodes.map(e => e.i));
    const edges = [];
    if (state.showCo) {
      const seen = new Set();
      for (const e of nodes) {
        const list = [];
        for (const [j, w] of P.adj[e.i]) {
          if (w < state.minW) break;
          if (inG.has(j)) list.push([j, w, cosine(P, e.i, j, w)]);
        }
        list.sort((x, y) => y[2] - x[2] || y[1] - x[1]);
        for (const [j, w, c] of list.slice(0, state.k)) {
          const u = Math.min(e.i, j), v = Math.max(e.i, j), key = u * 1024 + v;
          if (seen.has(key)) continue;
          seen.add(key);
          edges.push({ kind: 'co', s: u, t: v, w, c });
        }
      }
    }
    if (state.showSchema) CLINKS.forEach(l => { if (inG.has(l.s) && inG.has(l.t)) edges.push({ kind: 'schema', s: l.s, t: l.t, lt: l.lt, w: 0, c: 0 }); });
    return { nodes, edges, P };
  }

  function initGraph() {
    const svg = d3.select('#graph');
    G.svg = svg;
    svg.append('defs').html('<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path class="arrow-head" d="M0,1.2 L9,5 L0,8.8 z"></path></marker>');
    G.root = svg.append('g');
    G.gEdges = G.root.append('g');
    G.gNodes = G.root.append('g');
    G.zoom = d3.zoom().scaleExtent([0.2, 6]).on('zoom', ev => {
      G.root.attr('transform', ev.transform);
      svg.classed('zoomed', ev.transform.k >= 1.7);
      if (ev.sourceEvent) G.userZoomed = true;
    });
    svg.call(G.zoom).on('dblclick.zoom', null);
    svg.on('click', ev => { if (ev.target === svg.node()) clearSelection(); });
    G.sim = d3.forceSimulation()
      .randomSource(d3.randomLcg(0.42))
      .force('link', d3.forceLink()
        .distance(l => l.source.r + l.target.r + (l.kind === 'schema' ? 46 : 22 + 90 * (1 - Math.min(1, l.c * 1.8))))
        .strength(l => (l.kind === 'schema' ? 0.12 : 0.06 + 0.45 * Math.min(1, l.c * 1.6))))
      .force('charge', d3.forceManyBody().strength(d => -60 - d.r * 9).distanceMax(560))
      .force('collide', d3.forceCollide(d => d.r + 4).iterations(2))
      .force('x', d3.forceX(0).strength(0.055))
      .force('y', d3.forceY(0).strength(0.075))
      .alphaDecay(0.03)
      .on('tick', ticked)
      .stop();
    if (window.ResizeObserver) {
      let lastW = 0, lastH = 0;
      new ResizeObserver(entries => {
        const r = entries[0].contentRect;
        if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
        lastW = r.width; lastH = r.height;
        if (r.width && !G.userZoomed) fitGraph(false);
      }).observe($('#graph'));
    }
    G.inited = true;
  }

  function ticked() {
    if (!G.edgeSel) return;
    G.edgeSel.each(function (d) {
      const s = d.source, t = d.target;
      let x2 = t.x, y2 = t.y;
      if (d.kind === 'schema') {
        const dx = t.x - s.x, dy = t.y - s.y, L = Math.hypot(dx, dy) || 1;
        x2 = t.x - dx / L * (t.r + 3); y2 = t.y - dy / L * (t.r + 3);
      }
      this.setAttribute('x1', s.x.toFixed(1)); this.setAttribute('y1', s.y.toFixed(1));
      this.setAttribute('x2', x2.toFixed(1)); this.setAttribute('y2', y2.toFixed(1));
    });
    G.nodeSel.attr('transform', d => `translate(${d.x.toFixed(1)},${d.y.toFixed(1)})`);
    if (G.needFit && G.sim.alpha() < 0.1) { G.needFit = false; fitGraph(true); }
  }

  function fitGraph(animate) {
    const el = $('#graph');
    const W = el.clientWidth, H = el.clientHeight;
    if (!W || !H || !G.nodes.length) { G.pendingFit = true; return; }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    G.nodes.forEach(n => {
      x0 = Math.min(x0, n.x - n.r - 6); x1 = Math.max(x1, n.x + n.r + 6);
      y0 = Math.min(y0, n.y - n.r - 6); y1 = Math.max(y1, n.y + n.r + 16);
    });
    const pad = 20, bw = Math.max(1, x1 - x0), bh = Math.max(1, y1 - y0);
    const k = Math.max(0.2, Math.min(2.2, (W - 2 * pad) / bw, (H - 2 * pad) / bh));
    const t = d3.zoomIdentity.translate(W / 2 - k * (x0 + bw / 2), H / 2 - k * (y0 + bh / 2)).scale(k);
    G.userZoomed = false;
    if (animate && !reduceMotion) G.svg.transition().duration(450).call(G.zoom.transform, t);
    else G.svg.call(G.zoom.transform, t);
  }

  function focusNode(i) {
    const n = G.byI.get(i);
    const el = $('#graph');
    if (!n || n.x == null || !el.clientWidth) return;
    const t = d3.zoomTransform(el);
    const [sx, sy] = t.apply([n.x, n.y]);
    const W = el.clientWidth, H = el.clientHeight;
    if (sx > 50 && sx < W - 50 && sy > 50 && sy < H - 50) return;
    const nt = d3.zoomIdentity.translate(W / 2 - t.k * n.x, H / 2 - t.k * n.y).scale(t.k);
    if (reduceMotion) G.svg.call(G.zoom.transform, nt); else G.svg.transition().duration(400).call(G.zoom.transform, nt);
  }

  function renderGraph(opt) {
    const o = opt || {};
    if (!window.d3) return;
    if (!G.inited) initGraph();
    const { nodes, edges, P } = buildGraph();
    G.P = P;
    const prev = new Map(G.nodes.map(n => [n.i, n]));
    const maxCnt = Math.max(2, ...nodes.map(e => P.cnt[e.i]));
    const rS = d3.scaleSqrt().domain([1, maxCnt]).range([4.5, 25]).clamp(true);
    const simNodes = nodes.map(e => {
      const n = { i: e.i, e, cnt: P.cnt[e.i], r: rS(Math.max(1, P.cnt[e.i])) };
      const p = prev.get(e.i);
      if (p && !o.fresh) { n.x = p.x; n.y = p.y; n.vx = p.vx; n.vy = p.vy; }
      return n;
    });
    const byI = new Map(simNodes.map(n => [n.i, n]));
    const simEdges = edges.map(l => Object.assign({}, l, { source: byI.get(l.s), target: byI.get(l.t) }));
    const maxW = Math.max(1, ...simEdges.map(l => l.w || 0));
    const wS = d3.scaleSqrt().domain([1, maxW]).range([0.7, 4.2]);
    const labelN = Math.max(14, Math.min(40, Math.round(simNodes.length * 0.33)));
    simNodes.slice().sort((a, b) => b.cnt - a.cnt).forEach((n, k) => { n.lab = k < labelN; });
    G.nodes = simNodes; G.edges = simEdges; G.byI = byI;
    G.nbr = new Map(simNodes.map(n => [n.i, new Set()]));
    simEdges.forEach(l => { G.nbr.get(l.s).add(l.t); G.nbr.get(l.t).add(l.s); });

    G.edgeSel = G.gEdges.selectAll('line').data(simEdges, d => `${d.kind}:${d.lt || ''}:${d.s}-${d.t}`).join('line')
      .attr('class', d => (d.kind === 'schema' ? 'e e-schema' : 'e e-co'))
      .attr('stroke-width', d => (d.kind === 'schema' ? 1.3 : wS(d.w)))
      .attr('stroke-opacity', d => (d.kind === 'schema' ? null : (0.16 + 0.6 * Math.min(1, d.c * 1.5)).toFixed(2)))
      .attr('marker-end', d => (d.kind === 'schema' ? 'url(#arrow)' : null))
      .on('mouseenter', (ev, d) => showTip(ev, edgeTip(d))).on('mousemove', moveTip).on('mouseleave', hideTip);

    G.nodeSel = G.gNodes.selectAll('g.node').data(simNodes, d => d.i).join(enter => {
      const g = enter.append('g').attr('class', 'node').attr('tabindex', 0).attr('role', 'button');
      g.append('circle').attr('class', 'halo');
      g.append('circle').attr('class', 'dot');
      g.append('text');
      return g;
    });
    G.nodeSel.attr('aria-label', d => `${d.e.n}, ${TYPE_META[d.e.t].ko}, 언급 ${d.cnt}건`).classed('lab', d => d.lab);
    G.nodeSel.select('circle.halo').attr('r', d => d.r + 4);
    G.nodeSel.select('circle.dot').attr('r', d => d.r).style('fill', d => tc(d.e.t));
    G.nodeSel.select('text').text(d => d.e.label).attr('y', d => d.r + 12);
    G.nodeSel
      .on('click', (ev, d) => { ev.stopPropagation(); hideTip(); selectEntity(d.i, { focus: false }); })
      .on('keydown', (ev, d) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); selectEntity(d.i, { focus: false }); } })
      .on('mouseenter', (ev, d) => { hoverNode(d); showTip(ev, nodeTip(d)); })
      .on('mousemove', moveTip)
      .on('mouseleave', () => { hoverNode(null); hideTip(); })
      .call(d3.drag()
        .on('start', (ev, d) => { if (!ev.active && !reduceMotion) G.sim.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (ev, d) => { d.fx = ev.x; d.fy = ev.y; if (reduceMotion) { d.x = ev.x; d.y = ev.y; ticked(); } })
        .on('end', (ev, d) => { if (!ev.active) G.sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    $('#graph-empty').hidden = simNodes.length > 0;
    G.sim.nodes(simNodes);
    G.sim.force('link').links(simEdges);
    applySelectionClasses();
    updateStageSummary(simNodes, simEdges, P);
    renderLegend();
    const settle = n => { G.sim.alpha(1); for (let k = 0; k < n; k++) G.sim.tick(); ticked(); };
    if (!prev.size || o.fresh) {
      settle(280);
      fitGraph(false);
      if (!reduceMotion) G.sim.alpha(0.02).restart();
    } else if (reduceMotion) {
      settle(240);
      if (o.fit) fitGraph(false);
    } else {
      G.needFit = !!o.fit;
      G.sim.alpha(0.6).restart();
    }
  }

  function hoverNode(d) {
    if (!G.nodeSel) return;
    if (!d) { G.svg.classed('hovering', false); G.nodeSel.classed('hl', false); G.edgeSel.classed('hl', false); return; }
    const nb = G.nbr.get(d.i) || new Set();
    G.svg.classed('hovering', true);
    G.nodeSel.classed('hl', n => n.i === d.i || nb.has(n.i));
    G.edgeSel.classed('hl', l => l.s === d.i || l.t === d.i);
  }
  function applySelectionClasses() {
    if (!G.nodeSel) return;
    const si = state.sel && state.sel.kind === 'ent' ? state.sel.i : -1;
    const nb = G.nbr.get(si) || new Set();
    G.nodeSel.classed('sel', d => d.i === si).classed('nb', d => nb.has(d.i));
    G.edgeSel.classed('on', l => l.s === si || l.t === si);
  }
  function nodeTip(d) {
    const top = G.P.adj[d.i].find(([j]) => !ENTS[j].hub);
    return `<b>${esc(d.e.n)}</b><span class="tip-t">${TYPE_META[d.e.t].ko}</span><br>언급 기사 ${fmt(d.cnt)}건${top ? `<br>최다 동시 언급: ${esc(ENTS[top[0]].label)} ${top[1]}건` : ''}`;
  }
  function edgeTip(l) {
    const a = ENTS[l.s], b = ENTS[l.t];
    if (l.kind === 'schema') return `<b>${esc(a.label)} → ${esc(b.label)}</b><br>${LT[l.lt].ko} <code>${l.lt}</code>`;
    return `<b>${esc(a.label)} ↔ ${esc(b.label)}</b><br>동시 언급 ${l.w}건 · 연관도 ${l.c.toFixed(2)}`;
  }
  function updateStageSummary(nodes, edges, P) {
    const co = edges.filter(l => l.kind === 'co').length, sc = edges.length - co;
    $('#stage-summary').innerHTML = `오브젝트 <span class="num">${nodes.length}</span> · 동시 언급 <span class="num">${co}</span> · 스키마 링크 <span class="num">${sc}</span> · 제${state.from}–${state.to}호 기사 <span class="num">${fmt(P.nArts)}</span>건`;
  }
  function renderLegend() {
    const present = new Set(G.nodes.map(n => n.e.t));
    $('#legend').innerHTML = ENT_TYPES.filter(t => present.has(t)).map(t => `<span><i class="dot" style="background:${tc(t)}"></i>${TYPE_META[t].ko}</span>`).join('') +
      '<span><svg width="22" height="8" aria-hidden="true"><line class="lg-co" x1="0" y1="4" x2="22" y2="4"></line></svg>동시 언급</span>' +
      '<span><svg width="22" height="8" aria-hidden="true"><line class="lg-sc" x1="0" y1="4" x2="16" y2="4"></line><path class="lg-ar" d="M15,1 L22,4 L15,7 z"></path></svg>스키마 링크</span>' +
      '<span>원 크기 = 언급 기사 수</span>';
  }

  // ───────── 선택 ─────────
  const OV = { limit: 8, open: new Set() };
  function selectEntity(i, opt) {
    const o = opt || {};
    if (!ENTS[i]) return;
    if (o.switchTab) setTab('graph');
    const changed = !(state.sel && state.sel.kind === 'ent' && state.sel.i === i);
    state.sel = { kind: 'ent', i };
    if (changed) { OV.limit = 8; OV.open.clear(); }
    const P = periodStats(state.from, state.to);
    if (window.d3 && !G.byI.has(i) && !ENTS[i].hub && P.cnt[i] > 0) renderGraph();
    else applySelectionClasses();
    renderOV(true);
    if (o.focus !== false && window.d3) focusNode(i);
    if (o.switchTab) $('#ov').scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function selectIssue(id, opt) {
    const o = opt || {};
    if (!IX.has(id)) return;
    if (o.switchTab) setTab('graph');
    state.sel = { kind: 'issue', id };
    OV.open.clear();
    applySelectionClasses();
    renderOV(true);
    if (o.switchTab) $('#ov').scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function clearSelection() { state.sel = null; applySelectionClasses(); renderOV(true); }

  // ───────── 오브젝트 뷰 ─────────
  function renderOV(resetScroll) {
    const host = $('#ov');
    const st = host.scrollTop;
    const s = state.sel;
    host.innerHTML = !s ? ovSet() : s.kind === 'ent' ? ovEntity(ENTS[s.i]) : ovIssue(s.id);
    host.scrollTop = resetScroll ? 0 : st;
  }
  function artItem(a, ctx) {
    const others = a.ents.filter(j => j !== ctx && !ENTS[j].hub);
    const open = OV.open.has(a.i);
    return `<li class="art${open ? ' open' : ''}">
      <div class="art-meta"><button type="button" class="link-issue" data-issue="${a.issue}">제${a.issue}호</button><span>${esc(a.date)}</span><span>${esc(SRC[a.src].name)}</span></div>
      <button type="button" class="art-title" data-art="${a.i}" aria-expanded="${open}">${esc(a.kr || a.en)}</button>
      <div class="art-body"${open ? '' : ' hidden'}>
        ${a.en && a.kr ? `<p class="art-en">${esc(a.en)}</p>` : ''}
        ${a.sum ? `<p class="art-sum">${esc(a.sum)}</p>` : ''}
        ${others.length ? `<div class="chips">${others.slice(0, 10).map(j => chip(ENTS[j])).join('')}</div>` : ''}
        ${a.url ? `<a class="ext" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">원문 보기 ↗</a>` : ''}
      </div>
    </li>`;
  }
  function ovEntity(e) {
    const P = periodStats(state.from, state.to);
    const tm = TYPE_META[e.t];
    const full = state.from === FIRST && state.to === LAST;
    const props = (PROP_DEFS[e.t] || []).map(([api, ko, , get, ref]) => propRow(ko, api, valHTML(get(e), ref))).join('');
    const shared = [
      propRow('기본 키', 'objectId', `<code>${esc(e.id)}</code>`),
      propRow('언급 기사 수', 'mentionCount', e.hub ? '<span class="null">집계 제외 · 허브 오브젝트</span>' : `${fmt(e.total)}건${full ? '' : ` <span class="muted">· 선택 기간 ${fmt(P.cnt[e.i])}건</span>`}`),
      propRow('최초 언급', 'firstIssue', e.first ? issueLink(e.first) : NULL),
      propRow('최근 언급', 'lastIssue', e.last ? issueLink(e.last) : NULL),
      propRow('별칭', 'aliases', e.a.length ? `<div class="chips">${e.a.map(aliasPill).join('')}</div>` : NULL),
    ].join('');
    // 스키마 링크
    const group = (arr, dir) => {
      const m = new Map();
      arr.forEach(l => { if (!m.has(l.lt)) m.set(l.lt, []); m.get(l.lt).push(ENTS[dir === 'out' ? l.t : l.s]); });
      return [...m].map(([lt, list]) => `<div class="lk"><div class="lk-h"><span class="dir">${dir === 'out' ? '→' : '←'}</span>${dir === 'out' ? LT[lt].ko : LT[lt].inv}<code>${lt}</code><span class="muted">${list.length}</span></div>${chipList(list, 16)}</div>`).join('');
    };
    const links = group(OUT[e.i], 'out') + group(INN[e.i], 'in');
    // 동시 언급
    const co = P.adj[e.i].filter(([j]) => !ENTS[j].hub).slice(0, 10);
    const coHTML = co.length ? `<ol class="co">${co.map(([j, w]) => `<li><button type="button" class="co-name" data-ent="${j}" title="연관도 ${cosine(P, e.i, j, w).toFixed(2)}"><i style="background:${tc(ENTS[j].t)}"></i><span>${esc(ENTS[j].label)}</span></button><span class="co-bar"><b style="width:${(100 * w / co[0][1]).toFixed(1)}%"></b></span><span class="num">${w}</span></li>`).join('')}</ol>` : '<p class="ov-text">선택 기간에 함께 언급된 오브젝트가 없습니다.</p>';
    // 키워드 정규화
    const kwHTML = e.kw && e.kw.length ? `<div class="kws">${e.kw.map(([k, c]) => `<span>${esc(k)}<b>${c}</b></span>`).join('')}</div>` : '<p class="ov-text">이 오브젝트로 정규화된 원시 키워드가 없습니다. 제목·요약 본문에서만 언급됐습니다.</p>';
    // 관련 기사
    const arts = e.arts.filter(ai => ARTS[ai].issue >= state.from && ARTS[ai].issue <= state.to);
    const artHTML = arts.length ? `<ul class="arts">${arts.slice(0, OV.limit).map(ai => artItem(ARTS[ai], e.i)).join('')}</ul>${arts.length > OV.limit ? `<button type="button" class="btn more" data-ov="more">기사 더 보기 (${fmt(arts.length - OV.limit)}건 남음)</button>` : ''}` : '<p class="ov-text">선택 기간에 언급한 기사가 없습니다.</p>';
    return `
      <div class="ov-top"><div class="ov-type"><span class="dot" style="background:${tc(e.t)}"></span>${tm.ko}<code>${tm.api}</code></div><button type="button" class="ov-close" data-ov="clear" aria-label="오브젝트 뷰 닫기" title="오브젝트셋 요약으로">×</button></div>
      <h2 class="ov-title">${esc(e.n)}</h2>
      <p class="ov-sub">${esc(e.e)}</p>
      <div class="ov-tools">
        <button type="button" class="btn btn-ink" data-ov="ego" data-i="${e.i}">주변 탐색</button>
        ${G.byI.has(e.i) ? `<button type="button" class="btn" data-ov="focus" data-i="${e.i}">그래프에서 찾기</button>` : ''}
      </div>
      ${props ? `<section class="ov-sec"><h3>속성 <span class="muted">${tm.api} 고유</span></h3><dl class="props">${props}</dl></section>` : ''}
      <section class="ov-sec"><h3>공유 속성 <span class="muted">언급 대상 인터페이스</span></h3><dl class="props">${shared}</dl></section>
      ${e.hub ? '' : `<section class="ov-sec"><h3>언급 추이 <span class="muted">호별 언급 기사 수 · 막대를 누르면 그 호가 열립니다</span></h3>${sparkSVG(e.trend, e.t)}</section>`}
      ${links ? `<section class="ov-sec"><h3>스키마 링크</h3>${links}</section>` : ''}
      ${e.hub ? '' : `<section class="ov-sec"><h3>동시 언급 상위 <span class="muted">제${state.from}–${state.to}호 · 같은 기사에 함께 언급된 횟수</span></h3>${coHTML}</section>`}
      ${e.hub ? '' : `<section class="ov-sec"><h3>키워드 정규화 <span class="muted">원시 키워드 ${e.kwN || 0}종 → 이 오브젝트</span></h3>${kwHTML}</section>`}
      ${e.hub ? '' : `<section class="ov-sec"><h3>관련 기사 <span class="muted">${full ? '' : '선택 기간 '}${fmt(arts.length)}건 · 최신순</span></h3>${artHTML}</section>`}`;
  }
  function ovIssue(id) {
    const k = IX.get(id), is = ISS[k];
    const prevId = k > 0 ? ISS[k - 1].id : null, nextId = k < NI - 1 ? ISS[k + 1].id : null;
    const arts = ISS_ARTS[k].map(i => ARTS[i]);
    const c = new Map();
    arts.forEach(a => a.ents.forEach(j => { if (!ENTS[j].hub) c.set(j, (c.get(j) || 0) + 1); }));
    const top = [...c].sort((x, y) => y[1] - x[1] || ENTS[y[0]].total - ENTS[x[0]].total).slice(0, 16);
    return `
      <div class="ov-top"><div class="ov-type"><span class="dot" style="background:var(--t-issue)"></span>뉴스레터 호<code>NewsletterIssue</code></div><button type="button" class="ov-close" data-ov="clear" aria-label="오브젝트 뷰 닫기" title="오브젝트셋 요약으로">×</button></div>
      <h2 class="ov-title">제${id}호</h2>
      <p class="ov-sub">${esc(is.period)}</p>
      <div class="ov-nav"><button type="button" class="btn"${prevId != null ? ` data-issue="${prevId}"` : ' disabled'}>← 이전 호</button><button type="button" class="btn"${nextId != null ? ` data-issue="${nextId}"` : ' disabled'}>다음 호 →</button></div>
      <section class="ov-sec"><h3>속성</h3><dl class="props">
        ${propRow('호 번호', 'issueId', `<code>${id}</code>`)}
        ${propRow('발행 기간', 'period', esc(is.period))}
        ${propRow('발행일', 'publishedDate', esc(is.date))}
        ${propRow('수록 기사 수', 'articleCount', `${arts.length}건`)}
        ${propRow('핵심 주제', 'keyTheme', is.theme ? esc(is.theme) : NULL)}
      </dl></section>
      <section class="ov-sec"><h3>이 호에서 언급된 오브젝트 <span class="muted">언급 기사 수 순</span></h3><div class="chips">${top.map(([j, n]) => chip(ENTS[j], n)).join('')}</div></section>
      <section class="ov-sec"><h3>수록 기사 <span class="muted">${arts.length}건 · publishedIn 링크</span></h3><ul class="arts">${arts.map(a => artItem(a, -1)).join('')}</ul></section>`;
  }
  function ovSet() {
    const set = SETS.find(s => s.id === state.set) || SETS[0];
    const P = periodStats(state.from, state.to);
    const nodes = G.nodes || [];
    const co = G.edges.filter(l => l.kind === 'co').length, sc = G.edges.length - co;
    const byT = {};
    nodes.forEach(n => { byT[n.e.t] = (byT[n.e.t] || 0) + 1; });
    const maxT = Math.max(1, ...Object.values(byT));
    const top = nodes.slice().sort((a, b) => b.cnt - a.cnt).slice(0, 12);
    const title = set.id === 'ego' && state.egoOf != null ? `주변 탐색 · ${esc(ENTS[state.egoOf].label)}` : set.ko;
    return `
      <div class="ov-type"><span class="dot" style="background:var(--ink-3)"></span>오브젝트셋<code>ObjectSet</code></div>
      <h2 class="ov-title">${title}</h2>
      <p class="ov-sub">${esc(set.desc)}</p>
      <section class="ov-sec"><h3>구성</h3><dl class="props">
        ${propRow('오브젝트', 'size', `${fmt(nodes.length)}개 <span class="muted">· 최대 ${state.maxN}개</span>`)}
        ${propRow('링크', 'links', `동시 언급 ${fmt(co)} · 스키마 ${fmt(sc)}`)}
        ${propRow('기간', 'range', `제${state.from}–${state.to}호 · 기사 ${fmt(P.nArts)}건`)}
      </dl></section>
      <section class="ov-sec"><h3>유형 구성</h3><div class="tbars">${ENT_TYPES.filter(t => byT[t]).sort((a, b) => byT[b] - byT[a]).map(t => `<div class="tbar"><span><i class="dot" style="background:${tc(t)}"></i>${TYPE_META[t].ko}</span><span class="track"><b style="width:${(100 * byT[t] / maxT).toFixed(1)}%;background:${tc(t)}"></b></span><span class="num">${byT[t]}</span></div>`).join('') || '<p class="ov-text">조건에 맞는 오브젝트가 없습니다. 유형이나 기간을 넓혀 보세요.</p>'}</div></section>
      ${top.length ? `<section class="ov-sec"><h3>언급 상위 <span class="muted">선택 기간 언급 기사 수</span></h3><ol class="rank">${top.map(n => `<li>${chip(n.e)}<span class="num">${n.cnt}</span></li>`).join('')}</ol></section>` : ''}
      <p class="hint">노드를 선택하면 그 오브젝트의 오브젝트 뷰(속성·링크·언급 추이·관련 기사)가 열립니다. 오브젝트 뷰에서 <b>주변 탐색</b>을 누르면 연결된 오브젝트만 모은 오브젝트셋이 만들어집니다.</p>`;
  }

  // ───────── 필터 레일 ─────────
  function renderSets() {
    $('#sets').innerHTML = SETS.map(s => {
      const dis = s.id === 'ego' && state.egoOf == null;
      const name = s.id === 'ego' && state.egoOf != null ? `주변 탐색 · ${esc(ENTS[state.egoOf].label)}` : s.ko;
      return `<label class="set" title="${esc(s.desc)}"><input type="radio" name="objset" value="${s.id}"${state.set === s.id ? ' checked' : ''}${dis ? ' disabled' : ''}><span>${name}</span></label>`;
    }).join('');
  }
  function renderTypeFilters() {
    const P = periodStats(state.from, state.to);
    const counts = {};
    ENTS.forEach(e => { if (!e.hub && P.cnt[e.i] > 0) counts[e.t] = (counts[e.t] || 0) + 1; });
    $('#type-filters').innerHTML = ENT_TYPES.map(t => `<label class="tf"><input type="checkbox" value="${t}"${state.types.has(t) ? ' checked' : ''}><i style="background:${tc(t)}"></i><span>${TYPE_META[t].ko}</span><span class="num">${counts[t] || 0}</span></label>`).join('');
  }
  const PRESETS = [['전체', FIRST, LAST], [ISS[LAST_YEAR_K].date.slice(0, 4) + '년', ISS[LAST_YEAR_K].id, LAST], ['최근 13호', ISS[Math.max(0, NI - 13)].id, LAST], ['최근 4호', ISS[Math.max(0, NI - 4)].id, LAST]]
    .filter((p, i, a) => a.findIndex(q => q[1] === p[1] && q[2] === p[2]) === i);
  function renderPeriod() {
    $('#period-presets').innerHTML = PRESETS.map(([ko, a, b], k) => `<button type="button" data-preset="${k}" aria-pressed="${state.from === a && state.to === b}">${ko}</button>`).join('');
    $('#from').value = String(state.from); $('#to').value = String(state.to);
  }
  function refresh(fit) {
    renderGraph({ fit: fit !== false });
    if (!state.sel) renderOV(false); else if (state.sel.kind === 'ent') renderOV(false);
  }
  function buildRail() {
    const opts = ISS.map(x => `<option value="${x.id}">제${x.id}호 · ${esc(x.date)}</option>`).join('');
    $('#from').innerHTML = opts; $('#to').innerHTML = opts;
    renderSets(); renderTypeFilters(); renderPeriod();
    const tog = $('#rail-toggle'), more = $('#rail-more');
    const setRail = open => { more.classList.toggle('collapsed', !open); tog.setAttribute('aria-expanded', String(open)); tog.textContent = open ? '필터·오브젝트셋 접기' : '필터·오브젝트셋 펼치기'; };
    tog.addEventListener('click', () => setRail(more.classList.contains('collapsed')));
    if (window.matchMedia && window.matchMedia('(max-width: 820px)').matches) setRail(false);

    $('#sets').addEventListener('change', ev => { state.set = ev.target.value; refresh(); });
    $('#type-filters').addEventListener('change', ev => {
      const t = ev.target.value;
      if (ev.target.checked) state.types.add(t); else state.types.delete(t);
      refresh();
    });
    $('#types-all').addEventListener('click', () => { state.types = new Set(ENT_TYPES); renderTypeFilters(); refresh(); });
    $('#types-none').addEventListener('click', () => { state.types = new Set(); renderTypeFilters(); refresh(); });
    $('#period-presets').addEventListener('click', ev => {
      const b = ev.target.closest('[data-preset]'); if (!b) return;
      const p = PRESETS[+b.dataset.preset]; state.from = p[1]; state.to = p[2];
      renderPeriod(); renderTypeFilters(); refresh();
    });
    const onRange = () => {
      let a = +$('#from').value, b = +$('#to').value;
      if (a > b) [a, b] = [b, a];
      state.from = a; state.to = b;
      renderPeriod(); renderTypeFilters(); refresh();
    };
    $('#from').addEventListener('change', onRange); $('#to').addEventListener('change', onRange);
    $('#show-co').addEventListener('change', ev => { state.showCo = ev.target.checked; refresh(false); });
    $('#show-schema').addEventListener('change', ev => { state.showSchema = ev.target.checked; refresh(false); });
    const sliders = [['minw', 'minW'], ['k', 'k'], ['maxn', 'maxN']];
    sliders.forEach(([id, key]) => {
      const inp = $('#' + id), out = $('#' + id + '-out');
      const apply = debounce(() => refresh(key === 'maxN'), 140);
      inp.addEventListener('input', () => { state[key] = +inp.value; out.textContent = inp.value; apply(); });
    });
    $('#btn-fit').addEventListener('click', () => fitGraph(true));
    $('#btn-relayout').addEventListener('click', () => { renderGraph({ fresh: true }); });

    // 검색
    const q = $('#q'), list = $('#q-results');
    const HAY = ENTS.map(e => ({ e, hay: [e.n, e.e, e.id, e.label].concat(e.a.filter(a => typeof a === 'string').map(a => a.replace(/^=/, ''))).join(' ').toLowerCase().replace(/\s+/g, '') }));
    const run = () => {
      const raw = q.value.trim(), k = raw.toLowerCase().replace(/\s+/g, '');
      if (!k) { list.hidden = true; list.innerHTML = ''; return; }
      const lo = raw.toLowerCase();
      const res = HAY.filter(h => h.hay.includes(k)).map(h => h.e)
        .sort((a, b) => ((b.n.toLowerCase().startsWith(lo) || b.e.toLowerCase().startsWith(lo)) - (a.n.toLowerCase().startsWith(lo) || a.e.toLowerCase().startsWith(lo))) || b.total - a.total)
        .slice(0, 8);
      list.innerHTML = res.length ? res.map(e => `<li><button type="button" data-ent="${e.i}"><i class="dot" style="background:${tc(e.t)}"></i><span>${esc(e.n)}</span><span class="q-sub">${TYPE_META[e.t].ko} · ${e.hub ? '허브' : `언급 ${e.total}건`}</span></button></li>`).join('') : '<li class="q-empty">일치하는 오브젝트가 없습니다. 영문·한글 별칭으로도 찾을 수 있습니다.</li>';
      list.hidden = false;
    };
    q.addEventListener('input', run);
    q.addEventListener('focus', () => { if (q.value.trim()) run(); });
    q.addEventListener('keydown', ev => {
      if (ev.key === 'ArrowDown') { const b = $('button', list); if (b && !list.hidden) { ev.preventDefault(); b.focus(); } }
      else if (ev.key === 'Enter') { const b = $('button', list); if (b && !list.hidden) { ev.preventDefault(); b.click(); } }
      else if (ev.key === 'Escape') list.hidden = true;
    });
    list.addEventListener('keydown', ev => {
      const btns = $$('button', list), k = btns.indexOf(document.activeElement);
      if (ev.key === 'ArrowDown' && k < btns.length - 1) { ev.preventDefault(); btns[k + 1].focus(); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); if (k > 0) btns[k - 1].focus(); else q.focus(); }
      else if (ev.key === 'Escape') { list.hidden = true; q.focus(); }
    });
    document.addEventListener('pointerdown', ev => { if (!ev.target.closest('.search')) list.hidden = true; });
  }

  // ───────── 전역 클릭 처리 ─────────
  document.addEventListener('click', ev => {
    const t = ev.target;
    if (!(t instanceof Element)) return;
    const art = t.closest('.art-title');
    if (art) {
      const i = +art.dataset.art, li = art.closest('.art'), body = $('.art-body', li);
      const open = !OV.open.has(i);
      if (open) OV.open.add(i); else OV.open.delete(i);
      li.classList.toggle('open', open); body.hidden = !open; art.setAttribute('aria-expanded', String(open));
      return;
    }
    const ent = t.closest('[data-ent]');
    if (ent) {
      ev.preventDefault();
      if (ent.closest('#q-results')) $('#q-results').hidden = true;
      selectEntity(+ent.dataset.ent, { switchTab: state.tab !== 'graph' });
      return;
    }
    const iss = t.closest('[data-issue]');
    if (iss && !iss.disabled) { ev.preventDefault(); selectIssue(+iss.dataset.issue, { switchTab: state.tab !== 'graph' }); return; }
    const ov = t.closest('[data-ov]');
    if (ov) {
      const act = ov.dataset.ov;
      if (act === 'more') { OV.limit += 12; renderOV(false); }
      else if (act === 'clear') clearSelection();
      else if (act === 'focus') focusNode(+ov.dataset.i);
      else if (act === 'ego') {
        state.egoOf = +ov.dataset.i; state.set = 'ego';
        renderSets(); renderGraph({ fit: true }); renderOV(false);
      }
      return;
    }
    const go = t.closest('[data-goto]');
    if (go) { setTab(go.dataset.goto); window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }
  });

  // ───────── 탭 ─────────
  const TABS = ['graph', 'schema', 'kinetic', 'analysis'];
  const done = {};
  function setTab(t) {
    if (!TABS.includes(t)) t = 'graph';
    state.tab = t;
    TABS.forEach(x => {
      const on = x === t, b = $('#tab-btn-' + x);
      b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
      $('#tab-' + x).hidden = !on;
    });
    hideTip();
    try {
      if (t === 'graph' && G.pendingFit) { G.pendingFit = false; fitGraph(false); }
      if (t === 'schema' && !done.schema) { renderSchema(); done.schema = true; }
      if (t === 'kinetic' && !done.kinetic) { renderKinetic(); done.kinetic = true; }
      if (t === 'analysis' && !done.analysis) { renderAnalysis(); done.analysis = true; }
    } catch (err) { showError($('#tab-' + t), err); }
    store.set('onto.tab', t);
  }
  $$('.tab').forEach(b => {
    b.addEventListener('click', () => setTab(b.id.replace('tab-btn-', '')));
    b.addEventListener('keydown', ev => {
      const k = TABS.indexOf(state.tab);
      let n = -1;
      if (ev.key === 'ArrowRight') n = (k + 1) % TABS.length;
      if (ev.key === 'ArrowLeft') n = (k + TABS.length - 1) % TABS.length;
      if (n >= 0) { ev.preventDefault(); setTab(TABS[n]); $('#tab-btn-' + TABS[n]).focus(); }
    });
  });

  // ───────── 스키마 ─────────
  const SP = {
    issue: [180, 82, 176, 58], article: [500, 82, 176, 58], source: [820, 82, 176, 58],
    domain: [130, 287, 168, 56], country: [500, 287, 168, 56], event: [850, 287, 168, 56],
    org: [290, 392, 168, 56], company: [710, 392, 168, 56],
    policy: [130, 497, 168, 56], person: [500, 470, 168, 56], model: [855, 497, 168, 56],
    program: [500, 582, 168, 56],
  };
  const IF = { x: 20, y: 184, w: 930, h: 458 };
  const textW = (s, fs) => { let w = 0; for (const ch of s) w += /[ᄀ-￿]/.test(ch) && ch !== '·' ? fs * 0.98 : fs * 0.6; return w; };
  function boxPt(t, tx, ty) {
    const [cx, cy, w, h] = SP[t];
    const dx = tx - cx, dy = ty - cy;
    const s = Math.min((w / 2) / Math.abs(dx || 1e-6), (h / 2) / Math.abs(dy || 1e-6));
    return [cx + dx * s, cy + dy * s];
  }
  function linkCount(id) {
    if (id === 'publishedIn' || id === 'reportedBy') return ARTS.length;
    if (id === 'mentions') return D.meta.links;
    if (id === 'coMentionedWith') return [...ALL.pairs.keys()].filter(k => !ENTS[k >> 10].hub && !ENTS[k & 1023].hub).length;
    return CLINKS.filter(l => l.lt === id).length;
  }
  function typeCount(t) {
    if (t === 'issue') return NI;
    if (t === 'article') return ARTS.length;
    if (t === 'source') return SRC.length;
    return ENTS.filter(e => e.t === t).length;
  }
  function renderSchema() {
    const svg = $('#schema');
    const edge = (id, d, mx, my, cls) => {
      const lt = LT[id], label = `${lt.ko} ${lt.card}`, w = textW(label, 10.5) + 14;
      return `<g class="s-edge" data-link="${id}" tabindex="0" role="button" aria-label="링크 유형 ${lt.ko}, ${lt.card}">
        <path class="hit" d="${d}"></path><path class="ln${cls ? ' ' + cls : ''}" d="${d}" marker-end="url(#sarrow)"></path>
        <rect class="lbl-bg" x="${(mx - w / 2).toFixed(1)}" y="${(my - 9).toFixed(1)}" width="${w.toFixed(1)}" height="18" rx="9"></rect>
        <text class="lbl-t" x="${mx.toFixed(1)}" y="${(my + 3.6).toFixed(1)}" text-anchor="middle">${label}</text></g>`;
    };
    const straight = (id, a, b, at) => {
      const [ax, ay] = SP[a], [bx, by] = SP[b];
      const p = boxPt(a, bx, by), q = boxPt(b, ax, ay), f = at == null ? 0.5 : at;
      return edge(id, `M${p[0].toFixed(1)},${p[1].toFixed(1)} L${q[0].toFixed(1)},${q[1].toFixed(1)}`, p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f);
    };
    const node = t => {
      const [cx, cy, w, h] = SP[t], tm = TYPE_META[t];
      return `<g class="s-node" data-type="${t}" tabindex="0" role="button" aria-label="${tm.ko} 오브젝트 유형, ${typeCount(t)}개" transform="translate(${cx - w / 2},${cy - h / 2})">
        <rect class="box" width="${w}" height="${h}" rx="6"></rect>
        <circle cx="16" cy="21" r="5.5" style="fill:${tc(t)}"></circle>
        <text class="nm" x="28" y="26">${tm.ko}</text>
        <text class="cnt" x="${w - 12}" y="26" text-anchor="end">${fmt(typeCount(t))}</text>
        <text class="api" x="16" y="${h - 12}">${tm.api}</text></g>`;
    };
    const [ox, oy] = SP.org, [ex, ey] = SP.event, [ax, ay] = SP.article;
    const orgTop = oy - 28;
    const edges = [
      straight('publishedIn', 'article', 'issue'),
      straight('reportedBy', 'article', 'source'),
      edge('mentions', `M${ax},${ay + 29} L${ax},${IF.y}`, ax, (ay + 29 + IF.y) / 2),
      straight('belongsToCountry', 'org', 'country'),
      straight('headquarteredIn', 'company', 'country'),
      edge('parentOrganization', `M${ox - 22},${orgTop} C${ox - 40},${orgTop - 46} ${ox + 40},${orgTop - 46} ${ox + 22},${orgTop}`, ox, orgTop - 44),
      straight('affiliatedOrg', 'person', 'org'),
      straight('affiliatedCompany', 'person', 'company'),
      straight('developedBy', 'model', 'company'),
      straight('operatedBy', 'program', 'org', 0.28),
      straight('contractedWith', 'program', 'company', 0.28),
      straight('issuedBy', 'policy', 'org'),
      edge('involves', `M${ex},${ey - 28} L${ex},${IF.y}`, ex, (ey - 28 + IF.y) / 2),
      edge('coMentionedWith', `M${IF.x + IF.w},${IF.y + 372} C${IF.x + IF.w + 50},${IF.y + 372} ${IF.x + IF.w + 50},${IF.y + 432} ${IF.x + IF.w},${IF.y + 432}`, IF.x + IF.w - 46, IF.y + 402, 'derived'),
    ];
    svg.innerHTML = `
      <defs><marker id="sarrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow-head" d="M0,1.2 L9,5 L0,8.8 z"></path></marker></defs>
      <text class="layer-cap" x="20" y="22">아카이브 오브젝트 · 뉴스레터 원본에서 생성</text>
      <g class="iface" data-iface="1" tabindex="0" role="button" aria-label="인터페이스 언급 대상">
        <rect class="iface-box" x="${IF.x}" y="${IF.y}" width="${IF.w}" height="${IF.h}" rx="10"></rect>
        <text class="iface-title" x="${IF.x + 16}" y="${IF.y + 24}">«인터페이스» 언급 대상 · Mentionable</text>
        <text class="iface-sub" x="${IF.x + 16}" y="${IF.y + 42}">공유 속성 7 · 구현 유형 9 · 기사 텍스트에서 추출</text>
      </g>
      ${edges.join('')}
      ${Object.keys(SP).map(node).join('')}`;
    const pick = el => {
      if (!el) return;
      $$('.on', svg).forEach(n => n.classList.remove('on'));
      el.classList.add('on');
      if (el.dataset.type) $('#type-detail').innerHTML = typeDetail(el.dataset.type);
      else if (el.dataset.link) $('#type-detail').innerHTML = linkDetail(el.dataset.link);
      else $('#type-detail').innerHTML = ifaceDetail();
    };
    const target = ev => ev.target.closest('[data-type],[data-link],[data-iface]');
    svg.addEventListener('click', ev => pick(target(ev)));
    svg.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { const el = target(ev); if (el) { ev.preventDefault(); pick(el); } } });
    $('#type-detail').addEventListener('click', ev => {
      const b = ev.target.closest('[data-pick]'); if (!b) return;
      const [kind, id] = b.dataset.pick.split(':');
      pick($(kind === 'type' ? `[data-type="${id}"]` : kind === 'link' ? `[data-link="${id}"]` : '[data-iface]', svg));
    });
    pick($('[data-type="org"]', svg));
    renderConcept();
  }
  function fillCount(t, get) {
    if (ENT_TYPES.includes(t)) return ENTS.filter(e => e.t === t).filter(e => { const v = get(e); return v != null && v !== '' && !(Array.isArray(v) && !v.length); }).length;
    return 0;
  }
  function ltItems(t) {
    const isEnt = ENT_TYPES.includes(t);
    return LINK_TYPES.filter(l => l.from === t || l.to === t || (isEnt && (l.from === 'mentionable' || l.to === 'mentionable')))
      .map(l => `<li><button type="button" data-pick="link:${l.id}"><span>${l.from === t || (l.from === 'mentionable' && isEnt) ? '→' : '←'} ${l.from === t || l.from === 'mentionable' ? l.ko : l.inv}<code>${l.id}</code></span><span class="num">${l.card} · ${fmt(linkCount(l.id))}</span></button></li>`).join('');
  }
  function typeDetail(t) {
    const tm = TYPE_META[t], isEnt = ENT_TYPES.includes(t), n = typeCount(t);
    let rows = '', extra = '';
    if (isEnt) {
      const list = ENTS.filter(e => e.t === t);
      const ex = list.slice().sort((a, b) => b.total - a.total)[0];
      rows += SHARED.map(([api, ko, base, tag, get]) => `<tr><td>${ko}</td><td><code>${api}</code></td><td><code>${esc(base)}</code>${tag ? `<span class="tag">${tag}</span>` : ''}<span class="tag">공유</span></td><td class="num">${fmt(fillCount(t, get))}/${fmt(n)}</td></tr>`).join('');
      rows += (PROP_DEFS[t] || []).map(([api, ko, base, get]) => `<tr><td>${ko}</td><td><code>${api}</code></td><td><code>${esc(base)}</code></td><td class="num">${fmt(fillCount(t, get))}/${fmt(n)}</td></tr>`).join('');
      const catKey = (PROP_DEFS[t] || [])[0];
      if (catKey) {
        const m = new Map();
        list.forEach(e => { const v = catKey[3](e); if (v) m.set(v, (m.get(v) || 0) + 1); });
        const cats = [...m].sort((a, b) => b[1] - a[1]);
        const mx = Math.max(1, ...cats.map(c => c[1]));
        extra += `<h4 class="td-h">${catKey[1]} 분포 <span class="muted">${cats.length}종</span></h4><div class="tbars">${cats.slice(0, 10).map(([k, c]) => `<div class="tbar" style="grid-template-columns:minmax(0,1fr) 90px 28px"><span>${esc(k)}</span><span class="track"><b style="width:${(100 * c / mx).toFixed(1)}%;background:${tc(t)}"></b></span><span class="num">${c}</span></div>`).join('')}</div>${cats.length > 10 ? `<p class="out-note">외 ${cats.length - 10}종</p>` : ''}`;
      }
      extra += `<h4 class="td-h">언급 상위 오브젝트 <span class="muted">누르면 오브젝트 그래프에서 열립니다</span></h4><div class="chips">${list.filter(e => !e.hub).sort((a, b) => b.total - a.total).slice(0, 12).map(e => chip(e, e.total)).join('')}</div>`;
      if (ex) extra = `<p class="out-note" style="margin:0 0 4px">예시 오브젝트: ${esc(ex.n)} (<code>${esc(ex.id)}</code>)</p>` + extra;
    } else {
      const F = {
        issue: { issueId: NI, period: NI, publishedDate: NI, keyTheme: ISS.filter(x => x.theme).length, articleCount: NI },
        article: { articleId: ARTS.length, titleKr: ARTS.filter(a => a.kr).length, titleEn: ARTS.filter(a => a.en).length, summary: ARTS.filter(a => a.sum).length, keywords: ARTS.filter(a => a.kw.length).length, topic: ARTS.filter(a => a.topic || a.topicKr).length, publishedDate: ARTS.filter(a => a.date).length, url: ARTS.filter(a => a.url).length, issueId: ARTS.length, sourceName: ARTS.length },
        source: { sourceName: SRC.length, category: SRC.length, articleCount: SRC.length },
      }[t];
      const DEF = {
        issue: [['issueId', '호 번호', 'Integer', 'PK'], ['period', '발행 기간', 'String', '타이틀'], ['publishedDate', '발행일', 'Date', ''], ['keyTheme', '핵심 주제', 'String', ''], ['articleCount', '수록 기사 수', 'Integer', '파생']],
        article: [['articleId', '기사 ID', 'String', 'PK'], ['titleKr', '제목', 'String', '타이틀'], ['titleEn', '영문 제목', 'String', ''], ['summary', '요약', 'String', ''], ['keywords', '키워드', 'Array<String>', ''], ['topic', '주제', 'String', ''], ['publishedDate', '기사 날짜', 'Date', ''], ['url', '원문 URL', 'String', ''], ['issueId', '수록 호', 'Integer', 'FK'], ['sourceName', '출처', 'String', 'FK']],
        source: [['sourceName', '출처명', 'String', 'PK · 타이틀'], ['category', '출처 분류', 'String', ''], ['articleCount', '기사 수', 'Integer', '파생']],
      }[t];
      rows = DEF.map(([api, ko, base, tag]) => `<tr><td>${ko}</td><td><code>${api}</code></td><td><code>${esc(base)}</code>${tag ? `<span class="tag">${tag}</span>` : ''}</td><td class="num">${fmt(F[api])}/${fmt(n)}</td></tr>`).join('');
      if (t === 'issue') extra = `<h4 class="td-h">최근 호</h4><div class="chips">${ISS.slice(-6).reverse().map(x => `<button type="button" class="chip" data-issue="${x.id}">제${x.id}호 <span class="num">${ISS_ARTS[IX.get(x.id)].length}</span></button>`).join('')}</div>`;
      if (t === 'source') {
        const top = SRC.slice().sort((a, b) => b.arts.length - a.arts.length).slice(0, 10);
        extra = `<h4 class="td-h">기사가 많은 출처</h4><ol class="rank">${top.map(s => `<li><span>${esc(s.name)} <span class="muted">· ${esc(s.cat)}</span></span><span class="num">${s.arts.length}</span></li>`).join('')}</ol>`;
      }
      if (t === 'article') {
        const a = ARTS[ARTS.length - 1];
        extra = `<h4 class="td-h">예시 오브젝트 <span class="muted">기본 키 <code>${esc(a.id)}</code></span></h4><ul class="arts">${artItem(a, -1)}</ul>`;
      }
    }
    return `
      <div class="td-head"><span class="dot" style="background:${tc(t)}"></span><div><h3>${tm.ko}</h3><code>${tm.api}</code></div></div>
      <p class="td-desc">${tm.desc}</p>
      <dl class="kv">
        <div><dt>오브젝트 수</dt><dd>${fmt(n)}</dd></div>
        <div><dt>기본 키</dt><dd><code>${tm.pk}</code></dd></div>
        <div><dt>타이틀 속성</dt><dd><code>${tm.title}</code></dd></div>
        ${isEnt ? '<div><dt>구현 인터페이스</dt><dd><button type="button" class="link-issue" data-pick="iface:1">언급 대상</button></dd></div>' : ''}
      </dl>
      <h4 class="td-h">속성 <span class="muted">채움 = 값이 있는 오브젝트 수</span></h4>
      <div class="scroll-x"><table class="ptable"><thead><tr><th>표시 이름</th><th>API 이름</th><th>기본 유형</th><th>채움</th></tr></thead><tbody>${rows}</tbody></table></div>
      <h4 class="td-h">링크 유형</h4><ul class="lt-list">${ltItems(t)}</ul>
      ${extra}`;
  }
  function ifaceDetail() {
    const rows = SHARED.map(([api, ko, base, tag]) => `<tr><td>${ko}</td><td><code>${api}</code></td><td><code>${esc(base)}</code>${tag ? `<span class="tag">${tag}</span>` : ''}</td></tr>`).join('');
    return `
      <div class="td-head"><span class="dot" style="background:var(--ink-3)"></span><div><h3>«인터페이스» 언급 대상</h3><code>Mentionable</code></div></div>
      <p class="td-desc">기사에서 언급될 수 있는 9개 엔터티 유형이 함께 구현하는 인터페이스입니다. 공유 속성 덕분에 기관이든 정책이든 같은 방식으로 검색·집계하고 기사와 연결할 수 있습니다.</p>
      <dl class="kv"><div><dt>구현 유형</dt><dd>9</dd></div><div><dt>오브젝트</dt><dd>${fmt(ENTS.length)}</dd></div><div><dt>언급 링크</dt><dd>${fmt(D.meta.links)}</dd></div></dl>
      <h4 class="td-h">공유 속성</h4>
      <div class="scroll-x"><table class="ptable"><thead><tr><th>표시 이름</th><th>API 이름</th><th>기본 유형</th></tr></thead><tbody>${rows}</tbody></table></div>
      <h4 class="td-h">구현 오브젝트 유형</h4>
      <div class="chips">${ENT_TYPES.map(t => `<button type="button" class="chip" data-pick="type:${t}"><i style="background:${tc(t)}"></i>${TYPE_META[t].ko} <span class="num">${typeCount(t)}</span></button>`).join('')}</div>
      <h4 class="td-h">인터페이스 링크 유형</h4>
      <ul class="lt-list">${['mentions', 'involves', 'coMentionedWith'].map(id => `<li><button type="button" data-pick="link:${id}"><span>${LT[id].ko}<code>${id}</code></span><span class="num">${LT[id].card} · ${fmt(linkCount(id))}</span></button></li>`).join('')}</ul>`;
  }
  function linkDetail(id) {
    const l = LT[id];
    let ex = '';
    if (id === 'coMentionedWith') {
      const pairs = [...ALL.pairs].filter(([k]) => !ENTS[k >> 10].hub && !ENTS[k & 1023].hub).sort((a, b) => b[1] - a[1]).slice(0, 10);
      ex = `<ol class="rank">${pairs.map(([k, w]) => `<li><span class="chips">${chip(ENTS[k >> 10])}${chip(ENTS[k & 1023])}</span><span class="num">${w}</span></li>`).join('')}</ol>`;
    } else if (id === 'mentions' || id === 'publishedIn' || id === 'reportedBy') {
      const recent = ARTS.slice(-4).reverse();
      ex = `<ul class="arts">${recent.map(a => `<li class="art"><div class="art-meta"><span>${esc(a.id)}</span>${id === 'publishedIn' ? `<button type="button" class="link-issue" data-issue="${a.issue}">→ 제${a.issue}호</button>` : id === 'reportedBy' ? `<span>→ ${esc(SRC[a.src].name)}</span>` : ''}</div><div style="font-size:13px;margin:2px 0 4px">${esc(a.kr || a.en)}</div>${id === 'mentions' ? `<div class="chips">${a.ents.filter(j => !ENTS[j].hub).map(j => chip(ENTS[j])).join('')}</div>` : ''}</li>`).join('')}</ul>`;
    } else {
      const list = CLINKS.filter(x => x.lt === id).sort((a, b) => ENTS[b.s].total - ENTS[a.s].total).slice(0, 10);
      ex = `<ul class="lt-list">${list.map(x => `<li style="display:flex;flex-wrap:wrap;gap:4px;align-items:center">${chip(ENTS[x.s])}<span class="muted">→</span>${chip(ENTS[x.t])}</li>`).join('')}</ul>`;
    }
    const ends = t => (t === 'mentionable' ? '<button type="button" class="link-issue" data-pick="iface:1">언급 대상</button>' : `<button type="button" class="link-issue" data-pick="type:${t}">${TYPE_META[t].ko}</button>`);
    return `
      <div class="td-head"><span class="dot" style="background:var(--ink-2);border-radius:2px"></span><div><h3>${l.ko}</h3><code>${l.id}</code></div></div>
      <p class="td-desc">${ends(l.from)} → ${ends(l.to)} 방향의 링크 유형입니다. 반대 방향에서는 '${l.inv}'(으)로 읽습니다.</p>
      <dl class="kv">
        <div><dt>카디널리티</dt><dd>${l.card}</dd></div>
        <div><dt>링크 수</dt><dd>${fmt(linkCount(id))}</dd></div>
        <div><dt>구현 방식</dt><dd style="font-weight:500">${esc(l.impl)}</dd></div>
      </dl>
      <h4 class="td-h">${l.derived ? '가장 강한 링크' : '링크 예시'}</h4>${ex}`;
  }
  function renderConcept() {
    const storedLinks = ARTS.length * 2 + D.meta.links + CLINKS.length;
    const nProps = 5 + 10 + 3 + SHARED.length + ENT_TYPES.reduce((s, t) => s + (PROP_DEFS[t] || []).length, 0);
    const rows = [
      ['오브젝트 유형', 'Object type', '실제 세계의 개체·사건을 정의하는 스키마. 아카이브 유형 3개(호·기사·출처)와 기사에서 추출한 엔터티 유형 9개.', '12개', 'schema'],
      ['오브젝트', 'Object', '각 호·기사·출처와 추출된 기관·기업·인물·사업·정책 등 개별 인스턴스.', fmt(NI + ARTS.length + SRC.length + ENTS.length) + '개', 'graph'],
      ['속성', 'Property', '제목·요약·키워드, 카테고리·진영·직책처럼 오브젝트의 특성. 외래 키 속성은 링크의 근거가 된다.', nProps + '개', 'schema'],
      ['공유 속성 · 인터페이스', 'Shared property · Interface', '9개 엔터티 유형이 함께 쓰는 기본 키·이름·별칭·언급 수·최초/최근 언급 호를 "언급 대상" 인터페이스로 묶었다.', SHARED.length + '개', 'schema'],
      ['링크 유형', 'Link type', '수록·출처·언급, 소속·운용·개발 등 큐레이션 링크 10개, 같은 기사에 함께 등장한 파생 링크 "동시 언급".', '14개', 'schema'],
      ['링크', 'Link', `언급 ${fmt(D.meta.links)} · 수록과 출처 각 ${fmt(ARTS.length)} · 큐레이션 ${fmt(CLINKS.length)}. 동시 언급은 조회할 때 계산한다.`, fmt(storedLinks) + '개', 'graph'],
      ['오브젝트셋', 'Object set', '필터나 탐색으로 모은 오브젝트 집합. 그래프 탭의 프리셋, 유형·기간 필터, 주변 탐색 결과.', SETS.length + '개 프리셋', 'graph'],
      ['오브젝트 뷰', 'Object view', '오브젝트 하나의 속성·링크·언급 추이·관련 기사를 한 화면에 모은 패널.', '그래프 탭', 'graph'],
      ['액션 유형', 'Action type', '신규 호 등록, 기사 태깅, 별칭 추가, 오브젝트 병합, 관계 승격. 파라미터·규칙·제출 조건을 가진다.', '5개', 'kinetic'],
      ['함수', 'Function', '키워드 정규화, 언급 추이, 동시 언급 기사, 급부상 탐지, 연관 경로.', '5개', 'kinetic'],
      ['역할', 'Role', '소유자·편집자·뷰어·발견자. 스키마 수정, 액션 실행, 조회 권한을 나눈다.', '4개', 'kinetic'],
    ];
    $('#concept-table').innerHTML = `<thead><tr><th>개념</th><th>이 아카이브에서</th><th>보기</th><th>규모</th></tr></thead><tbody>${rows.map(([ko, en, desc, n, tab]) => `<tr><td>${ko}<small>${en}</small></td><td>${desc}</td><td><button type="button" class="go" data-goto="${tab}">${{ graph: '오브젝트 그래프', schema: '스키마', kinetic: '액션·함수' }[tab]}</button></td><td>${n}</td></tr>`).join('')}</tbody>`;
  }

  // ───────── 키네틱: 액션·함수 ─────────
  function entOptions(selId, filter) {
    return ENT_TYPES.map(t => {
      const list = RANKED.filter(e => e.t === t && (!filter || filter(e)));
      if (!list.length) return '';
      return `<optgroup label="${TYPE_META[t].ko}">${list.map(e => `<option value="${e.id}"${e.id === selId ? ' selected' : ''}>${esc(e.n)} · ${e.total}</option>`).join('')}</optgroup>`;
    }).join('');
  }
  const pickId = (...ids) => ids.find(id => EID.has(id)) || RANKED[0].id;
  const edits = list => `<ol class="edits">${list.map(([op, html]) => `<li class="${op}"><b>${{ add: '+', mod: '~', del: '−', keep: '=' }[op]}</b><span>${html}</span></li>`).join('')}</ol>`;
  const critHTML = list => `<p class="sub-h">제출 조건</p><ul class="crit">${list.map(([ok, txt]) => `<li class="${ok ? '' : 'no'}">${txt}</li>`).join('')}</ul>`;
  const AVG_ENTS = D.meta.links / ARTS.length;
  const RFI = (D.meta.unmappedTop || []).find(([k]) => k === 'RFI');
  const RECENT_AVG = Math.round(ISS_ARTS.slice(-8).reduce((s, l) => s + l.length, 0) / Math.min(8, NI));

  function promoteCandidates() {
    const out = [];
    const types = LINK_TYPES.filter(l => ['operatedBy', 'contractedWith', 'developedBy', 'affiliatedOrg', 'affiliatedCompany', 'issuedBy', 'involves'].includes(l.id));
    for (const e of RANKED) {
      for (const lt of types) {
        if (lt.from !== e.t) continue;
        const has = OUT[e.i].filter(l => l.lt === lt.id);
        if (lt.card === 'N:1' && has.length) continue;
        if (e.t === 'person' && OUT[e.i].some(l => l.lt === 'affiliatedOrg' || l.lt === 'affiliatedCompany')) continue;
        for (const [j, w] of ALL.adj[e.i]) {
          if (w < 3) break;
          const b = ENTS[j];
          if (b.hub || (lt.to !== 'mentionable' && lt.to !== b.t) || has.some(l => l.t === j)) continue;
          const c = cosine(ALL, e.i, j, w);
          if (c >= 0.2) out.push({ a: e, b, lt, w, c });
        }
      }
    }
    return out.sort((x, y) => y.c - x.c || y.w - x.w).slice(0, 6);
  }
  const validLinkTypes = (a, b) => LINK_TYPES.filter(l => ['operatedBy', 'contractedWith', 'developedBy', 'affiliatedOrg', 'affiliatedCompany', 'issuedBy', 'involves', 'belongsToCountry', 'headquarteredIn', 'parentOrganization'].includes(l.id) && l.from === a.t && (l.to === b.t || l.to === 'mentionable'));

  const ACTIONS = [
    {
      id: 'registerIssue', ko: '신규 호 등록', role: '편집자 이상',
      desc: '매주 받은 뉴스레터 PDF를 새 호로 추가합니다. 실제 운영에서는 data/newsletter-N.js를 만들고 config.js 목록 맨 앞에 넣은 뒤 배포하는 작업입니다.',
      form: () => `<div class="fld-row">
        <div class="fld"><label for="ri-id">호 번호 <code>issueId: Integer</code></label><input id="ri-id" name="issueNo" type="number" value="${LAST + 1}" min="1"></div>
        <div class="fld"><label for="ri-n">기사 수 <code>articleCount: Integer</code></label><input id="ri-n" name="n" type="number" value="${RECENT_AVG}" min="1" max="40"></div></div>
        <div class="fld"><label for="ri-period">발행 기간 <code>period: String</code></label><input id="ri-period" name="period" type="text" value="${esc(nextPeriod())}"></div>`,
      rules: ['NewsletterIssue 오브젝트 1개 생성', 'Article 오브젝트 생성, 수록 호·출처 링크 연결', '기사마다 별칭 규칙으로 언급 링크 생성', '사이트 상단 최신 호 요약 교체'],
      read: f => ({ id: +f.issueNo.value, n: +f.n.value, period: f.period.value.trim() }),
      criteria: v => [[v.id === LAST + 1, `호 번호가 직전 호(제${LAST}호) 다음 번호`], [v.period.length > 0, '발행 기간 입력됨'], [v.n >= 1 && v.n <= 40, '기사 수 1–40건']],
      preview: v => edits([
        ['add', `오브젝트 생성 <code>NewsletterIssue</code> issueId=${v.id}, period="${esc(v.period)}"`],
        ['add', `오브젝트 생성 <code>Article</code> ${v.n}개 · articleId ${v.id}-1 … ${v.id}-${v.n}`],
        ['add', `링크 생성 <code>publishedIn</code> ${v.n}개, <code>reportedBy</code> ${v.n}개`],
        ['add', `링크 생성 <code>mentions</code> 약 ${Math.round(v.n * AVG_ENTS)}개 · 기사당 평균 ${AVG_ENTS.toFixed(1)}개 기준`],
        ['mod', `<code>config.js</code> files 맨 앞에 "data/newsletter-${v.id}.js" 추가`],
        ['mod', `최신 호 요약을 제${v.id}호 핵심 주제로 교체`],
      ]),
    },
    {
      id: 'tagArticleEntities', ko: '기사 오브젝트 태깅', role: '편집자 이상',
      desc: '기사 제목·요약·키워드·주제 텍스트에 오브젝트 별칭 규칙을 적용해 언급 링크를 다시 계산합니다. 별칭 사전이 바뀐 뒤 기존 기사에 다시 돌리는 액션입니다.',
      form: () => `<div class="fld"><label for="ta-art">기사 <code>article: Article</code></label><select id="ta-art" name="art">${ARTS.slice(-40).reverse().map(a => `<option value="${a.i}">제${a.issue}호 · ${esc((a.kr || a.en).slice(0, 46))}${(a.kr || a.en).length > 46 ? '…' : ''}</option>`).join('')}</select></div>`,
      rules: ['기사 텍스트에 300개 오브젝트의 별칭 규칙 적용', '일치한 오브젝트마다 mentions 링크 생성', '기존 링크와 비교해 바뀐 부분만 반영'],
      read: f => ({ a: ARTS[+f.art.value] }),
      criteria: v => [[!!v.a, '기사 선택됨'], [!!(v.a && (v.a.kr || v.a.sum)), '제목 또는 요약 텍스트 있음']],
      preview: v => {
        const T = artText(v.a);
        const found = [];
        ENTS.forEach(e => { if (e.hub) return; for (const c of compiled(e)) if (hit(c, T)) { found.push({ e, alias: c.src }); break; } });
        const cur = new Set(v.a.ents), now = new Set(found.map(x => x.e.i));
        const list = found.map(x => [cur.has(x.e.i) ? 'keep' : 'add', `${cur.has(x.e.i) ? '유지' : '링크 생성'} <code>mentions</code> → ${chip(x.e)} <span class="muted">별칭 ${typeof x.alias === 'object' ? '정규식 ' + esc(reHuman(x.alias.r)) : '"' + esc(String(x.alias).replace(/^=/, '')) + '"'}</span>`]);
        v.a.ents.filter(j => !now.has(j) && !ENTS[j].hub).forEach(j => list.push(['del', `링크 삭제 <code>mentions</code> → ${chip(ENTS[j])}`]));
        const add = list.filter(x => x[0] === 'add').length, del = list.filter(x => x[0] === 'del').length;
        return edits(list) + `<p class="out-note">일치 ${found.length}개 · 추가 ${add} · 삭제 ${del}. 현재 별칭 사전으로 다시 계산한 결과입니다.</p>`;
      },
    },
    {
      id: 'addAlias', ko: '별칭 추가', role: '편집자 이상',
      desc: '정규화되지 않은 키워드를 기존 오브젝트의 별칭으로 등록합니다. 저장하면 모든 기사에 새 별칭이 적용되어 언급 링크가 늘어납니다.',
      form: () => `<div class="fld"><label for="aa-ent">대상 오브젝트 <code>object: Mentionable</code></label><select id="aa-ent" name="ent">${entOptions(pickId('d_acq'))}</select></div>
        <div class="fld-row"><div class="fld"><label for="aa-alias">새 별칭 <code>alias: String</code></label><input id="aa-alias" name="alias" type="text" value="RFI"></div>
        <div class="fld"><span class="fl">영문 대소문자</span><label class="chk" for="aa-cs"><input id="aa-cs" name="cs" type="checkbox" checked> 구분해서 일치</label></div></div>
        ${RFI ? `<p class="out-note">예시: "RFI"(정보요청서)는 아직 어느 오브젝트에도 묶이지 않은 키워드로 ${RFI[1]}회 쓰였습니다.</p>` : ''}`,
      rules: ['오브젝트의 aliases 속성에 값 추가', '전체 기사에 새 별칭 적용, 새로 일치한 기사에 mentions 링크 생성'],
      read: f => ({ e: EID.get(f.ent.value), alias: f.alias.value.trim(), cs: f.cs.checked }),
      check: v => {
        const s = v.alias;
        const already = v.e.a.some(a => typeof a === 'string' && a.replace(/^=/, '').toLowerCase() === s.toLowerCase());
        const conflicts = s ? matchText(s).filter(x => x.e !== v.e) : [];
        return { already, conflicts };
      },
      criteria(v) { const c = this.check(v); return [[v.alias.replace(/\s+/g, '').length >= 2, '별칭 2자 이상'], [!c.already, '이미 등록된 별칭이 아님'], [!c.conflicts.length, c.conflicts.length ? `다른 오브젝트 별칭과 겹치지 않음 · 겹침: ${c.conflicts.slice(0, 3).map(x => esc(x.e.label)).join(', ')}` : '다른 오브젝트 별칭과 겹치지 않음']]; },
      preview: v => {
        const c = compileAlias((v.cs && /^[\x00-\x7F]+$/.test(v.alias) ? '=' : '') + v.alias);
        if (!c) return '<p class="out-note">별칭을 규칙으로 바꿀 수 없습니다. 특수 문자를 빼고 다시 입력하세요.</p>';
        const hits = ARTS.filter(a => !a.ents.includes(v.e.i) && hit(c, artText(a)));
        const already = ARTS.filter(a => a.ents.includes(v.e.i) && hit(c, artText(a))).length;
        return edits([
          ['mod', `속성 변경 ${chip(v.e)} <code>aliases</code> += "${esc(v.alias)}"`],
          [hits.length ? 'add' : 'keep', `링크 생성 <code>mentions</code> ${hits.length}개 · 이미 연결된 기사 ${already}건은 그대로`],
          ...hits.slice(0, 4).map(a => ['add', `제${a.issue}호 · ${esc((a.kr || a.en).slice(0, 52))}`]),
        ]) + (hits.length > 4 ? `<p class="out-note">외 ${hits.length - 4}건</p>` : '');
      },
    },
    {
      id: 'mergeObjects', ko: '오브젝트 병합', role: '편집자 이상',
      desc: '같은 대상을 가리키는 두 오브젝트를 하나로 합칩니다. 원본의 별칭·언급·스키마 링크를 대상으로 옮기고 원본은 삭제합니다.',
      form: () => `<div class="fld-row"><div class="fld"><label for="mo-src">원본 <code>source: Mentionable</code></label><select id="mo-src" name="src">${entOptions(pickId('fable'))}</select></div>
        <div class="fld"><label for="mo-tgt">대상 <code>target: Mentionable</code></label><select id="mo-tgt" name="tgt">${entOptions(pickId('claude'))}</select></div></div>`,
      rules: ['원본 별칭을 대상 aliases에 추가', '원본의 mentions·스키마 링크를 대상으로 재지정, 중복 링크 제거', '원본 오브젝트 삭제'],
      read: f => ({ s: EID.get(f.src.value), t: EID.get(f.tgt.value) }),
      criteria: v => [[v.s !== v.t, '서로 다른 오브젝트'], [v.s.t === v.t.t, `같은 오브젝트 유형 · ${TYPE_META[v.s.t].ko} / ${TYPE_META[v.t.t].ko}`]],
      preview: v => {
        const ts = new Set(v.t.arts), overlap = v.s.arts.filter(a => ts.has(a)).length;
        const union = v.t.total + v.s.total - overlap;
        const sl = OUT[v.s.i].length + INN[v.s.i].length;
        return edits([
          ['mod', `속성 변경 ${chip(v.t)} <code>aliases</code> += ${v.s.a.length}개`],
          ['mod', `링크 재지정 <code>mentions</code> ${v.s.total}개 · 중복 ${overlap}개 제거 → 언급 기사 ${v.t.total} → ${union}건`],
          ['mod', `스키마 링크 재지정 ${sl}개`],
          ['del', `오브젝트 삭제 ${chip(v.s)}`],
        ]);
      },
    },
    {
      id: 'promoteLink', ko: '관계 승격', role: '편집자 이상',
      desc: '자주 함께 언급되는 두 오브젝트의 관계를 확인한 뒤, 동시 언급(파생)을 스키마 링크로 승격합니다. 아래 후보는 연관도가 높지만 아직 스키마 링크가 없는 쌍입니다.',
      form: () => {
        const c = promoteCandidates(), d = c[0];
        return `<div class="fld"><span class="fl">승격 후보 <span class="muted">연관도 순 · 누르면 파라미터가 채워집니다</span></span><p class="out-note" style="margin:0">후보는 동시 언급 통계로만 뽑기 때문에 실제 관계가 아닌 쌍도 섞입니다. 미리보기의 근거 기사를 확인한 뒤 승격하세요.</p><div class="sugg">${c.map(x => `<button type="button" data-cand="${x.a.id}|${x.b.id}|${x.lt.id}">${esc(x.a.label)} → ${esc(x.b.label)} · ${x.lt.ko} <span class="muted">${x.c.toFixed(2)}</span></button>`).join('')}</div></div>
          <div class="fld-row"><div class="fld"><label for="pl-a">시작 오브젝트 <code>from</code></label><select id="pl-a" name="a">${entOptions(d ? d.a.id : pickId('maven'))}</select></div>
          <div class="fld"><label for="pl-b">끝 오브젝트 <code>to</code></label><select id="pl-b" name="b">${entOptions(d ? d.b.id : pickId('army'))}</select></div></div>
          <div class="fld"><label for="pl-lt">링크 유형 <code>linkType</code></label><select id="pl-lt" name="lt" data-default="${d ? d.lt.id : ''}"></select></div>`;
      },
      rules: ['스키마 링크 1개 생성', 'N:1 링크 유형이면 기존 값을 교체'],
      sync(form) {
        const a = EID.get(form.a.value), b = EID.get(form.b.value), sel = form.lt;
        const keep = sel.value || sel.dataset.default;
        const opts = validLinkTypes(a, b);
        sel.innerHTML = opts.length ? opts.map(l => `<option value="${l.id}"${l.id === keep ? ' selected' : ''}>${l.ko} · ${l.id} (${l.card})</option>`).join('') : '<option value="">정의된 링크 유형 없음</option>';
        sel.dataset.default = '';
      },
      read: f => ({ a: EID.get(f.a.value), b: EID.get(f.b.value), lt: f.lt.value }),
      criteria: v => {
        const P = ALL, w = (P.adj[v.a.i].find(([j]) => j === v.b.i) || [0, 0])[1];
        const exists = CLINKS.some(l => l.lt === v.lt && l.s === v.a.i && l.t === v.b.i);
        const rev = !v.lt && validLinkTypes(v.b, v.a).length;
        return [[v.a !== v.b, '서로 다른 오브젝트'], [!!v.lt, v.lt ? `${TYPE_META[v.a.t].ko} → ${TYPE_META[v.b.t].ko} 링크 유형 있음` : `${TYPE_META[v.a.t].ko} → ${TYPE_META[v.b.t].ko} 링크 유형 없음${rev ? ' · 방향을 바꾸면 가능' : ''}`], [w >= 2, `근거: 동시 언급 2건 이상 · 현재 ${w}건`], [!exists, '같은 링크가 아직 없음']];
      },
      preview: v => {
        const lt = LT[v.lt];
        const w = (ALL.adj[v.a.i].find(([j]) => j === v.b.i) || [0, 0])[1];
        const prev = lt.card === 'N:1' ? OUT[v.a.i].find(l => l.lt === v.lt) : null;
        const both = v.a.arts.filter(x => new Set(v.b.arts).has(x)).slice(0, 3);
        return edits([
          prev ? ['mod', `링크 교체 <code>${v.lt}</code> ${chip(v.a)} → ${chip(ENTS[prev.t])} 대신 ${chip(v.b)}`] : ['add', `링크 생성 <code>${v.lt}</code> ${chip(v.a)} → ${chip(v.b)}`],
          ['keep', `근거: 동시 언급 ${w}건 · 연관도 ${cosine(ALL, v.a.i, v.b.i, w || 0).toFixed(2)}`],
          ...both.map(ai => ['keep', `제${ARTS[ai].issue}호 · ${esc((ARTS[ai].kr || ARTS[ai].en).slice(0, 52))}`]),
        ]);
      },
    },
  ];

  const FUNCS = [
    {
      id: 'normalizeKeyword', ko: '키워드 정규화',
      sig: 'normalizeKeyword(raw: String): Mentionable[]',
      desc: `원시 키워드나 문장을 별칭 규칙으로 오브젝트에 대응시킵니다. 아카이브의 키워드 ${fmt(D.meta.kwUnique)}종을 정규화할 때 쓴 규칙과 같습니다.`,
      form: () => `<div class="fld"><label for="fn-raw">raw</label><input id="fn-raw" name="raw" type="text" value="앤트로픽 공급망 리스크 소송과 펜타곤"></div>
        <div class="sugg">${['Project Maven 확대', '대드론 레이저 요격', 'CMMC 2.0 인증', '헥세스 장관 메모', 'GPT-5 국방 도입'].map(s => `<button type="button" data-fill="raw" data-val="${esc(s)}">${esc(s)}</button>`).join('')}</div>`,
      run: f => {
        const raw = f.raw.value.trim();
        if (!raw) return '<p class="muted">텍스트를 입력하세요.</p>';
        const r = matchText(raw);
        return r.length ? `<p>${r.length}개 오브젝트로 정규화됩니다.</p><table class="mtable"><thead><tr><th>오브젝트</th><th>일치한 별칭</th></tr></thead><tbody>${r.map(x => `<tr><td>${chip(x.e)}</td><td>${typeof x.alias === 'object' ? `<span class="alias re" title="${esc(x.alias.r)}">${esc(reHuman(x.alias.r))}</span>` : aliasPill(x.alias)}</td></tr>`).join('')}</tbody></table>` : '<p>일치하는 오브젝트가 없습니다. 별칭 추가 액션으로 새 별칭을 등록할 수 있습니다.</p>';
      },
    },
    {
      id: 'mentionTrend', ko: '언급 추이',
      sig: 'mentionTrend(object: Mentionable): Integer[73]',
      desc: '오브젝트가 호마다 몇 건의 기사에서 언급됐는지 반환합니다. 최근 8개 호와 그 이전의 평균을 비교합니다.',
      form: () => `<div class="fld"><label for="fn-mt">object</label><select id="fn-mt" name="o">${entOptions(pickId('d_cuas'))}</select></div>`,
      run: f => {
        const e = EID.get(f.o.value), tr = e.trend;
        const recent = tr.slice(-8).reduce((s, v) => s + v, 0), prior = tr.slice(0, -8).reduce((s, v) => s + v, 0);
        let peak = 0; tr.forEach((v, k) => { if (v > tr[peak]) peak = k; });
        return `${sparkSVG(tr, e.t, { period: false })}
          <dl class="props">${propRow('합계', 'sum', `${e.total}건`)}${propRow('최대', 'peak', `제${ISS[peak].id}호 ${tr[peak]}건`)}${propRow('최근 8호', 'recent', `${recent}건 · 호당 ${(recent / 8).toFixed(2)}`)}${propRow('이전 평균', 'prior', `호당 ${(prior / Math.max(1, NI - 8)).toFixed(2)}`)}</dl>`;
      },
    },
    {
      id: 'coMention', ko: '동시 언급 기사',
      sig: 'coMention(a: Mentionable, b: Mentionable): Article[]',
      desc: '두 오브젝트를 함께 언급한 기사를 최신순으로 반환합니다. 연관도는 동시 언급 수를 각 언급 수의 기하평균으로 나눈 값입니다.',
      form: () => `<div class="fld-row"><div class="fld"><label for="fn-ca">a</label><select id="fn-ca" name="a">${entOptions(pickId('anthropic'))}</select></div><div class="fld"><label for="fn-cb">b</label><select id="fn-cb" name="b">${entOptions(pickId('dod'))}</select></div></div>`,
      run: f => {
        const a = EID.get(f.a.value), b = EID.get(f.b.value);
        if (a === b) return '<p class="muted">서로 다른 두 오브젝트를 고르세요.</p>';
        const sb = new Set(b.arts), both = a.arts.filter(x => sb.has(x));
        return `<p><b>${both.length}건</b> · 연관도 ${cosine(ALL, a.i, b.i, both.length).toFixed(2)} <span class="muted">(${esc(a.label)} ${a.total}건, ${esc(b.label)} ${b.total}건)</span></p>${both.length ? `<ul class="arts">${both.slice(0, 5).map(ai => artItem(ARTS[ai], a.i)).join('')}</ul>${both.length > 5 ? `<p class="out-note">외 ${both.length - 5}건</p>` : ''}` : ''}`;
      },
    },
    {
      id: 'detectEmerging', ko: '급부상 탐지',
      sig: 'detectEmerging(window: Integer): Mentionable[]',
      desc: '최근 window개 호의 언급 수를 이전 기간 평균으로 기대되는 값과 비교해, 기대보다 크게 늘어난 오브젝트를 찾습니다. 점수 = (최근 − 기대) ÷ √(기대 + 1).',
      form: () => `<div class="slider"><label for="fn-w">window <output id="fn-w-out" for="fn-w">8</output>개 호</label><input id="fn-w" name="w" type="range" min="4" max="${Math.max(4, Math.min(20, NI - 1))}" value="${Math.min(8, Math.max(4, NI - 1))}"></div>`,
      run: f => {
        const W = +f.w.value;
        $('#fn-w-out').textContent = W;
        const rows = RANKED.map(e => {
          let recent = 0, prior = 0;
          e.trend.forEach((v, k) => { if (k >= NI - W) recent += v; else prior += v; });
          const expected = prior / Math.max(1, NI - W) * W;
          return { e, recent, expected, score: (recent - expected) / Math.sqrt(expected + 1) };
        }).filter(r => r.recent >= 3).sort((a, b) => b.score - a.score).slice(0, 8);
        return `<table class="mtable"><thead><tr><th>오브젝트</th><th class="r">최근</th><th class="r">기대</th><th class="r">점수</th></tr></thead><tbody>${rows.map(r => `<tr><td>${chip(r.e)}</td><td class="r">${r.recent}</td><td class="r">${r.expected.toFixed(1)}</td><td class="r">${r.score.toFixed(1)}</td></tr>`).join('')}</tbody></table><p class="out-note">제${ISS[Math.max(0, NI - W)].id}–${LAST}호 기준 · 최근 언급 3건 이상만</p>`;
      },
    },
    {
      id: 'strongestPath', ko: '연관 경로',
      sig: 'strongestPath(a: Mentionable, b: Mentionable): Mentionable[]',
      desc: '동시 언급 그래프에서 두 오브젝트를 잇는 가장 강한 경로를 찾습니다. 연관도가 높은 링크일수록 비용이 낮은 최단 경로(다익스트라)입니다.',
      form: () => `<div class="fld-row"><div class="fld"><label for="fn-pa">a</label><select id="fn-pa" name="a">${entOptions(pickId('ev_ukrwar'))}</select></div><div class="fld"><label for="fn-pb">b</label><select id="fn-pb" name="b">${entOptions(pickId('cca'))}</select></div></div>`,
      run: f => {
        const a = EID.get(f.a.value), b = EID.get(f.b.value);
        if (a === b) return '<p class="muted">서로 다른 두 오브젝트를 고르세요.</p>';
        const path = strongestPath(a.i, b.i);
        if (!path) return '<p>동시 언급 2건 이상인 링크로는 두 오브젝트가 이어지지 않습니다.</p>';
        const hops = [];
        for (let k = 0; k < path.length; k++) {
          hops.push(chip(ENTS[path[k]]));
          if (k < path.length - 1) {
            const w = (ALL.adj[path[k]].find(([j]) => j === path[k + 1]) || [0, 0])[1];
            hops.push(`<span class="hop">—${w}→</span>`);
          }
        }
        return `<div class="path">${hops.join('')}</div><p class="out-note">${path.length - 1}단계 · 화살표 숫자는 동시 언급 기사 수</p>`;
      },
    },
  ];
  function strongestPath(si, ti) {
    const n = ENTS.length, dist = new Float64Array(n).fill(Infinity), prev = new Int32Array(n).fill(-1), fin = new Uint8Array(n);
    dist[si] = 0;
    for (;;) {
      let u = -1, best = Infinity;
      for (let k = 0; k < n; k++) if (!fin[k] && dist[k] < best) { best = dist[k]; u = k; }
      if (u < 0 || u === ti) break;
      fin[u] = 1;
      for (const [v, w] of ALL.adj[u]) {
        if (w < 2 || ENTS[v].hub) continue;
        const nd = dist[u] + 0.25 - Math.log(cosine(ALL, u, v, w));
        if (nd < dist[v]) { dist[v] = nd; prev[v] = u; }
      }
    }
    if (!isFinite(dist[ti])) return null;
    const path = [];
    for (let v = ti; v >= 0; v = prev[v]) path.unshift(v);
    return path;
  }

  function renderKinetic() {
    $('#actions').innerHTML = ACTIONS.map(a => `
      <article class="card act">
        <div class="act-head"><h3>${a.ko}</h3><code>${a.id}</code><span class="role-badge">${a.role}</span></div>
        <p class="act-desc">${a.desc}</p>
        <form class="act-form" data-action="${a.id}" novalidate>
          ${a.form()}
          <p class="sub-h">규칙</p><ol class="rules">${a.rules.map(r => `<li>${r}</li>`).join('')}</ol>
          <div class="crit-box" aria-live="polite"></div>
          <div class="act-btns"><button type="submit" class="btn btn-ink">변경 미리보기</button></div>
        </form>
        <div class="act-out" aria-live="polite"></div>
      </article>`).join('');
    ACTIONS.forEach(a => {
      const form = $(`form[data-action="${a.id}"]`), out = form.parentElement.querySelector('.act-out');
      const evalCrit = () => {
        if (a.sync) a.sync(form);
        const v = a.read(form), c = a.criteria(v);
        $('.crit-box', form).innerHTML = critHTML(c);
        $('button[type="submit"]', form).disabled = !c.every(x => x[0]);
        return { v, ok: c.every(x => x[0]) };
      };
      form.addEventListener('input', () => { evalCrit(); out.innerHTML = ''; });
      form.addEventListener('change', () => { evalCrit(); out.innerHTML = ''; });
      form.addEventListener('click', ev => {
        const b = ev.target.closest('[data-cand]'); if (!b) return;
        const [x, y, lt] = b.dataset.cand.split('|');
        form.a.value = x; form.b.value = y; form.lt.dataset.default = lt; form.lt.value = '';
        evalCrit(); out.innerHTML = '';
      });
      form.addEventListener('submit', ev => {
        ev.preventDefault();
        const r = evalCrit();
        out.innerHTML = r.ok ? a.preview(r.v) + '<p class="out-note">미리보기 전용 · 아카이브 데이터는 바뀌지 않았습니다.</p>' : '';
      });
      evalCrit();
    });
    // 기본 미리보기 한 개를 펼쳐 둔다
    const first = $('form[data-action="addAlias"]');
    if (first) first.requestSubmit ? first.requestSubmit() : first.dispatchEvent(new Event('submit', { cancelable: true }));

    $('#funcs').innerHTML = FUNCS.map(fn => `
      <article class="card fn">
        <div class="act-head"><h3>${fn.ko}</h3></div>
        <code class="sig">${esc(fn.sig)}</code>
        <p class="act-desc">${fn.desc}</p>
        <form class="act-form" data-fn="${fn.id}" novalidate>${fn.form()}</form>
        <div class="fn-out" aria-live="polite"></div>
      </article>`).join('');
    FUNCS.forEach(fn => {
      const form = $(`form[data-fn="${fn.id}"]`), out = form.parentElement.querySelector('.fn-out');
      const run = () => { try { out.innerHTML = fn.run(form); } catch (err) { out.innerHTML = `<p class="err">실행 중 오류: ${esc(err.message)}</p>`; } };
      const runSoon = debounce(run, 160);
      form.addEventListener('input', runSoon);
      form.addEventListener('change', run);
      form.addEventListener('submit', ev => { ev.preventDefault(); run(); });
      form.addEventListener('click', ev => {
        const b = ev.target.closest('[data-fill]'); if (!b) return;
        form[b.dataset.fill].value = b.dataset.val; run();
      });
      run();
    });

    const Y = '<span class="yes">●</span>', N = '<span class="no-p">○</span>';
    $('#roles').innerHTML = `<table class="roles"><thead><tr><th>역할</th><th>이 아카이브에서</th><th class="c">존재 확인</th><th class="c">오브젝트 조회</th><th class="c">액션 실행</th><th class="c">스키마 수정</th></tr></thead><tbody>
      <tr><td><b>소유자</b> <code>Owner</code></td><td>아카이브 운영자. 오브젝트·링크 유형과 별칭 사전을 관리한다.</td><td class="c">${Y}</td><td class="c">${Y}</td><td class="c">${Y}</td><td class="c">${Y}</td></tr>
      <tr><td><b>편집자</b> <code>Editor</code></td><td>분석 담당자. 신규 호 등록, 태깅, 별칭 추가, 병합, 관계 승격을 실행한다.</td><td class="c">${Y}</td><td class="c">${Y}</td><td class="c">${Y}</td><td class="c">${N}</td></tr>
      <tr><td><b>뷰어</b> <code>Viewer</code></td><td>구독자. 오브젝트 그래프와 오브젝트 뷰를 조회한다.</td><td class="c">${Y}</td><td class="c">${Y}</td><td class="c">${N}</td><td class="c">${N}</td></tr>
      <tr><td><b>발견자</b> <code>Discoverer</code></td><td>외부 이용자. 어떤 오브젝트 유형이 있는지만 확인한다.</td><td class="c">${Y}</td><td class="c">${N}</td><td class="c">${N}</td><td class="c">${N}</td></tr>
    </tbody></table>`;
  }

  // ───────── 분석 ─────────
  function renderAnalysis() {
    // 유형별
    const rows = ENT_TYPES.map(t => {
      const list = RANKED.filter(e => e.t === t);
      return { t, n: ENTS.filter(e => e.t === t).length, m: list.reduce((s, e) => s + e.total, 0), top: list.slice(0, 3) };
    }).sort((a, b) => b.m - a.m);
    const mx = Math.max(...rows.map(r => r.m));
    $('#an-types').innerHTML = `<div class="trow thead"><span>유형</span><span class="r">수</span><span>언급 링크</span><span></span></div>` + rows.map(r => `
      <div class="trow"><span class="tname"><i class="dot" style="background:${tc(r.t)}"></i>${TYPE_META[r.t].ko}</span><span class="num">${r.n}</span><span class="track"><b style="width:${(100 * r.m / mx).toFixed(1)}%;background:${tc(r.t)}"></b></span><span class="num">${fmt(r.m)}</span>
      <div class="tops chips">${r.top.map(e => chip(e, e.total)).join('')}</div></div>`).join('') +
      `<p class="out-note">아카이브 유형: 뉴스레터 호 ${NI} · 기사 ${fmt(ARTS.length)} · 출처 ${SRC.length}. 미국은 거의 모든 기사의 배경이라 언급 집계에서 뺀 허브 오브젝트입니다.</p>`;

    // 키워드 정규화
    const m = D.meta;
    const vars = RANKED.slice().sort((a, b) => (b.kwN || 0) - (a.kwN || 0)).slice(0, 6);
    $('#an-kw').innerHTML = `
      <div class="stack">
        <div class="stack-row"><div class="meta"><span>키워드 출현 ${fmt(m.kwOcc)}회</span><span><b>${pct(m.kwMappedOcc, m.kwOcc)}</b> 정규화 · ${fmt(m.kwMappedOcc)}회</span></div><div class="stack-bar" role="img" aria-label="키워드 출현 중 ${pct(m.kwMappedOcc, m.kwOcc)} 정규화"><b style="width:${pct(m.kwMappedOcc, m.kwOcc)}"></b></div></div>
        <div class="stack-row"><div class="meta"><span>고유 키워드 ${fmt(m.kwUnique)}종</span><span><b>${pct(m.kwMappedUnique, m.kwUnique)}</b> 정규화 · ${fmt(m.kwMappedUnique)}종</span></div><div class="stack-bar" role="img" aria-label="고유 키워드 중 ${pct(m.kwMappedUnique, m.kwUnique)} 정규화"><b style="width:${pct(m.kwMappedUnique, m.kwUnique)}"></b></div></div>
      </div>
      <h3 class="td-h">표기 변형이 가장 많은 오브젝트</h3>
      <ul class="var-list">${vars.map(e => `<li><div class="vh">${chip(e)}<span class="num">${e.kwN}종 · ${e.kwOcc}회</span></div><div class="vs">${e.kw.slice(0, 6).map(([k]) => esc(k)).join(' · ')}</div></li>`).join('')}</ul>
      <h3 class="td-h">정규화되지 않은 상위 키워드 <span class="muted">일반 개념어라 오브젝트로 만들지 않음</span></h3>
      <div class="unk">${(m.unmappedTop || []).slice(0, 28).map(([k, c]) => `<span>${esc(k)}<b>${c}</b></span>`).join('')}</div>`;

    // 히트맵
    const top = RANKED.slice(0, 20);
    const L = 170, cw = 9.4, ch = 18, y0 = 30, Wd = L + NI * cw + 8, Hd = y0 + top.length * ch + 26;
    const max = Math.max(...top.flatMap(e => e.trend));
    let s = `<svg id="heatmap-svg" viewBox="0 0 ${Wd.toFixed(0)} ${Hd}" role="img" aria-label="상위 20개 오브젝트의 호별 언급 히트맵">`;
    s += `<text class="hm-axis" x="${L}" y="${y0 - 10}">${esc(ISS[0].date.slice(0, 4))}</text>`;
    YEAR_MARKS.forEach(m => {
      const xb = L + m.k * cw;
      s += `<text class="hm-axis" x="${(xb + 4).toFixed(1)}" y="${y0 - 10}">${m.year}</text><line class="hm-year" x1="${xb.toFixed(1)}" x2="${xb.toFixed(1)}" y1="${y0 - 20}" y2="${y0 + top.length * ch}"></line>`;
    });
    top.forEach((e, r) => {
      const y = y0 + r * ch;
      s += `<circle cx="9" cy="${y + ch / 2 - 1}" r="4" style="fill:${tc(e.t)}"></circle><text class="hm-lbl" data-ent="${e.i}" x="19" y="${y + ch / 2 + 3}">${esc(e.label)}</text>`;
      e.trend.forEach((v, k) => {
        const op = v ? (0.2 + 0.8 * Math.sqrt(v / max)).toFixed(2) : null;
        s += `<rect class="${v ? 'hm-cell' : 'hm-empty'}" data-hm="${e.i},${k},${v}" data-issue="${ISS[k].id}" x="${(L + k * cw).toFixed(1)}" y="${y}" width="${(cw - 1.4).toFixed(1)}" height="${ch - 3}"${op ? ` fill-opacity="${op}"` : ''}></rect>`;
      });
    });
    ISS.forEach((x, k) => { if (k === 0 || k === NI - 1 || (x.id % 10 === 0 && k < NI - 3)) s += `<text class="hm-axis" x="${(L + (k + 0.5) * cw).toFixed(1)}" y="${Hd - 8}" text-anchor="middle">${x.id}</text>`; });
    s += '</svg>';
    $('#an-heat').innerHTML = s + `<div class="hm-scale"><span>호별 언급 기사 수</span><i style="opacity:${(0.2 + 0.8 * Math.sqrt(1 / max)).toFixed(2)}"></i>1<i style="opacity:${(0.2 + 0.8 * Math.sqrt(Math.ceil(max / 3) / max)).toFixed(2)}"></i>${Math.ceil(max / 3)}<i></i>${max}<span>· 가로축 = 호 번호</span></div>`;
    const hm = $('#heatmap-svg');
    hm.addEventListener('mouseover', ev => {
      const r = ev.target.closest('[data-hm]'); if (!r) return;
      const [i, k, v] = r.dataset.hm.split(',').map(Number);
      showTip(ev, `<b>${esc(ENTS[i].label)}</b> · 제${ISS[k].id}호<br>${esc(ISS[k].period)}<br>언급 기사 ${v}건 · 누르면 그 호가 열립니다`);
    });
    hm.addEventListener('mousemove', moveTip);
    hm.addEventListener('mouseleave', hideTip);

    // 출처
    const cats = new Map();
    SRC.forEach(x => { if (!cats.has(x.cat)) cats.set(x.cat, []); cats.get(x.cat).push(x); });
    const crow = [...cats].map(([cat, list]) => ({ cat, list: list.sort((a, b) => b.arts.length - a.arts.length), n: list.reduce((s2, x) => s2 + x.arts.length, 0) })).sort((a, b) => b.n - a.n);
    const cmx = Math.max(...crow.map(c => c.n));
    $('#an-src-sub').textContent = `출처 오브젝트 ${SRC.length}개를 ${crow.length}개 분류로 정규화했습니다.`;
    $('#an-src').innerHTML = crow.map(c => `<div class="src-row"><span>${esc(c.cat)} <span class="muted">· ${c.list.length}곳</span></span><span class="track"><b style="width:${(100 * c.n / cmx).toFixed(1)}%"></b></span><span class="num">${c.n}</span><div class="srcs">${c.list.slice(0, 4).map(x => `${esc(x.name)} ${x.arts.length}`).join(' · ')}</div></div>`).join('');

    // 방법론
    const w0 = ARTS.filter(a => !a.ents.length).length;
    $('#an-method').innerHTML = `
      <h3>오브젝트 추출</h3>
      <p>사전 기반 개체 인식입니다. 오브젝트 ${ENTS.length}개마다 한·영 별칭을 정의하고, 기사 제목(한·영)·요약·키워드·주제에서 별칭이 나오면 언급 링크를 만들었습니다. 기사당 평균 ${AVG_ENTS.toFixed(1)}개 오브젝트가 연결되고, 오브젝트가 하나도 없는 기사는 ${w0}건입니다.</p>
      <h3>오탐을 줄인 규칙</h3>
      <ul>
        <li>두 글자 이하 한글 별칭은 정확히 일치할 때만, 영문 별칭은 단어 경계에서만 인정합니다.</li>
        <li>'메타데이터'의 '메타', '항공우주'의 '우주', '어드밴스드'의 '밴스'처럼 다른 단어 속 일치는 정규식으로 뺐습니다.</li>
        <li>'영국 국방부', '이스라엘 육군'처럼 외국 기관을 가리키는 문맥은 미국 기관으로 잡지 않습니다.</li>
      </ul>
      <h3>동시 언급과 연관도</h3>
      <p>동시 언급은 두 오브젝트가 같은 기사에 함께 나온 횟수입니다. 국방부처럼 언급이 많은 허브가 모든 링크를 차지하지 않도록, 그래프에서는 연관도(동시 언급 ÷ √(두 언급 수의 곱))가 높은 순으로 노드당 상위 연결만 남깁니다.</p>
      <h3>한계</h3>
      <ul>
        <li>별칭 사전에 없는 개체는 빠집니다. 키워드 출현의 ${pct(m.kwOcc - m.kwMappedOcc, m.kwOcc)}는 일반 개념어 등이라 매핑되지 않았습니다.</li>
        <li>원문 전체가 아니라 뉴스레터의 요약문을 분석했습니다.</li>
        <li>동시 언급은 관계의 방향과 성격(협력·갈등)을 구분하지 않습니다.</li>
        <li>소속·운용·계약 같은 스키마 링크와 별칭은 엔터티 사전(ontology/entities.js, ${esc(D.meta.dict)})에 직접 정리했습니다. 새 기관·기업이 자주 등장하면 사전에 추가해야 오브젝트가 됩니다.</li>
        <li>Foundry 온톨로지는 데이터셋을 백엔드로 두고 쓰기 권한과 액션 기록을 갖지만, 이 페이지는 브라우저에서 아카이브 파일을 읽어 구성하는 읽기 전용 화면이라 액션은 미리보기만 제공합니다.</li>
      </ul>`;
  }

  // ───────── 머리말·초기화 ─────────
  function fillHeader() {
    const stored = ARTS.length * 2 + D.meta.links + CLINKS.length;
    const derived = linkCount('coMentionedWith');
    const nObj = NI + ARTS.length + SRC.length + ENTS.length;
    $('#stats').innerHTML = `
      <div><dt>오브젝트 유형</dt><dd>12<small>인터페이스 1</small></dd></div>
      <div><dt>오브젝트</dt><dd>${fmt(nObj)}<small>엔터티 ${ENTS.length}</small></dd></div>
      <div><dt>링크 유형</dt><dd>${LINK_TYPES.length}<small>파생 1</small></dd></div>
      <div><dt>링크</dt><dd>${fmt(stored)}<small>동시 언급 ${fmt(derived)}쌍 별도</small></dd></div>`;
    const first = ISS[0], last = ISS[NI - 1];
    const d0 = first.date.replace(/^(\d{4})-0?(\d+)-0?(\d+)$/, '$1.$2.$3'), d1 = last.date.replace(/^(\d{4})-0?(\d+)-0?(\d+)$/, '$1.$2.$3');
    $('#eyebrow').textContent = `제${FIRST}–${LAST}호 · ${d0} – ${d1} · 공개 출처 기사 ${fmt(ARTS.length)}건`;
    $('#lede').textContent = `${NI}개 호에 실린 기사 ${fmt(ARTS.length)}건에서 기관·기업·인물·사업·정책 등 ${ENTS.length}개 오브젝트를 뽑아, 오브젝트·속성·링크로 이루어진 시맨틱 레이어와 액션·함수로 이루어진 키네틱 레이어로 구성했습니다.`;
    $('#foot').innerHTML = `자료: 국방 AI(AI+IT) 뉴스레터 아카이브 제${FIRST}–${LAST}호, 기사 ${fmt(ARTS.length)}건 · 새 호가 추가되면 자동으로 반영됩니다 · 엔터티 사전 ${esc(D.meta.dict)} · 온톨로지 개념은 <a href="https://www.palantir.com/docs/kr/foundry/ontology" target="_blank" rel="noopener noreferrer">Palantir Foundry 온톨로지 문서</a>를 참고했으며, 이 페이지는 Palantir와 관련이 없습니다.`;
  }
  function showError(host, err) {
    const div = document.createElement('div');
    div.className = 'err';
    div.textContent = '이 화면을 그리는 중 오류가 났습니다: ' + (err && err.message ? err.message : err) + '. 새로고침해 보세요.';
    host.prepend(div);
  }

  function init() {
    $('#boot-msg').hidden = true;
    fillHeader();
    buildRail();
    if (window.d3) {
      try { renderGraph({ fresh: true }); } catch (err) { showError($('#tab-graph'), err); }
    } else {
      $('.graph-box').insertAdjacentHTML('beforeend', '<div class="graph-msg">그래프 라이브러리(d3)를 불러오지 못했습니다. 네트워크 연결을 확인하고 새로고침하세요. 스키마·액션·분석 탭은 그대로 쓸 수 있습니다.</div>');
    }
    renderOV(true);
    const hash = (location.hash || '').slice(1);
    const saved = store.get('onto.tab', 'graph');
    const start = TABS.includes(hash) ? hash : TABS.includes(saved) ? saved : 'graph';
    if (start !== 'graph') setTab(start);
  }
  try { init(); } catch (err) { showError($('main'), err); }
})();
