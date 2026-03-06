import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — "Why Choose Us" — Ultra-Premium Bilingual Page
   Dubai skyline + night city backgrounds · Cinzel × Amiri × Outfit
   Gold #D4AF37 + Navy #06101E + Teal #00AEEF design system
   Animated counters · scroll reveals · parallax · particles · trust badges
══════════════════════════════════════════════════════════════════════════════ */

/* ─── Scroll reveal hook ────────────────────────────────────────────────── */
function useReveal(threshold = 0.13) {
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

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCounter(end, dur = 1800, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const target = parseInt(String(end).replace(/\D/g, "")) || 0;
    const tick = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 4);
      setN(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(tick);
      else setN(target);
    };
    requestAnimationFrame(tick);
  }, [active, end, dur]);
  return n;
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const STATS = [
  { n:"12000", suf:"+",  en:"Visas Granted",      ar:"تأشيرة ممنوحة",       icon:"🛂", c:"#D4AF37" },
  { n:"98",    suf:"%",  en:"Approval Rate",       ar:"معدل الموافقة",        icon:"🏆", c:"#81C784" },
  { n:"7",     suf:"+",  en:"Years of Expertise",  ar:"سنوات من الخبرة",      icon:"📅", c:"#4FC3F7" },
  { n:"50",    suf:"+",  en:"Countries Served",    ar:"دولة نخدمها",          icon:"🌍", c:"#CE93D8" },
  { n:"100",   suf:"+",  en:"Expert Consultants",  ar:"مستشار متخصص",         icon:"👨‍💼", c:"#FFB74D" },
  { n:"24",    suf:"/7", en:"Support Available",   ar:"دعم متواصل",            icon:"🎧", c:"#F48FB1" },
];

const PILLARS = [
  {
    icon:"🏛️", color:"#D4AF37",
    en:"Government-Licensed Office",
    ar:"مكتب مرخص حكومياً",
    descEn:"BlueWave Consultation is fully registered with the UAE government — Office No. CWS-1V-224954, Amber Gem Tower, Ajman. You are working with a legitimate, insured and regulated firm.",
    descAr:"بلو ويف مسجلة بالكامل لدى الحكومة الإماراتية — مكتب رقم CWS-1V-224954، برج امبرجم، عجمان. أنت تتعامل مع شركة شرعية ومؤمنة ومنظمة.",
    pts:["UAE licensed — Office CWS-1V-224954","Amber Gem Tower, 26th Floor, Ajman","Full compliance with UAE immigration law"],
    ptsAr:["مرخصة إماراتياً — مكتب CWS-1V-224954","برج امبرجم، الطابق ٢٦، عجمان","امتثال كامل لقانون الهجرة الإماراتي"],
  },
  {
    icon:"🎯", color:"#4FC3F7",
    en:"98% Visa Approval Rate",
    ar:"معدل موافقة ٩٨٪ على التأشيرات",
    descEn:"Over 7 years and 12,000+ cases, we have maintained an industry-leading 98% approval rate. Our pre-submission audit, embassy-level review and rejection analysis keeps your case bulletproof.",
    descAr:"على مدى ٧ سنوات وأكثر من ١٢,٠٠٠ حالة، حافظنا على معدل موافقة ٩٨٪ الرائد في الصناعة. تدقيقنا قبل التقديم يحافظ على قضيتك محصنة.",
    pts:["Pre-submission document audit","Embassy-level accuracy review","Rejection analysis & prevention"],
    ptsAr:["تدقيق المستندات قبل التقديم","مراجعة دقيقة على مستوى السفارة","تحليل الرفض والوقاية منه"],
  },
  {
    icon:"⚡", color:"#81C784",
    en:"Express Fast-Track Processing",
    ar:"معالجة سريعة المسار",
    descEn:"Time-sensitive visas handled with priority urgency. Our fast-track service is designed for business deadlines, job offer expirations and enrolment windows — moving at the speed you need.",
    descAr:"التأشيرات الحساسة للوقت تُعالج بأولوية عاجلة. خدمة المسار السريع مصممة لمواعيد الأعمال وانتهاء عروض العمل ونوافذ التسجيل.",
    pts:["Priority queue processing","Same-day document review","Live real-time status updates"],
    ptsAr:["معالجة قائمة الأولويات","مراجعة مستندات في اليوم ذاته","تحديثات حالة فورية في الوقت الفعلي"],
  },
  {
    icon:"🌐", color:"#CE93D8",
    en:"Native Bilingual Arabic–English",
    ar:"ثنائي اللغة أصيل عربي – إنجليزي",
    descEn:"Native Arabic and English speakers on every team. Zero translation barriers. We navigate cultural nuances that matter in Middle Eastern immigration — from document attestation to embassy etiquette.",
    descAr:"متحدثون أصليون بالعربية والإنجليزية في كل فريق. لا حواجز ترجمة. نتعامل مع الفروق الثقافية الدقيقة في هجرة الشرق الأوسط.",
    pts:["Arabic & English native consultants","Cultural fluency in all dealings","Arabic-language legal document support"],
    ptsAr:["مستشارون أصيلون عربي وإنجليزي","إتقان ثقافي في جميع التعاملات","دعم قانوني للمستندات بالعربية"],
  },
  {
    icon:"🔒", color:"#FFB74D",
    en:"Total Confidentiality Guaranteed",
    ar:"سرية تامة مضمونة",
    descEn:"Your passport, personal history and immigration data are handled with military-grade discretion. We comply with UAE data protection law and maintain strict internal protocols.",
    descAr:"يُعامل جواز سفرك وتاريخك الشخصي وبيانات الهجرة بسرية درجة عسكرية. نلتزم بقانون حماية البيانات الإماراتي.",
    pts:["UAE data protection compliant","Zero third-party data sharing","Secure encrypted document portal"],
    ptsAr:["متوافق مع حماية البيانات الإماراتية","لا مشاركة بيانات مع أطراف خارجية","بوابة مستندات مشفرة وآمنة"],
  },
  {
    icon:"🤝", color:"#F48FB1",
    en:"Dedicated Personal Consultant",
    ar:"مستشار شخصي مخصص",
    descEn:"You are never a case number. Every client is assigned one dedicated consultant who knows your file, answers your WhatsApp, and stays with you from first call to visa-in-hand.",
    descAr:"أنت لست مجرد رقم قضية. يحصل كل عميل على مستشار مخصص واحد يعرف ملفك ويرد على واتساب ويبقى معك من المكالمة الأولى حتى تحصل على تأشيرتك.",
    pts:["One dedicated consultant, always","Direct WhatsApp line to your expert","Post-visa arrival & settlement support"],
    ptsAr:["مستشار مخصص واحد دائماً","خط واتساب مباشر لخبيرك","دعم ما بعد التأشيرة والاستقرار"],
  },
];

const PROCESS = [
  { n:"01", icon:"☎️",  en:"Free Consultation Call",    ar:"مكالمة استشارة مجانية",    d:"30-min expert assessment of your case, goals and best visa route.", dAr:"تقييم خبراء ٣٠ دقيقة لقضيتك وأهدافك وأفضل مسار للتأشيرة." },
  { n:"02", icon:"📂",  en:"Document Preparation",       ar:"تحضير الوثائق",             d:"We provide a precise checklist and guide every document — zero guesswork.", dAr:"نوفر قائمة مرجعية دقيقة ونرشدك في كل وثيقة — بدون تخمين." },
  { n:"03", icon:"📤",  en:"Precision Application Filing",ar:"تقديم دقيق للطلب",          d:"Embassy-level review before submission. Every detail triple-checked.", dAr:"مراجعة على مستوى السفارة قبل التقديم. كل تفصيل يُفحص ثلاث مرات." },
  { n:"04", icon:"📡",  en:"Live Tracking & Updates",    ar:"تتبع مباشر وتحديثات",       d:"Real-time updates at every milestone — you always know where your case stands.", dAr:"تحديثات في الوقت الفعلي عند كل مرحلة — ستعرف دائماً أين تقف قضيتك." },
  { n:"05", icon:"✅",  en:"Visa Approved & Delivered",  ar:"التأشيرة معتمدة ومسلمة",    d:"Congratulations — your visa is in your hands, with post-arrival support.", dAr:"تهانينا — تأشيرتك في يدك مع دعم ما بعد الوصول." },
];

const TESTIMONIALS = [
  { flag:"🇸🇦", name:"Ahmed Al-Rashidi", nameAr:"أحمد الراشدي", from:"Saudi Arabia", fromAr:"المملكة العربية السعودية", visa:"Golden Visa", visaAr:"التأشيرة الذهبية", c:"#D4AF37",
    en:"BlueWave handled my Golden Visa from start to finish. Professional, fast and completely transparent. I had my 10-year residency in 5 weeks. World-class service.",
    ar:"تولت بلو ويف تأشيرتي الذهبية من البداية إلى النهاية. محترفون وسريعون وشفافون تماماً. حصلت على إقامتي لـ١٠ سنوات في ٥ أسابيع. خدمة عالمية المستوى." },
  { flag:"🇮🇳", name:"Priya Nair", nameAr:"بريا ناير", from:"India", fromAr:"الهند", visa:"Work Visa", visaAr:"تأشيرة العمل", c:"#4FC3F7",
    en:"My consultant explained every step clearly and my work visa was approved in just 3 weeks. I highly recommend BlueWave to anyone relocating to Dubai.",
    ar:"شرح مستشاري كل خطوة بوضوح وتمت الموافقة على تأشيرة عملي في ٣ أسابيع فقط. أوصي بشدة ببلو ويف لكل من يتنقل إلى دبي." },
  { flag:"🇵🇰", name:"Mohammed Khalil", nameAr:"محمد خليل", from:"Pakistan", fromAr:"باكستان", visa:"Family Visa", visaAr:"تأشيرة العائلة", c:"#81C784",
    en:"They helped me bring my entire family to Ajman. Medical tests, Emirates ID, residence visas — all handled. Genuinely stress-free. These people truly care.",
    ar:"ساعدوني في إحضار عائلتي بأكملها إلى عجمان. الفحوصات الطبية والهوية الإماراتية وتأشيرات الإقامة — كل شيء تمت معالجته. هؤلاء الناس يهتمون حقاً." },
  { flag:"🇬🇧", name:"Sarah Johnson", nameAr:"سارة جونسون", from:"United Kingdom", fromAr:"المملكة المتحدة", visa:"Residency Visa", visaAr:"تأشيرة الإقامة", c:"#CE93D8",
    en:"Moving from London to Dubai felt overwhelming until I found BlueWave. Their bilingual team made everything seamless. I'm now a proud UAE resident!",
    ar:"شعرت بضغط شديد عند الانتقال من لندن إلى دبي حتى وجدت بلو ويف. جعل فريقهم الثنائي كل شيء سلساً. أنا الآن مقيمة فخورة في الإمارات!" },
];

const CERTS = [
  { icon:"🏛️", en:"UAE Government Registered",    ar:"مسجلة حكومياً في الإمارات"  },
  { icon:"⚖️", en:"Immigration Law Certified",    ar:"معتمدة في قانون الهجرة"     },
  { icon:"🔐", en:"ISO Data Security Standard",   ar:"معيار ISO لأمن البيانات"    },
  { icon:"🌟", en:"5-Star Client Rated",           ar:"تقييم ٥ نجوم من العملاء"   },
  { icon:"🤝", en:"Ethical Business Charter",      ar:"ميثاق أعمال أخلاقي"         },
  { icon:"📋", en:"OISC Equivalent Standard",      ar:"معيار OISC المعادل"          },
];

const GUARANTEES = [
  { icon:"💯", en:"Transparent Pricing",     ar:"أسعار شفافة",        d:"Full cost breakdown from Day 1. No hidden fees. No surprises — ever.", dAr:"تفصيل كامل للتكاليف من اليوم الأول. لا رسوم خفية. لا مفاجآت أبداً." },
  { icon:"🔄", en:"Free Re-Application",     ar:"إعادة تقديم مجانية", d:"If your visa is rejected due to our error, we refile completely free.", dAr:"إذا رُفضت تأشيرتك بسبب خطأ منا، نعيد التقديم مجاناً تماماً." },
  { icon:"📞", en:"Lifetime Partnership",    ar:"شراكة مدى الحياة",   d:"After your visa approval, we remain your dedicated immigration partner.", dAr:"بعد الموافقة على تأشيرتك، نبقى شريك هجرتك المخصص إلى الأبد." },
];

/* ─── Particles ─────────────────────────────────────────────────────────── */
const PTS = Array.from({length:28},(_,i)=>({
  id:i, x:Math.random()*100, y:Math.random()*100,
  s:1+Math.random()*2.6, dur:5+Math.random()*8,
  del:Math.random()*7, gold:i%3!==0,
}));

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

:root{
  --g1:#B8941F;--g2:#D4AF37;--g3:#F5D76E;
  --navy:#06101E;--navy2:#0A1F44;--navy3:#0D2255;
  --teal:#00AEEF;--teal2:#38C8FF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── Keyframes ── */
@keyframes wc-sm      {0%{background-position:-700px 0}100%{background-position:700px 0}}
@keyframes wc-up      {from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:translateY(0)}}
@keyframes wc-in      {from{opacity:0}to{opacity:1}}
@keyframes wc-pulse   {0%{box-shadow:0 0 0 0 rgba(212,175,55,.65)}70%{box-shadow:0 0 0 16px rgba(212,175,55,0)}100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}
@keyframes wc-scan    {0%{left:-40%}100%{left:130%}}
@keyframes wc-float   {0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes wc-floatR  {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-7px) rotate(2deg)}}
@keyframes wc-blink   {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.38;transform:scale(.65)}}
@keyframes wc-borderG {0%,100%{border-color:rgba(212,175,55,.14)}50%{border-color:rgba(212,175,55,.52)}}
@keyframes wc-rotSlow {from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes wc-numIn   {from{opacity:0;transform:scale(.72) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes wc-qFloat  {0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-7px) rotate(-4deg)}}
@keyframes wc-twinkle {0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.9;transform:scale(1.5)}}
@keyframes wc-lineGrow{from{width:0;opacity:0}to{width:var(--lw,120px);opacity:1}}
@keyframes wc-barReveal{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* Reveals */
.wc-rv   {opacity:0;transform:translateY(28px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);}
.wc-rv.on{opacity:1;transform:none;}
.wc-rv-l   {opacity:0;transform:translateX(-30px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);}
.wc-rv-l.on{opacity:1;transform:none;}
.wc-rv-r   {opacity:0;transform:translateX(30px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);}
.wc-rv-r.on{opacity:1;transform:none;}
.wc-rv-sc  {opacity:0;transform:scale(.9);transition:opacity .68s cubic-bezier(.22,1,.36,1),transform .68s cubic-bezier(.22,1,.36,1);}
.wc-rv-sc.on{opacity:1;transform:scale(1);}

/* ── PAGE ── */
.wc-page{background:var(--navy);position:relative;overflow:hidden;}
.wc-grid{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(212,175,55,.026) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.026) 1px,transparent 1px);background-size:64px 64px;}
.wc-scan-line{position:absolute;top:0;height:100%;width:42%;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(212,175,55,.038),transparent);animation:wc-scan 13s linear infinite;z-index:1;}
.wc-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(72px);z-index:0;}
.wc-ring{position:absolute;top:50%;left:50%;border-radius:50%;border:1px solid rgba(212,175,55,.07);pointer-events:none;z-index:0;}

/* ════════════════════════════
   §1  HERO  (Dubai skyline BG)
════════════════════════════ */
.wc-hero{
  position:relative;min-height:560px;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
}
.wc-hero-bg{
  position:absolute;inset:0;z-index:0;will-change:transform;
  background:
    linear-gradient(180deg,rgba(4,7,18,.9) 0%,rgba(6,12,30,.52) 42%,rgba(4,7,18,.94) 100%),
    url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85&auto=format&fit=crop')
    center 35%/cover no-repeat;
}
.wc-hero-grid{position:absolute;inset:0;z-index:1;pointer-events:none;background-image:linear-gradient(rgba(212,175,55,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.032) 1px,transparent 1px);background-size:60px 60px;}
.wc-hero-scan{position:absolute;top:0;height:100%;width:42%;pointer-events:none;z-index:2;background:linear-gradient(90deg,transparent,rgba(212,175,55,.048),transparent);animation:wc-scan 8s linear infinite;}
/* Animated skyline silhouette bottom */
.wc-hero-skyline{position:absolute;bottom:0;left:0;right:0;z-index:2;pointer-events:none;opacity:.15;}

.wc-hero-content{
  position:relative;z-index:5;
  text-align:center;padding:96px 28px 88px;
  max-width:960px;margin:0 auto;
}
.wc-eyebrow{display:inline-flex;align-items:center;gap:10px;background:rgba(212,175,55,.09);border:1px solid rgba(212,175,55,.3);border-radius:100px;padding:7px 22px;font-family:'Outfit',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--g2);margin-bottom:26px;}
.wc-dot{width:7px;height:7px;border-radius:50%;background:var(--g2);animation:wc-blink 2.2s ease-in-out infinite;display:inline-block;}
.wc-hero-h1{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(2.5rem,6.5vw,5.4rem);color:#fff;letter-spacing:.02em;line-height:1.07;text-shadow:0 6px 42px rgba(0,0,0,.65);animation:wc-up .9s .18s cubic-bezier(.22,1,.36,1) both;}
.wc-gold-txt{background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));background-size:280%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:wc-sm 5s linear infinite;}
.wc-hr{width:140px;height:1.5px;margin:17px auto;background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);background-size:400px;animation:wc-sm 3s linear infinite;}
.wc-hero-ar{font-family:'Amiri',serif;font-weight:700;font-size:clamp(1.65rem,4vw,3.1rem);direction:rtl;color:rgba(245,215,110,.86);line-height:1.6;animation:wc-up .9s .34s cubic-bezier(.22,1,.36,1) both;}
.wc-hero-sub{font-family:'Outfit',sans-serif;font-weight:300;font-size:clamp(.9rem,1.75vw,1.12rem);color:rgba(255,255,255,.67);max-width:620px;margin:18px auto 0;line-height:1.9;animation:wc-up .8s .5s cubic-bezier(.22,1,.36,1) both;}
.wc-hero-sub-ar{font-family:'Amiri',serif;font-size:clamp(.88rem,1.6vw,1.06rem);direction:rtl;color:rgba(212,175,55,.56);max-width:600px;margin:7px auto 0;line-height:2.1;animation:wc-up .8s .62s cubic-bezier(.22,1,.36,1) both;}

/* ════════════════════════════
   §2  ANIMATED STATS STRIP
════════════════════════════ */
.wc-stats-band{background:linear-gradient(90deg,rgba(8,17,52,.98),rgba(11,28,72,.98));border-top:1px solid rgba(212,175,55,.14);border-bottom:1px solid rgba(212,175,55,.14);position:relative;overflow:hidden;}
.wc-stats-band::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(212,175,55,.024) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.024) 1px,transparent 1px);background-size:52px 52px;pointer-events:none;}
.wc-stats-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(6,1fr);}
@media(max-width:900px){.wc-stats-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:500px){.wc-stats-grid{grid-template-columns:repeat(2,1fr);}}
.wc-stat{padding:40px 14px 36px;text-align:center;border-right:1px solid rgba(212,175,55,.09);position:relative;cursor:default;transition:background .3s;}
.wc-stat:last-child{border-right:none;}
.wc-stat:hover{background:rgba(212,175,55,.04);}
.wc-stat::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:linear-gradient(90deg,var(--g1),var(--g2),var(--g3));transition:width .5s ease;}
.wc-stat:hover::after{width:60%;}
.wc-stat-icon{font-size:1.7rem;display:block;margin-bottom:9px;animation:wc-float 5s ease-in-out infinite;}
.wc-stat-num{font-family:'Cinzel',serif;font-weight:700;font-size:2.3rem;line-height:1;animation:wc-numIn .6s ease both;}
.wc-stat-en{font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.42);margin-top:6px;}
.wc-stat-ar{font-family:'Amiri',serif;font-size:.76rem;direction:rtl;color:rgba(212,175,55,.4);margin-top:2px;}

/* ════════════════════════════
   §3  WHY-CARDS (dark Dubai BG)
════════════════════════════ */
.wc-pillars-wrap{
  position:relative;overflow:hidden;
  background:
    linear-gradient(180deg,rgba(4,7,18,.97) 0%,rgba(8,18,48,.82) 50%,rgba(4,7,18,.97) 100%),
    url('https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1600&q=75&auto=format&fit=crop')
    center 60%/cover no-repeat;
  border-bottom:1px solid rgba(212,175,55,.1);
}
.wc-pillars-grid{max-width:1200px;margin:0 auto;padding:88px 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
@media(max-width:960px){.wc-pillars-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:540px){.wc-pillars-grid{grid-template-columns:1fr;}}

.wc-pillar{
  background:rgba(255,255,255,.042);border:1px solid rgba(255,255,255,.08);
  border-radius:22px;padding:32px 24px 28px;
  position:relative;overflow:hidden;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  transition:transform .42s cubic-bezier(.34,1.56,.64,1),box-shadow .42s,border-color .36s,background .36s;
  animation:wc-borderG 4.5s ease-in-out infinite;
  cursor:default;
}
/* top accent line */
.wc-pillar::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--pc,#D4AF37),transparent);opacity:.65;}
/* radial glow on hover */
.wc-pillar::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% -8%,var(--pc,#D4AF37) 0%,transparent 62%);opacity:0;transition:opacity .42s;pointer-events:none;}
.wc-pillar:hover{transform:translateY(-12px) scale(1.025);border-color:var(--pc,rgba(212,175,55,.5));background:rgba(255,255,255,.075);box-shadow:0 26px 62px rgba(0,0,0,.54),0 0 38px rgba(212,175,55,.13),inset 0 1px 0 rgba(255,255,255,.1);animation:none;}
.wc-pillar:hover::after{opacity:.06;}

.wc-pillar-icon{width:65px;height:65px;border-radius:17px;background:rgba(255,255,255,.056);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:1.85rem;margin-bottom:19px;transition:background .35s,box-shadow .35s,border-color .35s;}
.wc-pillar:hover .wc-pillar-icon{background:rgba(255,255,255,.1);border-color:var(--pc,rgba(212,175,55,.5));box-shadow:0 0 26px var(--pc,rgba(212,175,55,.38));}
.wc-pillar-en{font-family:'Cinzel',serif;font-weight:700;font-size:1.08rem;color:#fff;margin-bottom:4px;}
.wc-pillar-ar{font-family:'Amiri',serif;font-size:.96rem;direction:rtl;color:rgba(212,175,55,.68);margin-bottom:14px;}
.wc-pillar-desc{font-family:'Outfit',sans-serif;font-weight:300;font-size:.84rem;color:rgba(255,255,255,.62);line-height:1.82;margin-bottom:9px;}
.wc-pillar-desc-ar{font-family:'Amiri',serif;font-size:.84rem;direction:rtl;color:rgba(212,175,55,.46);line-height:1.95;margin-bottom:18px;}
.wc-pts{display:flex;flex-direction:column;gap:9px;}
.wc-pt{display:flex;align-items:flex-start;gap:10px;}
.wc-pt-chk{width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.32);display:flex;align-items:center;justify-content:center;font-size:.56rem;color:var(--g2);}
.wc-pt-en{font-family:'Outfit',sans-serif;font-size:.78rem;color:rgba(255,255,255,.76);}
.wc-pt-ar{font-family:'Amiri',serif;font-size:.76rem;direction:rtl;color:rgba(212,175,55,.5);margin-top:2px;}

/* ════════════════════════════
   §4  5-STEP PROCESS (split)
════════════════════════════ */
.wc-process-wrap{position:relative;overflow:hidden;}
.wc-process-inner{max-width:1200px;margin:0 auto;padding:88px 24px;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
@media(max-width:860px){.wc-process-inner{grid-template-columns:1fr;gap:44px;}}

/* Left: visual panel with Dubai night photo */
.wc-proc-visual{
  position:relative;border-radius:22px;overflow:hidden;
  aspect-ratio:4/5;max-height:520px;
  border:1px solid rgba(212,175,55,.22);
  box-shadow:0 28px 72px rgba(0,0,0,.55),0 0 0 1px rgba(212,175,55,.1);
}
.wc-proc-visual::before{
  content:'';position:absolute;inset:0;
  background:
    linear-gradient(180deg,rgba(4,7,18,.32) 0%,rgba(4,7,18,.28) 40%,rgba(4,7,18,.78) 100%),
    url('https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=900&q=80&auto=format&fit=crop')
    center/cover no-repeat;
}
/* shimmer top bar on visual */
.wc-proc-visual::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);background-size:400px;animation:wc-sm 3s linear infinite;z-index:2;}
.wc-proc-badge{
  position:absolute;bottom:24px;left:50%;transform:translateX(-50%);
  z-index:3;background:rgba(5,10,24,.9);border:1px solid rgba(212,175,55,.32);
  border-radius:14px;padding:14px 24px;backdrop-filter:blur(14px);
  text-align:center;white-space:nowrap;animation:wc-float 5s ease-in-out infinite;
}
.wc-proc-badge-n{font-family:'Cinzel',serif;font-weight:700;font-size:1.9rem;background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.wc-proc-badge-l{font-family:'Outfit',sans-serif;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.48);margin-top:2px;}
.wc-proc-badge-ar{font-family:'Amiri',serif;font-size:.72rem;direction:rtl;color:rgba(212,175,55,.55);}

/* Right: steps */
.wc-steps-list{display:flex;flex-direction:column;gap:0;position:relative;}
.wc-steps-list::before{content:'';position:absolute;left:32px;top:0;bottom:0;width:1.5px;background:linear-gradient(180deg,transparent,rgba(212,175,55,.42) 8%,rgba(212,175,55,.42) 92%,transparent);}
@media(max-width:860px){.wc-steps-list{padding-left:0;}}

.wc-step{display:flex;gap:22px;align-items:flex-start;padding-bottom:34px;position:relative;}
.wc-step:last-child{padding-bottom:0;}
.wc-step-ball{width:66px;height:66px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--g1),var(--g2));display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(212,175,55,.38),0 0 0 4px rgba(212,175,55,.12);position:relative;z-index:2;transition:transform .36s cubic-bezier(.34,1.56,.64,1),box-shadow .36s;}
.wc-step:hover .wc-step-ball{transform:scale(1.12);box-shadow:0 12px 38px rgba(212,175,55,.52),0 0 0 7px rgba(212,175,55,.18);}
.wc-step-num{font-family:'Cinzel',serif;font-weight:900;font-size:.88rem;color:var(--navy);line-height:1;}
.wc-step-icon{font-size:1rem;line-height:1;margin-top:1px;}
.wc-step-body{padding-top:12px;flex:1;}
.wc-step-en{font-family:'Cinzel',serif;font-weight:700;font-size:1.05rem;color:#fff;margin-bottom:3px;}
.wc-step-ar{font-family:'Amiri',serif;font-size:.9rem;direction:rtl;color:rgba(212,175,55,.65);margin-bottom:7px;}
.wc-step-d{font-family:'Outfit',sans-serif;font-weight:300;font-size:.82rem;color:rgba(255,255,255,.57);line-height:1.72;}
.wc-step-dar{font-family:'Amiri',serif;font-size:.8rem;direction:rtl;color:rgba(212,175,55,.42);line-height:1.9;margin-top:3px;}

/* ════════════════════════════
   §5  TESTIMONIALS (dark Dubai)
════════════════════════════ */
.wc-testi-wrap{
  position:relative;overflow:hidden;
  background:
    linear-gradient(180deg,rgba(4,7,18,.96) 0%,rgba(8,18,50,.75) 50%,rgba(4,7,18,.96) 100%),
    url('https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=72&auto=format&fit=crop')
    center 55%/cover no-repeat;
  border-top:1px solid rgba(212,175,55,.1);
  border-bottom:1px solid rgba(212,175,55,.1);
}
.wc-testi-inner{max-width:1200px;margin:0 auto;padding:88px 24px;}
.wc-testi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:0;}
@media(max-width:740px){.wc-testi-grid{grid-template-columns:1fr;}}

.wc-tcard{
  background:rgba(255,255,255,.044);border:1px solid rgba(255,255,255,.08);
  border-radius:22px;padding:30px 26px;
  position:relative;overflow:hidden;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s,border-color .3s,background .3s;
}
.wc-tcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--tc,#D4AF37),transparent);opacity:.62;}
.wc-tcard:hover{transform:translateY(-9px) scale(1.016);border-color:var(--tc,rgba(212,175,55,.4));background:rgba(255,255,255,.07);box-shadow:0 22px 56px rgba(0,0,0,.52),0 0 32px rgba(212,175,55,.1);}
.wc-tcard-quote{position:absolute;top:16px;right:20px;font-size:4rem;line-height:1;opacity:.07;color:var(--tc,#D4AF37);animation:wc-qFloat 7s ease-in-out infinite;}
.wc-tcard-top{display:flex;align-items:center;gap:15px;margin-bottom:18px;}
.wc-tcard-ava{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--tc,#D4AF37),rgba(212,175,55,.3));display:flex;align-items:center;justify-content:center;font-size:1.55rem;border:2px solid rgba(212,175,55,.3);flex-shrink:0;}
.wc-tcard-name{font-family:'Cinzel',serif;font-size:.9rem;font-weight:600;color:#fff;}
.wc-tcard-name-ar{font-family:'Amiri',serif;font-size:.85rem;direction:rtl;color:rgba(212,175,55,.6);margin-top:2px;}
.wc-tcard-from{font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.1em;color:rgba(255,255,255,.38);margin-top:3px;}
.wc-tcard-visa{display:inline-flex;align-items:center;gap:5px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);border-radius:6px;padding:3px 10px;font-family:'Outfit',sans-serif;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(212,175,55,.72);margin-top:5px;}
.wc-stars{display:flex;gap:3px;margin-bottom:13px;}
.wc-star{font-size:.85rem;color:var(--g2);animation:wc-twinkle 2.5s ease-in-out infinite;}
.wc-tcard-en{font-family:'Outfit',sans-serif;font-weight:300;font-size:.86rem;color:rgba(255,255,255,.72);line-height:1.84;font-style:italic;margin-bottom:10px;}
.wc-tcard-ar{font-family:'Amiri',serif;font-size:.88rem;direction:rtl;color:rgba(212,175,55,.5);line-height:2;font-style:italic;}

/* ════════════════════════════
   §6  CERTIFICATIONS
════════════════════════════ */
.wc-cert-wrap{position:relative;overflow:hidden;}
.wc-cert-inner{max-width:1200px;margin:0 auto;padding:80px 24px;}
.wc-cert-chips{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;}
.wc-cert-chip{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(212,175,55,.18);border-radius:16px;padding:15px 24px;transition:transform .38s cubic-bezier(.34,1.56,.64,1),background .3s,border-color .3s,box-shadow .3s;animation:wc-borderG 5s ease-in-out infinite;cursor:default;}
.wc-cert-chip:hover{transform:translateY(-7px) scale(1.05);background:rgba(212,175,55,.08);border-color:rgba(212,175,55,.52);box-shadow:0 16px 38px rgba(0,0,0,.42),0 0 26px rgba(212,175,55,.14);animation:none;}
.wc-cert-icon{font-size:1.65rem;animation:wc-float 5s ease-in-out infinite;}
.wc-cert-en{font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:500;letter-spacing:.08em;color:rgba(255,255,255,.82);}
.wc-cert-ar{font-family:'Amiri',serif;font-size:.74rem;direction:rtl;color:rgba(212,175,55,.55);margin-top:3px;}

/* ════════════════════════════
   §7  GUARANTEES  (Dubai night)
════════════════════════════ */
.wc-guar-wrap{
  position:relative;overflow:hidden;
  background:
    linear-gradient(180deg,rgba(3,6,16,.96) 0%,rgba(7,15,40,.65) 50%,rgba(3,6,16,.96) 100%),
    url('https://images.unsplash.com/photo-1588416499018-d8c621e7d2c2?w=1600&q=72&auto=format&fit=crop')
    center 40%/cover no-repeat;
  border-top:1px solid rgba(212,175,55,.12);
  border-bottom:1px solid rgba(212,175,55,.12);
}
.wc-guar-inner{max-width:1000px;margin:0 auto;padding:88px 24px;}
.wc-guar-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
@media(max-width:700px){.wc-guar-grid{grid-template-columns:1fr;gap:20px;}}
.wc-guar-item{text-align:center;padding:36px 22px;background:rgba(255,255,255,.038);border:1px solid rgba(212,175,55,.15);border-radius:20px;backdrop-filter:blur(12px);transition:transform .38s cubic-bezier(.34,1.56,.64,1),box-shadow .38s,border-color .3s,background .3s;}
.wc-guar-item:hover{transform:translateY(-9px) scale(1.03);border-color:rgba(212,175,55,.48);background:rgba(212,175,55,.07);box-shadow:0 20px 52px rgba(0,0,0,.5),0 0 30px rgba(212,175,55,.14);}
.wc-guar-icon{font-size:2.6rem;display:block;margin-bottom:14px;animation:wc-floatR 6s ease-in-out infinite;}
.wc-guar-en{font-family:'Cinzel',serif;font-size:1rem;font-weight:700;color:var(--g2);margin-bottom:4px;}
.wc-guar-ar{font-family:'Amiri',serif;font-size:.9rem;direction:rtl;color:rgba(212,175,55,.62);margin-bottom:12px;}
.wc-guar-d{font-family:'Outfit',sans-serif;font-weight:300;font-size:.82rem;color:rgba(255,255,255,.6);line-height:1.82;}
.wc-guar-dar{font-family:'Amiri',serif;font-size:.8rem;direction:rtl;color:rgba(212,175,55,.44);line-height:1.9;margin-top:6px;}

/* ════════════════════════════
   §8  FINAL CTA BAND
════════════════════════════ */
.wc-cta-band{
  text-align:center;padding:88px 28px 96px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,rgba(5,9,22,.98),rgba(9,18,52,.98));
}
.wc-cta-band::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 72% 62% at 50% 50%,rgba(212,175,55,.07) 0%,transparent 70%);pointer-events:none;}
.wc-cta-band::after{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:linear-gradient(90deg,transparent,var(--g1) 18%,var(--g2) 40%,var(--g3) 50%,var(--g2) 62%,var(--g1) 82%,transparent);background-size:700px 100%;animation:wc-sm 3.5s linear infinite;}
.wc-cta-h{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(1.85rem,4.5vw,3.6rem);color:#fff;margin-bottom:10px;position:relative;z-index:1;line-height:1.1;}
.wc-cta-ar{font-family:'Amiri',serif;font-size:clamp(1.4rem,3vw,2.2rem);direction:rtl;color:rgba(245,215,110,.72);margin-bottom:36px;position:relative;z-index:1;}
.wc-cta-btns{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;position:relative;z-index:1;}
.wc-btn-gold{font-family:'Outfit',sans-serif;font-weight:600;font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:var(--navy);background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));background-size:280%;border:none;border-radius:4px;padding:15px 42px;cursor:pointer;position:relative;overflow:hidden;animation:wc-pulse 3s ease-out infinite,wc-sm 5s linear infinite;transition:transform .25s,box-shadow .3s;}
.wc-btn-gold::before{content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;background:linear-gradient(110deg,transparent,rgba(255,255,255,.42),transparent);transition:left .55s;pointer-events:none;}
.wc-btn-gold:hover::before{left:160%;}
.wc-btn-gold:hover{transform:translateY(-3px) scale(1.03);animation:none;background-position:right;box-shadow:0 14px 42px rgba(212,175,55,.58);}
.wc-btn-ar{font-family:'Amiri',serif;font-size:1.07rem;direction:rtl;color:var(--g2);background:transparent;border:1.5px solid rgba(212,175,55,.42);border-radius:4px;padding:14px 36px;cursor:pointer;transition:all .3s;}
.wc-btn-ar:hover{background:rgba(212,175,55,.09);border-color:var(--g2);color:var(--g3);transform:translateY(-3px);box-shadow:0 10px 30px rgba(212,175,55,.28);}

/* Sec header helpers */
.wc-sec-head{text-align:center;margin-bottom:60px;}
.wc-sec-h{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(2rem,4.8vw,3.8rem);color:#fff;letter-spacing:.02em;line-height:1.1;}
.wc-sec-ar{font-family:'Amiri',serif;font-weight:700;font-size:clamp(1.4rem,3vw,2.4rem);direction:rtl;color:rgba(245,215,110,.78);margin-top:8px;line-height:1.6;}
.wc-sec-sub{font-family:'Outfit',sans-serif;font-weight:300;font-size:clamp(.9rem,1.65vw,1.08rem);color:rgba(255,255,255,.6);max-width:580px;margin:14px auto 0;line-height:1.9;text-align:center;}
.wc-sec-sub-ar{font-family:'Amiri',serif;font-size:clamp(.86rem,1.52vw,1.02rem);direction:rtl;color:rgba(212,175,55,.5);max-width:560px;margin:6px auto 0;line-height:2.1;text-align:center;}

/* Gold bottom closing bar */
.wc-foot-bar{height:3px;background:linear-gradient(90deg,transparent,var(--g1) 20%,var(--g2) 40%,var(--g3) 50%,var(--g2) 62%,var(--g1) 80%,transparent);background-size:700px 100%;animation:wc-sm 3.5s linear infinite;}

@media(max-width:520px){
  .wc-pillars-grid,.wc-process-inner,.wc-testi-inner,.wc-cert-inner,.wc-guar-inner{padding-left:14px;padding-right:14px;}
  .wc-pillar,.wc-tcard{padding:22px 16px;}
  .wc-step-ball{width:54px;height:54px;}
}
`;

/* ─── Stat Cell ─────────────────────────────────────────────────────────── */
function StatCell({ s, active, delay }) {
  const n = useCounter(s.n, 1700, active);
  const end = parseInt(s.n);
  return (
    <div className="wc-stat" style={{ animationDelay:`${delay}s` }}>
      <span className="wc-stat-icon" style={{ animationDelay:`${delay*0.5}s` }}>{s.icon}</span>
      <div className="wc-stat-num" style={{ color: s.c }}>
        {active ? `${n >= end ? s.n : n}${s.suf}` : "—"}
      </div>
      <div className="wc-stat-en">{s.en}</div>
      <div className="wc-stat-ar">{s.ar}</div>
    </div>
  );
}

/* ─── Section header helper ─────────────────────────────────────────────── */
function SecHead({ eyeEn, eyeAr, h, hl, ar, sub, subAr }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <div className={`wc-sec-head wc-rv${vis?" on":""}`} ref={ref}>
      <div className="wc-eyebrow">
        <span className="wc-dot"/>
        {eyeEn} · {eyeAr}
        <span className="wc-dot" style={{animationDelay:".8s"}}/>
      </div>
      <h2 className="wc-sec-h">
        {h} <span className="wc-gold-txt">{hl}</span>
      </h2>
      <div className="wc-hr"/>
      <div className="wc-sec-ar">{ar}</div>
      {sub   && <p className="wc-sec-sub">{sub}</p>}
      {subAr && <p className="wc-sec-sub-ar">{subAr}</p>}
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const cssInj = useRef(false);
  const [statsRef, statsVis] = useReveal(0.08);
  const [ctaRef,   ctaVis]   = useReveal(0.1);

  useEffect(() => {
    if (cssInj.current) return;
    const t = document.createElement("style");
    t.textContent = CSS;
    document.head.appendChild(t);
    cssInj.current = true;
  }, []);

  const go = useCallback(() =>
    document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }), []);

  /* Mouse parallax on hero bg */
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  useEffect(() => {
    const fn = e => { setMx((e.clientX/window.innerWidth-.5)*14); setMy((e.clientY/window.innerHeight-.5)*18); };
    window.addEventListener("mousemove", fn, {passive:true});
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div id="why-us" className="wc-page">

      {/* ── Global BG layer ── */}
      <div className="wc-grid"/>
      <div className="wc-scan-line"/>
      <div className="wc-orb" style={{top:"6%",left:"2%",width:480,height:480,background:"radial-gradient(circle,rgba(212,175,55,.072) 0%,transparent 70%)",animation:"wc-float 12s ease-in-out infinite"}}/>
      <div className="wc-orb" style={{bottom:"14%",right:"3%",width:560,height:460,background:"radial-gradient(circle,rgba(0,174,239,.055) 0%,transparent 70%)",animation:"wc-float 17s 5s ease-in-out infinite"}}/>
      {[700,920,1120].map((sz,i)=>(
        <div key={sz} className="wc-ring" style={{width:sz,height:sz,marginLeft:-sz/2,marginTop:-sz/2,animation:`wc-rotSlow ${28+i*16}s ${i%2?"reverse":""} linear infinite`,opacity:.032+i*.01}}/>
      ))}
      {PTS.map(p=>(
        <div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:"50%",background:p.gold?"#D4AF37":"#38C8FF",opacity:p.s>2?.28:.15,zIndex:1,pointerEvents:"none",animation:`wc-float ${p.dur}s ${p.del}s ease-in-out infinite`}}/>
      ))}

      {/* ════════════════ §1 HERO ════════════════ */}
      <div className="wc-hero">
        <div className="wc-hero-bg" style={{transform:`scale(1.08) translate(${mx*.3}px,${my*.28}px)`}}/>
        <div className="wc-hero-grid"/>
        <div className="wc-hero-scan"/>
        {/* Skyline silhouette */}
        <svg className="wc-hero-skyline" viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#D4AF37" d="M0,160V130l40,0V105l12,0V85l7-56,4-20,4,20,7,56V85l12,0V105l18,0V125l25,0V95l10,0V72l9-50,4-18,4,18,9,50V72l10,0V95l28,0V82l9,0V60l8-48,4-18,4,18,8,48V60l9,0V82l32,0V104l12,0V82l8-50,4-19,4,19,8,50V82l12,0V104l30,0V88l10,0V65l9-54,4-21,5-9,5,9,4,21,9,54V65l10,0V88l30,0V100l10,0V76l8-48,4-18,4,18,8,48V76l10,0V100l35,0V112l12,0V88l9-56,4-22,3-8,3,8,4,22,9,56V88l12,0V112l38,0V96l9,0V72l8-44,4-16,4,16,8,44V72l9,0V96l42,0V108l10,0V84l8-50,4-19,4,19,8,50V84l10,0V108l38,0V120l11,0V96l10-60,4-22,4,22,10,60V96l11,0V120l40,0V132l10,0V108l8-50,4-18,4,18,8,50V108l10,0V132l30,0V120l9,0V96l7-42,4-15,4,15,7,42V96l9,0V120l50,0V160Z"/>
        </svg>
        <div className="wc-hero-content">
          <div className="wc-eyebrow" style={{animation:"wc-in .7s .1s ease both"}}>
            <span className="wc-dot"/>
            BlueWave Consultation · لماذا تختار بلو ويف؟
            <span className="wc-dot" style={{animationDelay:".9s"}}/>
          </div>
          <h1 className="wc-hero-h1">
            Why <span className="wc-gold-txt">BlueWave</span><br/>Stands Apart
          </h1>
          <div className="wc-hr"/>
          <div className="wc-hero-ar">لماذا تتميز بلو ويف عن غيرها؟</div>
          <p className="wc-hero-sub">
            In a city built on ambition, your immigration partner must be exceptional.
            BlueWave Consultation has earned the trust of 12,000+ clients across 50+
            countries — and here is exactly why we are the UAE's most trusted choice.
          </p>
          <p className="wc-hero-sub-ar">
            في مدينة مبنية على الطموح، يجب أن يكون شريك هجرتك استثنائياً. بلو ويف كسبت ثقة أكثر من ١٢,٠٠٠ عميل من ٥٠+ دولة — وهذا هو السبب بالضبط.
          </p>
        </div>
      </div>

      {/* ════════════════ §2 STATS ════════════════ */}
      <div className="wc-stats-band" ref={statsRef}>
        <div className="wc-stats-grid">
          {STATS.map((s,i)=><StatCell key={i} s={s} active={statsVis} delay={i*0.1}/>)}
        </div>
      </div>

      {/* ════════════════ §3 SIX PILLARS ════════════════ */}
      <div className="wc-pillars-wrap">
        <div className="wc-pillars-grid">
          {/* section header spanning all cols */}
          <div style={{gridColumn:"1/-1"}}>
            <SecHead
              eyeEn="Our Difference" eyeAr="ما يميزنا"
              h="6 Reasons to" hl="Trust Us"
              ar="٦ أسباب تجعلك تثق بنا"
              sub="Every claim is backed by 7 years of results, 12,000+ visa approvals and real client experiences."
              subAr="كل ادعاء مدعوم بـ٧ سنوات من النتائج وأكثر من ١٢,٠٠٠ موافقة على التأشيرات وتجارب عملاء حقيقية."
            />
          </div>
          {PILLARS.map((p,i)=>{
            const [ref,vis] = useReveal(0.1);
            return (
              <div key={i} ref={ref} className={`wc-pillar wc-rv${vis?" on":""}`}
                style={{"--pc":p.color, transitionDelay:`${i*0.09}s`}}>
                <div className="wc-pillar-icon">{p.icon}</div>
                <div className="wc-pillar-en">{p.en}</div>
                <div className="wc-pillar-ar">{p.ar}</div>
                <div className="wc-pillar-desc">{p.descEn}</div>
                <div className="wc-pillar-desc-ar">{p.descAr}</div>
                <div className="wc-pts">
                  {p.pts.map((pt,j)=>(
                    <div className="wc-pt" key={j}>
                      <div className="wc-pt-chk">✓</div>
                      <div>
                        <div className="wc-pt-en">{pt}</div>
                        <div className="wc-pt-ar">{p.ptsAr[j]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════ §4 PROCESS ════════════════ */}
      <div className="wc-process-wrap">
        <div className="wc-process-inner">
          {/* Visual */}
          {(()=>{const[ref,vis]=useReveal(0.1);return(
            <div ref={ref} className={`wc-rv-l${vis?" on":""}`}>
              <div className="wc-proc-visual">
                <div className="wc-proc-badge">
                  <div className="wc-proc-badge-n">5 Steps</div>
                  <div className="wc-proc-badge-l">Streamlined Process · عملية مبسطة</div>
                  <div className="wc-proc-badge-ar">من المكالمة الأولى إلى التأشيرة في يدك</div>
                </div>
              </div>
            </div>
          );})()}
          {/* Steps */}
          {(()=>{const[ref,vis]=useReveal(0.1);return(
            <div ref={ref} className={`wc-rv-r${vis?" on":""}`}>
              <SecHead eyeEn="How It Works" eyeAr="كيف نعمل" h="Our" hl="5-Step Process" ar="عمليتنا المكونة من ٥ خطوات" sub="Simple, transparent and stress-free — start to visa." subAr="بسيطة وشفافة وخالية من التوتر — من البداية حتى التأشيرة."/>
              <div className="wc-steps-list">
                {PROCESS.map((s,i)=>(
                  <div className="wc-step" key={i} style={{animationDelay:`${i*0.1}s`}}>
                    <div className="wc-step-ball">
                      <span className="wc-step-num">{s.n}</span>
                      <span className="wc-step-icon">{s.icon}</span>
                    </div>
                    <div className="wc-step-body">
                      <div className="wc-step-en">{s.en}</div>
                      <div className="wc-step-ar">{s.ar}</div>
                      <div className="wc-step-d">{s.d}</div>
                      <div className="wc-step-dar">{s.dAr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );})()}
        </div>
      </div>

      {/* ════════════════ §5 TESTIMONIALS ════════════════ */}
      <div className="wc-testi-wrap">
        <div className="wc-testi-inner">
          <SecHead eyeEn="Client Voices" eyeAr="أصوات عملائنا" h="Real" hl="Success Stories" ar="قصص نجاح حقيقية" sub="Don't take our word — hear from clients who trusted BlueWave with their most important journey." subAr="لا تأخذ كلامنا فقط — استمع من عملاء وثقوا ببلو ويف في أهم رحلاتهم."/>
          <div className="wc-testi-grid">
            {TESTIMONIALS.map((t,i)=>{
              const [ref,vis]=useReveal(0.1);
              return(
                <div key={i} ref={ref} className={`wc-tcard wc-rv${vis?" on":""}`} style={{"--tc":t.c,transitionDelay:`${i*0.1}s`}}>
                  <div className="wc-tcard-quote">"</div>
                  <div className="wc-tcard-top">
                    <div className="wc-tcard-ava">{t.flag}</div>
                    <div>
                      <div className="wc-tcard-name">{t.name}</div>
                      <div className="wc-tcard-name-ar">{t.nameAr}</div>
                      <div className="wc-tcard-from">{t.from} · {t.fromAr}</div>
                      <div className="wc-tcard-visa">✈ {t.visa} · {t.visaAr}</div>
                    </div>
                  </div>
                  <div className="wc-stars">{Array(5).fill(0).map((_,j)=><span key={j} className="wc-star" style={{animationDelay:`${j*0.3}s`}}>★</span>)}</div>
                  <div className="wc-tcard-en">"{t.en}"</div>
                  <div className="wc-tcard-ar">"{t.ar}"</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════ §6 CERTIFICATIONS ════════════════ */}
      <div className="wc-cert-wrap">
        <div className="wc-cert-inner">
          <SecHead eyeEn="Credentials" eyeAr="الاعتمادات" h="Licensed &" hl="Certified" ar="مرخصون ومعتمدون"/>
          <div className="wc-cert-chips">
            {CERTS.map((c,i)=>{
              const [ref,vis]=useReveal(0.1);
              return(
                <div key={i} ref={ref} className={`wc-cert-chip wc-rv${vis?" on":""}`} style={{transitionDelay:`${i*0.08}s`}}>
                  <span className="wc-cert-icon" style={{animationDelay:`${i*0.5}s`}}>{c.icon}</span>
                  <div>
                    <div className="wc-cert-en">{c.en}</div>
                    <div className="wc-cert-ar">{c.ar}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════ §7 GUARANTEES ════════════════ */}
      <div className="wc-guar-wrap">
        <div className="wc-guar-inner">
          <SecHead eyeEn="Our Promise" eyeAr="وعدنا لك" h="The BlueWave" hl="Guarantee" ar="ضمان بلو ويف لك"/>
          <div className="wc-guar-grid">
            {GUARANTEES.map((g,i)=>{
              const [ref,vis]=useReveal(0.1);
              return(
                <div key={i} ref={ref} className={`wc-guar-item wc-rv${vis?" on":""}`} style={{transitionDelay:`${i*0.12}s`}}>
                  <span className="wc-guar-icon" style={{animationDelay:`${i*0.9}s`}}>{g.icon}</span>
                  <div className="wc-guar-en">{g.en}</div>
                  <div className="wc-guar-ar">{g.ar}</div>
                  <div className="wc-guar-d">{g.d}</div>
                  <div className="wc-guar-dar">{g.dAr}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════ §8 CTA ════════════════ */}
      <div className={`wc-cta-band wc-rv${ctaVis?" on":""}`} ref={ctaRef}>
        <h2 className="wc-cta-h">
          Ready to Experience the <span className="wc-gold-txt">BlueWave Difference?</span>
        </h2>
        <div className="wc-cta-ar">هل أنت مستعد لتجربة فرق بلو ويف؟</div>
        <div className="wc-cta-btns">
          <button className="wc-btn-gold" onClick={go}>Get Free Consultation</button>
          <button className="wc-btn-ar"   onClick={go}>احصل على استشارة مجانية</button>
        </div>
      </div>

      <div className="wc-foot-bar"/>
    </div>
  );
}