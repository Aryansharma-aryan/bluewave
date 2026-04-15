import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import studyImg     from "../assets/study.png";
import visitorImg   from "../assets/visitor visa.png";
import dependentImg from "../assets/dependent.png";
import workImg      from "../assets/work.png";
import touristImg   from "../assets/touristt.jfif";
import pteImg       from "../assets/pte.png";

/* ─────────────────────────────────────────────
   SMOOTH CURSOR
───────────────────────────────────────────── */
function SmoothCursor({ visible, hover }) {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const lerped  = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.13);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.13);
      if (ringRef.current) {
        ringRef.current.style.left = lerped.current.x + "px";
        ringRef.current.style.top  = lerped.current.y + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + "px";
        dotRef.current.style.top  = mouse.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const size = hover ? 52 : 32;
  return createPortal(
    <>
      <div ref={ringRef} style={{
        position: "fixed", width: size, height: size,
        marginLeft: -(size / 2), marginTop: -(size / 2),
        border: "2.5px solid #c0392b", borderRadius: "50%",
        background: hover ? "rgba(192,57,43,0.10)" : "transparent",
        pointerEvents: "none", zIndex: 999999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s, width 0.2s, height 0.2s, margin 0.2s, background 0.2s",
        willChange: "left, top",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", width: 7, height: 7,
        marginLeft: -3.5, marginTop: -3.5,
        background: "#c0392b", borderRadius: "50%",
        pointerEvents: "none", zIndex: 999999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
        willChange: "left, top",
      }} />
    </>,
    document.body
  );
}

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Study Visa",
    desc: "Apply study visas today with Western Overseas to open multiple possibilities. Studying abroad in the UK, USA, Australia, and Canada enhances knowledge and career prospects.",
    img: studyImg, path: "/study-visa",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><path d="M24 6L42 15v2L24 26 6 17v-2L24 6z" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round"/><path d="M10 19v12c0 5 6.268 8 14 8s14-3 14-8V19" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/><path d="M42 15v13" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/></svg>),
  },
  {
    title: "Visitor Visa",
    desc: "Visit Canada, Australia, the USA, New Zealand, the UK, and Europe as a tourist to meet friends and family. Explore more options with Western Overseas.",
    img: visitorImg, path: "/visitor-visa",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><rect x="6" y="10" width="36" height="28" rx="3" stroke="#fff" strokeWidth="2.4"/><path d="M6 18h36" stroke="#fff" strokeWidth="2.4"/><circle cx="16" cy="30" r="3" stroke="#fff" strokeWidth="2.2"/><path d="M22 30h10M22 34h7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  },
  {
    title: "Dependent Visa",
    desc: "Western Overseas supports getting child and spouse visas to reunite all family members. A genuine relationship must be established to apply.",
    img: dependentImg, path: "/dependent",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><circle cx="17" cy="14" r="6" stroke="#fff" strokeWidth="2.4"/><circle cx="31" cy="14" r="6" stroke="#fff" strokeWidth="2.4"/><path d="M5 42c0-7.732 5.373-14 12-14h14c6.627 0 12 6.268 12 14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/></svg>),
  },
  {
    title: "Work Visa",
    desc: "Secure international job opportunities with expert work visa processing. We assist skilled professionals applying for permits across the UK, Canada, Australia, and Germany.",
    img: workImg, path: "/work",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><rect x="6" y="16" width="36" height="26" rx="3" stroke="#fff" strokeWidth="2.4"/><path d="M16 16V12a3 3 0 013-3h10a3 3 0 013 3v4" stroke="#fff" strokeWidth="2.4"/><path d="M6 28h36" stroke="#fff" strokeWidth="2.4"/></svg>),
  },
  {
    title: "Tourist Visa",
    desc: "Explore the world with fast and hassle-free tourist visa approvals. We support all major destinations including Europe, USA, UAE, Thailand, and Southeast Asia.",
    img: touristImg, path: "/tourist",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><path d="M10 40l5-14 19-17-17 19-7 12z" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round"/><path d="M33 10l5 5-12 9 2-14z" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round"/></svg>),
  },
  {
    title: "IELTS / PTE Coaching",
    desc: "Achieve your target band score with expert IELTS and PTE coaching. Structured lessons, full-length mock tests, and personalised feedback from experienced trainers.",
    img: pteImg, path: "/ielts-pte",
    icon: (<svg viewBox="0 0 48 48" fill="none" width="26" height="26"><rect x="6" y="8" width="36" height="32" rx="3" stroke="#fff" strokeWidth="2.4"/><path d="M14 20h20M14 28h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/></svg>),
  },
];

const TOTAL = SERVICES.length;

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ServicesSlider() {
  const navigate = useNavigate();
  const [active,      setActive]      = useState(0);
  const [paused,      setPaused]      = useState(false);
  const [cursorOn,    setCursorOn]    = useState(false);
  const [cursorHover, setCursorHover] = useState(false);

  const goTo = useCallback((i) => {
    setActive(((i % TOTAL) + TOTAL) % TOTAL);
  }, []);

  /* auto-slide every 1.6 seconds */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % TOTAL), 1600);
    return () => clearInterval(t);
  }, [paused]);

  const prev = (active - 1 + TOTAL) % TOTAL;
  const next = (active + 1) % TOTAL;

  return (
    <>
      <SmoothCursor visible={cursorOn} hover={cursorHover} />

      <section
        className="svc-root"
        onMouseEnter={() => { setPaused(true);  setCursorOn(true);  }}
        onMouseLeave={() => { setPaused(false); setCursorOn(false); setCursorHover(false); }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

          .svc-root {
            font-family: 'Nunito', sans-serif;
            background: #eef0f7;
            padding: 60px 24px 56px;
            text-align: center;
            overflow: hidden;
            cursor: none;
          }
/* HEADER */
.svc-sub {
  font-size: 24px;
  font-weight: 800;
  color: #e74c3c;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 40px 0 12px; /* 👈 added top spacing */
}

.svc-heading {
  font-size: clamp(32px, 4vw, 52px); /* 👈 bigger responsive size */
  font-weight: 900;
  margin: 0 0 60px; /* 👈 more bottom spacing */
  line-height: 1.25;

  /* 🔥 Gradient text */
  background: linear-gradient(90deg, #1a1a2e, #16213e, #0f3460);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Optional smooth look */
  letter-spacing: -0.5px;
}

          /* STAGE */
          .svc-stage {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 22px;
            max-width: 1100px;
            margin: 0 auto;
            align-items: stretch;
          }
          @media (max-width: 800px) {
            .svc-stage { grid-template-columns: 1fr; }
            .svc-side  { display: none; }
          }

          /* CARD */
          .svc-card {
            background: #fff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0,0,0,0.08);
            transition: box-shadow 0.32s, transform 0.32s;
            display: flex;
            flex-direction: column;
            cursor: none;
            position: relative;
          }
          .svc-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.14), 0 6px 16px rgba(192,57,43,0.10);
          }
          .svc-card.center {
            box-shadow: 0 8px 32px rgba(192,57,43,0.18), 0 2px 10px rgba(0,0,0,0.08);
          }
          .svc-card.center:hover {
            box-shadow: 0 24px 56px rgba(192,57,43,0.22), 0 8px 20px rgba(0,0,0,0.10);
          }

          /* IMAGE — full cover */
          .svc-img {
            position: relative;
            height: 210px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .svc-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 0.55s ease;
          }
          .svc-card:hover .svc-img img { transform: scale(1.07); }

          /* soft dark overlay so text/badge reads well */
          .svc-img-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.36) 100%);
          }

          /* BADGE */
          .svc-badge {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 62px;
            height: 62px;
            background: #c0392b;
            border-radius: 50%;
            border: 5px solid #eef0f7;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(192,57,43,0.38);
            z-index: 2;
            transition: transform 0.28s, box-shadow 0.28s;
          }
          .svc-card:hover .svc-badge {
            transform: translateX(-50%) scale(1.1);
            box-shadow: 0 10px 28px rgba(192,57,43,0.46);
          }

          /* BODY */
          .svc-body {
            padding: 52px 26px 34px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .svc-name {
            font-size: 20px;
            font-weight: 800;
            color: #1a1a2e;
            margin: 0 0 14px;
            line-height: 1.3;
          }
          .svc-name.red { color: #c0392b; }
          .svc-desc {
            font-size: 14.5px;
            color: #777;
            line-height: 1.85;
            margin: 0 0 28px;
            flex: 1;
          }

          /* BUTTON */
          .svc-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 12px 26px;
            border-radius: 5px;
            font-family: 'Nunito', sans-serif;
            font-size: 14.5px;
            font-weight: 700;
            cursor: none;
            border: 2px solid #1a1a2e;
            background: transparent;
            color: #1a1a2e;
            transition: background 0.22s, color 0.22s, border-color 0.22s, gap 0.22s, box-shadow 0.22s;
          }
          .svc-btn svg { flex-shrink: 0; transition: transform 0.22s; }
          .svc-btn:hover svg { transform: translateX(5px); }
          .svc-btn:hover {
            background: #c0392b;
            border-color: #c0392b;
            color: #fff;
            gap: 18px;
            box-shadow: 0 4px 14px rgba(192,57,43,0.32);
          }
          .svc-btn.solid {
            background: #c0392b;
            border-color: #c0392b;
            color: #fff;
          }
          .svc-btn.solid:hover {
            background: #a93226;
            border-color: #a93226;
            gap: 18px;
            box-shadow: 0 4px 18px rgba(192,57,43,0.42);
          }

          /* DOTS — cursor: pointer */
          .svc-dots {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 44px;
          }
          .svc-dot {
            width: 32px;
            height: 6px;
            border-radius: 3px;
            border: none;
            padding: 0;
            background: #ccc;
            cursor: pointer;
            transition: background 0.3s, width 0.3s;
          }
          .svc-dot:hover { background: #aaa; }
          .svc-dot.on {
            background: #c0392b;
            width: 44px;
          }
          .svc-dot.on:hover { background: #a93226; }
        `}</style>

        {/* HEADER */}
        <p className="svc-sub">Our Services</p>
        <h2 className="svc-heading">
          We are the Leading and Most Reliable<br />Immigration Experts.
        </h2>

        {/* 3 CARDS */}
        <div className="svc-stage">
          {[prev, active, next].map((idx, pos) => {
            const s = SERVICES[idx];
            const isCenter = pos === 1;
            return (
              <div
                key={`${idx}-${pos}`}
                className={pos !== 1 ? "svc-side" : ""}
                style={{ cursor: pos !== 1 ? "pointer" : "none" }}
                onClick={!isCenter ? () => goTo(idx) : undefined}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <div className={`svc-card${isCenter ? " center" : ""}`}>
                  <div className="svc-img">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" />
                    <div className="svc-img-overlay" />
                    <div className="svc-badge">{s.icon}</div>
                  </div>
                  <div className="svc-body">
                    <h3 className={`svc-name${isCenter ? " red" : ""}`}>{s.title}</h3>
                    <p className="svc-desc">{s.desc}</p>
                    <button
                      className={`svc-btn${isCenter ? " solid" : ""}`}
                      onClick={(e) => { e.stopPropagation(); navigate(s.path); }}
                    >
                      Read More
                      <svg width="20" height="10" viewBox="0 0 22 10" fill="none">
                        <path d="M1 5h20M16 1l5 4-5 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DOTS */}
        <div className="svc-dots">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              className={`svc-dot${i === active ? " on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}