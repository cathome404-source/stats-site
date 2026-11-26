// Angka Nusantara — hand-rolled SVG chart builders (no libraries, no network).
// Every builder returns a responsive SVG string (viewBox + width 100%) and
// renders both an accessible <title> and a visible <text> heading.

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Format a number with comma thousands separators, keeping decimals as given.
export function fmt(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return '—';
  const num = Number(n);
  const parts = String(n).split('.');
  const intPart = Math.abs(num) < 1000 && parts.length > 1
    ? parts[0]
    : Math.trunc(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = num < 0 ? '-' : '';
  const absInt = intPart.replace('-', '');
  if (parts.length > 1) return sign + absInt + '.' + parts[1];
  return sign + absInt;
}

const INK = '#1c2733';
const MUTED = '#5d6b78';
const GRID = '#e3dccb';
const TEAL = '#1f7a6d';
const AMBER = '#e8a33d';
const NAVY = '#0f2a3d';

function svgOpen(w, h, title) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(title || 'Chart')}" xmlns="http://www.w3.org/2000/svg"><title>${esc(title || 'Chart')}</title>`;
}

function titleText(title, w) {
  if (!title) return '';
  return `<text x="${w / 2}" y="22" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(title)}</text>`;
}

function unitText(unit, w) {
  if (!unit) return '';
  return `<text x="${w / 2}" y="40" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(unit)}</text>`;
}

// Vertical bars with axis labels and a value on every bar.
// opts: { labels, values, title, unit, color }
export function barChart({ labels = [], values = [], title = '', unit = '', color = TEAL } = {}) {
  const W = 560, H = 340, top = 56, bottom = 52, left = 52, right = 16;
  const n = Math.max(labels.length, values.length);
  const vals = values.map(Number);
  const maxV = Math.max(...vals, 0);
  const minV = Math.min(...vals, 0);
  const span = (maxV - minV) || 1;
  const plotH = H - top - bottom;
  const plotW = W - left - right;
  const zeroY = top + (maxV / span) * plotH;
  const slot = plotW / Math.max(n, 1);
  const barW = Math.min(44, slot * 0.62);
  let s = svgOpen(W, H, title) + titleText(title, W) + unitText(unit, W);
  // gridlines (4 rows)
  for (let i = 0; i <= 4; i++) {
    const v = minV + (span * i) / 4;
    const y = top + plotH - (plotH * i) / 4;
    s += `<line x1="${left}" y1="${y.toFixed(1)}" x2="${W - right}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${left - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="${MUTED}">${esc(fmt(Math.round(v * 100) / 100))}</text>`;
  }
  s += `<line x1="${left}" y1="${zeroY.toFixed(1)}" x2="${W - right}" y2="${zeroY.toFixed(1)}" stroke="${INK}" stroke-width="1"/>`;
  for (let i = 0; i < n; i++) {
    const v = vals[i] || 0;
    const x = left + slot * i + (slot - barW) / 2;
    const h = Math.abs(v) / span * plotH;
    const y = v >= 0 ? zeroY - h : zeroY;
    const cls = v >= 0 ? 'bar-positive' : 'bar-negative';
    const fill = v >= 0 ? color : '#b3402e';
    s += `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(h, 1).toFixed(1)}" rx="3" fill="${fill}"><title>${esc(labels[i] ?? '')}: ${esc(fmt(v))}${unit ? ' ' + esc(unit) : ''}</title></rect>`;
    const valY = v >= 0 ? y - 6 : y + h + 13;
    s += `<text x="${(x + barW / 2).toFixed(1)}" y="${valY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmt(v))}</text>`;
    s += `<text x="${(x + barW / 2).toFixed(1)}" y="${H - 30}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(labels[i] ?? '')}</text>`;
  }
  return s + '</svg>';
}

// Line chart with points, value labels and axis labels.
// opts: { labels, values, title, unit, color }
export function lineChart({ labels = [], values = [], title = '', unit = '', color = TEAL } = {}) {
  const W = 560, H = 340, top = 56, bottom = 52, left = 52, right = 28;
  const n = Math.max(labels.length, values.length);
  const vals = values.map(Number);
  const maxV = Math.max(...vals);
  const minV = Math.min(...vals);
  const pad = (maxV - minV) * 0.15 || 1;
  const hi = maxV + pad, lo = minV - pad;
  const plotH = H - top - bottom;
  const plotW = W - left - right;
  const xAt = (i) => left + (plotW * i) / Math.max(n - 1, 1);
  const yAt = (v) => top + plotH * (1 - (v - lo) / (hi - lo));
  let s = svgOpen(W, H, title) + titleText(title, W) + unitText(unit, W);
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const y = top + plotH - (plotH * i) / 4;
    s += `<line x1="${left}" y1="${y.toFixed(1)}" x2="${W - right}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${left - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="${MUTED}">${esc(fmt(Math.round(v * 100) / 100))}</text>`;
  }
  const pts = vals.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  vals.forEach((v, i) => {
    const x = xAt(i), y = yAt(v);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#f6f1e7" stroke="${color}" stroke-width="2.5"><title>${esc(labels[i] ?? '')}: ${esc(fmt(v))}${unit ? ' ' + esc(unit) : ''}</title></circle>`;
    s += `<text x="${x.toFixed(1)}" y="${(y - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmt(v))}</text>`;
    s += `<text x="${x.toFixed(1)}" y="${H - 30}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(labels[i] ?? '')}</text>`;
  });
  return s + '</svg>';
}

const DONUT_PALETTE = [TEAL, AMBER, NAVY, '#3d8f83', '#c97b1e', '#5d6b78', '#8fb8ad', '#d9c27a'];

// Donut with a legend (label + % per slice).
// opts: { slices: [{ label, value, color? }], title }
export function donutChart({ slices = [], title = '' } = {}) {
  const W = 560, H = 340, top = 52;
  const total = slices.reduce((sum, s) => sum + (Number(s.value) || 0), 0) || 1;
  const cx = 150, cy = top + 120, r = 96, inner = 58;
  let s = svgOpen(W, H, title) + titleText(title, W);
  let angle = -Math.PI / 2;
  slices.forEach((slice, i) => {
    const v = Number(slice.value) || 0;
    const frac = v / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    if (frac <= 0) return;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const color = slice.color || DONUT_PALETTE[i % DONUT_PALETTE.length];
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}" stroke="#f6f1e7" stroke-width="2"><title>${esc(slice.label)}: ${esc(fmt(v))} (${(frac * 100).toFixed(1)}%)</title></path>`;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}">${esc(fmt(Math.round(total * 10) / 10))}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">total</text>`;
  // Legend, right of the donut.
  const lx = 290;
  slices.forEach((slice, i) => {
    const v = Number(slice.value) || 0;
    const pct = ((v / total) * 100).toFixed(1);
    const y = top + 22 + i * 30;
    const color = slice.color || DONUT_PALETTE[i % DONUT_PALETTE.length];
    s += `<rect x="${lx}" y="${y - 11}" width="12" height="12" rx="2" fill="${color}"/>`;
    s += `<text x="${lx + 20}" y="${y}" font-size="12" fill="${INK}">${esc(slice.label)}</text>`;
    s += `<text x="${W - 16}" y="${y}" text-anchor="end" font-size="12" font-weight="600" fill="${INK}">${pct}%</text>`;
  });
  return s + '</svg>';
}

// Population pyramid: horizontal bars, male left / female right per age band.
// opts: { bands: [{ band, male, female }], title }
export function pyramidChart({ bands = [], title = '' } = {}) {
  const W = 560, H = 340, top = 62, bottom = 40;
  const maxV = Math.max(...bands.map((b) => Math.max(Number(b.male) || 0, Number(b.female) || 0)), 1);
  const rowH = (H - top - bottom) / Math.max(bands.length, 1);
  const barH = Math.min(24, rowH * 0.62);
  const mid = W / 2;
  const half = mid - 56; // max bar length
  let s = svgOpen(W, H, title) + titleText(title, W);
  s += `<text x="${mid - half / 2}" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="${TEAL}">Male</text>`;
  s += `<text x="${mid + half / 2}" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="${AMBER}">Female</text>`;
  s += `<line x1="${mid}" y1="${top - 8}" x2="${mid}" y2="${H - bottom + 6}" stroke="${INK}" stroke-width="1"/>`;
  bands.forEach((b, i) => {
    const m = Number(b.male) || 0;
    const f = Number(b.female) || 0;
    const y = top + rowH * i + (rowH - barH) / 2;
    const mw = (m / maxV) * half;
    const fw = (f / maxV) * half;
    s += `<rect x="${(mid - mw).toFixed(1)}" y="${y.toFixed(1)}" width="${mw.toFixed(1)}" height="${barH.toFixed(1)}" rx="3" fill="${TEAL}"><title>${esc(b.band)} male: ${m}%</title></rect>`;
    s += `<rect x="${mid}" y="${y.toFixed(1)}" width="${fw.toFixed(1)}" height="${barH.toFixed(1)}" rx="3" fill="${AMBER}"><title>${esc(b.band)} female: ${f}%</title></rect>`;
    s += `<text x="${(mid - mw - 6).toFixed(1)}" y="${(y + barH / 2 + 4).toFixed(1)}" text-anchor="end" font-size="11" font-weight="600" fill="${INK}">${m}%</text>`;
    s += `<text x="${(mid + fw + 6).toFixed(1)}" y="${(y + barH / 2 + 4).toFixed(1)}" font-size="11" font-weight="600" fill="${INK}">${f}%</text>`;
    s += `<text x="${mid}" y="${(y + barH / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${esc(b.band)}</text>`;
  });
  return s + '</svg>';
}
