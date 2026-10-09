import { motion } from 'framer-motion';

const EMOJIS = ['🌹', '🥂', '✨', '💖', '💃', '🥂', '✨', '🌹', '🎉', '💍'];

export default function YesScreen() {
  return (
    <motion.div
      className="yes-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background floating celebratory particles */}
      <div className="yes-overlay__ptcl" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="yes-ptcl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${(i * 0.25).toFixed(2)}s`,
              animationDuration: `${3.5 + Math.random() * 2.5}s`,
              fontSize: `${1.2 + Math.random() * 1.5}rem`,
            }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </span>
        ))}
      </div>

      <motion.div
        className="yes-card"
        initial={{ scale: 0.75, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 120,
          delay: 0.1,
        }}
      >
        <span className="yes-card__heart">💖</span>
        <h1 className="yes-card__title">It's Official! 🎉</h1>
        <p className="yes-card__sub">
          I knew you couldn't resist! 😍<br />
          Get ready for the best date ever. See you soon! 🌹
        </p>

        <div className="yes-card__emojis">
          {['🥂', '✨', '🌹', '💃', '✨', '🥂'].map((emoji, index) => (
            <motion.span
              key={index}
              className="confetti-emoji"
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
