import { useEffect, useRef, useState } from "react";

const BG = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90&auto=format&fit=crop";
const WORDS = ["Dubai", "UAE", "Your Future"];
const TRUST = [
  { value: "15+",     label: "Years of Excellence" },
  { value: "98%",     label: "Visa Approval Rate"  },
  { value: "12,000+", label: "Families Helped"     },
  { value: "50+",     label: "Nationalities Served" },
];
const MARQUEE = [
  "UAE Golden Visa","Student Visas","Work Permits",
  "Family Sponsorship","Business Setup","Residency Renewals",
  "Investment Immigration","Tourist Visas",
];

let cssInjected = false;
function injectCSS(css) {
  if (cssInjected) return; cssInjected = true;
  const el = document.createElement("style");
  el.textContent = css; document.head.appendChild(el);
}

export default function HeroSection() {
  const [loaded,  setLoaded]  = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [fade,    setFade]    = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(false);

  useEffect(() => { if (ref.current) return; ref.current = true; injectCSS(CSS); }, []);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setFade(true); }, 420);
    }, 3200);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const c = (...a) => a.filter(Boolean).join(" ");

  return (
    <section id="home" className="pw-root">
      <div className="pw-bg" style={{ transform: `scale(1.1) translateY(${scrollY * 0.25}px)` }} />
      <div className="pw-ov pw-ov-base" />
      <div className="pw-ov pw-ov-left" />
      <div className="pw-ov pw-ov-radial" />
      <div className="pw-ov pw-ov-bottom" />
      <div className="pw-grain" />
      <div className="pw-top-rule" />
      <div className="pw-deco-lines"><span /><span /><span /></div>
      <div className="pw-geo pw-geo-1" />
      <div className="pw-geo pw-geo-2" />
      <div className="pw-geo pw-geo-3" />

      <div className="pw-stage">
        <div className={c("pw-badge", loaded && "pw-visible")} style={{ transitionDelay:"0s" }}>
          <span className="pw-badge-dot" />
          Dubai · UAE Immigration Specialists
          <span className="pw-badge-dot" />
        </div>

        <h1 className={c("pw-h1", loaded && "pw-visible")} style={{ transitionDelay:"0.15s" }}>
          <span className="pw-h1-top">Your Gateway</span>
          <span className="pw-h1-mid">
            to{" "}
            <span className={c("pw-cycle", fade && "pw-cycle-in")}>{WORDS[wordIdx]}</span>
          </span>
          <span className="pw-h1-bot">Starts Here.</span>
        </h1>

        <div className={c("pw-hdiv", loaded && "pw-visible")} style={{ transitionDelay:"0.3s" }} />

        <p className={c("pw-sub", loaded && "pw-visible")} style={{ transitionDelay:"0.38s" }}>
          Expert immigration consulting for visas, residency &amp; investment
          pathways in the UAE — turning ambition into approval since 2009.
        </p>

        <div className={c("pw-ctas", loaded && "pw-visible")} style={{ transitionDelay:"0.52s" }}>
          <button className="pw-btn-red" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
            <span className="pw-btn-inner">
              Book Free Consultation
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="pw-btn-shine" />
          </button>
          <button className="pw-btn-gold" onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior:"smooth" })}>
            Explore Services
          </button>
        </div>

        <div className={c("pw-stats", loaded && "pw-visible")} style={{ transitionDelay:"0.68s" }}>
          {TRUST.map((t, i) => (
            <div key={i} className="pw-stat">
              <span className="pw-stat-value">{t.value}</span>
              <span className="pw-stat-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className={c("pw-panel", loaded && "pw-panel-in")}>
        {[
          { icon:"🏙️", title:"UAE Residency",  desc:"Fast-track your golden visa" },
          { icon:"🎓", title:"Student Visa",   desc:"Top universities worldwide"  },
          { icon:"💼", title:"Work Permit",    desc:"Seamless employment visas"   },
        ].map((card, i) => (
          <div key={i} className="pw-panel-card">
            <div className="pw-panel-icon">{card.icon}</div>
            <div className="pw-panel-text">
              <span className="pw-panel-title">{card.title}</span>
              <span className="pw-panel-desc">{card.desc}</span>
            </div>
            <span className="pw-panel-arrow">→</span>
          </div>
        ))}
        <div className="pw-panel-badge">
          <span className="pw-panel-badge-dot" />
          Processing visas right now
        </div>
      </div>

      {/* Scroll cue */}
      <div className={c("pw-scroll", loaded && "pw-scroll-in")}>
        <div className="pw-scroll-track"><div className="pw-scroll-thumb" /></div>
        <span className="pw-scroll-lbl">Scroll</span>
      </div>

      {/* Marquee */}
      <div className="pw-mq">
        <div className="pw-mq-track">
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((item, i) => (
            <span key={i} className="pw-mq-item">
              <span className="pw-mq-diamond">◆</span>{item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

.pw-root {
  position:relative; width:100%; min-height:100vh;
  display:flex; flex-direction:column; overflow:hidden;
  background:#0B0F19; font-family:'Poppins',sans-serif;
}
.pw-bg {
  position:absolute; inset:-10%;
  background:url('${BG}') center 35%/cover no-repeat;
  will-change:transform; z-index:0;
}
.pw-ov { position:absolute; inset:0; z-index:1; pointer-events:none; }
.pw-ov-base   { background:rgba(11,15,25,0.72); }
.pw-ov-left   { background:linear-gradient(105deg,rgba(11,15,25,.97) 0%,rgba(11,15,25,.90) 35%,rgba(11,15,25,.55) 60%,rgba(11,15,25,.10) 100%); }
.pw-ov-radial { background:radial-gradient(ellipse 100% 70% at 15% 55%,transparent 20%,rgba(11,15,25,.3) 100%); }
.pw-ov-bottom { top:auto; height:200px; background:linear-gradient(to bottom,transparent,#0B0F19); }
.pw-grain {
  position:absolute; inset:0; z-index:2; pointer-events:none; opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:220px;
}
.pw-top-rule {
  position:absolute; top:0; left:0; right:0; height:2px; z-index:10;
  background:linear-gradient(90deg,transparent,#9F1239 15%,#DC2626 30%,#D4AF37 50%,#F5D76E 65%,#D4AF37 75%,transparent);
  opacity:.8;
}
.pw-deco-lines { position:absolute; top:0; bottom:0; left:0; z-index:3; display:flex; gap:12px; padding-left:32px; pointer-events:none; }
.pw-deco-lines span { display:block; width:1px; height:100%; background:linear-gradient(to bottom,transparent,rgba(212,175,55,.15) 30%,rgba(212,175,55,.15) 70%,transparent); }
.pw-deco-lines span:nth-child(2) { opacity:.5; }
.pw-deco-lines span:nth-child(3) { opacity:.25; }
.pw-geo { position:absolute; z-index:3; pointer-events:none; border:1px solid rgba(212,175,55,.12); animation:pwGeoSpin 30s linear infinite; }
.pw-geo-1 { width:300px; height:300px; top:10%; right:28%; transform:rotate(45deg); animation-duration:40s; }
.pw-geo-2 { width:180px; height:180px; top:20%; right:24%; transform:rotate(20deg); animation-duration:25s; border-color:rgba(220,38,38,.08); animation-direction:reverse; }
.pw-geo-3 { width:80px; height:80px; top:35%; right:30%; border-color:rgba(212,175,55,.2); animation-duration:18s; }
@keyframes pwGeoSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.pw-stage { position:relative; z-index:10; flex:1; display:flex; flex-direction:column; justify-content:center; padding:110px 72px 90px 80px; max-width:820px; }

.pw-badge,.pw-h1,.pw-hdiv,.pw-sub,.pw-ctas,.pw-stats { opacity:0; transform:translateY(30px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
.pw-visible { opacity:1!important; transform:translateY(0)!important; }

.pw-badge { display:inline-flex; align-items:center; gap:12px; padding:7px 18px; border:1px solid rgba(212,175,55,.22); background:rgba(212,175,55,.07); backdrop-filter:blur(8px); border-radius:2px; font-size:.62rem; font-weight:600; letter-spacing:.3em; text-transform:uppercase; color:#F5D76E; width:fit-content; margin-bottom:30px; }
.pw-badge-dot { display:inline-block; width:4px; height:4px; border-radius:50%; background:#D4AF37; flex-shrink:0; animation:pwPulse 2.4s ease-in-out infinite; }
@keyframes pwPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

.pw-h1 { display:flex; flex-direction:column; gap:0; margin:0; }
.pw-h1-top,.pw-h1-mid,.pw-h1-bot { display:block; font-family:'Playfair Display',serif; line-height:1.07; }
.pw-h1-top,.pw-h1-mid { font-size:clamp(3rem,6vw,5.8rem); font-weight:700; color:#fff; letter-spacing:-0.02em; }
.pw-h1-bot { font-size:clamp(2.6rem,5.2vw,5rem); font-weight:900; font-style:italic; color:transparent; -webkit-text-stroke:1.5px rgba(255,255,255,.2); letter-spacing:-0.02em; margin-top:2px; }

.pw-cycle { display:inline-block; font-style:italic; background:linear-gradient(135deg,#A17C1A,#D4AF37,#F5D76E,#D4AF37); background-size:300% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:pwShimmer 3s linear infinite; opacity:0; transform:translateY(14px) scale(.96); transition:opacity .4s ease,transform .4s ease; }
.pw-cycle.pw-cycle-in { opacity:1; transform:translateY(0) scale(1); }
@keyframes pwShimmer { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }

.pw-hdiv { width:64px; height:3px; background:linear-gradient(90deg,#DC2626,#D4AF37,transparent); margin:24px 0; border-radius:2px; }
.pw-sub { font-size:1rem; font-weight:300; line-height:1.85; color:rgba(255,255,255,.65); max-width:460px; margin-bottom:44px; }

.pw-ctas { display:flex; align-items:center; gap:18px; margin-bottom:60px; flex-wrap:wrap; }
.pw-btn-red { position:relative; overflow:hidden; font-family:'Poppins',sans-serif; font-size:.8rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#fff; background:linear-gradient(135deg,#9F1239,#DC2626); border:none; padding:0; cursor:pointer; clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px)); transition:transform .3s ease,box-shadow .35s ease; }
.pw-btn-inner { display:inline-flex; align-items:center; gap:12px; padding:16px 42px; position:relative; z-index:1; }
.pw-btn-shine { position:absolute; inset:0; background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.2) 50%,transparent 65%); transform:translateX(-100%); transition:transform .5s ease; z-index:0; }
.pw-btn-red:hover .pw-btn-shine { transform:translateX(100%); }
.pw-btn-red:hover { transform:translateY(-3px); box-shadow:0 20px 50px rgba(220,38,38,.4),0 4px 16px rgba(0,0,0,.5); }
.pw-btn-gold { font-family:'Poppins',sans-serif; font-size:.8rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:#F5D76E; background:transparent; border:1px solid rgba(212,175,55,.4); padding:15px 36px; cursor:pointer; clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px)); transition:all .3s ease; }
.pw-btn-gold:hover { background:rgba(212,175,55,.1); border-color:#D4AF37; transform:translateY(-2px); box-shadow:0 8px 30px rgba(212,175,55,.15); }

.pw-stats { display:flex; gap:0; flex-wrap:wrap; row-gap:20px; border-top:1px solid rgba(212,175,55,.18); padding-top:32px; }
.pw-stat { display:flex; flex-direction:column; gap:3px; padding-right:36px; margin-right:36px; border-right:1px solid rgba(212,175,55,.15); }
.pw-stat:last-child { border-right:none; padding-right:0; margin-right:0; }
.pw-stat-value { font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:700; color:#D4AF37; line-height:1; letter-spacing:-0.02em; }
.pw-stat-label { font-size:.72rem; font-weight:400; color:rgba(255,255,255,.4); letter-spacing:.04em; white-space:nowrap; }

.pw-panel { position:absolute; right:60px; top:50%; transform:translateY(-50%) translateX(40px); z-index:10; display:flex; flex-direction:column; gap:12px; width:260px; opacity:0; transition:opacity 1s .7s ease,transform 1s .7s cubic-bezier(.16,1,.3,1); }
.pw-panel.pw-panel-in { opacity:1; transform:translateY(-50%) translateX(0); }
.pw-panel-card { display:flex; align-items:center; gap:14px; padding:16px 18px; background:rgba(18,24,38,.75); border:1px solid rgba(255,255,255,.07); backdrop-filter:blur(16px); border-radius:4px; cursor:pointer; transition:all .3s ease; border-left:2px solid transparent; }
.pw-panel-card:hover { background:rgba(18,24,38,.9); border-left-color:#D4AF37; transform:translateX(-4px); box-shadow:4px 0 24px rgba(212,175,55,.08); }
.pw-panel-icon { font-size:1.3rem; flex-shrink:0; width:38px; height:38px; display:flex; align-items:center; justify-content:center; background:rgba(212,175,55,.08); border-radius:3px; }
.pw-panel-text { display:flex; flex-direction:column; gap:2px; flex:1; }
.pw-panel-title { font-size:.82rem; font-weight:600; color:#fff; }
.pw-panel-desc { font-size:.68rem; font-weight:300; color:rgba(255,255,255,.4); }
.pw-panel-arrow { font-size:.9rem; color:#D4AF37; opacity:.6; transition:opacity .2s,transform .2s; }
.pw-panel-card:hover .pw-panel-arrow { opacity:1; transform:translateX(3px); }
.pw-panel-badge { display:flex; align-items:center; gap:8px; padding:9px 14px; background:rgba(18,24,38,.6); border:1px solid rgba(34,197,94,.2); backdrop-filter:blur(12px); border-radius:4px; font-size:.65rem; font-weight:500; color:#6ee7b7; letter-spacing:.05em; }
.pw-panel-badge-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; flex-shrink:0; animation:pwLive 1.8s ease-in-out infinite; box-shadow:0 0 8px #22c55e; }
@keyframes pwLive { 0%,100%{opacity:1} 50%{opacity:.3} }

.pw-scroll { position:absolute; bottom:90px; right:52px; z-index:10; display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0; transition:opacity .8s 1.4s ease; }
.pw-scroll-in { opacity:1; }
.pw-scroll-track { width:2px; height:44px; background:rgba(212,175,55,.15); border-radius:2px; overflow:hidden; }
.pw-scroll-thumb { width:100%; height:14px; background:linear-gradient(to bottom,#D4AF37,transparent); border-radius:2px; animation:pwScrollDown 2.2s ease-in-out infinite; }
@keyframes pwScrollDown { 0%{transform:translateY(-14px);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateY(44px);opacity:0} }
.pw-scroll-lbl { writing-mode:vertical-rl; font-size:.56rem; font-weight:500; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.3); }

.pw-mq { position:relative; z-index:10; overflow:hidden; background:rgba(18,24,38,.85); border-top:1px solid rgba(212,175,55,.15); backdrop-filter:blur(14px); padding:15px 0; flex-shrink:0; }
.pw-mq-track { display:flex; width:max-content; animation:pwMarquee 36s linear infinite; }
.pw-mq-track:hover { animation-play-state:paused; }
@keyframes pwMarquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
.pw-mq-item { display:inline-flex; align-items:center; gap:12px; padding:0 32px; font-size:.62rem; font-weight:500; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.35); white-space:nowrap; transition:color .25s; }
.pw-mq-item:hover { color:#D4AF37; }
.pw-mq-diamond { font-size:.38rem; color:#D4AF37; flex-shrink:0; opacity:.7; }

@media(max-width:1100px){ .pw-panel { display:none; } }
@media(max-width:900px){ .pw-stage { padding:90px 44px 80px; max-width:100%; } .pw-scroll { display:none; } .pw-deco-lines,.pw-geo { display:none; } }
@media(max-width:600px){ .pw-stage { padding:80px 24px 70px; } .pw-h1-top,.pw-h1-mid { font-size:clamp(2.5rem,11vw,3.4rem); } .pw-h1-bot { font-size:clamp(2.2rem,9.5vw,3rem); } .pw-ctas { flex-direction:column; align-items:flex-start; } .pw-stats { flex-direction:column; } .pw-stat { border-right:none; padding-right:0; margin-right:0; } }
`;