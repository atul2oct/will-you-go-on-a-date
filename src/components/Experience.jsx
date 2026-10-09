import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WORDS = [
  { text: 'Great',        accent: false },
  { text: 'connections',  accent: false },
  { text: "aren't",       accent: false },
  { text: 'forced.',      accent: false },
  { text: 'They',         accent: false },
  { text: 'just',         accent: false },
  { text: 'happen.',      accent: true  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-90px' });

  return (
    <section className="experience section">
      <div className="experience__glow" />
      <div className="container">
        <motion.p
          className="experience__label"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          The philosophy
        </motion.p>

        <p ref={ref} className="experience__body">
          {WORDS.map((w, i) => (
            <motion.span
              key={i}
              className={`experience__word${w.accent ? ' experience__accent' : ''}`}
              initial={{ opacity: 0, y: 52, filter: 'blur(4px)' }}
              animate={isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : {}}
              transition={{
                duration: 0.75,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {w.text}{' '}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
