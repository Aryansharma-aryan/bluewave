import { useEffect, useRef, useState } from "react";

const IcoStudy = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/></svg>);
const IcoTourist = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>);
const IcoWork = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>);
const IcoVisitor = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const IcoIelts = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>);
const IcoSkilled = ({ color }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);

const COUNTRIES = [
  { flag:"🇨🇦", name:"Canada" },{ flag:"🇺🇸", name:"USA" },
  { flag:"🇬🇧", name:"United Kingdom" },{ flag:"🇦🇺", name:"Australia" },
  { flag:"🇳🇿", name:"New Zealand" },{ flag:"🇪🇺", name:"Europe" },
];

const SERVICES = [
  { id:"study",   num:"01", title:"Study Visa",        tagline:"World-class education awaits",           accent:"#1D4ED8", accentLight:"#EFF6FF", accentMid:"#BFDBFE", Icon:IcoStudy,   flags:["🇨🇦","🇺🇸","🇬🇧","🇦🇺","🇳🇿","🇪🇺"], time:"4–12 weeks",         stat:"98% approval rate",
    overview:"Open the door to world-class universities across Canada, USA, UK, Australia, New Zealand and Europe. BlueWave guides you through every step — institution shortlisting, admission letters, financial documentation and the visa application.",
    process:[{t:"Profile Evaluation",d:"We assess your academic background, English scores, budget and career goals."},{t:"University Application",d:"Our team prepares a compelling SOP and submits to shortlisted universities."},{t:"Offer Letter & Enrolment",d:"Once you receive an offer, we guide acceptance and enrolment confirmation."},{t:"Visa Application Filing",d:"All visa forms completed and submitted with expert review."},{t:"Pre-Departure Briefing",d:"Accommodation, travel, banking and arrival preparation."}],
    eligibility:["Minimum 60% in last academic qualification","IELTS 6.0+ / PTE 50+ / TOEFL 80+","Proof of sufficient funds","Valid passport — 18+ months remaining","Clean immigration history"],
    docs:["Valid Passport","Acceptance / Offer Letter","Academic transcripts","English test result","Bank statements — last 6 months","Statement of Purpose (SOP)","Passport-size photographs"],
  },
  { id:"tourist", num:"02", title:"Tourist Visa",       tagline:"Explore the world with confidence",       accent:"#92400E", accentLight:"#FFFBEB", accentMid:"#FDE68A", Icon:IcoTourist, flags:["🇨🇦","🇺🇸","🇬🇧","🇦🇺","🇳🇿","🇪🇺"], time:"2–6 weeks",          stat:"50+ destinations covered",
    overview:"Planning a holiday or family visit abroad? BlueWave handles your tourist visa from document collection to consulate interview preparation.",
    process:[{t:"Destination Assessment",d:"We review your travel history and passport strength."},{t:"Document Checklist",d:"Tailored checklist covering financial proof, itinerary and cover letter."},{t:"Application Submission",d:"Forms submitted to the relevant consulate or VFS centre."},{t:"Interview Preparation",d:"Mock interview coaching for US B1/B2 visas."},{t:"Visa Collection & Briefing",d:"We notify you when your visa is ready."}],
    eligibility:["Valid passport — 6+ months remaining","Confirmed return travel itinerary","Proof of accommodation","Sufficient funds for the entire trip","No outstanding visa violations"],
    docs:["Valid Passport","Bank statements — last 3–6 months","Confirmed return flight ticket","Hotel booking or invitation letter","Leave letter from employer","Travel insurance policy"],
  },
  { id:"work",    num:"03", title:"Work Visa",           tagline:"Build your career across borders",        accent:"#065F46", accentLight:"#ECFDF5", accentMid:"#A7F3D0", Icon:IcoWork,    flags:["🇨🇦","🇺🇸","🇬🇧","🇦🇺","🇳🇿","🇪🇺"], time:"6–20 weeks",         stat:"Express Entry specialists",
    overview:"Whether you have a confirmed job offer or exploring skilled worker pathways, BlueWave provides end-to-end work visa consulting.",
    process:[{t:"Eligibility & Points Assessment",d:"We calculate your CRS score and recommend the strongest route."},{t:"Employer Verification / LMIA",d:"We assist with Labour Market Impact Assessments."},{t:"Skills & Credential Assessment",d:"Coordinate credential recognition with relevant bodies."},{t:"Visa Application Lodgement",d:"Complete application compiled with all required documents."},{t:"Grant & Relocation Support",d:"Post-grant guidance on settlement."}],
    eligibility:["Valid job offer from a licensed employer","Relevant qualification or trade certification","Minimum work experience","English language proficiency","Police clearance certificate"],
    docs:["Valid Passport","Employment offer letter","Educational certificates (attested)","Experience reference letters","Skills assessment outcome letter","Police clearance certificate"],
  },
  { id:"visitor", num:"04", title:"Visitor Visa",        tagline:"Family visits, events & medical trips",   accent:"#6D28D9", accentLight:"#F5F3FF", accentMid:"#DDD6FE", Icon:IcoVisitor, flags:["🇨🇦","🇺🇸","🇬🇧","🇦🇺","🇳🇿","🇪🇺"], time:"2–8 weeks",          stat:"Family & medical visits",
    overview:"A visitor visa enables short-term stays for family reunification, business meetings, medical treatment or attending events.",
    process:[{t:"Purpose Clarification",d:"We define and document your reason for visiting."},{t:"Invitation Letter Review",d:"We review invitation letters from family sponsors or organizers."},{t:"Financial Documentation",d:"Bank statements, sponsor proof and employment evidence."},{t:"Application Filing",d:"All forms completed and submitted with tracking updates."},{t:"Decision & Entry Advisory",d:"We brief you on entry conditions."}],
    eligibility:["Genuine and clear reason for the visit","Confirmed return travel plans","Sufficient financial support","No history of visa violations","Strong home-country ties"],
    docs:["Valid Passport","Invitation letter from host","Bank statements — last 3–6 months","Confirmed return flight ticket","Employment letter and approved leave","Passport-size photographs"],
  },
  { id:"ielts",   num:"05", title:"IELTS / PTE",         tagline:"Achieve the score your future demands",   accent:"#9F1239", accentLight:"#FFF1F2", accentMid:"#FECDD3", Icon:IcoIelts,   flags:["🇨🇦","🇺🇸","🇬🇧","🇦🇺","🇳🇿","🇪🇺"], time:"4–12 weeks coaching",  stat:"+1.5 bands in 8 weeks",
    overview:"IELTS and PTE Academic scores are required for virtually every study, work and immigration pathway. BlueWave provides structured coaching and mock tests.",
    process:[{t:"Diagnostic Mock Test",d:"We assess your level across all four modules."},{t:"Personalised Study Plan",d:"A custom roadmap targeting your weakest modules."},{t:"Module-Specific Coaching",d:"Expert tutors focus on writing, speaking, reading and listening."},{t:"Weekly Mock Tests & Feedback",d:"Full-length timed tests with detailed feedback."},{t:"Exam Registration & Logistics",d:"We handle IDP / British Council / Pearson booking."}],
    eligibility:["Open to all English levels","Ideal for study, work and immigration applicants","IELTS Academic and General Training available","PTE Academic preparation fully available","No minimum age requirement"],
    docs:["Valid Passport (for exam registration)","Current English level assessment","Target band score required","Preferred exam date window"],
  },
  { id:"skilled", num:"06", title:"Skilled Migration",   tagline:"Permanent residency, planned to perfection", accent:"#1E3A5F", accentLight:"#EFF6FF", accentMid:"#BFDBFE", Icon:IcoSkilled, flags:["🇨🇦","🇦🇺","🇳🇿","🇬🇧","🇪🇺"],           time:"6–24 months",        stat:"PR families since 2009",
    overview:"Canada Express Entry, Australia GSM, New Zealand SMC and UK Global Talent offer life-changing Permanent Residency. BlueWave maximises your CRS or points score.",
    process:[{t:"Points Calculation & Strategy",d:"We calculate your CRS score and advise on boosters."},{t:"Skills Assessment Lodgement",d:"Coordinate with TRA, Engineers Australia, VETASSESS or NZQA."},{t:"Expression of Interest (EOI)",d:"We craft and submit your EOI competitively."},{t:"Invitation to Apply (ITA)",d:"We compile your full application within the strict deadline."},{t:"PR Grant & Landing Support",d:"Post-grant guidance on settlement."}],
    eligibility:["Occupation on the Skilled Occupation List","Minimum CRS / points score","Positive skills assessment","IELTS 6.0+ / PTE 50+ minimum","Age under 45"],
    docs:["Valid Passport","Skills assessment outcome letter","Educational certificates (attested)","Employment reference letters","English test result","Police clearance certificates","Medical exam report"],
  },
];

let cssInjected = false;
function injectCSS(css) { if (cssInjected) return; cssInjected = true; const el = document.createElement("style"); el.textContent = css; document.head.appendChild(el); }

function ServiceModal({ svc, onClose }) {
  const { Icon, accent, accentLight, accentMid, num, title, tagline, time, stat, overview, process, eligibility, docs, flags } = svc;
  useEffect(() => {
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", fn); };
  }, [onClose]);
  return (
    <div className="md-overlay" onClick={e => e.currentTarget === e.target && onClose()}>
      <div className="md-panel">
        <div className="md-head" style={{ background:accentLight, borderBottom:`3px solid ${accent}` }}>
          <div className="md-head-row">
            <div className="md-icon-ring" style={{ boxShadow:`0 0 0 2px ${accentMid}` }}><Icon color={accent} /></div>
            <div style={{ flex:1 }}>
              <span className="md-num" style={{ color:accent }}>{num}</span>
              <h2 className="md-title">{title}</h2>
              <p className="md-tagline">{tagline}</p>
            </div>
            <button className="md-close" onClick={onClose}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div className="md-meta">
            <span className="md-pill" style={{ background:accent, color:"#fff" }}>★ {stat}</span>
            <span className="md-pill-out" style={{ borderColor:accentMid, color:accent }}>⏱ {time}</span>
          </div>
        </div>
        <div className="md-body">
          <p className="md-overview">{overview}</p>
          <div className="md-sec-lbl" style={{ color:accent }}><span style={{ background:accent, width:20, height:2, borderRadius:1, display:"inline-block", marginRight:10, verticalAlign:"middle" }}/>Destinations</div>
          <div className="md-countries">
            {flags.map((f, i) => { const c = COUNTRIES.find(x => x.flag === f); return c ? (<div key={i} className="md-country" style={{ borderColor:accentMid }}><span style={{ fontSize:"1.2rem" }}>{c.flag}</span><span className="md-country-name">{c.name}</span></div>) : null; })}
          </div>
          <div className="md-two-col">
            <div>
              <div className="md-sec-lbl" style={{ color:accent }}><span style={{ background:accent, width:20, height:2, borderRadius:1, display:"inline-block", marginRight:10, verticalAlign:"middle" }}/>Process</div>
              {process.map((p, i) => (<div key={i} className="md-step"><div className="md-step-n" style={{ background:accent }}>{i+1}</div><div><div className="md-step-t">{p.t}</div><div className="md-step-d">{p.d}</div></div></div>))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div className="md-box" style={{ borderTop:`3px solid ${accent}` }}>
                <div className="md-box-lbl" style={{ color:accent }}>Eligibility</div>
                {eligibility.map((e, i) => (<div key={i} className="md-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M20 6L9 17l-5-5" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span className="md-row-txt">{e}</span></div>))}
              </div>
              <div className="md-box" style={{ borderTop:`3px solid ${accent}` }}>
                <div className="md-box-lbl" style={{ color:accent }}>Documents</div>
                {docs.map((d, i) => (<div key={i} className="md-row"><span style={{ width:5, height:5, borderRadius:"50%", background:accent, flexShrink:0, display:"inline-block", marginTop:7 }}/><span className="md-row-txt">{d}</span></div>))}
              </div>
            </div>
          </div>
          <div className="md-ctas">
            <button className="md-btn-p" style={{ background:accent }} onClick={() => { onClose(); document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }); }}>Apply for {title} →</button>
            <button className="md-btn-o" style={{ borderColor:accentMid, color:accent }} onClick={() => { onClose(); document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }); }}>Free Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [active, setActive] = useState(null);
  const ref = useRef(false);
  useEffect(() => { if (ref.current) return; ref.current = true; injectCSS(CSS); }, []);
  return (
    <section id="services" className="sv-root">
      <div className="sv-stripe-bg" />
      <div className="sv-header">
        <div className="sv-eyebrow"><span className="sv-eline"/>Services We Provide<span className="sv-eline"/></div>
        <h2 className="sv-h2">Every Pathway.<br/><em className="sv-h2-em">One Expert Team.</em></h2>
        <p className="sv-sub">From student visas to skilled migration — covering Canada, USA, UK, Australia, New Zealand and Europe. <strong style={{ fontWeight:600, color:"#0f172a" }}>Click any card</strong> to explore full details.</p>
      </div>
      <div className="sv-ticker"><div className="sv-tfade sv-tfade-l"/><div className="sv-tfade sv-tfade-r"/><div className="sv-ttrack">{[...COUNTRIES,...COUNTRIES,...COUNTRIES,...COUNTRIES].map((c,i)=>(<span key={i} className="sv-titem"><span style={{ fontSize:"1.3rem" }}>{c.flag}</span><span className="sv-tname">{c.name}</span></span>))}</div></div>
      <div className="sv-grid-wrap">
        <div className="sv-grid">
          {SERVICES.map((svc, i) => (
            <button key={svc.id} className="sv-card" style={{ "--a":svc.accent,"--al":svc.accentLight,"--am":svc.accentMid, animationDelay:`${i*.08}s` }} onClick={() => setActive(svc)}>
              <div className="sv-card-stripe"/>
              <div className="sv-card-top"><div className="sv-card-icon"><svc.Icon color={svc.accent}/></div><span className="sv-card-num">{svc.num}</span></div>
              <div className="sv-card-title">{svc.title}</div>
              <div className="sv-card-tag">{svc.tagline}</div>
              <div className="sv-card-div"/>
              <div className="sv-card-flags">{svc.flags.slice(0,5).map((f,fi)=><span key={fi} style={{ fontSize:"1.05rem" }}>{f}</span>)}</div>
              <div className="sv-card-foot">
                <div className="sv-card-pills"><span className="sv-card-pill-accent">★ {svc.stat}</span><span className="sv-card-pill-neutral">⏱ {svc.time}</span></div>
                <div className="sv-card-cta">View Details<svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="sv-card-arrow"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="sv-cta"><div className="sv-cta-in"><div><span className="sv-cta-badge">Free 30-minute consultation</span><h3 className="sv-cta-h3">Not sure which visa is right for you?</h3><p className="sv-cta-p">Our experts will assess your profile and map the perfect pathway — no obligation, completely free.</p></div><div className="sv-cta-right"><button className="sv-cta-btn" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>Book Free Consultation<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></button><div className="sv-cta-trust"><span>✓ 15+ years experience</span><span>✓ 12,000+ families helped</span></div></div></div></div>
      {active && <ServiceModal svc={active} onClose={() => setActive(null)}/>}
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500&display=swap');
.sv-root { position:relative; background:#F8FAFC; font-family:'Poppins',sans-serif; overflow:hidden; }
.sv-stripe-bg { position:absolute; inset:0; pointer-events:none; z-index:0; background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(148,163,184,.055) 40px,rgba(148,163,184,.055) 41px); }
.sv-header { position:relative; z-index:2; text-align:center; padding:96px 28px 52px; animation:svUp .75s cubic-bezier(.16,1,.3,1) both; }
@keyframes svUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
.sv-eyebrow { display:inline-flex; align-items:center; gap:16px; font-family:'Montserrat',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:#64748B; margin-bottom:24px; }
.sv-eline { display:inline-block; width:28px; height:1px; background:#94A3B8; }
.sv-h2 { font-family:'Playfair Display',serif; font-size:clamp(2.8rem,5vw,4.2rem); font-weight:700; line-height:1.1; color:#0F172A; letter-spacing:-.02em; margin:0 0 16px; }
.sv-h2-em { font-style:italic; color:#DC2626; }
.sv-sub { font-size:1rem; font-weight:300; line-height:1.85; color:#64748B; max-width:520px; margin:0 auto; }
.sv-ticker { position:relative; z-index:2; overflow:hidden; border-top:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; background:#fff; padding:13px 0; margin-bottom:72px; }
.sv-tfade { position:absolute; top:0; bottom:0; width:80px; z-index:3; pointer-events:none; }
.sv-tfade-l { left:0; background:linear-gradient(90deg,#fff,transparent); }
.sv-tfade-r { right:0; background:linear-gradient(-90deg,#fff,transparent); }
.sv-ttrack { display:flex; width:max-content; animation:svTick 24s linear infinite; }
.sv-ttrack:hover { animation-play-state:paused; }
@keyframes svTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.sv-titem { display:inline-flex; align-items:center; gap:10px; padding:0 28px; border-right:1px solid #E2E8F0; }
.sv-tname { font-size:.68rem; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#334155; }
.sv-grid-wrap { position:relative; z-index:2; max-width:1280px; margin:0 auto; padding:0 32px 80px; }
.sv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
@media(max-width:1080px){ .sv-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:640px) { .sv-grid { grid-template-columns:1fr; } }
.sv-card { position:relative; background:#fff; border:1px solid #E2E8F0; border-radius:8px; padding:24px 22px 20px 28px; text-align:left; cursor:pointer; overflow:hidden; display:flex; flex-direction:column; opacity:0; animation:svCardIn .55s cubic-bezier(.16,1,.3,1) forwards; font-family:'Poppins',sans-serif; transition:transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .28s,border-color .25s; }
.sv-card:hover { transform:translateY(-7px) scale(1.005); box-shadow:0 20px 56px rgba(15,23,42,.13),0 4px 16px rgba(15,23,42,.06); border-color:var(--am); }
@keyframes svCardIn { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
.sv-card-stripe { position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--a); border-radius:0 2px 2px 0; transform:scaleY(0); transform-origin:bottom; transition:transform .35s cubic-bezier(.16,1,.3,1); }
.sv-card:hover .sv-card-stripe { transform:scaleY(1); }
.sv-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:16px; }
.sv-card-icon { width:48px; height:48px; border-radius:10px; background:var(--al); border:1px solid var(--am); display:flex; align-items:center; justify-content:center; transition:transform .28s,box-shadow .28s; }
.sv-card:hover .sv-card-icon { transform:scale(1.1) rotate(-4deg); box-shadow:0 6px 20px rgba(0,0,0,.09); }
.sv-card-num { font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:900; color:#F1F5F9; line-height:1; letter-spacing:-.02em; transition:color .25s; }
.sv-card:hover .sv-card-num { color:var(--am); }
.sv-card-title { font-family:'Playfair Display',serif; font-size:1.35rem; font-weight:700; color:#0F172A; margin-bottom:5px; letter-spacing:-.01em; transition:color .22s; }
.sv-card:hover .sv-card-title { color:var(--a); }
.sv-card-tag { font-size:.79rem; font-weight:300; color:#94A3B8; margin-bottom:16px; line-height:1.5; }
.sv-card-div { height:1px; background:#F1F5F9; margin-bottom:13px; transition:background .25s; }
.sv-card:hover .sv-card-div { background:var(--am); }
.sv-card-flags { display:flex; gap:4px; margin-bottom:16px; }
.sv-card-foot { margin-top:auto; }
.sv-card-pills { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:12px; }
.sv-card-pill-accent { display:inline-flex; align-items:center; gap:5px; background:var(--al); border:1px solid var(--am); border-radius:100px; padding:3px 10px; font-size:.65rem; font-weight:500; color:#334155; }
.sv-card-pill-neutral { display:inline-flex; align-items:center; gap:5px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:100px; padding:3px 10px; font-size:.65rem; font-weight:400; color:#64748B; }
.sv-card-cta { display:inline-flex; align-items:center; gap:8px; font-size:.71rem; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--a); border-top:1px solid #F1F5F9; padding-top:12px; width:100%; transition:gap .22s; }
.sv-card:hover .sv-card-cta { gap:12px; }
.sv-card-arrow { transition:transform .22s; }
.sv-card:hover .sv-card-arrow { transform:translateX(4px); }
.sv-cta { position:relative; z-index:2; background:#0F172A; padding:72px 28px; }
.sv-cta-in { max-width:1100px; margin:0 auto; display:flex; align-items:center; gap:60px; flex-wrap:wrap; }
.sv-cta-badge { display:inline-block; font-size:.6rem; font-weight:600; letter-spacing:.3em; text-transform:uppercase; color:#60A5FA; background:rgba(96,165,250,.1); border:1px solid rgba(96,165,250,.2); padding:5px 14px; border-radius:2px; margin-bottom:14px; }
.sv-cta-h3 { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3.2vw,2.8rem); font-weight:700; color:#fff; line-height:1.2; margin:0 0 12px; letter-spacing:-.02em; }
.sv-cta-p { font-size:.95rem; font-weight:300; color:#94A3B8; line-height:1.85; margin:0; max-width:440px; }
.sv-cta-right { display:flex; flex-direction:column; align-items:flex-start; gap:18px; flex-shrink:0; }
.sv-cta-btn { display:inline-flex; align-items:center; gap:12px; font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#0F172A; background:linear-gradient(135deg,#F5D76E 0%,#D4AF37 60%,#B8921E 100%); border:none; padding:17px 38px; cursor:pointer; clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px)); position:relative; overflow:hidden; transition:transform .28s,box-shadow .3s; }
.sv-cta-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.3) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s; }
.sv-cta-btn:hover::before { transform:translateX(100%); }
.sv-cta-btn:hover { transform:translateY(-3px); box-shadow:0 18px 50px rgba(212,175,55,.4),0 4px 16px rgba(0,0,0,.4); }
.sv-cta-trust { display:flex; flex-direction:column; gap:6px; }
.sv-cta-trust span { font-size:.74rem; font-weight:400; color:#475569; }
.md-overlay { position:fixed; inset:0; z-index:9999; background:rgba(15,23,42,.55); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); display:flex; align-items:flex-end; animation:mdIn .22s ease; }
@keyframes mdIn { from{opacity:0} to{opacity:1} }
.md-panel { background:#fff; width:100%; max-height:92vh; border-radius:20px 20px 0 0; display:flex; flex-direction:column; overflow:hidden; animation:mdUp .38s cubic-bezier(.22,1,.36,1); box-shadow:0 -20px 80px rgba(0,0,0,.2); }
@keyframes mdUp { from{transform:translateY(100%);opacity:0.3} to{transform:translateY(0);opacity:1} }
.md-head { padding:22px 28px 16px; flex-shrink:0; }
.md-head-row { display:flex; align-items:flex-start; gap:16px; margin-bottom:14px; }
.md-icon-ring { width:54px; height:54px; border-radius:12px; background:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.md-num { display:block; font-size:.58rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; margin-bottom:3px; }
.md-title { font-family:'Playfair Display',serif; font-size:1.85rem; font-weight:700; color:#0F172A; margin:0 0 3px; letter-spacing:-.02em; }
.md-tagline { font-size:.84rem; font-weight:300; color:#64748B; margin:0; font-style:italic; }
.md-close { width:34px; height:34px; border-radius:50%; background:#F1F5F9; border:1px solid #E2E8F0; color:#64748B; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-left:auto; transition:background .2s; }
.md-close:hover { background:#E2E8F0; }
.md-meta { display:flex; align-items:center; gap:10px; }
.md-pill { display:inline-flex; align-items:center; gap:5px; font-size:.72rem; font-weight:600; padding:5px 12px; border-radius:100px; }
.md-pill-out { display:inline-flex; align-items:center; gap:5px; font-size:.72rem; font-weight:500; padding:4px 12px; border-radius:100px; border:1px solid; background:transparent; }
.md-body { overflow-y:auto; padding:22px 28px 36px; flex:1; }
.md-overview { font-size:.96rem; font-weight:300; color:#374151; line-height:1.9; margin:0 0 22px; }
.md-sec-lbl { font-size:.57rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; display:flex; align-items:center; margin-bottom:12px; }
.md-countries { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px; }
.md-country { display:flex; align-items:center; gap:8px; background:#F8FAFC; border:1px solid; border-radius:8px; padding:7px 12px; }
.md-country-name { font-size:.78rem; font-weight:600; color:#0F172A; }
.md-two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
@media(max-width:640px){ .md-two-col { grid-template-columns:1fr; } }
.md-step { display:flex; gap:11px; margin-bottom:9px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:11px 12px; }
.md-step-n { width:22px; height:22px; border-radius:50%; color:#fff; display:flex; align-items:center; justify-content:center; font-size:.6rem; font-weight:700; flex-shrink:0; margin-top:1px; }
.md-step-t { font-family:'Montserrat',sans-serif; font-size:.81rem; font-weight:700; color:#0F172A; margin-bottom:3px; }
.md-step-d { font-size:.74rem; font-weight:300; color:#374151; line-height:1.6; }
.md-box { background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:15px; }
.md-box-lbl { font-size:.65rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; margin-bottom:11px; }
.md-row { display:flex; gap:9px; align-items:flex-start; margin-bottom:7px; }
.md-row-txt { font-size:.79rem; color:#374151; line-height:1.5; }
.md-ctas { display:flex; gap:12px; flex-wrap:wrap; }
.md-btn-p { font-family:'Montserrat',sans-serif; font-size:.73rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#fff; border:none; border-radius:6px; padding:13px 28px; cursor:pointer; transition:opacity .2s,transform .2s; }
.md-btn-p:hover { opacity:.88; transform:translateY(-2px); }
.md-btn-o { font-family:'Montserrat',sans-serif; font-size:.73rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; background:transparent; border-radius:6px; padding:12px 22px; cursor:pointer; border:1.5px solid; transition:all .2s; }
@media(max-width:700px){ .sv-cta-in { flex-direction:column; gap:32px; } .sv-cta-right { width:100%; } .sv-cta-btn { width:100%; justify-content:center; } .sv-grid-wrap { padding:0 16px 60px; } .md-head { padding:18px 18px 14px; } .md-body { padding:18px 18px 30px; } }
`;
