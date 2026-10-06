'use strict';
/* ============ dữ liệu & hằng số ============ */
const $ = (s, e = document) => e.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
const REC = DATA.rec, ING = DATA.ing, BY = Object.fromEntries(REC.map(r => [r.id, r]));
REC.forEach(r => { r._s = norm(r.n + ' ' + r.i.map(([i]) => ING[i].n).join(' ')); });
{ const seed = new Date().toISOString().slice(0, 10); REC.forEach(r => { let h = 7; for (const c of r.id + seed) h = (h * 31 + c.charCodeAt(0)) >>> 0; r._o = h; }); }
const RICE = REC.find(r => r.n.startsWith('Cơm trắng')).id;

const GROUPS = [
  ['heo', '🐖', 'Heo', '#e58a8a'], ['ga', '🍗', 'Gà', '#f0b455'], ['vit', '🦆', 'Vịt & Ngan', '#b9895b'], ['bo', '🐂', 'Bò & Trâu', '#b5523b'],
  ['ca', '🐟', 'Cá', '#5f9fc0'], ['haisan', '🦐', 'Tôm & Hải sản', '#4cb3a5'], ['trung', '🥚', 'Trứng', '#f2d04c'],
  ['dauhu', '🍄', 'Đậu phụ & Nấm', '#a58cc4'], ['rau', '🥬', 'Rau củ', '#6fae4f'], ['canh', '🍲', 'Canh', '#e8a33d'], ['ngot', '🍰', 'Tráng miệng', '#e17a93'], ['nuoc', '🍜', 'Bún · Phở · Mì · Cơm', '#d9822b']];
const GM = Object.fromEntries(GROUPS.map(g => [g[0], { e: g[1], n: g[2], c: g[3] }]));
const ROLES = [['man', 'Món mặn'], ['rau', 'Món rau'], ['canh', 'Canh'], ['bat', 'Món một bát'], ['kem', 'Gỏi / ăn kèm'], ['ngot', 'Tráng miệng']];
const RM = Object.fromEntries(ROLES);
const METHODS = [['kho', 'Kho · Rim'], ['xao', 'Xào · Rang · Sốt'], ['chien', 'Chiên · Rán'], ['hap', 'Luộc · Hấp'], ['nuong', 'Nướng'], ['ham', 'Hầm · Om'], ['tron', 'Trộn · Cuốn'], ['canh', 'Nấu canh'], ['nuoc', 'Món nước'], ['com', 'Cơm']];
const MM = Object.fromEntries(METHODS);
const MOODS = [['met_moi', '😮‍💨', 'Mệt mỏi, cần sức'], ['cang_thang', '😣', 'Căng thẳng, cáu gắt'], ['am_bung', '🫖', 'Muốn ấm bụng'], ['nhat_mieng', '🤒', 'Nhạt miệng / mệt người'],
  ['luoi', '😴', 'Lười nấu'], ['thich', '😋', 'Muốn chiều bản thân'], ['nong', '🥵', 'Nóng trong người'], ['doi_vi', '✨', 'Muốn đổi vị']];
const MD = Object.fromEntries(MOODS.map(m => [m[0], m]));
const PH = {
  menstrual: { e: '🩸', n: 'Đang hành kinh', s: 'Hành kinh', range: 'Ngày 1–5',
    d: 'Cơ thể mất máu và dễ mệt, lạnh bụng. Nên ưu tiên món nóng, dễ tiêu, giàu sắt: thịt bò, mộc nhĩ, rau dền, rau ngót, nghêu hàu, trứng vịt lộn; gừng, sả giúp ấm bụng. Hạn chế đồ sống lạnh, nước đá, quá cay và quá mặn.' },
  follicular: { e: '🌱', n: 'Sau kinh (nang trứng)', s: 'Sau kinh', range: 'Ngày 6–12',
    d: 'Năng lượng tăng dần, cơ thể cần phục hồi sau mất máu. Nên ăn đủ đạm (thịt nạc, cá, trứng, đậu phụ), thêm thực phẩm giàu sắt và vitamin C (rau củ nhiều màu) để hấp thu tốt hơn.' },
  ovulation: { e: '🌼', n: 'Rụng trứng', s: 'Rụng trứng', range: 'Khoảng ngày 13–15',
    d: 'Năng lượng thường ở mức cao. Hợp món nhẹ bụng, nhiều rau tươi và chất xơ, cá giàu omega-3, trái cây, các loại hạt.' },
  luteal: { e: '🌙', n: 'Trước kỳ kinh (PMS)', s: 'Trước kỳ', range: 'Khoảng ngày 16–28',
    d: 'Dễ thèm ngọt, đầy hơi, cáu gắt, mệt mỏi. Nên bổ sung magie (rau lá xanh, đậu, hạt, cá), vitamin B6 (gà, cá, khoai), tinh bột tốt (khoai, bí đỏ, cơm gạo lứt). Giảm món quá mặn, chiên rán và đồ ngọt.' }
};
const CUIS = [['vn', '🍲', 'Việt Nam'], ['jp', '🍣', 'Nhật'], ['cn', '🥢', 'Trung'], ['kr', '🥘', 'Hàn'], ['th', '🌶️', 'Thái'], ['sea', '🥥', 'Đông Nam Á'], ['in', '🍛', 'Ấn Độ'], ['me', '🧆', 'Trung Đông & Phi'], ['med', '🫒', 'Địa Trung Hải'], ['eu', '🥖', 'Âu'], ['ru', '🥟', 'Nga & Đông Âu'], ['us', '🍔', 'Mỹ & Anh'], ['latin', '🌮', 'Latinh']];
const CM = Object.fromEntries(CUIS.map(c => [c[0], c]));
const OCC = [['tl', '🍱', 'Tiện lợi, cầm tay, mang đi'], ['dt', '💕', 'Date night / tiếp khách']];
const OM = Object.fromEntries(OCC.map(o => [o[0], o]));
const SLOTS = [['sang', 'Sáng', '🌅'], ['trua', 'Trưa', '☀️'], ['toi', 'Tối', '🌙']];
const DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const AIS = { thit: '🥩 Thịt', ca: '🐟 Cá & hải sản', trung: '🥚 Trứng & đậu phụ', sua: '🧀 Sữa, bơ, phô mai', rau: '🥬 Rau xanh & rau thơm', cu: '🥕 Củ, quả & trái cây', nam: '🍄 Nấm', bot: '🍜 Tinh bột, bún, mì', gv: '🧂 Gia vị & đồ khô', kho: '🥫 Đồ khô' };
const DIETS = [['chay', '🌱 Ăn chay (không thịt, cá, nước mắm)'], ['noSea', 'Không hải sản (cá, tôm, mực…)'], ['noEgg', 'Không trứng'], ['noNut', 'Không đậu phộng / hạt'],
  ['noDairy', 'Không sữa / phô mai / bơ'], ['noPork', 'Không thịt heo'], ['noBeef', 'Không thịt bò / trâu'], ['lowSalt', 'Ít mặn (bỏ món nhiều nước mắm, đồ muối)'], ['noHot', 'Không cay']];
const TIPS_OK = new Set(['toi', 'hanh_tim', 'hanh_la', 'ot', 'gung']);

/* ============ trạng thái ============ */
const KEY = 'bepnha.v1';
const DEF = { people: 3, target: 1800, phase: null, auto: false, cycle: { start: '', len: 28, per: 5 }, moods: [], diet: {}, fav: {}, basket: {}, plan: {}, fridge: null,
  bought: {}, hist: {}, hidePantry: true, incPlan: true, tab: 'mon', optCycle: true, optQuick: false, theme: 'auto' };
let S;
try { S = { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (e) { S = { ...DEF }; }
S.cycle = { ...DEF.cycle, ...(S.cycle || {}) };
if (!S.fridge) S.fridge = Object.fromEntries([...TIPS_OK].map(i => [i, 1]));
let saveT;
const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }, 150); };
const F = { q: '', oc: [], c: [], g: [], r: [], m: [], t: 0, d: 0, mood: [], ph: '', fav: false, sort: 'goi-y', n: 48, open: false };
let M = null;      // modal hiện tại {type, ...}
let TODAY = { meal: null };
let FR = { q: '' };

/* ============ tiện ích ============ */
const isoDay = d => { const x = d || new Date(); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
const daysAgo = iso => Math.floor((new Date(isoDay() + 'T00:00:00') - new Date(iso + 'T00:00:00')) / 864e5);
const toggle = (arr, v) => { const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const nfmt = n => Math.round(n).toLocaleString('vi-VN');
const isSeas = id => ING[id].a === 'gv' || ING[id].pan;
const qtxt = (x, sp) => { const k = sp ? 4 : 2, q = Math.max(1 / k, Math.round(x * k) / k), w = Math.floor(q), f = q - w, fs = { 0: '', .25: '¼', .5: '½', .75: '¾' }[f]; return (w || '') + fs; };
function fmtQty(id, q, shop) {
  const u = ING[id].u;
  if (u === 'g') { if (q >= 1000) return (q / 1000).toFixed(1).replace('.', ',').replace(',0', '') + ' kg'; q = shop ? (q < 100 ? Math.ceil(q / 10) * 10 : Math.ceil(q / 50) * 50) : (q < 20 ? Math.max(1, Math.round(q)) : Math.round(q / 5) * 5); return q + ' g'; }
  if (u === 'ml') { if (q >= 1000) return (q / 1000).toFixed(1).replace('.', ',') + ' lít'; return (shop ? Math.ceil(q / 50) * 50 : Math.round(q / 10) * 10) + ' ml'; }
  if (shop && !['muỗng canh', 'muỗng cà phê'].includes(u)) return Math.ceil(q - 1e-6) + ' ' + u;
  return qtxt(q, u.startsWith('muỗng')) + ' ' + u;
}
function toast(msg) { const t = $('#toast'), d = document.createElement('div'); d.textContent = msg; t.appendChild(d); setTimeout(() => d.remove(), 2600); }
async function copyText(txt, title) {
  try { if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) { await navigator.share({ title, text: txt }); return; } } catch (e) { if (e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(txt); toast('Đã sao chép, dán vào Zalo / Messenger / Ghi chú'); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Đã sao chép'); } catch (_) { toast('Không sao chép được'); } ta.remove(); }
}

/* ============ chu kỳ & gợi ý ============ */
function autoPhase() {
  const c = S.cycle; if (!c.start) return null;
  const d0 = new Date(c.start + 'T00:00:00'), now = new Date(isoDay() + 'T00:00:00');
  let day = Math.floor((now - d0) / 864e5); if (day < 0) return null;
  day = day % c.len + 1; const ov = c.len - 14; let ph;
  if (day <= c.per) ph = 'menstrual'; else if (day < ov - 1) ph = 'follicular'; else if (day <= ov + 1) ph = 'ovulation'; else ph = 'luteal';
  return { ph, day };
}
const curPhase = () => { if (S.auto) { const a = autoPhase(); if (a) return a.ph; } return S.phase; };
function dietOK(r) {
  const d = S.diet, t = r.tg;
  if (d.chay && !r.chay) return false; if (d.noSea && t.includes('s')) return false; if (d.noEgg && t.includes('e')) return false; if (d.noNut && t.includes('n')) return false;
  if (d.noDairy && t.includes('d')) return false;
  if (d.noPork && t.includes('pk')) return false; if (d.noBeef && t.includes('bf')) return false; if (d.lowSalt && r.feat.salty) return false; if (d.noHot && r.feat.hot) return false;
  return true;
}
function score(r, ctx) {
  let s = Math.random() * 1.2;
  if (ctx.ph && r.ph[ctx.ph]) s += 3;
  for (const m of ctx.moods || []) if (r.mo.includes(m)) s += 2;
  if (ctx.moods && ctx.moods.includes('luoi') && r.t > 30) s -= 3;
  if (ctx.quick && r.t > 30) s -= 2;
  if (S.fav[r.id]) s += .7;
  const h = S.hist[r.id]; if (h && daysAgo(h) < 4) s -= 3;
  return s;
}
function why(r, ph, moods) {
  const out = [];
  if (ph && r.ph[ph]) out.push(`${PH[ph].e} ${r.ph[ph].slice(0, 2).join('; ')}`);
  const mm = (moods || []).filter(m => r.mo.includes(m)).map(m => MD[m][1] + ' ' + MD[m][2].toLowerCase());
  if (mm.length) out.push('Hợp khi: ' + mm.join(', '));
  return out;
}
const ctxNow = () => ({ ph: curPhase(), moods: S.moods });
function pickBest(list, ctx, avoid = new Set()) {
  let best = null, bs = -1e9;
  for (const r of list) { if (avoid.has(r.id)) continue; const s = score(r, ctx); if (s > bs) { bs = s; best = r; } }
  return best;
}

/* ============ lọc ============ */
function match(r) {
  if (!dietOK(r)) return false;
  if (F.q) { const toks = norm(F.q).split(/\s+/).filter(Boolean); if (!toks.every(t => r._s.includes(t))) return false; }
  if (F.oc.length && !F.oc.some(o => r.oc.includes(o))) return false;
  if (F.c.length && !F.c.includes(r.cu)) return false;
  if (F.g.length && !F.g.includes(r.g)) return false;
  if (F.r.length && !F.r.includes(r.r)) return false;
  if (F.m.length && !F.m.includes(r.m)) return false;
  if (F.t && r.t > F.t) return false;
  if (F.d && r.d !== F.d) return false;
  if (F.mood.length && !F.mood.some(m => r.mo.includes(m))) return false;
  if (F.ph && !r.ph[F.ph]) return false;
  if (F.fav && !S.fav[r.id]) return false;
  return true;
}
function results() {
  const L = REC.filter(match), ctx = { ph: F.ph || null, moods: F.mood };
  const by = { 'goi-y': (a, b) => (ctx.ph || ctx.moods.length) ? score(b, ctx) - score(a, ctx) : a._o - b._o, nhanh: (a, b) => a.t - b.t, 'it-calo': (a, b) => a.k - b.k, dam: (a, b) => b.p - a.p, az: (a, b) => a.n.localeCompare(b.n, 'vi') };
  return L.sort(by[F.sort] || by['goi-y']);
}

/* ============ giao diện chung ============ */
function renderTop() {
  $('#top').innerHTML = `<div class="brand"><div class="logo">🍲</div><div>Bếp Nhà<small>Hôm nay ăn gì?</small></div></div><div class="grow"></div>
  <div class="stepper" aria-label="Số người ăn"><button data-act="people" data-d="-1" aria-label="Giảm">−</button><span>👥 ${S.people} người</span><button data-act="people" data-d="1" aria-label="Tăng">+</button></div>
  <button class="iconbtn" data-act="settings" aria-label="Cài đặt">⚙️</button>`;
}
function renderTabs() {
  const nb = Object.keys(S.basket).length, T = [['mon', '🍚', 'Món ăn', 0], ['homnay', '🌸', 'Hôm nay', 0], ['tuan', '📅', 'Thực đơn', 0], ['cho', '🛒', 'Đi chợ', nb], ['tulanh', '🧊', 'Tủ lạnh', 0]];
  $('#tabs').innerHTML = T.map(t => `<button class="tab" role="tab" data-act="tab" data-t="${t[0]}" aria-selected="${S.tab === t[0]}"><span class="ic">${t[1]}</span>${t[2]}${t[3] ? `<span class="badge">${t[3]}</span>` : ''}</button>`).join('');
}
function render() {
  renderTop(); renderTabs();
  const v = { mon: viewBrowse, homnay: viewToday, tuan: viewPlan, cho: viewShop, tulanh: viewFridge }[S.tab] || viewBrowse;
  $('#view').innerHTML = v();
  if (S.tab === 'mon') renderResults();
}
const chip = (act, attrs, on, label, cls = '') => `<button class="chip ${cls}" data-act="${act}" ${attrs} aria-pressed="${!!on}">${label}</button>`;
function tagsOf(r) {
  const t = []; r.oc.forEach(o => t.push(`<span class="tag chili">${OM[o][1]} ${o === 'tl' ? 'Tiện lợi' : 'Date night'}</span>`)); if (r.cu !== 'vn') t.push(`<span class="tag honey">${CM[r.cu][1]} ${CM[r.cu][2]}</span>`); t.push(`<span class="tag">${MM[r.m]}</span>`);
  if (r.r !== 'man') t.push(`<span class="tag sky">${RM[r.r]}</span>`);
  if (r.chay) t.push('<span class="tag leaf">🌱 Chay</span>');
  const ph = curPhase(); if (ph && r.ph[ph]) t.push(`<span class="tag rose">${PH[ph].e} Hợp ${PH[ph].s.toLowerCase()}</span>`);
  if (r.t <= 15) t.push('<span class="tag honey">⚡ Nhanh</span>');
  return t.slice(0, 4).join('');
}
function card(r, extra) {
  const g = GM[r.g], fav = S.fav[r.id], inB = S.basket[r.id], h = S.hist[r.id];
  return `<article class="card"><div class="band" style="background:${g.c}"></div>
  <div class="body" data-act="open" data-id="${r.id}"><span class="emo">${g.e}</span><h3>${esc(r.n)}</h3>
  <div class="meta"><span>⏱ <b>${r.t}'</b></span><span>🔥 <b>${r.k}</b> kcal</span><span>${['', 'Dễ', 'Vừa', 'Khó'][r.d]}</span>${h && daysAgo(h) < 30 ? `<span>🍳 ${daysAgo(h) ? daysAgo(h) + ' ngày trước' : 'hôm nay'}</span>` : ''}</div>
  <div class="tags">${tagsOf(r)}</div>${extra ? `<div class="note" style="margin-top:8px">${extra}</div>` : ''}</div>
  <div class="foot"><button class="btn sm favbtn" style="flex:0 0 40px" data-act="fav" data-id="${r.id}" aria-pressed="${!!fav}" aria-label="Yêu thích">${fav ? '♥' : '♡'}</button>
  <button class="btn sm ${inB ? 'leaf' : ''}" data-act="basket" data-id="${r.id}">${inB ? '✓ Trong giỏ' : '🛒 Đi chợ'}</button>
  <button class="btn sm" data-act="addplan" data-id="${r.id}">📅 Thực đơn</button></div></article>`;
}

/* ============ Món ăn ============ */
function viewBrowse() {
  const nf = F.oc.length + F.c.length + F.g.length + F.r.length + F.m.length + (F.t ? 1 : 0) + (F.d ? 1 : 0) + F.mood.length + (F.ph ? 1 : 0) + (F.fav ? 1 : 0) + Object.values(S.diet).filter(Boolean).length;
  return `<div class="h-sec"><h2>Chọn món</h2><p>${REC.length} món: cơm nhà Việt và món Nhật, Hàn, Trung, Âu… dễ nấu · lọc theo nhóm thực phẩm và cách nấu</p></div>
  <div class="browse"><aside class="filters ${F.open ? 'open' : ''}" id="filters">${filtersHTML()}</aside>
  <section><div class="row" style="margin-bottom:10px"><div class="search" style="flex:1;min-width:200px"><input id="q" type="search" placeholder="Tìm món hoặc nguyên liệu (vd: cà chua, gà, sả…)" value="${esc(F.q)}" aria-label="Tìm món"></div>
  <button class="btn f-toggle" data-act="ftoggle">⚙ Bộ lọc${nf ? ` (${nf})` : ''}</button></div>
  <div class="qrow" id="qrow">${qrowHTML()}</div>
  <div class="resbar"><span class="count" id="count"></span><span class="grow"></span><label class="note" for="sort">Sắp xếp</label>
  <select id="sort" class="select" data-bind="sort">${[['goi-y', 'Gợi ý'], ['nhanh', 'Nhanh nhất'], ['it-calo', 'Ít calo nhất'], ['dam', 'Nhiều đạm nhất'], ['az', 'A → Z']].map(o => `<option value="${o[0]}" ${F.sort === o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div>
  <div id="results"></div></section></div>`;
}
const qrowHTML = () => OCC.map(g => chip('fl', `data-k="oc" data-v="${g[0]}"`, F.oc.includes(g[0]), `${g[1]} ${g[2].split(',')[0].split(' /')[0]}`)).join('') + CUIS.slice(1).map(g => chip('fl', `data-k="c" data-v="${g[0]}"`, F.c.includes(g[0]), `${g[1]} ${g[2]}`)).join('') + GROUPS.map(g => chip('fl', `data-k="g" data-v="${g[0]}"`, F.g.includes(g[0]), `${g[1]} ${g[2]}`)).join('');
function filtersHTML() {
  return `<div class="fgroup"><h4>Dịp / kiểu dùng</h4><div class="chips">${OCC.map(g => chip('fl', `data-k="oc" data-v="${g[0]}"`, F.oc.includes(g[0]), `${g[1]} ${g[2]}`)).join('')}</div></div>
  <div class="fgroup"><h4>Ẩm thực</h4><div class="chips">${CUIS.map(g => chip('fl', `data-k="c" data-v="${g[0]}"`, F.c.includes(g[0]), `${g[1]} ${g[2]}`)).join('')}</div></div>
  <div class="fgroup"><h4>Nhóm thực phẩm</h4><div class="chips">${GROUPS.map(g => chip('fl', `data-k="g" data-v="${g[0]}"`, F.g.includes(g[0]), `${g[1]} ${g[2]}`)).join('')}</div></div>
  <div class="fgroup"><h4>Vai trò trong bữa</h4><div class="chips">${ROLES.map(g => chip('fl', `data-k="r" data-v="${g[0]}"`, F.r.includes(g[0]), g[1])).join('')}</div></div>
  <div class="fgroup"><h4>Cách làm</h4><div class="chips">${METHODS.map(g => chip('fl', `data-k="m" data-v="${g[0]}"`, F.m.includes(g[0]), g[1])).join('')}</div></div>
  <div class="fgroup"><h4>Thời gian nấu</h4><div class="chips">${[[0, 'Bất kỳ'], [15, '≤ 15 phút'], [30, '≤ 30 phút'], [60, '≤ 1 giờ']].map(g => chip('fv', `data-k="t" data-v="${g[0]}"`, F.t === g[0], g[1])).join('')}</div></div>
  <div class="fgroup"><h4>Độ khó</h4><div class="chips">${[[0, 'Bất kỳ'], [1, 'Dễ'], [2, 'Vừa'], [3, 'Khó']].map(g => chip('fv', `data-k="d" data-v="${g[0]}"`, F.d === g[0], g[1])).join('')}</div></div>
  <div class="fgroup"><h4>Tâm trạng</h4><div class="chips">${MOODS.map(g => chip('fl', `data-k="mood" data-v="${g[0]}"`, F.mood.includes(g[0]), `${g[1]} ${g[2]}`)).join('')}</div></div>
  <div class="fgroup"><h4>Hợp với giai đoạn chu kỳ</h4><div class="chips">${Object.entries(PH).map(([k, v]) => chip('fv', `data-k="ph" data-v="${F.ph === k ? '' : k}"`, F.ph === k, `${v.e} ${v.s}`)).join('')}</div></div>
  <div class="fgroup"><h4>Khác</h4><div class="chips">${chip('fv', `data-k="fav" data-v="${F.fav ? '' : '1'}"`, F.fav, '♥ Yêu thích')}</div></div>
  <div class="fgroup"><h4>Chế độ ăn (áp dụng toàn app)</h4><div class="chips">${DIETS.map(d => chip('diet', `data-k="${d[0]}"`, S.diet[d[0]], d[1], 'leaf sm')).join('')}</div></div>
  <button class="btn sm ghost" data-act="fclear">Xóa bộ lọc</button>`;
}
function renderResults() {
  const L = results(), box = $('#results'); if (!box) return;
  $('#count').textContent = `${L.length} món`;
  if (!L.length) { box.innerHTML = `<div class="empty"><div class="big">🍳</div><p>Không có món nào khớp bộ lọc.</p><button class="btn" data-act="fclear">Xóa bộ lọc</button></div>`; return; }
  const ph = F.ph || null, ctx = { ph, moods: F.mood };
  box.innerHTML = `<div class="grid">${L.slice(0, F.n).map(r => card(r, (ph || F.mood.length) ? why(r, ph, F.mood).join('<br>') : '')).join('')}</div>${L.length > F.n ? `<button class="btn more" data-act="more">Xem thêm (${L.length - F.n} món nữa)</button>` : ''}`;
  const nf = $('#filters'); if (nf) nf.innerHTML = filtersHTML(); const qr = $('#qrow'); if (qr) qr.innerHTML = qrowHTML();
}

/* ============ chi tiết món ============ */
function ingList(r, n) {
  const sc = n / r.sv, main = r.i.filter(([i]) => !isSeas(i)), seas = r.i.filter(([i]) => isSeas(i));
  const li = (a, cls) => a.map(([i, q]) => `<li class="${cls}"><span>${esc(ING[i].n)}</span><span>${fmtQty(i, q * sc)}</span></li>`).join('');
  return `<ul class="ing">${li(main, '')}</ul>${seas.length ? `<h4 class="note" style="margin:12px 0 2px;text-transform:uppercase;letter-spacing:.05em">Gia vị</h4><ul class="ing">${li(seas, 'gv')}</ul>` : ''}`;
}
function dishModal() {
  const r = BY[M.id], n = M.n, g = GM[r.g], ph = curPhase();
  const phHtml = Object.keys(r.ph).length ? `<div class="sect"><h3>🌸 Hợp với giai đoạn chu kỳ</h3>${Object.entries(r.ph).map(([k, v]) => `<div class="callout rose" style="margin-bottom:6px"><b>${PH[k].e} ${PH[k].n}</b>: ${esc(v.join('; '))}</div>`).join('')}</div>` : '';
  const mo = r.mo.map(m => `<span class="tag">${MD[m][1]} ${MD[m][2]}</span>`).join(' ');
  return `<div class="ov" data-act="closeov"><div class="dlg" role="dialog" aria-modal="true" aria-label="${esc(r.n)}">
  <header><h2>${g.e} ${esc(r.n)}</h2><button class="iconbtn" data-act="close" aria-label="Đóng">✕</button></header>
  <div class="content">
    <div class="tags" style="margin-bottom:8px">${tagsOf(r)} <span class="tag">${GM[r.g].n}</span></div>
    <div class="stats"><div class="stat"><b>${r.t}'</b><small>Thời gian</small></div><div class="stat"><b>${['', 'Dễ', 'Vừa', 'Khó'][r.d]}</b><small>Độ khó</small></div>
    <div class="stat"><b>${r.k}</b><small>kcal / phần</small></div><div class="stat"><b>${r.p} g</b><small>đạm / phần</small></div></div>
    <div class="row" style="justify-content:space-between"><b>🛍 Nguyên liệu</b><div class="stepper sm"><button data-act="mn" data-d="-1" aria-label="Giảm">−</button><span>${n} phần</span><button data-act="mn" data-d="1" aria-label="Tăng">+</button></div></div>
    <p class="note" style="margin:4px 0 8px">Công thức gốc cho ${r.sv} phần · 1 phần ≈ lượng 1 người ăn kèm cơm</p>
    ${ingList(r, n)}
    <div class="sect"><h3>👩‍🍳 Cách làm</h3><ol class="steps">${r.s.map(s => `<li><div>${esc(s)}</div></li>`).join('')}</ol></div>
    ${r.tip ? `<div class="sect"><h3>💡 Mẹo</h3><div class="callout">${esc(r.tip)}</div></div>` : ''}
    ${r.sub ? `<div class="sect"><h3>🔁 Thay thế nguyên liệu</h3><div class="callout leaf">${esc(r.sub)}</div></div>` : ''}
    ${phHtml}${mo ? `<div class="sect"><h3>😊 Hợp khi bạn đang…</h3><div class="tags">${mo}</div></div>` : ''}
    <p class="note" style="margin-top:14px">Calo là ước tính từ nguyên liệu sống (sai số khoảng ±15%), chưa tính cơm ăn kèm.</p>
  </div>
  <footer><button class="btn" data-act="fav" data-id="${r.id}" style="flex:0 0 52px" aria-pressed="${!!S.fav[r.id]}">${S.fav[r.id] ? '♥' : '♡'}</button>
  <button class="btn ${S.basket[r.id] ? 'leaf' : ''}" data-act="basket" data-id="${r.id}" data-n="${n}">${S.basket[r.id] ? '✓ Trong giỏ' : '🛒 Đi chợ'}</button>
  <button class="btn" data-act="addplan" data-id="${r.id}">📅 Thực đơn</button>
  <button class="btn primary" data-act="cook" data-id="${r.id}">▶ Nấu ngay</button></footer></div></div>`;
}
function openDish(id) { M = { type: 'dish', id, n: S.people }; history.replaceState(null, '', '#/mon/' + id); showModal(); }
function showModal() {
  const el = $('#modal');
  if (!M) { el.innerHTML = ''; document.body.style.overflow = ''; return; }
  document.body.style.overflow = 'hidden';
  const keep = el.querySelector('.content')?.scrollTop || 0;
  el.innerHTML = { dish: dishModal, plan: planModal, pick: pickModal, settings: settingsModal }[M.type]();
  const c = el.querySelector('.content'); if (c) c.scrollTop = keep;
}
function closeModal() { M = null; if (location.hash) history.replaceState(null, '', location.pathname + location.search); showModal(); render(); }

/* ============ thêm vào thực đơn ============ */
const pget = (d, s) => ((S.plan[d] || {})[s]) || [];
function padd(d, s, id) { (S.plan[d] = S.plan[d] || {})[s] = [...pget(d, s), id]; save(); }
function prem(d, s, id) { const a = pget(d, s).slice(), i = a.indexOf(id); if (i >= 0) a.splice(i, 1); (S.plan[d] = S.plan[d] || {})[s] = a; save(); }
function planModal() {
  const r = BY[M.id];
  return `<div class="ov" data-act="closeov"><div class="dlg" role="dialog" aria-modal="true"><header><h2>📅 Thêm “${esc(r.n)}” vào…</h2><button class="iconbtn" data-act="close">✕</button></header>
  <div class="content"><p class="note">Bấm vào ô để thêm. Bấm lại để thêm lần nữa, ví dụ nấu 2 bữa.</p>
  <div style="display:grid;grid-template-columns:auto repeat(3,1fr);gap:6px;align-items:center">
  <span></span>${SLOTS.map(s => `<b style="text-align:center;font-size:13px">${s[2]} ${s[1]}</b>`).join('')}
  ${DAYS.map((dn, d) => `<b style="font-size:13px">${dn}</b>${SLOTS.map(s => { const c = pget(d, s[0]).filter(x => x === r.id).length; return `<button class="btn sm ${c ? 'leaf' : ''}" data-act="padd" data-d="${d}" data-s="${s[0]}" data-id="${r.id}">${c ? '✓ ' + (c > 1 ? '×' + c : '') : '+'}</button>`; }).join('')}`).join('')}</div></div>
  <footer><button class="btn primary" data-act="close">Xong</button></footer></div></div>`;
}
function pickModal() {
  const { d, s, q, g } = M, ctx = { ph: curPhase(), moods: [] };
  let L = REC.filter(r => dietOK(r) && (!g || r.g === g) && (!q || q.split(/\s+/).every(t => r._s.includes(norm(t)))));
  L = L.map(r => [score(r, ctx) + (r.ml.includes(s) ? 2 : -1), r]).sort((a, b) => b[0] - a[0]).slice(0, 40).map(x => x[1]);
  return `<div class="ov" data-act="closeov"><div class="dlg" role="dialog" aria-modal="true"><header><h2>${SLOTS.find(x => x[0] === s)[2]} ${DAYS[d]} · ${SLOTS.find(x => x[0] === s)[1]}</h2><button class="iconbtn" data-act="close">✕</button></header>
  <div class="content"><div class="search" style="margin-bottom:10px"><input id="pq" type="search" placeholder="Tìm món…" value="${esc(q)}"></div>
  <div class="chips" style="margin-bottom:10px">${chip('pg', 'data-v=""', !g, 'Tất cả')}${GROUPS.map(x => chip('pg', `data-v="${x[0]}"`, g === x[0], x[1] + ' ' + x[2])).join('')}</div>
  <div id="plist">${pickList(L, d, s)}</div></div><footer><button class="btn primary" data-act="close">Xong</button></footer></div></div>`;
}
const pickList = (L, d, s) => `<div class="dish-row"><span class="nm">🍚 ${esc(BY[RICE].n)} · ${BY[RICE].k} kcal</span><button class="btn sm" data-act="padd" data-d="${d}" data-s="${s}" data-id="${RICE}" data-keep="1">+ Thêm</button></div>` +
  L.map(r => `<div class="dish-row"><span class="nm" data-act="open" data-id="${r.id}">${GM[r.g].e} ${esc(r.n)}<br><span class="note">${r.t}' · ${r.k} kcal · ${MM[r.m]}</span></span><button class="btn sm" data-act="padd" data-d="${d}" data-s="${s}" data-id="${r.id}" data-keep="1">+ Thêm</button></div>`).join('');

/* ============ Thực đơn tuần ============ */
function dayTotals(d) {
  let k = 0, p = 0; for (const s of SLOTS) for (const id of pget(d, s[0])) { const r = BY[id]; if (r) { k += r.k; p += r.p; } } return { k, p };
}
function slotHTML(d, s) {
  const ids = pget(d, s[0]), cnt = {}; ids.forEach(i => cnt[i] = (cnt[i] || 0) + 1);
  return `<div class="slot"><div class="sh"><span>${s[2]} ${s[1]}</span><span>${nfmt(ids.reduce((a, i) => a + (BY[i]?.k || 0), 0))} kcal</span></div>
  ${Object.entries(cnt).map(([id, c]) => { const r = BY[id]; return r ? `<div class="pitem"><span class="nm" data-act="open" data-id="${id}">${GM[r.g].e} ${esc(r.n)}${c > 1 ? ` <b>×${c}</b>` : ''}</span><span class="k">${r.k * c}</span><button class="xbtn" data-act="prem" data-d="${d}" data-s="${s[0]}" data-id="${id}" aria-label="Bỏ món">✕</button></div>` : ''; }).join('')}
  <button class="addbtn" data-act="pick" data-d="${d}" data-s="${s[0]}">＋ Thêm món</button></div>`;
}
function viewPlan() {
  const todayIdx = (new Date().getDay() + 6) % 7, ph = curPhase();
  const tot = DAYS.map((_, d) => dayTotals(d)), filled = tot.filter(t => t.k > 0), avg = filled.length ? filled.reduce((a, t) => a + t.k, 0) / filled.length : 0;
  const gcount = {}; for (let d = 0; d < 7; d++) for (const s of SLOTS) for (const id of pget(d, s[0])) { const r = BY[id]; if (r && (r.r === 'man' || r.r === 'bat')) gcount[r.g] = (gcount[r.g] || 0) + 1; }
  const nDishes = tot.reduce((a, t) => a + (t.k > 0 ? 1 : 0), 0);
  return `<div class="h-sec"><h2>Thực đơn tuần</h2><p>Mục tiêu ${nfmt(S.target)} kcal/người/ngày · <a href="#" data-act="settings">đổi</a></p></div>
  <div class="panel noprint" style="margin-bottom:14px"><div class="row"><button class="btn primary" data-act="auto">✨ Gợi ý tự động cả tuần</button><button class="btn" data-act="autokeep">Chỉ điền ô trống</button>
  <button class="btn" data-act="plan2shop">🛒 Lập danh sách đi chợ</button><button class="btn" data-act="plancopy">📋 Sao chép</button><button class="btn" data-act="print">🖨 In</button><button class="btn danger" data-act="plannew">Xóa tuần</button></div>
  <div class="row" style="margin-top:10px"><label class="switch" style="padding:0"><input type="checkbox" data-bind="optQuick" ${S.optQuick ? 'checked' : ''}> Ưu tiên món nhanh (≤ 30 phút)</label>
  <label class="switch" style="padding:0"><input type="checkbox" data-bind="optCycle" ${S.optCycle ? 'checked' : ''} ${ph ? '' : 'disabled'}> Ưu tiên theo chu kỳ ${ph ? `(${PH[ph].e} ${PH[ph].s})` : '(chưa chọn giai đoạn ở tab Hôm nay)'}</label></div>
  ${filled.length ? `<div class="sum" style="margin-top:12px"><span><b>${nfmt(avg)}</b> kcal/ngày TB</span><span><b>${nDishes}</b>/7 ngày đã lên món</span>${Object.entries(gcount).sort((a, b) => b[1] - a[1]).map(([g, c]) => `<span class="tag">${GM[g].e} ${GM[g].n} ×${c}</span>`).join('')}</div>` : ''}</div>
  <div class="pgrid">${DAYS.map((dn, d) => { const t = tot[d], pc = Math.min(130, t.k / S.target * 100); return `<div class="day ${d === todayIdx ? 'today' : ''}"><h3>${dn}${d === todayIdx ? ' · hôm nay' : ''}<small>${nfmt(t.k)} kcal · ${t.p} g đạm</small></h3>
  <div class="kcalbar" title="${nfmt(t.k)} / ${nfmt(S.target)} kcal"><i class="${t.k > S.target * 1.15 ? 'over' : t.k < S.target * .8 ? 'low' : ''}" style="width:${Math.min(100, pc)}%"></i></div>${SLOTS.map(s => slotHTML(d, s)).join('')}</div>`; }).join('')}</div>
  <p class="disc">Calo tính cho 1 người, theo phần ăn trong công thức. Chỉ mang tính tham khảo, không thay thế tư vấn dinh dưỡng.</p>`;
}
function autoPlan(keep) {
  const ph = S.optCycle ? curPhase() : null, ctx = { ph, moods: [], quick: S.optQuick };
  const pool = REC.filter(dietOK), has = f => pool.filter(f);
  const mains = has(r => r.r === 'man'), veg = has(r => r.r === 'rau' || (r.r === 'kem' && r.g === 'rau')), soups = has(r => r.r === 'canh'), bowls = has(r => r.r === 'bat' && r.id !== RICE);
  const bfast = has(r => r.ml.includes('sang') && (r.r === 'bat' || r.g === 'trung') && r.id !== RICE);
  if (!mains.length && !bowls.length) { toast('Chế độ ăn hiện tại loại hết món, hãy nới bộ lọc'); return; }
  const base = ['ca', 'heo', 'ga', 'bo', 'trung', 'dauhu', 'haisan', 'ca', 'heo', 'ga', 'vit', 'dauhu', 'bo', 'ca'];
  let pat; for (let t = 0; t < 40; t++) { pat = shuffle(base); if (pat.every((x, i) => !i || x !== pat[i - 1])) break; }
  const used = new Set(); let idx = 0;
  const pickFrom = (list, avoid, grp, clash) => { let L = grp ? list.filter(r => r.g === grp) : list; if (!L.length) L = list;
    if (clash && clash.length) { const L2 = L.filter(r => !r.tg.some(t => clash.includes(t))); if (L2.length > 3) L = L2; }
    return pickBest(L, ctx, new Set([...used, ...avoid])) || pickBest(L, ctx, new Set(avoid)); };
  for (let d = 0; d < 7; d++) {
    const group = [pat[idx++], pat[idx++]];
    let best = null, bd = 1e9;
    for (let attempt = 0; attempt < 10; attempt++) {
      const day = {}, localUsed = new Set();
      const add = (s, r) => { if (!r) return; (day[s] = day[s] || []).push(r.id); localUsed.add(r.id); };
      const b = pickFrom(bfast.length ? bfast : bowls, localUsed); add('sang', b);
      ['trua', 'toi'].forEach((s, si) => {
        if (bowls.length && Math.random() < .18 && !S.diet.noRice) { add(s, pickFrom(bowls, localUsed)); return; }
        const mn = pickFrom(mains.length ? mains : bowls, localUsed, group[si]); add(s, mn);
        const clash = mn ? mn.tg.filter(t => ['s', 'e', 'pk', 'bf', 'sh'].includes(t)) : [];
        if (si === 0) add(s, pickFrom(veg.length ? veg : soups, localUsed, null, clash)); else add(s, pickFrom(soups.length ? soups : veg, localUsed, null, clash));
        if (si === 0 && soups.length && Math.random() < .35) add(s, pickFrom(soups, localUsed, null, clash));
        add(s, BY[RICE]);
      });
      let k = 0; for (const s in day) for (const id of day[s]) k += BY[id].k;
      const dist = Math.abs(k - S.target); if (dist < bd) { bd = dist; best = day; }
    }
    // thiếu năng lượng: thêm bát cơm
    let k = 0; for (const s in best) for (const id of best[s]) k += BY[id].k;
    for (const s of ['trua', 'toi']) if (k < S.target * .85 && (best[s] || []).includes(RICE)) { best[s].push(RICE); k += BY[RICE].k; }
    for (const s of ['sang', 'trua', 'toi']) { if (keep && pget(d, s).length) continue; (S.plan[d] = S.plan[d] || {})[s] = best[s] || []; (best[s] || []).forEach(id => used.add(id)); }
  }
  save(); render(); toast('Đã gợi ý thực đơn cả tuần');
}
function planText() {
  const out = ['📅 THỰC ĐƠN TUẦN', ''];
  DAYS.forEach((dn, d) => { const t = dayTotals(d); out.push(`${dn} (${nfmt(t.k)} kcal)`); SLOTS.forEach(s => { const ids = pget(d, s[0]); if (ids.length) { const c = {}; ids.forEach(i => c[i] = (c[i] || 0) + 1); out.push(`  ${s[2]} ${s[1]}: ` + Object.entries(c).map(([i, n]) => BY[i].n + (n > 1 ? ' ×' + n : '')).join(' · ')); } }); out.push(''); });
  return out.join('\n');
}

/* ============ Đi chợ ============ */
function shopEntries() {
  const e = [];
  for (const [id, n] of Object.entries(S.basket)) e.push({ id, n });
  if (S.incPlan) for (let d = 0; d < 7; d++) for (const s of SLOTS) for (const id of pget(d, s[0])) e.push({ id, n: S.people });
  return e;
}
function aggregate(entries) {
  const m = {};
  for (const { id, n } of entries) {
    const r = BY[id]; if (!r) continue; const sc = n / r.sv;
    for (const [iid, q] of r.i) {
      let k = iid, qq = q * sc; if (k === 'com_chin') { k = 'gao'; qq = qq * 50; }
      const o = m[k] = m[k] || { id: k, q: 0, from: {} }; o.q += qq; o.from[r.n] = 1;
    }
  }
  return m;
}
function shopList() {
  const m = aggregate(shopEntries()), byA = {};
  let hidden = 0;
  for (const o of Object.values(m)) { if (S.hidePantry && ING[o.id].pan) { hidden++; continue; } (byA[ING[o.id].a] = byA[ING[o.id].a] || []).push(o); }
  return { byA, hidden };
}
function viewShop() {
  const ents = Object.entries(S.basket), nPlan = shopEntries().length - ents.length;
  const { byA, hidden } = shopList(), aisles = Object.keys(AIS).filter(a => byA[a]);
  const total = aisles.reduce((a, k) => a + byA[k].length, 0), done = aisles.reduce((a, k) => a + byA[k].filter(o => S.bought[o.id]).length, 0);
  return `<div class="h-sec"><h2>Đi chợ</h2><p>Chọn nhiều món, app gộp nguyên liệu trùng thành một danh sách</p></div>
  <div class="two w"><div><div class="panel"><h3>🍽 Món đã chọn (${ents.length})</h3>
  ${ents.length ? ents.map(([id, n]) => { const r = BY[id]; return r ? `<div class="dish-row"><span class="nm" data-act="open" data-id="${id}">${GM[r.g].e} ${esc(r.n)}</span><div class="stepper sm"><button data-act="bn" data-id="${id}" data-d="-1" aria-label="Giảm">−</button><span>${n} phần</span><button data-act="bn" data-id="${id}" data-d="1" aria-label="Tăng">+</button></div><button class="xbtn" data-act="basket" data-id="${id}" aria-label="Bỏ">✕</button></div>` : ''; }).join('') : `<p class="note">Chưa chọn món nào. Vào tab <b>Món ăn</b> và bấm “🛒 Đi chợ” trên món bạn muốn nấu.</p>`}
  <label class="switch"><input type="checkbox" data-bind="incPlan" ${S.incPlan ? 'checked' : ''}> Gồm cả thực đơn tuần (${nPlan} món × ${S.people} người)</label>
  <label class="switch"><input type="checkbox" data-bind="hidePantry" ${S.hidePantry ? 'checked' : ''}> Ẩn gia vị cơ bản (dầu, đường, muối, nước mắm…)${hidden ? ` · đang ẩn ${hidden}` : ''}</label>
  <div class="row noprint" style="margin-top:8px">${ents.length ? '<button class="btn sm danger" data-act="basketclear">Bỏ hết món</button>' : ''}<button class="btn sm" data-act="tab" data-t="mon">+ Chọn thêm món</button></div></div></div>
  <div><div class="panel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">🛒 Cần mua ${total ? `<span class="note">· ${done}/${total}</span>` : ''}</h3>
  <div class="row noprint"><button class="btn sm primary" data-act="shopcopy" ${total ? '' : 'disabled'}>📋 Sao chép (Zalo)</button><button class="btn sm" data-act="shopdl" ${total ? '' : 'disabled'}>⬇ .txt</button><button class="btn sm" data-act="print" ${total ? '' : 'disabled'}>🖨 In</button><button class="btn sm ghost" data-act="boughtclear" ${done ? '' : 'disabled'}>Bỏ tick</button></div></div>
  ${total ? aisles.map(a => `<div class="aisle"><h4><span>${AIS[a]}</span><span>${byA[a].length}</span></h4>${byA[a].sort((x, y) => ING[x.id].n.localeCompare(ING[y.id].n, 'vi')).map(o => `<label class="sitem ${S.bought[o.id] ? 'done' : ''}"><input type="checkbox" data-act="bought" data-id="${o.id}" ${S.bought[o.id] ? 'checked' : ''}><span class="n"><b>${esc(ING[o.id].n)}</b><small>${Object.keys(o.from).slice(0, 3).map(esc).join(', ')}${Object.keys(o.from).length > 3 ? ` +${Object.keys(o.from).length - 3}` : ''}</small></span><span class="q">${fmtQty(o.id, o.q, true)}</span></label>`).join('')}</div>`).join('') : `<div class="empty"><div class="big">🛒</div><p>Danh sách trống.</p></div>`}
  </div></div></div>`;
}
function shopText() {
  const { byA } = shopList(), out = ['🛒 DANH SÁCH ĐI CHỢ', ''];
  for (const a of Object.keys(AIS)) if (byA[a]) { out.push(AIS[a].toUpperCase()); byA[a].sort((x, y) => ING[x.id].n.localeCompare(ING[y.id].n, 'vi')).forEach(o => out.push(`${S.bought[o.id] ? '✅' : '▫️'} ${ING[o.id].n}: ${fmtQty(o.id, o.q, true)}`)); out.push(''); }
  const dishes = Object.keys(S.basket).map(i => BY[i]?.n).filter(Boolean); if (dishes.length) out.push('Món: ' + dishes.join(', '));
  return out.join('\n');
}

/* ============ Tủ lạnh ============ */
function viewFridge() {
  const have = S.fridge, nonSeas = Object.keys(ING).filter(i => !isSeas(i)), q = norm(FR.q);
  const byA = {}; nonSeas.filter(i => !q || norm(ING[i].n).includes(q)).forEach(i => (byA[ING[i].a] = byA[ING[i].a] || []).push(i));
  const nHave = Object.keys(have).length;
  return `<div class="h-sec"><h2>Tủ lạnh có gì?</h2><p>Chọn nguyên liệu đang có, app gợi ý món nấu được ngay</p></div>
  <div class="sticky-act only-m"><button class="btn primary" data-act="frgo">Xem món gợi ý (${nHave ? 'đã chọn ' + nHave : 'chọn nguyên liệu'}) ↓</button></div><div class="two w"><div class="panel scrollp"><div class="search" style="margin-bottom:10px"><input id="fq" type="search" placeholder="Tìm nguyên liệu…" value="${esc(FR.q)}"></div>
  <div class="row" style="margin-bottom:10px"><span class="note">Đã chọn <b>${nHave}</b> · giả định luôn có dầu, đường, muối, nước mắm, nước tương, tiêu, hạt nêm</span><button class="btn sm ghost" data-act="frclear">Bỏ chọn</button></div>
  ${Object.keys(AIS).filter(a => byA[a]).map(a => `<div class="fgroup"><h4>${AIS[a]}</h4><div class="chips">${byA[a].map(i => chip('fr', `data-id="${i}"`, have[i], esc(ING[i].n), 'sm leaf')).join('')}</div></div>`).join('')}</div>
  <div id="frres">${fridgeResults()}</div></div>`;
}
function fridgeResults() {
  const have = S.fridge; if (!Object.keys(have).length) return `<div class="empty"><div class="big">🧊</div><p>Chọn vài nguyên liệu bên trái để xem gợi ý.</p></div>`;
  const L = [];
  for (const r of REC) {
    if (!dietOK(r) || r.id === RICE) continue; const need = r.i.map(([i]) => i).filter(i => !isSeas(i)); if (!need.length) continue;
    const miss = need.filter(i => !have[i]), hit = need.length - miss.length; if (!hit) continue;
    L.push({ r, miss, cov: hit / need.length });
  }
  L.sort((a, b) => a.miss.length - b.miss.length || b.cov - a.cov || a.r.t - b.r.t);
  const ok = L.filter(x => !x.miss.length), near = L.filter(x => x.miss.length > 0 && x.miss.length <= 2);
  const row = x => `<div class="dish-row"><span class="nm" data-act="open" data-id="${x.r.id}">${GM[x.r.g].e} <b>${esc(x.r.n)}</b><br><span class="note">${x.r.t}' · ${x.r.k} kcal${x.miss.length ? ' · thiếu: ' + x.miss.map(i => ING[i].n).join(', ') : ' · đủ nguyên liệu'}</span></span><button class="btn sm ${S.basket[x.r.id] ? 'leaf' : ''}" data-act="basket" data-id="${x.r.id}">${S.basket[x.r.id] ? '✓' : '🛒'}</button></div>`;
  return `<div class="panel"><h3>✅ Nấu được ngay (${ok.length})</h3>${ok.slice(0, 25).map(row).join('') || '<p class="note">Chưa có món nào đủ nguyên liệu, thử chọn thêm.</p>'}</div>
  <div class="panel"><h3>🛍 Chỉ thiếu 1–2 thứ (${near.length})</h3>${near.slice(0, 25).map(row).join('') || '<p class="note">Không có.</p>'}</div>`;
}

/* ============ Hôm nay (chu kỳ & tâm trạng) ============ */
function newMeal(keepRoles) {
  const ctx = { ...ctxNow(), quick: S.optQuick }, pool = REC.filter(dietOK), prev = TODAY.meal || {};
  const mains = pool.filter(r => r.r === 'man'), veg = pool.filter(r => r.r === 'rau'), soups = pool.filter(r => r.r === 'canh'), bowls = pool.filter(r => r.r === 'bat' && r.id !== RICE);
  const pick = (k, list) => (keepRoles && keepRoles.includes(k) && prev[k]) ? prev[k] : pickBest(list, ctx, new Set(prev[k] ? [prev[k].id] : []));
  if (S.moods.includes('doi_vi') && bowls.length) return { bat: pick('bat', bowls), rau: pick('rau', veg) };
  return { man: pick('man', mains.length ? mains : bowls), rau: pick('rau', veg), canh: pick('canh', soups) };
}
function viewToday() {
  const a = autoPhase(), ph = curPhase(), ctx = ctxNow();
  if (!TODAY.meal) TODAY.meal = newMeal();
  const meal = TODAY.meal, items = Object.entries(meal).filter(([, r]) => r), kc = items.reduce((s, [, r]) => s + r.k, 0) + BY[RICE].k;
  const top = REC.filter(r => dietOK(r) && r.id !== RICE && (ph || S.moods.length)).map(r => [score(r, ctx), r]).sort((x, y) => y[0] - x[0]).slice(0, 9).map(x => x[1]);
  return `<div class="h-sec"><h2>Hôm nay bạn thế nào?</h2><p>Gợi ý món theo chu kỳ và tâm trạng. Dữ liệu chỉ lưu trên máy bạn.</p></div>
  <div class="two"><div class="panel"><h3>🌸 Giai đoạn chu kỳ</h3>
  <div class="phases">${Object.entries(PH).map(([k, v]) => `<button class="phase" data-act="phase" data-k="${k}" aria-pressed="${ph === k}"><span class="e">${v.e}</span><b>${v.s}</b><small>${v.range}</small></button>`).join('')}</div>
  ${ph ? `<div class="callout rose" style="margin-top:12px"><b>${PH[ph].e} ${PH[ph].n}</b><br>${PH[ph].d}</div>` : `<p class="note" style="margin-top:10px">Chọn một giai đoạn (hoặc nhập ngày đầu kỳ bên dưới) để nhận gợi ý. Bỏ trống nếu không muốn theo dõi.</p>`}
  <details style="margin-top:12px" ${S.auto ? 'open' : ''}><summary style="cursor:pointer;font-weight:600">Tự tính theo ngày đầu kỳ</summary>
  <div style="margin-top:10px"><div class="field"><label for="cs">Ngày đầu của kỳ kinh gần nhất</label><input id="cs" type="date" value="${esc(S.cycle.start)}" data-bind="cstart"></div>
  <div class="row"><div class="field" style="flex:1"><label>Độ dài chu kỳ (ngày)</label><input type="number" min="21" max="40" value="${S.cycle.len}" data-bind="clen"></div>
  <div class="field" style="flex:1"><label>Số ngày hành kinh</label><input type="number" min="2" max="9" value="${S.cycle.per}" data-bind="cper"></div></div>
  <label class="switch"><input type="checkbox" data-bind="auto" ${S.auto ? 'checked' : ''}> Dùng giai đoạn tự tính${a ? ` (hôm nay là ngày ${a.day} của chu kỳ)` : ''}</label></div></details>
  <p class="note" style="margin-top:10px">Gợi ý chỉ là kiến thức dinh dưỡng chung, không thay thế tư vấn y tế. Nếu đau bụng kinh dữ dội hoặc chu kỳ bất thường, hãy gặp bác sĩ.</p></div>
  <div class="panel"><h3>😊 Tâm trạng hôm nay</h3><div class="chips">${MOODS.map(m => chip('mood', `data-k="${m[0]}"`, S.moods.includes(m[0]), `${m[1]} ${m[2]}`)).join('')}</div>
  <p class="note" style="margin-top:10px">Chọn nhiều cũng được. Ví dụ “mệt mỏi” sẽ ưu tiên món nhiều đạm, giàu sắt; “lười nấu” ưu tiên món dưới 30 phút.</p></div></div>
  <div class="panel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">🍽 Gợi ý bữa cơm</h3><div class="row"><button class="btn sm primary" data-act="shuffle">🔀 Xáo trộn</button></div></div>
  <div class="meal" style="margin-top:12px">${items.map(([k, r]) => `<div class="mrow"><span class="e">${GM[r.g].e}</span><div style="flex:1"><div class="rl">${RM[r.r]}</div><h4 data-act="open" data-id="${r.id}">${esc(r.n)}</h4><div class="note">${r.t}' · ${r.k} kcal${why(r, ph, S.moods).length ? '<br>' + why(r, ph, S.moods).map(esc).join('<br>') : ''}</div></div><button class="btn sm" data-act="swap" data-k="${k}" aria-label="Đổi món">🔄</button></div>`).join('')}</div>
  <div class="row" style="margin-top:12px;justify-content:space-between"><span><b>${nfmt(kc)} kcal</b> <span class="note">/ người, gồm 1 bát cơm</span></span>
  <div class="row"><button class="btn sm" data-act="mealplan" data-s="trua">📅 Vào bữa trưa nay</button><button class="btn sm" data-act="mealplan" data-s="toi">📅 Vào bữa tối nay</button><button class="btn sm leaf" data-act="mealbasket">🛒 Đi chợ cho bữa này</button></div></div></div>
  ${top.length ? `<div class="h-sec" style="margin-top:18px"><h2 style="font-size:18px">Món hợp nhất với bạn lúc này</h2></div><div class="grid">${top.map(r => card(r, why(r, ph, S.moods).join('<br>'))).join('')}</div>` : ''}`;
}

/* ============ Cài đặt ============ */
function settingsModal() {
  const p = M.prof || {};
  return `<div class="ov" data-act="closeov"><div class="dlg" role="dialog" aria-modal="true"><header><h2>⚙️ Cài đặt</h2><button class="iconbtn" data-act="close">✕</button></header>
  <div class="content">
  <div class="sect" style="margin-top:0"><h3>👥 Số người ăn</h3><div class="stepper"><button data-act="people" data-d="-1">−</button><span>${S.people} người</span><button data-act="people" data-d="1">+</button></div><p class="note">Định lượng nguyên liệu và danh sách đi chợ sẽ tự nhân theo số người.</p></div>
  <div class="sect"><h3>🔥 Mục tiêu calo mỗi người mỗi ngày</h3><div class="field"><input type="number" min="1000" max="4000" step="50" value="${S.target}" data-bind="target"></div>
  <details><summary style="cursor:pointer;font-weight:600">Tính nhu cầu calo (công thức Mifflin–St Jeor)</summary><div style="margin-top:10px">
  <div class="row"><div class="field" style="flex:1"><label>Giới tính</label><select data-bind="p_sex"><option value="f" ${p.sex !== 'm' ? 'selected' : ''}>Nữ</option><option value="m" ${p.sex === 'm' ? 'selected' : ''}>Nam</option></select></div>
  <div class="field" style="flex:1"><label>Tuổi</label><input type="number" data-bind="p_age" value="${p.age || ''}"></div></div>
  <div class="row"><div class="field" style="flex:1"><label>Chiều cao (cm)</label><input type="number" data-bind="p_h" value="${p.h || ''}"></div><div class="field" style="flex:1"><label>Cân nặng (kg)</label><input type="number" data-bind="p_w" value="${p.w || ''}"></div></div>
  <div class="field"><label>Mức vận động</label><select data-bind="p_act">${[[1.2, 'Ít vận động (ngồi nhiều)'], [1.375, 'Nhẹ (1–3 buổi tập/tuần)'], [1.55, 'Vừa (3–5 buổi/tuần)'], [1.725, 'Nhiều (6–7 buổi/tuần)']].map(o => `<option value="${o[0]}" ${(p.act || 1.375) == o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div>
  <div class="field"><label>Mục tiêu</label><select data-bind="p_goal">${[[0, 'Giữ cân'], [-300, 'Giảm cân nhẹ (−300 kcal)'], [300, 'Tăng cân nhẹ (+300 kcal)']].map(o => `<option value="${o[0]}" ${(p.goal || 0) == o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div>
  <button class="btn" data-act="calc">Tính</button> <span id="calcres" class="note"></span></div></details></div>
  <div class="sect"><h3>🥗 Chế độ ăn</h3>${DIETS.map(d => `<label class="switch"><input type="checkbox" data-act="dietcb" data-k="${d[0]}" ${S.diet[d[0]] ? 'checked' : ''}> ${d[1]}</label>`).join('')}</div>
  <div class="sect"><h3>🎨 Giao diện</h3><select class="select" data-bind="theme"><option value="auto" ${S.theme === 'auto' ? 'selected' : ''}>Theo thiết bị</option><option value="light" ${S.theme === 'light' ? 'selected' : ''}>Sáng</option><option value="dark" ${S.theme === 'dark' ? 'selected' : ''}>Tối</option></select></div>
  <div class="sect"><h3>💾 Sao lưu dữ liệu</h3><p class="note">Mọi dữ liệu (yêu thích, thực đơn, chu kỳ…) chỉ nằm trong trình duyệt này. Hãy sao lưu nếu muốn chuyển sang máy khác.</p>
  <div class="row"><button class="btn sm" data-act="export">⬇ Tải file sao lưu</button><button class="btn sm" data-act="import">⬆ Khôi phục từ file</button><button class="btn sm danger" data-act="reset">Xóa toàn bộ dữ liệu</button></div><input type="file" id="impf" accept="application/json" class="hide"></div>
  </div><footer><button class="btn primary" data-act="close">Xong</button></footer></div></div>`;
}
function applyTheme() { const r = document.documentElement; S.theme === 'auto' ? r.removeAttribute('data-theme') : r.setAttribute('data-theme', S.theme); }

/* ============ chế độ nấu ============ */
let C = null, tick = null, wake = null;
function openCook(id) {
  const r = BY[id]; C = { id, i: 0, n: S.people, timers: [], steps: [{ intro: true }, ...r.s.map(t => ({ t }))] };
  M = null; showModal(); document.body.style.overflow = 'hidden'; drawCook();
  try { navigator.wakeLock?.request('screen').then(w => wake = w).catch(() => { }); } catch (e) { }
  tick = setInterval(() => { updateTimers(); }, 1000);
}
function closeCook() { C = null; clearInterval(tick); try { wake?.release(); } catch (e) { } document.body.style.overflow = ''; const el = $('#cook'); if (el) el.remove(); render(); }
function beep() { try { const a = new (window.AudioContext || window.webkitAudioContext)(); [0, .35, .7].forEach(t => { const o = a.createOscillator(), g = a.createGain(); o.frequency.value = 880; o.connect(g); g.connect(a.destination); g.gain.setValueAtTime(.25, a.currentTime + t); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + t + .3); o.start(a.currentTime + t); o.stop(a.currentTime + t + .3); }); navigator.vibrate?.([300, 120, 300]); } catch (e) { } }
function updateTimers() {
  if (!C) return; let any = false;
  C.timers.forEach(t => { const left = Math.max(0, Math.round((t.end - Date.now()) / 1000)); t.left = left; if (!left && !t.done) { t.done = true; beep(); toast('⏰ Hết giờ: ' + t.label); } any = true; });
  const box = $('#timers'); if (box && any) box.innerHTML = timersHTML();
}
const mmss = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const timersHTML = () => C.timers.map((t, i) => `<span class="timer ${t.done ? 'end' : ''}" data-act="tdel" data-i="${i}" title="Bấm để xóa">⏱ ${mmss(t.left ?? 0)} <small style="font-weight:500">${esc(t.label)}</small></span>`).join('');
function drawCook() {
  const r = BY[C.id], st = C.steps[C.i], last = C.i === C.steps.length - 1, total = C.steps.length - 1;
  let body;
  if (st.intro) body = `<div class="snum">Chuẩn bị · ${r.n}</div><div class="row" style="justify-content:space-between;margin-bottom:6px"><b>Nguyên liệu</b><div class="stepper sm"><button data-act="cn" data-d="-1">−</button><span>${C.n} phần</span><button data-act="cn" data-d="1">+</button></div></div>${ingList(r, C.n)}`;
  else { const m = st.t.match(/(\d+)(?:-(\d+))?\s*phút/); body = `<div class="snum">Bước ${C.i}/${total}</div><div class="big">${esc(st.t)}</div>${m ? `<div style="margin-top:18px"><button class="btn" data-act="tstart" data-m="${m[2] || m[1]}" data-l="Bước ${C.i}">⏱ Hẹn giờ ${m[2] || m[1]} phút</button></div>` : ''}`; }
  const html = `<div class="cook" id="cook"><div class="cbar"><button class="iconbtn" data-act="cookclose" aria-label="Thoát">✕</button><b style="flex:1">${esc(r.n)}</b><span class="note">${st.intro ? 'Chuẩn bị' : C.i + '/' + total}</span></div>
  <div class="prog"><i style="width:${C.i / total * 100}%"></i></div><div class="cbody">${body}<div class="timers" id="timers">${timersHTML()}</div></div>
  <div class="cfoot"><button class="btn" data-act="cprev" ${C.i ? '' : 'disabled'}>← Trước</button>${last ? `<button class="btn leaf" data-act="cdone">✓ Nấu xong!</button>` : `<button class="btn primary" data-act="cnext">${st.intro ? 'Bắt đầu nấu →' : 'Tiếp →'}</button>`}</div></div>`;
  const old = $('#cook'); if (old) old.remove(); document.body.insertAdjacentHTML('beforeend', html);
}

/* ============ sự kiện ============ */
const ACT = {
  tab: (d) => { S.tab = d.t; F.open = false; save(); window.scrollTo(0, 0); render(); },
  people: (d) => { S.people = Math.min(12, Math.max(1, S.people + +d.d)); save(); renderTop(); if (M?.type === 'settings') showModal(); else if (M?.type === 'dish') { M.n = S.people; showModal(); } else render(); },
  settings: () => { M = { type: 'settings', prof: S.profile || {} }; showModal(); },
  open: (d) => openDish(d.id),
  close: () => closeModal(), closeov: (d, el, e) => { if (e.target === el) closeModal(); },
  mn: (d) => { M.n = Math.min(24, Math.max(1, M.n + +d.d)); showModal(); },
  fav: (d) => { S.fav[d.id] ? delete S.fav[d.id] : S.fav[d.id] = 1; save(); M?.type === 'dish' ? showModal() : render(); },
  basket: (d) => { if (S.basket[d.id]) { delete S.basket[d.id]; toast('Đã bỏ khỏi giỏ đi chợ'); } else { S.basket[d.id] = d.n ? +d.n : S.people; toast('Đã thêm vào giỏ đi chợ 🛒'); } save(); renderTabs(); if (M?.type === 'dish') showModal(); else render(); },
  bn: (d) => { S.basket[d.id] = Math.min(24, Math.max(1, S.basket[d.id] + +d.d)); save(); render(); },
  basketclear: () => { if (confirm('Bỏ hết các món trong giỏ?')) { S.basket = {}; save(); render(); } },
  addplan: (d) => { M = { type: 'plan', id: d.id }; showModal(); },
  padd: (d, el) => { padd(+d.d, d.s, d.id); toast(`Đã thêm vào ${DAYS[+d.d]} · ${SLOTS.find(x => x[0] === d.s)[1]}`); if (M?.type === 'plan') showModal(); },
  prem: (d) => { prem(+d.d, d.s, d.id); render(); },
  pick: (d) => { M = { type: 'pick', d: +d.d, s: d.s, q: '', g: '' }; showModal(); },
  pg: (d) => { M.g = d.v; showModal(); },
  auto: () => { if (Object.keys(S.plan).length && !confirm('Thay thế toàn bộ thực đơn hiện tại bằng gợi ý mới?')) return; S.plan = {}; autoPlan(false); },
  autokeep: () => autoPlan(true),
  plannew: () => { if (confirm('Xóa toàn bộ thực đơn tuần?')) { S.plan = {}; save(); render(); } },
  plancopy: () => copyText(planText(), 'Thực đơn tuần'),
  plan2shop: () => { S.incPlan = true; S.tab = 'cho'; save(); window.scrollTo(0, 0); render(); },
  print: () => window.print(),
  bought: (d, el) => { el.checked ? S.bought[d.id] = 1 : delete S.bought[d.id]; save(); render(); },
  boughtclear: () => { S.bought = {}; save(); render(); },
  shopcopy: () => copyText(shopText(), 'Danh sách đi chợ'),
  shopdl: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([shopText()], { type: 'text/plain;charset=utf-8' })); a.download = 'di-cho-' + isoDay() + '.txt'; a.click(); },
  fl: (d) => { toggle(F[d.k], d.v); F.n = 48; syncFilters(); },
  fv: (d) => { const v = d.k === 't' || d.k === 'd' ? +d.v : d.k === 'fav' ? !!d.v : d.v; F[d.k] = v; F.n = 48; syncFilters(); },
  fclear: () => { Object.assign(F, { q: '', oc: [], c: [], g: [], r: [], m: [], t: 0, d: 0, mood: [], ph: '', fav: false, n: 48 }); render(); },
  ftoggle: () => { F.open = !F.open; $('#filters').classList.toggle('open', F.open); },
  more: () => { F.n += 48; renderResults(); },
  diet: (d) => { S.diet[d.k] ? delete S.diet[d.k] : S.diet[d.k] = 1; save(); TODAY.meal = null; render(); },
  dietcb: (d, el) => { el.checked ? S.diet[d.k] = 1 : delete S.diet[d.k]; save(); TODAY.meal = null; },
  phase: (d) => { S.auto = false; S.phase = S.phase === d.k ? null : d.k; save(); TODAY.meal = null; render(); },
  mood: (d) => { toggle(S.moods, d.k); save(); TODAY.meal = null; render(); },
  shuffle: () => { TODAY.meal = newMeal(); render(); },
  swap: (d) => { const m = newMeal([ 'man', 'rau', 'canh', 'bat' ].filter(k => k !== d.k)); TODAY.meal = { ...TODAY.meal, [d.k]: m[d.k] || TODAY.meal[d.k] }; render(); },
  mealplan: (d) => { const day = (new Date().getDay() + 6) % 7; Object.values(TODAY.meal).filter(Boolean).forEach(r => padd(day, d.s, r.id)); padd(day, d.s, RICE); toast(`Đã thêm vào ${DAYS[day]} · ${d.s === 'trua' ? 'Trưa' : 'Tối'}`); },
  mealbasket: () => { Object.values(TODAY.meal).filter(Boolean).forEach(r => S.basket[r.id] = S.people); save(); renderTabs(); toast('Đã thêm vào giỏ đi chợ 🛒'); },
  frgo: () => $('#frres').scrollIntoView({ behavior: 'smooth', block: 'start' }),
  fr: (d) => { S.fridge[d.id] ? delete S.fridge[d.id] : S.fridge[d.id] = 1; save(); render(); },
  frclear: () => { S.fridge = {}; save(); render(); },
  calc: () => { const p = S.profile = S.profile || {}, w = +p.w, h = +p.h, a = +p.age; if (!w || !h || !a) { $('#calcres').textContent = 'Nhập đủ tuổi, chiều cao, cân nặng.'; return; } const bmr = 10 * w + 6.25 * h - 5 * a + (p.sex === 'm' ? 5 : -161), t = Math.round((bmr * (+p.act || 1.375) + (+p.goal || 0)) / 50) * 50; S.target = t; save(); $('#calcres').textContent = `≈ ${t} kcal/ngày, đã đặt làm mục tiêu.`; const i = document.querySelector('[data-bind=target]'); if (i) i.value = t; },
  export: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' })); a.download = 'bep-nha-sao-luu-' + isoDay() + '.json'; a.click(); },
  import: () => $('#impf').click(),
  reset: () => { if (confirm('Xóa toàn bộ dữ liệu đã lưu trên trình duyệt này?')) { localStorage.removeItem(KEY); location.reload(); } },
  cook: (d) => openCook(d.id), cookclose: () => closeCook(),
  cnext: () => { C.i++; drawCook(); }, cprev: () => { C.i--; drawCook(); }, cn: (d) => { C.n = Math.max(1, C.n + +d.d); drawCook(); },
  cdone: () => { S.hist[C.id] = isoDay(); save(); toast('Ngon miệng nhé! 🍽'); closeCook(); },
  tstart: (d) => { C.timers.push({ end: Date.now() + d.m * 60000, label: d.l, left: d.m * 60 }); updateTimers(); },
  tdel: (d) => { C.timers.splice(+d.i, 1); $('#timers').innerHTML = timersHTML(); }
};
function syncFilters() { const f = $('#filters'); if (!f) return render(); f.innerHTML = filtersHTML(); renderResults(); const n = $('.f-toggle'); }
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.tagName === 'A') e.preventDefault();
  if (el.tagName === 'INPUT' && el.type === 'checkbox') return;   // xử lý ở 'change'
  const fn = ACT[el.dataset.act]; if (fn) { fn(el.dataset, el, e); if (el.dataset.keep) { } }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.act === 'bought' || el.dataset.act === 'dietcb') { ACT[el.dataset.act](el.dataset, el, e); return; }
  const k = el.dataset.bind; if (!k) { if (el.id === 'impf') importFile(el); return; }
  const val = el.type === 'checkbox' ? el.checked : el.value;
  if (k === 'sort') { F.sort = val; renderResults(); }
  else if (k === 'incPlan' || k === 'hidePantry') { S[k] = val; save(); render(); }
  else if (k === 'optQuick' || k === 'optCycle') { S[k] = val; save(); }
  else if (k === 'auto') { S.auto = val; save(); TODAY.meal = null; render(); }
  else if (k === 'cstart') { S.cycle.start = val; if (val) S.auto = true; save(); TODAY.meal = null; render(); }
  else if (k === 'clen') { S.cycle.len = Math.min(40, Math.max(21, +val || 28)); save(); render(); }
  else if (k === 'cper') { S.cycle.per = Math.min(9, Math.max(2, +val || 5)); save(); render(); }
  else if (k === 'target') { S.target = Math.min(4000, Math.max(1000, +val || 1800)); save(); }
  else if (k === 'theme') { S.theme = val; save(); applyTheme(); }
  else if (k.startsWith('p_')) { const p = S.profile = S.profile || {}; ({ p_sex: 'sex', p_age: 'age', p_h: 'h', p_w: 'w', p_act: 'act', p_goal: 'goal' })[k] && (p[({ p_sex: 'sex', p_age: 'age', p_h: 'h', p_w: 'w', p_act: 'act', p_goal: 'goal' })[k]] = val); save(); }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.id === 'q') { F.q = el.value; F.n = 48; renderResults(); }
  else if (el.id === 'fq') { FR.q = el.value; const v = viewFridge(); const pos = el.selectionStart; $('#view').innerHTML = v; const n = $('#fq'); n.focus(); n.setSelectionRange(pos, pos); }
  else if (el.id === 'pq') { M.q = el.value; const L = (() => { const ctx = { ph: curPhase(), moods: [] }; return REC.filter(r => dietOK(r) && (!M.g || r.g === M.g) && (!M.q || norm(M.q).split(/\s+/).every(t => r._s.includes(t)))).map(r => [score(r, ctx) + (r.ml.includes(M.s) ? 2 : -1), r]).sort((a, b) => b[0] - a[0]).slice(0, 40).map(x => x[1]); })(); $('#plist').innerHTML = pickList(L, M.d, M.s); }
});
function importFile(el) {
  const f = el.files[0]; if (!f) return; const rd = new FileReader();
  rd.onload = () => { try { const o = JSON.parse(rd.result); if (typeof o !== 'object' || !o) throw 0; S = { ...DEF, ...o }; S.cycle = { ...DEF.cycle, ...(o.cycle || {}) }; save(); toast('Đã khôi phục dữ liệu'); applyTheme(); closeModal(); } catch (e) { toast('File không hợp lệ'); } };
  rd.readAsText(f);
}
document.addEventListener('keydown', e => {
  if (C) { if (e.key === 'ArrowRight' && C.i < C.steps.length - 1) ACT.cnext(); else if (e.key === 'ArrowLeft' && C.i > 0) ACT.cprev(); else if (e.key === 'Escape') closeCook(); return; }
  if (e.key === 'Escape' && M) closeModal();
});
window.addEventListener('hashchange', () => { const m = location.hash.match(/^#\/mon\/(.+)$/); if (m && BY[m[1]] && !(M && M.id === m[1])) openDish(m[1]); });

applyTheme(); render();
{ const m = location.hash.match(/^#\/mon\/(.+)$/); if (m && BY[m[1]]) openDish(m[1]); }
