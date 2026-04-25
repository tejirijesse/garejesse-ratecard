// =================== DATA ===================
const CURRENCIES = [
  {code:"KES",name:"Kenyan Shilling",     rate:1},
  {code:"USD",name:"US Dollar",           rate:1/129},
  {code:"EUR",name:"Euro",                rate:1/140},
  {code:"GBP",name:"Pound Sterling",      rate:1/163},
  {code:"NGN",name:"Nigerian Naira",      rate:11.86},
  {code:"UGX",name:"Ugandan Shilling",    rate:30.2},
  {code:"RWF",name:"Rwandan Franc",       rate:10.47},
  {code:"ZAR",name:"South African Rand",  rate:0.143},
  {code:"GHS",name:"Ghanaian Cedi",       rate:0.116},
];
const CUR_BY = Object.fromEntries(CURRENCIES.map(c => [c.code, c]));

const PHOTO = [
  {id:"p1",title:"Portrait Session",desc:"Individual, couple, family, or professional headshots. Studio or outdoor.",incl:["Style consult","1 outfit change","Full retouching"],dur:"2 hrs",del:"30 edited images",price:12000},
  {id:"p2",title:"Editorial & Fashion",desc:"Lookbooks, magazine-style shoots for brands and designers.",badge:"Brand-ready",incl:["Concept + moodboard","Up to 3 looks","Full post-production"],dur:"4–6 hrs",del:"60 edited images",price:35000},
  {id:"p3",title:"Product & Commercial",desc:"E-commerce, packshots, hero images, social media product content.",incl:["Studio lighting","Up to 10 SKUs","White + lifestyle BGs"],dur:"Half-day",del:"40 edited images",price:50000,was:28000},
  {id:"p4",title:"Corporate & Event",desc:"Conferences, galas, launches, award ceremonies.",badge:"Most requested",incl:["Full-day coverage","Same-day social teaser","48-hr full delivery"],dur:"Up to 8 hrs",del:"150 edited images",price:45000},
  {id:"p5",title:"Real Estate & Architecture",desc:"Interior, exterior, aerial property photography for developers.",incl:["HDR composite editing","Sky replacement","Drone available (add-on)"],dur:"3–4 hrs",del:"35 edited images",price:22000},
  {id:"p6",title:"Wedding Photography",desc:"Full-day coverage from preparations to reception. Cinematic, not candid.",incl:["Pre-wedding consult","Second shooter (95K+)","Print-ready files"],dur:"Full day (10 hrs)",del:"300+ edited images",price:95000,was:65000,from:true},
];

const VIDEO = [
  {id:"v1",title:"Social Media Reel",desc:"Instagram / TikTok / YouTube Shorts. Vertical-first, fast-paced storytelling.",incl:["Shoot + edit","Captions + text overlay","Platform-optimised exports"],dur:"2–3 hrs shoot",del:"60–90 sec reel",price:18000},
  {id:"v2",title:"Corporate Brand Film",desc:"Company profiles, investor pitches, product demos, brand story films.",badge:"High value",incl:["Script + storyboard","Director's treatment","Interview setups","Colour + audio mix"],dur:"1–2 shoot days",del:"3–5 min film",price:75000},
  {id:"v3",title:"Music Video",desc:"Narrative, performance, or conceptual MVs for artists and labels.",incl:["Concept + treatment","Location scouting","Crew: DP, gaffer, AC","Grade + VFX"],dur:"1–3 shoot days",del:"3–6 min + cuts",price:180000,was:95000,from:true},
  {id:"v4",title:"Documentary Short",desc:"Community stories, founder profiles, NGO impact films, cultural docs.",incl:["Research + pre-prod","Multi-day shoot access","Cinematic grade","Festival-ready delivery"],dur:"2–5 shoot days",del:"8–20 min film",price:250000,was:120000,from:true},
  {id:"v5",title:"Event Highlight Reel",desc:"Conferences, activations, concerts. Shareable the same evening.",incl:["Multi-camera coverage","Same-day teaser (optional)","48-hr full reel"],dur:"Full event day",del:"2–4 min reel",price:50000},
  {id:"v6",title:"Wedding Videography",desc:"Cinematic wedding films — vows to reception. Emotional, timeless.",incl:["2-person crew","Cinematic + doc cuts","Licensed soundtrack","Drone (add-on)"],dur:"Full day (10 hrs)",del:"5 min film + SDE",price:80000,from:true},
];

const BUNDLES = [
  {id:"b1",name:"Starter Bundle",price:28000,sub:"Half-day · 4 hrs",feats:["1 location","40 edited photos","60-sec reel","3-day turnaround","Online gallery"]},
  {id:"b2",name:"Signature Bundle",price:65000,sub:"Full day · up to 8 hrs",tag:"Best Value",featured:true,feats:["Up to 3 locations","120 edited photos","3-min brand film","3 social cut-downs","Colour grade","Usage rights included","2-day turnaround"]},
  {id:"b3",name:"Campaign Bundle",price:180000,sub:"Multi-day · bespoke",from:true,feats:["Brand strategy session","Full crew on set","Director's treatment","Unlimited edited photos","Bespoke film length","Raw files + full licence","Priority delivery"]},
];

const ADDONS = [
  {id:"a1",name:"Drone Footage",desc:"DJI · 30 min flight · edited aerial cuts",price:8000},
  {id:"a2",name:"Rush Delivery",desc:"Same-day or next-morning turnaround",price:10000},
  {id:"a3",name:"Extra Short-Form Cut",desc:"Additional 30–60 sec edit from existing footage",price:5000},
  {id:"a4",name:"RAW File Handover",desc:"All unedited files via hard drive transfer",price:15000},
  {id:"a5",name:"Motion Graphics & Titles",desc:"Animated lower thirds, intros, logo stings",price:12000},
  {id:"a6",name:"Second Shooter",desc:"Additional photographer or camera operator",price:12000},
  {id:"a7",name:"Voiceover Recording",desc:"Professional VO talent + studio session",price:8000},
  {id:"a8",name:"Extended Usage Licence",desc:"Broadcast, OOH, and paid advertising rights",price:60000},
  {id:"a9",name:"Social Media Management",desc:"Captions, scheduling, 1-week content push",price:10000},
  {id:"a10",name:"Travel & Accommodation",desc:"Outside Nairobi — quoted per project",price:null,priceLabel:"Quote"},
];

const RETAINERS = [
  {id:"r1",name:"Starter",price:40000,feats:["1 shoot day / month","20 edited photos","1 × 60-sec reel","3-day turnaround","Social formats"]},
  {id:"r2",name:"Growth",price:65000,feats:["2 shoot days / month","50 edited photos","2 × 90-sec reels","Priority scheduling","Content calendar"]},
  {id:"r3",name:"Brand Partner",price:100000,feats:["4 shoot days / month","100 edited photos","4 reels + 1 brand film","Drone included","Monthly strategy call"]},
  {id:"r4",name:"Enterprise",price:null,priceLabel:"Custom",per:"annual contract",feats:["Unlimited shoot days","Full creative direction","Multi-platform strategy","Dedicated team","Annual campaign plan"]},
];

// =================== STATE ===================
let currency = "KES";
const basket = new Map();

// =================== HELPERS ===================
function convert(kes, code) {
  const c = CUR_BY[code] || CUR_BY.KES;
  return kes * c.rate;
}
function fmt(kes, code = currency) {
  if (!kes) return "—";
  const c = CUR_BY[code];
  const v = Math.round(convert(kes, code));
  return `${c.code} ${v.toLocaleString("en-US")}`;
}
function fmtAlt(kes) {
  return currency === "KES" ? fmt(kes, "USD") : fmt(kes, "KES");
}
function rateLabel(code) {
  if (code === "KES") return "BASE";
  const c = CUR_BY[code];
  const valPer1Usd = convert(129, code);
  if (valPer1Usd >= 1) return `1 USD ≈ ${Math.round(valPer1Usd).toLocaleString()} ${code}`;
  return `1 ${code} ≈ ${Math.round(1/c.rate).toLocaleString()} KES`;
}
function lookupItem(id) {
  return [...PHOTO, ...VIDEO, ...BUNDLES, ...ADDONS].find(x => x.id === id);
}
function categoryOf(id) {
  if (id.startsWith("p")) return "PHOTOGRAPHY";
  if (id.startsWith("v")) return "VIDEOGRAPHY";
  if (id.startsWith("b")) return "BUNDLE";
  if (id.startsWith("a")) return "ADD-ON";
  return "";
}

// =================== RENDER: CARDS ===================
function renderCards(group, list) {
  const root = document.querySelector(`[data-cards="${group}"]`);
  if (!root) return;
  root.innerHTML = list.map((s, i) => `
    <li class="card" data-id="${s.id}" data-hover>
      <span class="card-idx">${String(i+1).padStart(2,"0")}</span>
      <div class="card-title">
        <h3>${s.title}${s.badge ? `<span class="badge">${s.badge}</span>` : ""}</h3>
        <p>${s.desc}</p>
      </div>
      <ul class="card-incl">
        ${s.incl.map(x => `<li>${x}</li>`).join("")}
      </ul>
      <div class="card-meta">
        <span><span class="meta-l">DURATION</span>${s.dur}</span>
      </div>
      <div class="card-meta">
        <span><span class="meta-l">DELIVERY</span>${s.del}</span>
      </div>
      <div class="card-price" data-price="${s.price}">
        ${s.from ? "FROM " : ""}<span class="price-v">${fmt(s.price)}</span>${s.from?"+":""}
        <span class="alt">≈ ${fmtAlt(s.price)}${s.from?"+":""}</span>
        ${s.was ? `<span class="was">WAS <s>${fmt(s.was,"KES")}</s></span>` : ""}
      </div>
      <button class="card-add" data-add="${s.id}" data-hover aria-label="Add ${s.title}"><span>+</span></button>
    </li>
  `).join("");
}

// =================== RENDER: BUNDLES ===================
function renderBundles() {
  const root = document.getElementById("bundles");
  root.innerHTML = BUNDLES.map(b => `
    <article class="bundle ${b.featured ? "featured" : ""}" data-id="${b.id}" data-hover>
      ${b.tag ? `<span class="bundle-tag">${b.tag}</span>` : ""}
      <div class="bundle-name">${b.name}</div>
      <div class="bundle-price" data-price="${b.price}">
        ${b.from ? "FROM " : ""}<span class="price-v">${fmt(b.price)}</span>${b.from?"+":""}
        <span class="alt">≈ ${fmtAlt(b.price)}${b.from?"+":""}</span>
      </div>
      <div class="bundle-sub">${b.sub}</div>
      <ul class="bundle-feats">
        ${b.feats.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <button class="bundle-cta" data-add="${b.id}" data-hover>ADD TO BRIEF →</button>
    </article>
  `).join("");
}

// =================== RENDER: ADDONS ===================
function renderAddons() {
  const root = document.getElementById("addons-list");
  root.innerHTML = ADDONS.map((a, i) => `
    <li class="addon" data-id="${a.id}" data-hover>
      <span class="addon-num">${String(i+1).padStart(2,"0")}</span>
      <div class="addon-body">
        <h4>${a.name}</h4>
        <p>${a.desc}</p>
      </div>
      <div class="addon-price" data-price="${a.price || 0}">
        ${a.price ? `<span class="price-v">${fmt(a.price)}</span><span class="alt">≈ ${fmtAlt(a.price)}</span>` : `<em>${a.priceLabel}</em>`}
      </div>
      ${a.price ? `<button class="addon-add" data-add="${a.id}" data-hover><span>+</span></button>` : `<span class="addon-add" style="opacity:.3;pointer-events:none">·</span>`}
    </li>
  `).join("");
}

// =================== RENDER: RETAINERS ===================
function renderRetainers() {
  const root = document.getElementById("retainers-grid");
  root.innerHTML = RETAINERS.map(r => `
    <article class="retainer" data-hover>
      <div class="retainer-name">${r.name}</div>
      <div class="retainer-price ${!r.price ? "custom" : ""}" data-price="${r.price || 0}">
        ${r.price ? `<span class="price-v">${fmt(r.price)}</span><span class="alt">≈ ${fmtAlt(r.price)}</span>` : r.priceLabel}
      </div>
      <div class="retainer-per">${r.per || "PER MONTH"}</div>
      <ul class="retainer-feats">
        ${r.feats.map(f => `<li>${f}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

// =================== CURRENCY ===================
const curBtn = document.getElementById("curBtn");
const curMenu = document.getElementById("curMenu");
const curWrap = document.querySelector(".cur-wrap");
const curCodeEl = document.getElementById("curCode");

function renderCurMenu() {
  curMenu.innerHTML = CURRENCIES.map(c => `
    <li data-code="${c.code}" data-hover class="${c.code === currency ? "active" : ""}">
      <span class="opt-code">${c.code}</span>
      <span class="opt-name">${c.name}</span>
      <span class="opt-rate">${rateLabel(c.code)}</span>
    </li>
  `).join("");
  curMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      currency = li.dataset.code;
      curCodeEl.textContent = currency;
      updatePrices();
      renderCurMenu();
      closeCurMenu();
    });
  });
}
function openCurMenu(){curWrap.classList.add("open");curMenu.hidden=false;}
function closeCurMenu(){curWrap.classList.remove("open");curMenu.hidden=true;}
curBtn.addEventListener("click", e => {
  e.stopPropagation();
  curWrap.classList.contains("open") ? closeCurMenu() : openCurMenu();
});
document.addEventListener("click", e => { if (!curWrap.contains(e.target)) closeCurMenu(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCurMenu(); });

function updatePrices() {
  document.querySelectorAll("[data-price]").forEach(el => {
    const p = Number(el.dataset.price);
    if (!p) return;
    const v = el.querySelector(".price-v");
    const a = el.querySelector(".alt");
    if (v) v.textContent = fmt(p);
    if (a) a.textContent = `≈ ${fmtAlt(p)}`;
  });
  renderBasket();
}

// =================== BASKET ===================
function toggleBasket(id) {
  if (basket.has(id)) basket.delete(id);
  else { const it = lookupItem(id); if (it && it.price) basket.set(id, it); }
  renderBasket();
  updateAddBtns();
}
function updateAddBtns() {
  document.querySelectorAll("[data-add]").forEach(b => {
    b.classList.toggle("added", basket.has(b.dataset.add));
  });
}
function renderBasket() {
  const list = document.getElementById("basket-list");
  const primary = document.getElementById("basketPrimary");
  const alt = document.getElementById("basketAlt");
  const email = document.getElementById("basketEmail");
  if (basket.size === 0) {
    list.innerHTML = '<li class="basket-empty">Nothing selected yet. Pick a service above.</li>';
    primary.textContent = fmt(0) || `${currency} 0`;
    primary.textContent = `${currency} 0`;
    alt.textContent = `≈ ${currency === "KES" ? "USD" : "KES"} 0`;
    email.href = "mailto:hello@garejesse.com";
    return;
  }
  let total = 0;
  list.innerHTML = [...basket.values()].map(i => {
    total += i.price;
    return `<li class="basket-item">
      <div class="basket-item-name">${i.title || i.name}<small>${categoryOf(i.id)}</small></div>
      <div class="basket-item-price">${fmt(i.price)}</div>
      <button class="basket-rm" data-rm="${i.id}" data-hover>×</button>
    </li>`;
  }).join("");
  primary.textContent = fmt(total);
  alt.textContent = `≈ ${fmtAlt(total)}`;
  const body = encodeURIComponent(
    "Hi Gare Jesse Productions,\n\nI'd like to brief you on this package:\n\n" +
    [...basket.values()].map(i => `• ${i.title || i.name} — ${fmt(i.price, "KES")}`).join("\n") +
    `\n\nSubtotal: ${fmt(total, "KES")} (≈ ${fmt(total, "USD")})\n\nBest,`
  );
  email.href = `mailto:hello@garejesse.com?subject=${encodeURIComponent("Project brief — Gare Jesse Productions")}&body=${body}`;
  list.querySelectorAll("[data-rm]").forEach(b => {
    b.addEventListener("click", () => toggleBasket(b.dataset.rm));
  });
}
document.getElementById("basketClear").addEventListener("click", () => {
  basket.clear(); renderBasket(); updateAddBtns();
});
document.body.addEventListener("click", e => {
  const b = e.target.closest("[data-add]");
  if (!b) return;
  toggleBasket(b.dataset.add);
});

// =================== SCROLL PROGRESS ===================
const sp = document.getElementById("scrollProg");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  sp.style.width = p + "%";
}, { passive: true });

// =================== INIT ===================
renderCards("photo", PHOTO);
renderCards("video", VIDEO);
renderBundles();
renderAddons();
renderRetainers();
renderCurMenu();
renderBasket();
