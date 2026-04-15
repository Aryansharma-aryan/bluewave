import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpeg";

const NAV_LINKS = [
  { label: "Home",              path: "/" },
  { label: "About",             path: "/about" },
  { label: "Services",          path: "/services" },
  { label: "Contact",           path: "/contact" },
  { label: "Consultation Form", path: "/consult" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("adminToken")));

  const active = location.pathname;
  const isActive = (path) => path === "/" ? active === "/" : active.startsWith(path);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(Boolean(localStorage.getItem("adminToken")));

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("focus", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("focus", syncAuthState);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("adminToken")));
  }, [location.pathname]);

  const goTo = (path) => { setOpen(false); navigate(path); };
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <style>{CSS}</style>

      <header className={`nb-header${scrolled ? " nb-scrolled" : ""}`}>
        <div className="nb-inner">

          {/* LOGO */}
         <button className="nb-brand" onClick={() => goTo("/")}>
  <img src={Logo} alt="BlueWave" className="nb-logo" />
  
  <div className="nb-brand-text">
    <span className="nb-brand-name">
      <span className="nb-blue">Blue</span>
      <span className="nb-wave">Wave</span>
    </span>
  </div>
</button>

          {/* DESKTOP NAV */}
          <nav className="nb-nav">
            {NAV_LINKS.map(l => (
              <button
                key={l.path}
                className={`nb-link${isActive(l.path) ? " nb-active" : ""}`}
                onClick={() => goTo(l.path)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* RIGHT: PHONE + CTA */}
          <div className="nb-right">
            <a href="tel:+971506580557" className="nb-phone">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.5 19.79 19.79 0 01.77 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <div className="nb-phone-info">
                <span className="nb-phone-label">PHONE:</span>
                <span className="nb-phone-num">+971 50 658 0557</span>
              </div>
            </a>

            <button className="nb-cta" onClick={() => goTo("/contact")}>
              Free Consultation
            </button>

            {isLoggedIn ? (
              <>
                <button className="nb-auth-btn" onClick={() => goTo("/admin")}>
                  Admin Panel
                </button>
                <button className="nb-auth-btn nb-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="nb-auth-btn" onClick={() => goTo("/login")}>
                Login
              </button>
            )}

            {/* HAMBURGER */}
            <button
              className={`nb-ham${open ? " nb-ham-open" : ""}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      <div className={`nb-overlay${open ? " nb-overlay-show" : ""}`} onClick={() => setOpen(false)} />

      {/* MOBILE DRAWER */}
      <div className={`nb-drawer${open ? " nb-drawer-open" : ""}`}>
        {/* Drawer header */}
        <div className="nb-drawer-head">
          <div className="nb-drawer-brand">
            <img src={Logo} alt="BlueWave" className="nb-drawer-logo" />
            <div>
              <div className="nb-brand-name">
                <span className="nb-blue">Blue</span><span className="nb-wave">Wave</span>
              </div>
              <div className="nb-brand-tagline">Management Consultancy</div>
            </div>
          </div>
          <button className="nb-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="nb-drawer-divider" />

        {/* Links */}
        <nav className="nb-drawer-nav">
          {NAV_LINKS.map(l => (
            <button
              key={l.path}
              className={`nb-drawer-link${isActive(l.path) ? " nb-drawer-active" : ""}`}
              onClick={() => goTo(l.path)}
            >
              {l.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}

          {isLoggedIn ? (
            <>
              <button
                className={`nb-drawer-link${isActive("/admin") ? " nb-drawer-active" : ""}`}
                onClick={() => goTo("/admin")}
              >
                Admin Panel
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              <button className="nb-drawer-link nb-drawer-logout" onClick={handleLogout}>
                Logout
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          ) : (
            <button
              className={`nb-drawer-link${isActive("/login") ? " nb-drawer-active" : ""}`}
              onClick={() => goTo("/login")}
            >
              Login
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </nav>

        {/* Drawer footer */}
        <div className="nb-drawer-footer">
          <a href="tel:+971506580557" className="nb-drawer-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.5 19.79 19.79 0 01.77 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +971 50 658 0557
          </a>
          <button className="nb-drawer-cta" onClick={() => goTo("/consult")}>
            Book Free Consultation
          </button>
        </div>
      </div>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── HEADER ── */
  .nb-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 900;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    transition: box-shadow 0.3s ease;
  }
  .nb-scrolled {
    box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  }

  .nb-inner {
    height: 90px;   /* increase header height */

    max-width: 1280px; margin: 0 auto;
    padding: 0 32px; height: 72px;
    display: flex; align-items: center; gap: 32px;
    justify-content: space-between;
  }

  
  /* ── BRAND ── */
.nb-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.nb-brand:hover {
  transform: translateY(-1px);
}

/* LOGO */
.nb-logo {
  width: 65px;
  height: 65px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.nb-brand:hover .nb-logo {
  transform: scale(1.08);
}

/* TEXT */
.nb-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

/* NAME */
.nb-brand-name {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.08);
}

/* COLORS (MATCHED WITH YOUR LOGO) */
.nb-blue {
  color: #2F4A8A;   /* navy blue from logo */
}

.nb-wave {
  color: #2AA7B8;   /* teal from arrow */
}

/* HOVER COLORS (SUBTLE, NOT RED ❌) */
.nb-brand:hover .nb-blue {
  color: #3B5BB5;
}

.nb-brand:hover .nb-wave {
  color: #1F8A9B;
}
/* ── DESKTOP NAV ── */
.nb-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  justify-content: center;
}

@media (max-width: 900px) {
  .nb-nav { display: none !important; }
}

/* NAV LINKS */
.nb-link {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  padding: 10px 16px;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

/* UNDERLINE (MATCH LOGO COLORS) */
.nb-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #2F4A8A, #2AA7B8);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

/* HOVER EFFECT */
.nb-link:hover {
  color: #2F4A8A;
  transform: translateY(-2px);
}

.nb-link:hover::after {
  width: 70%;
}

/* ACTIVE LINK */
.nb-link.nb-active {
  color: #2AA7B8;
}

.nb-link.nb-active::after {
  width: 70%;
}

/* BRAND HOVER (FIXED COLORS – NO RED) */
.nb-brand:hover .nb-blue {
  color: #3B5BB5;
}

.nb-brand:hover .nb-wave {
  color: #1F8A9B;
}

.nb-brand:hover .nb-logo {
  transform: scale(1.08);
}

  /* ── RIGHT ── */
  .nb-right {
    display: flex; align-items: center; gap: 16px; flex-shrink: 0;
  }

  .nb-phone {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; color: #333;
    transition: color 0.2s;
  }
  .nb-phone:hover { color: #e53935; }
  .nb-phone svg { color: #e53935; flex-shrink: 0; }
  .nb-phone-info { display: flex; flex-direction: column; line-height: 1.2; }
  .nb-phone-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.6rem; font-weight: 600;
    color: #999; letter-spacing: 0.08em;
  }
  .nb-phone-num {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    color: #222;
  }
  @media (max-width: 1100px) { .nb-phone { display: none !important; } }

  .nb-cta {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    color: #fff; background: #e53935;
    border: none; border-radius: 6px;
    padding: 10px 20px; cursor: pointer; white-space: nowrap;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .nb-cta:hover {
    background: #c62828;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(229,57,53,0.35);
  }
  @media (max-width: 900px) { .nb-cta { display: none !important; } }

  .nb-auth-btn {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    color: #1f2937; background: transparent;
    border: 1px solid #e0e0e0; border-radius: 6px;
    padding: 10px 16px; cursor: pointer; white-space: nowrap;
    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .nb-auth-btn:hover {
    color: #2F4A8A;
    border-color: #cfd8ea;
    background: #f8fbff;
    transform: translateY(-1px);
  }
  .nb-logout {
    color: #fff;
    background: #e53935;
    border-color: #e53935;
  }
  .nb-logout:hover {
    color: #fff;
    background: #c62828;
    border-color: #c62828;
    box-shadow: 0 4px 16px rgba(229,57,53,0.35);
  }
  @media (max-width: 900px) { .nb-auth-btn { display: none !important; } }

  /* ── HAMBURGER ── */
  .nb-ham {
    display: none; flex-direction: column; justify-content: center;
    gap: 5px; width: 38px; height: 38px;
    background: none; border: 1px solid #e0e0e0;
    border-radius: 7px; cursor: pointer; padding: 8px;
    transition: border-color 0.2s, background 0.2s;
  }
  .nb-ham:hover { border-color: #e53935; background: #fff5f5; }
  @media (max-width: 900px) { .nb-ham { display: flex !important; } }
  .nb-ham span {
    display: block; width: 100%; height: 2px;
    background: #333; border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.2s;
    transform-origin: center;
  }
  .nb-ham-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nb-ham-open span:nth-child(2) { opacity: 0; }
  .nb-ham-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── OVERLAY ── */
  .nb-overlay {
    display: none; position: fixed; inset: 0; z-index: 950;
    background: rgba(0,0,0,0.45);
  }
  .nb-overlay-show { display: block !important; }

  /* ── DRAWER ── */
  .nb-drawer {
    position: fixed; top: 0; left: 0; bottom: 0; z-index: 999;
    width: 300px; max-width: 88vw;
    background: #fff;
    box-shadow: 4px 0 32px rgba(0,0,0,0.15);
    display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-drawer-open { transform: translateX(0) !important; }

  /* Drawer header */
  .nb-drawer-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 20px;
  }
  .nb-drawer-brand { display: flex; align-items: center; gap: 10px; }
  .nb-drawer-logo {
    width: 44px; height: 44px; border-radius: 9px;
    object-fit: contain; border: 1px solid #e8e8e8;
  }

  .nb-close {
    width: 34px; height: 34px; border-radius: 50%;
    background: #f5f5f5; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #555; transition: background 0.2s, color 0.2s;
  }
  .nb-close:hover { background: #ffebee; color: #e53935; }

  .nb-drawer-divider {
    height: 1px; background: #f0f0f0; margin: 0 20px;
  }

  /* Drawer nav */
  .nb-drawer-nav {
    flex: 1; padding: 12px 12px; display: flex; flex-direction: column; gap: 2px;
    overflow-y: auto;
  }
  .nb-drawer-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem; font-weight: 500;
    color: #333; background: none; border: none; cursor: pointer;
    text-align: left; width: 100%;
    transition: background 0.2s, color 0.2s;
  }
  .nb-drawer-link:hover { background: #fff5f5; color: #e53935; }
  .nb-drawer-link.nb-drawer-active {
    background: #fff5f5; color: #e53935; font-weight: 600;
  }
  .nb-drawer-link.nb-drawer-logout {
    color: #e53935;
  }
  .nb-drawer-link.nb-drawer-logout svg {
    color: #e53935;
  }
  .nb-drawer-link svg { color: #bbb; transition: color 0.2s; }
  .nb-drawer-link:hover svg,
  .nb-drawer-link.nb-drawer-active svg { color: #e53935; }

  /* Drawer footer */
  .nb-drawer-footer {
    padding: 16px 20px 28px;
    border-top: 1px solid #f0f0f0;
    display: flex; flex-direction: column; gap: 12px;
  }
  .nb-drawer-phone {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    color: #555; text-decoration: none;
    padding: 10px 14px; border-radius: 7px;
    border: 1px solid #e8e8e8;
    transition: border-color 0.2s, color 0.2s;
  }
  .nb-drawer-phone:hover { border-color: #e53935; color: #e53935; }

  .nb-drawer-cta {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem; font-weight: 600;
    color: #fff; background: #e53935;
    border: none; border-radius: 7px;
    padding: 14px; cursor: pointer; width: 100%;
    transition: background 0.2s;
  }
  .nb-drawer-cta:hover { background: #c62828; }

  body { overflow-x: hidden; }
`;
