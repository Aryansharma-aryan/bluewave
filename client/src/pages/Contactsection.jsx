import React from "react";
import { useEffect, useRef, useState } from "react";

const PHONE      = "+971 50 658 0557";
const PHONE_LINK = "tel:+971506580557";
const WA_LINK    = "https://wa.me/971506580557";
const EMAIL      = "info@bluewaveconsultation.com";

// AJMAN
const MAPS_LINK_AJMAN = "https://maps.google.com/?q=Amber+Gem+Tower+Ajman+UAE";
const MAP_EMBED_AJMAN = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.3!2d55.4373!3d25.4078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5679b79cbc61%3A0x76d61b4adb0dae78!2sAmber%20Gem%20Tower%2C%20Ajman!5e0!3m2!1sen!2sae!4v1710000000000";

// DUBAI — replace with your real address & embed link
const MAPS_LINK_DUBAI = "https://maps.google.com/?q=Business+Bay+Dubai+UAE";
const MAP_EMBED_DUBAI = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2!2d55.2650!3d25.1850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69291da7a9b5%3A0x8e35e6e9b8e3a2e1!2sBusiness+Bay%2C+Dubai!5e0!3m2!1sen!2sae!4v1710000000001";

// ─── All UI strings in one object — easy to edit ────────────────────────────
const T = {
  en: {
    eyebrow:      "Get In Touch",
    h2a:          "Visit Us or Reach Out —",
    h2b:          "We're Here to Help.",
    sub:          "Our consultants are available 6 days a week at our Ajman & Dubai offices. Walk in, call, or message us anytime.",
    chips: [
      { label: "Call Us",      sub: PHONE },
      { label: "WhatsApp",     sub: "Quick reply" },
      { label: "Email Us",     sub: EMAIL },
      { label: "Our Offices",  sub: "Ajman & Dubai" },
    ],
    officeAddress: "Office Address",
    workingHours:  "Working Hours",
    satThu:        "Saturday – Thursday",
    hours:         "9:00 AM – 5:30 PM",
    friday:        "Friday",
    closed:        "Closed",
    whatsapp:      "WhatsApp Us Now",
    openMaps:      "Open in Google Maps ↗",
    trust: [
      { num: "15+",  lbl: "Years"    },
      { num: "98%",  lbl: "Approval" },
      { num: "12K+", lbl: "Families" },
    ],
    offices: [
      {
        city:      "Ajman",
        flag:      "🇦🇪",
        tag:       "Office No. CWS-1V-224954",
        lines:     ["26th Floor, Amber Gem Tower", "Sheikh Khalifa Street, Ajman", "United Arab Emirates"],
        badgeName: "📍 Amber Gem Tower, Ajman",
        badgeAddr: "26th Floor · Sheikh Khalifa Street · UAE",
        mapsLink:  MAPS_LINK_AJMAN,
        mapEmbed:  MAP_EMBED_AJMAN,
      },
      {
        city:      "Dubai",
        flag:      "🏙️",
        tag:       "Office No. — Update Soon",  // ⚠️ replace with real number
        lines:     ["Business Bay, Dubai", "Sheikh Zayed Road", "United Arab Emirates"],
        badgeName: "📍 Business Bay, Dubai",
        badgeAddr: "Sheikh Zayed Road · UAE",
        mapsLink:  MAPS_LINK_DUBAI,
        mapEmbed:  MAP_EMBED_DUBAI,
      },
    ],
  },
  ar: {
    eyebrow:      "تواصل معنا",
    h2a:          "زورنا أو تواصل معنا —",
    h2b:          "نحن هنا لمساعدتك.",
    sub:          "مستشارونا متاحون 6 أيام في الأسبوع في مكاتبنا بعجمان ودبي. تفضل بالزيارة أو اتصل أو راسلنا في أي وقت.",
    chips: [
      { label: "اتصل بنا",   sub: PHONE },
      { label: "واتساب",     sub: "رد سريع" },
      { label: "راسلنا",     sub: EMAIL },
      { label: "مكاتبنا",    sub: "عجمان ودبي" },
    ],
    officeAddress: "عنوان المكتب",
    workingHours:  "ساعات العمل",
    satThu:        "السبت – الخميس",
    hours:         "٩:٠٠ ص – ٥:٣٠ م",
    friday:        "الجمعة",
    closed:        "مغلق",
    whatsapp:      "تواصل عبر واتساب",
    openMaps:      "فتح في خرائط جوجل ↗",
    trust: [
      { num: "15+",  lbl: "سنة"   },
      { num: "98%",  lbl: "قبول"  },
      { num: "12K+", lbl: "عائلة" },
    ],
    offices: [
      {
        city:      "عجمان",
        flag:      "🇦🇪",
        tag:       "رقم المكتب: CWS-1V-224954",
        lines:     ["الطابق السادس والعشرون، برج أمبر جيم", "شارع الشيخ خليفة، عجمان", "الإمارات العربية المتحدة"],
        badgeName: "📍 برج أمبر جيم، عجمان",
        badgeAddr: "الطابق السادس والعشرون · شارع الشيخ خليفة",
        mapsLink:  MAPS_LINK_AJMAN,
        mapEmbed:  MAP_EMBED_AJMAN,
      },
      {
        city:      "دبي",
        flag:      "🏙️",
        tag:       "رقم المكتب — قريباً",        // ⚠️ replace with real number
        lines:     ["الخليج التجاري، دبي", "شارع الشيخ زايد", "الإمارات العربية المتحدة"],
        badgeName: "📍 الخليج التجاري، دبي",
        badgeAddr: "شارع الشيخ زايد · الإمارات",
        mapsLink:  MAPS_LINK_DUBAI,
        mapEmbed:  MAP_EMBED_DUBAI,
      },
    ],
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
function PhoneIcon({ size = 20, color }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.5 19.79 19.79 0 01.77 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0122 16.92z" /></svg>); }
function WAIcon({ size = 20, color }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>); }
function MailIcon({ size = 20, color }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>); }
function PinIcon({ size = 20, color }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>); }
function ClockIcon({ size = 20, color }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>); }

const CHIP_ICONS  = [PhoneIcon, WAIcon, MailIcon, PinIcon];
const CHIP_COLORS = ["#3B82F6", "#22C55E", "#A78BFA", "#F59E0B"];
const CHIP_HREFS  = [PHONE_LINK, WA_LINK, `mailto:${EMAIL}`, MAPS_LINK_AJMAN];

let cssInjected = false;
function injectCSS(css) { if (cssInjected) return; cssInjected = true; const el = document.createElement("style"); el.textContent = css; document.head.appendChild(el); }

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const ref = useRef(false);
  const [pinPulse, setPinPulse]         = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  const [lang, setLang]                 = useState("en");

  useEffect(() => { if (ref.current) return; ref.current = true; injectCSS(CSS); }, []);
  useEffect(() => { const t = setTimeout(() => setPinPulse(true), 800); return () => clearTimeout(t); }, []);

  const t      = T[lang];
  const isAr   = lang === "ar";
  const office = t.offices[activeOffice];

  const switchOffice = (i) => {
    setActiveOffice(i);
    setPinPulse(false);
    setTimeout(() => setPinPulse(true), 200);
  };

  return (
    <section id="contact" className="cs-root" dir={isAr ? "rtl" : "ltr"}>
      <div className="cs-bg-gradient" />
      <div className="cs-bg-grid" />
      <div className="cs-glow cs-glow-1" />
      <div className="cs-glow cs-glow-2" />
      <div className="cs-glow cs-glow-3" />

      {/* ── Language Toggle ── */}
      <div className="cs-lang-toggle">
        <button className={`cs-lang-btn${!isAr ? " cs-lang-active" : ""}`} onClick={() => setLang("en")}>EN</button>
        <button className={`cs-lang-btn${ isAr ? " cs-lang-active" : ""}`} onClick={() => setLang("ar")}>عربي</button>
      </div>

      {/* ── Header ── */}
      <div className="cs-header">
        <div className="cs-eyebrow"><span className="cs-dot" />{t.eyebrow}</div>
        <h2 className="cs-h2">
          {t.h2a}<br /><span className="cs-h2-accent">{t.h2b}</span>
        </h2>
        <p className="cs-sub">{t.sub}</p>
      </div>

      {/* ── Quick-contact chips ── */}
      <div className="cs-chips-wrap">
        {t.chips.map((q, i) => {
          const Icon = CHIP_ICONS[i];
          return (
            <a key={i} href={CHIP_HREFS[i]}
              target={CHIP_HREFS[i].startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="cs-chip" style={{ "--cc": CHIP_COLORS[i] }}>
              <div className="cs-chip-icon"><Icon size={20} color={CHIP_COLORS[i]} /></div>
              <div>
                <div className="cs-chip-label">{q.label}</div>
                <div className="cs-chip-sub">{q.sub}</div>
              </div>
              <svg className="cs-chip-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={CHIP_COLORS[i]} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          );
        })}
      </div>

      {/* ── Office Tabs ── */}
      <div className="cs-office-tabs">
        {t.offices.map((o, i) => (
          <button key={i}
            className={`cs-office-tab${activeOffice === i ? " cs-tab-active" : ""}`}
            onClick={() => switchOffice(i)}>
            <span className="cs-tab-flag">{o.flag}</span>
            <span>{o.city}</span>
            {activeOffice === i && <span className="cs-tab-dot" />}
          </button>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="cs-bottom-grid">

        {/* Map */}
        <div className="cs-map-col">
          <div className="cs-map-wrap">
            <div className="cs-map-rule" />
            <iframe key={`${activeOffice}-${lang}`}
              className="cs-map-frame"
              src={office.mapEmbed}
              title={`BlueWave ${office.city}`}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />
            <div className={`cs-pin-wrap${pinPulse ? " cs-pin-active" : ""}`}>
              <div className="cs-pin-ring cs-ring-1" />
              <div className="cs-pin-ring cs-ring-2" />
              <div className="cs-pin-dot"><PinIcon size={18} color="#fff" /></div>
            </div>
            <div className="cs-map-badge">
              <div className="cs-map-badge-name">{office.badgeName}</div>
              <div className="cs-map-badge-addr">{office.badgeAddr}</div>
            </div>
            <a href={office.mapsLink} target="_blank" rel="noopener noreferrer" className="cs-map-open">
              {t.openMaps}
            </a>
          </div>
        </div>

        {/* Address panel */}
        <div className="cs-addr-col">

          {/* Office address */}
          <div className="cs-addr-block">
            <div className="cs-addr-icon-row">
              <div className="cs-addr-icon-wrap"><PinIcon size={18} color="#D4AF37" /></div>
              <span className="cs-addr-title">{t.officeAddress}</span>
            </div>
            <div className="cs-addr-lines">
              <div className="cs-addr-office-tag">{office.tag}</div>
              {office.lines.map((l, i) => <div key={i} className="cs-addr-line">{l}</div>)}
            </div>
          </div>

          <div className="cs-addr-divider" />

          {/* Working hours */}
          <div className="cs-hours-block">
            <div className="cs-addr-icon-row">
              <div className="cs-addr-icon-wrap"><ClockIcon size={18} color="#D4AF37" /></div>
              <span className="cs-addr-title">{t.workingHours}</span>
            </div>
            <div className="cs-hours-list">
              <div className="cs-hours-row">
                <span className="cs-hours-day">{t.satThu}</span>
                <span className="cs-hours-time cs-open">{t.hours}</span>
              </div>
              <div className="cs-hours-row">
                <span className="cs-hours-day">{t.friday}</span>
                <span className="cs-hours-time cs-closed">{t.closed}</span>
              </div>
            </div>
          </div>

          <div className="cs-addr-divider" />

          {/* Action buttons */}
          <div className="cs-action-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cs-btn-primary">
              <WAIcon size={17} color="#080D1A" />{t.whatsapp}
            </a>
            <a href={PHONE_LINK} className="cs-btn-secondary">
              <PhoneIcon size={17} color="#D4AF37" />{PHONE}
            </a>
          </div>

          {/* Trust stats */}
          <div className="cs-trust-row">
            {t.trust.map(({ num, lbl }, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="cs-trust-sep" />}
                <div className="cs-trust-item">
                  <span className="cs-trust-num">{num}</span>
                  <span className="cs-trust-lbl">{lbl}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
      <div className="cs-bottom-bar" />
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500&family=Tajawal:wght@300;400;500;700;800&display=swap');

.cs-root { position:relative; font-family:'Poppins',sans-serif; overflow:hidden; }
.cs-root[dir="rtl"] { font-family:'Tajawal',sans-serif; }

.cs-bg-gradient { position:absolute; inset:0; z-index:0; background:linear-gradient(145deg,#0A0E1A 0%,#0D1628 25%,#101D35 50%,#0C1628 75%,#080D1A 100%); }
.cs-bg-grid { position:absolute; inset:0; z-index:0; pointer-events:none; background-image:linear-gradient(rgba(212,175,55,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.04) 1px,transparent 1px); background-size:60px 60px; }
.cs-glow { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(90px); }
.cs-glow-1 { width:500px; height:500px; top:-100px; right:-100px; background:radial-gradient(circle,rgba(212,175,55,.10) 0%,transparent 70%); animation:csGlow 20s ease-in-out infinite; }
.cs-glow-2 { width:400px; height:400px; bottom:0; left:-80px; background:radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%); animation:csGlow 26s ease-in-out infinite reverse; }
.cs-glow-3 { width:300px; height:300px; top:40%; left:40%; background:radial-gradient(circle,rgba(220,38,38,.06) 0%,transparent 70%); animation:csGlow 18s 3s ease-in-out infinite; }
@keyframes csGlow { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(-12px,-18px)} }

/* Lang toggle */
.cs-lang-toggle { position:absolute; top:24px; right:24px; z-index:10; display:flex; gap:4px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:4px; }
[dir="rtl"] .cs-lang-toggle { right:auto; left:24px; }
.cs-lang-btn { font-family:'Montserrat',sans-serif; font-size:.68rem; font-weight:700; letter-spacing:.08em; color:#64748B; background:transparent; border:none; border-radius:5px; padding:6px 14px; cursor:pointer; transition:all .2s; }
.cs-lang-active { color:#080D1A !important; background:linear-gradient(135deg,#D4AF37,#F5D76E) !important; }

/* Header */
.cs-header { position:relative; z-index:2; text-align:center; padding:96px 24px 40px; animation:csFadeUp .8s cubic-bezier(.16,1,.3,1) both; }
@keyframes csFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
.cs-eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'Montserrat',sans-serif; font-size:.62rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:#D4AF37; background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.2); padding:7px 20px; border-radius:2px; margin-bottom:22px; }
[dir="rtl"] .cs-eyebrow { font-family:'Tajawal',sans-serif; letter-spacing:.05em; font-size:.9rem; text-transform:none; }
.cs-dot { width:6px; height:6px; border-radius:50%; background:#D4AF37; animation:csDot 2s ease-in-out infinite; }
@keyframes csDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.55)} }
.cs-h2 { font-family:'Merriweather',serif; font-size:clamp(2.2rem,4.8vw,3.8rem); font-weight:900; line-height:1.15; color:#fff; letter-spacing:-.02em; margin:0 0 16px; }
[dir="rtl"] .cs-h2 { font-family:'Tajawal',sans-serif; font-weight:800; letter-spacing:0; }
.cs-h2-accent { background:linear-gradient(135deg,#A17C1A,#D4AF37,#F5D76E); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; background-size:200%; animation:csShimmer 4s linear infinite; }
@keyframes csShimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
.cs-sub { font-size:1rem; font-weight:300; color:#94A3B8; max-width:520px; margin:0 auto; line-height:1.85; }
[dir="rtl"] .cs-sub { font-size:1.05rem; }

/* Chips */
.cs-chips-wrap { position:relative; z-index:2; max-width:1200px; margin:0 auto 24px; padding:0 24px; display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
@media(max-width:900px){ .cs-chips-wrap{grid-template-columns:repeat(2,1fr)} }
@media(max-width:520px){ .cs-chips-wrap{grid-template-columns:1fr} }
.cs-chip { display:flex; align-items:center; gap:14px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:16px 18px; text-decoration:none; transition:transform .28s cubic-bezier(.34,1.56,.64,1),background .25s,border-color .25s,box-shadow .28s; position:relative; overflow:hidden; }
.cs-chip::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--cc); transform:scaleX(0); transform-origin:left; transition:transform .3s cubic-bezier(.16,1,.3,1); }
[dir="rtl"] .cs-chip::before { transform-origin:right; }
.cs-chip:hover::before { transform:scaleX(1); }
.cs-chip:hover { transform:translateY(-5px); background:rgba(255,255,255,.07); border-color:color-mix(in srgb,var(--cc) 40%,transparent); box-shadow:0 16px 40px rgba(0,0,0,.4),0 0 28px color-mix(in srgb,var(--cc) 15%,transparent); }
.cs-chip-icon { width:44px; height:44px; border-radius:10px; flex-shrink:0; background:color-mix(in srgb,var(--cc) 12%,transparent); border:1px solid color-mix(in srgb,var(--cc) 25%,transparent); display:flex; align-items:center; justify-content:center; transition:transform .28s; }
.cs-chip:hover .cs-chip-icon { transform:scale(1.08) rotate(-4deg); }
.cs-chip-label { font-family:'Montserrat',sans-serif; font-size:.82rem; font-weight:700; color:#fff; margin-bottom:2px; }
[dir="rtl"] .cs-chip-label { font-family:'Tajawal',sans-serif; font-size:1rem; }
.cs-chip-sub { font-size:.72rem; font-weight:300; color:#64748B; word-break:break-all; }
[dir="rtl"] .cs-chip-sub { font-size:.82rem; }
.cs-chip-arrow { margin-left:auto; flex-shrink:0; opacity:.5; transition:opacity .2s,transform .2s; }
[dir="rtl"] .cs-chip-arrow { margin-left:0; margin-right:auto; transform:scaleX(-1); }
.cs-chip:hover .cs-chip-arrow { opacity:1; transform:translate(2px,-2px); }
[dir="rtl"] .cs-chip:hover .cs-chip-arrow { transform:scaleX(-1) translate(-2px,-2px); }

/* Office tabs */
.cs-office-tabs { position:relative; z-index:2; max-width:1200px; margin:0 auto 20px; padding:0 24px; display:flex; gap:10px; }
.cs-office-tab { display:inline-flex; align-items:center; gap:8px; font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:700; letter-spacing:.08em; color:#64748B; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:10px; padding:10px 20px; cursor:pointer; transition:all .25s; }
[dir="rtl"] .cs-office-tab { font-family:'Tajawal',sans-serif; font-size:.95rem; letter-spacing:.02em; }
.cs-office-tab:hover { color:#fff; background:rgba(255,255,255,.08); }
.cs-tab-active { color:#D4AF37!important; background:rgba(212,175,55,.1)!important; border-color:rgba(212,175,55,.35)!important; }
.cs-tab-flag { font-size:1rem; }
.cs-tab-dot { width:6px; height:6px; border-radius:50%; background:#D4AF37; animation:csDot 2s ease-in-out infinite; margin-left:2px; }
[dir="rtl"] .cs-tab-dot { margin-left:0; margin-right:2px; }

/* Grid */
.cs-bottom-grid { position:relative; z-index:2; max-width:1200px; margin:0 auto; padding:0 24px 80px; display:grid; grid-template-columns:1.3fr 1fr; gap:24px; align-items:start; }
@media(max-width:960px){ .cs-bottom-grid{grid-template-columns:1fr} }

/* Map */
.cs-map-wrap { position:relative; border-radius:18px; overflow:hidden; border:1px solid rgba(212,175,55,.22); box-shadow:0 24px 70px rgba(0,0,0,.55); height:420px; }
.cs-map-rule { position:absolute; top:0; left:0; right:0; height:3px; z-index:3; background:linear-gradient(90deg,transparent,#D4AF37,#F5D76E,#D4AF37,transparent); background-size:400px; animation:csShimmer 3s linear infinite; }
.cs-map-frame { width:100%; height:100%; border:none; display:block; filter:saturate(.6) brightness(.78) contrast(1.15); transition:filter .5s ease; }
.cs-map-wrap:hover .cs-map-frame { filter:saturate(.85) brightness(.9) contrast(1.05); }
.cs-pin-wrap { position:absolute; top:42%; left:50%; z-index:4; transform:translate(-50%,-50%); }
.cs-pin-ring { position:absolute; top:50%; left:50%; border-radius:50%; border:2px solid rgba(212,175,55,.5); transform:translate(-50%,-50%) scale(0); opacity:0; pointer-events:none; }
.cs-ring-1 { width:48px; height:48px; }
.cs-ring-2 { width:72px; height:72px; border-color:rgba(212,175,55,.28); }
.cs-pin-active .cs-ring-1 { animation:csPinRing 2.4s .2s ease-out infinite; }
.cs-pin-active .cs-ring-2 { animation:csPinRing 2.4s .6s ease-out infinite; }
@keyframes csPinRing { 0%{transform:translate(-50%,-50%) scale(.5);opacity:.8} 100%{transform:translate(-50%,-50%) scale(1.6);opacity:0} }
.cs-pin-dot { width:40px; height:40px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); background:linear-gradient(135deg,#D4AF37,#F5D76E); box-shadow:0 4px 20px rgba(212,175,55,.6); display:flex; align-items:center; justify-content:center; animation:csPinBob 2.8s ease-in-out infinite; position:relative; z-index:2; }
.cs-pin-dot svg { transform:rotate(45deg); }
@keyframes csPinBob { 0%,100%{transform:rotate(-45deg) translateY(0)} 50%{transform:rotate(-45deg) translateY(-5px)} }
.cs-map-badge { position:absolute; bottom:56px; left:50%; transform:translateX(-50%); z-index:3; white-space:nowrap; text-align:center; background:rgba(8,13,26,.92); border:1px solid rgba(212,175,55,.32); border-radius:12px; padding:10px 20px; backdrop-filter:blur(14px); }
.cs-map-badge-name { font-family:'Montserrat',sans-serif; font-size:.82rem; font-weight:700; color:#D4AF37; }
[dir="rtl"] .cs-map-badge-name { font-family:'Tajawal',sans-serif; font-size:.95rem; }
.cs-map-badge-addr { font-size:.66rem; font-weight:300; color:rgba(255,255,255,.55); margin-top:3px; }
[dir="rtl"] .cs-map-badge-addr { font-size:.8rem; }
.cs-map-open { position:absolute; top:14px; right:14px; z-index:3; background:rgba(8,13,26,.88); border:1px solid rgba(212,175,55,.32); border-radius:8px; padding:8px 14px; font-family:'Montserrat',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#D4AF37; text-decoration:none; backdrop-filter:blur(12px); transition:background .2s,border-color .2s; }
[dir="rtl"] .cs-map-open { right:auto; left:14px; font-family:'Tajawal',sans-serif; letter-spacing:.02em; font-size:.82rem; text-transform:none; }
.cs-map-open:hover { background:rgba(212,175,55,.14); border-color:rgba(212,175,55,.65); }

/* Address panel */
.cs-addr-col { display:flex; flex-direction:column; gap:0; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:18px; padding:32px 28px; position:relative; overflow:hidden; }
.cs-addr-col::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,#D4AF37,#F5D76E,#D4AF37,transparent); background-size:400px; animation:csShimmer 3s linear infinite; }
.cs-addr-icon-row { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.cs-addr-icon-wrap { width:40px; height:40px; border-radius:10px; background:rgba(212,175,55,.1); border:1px solid rgba(212,175,55,.22); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.cs-addr-title { font-family:'Montserrat',sans-serif; font-size:.62rem; font-weight:800; letter-spacing:.24em; text-transform:uppercase; color:#D4AF37; }
[dir="rtl"] .cs-addr-title { font-family:'Tajawal',sans-serif; font-size:.92rem; letter-spacing:.04em; text-transform:none; }
.cs-addr-lines { padding-left:52px; }
[dir="rtl"] .cs-addr-lines { padding-left:0; padding-right:52px; }
.cs-addr-office-tag { display:inline-block; font-family:'Montserrat',sans-serif; font-size:.68rem; font-weight:700; color:#F5D76E; background:rgba(212,175,55,.1); border:1px solid rgba(212,175,55,.22); border-radius:5px; padding:4px 10px; margin-bottom:8px; letter-spacing:.08em; }
[dir="rtl"] .cs-addr-office-tag { font-family:'Tajawal',sans-serif; font-size:.85rem; letter-spacing:.02em; }
.cs-addr-line { font-size:.88rem; font-weight:300; color:#CBD5E1; line-height:1.75; }
[dir="rtl"] .cs-addr-line { font-size:.98rem; }
.cs-addr-divider { height:1px; background:rgba(255,255,255,.07); margin:22px 0; }

/* Hours */
.cs-hours-list { padding-left:52px; display:flex; flex-direction:column; gap:10px; }
[dir="rtl"] .cs-hours-list { padding-left:0; padding-right:52px; }
.cs-hours-row { display:flex; justify-content:space-between; align-items:center; }
.cs-hours-day { font-size:.82rem; font-weight:300; color:#94A3B8; }
[dir="rtl"] .cs-hours-day { font-size:.95rem; }
.cs-hours-time { font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:700; }
[dir="rtl"] .cs-hours-time { font-family:'Tajawal',sans-serif; font-size:.95rem; }
.cs-open  { color:#4ADE80; }
.cs-closed{ color:#F87171; }

/* Buttons */
.cs-action-btns { display:flex; flex-direction:column; gap:12px; margin-top:2px; }
.cs-btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:10px; font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#080D1A; background:linear-gradient(135deg,#F5D76E,#D4AF37,#B8921E); border:none; border-radius:10px; padding:15px 24px; text-decoration:none; position:relative; overflow:hidden; transition:transform .28s,box-shadow .3s; }
[dir="rtl"] .cs-btn-primary { font-family:'Tajawal',sans-serif; font-size:1rem; letter-spacing:.02em; text-transform:none; }
.cs-btn-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s; }
.cs-btn-primary:hover::before { transform:translateX(100%); }
.cs-btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(212,175,55,.45); }
.cs-btn-secondary { display:inline-flex; align-items:center; justify-content:center; gap:10px; font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#D4AF37; background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.28); border-radius:10px; padding:14px 24px; text-decoration:none; transition:transform .25s,background .25s,box-shadow .25s; }
[dir="rtl"] .cs-btn-secondary { font-family:'Tajawal',sans-serif; font-size:1rem; letter-spacing:.02em; text-transform:none; }
.cs-btn-secondary:hover { transform:translateY(-2px); background:rgba(212,175,55,.14); box-shadow:0 8px 28px rgba(212,175,55,.18); }

/* Trust stats */
.cs-trust-row { display:flex; align-items:center; justify-content:center; gap:0; margin-top:24px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:12px; padding:16px 20px; }
.cs-trust-item { display:flex; flex-direction:column; align-items:center; gap:2px; flex:1; }
.cs-trust-num { font-family:'Merriweather',serif; font-size:1.5rem; font-weight:900; color:#D4AF37; line-height:1; letter-spacing:-.02em; }
.cs-trust-lbl { font-size:.65rem; font-weight:300; color:#64748B; letter-spacing:.06em; }
[dir="rtl"] .cs-trust-lbl { font-family:'Tajawal',sans-serif; font-size:.85rem; letter-spacing:.01em; }
.cs-trust-sep { width:1px; height:36px; background:rgba(255,255,255,.08); flex-shrink:0; }

/* Bottom bar */
.cs-bottom-bar { height:3px; background:linear-gradient(90deg,transparent,#A17C1A 20%,#D4AF37 40%,#F5D76E 50%,#D4AF37 60%,#A17C1A 80%,transparent); background-size:700px; animation:csShimmer 3.5s linear infinite; }

/* Mobile */
@media(max-width:640px){
  .cs-header{padding:72px 18px 40px}
  .cs-bottom-grid{padding:0 16px 60px}
  .cs-addr-col{padding:24px 18px}
  .cs-map-wrap{height:300px}
  .cs-lang-toggle{top:16px;right:16px}
  [dir="rtl"] .cs-lang-toggle{right:auto;left:16px}
  .cs-map-badge{white-space:normal;width:80%;text-align:center}
}
`;