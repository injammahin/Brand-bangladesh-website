import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { pillarById, regionById } from '@/data/helpers';
import { cn, img, pad } from '@/lib/utils';
import { Monument } from './Monument';
import { Watermark } from './Watermark';

const T = {
  read: { en: 'Read the story', bn: 'গল্পটি পড়ুন' },
  of: { en: 'of', bn: '/' },
  seal: { en: 'BRAND BANGLADESH • FEATURED STORIES • ', bn: 'নির্বাচিত গল্প • ' },
};
const ease = [0.22, 0.8, 0.2, 1];
const DWELL = 6000; // ms each story stays before the next one

/** Rotating circular text seal with the brand mark in the middle */
function Seal({ text }) {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const bn = lang === 'bn'; // Bangla conjuncts break apart with letter-spacing
  return (
    <div className="relative grid h-[124px] w-[124px] place-items-center rounded-full bg-[#FBF8F2] shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]">
      <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} aria-hidden="true">
        <defs><path id="seal-path" d="M60 60 m-41 0 a41 41 0 1 1 82 0 a41 41 0 1 1 -82 0" /></defs>
        <text className="fill-brand-ink" style={bn ? { fontSize: 10, fontWeight: 500, fontFamily: 'var(--f-body)' } : { fontSize: 8.6, fontWeight: 600, letterSpacing: 1.6, fontFamily: 'var(--f-body)' }}>
          <textPath href="#seal-path">{text}</textPath>
        </text>
      </motion.svg>
      <Monument className="h-11 w-11" />
    </div>
  );
}

/** Alpana-style dot grid used as decoration */
function Dots({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <defs><pattern id="fs-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#B8894A" /></pattern></defs>
      <rect width="120" height="120" fill="url(#fs-dots)" />
    </svg>
  );
}

/** Editorial story index: numbered list drives a large cinematic photo, auto-advancing like a story reel */
export function FeaturedStories({ stories }) {
  const { t, num, mins, lang } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = stories[i];
  const p = pillarById(s.pillar);
  const r = regionById(s.region);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setI((v) => (v + 1) % stories.length), DWELL);
    return () => clearTimeout(id);
  }, [i, paused, reduce, stories.length]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* large photo with offset frame, dots and seal */}
      <div className="relative hidden lg:block">
        <Dots className="absolute -bottom-10 -left-10 h-40 w-40 opacity-50" />
        <span className="absolute inset-0 translate-x-5 translate-y-5 rounded-[5px] border border-brand-gold/60" aria-hidden="true" />
        <Link to={`/article/${s.id}`} className="group relative isolate block h-full min-h-[660px] overflow-hidden rounded-[5px] text-white shadow-[0_50px_80px_-50px_rgba(21,32,31,.6)]" aria-label={t(s.title)}>
          <AnimatePresence initial={false}>
            <motion.div key={s.id} className="absolute inset-0 -z-20" initial={{ clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0.85 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
              <motion.img src={img(s.seed, 1920)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" initial={{ scale: 1.15 }} animate={{ scale: 1.02 }} transition={{ duration: DWELL / 1000 + 1.5, ease: 'linear' }} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

          {/* story-reel progress bars */}
          <div className="absolute inset-x-8 top-7 flex gap-1.5" aria-hidden="true">
            {stories.map((x, k) => (
              <span key={x.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                {k < i && <span className="block h-full w-full bg-white" />}
                {k === i && <motion.span key={`${i}-${paused}`} className="block h-full bg-white" initial={{ width: paused ? '100%' : '0%' }} animate={{ width: '100%' }} transition={{ duration: paused || reduce ? 0 : DWELL / 1000, ease: 'linear' }} />}
              </span>
            ))}
          </div>

          <div className="absolute inset-x-8 top-14 flex items-center gap-3">
            <span className="rounded-full px-3 py-1 text-xs font-semibold text-white transition-colors duration-700" style={{ background: p.c }}>{t(p.name)}</span>
            <span className="font-mag text-lg text-white/85">{num(pad(i + 1))} <span className="text-white/45">{t(T.of)} {num(pad(stories.length))}</span></span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={s.id} className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-10" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.7, ease }}>
              <span className="flex items-center gap-4 text-[13px] text-white/75">
                <span className="inline-flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-brand-yellow" aria-hidden="true" /> {t(r.name)}</span>
                <span className="inline-flex items-center gap-1.5"><i className="fa-regular fa-clock" aria-hidden="true" /> {mins(s.min)}</span>
              </span>
              <h3 className="max-w-xl font-mag text-[clamp(32px,3.2vw,50px)] font-medium leading-[1.08] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug">{t(s.title)}</h3>
              {s.ex && <p className="max-w-lg text-[15px] text-white/80">{t(s.ex)}</p>}
              <span className="btn-shine mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
                {t(T.read)} <i className="fa-solid fa-arrow-right transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </motion.div>
          </AnimatePresence>
        </Link>
        <div className="absolute -right-10 -top-10 z-10"><Seal text={t(T.seal).repeat(lang === 'bn' ? 3 : 2)} /></div>
      </div>

      {/* numbered index */}
      <ol className="relative isolate flex flex-col justify-center">
        <Watermark className="-right-4 bottom-0 h-[440px] w-[440px]" opacity={0.13} />
        {stories.map((x, k) => {
          const on = k === i;
          const xp = pillarById(x.pillar);
          const xr = regionById(x.region);
          return (
            <motion.li key={x.id} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.08, duration: 0.8, ease }}>
              <Link
                to={`/article/${x.id}`}
                onMouseEnter={() => setI(k)} onFocus={() => setI(k)}
                className={cn(
                  'group relative grid grid-cols-[88px_1fr] items-center gap-4 overflow-hidden rounded-[5px] border-b border-brand-line px-4 py-5 transition-[background-color,box-shadow,transform] duration-500 ease-brand lg:grid-cols-[64px_auto_1fr_auto] lg:gap-5 lg:px-6',
                  on ? 'bg-white shadow-[0_24px_40px_-28px_rgba(21,32,31,.45)] lg:-translate-x-3' : 'hover:bg-white/60'
                )}
              >
                <span className="absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-500 ease-brand" style={{ background: xp.c, transform: on ? 'scaleY(1)' : 'scaleY(0)' }} />
                {/* time-left line under the active row */}
                {on && !reduce && <motion.span key={`${i}-${paused}`} className="absolute bottom-0 left-0 h-[2px]" style={{ background: xp.c }} initial={{ width: paused ? '100%' : '0%' }} animate={{ width: '100%' }} transition={{ duration: paused ? 0 : DWELL / 1000, ease: 'linear' }} />}

                <span className="aspect-square overflow-hidden rounded-[5px] lg:hidden"><img src={img(x.seed, 400)} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                <span className={cn('hidden font-mag text-[44px] font-medium leading-none transition-colors duration-500 lg:block', on ? 'text-brand-gold' : 'text-outline text-brand-ink/25')}>{num(pad(k + 1))}</span>
                {/* thumbnail slides open on the active row */}
                <span className={cn('hidden overflow-hidden rounded-[5px] transition-all duration-700 ease-brand lg:block', on ? 'h-14 w-14 opacity-100' : 'h-14 w-0 opacity-0')}>
                  <img src={img(x.seed, 400)} alt="" loading="lazy" className="h-14 w-14 max-w-none object-cover" />
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="kicker" style={{ color: xp.c }}>{t(xp.name)}</span>
                  <span className={cn('serif-title text-[clamp(19px,1.6vw,24px)] leading-snug transition-colors duration-300', on ? 'text-brand-ink' : 'text-brand-ink2')}>{t(x.title)}</span>
                  <span className="flex flex-wrap items-center gap-3.5 text-[12.5px] text-brand-muted">
                    <span className="inline-flex items-center gap-1.5"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {t(xr.name)}</span>
                    <span className="inline-flex items-center gap-1.5"><i className="fa-regular fa-clock" aria-hidden="true" /> {mins(x.min)}</span>
                  </span>
                </span>
                <span className={cn('hidden h-11 w-11 place-items-center rounded-full transition-all duration-500 ease-brand lg:grid', on ? 'rotate-0 bg-black text-white' : '-rotate-45 border border-brand-line text-brand-ink')}>
                  <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
