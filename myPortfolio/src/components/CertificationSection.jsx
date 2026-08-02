import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CertificationsSection = ({ darkMode }) => {
  // State for image lightbox preview
  const [selectedCertImage, setSelectedCertImage] = useState(null);

  return (
    <>
      {/* 3. CERTIFICATIONS SECTION */}
      <motion.section
        id="certifications"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 px-6 flex flex-col items-center justify-center max-w-5xl mx-auto"
      >
        {/* Section Header */}
        <div className="w-full text-center md:text-left mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
            Verified Qualifications
          </span>
          <h2
            className={`text-3xl font-serif font-bold border-b pb-4 mt-1 ${
              darkMode
                ? "text-stone-100 border-stone-800"
                : "text-stone-900 border-stone-300/60"
            }`}
          >
            Certifications & Credentials
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                darkMode
                  ? "bg-stone-900/60 border-stone-800 hover:border-orange-500/40 hover:bg-stone-900"
                  : "bg-stone-50 border-stone-200/80 hover:border-orange-600/30 hover:bg-white"
              }`}
            >
              {/* Ambient Hover Glow Effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-15 blur-lg transition duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                {/* Clickable Certificate Image Container */}
                {cert.image && (
                  <div
                    onClick={() => setSelectedCertImage(cert.image)}
                    className="relative w-full h-48 overflow-hidden border-b border-stone-200/60 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 cursor-pointer group/img"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-mono font-semibold shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                        Expand View
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Card Top: Badge & Date */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {cert.issuer}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      {cert.date}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3
                      className={`text-lg font-serif font-bold group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors ${
                        darkMode ? "text-stone-100" : "text-stone-900"
                      }`}
                    >
                      {cert.title}
                    </h3>
                    <p
                      className={`text-xs md:text-sm mt-2 leading-relaxed ${
                        darkMode ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      {cert.description}
                    </p>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          darkMode
                            ? "bg-stone-800 text-stone-300 border border-stone-700/50"
                            : "bg-stone-200/70 text-stone-700 border border-stone-300/50"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Credential ID & External Link */}
              <div
                className={`relative z-10 p-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
                  darkMode ? "border-stone-800/80" : "border-stone-200/80"
                }`}
              >
                <span
                  className={`text-[10px] truncate max-w-[180px] ${
                    darkMode ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  ID: {cert.credentialId}
                </span>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Verify
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCertImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl bg-stone-900 border border-stone-800"
              onClick={(e) => e.stopPropagation()} // Prevents backdrop click close when clicking content
            >
              <img
                src={selectedCertImage}
                alt="Certificate full view"
                className="w-full h-full object-contain max-h-[85vh]"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCertImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
