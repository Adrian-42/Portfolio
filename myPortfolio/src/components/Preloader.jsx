import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950"
        >
          {/* SVG Monogram — "A" initial drawn with animated stroke */}
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer "A" strokes */}
            <motion.path
              d="M 20 80 L 50 20 L 80 80"
              stroke="#ea580c"
              strokeWidth="5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
            {/* Crossbar of "A" */}
            <motion.path
              d="M 32 55 L 68 55"
              stroke="#ea580c"
              strokeWidth="5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 1.0 }}
            />
            {/* Subtle inner glow ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              stroke="#ea580c"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Animated wordmark */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55, ease: "easeOut" }}
            className="mt-5 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-[0.55em]"
          >
            Adrian Rocacorba
          </motion.p>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-orange-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

