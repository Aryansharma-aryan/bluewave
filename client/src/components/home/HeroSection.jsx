import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Phone, Star, Shield, Globe } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────── */
const STATS = [
  { val: "12,400", suffix: "+", lab: "Visas Approved", pct: 95, icon: "✈" },
  { val: "98", suffix: "%", lab: "Success Rate", pct: 98, icon: "🎯" },
  { val: "40", suffix: "+", lab: "Countries Served", pct: 80, icon: "🌍" },
  { val: "9", suffix: "+", lab: "Years Experience", pct: 60, icon: "⭐" },
];

const TRUST_POINTS = [
  "ICCRC Licensed Consultants",
  "Free Initial Assessment",
  "100% Transparent Process",
];

/* ─── Counter ────────────────────────────────────────────── */
function Counter({ target, suffix = "", duration = 2.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    const step = num / (duration * 60);
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {target.includes(",") ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

/* ─── Line Reveal ────────────────────────────────────────── */
function LineReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
 
/* ─── Buttons ────────────────────────────────────────────── */
function PrimaryButton() {
  const [h, setH] = useState(false);
  return (
    <a href="/consult" className="w-full sm:w-auto flex-1 sm:flex-none min-w-0">
      <motion.button
        onHoverStart={() => setH(true)} onHoverEnd={() => setH(false)}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 bg-[#b71c1c] text-white font-extrabold text-[17px] sm:text-[18px] px-8 sm:px-10 py-[17px] sm:py-[20px] rounded-2xl tracking-wide cursor-pointer border-none"
        style={{ boxShadow: "0 6px 32px rgba(183,28,28,0.38)" }}
      >
        <motion.div className="absolute inset-0 bg-[#8b0000]"
          initial={{ x: "-100%" }} animate={{ x: h ? "0%" : "-100%" }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }} />
        <span className="relative z-10 whitespace-nowrap">Get Free Assessment</span>
        <motion.span className="relative z-10" animate={{ x: h ? 5 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowRight size={20} />
        </motion.span>
      </motion.button>
    </a>
  );
}
 
function SecondaryButton() {
  const [h, setH] = useState(false);
  return (
    <a href="/services" className="w-full sm:w-auto flex-1 sm:flex-none min-w-0">
      <motion.button
        onHoverStart={() => setH(true)} onHoverEnd={() => setH(false)}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 bg-white/95 font-extrabold text-[17px] sm:text-[18px] px-8 sm:px-10 py-[17px] sm:py-[20px] rounded-2xl border-[2px] border-[#e5e7eb] tracking-wide cursor-pointer"
        style={{ color: h ? "#b71c1c" : "#1a1a1a", boxShadow: h ? "0 6px 24px rgba(183,28,28,0.16)" : "0 2px 12px rgba(0,0,0,0.07)", transition: "color 0.25s, box-shadow 0.3s" }}
      >
        <motion.div className="absolute inset-0 bg-[#fff1f1]"
          initial={{ opacity: 0 }} animate={{ opacity: h ? 1 : 0 }} transition={{ duration: 0.22 }} />
        <span className="relative z-10 whitespace-nowrap">Our Services</span>
        <motion.span className="relative z-10" style={{ color: "#b71c1c" }}
          animate={{ x: h ? 5 : 0, opacity: h ? 1 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowRight size={20} />
        </motion.span>
      </motion.button>
    </a>
  );
}
/* ─── Call Pill ─────────────────────────────────────────── */
function CallPill() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={() => window.location.href = "tel:+971506580557"}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-4 bg-white/95 px-6 py-4 rounded-2xl cursor-pointer"
      style={{
        border: hovered ? "2px solid #b71c1c" : "2px solid #e5e7eb",
        boxShadow: hovered ? "0 6px 28px rgba(183,28,28,0.15)" : "0 3px 16px rgba(0,0,0,0.09)",
        transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      <motion.div
        animate={{ rotate: hovered ? [0, -15, 15, -10, 10, 0] : 0 }}
        transition={{ duration: 0.6 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: hovered ? "#b71c1c" : "#fef2f2",
          transition: "background 0.25s",
        }}
      >
        <Phone size={21} style={{ color: hovered ? "#fff" : "#b71c1c", transition: "color 0.25s" }} />
      </motion.div>

      <div className="leading-tight">
        <p
          className="text-[12px] font-bold tracking-[0.08em] uppercase mb-[2px]"
          style={{
            color: hovered ? "#b71c1c" : "#9ca3af",
            transition: "color 0.25s",
          }}
        >
          Free Consultation
        </p>

        <p className="text-[19px] font-black tracking-tight text-[#1a1a1a]">
          +97 (150) 658-0557
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Floating Orbs ─────────────────────────────────────── */
function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, -20, 15, 0], y: [0, -25, 10, -15, 0], scale: [1, 1.15, 0.9, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[15%] w-[220px] h-[220px] rounded-full"
        style={{ background: "rgba(183,28,28,0.045)", filter: "blur(50px)" }}
      />
      <motion.div
        animate={{ x: [0, -25, 20, -10, 0], y: [0, 20, -15, 25, 0], scale: [1, 0.9, 1.2, 0.95, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[20%] left-[35%] w-[180px] h-[180px] rounded-full"
        style={{ background: "rgba(183,28,28,0.05)", filter: "blur(45px)" }}
      />
    </div>
  );
}

/* ─── Particle Dots ─────────────────────────────────────── */
function MicroParticles() {
  const dots = [
    { x: "6%", y: "12%", s: 5, d: 5, del: 0 },
    { x: "22%", y: "65%", s: 4, d: 7, del: 1.2 },
    { x: "10%", y: "42%", s: 6, d: 6, del: 0.5 },
    { x: "30%", y: "22%", s: 4, d: 8, del: 2 },
    { x: "18%", y: "80%", s: 5, d: 5.5, del: 1.5 },
    { x: "4%", y: "55%", s: 4, d: 7.5, del: 0.8 },
    { x: "28%", y: "48%", s: 5, d: 6.5, del: 2.5 },
    { x: "14%", y: "28%", s: 4, d: 9, del: 1.8 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
      {dots.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -25, 8, -18, 0], x: [0, 12, -8, 6, 0], opacity: [0.1, 0.45, 0.15, 0.35, 0.1], scale: [1, 1.4, 0.8, 1.2, 1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
          className="absolute rounded-full bg-[#b71c1c]"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Canvas Network ───────────────────────────── */
function NetworkCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const wrap = canvas.parentElement;
    let W, H, nodes = [];
    function createNodes() {
      const count = Math.floor((W * H) / 10000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() < 0.2 ? 2.5 : 1.5,
        alpha: 0.3 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
      }));
    }
    function resize() {
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
      createNodes();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(183,28,28,${(1 - dist / 130) * 0.14})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const pr = n.r + Math.sin(n.pulse) * 0.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(183,28,28,${n.alpha})`; ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </div>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const circumference = 2 * Math.PI * 22;
  return (
    <div ref={ref} className="relative z-30 bg-white">
      <div className="h-[3px] bg-gradient-to-r from-[#b71c1c] via-[#ef4444] to-[#b71c1c]" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 cursor-default group"
          >
            <div className="relative shrink-0">
              <svg width="58" height="58" viewBox="0 0 56 56" className="-rotate-90">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#fecaca" strokeWidth="3" />
                <motion.circle
                  cx="28" cy="28" r="22" fill="none" stroke="#b71c1c" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={inView ? { strokeDashoffset: circumference - (circumference * s.pct) / 100 } : {}}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="w-3 h-3 rounded-full bg-[#b71c1c]"
                />
              </div>
            </div>
            <div>
              <p className="text-[28px] font-black text-[#1a1a1a] leading-tight tracking-tight">
                <Counter target={s.val} suffix={s.suffix} />
              </p>
              <p className="text-[13px] text-[#6b7280] font-semibold tracking-[0.04em] uppercase mt-1">{s.lab}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-[3px] bg-gradient-to-r from-[#b71c1c] via-[#ef4444] to-[#b71c1c]" />
    </div>
  );
}

/* ─── Glowing Red Accent Strip ──────────────────────────── */
function AccentStrip() {
  return (
    <div className="absolute left-0 top-6 bottom-6 w-[5px] rounded-full overflow-hidden">
      <div className="w-full h-full bg-[#ef4444]">
        <motion.div
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[40%]"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.65), transparent)" }}
        />
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <div className="font-sans bg-white">

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden min-h-[calc(100vh-72px)]">

        {/* BG Image */}
        <div className="absolute inset-0">
          <img
            src="https://img.freepik.com/free-photo/top-view-tourist-objects-frame-with-copy-space_23-2148786099.jpg?semt=ais_incoming&w=740&q=80"
            alt="Travel and immigration"
            className="w-full h-full object-cover"
          />
          {/* Left fade for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 42%, rgba(255,255,255,0.2) 65%, transparent 100%)",
            }}
          />
        </div>

        <BackgroundOrbs />
        <MicroParticles />

        {/* ── CONTENT ── */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1fr] items-center min-h-[calc(100vh-72px)]">

            {/* LEFT COLUMN */}
            <div className="py-16 lg:py-24 flex flex-col gap-0">

              {/* Badge */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7"
              >
                <span className="inline-flex items-center gap-2.5 bg-white/90 border border-[#fecaca] text-[#b71c1c] text-[13px] font-bold px-5 py-[9px] rounded-full tracking-[0.08em] uppercase shadow-sm">
                  <motion.span
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-[7px] h-[7px] rounded-full bg-[#b71c1c] flex-shrink-0"
                  />
                  ICCRC Licensed Consultancy
                </span>
              </motion.div>

              {/* Headline block */}
              <div className="mb-8 relative pl-10 py-5">
                <AccentStrip />

                {/* Top cap */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.38 }}
                  className="absolute left-0 top-0 w-20 h-[5px] bg-[#ef4444] rounded-full origin-left overflow-hidden"
                />
                {/* Bottom cap */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.42 }}
                  className="absolute left-0 bottom-0 w-20 h-[5px] bg-[#ef4444] rounded-full origin-left overflow-hidden"
                />

                <LineReveal delay={0.3}>
                  <p className="text-[16px] font-bold text-[#374151] tracking-wide mb-4 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                    Solutions for all types of visas
                  </p>
                </LineReveal>

                <LineReveal delay={0.42}>
                  <h1 className="text-[clamp(44px,5.5vw,80px)] font-black leading-[1.0] tracking-[-0.03em] text-[#1a1a1a] drop-shadow-[0_2px_6px_rgba(255,255,255,0.7)]">
                    Immigration &
                  </h1>
                </LineReveal>

                <LineReveal delay={0.52}>
                  <h1 className="text-[clamp(44px,5.5vw,80px)] font-black leading-[1.0] tracking-[-0.03em] text-[#1a1a1a] drop-shadow-[0_2px_6px_rgba(255,255,255,0.7)]">
                    <span className="text-[#b71c1c] relative">
                      Visa
                      <motion.span
                        className="absolute bottom-1 left-0 w-full h-[4px] bg-[#b71c1c] rounded-full opacity-30"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      />
                    </span>{" "}Consulting
                  </h1>
                </LineReveal>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[18px] text-[#374151] leading-[1.85] max-w-[530px] mb-10 font-semibold drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
              >
                Expert guidance for study, work, business, and permanent residency visas.
                Trusted by <strong className="text-[#b71c1c]">12,000+</strong> immigrants worldwide since 2015.
              </motion.p>

              {/* Trust Points */}
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.65 }}
                className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
              >
                {TRUST_POINTS.map((pt, i) => (
                  <span key={i} className="flex items-center gap-2 text-[15px] font-semibold text-[#374151] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                    <span className="w-5 h-5 rounded-full bg-[#b71c1c] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </span>
                    {pt}
                  </span>
                ))}
              </motion.div>

              {/* ─── CTA BUTTONS ─── */}
              <motion.div
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.72 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <PrimaryButton />
                <SecondaryButton />
              </motion.div>

              {/* ─── CALL PILL ─── */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <CallPill />
              </motion.div>

            </div>

            {/* RIGHT: empty — bg image fills */}
            <div className="hidden lg:block" />
          </div>
        </div>

        <NetworkCanvas />
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <StatsBar />
    </div>
  );
}