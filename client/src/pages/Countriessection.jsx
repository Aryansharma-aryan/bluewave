import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


/* ─────────────────────────────────────────
   SVG FLAG ICONS  (clean, recognisable)
───────────────────────────────────────── */
const FlagIcon = ({ code, size = 48 }) => {
  const flags = {
    CA: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#fff"/>
        <rect width="15" height="40" fill="#D32F2F"/>
        <rect x="45" width="15" height="40" fill="#D32F2F"/>
        <polygon points="30,6 27,16 17,16 25,22 22,32 30,26 38,32 35,22 43,16 33,16" fill="#D32F2F"/>
      </svg>
    ),
    US: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#B22234"/>
        {[0,1,2,3,4,5,6].map(i=><rect key={i} y={i*40/13*2+40/13} width="60" height={40/13} fill="#fff"/>)}
        <rect width="24" height={40*7/13} fill="#3C3B6E"/>
        {[0,1,2,3,4,5,6,7,8].map(i=>[0,1,2,3,4].map(j=>(
          <circle key={`${i}-${j}`} cx={2.4+j*4.8+(i%2===0?0:2.4)} cy={2.2+i*3.1} r="1" fill="#fff"/>
        )))}
      </svg>
    ),
    GB: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#012169"/>
        <line x1="0" y1="0" x2="60" y2="40" stroke="#fff" strokeWidth="8"/>
        <line x1="60" y1="0" x2="0" y2="40" stroke="#fff" strokeWidth="8"/>
        <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="4"/>
        <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="4"/>
        <rect x="24" width="12" height="40" fill="#fff"/>
        <rect y="14" width="60" height="12" fill="#fff"/>
        <rect x="26" width="8" height="40" fill="#C8102E"/>
        <rect y="16" width="60" height="8" fill="#C8102E"/>
      </svg>
    ),
    AU: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#00008B"/>
        <rect x="0" width="30" height="20" fill="#00008B"/>
        <line x1="0" y1="0" x2="30" y2="20" stroke="#fff" strokeWidth="5"/>
        <line x1="30" y1="0" x2="0" y2="20" stroke="#fff" strokeWidth="5"/>
        <line x1="0" y1="0" x2="30" y2="20" stroke="#C8102E" strokeWidth="3"/>
        <line x1="30" y1="0" x2="0" y2="20" stroke="#C8102E" strokeWidth="3"/>
        <rect x="12" width="6" height="20" fill="#fff"/>
        <rect y="7" width="30" height="6" fill="#fff"/>
        <rect x="13.5" width="3" height="20" fill="#C8102E"/>
        <rect y="8.5" width="30" height="3" fill="#C8102E"/>
        <circle cx="43" cy="30" r="4" fill="#fff"/>
        <circle cx="52" cy="24" r="2.5" fill="#fff"/>
        <circle cx="52" cy="33" r="2.5" fill="#fff"/>
        <circle cx="46" cy="20" r="2.5" fill="#fff"/>
      </svg>
    ),
    DE: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#FFCE00"/>
        <rect width="60" height="13.3" fill="#000"/>
        <rect y="13.3" width="60" height="13.3" fill="#D00"/>
      </svg>
    ),
    SG: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#EF3340"/>
        <rect y="20" width="60" height="20" fill="#fff"/>
        <circle cx="16" cy="14" r="7" fill="#fff"/>
        <circle cx="19" cy="14" r="5.5" fill="#EF3340"/>
        {[0,1,2,3,4].map(i=>(
          <polygon key={i}
            transform={`translate(26,14) rotate(${i*72})`}
            points="0,-4 1,-1.2 3.8,-1.2 1.5,0.8 2.4,3.6 0,2 -2.4,3.6 -1.5,0.8 -3.8,-1.2 -1,-1.2"
            fill="#fff"/>
        ))}
      </svg>
    ),
    NZ: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#00247D"/>
        <rect x="0" width="30" height="20" fill="#00247D"/>
        <line x1="0" y1="0" x2="30" y2="20" stroke="#fff" strokeWidth="5"/>
        <line x1="30" y1="0" x2="0" y2="20" stroke="#fff" strokeWidth="5"/>
        <line x1="0" y1="0" x2="30" y2="20" stroke="#C8102E" strokeWidth="3"/>
        <line x1="30" y1="0" x2="0" y2="20" stroke="#C8102E" strokeWidth="3"/>
        <rect x="12" width="6" height="20" fill="#fff"/>
        <rect y="7" width="30" height="6" fill="#fff"/>
        <rect x="13.5" width="3" height="20" fill="#C8102E"/>
        <rect y="8.5" width="30" height="3" fill="#C8102E"/>
        <circle cx="42" cy="10" r="2.5" fill="#CC142B"/>
        <circle cx="52" cy="16" r="2.5" fill="#CC142B"/>
        <circle cx="46" cy="26" r="2.5" fill="#CC142B"/>
        <circle cx="36" cy="22" r="2.5" fill="#CC142B"/>
      </svg>
    ),
    MY: (
      <svg viewBox="0 0 60 40" width={size} height={size * 0.67}>
        <rect width="60" height="40" fill="#CC0001"/>
        {[0,2,4,6,8,10,12].map(i=><rect key={i} y={i/14*40} width="60" height={40/14} fill="#fff"/>)}
        <rect width="30" height="22" fill="#010066"/>
        <circle cx="13" cy="11" r="7" fill="#FFCC00"/>
        <circle cx="15" cy="11" r="5.5" fill="#010066"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(
          <polygon key={i}
            transform={`translate(22,11) rotate(${i*27.7})`}
            points="0,-4 0.8,-1.2 3.8,-1.2 1.5,0.8 2.4,3.6 0,2 -2.4,3.6 -1.5,0.8 -3.8,-1.2 -0.8,-1.2"
            fill="#FFCC00"/>
        ))}
      </svg>
    ),
  };
  return (
    <div style={{
      width: size, height: size * 0.67,
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
      flexShrink: 0,
    }}>
      {flags[code] || <div style={{ width: size, height: size * 0.67, background: "#eee" }} />}
    </div>
  );
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const COUNTRIES = [
  { name: "Canada",         code: "CA", accent: "#D32F2F", visas: ["Express Entry", "Study Permit", "Work Visa", "PNP"],                  img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80&fit=crop" },
  { name: "United States",  code: "US", accent: "#1565C0", visas: ["H-1B Work", "F-1 Student", "B1/B2 Tourist", "Green Card"],            img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80&fit=crop" },
  { name: "United Kingdom", code: "GB", accent: "#283593", visas: ["Skilled Worker", "Student Visa", "Visitor Visa", "Global Talent"],     img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&fit=crop" },
  { name: "Australia",      code: "AU", accent: "#0277BD", visas: ["Skilled Migration", "Student Visa", "TSS 482", "Partner Visa"],        img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80&fit=crop" },
  { name: "Germany",        code: "DE", accent: "#37474F", visas: ["EU Blue Card", "Job Seeker Visa", "Student Visa", "Work Permit"],      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80&fit=crop" },
  { name: "Singapore",      code: "SG", accent: "#B71C1C", visas: ["Employment Pass", "S Pass", "Student Pass", "Dependent Pass"],        img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80&fit=crop" },
  { name: "New Zealand",    code: "NZ", accent: "#2E7D32", visas: ["Skilled Migrant", "Work to Residence", "Student Visa", "Visitor Visa"],img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80&fit=crop" },
  { name: "Malaysia",       code: "MY", accent: "#C62828", visas: ["MM2H", "Employment Pass", "Student Visa", "Professional Visit"],      img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&fit=crop" },
];

// triple for seamless loop
const TRACK = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
function Card({ c }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 320,
        flexShrink: 0,
        borderRadius: 20,
        overflow: "hidden",
        background: "#fff",
        border: `1.5px solid ${hov ? c.accent + "50" : "#EBEBEB"}`,
        boxShadow: hov
          ? `0 24px 56px rgba(0,0,0,0.13), 0 4px 16px ${c.accent}22`
          : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.42s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease, border-color 0.3s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* accent bar that slides in on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 3, background: c.accent,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.38s cubic-bezier(.16,1,.3,1)",
        zIndex: 3,
      }} />

      {/* ── IMAGE ── */}
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <img
          src={c.img} alt={c.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.09)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(.16,1,.3,1)",
          }}
        />
        {/* gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `linear-gradient(to bottom, transparent 30%, ${c.accent}cc)`
            : "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))",
          transition: "background 0.4s ease",
        }} />

        {/* country name on image bottom */}
        <div style={{
          position: "absolute", bottom: 14, left: 16, right: 16,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontWeight: 700,
            color: "#fff", lineHeight: 1,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            transform: hov ? "translateY(-3px)" : "translateY(0)",
            transition: "transform 0.35s ease",
          }}>
            {c.name}
          </p>
          {/* arrow circle */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: hov ? "#fff" : "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s ease",
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
              stroke={hov ? c.accent : "#fff"} strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "stroke 0.3s, transform 0.3s ease", transform: hov ? "translateX(1px)" : "none" }}>
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "18px 20px 20px" }}>

        {/* flag + code row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <FlagIcon code={c.code} size={52} />
          <div>
            <p style={{
              margin: 0,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: c.accent,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {c.code}
            </p>
            <p style={{
              margin: "2px 0 0", fontSize: 12, color: "#94A3B8",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {c.visas.length} visa types available
            </p>
          </div>
        </div>

        {/* visa pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {c.visas.map((v, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 600,
              color: hov ? c.accent : "#475569",
              background: hov ? c.accent + "12" : "#F8FAFC",
              border: `1px solid ${hov ? c.accent + "30" : "#E2E8F0"}`,
              borderRadius: 100, padding: "4px 11px",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.03em",
              transition: "all 0.3s ease",
              transitionDelay: `${i * 0.04}s`,
            }}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MARQUEE
───────────────────────────────────────── */
function Marquee({ items }) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", overflow: "hidden", padding: "12px 0 16px" }}
    >
      {/* edge fades */}
      {["left:0", "right:0"].map((side, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, bottom: 0, width: 140,
          [i === 0 ? "left" : "right"]: 0,
          background: `linear-gradient(${i === 0 ? "90deg" : "-90deg"}, #fff 30%, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />
      ))}

      <div style={{
        display: "flex", gap: 22, width: "max-content",
        animation: "mqScroll 50s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        {items.map((c, i) => <Card key={i} c={c} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); ob.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, on];
}

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function CountriesSection() {
    const navigate = useNavigate();

  const [headRef, headOn] = useReveal();
  const [footRef, footOn] = useReveal();

  useEffect(() => {
    if (document.getElementById("cs-kf")) return;
    const s = document.createElement("style");
    s.id = "cs-kf";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,300;1,600&display=swap');
      @keyframes mqScroll { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section style={{
      background: "#ffffff",
      padding: "96px 0 80px",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
    }}>

      {/* ── HEADER ── */}
      <div ref={headRef} style={{
        textAlign: "center",
        maxWidth: 600, margin: "0 auto 56px",
        padding: "0 24px",
        opacity: headOn ? 1 : 0,
        transform: headOn ? "none" : "translateY(24px)",
        transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 14,
          marginBottom: 22,
        }}>
          <span style={{ width: 36, height: 1, background: "#CBD5E1", display: "block" }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#94A3B8",
          }}>
            Countries We Serve
          </span>
          <span style={{ width: 36, height: 1, background: "#CBD5E1", display: "block" }} />
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          fontWeight: 700, lineHeight: 1.1,
          color: "#0F172A", margin: "0 0 18px",
          letterSpacing: "-0.02em",
        }}>
          Your destination is{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "#2563EB" }}>
            already chosen.
          </em>
        </h2>

        <p style={{
          fontSize: 16, color: "#64748B",
          lineHeight: 1.75, margin: 0, fontWeight: 400,
        }}>
          Expert visa guidance across 50+ countries. Hover any card to explore —
          click to begin your application.
        </p>
      </div>

      {/* ── SINGLE MARQUEE ROW ── */}
      <Marquee items={TRACK} />

      {/* ── FOOTER ── */}
      <div ref={footRef} style={{
        maxWidth: 640, margin: "56px auto 0",
        padding: "0 24px", textAlign: "center",
        opacity: footOn ? 1 : 0,
        transform: footOn ? "none" : "translateY(18px)",
        transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease",
      }}>
        {/* flag strip */}
        <div style={{
          display: "flex", justifyContent: "center",
          flexWrap: "wrap", gap: 14, marginBottom: 28,
        }}>
          {COUNTRIES.map((c) => (
            <div
              key={c.code}
              title={c.name}
              style={{ cursor: "default", transition: "transform 0.22s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3) translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <FlagIcon code={c.code} size={38} />
            </div>
          ))}
        </div>

        <div style={{ width: 40, height: 1, background: "#E2E8F0", margin: "0 auto 20px" }} />

        <p style={{
          fontSize: 14, color: "#94A3B8",
          margin: "0 0 28px", lineHeight: 1.7,
        }}>
          Don't see your destination?{" "}
          <strong style={{ color: "#475569", fontWeight: 600 }}>
            We cover 50+ countries
          </strong>{" "}
          worldwide.
        </p>

        <button
      onClick={() => navigate("/contact")}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#1D4ED8";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.36)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#2563EB";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 18px rgba(37,99,235,0.24)";
      }}
      style={{
        background: "#2563EB", color: "#fff",
        border: "none", borderRadius: 100,
        padding: "14px 40px",
        fontSize: 13, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        boxShadow: "0 4px 18px rgba(37,99,235,0.24)",
        transition: "background 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
    >
      Ask About Your Country →
    </button>
      </div>

    </section>
  );
}