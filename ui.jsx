import React, { useEffect, useMemo, useRef, useState } from 'react';
import { INDIA, CITIES } from './data.js';

export const C = { brand: 'rgb(var(--brand))', brand2: 'rgb(var(--brand2))', accent: 'rgb(var(--accent))', bad: 'rgb(var(--bad))', info: 'rgb(var(--info))', muted: 'rgb(var(--muted))', line: 'rgb(var(--line))', ink: 'rgb(var(--ink))', grey: 'rgb(var(--muted) / .45)' };

export function useCount(target, ms = 700) {
  const [v, setV] = useState(target), from = useRef(target);
  useEffect(() => {
    const a = from.current, b = target, t0 = performance.now(); let raf;
    const tick = t => { const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); setV(a + (b - a) * e); if (k < 1) raf = requestAnimationFrame(tick); else from.current = b; };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}
export const Count = ({ v, fmt = x => Math.round(x).toLocaleString('en-IN') }) => <>{fmt(useCount(v))}</>;

export const Cite = ({ id }) => <a href="#sources" className="ml-1 align-[1px] rounded bg-brand/15 px-1.5 py-[1px] font-mono text-[10px] font-semibold text-brand hover:bg-brand hover:text-bg">{id}</a>;

export const Kpi = ({ label, children, note, tone = 'brand' }) => (
  <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-4 shadow-sm">
    <span className={`absolute inset-x-0 top-0 h-[3px] ${tone === 'bad' ? 'bg-bad' : tone === 'accent' ? 'bg-accent' : tone === 'info' ? 'bg-info' : 'bg-brand'}`} />
    <div className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-muted">{label}</div>
    <div className={`mt-1.5 font-display text-[30px] font-semibold leading-none tracking-tight tabular-nums ${tone === 'bad' ? 'text-bad' : ''}`}>{children}</div>
    {note && <div className="mt-2 text-[12.5px] leading-snug text-muted">{note}</div>}
  </div>
);

export const Card = ({ title, sub, children, className = '' }) => (
  <figure className={`rounded-2xl border border-line bg-surface p-4 shadow-sm ${className}`}>
    {title && <figcaption className="mb-3"><b className="block text-[14.5px] font-semibold">{title}</b>{sub && <span className="text-[12.5px] text-muted">{sub}</span>}</figcaption>}
    {children}
  </figure>
);

export const Head = ({ n, title, lede }) => (
  <header className="pb-8 pt-12">
    <div className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[.2em] text-brand"><span className="h-px w-8 bg-brand" />{n}</div>
    <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
    <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-muted">{lede}</p>
  </header>
);

export const Prose = ({ items }) => (
  <article className="space-y-5">{items.map(([h, p], i) => <div key={i}><h3 className="font-display text-xl font-semibold">{h}</h3><p className="mt-1.5 leading-relaxed text-muted">{p}</p></div>)}</article>
);

export const Slider = ({ label, value, set, min, max, step = 1, fmt = x => x }) => (
  <label className="mt-4 block first:mt-0">
    <div className="mb-1.5 flex justify-between gap-3 text-[13px] font-semibold"><span>{label}</span><b className="font-mono text-brand">{fmt(value)}</b></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} />
  </label>
);

export const Note = ({ tone = 'ok', children }) => (
  <div className={`rounded-xl border px-4 py-3 text-[14px] leading-snug ${tone === 'bad' ? 'border-bad/40 bg-bad/10 text-bad' : tone === 'warn' ? 'border-accent/40 bg-accent/10 text-accent' : 'border-brand/30 bg-brand/10 text-brand'}`}>{children}</div>
);

/* ---------- charts ---------- */
export function Bars({ labels, values, colors, fmt = x => x, h = 220, w = 480 }) {
  const m = { l: 10, r: 10, t: 24, b: Math.min(...values) < 0 ? 42 : 28 };
  const mx = Math.max(0, ...values), mn = Math.min(0, ...values), span = (mx - mn) || 1;
  const y = q => m.t + (mx - q) / span * (h - m.t - m.b), y0 = y(0), n = values.length, st = (w - m.l - m.r) / n, bw = Math.min(44, st * .62);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <line x1={m.l} x2={w - m.r} y1={y0} y2={y0} style={{ stroke: C.line }} />
      {values.map((q, i) => {
        const cx = m.l + st * i + st / 2, top = Math.min(y(q), y0), bh = Math.max(1.5, Math.abs(y(q) - y0)), col = Array.isArray(colors) ? colors[i] : colors ? colors(q, i) : C.brand;
        return <g key={i}>
          <rect className="grow-y" x={cx - bw / 2} y={top} width={bw} height={bh} rx="4" style={{ fill: col, transition: 'all .6s cubic-bezier(.2,.7,.2,1)' }}><title>{labels[i]}: {fmt(q)}</title></rect>
          <text x={cx} y={q >= 0 ? top - 6 : top + bh + 13} textAnchor="middle" fontSize="11" fontWeight="600" style={{ fill: C.ink }}>{fmt(q)}</text>
          <text x={cx} y={h - 8} textAnchor="middle" fontSize="10.5" style={{ fill: C.muted }}>{labels[i]}</text>
        </g>;
      })}
    </svg>
  );
}

export function GBars({ labels, series, fmt = x => x, h = 240, w = 480 }) {
  const m = { l: 10, r: 10, t: 22, b: 30 }, mx = Math.max(...series.flatMap(s => s.values)) * 1.15, y = q => m.t + (mx - q) / mx * (h - m.t - m.b), y0 = y(0);
  const n = labels.length, k = series.length, st = (w - m.l - m.r) / n, bw = Math.min(30, st * .7 / k);
  return (<>
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <line x1={m.l} x2={w - m.r} y1={y0} y2={y0} style={{ stroke: C.line }} />
      {labels.map((lb, i) => { const cx = m.l + st * i + st / 2; return <g key={i}>
        {series.map((s, j) => { const q = s.values[i], bx = cx - k * bw / 2 + j * bw + 1, top = y(q);
          return <g key={j}><rect className="grow-y" x={bx} y={top} width={bw - 2} height={Math.max(1.5, y0 - top)} rx="3" style={{ fill: s.color, transition: 'all .6s' }}><title>{lb} | {s.name}: {fmt(q)}</title></rect>
            <text x={bx + (bw - 2) / 2} y={top - 5} textAnchor="middle" fontSize="10" fontWeight="600" style={{ fill: C.ink }}>{fmt(q)}</text></g>; })}
        <text x={cx} y={h - 8} textAnchor="middle" fontSize="10.5" style={{ fill: C.muted }}>{lb}</text></g>; })}
    </svg>
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">{series.map(s => <li key={s.name}><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm align-[-1px]" style={{ background: s.color }} />{s.name}</li>)}</ul>
  </>);
}

export function HBars({ rows, fmt = x => x, max, ml = 'w-32' }) {
  const vals = rows.map(r => r.v), mx = Math.max(max || 0, ...vals), mn = Math.min(0, ...vals), span = (mx - mn) || 1;
  return <div className="space-y-2">{rows.map((r, i) => {
    const l = (Math.min(0, r.v) - mn) / span * 100, w = Math.abs(r.v) / span * 100;
    return <div key={i} className="flex items-center gap-3 text-[13px]"><div className={`${ml} shrink-0 text-right font-medium`}>{r.l}</div>
      <div className="relative h-5 flex-1 rounded bg-surface2"><div className="absolute top-0 h-full rounded transition-all duration-700 ease-out" style={{ left: l + '%', width: w + '%', background: r.c || C.brand }} /></div>
      <div className="w-16 font-mono text-xs text-muted">{fmt(r.v)}</div></div>;
  })}</div>;
}

export function Water({ rows, max, ml = 'w-28' }) {
  return <div className="space-y-2">{rows.map((r, i) => <div key={i} className="flex items-center gap-3 text-[13px]"><div className={`${ml} shrink-0 text-right font-medium`}>{r.l}</div>
    <div className="relative h-5 flex-1 rounded bg-surface2"><div className="absolute top-0 h-full rounded transition-all duration-700 ease-out" style={{ left: (Math.min(r.a, r.b) / max * 100) + '%', width: Math.max(.6, Math.abs(r.b - r.a) / max * 100) + '%', background: r.c }} /></div>
    <div className="w-20 font-mono text-xs text-muted">{r.t}</div></div>)}</div>;
}

export function Line({ labels, values, color = C.brand, fmt = x => x, h = 220, w = 480, ref_ }) {
  const m = { l: 40, r: 14, t: 16, b: 28 }, all = values.concat(ref_ ? [ref_.v] : []);
  let mx = Math.max(0, ...all), mn = Math.min(0, ...all); if (mx === mn) mx = mn + 1; const pad = (mx - mn) * .1; mx += pad; if (mn < 0) mn -= pad;
  const n = labels.length, x = i => m.l + i / (n - 1) * (w - m.l - m.r), y = q => m.t + (mx - q) / (mx - mn) * (h - m.t - m.b), id = useMemo(() => 'g' + Math.random().toString(36).slice(2, 7), []);
  const pts = values.map((q, i) => `${x(i)},${y(q)}`).join(' ');
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
    <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
    {[0, 1, 2, 3, 4].map(t => { const q = mn + (mx - mn) * t / 4, yy = y(q); return <g key={t}><line x1={m.l} x2={w - m.r} y1={yy} y2={yy} style={{ stroke: C.line }} /><text x={m.l - 6} y={yy + 3} textAnchor="end" fontSize="10.5" style={{ fill: C.muted }}>{fmt(q)}</text></g>; })}
    {ref_ && <g><line x1={m.l} x2={w - m.r} y1={y(ref_.v)} y2={y(ref_.v)} strokeDasharray="4 4" style={{ stroke: C.accent, strokeWidth: 1.5 }} /><text x={w - m.r} y={y(ref_.v) - 6} textAnchor="end" fontSize="11" fontWeight="600" style={{ fill: C.accent }}>{ref_.label}</text></g>}
    <polygon points={`${m.l},${y(0)} ${pts} ${x(n - 1)},${y(0)}`} fill={`url(#${id})`} />
    <polyline className="draw" pathLength="1" points={pts} fill="none" strokeWidth="2.8" strokeLinejoin="round" style={{ stroke: color }} />
    {values.map((q, i) => <circle key={i} cx={x(i)} cy={y(q)} r="3.8" strokeWidth="2" style={{ fill: 'rgb(var(--surface))', stroke: color }}><title>{labels[i]}: {fmt(q)}</title></circle>)}
    {labels.map((lb, i) => <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fontSize="10.5" style={{ fill: C.muted }}>{lb}</text>)}
  </svg>;
}

export function Donut({ items, center }) {
  const tot = items.reduce((a, b) => a + b.v, 0) || 1, R = 54, Cc = 2 * Math.PI * R; let acc = 0;
  return <div className="flex flex-wrap items-center gap-5">
    <svg viewBox="0 0 160 160" className="w-44 shrink-0 -rotate-90">
      <circle cx="80" cy="80" r={R} fill="none" strokeWidth="22" style={{ stroke: 'rgb(var(--surface2))' }} />
      {items.map((it, i) => { const len = it.v / tot * Cc, off = -acc; acc += len; return <circle key={i} cx="80" cy="80" r={R} fill="none" strokeWidth="22" strokeDasharray={`${Math.max(0, len - 1.5)} ${Cc}`} strokeDashoffset={off} style={{ stroke: it.c, transition: 'all .7s' }}><title>{it.n}: {it.t}</title></circle>; })}
      {center && <g className="rotate-90" style={{ transformOrigin: '80px 80px' }}><text x="80" y="80" textAnchor="middle" fontSize="19" fontWeight="600" fontFamily="Bricolage Grotesque, serif" style={{ fill: C.ink }}>{center[0]}</text><text x="80" y="96" textAnchor="middle" fontSize="9.5" style={{ fill: C.muted }}>{center[1]}</text></g>}
    </svg>
    <ul className="min-w-[160px] flex-1 space-y-2 text-[13px]">{items.map(it => <li key={it.n} className="flex justify-between gap-3"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-sm" style={{ background: it.c }} />{it.n}</span><span className="font-mono text-xs text-muted">{it.t}</span></li>)}</ul>
  </div>;
}

export function Radar({ values, labels, color = C.brand }) {
  const cx = 130, cy = 120, R = 82, n = values.length, ang = i => -Math.PI / 2 + i * 2 * Math.PI / n, pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
  const poly = k => values.map((v, i) => pt(i, R * (k ?? v / 5)).join(',')).join(' ');
  return <svg viewBox="0 0 260 240" className="w-full">
    {[.2, .4, .6, .8, 1].map(k => <polygon key={k} points={values.map((_, i) => pt(i, R * k).join(',')).join(' ')} fill="none" style={{ stroke: C.line }} />)}
    {values.map((_, i) => <line key={i} x1={cx} y1={cy} x2={pt(i, R)[0]} y2={pt(i, R)[1]} style={{ stroke: C.line }} />)}
    <polygon points={poly()} strokeWidth="2.4" style={{ fill: color, fillOpacity: .22, stroke: color, transition: 'all .5s' }} />
    {values.map((v, i) => { const [px, py] = pt(i, R * v / 5), [lx, ly] = pt(i, R + 18); return <g key={i}><circle cx={px} cy={py} r="3.8" style={{ fill: color }} /><text x={lx} y={ly + 3} textAnchor="middle" fontSize="10.5" style={{ fill: C.muted }}>{labels[i]}</text></g>; })}
  </svg>;
}

export function Gauge({ value, rated, color = C.brand }) {
  const pct = Math.max(0, Math.min(1, value / (rated * 1.1))), rp = rated / (rated * 1.1), a = Math.PI * (1 - pct), ra = Math.PI * (1 - rp);
  return <svg viewBox="0 0 240 140" className="mx-auto w-full max-w-sm">
    <path d="M 20 120 A 100 100 0 0 1 220 120" fill="none" strokeWidth="18" strokeLinecap="round" style={{ stroke: 'rgb(var(--surface2))' }} />
    <path d="M 20 120 A 100 100 0 0 1 220 120" pathLength="100" fill="none" strokeWidth="18" strokeLinecap="round" strokeDasharray={`${pct * 100} 100`} style={{ stroke: color, transition: 'stroke-dasharray .7s cubic-bezier(.2,.7,.2,1)' }} />
    <line x1={120 + 84 * Math.cos(ra)} y1={120 - 84 * Math.sin(ra)} x2={120 + 116 * Math.cos(ra)} y2={120 - 116 * Math.sin(ra)} strokeWidth="2.5" style={{ stroke: C.accent }} />
    <text x={120 + 128 * Math.cos(ra) * .93} y={120 - 128 * Math.sin(ra) * .93 - 2} textAnchor="middle" fontSize="9.5" fontWeight="600" style={{ fill: C.accent }}>rated</text>
    <text x="120" y="108" textAnchor="middle" fontSize="40" fontWeight="600" fontFamily="Bricolage Grotesque, serif" style={{ fill: C.ink }}>{Math.round(value)}</text>
    <text x="120" y="128" textAnchor="middle" fontSize="11" style={{ fill: C.muted }}>km RealRange</text>
  </svg>;
}

/* ---------- India dot map ---------- */
const inside = (x, y) => { let c = false; for (const ring of INDIA) for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const SX = 20.5, SY = 22, X0 = 67.5, Y0 = 37.6, px = lon => (lon - X0) * SX, py = lat => (Y0 - lat) * SY;
const DOTS = (() => { const d = []; for (let lat = 6.6; lat < 37.2; lat += .55) for (let lon = 68.2; lon < 97.5; lon += .55) if (inside(lon, lat)) d.push([px(lon), py(lat)]); return d; })();
const OUTLINE = INDIA.map(r => 'M' + r.map(p => px(p[0]).toFixed(1) + ',' + py(p[1]).toFixed(1)).join('L') + 'Z').join('');
const DotGrid = React.memo(() => <g>
  <path d={OUTLINE} style={{ fill: 'rgb(var(--brand) / .05)', stroke: 'rgb(var(--ink) / .30)' }} strokeWidth="1.1" strokeLinejoin="round" />
  {DOTS.map((d, i) => <circle key={i} cx={d[0]} cy={d[1]} r="1.9" style={{ fill: 'rgb(var(--ink) / .16)' }} />)}
</g>);

export function IndiaMap({ states, selected, onSelect, showLabels = true }) {
  // states: {name: {color, size, dim}}
  return <svg viewBox="0 0 610 690" className="w-full select-none">
    <DotGrid />
    {CITIES.map(c => { const s = states[c.n]; if (!s) return null; const x = px(c.lon), y = py(c.lat), sel = selected === c.n;
      return <g key={c.n} className="cursor-pointer" onClick={() => onSelect && onSelect(c.n)} style={{ opacity: s.dim ? .4 : 1, transition: 'opacity .4s' }}>
        {!s.dim && <circle className="pin-ring" cx={x} cy={y} r="7" style={{ fill: s.color }} />}
        <circle cx={x} cy={y} r={sel ? 10 : s.size || 7} strokeWidth="2.5" style={{ fill: s.color, stroke: 'rgb(var(--bg))', transition: 'all .3s' }}><title>{c.n}</title></circle>
        {sel && <circle cx={x} cy={y} r="15" fill="none" strokeWidth="1.5" style={{ stroke: s.color }} />}
        {showLabels && <text x={x + 13} y={y + 4} fontSize="12.5" fontWeight="600" style={{ fill: C.ink, paintOrder: 'stroke', stroke: 'rgb(var(--bg))', strokeWidth: 3.5 }}>{c.n}</text>}
      </g>; })}
  </svg>;
}
