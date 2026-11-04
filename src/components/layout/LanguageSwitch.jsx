import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageSwitch({ dark = false, id = dark ? 'dark' : 'light' }) {
  const { lang, setLang, u } = useLang();
  return (
    <div role="group" aria-label={u('langLabel')} className={cn('relative inline-flex rounded-full border p-[3px]', dark ? 'border-white/15 bg-white/[.06]' : 'border-brand-line bg-brand-cream')}>
      {['en', 'bn'].map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={cn(
            'relative z-[1] min-w-[42px] rounded-full px-2 py-1 text-xs font-semibold transition-colors',
            lang === l ? (dark ? 'text-black' : 'text-white') : dark && 'text-white/70 hover:text-white',
            l === 'bn' && 'font-[Hind_Siliguri] text-[13px]'
          )}
        >
          {lang === l && (
            <motion.span layoutId={`lang-pill-${id}`} className={cn('absolute inset-0 -z-[1] rounded-full', dark ? 'bg-white' : 'bg-brand-deep')} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          {l === 'en' ? 'EN' : 'বাং'}
        </button>
      ))}
    </div>
  );
}
