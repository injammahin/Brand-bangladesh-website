import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export function loadAnalytics() {
  // Load your analytics script here — only ever after consent.
  window.bbAnalytics = true;
}

/** Asks for consent before any tracking. Re-open from the footer ("Cookie settings"). */
export function CookieConsent({ open, setOpen }) {
  const { u } = useLang();

  useEffect(() => {
    let c = null;
    try { c = localStorage.getItem('bb-consent'); } catch (e) { /* ignore */ }
    if (c === 'yes') loadAnalytics();
    else if (!c) { const id = setTimeout(() => setOpen(true), 2600); return () => clearTimeout(id); }
  }, [setOpen]);

  const choose = (v) => {
    try { localStorage.setItem('bb-consent', v); } catch (e) { /* ignore */ }
    setOpen(false);
    if (v === 'yes') loadAnalytics();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region" aria-label="Cookie consent"
          initial={{ y: 160, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 160, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
          className="fixed inset-x-3 bottom-3 z-[400] flex flex-col gap-3.5 rounded-[5px] bg-brand-ink p-5 text-white shadow-2xl md:left-auto md:right-6 md:bottom-6 md:max-w-[440px]"
        >
          <p className="text-sm text-white/80">
            {u('consentText')} <Link to="/legal#privacy" className="text-white underline">{u('privacy')}</Link>
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="light" size="sm" onClick={() => choose('yes')}>{u('accept')}</Button>
            <Button variant="outline-light" size="sm" onClick={() => choose('no')}>{u('decline')}</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
