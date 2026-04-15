import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

import usaImg from "../../assets/usa.jfif";
import ukImg from "../../assets/uk.jfif";
import canadaImg from "../../assets/canada.jfif";
import travelVideo from "../../videos/travel.mp4";

/* ─── DATA (outside component — never recreated) ─── */

const SERVICES = [
  {
    icon: "🧭",
    title: "Personalised Consultation",
    desc: "A certified expert reviews your profile and maps the best visa strategy — before you pay anything.",
    points: ["1-on-1 session (video or in-person)", "Free eligibility pre-screening", "Country-specific rules explained", "Ideal time-to-apply advice"],
  },
  {
    icon: "📋",
    title: "Documentation Preparation",
    desc: "We prepare every document the embassy needs — reviewed twice, zero errors, zero missing items.",
    points: ["Personalised checklist", "Cover letter to embassy standard", "Bank statement guidance", "Employer letter format"],
  },
  {
    icon: "🗺️",
    title: "Travel & Itinerary Planning",
    desc: "We design a day-by-day itinerary and handle bookings that meet all embassy requirements.",
    points: ["Day-by-day itinerary", "Hotel & flight booking support", "Travel insurance guidance", "Return ticket documentation"],
  },
  {
    icon: "📁",
    title: "Application Filing & Tracking",
    desc: "We file, book biometrics, and send you WhatsApp updates at every milestone.",
    points: ["VFS / embassy appointment booked", "Online form filled & verified", "Daily status tracking", "Same-day query response"],
  },
  {
    icon: "🎙️",
    title: "Interview Preparation",
    desc: "Mock sessions with real embassy questions so you walk in confident and walk out approved.",
    points: ["Mock Q&A sessions", "Tone & body language coaching", "Common refusal trigger list", "Day-of checklist"],
  },
  {
    icon: "🔄",
    title: "Rejection & Reapplication",
    desc: "Refused? We decode the reason, rebuild your case, and reapply with a much stronger file.",
    points: ["Refusal letter analysed", "Case rebuilt with stronger evidence", "No extra fee for prior clients", "80%+ reapplication success"],
  },
];

const STEPS = [
  {
    num: "01", title: "Consultation",
    detail: "Share your travel plans and passport history. Our expert assesses your full profile and tells you honestly what to strengthen before applying.",
    tags: ["Free", "Video or in-person", "No obligation"],
  },
  {
    num: "02", title: "Documentation",
    detail: "We prepare a personalised checklist, draft your cover letter, review financials, and organise every document into the exact embassy format.",
    tags: ["Cover letter", "Bank guidance", "Error-free guarantee"],
  },
  {
    num: "03", title: "Filing & Tracking",
    detail: "Application filed through official channels. Biometrics booked. Status tracked daily. WhatsApp updates at every step.",
    tags: ["VFS booking", "Daily tracking", "WhatsApp updates"],
  },
  {
    num: "04", title: "Approval & Departure",
    detail: "Visa approved — we guide passport collection, explain your visa conditions, and hand you a pre-departure checklist.",
    tags: ["Passport collection", "Conditions explained", "Pre-departure checklist"],
  },
];

const COUNTRIES = [
  { name: "USA",            img: usaImg,    tag: "B1/B2 Tourist Visa" },
  { name: "United Kingdom", img: ukImg,     tag: "Standard Visitor Visa" },
  { name: "Canada",         img: canadaImg, tag: "Temporary Resident Visa" },
  { name: "Schengen",       img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=75", tag: "Schengen Zone Visa" },
  { name: "Dubai / UAE",    img: "https://images.unsplash.com/photo-1465082772432-1b2d7a29bafe?w=600&q=75", tag: "Tourist Visa 30–90 days" },
];

const STATS = [["98%","Success Rate"],["50K+","Visas Processed"],["45+","Countries"],["12 yrs","Experience"]];

/* ─── VARIANTS (outside component — stable references) ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

/* ─── COMPONENT ─── */
export default function TouristVisa() {
  const [showPopup,  setShowPopup]  = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  /* cursor — pure DOM, zero state re-renders */
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const smooth    = useRef({ x: 0, y: 0 });
  const rafCursor = useRef(null);

  /* slider */
  const sliderRef = useRef(null);
  const sliderPos = useRef(0);
  const rafSlider = useRef(null);

  /* ── cursor: mousemove + RAF loop ── */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const { x, y } = mouse.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      }
      smooth.current.x += (x - smooth.current.x) * 0.13;
      smooth.current.y += (y - smooth.current.y) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smooth.current.x}px,${smooth.current.y}px) translate(-50%,-50%)`;
      }
      rafCursor.current = requestAnimationFrame(tick);
    };
    rafCursor.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafCursor.current);
    };
  }, []);

  /* toggle cursor size via className — no state */
  const onEnter = useCallback(() => {
    dotRef.current?.classList.add("cur-big");
    ringRef.current?.classList.add("cur-hide");
  }, []);
  const onLeave = useCallback(() => {
    dotRef.current?.classList.remove("cur-big");
    ringRef.current?.classList.remove("cur-hide");
  }, []);

  /* ── slider: RAF (smoother than setInterval) ── */
  useEffect(() => {
    const tick = () => {
      const el = sliderRef.current;
      if (el) {
        sliderPos.current += 0.5;
        if (sliderPos.current >= el.scrollWidth - el.clientWidth) sliderPos.current = 0;
        el.scrollLeft = sliderPos.current;
      }
      rafSlider.current = requestAnimationFrame(tick);
    };
    rafSlider.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafSlider.current);
  }, []);

  /* ── popup ── */
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const toggleStep = useCallback((i) => setActiveStep((p) => (p === i ? null : i)), []);

  return (
    <div className="relative bg-white text-gray-800 overflow-hidden" style={{ cursor: "none" }}>

      {/* ── CURSOR STYLES (inline to avoid extra file) ── */}
      <style>{`
        .cur-dot{position:fixed;top:0;left:0;width:12px;height:12px;background:#185FA5;border-radius:50%;pointer-events:none;z-index:9999;will-change:transform;transition:width .18s,height .18s,background .18s}
        .cur-ring{position:fixed;top:0;left:0;width:36px;height:36px;border:1.5px solid #185FA5;border-radius:50%;pointer-events:none;z-index:9998;will-change:transform;opacity:.5;transition:opacity .18s}
        .cur-big{width:38px!important;height:38px!important;background:rgba(24,95,165,.12)!important}
        .cur-hide{opacity:0!important}
      `}</style>
      <div ref={dotRef}  className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />

      {/* ── POPUP ── */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
          >
            <div className="text-4xl mb-3">✈️</div>
            <h2 className="text-xl font-bold text-blue-900 mb-1">Free Visa Assessment</h2>
            <p className="text-gray-400 text-sm mb-5">Certified expert checks your eligibility — 100% free.</p>
            <input type="tel"  placeholder="Phone number"        className="w-full border border-gray-200 rounded-xl p-3 mb-3 text-sm outline-none focus:border-blue-400 transition" />
            <input type="text" placeholder="Destination country" className="w-full border border-gray-200 rounded-xl p-3 mb-4 text-sm outline-none focus:border-blue-400 transition" />
            <button
              onMouseEnter={onEnter} onMouseLeave={onLeave}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
            >
              Get Free Assessment
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition block w-full"
            >
              Maybe later
            </button>
          </motion.div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative h-[92vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay loop muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={travelVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/75 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Trusted by 50,000+ Travellers
          </motion.span>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Explore The World<br />
            <span className="text-sky-300">Without Stress</span>
          </h1>
          <p className="text-white/75 max-w-md mx-auto mb-8 text-lg font-light">
            End-to-end tourist visa guidance — from eligibility check to visa in hand.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onMouseEnter={onEnter} onMouseLeave={onLeave}
              onClick={() => setShowPopup(true)}
              className="px-7 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              Check Eligibility Free
            </button>
            <button
              onMouseEnter={onEnter} onMouseLeave={onLeave}
              onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-200"
            >
              Our Services ↓
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-8 bg-white/10 backdrop-blur border border-white/15 rounded-2xl px-8 py-4"
        >
          {STATS.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-white font-bold text-lg">{n}</div>
              <div className="text-white/55 text-xs uppercase tracking-wide">{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

     <section id="services" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
  <div className="max-w-6xl mx-auto relative z-10">

    {/* HEADER */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <span className="text-sm md:text-base font-semibold uppercase tracking-widest text-blue-500 mb-3 block">
        Our Services
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-5 leading-tight">
        Everything Handled,<br />
        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Start to Finish
        </span>
      </h2>

      <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
        From your first question to visa approval — every step designed for clarity, speed, and success.
      </p>
    </motion.div>

    {/* GRID */}
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {SERVICES.map((s, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          whileHover={{ y: -10 }}
          className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30"
        >
          {/* GLOW EFFECT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20" />

          {/* CARD */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-7 h-full shadow-sm group-hover:shadow-xl transition-all duration-300">

            {/* ICON */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 flex items-center justify-center text-xl mb-5 transition">
              {s.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-blue-900 mb-3 text-lg md:text-xl">
              {s.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
              {s.desc}
            </p>

            {/* POINTS */}
            <ul className="space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1 w-4 h-4 min-w-4 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 font-bold text-xs">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>

          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>

  {/* BACKGROUND BLUR SHAPES */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl opacity-30" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl opacity-30" />
</section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">4 Steps to Approval</h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm">Clear, simple, transparent — no surprises.</p>
          </motion.div>

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="flex"
            >
              {/* spine */}
              <div className="flex flex-col items-center" style={{ width: 52 }}>
                <motion.button
                  whileInView={{ scale: [0.6, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  onClick={() => toggleStep(i)}
                  onMouseEnter={onEnter} onMouseLeave={onLeave}
                  className={`w-9 h-9 rounded-full font-bold text-xs z-10 transition-all duration-300 ${
                    activeStep === i
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                  }`}
                >
                  {step.num}
                </motion.button>
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.25 }}
                    style={{ transformOrigin: "top" }}
                    className="w-px bg-blue-100 flex-1 my-1"
                  />
                )}
              </div>

              {/* content */}
              <div className="pb-10 pl-4 flex-1">
                <button
                  onClick={() => toggleStep(i)}
                  onMouseEnter={onEnter} onMouseLeave={onLeave}
                  className="text-left w-full"
                >
                  <h3 className="font-semibold text-blue-900 text-sm pt-1.5 mb-1 hover:text-blue-600 transition">{step.title}</h3>
                  {activeStep !== i && <p className="text-gray-300 text-xs">Tap to see details ↓</p>}
                </button>

                <motion.div
                  animate={{ height: activeStep === i ? "auto" : 0, opacity: activeStep === i ? 1 : 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 pt-1">{step.detail}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((t) => (
                      <span key={t} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2 block">Destinations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Countries We Process</h2>
          </motion.div>

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {COUNTRIES.map((c, i) => (
              <motion.div
                key={i}
                onMouseEnter={onEnter} onMouseLeave={onLeave}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.22 }}
                className="min-w-[230px] rounded-2xl overflow-hidden relative flex-shrink-0 shadow-sm"
                style={{ height: 270 }}
              >
                <img
                  src={c.img} alt={c.name}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold">{c.name}</h3>
                  <span className="text-xs text-white/70 bg-white/10 backdrop-blur px-2.5 py-0.5 rounded-full mt-1 inline-block">{c.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center bg-white">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2 block">Get Started</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Ready to Travel?</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">A visa expert will call you within 2 hours — free, no obligation.</p>
          <div className="flex gap-3 justify-center flex-wrap max-w-sm mx-auto">
            <input
              type="tel" placeholder="Your phone number"
              className="flex-1 min-w-40 border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-blue-400 transition"
            />
            <button
              onMouseEnter={onEnter} onMouseLeave={onLeave}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition whitespace-nowrap"
            >
              Talk to Expert →
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}