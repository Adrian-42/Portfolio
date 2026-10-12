// src/components/Testimonials.jsx
// ── Replace placeholder content with real testimonials before launch ──
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Prof. Rafael Dela Cruz",
    role: "IT Program Head",
    company: "STI College Global City",
    initials: "RD",
    color: "bg-blue-600",
    rating: 5,
    text: "Adrian's capstone project showcased a level of system architecture maturity rarely seen in undergraduate work. His HOA portal was production-ready — clean schema, role-based access, and a polished, intuitive UI throughout.",
  },
  {
    id: 2,
    name: "Tish Dela Fuente",
    role: "Co-Developer",
    company: "WhiskerWatch Team",
    initials: "JR",
    color: "bg-rose-500",
    rating: 5,
    text: "Adrian owns the frontend of every project he touches. On WhiskerWatch, his component architecture made our codebase easy to navigate and extend. The UI he built consistently impressed our evaluators and professors.",
  },
  {
    id: 3,
    name: "Mark Anthony Santos",
    role: "Project Partner",
    company: "EmergenSeek Mobile App",
    initials: "MS",
    color: "bg-emerald-600",
    rating: 5,
    text: "Working on EmergenSeek with Adrian was seamless. He integrated the Google Maps API and GPS logic faster than any of us expected, and his debugging instinct saved us critical hours before our final presentation.",
  },
  {
    id: 4,
    name: "Elena Fuentes",
    role: "HOA Treasurer",
    company: "Camella Bucandala V",
    initials: "EF",
    color: "bg-amber-500",
    rating: 5,
    text: "The system Adrian built completely replaced our paper-based billing process. It's transparent, fast, and easy to use — even our older residents find it intuitive. That says everything about the quality of the design.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div
    className="flex gap-0.5"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400" : "text-stone-600"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, darkMode, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{
      duration: 0.65,
      delay: index * 0.11,
      ease: [0.16, 1, 0.3, 1],
    }}
    className={`relative flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 shadow-sm group ${
      darkMode
        ? "bg-stone-900/70 border-stone-800 hover:border-stone-600 hover:bg-stone-900/90"
        : "bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white"
    }`}
  >
    {/* Ambient glow on hover */}
    <div
      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(194,65,12,0.08), transparent 60%)",
      }}
    />

    {/* Opening quote mark */}
    <span
      className={`text-6xl font-serif leading-none select-none -mb-4 ${
        darkMode ? "text-stone-700" : "text-stone-200"
      }`}
      aria-hidden="true"
    >
      &ldquo;
    </span>

    {/* Quote text */}
    <p
      className={`relative z-10 text-sm leading-relaxed text-pretty ${
        darkMode ? "text-stone-300" : "text-stone-600"
      }`}
    >
      {testimonial.text}
    </p>

    {/* Star rating */}
    <StarRating rating={testimonial.rating} />

    {/* Divider */}
    <div
      className={`border-t ${darkMode ? "border-stone-800" : "border-stone-100"}`}
    />

    {/* Author row */}
    <div className="flex items-center gap-3">
      {/* Avatar with initials */}
      <div
        className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}
        aria-hidden="true"
      >
        {testimonial.initials}
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold truncate ${
            darkMode ? "text-stone-100" : "text-stone-900"
          }`}
        >
          {testimonial.name}
        </p>
        <p className="text-[11px] text-stone-500 truncate">
          {testimonial.role} &middot; {testimonial.company}
        </p>
      </div>
    </div>
  </motion.article>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const Testimonials = ({ darkMode, onContactClick }) => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-28 px-6 max-w-5xl mx-auto"
    >
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center md:text-left"
      >
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
          What People Say
        </span>
        <h2
          id="testimonials-heading"
          className={`text-4xl md:text-5xl font-serif font-bold mt-1 tracking-tight ${
            darkMode ? "text-stone-50" : "text-stone-900"
          }`}
        >
          Feedback &amp; Collaborations
        </h2>
        <p
          className={`mt-3 text-sm max-w-lg ${darkMode ? "text-stone-400" : "text-stone-500"}`}
        >
          From professors, teammates, and project stakeholders who experienced
          the work first-hand.
        </p>
      </motion.div>

      {/* ── Testimonial cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            darkMode={darkMode}
            index={i}
          />
        ))}
      </div>

      {/* ── CTA Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative mt-16 overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16 text-center border ${
          darkMode
            ? "bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950/40 border-orange-900/30"
            : "bg-gradient-to-br from-stone-50 via-white to-orange-50 border-orange-200/60"
        }`}
      >
        {/* Decorative blurred blob inside the banner */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ea580c 0%, transparent 70%)",
          }}
        />

        <p
          className={`text-xs font-mono font-bold tracking-widest uppercase mb-3 ${
            darkMode ? "text-orange-400" : "text-orange-600"
          }`}
        >
          Open to opportunities
        </p>
        <h3
          className={`text-2xl md:text-4xl font-serif font-bold tracking-tight mb-3 ${
            darkMode ? "text-stone-50" : "text-stone-900"
          }`}
        >
          Ready to build something{" "}
          <span className="text-orange-600 dark:text-orange-500">amazing</span>?
        </h3>
        <p
          className={`text-sm mb-8 max-w-md mx-auto text-pretty ${
            darkMode ? "text-stone-400" : "text-stone-500"
          }`}
        >
          Whether it&apos;s a startup, a freelance project, or a full-time role
          — I&apos;m ready to contribute from day one.
        </p>
        <button
          onClick={onContactClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-700 hover:bg-orange-800 text-stone-50 font-semibold rounded-full shadow-lg hover:shadow-orange-700/30 hover:shadow-2xl transition-all duration-300 cursor-none"
        >
          Let&apos;s Talk
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default Testimonials;
