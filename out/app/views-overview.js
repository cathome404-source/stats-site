// Angka Nusantara — Overview page (#/)
// KPI strip, GDP trend, inflation, population pyramid, top 5 provinces, key facts.
import { NATIONAL, GDP_TREND_RP, INFLATION, PYRAMID, POP_TREND, LATEST_2026, totalPopulation, topProvinces } from './data.js';
import { barChart, lineChart, pyramidChart, esc, fmt } from './charts.js';

export function renderOverview() {
  const total = totalPopulation();
  const pop = POP_TREND[POP_TREND.length - 1].value.toFixed(1);
  const top5 = topProvinces(5);
  const latest = LATEST_2026;

  const gdpChart = barChart({
    labels: GDP_TREND_RP.map((d) => String(d.year)),
    values: GDP_TREND_RP.map((d) => d.value),
    title: 'GDP trend (Rp trillion)',
    unit: 'Nominal GDP, trillion IDR',
  });
  const inflationChart = lineChart({
    labels: INFLATION.map((d) => String(d.year)),
    values: INFLATION.map((d) => d.value),
    title: 'Inflation (2.92% yoy, December)',
    unit: 'Percent, year on year',
    color: '#e8a33d',
  });
  const pyramid = pyramidChart({ bands: PYRAMID, title: 'Population pyramid, 2024 (share of population)' });

  const topRows = top5.map((p) => {
    const share = ((p.pop / total) * 100).toFixed(1);
    return `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${share}%</td></tr>`;
  }).join('');

  return `
<section>
  <h1>Indonesia in Numbers</h1>
  <p class="lede">284.7 million people across 38 provinces and 17,508 islands; a $1.45 trillion economy that grew 5.11% in 2025; IPM 0.759 and poverty down to 8.25% — the five headline numbers, then the detail.</p>

  <div class="kpi-strip">
    <div class="kpi-card"><div class="kpi-value">${pop}M</div><div class="kpi-label">Population</div><div class="kpi-sub">2025, SUPAS</div></div>
    <div class="kpi-card"><div class="kpi-value">$${NATIONAL.gdpUsd.toFixed(2)}T</div><div class="kpi-label">GDP</div><div class="kpi-sub">Rp ${fmt(NATIONAL.gdpRp)} trillion, 2025</div></div>
    <div class="kpi-card"><div class="kpi-value">$${fmt(NATIONAL.gdpPerCapitaUsd)}</div><div class="kpi-label">GDP per capita</div><div class="kpi-sub">Rp ${NATIONAL.gdpPerCapitaRp.toFixed(1)} million, 2025</div></div>
    <div class="kpi-card"><div class="kpi-value">${NATIONAL.hdi.toFixed(3)}</div><div class="kpi-label">IPM (BPS)</div><div class="kpi-sub">2025</div></div>
    <div class="kpi-card"><div class="kpi-value">${NATIONAL.poverty.toFixed(2)}%</div><div class="kpi-label">Poverty rate</div><div class="kpi-sub">September 2025</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">GDP trend, 2019–2025 (Rp trillion)</div>${gdpChart}</div></div>
    <div class="card"><div class="chart-box"><div class="chart-title">Inflation, 2019–2025 (2.92% yoy, December)</div>${inflationChart}</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Population pyramid, 2024 (share of population)</div>${pyramid}</div></div>
    <div class="card">
      <div class="chart-title">Top 5 provinces by population</div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Province</th><th>Population (M)</th><th>Share %</th></tr></thead>
        <tbody>${topRows}</tbody>
      </table></div>
      <p class="footnote">Shares are each province's population divided by the sum of provincial figures (284.6 million). Provincial figures sum to 284.6M due to rounding; national total 284.7M (SUPAS 2025).</p>
    </div>
  </div>

  <div class="grid-3">
    <div class="card"><div class="kpi-value">${fmt(NATIONAL.islands)}</div><div class="kpi-label">islands</div><p>An archipelago of ${fmt(NATIONAL.islands)} islands, the world's largest island country.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.areaKm2.toFixed(3)}M km&sup2;</div><div class="kpi-label">land area &mdash; density ${fmt(NATIONAL.density)}/km&sup2;</div><p>${NATIONAL.areaKm2.toFixed(3)}M km&sup2; of land at a density of ${fmt(NATIONAL.density)} people per km&sup2;.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.lifeExpectancy.toFixed(1)} years</div><div class="kpi-label">life expectancy &mdash; literacy ${NATIONAL.literacy.toFixed(1)}%</div><p>Life expectancy ${NATIONAL.lifeExpectancy.toFixed(1)} years &mdash; literacy ${NATIONAL.literacy.toFixed(1)}% of adults.</p></div>
  </div>

  <h2>Latest available &mdash; 2026</h2>
  <p class="lede">Full-year 2026 is not published yet. These are the latest figures BPS has released so far.</p>
  <div class="grid-3">
    <div class="card"><div class="kpi-value">${latest.population.value.toFixed(1)}M</div><div class="kpi-label">Population</div><p>${latest.population.label}.</p></div>
    <div class="card"><div class="kpi-value">+${latest.gdp.q3Growth.toFixed(2)}%</div><div class="kpi-label">GDP growth, Q3 2026</div><p>Q3 GDP Rp ${fmt(latest.gdp.q3Rp)} trillion, +${latest.gdp.q3Growth.toFixed(2)}% yoy; Jan&ndash;Sep 2026 growth ${latest.gdp.janSepGrowth.toFixed(2)}%.</p></div>
    <div class="card"><div class="kpi-value">${latest.inflation.value.toFixed(2)}%</div><div class="kpi-label">Inflation</div><p>${latest.inflation.label}.</p></div>
    <div class="card"><div class="kpi-value">${latest.unemployment.value.toFixed(2)}%</div><div class="kpi-label">Unemployment</div><p>${latest.unemployment.label}.</p></div>
    <div class="card"><div class="kpi-value">${latest.poverty.value.toFixed(2)}%</div><div class="kpi-label">Poverty rate</div><p>${latest.poverty.label}.</p></div>
    <div class="card"><div class="kpi-value">${latest.ipm.value.toFixed(3)}</div><div class="kpi-label">IPM (BPS), 2026</div><p>${latest.ipm.label}.</p></div>
  </div>
  <p class="footnote">${latest.fullYearNote}. 2026 figures are the latest published, not full-year values.</p>

  <p class="footnote">Source: BPS, 2019&ndash;2025 (SUPAS 2025; World Bank WDI for GDP in USD). 2026 figures: latest available, see above.</p>
</section>`;
}
