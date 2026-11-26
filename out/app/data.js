// Angka Nusantara — Indonesia in Numbers
// Figures: BPS-style estimates 2019–2024; provincial populations sum to the national total.

// National headline indicators, 2024 unless noted.
export const NATIONAL = {
  gdpUsd: 1.37, // trillion USD
  gdpRp: 22139, // trillion IDR
  gdpPerCapitaUsd: 4862,
  gdpPerCapitaRp: 78.6, // million IDR
  gdpGrowth: 5.03, // % yoy, 2024
  inflation: 1.57, // % yoy, Dec 2024
  unemployment: 4.91, // % of labour force, Aug 2024
  poverty: 8.57, // %, Sep 2024
  hdi: 0.728,
  lifeExpectancy: 74.1, // years
  literacy: 96.0, // % adults
  schooling: 9.0, // mean years of schooling
  tfr: 2.0, // children per woman
  islands: 17508,
  areaKm2: 1.905, // million km2
  density: 148, // people per km2
};

// Age structure, % of population.
export const AGE_STRUCTURE = [
  { label: '0–14', pct: 25.3 },
  { label: '15–24', pct: 17.3 },
  { label: '25–34', pct: 16.0 },
  { label: '35–44', pct: 14.7 },
  { label: '45–54', pct: 12.0 },
  { label: '55–64', pct: 8.0 },
  { label: '65+', pct: 6.6 },
];

// Population pyramid, % of population by sex.
// Note: totals sum to ~99.9% due to rounding.
export const PYRAMID = [
  { band: '0–14', male: 13.0, female: 12.3 },
  { band: '15–24', male: 8.8, female: 8.5 },
  { band: '25–34', male: 8.1, female: 7.9 },
  { band: '35–44', male: 7.4, female: 7.3 },
  { band: '45–54', male: 6.0, female: 6.0 },
  { band: '55–64', male: 3.9, female: 4.1 },
  { band: '65+', male: 2.9, female: 3.7 },
];
export const PYRAMID_FOOTNOTE = 'Shares sum to ~99.9% due to rounding.';

// GDP trend, trillion IDR (nominal).
export const GDP_TREND_RP = [
  { year: 2019, value: 15834 },
  { year: 2020, value: 15434 },
  { year: 2021, value: 16977 },
  { year: 2022, value: 19588 },
  { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// GDP by sector, % of GDP (sums to 100.0).
export const GDP_SECTORS = [
  { label: 'Agriculture', pct: 13.7 },
  { label: 'Manufacturing', pct: 18.7 },
  { label: 'Trade', pct: 13.0 },
  { label: 'Construction', pct: 10.2 },
  { label: 'Mining', pct: 8.4 },
  { label: 'Transport & communication', pct: 8.5 },
  { label: 'Finance', pct: 4.2 },
  { label: 'Other services', pct: 23.3 },
];

// Inflation, % yoy (December).
export const INFLATION = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Unemployment, % of labour force.
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.45 },
  { year: 2024, value: 4.91 },
];

// Poverty rate, % of population.
export const POVERTY = [
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Population trend, millions.
export const POP_TREND = [
  { year: 2019, value: 269.6 },
  { year: 2020, value: 271.7 },
  { year: 2021, value: 273.9 },
  { year: 2022, value: 276.4 },
  { year: 2023, value: 279.4 },
  { year: 2024, value: 281.8 },
];

// 38 provinces, sorted by population descending.
// pop: million people; hdi: 0–1; poverty: %; gdpPerCapitaRp: million IDR.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.9, hdi: 0.732, poverty: 7.5, gdpPerCapitaRp: 52 },
  { name: 'Jawa Timur', pop: 41.8, hdi: 0.737, poverty: 10.4, gdpPerCapitaRp: 64 },
  { name: 'Jawa Tengah', pop: 37.9, hdi: 0.723, poverty: 10.5, gdpPerCapitaRp: 44 },
  { name: 'Sumatera Utara', pop: 16.0, hdi: 0.738, poverty: 8.3, gdpPerCapitaRp: 62 },
  { name: 'Banten', pop: 12.4, hdi: 0.745, poverty: 5.6, gdpPerCapitaRp: 68 },
  { name: 'DKI Jakarta', pop: 10.6, hdi: 0.822, poverty: 4.4, gdpPerCapitaRp: 322 },
  { name: 'Sulawesi Selatan', pop: 9.4, hdi: 0.728, poverty: 8.7, gdpPerCapitaRp: 58 },
  { name: 'Lampung', pop: 9.2, hdi: 0.712, poverty: 11.8, gdpPerCapitaRp: 42 },
  { name: 'Sumatera Selatan', pop: 8.9, hdi: 0.715, poverty: 11.9, gdpPerCapitaRp: 66 },
  { name: 'Riau', pop: 6.6, hdi: 0.740, poverty: 6.7, gdpPerCapitaRp: 178 },
  { name: 'Sumatera Barat', pop: 6.0, hdi: 0.742, poverty: 5.9, gdpPerCapitaRp: 55 },
  { name: 'Kalimantan Barat', pop: 5.9, hdi: 0.700, poverty: 7.1, gdpPerCapitaRp: 54 },
  { name: 'Nusa Tenggara Timur', pop: 5.8, hdi: 0.670, poverty: 19.5, gdpPerCapitaRp: 26 },
  { name: 'Nusa Tenggara Barat', pop: 5.8, hdi: 0.695, poverty: 13.0, gdpPerCapitaRp: 34 },
  { name: 'Aceh', pop: 5.6, hdi: 0.725, poverty: 14.5, gdpPerCapitaRp: 48 },
  { name: 'Bali', pop: 4.5, hdi: 0.760, poverty: 4.1, gdpPerCapitaRp: 62 },
  { name: 'Kalimantan Selatan', pop: 4.2, hdi: 0.724, poverty: 4.3, gdpPerCapitaRp: 58 },
  { name: 'Kalimantan Timur', pop: 3.9, hdi: 0.785, poverty: 6.0, gdpPerCapitaRp: 268 },
  { name: 'DI Yogyakarta', pop: 3.9, hdi: 0.805, poverty: 11.1, gdpPerCapitaRp: 48 },
  { name: 'Jambi', pop: 3.7, hdi: 0.726, poverty: 7.6, gdpPerCapitaRp: 62 },
  { name: 'Sulawesi Tengah', pop: 3.1, hdi: 0.718, poverty: 12.4, gdpPerCapitaRp: 72 },
  { name: 'Kalimantan Tengah', pop: 2.8, hdi: 0.727, poverty: 5.0, gdpPerCapitaRp: 68 },
  { name: 'Sulawesi Tenggara', pop: 2.8, hdi: 0.724, poverty: 11.2, gdpPerCapitaRp: 58 },
  { name: 'Sulawesi Utara', pop: 2.7, hdi: 0.755, poverty: 7.3, gdpPerCapitaRp: 62 },
  { name: 'Kepulauan Riau', pop: 2.3, hdi: 0.795, poverty: 5.7, gdpPerCapitaRp: 186 },
  { name: 'Bengkulu', pop: 2.1, hdi: 0.725, poverty: 14.3, gdpPerCapitaRp: 42 },
  { name: 'Maluku', pop: 2.0, hdi: 0.715, poverty: 16.4, gdpPerCapitaRp: 38 },
  { name: 'Sulawesi Barat', pop: 1.6, hdi: 0.695, poverty: 11.0, gdpPerCapitaRp: 42 },
  { name: 'Kepulauan Bangka Belitung', pop: 1.5, hdi: 0.735, poverty: 4.5, gdpPerCapitaRp: 68 },
  { name: 'Maluku Utara', pop: 1.4, hdi: 0.705, poverty: 6.4, gdpPerCapitaRp: 58 },
  { name: 'Papua Pegunungan', pop: 1.4, hdi: 0.625, poverty: 34.5, gdpPerCapitaRp: 28 },
  { name: 'Gorontalo', pop: 1.3, hdi: 0.705, poverty: 15.2, gdpPerCapitaRp: 38 },
  { name: 'Papua Tengah', pop: 1.3, hdi: 0.645, poverty: 29.8, gdpPerCapitaRp: 48 },
  { name: 'Papua', pop: 1.1, hdi: 0.625, poverty: 26.0, gdpPerCapitaRp: 62 },
  { name: 'Kalimantan Utara', pop: 0.7, hdi: 0.745, poverty: 6.8, gdpPerCapitaRp: 165 },
  { name: 'Papua Barat', pop: 0.6, hdi: 0.705, poverty: 20.0, gdpPerCapitaRp: 72 },
  { name: 'Papua Barat Daya', pop: 0.6, hdi: 0.720, poverty: 18.5, gdpPerCapitaRp: 68 },
  { name: 'Papua Selatan', pop: 0.5, hdi: 0.640, poverty: 28.0, gdpPerCapitaRp: 48 },
];

// --- Helpers ---

// National population (millions), computed as the sum of the 38 provinces.
export function totalPopulation() {
  return PROVINCES.reduce((sum, p) => sum + p.pop, 0);
}

// Top n provinces by a numeric key ('pop', 'hdi', 'poverty', 'gdpPerCapitaRp').
export function topProvinces(n, key = 'pop') {
  return [...PROVINCES].sort((a, b) => b[key] - a[key]).slice(0, n);
}

// One province by exact name, or undefined.
export function provinceByName(name) {
  return PROVINCES.find((p) => p.name === name);
}
