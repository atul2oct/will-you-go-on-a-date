import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useDodge } from '../hooks/useDodge';

export default function FinalCTA() {
  const ref      = useRef(null);
  const arenaRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { pos, isReturning, dodge } = useDodge(arenaRef);

  const handleDodge = (e) => dodge(e.clientX, e.clientY);
  const handleTouch = (e) => { e.preventDefault(); dodge(e.touches[0].clientX, e.touches[0].clientY); };
  const handleClick = (e) => { e.preventDefault(); e.stopPropagation(); dodge(e.clientX, e.clientY); };

  return (
    <section className="final-cta section" ref={ref}>
      <div className="final-cta__bg">
        <div className="glow final-cta__glow" />
      </div>

      <motion.p
        className="final-cta__eye"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        last chance
      </motion.p>

      <motion.h2
        className="final-cta__title"
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        NOW TRY
        <br />
        TO CATCH IT.
      </motion.h2>

      <motion.div
        className="final-arena"
        ref={arenaRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {pos && (
          <button
            className={`btn-no${isReturning ? ' returning' : ''}`}
            style={{ left: pos.x, top: pos.y }}
            onMouseEnter={handleDodge}
            onMouseMove={handleDodge}
            onClick={handleClick}
            onTouchStart={handleTouch}
          >
            No 🙅
          </button>
        )}
      </motion.div>
    </section>
  );
}
