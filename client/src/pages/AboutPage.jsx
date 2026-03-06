import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — Premium Bilingual About Us Page
   • Exact same design system as Navbar + HeroSection
   • Cinzel × Amiri × Outfit typography
   • Gold (#D4AF37) + Navy (#06101E) + Teal (#00AEEF)
   • Animated sections with IntersectionObserver scroll reveals
   • Bilingual EN / Arabic (RTL) throughout
   • Company address: CWS-1V-224954, 26th Floor, Amber Gem Tower,
     Sheikh Khalifa Street, Ajman, UAE
   • Founded 7 years ago · Expert consultants · All immigration cases
══════════════════════════════════════════════════════════════════════════════ */

/* ── Scroll reveal hook ──────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── What We Do cards ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "🎓",
    en: "Study Visa",
    ar: "تأشيرة الدراسة",
    desc: "Guiding students to top universities and institutions across the UAE and globally.",
    descAr: "نرشد الطلاب إلى أفضل الجامعات والمؤسسات في الإمارات وحول العالم.",
    color: "#4FC3F7",
  },
  {
    icon: "💼",
    en: "Work Visa",
    ar: "تأشيرة العمل",
    desc: "End-to-end work permit processing for professionals, skilled workers and executives.",
    descAr: "معالجة كاملة لتصاريح العمل للمهنيين والعمال المهرة والمديرين التنفيذيين.",
    color: "#81C784",
  },
  {
    icon: "🏠",
    en: "Residency Visa",
    ar: "تأشيرة الإقامة",
    desc: "Securing long-term UAE residency through employment, investment and family sponsorship.",
    descAr: "تأمين الإقامة طويلة الأمد في الإمارات من خلال العمل والاستثمار وكفالة الأسرة.",
    color: "#FFB74D",
  },
  {
    icon: "📋",
    en: "B1/B2 Visa",
    ar: "تأشيرة B1/B2",
    desc: "Business and tourist visa applications handled with precision and speed.",
    descAr: "معالجة طلبات تأشيرة الأعمال والسياحة بدقة وسرعة.",
    color: "#D4AF37",
  },
  {
    icon: "💰",
    en: "Investment Immigration",
    ar: "هجرة الاستثمار",
    desc: "Golden Visa and investor residency pathways for high-net-worth individuals.",
    descAr: "التأشيرة الذهبية ومسارات إقامة المستثمرين للأفراد ذوي الثروات العالية.",
    color: "#CE93D8",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    en: "Family Visa",
    ar: "تأشيرة العائلة",
    desc: "Reuniting families through sponsorship, dependent and family reunification visas.",
    descAr: "لمّ شمل العائلات من خلال تأشيرات الكفالة والتابعين ولمّ الشمل الأسري.",
    color: "#F48FB1",
  },
];

/* ── Timeline milestones ─────────────────────────────────────────────────── */
const MILESTONES = [
  { year: "2018", en: "Founded in Ajman, UAE", ar: "التأسيس في عجمان، الإمارات" },
  { year: "2019", en: "500+ successful visa applications", ar: "أكثر من ٥٠٠ طلب تأشيرة ناجح" },
  { year: "2021", en: "Expanded to Investment Immigration", ar: "التوسع في هجرة الاستثمار" },
  { year: "2023", en: "5,000+ clients served across 40+ countries", ar: "خدمة أكثر من ٥٠٠٠ عميل من ٤٠+ دولة" },
  { year: "2024", en: "Golden Visa specialist certification", ar: "شهادة تخصص التأشيرة الذهبية" },
  { year: "2025", en: "12,000+ visas granted — 98% success rate", ar: "أكثر من ١٢٠٠٠ تأشيرة ممنوحة — ٩٨٪ معدل نجاح" },
];

/* ── Core values ──────────────────────────────────────────────────────────── */
const VALUES = [
  { icon: "⚖️", en: "Integrity",    ar: "النزاهة",     desc: "Transparent, honest advice — always in your best interest.", descAr: "نصائح شفافة وصادقة — دائمًا في مصلحتك الفضلى." },
  { icon: "🏆", en: "Excellence",   ar: "التميز",      desc: "World-class standards in every case we handle.", descAr: "معايير عالمية في كل حالة نتولاها." },
  { icon: "🤝", en: "Partnership",  ar: "الشراكة",     desc: "We walk every step of your immigration journey with you.", descAr: "نرافقك في كل خطوة من رحلة الهجرة." },
  { icon: "⚡", en: "Efficiency",   ar: "الكفاءة",     desc: "Fast, precise processing — no delays, no surprises.", descAr: "معالجة سريعة ودقيقة — بلا تأخير ولا مفاجآت." },
];

/* ── All CSS ──────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

:root {
  --g1:#B8941F; --g2:#D4AF37; --g3:#F5D76E;
  --navy:#06101E; --navy2:#0A1F44; --navy3:#0D2255;
  --teal:#00AEEF; --teal2:#38C8FF;
  --white:#FFFFFF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── Keyframes ── */
@keyframes abt-shimmer  {0%{background-position:-700px 0}100%{background-position:700px 0}}
@keyframes abt-fadeUp   {from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes abt-fadeIn   {from{opacity:0}to{opacity:1}}
@keyframes abt-scaleIn  {from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
@keyframes abt-pulse    {0%{box-shadow:0 0 0 0 rgba(212,175,55,.6)}70%{box-shadow:0 0 0 14px rgba(212,175,55,0)}100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}
@keyframes abt-scanLine {0%{left:-30%}100%{left:120%}}
@keyframes abt-float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes abt-lineGrow {from{width:0}to{width:100%}}
@keyframes abt-countUp  {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes abt-dotPulse {0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.5}}

.reveal        {opacity:0;transform:translateY(32px);transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-scale        {opacity:0;transform:scale(.92);transition:opacity .7s ease,transform .7s cubic-bezier(.22,1,.36,1);}
.reveal-scale.visible{opacity:1;transform:scale(1);}

/* ── PAGE WRAPPER ── */
.abt-page {
  background: var(--navy);
  min-height: 100vh;
  overflow: hidden;
}

/* ── SECTION BASE ── */
.abt-section {
  position: relative;
  padding: 100px 28px;
  max-width: 1160px;
  margin: 0 auto;
}

/* ── SECTION HEADER (reused) ── */
.abt-sec-head {
  text-align: center;
  margin-bottom: 64px;
}
.abt-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(212,175,55,.09);
  border: 1px solid rgba(212,175,55,.28);
  border-radius: 100px;
  padding: 6px 20px;
  font-family: 'Outfit',sans-serif;
  font-size: .64rem; font-weight: 500; letter-spacing: .28em;
  text-transform: uppercase; color: var(--g2);
  margin-bottom: 20px;
}
.abt-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--g2);
  animation: abt-dotPulse 2.2s ease-in-out infinite;
}
.abt-sec-title {
  font-family: 'Cinzel',serif; font-weight: 700;
  font-size: clamp(2rem,4vw,3.4rem);
  color: #fff; letter-spacing: .02em; line-height: 1.12;
}
.abt-sec-title .gold {
  background: linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size: 280%; -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
  animation: abt-shimmer 5s linear infinite;
}
.abt-sec-title-ar {
  font-family: 'Amiri',serif; font-size: clamp(1.3rem,2.5vw,2rem);
  direction: rtl; color: rgba(245,215,110,.75); margin-top: 8px;
  font-weight: 700; line-height: 1.6;
}
.abt-divider {
  width: 120px; height: 1.5px; margin: 16px auto;
  background: linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size: 400px;
  animation: abt-shimmer 3s linear infinite;
}
.abt-sec-sub {
  font-family: 'Outfit',sans-serif; font-weight: 300;
  font-size: clamp(.9rem,1.6vw,1.08rem);
  color: rgba(255,255,255,.6); max-width: 560px;
  margin: 14px auto 0; line-height: 1.85; text-align: center;
}
.abt-sec-sub-ar {
  font-family: 'Amiri',serif; font-size: clamp(.88rem,1.5vw,1.02rem);
  direction: rtl; color: rgba(212,175,55,.55);
  max-width: 540px; margin: 6px auto 0; line-height: 2.1; text-align: center;
}

/* ════════════════════════════════════════════════
   HERO BAND (top of About page)
════════════════════════════════════════════════ */
.abt-hero {
  position: relative;
  min-height: 480px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background:
    linear-gradient(180deg,rgba(4,8,20,.96) 0%,rgba(6,14,34,.85) 60%,rgba(6,10,24,.98) 100%),
    url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80') center 40%/cover no-repeat;
}
.abt-hero-scan {
  position: absolute; top:0; height:100%; width:40%; pointer-events:none;
  background: linear-gradient(90deg,transparent,rgba(212,175,55,.05),transparent);
  animation: abt-scanLine 9s linear infinite; z-index:1;
}
.abt-hero-grid {
  position: absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(212,175,55,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(212,175,55,.03) 1px,transparent 1px);
  background-size: 60px 60px;
}
.abt-hero-content {
  position: relative; z-index:2;
  text-align: center; padding: 80px 28px 70px;
  max-width: 900px; margin: 0 auto;
}
.abt-hero-tag {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.3);
  border-radius: 100px; padding: 7px 22px;
  font-family: 'Outfit',sans-serif; font-size:.66rem; letter-spacing:.28em;
  text-transform:uppercase; color:var(--g2); margin-bottom: 28px;
  animation: abt-fadeIn .8s .1s ease both;
}
.abt-hero-h1 {
  font-family: 'Cinzel',serif; font-weight: 700;
  font-size: clamp(2.4rem,6vw,4.6rem);
  color: #fff; text-align: center; line-height: 1.1;
  text-shadow: 0 6px 40px rgba(0,0,0,.6);
  animation: abt-fadeUp .9s .2s cubic-bezier(.22,1,.36,1) both;
}
.abt-hero-h1 .gold {
  background: linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size: 280%; -webkit-background-clip:text;
  -webkit-text-fill-color:transparent; background-clip:text;
  animation: abt-shimmer 5s linear infinite;
}
.abt-hero-ar {
  font-family: 'Amiri',serif; font-size: clamp(1.5rem,3.5vw,2.6rem);
  direction:rtl; color:rgba(245,215,110,.85); text-align:center;
  margin-top:12px; line-height:1.6;
  animation: abt-fadeUp .9s .36s cubic-bezier(.22,1,.36,1) both;
}
.abt-hero-divider {
  width:140px; height:1.5px; margin:18px auto;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px; animation:abt-shimmer 3s linear infinite, abt-fadeIn .8s .44s ease both;
}
.abt-hero-sub {
  font-family:'Outfit',sans-serif; font-weight:300;
  font-size:clamp(.9rem,1.7vw,1.1rem); color:rgba(255,255,255,.65);
  max-width:580px; margin:0 auto; line-height:1.9;
  animation:abt-fadeUp .8s .5s cubic-bezier(.22,1,.36,1) both;
}
.abt-hero-sub-ar {
  font-family:'Amiri',serif; font-size:clamp(.88rem,1.5vw,1.04rem);
  direction:rtl; color:rgba(212,175,55,.55); max-width:560px;
  margin:8px auto 0; line-height:2.1;
  animation:abt-fadeUp .8s .6s cubic-bezier(.22,1,.36,1) both;
}

/* ════════════════════════════════════════════════
   STAT STRIP
════════════════════════════════════════════════ */
.abt-stat-strip {
  background: linear-gradient(90deg,rgba(10,21,64,.98),rgba(13,34,85,.98));
  border-top: 1px solid rgba(212,175,55,.15);
  border-bottom: 1px solid rgba(212,175,55,.15);
  padding: 0;
}
.abt-stat-strip-inner {
  max-width: 1160px; margin: 0 auto;
  display: flex; flex-wrap: wrap;
}
.abt-stat-item {
  flex: 1 1 200px; padding: 36px 24px;
  text-align: center;
  border-right: 1px solid rgba(212,175,55,.1);
  position: relative;
}
.abt-stat-item:last-child { border-right: none; }
.abt-stat-item::before {
  content:''; position:absolute; bottom:0; left:50%;
  transform:translateX(-50%);
  width:0; height:2px;
  background:linear-gradient(90deg,var(--g1),var(--g2),var(--g3));
  transition: width .6s ease;
}
.abt-stat-item:hover::before { width:70%; }
.abt-stat-n {
  font-family:'Cinzel',serif; font-weight:700; font-size:2.6rem;
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.abt-stat-en {
  font-family:'Outfit',sans-serif; font-size:.66rem; letter-spacing:.14em;
  text-transform:uppercase; color:rgba(255,255,255,.45); margin-top:4px;
}
.abt-stat-ar {
  font-family:'Amiri',serif; font-size:.8rem; direction:rtl;
  color:rgba(212,175,55,.45); margin-top:2px;
}

/* ════════════════════════════════════════════════
   WHO WE ARE (split layout)
════════════════════════════════════════════════ */
.abt-who {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: center;
}
@media(max-width:768px){.abt-who{grid-template-columns:1fr;gap:40px;}}

.abt-who-visual {
  position: relative;
}
.abt-who-img-frame {
  position: relative; border-radius: 18px; overflow: hidden;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg,var(--navy3),var(--navy2));
  border: 1px solid rgba(212,175,55,.2);
  box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(212,175,55,.1);
}
/* Dubai city image */
.abt-who-img-frame::before {
  content:'';position:absolute;inset:0;
  background: url('https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80') center/cover;
  opacity:.55;
}
.abt-who-img-frame::after {
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 40%,rgba(6,16,30,.9) 100%);
}
.abt-who-img-badge {
  position: absolute; bottom:24px; left:24px; z-index:2;
  background:rgba(6,16,30,.92);
  border:1px solid rgba(212,175,55,.35);
  border-radius:12px; padding:14px 20px;
  backdrop-filter:blur(12px);
  animation:abt-float 5s ease-in-out infinite;
}
.abt-who-img-badge-n {
  font-family:'Cinzel',serif; font-size:1.8rem; font-weight:700;
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.abt-who-img-badge-l {
  font-family:'Outfit',sans-serif;font-size:.6rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:2px;
}

/* Gold accent corner */
.abt-gold-corner {
  position:absolute; top:-10px; right:-10px;
  width:60px;height:60px;border-radius:12px;
  background:linear-gradient(135deg,var(--g1),var(--g2));
  display:flex;align-items:center;justify-content:center;
  font-size:1.6rem; box-shadow:0 8px 24px rgba(212,175,55,.35);
  animation:abt-pulse 3s ease-out infinite;
  z-index:3;
}

.abt-who-text {}
.abt-who-label {
  font-family:'Outfit',sans-serif;font-size:.65rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--g2);
  margin-bottom:14px; display:flex;align-items:center;gap:10px;
}
.abt-who-label::before {
  content:'';width:28px;height:1.5px;
  background:linear-gradient(90deg,var(--g1),var(--g2));
}
.abt-who-h {
  font-family:'Cinzel',serif;font-weight:700;
  font-size:clamp(1.7rem,3vw,2.6rem);color:#fff;
  line-height:1.2;margin-bottom:10px;
}
.abt-who-h .gold{
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  background-size:220%;-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;
  animation:abt-shimmer 4s linear infinite;
}
.abt-who-h-ar {
  font-family:'Amiri',serif;font-size:clamp(1.2rem,2.2vw,1.7rem);
  direction:rtl;color:rgba(245,215,110,.75);margin-bottom:22px;font-weight:700;
}
.abt-who-body {
  font-family:'Outfit',sans-serif;font-weight:300;
  font-size:clamp(.9rem,1.5vw,1.03rem);color:rgba(255,255,255,.65);
  line-height:1.9;margin-bottom:10px;
}
.abt-who-body-ar {
  font-family:'Amiri',serif;font-size:clamp(.9rem,1.4vw,1rem);
  direction:rtl;color:rgba(212,175,55,.5);line-height:2.1;margin-bottom:22px;
}
.abt-feature-list {
  display:flex;flex-direction:column;gap:12px;margin-top:22px;
}
.abt-feature {
  display:flex;align-items:flex-start;gap:13px;
  padding:14px 18px;
  background:rgba(212,175,55,.05);
  border:1px solid rgba(212,175,55,.12);
  border-radius:10px;
  transition:background .3s,border-color .3s;
}
.abt-feature:hover{
  background:rgba(212,175,55,.09);border-color:rgba(212,175,55,.3);
}
.abt-feature-icon {
  width:32px;height:32px;border-radius:8px;
  background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.25);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;font-size:1rem;
}
.abt-feature-en {
  font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;
  color:rgba(255,255,255,.88);
}
.abt-feature-ar {
  font-family:'Amiri',serif;font-size:.82rem;direction:rtl;
  color:rgba(212,175,55,.6);margin-top:2px;
}

/* ════════════════════════════════════════════════
   WHAT WE DO — service cards
════════════════════════════════════════════════ */
.abt-services-bg {
  background:linear-gradient(180deg,var(--navy) 0%,rgba(10,21,64,.4) 50%,var(--navy) 100%);
  position:relative;overflow:hidden;
}
.abt-services-bg::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(212,175,55,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(212,175,55,.025) 1px,transparent 1px);
  background-size:65px 65px;
}
.abt-srv-grid {
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;
}
@media(max-width:900px){.abt-srv-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:520px){.abt-srv-grid{grid-template-columns:1fr;}}

.abt-srv-card {
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:18px;padding:32px 24px 28px;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  cursor:pointer;position:relative;overflow:hidden;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s,border-color .35s,background .35s;
}
.abt-srv-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 50% 0%,var(--cc,#D4AF37) 0%,transparent 65%);
  opacity:0;transition:opacity .4s;pointer-events:none;
}
.abt-srv-card:hover{
  transform:translateY(-10px) scale(1.03);
  border-color:var(--cc,rgba(212,175,55,.55));
  background:rgba(255,255,255,.07);
  box-shadow:0 22px 55px rgba(0,0,0,.5),0 0 32px rgba(212,175,55,.13),inset 0 1px 0 rgba(255,255,255,.1);
}
.abt-srv-card:hover::after{opacity:.06;}

.abt-srv-icon {
  font-size:2rem;width:60px;height:60px;border-radius:14px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:18px;
  transition:background .3s,box-shadow .3s,border-color .3s;
}
.abt-srv-card:hover .abt-srv-icon{
  background:rgba(255,255,255,.1);
  border-color:var(--cc,rgba(212,175,55,.5));
  box-shadow:0 0 20px var(--cc,rgba(212,175,55,.35));
}
.abt-srv-en{
  font-family:'Cinzel',serif;font-size:1rem;font-weight:600;
  color:#fff;margin-bottom:4px;
}
.abt-srv-ar{
  font-family:'Amiri',serif;font-size:.92rem;direction:rtl;
  color:rgba(212,175,55,.65);margin-bottom:14px;
}
.abt-srv-desc{
  font-family:'Outfit',sans-serif;font-weight:300;font-size:.85rem;
  color:rgba(255,255,255,.6);line-height:1.75;margin-bottom:8px;
}
.abt-srv-desc-ar{
  font-family:'Amiri',serif;font-size:.85rem;direction:rtl;
  color:rgba(212,175,55,.45);line-height:1.9;
}

/* ════════════════════════════════════════════════
   TIMELINE
════════════════════════════════════════════════ */
.abt-timeline {
  position:relative;padding:0 0 20px;
}
.abt-timeline::before {
  content:'';position:absolute;left:50%;top:0;bottom:0;
  transform:translateX(-50%);width:1.5px;
  background:linear-gradient(180deg,transparent,rgba(212,175,55,.4) 10%,rgba(212,175,55,.4) 90%,transparent);
}
@media(max-width:640px){
  .abt-timeline::before{left:20px;}
}
.abt-tl-item {
  display:grid;grid-template-columns:1fr 1fr;
  gap:0 40px;margin-bottom:40px;
  position:relative;
}
.abt-tl-item:nth-child(even) .abt-tl-left  { order:2; text-align:left; }
.abt-tl-item:nth-child(even) .abt-tl-right { order:1; text-align:right; }
@media(max-width:640px){
  .abt-tl-item{grid-template-columns:1fr;padding-left:50px;}
  .abt-tl-item:nth-child(even) .abt-tl-left  { order:unset; text-align:left; }
  .abt-tl-item:nth-child(even) .abt-tl-right { order:unset; text-align:left; }
}

.abt-tl-dot {
  position:absolute;left:50%;top:14px;
  transform:translateX(-50%);
  width:14px;height:14px;border-radius:50%;
  background:var(--g2);
  box-shadow:0 0 0 4px rgba(212,175,55,.2),0 0 16px rgba(212,175,55,.4);
  z-index:2;
}
@media(max-width:640px){.abt-tl-dot{left:14px;}}

.abt-tl-year {
  font-family:'Cinzel',serif;font-weight:700;font-size:1.3rem;
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:6px;
}
.abt-tl-en {
  font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:400;
  color:rgba(255,255,255,.78);line-height:1.6;
}
.abt-tl-ar {
  font-family:'Amiri',serif;font-size:.9rem;direction:rtl;
  color:rgba(212,175,55,.55);margin-top:4px;
}

/* ════════════════════════════════════════════════
   VALUES
════════════════════════════════════════════════ */
.abt-values-grid {
  display:grid;grid-template-columns:repeat(4,1fr);gap:18px;
}
@media(max-width:900px){.abt-values-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.abt-values-grid{grid-template-columns:1fr;}}

.abt-val-card {
  background:rgba(255,255,255,.038);
  border:1px solid rgba(212,175,55,.14);
  border-radius:16px;padding:28px 20px;text-align:center;
  transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s,background .3s,border-color .3s;
}
.abt-val-card:hover {
  transform:translateY(-8px);
  background:rgba(212,175,55,.07);
  border-color:rgba(212,175,55,.4);
  box-shadow:0 18px 45px rgba(0,0,0,.45),0 0 28px rgba(212,175,55,.12);
}
.abt-val-icon {
  font-size:2rem;margin-bottom:14px;display:block;
}
.abt-val-en {
  font-family:'Cinzel',serif;font-size:.9rem;font-weight:600;
  color:var(--g3);letter-spacing:.06em;margin-bottom:4px;
}
.abt-val-ar {
  font-family:'Amiri',serif;font-size:.88rem;direction:rtl;
  color:rgba(212,175,55,.55);margin-bottom:12px;
}
.abt-val-desc {
  font-family:'Outfit',sans-serif;font-weight:300;font-size:.8rem;
  color:rgba(255,255,255,.55);line-height:1.75;
}
.abt-val-desc-ar {
  font-family:'Amiri',serif;font-size:.82rem;direction:rtl;
  color:rgba(212,175,55,.4);line-height:1.9;margin-top:6px;
}

/* ════════════════════════════════════════════════
   ADDRESS / FIND US
════════════════════════════════════════════════ */
.abt-address-section {
  background:linear-gradient(135deg,rgba(10,21,64,.98),rgba(13,34,85,.98));
  border-top:1px solid rgba(212,175,55,.12);
  border-bottom:1px solid rgba(212,175,55,.12);
  position:relative;overflow:hidden;
}
.abt-address-section::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(212,175,55,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(212,175,55,.03) 1px,transparent 1px);
  background-size:55px 55px;
}
.abt-addr-grid {
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;
}
@media(max-width:768px){.abt-addr-grid{grid-template-columns:1fr;gap:32px;}}

.abt-addr-card {
  background:rgba(255,255,255,.04);
  border:1px solid rgba(212,175,55,.18);
  border-radius:18px;padding:36px 32px;
  backdrop-filter:blur(12px);
  position:relative;overflow:hidden;
}
.abt-addr-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px;animation:abt-shimmer 3s linear infinite;
}
.abt-addr-title {
  font-family:'Cinzel',serif;font-weight:700;font-size:1.15rem;
  color:#fff;margin-bottom:6px;
}
.abt-addr-title-ar {
  font-family:'Amiri',serif;font-size:1.05rem;direction:rtl;
  color:rgba(212,175,55,.7);margin-bottom:22px;
}
.abt-addr-row {
  display:flex;gap:14px;margin-bottom:16px;align-items:flex-start;
}
.abt-addr-row-icon {
  width:38px;height:38px;border-radius:10px;
  background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.22);
  display:flex;align-items:center;justify-content:center;
  font-size:1.1rem;flex-shrink:0;margin-top:2px;
}
.abt-addr-row-text {}
.abt-addr-label {
  font-family:'Outfit',sans-serif;font-size:.6rem;letter-spacing:.2em;
  text-transform:uppercase;color:rgba(212,175,55,.55);margin-bottom:3px;
}
.abt-addr-val {
  font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:400;
  color:rgba(255,255,255,.82);line-height:1.5;
}
.abt-addr-val-ar {
  font-family:'Amiri',serif;font-size:.9rem;direction:rtl;
  color:rgba(212,175,55,.6);line-height:1.7;margin-top:2px;
}

/* Map placeholder */
.abt-map {
  border-radius:18px;overflow:hidden;
  border:1px solid rgba(212,175,55,.18);
  aspect-ratio:16/10;
  background:linear-gradient(135deg,rgba(6,14,34,.9),rgba(13,28,65,.9));
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:14px;position:relative;
}
.abt-map::before{
  content:'';position:absolute;inset:0;
  background:url('https://images.unsplash.com/photo-1586022045478-7ccbba4fd7d5?w=700&q=70') center/cover;
  opacity:.22;
}
.abt-map-pin {
  position:relative;z-index:1;
  font-size:2.5rem;animation:abt-float 3s ease-in-out infinite;
  filter:drop-shadow(0 4px 12px rgba(212,175,55,.6));
}
.abt-map-label {
  position:relative;z-index:1;
  font-family:'Outfit',sans-serif;font-size:.75rem;letter-spacing:.18em;
  text-transform:uppercase;color:rgba(212,175,55,.8);text-align:center;
  padding:8px 20px;background:rgba(6,14,34,.7);border:1px solid rgba(212,175,55,.25);
  border-radius:20px;backdrop-filter:blur(8px);
}
.abt-map-label-ar {
  position:relative;z-index:1;
  font-family:'Amiri',serif;font-size:.85rem;direction:rtl;
  color:rgba(212,175,55,.6);
}

/* ════════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════════ */
.abt-cta-banner {
  text-align:center;padding:80px 28px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,rgba(6,10,24,.98),rgba(10,21,64,.98));
}
.abt-cta-banner::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(212,175,55,.06) 0%,transparent 70%);
}
.abt-cta-h {
  font-family:'Cinzel',serif;font-weight:700;
  font-size:clamp(1.6rem,3.5vw,2.8rem);color:#fff;
  margin-bottom:10px;position:relative;z-index:1;
}
.abt-cta-h .gold{
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));
  background-size:220%;-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;
  animation:abt-shimmer 4s linear infinite;
}
.abt-cta-ar {
  font-family:'Amiri',serif;font-size:clamp(1.2rem,2.5vw,1.8rem);
  direction:rtl;color:rgba(245,215,110,.75);margin-bottom:30px;
  position:relative;z-index:1;
}
.abt-cta-btns {
  display:flex;flex-wrap:wrap;gap:14px;justify-content:center;
  position:relative;z-index:1;
}
.abt-btn-gold {
  font-family:'Outfit',sans-serif;font-weight:600;font-size:.74rem;
  letter-spacing:.18em;text-transform:uppercase;color:var(--navy);
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:300%;border:none;border-radius:3px;
  padding:14px 36px;cursor:pointer;position:relative;overflow:hidden;
  animation:abt-pulse 3s ease-out infinite,abt-shimmer 5s linear infinite;
  transition:transform .25s,box-shadow .3s;
}
.abt-btn-gold::before{
  content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;
  background:linear-gradient(110deg,transparent,rgba(255,255,255,.42),transparent);
  transition:left .55s;pointer-events:none;
}
.abt-btn-gold:hover::before{left:160%;}
.abt-btn-gold:hover{
  transform:translateY(-3px) scale(1.03);animation:none;background-position:right;
  box-shadow:0 14px 40px rgba(212,175,55,.55),0 4px 14px rgba(0,0,0,.4);
}
.abt-btn-outline {
  font-family:'Amiri',serif;font-size:1.05rem;direction:rtl;
  color:var(--g2);background:transparent;
  border:1.5px solid rgba(212,175,55,.42);border-radius:3px;
  padding:13px 32px;cursor:pointer;
  transition:all .3s;
}
.abt-btn-outline:hover{
  background:rgba(212,175,55,.09);border-color:var(--g2);
  color:var(--g3);transform:translateY(-3px);
  box-shadow:0 10px 28px rgba(212,175,55,.25);
}

/* ── Responsive utility ── */
@media(max-width:640px){
  .abt-section{padding:64px 18px;}
}
`;

/* ── Sub-components ──────────────────────────────────────────────────────── */
function SectionHead({ eyeEn, eyeAr, titleEn, highlight, titleAr, subEn, subAr }) {
  const [ref, vis] = useReveal();
  return (
    <div className={`abt-sec-head reveal${vis ? " visible" : ""}`} ref={ref}>
      <div className="abt-eyebrow">
        <span className="abt-eyebrow-dot" />
        {eyeEn} · {eyeAr}
      </div>
      <h2 className="abt-sec-title">
        {titleEn} <span className="gold">{highlight}</span>
      </h2>
      <div className="abt-divider" />
      <div className="abt-sec-title-ar">{titleAr}</div>
      {subEn  && <p className="abt-sec-sub">{subEn}</p>}
      {subAr  && <p className="abt-sec-sub-ar">{subAr}</p>}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  const cssInj = useRef(false);

  useEffect(() => {
    if (cssInj.current) return;
    const t = document.createElement("style");
    t.textContent = CSS;
    document.head.appendChild(t);
    cssInj.current = true;
  }, []);

  /* Individual reveal refs */
  const [whoRef, whoVis]   = useReveal();
  const [tlRef,  tlVis]    = useReveal();
  const [valRef, valVis]   = useReveal();
  const [addrRef,addrVis]  = useReveal();
  const [ctaRef, ctaVis]   = useReveal();

  const goConsult = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="about" className="abt-page">

      {/* ══ HERO BAND ═══════════════════════════════════════════════════════ */}
      <div className="abt-hero">
        <div className="abt-hero-scan" />
        <div className="abt-hero-grid" />
        <div className="abt-hero-content">
          <div className="abt-hero-tag">
            <span style={{width:6,height:6,borderRadius:"50%",background:"#D4AF37",display:"inline-block",animation:"abt-dotPulse 2s infinite"}}/>
            About BlueWave Consultation · عن بلو ويف للاستشارات
          </div>
          <h1 className="abt-hero-h1">
            Seven Years of <span className="gold">Excellence</span>
          </h1>
          <div className="abt-hero-ar">سبع سنوات من التميز في خدمات الهجرة</div>
          <div className="abt-hero-divider" />
          <p className="abt-hero-sub">
            Since 2018, BlueWave Consultation has been the trusted bridge between
            ambitious individuals and their new life in the UAE — built on integrity,
            expertise, and a relentless commitment to your success.
          </p>
          <p className="abt-hero-sub-ar">
            منذ عام ٢٠١٨، كانت بلو ويف للاستشارات الجسر الموثوق بين الأفراد الطموحين وحياتهم الجديدة في الإمارات
          </p>
        </div>
      </div>

      {/* ══ STAT STRIP ══════════════════════════════════════════════════════ */}
      <div className="abt-stat-strip">
        <div className="abt-stat-strip-inner">
          {[
            { n:"7+",    en:"Years of Expertise",   ar:"سنوات من الخبرة"       },
            { n:"12K+",  en:"Visas Granted",         ar:"تأشيرة ممنوحة"         },
            { n:"98%",   en:"Success Rate",          ar:"معدل النجاح"           },
            { n:"50+",   en:"Countries Served",      ar:"دولة نخدمها"           },
            { n:"100+",  en:"Expert Consultants",    ar:"مستشار متخصص"          },
          ].map((s,i) => (
            <div className="abt-stat-item" key={i}>
              <div className="abt-stat-n">{s.n}</div>
              <div className="abt-stat-en">{s.en}</div>
              <div className="abt-stat-ar">{s.ar}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ WHO WE ARE ══════════════════════════════════════════════════════ */}
      <div className="abt-section">
        <SectionHead
          eyeEn="Who We Are" eyeAr="من نحن"
          titleEn="Built on" highlight="Trust & Expertise"
          titleAr="مبنيون على الثقة والخبرة"
          subEn="BlueWave Consultation is a team of seasoned immigration experts based in Ajman, UAE — with consultants averaging over a decade of hands-on experience across every visa category."
          subAr="بلو ويف للاستشارات فريق من خبراء الهجرة المتمرسين في عجمان، الإمارات — يتمتع مستشارونا بخبرة تزيد على عقد في جميع فئات التأشيرات."
        />

        <div className={`abt-who reveal${whoVis ? " visible" : ""}`} ref={whoRef}>
          {/* Visual side */}
          <div className="abt-who-visual">
            <div className="abt-who-img-frame">
              <div className="abt-who-img-badge">
                <div className="abt-who-img-badge-n">2018</div>
                <div className="abt-who-img-badge-l">Founded in UAE · تأسست في الإمارات</div>
              </div>
            </div>
            <div className="abt-gold-corner">🏆</div>
          </div>

          {/* Text side */}
          <div className="abt-who-text">
            <div className="abt-who-label">Our Story · قصتنا</div>
            <h3 className="abt-who-h">
              Premium <span className="gold">Immigration</span> Experts
            </h3>
            <div className="abt-who-h-ar">خبراء هجرة من الدرجة الأولى</div>

            <p className="abt-who-body">
              Founded in 2018 on Sheikh Khalifa Street, Ajman, BlueWave Consultation
              began with a single mission: to make the UAE immigration process seamless,
              transparent and stress-free for every client — no matter how complex the case.
            </p>
            <p className="abt-who-body-ar">
              تأسست عام ٢٠١٨ في شارع الشيخ خليفة، عجمان، مع مهمة واحدة: جعل عملية الهجرة إلى الإمارات سلسة وشفافة وخالية من التوتر لكل عميل.
            </p>

            <p className="abt-who-body">
              Today, with offices on the 26th floor of the prestigious Amber Gem Tower,
              our team of 100+ specialist consultants has served clients from over 50
              countries — maintaining an industry-leading 98% visa approval rate.
            </p>
            <p className="abt-who-body-ar">
              اليوم، من مكاتبنا في الطابق السادس والعشرين بمبرج أمبر الجم، خدمنا عملاء من أكثر من ٥٠ دولة بمعدل نجاح ٩٨٪.
            </p>

            <div className="abt-feature-list">
              {[
                { icon:"✅", en:"All visa categories handled",         ar:"معالجة جميع فئات التأشيرات" },
                { icon:"⚡", en:"Fast-track processing available",     ar:"معالجة سريعة متاحة"          },
                { icon:"🌍", en:"Multilingual team — Arabic & English",ar:"فريق متعدد اللغات"           },
                { icon:"🔒", en:"100% confidential consultations",      ar:"استشارات سرية ١٠٠٪"         },
              ].map((f,i) => (
                <div className="abt-feature" key={i}>
                  <div className="abt-feature-icon">{f.icon}</div>
                  <div>
                    <div className="abt-feature-en">{f.en}</div>
                    <div className="abt-feature-ar">{f.ar}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ WHAT WE DO ══════════════════════════════════════════════════════ */}
      <div className="abt-services-bg">
        <div className="abt-section">
          <SectionHead
            eyeEn="What We Do" eyeAr="ما نقدمه"
            titleEn="Our" highlight="Services"
            titleAr="خدماتنا الشاملة"
            subEn="From student visas to Golden Visa investment routes — we handle every immigration pathway with precision and care."
            subAr="من تأشيرات الطلاب إلى مسارات التأشيرة الذهبية — نتولى كل مسار هجرة بدقة واهتمام."
          />
          <div className="abt-srv-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="abt-srv-card"
                style={{
                  "--cc": s.color,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="abt-srv-icon" style={{ color: s.color }}>{s.icon}</div>
                <div className="abt-srv-en">{s.en}</div>
                <div className="abt-srv-ar">{s.ar}</div>
                <div className="abt-srv-desc">{s.desc}</div>
                <div className="abt-srv-desc-ar">{s.descAr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TIMELINE ════════════════════════════════════════════════════════ */}
      <div className="abt-section">
        <SectionHead
          eyeEn="Our Journey" eyeAr="رحلتنا"
          titleEn="7 Years of" highlight="Milestones"
          titleAr="٧ سنوات من الإنجازات"
          subEn="From a vision in Ajman to becoming one of the UAE's most trusted immigration consultancies."
          subAr="من رؤية في عجمان إلى أحد أكثر مكاتب استشارات الهجرة موثوقية في الإمارات."
        />
        <div className={`abt-timeline reveal${tlVis ? " visible" : ""}`} ref={tlRef}>
          {MILESTONES.map((m, i) => (
            <div className="abt-tl-item" key={i}>
              <div className={`abt-tl-left${i % 2 === 0 ? "" : " abt-tl-right"}`}
                   style={{ textAlign: i % 2 === 0 ? "right" : "left", paddingRight: i%2===0?28:0, paddingLeft: i%2!==0?28:0 }}>
                {i % 2 === 0 ? (
                  <>
                    <div className="abt-tl-year">{m.year}</div>
                    <div className="abt-tl-en">{m.en}</div>
                    <div className="abt-tl-ar" style={{textAlign:"right"}}>{m.ar}</div>
                  </>
                ) : null}
              </div>
              <div className="abt-tl-dot" />
              <div className={`abt-tl-right${i % 2 !== 0 ? "" : ""}`}
                   style={{ textAlign: i % 2 !== 0 ? "left" : "left", paddingLeft: i%2!==0?28:0, paddingRight:0 }}>
                {i % 2 !== 0 ? (
                  <>
                    <div className="abt-tl-year">{m.year}</div>
                    <div className="abt-tl-en">{m.en}</div>
                    <div className="abt-tl-ar">{m.ar}</div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ VALUES ══════════════════════════════════════════════════════════ */}
      <div className="abt-services-bg">
        <div className="abt-section">
          <SectionHead
            eyeEn="Our Values" eyeAr="قيمنا"
            titleEn="What We" highlight="Stand For"
            titleAr="ما نؤمن به"
          />
          <div className={`abt-values-grid reveal${valVis ? " visible" : ""}`} ref={valRef}>
            {VALUES.map((v, i) => (
              <div className="abt-val-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <span className="abt-val-icon">{v.icon}</span>
                <div className="abt-val-en">{v.en}</div>
                <div className="abt-val-ar">{v.ar}</div>
                <div className="abt-val-desc">{v.desc}</div>
                <div className="abt-val-desc-ar">{v.descAr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ADDRESS ═════════════════════════════════════════════════════════ */}
      <div className="abt-address-section">
        <div className="abt-section">
          <SectionHead
            eyeEn="Find Us" eyeAr="موقعنا"
            titleEn="Our" highlight="Office"
            titleAr="مكتبنا في عجمان"
            subEn="Located in the heart of Ajman's business district — visit us for a face-to-face consultation."
            subAr="نقع في قلب منطقة عجمان التجارية — زورونا للحصول على استشارة شخصية."
          />
          <div className={`abt-addr-grid reveal${addrVis ? " visible" : ""}`} ref={addrRef}>

            {/* Address card */}
            <div className="abt-addr-card">
              <div className="abt-addr-title">BlueWave Consultation</div>
              <div className="abt-addr-title-ar">بلو ويف للاستشارات الإدارية</div>

              {[
                { icon:"🏢", label:"Office No. · رقم المكتب",    en:"CWS-1V-224954",                          ar:"CWS-1V-224954" },
                { icon:"📐", label:"Floor · الطابق",              en:"26th Floor",                              ar:"الطابق السادس والعشرون" },
                { icon:"🏗️", label:"Building · المنطقة التجارية",en:"Amber Gem Tower",                         ar:"برج امبرجم" },
                { icon:"📍", label:"Address · العنوان",           en:"Sheikh Khalifa Street, Ajman, UAE",       ar:"شارع الشيخ خليفة، عجمان، الإمارات العربية المتحدة" },
              ].map((row, i) => (
                <div className="abt-addr-row" key={i}>
                  <div className="abt-addr-row-icon">{row.icon}</div>
                  <div className="abt-addr-row-text">
                    <div className="abt-addr-label">{row.label}</div>
                    <div className="abt-addr-val">{row.en}</div>
                    <div className="abt-addr-val-ar">{row.ar}</div>
                  </div>
                </div>
              ))}

              {/* Contact details */}
              <div style={{borderTop:"1px solid rgba(212,175,55,.12)",paddingTop:18,marginTop:6}}>
                <div className="abt-addr-row">
                  <div className="abt-addr-row-icon">📞</div>
                  <div>
                    <div className="abt-addr-label">Phone · الهاتف</div>
                    <div className="abt-addr-val">+971 XX XXX XXXX</div>
                  </div>
                </div>
                <div className="abt-addr-row">
                  <div className="abt-addr-row-icon">📧</div>
                  <div>
                    <div className="abt-addr-label">Email · البريد الإلكتروني</div>
                    <div className="abt-addr-val">info@bluewaveconsultation.ae</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map visual */}
            <div className="abt-map">
              <div className="abt-map-pin">📍</div>
              <div className="abt-map-label">Amber Gem Tower, 26th Floor · Ajman, UAE</div>
              <div className="abt-map-label-ar">برج امبرجم، الطابق ٢٦ · عجمان، الإمارات</div>
              <div style={{
                position:"absolute",bottom:18,right:18,zIndex:2,
                background:"rgba(212,175,55,.12)",border:"1px solid rgba(212,175,55,.3)",
                borderRadius:8,padding:"8px 14px",
                fontFamily:"'Outfit',sans-serif",fontSize:".65rem",letterSpacing:".14em",
                textTransform:"uppercase",color:"rgba(212,175,55,.8)",
                backdropFilter:"blur(8px)",cursor:"pointer",
              }}>
                Open in Maps ↗
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CTA BANNER ══════════════════════════════════════════════════════ */}
      <div className={`abt-cta-banner reveal${ctaVis ? " visible" : ""}`} ref={ctaRef}>
        <div className="abt-divider" style={{marginBottom:28}}/>
        <h2 className="abt-cta-h">
          Ready to Start Your <span className="gold">Dubai Journey?</span>
        </h2>
        <div className="abt-cta-ar">هل أنت مستعد لبدء رحلتك إلى دبي؟</div>
        <div className="abt-cta-btns">
          <button className="abt-btn-gold" onClick={goConsult}>
            Get Free Consultation
          </button>
          <button className="abt-btn-outline" onClick={goConsult}>
            احصل على استشارة مجانية
          </button>
        </div>
        <div className="abt-divider" style={{marginTop:28}}/>
      </div>

    </div>
  );
}