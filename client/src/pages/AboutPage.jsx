import { motion } from "framer-motion";
import blue from "../assets/about.png";

const steps = [
  {
    title: "Profile Assessment",
    desc: "We evaluate your eligibility and recommend the best visa pathway.",
  },
  {
    title: "Documentation",
    desc: "We organize and verify every document with proper accuracy.",
  },
  {
    title: "Application Filing",
    desc: "We file your application professionally with correct formatting.",
  },
  {
    title: "Visa Approval",
    desc: "We support you until the final outcome and approval decision.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1a1a1a] overflow-hidden">

      {/* ───────── HERO SECTION ───────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-red-600 uppercase tracking-[0.25em] mb-4"
          >
            About Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[48px] md:text-[60px] font-extrabold leading-tight mb-6"
          >
            Making Immigration <br />
            <span className="text-red-600">Simple & Transparent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl"
          >
            Blue Wave Consultancy is a Dubai-based immigration firm helping
            individuals and families achieve global opportunities since 2015.
            We specialize in Study, Work, and Permanent Residency visa
            applications with professional and genuine guidance.
          </motion.p>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-14"
          >
            <div>
              <p className="text-4xl font-bold text-red-600">12,000+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Visas Approved
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-red-600">98%</p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Success Rate
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white relative"
          >
            <motion.img
              src={blue}
              alt="About"
              className="w-full h-[500px] object-cover"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl bg-white/95 shadow-lg border border-gray-100"
            >
              <p className="font-bold text-base text-gray-900">
                Dubai Based Consultancy 🇦🇪
              </p>
              <p className="text-xs text-gray-500">
                Trusted immigration support since 2015
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────── PROCESS SECTION ───────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[38px] md:text-[48px] font-extrabold mb-4">
            Our Process
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            A structured and transparent process to ensure every visa
            application is handled professionally.
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.18,
                duration: 0.9,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-md mb-5">
                {i + 1}
              </div>

              <p className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </p>

              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}