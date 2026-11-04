import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { cn, img, pad } from '@/lib/utils';

const T = {
  ey: { en: 'Destinations', bn: 'গন্তব্য' },
  h: { en: 'Where to next? <em>for every kind of traveller</em>', bn: 'এবার কোথায় যাবেন? <em>সব ধরনের ভ্রমণপ্রেমীর জন্য</em>' },
  dyk: { en: 'Did you know?', bn: 'আপনি কি জানেন?' },
  prev: { en: 'Previous', bn: 'আগের' },
  next: { en: 'Next', bn: 'পরের' },
  all: { en: 'Plan your visit', bn: 'ভ্রমণ পরিকল্পনা' },
};

// TODO: move to the CMS; facts must be checked by the editorial team
const PLACES = [
  { photo: 'sunddeer_0', to: '/regions/khulna', tag: { en: 'Wildlife', bn: 'বন্যপ্রাণী' }, name: { en: 'Sundarban', bn: 'সুন্দরবন' }, region: { en: 'Khulna', bn: 'খুলনা' }, fact: { en: 'Home of the Royal Bengal tiger and the largest mangrove forest on Earth, a UNESCO World Heritage Site.', bn: 'রয়েল বেঙ্গল টাইগারের আবাস, পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন—ইউনেস্কো বিশ্ব ঐতিহ্য।' } },
  { photo: 'cox_2', to: '/regions/chattogram', tag: { en: 'Beaches', bn: 'সৈকত' }, name: { en: "Cox's Bazar", bn: 'কক্সবাজার' }, region: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, fact: { en: 'Roughly 120 km of unbroken natural sand beach, one of the longest in the world.', bn: 'প্রায় ১২০ কিমি অবিচ্ছিন্ন প্রাকৃতিক বালুর সৈকত—বিশ্বের দীর্ঘতমগুলোর একটি।' } },
  { photo: 'ratar_0', to: '/regions/sylhet', tag: { en: 'Nature', bn: 'প্রকৃতি' }, name: { en: 'Ratargul', bn: 'রাতারগুল' }, region: { en: 'Sylhet', bn: 'সিলেট' }, fact: { en: 'A freshwater swamp forest you explore by boat; in the monsoon the trees stand in water up to their crowns.', bn: 'নৌকায় ঘোরার মিঠাপানির জলাবন; বর্ষায় গাছগুলো প্রায় মাথা পর্যন্ত পানিতে ডুবে থাকে।' } },
  { photo: 'paharpur_1', to: '/regions/rajshahi', tag: { en: 'Heritage', bn: 'ঐতিহ্য' }, name: { en: 'Paharpur', bn: 'পাহাড়পুর' }, region: { en: 'Rajshahi', bn: 'রাজশাহী' }, fact: { en: 'Somapura Mahavihara was among the largest Buddhist monasteries south of the Himalayas.', bn: 'সোমপুর মহাবিহার ছিল হিমালয়ের দক্ষিণে বৃহত্তম বৌদ্ধ বিহারগুলোর একটি।' } },
  { photo: 'jaflong_0', to: '/regions/sylhet', tag: { en: 'Tea country', bn: 'চায়ের দেশ' }, name: { en: 'Sreemangal', bn: 'শ্রীমঙ্গল' }, region: { en: 'Sylhet', bn: 'সিলেট' }, fact: { en: 'Known as the tea capital of Bangladesh, famous for its seven-layer tea.', bn: 'বাংলাদেশের চায়ের রাজধানী—সাত রঙের চায়ের জন্য বিখ্যাত।' } },
  { photo: 'bagerhat_1', to: '/regions/khulna', tag: { en: 'Heritage', bn: 'ঐতিহ্য' }, name: { en: 'Bagerhat', bn: 'বাগেরহাট' }, region: { en: 'Khulna', bn: 'খুলনা' }, fact: { en: 'The Sixty Dome Mosque, built in the 15th century, is the centrepiece of a UNESCO-listed mosque city.', bn: 'পনেরো শতকের ষাট গম্বুজ মসজিদ—ইউনেস্কো-তালিকাভুক্ত মসজিদের শহরের কেন্দ্রবিন্দু।' } },
  { photo: 'kaptai_2', to: '/regions/chattogram', tag: { en: 'Lakes & hills', bn: 'হ্রদ ও পাহাড়' }, name: { en: 'Rangamati', bn: 'রাঙামাটি' }, region: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, fact: { en: 'Kaptai Lake is the largest man-made lake in Bangladesh, ringed by the Chittagong Hill Tracts.', bn: 'কাপ্তাই হ্রদ দেশের বৃহত্তম কৃত্রিম হ্রদ, চারপাশে পার্বত্য চট্টগ্রামের পাহাড়।' } },
  { photo: 'stmartin_0', to: '/regions/chattogram', tag: { en: 'Islands', bn: 'দ্বীপ' }, name: { en: "Saint Martin's", bn: 'সেন্ট মার্টিন' }, region: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, fact: { en: 'The only coral island of Bangladesh, in the Bay of Bengal.', bn: 'বঙ্গোপসাগরে বাংলাদেশের একমাত্র প্রবাল দ্বীপ।' } },
  { photo: 'guava_2', to: '/regions/barishal', tag: { en: 'River life', bn: 'নদীর জীবন' }, name: { en: 'Floating markets', bn: 'ভাসমান বাজার' }, region: { en: 'Barishal', bn: 'বরিশাল' }, fact: { en: 'In guava season, farmers trade straight from their boats on the canals around Pirojpur and Jhalokati.', bn: 'পেয়ারার মৌসুমে পিরোজপুর-ঝালকাঠির খালে নৌকা থেকেই চলে বেচাকেনা।' } },
];

const DWELL = 4200; // ms each destination stays centred

/** Centred 3D carousel: active card in front, neighbours fan out; loops endlessly in both directions */
export function Destinations() {
  const { t, num } = useLang();
  const reduce = useReducedMotion();
  const n = PLACES.length;
  const [pos, setPos] = useState(0); // unbounded, so the loop never jumps back
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);
  const active = ((pos % n) + n) % n;

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setPos((p) => p + 1), DWELL);
    return () => clearTimeout(id);
  }, [pos, paused, reduce]);

  const go = (d) => setPos((p) => p + d);
  const onDown = (e) => { drag.current = e.clientX; };
  const onUp = (e) => {
    if (drag.current == null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section className="overflow-hidden bg-brand-paper py-20 lg:py-28" aria-labelledby="dest-h" aria-roledescription="carousel">
      <div className="container mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">{t(T.ey)}</span>
          <h2 id="dest-h" className="display-md max-w-3xl [&_em]:block" dangerouslySetInnerHTML={{ __html: t(T.h) }} />
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mag text-2xl text-brand-ink">{num(pad(active + 1))} <span className="text-brand-muted">/ {num(pad(n))}</span></span>
          <button type="button" className="hdr-btn hdr-dark h-12 w-12" onClick={() => go(-1)} aria-label={t(T.prev)}><i className="fa-solid fa-arrow-left" aria-hidden="true" /></button>
          <button type="button" className="hdr-btn hdr-dark h-12 w-12" onClick={() => go(1)} aria-label={t(T.next)}><i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
        </div>
      </div>

      <div
        className="relative mx-auto h-[clamp(440px,42vw,600px)] touch-pan-y select-none [perspective:1800px]"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); drag.current = null; }}
        onPointerDown={onDown} onPointerUp={onUp}
      >
        {PLACES.map((p, k) => {
          // shortest signed distance from the active card, so cards wrap around the back
          let d = (k - active) % n;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const ad = Math.abs(d);
          const on = d === 0;
          const hidden = ad > 3;
          return (
            <div
              key={p.name.en}
              className="absolute left-1/2 top-0 h-full w-[clamp(260px,27vw,390px)]"
              style={{
                transform: `translateX(-50%) translateX(${d * 62}%) translateZ(${-ad * 140}px) rotateY(${-d * 18}deg)`,
                zIndex: 20 - ad,
                opacity: hidden ? 0 : 1,
                transition: 'transform 1.1s cubic-bezier(.22,.8,.2,1), opacity .8s, filter 1s',
                filter: on ? 'none' : `brightness(${1 - ad * 0.18}) saturate(${1 - ad * 0.15})`,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
              aria-hidden={!on}
            >
              <Link
                to={p.to} draggable={false}
                onClick={(e) => { if (!on) { e.preventDefault(); go(d); } }}
                tabIndex={on ? 0 : -1}
                className={cn('group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[5px] text-white transition-shadow duration-700', on ? 'shadow-[0_50px_80px_-40px_rgba(0,0,0,.65)]' : 'shadow-[0_30px_50px_-35px_rgba(0,0,0,.5)]')}
              >
                <img src={img(p.photo, 960)} alt={t(p.name)} draggable={false} loading="lazy" className={cn('absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[4000ms] ease-out', on ? 'scale-110' : 'scale-100')} />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">{t(p.tag)}</span>
                  <span className="font-mag text-lg text-white/80">{num(pad(k + 1))}</span>
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/75"><i className="fa-solid fa-location-dot text-brand-yellow" aria-hidden="true" /> {t(p.region)}</span>
                  <h3 className="mt-1 font-mag text-[clamp(28px,2.6vw,40px)] font-medium leading-tight [html[lang=bn]_&]:font-normal">{t(p.name)}</h3>
                  <div className={cn('grid transition-[grid-template-rows,opacity] duration-700 ease-brand', on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                    <div className="overflow-hidden">
                      <p className="mt-3 border-t border-white/20 pt-3 text-[13.5px] leading-relaxed text-white/85">
                        <b className="mb-1 block text-[11px] font-semibold uppercase tracking-[.18em] text-brand-yellow [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal">{t(T.dyk)}</b>
                        {t(p.fact)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* time-left bar on the active card */}
                {on && !reduce && <span key={`${pos}-${paused}`} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-yellow" style={{ animation: paused ? 'none' : `bb-grow ${DWELL}ms linear forwards`, transform: paused ? 'scaleX(1)' : undefined }} />}
              </Link>
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-10 flex justify-center gap-2">
        {PLACES.map((p, k) => (
          <button key={p.name.en} type="button" onClick={() => go(((k - active + n + n / 2) % n) - n / 2 | 0)} aria-label={t(p.name)} className={cn('h-1.5 rounded-full transition-all duration-500', k === active ? 'stripe w-10' : 'w-1.5 bg-brand-ink/25 hover:bg-brand-ink/50')} />
        ))}
      </div>
    </section>
  );
}
