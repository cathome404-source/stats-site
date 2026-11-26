// Angka Nusantara — Regions page (#/regions)
// Full table of 38 provinces: search, sort, click a row for detail.
import { PROVINCES, provinceByName } from './data.js';
import { esc } from './charts.js';

const SORT_KEYS = ['pop', 'hdi', 'poverty', 'gdpPerCapitaRp'];

function rankOf(name, key) {
  const sorted = [...PROVINCES].sort((a, b) => b[key] - a[key]);
  return sorted.findIndex((p) => p.name === name) + 1;
}

export function renderRegions(state = { query: '', sortKey: 'pop', sortDir: 'desc', selected: null }) {
  const query = (state.query || '').trim().toLowerCase();
  const sortKey = SORT_KEYS.includes(state.sortKey) ? state.sortKey : 'pop';
  const sortDir = state.sortDir === 'asc' ? 'asc' : 'desc';

  const filtered = PROVINCES.filter((p) => !query || p.name.toLowerCase().includes(query));
  const sorted = [...filtered].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortDir === 'asc' ? diff : -diff;
  });

  // Sort arrows come from CSS (.sortable::after); the header text carries no arrow.
  const sortClass = (key) => `sortable${sortKey === key ? (sortDir === 'asc' ? ' asc' : ' desc') : ''}`;

  const rows = sorted.map((p) => {
    const selected = state.selected === p.name ? ' selected' : '';
    return `<tr data-name="${esc(p.name)}" class="clickable${selected}"><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${p.hdi.toFixed(3)}</td><td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.gdpPerCapitaRp}</td></tr>`;
  }).join('');

  const sel = state.selected ? provinceByName(state.selected) : null;
  let detail;
  if (sel) {
    const popRank = rankOf(sel.name, 'pop');
    const hdiRank = rankOf(sel.name, 'hdi');
    detail = `
      <h3>${esc(sel.name)}</h3>
      <dl>
        <div><dt>Population</dt><dd>${sel.pop.toFixed(1)} million</dd></div>
        <div><dt>HDI</dt><dd>${sel.hdi.toFixed(3)}</dd></div>
        <div><dt>Poverty</dt><dd>${sel.poverty.toFixed(1)}%</dd></div>
        <div><dt>GDP/capita</dt><dd>Rp ${sel.gdpPerCapitaRp} million</dd></div>
      </dl>
      <p>#${popRank} of 38 by population &middot; #${hdiRank} of 38 by HDI</p>`;
  } else {
    detail = `<p>Click a province row to see its detail.</p>`;
  }

  return `
<section>
  <h1>Regions &mdash; 38 Provinces</h1>
  <p class="lede">All 38 provinces of Indonesia, from Jawa Barat's 49.9 million people to Papua Selatan's 0.5 million. Search, sort, or click a row to see a province in detail.</p>

  <input type="search" class="search-box" id="region-search" value="${esc(state.query || '')}" placeholder="Search provinces&hellip;" aria-label="Search provinces">

  <div class="table-wrap"><table class="data-table">
    <thead><tr>
      <th>Province</th>
      <th class="${sortClass('pop')}" data-sort="pop">Population (M)</th>
      <th class="${sortClass('hdi')}" data-sort="hdi">HDI</th>
      <th class="${sortClass('poverty')}" data-sort="poverty">Poverty %</th>
      <th class="${sortClass('gdpPerCapitaRp')}" data-sort="gdpPerCapitaRp">GDP/capita (Rp M)</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <p class="footnote">Showing ${sorted.length} of 38 provinces. Click a column header to sort; click a row for detail.</p>

  <div class="detail-panel">${detail}</div>

  <p class="footnote">Source: BPS-style estimates, 2019&ndash;2024. Figures are rounded estimates; provincial populations sum to the national total.</p>
</section>`;
}
