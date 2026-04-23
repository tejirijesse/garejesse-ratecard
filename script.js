// ========== Data ==========
const USD_RATE = 129;

const photoServices = [
  {id:"p1",title:"Portrait Session",desc:"Individual, couple, family, or professional headshots. Studio or outdoor locations in Nairobi.",includes:["Pre-shoot style consult","1 outfit change","Full retouching"],duration:"2 hrs",deliverables:"30 edited images",price:12000},
  {id:"p2",title:"Editorial & Fashion",desc:"High-fashion, lookbooks, magazine-style shoots for brands and designers.",badge:"Brand-ready",includes:["Concept development","Moodboard prep","Up to 3 looks","Full post-production"],duration:"4–6 hrs",deliverables:"60 edited images",price:35000},
  {id:"p3",title:"Product & Commercial",desc:"E-commerce, packshots, hero images, and social media product content.",includes:["Studio lighting setup","Up to 10 SKUs","White / lifestyle backgrounds"],duration:"Half-day",deliverables:"40 edited images",price:28000},
  {id:"p4",title:"Corporate & Event",desc:"Conferences, galas, press events, product launches, and award ceremonies.",badge:"Most requested",includes:["On-site coverage (full day)","Same-day social teaser","48-hr full delivery"],duration:"Up to 8 hrs",deliverables:"150 edited images",price:45000},
  {id:"p5",title:"Real Estate & Architecture",desc:"Interior, exterior, and aerial photography for property listings and developers.",includes:["HDR composite editing","Sky replacement (if needed)","Drone available (add-on)"],duration:"3–4 hrs",deliverables:"35 edited images",price:22000},
  {id:"p6",title:"Wedding Photography",desc:"Full-day wedding coverage from preparations to reception.",includes:["Pre-wedding consult","Second shooter (at 80K+)","Online album delivery","Print-ready files"],duration:"Full day (10 hrs)",deliverables:"300+ edited images",price:65000,from:true},
];

const videoServices = [
  {id:"v1",title:"Social Media Reel",desc:"Instagram / TikTok / YouTube Shorts content. Fast-paced, vertical-first storytelling.",includes:["Shoot + edit","Captions / text overlay","Optimised export formats"],duration:"2–3 hrs shoot",deliverables:"60–90 sec reel",price:18000},
  {id:"v2",title:"Corporate Brand Film",desc:"Company profiles, investor pitches, product demos, and brand storytelling films.",badge:"High value",includes:["Scriptwriting / storyboard","Director's treatment","Interview setups","Colour grade + audio mix"],duration:"1–2 shoot days",deliverables:"3–5 min film",price:75000},
  {id:"v3",title:"Music Video",desc:"Narrative, performance, or conceptual music videos for artists and labels.",includes:["Concept & treatment","Location scouting","Crew (DP, gaffer, AC)","Professional grade + VFX"],duration:"1–3 shoot days",deliverables:"3–6 min + cuts",price:95000,from:true},
  {id:"v4",title:"Documentary Short",desc:"Community stories, founder profiles, NGO impact films, and cultural documentaries.",includes:["Research + pre-production","Multi-day shoot access","Cinematic grade","Festival-ready delivery"],duration:"2–5 shoot days",deliverables:"8–20 min film",price:120000,from:true},
  {id:"v5",title:"Event Highlight Reel",desc:"Conferences, activations, concerts, and cultural events. Shareable the same evening.",includes:["Multi-camera coverage","Same-day teaser (optional)","48-hr full reel delivery"],duration:"Full event day",deliverables:"2–4 min reel",price:50000},
  {id:"v6",title:"Wedding Videography",desc:"Cinematic wedding films — from vows to reception. Emotional, beautiful, timeless.",includes:["2-person crew","Cinematic + documentary cuts","Drone available (add-on)","Licensed soundtrack"],duration:"Full day (10 hrs)",deliverables:"5 min film + SDE",price:80000,from:true},
];

const bundles = [
  {id:"b1",name:"Starter Bundle",price:28000,sub:"Half-day · 4 hrs",feats:["1 location","40 edited photos","60-sec reel","3-day turnaround","Online gallery"]},
  {id:"b2",name:"Signature Bundle",price:65000,sub:"Full day · up to 8 hrs",tag:"Best Value",featured:true,feats:["Up to 3 locations","120 edited photos","3-min brand film","Social cut-downs (3)","Colour grade","Usage rights included","2-day turnaround"]},
  {id:"b3",name:"Campaign Bundle",price:150000,sub:"Multi-day · bespoke scope",from:true,feats:["Brand strategy session","Full crew on set","Director's treatment","Unlimited edited photos","Bespoke film length","Raw files + full licence","Priority delivery"]},
];

const addons = [
  {id:"a1",name:"Drone Footage",desc:"DJI · 30 min flight · edited aerial cuts",price:8000},
  {id:"a2",name:"Rush Delivery",desc:"Same-day or next-morning turnaround",price:10000},
  {id:"a3",name:"Extra Short-Form Cut",desc:"Additional 30–60 sec edit from existing footage",price:5000},
  {id:"a4",name:"RAW File Handover",desc:"All unedited files transferred via hard drive",price:15000},
  {id:"a5",name:"Motion Graphics / Titles",desc:"Animated lower thirds, intros, logo stings",price:12000},
  {id:"a6",name:"Second Shooter / Photographer",desc:"Additional crew member for larger events",price:12000},
  {id:"a7",name:"Voiceover Recording",desc:"Professional VO talent + studio recording",price:8000},
  {id:"a8",name:"Extended Usage Licence",desc:"Broadcast, OOH, paid advertising rights",price:20000},
  {id:"a9",name:"Travel & Accommodation",desc:"Outside Nairobi — quoted per project",price:null,priceLabel:"Quote"},
  {id:"a10",name:"Social Media Management",desc:"Caption writing, scheduling, 1-week posts",price:10000},
];

const retainers = [
  {id:"r1",name:"Starter",price:40000,feats:["1 shoot day / month","20 edited photos","1 × 60-sec reel","3-day turnaround","Social formats included"]},
  {id:"r2",name:"Growth",price:65000,feats:["2 shoot days / month","50 edited photos","2 × 90-sec reels","Priority scheduling","Content calendar consult"]},
  {id:"r3",name:"Brand Partner",price:100000,feats:["4 shoot days / month","100 edited photos","4 reels + 1 brand film","Drone included","Strategy session monthly","Dedicated account mgr"]},
  {id:"r4",name:"Enterprise",price:null,priceLabel:"Custom",per:"annual contract",feats:["Unlimited shoot days","Full creative direction","Multi-platform strategy","Dedicated team assigned","SLA & delivery guarantee","Annual campaign planning"]},
];

const terms = [
  {title:"Booking & Deposit",body:"A 50% non-refundable deposit is required to confirm all bookings. The remaining 50% is due on or before the day of the shoot. Retainer clients are invoiced on the 1st of each month."},
  {title:"Cancellation Policy",body:"Cancellations within 48 hrs of the shoot date forfeit the full deposit. Reschedules are accommodated once at no charge with minimum 72-hr notice, subject to availability."},
  {title:"Delivery & Revisions",body:"Standard delivery is 3–5 business days. Each project includes one round of edit revisions. Additional revision rounds are billed at KES 3,000 per round."},
  {title:"Copyright & Usage",body:"Gare Jesse Productions retains copyright on all original work. Clients receive a non-exclusive licence for agreed digital and print use. Broadcast or paid advertising rights require the Extended Usage add-on."},
  {title:"Taxes",body:"All prices are exclusive of 16% VAT where applicable. USD rates are indicative only, based on an exchange rate of KES 129/USD. Invoices are issued in KES."},
  {title:"Travel",body:"All sessions within Nairobi city limits are priced as listed. Travel outside Nairobi (Thika, Nakuru, Mombasa, etc.) includes transport, accommodation, and per diem, quoted separately per project."},
];

// ========== State ==========
let currency = "KES";
const basket = new Map();

const fmtKES = n => "KES " + Number(n).toLocaleString("en-US");
const fmtUSD = n => "USD " + Math.round(Number(n)/USD_RATE).toLocaleString("en-US");
const fmt = n => currency === "KES" ? fmtKES(n) : fmtUSD(n);
const fmtBoth = n => `${fmtKES(n)} <small>≈ ${fmtUSD(n)}</small>`;

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
          ${s.from?"FROM ":""}<span class="price-value">${fmt(s.price)}</span>
          <small>${currency==="KES"?`≈ ${fmtUSD(s.price)}`:`≈ ${fmtKES(s.price)}`}</small>
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
        <small>${currency==="KES"?`≈ ${fmtUSD(b.price)}`:`≈ ${fmtKES(b.price)}`}</small>
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
        ${a.price?`<span class="price-value">${fmt(a.price)}</span><small>${currency==="KES"?`≈ ${fmtUSD(a.price)}`:`≈ ${fmtKES(a.price)}`}</small>`:`<em>${a.priceLabel}</em>`}
      </div>
      ${a.price?`<button class="addon-add" data-add="${a.id}" data-hover><span>+</span></button>`:`<span class="addon-add" style="opacity:.3;pointer-events:none">·</span>`}
    </li>
  `).join("");
}

// ========== Render: retainers ==========
function renderRetainers(){
  const root = document.getElementById("retainers");
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

// ========== Render: terms ==========
function renderTerms(){
  const root = document.getElementById("termsList");
  root.innerHTML = terms.map((t,i)=>`
    <div class="term">
      <button class="term-btn" data-hover>
        <span class="term-num">${String(i+1).padStart(2,"0")}</span>
        <span class="term-title">${t.title}</span>
        <span class="term-icon">+</span>
      </button>
      <div class="term-body"><p>${t.body}</p></div>
    </div>
  `).join("");
  root.querySelectorAll(".term-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      btn.parentElement.classList.toggle("open");
    });
  });
}

// ========== Currency toggle ==========
function updatePrices(){
  document.querySelectorAll("[data-price]").forEach(el=>{
    const p = Number(el.dataset.price);
    if(!p) return;
    const primary = el.querySelector(".price-value");
    const alt = el.querySelector("small");
    if(primary) primary.textContent = fmt(p);
    if(alt) alt.textContent = currency==="KES"?`≈ ${fmtUSD(p)}`:`≈ ${fmtKES(p)}`;
  });
  renderBasket();
}

document.getElementById("currencySwitch").addEventListener("click",()=>{
  currency = currency==="KES"?"USD":"KES";
  document.getElementById("currencySwitch").classList.toggle("usd",currency==="USD");
  updatePrices();
});

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
renderTerms();
renderBasket();

// Add-to-basket delegation (after render)
document.body.addEventListener("click",e=>{
  const btn = e.target.closest("[data-add]");
  if(!btn) return;
  toggleBasket(btn.dataset.add);
});

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
