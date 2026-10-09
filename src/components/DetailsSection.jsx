import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const CARDS = [
  {
    icon: '🌊',
    title: 'Spring Physics',
    desc: 'Every escape uses spring-based cubic-bezier easing with natural overshoot, making the button feel alive and unpredictable.',
  },
  {
    icon: '✨',
    title: 'Glass Design',
    desc: 'Glassmorphism surfaces, ambient glow lighting, and layered depth make every element feel three-dimensional.',
  },
  {
    icon: '🧠',
    title: 'Smart Evasion',
    desc: 'The button reads your cursor position and jumps to the safest spot — always staying at least 180 px away from your reach.',
  },
  {
    icon: '📱',
    title: 'Touch Native',
    desc: 'Fully optimised for mobile. Dodge logic responds to touchstart before any tap registers — the button is uncatchable.',
  },
];

function DCard({ card, index, isInView }) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="dcard"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.11, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="dcard__glow" />
      <span className="dcard__icon">{card.icon}</span>
      <h3 className="dcard__title">{card.title}</h3>
      <p className="dcard__desc">{card.desc}</p>
    </motion.div>
  );
}

export default function DetailsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="details section" ref={ref}>
      <div className="glow glow--v details__glow" />
      <div className="container">
        <div className="details__header">
          <motion.p
            className="label-badge"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Craft
          </motion.p>
          <motion.h2
            className="details__title"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Details that make you go "wow"
          </motion.h2>
        </div>

        <div className="details__grid">
          {CARDS.map((c, i) => (
            <DCard key={i} card={c} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
