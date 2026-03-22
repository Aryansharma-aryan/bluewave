import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   BlueWave — Countries We Serve
   Dual marquee rows · Premium cards
   Flag + landscape photo + visa info
══════════════════════════════════════════════ */

const COUNTRIES = [
  {
    flag:"🇨🇦", name:"Canada", code:"CA",
    tagline:"Start Fresh in the North",
    desc:"Express Entry, PNP & Student Visas. One of the world's most welcoming immigration systems with clear PR pathways.",
    visas:["Express Entry","Study Permit","Work Visa","PNP"],
    color:"#DC2626", colorLight:"#FFF1F1",
    img:"https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇺🇸", name:"USA", code:"US",
    tagline:"Live the American Dream",
    desc:"H-1B, F-1, B1/B2 and Green Card pathways. Expert guidance for every US visa category from our specialist team.",
    visas:["H-1B Work","F-1 Student","B1/B2 Tourist","Green Card"],
    color:"#2563EB", colorLight:"#EFF6FF",
    img:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇬🇧", name:"United Kingdom", code:"GB",
    tagline:"Your Gateway to Europe",
    desc:"Skilled Worker, Student, and Visitor visas. Trusted guidance for all UK immigration routes post-Brexit.",
    visas:["Skilled Worker","Student Visa","Visitor Visa","Global Talent"],
    color:"#7C3AED", colorLight:"#F5F3FF",
    img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇦🇺", name:"Australia", code:"AU",
    tagline:"Life Under the Southern Stars",
    desc:"Skilled migration, student visas & TSS 482. Australia's points-based system simplified for you.",
    visas:["Skilled Migration","Student Visa","TSS 482","Partner Visa"],
    color:"#0369A1", colorLight:"#EFF8FF",
    img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇳🇿", name:"New Zealand", code:"NZ",
    tagline:"Where Nature Meets Opportunity",
    desc:"Skilled Migrant Category, Work to Residence and Student visas. A peaceful fresh start in the Pacific.",
    visas:["Skilled Migrant","Work to Residence","Student Visa","Visitor Visa"],
    color:"#059669", colorLight:"#ECFDF5",
    img:"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇩🇪", name:"Germany", code:"DE",
    tagline:"Europe's Economic Powerhouse",
    desc:"Job Seeker, Blue Card and Student visas for skilled professionals seeking a strong European base.",
    visas:["EU Blue Card","Job Seeker Visa","Student Visa","Work Permit"],
    color:"#374151", colorLight:"#F9FAFB",
    img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇪🇺", name:"Europe", code:"EU",
    tagline:"Explore 27 Nations",
    desc:"Schengen visas, student permits, and work authorizations across all major European nations.",
    visas:["Schengen Visa","Student Permit","Work Authorization","Long-Stay Visa"],
    color:"#D97706", colorLight:"#FFFBEB",
    img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇸🇬", name:"Singapore", code:"SG",
    tagline:"Asia's Business Capital",
    desc:"Employment Pass, S Pass, and Dependent passes for Asia's most dynamic and connected financial hub.",
    visas:["Employment Pass","S Pass","Student Pass","Dependent Pass"],
    color:"#9F1239", colorLight:"#FFF1F2",
    img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80&auto=format&fit=crop",
  },
  {
    flag:"🇲🇾", name:"Malaysia", code:"MY",
    tagline:"Affordable & Welcoming",
    desc:"MM2H, Employment Pass and Student visas. Malaysia offers warm climate, low costs and strong connectivity.",
    visas:["MM2H","Employment Pass","Student Visa","Professional Visit"],
    color:"#DC2626", colorLight:"#FFF1F1",
    img:"https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80&auto=format&fit=crop",
  },
];

const ROW1 = COUNTRIES.slice(0, 5);
const ROW2 = COUNTRIES.slice(4);

let cssInjected = false;
function injectCSS(css) {
  if (cssInjected) return; cssInjected = true;
  const el = document.createElement("style");
  el.textContent = css;
  document.head.appendChild(el);
}

/* ── Country Card ── */
function CountryCard({ c }) {
  return (
    <div className="cc-card" style={{ "--ac": c.color, "--al": c.colorLight }}>

      {/* Animated top bar */}
      <div className="cc-top-bar" />

      {/* Image */}
      <div className="cc-img-wrap">
        <img src={c.img} alt={c.name} className="cc-img" />
        <div className="cc-img-grad" />
        {/* Flag bubble */}
        <div className="cc-flag-bubble">
          <span className="cc-flag">{c.flag}</span>
        </div>
        {/* Country code */}
        <div className="cc-code-badge">{c.code}</div>
      </div>

      {/* Body */}
      <div className="cc-body">
        <h3 className="cc-name">{c.name}</h3>
        <p className="cc-tagline">{c.tagline}</p>
        <p className="cc-desc">{c.desc}</p>

        {/* Visa pills */}
        <div className="cc-tags">
          {c.visas.map((v, i) => (
            <span key={i} className="cc-tag"
              style={{ color: c.color, background: c.colorLight, borderColor: `${c.color}28` }}>
              {v}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="cc-foot">
          <span className="cc-cta-txt">Apply Now</span>
          <svg className="cc-arrow" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function CountriesSection() {
  const ref = useRef(false);
  useEffect(() => { if (ref.current) return; ref.current = true; injectCSS(CSS); }, []);

  const triple = (arr) => [...arr, ...arr, ...arr];

  return (
    <section id="countries" className="ct-root">

      {/* Background */}
      <div className="ct-bg-dots" />
      <div className="ct-bg-orb ct-orb-1" />
      <div className="ct-bg-orb ct-orb-2" />

      {/* Header */}
      <div className="ct-header">
        <div className="ct-eyebrow">
          <span className="ct-eyebrow-line" />
          Countries We Serve
          <span className="ct-eyebrow-line" />
        </div>
        <h2 className="ct-h2">
          Your Dream Destination —<br />
          <span className="ct-h2-red">We'll Get You There.</span>
        </h2>
        <p className="ct-sub">
          Expert visa guidance for 9+ countries across 4 continents.
          Study, work, settle or explore — click any card to begin.
        </p>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="ct-mq-wrap">
        <div className="ct-fade ct-fade-l" />
        <div className="ct-fade ct-fade-r" />
        <div className="ct-mq-track ct-mq-fwd">
          {triple(ROW1).map((c, i) => (
            <div key={i} className="ct-mq-item" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
              <CountryCard c={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div className="ct-mq-wrap">
        <div className="ct-fade ct-fade-l" />
        <div className="ct-fade ct-fade-r" />
        <div className="ct-mq-track ct-mq-rev">
          {triple(ROW2).map((c, i) => (
            <div key={i} className="ct-mq-item" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
              <CountryCard c={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="ct-bottom">
        <div className="ct-bottom-inner">
          <div className="ct-bottom-flags">
            {COUNTRIES.map((c, i) => (
              <span key={i} className="ct-bottom-flag" title={c.name}>{c.flag}</span>
            ))}
          </div>
          <p className="ct-bottom-txt">
            Don't see your destination?
            We cover <strong>50+ countries</strong> worldwide.
          </p>
          <button className="ct-bottom-btn"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
            Ask About Your Country →
          </button>
        </div>
      </div>

    </section>
  );
}

/* ════════════════════════════════════════════
   STYLES
════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500&display=swap');

/* ── Root ── */
.ct-root {
  position:relative;
  background:#F8F5F0;
  font-family:'Poppins',sans-serif;
  overflow:hidden;
}

/* ── Background ── */
.ct-bg-dots {
  position:absolute; inset:0; pointer-events:none; z-index:0;
  background-image:radial-gradient(circle,rgba(30,43,60,0.06) 1px,transparent 1px);
  background-size:26px 26px;
}
.ct-bg-orb {
  position:absolute; border-radius:50%;
  pointer-events:none; z-index:0; filter:blur(100px);
}
.ct-orb-1 {
  width:500px; height:500px; top:-100px; right:-80px;
  background:radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 65%);
  animation:ctOrb 22s ease-in-out infinite;
}
.ct-orb-2 {
  width:420px; height:420px; bottom:0; left:-80px;
  background:radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 65%);
  animation:ctOrb 28s ease-in-out infinite reverse;
}
@keyframes ctOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(-12px,-18px)} }

/* ── Header ── */
.ct-header {
  position:relative; z-index:2;
  text-align:center; padding:88px 24px 52px;
  animation:ctFadeUp .8s cubic-bezier(.16,1,.3,1) both;
}
@keyframes ctFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

.ct-eyebrow {
  display:inline-flex; align-items:center; gap:14px;
  font-family:'Montserrat',sans-serif; font-size:.6rem; font-weight:700;
  letter-spacing:.3em; text-transform:uppercase; color:#6B7280;
  margin-bottom:20px;
}
.ct-eyebrow-line { display:inline-block; width:26px; height:1.5px; background:#9CA3AF; }

.ct-h2 {
  font-family:'Playfair Display',serif;
  font-size:clamp(2.4rem,5vw,4rem); font-weight:700; line-height:1.12;
  color:#1E2B3C; letter-spacing:-0.02em; margin:0 0 16px;
}
.ct-h2-red { font-style:italic; color:#DC2626; }

.ct-sub {
  font-size:1rem; font-weight:300; color:#6B7280;
  max-width:480px; margin:0 auto; line-height:1.85;
}

/* ── Marquee wrapper ── */
.ct-mq-wrap {
  position:relative; overflow:hidden;
  margin-bottom:20px; padding:4px 0;
}
.ct-fade {
  position:absolute; top:0; bottom:0; width:120px; z-index:3; pointer-events:none;
}
.ct-fade-l { left:0; background:linear-gradient(90deg,#F8F5F0,transparent); }
.ct-fade-r { right:0; background:linear-gradient(-90deg,#F8F5F0,transparent); }

.ct-mq-track {
  display:flex; gap:18px; width:max-content;
}
.ct-mq-fwd { animation:ctMqFwd 38s linear infinite; }
.ct-mq-rev { animation:ctMqRev 42s linear infinite; }
.ct-mq-track:hover { animation-play-state:paused; }
@keyframes ctMqFwd { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
@keyframes ctMqRev { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }

.ct-mq-item { flex-shrink:0; cursor:pointer; }

/* ── Card ── */
.cc-card {
  width:300px; background:#fff;
  border:1.5px solid rgba(30,43,60,0.08);
  border-radius:18px; overflow:hidden;
  transition:transform .32s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease,border-color .25s;
  position:relative;
}
.cc-card:hover {
  transform:translateY(-8px) scale(1.02);
  box-shadow:0 24px 60px rgba(30,43,60,.16),0 4px 16px rgba(30,43,60,.06);
  border-color:var(--ac);
}

/* Top animated bar */
.cc-top-bar {
  position:absolute; top:0; left:0; right:0; height:3px; z-index:2;
  background:var(--ac);
  transform:scaleX(0); transform-origin:left;
  transition:transform .35s cubic-bezier(.16,1,.3,1);
}
.cc-card:hover .cc-top-bar { transform:scaleX(1); }

/* Image */
.cc-img-wrap { position:relative; height:175px; overflow:hidden; }
.cc-img { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
.cc-card:hover .cc-img { transform:scale(1.06); }
.cc-img-grad { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(0,0,0,.05),rgba(0,0,0,.4)); }

/* Flag bubble */
.cc-flag-bubble {
  position:absolute; top:14px; left:14px;
  width:44px; height:44px; border-radius:50%;
  background:#fff; display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 16px rgba(0,0,0,.25);
  transition:transform .3s;
}
.cc-card:hover .cc-flag-bubble { transform:scale(1.1) rotate(-6deg); }
.cc-flag { font-size:1.55rem; line-height:1; }

/* Country code badge */
.cc-code-badge {
  position:absolute; top:14px; right:14px;
  font-family:'Montserrat',sans-serif; font-size:.62rem; font-weight:800;
  letter-spacing:.1em; color:var(--ac);
  background:rgba(255,255,255,.92); border:1px solid var(--ac);
  border-radius:6px; padding:4px 9px;
}

/* Body */
.cc-body { padding:17px 18px 15px; }

.cc-name {
  font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:800;
  color:#1E2B3C; margin:0 0 3px; letter-spacing:-.01em; transition:color .22s;
}
.cc-card:hover .cc-name { color:var(--ac); }

.cc-tagline {
  font-size:.71rem; font-weight:500; color:var(--ac);
  margin:0 0 10px; letter-spacing:.02em;
}

.cc-desc {
  font-size:.79rem; font-weight:300; color:#6B7280;
  line-height:1.65; margin:0 0 13px;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}

/* Visa pills */
.cc-tags { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px; }
.cc-tag {
  font-family:'Montserrat',sans-serif; font-size:.58rem; font-weight:600;
  letter-spacing:.06em; text-transform:uppercase;
  border:1px solid; border-radius:100px; padding:3px 10px;
}

/* Footer CTA */
.cc-foot {
  display:flex; align-items:center; justify-content:space-between;
  border-top:1px solid rgba(30,43,60,.07); padding-top:12px;
}
.cc-cta-txt {
  font-family:'Montserrat',sans-serif; font-size:.68rem; font-weight:700;
  letter-spacing:.08em; text-transform:uppercase; color:var(--ac);
  transition:letter-spacing .22s;
}
.cc-card:hover .cc-cta-txt { letter-spacing:.14em; }
.cc-arrow { color:var(--ac); transition:transform .22s; }
.cc-card:hover .cc-arrow { transform:translateX(5px); }

/* ── Bottom strip ── */
.ct-bottom {
  position:relative; z-index:2;
  background:#1E2B3C; padding:48px 28px; margin-top:24px;
}
.ct-bottom-inner {
  max-width:900px; margin:0 auto;
  display:flex; flex-direction:column; align-items:center; gap:18px; text-align:center;
}
.ct-bottom-flags { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.ct-bottom-flag {
  font-size:1.8rem; cursor:default; display:inline-block;
  transition:transform .2s;
}
.ct-bottom-flag:hover { transform:scale(1.22) translateY(-3px); }

.ct-bottom-txt {
  font-size:.95rem; font-weight:300; color:rgba(255,255,255,.58); margin:0;
}
.ct-bottom-txt strong { font-weight:700; color:#F5D76E; }

.ct-bottom-btn {
  font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; color:#1E2B3C;
  background:linear-gradient(135deg,#F5D76E,#D4AF37,#B8921E);
  border:none; padding:14px 36px; cursor:pointer;
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
  position:relative; overflow:hidden;
  transition:transform .28s ease,box-shadow .3s ease;
}
.ct-bottom-btn::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);
  transform:translateX(-100%); transition:transform .5s ease;
}
.ct-bottom-btn:hover::before { transform:translateX(100%); }
.ct-bottom-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(212,175,55,.45); }

@media(max-width:600px) {
  .ct-header { padding:64px 18px 40px; }
  .cc-card { width:265px; }
  .cc-img-wrap { height:145px; }
}
`;
