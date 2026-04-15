import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Shield,   
  Globe,
  Users,
  ArrowRight,
  FileText,
  Heart,
  Plane,
  Briefcase,
  GraduationCap,
  Baby,
  ChevronDown,
  Star,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  BadgeCheck,
  Scale,
  Lock,
  MessageSquare,
} from "lucide-react";

/* ───────── Animated Counter ───────── */
function AnimatedNumber({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───────── Section Wrapper with reveal ───────── */
function RevealSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Stagger Children ───────── */
function StaggerGrid({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── FAQ Accordion ───────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-[15px] text-gray-800 group-hover:text-blue-700 transition-colors pr-4">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-gray-400" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Dependent() {
  const [activeCountry, setActiveCountry] = useState(0);

  const countries = [
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      visa: "UK Dependent Visa",
      who: "Spouse, unmarried partner, children under 18",
      time: "8–12 weeks",
      fee: "£1,836 – £3,250",
      note:
        "Requires proof of genuine relationship, financial threshold of £29,000/year (from April 2024), and English language requirement for spouses.",
    },
    {
      name: "United States",
      flag: "🇺🇸",
      visa: "H-4 / L-2 / F-2 Visa",
      who: "Spouse and unmarried children under 21",
      time: "2–6 months",
      fee: "$185 – $265",
      note:
        "H-4 spouses of H-1B holders can apply for EAD. L-2 spouses automatically receive work authorization. F-2 dependents cannot work.",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      visa: "Open Work Permit / SOWP",
      who: "Spouse, common-law partner, dependent children",
      time: "4–6 months",
      fee: "CAD $155 – $255",
      note:
        "Spouses of skilled workers and international students can apply for open work permits. Children can attend Canadian schools without a study permit.",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      visa: "Subclass 500 / 482 Dependent",
      who: "Spouse, de facto partner, children under 18",
      time: "4–8 weeks",
      fee: "AUD $485 – $620",
      note:
        "Dependents of temporary skilled visa holders get full work rights. Health insurance and character checks are mandatory.",
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      visa: "Family Reunion Visa",
      who: "Spouse, minor children",
      time: "6–12 weeks",
      fee: "€75 – €150",
      note:
        "Primary applicant must demonstrate ability to support family. Basic German language (A1) is required for spouses. EU Blue Card holders have relaxed requirements.",
    },
    {
      name: "UAE",
      flag: "🇦🇪",
      visa: "Residence Visa for Family",
      who: "Spouse, sons under 25, unmarried daughters",
      time: "1–2 weeks",
      fee: "AED 1,200 – 3,000",
      note:
        "Minimum salary requirement of AED 4,000/month. Medical fitness test required. Can sponsor parents under specific conditions.",
    },
  ];

  const documents = [
    { icon: Heart, title: "Relationship Proof", items: ["Marriage certificate (attested)", "Birth certificates for children", "Photographs together", "Joint bank statements / lease"] },
    { icon: FileText, title: "Primary Applicant Docs", items: ["Valid visa & passport copy", "Employment contract / offer letter", "Salary slips (last 3–6 months)", "Sponsorship letter"] },
    { icon: Shield, title: "Financial Documents", items: ["Bank statements (6 months)", "Tax returns / ITR", "Scholarship letter (if student)", "Affidavit of support"] },
    { icon: Scale, title: "Additional Documents", items: ["Medical fitness certificates", "Police clearance (PCC)", "Passport-size photographs", "Travel insurance (if required)"] },
  ];

  const eligibilityItems = [
    { icon: Briefcase, title: "Employment Visa Holders", desc: "H-1B, Tier 2, 482, EU Blue Card — your spouse and children can usually apply as dependents with full or partial work rights." },
    { icon: GraduationCap, title: "Student Visa Holders", desc: "F-1, Tier 4, Student Visa — spouses may qualify for dependent visas with restricted work permissions depending on the country." },
    { icon: Globe, title: "PR / Citizenship Holders", desc: "Permanent residents and citizens can sponsor family members for long-term dependent visas with full settlement rights." },
    { icon: Baby, title: "Children & Minor Dependents", desc: "Unmarried children under 18 (or 21 in some countries) are eligible. Some countries allow older dependent children with medical proof." },
  ];

  const faqs = [
    {
      q: "Can my dependent work while on a dependent visa?",
      a: "It depends on the country and the primary visa type. For example, L-2 spouses in the US can work automatically, H-4 spouses need an EAD, while F-2 dependents cannot work. In the UK, dependents of skilled workers can work. We'll guide you based on your specific case.",
    },
    {
      q: "How long does the dependent visa process take?",
      a: "Processing times vary by country — UAE can be as fast as 1–2 weeks, while the US may take 2–6 months. The UK and Canada typically process within 2–3 months. Our team ensures your application is filed correctly to avoid unnecessary delays.",
    },
    {
      q: "What if my relationship is not legally married?",
      a: "Several countries recognize de facto or common-law relationships for dependent visas. The UK, Australia, and Canada accept unmarried partners if you can prove cohabitation for a minimum period (usually 12–24 months) through joint leases, bills, or statutory declarations.",
    },
    {
      q: "Can I apply for a dependent visa at the same time as the primary applicant?",
      a: "Yes, in most cases you can apply simultaneously. For student visas in Canada and Australia, dependents can apply together. For employment-based visas, some countries require the primary visa to be approved first. We'll advise the optimal strategy for your situation.",
    },
    {
      q: "Do dependents need to appear for an interview?",
      a: "Not always. Many countries waive interviews for dependent applicants, especially minors. However, the US often requires an in-person interview for adult dependents. We provide full interview preparation including mock sessions and document briefing.",
    },
    {
      q: "What happens if the dependent visa is refused?",
      a: "If refused, you usually have the right to appeal or reapply. The most common reasons are insufficient financial proof or inability to demonstrate a genuine relationship. BlueWave's pre-filing review catches these issues before submission, which is why our refusal rate is under 4%.",
    },
    {
      q: "Can my parents be included as dependents?",
      a: "Parents are generally not considered dependents under standard visa categories. However, countries like the UAE allow sponsoring parents, and some countries have separate parent/super visa pathways. Canada's Super Visa allows parents to stay for up to 5 years.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "H-4 Dependent → US",
      text: "BlueWave made my H-4 to EAD transition seamless. Their documentation checklist was so thorough that I got approved in the first attempt without any RFE.",
      rating: 5,
    },
    {
      name: "Ahmed Al-Rashid",
      role: "Family Reunion → Germany",
      text: "My wife and two children joined me in Munich within 10 weeks. The German embassy appreciated how well-organized our application was. Highly recommend BlueWave.",
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      role: "UK Dependent Visa",
      text: "After being refused once with another agency, BlueWave re-filed our case with additional evidence and we got approved. Their attention to financial documentation was exceptional.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center">
              <span className="text-white font-black text-xs">BW</span>
            </div>
            <span className="font-bold text-lg tracking-tight">BlueWave</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#countries" className="hover:text-gray-900 transition-colors">Countries</a>
            <a href="#process" className="hover:text-gray-900 transition-colors">Process</a>
            <a href="#docs" className="hover:text-gray-900 transition-colors">Documents</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          
<motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
>
  <Link
    to="/consult"
    className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg font-medium inline-block"
  >
    Book Consultation
  </Link>
</motion.div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-16 min-h-[92vh] flex items-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Decorative orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-blue-50 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-indigo-50 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            >
              <Sparkles size={14} />
              FAMILY REUNIFICATION EXPERTS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
            >
              Bring Your Family
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                Together, Faster
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-gray-500 text-lg leading-relaxed max-w-lg"
            >
              Navigating dependent visa requirements across 35+ countries. We handle documentation, filing, and embassy coordination so you can focus on what matters — your family.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
             <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
>
  <Link
    to="/consult"
    className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg font-medium inline-block"
  >
    Book Consultation
  </Link>
</motion.div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-gray-300 transition-colors"
              >
                Free Eligibility Check
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex items-center gap-6 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <BadgeCheck size={16} className="text-green-500" />
                96% Success Rate
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={16} className="text-green-500" />
                Data Protected
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare size={16} className="text-green-500" />
                24/7 Support
              </span>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-3xl p-8 border border-gray-100">
              {/* Mini cards floating */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 max-w-[260px] mb-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Visa Approved</p>
                    <p className="text-xs text-gray-400">UK Dependent Visa</p>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 max-w-[280px] ml-auto mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Plane size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Travel Ready</p>
                    <p className="text-xs text-gray-400">Family of 4 • Canada</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Clock size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Processing</p>
                    <p className="text-xs text-gray-400">Germany • Week 3</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 1.2, duration: 2 }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: 12500, suffix: "+", label: "Families Reunited", icon: Users },
            { val: 96, suffix: "%", label: "Approval Rate", icon: Shield },
            { val: 35, suffix: "+", label: "Countries Covered", icon: Globe },
            { val: 4, suffix: " Weeks", label: "Avg. Processing", icon: Clock },
          ].map((s, i) => (
            <RevealSection key={i} delay={i * 0.1} className="text-center">
              <s.icon className="mx-auto text-gray-300 mb-2" size={24} />
              <p className="text-3xl font-extrabold tracking-tight">
                <AnimatedNumber target={s.val} suffix={s.suffix} />
              </p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── WHAT IS DEPENDENT VISA ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Understanding the Visa</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What is a Dependent Visa?
            </h2>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-500 text-lg leading-relaxed">
                A <strong className="text-gray-800">dependent visa</strong> allows the spouse, children, and in some cases other family members of a primary visa holder to live, study, and sometimes work in the host country. It is one of the most common pathways for family reunification across the globe.
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">1</span>
                    </div>
                    Who Qualifies as a Dependent?
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Typically, a legally married spouse and unmarried children under 18 (or under 21 in countries like the US) qualify. Some nations extend eligibility to unmarried partners, same-sex partners, and dependent parents under specific conditions.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">2</span>
                    </div>
                    Rights on a Dependent Visa
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Rights vary significantly by country. Most dependents can study. Work rights depend on the primary visa category — L-2 and 482 dependents usually get full work rights, while F-2 dependents typically cannot work. We map out your exact entitlements before filing.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="py-24 px-6 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Eligibility</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Who Can Sponsor Dependents?</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">If the primary applicant holds any of the following visa types, their family members may be eligible for a dependent visa.</p>
          </RevealSection>

          <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eligibilityItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors h-full group">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors mb-4">
                    <item.icon size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── COUNTRY-SPECIFIC INFO ── */}
      <section id="countries" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Country Guide</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Dependent Visa by Country</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">Each country has unique requirements. Select a destination to see specific details.</p>
          </RevealSection>

          <div className="grid lg:grid-cols-[240px_1fr] gap-8">
            {/* Country Tabs */}
            <RevealSection delay={0.1}>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {countries.map((c, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCountry(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm whitespace-nowrap transition-all ${
                      activeCountry === i
                        ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="font-medium">{c.name}</span>
                  </motion.button>
                ))}
              </div>
            </RevealSection>

            {/* Country Detail */}
            <motion.div
              key={activeCountry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-gray-50 rounded-2xl border border-gray-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{countries[activeCountry].flag}</span>
                <div>
                  <h3 className="text-xl font-bold">{countries[activeCountry].name}</h3>
                  <p className="text-sm text-gray-400">{countries[activeCountry].visa}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Eligible Dependents</p>
                  <p className="text-sm font-semibold">{countries[activeCountry].who}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Processing Time</p>
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    <Clock size={14} className="text-gray-400" />
                    {countries[activeCountry].time}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Approx. Fee</p>
                  <p className="text-sm font-semibold">{countries[activeCountry].fee}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Key Information</p>
                <p className="text-sm text-gray-500 leading-relaxed">{countries[activeCountry].note}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section id="process" className="py-24 px-6 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Step by Step</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Proven Process</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">A structured, transparent approach refined over 12,500+ successful family cases.</p>
          </RevealSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

            {[
              { step: "01", title: "Free Eligibility Assessment", desc: "We review your primary visa status, country, family composition, and goals to determine dependent visa eligibility. This 30-minute consultation identifies the right pathway and flags potential challenges early.", time: "Day 1" },
              { step: "02", title: "Document Strategy & Collection", desc: "Every country has unique documentation requirements. We create a personalized checklist covering relationship proof, financials, primary applicant documents, and ancillary papers. Our team reviews each document for completeness and attestation requirements.", time: "Week 1–2" },
              { step: "03", title: "Application Preparation & Filing", desc: "Our immigration specialists complete all forms, draft cover letters, and organize your application package. We ensure consistency across documents, proper translation where needed, and correct fee payment. Every application is reviewed by a senior caseworker before submission.", time: "Week 2–3" },
              { step: "04", title: "Biometrics & Interview Preparation", desc: "If biometrics or an interview is required, we schedule appointments and provide comprehensive preparation. This includes mock interviews, question guides, document briefing, and tips specific to the embassy or consulate you'll be visiting.", time: "Week 3–5" },
              { step: "05", title: "Decision & Post-Approval Support", desc: "Once approved, we help with visa stamping, travel planning, pre-departure orientation, and settling-in guidance. For complex cases requiring additional evidence, we manage the response process promptly to avoid delays.", time: "Week 5–8" },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 0.12}>
                <div className="relative flex gap-6 pb-12 last:pb-0 group">
                  {/* Dot */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 group-hover:border-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
                    <span className="text-xs font-bold text-gray-300 group-hover:text-blue-600 transition-colors">{item.step}</span>
                  </div>
                  {/* Content */}
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-base">{item.title}</h3>
                      <span className="text-xs text-gray-300 font-medium bg-gray-100 px-2.5 py-0.5 rounded-full">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section id="docs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Documentation</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Required Documents</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">Comprehensive document categories you'll need. Our team helps you prepare and verify every single one.</p>
          </RevealSection>

          <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documents.map((cat, i) => (
              <StaggerItem key={i}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all h-full group">
                  <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-blue-50 flex items-center justify-center transition-colors mb-4 shadow-sm">
                    <cat.icon size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm mb-4">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <RevealSection delay={0.4} className="mt-8 text-center">
            <p className="text-xs text-gray-300">
              * Document requirements vary by country and visa type. This is a general checklist — your caseworker will provide a customized version.
            </p>
          </RevealSection>
        </div>
      </section>


      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Client Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Families Trust BlueWave</h2>
          </RevealSection>

          <StaggerGrid className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">"{t.text}"</p>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Common Questions</h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 px-6">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />

        <RevealSection className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Phone size={13} />
            FREE 30-MINUTE CONSULTATION
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Reunite With Your Family?
          </h2>
          <p className="text-gray-400 mt-4 text-lg leading-relaxed">
            Speak with a BlueWave dependent visa specialist. We'll assess your eligibility, outline the process, and give you a clear cost estimate — no obligations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
           <motion.a
  href="https://wa.me/971506580557"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.97 }}
  className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-sm flex items-center gap-2"
>
  Schedule a Call
  <ArrowRight size={16} />
</motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-semibold text-sm hover:border-gray-300 transition-colors"
            >
              <Mail size={16} />
              info@bluewaveconsultation.com
            </motion.button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-300">
            <MapPin size={13} />
            Offices in Mumbai • Delhi • Bangalore • London • Toronto • Dubai
          </div>
        </RevealSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center">
              <span className="text-white font-black text-[9px]">BW</span>
            </div>
            <span>© 2025 BlueWave Immigration. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}