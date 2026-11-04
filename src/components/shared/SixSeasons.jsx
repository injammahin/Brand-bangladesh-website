import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { cn, img, pad } from '@/lib/utils';
import { MARK } from './Monument';

const T = {
  ey: { en: 'Shororitu · the six seasons', bn: 'ষড়ঋতু' },
  h: { en: 'One nation, <em>six seasons</em>', bn: 'এক দেশ, <em>ছয় ঋতুর রং</em>' },
  sub: { en: 'Bangladesh is the land of six seasons. Our mark holds all six in its colours, gathered around one long line: Bangladesh.', bn: 'বাংলাদেশ ষড়ঋতুর দেশ। আমাদের প্রতীকের ছয়টি রঙে ধরা আছে ছয় ঋতু—আর মাঝের দীর্ঘ রেখাটি বাংলাদেশ, যাকে ঘিরে ঋতুরা ফিরে ফিরে আসে।' },
  bd: { en: 'BANGLADESH', bn: 'বাংলাদেশ' },
  season: { en: 'Season', bn: 'ঋতু' },
  of: { en: 'of', bn: '/' },
  when: { en: 'When', bn: 'সময়' },
};

// shard geometry follows the brand mark; the long teal bar is Bangladesh
const SEASONS = [
  { id: 'grishma', photo: 'sea_grishma', c: '#D71920', pts: [MARK.red],
    name: { en: 'Grishma', bn: 'গ্রীষ্ম' }, alt: { en: 'Summer', bn: 'গ্রীষ্মকাল' }, mon: { en: 'Boishakh – Joishtho', bn: 'বৈশাখ – জ্যৈষ্ঠ' }, greg: { en: 'mid-April to mid-June', bn: 'মধ্য এপ্রিল – মধ্য জুন' },
    p: { en: 'Long, bright days, kalboishakhi storms and the sweetest months of all, when mangoes, jackfruit and lychees ripen across the country.', bn: 'দীর্ঘ রোদেলা দিন, কালবৈশাখীর ঝড় আর মধুমাস—আম, কাঁঠাল, লিচুর ঘ্রাণে ভরে ওঠে সারা দেশ।' } },
  { id: 'borsha', photo: 'sea_borsha', c: '#A4CB3A', pts: [MARK.green],
    name: { en: 'Borsha', bn: 'বর্ষা' }, alt: { en: 'Monsoon', bn: 'বর্ষাকাল' }, mon: { en: 'Asharh – Srabon', bn: 'আষাঢ় – শ্রাবণ' }, greg: { en: 'mid-June to mid-August', bn: 'মধ্য জুন – মধ্য আগস্ট' },
    p: { en: 'Rivers swell, the swamp forests flood and the whole delta turns a deep, rain-washed green.', bn: 'নদী ফুলে ওঠে, জলাবন ডুবে যায়, আর বৃষ্টিধোয়া ঘন সবুজে সাজে পুরো ব-দ্বীপ।' } },
  { id: 'shorot', photo: 'sea_shorot', c: '#F38020', pts: [MARK.orange],
    name: { en: 'Shorot', bn: 'শরৎ' }, alt: { en: 'Autumn', bn: 'শরৎকাল' }, mon: { en: 'Bhadro – Ashwin', bn: 'ভাদ্র – আশ্বিন' }, greg: { en: 'mid-August to mid-October', bn: 'মধ্য আগস্ট – মধ্য অক্টোবর' },
    p: { en: 'White kash flowers sway along the riverbanks under clear blue skies and drifting cotton clouds.', bn: 'নদীর ধারে দোলে সাদা কাশফুল, নীল আকাশে ভেসে বেড়ায় পেঁজা তুলোর মেঘ।' } },
  { id: 'hemonto', photo: 'sea_hemonto', c: '#FBC111', pts: [MARK.yellow],
    name: { en: 'Hemonto', bn: 'হেমন্ত' }, alt: { en: 'Late autumn', bn: 'হেমন্তকাল' }, mon: { en: 'Kartik – Ogrohayon', bn: 'কার্তিক – অগ্রহায়ণ' }, greg: { en: 'mid-October to mid-December', bn: 'মধ্য অক্টোবর – মধ্য ডিসেম্বর' },
    p: { en: 'Golden paddy fields, the harvest in full swing, and Nobanno, the festival of the new rice.', bn: 'সোনালি ধানের মাঠ, ঘরে ঘরে ফসল তোলার ব্যস্ততা, আর নতুন ধানের উৎসব নবান্ন।' } },
  { id: 'sheet', photo: 'sea_sheet', c: '#141414', pts: [MARK.blackTop, MARK.black],
    name: { en: 'Sheet', bn: 'শীত' }, alt: { en: 'Winter', bn: 'শীতকাল' }, mon: { en: 'Poush – Magh', bn: 'পৌষ – মাঘ' }, greg: { en: 'mid-December to mid-February', bn: 'মধ্য ডিসেম্বর – মধ্য ফেব্রুয়ারি' },
    p: { en: 'Misty mornings over the fields, fresh date-palm juice, and a whole season of pitha.', bn: 'কুয়াশামাখা ভোরের মাঠ, টাটকা খেজুরের রস, আর পিঠাপুলির উৎসবমুখর দিন।' } },
  { id: 'bosonto', photo: 'sea_bosonto', c: '#EE1B5B', pts: [MARK.pink],
    name: { en: 'Bosonto', bn: 'বসন্ত' }, alt: { en: 'Spring', bn: 'বসন্তকাল' }, mon: { en: 'Falgun – Choitro', bn: 'ফাল্গুন – চৈত্র' }, greg: { en: 'mid-February to mid-April', bn: 'মধ্য ফেব্রুয়ারি – মধ্য এপ্রিল' },
    p: { en: 'Shimul and palash set the trees alight, and on Pohela Falgun the streets fill with yellow.', bn: 'শিমুল-পলাশে রাঙা হয় গাছ, আর পহেলা ফাল্গুনে বাসন্তী রঙে সাজে পথঘাট।' } },
];
const DWELL = 3500;
const ease = [0.22, 0.8, 0.2, 1];

export function SixSeasons() {
  const { t, num, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = SEASONS[i];

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = setTimeout(() => setI((v) => (v + 1) % SEASONS.length), DWELL);
    return () => clearTimeout(id);
  }, [i, inView, paused, reduce]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#FBF8F2] py-20 lg:py-28" aria-labelledby="seasons-h">
      <div className="container">
        <motion.div className="mb-14 grid gap-6 border-b border-brand-line pb-8 lg:grid-cols-[1fr_1fr] lg:items-end" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }}>
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{t(T.ey)}</span>
            <h2 id="seasons-h" className="display-md" dangerouslySetInnerHTML={{ __html: t(T.h) }} />
          </div>
          <p className="max-w-xl text-brand-muted lg:justify-self-end">{t(T.sub)}</p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* the brand mark, each shard filled with its season */}
          <div className="relative mx-auto w-full max-w-[640px]">
            <svg viewBox="0 0 120 120" className="w-full overflow-visible" role="group" aria-label={t(T.ey)}>
              <defs>
                {SEASONS.map((x) => <clipPath key={x.id} id={`ss-${x.id}`}>{x.pts.map((p) => <polygon key={p} points={p} />)}</clipPath>)}
              </defs>
              {SEASONS.map((x, k) => {
                const on = k === i;
                return (
                  <motion.g
                    key={x.id}
                    role="button" tabIndex={0} aria-pressed={on} aria-label={`${t(x.name)}, ${t(x.alt)}`}
                    onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setI(k))}
                    className="cursor-pointer outline-none"
                    style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                    initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.15 + k * 0.1, duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <g clipPath={`url(#ss-${x.id})`}>
                      <image href={img(x.photo, 960)} x="0" y="0" width="120" height="120" preserveAspectRatio="xMidYMid slice" />
                      <rect x="0" y="0" width="120" height="120" fill={x.c} style={{ opacity: on ? 0.08 : 0.68, mixBlendMode: 'multiply', transition: 'opacity .7s' }} />
                      <rect x="0" y="0" width="120" height="120" fill={x.c} style={{ opacity: on ? 0 : 0.3, transition: 'opacity .7s' }} />
                    </g>
                    {on && x.pts.map((p) => <polygon key={p} points={p} fill="none" stroke="#fff" strokeWidth=".5" strokeLinejoin="round" />)}
                  </motion.g>
                );
              })}
              {/* the long line: Bangladesh */}
              <motion.g style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }} initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}>
                <clipPath id="ss-bd"><polygon points={MARK.teal} /></clipPath>
                <g clipPath="url(#ss-bd)">
                  <rect x="0" y="0" width="120" height="120" fill="#0E5B5C" />
                  <image href={img('smriti_1', 960)} x="44" y="0" width="54" height="120" preserveAspectRatio="xMidYMid slice" />
                  <rect x="0" y="0" width="120" height="120" fill="#0E5B5C" opacity=".55" />
                </g>
                <text
                  x="70.4" y="74" transform="rotate(-94.8 70.4 74)" textAnchor="middle" dominantBaseline="central" fill="#fff" stroke="rgba(6,46,47,.55)" strokeWidth=".6"
                  style={{ paintOrder: 'stroke', ...(lang === 'bn' ? { fontSize: 4, fontFamily: 'var(--f-body)', fontWeight: 600 } : { fontSize: 3, fontFamily: 'var(--f-body)', fontWeight: 700, letterSpacing: 1.1 }) }}
                >{t(T.bd)}</text>
              </motion.g>
            </svg>
            {/* active season name tag under the mark */}
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <span className="h-2.5 w-2.5 rounded-full transition-colors duration-500" style={{ background: s.c }} />
              <span className="font-semibold text-brand-ink">{t(s.name)}</span>
              <span className="text-brand-muted">· {t(s.alt)}</span>
            </div>
          </div>

          {/* active season */}
          <div className="flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[5px] shadow-[0_40px_70px_-45px_rgba(21,32,31,.6)]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={s.id} src={img(s.photo, 1920)} alt={`${t(s.name)} — ${t(s.alt)}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.1 }} animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }} exit={{ opacity: 0.85 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                />
              </AnimatePresence>
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mag text-sm text-brand-ink backdrop-blur">{t(T.season)} {num(pad(i + 1))} <span className="text-brand-muted">{t(T.of)} {num(pad(SEASONS.length))}</span></span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={s.id} className="grid gap-6 pt-8 sm:grid-cols-[1fr_1.3fr] sm:gap-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>
                <div>
                  <h3 className="font-mag text-[clamp(38px,4vw,58px)] font-medium leading-none [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-tight">{t(s.name)}</h3>
                  <p className="mt-2 font-serif text-lg italic text-brand-gold [html[lang=bn]_&]:not-italic">{lang === 'bn' ? s.alt.bn : `${s.name.bn} · ${s.alt.en}`}</p>
                </div>
                <div className="flex flex-col gap-3 border-brand-line sm:border-l sm:pl-8">
                  <span className="kicker">{t(T.when)}</span>
                  <p className="text-[15px] text-brand-ink"><b className="font-semibold">{t(s.mon)}</b> <span className="text-brand-muted">· {t(s.greg)}</span></p>
                  <p className="text-[15px] leading-relaxed text-brand-ink2">{t(s.p)}</p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
