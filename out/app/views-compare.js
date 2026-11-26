// Angka Nusantara — Compare page (#/compare)
// Pick two provinces, compare them side by side + population bar chart.
import { PROVINCES, provinceByName } from './data.js';
import { barChart, esc, fmt } from './charts.js';

function signed(n, decimals) {
  const v = Number(n);
  const sign = v > 0 ? '+' : v < 0 ? '−' : '';
  return sign + Math.abs(v).toFixed(decimals);
}

export function renderCompare(state = { a: 'DKI Jakarta', b: 'Jawa Barat' }) {
  const a = provinceByName(state.a) || PROVINCES[0];
  const b = provinceByName(state.b) || PROVINCES[1];

  const options = (selected) => PROVINCES.map((p) =>
    `<option value="${esc(p.name)}"${p.name === selected ? ' selected' : ''}>${esc(p.name)}</option>`).join('');

  const chart = barChart({
    labels: [a.name, b.name],
    values: [a.pop, b.pop],
    title: 'Population, millions — A vs B',
    unit: 'Millions of people',
    color: '#1f7a6d',
  });

  return `
<section>
  <h1>Compare Provinces</h1>
  <p class="lede">Pick any two provinces and see how they stack up. The default pair shows the contrast starkly: DKI Jakarta has 10.7 million people, IPM (BPS) 0.851 and GDP/capita Rp 322 million, while Jawa Barat has 50.9 million people, IPM (BPS) 0.759 and GDP/capita Rp 52 million.</p>

  <div class="grid-2">
    <div class="card">
      <label for="compare-a">Province A</label>
      <select class="compare-select" id="compare-a">${options(a.name)}</select>
    </div>
    <div class="card">
      <label for="compare-b">Province B</label>
      <select class="compare-select" id="compare-b">${options(b.name)}</select>
    </div>
  </div>

  <div class="card">
    <div class="chart-title">${esc(a.name)} vs ${esc(b.name)}</div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Indicator</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th><th>Difference (B&minus;A)</th></tr></thead>
      <tbody>
        <tr><td>Population (M)</td><td class="num">${a.pop.toFixed(1)}</td><td class="num">${b.pop.toFixed(1)}</td><td class="num">${signed(b.pop - a.pop, 1)}</td></tr>
        <tr><td>IPM (BPS)</td><td class="num">${a.hdi.toFixed(3)}</td><td class="num">${b.hdi.toFixed(3)}</td><td class="num">${signed(b.hdi - a.hdi, 3)}</td></tr>
        <tr><td>Poverty %</td><td class="num">${a.poverty.toFixed(1)}%</td><td class="num">${b.poverty.toFixed(1)}%</td><td class="num">${signed(b.poverty - a.poverty, 1)} pp</td></tr>
        <tr><td>GDP/capita (Rp M)</td><td class="num">${fmt(a.gdpPerCapitaRp)}</td><td class="num">${fmt(b.gdpPerCapitaRp)}</td><td class="num">${signed(b.gdpPerCapitaRp - a.gdpPerCapitaRp, 0)}</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="card"><div class="chart-box"><div class="chart-title">Population comparison</div>${chart}</div></div>

  <p class="footnote">Source: BPS, 2019–2025 (SUPAS 2025; World Bank WDI for GDP in USD). Provincial populations are 2025 and IPM is 2025; poverty and GDP per capita are 2024. Provincial figures sum to 284.6M due to rounding; national total 284.7M (SUPAS 2025).</p>
</section>`;
}
