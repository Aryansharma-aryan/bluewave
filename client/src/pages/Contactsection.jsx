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
      { num: "10+",  lbl: "Years"    },
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

          <div className="cs-contact-actions">
  <a href="https://wa.me/971506580557" className="cs-btn-primary">
    WhatsApp Us Now
  </a>

  <a href="tel:+971506580557" className="cs-btn-outline">
    +971 50 658 0557
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ROOT */
.cs-root {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #0f172a;
}

.cs-header {
  text-align: center;
  padding: 110px 20px 50px; /* 👈 FIX navbar overlap */
  max-width: 800px;
  margin: 0 auto;
}

.cs-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.cs-h2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
}

.cs-h2-accent {
  background: linear-gradient(to right, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  color: transparent;
}

.cs-sub {
  margin-top: 14px;
  color: #64748b;
  max-width: 560px;
  margin-inline: auto;
  font-size: 15px;
  line-height: 1.6;
}
.cs-chips-wrap {
  max-width: 1100px;
  margin: 0 auto 40px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .cs-chips-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .cs-chips-wrap {
    grid-template-columns: 1fr;
  }
}

.cs-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cs-chip:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

.cs-chip-label {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.cs-chip-sub {
  font-size: 12px;
  color: #64748b;
}
/* GRID LAYOUT */
.cs-bottom-grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 80px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: stretch;
}

@media (max-width: 960px) {
  .cs-bottom-grid {
    grid-template-columns: 1fr;
  }
}
  .cs-btn-primary {
  background: linear-gradient(to right, #2563eb, #06b6d4);
  color: #fff;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cs-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37,99,235,0.25);
}

.cs-btn-outline {
  border: 1px solid #2563eb;
  color: #2563eb;
  padding: 14px;
  border-radius: 10px;
  font-weight: 500;
}

.cs-btn-outline:hover {
  background: #eff6ff;
}

/* MAP */
.cs-map-wrap {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 360px;
}

.cs-map-frame {
  width: 100%;
  height: 100%;
  border: none;
}

/* RIGHT PANEL */
.cs-addr-col {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* SECTION TITLE */
.cs-addr-title {
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
}

/* ADDRESS TEXT */
.cs-addr-line {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
}

/* DIVIDER */
.cs-addr-divider {
  height: 1px;
  background: #e2e8f0;
}

/* HOURS */
.cs-hours-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.cs-open {
  color: #16a34a;
  font-weight: 500;
}

.cs-closed {
  color: #dc2626;
  font-weight: 500;
}

/* ✅ FIXED BUTTON SECTION */
.cs-contact-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

/* PRIMARY BUTTON */
.cs-btn-primary {
  display: block;
  width: 100%;
  background: #2563eb;
  color: #ffffff;
  padding: 13px;
  text-align: center;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cs-btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

/* OUTLINE BUTTON */
.cs-btn-outline {
  display: block;
  width: 100%;
  border: 1px solid #2563eb;
  color: #2563eb;
  padding: 13px;
  text-align: center;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cs-btn-outline:hover {
  background: #eff6ff;
}

/* TRUST STATS */
.cs-trust-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

.cs-trust-box {
  flex: 1;
  text-align: center;
}

.cs-trust-num {
  font-size: 18px;
  font-weight: 700;
}

.cs-trust-lbl {
  font-size: 12px;
  color: #64748b;
}

/* MOBILE */
@media (max-width: 640px) {
  .cs-header {
    padding: 60px 16px 30px;
  }

  .cs-h2 {
    font-size: 26px;
  }

  .cs-map-wrap {
    height: 260px;
  }

  .cs-trust-row {
    flex-direction: column;
    gap: 8px;
  }
}

/* 🔴 IMPORTANT: REMOVE OVERLAP ISSUES */
.cs-btn-primary,
.cs-btn-outline {
  position: static !important;
  float: none !important;
}`;