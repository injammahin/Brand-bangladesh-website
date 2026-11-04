import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Inertia smooth scrolling. Pauses while a dialog locks the page. */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.14, smoothWheel: true, prevent: (node) => !!node.closest?.('[role="dialog"]') });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const sync = () => (document.body.hasAttribute('data-scroll-locked') || document.body.style.overflow === 'hidden' ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-locked', 'style'] });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); lenis.destroy(); window.__lenis = null; };
  }, [reduce]);
  return null;
}

/** Back-to-top button with a scroll-progress ring */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [show, setShow] = useState(false);
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.12)), [scrollYProgress]);
  const top = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button" onClick={top} aria-label="Back to top"
          className="fixed bottom-5 right-5 z-[90] grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,.6)] transition-transform hover:-translate-y-1"
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#FBC111" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p }} />
          </svg>
          <i className="fa-solid fa-arrow-up text-sm" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
