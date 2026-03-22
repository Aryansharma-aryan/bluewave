import { useEffect, useState } from "react";
import Logo from "../assets/logo.jpeg";

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevOverflow = document.body.style.overflow;
    document.body.style.background = "#06091A";
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("hold"), 200);
    const t2 = setTimeout(() => setPhase("exit"), 1500);
    const t3 = setTimeout(() => onDone?.(), 2100);

    return () => {
      document.body.style.background = prevBg;
      document.body.style.overflow = prevOverflow;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className={`ld-root ld-${phase}`}>
      <div className="ld-bg" />
      <div className="ld-glow" />

      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="ld-particle"
          style={{
            left: `${10 + (i * 7.5) % 80}%`,
            top: `${15 + (i * 13) % 70}%`,
            animationDelay: `${i * 0.12}s`,
            width: i % 3 === 0 ? "4px" : "3px",
            height: i % 3 === 0 ? "4px" : "3px",
            background: i % 2 === 0 ? "#38BDF8" : "#D4AF37",
          }}
        />
      ))}

      <div className="ld-center">
        <div className="ld-logo-wrap">
          <div className="ld-ring ld-ring-outer" />
          <div className="ld-ring ld-ring-inner" />

          <div className="ld-logo-box">
            <img
              src={Logo}
              alt="Blue Waves"
              className="ld-logo-img"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="ld-bw-mark">
              <span className="ld-bw-b">B</span>
              <span className="ld-bw-w">W</span>
            </div>
          </div>

          <svg className="ld-swoosh" viewBox="0 0 120 120" fill="none">
            <path
              d="M 20 95 Q 50 20, 100 25"
              stroke="url(#swooshGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="96,18 106,28 98,32" fill="#38BDF8" />
            <defs>
              <linearGradient id="swooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>

          <div className="ld-cap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L2 8l10 5 10-5-10-5z" fill="#1B3A8A" />
              <path d="M6 10.5v5c0 0 2 2 6 2s6-2 6-2v-5" fill="#1B3A8A" opacity="0.7" />
              <rect x="20" y="8" width="2" height="5" rx="1" fill="#38BDF8" />
            </svg>
          </div>
        </div>

        <div className="ld-brand">
          <div className="ld-brand-name">
            <span className="ld-b">Blue</span>
            <span className="ld-w"> Waves</span>
          </div>
          <div className="ld-brand-sub">Management Consultancy</div>
        </div>

        <div className="ld-tagline">Your Gateway to Global Opportunities</div>

        <div className="ld-bar-wrap">
          <div className="ld-bar" />
        </div>

        <div className="ld-dots">
          <span className="ld-dot" />
          <span className="ld-dot" style={{ animationDelay: ".2s" }} />
          <span className="ld-dot" style={{ animationDelay: ".4s" }} />
        </div>
      </div>
    </div>
  );
}
