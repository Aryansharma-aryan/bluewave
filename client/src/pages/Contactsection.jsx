import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — Ultra-Premium Contact Section
   • Live Google Maps embed (Amber Gem Tower, Ajman, UAE)
   • Animated contact form with gold focus states & validation
   • Full office address: CWS-1V-224954 · 26th Floor · Amber Gem Tower
     Sheikh Khalifa Street, Ajman, United Arab Emirates
   • WhatsApp / Phone / Email / Office Hours — bilingual EN + Arabic
   • Floating particles, scan line, grid texture — matches full design system
   • IntersectionObserver scroll reveals
   • Cinzel × Amiri × Outfit typography
══════════════════════════════════════════════════════════════════════════════ */

/* ── Scroll reveal hook ─────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ── Contact info ───────────────────────────────────────────────────────── */
const CONTACT_DETAILS = [
  {
    icon: "📍",
    labelEn: "Office Address",
    labelAr: "عنوان المكتب",
    lineEn: ["Office No. CWS-1V-224954", "26th Floor, Amber Gem Tower", "Sheikh Khalifa Street", "Ajman, United Arab Emirates"],
    lineAr: ["مكتب رقم CWS-1V-224954", "الطابق السادس والعشرون، برج امبرجم", "شارع الشيخ خليفة", "عجمان، الإمارات العربية المتحدة"],
    color: "#D4AF37",
    action: null,
  },
  {
    icon: "📞",
    labelEn: "Phone",
    labelAr: "الهاتف",
    lineEn: ["+971 XX XXX XXXX", "Sat–Thu: 9 AM – 6 PM GST"],
    lineAr: ["+٩٧١ XX XXX XXXX", "السبت–الخميس: ٩ ص – ٦ م (ت.خ.غ)"],
    color: "#4FC3F7",
    action: "tel:+971XXXXXXXXX",
  },
  {
    icon: "💬",
    labelEn: "WhatsApp",
    labelAr: "واتساب",
    lineEn: ["+971 XX XXX XXXX", "Quick response guaranteed"],
    lineAr: ["+٩٧١ XX XXX XXXX", "استجابة سريعة مضمونة"],
    color: "#81C784",
    action: "https://wa.me/971XXXXXXXXX",
  },
  {
    icon: "📧",
    labelEn: "Email",
    labelAr: "البريد الإلكتروني",
    lineEn: ["info@bluewaveconsultation.ae", "We reply within 24 hours"],
    lineAr: ["info@bluewaveconsultation.ae", "نرد خلال ٢٤ ساعة"],
    color: "#CE93D8",
    action: "mailto:info@bluewaveconsultation.ae",
  },
];

const SERVICES_OPTIONS = [
  "Study Visa · تأشيرة الدراسة",
  "B1/B2 Visa · تأشيرة B1/B2",
  "Work Visa · تأشيرة العمل",
  "Residency Visa · تأشيرة الإقامة",
  "Investment / Golden Visa · التأشيرة الذهبية",
  "Family Visa · تأشيرة العائلة",
  "Other · أخرى",
];

/* ── Working hours ──────────────────────────────────────────────────────── */
const HOURS = [
  { day: "Saturday – Thursday", dayAr: "السبت – الخميس", time: "9:00 AM – 6:00 PM", timeAr: "٩:٠٠ ص – ٦:٠٠ م", open: true },
  { day: "Friday", dayAr: "الجمعة", time: "Closed", timeAr: "مغلق", open: false },
];

/* ── Particles ──────────────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  s: 1.2 + Math.random() * 2.4, dur: 5 + Math.random() * 8,
  del: Math.random() * 6, gold: i % 3 !== 0,
}));

/* ── All CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

:root{
  --g1:#B8941F;--g2:#D4AF37;--g3:#F5D76E;
  --navy:#06101E;--navy2:#0A1F44;--navy3:#0D2255;
  --teal:#00AEEF;--teal2:#38C8FF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── Keyframes ── */
@keyframes ct-shimmer  {0%{background-position:-700px 0}100%{background-position:700px 0}}
@keyframes ct-fadeUp   {from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes ct-fadeIn   {from{opacity:0}to{opacity:1}}
@keyframes ct-pulse    {0%{box-shadow:0 0 0 0 rgba(212,175,55,.65)}70%{box-shadow:0 0 0 16px rgba(212,175,55,0)}100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}
@keyframes ct-scan     {0%{left:-40%}100%{left:130%}}
@keyframes ct-float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ct-dotBlink {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}
@keyframes ct-mapPulse {0%{transform:translate(-50%,-100%) scale(1)}50%{transform:translate(-50%,-100%) scale(1.18)}100%{transform:translate(-50%,-100%) scale(1)}}
@keyframes ct-ringExp  {0%{transform:translate(-50%,-50%) scale(1);opacity:.6}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes ct-inputGlow{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}50%{box-shadow:0 0 0 4px rgba(212,175,55,.18)}}
@keyframes ct-successPop{from{opacity:0;transform:scale(.85) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes ct-spinLoader{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

.ct-reveal{opacity:0;transform:translateY(28px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);}
.ct-reveal.on{opacity:1;transform:none;}

/* ── PAGE ── */
.ct-page{
  background:var(--navy);
  position:relative;overflow:hidden;
  padding-bottom:0;
}
.ct-grid{
  position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(212,175,55,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.028) 1px,transparent 1px);
  background-size:65px 65px;
}
.ct-scan-line{
  position:absolute;top:0;height:100%;width:40%;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(212,175,55,.04),transparent);
  animation:ct-scan 11s linear infinite;z-index:1;
}
.ct-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(70px);}

/* ── SECTION HEADER ── */
.ct-header{
  text-align:center;padding:88px 28px 60px;
  position:relative;z-index:2;max-width:900px;margin:0 auto;
}
.ct-eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(212,175,55,.09);border:1px solid rgba(212,175,55,.28);
  border-radius:100px;padding:7px 22px;
  font-family:'Outfit',sans-serif;font-size:.65rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--g2);margin-bottom:22px;
}
.ct-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--g2);animation:ct-dotBlink 2s ease-in-out infinite;display:inline-block;}
.ct-h1{
  font-family:'Cinzel',serif;font-weight:700;
  font-size:clamp(2.2rem,5.5vw,4.2rem);
  color:#fff;letter-spacing:.02em;line-height:1.1;
}
.ct-h1 .gold{
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:280%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:ct-shimmer 5s linear infinite;
}
.ct-divider{
  width:130px;height:1.5px;margin:16px auto;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px;animation:ct-shimmer 3s linear infinite;
}
.ct-h2{
  font-family:'Amiri',serif;font-weight:700;
  font-size:clamp(1.5rem,3.5vw,2.5rem);
  direction:rtl;color:rgba(245,215,110,.82);margin-top:8px;line-height:1.6;
}
.ct-sub{
  font-family:'Outfit',sans-serif;font-weight:300;
  font-size:clamp(.9rem,1.6vw,1.08rem);color:rgba(255,255,255,.6);
  max-width:560px;margin:14px auto 0;line-height:1.9;
}
.ct-sub-ar{
  font-family:'Amiri',serif;font-size:clamp(.88rem,1.5vw,1.02rem);
  direction:rtl;color:rgba(212,175,55,.52);max-width:540px;margin:6px auto 0;line-height:2.1;
}

/* ── MAIN GRID ── */
.ct-main{
  position:relative;z-index:2;
  max-width:1200px;margin:0 auto;
  padding:0 24px 80px;
  display:grid;
  grid-template-columns:1fr 1.05fr;
  gap:28px;
  align-items:start;
}
@media(max-width:960px){.ct-main{grid-template-columns:1fr;}}

/* ── LEFT COLUMN ── */
.ct-left{display:flex;flex-direction:column;gap:20px;}

/* ── CONTACT INFO CARDS ── */
.ct-info-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:22px 22px;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  position:relative;overflow:hidden;
  transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s,border-color .3s,background .3s;
  cursor:default;
}
.ct-info-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--cc,#D4AF37),transparent);
  opacity:.7;
}
.ct-info-card.clickable{cursor:pointer;}
.ct-info-card.clickable:hover{
  transform:translateY(-5px) scale(1.02);
  border-color:var(--cc,rgba(212,175,55,.5));
  background:rgba(255,255,255,.07);
  box-shadow:0 18px 45px rgba(0,0,0,.45),0 0 28px rgba(212,175,55,.1);
}
.ct-info-row{display:flex;align-items:flex-start;gap:16px;}
.ct-info-icon{
  width:48px;height:48px;border-radius:12px;flex-shrink:0;
  background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;font-size:1.3rem;
  transition:background .3s,box-shadow .3s,border-color .3s;
  animation:ct-float 5s ease-in-out infinite;
}
.ct-info-card.clickable:hover .ct-info-icon{
  background:rgba(255,255,255,.1);
  border-color:var(--cc,rgba(212,175,55,.4));
  box-shadow:0 0 20px var(--cc,rgba(212,175,55,.35));
}
.ct-info-label{
  font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
  letter-spacing:.24em;text-transform:uppercase;
  color:var(--cc,#D4AF37);margin-bottom:6px;
}
.ct-info-label-ar{font-family:'Amiri',serif;font-size:.65rem;direction:rtl;color:rgba(212,175,55,.5);margin-bottom:8px;}
.ct-info-line{font-family:'Outfit',sans-serif;font-size:.86rem;font-weight:400;color:rgba(255,255,255,.82);line-height:1.6;}
.ct-info-line-ar{font-family:'Amiri',serif;font-size:.86rem;direction:rtl;color:rgba(212,175,55,.55);line-height:1.8;margin-top:2px;}

/* Arrow indicator for clickable */
.ct-info-arrow{
  margin-left:auto;width:28px;height:28px;border-radius:50%;
  background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.22);
  display:flex;align-items:center;justify-content:center;
  font-size:.75rem;color:var(--cc,#D4AF37);flex-shrink:0;
  transition:transform .3s,background .3s;
}
.ct-info-card.clickable:hover .ct-info-arrow{transform:translateX(3px);background:rgba(212,175,55,.2);}

/* ── HOURS CARD ── */
.ct-hours-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:22px 22px;
  backdrop-filter:blur(14px);position:relative;overflow:hidden;
}
.ct-hours-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,#FFB74D,transparent);opacity:.7;
}
.ct-hours-label{
  font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
  letter-spacing:.24em;text-transform:uppercase;color:#FFB74D;margin-bottom:14px;
  display:flex;align-items:center;gap:8px;
}
.ct-hours-label::before{content:'🕐';font-size:1rem;}
.ct-hours-label-ar{font-family:'Amiri',serif;font-size:.7rem;direction:rtl;color:rgba(212,175,55,.5);margin-bottom:14px;}
.ct-hours-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05);
}
.ct-hours-row:last-child{border-bottom:none;padding-bottom:0;}
.ct-hours-day{font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:400;color:rgba(255,255,255,.7);}
.ct-hours-day-ar{font-family:'Amiri',serif;font-size:.78rem;direction:rtl;color:rgba(212,175,55,.45);margin-top:1px;}
.ct-hours-time{
  font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:500;
  text-align:right;
}
.ct-hours-time.open{color:#81C784;}
.ct-hours-time.closed{color:rgba(255,100,100,.7);}
.ct-hours-time-ar{font-family:'Amiri',serif;font-size:.75rem;direction:rtl;color:rgba(212,175,55,.4);margin-top:1px;text-align:right;}

/* Office tag */
.ct-office-tag{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.2);
  border-radius:8px;padding:7px 14px;
  font-family:'Outfit',sans-serif;font-size:.68rem;letter-spacing:.12em;
  text-transform:uppercase;color:rgba(212,175,55,.75);margin-top:14px;
}

/* ── RIGHT COLUMN ── */
.ct-right{display:flex;flex-direction:column;gap:20px;}

/* ── MAP CONTAINER ── */
.ct-map-wrap{
  position:relative;border-radius:20px;overflow:hidden;
  border:1px solid rgba(212,175,55,.22);
  box-shadow:0 20px 55px rgba(0,0,0,.5),0 0 0 1px rgba(212,175,55,.1);
  height:300px;
}
/* Gold shimmer top bar on map */
.ct-map-wrap::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;z-index:3;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px;animation:ct-shimmer 3s linear infinite;
}
.ct-map-iframe{
  width:100%;height:100%;border:none;display:block;
  filter:saturate(0.6) brightness(0.8) contrast(1.1);
  transition:filter .4s ease;
}
.ct-map-wrap:hover .ct-map-iframe{
  filter:saturate(0.85) brightness(0.9) contrast(1.05);
}
/* Map overlay label */
.ct-map-badge{
  position:absolute;bottom:16px;left:50%;transform:translateX(-50%);
  z-index:3;
  background:rgba(6,16,30,.92);
  border:1px solid rgba(212,175,55,.35);
  border-radius:12px;padding:10px 20px;
  backdrop-filter:blur(14px);
  white-space:nowrap;text-align:center;
}
.ct-map-badge-title{font-family:'Cinzel',serif;font-size:.82rem;font-weight:600;color:var(--g2);}
.ct-map-badge-sub{font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.1em;color:rgba(255,255,255,.5);margin-top:2px;}
.ct-map-badge-ar{font-family:'Amiri',serif;font-size:.72rem;direction:rtl;color:rgba(212,175,55,.55);margin-top:2px;}
.ct-map-open-btn{
  position:absolute;top:14px;right:14px;z-index:3;
  background:rgba(6,16,30,.85);border:1px solid rgba(212,175,55,.3);
  border-radius:8px;padding:7px 14px;
  font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(212,175,55,.8);cursor:pointer;backdrop-filter:blur(10px);
  text-decoration:none;display:inline-flex;align-items:center;gap:5px;
  transition:background .3s,border-color .3s;
}
.ct-map-open-btn:hover{background:rgba(212,175,55,.14);border-color:rgba(212,175,55,.6);}

/* ── CONTACT FORM ── */
.ct-form-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;padding:32px 28px;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  position:relative;overflow:hidden;
}
.ct-form-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px;animation:ct-shimmer 3s linear infinite;
}
.ct-form-title{
  font-family:'Cinzel',serif;font-weight:700;font-size:1.35rem;
  color:#fff;margin-bottom:4px;
}
.ct-form-title-ar{font-family:'Amiri',serif;font-size:1.1rem;direction:rtl;color:rgba(212,175,55,.7);margin-bottom:20px;}

.ct-form{display:flex;flex-direction:column;gap:16px;}

/* Field */
.ct-field{display:flex;flex-direction:column;gap:6px;}
.ct-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media(max-width:520px){.ct-field-row{grid-template-columns:1fr;}}

.ct-label{
  font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;
  color:rgba(212,175,55,.65);
}
.ct-label-ar{font-family:'Amiri',serif;font-size:.68rem;direction:rtl;color:rgba(212,175,55,.45);}

.ct-input,.ct-select,.ct-textarea{
  font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:300;
  color:rgba(255,255,255,.88);
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1);
  border-radius:10px;padding:13px 16px;
  outline:none;width:100%;
  transition:border-color .3s,background .3s,box-shadow .3s;
  appearance:none;-webkit-appearance:none;
}
.ct-input::placeholder,.ct-textarea::placeholder{color:rgba(255,255,255,.28);}
.ct-input:focus,.ct-select:focus,.ct-textarea:focus{
  border-color:rgba(212,175,55,.6);
  background:rgba(212,175,55,.05);
  box-shadow:0 0 0 3px rgba(212,175,55,.12),0 4px 16px rgba(0,0,0,.2);
}
.ct-input.error,.ct-select.error,.ct-textarea.error{border-color:rgba(255,100,100,.5);}
.ct-select option{background:#0D2255;color:#fff;}
.ct-textarea{resize:vertical;min-height:110px;line-height:1.65;}

/* Phone prefix row */
.ct-phone-row{display:flex;gap:10px;}
.ct-phone-prefix{
  font-family:'Outfit',sans-serif;font-size:.88rem;
  color:rgba(212,175,55,.8);background:rgba(212,175,55,.08);
  border:1px solid rgba(212,175,55,.22);border-radius:10px;
  padding:13px 14px;white-space:nowrap;flex-shrink:0;
  display:flex;align-items:center;gap:6px;
}

/* Submit button */
.ct-submit{
  font-family:'Outfit',sans-serif;font-weight:600;font-size:.75rem;
  letter-spacing:.18em;text-transform:uppercase;color:var(--navy);
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:280%;border:none;border-radius:10px;
  padding:15px 32px;cursor:pointer;width:100%;
  position:relative;overflow:hidden;
  animation:ct-pulse 3s ease-out infinite,ct-shimmer 5s linear infinite;
  transition:transform .25s,box-shadow .3s;margin-top:4px;
}
.ct-submit::before{
  content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;
  background:linear-gradient(110deg,transparent,rgba(255,255,255,.4),transparent);
  transition:left .55s;pointer-events:none;
}
.ct-submit:hover::before{left:160%;}
.ct-submit:hover{
  transform:translateY(-2px);animation:none;background-position:right;
  box-shadow:0 12px 36px rgba(212,175,55,.5);
}
.ct-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;animation:none;}
.ct-submit-ar{font-family:'Amiri',serif;font-size:.95rem;direction:rtl;display:block;opacity:.75;margin-top:3px;}

/* Loader */
.ct-loader{
  display:inline-block;width:16px;height:16px;border-radius:50%;
  border:2px solid rgba(6,16,30,.4);border-top-color:var(--navy);
  animation:ct-spinLoader .7s linear infinite;
  vertical-align:middle;margin-right:8px;
}

/* Success state */
.ct-success{
  text-align:center;padding:40px 20px;
  animation:ct-successPop .55s cubic-bezier(.22,1,.36,1) both;
}
.ct-success-icon{font-size:3rem;display:block;margin-bottom:14px;animation:ct-float 3s ease-in-out infinite;}
.ct-success-h{font-family:'Cinzel',serif;font-weight:700;font-size:1.4rem;color:var(--g2);margin-bottom:6px;}
.ct-success-ar{font-family:'Amiri',serif;font-size:1.1rem;direction:rtl;color:rgba(212,175,55,.7);margin-bottom:12px;}
.ct-success-sub{font-family:'Outfit',sans-serif;font-size:.88rem;color:rgba(255,255,255,.6);line-height:1.75;}

/* Error message */
.ct-err-msg{font-family:'Outfit',sans-serif;font-size:.7rem;color:rgba(255,120,120,.8);margin-top:3px;}

/* ── SOCIAL / QUICK CONTACT ROW ── */
.ct-social-strip{
  position:relative;z-index:2;
  max-width:1200px;margin:0 auto 0;padding:0 24px 24px;
  display:flex;flex-wrap:wrap;gap:12px;justify-content:center;
}
.ct-social-chip{
  display:flex;align-items:center;gap:10px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  border-radius:12px;padding:12px 22px;
  text-decoration:none;cursor:pointer;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .3s,border-color .3s,box-shadow .3s;
}
.ct-social-chip:hover{
  transform:translateY(-5px) scale(1.04);
  background:rgba(255,255,255,.08);
  border-color:var(--scc,rgba(212,175,55,.5));
  box-shadow:0 12px 30px rgba(0,0,0,.4),0 0 20px var(--scc,rgba(212,175,55,.12));
}
.ct-social-icon{font-size:1.4rem;line-height:1;}
.ct-social-en{font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:500;letter-spacing:.08em;color:rgba(255,255,255,.82);}
.ct-social-ar{font-family:'Amiri',serif;font-size:.75rem;direction:rtl;color:rgba(212,175,55,.55);}

/* ── BOTTOM GOLD DIVIDER ── */
.ct-bottom-bar{
  height:3px;
  background:linear-gradient(90deg,transparent,var(--g1) 20%,var(--g2) 40%,var(--g3) 50%,var(--g2) 60%,var(--g1) 80%,transparent);
  background-size:700px 100%;
  animation:ct-shimmer 3.5s linear infinite;
}

@media(max-width:520px){
  .ct-header{padding:70px 18px 50px;}
  .ct-main{padding:0 14px 60px;}
  .ct-form-card{padding:24px 18px;}
  .ct-info-card{padding:18px;}
  .ct-hours-card{padding:18px;}
}
`;

/* ── Form Component ──────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required · مطلوب";
    if (!form.lastName.trim())  e.lastName  = "Required · مطلوب";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required · بريد صحيح مطلوب";
    if (!form.service) e.service = "Please select a service · اختر خدمة";
    if (!form.message.trim()) e.message = "Please enter your message · أدخل رسالتك";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    // Simulate API call — replace with your actual endpoint
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  if (sent) return (
    <div className="ct-success">
      <span className="ct-success-icon">✅</span>
      <div className="ct-success-h">Message Received!</div>
      <div className="ct-success-ar">تم استلام رسالتك!</div>
      <p className="ct-success-sub">
        Thank you for reaching out to BlueWave Consultation.<br/>
        Our expert team will contact you within 24 hours.<br/>
        <span style={{fontFamily:"'Amiri',serif",direction:"rtl",display:"block",marginTop:8,color:"rgba(212,175,55,.6)"}}>
          شكراً لتواصلك مع بلو ويف. سيتواصل معك فريقنا خلال ٢٤ ساعة.
        </span>
      </p>
    </div>
  );

  return (
    <form className="ct-form" onSubmit={handleSubmit} noValidate>
      {/* Name row */}
      <div className="ct-field-row">
        <div className="ct-field">
          <label className="ct-label">First Name · الاسم الأول</label>
          <input className={`ct-input${errors.firstName ? " error" : ""}`}
            name="firstName" placeholder="e.g. Ahmed" value={form.firstName} onChange={handleChange}/>
          {errors.firstName && <span className="ct-err-msg">{errors.firstName}</span>}
        </div>
        <div className="ct-field">
          <label className="ct-label">Last Name · اسم العائلة</label>
          <input className={`ct-input${errors.lastName ? " error" : ""}`}
            name="lastName" placeholder="e.g. Al-Mansouri" value={form.lastName} onChange={handleChange}/>
          {errors.lastName && <span className="ct-err-msg">{errors.lastName}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="ct-field">
        <label className="ct-label">Email Address · البريد الإلكتروني</label>
        <input className={`ct-input${errors.email ? " error" : ""}`}
          name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange}/>
        {errors.email && <span className="ct-err-msg">{errors.email}</span>}
      </div>

      {/* Phone */}
      <div className="ct-field">
        <label className="ct-label">Phone Number · رقم الهاتف</label>
        <div className="ct-phone-row">
          <div className="ct-phone-prefix">🇦🇪 +971</div>
          <input className="ct-input" name="phone" placeholder="XX XXX XXXX"
            value={form.phone} onChange={handleChange} style={{flex:1}}/>
        </div>
      </div>

      {/* Service */}
      <div className="ct-field">
        <label className="ct-label">Service Needed · الخدمة المطلوبة</label>
        <select className={`ct-select${errors.service ? " error" : ""}`}
          name="service" value={form.service} onChange={handleChange}>
          <option value="">Select a service / اختر خدمة</option>
          {SERVICES_OPTIONS.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        {errors.service && <span className="ct-err-msg">{errors.service}</span>}
      </div>

      {/* Message */}
      <div className="ct-field">
        <label className="ct-label">Your Message · رسالتك</label>
        <textarea className={`ct-textarea${errors.message ? " error" : ""}`}
          name="message"
          placeholder="Tell us about your immigration needs... / أخبرنا عن احتياجاتك في مجال الهجرة..."
          value={form.message} onChange={handleChange}/>
        {errors.message && <span className="ct-err-msg">{errors.message}</span>}
      </div>

      {/* Submit */}
      <button className="ct-submit" type="submit" disabled={sending}>
        {sending ? <><span className="ct-loader"/>Sending...</> : (
          <>Send Message · إرسال الرسالة</>
        )}
      </button>
    </form>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function ContactSection() {
  const cssInj = useRef(false);
  const [hRef, hVis] = useReveal();
  const [lRef, lVis] = useReveal(0.08);
  const [rRef, rVis] = useReveal(0.08);
  const [sRef, sVis] = useReveal(0.1);

  useEffect(() => {
    if (cssInj.current) return;
    const t = document.createElement("style");
    t.textContent = CSS;
    document.head.appendChild(t);
    cssInj.current = true;
  }, []);

  /* Google Maps embed — Amber Gem Tower, Ajman */
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.9!2d55.4373!3d25.4078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5679b79cbc61%3A0x76d61b4adb0dae78!2sAmber%20Gem%20Tower%2C%20Ajman!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae`;

  return (
    <section id="contact" className="ct-page">
      {/* Background decorations */}
      <div className="ct-grid" />
      <div className="ct-scan-line" />

      {/* Ambient orbs */}
      <div className="ct-orb" style={{top:"8%",left:"3%",width:440,height:440,background:"radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",animation:"ct-float 12s ease-in-out infinite"}}/>
      <div className="ct-orb" style={{bottom:"15%",right:"4%",width:520,height:420,background:"radial-gradient(circle,rgba(0,174,239,.055) 0%,transparent 70%)",animation:"ct-float 15s 4s ease-in-out infinite"}}/>
      <div className="ct-orb" style={{top:"50%",left:"50%",width:380,height:380,marginLeft:-190,marginTop:-190,background:"radial-gradient(circle,rgba(212,175,55,.04) 0%,transparent 70%)",animation:"ct-float 9s 2s ease-in-out infinite"}}/>

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position:"absolute",left:`${p.x}%`,top:`${p.y}%`,
          width:p.s,height:p.s,borderRadius:"50%",
          background:p.gold?"#D4AF37":"#38C8FF",
          opacity:p.s>2?0.32:0.18,zIndex:1,pointerEvents:"none",
          animation:`ct-float ${p.dur}s ${p.del}s ease-in-out infinite`,
        }}/>
      ))}

      {/* ── Header ── */}
      <div className={`ct-header ct-reveal${hVis?" on":""}`} ref={hRef}>
        <div className="ct-eyebrow">
          <span className="ct-eyebrow-dot"/>
          BlueWave Consultation · تواصل معنا
          <span className="ct-eyebrow-dot" style={{animationDelay:".8s"}}/>
        </div>
        <h2 className="ct-h1">
          Get In <span className="gold">Touch</span>
        </h2>
        <div className="ct-divider"/>
        <div className="ct-h2">تواصل معنا — نحن هنا لمساعدتك</div>
        <p className="ct-sub">
          Ready to start your Dubai journey? Our expert consultants are available
          6 days a week to guide you through every step of your immigration process.
        </p>
        <p className="ct-sub-ar">
          مستعد لبدء رحلتك نحو دبي؟ مستشارونا الخبراء متاحون ٦ أيام في الأسبوع لإرشادك في كل خطوة.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="ct-main">

        {/* ── LEFT: Info Cards ── */}
        <div className={`ct-left ct-reveal${lVis?" on":""}`} ref={lRef}>

          {/* Contact detail cards */}
          {CONTACT_DETAILS.map((d, i) => (
            <div
              key={i}
              className={`ct-info-card${d.action ? " clickable" : ""}`}
              style={{ "--cc": d.color, animationDelay: `${i*0.08}s` }}
              onClick={() => d.action && window.open(d.action, "_blank")}
            >
              <div className="ct-info-row">
                <div className="ct-info-icon" style={{ animationDelay: `${i*0.5}s` }}>{d.icon}</div>
                <div style={{flex:1}}>
                  <div className="ct-info-label">{d.labelEn}</div>
                  <div className="ct-info-label-ar">{d.labelAr}</div>
                  {d.lineEn.map((line, j) => (
                    <div key={j}>
                      <div className="ct-info-line">{line}</div>
                      <div className="ct-info-line-ar">{d.lineAr[j]}</div>
                    </div>
                  ))}
                </div>
                {d.action && <div className="ct-info-arrow">→</div>}
              </div>
              {/* Office badge for address card */}
              {i === 0 && (
                <div className="ct-office-tag">
                  🏢 Office No. CWS-1V-224954 · Amber Gem Tower
                </div>
              )}
            </div>
          ))}

          {/* Hours card */}
          <div className="ct-hours-card">
            <div className="ct-hours-label">Office Hours</div>
            <div className="ct-hours-label-ar">ساعات العمل</div>
            {HOURS.map((h, i) => (
              <div className="ct-hours-row" key={i}>
                <div>
                  <div className="ct-hours-day">{h.day}</div>
                  <div className="ct-hours-day-ar">{h.dayAr}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className={`ct-hours-time${h.open?" open":" closed"}`}>{h.time}</div>
                  <div className="ct-hours-time-ar">{h.timeAr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Map + Form ── */}
        <div className={`ct-right ct-reveal${rVis?" on":""}`} ref={rRef} style={{transitionDelay:".15s"}}>

          {/* Live Google Map */}
          <div className="ct-map-wrap">
            <iframe
              className="ct-map-iframe"
              src={mapSrc}
              title="BlueWave Consultation — Amber Gem Tower, Ajman, UAE"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay badge */}
            <div className="ct-map-badge">
              <div className="ct-map-badge-title">📍 Amber Gem Tower · برج امبرجم</div>
              <div className="ct-map-badge-sub">26th Floor · Sheikh Khalifa Street, Ajman, UAE</div>
              <div className="ct-map-badge-ar">الطابق ٢٦ · شارع الشيخ خليفة، عجمان، الإمارات</div>
            </div>
            {/* Open in Google Maps button */}
            <a
              className="ct-map-open-btn"
              href="https://maps.google.com/?q=Amber+Gem+Tower+Ajman+UAE"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Maps ↗
            </a>
          </div>

          {/* Contact Form */}
          <div className="ct-form-card">
            <div className="ct-form-title">Send Us a Message</div>
            <div className="ct-form-title-ar">أرسل لنا رسالة</div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Quick Contact Chips ── */}
      <div className={`ct-social-strip ct-reveal${sVis?" on":""}`} ref={sRef}>
        {[
          { icon:"💬", en:"WhatsApp Us",     ar:"واتساب",     action:"https://wa.me/971XXXXXXXXX",           color:"#81C784" },
          { icon:"📞", en:"Call Us",          ar:"اتصل بنا",   action:"tel:+971XXXXXXXXX",                    color:"#4FC3F7" },
          { icon:"📧", en:"Email Us",         ar:"راسلنا",     action:"mailto:info@bluewaveconsultation.ae",  color:"#CE93D8" },
          { icon:"📍", en:"Get Directions",   ar:"الاتجاهات",  action:"https://maps.google.com/?q=Amber+Gem+Tower+Ajman+UAE", color:"#D4AF37" },
        ].map((s,i)=>(
          <a key={i} className="ct-social-chip" href={s.action}
            target={s.action.startsWith("http")?"_blank":"_self"}
            rel="noopener noreferrer"
            style={{"--scc":s.color}}>
            <span className="ct-social-icon">{s.icon}</span>
            <div>
              <div className="ct-social-en">{s.en}</div>
              <div className="ct-social-ar">{s.ar}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Gold bottom bar */}
      <div className="ct-bottom-bar"/>
    </section>
  );
}