import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Counter({ to, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function ScrollReveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  const base = "transition-all duration-700";
  const hidden = direction === "left" ? "opacity-0 -translate-x-8"
    : direction === "right" ? "opacity-0 translate-x-8"
    : direction === "scale" ? "opacity-0 scale-90"
    : "opacity-0 translate-y-8";
  return (
    <div
      ref={ref}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.68, 0, 1.15)", transitionDelay: visible ? "0ms" : `${delay}ms` }}
      className={`${base} ${visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const offerings = [
  { emoji: "🌍", title: "50+ Countries Covered", desc: "UK, USA, Canada, Schengen, Australia, UAE and more. We know embassy requirements inside-out." },
  { emoji: "🛡️", title: "100% Compliance Guaranteed", desc: "Every application meets strict embassy standards. No shortcuts, no risks — ever." },
  { emoji: "⚡", title: "Fast-Track Processing", desc: "Urgent travel? We prioritise your file and work swiftly without compromising quality." },
  { emoji: "👤", title: "Dedicated Case Manager", desc: "One expert handles your case start to finish. No handoffs, no confusion." },
  { emoji: "📄", title: "Strong Cover Letters", desc: "Professionally written letters that clearly explain your purpose — a key approval factor." },
  { emoji: "⭐", title: "High Approval Rate", desc: "Our meticulous approach has built an exceptional track record across thousands of applications." },
];

const steps = [
  { num: "01", title: "Free Consultation", desc: "Start with a no-obligation call. Our visa specialists listen to your travel goals, assess your profile, and recommend the most suitable visitor visa pathway for you." },
  { num: "02", title: "Document Checklist", desc: "We provide a precise, personalised checklist — no guesswork. Every document is tailored to your destination country's embassy requirements." },
  { num: "03", title: "Application Preparation", desc: "Our experts review and prepare your complete application package — forms, cover letters, financial statements — ensuring zero errors before submission." },
  { num: "04", title: "Submission & Tracking", desc: "We submit through the correct channels and actively track status, keeping you updated at every stage. No uncertainty, no waiting in the dark." },
  { num: "05", title: "Visa Granted", desc: "Receive your visitor visa with confidence. We also brief you on entry conditions, duration of stay, and any dos and don'ts for a smooth arrival." },
];

const docGroups = [
  { label: "Identity", color: "#EEF5FF", border: "#C7DEFF", items: ["Valid passport (6+ months validity)", "Previous passports / visas", "National ID card copy"] },
  { label: "Financial", color: "#F0FDF6", border: "#B9F0D4", items: ["Bank statements (3–6 months)", "Salary slips / employment letter", "Income tax returns"] },
  { label: "Travel", color: "#FFF7ED", border: "#FECBA1", items: ["Flight itinerary", "Hotel bookings / invitation letter", "Travel insurance"] },
  { label: "Purpose Proof", color: "#FDF4FF", border: "#E9D5FF", items: ["Tourist: itinerary & hotel bookings", "Family visit: host's documents", "Business: company invitation letter"] },
];

const faqs = [
  { q: "How long does a visitor visa take?", a: "Processing times vary by country — typically 5 to 15 working days. We advise applying well in advance. Urgent applications can be prioritised." },
  { q: "Can I apply if I have been refused before?", a: "Yes. A prior refusal is not the end. We analyse the reason, strengthen your application, and significantly improve your chances on reapplication." },
  { q: "What is the typical duration of a visitor visa?", a: "Most visitor visas allow a stay of 30 to 90 days, with some countries offering up to 180 days. Multiple-entry options are also available." },
  { q: "Do you handle family or group applications?", a: "Absolutely. We manage individual, couple, family, and group applications — each member's file is handled with equal care and attention." },
];

export default function VisitorVisa() {
  const [openFaq, setOpenFaq] = useState(null);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; }

.display-font { font-family: 'Instrument Serif', serif; }
.body-font { font-family: 'Plus Jakarta Sans', sans-serif; }

/* ───────── KEYFRAMES (ALL ANIMATIONS) ───────── */

@keyframes vFadeUp {
  from { opacity:0; transform:translateY(40px); }
  to { opacity:1; transform:translateY(0); }
}

@keyframes vFadeDown {
  from { opacity:0; transform:translateY(-40px); }
  to { opacity:1; transform:translateY(0); }
}

@keyframes vSlideLeft {
  from { opacity:0; transform:translateX(60px); }
  to { opacity:1; transform:translateX(0); }
}

@keyframes vSlideRight {
  from { opacity:0; transform:translateX(-60px); }
  to { opacity:1; transform:translateX(0); }
}

@keyframes vScale {
  from { opacity:0; transform:scale(0.85); }
  to { opacity:1; transform:scale(1); }
}

@keyframes vZoomIn {
  from { opacity:0; transform:scale(0.6); }
  to { opacity:1; transform:scale(1); }
}

@keyframes vRotateIn {
  from { opacity:0; transform:rotate(-10deg) scale(0.9); }
  to { opacity:1; transform:rotate(0deg) scale(1); }
}

@keyframes vPulse {
  0%,100% { transform:scale(1); }
  50% { transform:scale(1.1); }
}

@keyframes vFloat {
  0%,100% { transform:translateY(0px); }
  50% { transform:translateY(-12px); }
}

@keyframes vBounce {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-8px); }
}

@keyframes vShimmer {
  0% { background-position:0% 50%; }
  50% { background-position:100% 50%; }
  100% { background-position:0% 50%; }
}

/* ───────── ANIMATION CLASSES ───────── */

.anim-fadeUp { animation: vFadeUp 0.8s ease both; }
.anim-fadeDown { animation: vFadeDown 0.8s ease both; }
.anim-slideLeft { animation: vSlideLeft 0.8s ease both; }
.anim-slideRight { animation: vSlideRight 0.8s ease both; }
.anim-scale { animation: vScale 0.6s ease both; }
.anim-zoom { animation: vZoomIn 0.6s ease both; }
.anim-rotate { animation: vRotateIn 0.6s ease both; }

.float-emoji { animation: vFloat 4s ease-in-out infinite; }
.pulse { animation: vPulse 1.5s infinite; }
.bounce { animation: vBounce 2s infinite; }

/* ───────── FLIP ANIMATION (MAIN FEATURE) ───────── */

.flip-card {
  perspective: 1000px;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-inner {
  transform: rotateY(180deg);
}

.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  backface-visibility: hidden;
}

.flip-back {
  transform: rotateY(180deg);
}
/* timeline line animation */
.timeline-line {
  animation: growLine 1.2s ease forwards;
}

@keyframes growLine {
  from { height: 0; opacity: 0; }
  to { height: 100%; opacity: 1; }
}

/* step circle */
.step-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #C7DEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  box-shadow: 0 6px 18px rgba(26,86,219,.15);
  transition: all 0.3s ease;
}

/* number animation */
.step-num {
  font-size: 20px;
  color: #1a56db;
  font-style: italic;
  transition: all 0.3s ease;
}

/* hover effects */
.step-card:hover .step-circle {
  transform: scale(1.1);
  border-color: #1a56db;
  box-shadow: 0 10px 30px rgba(26,86,219,.25);
}

.step-card:hover .step-num {
  transform: scale(1.2);
}

/* content card */
.step-content {
  background: #ffffff;
  border: 1.5px solid #e8eef8;
  border-radius: 20px;
  padding: 28px 32px;
  flex: 1;
  transition: all 0.3s ease;
}

.step-card:hover .step-content {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 50px rgba(26,86,219,.15);
}

/* text */
.step-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
}

.step-desc {
  font-size: 17px;
  color: #6b7280;
  line-height: 1.8;
}
/* ───────── CARD EFFECTS ───────── */

.card-lift {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-lift:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 30px 70px rgba(26,86,219,.2);
}

/* glow border */
.card-lift::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(120deg, transparent, rgba(26,86,219,0.4), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  opacity: 0;
  transition: 0.3s;
}

.card-lift:hover::before {
  opacity: 1;
}

/* ───────── PARALLAX ───────── */

.parallax {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

/* ───────── BUTTONS ───────── */

.white-btn {
  transition: all 0.25s ease;
}

.white-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}

.white-btn:active {
  transform: scale(0.95);
}

.ghost-btn {
  transition: all 0.25s ease;
}

.ghost-btn:hover {
  background: rgba(255,255,255,0.15);
  transform: translateY(-2px);
}

.ghost-btn:active {
  transform: scale(0.95);
}

/* ───────── FAQ SMOOTH OPEN ───────── */

.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.faq-open {
  max-height: 200px;
}

/* ───────── TEXT EFFECTS ───────── */

.gradient-text {
  background: linear-gradient(135deg, #1a56db, #0e3fa8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.shimmer-btn {
  background: linear-gradient(270deg, #1a56db, #1e40af, #1d4ed8);
  background-size: 400% 400%;
  animation: vShimmer 5s infinite;
}

/* ───────── FLOATING BACKGROUND ───────── */

.bg-float {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(26,86,219,0.08);
  animation: vFloat 6s infinite;
}

/* ───────── DIVIDER ───────── */

.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #1a56db, transparent);
  opacity: 0.2;
  margin: 80px 0;
}`}</style>

      

      

      {/* ── WHAT WE OFFER ── */}
      <section style={{ background: "#ffffff", padding: "100px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag body-font"><span className="section-dot" />What We Offer</div>
            <h2 className="display-font" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "#0f172a", lineHeight: 1.15, marginBottom: 20 }}>
              Everything You Need,<br /><em>In One Place</em>
            </h2>
            <p className="body-font" style={{ fontSize: 19, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
              We handle the complexity so your visa journey is smooth, confident, and stress-free.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22 }}>
          {offerings.map((o, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <div className="card-lift"
                style={{ background: "#ffffff", border: "1.5px solid #e8eef8", borderRadius: 20, padding: "36px 32px" }}>
                <div style={{ fontSize: 38, marginBottom: 22, lineHeight: 1 }} className="float-emoji" >{o.emoji}</div>
                <h3 className="body-font" style={{ fontSize: 21, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>{o.title}</h3>
                <p className="body-font" style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.8 }}>{o.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "#F8FAFF", padding: "100px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag body-font"><span className="section-dot" />Our Process</div>
              <h2 className="display-font" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "#0f172a", lineHeight: 1.15, marginBottom: 20 }}>
                From Consultation<br /><em>to Approval</em>
              </h2>
              <p className="body-font" style={{ fontSize: 19, color: "#6b7280", lineHeight: 1.8 }}>
                Five clear steps. Zero confusion. Full support throughout.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ position: "relative" }}>
            <div
    className="timeline-line"
    style={{
      position: "absolute",
      left: 29,
      top: 30,
      bottom: 30,
      width: 2,
      background: "linear-gradient(to bottom, #C7DEFF, #e8eef8)",
      borderRadius: 2,
    }}
  />{steps.map((s, i) => (
             <ScrollReveal
      key={i}
      delay={i * 120}
      direction={i % 2 === 0 ? "left" : "right"} // 🔥 alternate animation
    >
      <div
        className="step-card"
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 32,
          position: "relative",
          alignItems: "flex-start"
        }}
      >

        {/* STEP CIRCLE */}
        <div className="step-circle">
          <span className="display-font step-num">{s.num}</span>
        </div>

        {/* CONTENT CARD */}
        <div className="step-content card-lift">
          <h3 className="body-font step-title">{s.title}</h3>
          <p className="body-font step-desc">{s.desc}</p>
        </div>

      </div>
    </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section style={{ background: "#ffffff", padding: "100px 24px", maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag body-font"><span className="section-dot" />Documents</div>
            <h2 className="display-font" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "#0f172a", lineHeight: 1.15, marginBottom: 20 }}>
              Typical Documents<br /><em>Required</em>
            </h2>
            <p className="body-font" style={{ fontSize: 19, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
              We give you a tailored checklist. This is a general overview — requirements may vary by destination.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {docGroups.map((g, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="doc-card card-lift"
                style={{ border: `1.5px solid ${g.border}`, borderRadius: 18, padding: "28px 26px", background: g.color, height: "100%" }}>
                <p className="body-font" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a56db", marginBottom: 20 }}>{g.label}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                  {g.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#1a56db", flexShrink: 0, marginTop: 2 }}><CheckIcon /></span>
                      <span className="body-font" style={{ fontSize: 16, color: "#374151", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="body-font" style={{ textAlign: "center", color: "#9ca3af", fontSize: 16, marginTop: 28, lineHeight: 1.7 }}>
            Our team reviews your specific situation and provides the exact list — nothing missing, nothing unnecessary.
          </p>
        </ScrollReveal>
      </section>

      {/* ── WHY BLUE WAVE (dark) ── */}
      <section style={{ background: "#0a1f44", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag body-font" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)", color: "#93c5fd" }}>
                <span className="section-dot" style={{ background: "#93c5fd" }} /> Why Choose Us
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "#ffffff", lineHeight: 1.15, marginBottom: 20 }}>
                The Blue Wave<br /><em>Difference</em>
              </h2>
              <p className="body-font" style={{ fontSize: 19, color: "#93c5fd", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                Thousands of clients trust us because we deliver results — not promises.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { emoji: "🛡️", title: "Transparent Process", desc: "No hidden fees, no false promises. You know exactly what is happening at every stage of your application." },
              { emoji: "👥", title: "Expert Team", desc: "Certified immigration consultants with deep knowledge of embassy rules and requirements worldwide." },
              { emoji: "⭐", title: "Client-First Approach", desc: "Your success is our success. We go beyond filing forms — we advocate for your best possible outcome." },
            ].map((w, i) => (
              <ScrollReveal key={i} delay={i * 90}>
                <div className="why-card"
                  style={{ background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "36px 32px" }}>
                  <div style={{ fontSize: 38, marginBottom: 20 }}>{w.emoji}</div>
                  <h3 className="body-font" style={{ fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{w.title}</h3>
                  <p className="body-font" style={{ fontSize: 17, color: "#93c5fd", lineHeight: 1.8 }}>{w.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#ffffff", padding: "100px 24px", maxWidth: 740, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-tag body-font"><span className="section-dot" />FAQs</div>
            <h2 className="display-font" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "#0f172a", lineHeight: 1.15, marginBottom: 20 }}>
              Common Questions
            </h2>
            <p className="body-font" style={{ fontSize: 19, color: "#6b7280", lineHeight: 1.8 }}>
              Quick answers to what our clients ask most.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <ScrollReveal key={i} delay={i * 55}>
              <div
                className="faq-row"
                style={{ border: `1.5px solid ${openFaq === i ? "#1a56db" : "#e5e7eb"}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color .2s" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", gap: 16 }}>
                  <span className="body-font" style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>{f.q}</span>
                  <span style={{ color: "#1a56db", flexShrink: 0, transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .3s" }}>
                    <ArrowIcon />
                  </span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 28px 24px", borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
                    <p className="body-font" style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.8 }}>{f.a}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#ffffff", padding: "0 24px 100px" }}>
        <ScrollReveal>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            background: "linear-gradient(145deg, #1a56db, #0e3fa8)",
            borderRadius: 28, padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <h2 className="display-font" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", lineHeight: 1.15, marginBottom: 22 }}>
                Ready to Start<br /><em>Your Visa Journey?</em>
              </h2>
              <p className="body-font" style={{ fontSize: 19, color: "#93c5fd", marginBottom: 44, maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
                Speak to a Blue Wave visa expert today — free of charge. Let us get you to where you want to go.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="white-btn body-font"
                  style={{ background: "#fff", color: "#1a56db", border: "none", padding: "20px 44px", borderRadius: 50, fontSize: 18, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <PhoneIcon /> Call Us Now
                </button>
                <button className="ghost-btn body-font"
                  style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.4)", padding: "19px 40px", borderRadius: 50, fontSize: 18, fontWeight: 600, cursor: "pointer" }}>
                  Apply Online
                </button>
              </div>
              <p className="body-font" style={{ color: "rgba(147,197,253,.6)", fontSize: 14, marginTop: 32 }}>
                Blue Wave Management Consultancy · Trusted · Certified · Results-Driven
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}