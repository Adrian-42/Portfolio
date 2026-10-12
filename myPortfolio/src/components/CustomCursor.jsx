import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * CustomCursor — a two-layer cursor (sharp dot + lagging ring).
 * Automatically hides on touch/coarse-pointer devices.
 * Expands the outer ring when hovering any interactive element.
 */
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with a precise pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    setIsVisible(true);

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const attachHoverListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor='pointer']")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    attachHoverListeners();

    // Re-attach when the DOM changes (modals, dynamic content)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot — zero-latency, 1:1 with cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-600 pointer-events-none z-[200] mix-blend-difference"
        style={{ willChange: "transform" }}
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "tween", duration: 0 }}
      />

      {/* Outer ring — spring-lagged, morphs on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[199] border border-orange-600/70 mix-blend-difference"
        style={{ willChange: "transform, width, height" }}
        animate={{
          x: pos.x - (isHovering ? 20 : 12),
          y: pos.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
          opacity: isHovering ? 0.85 : 0.45,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 26,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CustomCursor;

