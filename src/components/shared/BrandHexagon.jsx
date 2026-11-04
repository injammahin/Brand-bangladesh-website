import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { cn, img } from '@/lib/utils';
import { Monument } from './Monument';

const T = {
  ey: { en: 'The nation brand hexagon', bn: 'নেশন ব্র্যান্ড ষড়ভুজ' },
  h: { en: 'Six pillars, <em>one nation brand</em>', bn: 'ছয়টি স্তম্ভ, <em>একটি জাতীয় ব্র্যান্ড</em>' },
  sub: { en: 'Every story we tell sits on one of six pillars. Together they shape how the world sees Bangladesh.', bn: 'আমাদের প্রতিটি গল্পের ভিত এই ছয় স্তম্ভ। এরাই মিলে বিশ্বের সামনে তুলে ধরে বাংলাদেশের পূর্ণাঙ্গ পরিচয়।' },
  cta: { en: 'Explore {p}', bn: '{p} সম্পর্কে জানুন' },
};

// Flat-topped hexagon, centre (200,200), radius 180. Segment k spans vertex k → k+1, starting at the top edge.
const R = 180, C = 200;
const V = Array.from({ length: 7 }, (_, i) => {
  const a = ((-120 + 60 * i) * Math.PI) / 180;
  return [C + R * Math.cos(a), C + R * Math.sin(a)];
});
const mid = (k, f) => {
  const a = ((-90 + 60 * k) * Math.PI) / 180;
  return [C + f * R * Math.cos(a), C + f * R * Math.sin(a)];
};

export function BrandHexagon() {
  const { t } = useLang();
  const pillars = content.pillars;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const p = pillars[active];

  // gently cycle through the pillars until the visitor takes over
  useEffect(() => {
    if (!inView || hold || reduce) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % pillars.length), 3800);
    return () => clearTimeout(id);
  }, [active, hold, inView, reduce, pillars.length]);

  const pick = (k) => { setActive(k); setHold(true); };

  return (
    <section id="pillars" ref={ref} className="relative isolate scroll-mt-20 overflow-hidden bg-brand-cream py-20 lg:py-28" aria-labelledby="hex-h">
      <div className="blob bottom-0 right-[5%] -z-10 h-[360px] w-[360px] bg-brand-goldsoft [animation-delay:-7s]" />

      <div className="container">
        <motion.div className="mb-12 flex flex-col items-center gap-3 text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <span className="eyebrow">{t(T.ey)}</span>
          <h2 id="hex-h" className="display-md" dangerouslySetInnerHTML={{ __html: t(T.h) }} />
          <p className="max-w-xl text-brand-muted">{t(T.sub)}</p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          {/* hexagon */}
          <div className="relative mx-auto w-full max-w-[640px]">
            <motion.svg viewBox="-12 -12 424 424" className="w-full overflow-visible drop-shadow-[0_30px_40px_rgba(21,32,31,.18)]" role="group" aria-label={t(T.ey)}>
              <defs>
                {pillars.map((pl, k) => (
                  <clipPath key={pl.id} id={`hex-seg-${k}`}><polygon points={`${C},${C} ${V[k].join(',')} ${V[k + 1].join(',')}`} /></clipPath>
                ))}
                <linearGradient id="hex-frame" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#D71920" /><stop offset=".2" stopColor="#F38020" /><stop offset=".4" stopColor="#FBC111" />
                  <stop offset=".6" stopColor="#A4CB3A" /><stop offset=".8" stopColor="#0E5B5C" /><stop offset="1" stopColor="#EE1B5B" />
                </linearGradient>
              </defs>

              {pillars.map((pl, k) => {
                const on = k === active;
                return (
                  <motion.g
                    key={pl.id}
                    role="button" tabIndex={0} aria-pressed={on} aria-label={t(pl.name)}
                    onMouseEnter={() => pick(k)} onFocus={() => pick(k)} onClick={() => pick(k)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick(k))}
                    className="group/seg cursor-pointer outline-none"
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ opacity: { delay: 0.2 + k * 0.09, duration: 0.6 }, scale: { delay: 0.2 + k * 0.09, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] } }}
                  >
                    <g clipPath={`url(#hex-seg-${k})`}>
                      {/* the pillar's photo, slowly zooming when active */}
                      <image
                        href={img(pl.seed, 960)} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice"
                        className="transition-transform duration-[1.4s] ease-brand [transform-box:fill-box] [transform-origin:center]"
                        style={{ transform: on ? 'scale(1.12)' : 'scale(1)' }}
                      />
                      <rect x="0" y="0" width="400" height="400" fill={pl.c} className="transition-opacity duration-500" style={{ opacity: on ? 0.28 : 0.82 }} />
                      <rect x="0" y="0" width="400" height="400" fill="url(#hex-frame)" className="opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover/seg:opacity-30" />
                    </g>
                    <polygon points={`${C},${C} ${V[k].join(',')} ${V[k + 1].join(',')}`} fill="none" stroke="#FBF8F2" strokeWidth="2" strokeLinejoin="round" />
                  </motion.g>
                );
              })}

              {/* outer frame in the national colours, drawn on entry */}
              <motion.polygon points={V.slice(0, 6).map((v) => v.join(',')).join(' ')} fill="none" stroke="url(#hex-frame)" strokeWidth="4.5" strokeLinejoin="round" className="pointer-events-none"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }} />

              {/* centre medallion with the brand mark */}
              <motion.g initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 16 }} className="pointer-events-none">
                <circle cx={C} cy={C} r="54" fill="#FFFFFF" stroke="#E8E1D4" strokeWidth="1.5" />
                <g transform={`translate(${C - 35} ${C - 37}) scale(.58)`}><Monument animated={inView} width="120" height="120" /></g>
              </motion.g>
            </motion.svg>
            {/* labels as HTML so long Bangla names never clip */}
            {pillars.map((pl, k) => {
              const [lx, ly] = mid(k, k === 2 || k === 4 ? 0.6 : 0.64);
              return (
                <motion.div
                  key={pl.id}
                  className={cn('pointer-events-none absolute flex w-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center leading-tight text-white transition-transform duration-500 [text-shadow:0_2px_10px_rgba(0,0,0,.55)]', k === active && 'scale-[1.12]')}
                  style={{ left: `${((lx + 12) / 424) * 100}%`, top: `${((ly + 12) / 424) * 100}%` }}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 + k * 0.09 }}
                  aria-hidden="true"
                >
                  <i className={`fa-solid ${pl.icon} text-[clamp(15px,1.5vw,20px)]`} />
                  <span className="text-[clamp(12px,1.15vw,15px)] font-bold [html[lang=bn]_&]:text-[clamp(13px,1.25vw,16px)]">{t(pl.name)}</span>
                </motion.div>
              );
            })}
          </div>

          {/* active pillar panel */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[5px] text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)]" aria-live="polite">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={p.id} src={img(p.seed, 1920)} alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.15, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-1.5 transition-colors duration-700" style={{ background: p.c }} />
            <AnimatePresence mode="wait">
              <motion.div key={p.id} className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 lg:p-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}>
                <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: p.c }}><i className={`fa-solid ${p.icon}`} aria-hidden="true" /> {t(p.aud)}</span>
                <h3 className="font-mag text-[clamp(34px,4vw,56px)] font-medium leading-[1.05] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug">{t(p.name)}</h3>
                <p className="max-w-lg text-[15px] text-white/80">{t(p.intro)}</p>
                <div className="flex flex-wrap gap-2">
                  {p.subs.map((s) => <span key={s.en} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">{t(s)}</span>)}
                </div>
                <Link to={`/pillars/${p.id}`} className="btn-shine mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
                  {t(T.cta).replace('{p}', t(p.name))} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
            {/* progress pips */}
            <div className="absolute right-6 top-6 flex gap-1.5">
              {pillars.map((pl, k) => (
                <button key={pl.id} type="button" onClick={() => pick(k)} aria-label={t(pl.name)} className={cn('h-1.5 rounded-full transition-all duration-500', k === active ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70')} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
