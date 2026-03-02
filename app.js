/**
 * 국방 AI(AI+IT) 뉴스레터 아카이브 — 앱 로직
 */

// ============ 전역 상태 ============
const state = {
  allArticles: [],       // 모든 기사 (평탄화된 배열)
  newsletters: [],       // 뉴스레터 목록
  filtered: [],          // 현재 필터/검색 결과
  searchQuery: "",
  filters: {
    newsletter: "all",   // 호수 필터
    source: "all",       // 출처 필터
    topic: "all",        // 주제 필터
    keyword: "",         // 키워드 태그 필터
  },
  sort: "newest",        // 정렬 방식
  activeModal: null,     // 현재 열린 모달 데이터
};

// ============ 초기화 ============
function init() {
  // config.js의 NEWSLETTERS_DATA를 수집
  if (window.NEWSLETTERS && window.NEWSLETTERS.length > 0) {
    state.newsletters = [...window.NEWSLETTERS].sort((a, b) => b.id - a.id);
    flattenArticles();
    buildFilterOptions();
    buildSidebar();
    applyFiltersAndSearch();
    buildKeywordCloud();
  } else {
    document.getElementById("articlesGrid").innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">뉴스레터 데이터를 로드할 수 없습니다</div>
        <div class="empty-state-desc">config.js 파일 및 data/ 폴더 내 뉴스레터 파일을 확인해 주세요.</div>
      </div>`;
  }

  // 이벤트 리스너
  document.getElementById("searchInput").addEventListener("input", debounce(handleSearch, 250));
  document.getElementById("searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
  });
  document.getElementById("btnSearch").addEventListener("click", handleSearch);
  document.getElementById("btnReset").addEventListener("click", resetAll);
  document.getElementById("filterNewsletter").addEventListener("change", handleFilterChange);
  document.getElementById("filterSource").addEventListener("change", handleFilterChange);
  document.getElementById("filterTopic").addEventListener("change", handleFilterChange);
  document.getElementById("sortSelect").addEventListener("change", handleSortChange);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

// ============ 데이터 처리 ============
function flattenArticles() {
  state.allArticles = [];
  state.newsletters.forEach(nl => {
    nl.articles.forEach(article => {
      state.allArticles.push({
        ...article,
        newsletter_id: nl.id,
        newsletter_period: nl.period,
        newsletter_date: nl.date,
      });
    });
  });
}

// ============ 필터 옵션 빌드 ============
function buildFilterOptions() {
  // 호수 필터
  const nlSelect = document.getElementById("filterNewsletter");
  state.newsletters.forEach(nl => {
    const opt = document.createElement("option");
    opt.value = nl.id;
    opt.textContent = `제${nl.id}호 (${nl.period})`;
    nlSelect.appendChild(opt);
  });

  // 출처 필터
  const sources = [...new Set(state.allArticles.map(a => a.source).filter(Boolean))].sort();
  const srcSelect = document.getElementById("filterSource");
  sources.forEach(src => {
    const opt = document.createElement("option");
    opt.value = src;
    opt.textContent = src;
    srcSelect.appendChild(opt);
  });

  // 주제 필터
  const topics = [...new Set(state.allArticles.map(a => a.topic_en).filter(Boolean))].sort();
  const topicSelect = document.getElementById("filterTopic");
  topics.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicSelect.appendChild(opt);
  });
}

// ============ 사이드바 ============
function buildSidebar() {
  // 통계
  document.getElementById("statNewsletters").textContent = state.newsletters.length;
  document.getElementById("statArticles").textContent = state.allArticles.length;

  const sources = new Set(state.allArticles.map(a => a.source).filter(Boolean));
  document.getElementById("statSources").textContent = sources.size;

  // 호수 목록
  const list = document.getElementById("sidebarNewsletterList");
  list.innerHTML = "";

  const allLi = document.createElement("li");
  allLi.className = "active";
  allLi.dataset.id = "all";
  allLi.innerHTML = `<span>전체 보기</span><span class="nl-count">${state.allArticles.length}</span>`;
  allLi.addEventListener("click", () => {
    document.getElementById("filterNewsletter").value = "all";
    state.filters.newsletter = "all";
    document.querySelectorAll("#sidebarNewsletterList li").forEach(li => li.classList.remove("active"));
    allLi.classList.add("active");
    applyFiltersAndSearch();
  });
  list.appendChild(allLi);

  state.newsletters.forEach(nl => {
    const li = document.createElement("li");
    li.dataset.id = nl.id;
    li.innerHTML = `<span>제${nl.id}호</span><span class="nl-count">${nl.articles.length}</span>`;
    li.title = nl.period;
    li.addEventListener("click", () => {
      document.getElementById("filterNewsletter").value = nl.id;
      state.filters.newsletter = String(nl.id);
      document.querySelectorAll("#sidebarNewsletterList li").forEach(li => li.classList.remove("active"));
      li.classList.add("active");
      applyFiltersAndSearch();
    });
    list.appendChild(li);
  });
}

// ============ 키워드 클라우드 ============
function buildKeywordCloud() {
  const kwMap = {};
  state.allArticles.forEach(a => {
    (a.keywords || []).forEach(kw => {
      kwMap[kw] = (kwMap[kw] || 0) + 1;
    });
  });

  const sorted = Object.entries(kwMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  const cloud = document.getElementById("keywordCloud");
  cloud.innerHTML = "";
  sorted.forEach(([kw, count]) => {
    const tag = document.createElement("span");
    tag.className = "keyword-tag";
    tag.textContent = kw;
    tag.title = `${count}건`;
    tag.addEventListener("click", () => {
      // 키워드 태그 필터 토글
      if (state.filters.keyword === kw) {
        state.filters.keyword = "";
        tag.classList.remove("active");
      } else {
        state.filters.keyword = kw;
        document.querySelectorAll(".keyword-tag").forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
      }
      applyFiltersAndSearch();
    });
    cloud.appendChild(tag);
  });
}

// ============ 이벤트 핸들러 ============
function handleSearch() {
  state.searchQuery = document.getElementById("searchInput").value.trim();
  applyFiltersAndSearch();
}

function handleFilterChange() {
  state.filters.newsletter = document.getElementById("filterNewsletter").value;
  state.filters.source = document.getElementById("filterSource").value;
  state.filters.topic = document.getElementById("filterTopic").value;

  // 사이드바 호수 목록 동기화
  document.querySelectorAll("#sidebarNewsletterList li").forEach(li => {
    li.classList.toggle("active", li.dataset.id === state.filters.newsletter);
  });

  applyFiltersAndSearch();
}

function handleSortChange() {
  state.sort = document.getElementById("sortSelect").value;
  renderArticles(state.filtered);
}

function resetAll() {
  state.searchQuery = "";
  state.filters = { newsletter: "all", source: "all", topic: "all", keyword: "" };

  document.getElementById("searchInput").value = "";
  document.getElementById("filterNewsletter").value = "all";
  document.getElementById("filterSource").value = "all";
  document.getElementById("filterTopic").value = "all";
  document.querySelectorAll(".keyword-tag").forEach(t => t.classList.remove("active"));
  document.querySelectorAll("#sidebarNewsletterList li").forEach((li, i) => {
    li.classList.toggle("active", i === 0);
  });

  applyFiltersAndSearch();
}

// ============ 필터 & 검색 ============
function applyFiltersAndSearch() {
  let results = [...state.allArticles];

  // 호수 필터
  if (state.filters.newsletter !== "all") {
    results = results.filter(a => String(a.newsletter_id) === state.filters.newsletter);
  }

  // 출처 필터
  if (state.filters.source !== "all") {
    results = results.filter(a => a.source === state.filters.source);
  }

  // 주제 필터
  if (state.filters.topic !== "all") {
    results = results.filter(a => a.topic_en === state.filters.topic);
  }

  // 키워드 태그 필터
  if (state.filters.keyword) {
    results = results.filter(a => (a.keywords || []).includes(state.filters.keyword));
  }

  // 텍스트 검색
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    results = results.filter(a =>
      (a.title || "").toLowerCase().includes(q) ||
      (a.title_kr || "").toLowerCase().includes(q) ||
      (a.summary || "").toLowerCase().includes(q) ||
      (a.topic_en || "").toLowerCase().includes(q) ||
      (a.topic_kr || "").toLowerCase().includes(q) ||
      (a.source || "").toLowerCase().includes(q) ||
      (a.keywords || []).some(kw => kw.toLowerCase().includes(q))
    );
  }

  state.filtered = results;
  renderArticles(results);
  updateResultsCount(results.length);
}

function updateResultsCount(count) {
  const el = document.getElementById("resultsCount");
  const query = state.searchQuery;
  if (query) {
    el.innerHTML = `<strong>${count}</strong>건의 기사가 검색되었습니다 — "<span style="color:var(--blue)">${escapeHtml(query)}</span>"`;
  } else {
    el.innerHTML = `총 <strong>${count}</strong>건의 기사`;
  }
}

// ============ 렌더링 ============
function renderArticles(articles) {
  const grid = document.getElementById("articlesGrid");

  // 정렬
  const sorted = [...articles].sort((a, b) => {
    if (state.sort === "newest") return (b.newsletter_id - a.newsletter_id) || 0;
    if (state.sort === "oldest") return (a.newsletter_id - b.newsletter_id) || 0;
    return 0;
  });

  if (sorted.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">검색 결과가 없습니다</div>
        <div class="empty-state-desc">다른 검색어나 필터를 사용해 보세요.</div>
      </div>`;
    return;
  }

  grid.innerHTML = sorted.map(article => renderArticleCard(article)).join("");

  // 카드 클릭 이벤트
  grid.querySelectorAll(".article-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const article = state.allArticles.find(a => a.id === id);
      if (article) openModal(article);
    });
  });

  // 원문 보기 버튼 (버블링 방지)
  grid.querySelectorAll(".article-link-btn:not(.disabled)").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
    });
  });
}

function renderArticleCard(article) {
  const q = state.searchQuery.toLowerCase();

  const titleEn = q ? highlight(article.title || "", q) : escapeHtml(article.title || "");
  const titleKr = q ? highlight(article.title_kr || "", q) : escapeHtml(article.title_kr || "");
  const summary = q ? highlight(article.summary || "", q) : escapeHtml(article.summary || "");

  const kws = (article.keywords || []).slice(0, 5);
  const kwTags = kws.map(kw => `<span class="kw-tag">${escapeHtml(kw)}</span>`).join("");

  const linkBtn = article.url
    ? `<a href="${escapeHtml(article.url)}" target="_blank" rel="noopener" class="article-link-btn" title="원문 열기">원문 보기 ↗</a>`
    : `<span class="article-link-btn disabled">URL 미등록</span>`;

  const dateStr = article.date ? formatDate(article.date) : article.newsletter_period;

  return `
    <div class="article-card" data-id="${article.id}">
      <div class="article-card-header">
        <div class="article-meta-left">
          <span class="badge-newsletter">제${article.newsletter_id}호</span>
          ${article.source ? `<span class="badge-source">${escapeHtml(article.source)}</span>` : ""}
          <span class="badge-topic">${escapeHtml(article.topic_en || "")}</span>
        </div>
        <span class="article-date">${dateStr}</span>
      </div>
      <div class="article-title-en">${titleEn}</div>
      <div class="article-title-kr">${titleKr}</div>
      <div class="article-summary">${summary}</div>
      <div class="article-footer">
        <div class="article-keywords">${kwTags}</div>
        ${linkBtn}
      </div>
    </div>`;
}

// ============ 모달 ============
function openModal(article) {
  state.activeModal = article;
  const overlay = document.getElementById("modalOverlay");

  // 메타
  document.getElementById("modalMeta").innerHTML = `
    <span class="badge-newsletter">제${article.newsletter_id}호</span>
    ${article.source ? `<span class="badge-source">${escapeHtml(article.source)}</span>` : ""}
    <span class="badge-topic">${escapeHtml(article.topic_en || "")}</span>
    <span class="badge-topic" style="background:var(--bg);color:var(--text-muted)">${escapeHtml(article.topic_kr || "")}</span>
  `;

  document.getElementById("modalTitleEn").textContent = article.title || "";
  document.getElementById("modalTitleKr").textContent = article.title_kr || "";
  document.getElementById("modalSummary").textContent = article.summary || "";

  // 키워드
  const kwContainer = document.getElementById("modalKeywords");
  kwContainer.innerHTML = (article.keywords || []).map(kw =>
    `<span class="modal-kw-tag" onclick="filterByKeyword('${escapeHtml(kw)}')">${escapeHtml(kw)}</span>`
  ).join("");

  // URL
  const urlSection = document.getElementById("modalUrlSection");
  if (article.url) {
    urlSection.innerHTML = `
      <span class="modal-url-label">출처:</span>
      <a href="${escapeHtml(article.url)}" target="_blank" rel="noopener" class="modal-url-link">${escapeHtml(article.url)}</a>
    `;
    document.getElementById("modalOpenBtn").href = article.url;
    document.getElementById("modalOpenBtn").style.display = "inline-flex";
  } else {
    urlSection.innerHTML = `<span class="modal-url-label">출처:</span><span class="modal-url-empty">URL이 등록되지 않았습니다</span>`;
    document.getElementById("modalOpenBtn").style.display = "none";
  }

  // 날짜
  document.getElementById("modalDate").textContent =
    article.date ? formatDate(article.date) : article.newsletter_period;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
  state.activeModal = null;
}

function filterByKeyword(kw) {
  closeModal();
  state.filters.keyword = kw;
  document.querySelectorAll(".keyword-tag").forEach(t => {
    t.classList.toggle("active", t.textContent === kw);
  });
  applyFiltersAndSearch();
}

// ============ 유틸 ============
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.replace(
    new RegExp(`(${escapedQuery})`, "gi"),
    '<mark class="highlight">$1</mark>'
  );
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  } catch {
    return dateStr;
  }
}

// ============ 전역 노출 (모달 내 키워드 클릭용) ============
window.filterByKeyword = filterByKeyword;

// ============ 실행 ============
// app.js is injected dynamically after DOMContentLoaded has already fired,
// so we call init() directly instead of waiting for the event.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
