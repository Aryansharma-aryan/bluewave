import { motion } from "framer-motion";
import { useState } from "react";

import documentationImg from "../../assets/documentation.jfif";
import guidanceImg from "../../assets/guidance.jfif";
import successImg from "../../assets/sucess.jfif";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const steps = [
  {
    title: "Profile Assessment",
    desc: "We begin with a detailed one-on-one consultation to fully understand your academic background, study gaps (if any), financial situation, English proficiency, and long-term career goals. Based on this evaluation, we provide honest and realistic advice, ensuring you choose a path that maximizes your visa approval chances without taking unnecessary risks.",
  },
  {
    title: "University Selection",
    desc: "After analyzing your profile, we carefully shortlist universities that match your academic level, budget, and visa success ratio. We also guide you about tuition fees, scholarships (if available), location advantages, part-time work opportunities, and future job prospects so you can make a well-informed decision.",
  },
  {
    title: "Application Process",
    desc: "We handle the complete application process professionally, including preparing a strong Statement of Purpose (SOP), Letters of Recommendation (LORs), and resume. Every document is customized to your profile to highlight your strengths and avoid common mistakes that lead to rejections.",
  },
  {
    title: "Offer Letter",
    desc: "Once applications are submitted, universities review your profile and issue offer letters. We help you understand each offer in detail — including conditions, fees, deadlines, and course value — so you can confidently select the best university for your future.",
  },
  {
    title: "Visa Documentation",
    desc: "This is the most critical stage. We prepare your complete visa file with proper structure, including financial documents, SOP for visa, GIC/loan (if applicable), and all supporting papers. We ensure everything is genuine, accurate, and aligned with embassy requirements to avoid refusals.",
  },
  {
    title: "Visa Filing",
    desc: "We guide you through the entire visa application process step-by-step, including form filling, document upload, biometric appointment, and fee payment. If an interview is required, we conduct mock sessions to boost your confidence and prepare you with real questions.",
  },
  {
    title: "Visa Approval",
    desc: "After visa approval, our support continues. We guide you with flight booking, accommodation options, forex, packing checklist, and pre-departure briefing. This ensures you travel confidently and settle smoothly in your new country.",
  },
];
const services = [
  {
    title: "Documentation",
    img: documentationImg,
    desc: "We prepare SOP, financial documents, and complete visa files properly.",
  },
  {
    title: "Guidance",
    img: guidanceImg,
    desc: "You get step-by-step expert guidance at every stage.",
  },
  {
    title: "Visa Success",
    img: successImg,
    desc: "We focus on genuine profiles and strong documentation.",
  },
];

export default function StudyVisa() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white text-gray-800 scroll-smooth">

      {/* HERO */}
      <section className="py-20 px-6 text-center border-b bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          >
            Study Visa Guidance – Clear & Genuine Process
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-600 text-base md:text-lg"
          >
            Step-by-step support from university selection to visa approval with
            full transparency.
          </motion.p>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src={guidanceImg}
          className="rounded-xl shadow-lg hover:scale-105 transition duration-500"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-semibold mb-4"
          >
            Simple & Transparent Process
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-600 leading-relaxed"
          >
            We handle everything step-by-step with proper guidance and genuine
            documentation. No confusion, no shortcuts — only clear process.
          </motion.p>
        </motion.div>
      </section>

      {/* PROCESS */}
      <section className="bg-gray-50 py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
            Track Your Process
          </h2>

          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-200 hidden md:block"></div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            className="space-y-5"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.02 }}
                className={`p-5 rounded-lg border cursor-pointer transition ${
                  active === i
                    ? "border-blue-500 shadow-md bg-white"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-base md:text-lg">
                    {i + 1}. {step.title}
                  </h3>

                  <motion.div
                    animate={{ scale: i <= active ? 1.2 : 1 }}
                    className={`w-3 h-3 rounded-full ${
                      i <= active ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                </div>

                {active === i && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-gray-600 text-sm"
                  >
                    {step.desc}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-semibold text-center mb-12"
        >
          What We Actually Do
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TRUST */}
      <section className="bg-blue-50 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="max-w-4xl mx-auto grid grid-cols-3 text-center"
        >
          {[
            { num: "10K+", label: "Applications" },
            { num: "98%", label: "Success Rate" },
            { num: "50+", label: "Countries" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
                {item.num}
              </h3>
              <p className="text-gray-600 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Start Your Study Abroad Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-600 mb-6"
        >
          Get clear guidance before making any decision.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition"
        >
          Book Free Consultation
        </motion.button>
      </section>
    </div>
  );
}