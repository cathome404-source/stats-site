// Angka Nusantara — Indonesia in Numbers
// Figures: BPS 2019–2025 annual series; 2026 latest available (see LATEST_2026);
// provincial populations sum to the national total (SUPAS 2025 = 284.67M).
// Sources: BPS press releases; World Bank WDI for GDP USD.
// Full detail: research-2025-2026.md.

// National headline indicators, 2025 unless noted.
// hdi is IPM (BPS), 0–1 scale = IPM/100; national 2025 = 75.90.
export const NATIONAL = {
  gdpUsd: 1.45, // trillion USD
  gdpRp: 23821, // trillion IDR
  gdpPerCapitaUsd: 5083,
  gdpPerCapitaRp: 83.7, // million IDR
  gdpGrowth: 5.11, // % yoy, 2025
  inflation: 2.92, // % yoy, Dec 2025
  unemployment: 4.85, // % of labour force, Aug 2025
  poverty: 8.25, // %, Sep 2025
  hdi: 0.759, // IPM (BPS) 75.90 / 100
  lifeExpectancy: 74.5, // years, UHH 74.47
  literacy: 97.1, // % adults
  schooling: 9.1, // mean years of schooling, RLS 9.07
  tfr: 2.1, // children per woman, 2.13
  islands: 17508,
  areaKm2: 1.905, // million km2
  density: 149, // people per km2 (284.67M / 1.905M km2)
};

// Age structure, % of population (2024 — no verified 2025 update).
export const AGE_STRUCTURE = [
  { label: '0–14', pct: 25.3 },
  { label: '15–24', pct: 17.3 },
  { label: '25–34', pct: 16.0 },
  { label: '35–44', pct: 14.7 },
  { label: '45–54', pct: 12.0 },
  { label: '55–64', pct: 8.0 },
  { label: '65+', pct: 6.6 },
];

// Population pyramid, % of population by sex (2024 — no verified 2025 update).
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
  { year: 2025, value: 23821 },
];

// GDP by sector, % of GDP (sums to 100.0).
// 2024 shares; 2025 full 17-sector breakdown in BPS publication
// 'Pendapatan Nasional Indonesia 2021–2025'.
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
  { year: 2025, value: 2.92 },
];

// Unemployment, % of labour force (August each year).
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.45 },
  { year: 2024, value: 4.91 },
  { year: 2025, value: 4.85 },
];

// Poverty rate, % of population (September each year).
export const POVERTY = [
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
  { year: 2025, value: 8.25 },
];

// Population trend, millions.
export const POP_TREND = [
  { year: 2019, value: 269.6 },
  { year: 2020, value: 271.7 },
  { year: 2021, value: 273.9 },
  { year: 2022, value: 276.4 },
  { year: 2023, value: 279.4 },
  { year: 2024, value: 281.8 },
  { year: 2025, value: 284.7 },
];

// 38 provinces, sorted by population descending.
// pop: million people, 2025 (SUPAS 2025); hdi: IPM (BPS) 2025 / 100, 0–1 scale.
// poverty & gdpPerCapitaRp: 2024 (latest available at build time).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.9, hdi: 0.759, poverty: 7.5, gdpPerCapitaRp: 52 },
  { name: 'Jawa Timur', pop: 42.1, hdi: 0.761, poverty: 10.4, gdpPerCapitaRp: 64 },
  { name: 'Jawa Tengah', pop: 38.3, hdi: 0.748, poverty: 10.5, gdpPerCapitaRp: 44 },
  { name: 'Sumatera Utara', pop: 15.8, hdi: 0.765, poverty: 8.3, gdpPerCapitaRp: 62 },
  { name: 'Banten', pop: 12.6, hdi: 0.773, poverty: 5.6, gdpPerCapitaRp: 68 },
  { name: 'DKI Jakarta', pop: 10.7, hdi: 0.851, poverty: 4.4, gdpPerCapitaRp: 322 },
  { name: 'Sulawesi Selatan', pop: 9.6, hdi: 0.759, poverty: 8.7, gdpPerCapitaRp: 58 },
  { name: 'Lampung', pop: 9.5, hdi: 0.740, poverty: 11.8, gdpPerCapitaRp: 42 },
  { name: 'Sumatera Selatan', pop: 8.9, hdi: 0.748, poverty: 11.9, gdpPerCapitaRp: 66 },
  { name: 'Riau', pop: 6.8, hdi: 0.763, poverty: 6.7, gdpPerCapitaRp: 178 },
  { name: 'Sumatera Barat', pop: 5.9, hdi: 0.773, poverty: 5.9, gdpPerCapitaRp: 55 },
  { name: 'Kalimantan Barat', pop: 5.8, hdi: 0.721, poverty: 7.1, gdpPerCapitaRp: 54 },
  { name: 'Nusa Tenggara Timur', pop: 5.7, hdi: 0.699, poverty: 19.5, gdpPerCapitaRp: 26 },
  { name: 'Nusa Tenggara Barat', pop: 5.7, hdi: 0.740, poverty: 13.0, gdpPerCapitaRp: 34 },
  { name: 'Aceh', pop: 5.6, hdi: 0.762, poverty: 14.5, gdpPerCapitaRp: 48 },
  { name: 'Bali', pop: 4.5, hdi: 0.794, poverty: 4.1, gdpPerCapitaRp: 62 },
  { name: 'Kalimantan Selatan', pop: 4.3, hdi: 0.761, poverty: 4.3, gdpPerCapitaRp: 58 },
  { name: 'Kalimantan Timur', pop: 4.1, hdi: 0.794, poverty: 6.0, gdpPerCapitaRp: 268 },
  { name: 'DI Yogyakarta', pop: 3.8, hdi: 0.825, poverty: 11.1, gdpPerCapitaRp: 48 },
  { name: 'Jambi', pop: 3.8, hdi: 0.751, poverty: 7.6, gdpPerCapitaRp: 62 },
  { name: 'Sulawesi Tengah', pop: 3.2, hdi: 0.728, poverty: 12.4, gdpPerCapitaRp: 72 },
  { name: 'Kalimantan Tengah', pop: 2.8, hdi: 0.749, poverty: 5.0, gdpPerCapitaRp: 68 },
  { name: 'Sulawesi Tenggara', pop: 2.8, hdi: 0.743, poverty: 11.2, gdpPerCapitaRp: 58 },
  { name: 'Sulawesi Utara', pop: 2.7, hdi: 0.763, poverty: 7.3, gdpPerCapitaRp: 62 },
  { name: 'Kepulauan Riau', pop: 2.2, hdi: 0.805, poverty: 5.7, gdpPerCapitaRp: 186 },
  { name: 'Bengkulu', pop: 2.1, hdi: 0.757, poverty: 14.3, gdpPerCapitaRp: 42 },
  { name: 'Maluku', pop: 2.0, hdi: 0.741, poverty: 16.4, gdpPerCapitaRp: 38 },
  { name: 'Kepulauan Bangka Belitung', pop: 1.6, hdi: 0.753, poverty: 4.5, gdpPerCapitaRp: 68 },
  { name: 'Sulawesi Barat', pop: 1.5, hdi: 0.712, poverty: 11.0, gdpPerCapitaRp: 42 },
  { name: 'Papua Tengah', pop: 1.5, hdi: 0.606, poverty: 29.8, gdpPerCapitaRp: 48 },
  { name: 'Papua Pegunungan', pop: 1.5, hdi: 0.549, poverty: 34.5, gdpPerCapitaRp: 28 },
  { name: 'Maluku Utara', pop: 1.4, hdi: 0.725, poverty: 6.4, gdpPerCapitaRp: 58 },
  { name: 'Gorontalo', pop: 1.2, hdi: 0.726, poverty: 15.2, gdpPerCapitaRp: 38 },
  { name: 'Papua', pop: 1.1, hdi: 0.747, poverty: 26.0, gdpPerCapitaRp: 62 },
  { name: 'Kalimantan Utara', pop: 0.8, hdi: 0.740, poverty: 6.8, gdpPerCapitaRp: 165 },
  { name: 'Papua Barat Daya', pop: 0.6, hdi: 0.706, poverty: 18.5, gdpPerCapitaRp: 68 },
  { name: 'Papua Barat', pop: 0.6, hdi: 0.685, poverty: 20.0, gdpPerCapitaRp: 72 },
  { name: 'Papua Selatan', pop: 0.6, hdi: 0.695, poverty: 28.0, gdpPerCapitaRp: 48 },
];

// Latest 2026 figures published as of 26 Nov 2026 (BPS).
// ipm is IPM (BPS) 2026 = 76.59, 0–1 scale = IPM/100.
export const LATEST_2026 = {
  population: { value: 287.2, label: 'BPS projection, mid-2026' },
  gdp: { q3Rp: 6741, q3Growth: 5.47, janSepGrowth: 5.45, label: 'Q3 2026, BPS 5 Nov 2026' },
  inflation: { value: 3.23, label: 'Oct 2026 yoy, BPS 2 Nov 2026' },
  unemployment: { value: 4.75, label: 'Aug 2026, BPS 5 Nov 2026' },
  poverty: { value: 8.07, label: 'Mar 2026, BPS 5 Aug 2026' },
  ipm: { value: 0.766, label: 'IPM 2026 = 76.59, BPS 5 Nov 2026' },
  fullYearNote: 'Full-year 2026 GDP: BPS release Feb 2027',
};

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
