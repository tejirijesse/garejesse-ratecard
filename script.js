// ========== Data ==========
// Rates are target-units per 1 KES (base). Updated early 2026.
const CURRENCIES = [
  {code:"KES",name:"Kenyan Shilling",rate:1,       dec:0},
  {code:"USD",name:"US Dollar",      rate:1/129,   dec:0},
  {code:"EUR",name:"Euro",           rate:1/140,   dec:0},
  {code:"GBP",name:"Pound Sterling", rate:1/163,   dec:0},
  {code:"NGN",name:"Nigerian Naira", rate:11.86,   dec:0},
  {code:"UGX",name:"Ugandan Shilling",rate:30.2,   dec:0},
  {code:"RWF",name:"Rwandan Franc",  rate:10.47,   dec:0},
  {code:"ZAR",name:"South African Rand",rate:0.143,dec:0},
  {code:"GHS",name:"Ghanaian Cedi",  rate:0.116,   dec:0},
];
const CUR_BY_CODE = Object.fromEntries(CURRENCIES.map(c=>[c.code,c]));
const USD_RATE = 129; // legacy constant kept for reference

const photoServices = [
  {id:"p1",title:"Portrait Session",desc:"Individual, couple, family, or professional headshots. Studio or outdoor.",includes:["Style consult","1 outfit change","Full retouching"],duration:"2 hrs",deliverables:"30 edited images",price:12000},
  {id:"p2",title:"Editorial & Fashion",desc:"Lookbooks, magazine-style shoots for brands and designers.",badge:"Brand-ready",includes:["Concept + moodboard","Up to 3 looks","Full post-production"],duration:"4–6 hrs",deliverables:"60 edited images",price:35000},
  {id:"p3",title:"Product & Commercial",desc:"E-commerce, packshots, hero images, and social media product content.",includes:["Studio lighting","Up to 10 SKUs","White + lifestyle BGs"],duration:"Half-day",deliverables:"40 edited images",price:50000,was:28000},
  {id:"p4",title:"Corporate & Event",desc:"Conferences, galas, launches, award ceremonies.",badge:"Most requested",includes:["Full-day coverage","Same-day social teaser","48-hr full delivery"],duration:"Up to 8 hrs",deliverables:"150 edited images",price:45000},
  {id:"p5",title:"Real Estate & Architecture",desc:"Interior, exterior, and aerial property photography for developers.",includes:["HDR composite editing","Sky replacement","Drone available (add-on)"],duration:"3–4 hrs",deliverables:"35 edited images",price:22000},
  {id:"p6",title:"Wedding Photography",desc:"Full-day coverage from preparations to reception. Cinematic, not candid.",includes:["Pre-wedding consult","Second shooter (95K+)","Print-ready files"],duration:"Full day (10 hrs)",deliverables:"300+ edited images",price:95000,was:65000,from:true},
];

const videoServices = [
  {id:"v1",title:"Social Media Reel",desc:"Instagram / TikTok / YouTube Shorts. Vertical-first, fast-paced storytelling.",includes:["Shoot + edit","Captions + text overlay","Platform-optimised exports"],duration:"2–3 hrs shoot",deliverables:"60–90 sec reel",price:18000},
  {id:"v2",title:"Corporate Brand Film",desc:"Company profiles, investor pitches, product demos, brand story films.",badge:"High value",includes:["Script + storyboard","Director's treatment","Interview setups","Colour + audio mix"],duration:"1–2 shoot days",deliverables:"3–5 min film",price:75000},
  {id:"v3",title:"Music Video",desc:"Narrative, performance, or conceptual MVs for artists and labels.",includes:["Concept + treatment","Location scouting","Crew: DP, gaffer, AC","Grade + VFX"],duration:"1–3 shoot days",deliverables:"3–6 min + cuts",price:180000,was:95000,from:true},
  {id:"v4",title:"Documentary Short",desc:"Community stories, founder profiles, NGO impact films, cultural docs.",includes:["Research + pre-prod","Multi-day shoot access","Cinematic grade","Festival-ready delivery"],duration:"2–5 shoot days",deliverables:"8–20 min film",price:250000,was:120000,from:true},
  {id:"v5",title:"Event Highlight Reel",desc:"Conferences, activations, concerts. Shareable the same evening.",includes:["Multi-camera coverage","Same-day teaser (optional)","48-hr full reel"],duration:"Full event day",deliverables:"2–4 min reel",price:50000},
  {id:"v6",title:"Wedding Videography",desc:"Cinematic wedding films — vows to reception. Emotional, timeless.",includes:["2-person crew","Cinematic + doc cuts","Licensed soundtrack","Drone (add-on)"],duration:"Full day (10 hrs)",deliverables:"5 min film + SDE",price:80000,from:true},
];

const bundles = [
  {id:"b1",name:"Starter Bundle",price:28000,sub:"Half-day · 4 hrs",feats:["1 location","40 edited photos","60-sec reel","3-day turnaround","Online gallery"]},
  {id:"b2",name:"Signature Bundle",price:65000,sub:"Full day · up to 8 hrs",tag:"Best Value",featured:true,feats:["Up to 3 locations","120 edited photos","3-min brand film","3 social cut-downs","Colour grade","Usage rights included","2-day turnaround"]},
  {id:"b3",name:"Campaign Bundle",price:180000,sub:"Multi-day · bespoke",from:true,feats:["Brand strategy session","Full crew on set","Director's treatment","Unlimited edited photos","Bespoke film length","Raw files + full licence","Priority delivery"]},
];

const addons = [
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

const retainers = [
  {id:"r1",name:"Starter",price:40000,feats:["1 shoot day / month","20 edited photos","1 × 60-sec reel","3-day turnaround","Social formats"]},
  {id:"r2",name:"Growth",price:65000,feats:["2 shoot days / month","50 edited photos","2 × 90-sec reels","Priority scheduling","Content calendar"]},
  {id:"r3",name:"Brand Partner",price:100000,feats:["4 shoot days / month","100 edited photos","4 reels + 1 brand film","Drone included","Monthly strategy call"]},
  {id:"r4",name:"Enterprise",price:null,priceLabel:"Custom",per:"annual contract",feats:["Unlimited shoot days","Full creative direction","Multi-platform strategy","Dedicated team","Annual campaign plan"]},
];

// ========== State ==========
let currency = "KES";
const basket = new Map();

function convert(kes, code){
  const c = CUR_BY_CODE[code] || CUR_BY_CODE.KES;
  return kes * c.rate;
}
function fmtIn(kes, code){
  const c = CUR_BY_CODE[code] || CUR_BY_CODE.KES;
  const v = convert(kes, code);
  const rounded = c.dec>0 ? v.toFixed(c.dec) : Math.round(v);
  return `${c.code} ${Number(rounded).toLocaleString("en-US",{maximumFractionDigits:c.dec})}`;
}
const fmtKES = n => fmtIn(n,"KES");
const fmtUSD = n => fmtIn(n,"USD");
const fmt = n => fmtIn(n, currency);
// Alternate readout — always show KES next to non-KES
const fmtAlt = n => currency === "KES" ? fmtIn(n,"USD") : fmtIn(n,"KES");

// ========== Render: service cards ==========
function renderCards(group, list){
  const root = document.querySelector(`[data-price-group="${group}"]`);
  root.innerHTML = list.map((s,i) => `
    <article class="card fade-up" data-id="${s.id}" data-hover>
      <span class="card-index">${String(i+1).padStart(2,"0")}</span>
      <div class="card-title">
        <h3>${s.title}${s.badge?`<span class="card-badge">${s.badge}</span>`:""}</h3>
        <p>${s.desc}</p>
      </div>
      <ul class="card-includes">
        ${s.includes.map(x=>`<li>${x}</li>`).join("")}
      </ul>
      <div class="card-meta">
        <span class="meta-label">Duration</span>${s.duration}
      </div>
      <div class="card-meta">
        <span class="meta-label">Delivery</span>${s.deliverables}
      </div>
      <div class="card-right">
        <div class="card-price" data-price="${s.price}">
          ${s.from?"FROM ":""}<span class="price-value">${fmt(s.price)}</span>${s.from?"+":""}
          <small>≈ ${fmtAlt(s.price)}${s.from?"+":""}</small>
          ${s.was?`<span class="was-price">was <s>${fmtKES(s.was)}</s></span>`:""}
        </div>
      </div>
      <button class="card-add" data-add="${s.id}" data-hover aria-label="Add ${s.title}"><span>+</span></button>
    </article>
  `).join("");
}

// ========== Render: bundles ==========
function renderBundles(){
  const root = document.querySelector('[data-price-group="bundle"]');
  root.innerHTML = bundles.map(b => `
    <article class="bundle ${b.featured?"featured":""} fade-up" data-id="${b.id}" data-hover>
      ${b.tag?`<span class="bundle-tag">${b.tag}</span>`:""}
      <div class="bundle-name">${b.name}</div>
      <div class="bundle-price" data-price="${b.price}">
        ${b.from?"from ":""}<span class="price-value">${fmt(b.price)}</span>
        <small>≈ ${fmtAlt(b.price)}</small>
      </div>
      <div class="bundle-sub">${b.sub}</div>
      <ul class="bundle-feats">
        ${b.feats.map(f=>`<li>${f}</li>`).join("")}
      </ul>
      <button class="bundle-cta" data-add="${b.id}" data-hover>Add to Brief</button>
    </article>
  `).join("");
}

// ========== Render: addons ==========
function renderAddons(){
  const root = document.getElementById("addonsList");
  root.innerHTML = addons.map((a,i)=>`
    <li class="addon fade-up" data-id="${a.id}" data-hover>
      <span class="addon-num">${String(i+1).padStart(2,"0")}</span>
      <div class="addon-body">
        <h4>${a.name}</h4>
        <p>${a.desc}</p>
      </div>
      <div class="addon-price" data-price="${a.price||0}">
        ${a.price?`<span class="price-value">${fmt(a.price)}</span><small>≈ ${fmtAlt(a.price)}</small>`:`<em>${a.priceLabel}</em>`}
      </div>
      ${a.price?`<button class="addon-add" data-add="${a.id}" data-hover><span>+</span></button>`:`<span class="addon-add" style="opacity:.3;pointer-events:none">·</span>`}
    </li>
  `).join("");
}

// ========== Render: retainers ==========
function renderRetainers(){
  const root = document.getElementById("retainersGrid");
  root.innerHTML = retainers.map(r=>`
    <article class="retainer fade-up" data-hover>
      <div class="retainer-name">${r.name}</div>
      <div class="retainer-price ${!r.price?"custom":""}" data-price="${r.price||0}">
        ${r.price?`<span class="price-value">${fmt(r.price)}</span>`:r.priceLabel}
      </div>
      <div class="retainer-per">${r.per||"per month"}</div>
      <ul class="retainer-feats">
        ${r.feats.map(f=>`<li>→ ${f}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

// ========== Currency toggle ==========
function updatePrices(){
  document.querySelectorAll("[data-price]").forEach(el=>{
    const p = Number(el.dataset.price);
    if(!p) return;
    const primary = el.querySelector(".price-value");
    const alt = el.querySelector("small");
    if(primary) primary.textContent = fmt(p);
    if(alt) alt.textContent = `≈ ${fmtAlt(p)}`;
  });
  renderBasket();
}

// Currency dropdown
const curPicker = document.getElementById("currencyPicker");
const curTrigger = document.getElementById("curTrigger");
const curMenu = document.getElementById("curMenu");
const curCodeEl = document.getElementById("curCode");
const curRateEl = document.getElementById("curRate");

function rateLabel(code){
  const c = CUR_BY_CODE[code];
  if(code==="KES") return "Base";
  const perKes = c.rate;
  // Show how many of currency per 1 USD for intuition; fall back to "1 KES ≈ x"
  const valPer1Usd = convert(129, code); // 129 KES = 1 USD
  if(valPer1Usd >= 1){
    return `1 USD ≈ ${Math.round(valPer1Usd).toLocaleString()} ${code}`;
  }
  return `1 ${code} ≈ ${Math.round(1/perKes).toLocaleString()} KES`;
}

function renderCurMenu(){
  curMenu.innerHTML = CURRENCIES.map(c=>`
    <li data-code="${c.code}" class="${c.code===currency?"active":""}" data-hover role="option">
      <span class="opt-code">${c.code}</span>
      <span class="opt-name">${c.name}</span>
      <span class="opt-rate">${rateLabel(c.code)}</span>
    </li>
  `).join("");
  curMenu.querySelectorAll("li").forEach(li=>{
    li.addEventListener("click",()=>{
      currency = li.dataset.code;
      updateCurrencyUI();
      updatePrices();
      closeCurMenu();
    });
  });
}

function updateCurrencyUI(){
  curCodeEl.textContent = currency;
  curRateEl.textContent = currency==="KES" ? "Base" : rateLabel(currency).replace(/^1 /,"");
  renderCurMenu();
}

function openCurMenu(){curPicker.classList.add("open");curMenu.hidden=false;curTrigger.setAttribute("aria-expanded","true");}
function closeCurMenu(){curPicker.classList.remove("open");curMenu.hidden=true;curTrigger.setAttribute("aria-expanded","false");}

curTrigger.addEventListener("click",(e)=>{
  e.stopPropagation();
  curPicker.classList.contains("open") ? closeCurMenu() : openCurMenu();
});
document.addEventListener("click",(e)=>{
  if(!curPicker.contains(e.target)) closeCurMenu();
});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape") closeCurMenu();});

renderCurMenu();
updateCurrencyUI();

// ========== Basket ==========
function lookupItem(id){
  return [...photoServices,...videoServices,...bundles,...addons].find(x=>x.id===id);
}

function toggleBasket(id){
  if(basket.has(id)){basket.delete(id);}
  else{const item = lookupItem(id); if(item && item.price) basket.set(id,item);}
  renderBasket();
  updateAddButtons();
}

function updateAddButtons(){
  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.classList.toggle("added",basket.has(btn.dataset.add));
  });
}

function renderBasket(){
  const list = document.getElementById("basketList");
  const kes = document.getElementById("basketKes");
  const usd = document.getElementById("basketUsd");
  const email = document.getElementById("basketEmail");
  if(basket.size===0){
    list.innerHTML = '<li class="basket-empty">Nothing selected yet. Pick a service above — or just stare at the numbers.</li>';
    kes.textContent = "KES 0";
    usd.textContent = "≈ USD 0";
    email.href = "mailto:hello@garejesse.com";
    return;
  }
  let total = 0;
  const rows = [...basket.values()].map(i=>{
    total += i.price;
    return `<li class="basket-item">
      <div class="basket-item-name">${i.title||i.name}<small>${categoryOf(i.id)}</small></div>
      <div class="basket-item-price">${fmt(i.price)}</div>
      <button class="basket-remove" data-remove="${i.id}" data-hover aria-label="Remove">×</button>
    </li>`;
  }).join("");
  list.innerHTML = rows;
  kes.textContent = currency==="KES"?fmtKES(total):fmtUSD(total);
  usd.textContent = currency==="KES"?`≈ ${fmtUSD(total)}`:`≈ ${fmtKES(total)}`;
  const body = encodeURIComponent(
    "Hi Gare Jesse Productions,\n\nI'd like to brief you on this package:\n\n" +
    [...basket.values()].map(i=>`• ${i.title||i.name} — ${fmtKES(i.price)}`).join("\n") +
    `\n\nSubtotal: ${fmtKES(total)} (≈ ${fmtUSD(total)})\n\nBest,`
  );
  email.href = `mailto:hello@garejesse.com?subject=${encodeURIComponent("Project brief — Gare Jesse Productions")}&body=${body}`;

  list.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click",()=>toggleBasket(btn.dataset.remove));
  });
}

function categoryOf(id){
  if(id.startsWith("p"))return "Photography";
  if(id.startsWith("v"))return "Videography";
  if(id.startsWith("b"))return "Hybrid bundle";
  if(id.startsWith("a"))return "Add-on";
  return "";
}

document.getElementById("basketClear").addEventListener("click",()=>{
  basket.clear();renderBasket();updateAddButtons();
});

// ========== Render all ==========
renderCards("photo",photoServices);
renderCards("video",videoServices);
renderBundles();
renderAddons();
renderRetainers();
renderBasket();

// Add-to-basket delegation (after render)
document.body.addEventListener("click",e=>{
  const btn = e.target.closest("[data-add]");
  if(!btn) return;
  toggleBasket(btn.dataset.add);
});

// ========== Hero interactivity ==========
(function heroInit(){
  const hero = document.querySelector(".hero");
  if(!hero) return;

  // Split title letters into spans with staggered animation
  hero.querySelectorAll(".hero-title .line").forEach(line=>{
    const text = line.dataset.split || line.textContent;
    line.innerHTML = "";
    [...text].forEach((ch,i)=>{
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00a0" : ch;
      span.style.animationDelay = (0.18 + i*0.03) + "s";
      line.appendChild(span);
    });
  });

  // Rotating discipline
  const stage = document.getElementById("discStage");
  const pills = [...document.querySelectorAll(".disc-pill")];
  const words = [...stage.querySelectorAll(".disc-word")];
  let discIdx = 0;
  let discTimer;
  function showDisc(next,{manual=false}={}){
    if(next === discIdx) return;
    const prev = discIdx;
    discIdx = next;
    words[prev].classList.remove("is-active");
    words[prev].classList.add("is-exit");
    words[next].classList.remove("is-exit");
    words[next].classList.add("is-active");
    pills.forEach((p,i)=>p.classList.toggle("is-active",i===next));
    setTimeout(()=>words[prev].classList.remove("is-exit"),500);
    if(manual){clearInterval(discTimer); discTimer = setInterval(autoDisc,3800);}
  }
  function autoDisc(){showDisc((discIdx+1)%words.length);}
  pills.forEach((p,i)=>p.addEventListener("click",()=>showDisc(i,{manual:true})));
  discTimer = setInterval(autoDisc,3800);

  // Live Nairobi clock (UTC+3)
  const clockEl = document.getElementById("heroClock");
  function tickClock(){
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset()*60000;
    const nairobi = new Date(utc + 3*3600000);
    const pad = n => String(n).padStart(2,"0");
    clockEl.textContent = `${pad(nairobi.getHours())}:${pad(nairobi.getMinutes())}:${pad(nairobi.getSeconds())}`;
  }
  tickClock();
  setInterval(tickClock,1000);

  // Mouse parallax + spotlight
  const titleWrap = document.getElementById("heroTitleWrap");
  const spot = document.getElementById("heroSpot");
  let rect = hero.getBoundingClientRect();
  window.addEventListener("resize",()=>{rect = hero.getBoundingClientRect();});
  hero.addEventListener("mousemove",e=>{
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // spotlight
    spot.style.setProperty("--mx", (x*100)+"%");
    spot.style.setProperty("--my", (y*100)+"%");
    // parallax tilt on title
    const rx = (0.5 - y) * 6;
    const ry = (x - 0.5) * 8;
    const tx = (x - 0.5) * 14;
    const ty = (y - 0.5) * 8;
    titleWrap.style.transform = `translate3d(${tx}px,${ty}px,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  hero.addEventListener("mouseleave",()=>{
    titleWrap.style.transform = "";
  });

  // Magnetic scroll cue
  const cue = document.getElementById("scrollCue");
  hero.addEventListener("mousemove",e=>{
    const cr = cue.getBoundingClientRect();
    const cx = cr.left + cr.width/2;
    const cy = cr.top + cr.height/2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    cue.classList.toggle("magnet", dist < 120);
  });

  // Shutter click + frame counter (anywhere in hero not on interactive ctl)
  const shutter = document.getElementById("shutterFlash");
  const frameEl = document.getElementById("frameCount");
  let frames = 1;
  hero.addEventListener("click",e=>{
    if(e.target.closest("a, button")) return;
    shutter.classList.remove("fire"); void shutter.offsetWidth;
    shutter.classList.add("fire");
    frames = Math.min(frames+1, 999);
    frameEl.textContent = String(frames).padStart(3,"0");
  });
})();

// ========== Marquee ==========
const marq = document.getElementById("marquee");
const loop = "CINEMATOGRAPHY · PHOTOGRAPHY · BRANDED CONTENT · NAIROBI · EST. 2020 · ";
marq.innerHTML = `<span>${loop.repeat(8)}</span>`;

// ========== Scroll progress ==========
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = p + "%";
},{passive:true});

// ========== Intersection Observer fade-up ==========
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}
  });
},{threshold:.12,rootMargin:"0px 0px -60px 0px"});
document.querySelectorAll(".fade-up").forEach(el=>io.observe(el));

// ========== Custom cursor ==========
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx=0,my=0,rx=0,ry=0;
window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
function tick(){
  rx += (mx-rx)*.18; ry += (my-ry)*.18;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(tick);
}
tick();
document.body.addEventListener("mouseover",e=>{
  if(e.target.closest("[data-hover], a, button")){
    ring.classList.add("hover"); cur.classList.add("hover");
  }
});
document.body.addEventListener("mouseout",e=>{
  if(e.target.closest("[data-hover], a, button")){
    ring.classList.remove("hover"); cur.classList.remove("hover");
  }
});

// Shutter-click pulse on click
window.addEventListener("click",()=>{
  cur.classList.add("click");
  setTimeout(()=>cur.classList.remove("click"),180);
});
