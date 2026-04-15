import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle, FiGlobe, FiBookOpen, FiDollarSign } from "react-icons/fi";

/* ───────── DATA ───────── */
const FAQS = [
  {
    category: "General",
    icon: <FiGlobe />,
    items: [
      {
        q: "What services does BlueWave offer?",
        a: "We provide end-to-end immigration solutions including study visas, permanent residency pathways, work permits, tourist visas, and language test preparation.",
      },
      {
        q: "How long have you been operating?",
        a: "We have been serving clients since 2018 with a strong track record of successful visa approvals.",
      },
    ],
  },
  {
    category: "Visa Process",
    icon: <FiHelpCircle />,
    items: [
      {
        q: "How long does visa processing take?",
        a: "Processing depends on the country and visa type. Tourist visas typically take 2–6 weeks, while PR pathways may take longer.",
      },
      {
        q: "Do you handle visa refusals?",
        a: "Yes, we carefully analyze refusal reasons and guide you through a stronger reapplication process.",
      },
    ],
  },
  {
    category: "Study",
    icon: <FiBookOpen />,
    items: [
      {
        q: "Which countries do you support?",
        a: "We assist with applications for Canada, UK, USA, Australia, Germany, and other leading destinations.",
      },
    ],
  },
  {
    category: "Costs",
    icon: <FiDollarSign />,
    items: [
      {
        q: "Is consultation free?",
        a: "Yes, the first consultation is completely free with no obligation.",
      },
    ],
  },
];

/* ───────── COMPONENT ───────── */
export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return FAQS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }));
  }, [search]);

  return (
    <section className="bg-white py-24 px-4 sm:px-6">
      
      {/* ───── HEADER ───── */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 text-lg leading-relaxed">
          Clear answers to help you understand our process, services, and timelines.
        </p>

        {/* SEARCH */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ───── MAIN GRID ───── */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-12">
        
        {/* ───── SIDEBAR ───── */}
        <div className="sticky top-24 h-fit space-y-2">
          {FAQS.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeCategory === cat.category
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* ───── FAQ LIST ───── */}
        <div className="space-y-4">
          {filtered
            .filter((g) => g.category === activeCategory)
            .map((group) =>
              group.items.map((item, i) => {
                const id = `${group.category}-${i}`;
                const isOpen = open === id;

                return (
                  <div
                    key={id}
                    className="border border-gray-200 rounded-xl"
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <span className="text-base sm:text-lg font-medium text-gray-900">
                        {item.q}
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-gray-400"
                      >
                        ▼
                      </motion.span>
                    </button>

                    {/* ANSWER */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-600 leading-relaxed text-base">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
        </div>
      </div>

      {/* ───── CTA ───── */}
      <div className="mt-24 max-w-4xl mx-auto border rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Still have questions?
          </h3>
          <p className="text-gray-500">
            Our team is here to help you.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition">
          Contact Us
        </button>
      </div>

    </section>
  );
}