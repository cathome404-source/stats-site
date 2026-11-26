// Angka Nusantara — Health & Education page (#/health)
// HDI top/bottom provinces, national health & education KPIs, poverty trend + extremes.
import { NATIONAL, POVERTY, PROVINCES, topProvinces } from './data.js';
import { barChart, lineChart, esc, fmt } from './charts.js';

export function renderHealth() {
  const hdiTop = topProvinces(5, 'hdi');
  const hdiBottom = [...PROVINCES].sort((a, b) => a.hdi - b.hdi).slice(0, 5);
  const povertyTop = topProvinces(5, 'poverty');
  const povertyBottom = [...PROVINCES].sort((a, b) => a.poverty - b.poverty).slice(0, 5);

  const hdiTopChart = barChart({
    labels: hdiTop.map((p) => p.name),
    values: hdiTop.map((p) => p.hdi),
    title: 'Highest HDI by province, 2024',
    unit: 'Human Development Index (0–1)',
    color: '#1f7a6d',
  });
  const hdiBottomChart = barChart({
    labels: hdiBottom.map((p) => p.name),
    values: hdiBottom.map((p) => p.hdi),
    title: 'Lowest HDI by province, 2024',
    unit: 'Human Development Index (0–1)',
    color: '#e8a33d',
  });
  const povertyChart = lineChart({
    labels: POVERTY.map((d) => String(d.year)),
    values: POVERTY.map((d) => d.value),
    title: 'Poverty rate trend (8.57% of population)',
    unit: 'Percent of population',
    color: '#0f2a3d',
  });

  const povertyRows = (list) => list.map((p) =>
    `<tr><td>${esc(p.name)}</td><td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.hdi.toFixed(3)}</td></tr>`
  ).join('');

  return `
<section>
  <h1>Health &amp; Education</h1>
  <p class="lede">National HDI is ${NATIONAL.hdi.toFixed(3)} in 2024, but the gap between the highest and lowest provinces is wide — from DKI Jakarta at 0.822 to Papua and Papua Pegunungan at 0.625.</p>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Highest HDI by province, 2024</div>${hdiTopChart}</div></div>
    <div class="card"><div class="chart-box"><div class="chart-title">Lowest HDI by province, 2024</div>${hdiBottomChart}</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="kpi-value">${NATIONAL.hdi.toFixed(3)}</div><div class="kpi-label">Human Development Index</div><p>HDI ${NATIONAL.hdi.toFixed(3)} in 2024 — DKI Jakarta leads at 0.822, Papua and Papua Pegunungan trail at 0.625.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.lifeExpectancy.toFixed(1)} years</div><div class="kpi-label">Life expectancy</div><p>Life expectancy at birth is ${NATIONAL.lifeExpectancy.toFixed(1)} years in 2024.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.literacy.toFixed(1)}%</div><div class="kpi-label">Literacy</div><p>${NATIONAL.literacy.toFixed(1)}% of adults are literate.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.schooling.toFixed(1)} years</div><div class="kpi-label">Mean years of schooling</div><p>Average schooling is ${NATIONAL.schooling.toFixed(1)} years.</p></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Poverty trend, 2019–2024 (8.57% of population)</div>${povertyChart}</div></div>
    <div class="card">
      <div class="chart-title">Highest poverty by province, 2024</div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Province</th><th>Poverty %</th><th>HDI</th></tr></thead>
        <tbody>${povertyRows(povertyTop)}</tbody>
      </table></div>
    </div>
  </div>

  <div class="card">
    <div class="chart-title">Lowest poverty by province, 2024</div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Province</th><th>Poverty %</th><th>HDI</th></tr></thead>
      <tbody>${povertyRows(povertyBottom)}</tbody>
    </table></div>
    <p class="footnote">National poverty rate is ${NATIONAL.poverty.toFixed(2)}% (September 2024), down from 9.22% in 2019. Poverty and HDI move together: the poorest provinces also score lowest on human development.</p>
  </div>

  <p class="footnote">Source: BPS-style estimates, 2019&ndash;2024.</p>
</section>`;
}
