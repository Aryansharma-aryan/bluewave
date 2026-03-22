import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate, useLocation, Link } from "react-router-dom";

/* ══════════════════════════════════════════════════
   BlueWave — Premium Navbar
   Uses React Router for ALL navigation (no scroll hacks)
   Desktop: horizontal nav
   Mobile: full-height slide-in SIDEBAR (right)
══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home",              path: "/",           icon: "🏠" },
  { label: "About",             path: "/about",      icon: "✦"  },
  { label: "Services",          path: "/services",   icon: "◈"  },
  { label: "Contact",           path: "/contact",    icon: "✉"  },
  { label: "Consultation Form", path: "/consult",    icon: "📝" },
];

let cssInjected = false;
function injectCSS(css) {
  if (cssInjected) return; cssInjected = true;
  const el = document.createElement("style");
  el.textContent = css; document.head.appendChild(el);
}

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const ref = useRef(false);

  // Active based on current route
  const active = location.pathname;

  useLayoutEffect(() => {
    if (ref.current) return; ref.current = true; injectCSS(CSS);
    setMounted(true);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close sidebar on desktop resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const goCTA = () => {
    setOpen(false);
    navigate("/contact");
  };

  // Check if a link is active (exact for home, startsWith for others)
  const isActive = (path) => {
    if (path === "/") return active === "/";
    return active.startsWith(path);
  };

  return (
    <>
      <header className={`nb-root${scrolled ? " nb-scrolled" : ""}${mounted ? " nb-in" : ""}`}>

        {/* ── Red-to-Gold animated top rule ── */}
        <div className="nb-rule" />

        {/* ── Main bar ── */}
        <div className="nb-bar">

          {/* BRAND */}
          <button className="nb-brand" onClick={() => goTo("/")}>
            <div className="nb-logo-shell">
              <div className="nb-logo-glow" />
              <div className="nb-logo-box">
                <img src={Logo} alt="BlueWave" className="nb-logo-img" />
              </div>
              <span className="nb-live-dot" />
            </div>
            <div className="nb-brand-words">
              <div className="nb-brand-name">
                <span className="nb-blue">Blue</span><span className="nb-gold-txt">Wave</span>
              </div>
              <div className="nb-brand-sub">Management Consultancy</div>
            </div>
          </button>

          {/* DESKTOP LINKS */}
          <nav className="nb-links">
            {NAV_LINKS.map(l => (
              <button
                key={l.path}
                className={`nb-link${isActive(l.path) ? " nb-active" : ""}`}
                onClick={() => goTo(l.path)}
              >
                {l.label}
                <span className="nb-link-ul" />
              </button>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="nb-actions">
            <a href="tel:+971506580557" className="nb-tel">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.5 19.79 19.79 0 01.77 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +971 50 658 0557
            </a>

            <button className="nb-cta" onClick={goCTA}>
              Free Consultation
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
              <span className="nb-shine" />
            </button>

            {/* Hamburger */}
            <button
              className={`nb-ham${open ? " nb-ham-open" : ""}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
            >
              <span className="nb-hline" />
              <span className="nb-hline" />
              <span className="nb-hline" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE SIDEBAR + OVERLAY
      ══════════════════════════════════════ */}

      {/* Backdrop overlay */}
      <div
        className={`nb-overlay${open ? " nb-overlay-in" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar panel */}
      <aside className={`nb-sidebar${open ? " nb-sidebar-in" : ""}`}>

        {/* Sidebar header */}
        <div className="nb-sb-head">
          <div className="nb-sb-brand">
            <div className="nb-sb-logo">
              <img src={Logo} alt="BlueWave" className="nb-logo-img" />
            </div>
            <div>
              <div className="nb-brand-name nb-sb-name">
                <span className="nb-blue">Blue</span><span className="nb-gold-txt">Wave</span>
              </div>
              <div className="nb-brand-sub" style={{ color:"rgba(212,175,55,.55)" }}>
                Management Consultancy
              </div>
            </div>
          </div>
          <button className="nb-sb-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Gold divider */}
        <div className="nb-sb-rule" />

        {/* Nav links — staggered entrance */}
        <nav className="nb-sb-links">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.path}
              className={`nb-sb-link${isActive(l.path) ? " nb-sb-active" : ""}${open ? " nb-sb-link-in" : ""}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              onClick={() => goTo(l.path)}
            >
              <span className="nb-sb-icon">{l.icon}</span>
              <span className="nb-sb-label">{l.label}</span>
              <svg className="nb-sb-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="nb-sb-footer">
          <button
            className={`nb-sb-cta${open ? " nb-sb-link-in" : ""}`}
            style={{ transitionDelay: open ? `${120 + NAV_LINKS.length * 60 + 40}ms` : "0ms" }}
            onClick={goCTA}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
            </svg>
            Book Free Consultation
            <span className="nb-shine" />
          </button>

          <div
            className={`nb-sb-contacts${open ? " nb-sb-link-in" : ""}`}
            style={{ transitionDelay: open ? `${120 + NAV_LINKS.length * 60 + 100}ms` : "0ms" }}
          >
            <a href="tel:+971506580557" className="nb-sb-contact-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.5 19.79 19.79 0 01.77 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +971 50 658 0557
            </a>
            <a href="mailto:info@bluewaveconsultation.ae" className="nb-sb-contact-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@bluewaveconsultation.com
            </a>
          </div>

          <div
            className={`nb-sb-trust${open ? " nb-sb-link-in" : ""}`}
            style={{ transitionDelay: open ? `${120 + NAV_LINKS.length * 60 + 160}ms` : "0ms" }}
          >
            <span>✦ 98% Approval</span>
            <span>✦ 12,000+ Visas</span>
            <span>✦ Since 2018</span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ════════════════════════════════════════════════════
   ALL STYLES
════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500&display=swap');

html { scroll-behavior: smooth; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══ ROOT ══ */
.nb-root {
  position: fixed; top: 0; left: 0; right: 0; z-index: 900;
  background: rgba(8, 12, 22, 0.0);
  transition:
    background .45s ease,
    backdrop-filter .45s ease,
    box-shadow .45s ease,
    opacity .65s ease,
    transform .65s cubic-bezier(.16,1,.3,1);
  opacity: 0; transform: translateY(-14px);
}
.nb-in { opacity: 1 !important; transform: translateY(0) !important; }
.nb-scrolled {
  background: rgba(8, 12, 22, 0.97) !important;
  backdrop-filter: blur(22px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(22px) saturate(180%) !important;
  box-shadow: 0 2px 40px rgba(0,0,0,.55), 0 1px 0 rgba(212,175,55,.16) !important;
}

/* ── Top rule ── */
.nb-rule {
  height: 2.5px;
  background: linear-gradient(90deg,
    transparent 0%, #9F1239 10%,
    #DC2626 22%, #D4AF37 42%,
    #F5D76E 50%, #D4AF37 58%,
    #DC2626 78%, #9F1239 90%, transparent 100%
  );
  background-size: 500px 100%;
  animation: nbRule 3s linear infinite;
}
@keyframes nbRule { from{background-position:0 50%} to{background-position:500px 50%} }

/* ── Bar ── */
.nb-bar {
  max-width: 1300px; margin: 0 auto; padding: 0 36px;
  height: 72px; display: flex; align-items: center; gap: 28px; justify-content: space-between;
}
@media(max-width:768px){ .nb-bar { padding: 0 18px; height: 64px; } }

/* ══ BRAND ══ */
.nb-brand {
  display: flex; align-items: center; gap: 13px;
  text-decoration: none; flex-shrink: 0;
  background: none; border: none; cursor: pointer;
  transition: opacity .2s;
}
.nb-brand:hover { opacity: .9; }

.nb-logo-shell { position: relative; width: 50px; height: 50px; flex-shrink: 0; }
.nb-logo-glow {
  position: absolute; inset: -2px; border-radius: 13px;
  background: linear-gradient(135deg, #DC2626, #D4AF37, #DC2626);
  background-size: 300%; animation: nbGlow 4s linear infinite; opacity: .75;
}
@keyframes nbGlow { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
.nb-logo-box {
  position: relative; z-index: 1;
  width: 100%; height: 100%; border-radius: 12px;
  background: #fff; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,.35);
  animation: nbFloat 5s ease-in-out infinite;
}
@keyframes nbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
.nb-logo-img { width: 44px; height: 44px; object-fit: contain; display: block; }

.nb-live-dot {
  position: absolute; bottom: 2px; right: 2px; z-index: 2;
  width: 10px; height: 10px; border-radius: 50%;
  background: #22C55E; border: 2px solid #080C18;
  animation: nbLive 2.2s ease-in-out infinite;
}
@keyframes nbLive {
  0%,100%{ box-shadow: 0 0 0 0 rgba(34,197,94,.65); }
  50%    { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
}

.nb-brand-words { line-height: 1; }
.nb-brand-name {
  font-family: 'Merriweather', serif;
  font-size: 1.22rem; font-weight: 900;
  line-height: 1.1; letter-spacing: 0.01em;
}
.nb-blue { color: #1B3A8A; }
.nb-gold-txt {
  background: linear-gradient(135deg, #1DA1C8 0%, #38BDF8 55%, #0EA5E9 100%);
  background-size: 200%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: nbShimmer 4s ease-in-out infinite alternate;
}
@keyframes nbShimmer { from{background-position:0% 50%} to{background-position:200% 50%} }
.nb-brand-sub {
  font-family: 'Montserrat', sans-serif;
  font-size: .46rem; font-weight: 500;
  letter-spacing: .32em; text-transform: uppercase;
  color: rgba(255,255,255,.38); margin-top: 5px;
}

/* ══ DESKTOP LINKS ══ */
.nb-links { display: flex; align-items: center; gap: 4px; }
@media(max-width:900px){ .nb-links { display: none !important; } }

.nb-link {
  position: relative;
  font-family: 'Montserrat', sans-serif; font-size: .71rem; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.6); text-decoration: none;
  padding: 8px 14px; border-radius: 7px;
  background: none; border: none; cursor: pointer;
  transition: color .25s, background .25s;
}
.nb-link:hover { color: #fff; background: rgba(255,255,255,.06); }
.nb-link.nb-active { color: #fff; }

.nb-link-ul {
  position: absolute; bottom: 5px; left: 14px; right: 14px; height: 2px;
  background: linear-gradient(90deg, #DC2626, #D4AF37);
  border-radius: 2px;
  transform: scaleX(0); transform-origin: left;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.nb-link:hover .nb-link-ul,
.nb-link.nb-active .nb-link-ul { transform: scaleX(1); }

/* ══ RIGHT ACTIONS ══ */
.nb-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

.nb-tel {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'Poppins', sans-serif; font-size: .72rem; font-weight: 500;
  color: rgba(255,255,255,.5); text-decoration: none; white-space: nowrap;
  transition: color .2s;
}
.nb-tel:hover { color: #D4AF37; }
@media(max-width:1100px){ .nb-tel { display: none !important; } }

.nb-cta {
  position: relative; overflow: hidden;
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Montserrat', sans-serif; font-size: .71rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: #0A0F1A;
  background: linear-gradient(135deg, #F5D76E 0%, #D4AF37 55%, #B8921E 100%);
  border: none; padding: 11px 22px; cursor: pointer; white-space: nowrap;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  transition: transform .28s ease, box-shadow .3s ease;
}
.nb-shine {
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.3) 50%, transparent 70%);
  transform: translateX(-100%); transition: transform .5s ease; pointer-events: none;
}
.nb-cta:hover .nb-shine { transform: translateX(100%); }
.nb-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(212,175,55,.45); }
@media(max-width:900px){ .nb-cta:not(.nb-sb-cta) { display: none !important; } }

/* ══ HAMBURGER ══ */
.nb-ham {
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
  border-radius: 9px; padding: 10px; flex-shrink: 0;
  transition: background .2s, border-color .2s;
}
.nb-ham:hover { background: rgba(212,175,55,.1); border-color: rgba(212,175,55,.35); }
@media(max-width:900px){ .nb-ham { display: flex !important; } }

.nb-hline {
  display: block; width: 20px; height: 2px;
  background: #D4AF37; border-radius: 2px; transform-origin: center;
  transition: transform .38s cubic-bezier(.4,0,.2,1), opacity .28s, width .3s;
}
.nb-ham-open .nb-hline:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nb-ham-open .nb-hline:nth-child(2) { opacity: 0; width: 0; }
.nb-ham-open .nb-hline:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ══ OVERLAY ══ */
.nb-overlay {
  position: fixed; inset: 0; z-index: 950;
  background: rgba(4, 6, 14, 0);
  backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px);
  pointer-events: none;
  transition: background .4s ease, backdrop-filter .4s ease;
}
.nb-overlay-in {
  background: rgba(4, 6, 14, 0.72) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  pointer-events: all !important;
}

/* ══ SIDEBAR ══ */
.nb-sidebar {
  position: fixed; top: 0; right: 0; bottom: 0; z-index: 999;
  width: 320px; max-width: 88vw;
  background: linear-gradient(160deg, #0D1220 0%, #111827 40%, #0D1525 100%);
  border-left: 1px solid rgba(212,175,55,.15);
  display: flex; flex-direction: column; overflow: hidden;
  transform: translateX(100%); opacity: 0; visibility: hidden;
  transition:
    transform .42s cubic-bezier(.16,1,.3,1),
    opacity .38s ease,
    visibility 0s linear .42s;
  box-shadow: -8px 0 60px rgba(0,0,0,.55), -1px 0 0 rgba(212,175,55,.08);
}
.nb-sidebar-in {
  transform: translateX(0) !important; opacity: 1 !important; visibility: visible !important;
  transition:
    transform .42s cubic-bezier(.16,1,.3,1),
    opacity .38s ease,
    visibility 0s linear 0s !important;
}
.nb-sidebar::before {
  content: ''; position: absolute; top: -60px; right: -60px;
  width: 220px; height: 220px; border-radius: 50%;
  background: radial-gradient(circle, rgba(220,38,38,.12) 0%, transparent 65%);
  pointer-events: none;
}
.nb-sidebar::after {
  content: ''; position: absolute; bottom: 40px; left: -40px;
  width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,.08) 0%, transparent 65%);
  pointer-events: none;
}

/* Sidebar header */
.nb-sb-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 24px 18px; flex-shrink: 0;
}
.nb-sb-brand { display: flex; align-items: center; gap: 12px; }
.nb-sb-logo {
  width: 46px; height: 46px; border-radius: 11px;
  background: #fff; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,.35); flex-shrink: 0;
}
.nb-sb-name { font-size: 1.05rem !important; }

.nb-sb-close {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  color: rgba(255,255,255,.65); cursor: pointer; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
  transition: background .2s, color .2s, transform .3s;
}
.nb-sb-close:hover {
  background: rgba(220,38,38,.2); border-color: rgba(220,38,38,.4);
  color: #fff; transform: rotate(90deg);
}

.nb-sb-rule {
  height: 1.5px; margin: 0 24px;
  background: linear-gradient(90deg, rgba(220,38,38,.5), rgba(212,175,55,.6), transparent);
  flex-shrink: 0;
}

/* Sidebar nav links */
.nb-sb-links {
  flex: 1; padding: 18px 16px; display: flex; flex-direction: column; gap: 4px;
  overflow-y: auto;
}

.nb-sb-link {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px; border-radius: 12px;
  text-decoration: none; color: rgba(255,255,255,.62);
  background: none; border: 1px solid transparent; cursor: pointer; width: 100%;
  text-align: left;
  opacity: 0; transform: translateX(28px);
  transition:
    opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1),
    background .25s, border-color .25s, color .25s;
}
.nb-sb-link-in { opacity: 1 !important; transform: translateX(0) !important; }
.nb-sb-link:hover {
  background: rgba(255,255,255,.05); border-color: rgba(212,175,55,.18); color: #fff;
}
.nb-sb-link.nb-sb-active {
  background: rgba(212,175,55,.08); border-color: rgba(212,175,55,.28); color: #fff;
}
.nb-sb-icon {
  width: 36px; height: 36px; border-radius: 9px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.07);
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; flex-shrink: 0;
  transition: background .25s, border-color .25s;
}
.nb-sb-link:hover .nb-sb-icon,
.nb-sb-link.nb-sb-active .nb-sb-icon {
  background: rgba(212,175,55,.12); border-color: rgba(212,175,55,.28);
}
.nb-sb-label {
  flex: 1; font-family: 'Montserrat', sans-serif;
  font-size: .78rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
}
.nb-sb-arr {
  opacity: 0; transform: translateX(-4px);
  transition: opacity .2s, transform .2s; color: #D4AF37;
}
.nb-sb-link:hover .nb-sb-arr { opacity: 1; transform: translateX(0); }
.nb-sb-link.nb-sb-active .nb-sb-arr { opacity: .6; transform: translateX(0); }

/* Sidebar footer */
.nb-sb-footer {
  padding: 16px 20px 28px;
  border-top: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0; display: flex; flex-direction: column; gap: 14px;
}

.nb-sb-cta {
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-family: 'Montserrat', sans-serif; font-size: .76rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: #0A0F1A;
  background: linear-gradient(135deg, #F5D76E 0%, #D4AF37 55%, #B8921E 100%);
  border: none; border-radius: 10px; padding: 15px 24px; cursor: pointer; width: 100%;
  opacity: 0; transform: translateX(28px);
  transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1), box-shadow .3s, filter .2s;
}
.nb-sb-cta.nb-sb-link-in { opacity: 1 !important; transform: translateX(0) !important; }
.nb-sb-cta:hover { box-shadow: 0 14px 36px rgba(212,175,55,.45); filter: brightness(1.06); }

.nb-sb-contacts {
  display: flex; flex-direction: column; gap: 8px;
  opacity: 0; transform: translateX(28px);
  transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
}
.nb-sb-contacts.nb-sb-link-in { opacity: 1 !important; transform: translateX(0) !important; }

.nb-sb-contact-link {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: 'Poppins', sans-serif; font-size: .74rem; font-weight: 400;
  color: rgba(255,255,255,.45); text-decoration: none;
  padding: 8px 12px; border-radius: 8px;
  transition: color .2s, background .2s;
}
.nb-sb-contact-link:hover { color: #D4AF37; background: rgba(212,175,55,.07); }

.nb-sb-trust {
  display: flex; flex-wrap: wrap; gap: 8px;
  opacity: 0; transform: translateX(28px);
  transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
}
.nb-sb-trust.nb-sb-link-in { opacity: 1 !important; transform: translateX(0) !important; }
.nb-sb-trust span {
  font-family: 'Montserrat', sans-serif; font-size: .6rem; font-weight: 600;
  color: rgba(212,175,55,.55); letter-spacing: .08em;
}

body { overflow-x: hidden; }
`;