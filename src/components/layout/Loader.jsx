import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monument } from '@/components/shared/Monument';

const DOTS = ['#D71920', '#FBC111', '#0E5B5C'];
const curtain = [0.76, 0, 0.24, 1];

/** True once the intro curtain starts lifting, so page entrance animations play in view instead of behind the loader */
export function useIntroDone() {
  const [done, setDone] = useState(() => !!window.__bbIntroDone);
  useEffect(() => {
    if (done) return;
    const on = () => setDone(true);
    window.addEventListener('bb:intro-done', on);
    return () => window.removeEventListener('bb:intro-done', on);
  }, [done]);
  return done;
}

/** Logo intro on every page load: the mark builds itself, then the white screen lifts like a curtain */
export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const minT = new Promise((r) => setTimeout(r, 2000));
    const loadP = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    const maxT = new Promise((r) => setTimeout(r, 4500));
    let id;
    Promise.race([Promise.all([minT, loadP]), maxT]).then(() => {
      setShow(false);
      document.body.style.overflow = '';
      // let the hero start while the curtain is halfway up
      id = setTimeout(() => { window.__bbIntroDone = true; window.dispatchEvent(new Event('bb:intro-done')); }, 300);
    });
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1500] flex flex-col bg-white"
          exit={{ y: '-100%' }} transition={{ duration: 1.1, ease: curtain }}
          aria-hidden="true"
        >
          <div className="grid flex-1 place-items-center">
            <div className="flex flex-col items-center gap-8">
              <Monument animated className="h-[160px] w-[160px] overflow-visible" />
              <div className="flex gap-3">
                {DOTS.map((c, k) => (
                  <motion.span
                    key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }}
                    initial={{ opacity: 0.2 }} animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.8 + k * 0.25, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* national-colour edge that trails the lifting curtain */}
          <div className="stripe h-1.5 shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
