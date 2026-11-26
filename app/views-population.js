// Angka Nusantara — Population page (#/population)
// Large age pyramid, age-structure bars, population trend, top 10 provinces table.
import { PYRAMID, PYRAMID_FOOTNOTE, AGE_STRUCTURE, POP_TREND, totalPopulation, topProvinces } from './data.js';
import { barChart, lineChart, pyramidChart, esc } from './charts.js';

export function renderPopulation() {
  const total = totalPopulation();
  const pop = total.toFixed(1);
  const top10 = topProvinces(10);

  const pyramid = pyramidChart({ bands: PYRAMID, title: 'Population pyramid, 2024 (percent of population)' });
  const ageChart = barChart({
    labels: AGE_STRUCTURE.map((d) => d.label),
    values: AGE_STRUCTURE.map((d) => d.pct),
    title: 'Age structure (percent of population)',
    unit: 'Percent of population',
  });
  const trendChart = lineChart({
    labels: POP_TREND.map((d) => String(d.year)),
    values: POP_TREND.map((d) => d.value),
    title: 'Population trend (millions)',
    unit: 'Millions of people',
    color: '#1f7a6d',
  });

  const rows = top10.map((p) => {
    const share = ((p.pop / total) * 100).toFixed(1);
    return `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${share}%</td></tr>`;
  }).join('');
  const top10Pop = top10.reduce((s, p) => s + p.pop, 0);
  const top10Share = ((top10Pop / total) * 100).toFixed(1);

  return `
<section>
  <h1>Population</h1>
  <p class="lede">Indonesia had ${pop} million people in 2024 &mdash; a young population, still growing by about 2.4 million a year, with 156.5 million (55.5%) living on Java. The top 10 provinces alone hold 202.7 million people, 71.9% of the country.</p>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Population pyramid, 2024 (percent of population)</div>${pyramid}</div>
      <p class="footnote">${esc(PYRAMID_FOOTNOTE)} Male and female shares are percentages of the total population.</p></div>
    <div class="card"><div class="chart-box"><div class="chart-title">Age structure, 2024 (percent of population)</div>${ageChart}</div>
      <p class="footnote">A quarter of the population (25.3%) is under 15; 6.6% is 65 or older.</p></div>
  </div>

  <div class="grid-2">
    <div class="card"><div class="chart-box"><div class="chart-title">Population trend, 2019–2024 (millions)</div>${trendChart}</div>
      <p class="footnote">Population rose from 269.6 million in 2019 to ${pop} million in 2024.</p></div>
    <div class="card">
      <div class="chart-title">Top 10 provinces by population</div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Province</th><th>Population (M)</th><th>Share %</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td>Top 10 total</td><td class="num">${top10Pop.toFixed(1)}</td><td class="num">${top10Share}%</td></tr></tfoot>
      </table></div>
      <p class="footnote">Share % is each province's population divided by the national total of ${pop} million; shares are rounded to one decimal.</p>
    </div>
  </div>

  <p class="footnote">Source: BPS-style estimates, 2019&ndash;2024.</p>
</section>`;
}
