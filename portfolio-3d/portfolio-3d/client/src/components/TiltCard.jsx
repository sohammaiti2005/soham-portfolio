import { useRef } from 'react';

/**
 * Wraps any content and applies a subtle 3D tilt that follows the cursor,
 * using plain CSS transforms (perspective + rotateX/rotateY) — no WebGL needed.
 * Respects prefers-reduced-motion.
 */
export default function TiltCard({ children, className = '', maxTilt = 10, style = {} }) {
  const ref = useRef(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * (maxTilt * 2);
    const rotateX = -((y / rect.height) - 0.5) * (maxTilt * 2);
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
