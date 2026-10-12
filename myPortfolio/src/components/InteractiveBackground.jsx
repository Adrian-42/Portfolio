import { useEffect, useRef } from "react";

/**
 * InteractiveBackground — three-layer ambient system:
 * 1. Animated warm-toned gradient blobs (CSS keyframes)
 * 2. Subtle developer dot-matrix grid overlay
 * 3. Dynamic mouse-follow radial spotlight
 *
 * Stacking context: z-0 fixed inset-0 pointer-events-none
 * Renders directly over the base canvas, visible through semi-transparent cards & sections.
 */
const InteractiveBackground = ({ darkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;

    const onMouseMove = (e) => {
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
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500"
      style={{ "--mx": "50vw", "--my": "50vh" }}
    >
      {/* ── Keyframe definitions for smooth ambient floating ── */}
      <style>{`
        @keyframes bg-blob-1 {
          0%, 100% { transform: translate3d(0%, 0%, 0) scale(1); }
          33%      { transform: translate3d(8%, -12%, 0) scale(1.1); }
          66%      { transform: translate3d(-6%, 8%, 0) scale(0.95); }
        }
        @keyframes bg-blob-2 {
          0%, 100% { transform: translate3d(0%, 0%, 0) scale(1); }
          33%      { transform: translate3d(-10%, 8%, 0) scale(1.08); }
          66%      { transform: translate3d(8%, -10%, 0) scale(1.12); }
        }
        @keyframes bg-blob-3 {
          0%, 100% { transform: translate3d(0%, 0%, 0) scale(1); }
          50%      { transform: translate3d(6%, 10%, 0) scale(0.92); }
        }
      `}</style>

      {/* ── LAYER 1: Ambient Mesh Gradient Blobs ── */}
      {/* Blob 1 — Top-Left warm amber/orange aura */}
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          top: "-10%",
          left: "-8%",
          background: darkMode
            ? "radial-gradient(circle, rgba(234,88,12,0.45) 0%, rgba(249,115,22,0.15) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(249,115,22,0.32) 0%, rgba(251,146,60,0.12) 45%, transparent 70%)",
          filter: "blur(85px)",
          opacity: darkMode ? 0.75 : 0.65,
          willChange: "transform",
          animation: "bg-blob-1 22s ease-in-out infinite",
        }}
      />

      {/* Blob 2 — Bottom-Right amber glow */}
      <div
        style={{
          position: "absolute",
          width: 580,
          height: 580,
          borderRadius: "50%",
          bottom: "2%",
          right: "-8%",
          background: darkMode
            ? "radial-gradient(circle, rgba(217,119,6,0.38) 0%, rgba(180,83,9,0.12) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(251,191,36,0.38) 0%, rgba(245,158,11,0.12) 45%, transparent 70%)",
          filter: "blur(90px)",
          opacity: darkMode ? 0.7 : 0.6,
          willChange: "transform",
          animation: "bg-blob-2 26s ease-in-out infinite",
        }}
      />

      {/* Blob 3 — Mid-canvas subtle depth aura */}
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          top: "40%",
          left: "35%",
          background: darkMode
            ? "radial-gradient(circle, rgba(194,65,12,0.28) 0%, rgba(124,45,18,0.08) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(254,215,170,0.1) 50%, transparent 70%)",
          filter: "blur(80px)",
          opacity: darkMode ? 0.65 : 0.55,
          willChange: "transform",
          animation: "bg-blob-3 30s ease-in-out infinite",
        }}
      />

      {/* ── LAYER 2: Minimalist Dot Matrix Pattern ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: darkMode
            ? "radial-gradient(circle, rgba(255,255,255,0.14) 1.2px, transparent 1.2px)"
            : "radial-gradient(circle, rgba(0,0,0,0.09) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── LAYER 3: Dynamic Mouse-Follow Radial Spotlight ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode
            ? "radial-gradient(600px circle at var(--mx) var(--my), rgba(249,115,22,0.16) 0%, rgba(234,88,12,0.05) 35%, transparent 65%)"
            : "radial-gradient(600px circle at var(--mx) var(--my), rgba(234,88,12,0.12) 0%, rgba(249,115,22,0.035) 35%, transparent 65%)",
          willChange: "background",
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
