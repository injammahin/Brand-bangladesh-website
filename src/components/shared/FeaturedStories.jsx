import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { pillarById, regionById } from '@/data/helpers';
import { cn, img, pad } from '@/lib/utils';
import { Monument } from './Monument';

const T = {
  read: { en: 'Read the story', bn: 'গল্পটি পড়ুন' },
  of: { en: 'of', bn: '/' },
};
const ease = [0.22, 0.8, 0.2, 1];

/** Editorial story index: numbered list on the right drives a large cinematic photo on the left */
export function FeaturedStories({ stories }) {
  const { t, num, mins } = useLang();
  const [i, setI] = useState(0);
  const s = stories[i];
  const p = pillarById(s.pillar);
  const r = regionById(s.region);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* large photo */}
      <Link to={`/article/${s.id}`} className="group relative isolate hidden min-h-[640px] overflow-hidden rounded-[5px] text-white shadow-[0_50px_80px_-50px_rgba(21,32,31,.6)] lg:block" aria-label={t(s.title)}>
        <AnimatePresence initial={false}>
          <motion.img
            key={s.id} src={img(s.seed, 1920)} alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
            initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.1 }} animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }} exit={{ opacity: 0.8 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* top: counter */}
        <div className="absolute inset-x-8 top-8 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold text-white transition-colors duration-700" style={{ background: p.c }}>{t(p.name)}</span>
          <span className="font-mag text-lg text-white/80">{num(pad(i + 1))} <span className="text-white/40">{t(T.of)} {num(pad(stories.length))}</span></span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={s.id} className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease }}>
            <span className="flex items-center gap-4 text-[13px] text-white/75">
              <span className="inline-flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-brand-yellow" aria-hidden="true" /> {t(r.name)}</span>
              <span className="inline-flex items-center gap-1.5"><i className="fa-regular fa-clock" aria-hidden="true" /> {mins(s.min)}</span>
            </span>
            <h3 className="max-w-xl font-mag text-[clamp(32px,3.2vw,48px)] font-medium leading-[1.08] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug">{t(s.title)}</h3>
            {s.ex && <p className="max-w-lg text-[15px] text-white/80">{t(s.ex)}</p>}
            <span className="btn-shine mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
              {t(T.read)} <i className="fa-solid fa-arrow-right transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </motion.div>
        </AnimatePresence>
      </Link>

      {/* numbered index */}
      <ol className="relative flex flex-col justify-center">
        <Monument className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 opacity-[.06]" />
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
                  'group relative grid grid-cols-[88px_1fr] items-center gap-4 overflow-hidden rounded-[5px] border-b border-brand-line px-4 py-5 transition-[background-color,box-shadow,transform] duration-500 ease-brand lg:grid-cols-[64px_1fr_auto] lg:gap-5 lg:px-6',
                  on ? 'bg-white shadow-[0_24px_40px_-28px_rgba(21,32,31,.45)] lg:-translate-x-2' : 'hover:bg-white/60'
                )}
              >
                {/* pillar colour bar */}
                <span className="absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-500 ease-brand" style={{ background: xp.c, transform: on ? 'scaleY(1)' : 'scaleY(0)' }} />
                {/* thumbnail on small screens, big numeral on large */}
                <span className="aspect-square overflow-hidden rounded-[5px] lg:hidden"><img src={img(x.seed, 400)} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                <span className={cn('hidden font-mag text-[44px] font-medium leading-none transition-colors duration-500 lg:block', on ? 'text-brand-gold' : 'text-outline text-brand-ink/25')}>{num(pad(k + 1))}</span>
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
