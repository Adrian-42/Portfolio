import { motion } from "framer-motion";
import { useMagnet } from "../hooks/useMagnet";

/**
 * MagneticButton — a spring-animated button/anchor that subtly follows the cursor.
 * Renders as <a> when `href` is provided, otherwise as <button>.
 */
const MagneticButton = ({
  children,
  className,
  onClick,
  href,
  download,
  target,
  rel,
  strength = 0.4,
}) => {
  const { ref, position, handleMouseMove, handleMouseLeave } =
    useMagnet(strength);

  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 22,
    mass: 0.5,
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={springTransition}
        className={className}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springTransition}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;

