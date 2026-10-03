import React, { useEffect, useMemo, useState } from 'react';
import { FACTORS, W0, CITIES, U, CAC, FX, GM, LG, CAPEX, RAISE, PRICE, TIER, RATED, inr, num, cr, sum, model, BASE, emi, rr, SOURCES } from './data.js';
import { C, Count, Cite, Kpi, Card, Head, Prose, Slider, Note, Bars, GBars, HBars, Water, Line, Donut, Radar, Gauge, IndiaMap } from './ui.jsx';

const PAGES = [['home', 'Overview'], ['market', 'Market'], ['growth', 'Growth OS'], ['buyers', 'Buyers and pricing'], ['circle', 'Circle'], ['range', 'RealRange'], ['money', 'Financials'], ['sources', 'Sources']];
const go = p => { location.hash = p; };

/* ---------- shared scoring ---------- */
const score = (pct) => CITIES.map(c => ({ ...c, s: c.r.reduce((a, r, i) => a + r * pct[i], 0) * 20 })).sort((a, b) => b.s - a.s);
const DEF = score(W0.map(x => x / 100));
const waveColor = w => w === 1 ? C.brand : w === 2 ? C.accent : C.grey;

/* ---------- nav and shell ---------- */
function Nav({ route, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
      <a href="#home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-display text-sm font-bold text-bg">SG</span>
        <span className="leading-none"><b className="font-display text-[17px]">SwadesiGo</b><small className="mt-1 block font-mono text-[9.5px] uppercase tracking-[.2em] text-muted">Growth OS</small></span></a>
      <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-16 flex-col gap-1 border-b border-line bg-bg p-3 lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}>
        {PAGES.map(([k, l]) => <a key={k} href={'#' + k} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition ${route === k ? 'bg-brand/15 text-brand' : 'text-muted hover:bg-surface2 hover:text-ink'}`}>{l}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[11px] font-semibold text-muted hover:text-ink" aria-label="Toggle theme">{theme === 'dark' ? 'LIGHT' : 'DARK'}</button>
        <button onClick={() => setOpen(!open)} className="rounded-lg border border-line bg-surface px-3 py-2 text-[13px] font-semibold lg:hidden">Menu</button>
      </div>
    </div>
  </header>;
}

const Pager = ({ route }) => { const i = PAGES.findIndex(p => p[0] === route), pv = PAGES[i - 1], nx = PAGES[i + 1];
  return <div className="mt-14 grid gap-3 sm:grid-cols-2">{pv ? <a href={'#' + pv[0]} className="rounded-2xl border border-line bg-surface p-5 transition hover:border-brand"><small className="font-mono text-[10px] uppercase tracking-[.2em] text-muted">Previous</small><b className="mt-1 block font-display text-xl">{pv[1]}</b></a> : <span />}
    {nx && <a href={'#' + nx[0]} className="rounded-2xl border border-line bg-surface p-5 text-right transition hover:border-brand sm:col-start-2"><small className="font-mono text-[10px] uppercase tracking-[.2em] text-muted">Next</small><b className="mt-1 block font-display text-xl">{nx[1]}</b></a>}</div>; };

/* ======================== HOME ======================== */
function MiniDots() { return <div className="grid grid-cols-10 gap-1">{Array.from({ length: 100 }, (_, i) => <i key={i} className="mx-auto h-2.5 w-2.5 rounded-full" style={{ background: i < 30 ? C.brand : i < 50 ? C.brand2 : i < 70 ? C.accent : i < 90 ? C.info : C.grey }} />)}</div>; }
function Home() {
  const [sel, setSel] = useState('Jaipur');
  const states = useMemo(() => Object.fromEntries(CITIES.filter(c => c.wave).map(c => [c.n, { color: waveColor(c.wave) }])), []);
  const c = DEF.find(x => x.n === sel);
  const ticker = ['2.66M EVs registered in FY26', '8.62% EV share of all vehicle sales', '1,99,495 e-2Ws sold in March 2026', '66.03% of EV sales are two-wheelers', 'GST on EVs cut from 12% to 5%', '29,151 public charging stations', '7.66% India EV share vs 16.48% global (2024)'];
  return <div>
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-medium text-muted"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand" /></span>Case Carnival 2025 &middot; NIT Rourkela &middot; Series A plan</div>
          <h1 className="font-display text-5xl font-semibold leading-[.98] tracking-tight md:text-7xl">Earn the right to <span className="relative whitespace-nowrap text-brand">scale<svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none"><path d="M2 8 Q 50 -2 100 6 T 198 5" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: C.accent }} /></svg></span>, one proven city at a time.</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">SwadesiGo won Tier-2 and Tier-3 riders with an affordable, road-tough Made-in-India scooter. This is the working plan to take it to ten cities in 24 months without a metro price war.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => go('growth')} className="rounded-xl bg-brand px-6 py-3.5 text-[14px] font-semibold text-bg shadow-lg shadow-brand/25 transition hover:-translate-y-0.5">Open the Growth OS &rarr;</button>
            <button onClick={() => go('circle')} className="rounded-xl border border-line bg-surface px-6 py-3.5 text-[14px] font-semibold transition hover:-translate-y-0.5 hover:border-brand">See the 100 Champions</button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-brand/10 blur-3xl" />
          <div className="hair relative"><div className="rounded-[17px] bg-surface p-4">
            <div className="grid gap-2 sm:grid-cols-[1fr_190px]">
              <IndiaMap states={states} selected={sel} onSelect={setSel} showLabels={false} />
              <div className="flex flex-col justify-center rounded-xl bg-surface2 p-3">
                <span className="font-mono text-[10px] uppercase tracking-[.15em]" style={{ color: waveColor(c.wave) }}>Wave {c.wave}</span>
                <b className="font-display text-2xl">{c.n}</b><span className="text-xs text-muted">{c.st} &middot; {c.hub} hub</span>
                <Radar values={c.r} labels={['Mkt', 'Fit', 'EV', 'White', 'Svc']} color={waveColor(c.wave)} />
                <div className="text-center font-mono text-xs text-muted">score <b className="text-ink">{c.s.toFixed(1)}</b></div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-brand" />Wave 1 <i className="ml-3 mr-1.5 inline-block h-2 w-2 rounded-full bg-accent" />Wave 2</span><span>Tap a city. Stylised map</span></div>
          </div></div>
        </div>
      </div>
      <div className="relative overflow-hidden border-t border-line bg-surface/60 py-3"><div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-[12px] text-muted">{[...ticker, ...ticker].map((t, i) => <span key={i}><span className="mr-3 text-accent">&#9679;</span>{t}</span>)}</div></div>
    </section>

    <div className="mx-auto max-w-7xl px-5">
      <div className="-mt-px grid grid-cols-2 gap-3 py-10 md:grid-cols-5">
        <Kpi label="Cities" note="Two waves of five"><Count v={10} /></Kpi>
        <Kpi label="Scooters, month 24" tone="accent" note="6,000 then 22,000"><Count v={sum(BASE.rows, 0, 8, 'u')} /></Kpi>
        <Kpi label="Series A raise" tone="info" note={`Modelled need ${cr(BASE.need)}`}>&#8377;45 Cr</Kpi>
        <Kpi label="First positive quarter" note="From about month 22">Q{BASE.be + 1}</Kpi>
        <Kpi label="Champions, month 24" tone="accent" note="100 in every city"><Count v={1000} /></Kpi>
      </div>

      <h2 className="font-display text-3xl font-semibold md:text-4xl">Three working MVPs</h2>
      <p className="mt-2 max-w-2xl text-muted">Each is a small tool with live sliders. Open one and change an assumption.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[['MVP 01', 'Growth OS', 'growth', 'Move the weights on market size, competition and customer fit and watch the top ten cities re-rank. The choice comes from a scoring engine, not a guess.', <div className="flex h-12 items-end gap-1">{[85, 82, 79, 77, 76, 75, 72, 72, 69, 67].map((h, i) => <i key={i} className="flex-1 rounded-sm" style={{ height: (h - 55) * 2.4 + '%', background: i < 5 ? C.brand : C.accent }} />)}</div>],
          ['MVP 02', 'SwadesiGo Circle', 'circle', 'The 100 Champions playbook. A demand-before-dealership model: 100 local riders, students and shop owners per city give test rides and referrals, so CAC stays low and showrooms come later.', <MiniDots />],
          ['MVP 03', 'RealRange', 'range', 'A telematics engine that shows the range a rider will really get from load, temperature, traffic and elevation, not a lab number. It removes range anxiety and builds trust.', <Gauge value={78} rated={85} />]
        ].map(([n, t, k, p, vis]) => <button key={k} onClick={() => go(k)} className="group flex flex-col rounded-2xl border border-line bg-surface p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[.18em] text-accent">{n}</span>
          <h3 className="mt-2 font-display text-2xl font-semibold">{t}</h3><p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">{p}</p>
          <div className="mt-5 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-surface2 p-4"><div className="w-full max-w-[220px]">{vis}</div></div>
          <span className="mt-4 text-[13.5px] font-semibold text-brand transition group-hover:translate-x-1">Open &rarr;</span></button>)}
      </div>

      <h2 className="mt-16 font-display text-3xl font-semibold md:text-4xl">The plan on a page</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface p-6">
        <div className="min-w-[680px]">
          <div className="relative h-3 rounded-full bg-surface2">
            <div className="absolute left-0 h-3 rounded-l-full bg-brand" style={{ width: '37.5%' }} /><div className="absolute h-3 bg-accent" style={{ left: '37.5%', width: '62.5%' }} />
            <div className="absolute -top-1.5 h-6 w-1 rounded bg-ink" style={{ left: '91.6%' }} />
          </div>
          <div className="mt-3 flex font-mono text-[11px] text-muted"><span className="w-[37.5%]">M1</span><span className="w-[62.5%]">M10</span><span className="ml-auto">M24</span></div>
          <div className="mt-5 grid grid-cols-3 gap-6 text-[13.5px]">
            <div><b className="text-brand">Wave 1, months 1 to 9</b><p className="mt-1 text-muted">Jaipur, Indore, Coimbatore, Lucknow, Bhubaneswar. 500 Champions. Each city passes a day-100 gate before it unlocks a pop-up hub.</p></div>
            <div><b className="text-accent">Wave 2, months 10 to 24</b><p className="mt-1 text-muted">Ahmedabad, Kochi, Pune, Hyderabad, Bengaluru. Each unlocked by a nearby Wave 1 city. Metros enter through fleets.</p></div>
            <div><b>Breakeven, Q8</b><p className="mt-1 text-muted">Operating EBITDA turns positive near month 22. Cash need about {cr(BASE.need)} against a &#8377;45 Cr raise.</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ======================== MARKET ======================== */
function Market() {
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="01 / Market" title="Demand is real and growing, but uneven" lede="India registered 2.66 million EVs in FY26 and two- and three-wheelers made up almost 87% of them. Adoption is concentrated in a few states, charging is thin and policy is moving from subsidy to mandate. That favours a challenger that targets high-use buyers one city at a time." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Kpi label="EVs registered, FY26" note={<>Up 29.67% from 2.05M <Cite id="S1" /></>}>2.66M</Kpi>
      <Kpi label="EV share of vehicle sales" tone="accent" note={<>FY26. Goal: 30% of new sales by 2030 <Cite id="S1" /><Cite id="S2" /></>}>8.62%</Kpi>
      <Kpi label="E2W sold, March 2026" tone="info" note={<>Up 44.07% year on year <Cite id="S1" /></>}>1,99,495</Kpi>
      <Kpi label="E2W share of EV sales" note={<>March 2026, from 62.11% <Cite id="S1" /></>}>66.03%</Kpi>
      <Kpi label="India vs global EV share" tone="accent" note={<>Calendar 2024 <Cite id="S2" /></>}>7.66% / 16.48%</Kpi>
      <Kpi label="Public chargers" tone="info" note={<>Dec 2025, Ministry of Heavy Industries <Cite id="S1" /></>}>29,151</Kpi>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      <Prose items={[
        ['What the numbers say', 'EV registrations have risen every year since FY21 and passed 2.6 million in FY26. Electric two-wheelers now account for two thirds of EV sales. Even so, only 7.66% of vehicles sold in 2024 were electric, far from the 30% goal. NITI Aayog notes 75% of India\'s vehicles are two-wheelers, so scooters decide the transition.'],
        ['Where demand sits', 'Penetration is uneven. In 2025 Tripura led at 18.38%, then Assam, Delhi, Kerala and Goa. Karnataka alone holds about a fifth of public chargers, and BBC reports that four of 28 states hold over half. Two-wheelers mostly charge at home, so a home-charging habit matters more than a public network.'],
        ['Tailwinds', 'GST on EVs fell from 12% to 5%. India imports about 90% of its oil and raised pump prices in 2026. CAFE-3 norms and a draft Delhi plan to stop registering new petrol two- and three-wheelers by 2027 push the same way.'],
        ['Headwinds that shape our plan', 'Range anxiety, battery supply that leans on China (70% to 80% of lithium and cobalt refining) and buyers who see the sticker price but not the running-cost saving. RealRange, local sourcing and a total-cost message answer each.']
      ]} />
      <div className="space-y-4">
        <Card title="EVs registered in India" sub="Millions, FY18 to FY26 (Vahan)"><Bars labels={['18', '19', '20', '21', '22', '23', '24', '25', '26']} values={[.10, .15, .17, .14, .46, 1.18, 1.68, 2.05, 2.66]} colors={(q, i) => i === 8 ? C.accent : C.brand} fmt={q => q.toFixed(2)} /><p className="mt-2 text-xs text-muted">Source: IBEF citing Vahan <Cite id="S1" /></p></Card>
        <Card title="EV penetration, top five states, 2025" sub="% of new registrations"><HBars rows={[['Tripura', 18.38], ['Assam', 14.30], ['Delhi', 13.89], ['Kerala', 11.34], ['Goa', 10.76]].map(([l, v]) => ({ l, v }))} fmt={q => q.toFixed(2) + '%'} ml="w-20" /><p className="mt-2 text-xs text-muted">Source: IBEF <Cite id="S1" /></p></Card>
      </div>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <Card title="India trails the world" sub="EV share of new sales, %"><Bars labels={['India 2024', 'Global 2024', 'India goal 2030']} values={[7.66, 16.48, 30]} colors={[C.brand, C.grey, C.accent]} fmt={q => q + '%'} h={230} /><p className="mt-2 text-xs text-muted">NITI Aayog <Cite id="S2" /></p></Card>
      <Card title="Where component value is moving" sub="Annual growth, %"><HBars rows={[{ l: 'Vehicle software', v: 15 }, { l: 'Battery, EV drive', v: 13 }, { l: 'All components', v: 3.5 }, { l: 'ICE powertrain', v: -3, c: C.bad }]} fmt={q => q + '%'} ml="w-28" /><p className="mt-2 text-xs text-muted">BCG 2026; software at midpoint of 14 to 16% <Cite id="S4" /></p></Card>
      <Card title="Chargers are concentrated" sub="Public stations, Dec 2025"><Donut items={[{ n: 'Karnataka', v: 6096, c: C.brand, t: '6,096' }, { n: 'Rest of India', v: 23055, c: C.grey, t: '23,055' }]} center={['29,151', 'stations']} /><p className="mt-2 text-xs text-muted">IBEF; BBC cites a lower count, check definitions <Cite id="S1" /><Cite id="S3" /></p></Card>
    </div>
    <Pager route="market" />
  </div>;
}

/* ======================== GROWTH OS ======================== */
function Growth() {
  const [w, setW] = useState(W0), [sel, setSel] = useState('Jaipur');
  const t = w.reduce((a, b) => a + b, 0) || 1, pct = w.map(x => x / t), sc = useMemo(() => score(pct), [w]);
  const top10 = new Set(sc.slice(0, 10).map(c => c.n)), plan = new Set(DEF.filter(c => c.wave).map(c => c.n));
  const same = [...top10].every(n => plan.has(n)), cityObj = sc.find(c => c.n === sel);
  const states = Object.fromEntries(CITIES.map(c => [c.n, { color: top10.has(c.n) ? waveColor(c.wave || 2) : C.grey, dim: !top10.has(c.n), size: top10.has(c.n) ? 7 : 4.5 }]));
  const RH = 46, set = (i, v) => setW(w.map((x, k) => k === i ? v : x));
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="02 / Growth OS" title="Where to play: ten cities, ranked by an engine you control" lede="Five factors score every candidate city from 1 to 5. Move the sliders for market size, competition and customer fit and the ranking, the map and the verdict update at once. The city list can be defended, not just asserted." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Candidates scored" note="Ten selected, four just outside"><Count v={14} /></Kpi>
      <Kpi label="Top city under your weights" tone="accent" note={`Score ${sc[0].s.toFixed(1)}`}>{sc[0].n}</Kpi>
      <Kpi label="Regional hubs" tone="info" note="North, West-Central, South, East"><Count v={4} /></Kpi>
      <Kpi label="Top ten vs plan" tone={same ? 'brand' : 'bad'} note={same ? 'Engine and plan agree' : 'The weights change the list'}>{same ? 'Same' : 'Differs'}</Kpi>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[270px_1fr_340px]">
      <div className="rounded-2xl border border-line bg-surface2/60 p-5">
        <h3 className="font-display text-lg font-semibold">Strategy weights</h3><p className="mb-3 text-xs text-muted">Relative sliders, normalised to 100%.</p>
        {FACTORS.map((f, i) => <Slider key={f} label={f === 'Whitespace' ? 'Competitive whitespace' : f} value={w[i]} set={v => set(i, v)} min={0} max={50} fmt={() => Math.round(pct[i] * 100) + '%'} />)}
        <p className="mt-4 text-xs text-muted">Whitespace is the inverse of rivalry: fewer entrenched rivals scores higher.</p>
        <button onClick={() => setW(W0)} className="mt-4 rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-bg">Reset to plan</button>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
        <div className="mb-2 flex justify-between text-xs text-muted"><b className="font-display text-base text-ink">Live ranking</b><span>Dashed line: top ten</span></div>
        <div className="relative" style={{ height: 14 * RH }}>
          {sc.map((c, i) => <button key={c.n} onClick={() => setSel(c.n)} className={`absolute left-0 right-0 flex items-center gap-3 rounded-lg px-2 text-left transition-all duration-500 ease-out ${sel === c.n ? 'bg-brand/10' : 'hover:bg-surface2'}`} style={{ height: RH - 4, transform: `translateY(${i * RH + (i >= 10 ? 6 : 0)}px)`, opacity: i >= 10 ? .55 : 1 }}>
            <span className="w-5 font-mono text-xs text-muted">{i + 1}</span>
            <span className="w-28 text-sm font-semibold leading-tight">{c.n}<small className="block text-[11px] font-normal text-muted">{c.st}</small></span>
            <span className="relative h-3 flex-1 rounded bg-surface2"><span className="absolute left-0 top-0 h-full rounded transition-all duration-500" style={{ width: c.s + '%', background: i >= 10 ? C.grey : waveColor(c.wave || 2) }} /></span>
            <span className="w-12 text-right font-mono text-sm font-semibold">{c.s.toFixed(1)}</span>
            <span className="hidden w-24 whitespace-nowrap text-right sm:block"><em className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold not-italic" style={{ background: 'rgb(var(--surface2))', color: waveColor(c.wave) }}>{c.wave ? 'Wave ' + c.wave : 'Not in plan'}</em></span>
          </button>)}
          <div className="pointer-events-none absolute left-0 right-0 border-t-2 border-dashed border-ink/50" style={{ top: 10 * RH + 2 }} />
        </div>
      </div>
      <div className="space-y-4">
        <Card><IndiaMap states={states} selected={sel} onSelect={setSel} showLabels={false} /></Card>
        <Card title={cityObj.n} sub={`${cityObj.st}${cityObj.hub ? ' \u00B7 ' + cityObj.hub + ' hub' : ''}`}><Radar values={cityObj.r} labels={['Market', 'Fit', 'EV', 'White', 'Service']} color={waveColor(cityObj.wave || 2)} /></Card>
      </div>
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <Prose items={[
        ['How the score works', 'Each city gets a 1 to 5 rating on five factors, weighted 25, 25, 20, 20 and 10 by default and scaled to 100. Population alone never decides.'],
        ['Why Tier-2 first, metros late', 'Jaipur, Indore, Coimbatore, Lucknow and Bhubaneswar pair solid two-wheeler demand with fewer entrenched rivals. Bengaluru has the biggest market (5) and the lowest whitespace (1), so it enters through fleets in Wave 2.'],
        ['Clusters, not scattered pins', 'North: Jaipur, Lucknow. West-Central: Indore, Ahmedabad, Pune. South: Coimbatore, Kochi, Hyderabad, Bengaluru. East: Bhubaneswar. Each hub shares spares and technicians.']
      ]} />
      <div className="space-y-4">
        <Card title="State E2W penetration, Apr to Oct FY26" sub="Context for the EV readiness rating"><HBars rows={[['Kerala', 13.9], ['Karnataka', 12.5], ['Maharashtra', 10.1], ['Odisha', 9.3], ['Tamil Nadu', 8.1]].map(([l, v]) => ({ l, v }))} fmt={q => q + '%'} ml="w-24" /><p className="mt-2 text-xs text-muted">Team notes citing Deloitte. Verify before quoting <Cite id="S8" /></p></Card>
        <Note tone="warn">The 1 to 5 ratings are team estimates <Cite id="S7" />. Replace them with city Vahan registrations, gig-worker counts and dealer mapping before you submit.</Note>
      </div>
    </div>
    <Pager route="growth" />
  </div>;
}

/* ======================== BUYERS AND PRICING ======================== */
const PERSONAS = [
  { k: 'Hustler', who: 'Delivery and gig riders', job: 'My scooter is my income.', km: 2600, tier: 'fleet', need: 'Uptime, range, running cost', route: 'Lease repaid from platform payouts', cities: 'Jaipur, Hyderabad, Lucknow', msg: 'More kilometres. Lower cost. More earned.' },
  { k: 'Explorer', who: 'Students and early-career riders', job: 'Mobility I can afford and show off.', km: 800, tier: 'base', need: 'Price, EMI, looks, an app', route: 'NBFC EMI with a low down payment', cities: 'Indore, Bhubaneswar, Pune', msg: 'Smart mobility without the premium price.' },
  { k: 'Builder', who: 'Small business and kirana owners', job: 'It has to carry the load and not break.', km: 1200, tier: 'cargo', need: 'Payload, reliability, service', route: 'Lease-to-own', cities: 'Coimbatore, Ahmedabad, Lucknow', msg: 'Your business runs on it.' }
];
function Buyers() {
  const [pi, setPi] = useState(0), p = PERSONAS[pi];
  const [km, setKm] = useState(p.km), [pet, setPet] = useState(100), [mil, setMil] = useState(45), [tar, setTar] = useState(8), [kwh, setKwh] = useState(.03);
  const [down, setDown] = useState(10), [rate, setRate] = useState(15), [ten, setTen] = useState(36);
  useEffect(() => setKm(PERSONAS[pi].km), [pi]);
  const petrol = k => k / mil * pet, elec = k => k * kwh * tar, save = k => petrol(k) - elec(k);
  const e = emi(PRICE[p.tier], down, rate, ten);
  const profiles = [['Student', 800, 'base'], ['Shop', 1200, 'cargo'], ['Commuter', 1500, 'base'], ['Rider', 2600, 'fleet']];
  const net = save(km) - e;
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="03 / Buyers and pricing" title="Sell to the job, price below the entry rivals, finance the rest" lede="Delivery partners, students and small-business owners each need something different, so each gets a variant, a financing route and a message. The strongest message for all three is rupees saved on running cost. Entry rivals sit near Rs 0.9 to 1.1 lakh, so Base is cheaper, but sticker price alone will not win." />
    <div className="grid gap-3 md:grid-cols-3">{PERSONAS.map((x, i) => <button key={x.k} onClick={() => setPi(i)} className={`rounded-2xl border p-5 text-left transition ${pi === i ? 'border-brand bg-brand/10 shadow-lg shadow-brand/10' : 'border-line bg-surface hover:border-brand/60'}`}>
      <span className="font-mono text-[10.5px] uppercase tracking-[.18em] text-accent">{x.who}</span><h3 className="mt-1 font-display text-2xl font-semibold">The {x.k}</h3><p className="mt-1 text-sm italic text-muted">"{x.job}"</p></button>)}</div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Recommended variant" note={`${p.need}`}>{TIER[p.tier]}</Kpi>
      <Kpi label="Price" tone="accent" note={p.route}>{inr(PRICE[p.tier])}</Kpi>
      <Kpi label="Fuel saved per month" tone="info" note={`At ${num(km)} km, ${Math.round((1 - elec(km) / petrol(km)) * 100)}% lower running cost`}><Count v={save(km)} fmt={inr} /></Kpi>
      <Kpi label="Monthly EMI" tone={net >= 0 ? 'brand' : 'accent'} note={net >= 0 ? `Saving covers it, with ${inr(net)} to spare` : `Saving covers ${Math.round(save(km) / e * 100)}% of it`}><Count v={e} fmt={inr} /></Kpi>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]">
      <div className="rounded-2xl border border-line bg-surface2/60 p-5">
        <h3 className="font-display text-lg font-semibold">Assumptions</h3>
        <Slider label="Distance per month" value={km} set={setKm} min={300} max={3500} step={50} fmt={v => num(v) + ' km'} />
        <Slider label="Petrol price" value={pet} set={setPet} min={80} max={130} fmt={v => inr(v) + '/l'} />
        <Slider label="Petrol mileage" value={mil} set={setMil} min={30} max={60} fmt={v => v + ' km/l'} />
        <Slider label="Electricity tariff" value={tar} set={setTar} min={4} max={14} step={.5} fmt={v => '\u20B9' + v + '/kWh'} />
        <Slider label="Scooter use" value={kwh} set={setKwh} min={.02} max={.05} step={.001} fmt={v => v.toFixed(3) + ' kWh/km'} />
        <hr className="my-5 border-line" />
        <Slider label="Down payment" value={down} set={setDown} min={0} max={40} fmt={v => v + '%'} />
        <Slider label="Interest rate" value={rate} set={setRate} min={8} max={26} step={.5} fmt={v => v + '%'} />
        <Slider label="Tenure" value={ten} set={setTen} min={12} max={48} step={6} fmt={v => v + ' mo'} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Fuel saving vs EMI, by buyer" sub="Rupees per month. Saving above EMI means it pays for itself"><GBars labels={profiles.map(q => q[0])} series={[{ name: 'Fuel saving', color: C.brand, values: profiles.map(q => save(q[1])) }, { name: 'EMI', color: C.accent, values: profiles.map(q => emi(PRICE[q[2]], down, rate, ten)) }]} fmt={q => num(q)} /></Card>
        <Card title="Monthly running cost" sub="Petrol scooter vs SwadesiGo"><GBars labels={profiles.map(q => q[0])} series={[{ name: 'Petrol', color: C.bad, values: profiles.map(q => petrol(q[1])) }, { name: 'SwadesiGo', color: C.brand, values: profiles.map(q => elec(q[1])) }]} fmt={q => num(q)} /></Card>
        <Card title="Ex-showroom price vs entry rivals" sub="Rupees thousand. Rival prices approximate"><HBars rows={[{ l: 'SwadesiGo Base', v: 75, c: C.brand }, { l: 'SwadesiGo Cargo', v: 90, c: C.brand }, { l: 'SwadesiGo Pro-Fleet', v: 100, c: C.brand }, { l: 'Ola S1 X', v: 90, c: C.grey }, { l: 'TVS iQube', v: 101, c: C.grey }, { l: 'Bajaj Chetak', v: 110, c: C.grey }]} fmt={q => '\u20B9' + q + 'k'} ml="w-32" /><p className="mt-2 text-xs text-muted">Public listings in team notes. Check before quoting <Cite id="S8" /></p></Card>
        <Card title="Gross margin, rivals vs plan" sub="% of revenue. Periods differ"><Bars labels={['Ola FY25', 'Ather FY26', 'TVS FY26', 'Ours Y1', 'Ours Y2']} values={[17.9, 21.1, 28.8, sum(BASE.rows, 0, 4, 'gp') / sum(BASE.rows, 0, 4, 'rev') * 100, sum(BASE.rows, 4, 8, 'gp') / sum(BASE.rows, 4, 8, 'rev') * 100]} colors={[C.grey, C.grey, C.grey, C.brand, C.brand]} fmt={q => q.toFixed(1)} h={210} /><p className="mt-2 text-xs text-muted">Rivals from team pricing note <Cite id="S8" /></p></Card>
      </div>
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <Prose items={[
        ['Messages and campaigns', `For the ${p.k}: "${p.msg}" Lead cities: ${p.cities}. Kitna Bachaya? puts fuel against electricity on a rupee board at mandis. India Ki Sadkon Ka Test shows stress tests on rough roads. Apna EV, Apni Tarakki uses local Champions to tell real earning stories.`],
        ['Why we do not discount', 'Pure-play EV makers earn thin margins, and TVS can fund price cuts from petrol-vehicle cash flow. We keep the discount cap at 8% and compete on fit for the job. Every variant works at zero subsidy.'],
        ['Financing is part of the product', 'NBFCs fund Base buyers, lease-to-own serves Cargo and Pro-Fleet is repaid from payouts through a platform partner. SwadesiGo does not become a lender. NITI Aayog lists financing cost as a main barrier, so it sits at the centre of the offer.']
      ]} />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface"><table className="w-full text-[13.5px]"><thead><tr className="bg-surface2 text-left text-[11px] uppercase tracking-wider text-muted"><th className="p-3">Variant</th><th className="p-3">Price</th><th className="p-3">Battery and range</th></tr></thead><tbody>
        {[['Base', '74,999', '2.0 kWh LFP, 85 km rated'], ['Cargo', '89,999', '2.7 kWh, 105 km, 180 kg payload'], ['Pro-Fleet', '99,999', '3.4 kWh dual pack, 135 km, fast charge']].map(r => <tr key={r[0]} className="border-t border-line"><td className="p-3 font-semibold">{r[0]}</td><td className="p-3 font-mono">&#8377;{r[1]}</td><td className="p-3 text-muted">{r[2]}</td></tr>)}</tbody></table></div>
    </div>
    <Pager route="buyers" />
  </div>;
}

/* ======================== CIRCLE ======================== */
const ROLES = [['Delivery riders', 30, C.brand], ['Students', 20, C.brand2], ['Small-business owners', 20, C.accent], ['Local micro-influencers', 20, C.info], ['EV enthusiasts', 10, C.grey]];
function Circle() {
  const [day, setDay] = useState(100), [ch, setCh] = useState(100), [rd, setRd] = useState(8), [cv, setCv] = useState(10), [sp, setSp] = useState(6);
  const rides = ch * rd, del = Math.round(rides * cv / 100), cac = del ? sp * 1e5 / del : Infinity;
  const ok = [ch >= 100, rides >= 800, del >= 80, cac <= 9000], n = ok.filter(Boolean).length;
  const d = day / 100, champNow = Math.round(Math.min(ch, ch * day / 30)), ridesNow = Math.round(rides * Math.pow(d, 1.25)), delNow = Math.round(del * Math.pow(d, 1.5));
  const roleBounds = []; let a = 0; ROLES.forEach(r => { roleBounds.push([a, a + r[1] * ch / 100, r[2]]); a += r[1] * ch / 100; });
  const dotColor = i => (roleBounds.find(b => i < Math.round(b[1])) || [0, 0, C.grey])[2];
  const status = n === 4 ? ['ok', 'Scale. All four gates met. Unlock a pop-up hub and open franchise talks.'] : (del < 40 || cac > 13500) ? ['bad', 'Pause. Deliveries or CAC are far off the gate. Stop paid spend, keep serving owners, review segment and channel.'] : ['warn', 'Experiment. Close but not there. Extend 50 days with one change and test again.'];
  const gate = [['Champions', ch, 100], ['Test rides', rides, 800], ['Deliveries', del, 80]];
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="04 / SwadesiGo Circle" title="The 100 Champions playbook: build demand before a dealership" lede="Instead of opening large showrooms, SwadesiGo starts every city with 100 local early adopters: delivery riders, students and small-business owners. They become Champions who give real test rides and refer people they know. Showrooms come later, and only where demand has already shown up." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Champions per city" note="1,000 across ten cities by month 24"><Count v={100} /></Kpi>
      <Kpi label="Test rides by day 100" tone="accent" note="Eight per Champion, about 2.4 a month"><Count v={800} /></Kpi>
      <Kpi label="CAC gate" tone="info" note="Per scooter delivered, day 100">&#8377;9,000</Kpi>
      <Kpi label="Franchise trigger" note="Sales a month, two months running">60+</Kpi>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
        <div className="flex items-baseline justify-between"><h3 className="font-display text-xl font-semibold">One city, day by day</h3><span className="font-mono text-sm text-brand">DAY {day}</span></div>
        <p className="mb-4 text-sm text-muted">Drag the day. Dots light up as Champions are recruited; rides and deliveries build behind them.</p>
        <div className="grid grid-cols-10 gap-2">{Array.from({ length: Math.max(100, ch) }, (_, i) => <i key={i} className="aspect-square rounded-full transition-all duration-300" style={{ background: i < champNow ? dotColor(i) : 'rgb(var(--surface2))', transform: i < champNow ? 'scale(1)' : 'scale(.6)' }} />)}</div>
        <div className="mt-4"><Slider label="Day of launch" value={day} set={setDay} min={0} max={100} fmt={v => v} /></div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">{[['Champions', champNow, C.brand], ['Test rides', ridesNow, C.accent], ['Deliveries', delNow, C.info]].map(([l, v, c]) => <div key={l} className="rounded-xl bg-surface2 p-3"><div className="font-display text-3xl font-semibold tabular-nums" style={{ color: c }}>{num(v)}</div><div className="text-[11px] uppercase tracking-wider text-muted">{l}</div></div>)}</div>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">{ROLES.map(r => <li key={r[0]}><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full" style={{ background: r[2] }} />{r[0]} {r[1]}</li>)}</ul>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-line bg-surface2/60 p-5"><h3 className="font-display text-lg font-semibold">Day-100 gate simulator</h3>
          <Slider label="Champions recruited" value={ch} set={setCh} min={40} max={150} fmt={v => v} />
          <Slider label="Test rides per Champion" value={rd} set={setRd} min={2} max={14} fmt={v => v} />
          <Slider label="Ride to delivery conversion" value={cv} set={setCv} min={3} max={20} fmt={v => v + '%'} />
          <Slider label="Spend in 100 days" value={sp} set={setSp} min={2} max={16} step={.5} fmt={v => '\u20B9' + v.toFixed(1) + ' lakh'} /></div>
        <div className="grid grid-cols-2 gap-3"><Kpi label="CAC" tone={cac <= 9000 ? 'brand' : 'bad'}>{isFinite(cac) ? <Count v={cac} fmt={inr} /> : 'n/a'}</Kpi><Kpi label="Gates met" tone={n === 4 ? 'brand' : 'accent'}>{n} of 4</Kpi></div>
        <Note tone={status[0]}>{status[1]}</Note>
        <Card title="Funnel vs gate" sub="Dashed marker is the gate for each step"><div className="space-y-3">{gate.map(([l, v, g]) => { const mx = Math.max(v, g) * 1.15; return <div key={l} className="flex items-center gap-3 text-[13px]"><span className="w-20 text-right font-medium">{l}</span><div className="relative h-6 flex-1 rounded bg-surface2"><div className="absolute left-0 top-0 h-full rounded transition-all duration-700" style={{ width: v / mx * 100 + '%', background: v >= g ? C.brand : C.bad }} /><div className="absolute top-[-3px] h-8 border-l-2 border-dashed border-ink/70" style={{ left: g / mx * 100 + '%' }} /></div><span className="w-20 font-mono text-xs text-muted">{num(v)}/{num(g)}</span></div>; })}</div></Card>
      </div>
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <Prose items={[
        ['What the Circle is', 'A "demand before dealership" model. A traditional launch rents a showroom, buys stock and hopes customers come. The Circle reverses it: recruit people who already ride every day, put the scooter under them, and let the city show whether it wants more.'],
        ['What a Champion does', 'A trusted local rider or owner, not a paid influencer. Champions give friends, colleagues and neighbours a real test ride and refer people ready to buy. Together they work as a decentralised sales force producing organic test rides and referrals without a showroom or a big ad budget.'],
        ['Why it lowers CAC', 'A recommendation from a rider you know is more trusted than an advert and far cheaper than paid media. Our design target is a CAC falling from about \u20B910,000 in quarter 1 to \u20B96,000 by quarter 8. That is a target for the day-100 gate to prove, not a measured result.'],
        ['Three stages', 'Stage 1 is digital outreach plus Champions with almost no capex. Stage 2 is a container pop-up at a fuel pump or mandi, about \u20B93.5 lakh. Stage 3 is a partner-funded franchise hub, opened only after 60 or more sales a month for two months running.']
      ]} />
      <div className="space-y-4">
        <Card title="CAC path against the day-100 gate" sub="Rupees per scooter, by quarter"><Line labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']} values={CAC} fmt={q => num(q)} ref_={{ v: 9000, label: 'Gate \u20B99,000' }} /></Card>
        <Card title="Champions on the ground" sub="Cumulative, both waves"><Bars labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']} values={[100, 300, 500, 500, 600, 700, 900, 1000]} colors={(q, i) => i < 3 ? C.brand : C.accent} fmt={q => num(q)} h={200} /></Card>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface"><table className="w-full text-[13px]"><tbody>{[['1 Digital and Champions', 'Minimal', 'City selected'], ['2 Pop-up hub', '\u20B93.5 lakh', 'Day-100 gate passed'], ['3 Franchise hub', 'Partner pays', '60+ sales a month, twice']].map(r => <tr key={r[0]} className="border-b border-line last:border-0"><td className="p-3 font-semibold">{r[0]}</td><td className="p-3 font-mono text-xs">{r[1]}</td><td className="p-3 text-muted">{r[2]}</td></tr>)}</tbody></table></div>
      </div>
    </div>
    <Pager route="circle" />
  </div>;
}

/* ======================== REALRANGE ======================== */
function Range() {
  const [v, setV] = useState('base'), [kg, setKg] = useState(75), [t, setT] = useState(30), [tr, setTr] = useState('mixed'), [c, setC] = useState(10), [s, setS] = useState(100), [st, setSt] = useState('normal');
  const r = rr({ v, kg, t, tr, c, s, st });
  const rows = [{ l: 'Rated range', a: 0, b: r.r0, c: C.grey, t: Math.round(r.r0) + ' km' }, ...r.steps.map(x => ({ l: x.n, a: Math.min(x.a, x.b), b: Math.max(x.a, x.b), c: x.b >= x.a ? C.brand2 : C.bad, t: (x.b - x.a >= 0 ? '+' : '') + (x.b - x.a).toFixed(1) + ' km' })), { l: 'RealRange', a: 0, b: r.real, c: C.brand, t: Math.round(r.real) + ' km' }];
  const scen = [['Student, mild', { v: 'base', kg: 70, t: 26, tr: 'mixed', c: 5, s: 100, st: 'normal' }], ['Rider, 41\u00B0C', { v: 'fleet', kg: 95, t: 41, tr: 'stop', c: 10, s: 95, st: 'normal' }], ['Loaded cargo', { v: 'cargo', kg: 220, t: 33, tr: 'mixed', c: 10, s: 100, st: 'normal' }], ['Hilly, old pack', { v: 'base', kg: 85, t: 18, tr: 'free', c: 40, s: 92, st: 'normal' }]].map(([l, o]) => [l, rr(o)]);
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="05 / RealRange" title="A range number a rider can trust, worked out for their own road" lede="Other brands print a lab (ARAI) range. RealRange is an AI-driven feature in the rider's app that calculates the dynamic range from the weight on the scooter, the city's temperature, traffic and elevation. In Tier-2 and Tier-3 cities, where public charging is thin, that confidence builds trust and ends range anxiety." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Range now"><Count v={r.real} fmt={x => Math.round(x) + ' km'} /></Kpi>
      <Kpi label="Share of rated" tone="accent" note={`Rated ${r.r0} km`}><Count v={r.real / r.r0 * 100} fmt={x => Math.round(x) + '%'} /></Kpi>
      <Kpi label="Live inputs" tone="info" note="Load, temperature, traffic, climb, battery health, style">6</Kpi>
      <Kpi label="Scooters feeding data" note="Cumulative by month 24"><Count v={28000} /></Kpi>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]">
      <div className="rounded-2xl border border-line bg-surface2/60 p-5"><h3 className="font-display text-lg font-semibold">Estimator</h3><p className="mb-3 text-xs text-muted">Illustrative coefficients. Real ones are fitted from fleet telemetry <Cite id="S7" />.</p>
        <label className="block text-[13px] font-semibold">Variant<select className="mt-1.5" value={v} onChange={e => setV(e.target.value)}><option value="base">Base, 85 km rated</option><option value="cargo">Cargo, 105 km rated</option><option value="fleet">Pro-Fleet, 135 km rated</option></select></label>
        <Slider label="Rider plus load" value={kg} set={setKg} min={50} max={260} step={5} fmt={x => x + ' kg'} />
        <Slider label="Temperature" value={t} set={setT} min={0} max={46} fmt={x => x + ' \u00B0C'} />
        <label className="mt-4 block text-[13px] font-semibold">Traffic<select className="mt-1.5" value={tr} onChange={e => setTr(e.target.value)}><option value="free">Free flow</option><option value="mixed">Mixed city traffic</option><option value="stop">Heavy stop and go</option></select></label>
        <Slider label="Climb per 10 km" value={c} set={setC} min={0} max={60} fmt={x => x + ' m'} />
        <Slider label="Battery health" value={s} set={setS} min={70} max={100} fmt={x => x + '%'} />
        <label className="mt-4 block text-[13px] font-semibold">Riding style<select className="mt-1.5" value={st} onChange={e => setSt(e.target.value)}><option value="eco">Eco</option><option value="normal">Normal</option><option value="sport">Sporty</option></select></label>
      </div>
      <div className="space-y-4">
        <Card title="The dial" sub="Orange tick marks the rated range"><Gauge value={r.real} rated={r.r0} /></Card>
        <Card title="Where the range goes" sub="Kilometres gained or lost to each factor"><Water rows={rows} max={Math.max(r.r0, ...r.steps.map(x => Math.max(x.a, x.b))) * 1.08} /></Card>
      </div>
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <Prose items={[
        ['The problem it solves', 'Lab range is measured in ideal conditions. A delivery rider carrying a bag in 41 \u00B0C heat through stop-and-go traffic gets far less. Nomura names range anxiety as a key deterrent, and public charging is uneven, so a range figure that matches the rider\'s day is a sales tool as well as a service feature.'],
        ['How it works', 'The scooter reports load, ambient temperature, speed and stop pattern, elevation change and battery health. A model turns these into a live range for the trip and a typical range for the city and use case, improving as more scooters report.'],
        ['What else the data does', 'The same telemetry supports predictive maintenance (cell-voltage drift and temperature spikes trigger early alerts), retention tools and a fleet dashboard. We do not claim a saving figure yet. We measure it in the pilot cities. Enquiries from cities with no presence feed Growth OS as a next-city signal.']
      ]} />
      <div className="space-y-4">
        <Card title="Rated vs RealRange, four scenarios" sub="Kilometres"><GBars labels={scen.map(x => x[0])} series={[{ name: 'Rated', color: C.grey, values: scen.map(x => x[1].r0) }, { name: 'RealRange', color: C.brand, values: scen.map(x => x[1].real) }]} fmt={q => Math.round(q)} /></Card>
        <Card title="Technology roadmap" sub="Months 1 to 24"><div className="space-y-2.5 text-[13px]">{[['RealRange', 0, 6, C.brand], ['Predictive maintenance, retention', 6, 15, C.brand2], ['Fleet dashboard, spares logistics', 15, 24, C.info], ['Next-city signal', 0, 24, C.accent]].map(x => <div key={x[0]} className="flex items-center gap-3"><span className="w-44 shrink-0 text-right font-medium">{x[0]}</span><div className="relative h-5 flex-1 rounded bg-surface2"><div className="absolute h-full rounded" style={{ left: x[1] / 24 * 100 + '%', width: (x[2] - x[1]) / 24 * 100 + '%', background: x[3] }} /></div></div>)}</div></Card>
      </div>
    </div>
    <Pager route="range" />
  </div>;
}

/* ======================== FINANCIALS ======================== */
function Money() {
  const [vol, setVol] = useState(100), [asp, setAsp] = useState(80000), [gm, setGm] = useState(0), [cac, setCac] = useState(100), [fx, setFx] = useState(100);
  const p = { vol: vol / 100, asp, gm, cac: cac / 100, fx: fx / 100 }, m = model(p), R = m.rows, ok = m.need <= RAISE;
  const cpu = asp * (GM[7] + gm / 100) - CAC[7] * p.cac - LG[7], bev = cpu > 0 ? FX[7] * p.fx * 1e7 / cpu / 3 : 0;
  const r8 = R[7], u = r8.u || 1, gp = r8.gp * 1e7 / u, mk = r8.mk * 1e7 / u, lg = r8.lg * 1e7 / u, co = gp - mk - lg;
  const buf = Math.max(0, RAISE - m.need), Q = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  const sens = [60, 70, 80, 90, 100, 110, 120, 130].map(x => model({ ...p, vol: x / 100 }).rows[7].e);
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="06 / Financials" title="Operating breakeven in the eighth quarter, on a thin buffer" lede="The model sells 6,000 scooters in year 1 and 22,000 in year 2 at a net price of Rs 80,000 after GST and channel margin. Gross margin rises from 14% to 22.5% and CAC falls from Rs 10,000 to Rs 6,000. Change any assumption and the breakeven and funding need update." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Kpi label="First positive quarter" tone={m.be < 0 ? 'bad' : 'brand'} note={m.be < 0 ? 'Not in 24 months' : `From about month ${m.be * 3 + 1}`}>{m.be < 0 ? 'None' : 'Q' + (m.be + 1)}</Kpi>
      <Kpi label="Year 2 revenue" tone="accent" note={`Year 1: ${cr(sum(R, 0, 4, 'rev'), 0)}`}><Count v={sum(R, 4, 8, 'rev')} fmt={x => cr(x, 0)} /></Kpi>
      <Kpi label="Peak cumulative loss" tone="bad" note="Before the business turns"><Count v={-m.tr} fmt={x => cr(x)} /></Kpi>
      <Kpi label="Total cash need" tone={ok ? 'info' : 'bad'} note={ok ? `Buffer ${cr(RAISE - m.need)} on \u20B945 Cr` : `Short by ${cr(m.need - RAISE)}`}><Count v={m.need} fmt={x => cr(x)} /></Kpi>
      <Kpi label="Breakeven volume" note="Scooters a month at Q8 economics">{bev ? <Count v={bev} /> : 'n/a'}</Kpi>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[290px_1fr]">
      <div className="rounded-2xl border border-line bg-surface2/60 p-5"><h3 className="font-display text-lg font-semibold">Assumptions</h3><p className="mb-3 text-xs text-muted">Base case sits at the centre of each slider <Cite id="S7" />.</p>
        <Slider label="Volume vs plan" value={vol} set={setVol} min={60} max={130} step={5} fmt={x => x + '%'} />
        <Slider label="Net price per scooter" value={asp} set={setAsp} min={70000} max={90000} step={1000} fmt={inr} />
        <Slider label="Gross margin vs plan" value={gm} set={setGm} min={-6} max={6} step={.5} fmt={x => (x > 0 ? '+' : '') + x + ' pts'} />
        <Slider label="CAC vs plan" value={cac} set={setCac} min={70} max={150} step={5} fmt={x => x + '%'} />
        <Slider label="Fixed costs vs plan" value={fx} set={setFx} min={70} max={130} step={5} fmt={x => x + '%'} />
        <button onClick={() => { setVol(100); setAsp(80000); setGm(0); setCac(100); setFx(100); }} className="mt-5 rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-bg">Reset to base case</button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Quarterly EBITDA" sub="Rs Cr"><Bars labels={Q} values={R.map(r => r.e)} colors={q => q >= 0 ? C.brand : C.bad} fmt={q => q.toFixed(1)} /></Card>
          <Card title="Cumulative EBITDA" sub="Rs Cr, the cash the business consumes"><Line labels={Q} values={R.map(r => r.cum)} color={C.bad} fmt={q => q.toFixed(0)} /></Card>
        </div>
        <Note tone={m.be < 0 || !ok ? 'bad' : 'ok'}>{m.be < 0 ? 'No breakeven inside 24 months with these assumptions. Cut fixed cost, lift volume or margin, or lower CAC.' : ok ? `Breakeven in Q${m.be + 1}, and the total need of ${cr(m.need)} fits inside the \u20B945 Cr raise.` : `Breakeven reached in Q${m.be + 1}, but the cash need exceeds the raise by ${cr(m.need - RAISE)}.`}</Note>
      </div>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <Card title="What one scooter earns at Q8" sub="Rupees per unit"><Water max={asp * 1.05} ml="w-24" rows={[{ l: 'Net price', a: 0, b: asp, c: C.grey, t: inr(asp) }, { l: 'Cost of goods', a: gp, b: asp, c: C.bad, t: '-' + inr(asp - gp) }, { l: 'Gross profit', a: 0, b: gp, c: C.brand2, t: inr(gp) }, { l: 'Acquisition', a: gp - mk, b: gp, c: C.bad, t: '-' + inr(mk) }, { l: 'Logistics', a: gp - mk - lg, b: gp - mk, c: C.bad, t: '-' + inr(lg) }, { l: 'Contribution', a: 0, b: Math.max(co, 0), c: co >= 0 ? C.brand : C.bad, t: inr(co) }]} /></Card>
      <Card title="Where the Rs 45 Cr goes" sub="Modelled uses of funds"><Donut items={[{ n: 'Losses to breakeven', v: -m.tr, c: C.bad, t: cr(-m.tr) }, { n: 'Capex', v: CAPEX, c: C.accent, t: cr(CAPEX) }, { n: 'Working capital', v: R[7].nwc, c: C.info, t: cr(R[7].nwc) }, { n: 'Buffer', v: buf, c: C.grey, t: cr(buf) }]} center={[cr(m.need), 'cash need']} /></Card>
      <Card title="Q8 EBITDA vs volume" sub="Rs Cr, other assumptions held"><Bars labels={['60', '70', '80', '90', '100', '110', '120', '130']} values={sens} colors={q => q >= 0 ? C.brand : C.bad} fmt={q => q.toFixed(1)} h={230} /></Card>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <Prose items={[
        ['What drives the result', 'Volume grows 3.7 times from year 1 to year 2 as each city that clears its gate adds sales. Gross margin climbs through local sourcing and cell volume, CAC falls as referrals replace paid media, and fixed costs rise slower than revenue.'],
        ['How it can go wrong', 'A 10% volume miss still leaves Q8 marginally positive. A 20% miss pushes breakeven past month 24 unless fixed costs fall. Cell prices, the end of central subsidies and a price response from TVS or Bajaj are the main outside risks. The model assumes no subsidy and no price war.'],
        ['What this is', 'Team-model figures built from the case brief, not company data. The raise covers peak loss, about \u20B912 Cr capex and 20 days of working capital, so NBFC-funded retail finance and franchise-funded stock are essential.']
      ]} />
      <div className="scrollx rounded-2xl border border-line bg-surface"><table className="w-full min-w-[640px] text-[12.5px]"><thead><tr className="bg-surface2 text-[11px] uppercase tracking-wider text-muted"><th className="p-2.5 text-left">Rs Cr</th>{Q.map(q => <th key={q} className="p-2.5 text-right">{q}</th>)}<th className="p-2.5 text-right">Y1</th><th className="p-2.5 text-right">Y2</th></tr></thead><tbody>
        {[['Units', 'u', num], ['Revenue', 'rev', x => x.toFixed(1)], ['Gross profit', 'gp', x => x.toFixed(1)], ['Marketing', 'mk', x => x.toFixed(1)], ['Logistics', 'lg', x => x.toFixed(1)], ['Fixed costs', 'fx', x => x.toFixed(1)], ['EBITDA', 'e', x => x.toFixed(1)]].map(([l, k, f]) => <tr key={k} className={`border-t border-line ${k === 'e' ? 'bg-brand/10 font-semibold' : ''}`}><td className="p-2.5">{l}</td>{R.map((r, i) => <td key={i} className={`p-2.5 text-right font-mono ${r[k] < 0 ? 'text-bad' : ''}`}>{f(r[k])}</td>)}<td className="p-2.5 text-right font-mono">{f(sum(R, 0, 4, k))}</td><td className="p-2.5 text-right font-mono">{f(sum(R, 4, 8, k))}</td></tr>)}</tbody></table></div>
    </div>
    <Pager route="money" />
  </div>;
}

/* ======================== SOURCES ======================== */
function Sources() {
  const tag = { Sourced: 'bg-brand/15 text-brand', Case: 'bg-info/15 text-info', Assumption: 'bg-accent/15 text-accent', Verify: 'bg-bad/15 text-bad' };
  return <div className="mx-auto max-w-7xl px-5">
    <Head n="07 / Sources" title="Every number is sourced, from the brief, or a labelled assumption" lede="Small tags such as S1 across the site point here. Where a figure is a team assumption or comes from working notes, it says so, so you know what to verify before submitting." />
    <div className="scrollx rounded-2xl border border-line bg-surface"><table className="w-full min-w-[760px] text-[13.5px]"><thead><tr className="bg-surface2 text-left text-[11px] uppercase tracking-wider text-muted"><th className="p-3">ID</th><th className="p-3">Source</th><th className="p-3">Date</th><th className="p-3">Used for</th><th className="p-3">Status</th></tr></thead><tbody>
      {SOURCES.map(s => <tr key={s[0]} className="border-t border-line align-top"><td className="p-3 font-mono font-semibold text-brand">{s[0]}</td><td className="p-3">{s[1]}{s[2] && <><br /><a className="text-xs text-brand underline" href={s[2]} target="_blank" rel="noopener noreferrer">{s[2].replace('https://', '').slice(0, 54)}</a></>}</td><td className="p-3 text-muted">{s[3]}</td><td className="p-3 text-muted">{s[4]}</td><td className="p-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tag[s[5]]}`}>{s[5]}</span></td></tr>)}</tbody></table></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <Prose items={[
        ['Known differences between sources', 'IBEF counts 29,151 public charging stations at December 2025, while BBC cites more than 10,000. Definitions probably differ, so quote one with its source. IBEF\'s FY26 penetration (8.62%) and NITI Aayog\'s 2024 figure (7.66%) cover different years.'],
        ['Left out on purpose', 'Earlier drafts carried a rupee market size, a 70% CAC reduction, a 28% gross margin and an LTV figure. None had a source or reconciled with the model. Add them back only with a reference.']
      ]} />
      <div className="rounded-2xl border border-line bg-surface p-5"><h3 className="font-display text-lg font-semibold">Key model assumptions</h3><dl className="mt-3 divide-y divide-line text-[13.5px]">{[['Net price per scooter', '\u20B980,000'], ['Units, year 1 and 2', '6,000 and 22,000'], ['Mix (Base, Cargo, Pro-Fleet)', '40%, 25%, 35%'], ['Gross margin, Q1 to Q8', '14% to 22.5%'], ['CAC, Q1 to Q8', '\u20B910,000 to \u20B96,000'], ['Fixed costs, Y1 and Y2', '\u20B914 Cr and \u20B922 Cr'], ['Capex', '\u20B912 Cr'], ['Working capital', '20 days of revenue'], ['Central subsidy', 'None assumed']].map(([a, b]) => <div key={a} className="flex justify-between py-2"><dt className="text-muted">{a}</dt><dd className="font-mono">{b}</dd></div>)}</dl></div>
    </div>
    <Pager route="sources" />
  </div>;
}

/* ======================== APP ======================== */
const VIEWS = { home: Home, market: Market, growth: Growth, buyers: Buyers, circle: Circle, range: Range, money: Money, sources: Sources };
export default function App() {
  const read = () => { const h = location.hash.replace('#', ''); return VIEWS[h] ? h : 'home'; };
  const [route, setRoute] = useState(read), [theme, setTheme] = useState(() => { try { return localStorage.getItem('sg-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) { return 'light'; } });
  useEffect(() => { const f = () => { setRoute(read()); window.scrollTo(0, 0); }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('sg-theme', theme); } catch (e) {} }, [theme]);
  const View = VIEWS[route];
  return <div className="min-h-screen">
    <Nav route={route} theme={theme} setTheme={setTheme} />
    <main key={route} className="animate-fadeUp pb-20"><View /></main>
    <footer className="border-t border-line py-8 text-[13px] text-muted"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5"><span>SwadesiGo Growth OS &middot; Case Carnival 2025, NIT Rourkela</span><span>Figures tagged S7 and S8 are team assumptions or working notes, not company data.</span></div></footer>
  </div>;
}
