import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  ShieldCheck,
  ClipboardList,
  CheckCircle2,
  ChevronDown,
  BadgeCheck,
  Globe,
  Building2,
  UserCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" },
  }),
};

const softZoom = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" },
  }),
};

const processSteps = [
  {
    title: "Profile Assessment",
    desc: "We review your qualifications, experience, and goals to match you with the right work visa pathway.",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    title: "Country & Visa Selection",
    desc: "We guide you to choose the best country and visa type based on demand, eligibility, and future scope.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Documentation & Filing",
    desc: "Our experts prepare your file professionally to reduce rejection risks and avoid delays.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Employer & Offer Support",
    desc: "If required, we guide you on job search process and help with employer documentation.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "Submission & Tracking",
    desc: "We submit the application and track every stage with proper follow-ups until decision.",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    title: "Visa Outcome & Departure Guidance",
    desc: "After approval, we guide you with travel documents, checklist, and pre-departure planning.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const requirements = [
  "Valid Passport (minimum 6 months validity)",
  "Updated CV / Resume",
  "Educational Certificates & Transcripts",
  "Work Experience Letters (if applicable)",
  "Police Clearance Certificate (PCC)",
  "Medical Test Reports (if required)",
  "Financial Proof (as per visa category)",
  "Language Test (IELTS/PTE if required)",
];

const eligibility = [
  "Age and qualification must match visa rules",
  "Relevant work experience (depending on country)",
  "No major criminal record",
  "Clear immigration background",
  "Medical fitness (country-specific)",
  "Proper supporting documents & verifiable details",
];

const faqs = [
  {
    q: "Which country is best for a work visa?",
    a: "It depends on your profile, skills, experience, and demand. We help you select the best option based on your eligibility and career growth opportunities.",
  },
  {
    q: "Do I need a job offer before applying?",
    a: "Not always. Some countries require an employer sponsorship, while others offer skilled migration routes where job offer is optional.",
  },
  {
    q: "How long does the work visa process take?",
    a: "Processing time varies by country and visa type. It can range from a few weeks to several months depending on verification and embassy timelines.",
  },
  {
    q: "Can my family travel with me on a work visa?",
    a: "In many countries, dependents can travel with you. We guide you on spouse and child visa filing as per immigration rules.",
  },
  {
    q: "What are the common reasons for visa rejection?",
    a: "Incorrect documents, weak financial proof, mismatched experience, or unclear purpose. Our team ensures your file is strong and properly structured.",
  },
];

export default function WorkVisaSection() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20">
      {/* Premium light background effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-100 via-white to-gray-200 blur-3xl opacity-70" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-gray-100 via-white to-gray-200 blur-3xl opacity-70" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-12">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={softZoom}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-sm text-gray-600"
          >
            <Briefcase className="w-4 h-4 text-gray-700" />
            Work Visa Services • Blue Wave Consultancy
          </motion.div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Work Visa Guidance That Feels{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
              Premium & Reliable
            </span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
            Blue Wave Consultancy provides professional work visa assistance with
            structured documentation, country selection guidance, and transparent
            process handling for a smoother immigration journey.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Expert File Handling",
              desc: "Your documents are structured professionally to avoid errors and reduce rejection risk.",
              icon: <BadgeCheck className="w-6 h-6" />,
            },
            {
              title: "Transparent Process",
              desc: "We explain every step clearly so you know exactly what is happening in your case.",
              icon: <ClipboardList className="w-6 h-6" />,
            },
            {
              title: "Fast Support & Updates",
              desc: "Our team stays connected with timely updates and complete guidance at each stage.",
              icon: <ShieldCheck className="w-6 h-6" />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="group bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-sm">
                <div className="text-gray-800">{item.icon}</div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-5 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-gray-900 to-gray-500 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Work Visa Process
            </h3>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              A structured and professional process designed to keep your file
              strong, clear, and embassy-ready.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl duration-300 overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-gradient-to-br from-gray-200 to-white rounded-full blur-2xl opacity-70"
                />

                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-sm">
                    <div className="text-gray-800">{step.icon}</div>
                  </div>

                  <div className="text-sm font-semibold text-gray-500">
                    Step {i + 1}
                  </div>
                </div>

                <h4 className="relative mt-5 text-lg font-semibold text-gray-900">
                  {step.title}
                </h4>
                <p className="relative mt-2 text-sm text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements + Eligibility */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Requirements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={softZoom}
            className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-white border border-gray-200">
                <FileText className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Required Documents
              </h3>
            </div>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              These are common work visa requirements. Exact documents may vary
              depending on country and visa category.
            </p>

            <div className="mt-6 space-y-3">
              {requirements.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-[2px]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={softZoom}
            className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-white border border-gray-200">
                <ShieldCheck className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Eligibility Criteria
              </h3>
            </div>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Eligibility depends on immigration rules, occupation demand, and
              your documentation strength.
            </p>

            <div className="mt-6 space-y-3">
              {eligibility.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-[2px]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              Clear answers to the most common questions about work visa
              applications.
            </p>
          </motion.div>

          <div className="mt-12 max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-gray-900 font-semibold text-base">
                    {faq.q}
                  </span>

                  <motion.div
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-700"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-6 pb-5 text-sm text-gray-600 leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Premium Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={softZoom}
          className="mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-60"
            />

            <div className="relative">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why Choose Blue Wave Consultancy?
              </h4>

              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                We focus on building strong, clear, and compliant visa files.
                From profile evaluation to final submission, our process is
                designed to reduce mistakes, improve approval chances, and make
                the journey stress-free.
              </p>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Professional Documentation",
                  "Transparent Visa Roadmap",
                  "Experienced Case Handling",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white border border-gray-200 text-sm font-medium text-gray-800 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gray-900" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}