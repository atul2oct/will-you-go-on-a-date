import { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useDodge } from '../hooks/useDodge';

const MESSAGES = [
  "Think you can catch it? 😏",
  "Too slow... 🏃",
  "Oops! Almost! 😂",
  "Nice try. 🙈",
  "It's scared of you! 😅",
  "Getting desperate? 🤣",
  "The button has trust issues. 😔",
  "Just say YES already! 💖",
  "OK this is getting ridiculous 😭",
  "Maybe it has a point... 🤔",
  "Resistance is adorable 💅",
  "The button said no cap. 🧢",
];

function getMessage(n) {
  if (n === 0) return "Think you can catch it? 😏";
  return MESSAGES[Math.min(n, MESSAGES.length - 1)];
}

export default function Playground({ onAccept }) {
  const sectionRef = useRef(null);
  const arenaRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });
  const { pos, isReturning, dodgeCount, dodge } = useDodge(arenaRef);

  const handleDodge  = (e) => dodge(e.clientX, e.clientY);
  const handleTouch  = (e) => { e.preventDefault(); dodge(e.touches[0].clientX, e.touches[0].clientY); };
  const handleClick  = (e) => { e.preventDefault(); e.stopPropagation(); dodge(e.clientX, e.clientY); };

  return (
    <section id="playground" className="playground section" ref={sectionRef}>
      {/* ambient glows */}
      <div className="glow glow--v playground__glow-1" />
      <div className="glow glow--p playground__glow-2" />

      <div className="container">
        {/* header */}
        <motion.div
          className="playground__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-badge">The Challenge</p>
          <h2 className="playground__title">
            Will you go on a<br />date with me?
          </h2>
          <p className="playground__sub">
            One button says yes. The other one… has opinions.
          </p>
        </motion.div>

        {/* dynamic message */}
        <div className="play-msg" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={dodgeCount}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {getMessage(dodgeCount)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* game arena */}
        <motion.div
          className="game-arena"
          ref={arenaRef}
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* YES – stationary */}
          <button className="btn-yes" onClick={onAccept}>
            Yes 💖
          </button>

          {/* NO – dodger */}
          {pos && (
            <button
              className={`btn-no${isReturning ? ' returning' : ''}`}
              style={{ left: pos.x, top: pos.y }}
              onMouseEnter={handleDodge}
              onMouseMove={handleDodge}
              onClick={handleClick}
              onTouchStart={handleTouch}
              aria-label="No button – try to click it!"
            >
              No 🙅
            </button>
          )}
        </motion.div>

        {/* dodge counter */}
        {dodgeCount > 0 && (
          <motion.p
            className="dodge-stat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            🏃 "No" has escaped{' '}
            <span>{dodgeCount}</span>{' '}
            time{dodgeCount !== 1 ? 's' : ''}!
          </motion.p>
        )}
      </div>
    </section>
  );
}
