import { useState, useRef, useCallback, useEffect } from 'react';

const BTN_W = 130;
const BTN_H = 54;
const PAD   = 18;

function randomPos(containerW, containerH, avoidX, avoidY) {
  const maxX = containerW - BTN_W - PAD;
  const maxY = containerH - BTN_H - PAD;
  let x, y, attempts = 0;
  do {
    x = PAD + Math.random() * (maxX - PAD);
    y = PAD + Math.random() * (maxY - PAD);
    attempts++;
  } while (attempts < 12 && Math.hypot(x - avoidX, y - avoidY) < 180);
  return { x, y };
}

function clamp(pos, containerW, containerH) {
  return {
    x: Math.max(PAD, Math.min(pos.x, containerW - BTN_W - PAD)),
    y: Math.max(PAD, Math.min(pos.y, containerH - BTN_H - PAD)),
  };
}

export function useDodge(containerRef) {
  const returnTimer  = useRef(null);
  const [pos, setPos]               = useState(null);
  const [isReturning, setIsReturning] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);

  const getInitialPos = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { x: 50, y: 50 };
    const { width, height } = el.getBoundingClientRect();
    const isMobile = width < 560;
    return isMobile
      ? { x: width  * 0.50 - BTN_W / 2, y: height * 0.68 - BTN_H / 2 }
      : { x: width  * 0.65 - BTN_W / 2, y: height * 0.50 - BTN_H / 2 };
  }, [containerRef]);

  // Set initial pos after mount
  useEffect(() => {
    const t = setTimeout(() => setPos(getInitialPos()), 60);
    return () => clearTimeout(t);
  }, [getInitialPos]);

  const scheduleReturn = useCallback(() => {
    clearTimeout(returnTimer.current);
    returnTimer.current = setTimeout(() => {
      setIsReturning(true);
      setPos(getInitialPos());
      returnTimer.current = setTimeout(() => setIsReturning(false), 1500);
    }, 2600 + Math.random() * 2000);
  }, [getInitialPos]);

  const dodge = useCallback((clientX, clientY) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    setIsReturning(false);
    clearTimeout(returnTimer.current);

    const raw = randomPos(rect.width, rect.height, cx, cy);
    setPos(clamp(raw, rect.width, rect.height));
    setDodgeCount(n => n + 1);
    scheduleReturn();
  }, [containerRef, scheduleReturn]);

  useEffect(() => () => clearTimeout(returnTimer.current), []);

  return { pos, isReturning, dodgeCount, dodge };
}
