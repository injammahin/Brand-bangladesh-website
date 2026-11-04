import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UI } from '@/data/ui';

const LanguageContext = createContext(null);
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  bn: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
};

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'bn') return q;
    const s = localStorage.getItem('bb-lang');
    if (s === 'en' || s === 'bn') return s;
  } catch (e) { /* storage blocked */ }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('bb-lang', lang); } catch (e) { /* ignore */ }
  }, [lang]);

  const setLang = useCallback((l) => setLangState(l === 'bn' ? 'bn' : 'en'), []);

  const value = useMemo(() => {
    /** pick the right language from a { en, bn } object (or return a plain string) */
    const t = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.en) : o ?? '');
    /** UI dictionary lookup: u('nav.story') */
    const u = (key) => {
      const v = key.split('.').reduce((acc, k) => acc?.[k], UI);
      return v ? t(v) : key;
    };
    const num = (v) => (lang === 'bn' ? String(v).replace(/\d/g, (d) => BN_DIGITS[d]) : String(v));
    const fmt = (n, dec = 0) => num(Number(n).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }));
    const mins = (m) => (lang === 'bn' ? `${num(m)} মিনিট পড়া` : `${m} min read`);
    const monthYear = (m, y) => `${MONTHS[lang][m - 1]} ${num(y)}`;
    const monthName = (m) => MONTHS[lang][m - 1];
    return { lang, setLang, t, u, num, fmt, mins, monthYear, monthName };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
