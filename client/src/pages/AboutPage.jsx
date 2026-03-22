import { useEffect, useRef, useState } from "react";

const STATS = [
  { val:"2018",    lbl:"Founded"        },
  { val:"12,000+", lbl:"Visas Approved" },
  { val:"98%",     lbl:"Success Rate"   },
  { val:"50+",     lbl:"Nationalities"  },
];

const VALUES = [
  { n:"01", title:"Integrity",   desc:"Honest, transparent advice — always in your interest." },
  { n:"02", title:"Excellence",  desc:"World-class standards on every single case we handle." },
  { n:"03", title:"Partnership", desc:"With you from first consultation to visa stamp." },
  { n:"04", title:"Speed",       desc:"Fast, precise processing. Your time always matters." },
];

function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

let cssInjected = false;
function injectCSS(css) { if (cssInjected) return; cssInjected = true; const el = document.createElement("style"); el.textContent = css; document.head.appendChild(el); }

export default function AboutPage() {
  const r = useRef(false);
  useEffect(() => { if (r.current) return; r.current = true; injectCSS(CSS); }, []);
  const [r1,v1] = useReveal(0.05);
  const [r2,v2] = useReveal(0.1);
  const [r3,v3] = useReveal(0.1);
  const [r4,v4] = useReveal(0.1);

  return (
    <div id="about" className="ab-root">

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-left" ref={r1}>
          <div className={`ab-hero-content${v1?" on":""}`}>
            <div className="ab-eyebrow"><span className="ab-dot"/>About BlueWave</div>
            <h1 className="ab-h1">Your Trusted UAE<br/><em className="ab-h1-em">Immigration Partner.</em></h1>
            <p className="ab-hero-p">Since 2018, BlueWave has helped 12,000+ individuals secure their UAE visas with a 98% approval rate — from our offices in Ajman's Amber Gem Tower.</p>
            <div className="ab-hero-btns">
              <button className="ab-btn-red" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>Free Consultation →</button>
              <button className="ab-btn-outline" onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior:"smooth" })}>Our Services</button>
            </div>
          </div>
        </div>
        <div className={`ab-hero-right${v1?" on":""}`}>
          <div className="ab-hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=900&q=85&auto=format&fit=crop" alt="Consultation" className="ab-hero-img"/>
            <div className="ab-hero-img-grad"/>
            <div className="ab-hero-badge"><span className="ab-badge-val">98%</span><span className="ab-badge-lbl">Approval Rate</span></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ab-stats">
        {STATS.map((s,i) => (
          <div key={i} className="ab-stat" style={{ borderRight: i<3?"1px solid rgba(212,175,55,.2)":"none" }}>
            <div className="ab-stat-val">{s.val}</div>
            <div className="ab-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </section>

      {/* WHO WE ARE */}
      <section className="ab-who" ref={r2}>
        <div className="ab-who-inner">
          <div className={`ab-who-img-col${v2?" on":""}`}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&auto=format&fit=crop&crop=faces" alt="Consultant" className="ab-who-img"/>
            <div className="ab-who-card-badge"><span className="ab-who-badge-num">2018</span><span className="ab-who-badge-txt">Founded · Ajman, UAE</span></div>
          </div>
          <div className={`ab-who-text${v2?" on":""}`}>
            <div className="ab-eyebrow ab-ey-red"><span className="ab-dot ab-dot-red"/>Who We Are</div>
            <h2 className="ab-h2">Built on Trust.<br/><em className="ab-h2-em">Driven by Expertise.</em></h2>
            <p className="ab-who-p">Founded in Ajman, UAE, BlueWave was built to make immigration seamless and stress-free. Our specialists at Amber Gem Tower serve clients from 50+ countries with unmatched success rates.</p>
            <div className="ab-checks">
              {["Study, work, tourist, residency & investment visas","End-to-end support from consultation to visa stamp","Fast-track processing for urgent applications","100% confidential handling of all documents"].map((c,i) => (
                <div key={i} className="ab-check"><span className="ab-check-icon">✓</span>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-vals" ref={r3}>
        <div className="ab-vals-inner">
          <div className="ab-sec-hd">
            <div className="ab-eyebrow"><span className="ab-dot"/>Our Values</div>
            <h2 className="ab-h2">What We <em className="ab-h2-em">Stand For.</em></h2>
          </div>
          <div className="ab-vals-grid">
            {VALUES.map((v,i) => (
              <div key={i} className={`ab-val-card${v3?" on":""}`} style={{ transitionDelay:`${i*80}ms` }}>
                <span className="ab-val-n">{v.n}</span>
                <h3 className="ab-val-title">{v.title}</h3>
                <div className="ab-val-line"/>
                <p className="ab-val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta" ref={r4}>
        <div className="ab-cta-img-wrap">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80&auto=format&fit=crop" alt="Dubai" className="ab-cta-img"/>
          <div className="ab-cta-ov"/>
        </div>
        <div className={`ab-cta-inner${v4?" on":""}`}>
          <div className="ab-eyebrow ab-ey-light"><span className="ab-dot ab-dot-gold"/>Ready to Begin?</div>
          <h2 className="ab-cta-h2">Start Your Journey <em className="ab-cta-h2-em">Today.</em></h2>
          <p className="ab-cta-p">Book a free 30-minute consultation — honest guidance, no obligation.</p>
          <div className="ab-cta-btns">
            <button className="ab-btn-gold" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>Book Free Consultation →</button>
            <a href="https://wa.me/971506580557" target="_blank" rel="noopener noreferrer" className="ab-btn-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
          <div className="ab-trust">
            {["12,000+ Visas","98% Approval","Since 2018","Ajman, UAE"].map((t,i)=>(<span key={i} className="ab-trust-item"><span className="ab-trust-dot"/>{t}</span>))}
          </div>
        </div>
      </section>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500&display=swap');
:root { --red:#DC2626; --red-d:#991B1B; --gold:#D4AF37; --gl:#F5D76E; --navy:#1E2B3C; --slate:#374151; --muted:#6B7280; --bg:#F8F5F0; --bg2:#F2EDE6; }
.ab-root { background:var(--bg); font-family:'Poppins',sans-serif; color:var(--navy); overflow-x:hidden; }
.ab-hero-content,.ab-hero-right,.ab-who-img-col,.ab-who-text,.ab-val-card,.ab-cta-inner { opacity:0; transform:translateY(26px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
.ab-hero-right { transition-delay:.15s; }
.ab-who-text { transition-delay:.15s; }
.on { opacity:1!important; transform:translateY(0)!important; }
.ab-eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'Montserrat',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
.ab-ey-red { color:var(--red); }
.ab-ey-light { color:rgba(255,255,255,.7); }
.ab-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); flex-shrink:0; animation:abDot 2s ease-in-out infinite; }
.ab-dot-red { background:var(--red); }
.ab-dot-gold { background:var(--gl); }
@keyframes abDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.55)} }
.ab-h2 { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3rem); font-weight:700; line-height:1.12; letter-spacing:-.02em; color:var(--navy); margin:0 0 18px; }
.ab-h2-em { font-style:italic; color:var(--red); }
.ab-sec-hd { text-align:center; margin-bottom:44px; }
.ab-hero { display:grid; grid-template-columns:1fr 1fr; min-height:90vh; background:var(--bg); }
@media(max-width:860px){ .ab-hero { grid-template-columns:1fr; min-height:auto; } }
.ab-hero-left { display:flex; align-items:center; padding:100px 60px 80px; background:linear-gradient(135deg,#FFF8F0,#F8F0E8); }
@media(max-width:860px){ .ab-hero-left { padding:90px 24px 52px; } }
.ab-h1 { font-family:'Playfair Display',serif; font-size:clamp(2.6rem,5vw,4.2rem); font-weight:700; line-height:1.1; letter-spacing:-.02em; color:var(--navy); margin:0 0 18px; }
.ab-h1-em { font-style:italic; color:var(--red); }
.ab-hero-p { font-size:.97rem; font-weight:300; color:var(--slate); line-height:1.85; max-width:420px; margin-bottom:32px; }
.ab-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
.ab-btn-red { font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#fff; background:linear-gradient(135deg,var(--red),var(--red-d)); border:none; padding:14px 32px; cursor:pointer; clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px)); position:relative; overflow:hidden; transition:transform .28s ease,box-shadow .3s ease; }
.ab-btn-red::before { content:''; position:absolute; inset:0; background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.25) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s; }
.ab-btn-red:hover::before { transform:translateX(100%); }
.ab-btn-red:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(220,38,38,.4); }
.ab-btn-outline { font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--navy); background:transparent; border:1.5px solid rgba(30,43,60,.3); padding:13px 26px; cursor:pointer; clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px)); transition:all .25s ease; }
.ab-btn-outline:hover { border-color:var(--red); color:var(--red); transform:translateY(-2px); }
.ab-hero-right { position:relative; overflow:hidden; min-height:500px; }
@media(max-width:860px){ .ab-hero-right { min-height:340px; } }
.ab-hero-img-wrap { position:relative; width:100%; height:100%; }
.ab-hero-img { width:100%; height:100%; object-fit:cover; object-position:center; }
.ab-hero-img-grad { position:absolute; inset:0; background:linear-gradient(to right,rgba(248,240,232,.3),transparent 40%); }
.ab-hero-badge { position:absolute; bottom:28px; left:28px; background:var(--red); border-radius:12px; padding:16px 22px; box-shadow:0 16px 44px rgba(220,38,38,.45); animation:abFloat 5s ease-in-out infinite; text-align:center; }
@keyframes abFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.ab-badge-val { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; color:var(--gl); display:block; line-height:1; }
.ab-badge-lbl { font-size:.6rem; font-weight:500; color:rgba(255,255,255,.8); margin-top:4px; letter-spacing:.1em; display:block; }
.ab-stats { display:flex; flex-wrap:wrap; background:#fff; border-top:1px solid rgba(212,175,55,.2); border-bottom:1px solid rgba(212,175,55,.2); }
.ab-stat { flex:1; min-width:130px; padding:28px 20px; text-align:center; }
.ab-stat-val { font-family:'Playfair Display',serif; font-size:clamp(1.7rem,3vw,2.4rem); font-weight:700; line-height:1; margin-bottom:5px; background:linear-gradient(135deg,var(--red-d),var(--red)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.ab-stat-lbl { font-family:'Montserrat',sans-serif; font-size:.56rem; font-weight:600; letter-spacing:.24em; text-transform:uppercase; color:var(--muted); }
.ab-who { background:var(--bg2); padding:88px 0; }
.ab-who-inner { max-width:1100px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
@media(max-width:860px){ .ab-who-inner { grid-template-columns:1fr; padding:0 22px; gap:40px; } }
.ab-who-img-col { position:relative; opacity:0; transform:translateX(-24px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
.ab-who-img-col.on { opacity:1; transform:translateX(0)!important; }
.ab-who-img { width:100%; border-radius:14px; object-fit:cover; aspect-ratio:4/5; display:block; box-shadow:0 24px 60px rgba(30,43,60,.18); }
.ab-who-card-badge { position:absolute; bottom:-16px; right:-16px; background:var(--red); border-radius:12px; padding:14px 20px; box-shadow:0 12px 36px rgba(220,38,38,.4); text-align:center; }
.ab-who-badge-num { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:var(--gl); display:block; line-height:1; }
.ab-who-badge-txt { font-size:.58rem; font-weight:500; color:rgba(255,255,255,.8); margin-top:3px; display:block; letter-spacing:.08em; }
.ab-who-text { opacity:0; transform:translateX(24px); transition:opacity .8s .14s cubic-bezier(.16,1,.3,1),transform .8s .14s cubic-bezier(.16,1,.3,1); }
.ab-who-text.on { opacity:1; transform:translateX(0)!important; }
.ab-who-p { font-size:.94rem; font-weight:300; color:var(--slate); line-height:1.85; margin-bottom:20px; }
.ab-checks { display:flex; flex-direction:column; gap:8px; }
.ab-check { display:flex; align-items:flex-start; gap:11px; background:#fff; border:1px solid rgba(30,43,60,.08); border-radius:8px; padding:10px 14px; font-size:.82rem; font-weight:300; color:var(--slate); line-height:1.5; transition:border-color .2s,box-shadow .2s; }
.ab-check:hover { border-color:rgba(220,38,38,.25); box-shadow:0 3px 14px rgba(220,38,38,.08); }
.ab-check-icon { color:var(--red); font-weight:700; flex-shrink:0; }
.ab-vals { background:#fff; padding:88px 0; }
.ab-vals-inner { max-width:1100px; margin:0 auto; padding:0 32px; }
.ab-vals-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
@media(max-width:960px){ .ab-vals-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:480px){ .ab-vals-grid { grid-template-columns:1fr; } }
.ab-val-card { background:var(--bg); border:1.5px solid rgba(30,43,60,.07); border-radius:14px; padding:26px 22px; transition:opacity .65s ease,transform .65s ease,border-color .3s,box-shadow .3s; }
.ab-val-card:hover { border-color:rgba(220,38,38,.3); box-shadow:0 14px 40px rgba(30,43,60,.1); transform:translateY(-5px)!important; }
.ab-val-n { font-family:'Playfair Display',serif; font-size:2.8rem; font-weight:700; color:rgba(30,43,60,.07); line-height:1; margin-bottom:10px; display:block; }
.ab-val-title { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700; color:var(--navy); margin-bottom:10px; transition:color .2s; }
.ab-val-card:hover .ab-val-title { color:var(--red); }
.ab-val-line { width:26px; height:3px; background:var(--gold); border-radius:2px; margin-bottom:12px; transition:width .3s; }
.ab-val-card:hover .ab-val-line { width:46px; }
.ab-val-desc { font-size:.79rem; font-weight:300; color:var(--muted); line-height:1.75; }
.ab-cta { position:relative; padding:88px 24px; overflow:hidden; min-height:380px; display:flex; align-items:center; justify-content:center; }
.ab-cta-img-wrap { position:absolute; inset:0; }
.ab-cta-img { width:100%; height:100%; object-fit:cover; object-position:center 40%; }
.ab-cta-ov { position:absolute; inset:0; background:linear-gradient(135deg,rgba(153,27,27,.92),rgba(30,43,60,.9)); }
.ab-cta-inner { position:relative; z-index:2; text-align:center; max-width:640px; opacity:0; transform:translateY(24px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
.ab-cta-h2 { font-family:'Playfair Display',serif; font-size:clamp(2rem,4.5vw,3.2rem); font-weight:700; color:#fff; margin:0 0 14px; letter-spacing:-.02em; }
.ab-cta-h2-em { font-style:italic; color:var(--gl); }
.ab-cta-p { font-size:.95rem; font-weight:300; color:rgba(255,255,255,.65); line-height:1.8; margin-bottom:28px; }
.ab-cta-btns { display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap; margin-bottom:24px; }
.ab-btn-gold { display:inline-flex; align-items:center; gap:8px; font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#1E2B3C; background:linear-gradient(135deg,var(--gl),var(--gold),#B8921E); border:none; padding:15px 34px; cursor:pointer; clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px)); position:relative; overflow:hidden; transition:transform .28s ease,box-shadow .3s ease; }
.ab-btn-gold::before { content:''; position:absolute; inset:0; background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.3) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s; }
.ab-btn-gold:hover::before { transform:translateX(100%); }
.ab-btn-gold:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(212,175,55,.5); }
.ab-btn-wa { display:inline-flex; align-items:center; gap:9px; font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#22C55E; background:rgba(34,197,94,.12); border:1px solid rgba(34,197,94,.3); padding:14px 26px; text-decoration:none; cursor:pointer; clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px)); transition:all .25s ease; }
.ab-btn-wa:hover { background:rgba(34,197,94,.22); transform:translateY(-2px); }
.ab-trust { display:flex; align-items:center; justify-content:center; gap:4px; flex-wrap:wrap; }
.ab-trust-item { display:inline-flex; align-items:center; gap:7px; font-size:.68rem; font-weight:300; color:rgba(255,255,255,.4); padding:0 6px; }
.ab-trust-dot { width:4px; height:4px; border-radius:50%; background:var(--gl); flex-shrink:0; }
`;
