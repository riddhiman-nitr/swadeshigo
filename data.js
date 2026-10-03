export const FACTORS = ['Market size', 'Customer fit', 'EV readiness', 'Whitespace', 'Service'];
export const W0 = [25, 25, 20, 20, 10];
// n, state, hub, wave, lead, ratings[5] (team estimates 1-5), lon, lat
export const CITIES = [
  { n: 'Jaipur', st: 'Rajasthan', hub: 'North', wave: 1, lead: 'Delivery partners', r: [4, 5, 4, 4, 4], lon: 75.79, lat: 26.91 },
  { n: 'Indore', st: 'Madhya Pradesh', hub: 'West-Central', wave: 1, lead: 'Students, small business', r: [3.5, 5, 4, 4, 4], lon: 75.86, lat: 22.72 },
  { n: 'Coimbatore', st: 'Tamil Nadu', hub: 'South', wave: 1, lead: 'Small business', r: [3.5, 4.5, 4, 4, 3.5], lon: 76.96, lat: 11.02 },
  { n: 'Lucknow', st: 'Uttar Pradesh', hub: 'North', wave: 1, lead: 'Delivery, small business', r: [4.5, 4, 3, 4, 3.5], lon: 80.95, lat: 26.85 },
  { n: 'Bhubaneswar', st: 'Odisha', hub: 'East', wave: 1, lead: 'Students, delivery', r: [3, 4, 4.5, 4, 3.5], lon: 85.82, lat: 20.3 },
  { n: 'Ahmedabad', st: 'Gujarat', hub: 'West-Central', wave: 2, lead: 'Small business', r: [4, 4, 4, 3, 3.5], lon: 72.57, lat: 23.02 },
  { n: 'Kochi', st: 'Kerala', hub: 'South', wave: 2, lead: 'Commuters, students', r: [3, 3.5, 5, 3, 4], lon: 76.27, lat: 9.93 },
  { n: 'Pune', st: 'Maharashtra', hub: 'West-Central', wave: 2, lead: 'Students', r: [4.5, 3.5, 4, 2, 4], lon: 73.86, lat: 18.52 },
  { n: 'Hyderabad', st: 'Telangana', hub: 'South', wave: 2, lead: 'Delivery fleets', r: [4.5, 3.5, 3.5, 2, 3.5], lon: 78.49, lat: 17.39 },
  { n: 'Bengaluru', st: 'Karnataka', hub: 'South', wave: 2, lead: 'Professionals, fleets', r: [5, 3, 4, 1, 3.5], lon: 77.59, lat: 12.97 },
  { n: 'Nagpur', st: 'Maharashtra', hub: '', wave: 0, lead: '', r: [3, 3, 3.5, 3.5, 3.5], lon: 79.09, lat: 21.15 },
  { n: 'Surat', st: 'Gujarat', hub: '', wave: 0, lead: '', r: [3.5, 3, 3.5, 3, 3.5], lon: 72.83, lat: 21.17 },
  { n: 'Bhopal', st: 'Madhya Pradesh', hub: '', wave: 0, lead: '', r: [3, 3.5, 3, 3.5, 3.5], lon: 77.41, lat: 23.26 },
  { n: 'Patna', st: 'Bihar', hub: '', wave: 0, lead: '', r: [3, 3.5, 3, 3.5, 3], lon: 85.14, lat: 25.59 }
];
export const U = [500, 1000, 1800, 2700, 3600, 4800, 6000, 7600];
export const FX = [3.0, 3.3, 3.6, 4.1, 4.8, 5.2, 5.6, 6.4];
export const GM = [.14, .15, .165, .18, .195, .205, .215, .225];
export const CAC = [10000, 9500, 9000, 8200, 7400, 6800, 6300, 6000];
export const LG = [2600, 2500, 2400, 2300, 2300, 2200, 2200, 2200];
export const CAPEX = 12, RAISE = 45;
export const PRICE = { base: 74999, cargo: 89999, fleet: 99999 };
export const TIER = { base: 'Base', cargo: 'Cargo', fleet: 'Pro-Fleet' };
export const RATED = { base: 85, cargo: 105, fleet: 135 };

export const inr = n => '\u20B9' + Math.round(n).toLocaleString('en-IN');
export const num = n => Math.round(n).toLocaleString('en-IN');
export const cr = (n, d = 1) => '\u20B9' + n.toFixed(d) + ' Cr';
export const sum = (rows, a, b, k) => rows.slice(a, b).reduce((s, r) => s + r[k], 0);

export function model(p = {}) {
  const v = p.vol ?? 1, a = p.asp ?? 80000, g = p.gm ?? 0, c = p.cac ?? 1, f = p.fx ?? 1;
  let cum = 0, tr = 0;
  const rows = U.map((u0, i) => {
    const u = u0 * v, rev = u * a / 1e7, gp = rev * (GM[i] + g / 100), mk = u * CAC[i] * c / 1e7, lg = u * LG[i] / 1e7;
    const co = gp - mk - lg, fx = FX[i] * f, e = co - fx; cum += e; tr = Math.min(tr, cum);
    return { u, rev, gp, mk, lg, co, fx, e, cum, nwc: rev * 20 / 90 };
  });
  return { rows, tr, be: rows.findIndex(r => r.e > 0), need: -tr + CAPEX + rows[7].nwc };
}
export const BASE = model();

export const emi = (P, down, rate, n) => { const L = P * (1 - down / 100), r = rate / 1200; return r ? L * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : L / n; };

export function rr({ v, kg, t, tr, c, s, st }) {
  const r0 = RATED[v];
  const fl = kg > 75 ? 1 - .0022 * (kg - 75) : Math.min(1.025, 1 + .001 * (75 - kg));
  const ft = t < 20 ? 1 - .006 * (20 - t) : t > 35 ? 1 - .004 * (t - 35) : 1;
  const list = [['Load', fl], ['Temperature', ft], ['Traffic', { free: 1, mixed: .94, stop: .86 }[tr]], ['Climb', 1 - .003 * c], ['Battery health', s / 100], ['Riding style', { eco: 1.06, normal: 1, sport: .88 }[st]]];
  let cur = r0; const steps = [];
  list.forEach(([n, f]) => { const nx = cur * f; steps.push({ n, a: cur, b: nx }); cur = nx; });
  return { r0, real: cur, steps };
}

// stylised India outline (lon, lat), clockwise from the north-west
export const INDIA = [[74.0,34.8],[73.7,36.9],[75.9,37.0],[77.8,35.5],[79.0,34.9],[80.2,35.4],[79.6,33.0],[78.7,31.6],[79.2,30.4],[80.2,30.0],[81.0,30.2],[80.1,28.9],[82.5,27.8],[84.1,27.3],[86.0,26.6],[88.0,26.4],[88.2,27.9],[89.1,27.3],[90.2,26.8],[92.0,27.0],[93.4,28.6],[95.0,29.3],[96.7,28.5],[97.3,27.9],[96.0,27.2],[95.4,26.0],[94.6,25.2],[94.3,23.9],[93.2,23.0],[92.7,22.0],[92.2,23.7],[91.6,24.2],[91.2,25.1],[90.3,25.2],[89.8,26.0],[89.0,26.5],[88.4,25.2],[88.8,24.0],[88.9,22.0],[87.0,21.5],[86.5,20.2],[85.0,19.4],[84.0,18.4],[82.3,16.6],[81.0,15.9],[80.2,15.3],[80.3,13.3],[79.8,11.4],[79.3,10.3],[78.2,8.9],[77.6,8.1],[76.6,8.9],[75.8,11.2],[74.8,13.2],[74.0,15.2],[73.4,17.0],[72.8,19.0],[72.7,20.7],[72.6,21.5],[72.0,21.0],[70.4,20.9],[69.0,22.2],[68.8,23.1],[70.0,23.3],[70.2,24.4],[69.5,24.3],[70.5,25.7],[70.2,26.5],[70.9,27.7],[71.9,28.0],[72.9,29.0],[74.0,30.0],[74.6,31.0],[74.8,32.4],[74.3,33.2]];

export const SOURCES = [
  ['S1', 'IBEF, Electric Vehicle Industry in India: Growth, Trends and Policy', 'https://www.ibef.org/industry/electric-vehicle', 'Updated Sep 2026', 'FY18 to FY26 registrations, FY26 penetration, March 2026 E2W sales, state penetration CY2025, charging stations, GST cut', 'Sourced'],
  ['S2', 'NITI Aayog (Government of India), Unlocking a $200 Billion Opportunity: Electric Vehicles in India', '', 'Aug 2025', 'India vs global penetration 2024, 2030 target, two-wheeler share of fleet, home charging, TCO and financing barriers', 'Sourced'],
  ['S3', 'BBC News, Costly fuel pushes more Indians to buy electric cars but challenges remain', 'https://www.bbc.com/news/articles/cx21181yq4no', '3 Jun 2026', 'Oil import share, pump prices, CAFE-3, charger concentration, range anxiety, lithium and rare-earth dependence', 'Sourced'],
  ['S4', 'BCG, The 2026 Global Automotive Supplier Study', 'https://www.bcg.com/publications/2026/the-2026-global-automotive-supplier-study', '5 Mar 2026', 'Growth rates of battery and EV powertrain parts, software, ICE decline', 'Sourced'],
  ['S5', 'Business Standard, on the BCG and ACMA auto-component report', 'https://www.business-standard.com/industry/auto/stellantis-tata-motors-jv-20-years-new-mou-collaboration-126021001488_1.html', 'Feb 2026', '$80 billion to $200 billion auto-component target by 2030; charging as the main barrier', 'Sourced'],
  ['S6', 'Case brief, Case Carnival 2025, Analytics and Consulting Club, NIT Rourkela', '', '2025', 'Company background, the three questions, buyer profiles, judging criteria', 'Case'],
  ['S7', 'Team model and scoring (editable in src/data.js)', '', 'Oct 2026', 'City ratings, volumes, prices, margins, CAC, fixed costs, EMI terms, Champion mix, RealRange coefficients', 'Assumption'],
  ['S8', 'Team working notes (state E2W penetration cited to Deloitte; rival prices and margins from public listings)', '', 'Mixed periods', 'State E2W chart, rival prices and gross margins', 'Verify']
];
