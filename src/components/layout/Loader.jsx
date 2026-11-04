import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monument } from '@/components/shared/Monument';

const DOTS = ['#D71920', '#FBC111', '#0E5B5C'];

/** Logo intro on every page load: the mark builds itself stripe by stripe */
export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const minT = new Promise((r) => setTimeout(r, 2000));
    const loadP = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    const maxT = new Promise((r) => setTimeout(r, 4500));
    Promise.race([Promise.all([minT, loadP]), maxT]).then(() => {
      setShow(false);
      document.body.style.overflow = '';
    });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1500] grid place-items-center bg-white"
          exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
          aria-hidden="true"
        >
          <motion.div className="flex flex-col items-center gap-8" exit={{ scale: 1.15, opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
