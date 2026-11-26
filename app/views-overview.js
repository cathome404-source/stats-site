// Angka Nusantara — Overview page (#/)
// KPI strip, GDP trend, inflation, population pyramid, top 5 provinces, key facts.
import { NATIONAL, GDP_TREND_RP, INFLATION, PYRAMID, totalPopulation, topProvinces } from './data.js';
import { barChart, lineChart, pyramidChart, esc, fmt } from './charts.js';

export function renderOverview() {
  const total = totalPopulation();
  const pop = total.toFixed(1);
  const top5 = topProvinces(5);

  const gdpChart = barChart({
    labels: GDP_TREND_RP.map((d) => String(d.year)),
    values: GDP_TREND_RP.map((d) => d.value),
    title: 'GDP trend (Rp trillion)',
    unit: 'Nominal GDP, trillion IDR',
  });
  const inflationChart = lineChart({
    labels: INFLATION.map((d) => String(d.year)),
    values: INFLATION.map((d) => d.value),
    title: 'Inflation (% yoy, December)',
    unit: '% year on year',
    color: '#e8a33d',
  });
  const pyramid = pyramidChart({ bands: PYRAMID, title: 'Population pyramid, 2024 (% of population)' });

  const topRows = top5.map((p) => {
    const share = ((p.pop / total) * 100).toFixed(1);
    return `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${share}%</td></tr>`;
  }).join('');

  return `
<section>
  <h1>Indonesia in Numbers</h1>
  <p class="lede">281.8 million people across 38 provinces and 17,508 islands; a $1.37 trillion economy that grew 5.03% in 2024; HDI 0.728 and poverty down to 8.57% — the five headline numbers, then the detail.</p>

  <div class="kpi-strip">
    <div class="kpi-card"><div class="kpi-value">${pop}M</div><div class="kpi-label">Population</div><div class="kpi-sub">2024, sum of 38 provinces</div></div>
    <div class="kpi-card"><div class="kpi-value">$${NATIONAL.gdpUsd.toFixed(2)}T</div><div class="kpi-label">GDP</div><div class="kpi-sub">Rp ${fmt(NATIONAL.gdpRp)} trillion, 2024</div></div>
    <div class="kpi-card"><div class="kpi-value">$${fmt(NATIONAL.gdpPerCapitaUsd)}</div><div class="kpi-label">GDP per capita</div><div class="kpi-sub">Rp ${NATIONAL.gdpPerCapitaRp.toFixed(1)} million, 2024</div></div>
    <div class="kpi-card"><div class="kpi-value">${NATIONAL.hdi.toFixed(3)}</div><div class="kpi-label">Human Development Index</div><div class="kpi-sub">2024</div></div>
    <div class="kpi-card"><div class="kpi-value">${NATIONAL.poverty.toFixed(2)}%</div><div class="kpi-label">Poverty rate</div><div class="kpi-sub">September 2024</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">GDP trend, 2019–2024 (Rp trillion)</div>${gdpChart}</div></div>
    <div class="card"><div class="chart-box"><div class="chart-title">Inflation, 2019–2024 (% yoy, December)</div>${inflationChart}</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Population pyramid, 2024 (% of population)</div>${pyramid}</div></div>
    <div class="card">
      <div class="chart-title">Top 5 provinces by population</div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Province</th><th>Population (M)</th><th>Share %</th></tr></thead>
        <tbody>${topRows}</tbody>
      </table></div>
      <p class="footnote">Shares are each province's population divided by the national total of ${pop} million.</p>
    </div>
  </div>

  <div class="grid-3">
    <div class="card"><div class="kpi-value">${fmt(NATIONAL.islands)}</div><div class="kpi-label">islands</div><p>An archipelago of ${fmt(NATIONAL.islands)} islands, the world's largest island country.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.areaKm2.toFixed(3)}M km&sup2;</div><div class="kpi-label">land area &mdash; density ${fmt(NATIONAL.density)}/km&sup2;</div><p>${NATIONAL.areaKm2.toFixed(3)}M km&sup2; of land at a density of ${fmt(NATIONAL.density)} people per km&sup2;.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.lifeExpectancy.toFixed(1)} years</div><div class="kpi-label">life expectancy &mdash; literacy ${NATIONAL.literacy.toFixed(1)}%</div><p>Life expectancy ${NATIONAL.lifeExpectancy.toFixed(1)} years &mdash; literacy ${NATIONAL.literacy.toFixed(1)}% of adults.</p></div>
  </div>

  <p class="footnote">Source: BPS-style estimates, 2019&ndash;2024.</p>
</section>`;
}
