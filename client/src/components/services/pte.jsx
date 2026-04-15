import { useEffect, useRef, useState } from "react";

/* ── PREMIUM STYLES ── */
const Font = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    * { margin:0; padding:0; box-sizing:border-box; }

    .bw {
      font-family: 'Inter', sans-serif;
      background:#f7f9ff;
      padding: 80px 6vw;
    }

    h2 {
      font-size: clamp(38px,5vw,60px);
      font-weight: 800;
      margin-bottom: 10px;
    }

    .blue { color:#1848c8; }

    .sub {
      color:#6b7a99;
      margin-bottom: 50px;
    }

    /* GRID */
    .grid {
      display:grid;
      grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
      gap:20px;
    }

    /* FLIP CARD */
    .flip-card {
      perspective:1200px;
      height:320px;
    }

    .flip-inner {
      position:relative;
      width:100%;
      height:100%;
      transform-style:preserve-3d;
      transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
    }

    .flip-card:hover .flip-inner {
      transform: rotateY(180deg);
    }

    .flip-front,
    .flip-back {
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      border-radius:18px;
      backface-visibility:hidden;
      overflow:hidden;
    }

    /* FRONT */
    .flip-front {
      background:#fff;
      border:1px solid #e2e8f8;
      padding:24px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      box-shadow:0 10px 30px rgba(0,0,0,0.05);
    }

    /* BACK */
    .flip-back {
      transform: rotateY(180deg);
      background:linear-gradient(135deg,#1848c8,#4f8cff);
      color:#fff;
      padding:22px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }

    /* HOVER LIFT */
    .flip-card:hover {
      transform: translateY(-6px);
      transition:0.3s;
    }

    .icon {
      width:55px;
      height:55px;
      border-radius:14px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(135deg,#1848c8,#4f8cff);
      color:#fff;
      font-size:24px;
      box-shadow:0 10px 25px rgba(24,72,200,0.3);
    }

    .title {
      font-size:20px;
      font-weight:700;
      margin-top:10px;
    }

    .desc {
      font-size:13px;
      color:#666;
      margin-top:6px;
    }

    .hover {
      font-size:11px;
      color:#1848c8;
      font-weight:600;
    }

    ul {
      margin-top:10px;
      padding-left:18px;
      font-size:13px;
      line-height:1.6;
    }

    @media(max-width:768px){
      .flip-card:hover .flip-inner {
        transform:none;
      }
    }

  `}</style>
);

/* ── REVEAL ANIMATION ── */
const useReveal = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShow(true);
    });
    if (ref.current) obs.observe(ref.current);
  }, []);

  return [ref, show];
};

const R = ({ children }) => {
  const [ref, show] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(40px)",
        transition: "0.7s ease",
      }}
    >
      {children}
    </div>
  );
};

/* ── MAIN COMPONENT ── */
export default function ModulesSection() {
  const modules = [
    {
      title: "Speaking",
      icon: "🎤",
      front:
        "Part 1, 2 & 3 mastery — fluency, coherence, and pronunciation.",
      back: [
        "Live 1-on-1 mock interviews",
        "Cue card practice",
        "Pronunciation correction",
        "Fluency scoring",
      ],
    },
    {
      title: "Listening",
      icon: "🎧",
      front:
        "All 4 section types — speed, accuracy, and note-taking.",
      back: [
        "Section 1–4 drills",
        "Accent training",
        "Dictation practice",
        "Full test simulation",
      ],
    },
    {
      title: "Reading",
      icon: "📖",
      front:
        "T/F/NG, MCQ — scan smarter and improve speed.",
      back: [
        "Skimming techniques",
        "Matching headings",
        "True/False logic",
        "Speed reading",
      ],
    },
    {
      title: "Writing",
      icon: "✍️",
      front:
        "Task 1 & 2 — structure, vocabulary, and feedback.",
      back: [
        "Essay structures",
        "Graph writing",
        "Coherence training",
        "Weekly corrections",
      ],
    },
  ];

  return (
    <div className="bw">
      <Font />

      <R>
        <h2>
          Every Skill.<br />
          <span className="blue">Covered deeply.</span>
        </h2>
        <p className="sub">
          Hover each card to explore details.
        </p>
      </R>

      <div className="grid">
        {modules.map((m, i) => (
          <R key={i}>
            <div className="flip-card">
              <div className="flip-inner">

                {/* FRONT */}
                <div className="flip-front">
                  <div className="icon">{m.icon}</div>

                  <div>
                    <div className="title">{m.title}</div>
                    <div className="desc">{m.front}</div>
                  </div>

                  <div className="hover">
                    HOVER TO EXPLORE →
                  </div>
                </div>

                {/* BACK */}
                <div className="flip-back">
                  <h4>{m.title} — What's Covered</h4>
                  <ul>
                    {m.back.map((b, i) => (
                      <li key={i}>✓ {b}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </R>
        ))}
      </div>
      <section style={{ padding: "110px 6vw", background: "#f7f9ff" }}>
  <div style={{ maxWidth: 1150, margin: "0 auto" }}>

    {/* HEADING */}
    <div style={{ marginBottom: 70 }}>
      <h2 style={{
        fontSize: "clamp(40px,5vw,64px)",
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: 20
      }}>
        Complete Preparation.<br />
        <span style={{ color: "#1848c8" }}>Structured for Results.</span>
      </h2>

      <p style={{
        maxWidth: 600,
        color: "#6b7a99",
        fontSize: 17,
        lineHeight: 1.8
      }}>
        Our IELTS/PTE coaching is not random practice. Every step is structured,
        tracked, and optimized to push your band score higher week by week.
      </p>
    </div>

    {/* GRID */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60
    }}>

      {/* LEFT SIDE */}
      <div>

        {/* WHAT WE PROVIDE */}
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: 20,
          border: "1px solid #e2e8f8",
          marginBottom: 30
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            What We Provide
          </h3>

          <ul style={{ lineHeight: 2, color: "#555" }}>
            <li>✓ Free diagnostic test with band analysis</li>
            <li>✓ Personalized study roadmap</li>
            <li>✓ Daily practice assignments</li>
            <li>✓ Weekly full mock tests</li>
            <li>✓ Detailed writing corrections</li>
            <li>✓ Speaking mock interviews</li>
            <li>✓ Vocabulary & grammar training</li>
            <li>✓ Doubt-solving sessions</li>
          </ul>
        </div>

        {/* STUDY PLAN */}
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: 20,
          border: "1px solid #e2e8f8"
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Weekly Study Structure
          </h3>

          <p style={{ color: "#666", marginBottom: 20 }}>
            A clear roadmap ensures consistent improvement without confusion.
          </p>

          <ul style={{ lineHeight: 2, color: "#555" }}>
            <li>📅 Day 1–2: Concept + Strategy Training</li>
            <li>📅 Day 3–4: Practice + Exercises</li>
            <li>📅 Day 5: Writing & Speaking Evaluation</li>
            <li>📅 Day 6: Full Mock Test</li>
            <li>📅 Day 7: Feedback + Improvement Plan</li>
          </ul>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div>

        {/* PROGRESS TRACKING */}
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: 20,
          border: "1px solid #e2e8f8",
          marginBottom: 30
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 25 }}>
            Your Progress Tracking
          </h3>

          {[
            { label: "Speaking Improvement", val: "85%" },
            { label: "Listening Accuracy", val: "92%" },
            { label: "Reading Speed", val: "88%" },
            { label: "Writing Score Growth", val: "90%" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                marginBottom: 6
              }}>
                <span>{item.label}</span>
                <span style={{ color: "#1848c8" }}>{item.val}</span>
              </div>

              <div style={{
                height: 8,
                background: "#e6ecff",
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <div style={{
                  width: item.val,
                  height: "100%",
                  background: "linear-gradient(90deg,#1848c8,#4f8cff)"
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* OUTCOME */}
        <div style={{
          background: "linear-gradient(135deg,#1848c8,#4f8cff)",
          padding: "40px",
          borderRadius: 20,
          color: "#fff"
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Final Outcome
          </h3>

          <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
            By the end of the program, you will not just “prepare” —
            you will be fully exam-ready with confidence, clarity, and
            proven strategies to achieve your target band score.
          </p>

          <p style={{
            marginTop: 20,
            fontWeight: 600,
            fontSize: 18
          }}>
            ✔ 0.5 – 1.5 Band Improvement Guaranteed*
          </p>
        </div>

      </div>

    </div>
  </div>
</section>
    </div>
  );
}