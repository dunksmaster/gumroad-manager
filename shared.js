// ── SHARED TOKEN STORAGE ─────────────────────────────
// All tools use this to get/set tokens so user enters once
const GR = {
  getGumroad: () => sessionStorage.getItem('gr_token') || '',
  getAnthropic: () => sessionStorage.getItem('ant_token') || '',
  setGumroad: (t) => sessionStorage.setItem('gr_token', t),
  setAnthropic: (t) => sessionStorage.setItem('ant_token', t),
  clear: () => { sessionStorage.removeItem('gr_token'); sessionStorage.removeItem('ant_token'); },
  hasTokens: () => !!sessionStorage.getItem('gr_token'),
};

// ── SHARED NAV BAR ────────────────────────────────────
function injectNav(activePage) {
  const pages = [
    { id: 'dashboard', label: '📦 Dashboard', url: 'index.html' },
    { id: 'rewriter', label: '✨ AI Rewriter', url: 'rewriter.html' },
    { id: 'categories', label: '🏷️ Categories', url: 'categories.html' },
    { id: 'competitor', label: '🕵️ Competitor', url: 'competitor.html' },
    { id: 'sales-chart', label: '📊 Sales Chart', url: 'sales-chart.html' },
    { id: 'price-optimizer', label: '💡 Price Optimizer', url: 'price-optimizer.html' },
    { id: 'dead-products', label: '💀 Dead Products', url: 'dead-products.html' },
    { id: 'bulk-publish', label: '⚡ Bulk Publish', url: 'bulk-publish.html' },
    { id: 'linkedin', label: '💼 LinkedIn Posts', url: 'linkedin.html' },
    { id: 'discount-codes', label: '🎟️ Discount Codes', url: 'discount-codes.html' },
  ];

  const nav = document.createElement('div');
  nav.id = 'shared-nav';
  nav.style.cssText = `
    background: rgba(10,10,15,0.97);
    border-bottom: 1px solid #2a2a3a;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    position: sticky;
    top: 65px;
    z-index: 90;
  `;

  nav.innerHTML = pages.map(p => `
    <a href="${p.url}" style="
      padding: 10px 14px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      white-space: nowrap;
      text-decoration: none;
      border-bottom: 2px solid ${p.id === activePage ? '#4ecdc4' : 'transparent'};
      color: ${p.id === activePage ? '#4ecdc4' : '#6b6b8a'};
      transition: all 0.15s;
    " onmouseover="this.style.color='#f0f0f5'" onmouseout="this.style.color='${p.id === activePage ? '#4ecdc4' : '#6b6b8a'}'">
      ${p.label}
    </a>
  `).join('');

  // Insert after header
  const header = document.querySelector('header');
  if (header && header.nextSibling) {
    header.parentNode.insertBefore(nav, header.nextSibling);
  } else if (header) {
    header.parentNode.appendChild(nav);
  }
}

// ── SHARED TOAST ──────────────────────────────────────
function showSharedToast(msg, type = 'success') {
  let t = document.getElementById('shared-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'shared-toast';
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#13131a;border:1px solid #2a2a3a;border-radius:10px;padding:12px 18px;font-size:12px;font-family:DM Mono,monospace;color:#f0f0f5;z-index:9999;transform:translateY(80px);opacity:0;transition:all 0.3s;max-width:320px;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.borderColor = type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#2a2a3a';
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  setTimeout(() => { t.style.transform = 'translateY(80px)'; t.style.opacity = '0'; }, 3000);
}

// ── PREFILL TOKEN INPUTS ──────────────────────────────
function prefillTokens() {
  const gr = GR.getGumroad();
  const ant = GR.getAnthropic();
  ['gumroadToken','myToken','tokenInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el && gr) el.value = gr;
  });
  ['anthropicKey'].forEach(id => {
    const el = document.getElementById(id);
    if (el && ant) el.value = ant;
  });
}

// ── GUMROAD API HELPER ────────────────────────────────
async function gumroadAPI(path, method = 'GET', body = null) {
  const token = GR.getGumroad();
  const url = `https://api.gumroad.com${path}`;
  let params = `access_token=${encodeURIComponent(token)}`;
  if (body) Object.entries(body).forEach(([k,v]) => { if (v !== undefined && v !== null) params += `&${k}=${encodeURIComponent(v)}`; });
  const opts = { method, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  if (method === 'GET') { const r = await fetch(`${url}?${params}`, opts); return r.json(); }
  opts.body = params;
  const r = await fetch(url, opts);
  return r.json();
}

// ── ANTHROPIC API HELPER ──────────────────────────────
async function claudeAPI(prompt, maxTokens = 1000) {
  const key = GR.getAnthropic();
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const d = await r.json();
  return d.content?.[0]?.text || '';
}

// ── EXPORT CSV ────────────────────────────────────────
function exportCSV(rows, headers, filename) {
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = filename;
  a.click();
}

// ── MOBILE RESPONSIVE STYLES ──────────────────────────
function injectMobileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .main-layout { grid-template-columns: 1fr !important; }
      aside { display: none !important; }
      .stats-row, .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
      .products-grid { grid-template-columns: 1fr !important; }
      .form-grid, .form-row, .input-row, .compare-row { grid-template-columns: 1fr !important; }
      .vs-header { grid-template-columns: 1fr !important; text-align: center !important; }
      .vs-divider { display: none !important; }
      header { padding: 14px 16px !important; }
      .container, main { padding: 16px !important; }
      table { font-size: 10px !important; }
      th, td { padding: 8px !important; }
      .modal { padding: 20px !important; margin: 10px !important; }
      .page-header { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
      .search-bar { width: 100% !important; }
      #shared-nav { top: 57px !important; }
    }
    @media (max-width: 480px) {
      .stats-row, .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .stat-value { font-size: 20px !important; }
      .mode-tabs { flex-direction: column !important; }
    }
  `;
  document.head.appendChild(style);
}
