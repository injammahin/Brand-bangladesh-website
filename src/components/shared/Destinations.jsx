import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

/** Full-bleed, drag/scroll destination rail with a "Did you know?" fact on each card */
export function Destinations() {
  const { t, num } = useLang();
  const rail = useRef(null);
  const drag = useRef(null);
  const anim = useRef(0);
  const [moved, setMoved] = useState(false);

  // eased glide to a scroll position (native smooth scroll feels abrupt with large jumps)
  const glide = (to, ms = 1100) => {
    const el = rail.current; if (!el) return;
    cancelAnimationFrame(anim.current);
    const from = el.scrollLeft, t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 4);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      el.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };
  const cardW = () => { const c = rail.current?.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 300; };
  const by = (dir) => { const el = rail.current; glide(Math.round((el.scrollLeft + dir * cardW()) / cardW()) * cardW()); };

  // mouse drag with momentum
  const down = (e) => {
    if (e.pointerType !== 'mouse') return;
    cancelAnimationFrame(anim.current);
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0 };
    setMoved(false);
  };
  const move = (e) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) setMoved(true);
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = e.clientX; d.lastT = now;
    rail.current.scrollLeft = d.left - dx;
  };
  const up = () => {
    const d = drag.current; if (!d) return;
    drag.current = null;
    const el = rail.current, w = cardW();
    const target = el.scrollLeft - d.v * 420; // fling distance from release speed
    glide(Math.round(target / w) * w, 900);
  };

  return (
    <section className="overflow-hidden bg-brand-paper py-20 lg:py-28" aria-labelledby="dest-h">
      <div className="container mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">{t(T.ey)}</span>
          <h2 id="dest-h" className="display-md max-w-3xl [&_em]:block" dangerouslySetInnerHTML={{ __html: t(T.h) }} />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="hdr-btn hdr-dark h-12 w-12" onClick={() => by(-1)} aria-label={t(T.prev)}><i className="fa-solid fa-arrow-left" aria-hidden="true" /></button>
          <button type="button" className="hdr-btn hdr-dark h-12 w-12" onClick={() => by(1)} aria-label={t(T.next)}><i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
        </div>
      </div>

      <div
        ref={rail}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        onClickCapture={(e) => moved && (e.preventDefault(), e.stopPropagation())}
        className="hide-scrollbar flex cursor-grab snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 active:cursor-grabbing md:snap-none"
      >
        {PLACES.map((p, k) => (
          <motion.div key={p.name.en} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] 2xl:w-[22vw]" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.1, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}>
            <Link to={p.to} draggable={false} className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[5px] text-white shadow-[0_30px_50px_-30px_rgba(0,0,0,.45)]">
              <img src={img(p.photo, 960)} alt={t(p.name)} draggable={false} loading="lazy" className="absolute inset-0 -z-20 h-full w-full select-none object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform group-hover:scale-[1.06]" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">{t(p.tag)}</span>
                <span className="font-mag text-lg text-white/70">{num(pad(k + 1))}</span>
              </div>
              <div className="p-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/70"><i className="fa-solid fa-location-dot text-brand-yellow" aria-hidden="true" /> {t(p.region)}</span>
                <h3 className="mt-1 font-mag text-[clamp(28px,2.6vw,40px)] font-medium leading-tight [html[lang=bn]_&]:font-normal">{t(p.name)}</h3>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 border-t border-white/20 pt-3 text-[13.5px] leading-relaxed text-white/85">
                      <b className="mb-1 block text-[11px] font-semibold uppercase tracking-[.18em] text-brand-yellow [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal">{t(T.dyk)}</b>
                      {t(p.fact)}
                    </p>
                  </div>
                </div>
              </div>
              <span className={cn('absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full bg-white text-black transition-all duration-500 ease-brand', 'translate-y-3 opacity-0 duration-700 group-hover:translate-y-0 group-hover:opacity-100')}>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
