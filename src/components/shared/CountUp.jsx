import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

/** Counts a number up when it scrolls into view (Bangla numerals in BN) */
export function CountUp({ value, decimals = 0, duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const { fmt } = useLang();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(value); return; }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return <span ref={ref}>{fmt(v, decimals)}</span>;
}
