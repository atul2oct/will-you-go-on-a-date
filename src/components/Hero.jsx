import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  const heroRef = useRef(null);

  // Normalised mouse position -0.5 → 0.5
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 80, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 22 });

  // Card tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  // Parallax layers
  const g1x = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const g1y = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  const g2x = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const g2y = useTransform(springY, [-0.5, 0.5], [18, -18]);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  // Device orientation for mobile parallax
  useEffect(() => {
    if (!window.DeviceOrientationEvent) return;
    const handler = (e) => {
      const x = Math.max(-0.5, Math.min(0.5, (e.gamma || 0) / 28));
      const y = Math.max(-0.5, Math.min(0.5, ((e.beta  || 0) - 20) / 28));
      rawX.set(x); rawY.set(y);
    };
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [rawX, rawY]);

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax glow blobs */}
      <div className="hero__bg">
        <motion.div className="glow glow--v hero__glow-1" style={{ x: g1x, y: g1y }} />
        <motion.div className="glow glow--p hero__glow-2" style={{ x: g2x, y: g2y }} />
      </div>

      <div className="hero__content">
        {/* ── LEFT: text ─────────────────────────────── */}
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            A very special invitation
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">you have to</span>
            <span className="hero__title-line">
              <span className="hero__title-grad">go on date</span>
            </span>
            <span className="hero__title-line">with me.</span>
          </h1>

          <p className="hero__sub">
            best date ever coming soon. all you have to do is say yes.&nbsp;🌹
          </p>

          <a href="#playground" className="hero__cta">
            Accept the challenge&nbsp; ↓
          </a>
        </motion.div>

        {/* ── RIGHT: 3D glass card ────────────────────── */}
        <motion.div
          className="hero__card-wrap"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero__card"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            <div className="hero__card-orb hero__card-orb--1" />
            <div className="hero__card-orb hero__card-orb--2" />
            <span className="hero__card-emoji">🥺</span>
            <span className="hero__card-tag">limited time offer</span>
            <h2 className="hero__card-heading">One Perfect Date</h2>
            <p className="hero__card-sub">
              Guaranteed the best time ever. (The "No" button has opinions about this.)
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden>
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
