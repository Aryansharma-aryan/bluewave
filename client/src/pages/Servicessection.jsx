import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — Ultra-Premium Services Section
   • 6 expandable service cards with smooth accordion toggle
   • Country flag marquee strip
   • Dubai gold + navy + teal design system (matches Navbar + Hero + About)
   • Cinzel × Amiri × Outfit typography
   • IntersectionObserver scroll reveals
   • Animated process steps, eligibility list, document checklist inside each card
   • Fully bilingual EN / Arabic RTL
══════════════════════════════════════════════════════════════════════════════ */

/* ── Scroll reveal hook ─────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ── Country data with flag emoji ──────────────────────────────────────── */
const COUNTRIES = [
  { flag:"🇦🇪", en:"UAE",           ar:"الإمارات"     },
  { flag:"🇮🇳", en:"India",         ar:"الهند"        },
  { flag:"🇵🇰", en:"Pakistan",      ar:"باكستان"      },
  { flag:"🇧🇩", en:"Bangladesh",    ar:"بنغلاديش"     },
  { flag:"🇵🇭", en:"Philippines",   ar:"الفلبين"      },
  { flag:"🇬🇧", en:"UK",            ar:"المملكة المتحدة"},
  { flag:"🇺🇸", en:"USA",           ar:"أمريكا"       },
  { flag:"🇨🇦", en:"Canada",        ar:"كندا"         },
  { flag:"🇦🇺", en:"Australia",     ar:"أستراليا"     },
  { flag:"🇩🇪", en:"Germany",       ar:"ألمانيا"      },
  { flag:"🇫🇷", en:"France",        ar:"فرنسا"        },
  { flag:"🇮🇹", en:"Italy",         ar:"إيطاليا"      },
  { flag:"🇪🇬", en:"Egypt",         ar:"مصر"          },
  { flag:"🇯🇴", en:"Jordan",        ar:"الأردن"       },
  { flag:"🇱🇧", en:"Lebanon",       ar:"لبنان"        },
  { flag:"🇳🇬", en:"Nigeria",       ar:"نيجيريا"      },
  { flag:"🇰🇪", en:"Kenya",         ar:"كينيا"        },
  { flag:"🇨🇳", en:"China",         ar:"الصين"        },
  { flag:"🇷🇺", en:"Russia",        ar:"روسيا"        },
  { flag:"🇧🇷", en:"Brazil",        ar:"البرازيل"     },
  { flag:"🇿🇦", en:"South Africa",  ar:"جنوب أفريقيا" },
  { flag:"🇳🇵", en:"Nepal",         ar:"نيبال"        },
  { flag:"🇸🇦", en:"Saudi Arabia",  ar:"السعودية"     },
  { flag:"🇰🇼", en:"Kuwait",        ar:"الكويت"       },
];

/* ── Service data ───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "study",
    icon: "🎓",
    color: "#4FC3F7",
    en: "Study Visa",
    ar: "تأشيرة الدراسة",
    tagEn: "Education · UAE & Global",
    tagAr: "التعليم · الإمارات والعالم",
    shortEn: "Open doors to world-class universities and colleges across the UAE and beyond.",
    shortAr: "افتح أبواب الجامعات والكليات العالمية في الإمارات وما وراءها.",
    descEn: "BlueWave Consultation helps students navigate the complete study visa process — from university selection and admission letters to visa application and arrival support. We work with institutions across the UAE, UK, Canada, Australia, Germany and more.",
    descAr: "تساعد بلو ويف الطلاب في التنقل خلال عملية تأشيرة الدراسة بالكامل — من اختيار الجامعة وخطابات القبول إلى طلب التأشيرة ودعم الوصول.",
    process: [
      { en: "University & Program Selection", ar: "اختيار الجامعة والبرنامج" },
      { en: "Admission Letter Assistance",    ar: "مساعدة خطاب القبول"      },
      { en: "Visa Application Filing",        ar: "تقديم طلب التأشيرة"       },
      { en: "Financial Documentation",        ar: "التوثيق المالي"            },
      { en: "Travel & Arrival Support",       ar: "دعم السفر والوصول"        },
    ],
    docs: ["Valid Passport (6+ months)", "Acceptance Letter", "Financial Proof", "Academic Transcripts", "Language Proficiency (IELTS/TOEFL)", "Passport Photos"],
    docsAr: ["جواز سفر ساري (٦+ أشهر)", "خطاب القبول", "إثبات مالي", "السجلات الأكاديمية", "إتقان اللغة (IELTS/TOEFL)", "صور جواز سفر"],
    eligibility: ["Accepted into a recognized institution", "Sufficient financial means", "Clean immigration record", "Medical fitness"],
    eligibilityAr: ["مقبول في مؤسسة معترف بها", "وسائل مالية كافية", "سجل هجرة نظيف", "لياقة طبية"],
    countries: ["🇦🇪","🇬🇧","🇨🇦","🇦🇺","🇩🇪","🇫🇷","🇺🇸"],
    time: "2–8 weeks",
    timeAr: "٢–٨ أسابيع",
    fee: "Affordable",
    feeAr: "معقول",
  },
  {
    id: "b1b2",
    icon: "✈️",
    color: "#D4AF37",
    en: "B1/B2 Visa",
    ar: "تأشيرة B1/B2",
    tagEn: "Business & Tourism · USA Focus",
    tagAr: "الأعمال والسياحة · التركيز على أمريكا",
    shortEn: "Business travel and tourism visas processed with precision and confidence.",
    shortAr: "تأشيرات سفر الأعمال والسياحة تُعالج بدقة وثقة.",
    descEn: "The B1/B2 US visa covers both business (B1) and tourism/pleasure (B2) travel. Our expert consultants guide you through the DS-160 form, embassy interview preparation, and all supporting documentation to maximize your approval chances.",
    descAr: "تغطي تأشيرة B1/B2 الأمريكية سفر الأعمال (B1) والسياحة (B2). يرشدك مستشارونا خلال نموذج DS-160 وتحضير مقابلة السفارة وجميع الوثائق الداعمة.",
    process: [
      { en: "DS-160 Form Completion",          ar: "إتمام نموذج DS-160"          },
      { en: "SEVIS Fee Payment",               ar: "دفع رسوم SEVIS"              },
      { en: "Embassy Appointment Booking",     ar: "حجز موعد السفارة"             },
      { en: "Interview Preparation",           ar: "الإعداد للمقابلة"             },
      { en: "Visa Collection & Travel Brief",  ar: "استلام التأشيرة وملخص السفر" },
    ],
    docs: ["Valid Passport", "DS-160 Confirmation", "Appointment Letter", "Bank Statements (6 months)", "Employment Letter", "Invitation Letter (if applicable)"],
    docsAr: ["جواز سفر ساري", "تأكيد DS-160", "خطاب الموعد", "كشوفات بنكية (٦ أشهر)", "خطاب التوظيف", "خطاب دعوة (إن وجد)"],
    eligibility: ["Strong ties to home country", "Sufficient financial support", "Clear purpose of visit", "No immigration violations"],
    eligibilityAr: ["روابط قوية بالبلد الأصلي", "دعم مالي كافٍ", "غرض واضح للزيارة", "لا مخالفات هجرة"],
    countries: ["🇺🇸","🇬🇧","🇨🇦","🇦🇺"],
    time: "3–6 weeks",
    timeAr: "٣–٦ أسابيع",
    fee: "Government fees apply",
    feeAr: "رسوم حكومية تُطبق",
  },
  {
    id: "work",
    icon: "💼",
    color: "#81C784",
    en: "Work Visa",
    ar: "تأشيرة العمل",
    tagEn: "Employment · UAE & International",
    tagAr: "التوظيف · الإمارات ودولياً",
    shortEn: "Secure your legal right to work in the UAE or abroad — end-to-end processing.",
    shortAr: "تأمين حقك القانوني في العمل في الإمارات أو الخارج — معالجة كاملة.",
    descEn: "Whether you're a skilled professional, executive or blue-collar worker, BlueWave handles your UAE work permit, employment visa, and labour card processing. We also assist with job offer verification, Emirates ID and medical fitness certificate coordination.",
    descAr: "سواء كنت محترفاً متخصصاً أو مديراً تنفيذياً أو عاملاً، تتولى بلو ويف معالجة تصريح العمل وتأشيرة التوظيف وبطاقة العمل.",
    process: [
      { en: "Job Offer Verification",         ar: "التحقق من عرض العمل"    },
      { en: "Work Permit Application",         ar: "طلب تصريح العمل"        },
      { en: "Entry Permit Issuance",           ar: "إصدار تصريح الدخول"     },
      { en: "Medical Fitness & Emirates ID",   ar: "اللياقة الطبية والهوية"  },
      { en: "Residence Visa Stamping",         ar: "ختم تأشيرة الإقامة"      },
    ],
    docs: ["Passport Copy", "Employer Offer Letter", "Educational Certificates (attested)", "Experience Certificates", "Medical Fitness Report", "Passport Photos"],
    docsAr: ["نسخة جواز سفر", "خطاب عرض العمل", "شهادات تعليمية (مصدقة)", "شهادات خبرة", "تقرير اللياقة الطبية", "صور جواز سفر"],
    eligibility: ["Valid job offer from UAE employer", "Relevant qualifications", "Medical fitness", "Age 18–60 (general rule)"],
    eligibilityAr: ["عرض عمل صالح من صاحب عمل إماراتي", "مؤهلات ذات صلة", "لياقة طبية", "العمر ١٨–٦٠ (قاعدة عامة)"],
    countries: ["🇦🇪","🇬🇧","🇨🇦","🇦🇺","🇩🇪","🇸🇦","🇰🇼"],
    time: "2–4 weeks",
    timeAr: "٢–٤ أسابيع",
    fee: "Employer-sponsored",
    feeAr: "برعاية صاحب العمل",
  },
  {
    id: "residency",
    icon: "🏠",
    color: "#FFB74D",
    en: "Residency Visa",
    ar: "تأشيرة الإقامة",
    tagEn: "Long-Term Living · UAE",
    tagAr: "الإقامة طويلة الأمد · الإمارات",
    shortEn: "Make the UAE your permanent home with expert residency visa guidance.",
    shortAr: "اجعل الإمارات وطنك الدائم بإرشادات خبراء تأشيرة الإقامة.",
    descEn: "UAE residency visas are issued for 1, 2 or 3 years and are renewable. BlueWave manages the full lifecycle — initial application, renewal, cancellation and family sponsorship under one roof. We specialize in employment-based, investor and freelance residency categories.",
    descAr: "تُصدر تأشيرات الإقامة الإماراتية لمدة ١ أو ٢ أو ٣ سنوات وقابلة للتجديد. تدير بلو ويف الدورة الكاملة — الطلب الأولي والتجديد والإلغاء وكفالة الأسرة.",
    process: [
      { en: "Entry Permit (if outside UAE)",   ar: "تصريح الدخول (خارج الإمارات)" },
      { en: "Medical Fitness Test",            ar: "فحص اللياقة الطبية"           },
      { en: "Emirates ID Biometrics",          ar: "بيومترية الهوية الإماراتية"   },
      { en: "Visa Stamping in Passport",       ar: "ختم التأشيرة في جواز السفر"   },
      { en: "Annual Renewal Management",       ar: "إدارة التجديد السنوي"         },
    ],
    docs: ["Passport (valid 6+ months)", "Entry Permit", "Medical Certificate", "Emirates ID Application", "Sponsor Documents", "Tenancy Contract / Utility Bills"],
    docsAr: ["جواز سفر (٦+ أشهر)", "تصريح الدخول", "شهادة طبية", "طلب هوية إماراتية", "وثائق الكفيل", "عقد إيجار / فواتير خدمات"],
    eligibility: ["Valid UAE sponsor or employment", "Clean criminal record", "Medical fitness", "Valid entry permit"],
    eligibilityAr: ["كفيل إماراتي صالح أو توظيف", "سجل جنائي نظيف", "لياقة طبية", "تصريح دخول صالح"],
    countries: ["🇦🇪"],
    time: "1–3 weeks",
    timeAr: "١–٣ أسابيع",
    fee: "AED 3,000–8,000",
    feeAr: "٣,٠٠٠–٨,٠٠٠ درهم",
  },
  {
    id: "invest",
    icon: "💰",
    color: "#CE93D8",
    en: "Investment Immigration",
    ar: "هجرة الاستثمار",
    tagEn: "Golden Visa · Investor Residency",
    tagAr: "التأشيرة الذهبية · إقامة المستثمر",
    shortEn: "UAE Golden Visa and investor residency for high-net-worth individuals and entrepreneurs.",
    shortAr: "التأشيرة الذهبية الإماراتية وإقامة المستثمرين للأفراد ذوي الثروات العالية.",
    descEn: "The UAE Golden Visa grants 5 or 10-year renewable residency to investors, entrepreneurs, exceptional talents and their families. BlueWave guides you through property investment thresholds, business setup requirements and all documentation for a seamless application.",
    descAr: "تمنح التأشيرة الذهبية الإماراتية إقامة متجددة لمدة ٥ أو ١٠ سنوات للمستثمرين ورواد الأعمال والمواهب الاستثنائية وأسرهم.",
    process: [
      { en: "Investment Route Assessment",     ar: "تقييم مسار الاستثمار"    },
      { en: "Property / Business Verification",ar: "التحقق من العقار / الأعمال"},
      { en: "Golden Visa Application",         ar: "طلب التأشيرة الذهبية"    },
      { en: "Family Sponsorship Filing",       ar: "تقديم كفالة الأسرة"       },
      { en: "10-Year Residency Issuance",      ar: "إصدار إقامة ١٠ سنوات"    },
    ],
    docs: ["Passport Copy", "Title Deed / Investment Proof", "Bank Statements", "Business License (if applicable)", "Salary Certificate or Proof of Income", "Medical Certificate"],
    docsAr: ["نسخة جواز سفر", "سند الملكية / إثبات الاستثمار", "كشوفات بنكية", "رخصة تجارية (إن وجدت)", "شهادة راتب أو دخل", "شهادة طبية"],
    eligibility: ["Property investment AED 2M+", "Business investment AED 500K+ OR", "Exceptional talent (arts, sports, science)", "Entrepreneurs with approved business"],
    eligibilityAr: ["استثمار عقاري ٢ مليون درهم+", "استثمار أعمال ٥٠٠ ألف درهم+ أو", "موهبة استثنائية (فن، رياضة، علوم)", "رواد أعمال بأعمال معتمدة"],
    countries: ["🇦🇪","🇬🇧","🇺🇸","🇨🇦","🇩🇪","🇦🇺","🇫🇷"],
    time: "3–6 weeks",
    timeAr: "٣–٦ أسابيع",
    fee: "AED 10,000–25,000",
    feeAr: "١٠,٠٠٠–٢٥,٠٠٠ درهم",
  },
  {
    id: "family",
    icon: "👨‍👩‍👧‍👦",
    color: "#F48FB1",
    en: "Family Visa",
    ar: "تأشيرة العائلة",
    tagEn: "Family Reunification · Sponsorship",
    tagAr: "لمّ شمل الأسرة · الكفالة",
    shortEn: "Bring your loved ones to the UAE — spouse, children and parents — with expert family sponsorship.",
    shortAr: "أحضر أحبائك إلى الإمارات — الزوج والأطفال والوالدين — بكفالة عائلية متخصصة.",
    descEn: "UAE residents can sponsor their spouse, children under 18 (and over 18 if studying), and parents. BlueWave manages the entire sponsorship process including relationship verification, medical testing and Emirates ID for each dependant — making family reunification stress-free.",
    descAr: "يمكن للمقيمين في الإمارات كفالة الزوج والأطفال دون ١٨ عاماً والوالدين. تدير بلو ويف عملية الكفالة الكاملة بما في ذلك التحقق من العلاقة والفحوصات الطبية والهوية الإماراتية لكل تابع.",
    process: [
      { en: "Sponsor Eligibility Check",       ar: "فحص أهلية الكفيل"         },
      { en: "Entry Permit for Dependants",     ar: "تصريح دخول للتابعين"       },
      { en: "Medical Fitness (each member)",   ar: "لياقة طبية (كل فرد)"       },
      { en: "Emirates ID for Each Dependant",  ar: "هوية إماراتية لكل تابع"    },
      { en: "Residence Visa Stamping",         ar: "ختم تأشيرة الإقامة"        },
    ],
    docs: ["Sponsor's Residence Visa & EID", "Marriage Certificate (attested)", "Birth Certificates (children)", "Sponsor's Salary Certificate (AED 4,000+)", "Tenancy Contract", "Medical Fitness Reports"],
    docsAr: ["تأشيرة إقامة الكفيل وهويته", "عقد الزواج (مصدق)", "شهادات الميلاد (الأطفال)", "شهادة راتب الكفيل (٤,٠٠٠ درهم+)", "عقد الإيجار", "تقارير اللياقة الطبية"],
    eligibility: ["Monthly salary AED 4,000+ (or AED 3,000 + accommodation)", "Valid UAE residence visa", "Documented family relationship", "Suitable accommodation"],
    eligibilityAr: ["راتب شهري ٤,٠٠٠ درهم+ (أو ٣,٠٠٠ + سكن)", "تأشيرة إقامة إماراتية سارية", "علاقة عائلية موثقة", "سكن مناسب"],
    countries: ["🇦🇪","🇮🇳","🇵🇰","🇧🇩","🇵🇭","🇪🇬","🇯🇴"],
    time: "2–5 weeks",
    timeAr: "٢–٥ أسابيع",
    fee: "AED 5,000–12,000",
    feeAr: "٥,٠٠٠–١٢,٠٠٠ درهم",
  },
];

/* ── All CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

:root{
  --g1:#B8941F;--g2:#D4AF37;--g3:#F5D76E;
  --navy:#06101E;--navy2:#0A1F44;--navy3:#0D2255;
  --teal:#00AEEF;--teal2:#38C8FF;
  --white:#FFFFFF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── Keyframes ── */
@keyframes sv-shimmer {0%{background-position:-700px 0}100%{background-position:700px 0}}
@keyframes sv-fadeUp  {from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes sv-fadeIn  {from{opacity:0}to{opacity:1}}
@keyframes sv-pulse   {0%{box-shadow:0 0 0 0 rgba(212,175,55,.65)}70%{box-shadow:0 0 0 16px rgba(212,175,55,0)}100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}
@keyframes sv-scanLine{0%{left:-40%}100%{left:130%}}
@keyframes sv-marquee {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes sv-float   {0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes sv-borderG {0%,100%{border-color:rgba(212,175,55,.18)}50%{border-color:rgba(212,175,55,.55)}}
@keyframes sv-dotBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
@keyframes sv-expand  {from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
@keyframes sv-stepIn  {from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes sv-tagSlide{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
@keyframes sv-countryPop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}

/* Reveal on scroll */
.sv-reveal{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.sv-reveal.on{opacity:1;transform:none;}

/* ── PAGE WRAPPER ── */
.sv-page{
  background:var(--navy);
  position:relative;overflow:hidden;
  padding-bottom:80px;
}

/* Background grid */
.sv-grid{
  position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(212,175,55,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.028) 1px,transparent 1px);
  background-size:65px 65px;
}

/* Ambient orbs */
.sv-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(70px);}

/* Scan line */
.sv-scan{position:absolute;top:0;height:100%;width:38%;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(212,175,55,.04),transparent);
  animation:sv-scanLine 10s linear infinite;z-index:1;}

/* ── SECTION HEADER ── */
.sv-header{text-align:center;padding:90px 28px 56px;position:relative;z-index:2;}
.sv-eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(212,175,55,.09);border:1px solid rgba(212,175,55,.28);
  border-radius:100px;padding:7px 22px;
  font-family:'Outfit',sans-serif;font-size:.65rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--g2);margin-bottom:22px;
}
.sv-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--g2);animation:sv-dotBlink 2.2s ease-in-out infinite;}
.sv-h1{
  font-family:'Cinzel',serif;font-weight:700;
  font-size:clamp(2.2rem,5.5vw,4.2rem);color:#fff;
  letter-spacing:.02em;line-height:1.1;
}
.sv-h1 .gold{
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:280%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:sv-shimmer 5s linear infinite;
}
.sv-divider{
  width:140px;height:1.5px;margin:16px auto;
  background:linear-gradient(90deg,transparent,var(--g2),var(--g3),var(--g2),transparent);
  background-size:400px;animation:sv-shimmer 3s linear infinite;
}
.sv-h2{
  font-family:'Amiri',serif;font-weight:700;
  font-size:clamp(1.5rem,3.5vw,2.6rem);
  direction:rtl;color:rgba(245,215,110,.82);margin-top:8px;line-height:1.6;
}
.sv-sub{
  font-family:'Outfit',sans-serif;font-weight:300;
  font-size:clamp(.9rem,1.7vw,1.1rem);color:rgba(255,255,255,.62);
  max-width:580px;margin:16px auto 0;line-height:1.9;
}
.sv-sub-ar{
  font-family:'Amiri',serif;font-size:clamp(.88rem,1.5vw,1.04rem);
  direction:rtl;color:rgba(212,175,55,.55);max-width:560px;margin:6px auto 0;line-height:2.1;
}

/* ── MARQUEE STRIP ── */
.sv-marquee-wrap{
  position:relative;z-index:2;overflow:hidden;
  padding:0;margin-bottom:56px;
  border-top:1px solid rgba(212,175,55,.12);
  border-bottom:1px solid rgba(212,175,55,.12);
  background:linear-gradient(90deg,rgba(10,21,64,.95),rgba(13,34,85,.95));
}
.sv-marquee-inner{
  display:flex;align-items:center;gap:0;
  animation:sv-marquee 28s linear infinite;
  width:max-content;
  padding:16px 0;
}
.sv-marquee-inner:hover{animation-play-state:paused;}
.sv-country-chip{
  display:inline-flex;align-items:center;gap:9px;
  padding:7px 22px;margin:0 4px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(212,175,55,.14);
  border-radius:100px;white-space:nowrap;
  transition:background .3s,border-color .3s,transform .3s;cursor:default;
  flex-shrink:0;
}
.sv-country-chip:hover{
  background:rgba(212,175,55,.1);border-color:rgba(212,175,55,.45);
  transform:translateY(-3px);
}
.sv-country-flag{font-size:1.35rem;line-height:1;}
.sv-country-en{font-family:'Outfit',sans-serif;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.75);}
.sv-country-ar{font-family:'Amiri',serif;font-size:.75rem;direction:rtl;color:rgba(212,175,55,.6);}
.sv-marquee-fade-l{position:absolute;top:0;left:0;bottom:0;width:80px;background:linear-gradient(90deg,rgba(10,21,64,.98),transparent);z-index:3;pointer-events:none;}
.sv-marquee-fade-r{position:absolute;top:0;right:0;bottom:0;width:80px;background:linear-gradient(-90deg,rgba(10,21,64,.98),transparent);z-index:3;pointer-events:none;}

/* ── CARDS GRID ── */
.sv-cards-wrap{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 24px;}
.sv-cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
@media(max-width:960px){.sv-cards-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.sv-cards-grid{grid-template-columns:1fr;}}

/* ── SERVICE CARD ── */
.sv-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;overflow:hidden;
  position:relative;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s,border-color .35s,background .35s;
  animation:sv-borderG 4s ease-in-out infinite;
}
.sv-card:hover{
  transform:translateY(-6px);
  border-color:var(--card-c,rgba(212,175,55,.5));
  background:rgba(255,255,255,.065);
  box-shadow:0 20px 55px rgba(0,0,0,.5),0 0 30px rgba(212,175,55,.1),inset 0 1px 0 rgba(255,255,255,.08);
  animation:none;
}
.sv-card.expanded{
  border-color:var(--card-c,rgba(212,175,55,.65)) !important;
  background:rgba(255,255,255,.06) !important;
  box-shadow:0 24px 65px rgba(0,0,0,.55),0 0 40px rgba(212,175,55,.15) !important;
  animation:none !important;
}

/* Glow top accent */
.sv-card-top-glow{
  position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--card-c,#D4AF37),transparent);
  opacity:.7;
}

/* Card radial gradient bg on hover */
.sv-card::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 50% 0%,var(--card-c,#D4AF37) 0%,transparent 65%);
  opacity:0;transition:opacity .4s;pointer-events:none;
}
.sv-card:hover::before,.sv-card.expanded::before{opacity:.055;}

/* ── CARD HEADER (always visible) ── */
.sv-card-head{
  padding:28px 24px 22px;position:relative;cursor:pointer;
  display:flex;flex-direction:column;gap:0;
  user-select:none;
}
.sv-card-icon-row{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.sv-card-icon{
  width:58px;height:58px;border-radius:14px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:1.6rem;flex-shrink:0;
  transition:background .3s,box-shadow .3s,border-color .3s;
}
.sv-card:hover .sv-card-icon,.sv-card.expanded .sv-card-icon{
  background:rgba(255,255,255,.1);
  border-color:var(--card-c,rgba(212,175,55,.5));
  box-shadow:0 0 22px var(--card-c,rgba(212,175,55,.35));
}

.sv-card-badge{
  display:inline-flex;align-items:center;gap:6px;
  font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
  letter-spacing:.2em;text-transform:uppercase;
  color:var(--card-c,#D4AF37);
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);
  border-radius:100px;padding:4px 12px;
  margin-left:auto;align-self:flex-start;
}

.sv-card-en{font-family:'Cinzel',serif;font-weight:700;font-size:1.12rem;color:#fff;letter-spacing:.02em;margin-bottom:4px;}
.sv-card-ar{font-family:'Amiri',serif;font-size:1rem;direction:rtl;color:rgba(212,175,55,.72);margin-bottom:10px;}
.sv-card-tag{font-family:'Outfit',sans-serif;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:10px;}
.sv-card-short{font-family:'Outfit',sans-serif;font-weight:300;font-size:.84rem;color:rgba(255,255,255,.62);line-height:1.7;margin-bottom:10px;}
.sv-card-short-ar{font-family:'Amiri',serif;font-size:.85rem;direction:rtl;color:rgba(212,175,55,.48);line-height:1.9;}

/* Meta row (time + fee) */
.sv-card-meta{display:flex;gap:12px;margin-top:14px;flex-wrap:wrap;}
.sv-meta-chip{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.18);
  border-radius:8px;padding:5px 12px;
}
.sv-meta-chip-icon{font-size:.8rem;}
.sv-meta-chip-text{font-family:'Outfit',sans-serif;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.7);}
.sv-meta-chip-ar{font-family:'Amiri',serif;font-size:.7rem;direction:rtl;color:rgba(212,175,55,.55);}

/* Country mini flags */
.sv-mini-flags{display:flex;gap:5px;margin-top:12px;flex-wrap:wrap;align-items:center;}
.sv-mini-flag{font-size:1.2rem;cursor:default;transition:transform .2s;display:inline-block;}
.sv-mini-flag:hover{transform:scale(1.3);}
.sv-mini-flags-label{font-family:'Outfit',sans-serif;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(212,175,55,.45);margin-right:4px;}

/* Toggle button */
.sv-toggle-btn{
  display:flex;align-items:center;justify-content:center;gap:8px;
  margin:16px 24px 20px;
  padding:11px 0;border-radius:10px;
  font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;
  letter-spacing:.16em;text-transform:uppercase;
  cursor:pointer;border:none;
  background:linear-gradient(135deg,rgba(212,175,55,.12),rgba(212,175,55,.08));
  border:1px solid rgba(212,175,55,.22);
  color:var(--card-c,#D4AF37);
  transition:all .3s ease;position:relative;overflow:hidden;
}
.sv-toggle-btn::before{
  content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;
  background:linear-gradient(110deg,transparent,rgba(255,255,255,.18),transparent);
  transition:left .5s;pointer-events:none;
}
.sv-toggle-btn:hover::before{left:160%;}
.sv-toggle-btn:hover{
  background:linear-gradient(135deg,rgba(212,175,55,.2),rgba(212,175,55,.14));
  border-color:rgba(212,175,55,.5);
  box-shadow:0 6px 22px rgba(212,175,55,.2);
}
.sv-toggle-btn.open{
  background:linear-gradient(135deg,var(--card-c,#D4AF37) 0%,rgba(212,175,55,.8));
  color:var(--navy);font-weight:700;border-color:transparent;
  box-shadow:0 8px 28px rgba(212,175,55,.35);
}
.sv-toggle-arrow{
  display:inline-block;transition:transform .4s cubic-bezier(.34,1.56,.64,1);font-size:.8rem;
}
.sv-toggle-btn.open .sv-toggle-arrow{transform:rotate(180deg);}

/* ── EXPANDED PANEL ── */
.sv-expand-panel{
  overflow:hidden;
  max-height:0;
  transition:max-height .55s cubic-bezier(.4,0,.2,1),opacity .35s ease;
  opacity:0;
}
.sv-expand-panel.open{
  max-height:1400px;opacity:1;
}

.sv-expand-inner{
  padding:0 24px 28px;
  animation:sv-expand .45s cubic-bezier(.22,1,.36,1) both;
}
.sv-exp-divider{
  height:1px;margin:0 0 24px;
  background:linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent);
}

/* Description */
.sv-exp-desc{font-family:'Outfit',sans-serif;font-weight:300;font-size:.9rem;color:rgba(255,255,255,.68);line-height:1.9;margin-bottom:8px;}
.sv-exp-desc-ar{font-family:'Amiri',serif;font-size:.9rem;direction:rtl;color:rgba(212,175,55,.52);line-height:2;margin-bottom:22px;}

/* Section label inside expanded */
.sv-exp-label{
  font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
  letter-spacing:.22em;text-transform:uppercase;color:var(--card-c,#D4AF37);
  margin-bottom:13px;display:flex;align-items:center;gap:8px;
}
.sv-exp-label::before{content:'';width:20px;height:1.5px;background:linear-gradient(90deg,var(--g1),var(--g2));flex-shrink:0;}

/* Process steps */
.sv-steps{display:flex;flex-direction:column;gap:10px;margin-bottom:22px;}
.sv-step{
  display:flex;align-items:flex-start;gap:13px;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
  border-radius:10px;padding:11px 14px;
  animation:sv-stepIn .4s ease both;
  transition:background .3s,border-color .3s;
}
.sv-step:hover{background:rgba(212,175,55,.06);border-color:rgba(212,175,55,.22);}
.sv-step-num{
  width:26px;height:26px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,var(--g1),var(--g2));
  display:flex;align-items:center;justify-content:center;
  font-family:'Cinzel',serif;font-size:.68rem;font-weight:700;color:var(--navy);
  box-shadow:0 3px 10px rgba(212,175,55,.35);
}
.sv-step-en{font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:400;color:rgba(255,255,255,.8);}
.sv-step-ar{font-family:'Amiri',serif;font-size:.8rem;direction:rtl;color:rgba(212,175,55,.55);margin-top:2px;}

/* Two-column layout for docs + eligibility */
.sv-exp-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:22px;}
@media(max-width:520px){.sv-exp-cols{grid-template-columns:1fr;}}

.sv-exp-col-card{
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);
  border-radius:12px;padding:16px;
}
.sv-checklist{display:flex;flex-direction:column;gap:8px;}
.sv-check-item{display:flex;gap:9px;align-items:flex-start;}
.sv-check-icon{width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;
  background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);
  display:flex;align-items:center;justify-content:center;font-size:.6rem;color:var(--g2);}
.sv-check-en{font-family:'Outfit',sans-serif;font-size:.78rem;color:rgba(255,255,255,.72);}
.sv-check-ar{font-family:'Amiri',serif;font-size:.78rem;direction:rtl;color:rgba(212,175,55,.5);margin-top:2px;}

/* Country detail chips inside expanded */
.sv-country-detail{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:22px;}
.sv-cdet-chip{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);
  border-radius:10px;padding:7px 14px;
  transition:background .3s,border-color .3s,transform .25s;cursor:default;
}
.sv-cdet-chip:hover{
  background:rgba(212,175,55,.08);border-color:rgba(212,175,55,.35);
  transform:translateY(-2px);
}
.sv-cdet-flag{font-size:1.4rem;line-height:1;}
.sv-cdet-en{font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.06em;color:rgba(255,255,255,.8);}
.sv-cdet-ar{font-family:'Amiri',serif;font-size:.72rem;direction:rtl;color:rgba(212,175,55,.55);}

/* CTA row inside expanded */
.sv-exp-cta{
  display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;
}
.sv-exp-btn-gold{
  font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--navy);
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));
  background-size:280%;border:none;border-radius:6px;padding:12px 28px;
  cursor:pointer;position:relative;overflow:hidden;
  animation:sv-pulse 3s ease-out infinite,sv-shimmer 5s linear infinite;
  transition:transform .25s,box-shadow .3s;
}
.sv-exp-btn-gold::before{
  content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;
  background:linear-gradient(110deg,transparent,rgba(255,255,255,.38),transparent);
  transition:left .5s;pointer-events:none;
}
.sv-exp-btn-gold:hover::before{left:160%;}
.sv-exp-btn-gold:hover{transform:translateY(-2px);animation:none;background-position:right;box-shadow:0 10px 30px rgba(212,175,55,.5);}
.sv-exp-btn-ar{
  font-family:'Amiri',serif;font-size:1rem;direction:rtl;color:var(--g2);
  background:transparent;border:1.5px solid rgba(212,175,55,.38);border-radius:6px;
  padding:11px 24px;cursor:pointer;transition:all .3s;
}
.sv-exp-btn-ar:hover{background:rgba(212,175,55,.09);border-color:var(--g2);color:var(--g3);transform:translateY(-2px);}

/* ── CTA BOTTOM STRIP ── */
.sv-cta-strip{
  text-align:center;padding:56px 28px;position:relative;z-index:2;
}
.sv-cta-strip-h{
  font-family:'Cinzel',serif;font-weight:700;font-size:clamp(1.5rem,3.2vw,2.5rem);
  color:#fff;margin-bottom:8px;
}
.sv-cta-strip-h .gold{
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3));background-size:220%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:sv-shimmer 4s linear infinite;
}
.sv-cta-strip-ar{font-family:'Amiri',serif;font-size:clamp(1.1rem,2.2vw,1.6rem);direction:rtl;color:rgba(245,215,110,.7);margin-bottom:28px;}
.sv-cta-strip-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;}
.sv-strip-btn-gold{
  font-family:'Outfit',sans-serif;font-size:.73rem;font-weight:600;letter-spacing:.17em;
  text-transform:uppercase;color:var(--navy);
  background:linear-gradient(135deg,var(--g1),var(--g2),var(--g3),var(--g2));background-size:280%;
  border:none;border-radius:4px;padding:14px 36px;cursor:pointer;position:relative;overflow:hidden;
  animation:sv-pulse 3s ease-out infinite,sv-shimmer 5s linear infinite;transition:transform .25s,box-shadow .3s;
}
.sv-strip-btn-gold::before{content:'';position:absolute;top:0;left:-80%;width:55%;height:100%;background:linear-gradient(110deg,transparent,rgba(255,255,255,.4),transparent);transition:left .5s;}
.sv-strip-btn-gold:hover::before{left:160%;}
.sv-strip-btn-gold:hover{transform:translateY(-3px);animation:none;background-position:right;box-shadow:0 12px 36px rgba(212,175,55,.55);}
.sv-strip-btn-ar{font-family:'Amiri',serif;font-size:1.05rem;direction:rtl;color:var(--g2);background:transparent;border:1.5px solid rgba(212,175,55,.4);border-radius:4px;padding:13px 32px;cursor:pointer;transition:all .3s;}
.sv-strip-btn-ar:hover{background:rgba(212,175,55,.09);border-color:var(--g2);color:var(--g3);transform:translateY(-3px);}

@media(max-width:520px){
  .sv-header{padding:70px 18px 44px;}
  .sv-cards-wrap{padding:0 14px;}
  .sv-card-head{padding:22px 18px 18px;}
  .sv-expand-inner{padding:0 18px 24px;}
  .sv-toggle-btn{margin:12px 18px 16px;}
}
`;

/* ── Country full list for expanded panel ─────────────────────────────── */
const ALL_COUNTRIES = COUNTRIES;

/* ── Card Component ─────────────────────────────────────────────────────── */
function ServiceCard({ svc, index }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useReveal();

  /* find country objects for this service */
  const svcCountries = svc.countries
    .map(f => ALL_COUNTRIES.find(c => c.flag === f))
    .filter(Boolean);

  return (
    <div
      ref={ref}
      className={`sv-card sv-reveal${vis ? " on" : ""}${open ? " expanded" : ""}`}
      style={{
        "--card-c": svc.color,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Top glow accent */}
      <div className="sv-card-top-glow" />

      {/* ── Card Header (clickable) ── */}
      <div className="sv-card-head" onClick={() => setOpen(o => !o)}>
        <div className="sv-card-icon-row">
          <div className="sv-card-icon">{svc.icon}</div>
          <div className="sv-card-badge">
            <span style={{width:5,height:5,borderRadius:"50%",background:svc.color,display:"inline-block",animation:"sv-dotBlink 2s infinite"}}/>
            {svc.tagEn.split("·")[0].trim()}
          </div>
        </div>

        <div className="sv-card-en">{svc.en}</div>
        <div className="sv-card-ar">{svc.ar}</div>
        <div className="sv-card-tag">{svc.tagEn} · {svc.tagAr}</div>
        <div className="sv-card-short">{svc.shortEn}</div>
        <div className="sv-card-short-ar">{svc.shortAr}</div>

        {/* Meta chips */}
        <div className="sv-card-meta">
          <div className="sv-meta-chip">
            <span className="sv-meta-chip-icon">⏱</span>
            <div>
              <div className="sv-meta-chip-text">{svc.time}</div>
              <div className="sv-meta-chip-ar">{svc.timeAr}</div>
            </div>
          </div>
          <div className="sv-meta-chip">
            <span className="sv-meta-chip-icon">💳</span>
            <div>
              <div className="sv-meta-chip-text">{svc.fee}</div>
              <div className="sv-meta-chip-ar">{svc.feeAr}</div>
            </div>
          </div>
        </div>

        {/* Mini country flags */}
        <div className="sv-mini-flags">
          <span className="sv-mini-flags-label">Serves:</span>
          {svc.countries.map((f, i) => (
            <span key={i} className="sv-mini-flag" title={ALL_COUNTRIES.find(c=>c.flag===f)?.en}>{f}</span>
          ))}
        </div>
      </div>

      {/* Toggle button */}
      <button
        className={`sv-toggle-btn${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        style={{ "--card-c": svc.color }}
      >
        {open ? "Hide Details · إخفاء التفاصيل" : "View Full Details · عرض التفاصيل الكاملة"}
        <span className="sv-toggle-arrow">▼</span>
      </button>

      {/* ── Expandable Panel ── */}
      <div className={`sv-expand-panel${open ? " open" : ""}`}>
        <div className="sv-expand-inner">
          <div className="sv-exp-divider" />

          {/* Full description */}
          <p className="sv-exp-desc">{svc.descEn}</p>
          <p className="sv-exp-desc-ar">{svc.descAr}</p>

          {/* Application Process */}
          <div className="sv-exp-label">Application Process · خطوات التقديم</div>
          <div className="sv-steps">
            {svc.process.map((p, i) => (
              <div className="sv-step" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="sv-step-num">{i + 1}</div>
                <div>
                  <div className="sv-step-en">{p.en}</div>
                  <div className="sv-step-ar">{p.ar}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Docs + Eligibility in 2 cols */}
          <div className="sv-exp-cols">
            <div className="sv-exp-col-card">
              <div className="sv-exp-label" style={{ marginBottom: 12 }}>Documents Required · المستندات المطلوبة</div>
              <div className="sv-checklist">
                {svc.docs.map((d, i) => (
                  <div className="sv-check-item" key={i}>
                    <div className="sv-check-icon">✓</div>
                    <div>
                      <div className="sv-check-en">{d}</div>
                      <div className="sv-check-ar">{svc.docsAr[i]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sv-exp-col-card">
              <div className="sv-exp-label" style={{ marginBottom: 12 }}>Eligibility · الأهلية</div>
              <div className="sv-checklist">
                {svc.eligibility.map((e, i) => (
                  <div className="sv-check-item" key={i}>
                    <div className="sv-check-icon" style={{ background: "rgba(129,199,132,.15)", borderColor: "rgba(129,199,132,.3)", color: "#81C784" }}>★</div>
                    <div>
                      <div className="sv-check-en">{e}</div>
                      <div className="sv-check-ar">{svc.eligibilityAr[i]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Countries served (detailed) */}
          <div className="sv-exp-label">Countries We Serve · الدول التي نخدمها</div>
          <div className="sv-country-detail">
            {svcCountries.map((c, i) => (
              <div className="sv-cdet-chip" key={i}>
                <span className="sv-cdet-flag">{c.flag}</span>
                <div>
                  <div className="sv-cdet-en">{c.en}</div>
                  <div className="sv-cdet-ar">{c.ar}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="sv-exp-cta">
            <button
              className="sv-exp-btn-gold"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Apply for {svc.en}
            </button>
            <button
              className="sv-exp-btn-ar"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              تقدم الآن · {svc.ar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const cssInj = useRef(false);
  const [hRef, hVis] = useReveal();

  useEffect(() => {
    if (cssInj.current) return;
    const t = document.createElement("style");
    t.textContent = CSS;
    document.head.appendChild(t);
    cssInj.current = true;
  }, []);

  /* Duplicate countries for infinite marquee */
  const marqueeDup = [...COUNTRIES, ...COUNTRIES];

  return (
    <section id="services" className="sv-page">
      {/* Background decorations */}
      <div className="sv-grid" />
      <div className="sv-scan" />
      <div className="sv-orb" style={{top:"10%",left:"5%",width:420,height:420,background:"radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",animation:"sv-float 11s ease-in-out infinite"}}/>
      <div className="sv-orb" style={{bottom:"20%",right:"4%",width:500,height:400,background:"radial-gradient(circle,rgba(0,174,239,.055) 0%,transparent 70%)",animation:"sv-float 14s 3s ease-in-out infinite"}}/>

      {/* ── Section Header ── */}
      <div className={`sv-header sv-reveal${hVis ? " on" : ""}`} ref={hRef}>
        <div className="sv-eyebrow">
          <span className="sv-eyebrow-dot" />
          BlueWave Consultation · خدمات بلو ويف
          <span className="sv-eyebrow-dot" style={{animationDelay:".7s"}}/>
        </div>
        <h2 className="sv-h1">
          Our Premium <span className="gold">Services</span>
        </h2>
        <div className="sv-divider" />
        <div className="sv-h2">خدماتنا المتميزة</div>
        <p className="sv-sub">
          From study and work visas to Golden Visa investment routes — every immigration
          pathway handled with expert precision, bilingual support and Dubai-class service.
        </p>
        <p className="sv-sub-ar">
          من تأشيرات الدراسة والعمل إلى مسارات التأشيرة الذهبية — كل مسار هجرة يُعالج بدقة خبراء وخدمة بمستوى دبي.
        </p>
      </div>

      {/* ── Country Marquee Strip ── */}
      <div className="sv-marquee-wrap">
        <div className="sv-marquee-fade-l" />
        <div className="sv-marquee-fade-r" />
        <div className="sv-marquee-inner">
          {marqueeDup.map((c, i) => (
            <div className="sv-country-chip" key={i}>
              <span className="sv-country-flag">{c.flag}</span>
              <div>
                <div className="sv-country-en">{c.en}</div>
                <div className="sv-country-ar">{c.ar}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="sv-cards-wrap">
        <div className="sv-cards-grid">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA Strip ── */}
      <div className="sv-cta-strip">
        <div className="sv-divider" style={{marginBottom:28}}/>
        <h3 className="sv-cta-strip-h">
          Not Sure Which Visa? <span className="gold">We'll Guide You.</span>
        </h3>
        <div className="sv-cta-strip-ar">لست متأكداً من التأشيرة المناسبة؟ سنرشدك</div>
        <div className="sv-cta-strip-btns">
          <button className="sv-strip-btn-gold"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
            Get Free Consultation
          </button>
          <button className="sv-strip-btn-ar"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}>
            احصل على استشارة مجانية
          </button>
        </div>
        <div className="sv-divider" style={{marginTop:28}}/>
      </div>
    </section>
  );
}