import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   BlueWave — Premium FAQ Section
   Navy · Red · Gold theme
   Smooth accordion · Staggered reveal
══════════════════════════════════════════════ */

const FAQS = [
  {
    category: "General",
    color: "#D4AF37",
    items: [
      {
        q: "What services does BlueWave Management Consultancy offer?",
        a: "BlueWave offers comprehensive immigration services including Study Visas, Tourist Visas, Work Permits, Visitor Visas, Skilled Migration (PR), IELTS/PTE coaching, UAE Golden Visa, and Family Sponsorship — covering 50+ countries worldwide.",
      },
      {
        q: "How long has BlueWave been operating?",
        a: "BlueWave was founded in 2018 and has since helped over 12,000 individuals and families achieve their immigration goals with a 98% visa approval rate — one of the highest in the UAE.",
      },
      {
        q: "Where is your office located?",
        a: "Our office is located at the 26th Floor, Amber Gem Tower, Sheikh Khalifa Street, Ajman, United Arab Emirates (Office No. CWS-1V-224954). We are open Saturday–Thursday, 9 AM to 6 PM.",
      },
    ],
  },
  {
    category: "Visa Process",
    color: "#3B82F6",
    items: [
      {
        q: "How long does the visa application process take?",
        a: "Processing times vary by visa type and country. Tourist visas typically take 2–6 weeks, work visas 6–20 weeks, and skilled migration/PR pathways 6–24 months. We offer fast-track processing for urgent applications.",
      },
      {
        q: "What documents do I need to start my visa application?",
        a: "While requirements vary, most applications require a valid passport (6–18+ months remaining), proof of finances, academic or employment records, English test scores where applicable, and a completed application form. Our team provides you a customised checklist on your first consultation.",
      },
      {
        q: "Can BlueWave handle visa rejections or reapplications?",
        a: "Yes. Our specialists review the reasons for any refusal, advise on strengthening your application, and guide you through the reapplication process — often with a significantly improved success rate on the second attempt.",
      },
      {
        q: "Do you offer fast-track or urgent visa processing?",
        a: "We do offer expedited processing support for many visa categories. Availability depends on the destination country's consulate and the visa type. Contact us to discuss your timeline and we will explore all available options.",
      },
    ],
  },
  {
    category: "Study & Work",
    color: "#DC2626",
    items: [
      {
        q: "Which countries do you process study visas for?",
        a: "We process study visas for Canada, USA, United Kingdom, Australia, New Zealand, Germany, and major European countries. We assist with university shortlisting, Statement of Purpose (SOP), offer letters, and the complete visa application.",
      },
      {
        q: "Do you help with university selection and admission?",
        a: "Absolutely. We offer full assistance with institution shortlisting based on your academic profile, budget and career goals — followed by application preparation, SOP writing, and enrolment confirmation guidance.",
      },
      {
        q: "What is Express Entry and am I eligible?",
        a: "Express Entry is Canada's flagship skilled immigration system using a points-based Comprehensive Ranking System (CRS). Eligibility depends on your age, education, work experience and English/French proficiency. Book a free consultation and we will calculate your CRS score instantly.",
      },
    ],
  },
  {
    category: "Costs & Consultation",
    color: "#059669",
    items: [
      {
        q: "Is the initial consultation free?",
        a: "Yes — your first 30-minute consultation with one of our immigration specialists is completely free, with no obligation. We assess your profile, explain your options clearly, and outline the best pathway for your goals.",
      },
      {
        q: "How much do your services cost?",
        a: "Our fees depend on the visa type, destination country, and complexity of your case. All fees are discussed transparently during your consultation — no hidden charges, ever. We believe in complete financial transparency.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes, we offer flexible payment structures for many of our services. Our team will outline available payment options during your initial consultation so you can choose a plan that suits your situation.",
      },
    ],
  },
];

/* ── Reveal hook ── */
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ── CSS inject ── */
let cssInjected = false;
function injectCSS(css) {
  if (cssInjected) return; cssInjected = true;
  const el = document.createElement("style");
  el.textContent = css; document.head.appendChild(el);
}

/* ── Single FAQ item ── */
function FaqItem({ q, a, index, color, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`fq-item${isOpen ? " fq-open" : ""}`}
      style={{ "--fc": color, animationDelay: `${index * 70}ms` }}
    >
      <button className="fq-trigger" onClick={onToggle}>
        <span className="fq-num">0{index + 1}</span>
        <span className="fq-q">{q}</span>
        <span className="fq-icon">
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            className="fq-chevron"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        className="fq-body-wrap"
        style={{ height, overflow: "hidden", transition: "height .38s cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="fq-body" ref={bodyRef}>
          <div className="fq-answer">{a}</div>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Group ── */
function FaqGroup({ category, color, items, groupIndex }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [ref, vis] = useReveal(0.08);

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <div
      ref={ref}
      className={`fq-group${vis ? " fq-vis" : ""}`}
      style={{ transitionDelay: `${groupIndex * 100}ms` }}
    >
      {/* Group header */}
      <div className="fq-group-head">
        <span className="fq-group-bar" style={{ background: color }} />
        <span className="fq-group-label" style={{ color }}>{category}</span>
      </div>

      {/* Items */}
      <div className="fq-group-items">
        {items.map((item, i) => (
          <FaqItem
            key={i}
            q={item.q}
            a={item.a}
            index={i}
            color={color}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function FAQSection() {
  const cssRef = useRef(false);
  const [hRef, hVis] = useReveal(0.05);

  useEffect(() => {
    if (cssRef.current) return; cssRef.current = true; injectCSS(CSS);
  }, []);

  return (
    <section id="faq" className="fq-root">

      {/* Background layers */}
      <div className="fq-bg-gradient" />
      <div className="fq-bg-grid" />
      <div className="fq-orb fq-orb-1" />
      <div className="fq-orb fq-orb-2" />

      {/* ── Header ── */}
      <div ref={hRef} className={`fq-header${hVis ? " fq-vis" : ""}`}>
        <div className="fq-eyebrow">
          <span className="fq-eyebrow-dot" />
          Frequently Asked Questions
          <span className="fq-eyebrow-dot" style={{ animationDelay: ".6s" }} />
        </div>
        <h2 className="fq-h2">
          Everything You Need<br />
          <span className="fq-h2-gold">to Know.</span>
        </h2>
        <p className="fq-sub">
          Can't find your answer here? Our consultants are available 6 days a week —
          just reach out and we'll respond within 24 hours.
        </p>
        <div className="fq-header-actions">
          <button className="fq-btn-cta"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            Ask a Question →
          </button>
          <a href="https://wa.me/971506580557" target="_blank" rel="noopener noreferrer" className="fq-btn-wa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── FAQ Grid ── */}
      <div className="fq-grid">
        {FAQS.map((group, i) => (
          <FaqGroup
            key={i}
            category={group.category}
            color={group.color}
            items={group.items}
            groupIndex={i}
          />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="fq-bottom">
        <div className="fq-bottom-inner">
          <span className="fq-bottom-icon">💬</span>
          <div>
            <div className="fq-bottom-title">Still have questions?</div>
            <div className="fq-bottom-sub">Our team replies within 24 hours — no question is too small.</div>
          </div>
          <button className="fq-btn-cta fq-btn-sm"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get in Touch →
          </button>
        </div>
      </div>

    </section>
  );
}

/* ════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500&display=swap');

/* ── Root ── */
.fq-root {
  position: relative;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  padding-bottom: 0;
}

/* ── Background ── */
.fq-bg-gradient {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(160deg,
    #080D18 0%, #0C1425 30%,
    #0E1830 60%, #080D18 100%
  );
}
.fq-bg-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,175,55,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,175,55,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
}
.fq-orb {
  position: absolute; border-radius: 50%;
  pointer-events: none; z-index: 0; filter: blur(100px);
}
.fq-orb-1 {
  width: 500px; height: 500px; top: -80px; right: -80px;
  background: radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%);
  animation: fqOrb 22s ease-in-out infinite;
}
.fq-orb-2 {
  width: 420px; height: 420px; bottom: 100px; left: -80px;
  background: radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 65%);
  animation: fqOrb 28s ease-in-out infinite reverse;
}
@keyframes fqOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(-12px,-18px)} }

/* ── Reveal ── */
.fq-header, .fq-group {
  opacity: 0; transform: translateY(24px);
  transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1);
}
.fq-vis { opacity: 1 !important; transform: translateY(0) !important; }

/* ══ HEADER ══ */
.fq-header {
  position: relative; z-index: 2;
  text-align: center; padding: 92px 24px 56px;
  max-width: 680px; margin: 0 auto;
}
.fq-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Montserrat', sans-serif; font-size: .6rem; font-weight: 700;
  letter-spacing: .3em; text-transform: uppercase; color: #D4AF37;
  background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
  padding: 7px 20px; border-radius: 2px; margin-bottom: 22px;
  display: inline-flex;
}
.fq-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #D4AF37;
  animation: fqDot 2s ease-in-out infinite;
}
@keyframes fqDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }

.fq-h2 {
  font-family: 'Merriweather', serif;
  font-size: clamp(2.2rem,5vw,3.6rem); font-weight: 900; line-height: 1.12;
  color: #fff; letter-spacing: -0.02em; margin: 0 0 16px;
}
.fq-h2-gold {
  font-style: italic;
  background: linear-gradient(135deg, #A17C1A, #D4AF37, #F5D76E);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; background-size: 200%;
  animation: fqShimmer 4s linear infinite;
}
@keyframes fqShimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }

.fq-sub {
  font-size: .97rem; font-weight: 300; color: rgba(255,255,255,.52);
  line-height: 1.85; margin-bottom: 32px;
}

.fq-header-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* CTA button */
.fq-btn-cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Montserrat', sans-serif; font-size: .74rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: #0A0F1A;
  background: linear-gradient(135deg, #F5D76E, #D4AF37, #B8921E);
  border: none; padding: 13px 30px; cursor: pointer;
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  position: relative; overflow: hidden;
  transition: transform .28s ease, box-shadow .3s ease;
}
.fq-btn-cta::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);
  transform:translateX(-100%); transition:transform .5s ease;
}
.fq-btn-cta:hover::before { transform:translateX(100%); }
.fq-btn-cta:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(212,175,55,.45); }
.fq-btn-sm { padding: 11px 24px; font-size: .7rem; }

/* WA button */
.fq-btn-wa {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: 'Montserrat', sans-serif; font-size: .74rem; font-weight: 600;
  letter-spacing: .08em; text-transform: uppercase; color: #22C55E;
  background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.3);
  padding: 12px 26px; text-decoration: none; cursor: pointer;
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  transition: all .25s ease;
}
.fq-btn-wa:hover { background:rgba(34,197,94,.2); transform:translateY(-2px); box-shadow:0 10px 28px rgba(34,197,94,.25); }

/* ══ GRID ══ */
.fq-grid {
  position: relative; z-index: 2;
  max-width: 1180px; margin: 0 auto;
  padding: 0 28px 80px;
  display: grid; grid-template-columns: repeat(2,1fr);
  gap: 28px;
}
@media(max-width:860px){ .fq-grid { grid-template-columns: 1fr; } }
@media(max-width:600px){ .fq-grid { padding: 0 16px 60px; } }

/* ══ GROUP ══ */
.fq-group {
  display: flex; flex-direction: column; gap: 0;
}
.fq-group-head {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 16px;
}
.fq-group-bar { display: inline-block; width: 3px; height: 22px; border-radius: 2px; flex-shrink: 0; }
.fq-group-label {
  font-family: 'Montserrat', sans-serif; font-size: .62rem; font-weight: 700;
  letter-spacing: .24em; text-transform: uppercase;
}

/* ══ ITEM ══ */
.fq-item {
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px; margin-bottom: 8px;
  background: rgba(255,255,255,0.03);
  overflow: hidden;
  transition:
    border-color .3s ease,
    background .3s ease,
    box-shadow .3s ease;
}
.fq-item:hover {
  border-color: rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
}
.fq-item.fq-open {
  border-color: color-mix(in srgb, var(--fc) 35%, transparent);
  background: color-mix(in srgb, var(--fc) 5%, rgba(10,14,26,1));
  box-shadow: 0 8px 32px rgba(0,0,0,.3), 0 0 0 1px color-mix(in srgb, var(--fc) 20%, transparent);
}

/* Trigger */
.fq-trigger {
  width: 100%; display: flex; align-items: center; gap: 14px;
  padding: 17px 18px; background: transparent; border: none;
  cursor: pointer; text-align: left;
}
.fq-num {
  font-family: 'Merriweather', serif; font-size: 1.1rem; font-weight: 900;
  color: color-mix(in srgb, var(--fc) 35%, rgba(255,255,255,.1));
  flex-shrink: 0; line-height: 1; min-width: 26px;
  transition: color .25s;
}
.fq-item.fq-open .fq-num { color: var(--fc); }

.fq-q {
  flex: 1; font-family: 'Montserrat', sans-serif; font-size: .84rem; font-weight: 600;
  color: rgba(255,255,255,.72); line-height: 1.5; letter-spacing: .01em;
  transition: color .25s;
}
.fq-item.fq-open .fq-q,
.fq-trigger:hover .fq-q { color: #fff; }

.fq-icon {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  transition: background .25s, border-color .25s, transform .35s cubic-bezier(.16,1,.3,1);
  color: rgba(255,255,255,.45);
}
.fq-item.fq-open .fq-icon {
  background: color-mix(in srgb, var(--fc) 15%, transparent);
  border-color: color-mix(in srgb, var(--fc) 35%, transparent);
  color: var(--fc);
}
.fq-chevron { transition: transform .38s cubic-bezier(.16,1,.3,1); }
.fq-item.fq-open .fq-chevron { transform: rotate(180deg); }

/* Answer body */
.fq-body { padding: 0 18px 18px 58px; }
.fq-answer {
  font-size: .86rem; font-weight: 300; color: rgba(255,255,255,.58);
  line-height: 1.85;
  border-left: 2px solid color-mix(in srgb, var(--fc) 30%, transparent);
  padding-left: 14px; margin-left: 0;
}

/* ══ BOTTOM CTA ══ */
.fq-bottom {
  position: relative; z-index: 2;
  background: rgba(255,255,255,.03);
  border-top: 1px solid rgba(212,175,55,.12);
  padding: 32px 28px;
}
.fq-bottom-inner {
  max-width: 900px; margin: 0 auto;
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.fq-bottom-icon { font-size: 2rem; flex-shrink: 0; }
.fq-bottom-title {
  font-family: 'Montserrat', sans-serif; font-size: .92rem; font-weight: 700;
  color: #fff; margin-bottom: 3px;
}
.fq-bottom-sub { font-size: .78rem; font-weight: 300; color: rgba(255,255,255,.42); }
.fq-bottom-inner .fq-btn-cta { margin-left: auto; }
@media(max-width:640px){ .fq-bottom-inner .fq-btn-cta { margin-left: 0; width: 100%; justify-content: center; } }
`;
