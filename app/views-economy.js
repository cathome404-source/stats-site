// Angka Nusantara — Economy page (#/economy)
// GDP trend + sector donut, inflation + unemployment, top 5 provinces by GDP per capita.
import { NATIONAL, GDP_TREND_RP, GDP_SECTORS, INFLATION, UNEMPLOYMENT, topProvinces } from './data.js';
import { barChart, lineChart, donutChart, esc, fmt } from './charts.js';

export function renderEconomy() {
  const gdpChart = barChart({
    labels: GDP_TREND_RP.map((d) => String(d.year)),
    values: GDP_TREND_RP.map((d) => d.value),
    title: 'GDP trend (Rp trillion)',
    unit: 'Nominal GDP, trillion IDR',
  });
  const donut = donutChart({
    slices: GDP_SECTORS.map((s) => ({ label: s.label, value: s.pct })),
    title: 'GDP by sector, 2024 (% of GDP)',
  });
  const inflationChart = lineChart({
    labels: INFLATION.map((d) => String(d.year)),
    values: INFLATION.map((d) => d.value),
    title: 'Inflation (% yoy, December)',
    unit: '% year on year',
    color: '#e8a33d',
  });
  const unemploymentChart = lineChart({
    labels: UNEMPLOYMENT.map((d) => String(d.year)),
    values: UNEMPLOYMENT.map((d) => d.value),
    title: 'Unemployment (% of labour force)',
    unit: '% of labour force',
    color: '#0f2a3d',
  });

  const top5 = topProvinces(5, 'gdpPerCapitaRp');
  const nat = NATIONAL.gdpPerCapitaRp;
  const topRows = top5.map((p) => {
    const vs = (p.gdpPerCapitaRp / nat).toFixed(2);
    return `<tr><td>${esc(p.name)}</td><td class="num">${fmt(p.gdpPerCapitaRp)}</td><td class="num">${vs}x</td></tr>`;
  }).join('');

  return `
<section>
  <h1>Economy</h1>
  <p class="lede">A $1.37 trillion economy growing 5.03% in 2024, with services and manufacturing driving output and inflation back down to 1.57%.</p>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">GDP by sector, 2024 (% of GDP)</div>${donut}</div></div>
    <div class="card"><div class="chart-box"><div class="chart-title">GDP trend, 2019–2024 (Rp trillion)</div>${gdpChart}</div></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Inflation, 2019–2024 (% yoy, December)</div>${inflationChart}</div></div>
    <div class="card"><div class="chart-box"><div class="chart-title">Unemployment, 2019–2024 (% of labour force)</div>${unemploymentChart}</div></div>
  </div>

  <div class="card">
    <div class="chart-title">Top 5 provinces by GDP per capita</div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Province</th><th>GDP/capita (Rp M)</th><th>vs national</th></tr></thead>
      <tbody>${topRows}</tbody>
    </table></div>
    <p class="footnote">National GDP per capita is Rp ${nat.toFixed(1)} million; "vs national" is the province's GDP per capita divided by ${nat.toFixed(1)}.</p>
  </div>

  <div class="grid-3">
    <div class="card"><div class="kpi-value">${NATIONAL.gdpGrowth.toFixed(2)}%</div><div class="kpi-label">GDP growth</div><p>Real GDP grew ${NATIONAL.gdpGrowth.toFixed(2)}% in 2024, on a nominal GDP of Rp ${fmt(NATIONAL.gdpRp)} trillion ($${NATIONAL.gdpUsd.toFixed(2)} trillion).</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.inflation.toFixed(2)}%</div><div class="kpi-label">Inflation</div><p>Inflation was ${NATIONAL.inflation.toFixed(2)}% year on year in December 2024, down from 5.51% in 2022.</p></div>
    <div class="card"><div class="kpi-value">${NATIONAL.unemployment.toFixed(2)}%</div><div class="kpi-label">Unemployment</div><p>Unemployment was ${NATIONAL.unemployment.toFixed(2)}% of the labour force in August 2024, the lowest since 2019.</p></div>
  </div>

  <p class="footnote">Source: BPS-style estimates, 2019&ndash;2024.</p>
</section>`;
}
