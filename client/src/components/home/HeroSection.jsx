import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — Ultra-Premium Dubai Immigration Hero Section
   • Real Dubai skyline photo (Unsplash CDN — swap with your local asset)
   • Cinematic parallax · particle constellation · animated scan line
   • Bilingual EN / Arabic (RTL) · Cinzel × Amiri × Outfit typography
   • 6 service cards with per-card color glow on hover
   • Animated stats row · bouncing scroll indicator
══════════════════════════════════════════════════════════════════════════════ */

// ─── Background ───────────────────────────────────────────────────────────────
// Replace with your own: import BG from "../assets/dubai-skyline.jpg";
const BG = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90&auto=format&fit=crop";

// ─── Service icons (inline SVG) ───────────────────────────────────────────────
const IconStudy = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <path d="M16 3L2 10l14 7 14-7-14-7z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" fill={c+"22"}/>
    <path d="M2 10v8M30 10v6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M6 14.5v7a10 4.5 0 0020 0v-7" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);
const IconVisa = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="7" width="26" height="18" rx="3" stroke={c} strokeWidth="1.6" fill={c+"15"}/>
    <path d="M3 13h26" stroke={c} strokeWidth="1.6"/>
    <circle cx="9" cy="20" r="2" fill={c} opacity=".65"/>
    <path d="M14 18h10M14 21.5h7" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconWork = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="13" width="24" height="15" rx="2" stroke={c} strokeWidth="1.6" fill={c+"15"}/>
    <path d="M11 13V9a5 5 0 0110 0v4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="16" cy="20" r="2.5" fill={c} opacity=".7"/>
    <path d="M4 20h24" stroke={c} strokeWidth="1.2" strokeDasharray="2 2"/>
  </svg>
);
const IconHome = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L3 14v14h8v-8h10v8h8V14L16 4z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" fill={c+"15"}/>
  </svg>
);
const IconInvest = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <path d="M4 24l8-8 6 5L28 8" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="8" r="3.5" stroke={c} strokeWidth="1.6" fill={c+"20"}/>
    <path d="M28 6v4M26 8h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconFamily = ({ c }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <circle cx="10" cy="9" r="3.5" stroke={c} strokeWidth="1.6" fill={c+"18"}/>
    <circle cx="22" cy="9" r="3.5" stroke={c} strokeWidth="1.6" fill={c+"18"}/>
    <circle cx="16" cy="13.5" r="3" stroke={c} strokeWidth="1.5" fill={c+"18"}/>
    <path d="M3 28c0-4 3-7 7-7M29 28c0-4-3-7-7-7M10 28c0-3.5 2.5-6 6-6s6 2.5 6 6" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const SERVICES = [
  { Icon: IconStudy,  en: "Study Visa",            ar: "تأشيرة الدراسة",     color: "#4FC3F7" },
  { Icon: IconVisa,   en: "B1/B2 Visa",            ar: "تأشيرة B1/B2",       color: "#D4AF37" },
  { Icon: IconWork,   en: "Work Visa",              ar: "تأشيرة العمل",        color: "#81C784" },
  { Icon: IconHome,   en: "Residency Visa",         ar: "تأشيرة الإقامة",     color: "#FFB74D" },
  { Icon: IconInvest, en: "Investment Immigration", ar: "هجرة الاستثمار",      color: "#CE93D8" },
  { Icon: IconFamily, en: "Family Visa",            ar: "تأشيرة العائلة",      color: "#F48FB1" },
];

const STATS = [
  { n: "12K+", en: "Visas Granted",  ar: "تأشيرة ممنوحة"   },
  { n: "98%",  en: "Success Rate",   ar: "معدل النجاح"      },
  { n: "15+",  en: "Years Expertise",ar: "سنوات خبرة"       },
  { n: "50+",  en: "Countries",      ar: "دولة"             },
];

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: 1.2 + Math.random() * 2.4,
  dur: 4 + Math.random() * 7,
  del: Math.random() * 6,
  op: 0.12 + Math.random() * 0.4,
  gold: i % 3 !== 0,
}));

// ─── All CSS in one injection ─────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

:root {
  --g1:#B8941F; --g2:#D4AF37; --g3:#F5D76E;
  --navy:#06101E; --navy2:#0A1F44;
  --teal:#00AEEF; --teal2:#38C8FF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}

@keyframes heroUp    {from{opacity:0;transform:translateY(38px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeI     {from{opacity:0}to{opacity:1}}
@keyframes shimmerG  {0%{background-position:-600px 0}100%{background-position:600px 0}}
@keyframes goldPulse {0%{box-shadow:0 0 0 0 rgba(212,175,55,.65)}70%{box-shadow:0 0 0 16px rgba(212,175,55,0)}100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}
@keyframes scanAnim  {0%{top:-3%}100%{top:103%}}
@keyframes ringRot   {from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes floatUp   {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes floatDown {0%,100%{transform:translateY(0)}50%{transform:translateY(12px)}}
@keyframes ptDrift   {0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.3)}}
@keyframes arrowB    {0%,100%{transform:translate(-50%,0) rotate(45deg)}50%{transform:translate(-50%,9px) rotate(45deg)}}
@keyframes borderBlink{0%,100%{border-color:rgba(212,175,55,.22)}50%{border-color:rgba(212,175,55,.72)}}
@keyframes statPop   {from{opacity:0;transform:scale(.75)}to{opacity:1;transform:scale(1)}}

/* HERO WRAPPER */
.h-wrap{
  position:relative;width:100%;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  overflow:hidden;background:var(--navy);
}

/* BG */
.h-bg{
  position:absolute;inset:0;z-index:0;
  background-size:cover;background-position:center 30%;
  will-change:transform;transition:transform .08s linear;
}
.h-bg::after{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 75% 55% at 50% 30%,rgba(10,31,68,.5) 0%,transparent 70%),
    linear-gradient(180deg,rgba(4,10,22,.82) 0%,rgba(6,14,30,.44) 38%,rgba(6,14,30,.70) 72%,rgba(4,10,22,.97) 100%);
}

/* SCAN LINE */
.h-scan{
  position:absolute;left:0;right:0;height:2px;z-index:3;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(212,175,55,.14),rgba(212,175,55,.38),rgba(212,175,55,.14),transparent);
  animation:scanAnim 8s linear infinite;
}

/* GRAIN */
.h-grain{
  position:absolute;inset:0;z-index:4;pointer-events:none;opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:180px;
}

/* GRID */
.h-grid{
  position:absolute;inset:0;z-index:2;pointer-events:none;
  background-image:
    linear-gradient(rgba(212,175,55,.032) 1px,transparent 1px),
    linear-gradient(90deg,rgba(212,175,55,.032) 1px,transparent 1px);
  background-size:65px 65px;
}

/* RINGS */
.h-ring{
  position:absolute;top:50%;left:50%;border-radius:50%;
  border:1px solid rgba(212,175,55,.08);pointer-events:none;z-index:1;
}

/* ORB */
.h-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:1;filter:blur(60px);}

/* SKYLINE */
.h-skyline{position:absolute;bottom:0;left:0;right:0;z-index:2;pointer-events:none;}

/* CONTENT */
.h-content{
  position:relative;z-index:10;
  width:100%;max-width:1160px;
  padding:108px 28px 58px;
  display:flex;flex-direction:column;align-items:center;
}

/* BADGE */
.h-badge{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(212,175,55,.09);
  border:1px solid rgba(212,175,55,.30);
  border-radius:100px;padding:7px 22px 7px 14px;
  margin-bottom:30px;
  animation:heroUp .7s .1s cubic-bezier(.22,1,.36,1) both;
}
.h-dot{
  width:8px;height:8px;border-radius:50%;background:var(--g2);
  animation:goldPulse 2.4s ease-out infinite;
}
.h-badge-txt{
  font-family:'Outfit',sans-serif;font-size:.66rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--g2);
}

/* H1 */
.h-h1{
  font-family:'Cinzel',serif;font-weight:700;
  font-size:clamp(2.3rem,6.2vw,5rem);
  line-height:1.1;text-align:center;color:#fff;
  letter-spacing:.01em;max-width:860px;
  text-shadow:0 6px 50px rgba(0,0,0,.65);
  animation:heroUp .85s .24s cubic-bezier(.22,1,.36,1) both;
}
.h-gold-txt{
  background:linear-gradient(135deg,var(--g1) 0%,var(--g2) 38%,var(--g3) 65%,var(--g2) 100%);
  background-size:280%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  animation:shimmerG 5s linear infinite;
  display:inline;
}

/* DIVIDER */
.h-div{
  width:150px;height:1.5px;margin:16px auto;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px 100%;
  animation:shimmerG 3s linear infinite, heroUp .8s .36s both;
}

/* H2 AR */
.h-h2{
  font-family:'Amiri',serif;font-weight:700;
  font-size:clamp(1.55rem,4vw,2.9rem);
  direction:rtl;text-align:center;
  color:rgba(245,215,110,.88);line-height:1.6;
  animation:heroUp .85s .42s cubic-bezier(.22,1,.36,1) both;
}

/* SUBS */
.h-sub-en{
  font-family:'Outfit',sans-serif;font-size:clamp(.9rem,1.75vw,1.12rem);
  font-weight:300;letter-spacing:.04em;color:rgba(255,255,255,.68);
  text-align:center;max-width:570px;line-height:1.9;
  margin-top:18px;
  animation:heroUp .8s .54s cubic-bezier(.22,1,.36,1) both;
}
.h-sub-ar{
  font-family:'Amiri',serif;font-size:clamp(.86rem,1.55vw,1.04rem);
  direction:rtl;color:rgba(212,175,55,.58);
  text-align:center;max-width:540px;line-height:2.2;
  margin-top:6px;
  animation:heroUp .8s .62s cubic-bezier(.22,1,.36,1) both;
}

/* CTAs */
.h-ctas{
  display:flex;flex-wrap:wrap;gap:16px;justify-content:center;
  margin:36px 0 50px;
  animation:heroUp .8s .74s cubic-bezier(.22,1,.36,1) both;
}
.h-btn-gold{
  font-family:'Outfit',sans-serif;font-size:.74rem;font-weight:600;
  letter-spacing:.18em;text-transform:uppercase;color:var(--navy);
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:300%;border:none;border-radius:3px;
  padding:15px 40px;cursor:pointer;position:relative;overflow:hidden;
  animation:goldPulse 3s ease-out infinite,shimmerG 5s linear infinite;
  transition:transform .25s ease,box-shadow .3s ease;
}
.h-btn-gold::before{
  content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;
  background:linear-gradient(110deg,transparent,rgba(255,255,255,.42),transparent);
  transition:left .55s ease;pointer-events:none;
}
.h-btn-gold:hover::before{left:160%;}
.h-btn-gold:hover{
  transform:translateY(-3px) scale(1.03);animation:none;background-position:right;
  box-shadow:0 14px 42px rgba(212,175,55,.58),0 4px 14px rgba(0,0,0,.45);
}
.h-btn-ar{
  font-family:'Amiri',serif;font-size:1.06rem;font-weight:700;
  direction:rtl;letter-spacing:.04em;color:var(--g2);
  background:transparent;border:1.5px solid rgba(212,175,55,.44);
  border-radius:3px;padding:14px 34px;cursor:pointer;
  transition:all .3s ease;
  animation:borderBlink 3s ease-in-out infinite;
}
.h-btn-ar:hover{
  background:rgba(212,175,55,.1);border-color:var(--g2);
  color:var(--g3);transform:translateY(-3px);animation:none;
  box-shadow:0 10px 30px rgba(212,175,55,.28);
}

/* SERVICE CARDS */
.h-cards{
  display:grid;grid-template-columns:repeat(6,1fr);
  gap:13px;width:100%;
  animation:heroUp .9s .88s cubic-bezier(.22,1,.36,1) both;
}
@media(max-width:900px){.h-cards{grid-template-columns:repeat(3,1fr);}}
@media(max-width:540px){.h-cards{grid-template-columns:repeat(2,1fr);}}

.h-card{
  background:rgba(255,255,255,.038);
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:24px 13px 20px;text-align:center;
  cursor:pointer;position:relative;overflow:hidden;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  transition:
    transform .4s cubic-bezier(.34,1.56,.64,1),
    box-shadow .4s ease,
    border-color .35s ease,
    background .35s ease;
}
.h-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 50% -10%,var(--cc,#D4AF37) 0%,transparent 60%);
  opacity:0;transition:opacity .4s ease;pointer-events:none;
}
.h-card:hover{
  transform:translateY(-11px) scale(1.06);
  border-color:var(--cc,rgba(212,175,55,.55));
  background:rgba(255,255,255,.075);
  box-shadow:0 24px 60px rgba(0,0,0,.52),0 0 36px rgba(212,175,55,.14),inset 0 1px 0 rgba(255,255,255,.1);
}
.h-card:hover::after{opacity:.06;}
.h-icon-wrap{
  width:58px;height:58px;border-radius:50%;
  background:rgba(255,255,255,.055);
  border:1px solid rgba(255,255,255,.09);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 12px;
  transition:background .35s,box-shadow .35s,border-color .35s;
}
.h-card:hover .h-icon-wrap{
  background:rgba(255,255,255,.1);
  border-color:var(--cc,rgba(212,175,55,.5));
  box-shadow:0 0 24px var(--cc,rgba(212,175,55,.4));
}
.h-card-en{
  font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;
  letter-spacing:.08em;text-transform:uppercase;
  color:rgba(255,255,255,.88);line-height:1.4;
}
.h-card-ar{
  font-family:'Amiri',serif;font-size:.82rem;
  direction:rtl;color:rgba(212,175,55,.6);margin-top:4px;
}

/* STATS */
.h-stats{
  display:flex;flex-wrap:wrap;
  margin-top:44px;width:100%;max-width:820px;
  border-top:1px solid rgba(212,175,55,.12);
  border-bottom:1px solid rgba(212,175,55,.12);
  animation:heroUp .8s 1.08s cubic-bezier(.22,1,.36,1) both;
}
.h-stat{
  flex:1 1 140px;padding:22px 10px;text-align:center;
  border-right:1px solid rgba(212,175,55,.09);
}
.h-stat:last-child{border-right:none;}
.h-stat-n{
  font-family:'Cinzel',serif;font-size:2rem;font-weight:700;
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:statPop .7s ease both;
}
.h-stat-en{
  font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(255,255,255,.44);margin-top:3px;
}
.h-stat-ar{font-family:'Amiri',serif;font-size:.75rem;direction:rtl;color:rgba(212,175,55,.4);}

/* SCROLL ARROW */
.h-scroll{
  position:absolute;bottom:30px;left:50%;
  transform:translate(-50%,0);
  z-index:10;text-align:center;cursor:pointer;
  animation:fadeI 1s 2s ease both;
}
.h-scroll-label{
  display:block;font-family:'Outfit',sans-serif;font-size:.56rem;
  letter-spacing:.3em;text-transform:uppercase;
  color:rgba(212,175,55,.5);margin-bottom:8px;
}
.h-scroll-arr{
  width:20px;height:20px;margin:0 auto;
  border-right:2px solid rgba(212,175,55,.6);
  border-bottom:2px solid rgba(212,175,55,.6);
  animation:arrowB 1.9s ease-in-out infinite;
}

/* RESPONSIVE */
@media(max-width:640px){
  .h-content{padding:92px 16px 48px;}
  .h-stat{padding:14px 6px;}
  .h-stat-n{font-size:1.45rem;}
}
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const cssInj  = useRef(false);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    if (cssInj.current) return;
    const t = document.createElement("style");
    t.textContent = GLOBAL_CSS;
    document.head.appendChild(t);
    cssInj.current = true;
  }, []);

  useEffect(() => {
    const fn = (e) => {
      setMx((e.clientX / window.innerWidth  - 0.5) * 14);
      setMy((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const goConsult = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollDown = () =>
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="h-wrap">

      {/* ── Parallax background ── */}
      <div
        className="h-bg"
        style={{
          backgroundImage: `url('${BG}')`,
          transform: `scale(1.12) translate(${mx * 0.35}px, ${my * 0.3}px)`,
        }}
      />

      {/* ── Scan line ── */}
      <div className="h-scan" />

      {/* ── Grid + grain ── */}
      <div className="h-grid" />
      <div className="h-grain" />

      {/* ── Ambient orbs ── */}
      <div className="h-orb" style={{
        top:"12%",left:"4%",width:440,height:440,
        background:"radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",
        animation:"floatUp 10s ease-in-out infinite",
      }}/>
      <div className="h-orb" style={{
        bottom:"20%",right:"4%",width:520,height:400,
        background:"radial-gradient(circle,rgba(0,174,239,.055) 0%,transparent 70%)",
        animation:"floatDown 13s ease-in-out infinite",
      }}/>
      <div className="h-orb" style={{
        top:"40%",left:"45%",width:350,height:350,
        background:"radial-gradient(circle,rgba(212,175,55,.04) 0%,transparent 70%)",
        animation:"floatUp 8s 2s ease-in-out infinite",
      }}/>

      {/* ── Decorative rings ── */}
      {[540, 760, 960].map((sz, i) => (
        <div key={sz} className="h-ring" style={{
          width:sz, height:sz,
          marginLeft:-sz/2, marginTop:-sz/2,
          animation:`ringRot ${28+i*16}s ${i%2?"reverse":""} linear infinite`,
          opacity:.04+i*.014,
        }}/>
      ))}

      {/* ── Particles ── */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position:"absolute",left:`${p.x}%`,top:`${p.y}%`,
          width:p.s,height:p.s,borderRadius:"50%",
          background:p.gold?"var(--g2)":"var(--teal2)",
          opacity:p.op,zIndex:2,pointerEvents:"none",
          animation:`ptDrift ${p.dur}s ${p.del}s ease-in-out infinite`,
        }}/>
      ))}

      {/* ── CSS Dubai skyline silhouette ── */}
      <svg className="h-skyline" viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#D4AF37" opacity=".16"
          d="M0,180V148l45,0V118l14,0V98l7-62,4-22,4,22,7,62V98l14,0V118l18,0V138
             l28,0V108l11,0V82l9-52,4-18,5,18,9,52V82l11,0V108l28,0V92l9,0V70l8-46,4-16,4,16,8,46V70l9,0V92l32,0V118l13,0V94l8,0V72l7-44,4-16,4,16,7,44V72l8,0V94l13,0V118
             l30,0V100l10,0V76l9-55,4-20,5-8,5,8,4,20,9,55V76l10,0V100l30,0V112l11,0V88l8-50,5-18,5,18,8,50V88l11,0V112
             l38,0V96l10,0V72l9-56,4-22,4,22,9,56V72l10,0V96l38,0V108l9,0V84l7-44,4-16,4,16,7,44V84l9,0V108l35,0V120l11,0V96l9-58,4-22,3-8,3,8,4,22,9,58V96l11,0V120
             l38,0V130l10,0V106l8-50,4-18,4,18,8,50V106l10,0V130l40,0V116l9,0V92l8-48,4-18,4,18,8,48V92l9,0V116l42,0V128l10,0V104l8-52,4-20,4,20,8,52V104l10,0V128
             l38,0V140l9,0V116l7-42,4-15,4,15,7,42V116l9,0V140l50,0V180Z"
        />
      </svg>

      {/* ════════════ CONTENT ════════════ */}
      <div className="h-content">

        {/* Badge */}
        <div className="h-badge">
          <div className="h-dot"/>
          <span className="h-badge-txt">BlueWave Consultation · Dubai Immigration Specialists</span>
          <div className="h-dot" style={{animationDelay:".7s"}}/>
        </div>

        {/* EN Heading */}
        <h1 className="h-h1">
          Your Gateway to{" "}
          <span className="h-gold-txt">Dubai</span>
          <br/>Starts Here
        </h1>

        {/* Shimmer bar */}
        <div className="h-div"/>

        {/* AR Heading */}
        <h2 className="h-h2">بوابتك إلى دبي تبدأ من هنا</h2>

        {/* EN Sub */}
        <p className="h-sub-en">
          BlueWave Consultation delivers world-class expertise in visas, residency,
          study programmes &amp; investment immigration — turning your Dubai dream
          into a living reality.
        </p>

        {/* AR Sub */}
        <p className="h-sub-ar">
          خبراء متخصصون في التأشيرات، الإقامة، الدراسة والهجرة الاستثمارية في دبي والإمارات
        </p>

        {/* CTA Buttons */}
        <div className="h-ctas">
          <button className="h-btn-gold" onClick={goConsult}>
            Get Free Consultation
          </button>
          <button className="h-btn-ar" onClick={goConsult}>
            احصل على استشارة مجانية
          </button>
        </div>

        {/* Service Cards */}
        <div className="h-cards">
          {SERVICES.map(({ Icon, en, ar, color }, i) => (
            <div
              key={i}
              className="h-card"
              style={{ "--cc": color }}
            >
              <div className="h-icon-wrap">
                <Icon c={color}/>
              </div>
              <div className="h-card-en">{en}</div>
              <div className="h-card-ar">{ar}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="h-stats">
          {STATS.map((s, i) => (
            <div key={i} className="h-stat">
              <div className="h-stat-n">{s.n}</div>
              <div className="h-stat-en">{s.en}</div>
              <div className="h-stat-ar">{s.ar}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="h-scroll" onClick={scrollDown}>
        <span className="h-scroll-label">Explore</span>
        <div className="h-scroll-arr"/>
      </div>

      {/* Bottom vignette */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,height:120,
        background:"linear-gradient(to bottom,transparent,rgba(4,10,22,.96))",
        zIndex:5,pointerEvents:"none",
      }}/>
    </section>
  );
}