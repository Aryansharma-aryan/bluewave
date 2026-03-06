import { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.jpeg";

/* ══════════════════════════════════════════════════════════════════════════════
   BlueWave Consultation — Premium Navbar
   Perfectly matched to HeroSection design DNA:
   • Cinzel × Outfit typography (same as Hero)
   • Gold (#D4AF37) + Navy (#06101E) + Teal (#00AEEF) palette
   • Animated gold shimmer top bar
   • Glass-blur on scroll with gold shadow
   • Floating logo with glowing ring
   • Gold underline nav links
   • Pulsing gold CTA button with shine sweep
   • Animated hamburger → X
   • Smooth mobile drawer
   • Floating particles (matching Hero)
   • Fully responsive
══════════════════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

/* ── 6 mini particles that float in the navbar background ─────────────────── */
const NAV_PARTICLES = [
  { x: 12,  y: 30, s: 2.2, dur: 5,   del: 0    },
  { x: 28,  y: 65, s: 1.5, dur: 7,   del: 1.2  },
  { x: 55,  y: 25, s: 1.8, dur: 6,   del: 0.5  },
  { x: 72,  y: 70, s: 2.5, dur: 4.5, del: 2    },
  { x: 85,  y: 40, s: 1.6, dur: 8,   del: 0.8  },
  { x: 95,  y: 55, s: 2,   dur: 5.5, del: 1.5  },
];

/* ── All CSS injected once into <head> ────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

/* ─── CSS Variables (same tokens as HeroSection) ─────────────────────────── */
:root {
  --bw-g1:         #B8941F;
  --bw-g2:         #D4AF37;
  --bw-g3:         #F5D76E;
  --bw-navy:       #06101E;
  --bw-navy2:      #0A1F44;
  --bw-navy-glass: rgba(5, 9, 20, 0.97);
  --bw-teal:       #00AEEF;
  --bw-teal2:      #38C8FF;
  --bw-white:      #FFFFFF;
  --bw-white85:    rgba(255,255,255,0.85);
  --bw-white08:    rgba(255,255,255,0.08);
}

html { scroll-behavior: smooth; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes bw-navReveal {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0);     }
}
@keyframes bw-shimmerSlide {
  0%   { background-position: -700px 0; }
  100% { background-position:  700px 0; }
}
@keyframes bw-goldPulse {
  0%   { box-shadow: 0 0 0 0   rgba(212,175,55,0.65); }
  70%  { box-shadow: 0 0 0 14px rgba(212,175,55,0);   }
  100% { box-shadow: 0 0 0 0   rgba(212,175,55,0);    }
}
@keyframes bw-logoFloat {
  0%,100% { transform: translateY(0px);   }
  50%      { transform: translateY(-3px); }
}
@keyframes bw-ringPulse {
  0%,100% { box-shadow: 0 0 0 0   rgba(212,175,55,0.5); }
  50%      { box-shadow: 0 0 0 5px rgba(212,175,55,0);   }
}
@keyframes bw-ptFloat {
  0%,100% { transform: translateY(0px)   scale(1);    opacity: var(--op); }
  50%      { transform: translateY(-10px) scale(1.3); opacity: calc(var(--op)*1.8); }
}
@keyframes bw-scanLine {
  0%   { left: -30%; }
  100% { left: 120%; }
}
@keyframes bw-logoGlow {
  0%,100% { box-shadow: 0 0 0 2px rgba(212,175,55,0.35), 0 6px 22px rgba(0,0,0,0.45); }
  50%      { box-shadow: 0 0 0 3px rgba(212,175,55,0.70), 0 8px 28px rgba(212,175,55,0.2); }
}
@keyframes bw-dotPulse {
  0%,100% { opacity: 1;   transform: scale(1);   }
  50%      { opacity: 0.5; transform: scale(0.7); }
}

/* ─── NAVBAR SHELL ────────────────────────────────────────────────────────── */
.bwn-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  animation: bw-navReveal 0.7s cubic-bezier(0.22,1,0.36,1) both;
  transition: background 0.45s ease, box-shadow 0.45s ease;
  overflow: hidden;
}

/* Scrolled state — glass + gold glow */
.bwn-nav.scrolled {
  background: var(--bw-navy-glass) !important;
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  box-shadow:
    0 10px 50px rgba(0,0,0,0.55),
    0 1px 0 rgba(212,175,55,0.25),
    inset 0 1px 0 rgba(255,255,255,0.04) !important;
}

/* ─── GOLD TOP SHIMMER BAR (matches Hero scan) ───────────────────────────── */
.bwn-shimmer-bar {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--bw-g1) 20%,
    var(--bw-g2) 40%,
    var(--bw-g3) 50%,
    var(--bw-g2) 60%,
    var(--bw-g1) 80%,
    transparent 100%
  );
  background-size: 700px 100%;
  animation: bw-shimmerSlide 3s linear infinite;
}

/* ─── HORIZONTAL SCAN LIGHT (mini version of Hero scan) ─────────────────── */
.bwn-scan {
  position: absolute;
  top: 0; height: 100%; width: 35%;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.04), transparent);
  pointer-events: none;
  animation: bw-scanLine 7s linear infinite;
  z-index: 0;
}

/* ─── GRID TEXTURE (subtle, matches Hero) ────────────────────────────────── */
.bwn-grid {
  position: absolute;
  inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* ─── INNER ROW ──────────────────────────────────────────────────────────── */
.bwn-inner {
  position: relative;
  z-index: 5;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ─── BRAND ──────────────────────────────────────────────────────────────── */
.bwn-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  flex-shrink: 0;
}

/* Logo container — white bg so logo is always crystal clear */
.bwn-logo-wrap {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: bw-logoFloat 4.5s ease-in-out infinite, bw-logoGlow 3.5s ease-in-out infinite;
  transition: transform 0.3s ease;
  overflow: hidden;
}
.bwn-logo-wrap:hover {
  transform: translateY(-2px) scale(1.06) !important;
}

/* Gold corner triangle pip */
.bwn-logo-wrap::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 12px; height: 12px;
  background: var(--bw-g2);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

/* Logo image — full visibility, no clipping */
.bwn-logo-wrap img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  display: block;
}

/* Brand text */
.bwn-brand-text { line-height: 1; }

.bwn-brand-name {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 1.18rem;
  color: var(--bw-white);
  letter-spacing: 0.04em;
  white-space: nowrap;
  line-height: 1.15;
}

/* "Waves" word in gold gradient */
.bwn-brand-name .gold {
  background: linear-gradient(135deg, var(--bw-g1), var(--bw-g2), var(--bw-g3));
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: bw-shimmerSlide 4s linear infinite;
}

.bwn-brand-sub {
  font-family: 'Outfit', sans-serif;
  font-size: 0.46rem;
  font-weight: 400;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: rgba(212,175,55,0.65);
  margin-top: 3px;
  white-space: nowrap;
}

/* Status dot */
.bwn-brand-dot {
  display: inline-block;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--bw-teal);
  margin-right: 6px;
  vertical-align: middle;
  animation: bw-dotPulse 2s ease-in-out infinite;
}

/* ─── DESKTOP LINKS CONTAINER ────────────────────────────────────────────── */
.bwn-links {
  display: flex;
  align-items: center;
  gap: 0;
}

/* Vertical separator between links */
.bwn-sep {
  width: 1px;
  height: 14px;
  background: rgba(212,175,55,0.2);
  margin: 0 24px;
  flex-shrink: 0;
}

/* ─── NAV LINK ────────────────────────────────────────────────────────────── */
.bwn-link {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.78);
  text-decoration: none;
  padding: 5px 0;
  transition: color 0.28s ease;
  white-space: nowrap;
}

/* Gold underline expands from center — matches Hero card hover */
.bwn-link::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 50%; right: 50%;
  height: 1.5px;
  background: linear-gradient(90deg, var(--bw-g1), var(--bw-g2), var(--bw-g3));
  border-radius: 2px;
  transition: left 0.32s ease, right 0.32s ease;
}
.bwn-link:hover,
.bwn-link.active {
  color: var(--bw-g3);
}
.bwn-link:hover::after,
.bwn-link.active::after {
  left: 0; right: 0;
}

/* ─── DIVIDER BEFORE CTA ─────────────────────────────────────────────────── */
.bwn-divider {
  width: 1px;
  height: 22px;
  background: rgba(212,175,55,0.2);
  margin: 0 28px;
  flex-shrink: 0;
}

/* ─── CTA BUTTON (gold — matches Hero primary button) ───────────────────── */
.bwn-cta {
  position: relative;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bw-navy);
  background: linear-gradient(135deg, var(--bw-g1), var(--bw-g2), var(--bw-g3), var(--bw-g2));
  background-size: 300%;
  border: none;
  border-radius: 3px;
  padding: 12px 28px;
  cursor: pointer;
  white-space: nowrap;
  animation: bw-goldPulse 3s ease-out infinite, bw-shimmerSlide 5s linear infinite;
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}

/* Shine sweep on hover */
.bwn-cta::before {
  content: '';
  position: absolute;
  top: 0; left: -80%;
  width: 55%; height: 100%;
  background: linear-gradient(110deg, transparent, rgba(255,255,255,0.42), transparent);
  transition: left 0.55s ease;
  pointer-events: none;
}
.bwn-cta:hover::before { left: 160%; }
.bwn-cta:hover {
  transform: translateY(-3px) scale(1.03);
  animation: none;
  background-position: right;
  box-shadow: 0 12px 38px rgba(212,175,55,0.55), 0 4px 12px rgba(0,0,0,0.4);
}
.bwn-cta:active { transform: translateY(0) scale(1); }

/* ─── HAMBURGER BUTTON ───────────────────────────────────────────────────── */
.bwn-burger {
  display: none;
  flex-direction: column;
  gap: 5.5px;
  background: rgba(212,175,55,0.07);
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  transition: background 0.25s, border-color 0.25s;
  flex-shrink: 0;
}
.bwn-burger:hover {
  background: rgba(212,175,55,0.14);
  border-color: rgba(212,175,55,0.45);
}

.bwn-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--bw-g2);
  border-radius: 2px;
  transform-origin: center;
  transition:
    transform 0.38s cubic-bezier(0.4,0,0.2,1),
    opacity   0.3s ease,
    width     0.32s ease;
}
.bwn-burger.open .bwn-bar:nth-child(1) { transform: translateY(7.5px) rotate(45deg);  }
.bwn-burger.open .bwn-bar:nth-child(2) { opacity: 0; width: 0;                         }
.bwn-burger.open .bwn-bar:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

/* ─── MOBILE DRAWER ──────────────────────────────────────────────────────── */
.bwn-drawer {
  position: relative;
  z-index: 4;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 0.48s cubic-bezier(0.4,0,0.2,1),
    opacity    0.32s ease;
  border-top: 1px solid rgba(212,175,55,0.1);
  background: linear-gradient(180deg, rgba(4,8,18,0.99) 0%, rgba(6,12,28,0.99) 100%);
}
.bwn-drawer.open {
  max-height: 480px;
  opacity: 1;
}

.bwn-mob-link {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.68);
  text-decoration: none;
  padding: 16px 28px;
  border-left: 2px solid transparent;
  transition:
    color        0.25s ease,
    border-color 0.25s ease,
    background   0.25s ease,
    padding-left 0.28s ease;
}

/* Dot indicator */
.bwn-mob-link::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--bw-g2);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.25s;
}

.bwn-mob-link:hover,
.bwn-mob-link.active {
  color: var(--bw-g3);
  border-left-color: var(--bw-g2);
  background: rgba(212,175,55,0.06);
  padding-left: 36px;
}
.bwn-mob-link:hover::before,
.bwn-mob-link.active::before { opacity: 1; }

/* Mobile CTA footer */
.bwn-mob-footer {
  padding: 16px 28px 28px;
  border-top: 1px solid rgba(212,175,55,0.08);
  margin-top: 4px;
}
.bwn-mob-footer .bwn-cta {
  width: 100%;
  border-radius: 4px;
  text-align: center;
  display: block;
}

/* Drawer grid texture */
.bwn-drawer-grid {
  position: absolute;
  inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,175,55,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,175,55,0.022) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ─── RESPONSIVE ─────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .bwn-sep { margin: 0 16px; }
  .bwn-divider { margin: 0 18px; }
  .bwn-cta { padding: 11px 20px; font-size: 0.68rem; }
}
@media (max-width: 767px) {
  .bwn-links  { display: none !important; }
  .bwn-burger { display: flex !important; }
  .bwn-inner  { padding: 0 18px; height: 70px; }
}
@media (max-width: 400px) {
  .bwn-brand-name { font-size: 1rem; }
  .bwn-brand-sub  { display: none; }
  .bwn-logo-wrap  { width: 46px; height: 46px; }
  .bwn-logo-wrap img { width: 42px; height: 42px; }
}
`;

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const cssInjected = useRef(false);

  /* Inject styles once */
  useEffect(() => {
    if (cssInjected.current) return;
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    cssInjected.current = true;
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close drawer on desktop resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goConsult = () => {
    setActiveLink("#contact");
    setMenuOpen(false);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`bwn-nav${scrolled ? " scrolled" : ""}`}
        style={{
          background: scrolled
            ? undefined
            : "linear-gradient(180deg, rgba(4,8,20,0.96) 0%, rgba(6,12,30,0.85) 100%)",
        }}
      >
        {/* ── Gold shimmer top bar ── */}
        <div className="bwn-shimmer-bar" />

        {/* ── Scan light ── */}
        <div className="bwn-scan" />

        {/* ── Grid texture ── */}
        <div className="bwn-grid" />

        {/* ── Floating particles (matching Hero aesthetic) ── */}
        {NAV_PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              "--op": p.s > 2 ? 0.35 : 0.22,
              position: "absolute",
              left: `${p.x}%`,
              top: "50%",
              marginTop: -(p.s / 2),
              width: p.s,
              height: p.s,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#D4AF37" : "#38C8FF",
              opacity: p.s > 2 ? 0.35 : 0.22,
              pointerEvents: "none",
              zIndex: 1,
              animation: `bw-ptFloat ${p.dur}s ${p.del}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* ════ MAIN ROW ════ */}
        <div className="bwn-inner">

          {/* ── Brand / Logo ── */}
          <a
            href="#home"
            className="bwn-brand"
            onClick={(e) => handleNav(e, "#home")}
          >
            {/* Logo — white background guarantees full clarity */}
            <div className="bwn-logo-wrap">
              <img src={Logo} alt="BlueWave Consultation Logo" />
            </div>

            {/* Text */}
            <div className="bwn-brand-text">
              <div className="bwn-brand-name">
                Blue<span className="gold">Wave</span>
              </div>
              <div className="bwn-brand-sub">
                <span className="bwn-brand-dot" />
                Consultation
              </div>
            </div>
          </a>

          {/* ── Desktop nav links + CTA ── */}
          <div className="bwn-links">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <span className="bwn-sep" />}
                <a
                  href={link.href}
                  className={`bwn-link${activeLink === link.href ? " active" : ""}`}
                  onClick={(e) => handleNav(e, link.href)}
                >
                  {link.label}
                </a>
              </span>
            ))}

            <span className="bwn-divider" />

            <button className="bwn-cta" onClick={goConsult}>
              Get Consultation
            </button>
          </div>

          {/* ── Hamburger ── */}
          <button
            className={`bwn-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="bwn-bar" />
            <span className="bwn-bar" />
            <span className="bwn-bar" />
          </button>
        </div>

        {/* ════ MOBILE DRAWER ════ */}
        <div className={`bwn-drawer${menuOpen ? " open" : ""}`}>
          {/* Drawer grid texture */}
          <div className="bwn-drawer-grid" />

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`bwn-mob-link${activeLink === link.href ? " active" : ""}`}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile CTA */}
          <div className="bwn-mob-footer">
            <button className="bwn-cta" onClick={goConsult}>
              Get Free Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Push page content below fixed nav */}
      <div style={{ height: "78px" }} />
    </>
  );
}