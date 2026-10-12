import { useEffect, useRef } from "react";

/**
 * InteractiveBackground — three-layer ambient system:
 * 1. Animated warm-toned gradient blobs (CSS keyframes)
 * 2. Subtle dot-matrix grid overlay
 * 3. Cursor-following radial spotlight (CSS custom properties via rAF)
 *
 * All layers are pointer-events-none and aria-hidden.
 * Performance: GPU-composited transforms only, passive event listener, rAF throttle.
 */
const InteractiveBackground = ({ darkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;

    const onMouseMove = (e) => {
      // Cancel any pending frame so we only paint once per frame
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ "--mx": "50vw", "--my": "50vh" }}
    >
      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes bg-blob-1 {
          0%,100% { transform: translate(0%, 0%) scale(1); }
          33%      { transform: translate(7%, -14%) scale(1.08); }
          66%      { transform: translate(-5%, 9%) scale(0.94); }
        }
        @keyframes bg-blob-2 {
          0%,100% { transform: translate(0%, 0%) scale(1); }
          33%      { transform: translate(-9%, 7%) scale(1.06); }
          66%      { transform: translate(10%, -8%) scale(1.1); }
        }
        @keyframes bg-blob-3 {
          0%,100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(5%, 12%) scale(0.92); }
        }
      `}</style>

      {/* ── LAYER 1: Blob 1 — top-left warm orange ── */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          top: "-8%",
          left: "-6%",
          background: darkMode
            ? "radial-gradient(circle, rgba(194,65,12,0.55) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(253,186,116,0.45) 0%, transparent 70%)",
          filter: "blur(110px)",
          opacity: darkMode ? 0.28 : 0.35,
          willChange: "transform",
          animation: "bg-blob-1 20s ease-in-out infinite",
        }}
      />

      {/* ── LAYER 1: Blob 2 — bottom-right amber ── */}
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          bottom: "5%",
          right: "-8%",
          background: darkMode
            ? "radial-gradient(circle, rgba(120,53,15,0.6) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(253,230,138,0.5) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: darkMode ? 0.22 : 0.3,
          willChange: "transform",
          animation: "bg-blob-2 25s ease-in-out infinite",
        }}
      />

      {/* ── LAYER 1: Blob 3 — center neutral ── */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          top: "42%",
          left: "38%",
          background: darkMode
            ? "radial-gradient(circle, rgba(28,25,23,0.8) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(231,229,228,0.6) 0%, transparent 70%)",
          filter: "blur(70px)",
          opacity: darkMode ? 0.4 : 0.5,
          willChange: "transform",
          animation: "bg-blob-3 30s ease-in-out infinite",
        }}
      />

      {/* ── LAYER 2: Dot matrix ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: darkMode
            ? "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── LAYER 3: Cursor spotlight ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode
            ? "radial-gradient(650px circle at var(--mx) var(--my), rgba(194,65,12,0.09) 0%, transparent 58%)"
            : "radial-gradient(650px circle at var(--mx) var(--my), rgba(194,65,12,0.055) 0%, transparent 58%)",
          transition: "background 0.05s linear",
        }}
      />
    </div>
  );
};

export default InteractiveBackground;

