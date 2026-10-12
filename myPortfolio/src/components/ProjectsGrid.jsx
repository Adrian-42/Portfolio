// src/components/ProjectsGrid.jsx
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ENHANCED_PROJECTS, PROJECT_FILTERS } from "../data/projects";

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const FilterTabs = ({ active, onChange, darkMode }) => (
  <div
    role="tablist"
    aria-label="Filter projects by technology"
    className={`flex flex-wrap gap-2 p-1 rounded-2xl border w-fit ${
      darkMode
        ? "bg-stone-900/60 border-stone-800"
        : "bg-stone-100/80 border-stone-200"
    }`}
  >
    {PROJECT_FILTERS.map((filter) => {
      const isActive = active === filter;
      return (
        <button
          key={filter}
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(filter)}
          className={`relative px-4 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-200 cursor-none ${
            isActive
              ? darkMode
                ? "text-stone-950"
                : "text-stone-50"
              : darkMode
              ? "text-stone-400 hover:text-stone-200"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="filterPill"
              className={`absolute inset-0 rounded-xl ${
                darkMode ? "bg-amber-400" : "bg-stone-900"
              }`}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      );
    })}
  </div>
);

// ─── Tilt Card ───────────────────────────────────────────────────────────────
const TiltCard = ({ children, darkMode }) => {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 280, damping: 28, mass: 0.6 };
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [9, -9]), springCfg);
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), springCfg);
  const glowX = useSpring(useMotionValue(50), springCfg);
  const glowY = useSpring(useMotionValue(50), springCfg);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="h-full"
      >
        {/* Inner glow that follows cursor position */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(280px circle at ${x}% ${y}%, rgba(194,65,12,0.12) 0%, transparent 70%)`
            ),
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

// ─── Project Card ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, darkMode, onOpenModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{
      duration: 0.7,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }}
    layout
    className="h-full"
  >
    <TiltCard darkMode={darkMode}>
      <article
        className={`relative group h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl ${
          darkMode
            ? "bg-stone-900/80 border-stone-800 hover:border-stone-600"
            : "bg-white/90 border-stone-200 hover:border-stone-400"
        }`}
        onClick={() => onOpenModal(project)}
        role="button"
        tabIndex={0}
        aria-label={`Open case study for ${project.title}`}
        onKeyDown={(e) => e.key === "Enter" && onOpenModal(project)}
      >
        {/* ── Image zone ── */}
        <div className="relative h-48 overflow-hidden bg-stone-950 flex-shrink-0">
          <img
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* gradient fade */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 50%, ${
                darkMode ? "rgba(9,9,11,0.85)" : "rgba(255,255,255,0.85)"
              } 100%)`,
            }}
          />
          {/* Accent color bar */}
          <div
            className="absolute bottom-0 left-0 h-[3px] w-full opacity-80"
            style={{ backgroundColor: project.accent }}
          />
        </div>

        {/* ── Content zone ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Overline + title */}
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-stone-500 mb-0.5">
              {project.subtitle}
            </p>
            <h3
              className={`text-lg font-serif font-bold leading-snug ${
                darkMode ? "text-stone-50" : "text-stone-900"
              }`}
            >
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className={`text-xs leading-relaxed text-pretty line-clamp-3 flex-1 ${
              darkMode ? "text-stone-400" : "text-stone-500"
            }`}
          >
            {project.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${
                  darkMode
                    ? "bg-stone-800 border-stone-700 text-stone-300"
                    : "bg-stone-100 border-stone-200 text-stone-600"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-xl bg-orange-700 hover:bg-orange-800 text-stone-50 transition-colors duration-200 cursor-none"
            >
              Case Study →
            </button>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors duration-200 cursor-none ${
                  darkMode
                    ? "border-stone-700 text-stone-300 hover:bg-stone-800"
                    : "border-stone-300 text-stone-700 hover:bg-stone-100"
                }`}
                aria-label={`Live demo for ${project.title}`}
              >
                Live ↗
              </a>
            ) : (
              <span
                className={`px-3 py-2 text-xs font-mono rounded-xl border opacity-40 ${
                  darkMode ? "border-stone-800 text-stone-600" : "border-stone-200 text-stone-400"
                }`}
              >
                Private
              </span>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  </motion.div>
);

// ─── Case Study Modal ─────────────────────────────────────────────────────────
const CaseStudyModal = ({ project, darkMode, onClose }) => {
  const [imgIndex, setImgIndex] = useState(0);

  // Close on Escape
  useState(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col ${
          darkMode
            ? "bg-stone-950 border-stone-800"
            : "bg-white border-stone-200"
        }`}
      >
        {/* ── Modal header ── */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${
            darkMode ? "border-stone-800 bg-stone-900/80" : "border-stone-100 bg-stone-50"
          }`}
        >
          {/* macOS-style traffic lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span
              className={`ml-3 font-mono text-xs uppercase tracking-widest ${
                darkMode ? "text-stone-400" : "text-stone-500"
              }`}
            >
              {project.subtitle} — Case Study
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-none ${
              darkMode
                ? "text-stone-400 hover:text-white hover:bg-stone-800"
                : "text-stone-400 hover:text-stone-900 hover:bg-stone-100"
            }`}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Modal body ── */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row gap-0 md:divide-x divide-stone-800/30">

            {/* Left: text content */}
            <div className="flex-1 p-6 md:p-8 space-y-7 min-w-0">
              {/* Title */}
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-serif font-black leading-tight ${
                    darkMode ? "text-stone-50" : "text-stone-900"
                  }`}
                >
                  {project.title}
                </h2>
                <p className="text-xs font-mono text-stone-500 mt-0.5">{project.timeline}</p>
              </div>

              {/* Problem */}
              <section>
                <h3
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 ${
                    darkMode ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  Problem Statement
                </h3>
                <p
                  className={`text-sm leading-relaxed text-pretty ${
                    darkMode ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  {project.problem}
                </p>
              </section>

              {/* Role */}
              <section>
                <h3
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 ${
                    darkMode ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  My Role
                </h3>
                <p
                  className={`text-sm font-semibold ${
                    darkMode ? "text-stone-200" : "text-stone-800"
                  }`}
                >
                  {project.role}
                </p>
              </section>

              {/* Challenges */}
              <section>
                <h3
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 ${
                    darkMode ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  Key Challenges
                </h3>
                <ul className="space-y-1.5">
                  {project.challenges.map((c, i) => (
                    <li key={i} className={`flex gap-2 text-sm ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
                      <span className="text-orange-500 font-bold mt-px flex-shrink-0">→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Results */}
              <section>
                <h3
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 ${
                    darkMode ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  Results &amp; Impact
                </h3>
                <ul className="space-y-1.5">
                  {project.results.map((r, i) => (
                    <li key={i} className={`flex gap-2 text-sm ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
                      <span className="text-emerald-500 font-bold mt-px flex-shrink-0">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tech stack pills */}
              <section>
                <h3
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 ${
                    darkMode ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border ${
                        darkMode
                          ? "bg-stone-800 border-stone-700 text-stone-200"
                          : "bg-stone-100 border-stone-200 text-stone-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Footer links */}
              <div className="flex gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-700 hover:bg-orange-800 text-stone-50 text-xs font-semibold rounded-full transition-colors cursor-none"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full border transition-colors cursor-none ${
                      darkMode
                        ? "border-stone-700 text-stone-300 hover:bg-stone-800"
                        : "border-stone-300 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right: image carousel */}
            <div
              className={`md:w-[44%] flex-shrink-0 p-6 md:p-8 flex flex-col gap-4 ${
                darkMode ? "bg-stone-900/50" : "bg-stone-50/50"
              }`}
            >
              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border border-stone-800/50 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={project.images[imgIndex]}
                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Nav arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIndex((p) => (p - 1 + project.images.length) % project.images.length)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/10 backdrop-blur-sm flex items-center justify-center transition-all cursor-none"
                      aria-label="Previous screenshot"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setImgIndex((p) => (p + 1) % project.images.length)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/10 backdrop-blur-sm flex items-center justify-center transition-all cursor-none"
                      aria-label="Next screenshot"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`rounded-full transition-all duration-300 cursor-none ${
                          imgIndex === i ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                        }`}
                        aria-label={`View screenshot ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-none ${
                        imgIndex === i
                          ? "border-orange-500 opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Frame count label */}
              <p className="text-[10px] font-mono text-stone-500 text-center">
                Frame {imgIndex + 1} of {project.images.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProjectsGrid = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? ENHANCED_PROJECTS
      : ENHANCED_PROJECTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="py-28 px-6 max-w-5xl mx-auto"
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
              Selected Work
            </span>
            <h2
              id="projects-heading"
              className={`text-4xl md:text-5xl font-serif font-bold mt-1 tracking-tight ${
                darkMode ? "text-stone-50" : "text-stone-900"
              }`}
            >
              Projects
            </h2>
          </div>
          <FilterTabs active={activeFilter} onChange={setActiveFilter} darkMode={darkMode} />
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  darkMode={darkMode}
                  onOpenModal={setSelectedProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <p className={`text-sm ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
                No projects match this filter yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            darkMode={darkMode}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsGrid;

