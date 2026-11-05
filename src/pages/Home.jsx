import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img, pad } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { LinkArrow } from '@/components/shared/LinkArrow';
import { StatNumber, SourceLine } from '@/components/shared/Stat';
import { FeaturedStories } from '@/components/shared/FeaturedStories';
import { IssueCover } from '@/components/shared/IssueCover';
import { BdMap, RegionPanel } from '@/components/shared/BdMap';
import { NewsletterForm } from '@/components/shared/NewsletterForm';
import { Monument } from '@/components/shared/Monument';
import { Watermark } from '@/components/shared/Watermark';
import { useIntroDone } from '@/components/layout/Loader';
import { BrandHexagon } from '@/components/shared/BrandHexagon';
import { Destinations } from '@/components/shared/Destinations';
import { SixSeasons } from '@/components/shared/SixSeasons';

const T = {
  title: { en: 'Brand Bangladesh — The story of a nation', bn: 'ব্র্যান্ড বাংলাদেশ — একটি জাতির গল্প' },
  eyebrow: { en: 'This is Bangladesh', bn: 'এটাই বাংলাদেশ' },
  h1: { en: 'A land of rivers,<br /><em>a nation of promise.</em>', bn: 'নদীমাতৃক দেশ,<br /><em>অফুরান সম্ভাবনার দেশ।</em>' },
  lead: { en: 'Young, creative and resilient, Bangladesh is telling its own story. Discover who the country is, what it offers and where it is heading.', bn: 'তরুণ, সৃজনশীল আর অদম্য—বাংলাদেশ এখন নিজের গল্প নিজেই বলছে। চিনে নিন এই দেশকে: তার পরিচয়, তার সম্ভাবনা আর সামনে এগিয়ে চলার পথ।' },
  discover: { en: 'Discover the story', bn: 'বাংলাদেশের গল্প জানুন' },
  explorePillars: { en: 'Explore the pillars', bn: 'ছয় স্তম্ভ ঘুরে দেখুন' },
  pause: { en: 'Pause slideshow', bn: 'স্লাইডশো থামান' },
  play: { en: 'Play slideshow', bn: 'স্লাইডশো চালান' },
  glance: { en: 'Bangladesh at a glance', bn: 'এক নজরে বাংলাদেশ' },
  allNumbers: { en: 'All numbers', bn: 'সব পরিসংখ্যান' },
  pillarsEy: { en: 'Six brand pillars', bn: 'ছয়টি ব্র্যান্ড স্তম্ভ' },
  pillarsH: { en: 'Whatever brings you, <em>Bangladesh welcomes you</em>', bn: 'যে পথেই আসুন, <em>বাংলাদেশ স্বাগত জানায়</em>' },
  allPillars: { en: 'All pillars', bn: 'সব স্তম্ভ' },
  storiesEy: { en: 'Featured stories', bn: 'নির্বাচিত গল্প' },
  storiesH: { en: 'Stories that <em>show who we are</em>', bn: 'যে গল্পগুলো <em>বাংলাদেশকে চেনায়</em>' },
  storiesLink: { en: 'Stories behind the numbers', bn: 'সংখ্যার পেছনের গল্প' },
  latest: { en: 'Latest magazine issue', bn: 'সর্বশেষ সংখ্যা' },
  allIssues: { en: 'All issues', bn: 'সব সংখ্যা' },
  regionsEy: { en: 'Eight divisions', bn: 'আটটি বিভাগ' },
  regionsH: { en: 'Explore the country, <em>region by region</em>', bn: 'ঘুরে দেখুন বাংলাদেশ, <em>অঞ্চলে অঞ্চলে</em>' },
  regionsSub: { en: 'Pick a division to see its landscape, heritage, economy and people.', bn: 'যেকোনো বিভাগে ক্লিক করুন—জানুন সেখানকার প্রকৃতি, ঐতিহ্য, অর্থনীতি আর মানুষের কথা।' },
  community: { en: 'Community', bn: 'কমিউনিটি' },
  shareH: { en: 'Tell us your Bangladesh story', bn: 'আপনার বাংলাদেশের গল্প বলুন' },
  shareP: { en: 'At home or abroad, send us your story and photos. Our team reviews every submission before it appears on the story wall.', bn: 'দেশে থাকুন বা প্রবাসে—আপনার গল্প আর ছবি পাঠিয়ে দিন। আমাদের দল প্রতিটি লেখা যাচাই করে তবেই গল্পের দেয়ালে প্রকাশ করে।' },
  shareBtn: { en: 'Share a story', bn: 'গল্প পাঠান' },
  nlH: { en: 'The new issue, in your inbox every month', bn: 'প্রতি মাসে নতুন সংখ্যা, আপনার ইনবক্সে' },
  nlP: { en: 'The best stories, fresh numbers and each magazine release, in one email a month.', bn: 'বাছাই করা গল্প, নতুন পরিসংখ্যান আর ম্যাগাজিনের নতুন সংখ্যার খবর—মাসে মাত্র একটি ইমেইলে।' },
  scroll: { en: 'Scroll', bn: 'স্ক্রল করুন' },
};

function Hero() {
  const { t, num } = useLang();
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const slides = content.heroSlides;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(!!reduce);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % slides.length), 3000);
    return () => clearTimeout(id);
  }, [i, paused, slides.length]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 170, damping: 26 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 170, damping: 26 });
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lines = t(T.h1).split('<br />');
  const ease = [0.22, 0.8, 0.2, 1];

  return (
    <section
      ref={ref}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      className="grain on-dark relative isolate flex min-h-[calc(100svh-var(--header-h)-3px)] items-end overflow-hidden bg-black text-white"
      aria-label={t(T.eyebrow)}
    >
      <motion.div className="absolute -inset-8 -z-20" style={{ x: px, y: py }} initial={{ scale: 1.15 }} animate={ready ? { scale: 1 } : undefined} transition={{ duration: 2.2, ease: [0.22, 0.8, 0.2, 1] }}>
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0.6 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
            <img src={img(slides[i].seed, 1920)} srcSet={slides[i].seed === 'bichana' ? '/photos/bichana-960.webp 960w, /photos/bichana-1920.webp 1920w, /photos/bichana-2880.webp 2880w' : undefined} sizes="100vw" alt="" width="1920" height="1280" fetchpriority={i === 0 ? 'high' : 'auto'} style={{ objectPosition: slides[i].pos || 'center' }} className={cn('h-full w-full object-cover', !paused && 'kenburns')} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.18)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,.55)_100%)]" />
      <div className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-[linear-gradient(90deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.22)_45%,rgba(0,0,0,0)_85%)]" />

      {/* slide counter, right edge */}
      <div className="absolute right-6 top-1/2 z-[2] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex" aria-hidden="true">
        <span className="font-mag text-5xl font-medium leading-none">
          <AnimatePresence mode="popLayout"><motion.span key={i} className="block" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.6, ease }}>{num(pad(i + 1))}</motion.span></AnimatePresence>
        </span>
        <span className="h-16 w-px bg-white/30" />
        <span className="text-sm text-white/60">{num(pad(slides.length))}</span>
      </div>

      <motion.div className="container relative z-[2] pb-8 pt-28 lg:pb-12" style={{ y: contentY, opacity: contentO }}>
        <motion.span className="eyebrow text-brand-goldsoft" initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : undefined} transition={{ delay: 0.15, duration: 0.8, ease }}>{t(T.eyebrow)}</motion.span>
        <h1 className="display mb-8 mt-5 max-w-5xl text-[clamp(40px,6.6vw,90px)] [text-shadow:0_4px_30px_rgba(0,0,0,.45)]">
          {lines.map((l, k) => (
            <span key={k} className="line-mask">
              <motion.span className="block" initial={{ y: '110%', rotate: 2 }} animate={ready ? { y: '0%', rotate: 0 } : undefined} transition={{ delay: 0.25 + k * 0.14, duration: 1.1, ease }} dangerouslySetInnerHTML={{ __html: l }} />
            </span>
          ))}
        </h1>
        {/* intro paragraph hidden for now; restore by removing the false && */}
        {false && (<motion.p className="lead mb-8 max-w-2xl text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,.6)]" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.65, duration: 0.9, ease }}>{t(T.lead)}</motion.p>)}
        <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.8, duration: 0.9, ease }}>
          <Button asChild variant="light" size="lg" className="btn-shine"><Link to="/story">{t(T.discover)} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link></Button>
          <Button asChild variant="outline-light" size="lg"><a href="#pillars">{t(T.explorePillars)}</a></Button>
        </motion.div>

        <motion.div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-5" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 1, duration: 1 }}>
          <AnimatePresence mode="wait">
            <motion.span key={i} className="inline-flex items-center gap-2.5 text-[13.5px] text-white/85" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 backdrop-blur"><i className="fa-solid fa-location-dot text-[11px] text-brand-yellow" aria-hidden="true" /></span>
              {t(slides[i].place)}
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 sm:gap-2">
              {slides.map((s, k) => (
                <button key={s.seed} type="button" aria-label={t(s.place)} aria-current={k === i} onClick={() => setI(k)} className={cn('group relative h-9 sm:h-12 overflow-hidden rounded-[5px] transition-all duration-500 ease-brand', k === i ? 'w-16 ring-1 ring-white/70 sm:w-24' : 'w-7 opacity-60 hover:opacity-100 sm:w-12')}>
                  <img src={img(s.seed, 400)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className={cn('hero-dot absolute inset-x-0 bottom-0 h-[3px] bg-white/20', paused && 'paused')} aria-current={k === i} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? t(T.play) : t(T.pause)} className="hdr-btn">
              <i className={`fa-solid ${paused ? 'fa-play' : 'fa-pause'} text-xs`} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Glance() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden border-b border-brand-line bg-brand-paper" aria-labelledby="glance-h">
      <h2 id="glance-h" className="sr-only">{t(T.glance)}</h2>
      <div className="container grid grid-cols-2 lg:grid-cols-4">
        {content.stats.slice(0, 4).map((s, k) => (
          <Reveal key={s.id} delay={k * 110} className={cn('group relative flex flex-col gap-2 border-brand-line px-3.5 py-9 lg:px-7 lg:py-12', k % 2 === 0 && 'border-r', k < 2 && 'border-b lg:border-b-0', k < 3 && 'lg:border-r')}>
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 stripe transition-transform duration-700 ease-brand group-hover:scale-x-100" />
            <StatNumber stat={s} />
            <p className="text-sm leading-snug text-brand-ink2">{t(s.label)}</p>
            <SourceLine stat={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LatestIssue() {
  const { t, u, num, mins } = useLang();
  const issue = content.issues[0];
  return (
    <section className="sec relative isolate overflow-hidden">
      <Watermark className="-bottom-16 right-[4%] h-[560px] w-[560px]" opacity={0.1} />
      <div className="container grid items-center gap-10 lg:grid-cols-[420px_1fr] lg:gap-20">
        <Reveal>
          <Link to={`/publication/${issue.id}`} className="group mx-auto block w-full max-w-[420px] [perspective:1400px]" aria-label={t(issue.title)}>
            <IssueCover issue={issue} className="tilt" />
          </Link>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-5">
          <span className="eyebrow">{t(T.latest)} · {num(pad(issue.no))}</span>
          <h2 className="display-md">{t(issue.title)}</h2>
          <p className="lead">{t(issue.note)}</p>
          <ol className="border-t border-brand-ink">
            {issue.articles.map((a, k) => (
              <li key={k}>
                <Link to={`/publication/${issue.id}/${k}`} className="group grid grid-cols-[52px_1fr] items-baseline gap-3 border-b border-brand-line py-3.5">
                  <b className="font-mag text-2xl font-medium text-brand-gold">{num(pad(a.p))}</b>
                  <span>
                    <strong className="serif-title block text-xl leading-tight transition-colors group-hover:text-brand-deep">{t(a.t)}</strong>
                    <small className="text-[12.5px] text-brand-muted">{t(a.k)} · {mins(a.min)}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link to={`/publication/${issue.id}#flipbook`}><i className="fa-solid fa-book-open-reader" aria-hidden="true" /> {u('readIssue')}</Link></Button>
            <Button variant="outline" onClick={() => toast(`${t(issue.title)}.pdf ${u('downloading')}`)}><i className="fa-solid fa-file-arrow-down" aria-hidden="true" /> {u('pdf')}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  const [region, setRegion] = useState('dhaka');
  useDocumentTitle(t(T.title));

  return (
    <>
      <Hero />
      <Glance />

      <BrandHexagon />

      <Destinations />

      <SixSeasons />

      <section className="sec nakshi relative isolate overflow-hidden bg-brand-cream">
        <div className="container">
          <SectionHead eyebrow={t(T.storiesEy)} title={t(T.storiesH)} action={<LinkArrow to="/numbers">{t(T.storiesLink)}</LinkArrow>} />
          <FeaturedStories stories={content.stories.slice(0, 5)} />
        </div>
      </section>

      <LatestIssue />

      <section className="sec bg-brand-paper">
        <div className="container">
          <SectionHead center eyebrow={t(T.regionsEy)} title={t(T.regionsH)} sub={t(T.regionsSub)} />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <Reveal><BdMap active={region} onSelect={setRegion} /></Reveal>
            <Reveal delay={120}><RegionPanel id={region} /></Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="container grid gap-4 lg:grid-cols-2">
          <Reveal className="relative isolate flex flex-col gap-3.5 overflow-hidden rounded-[5px] bg-brand-deep p-8 text-white lg:p-12">
            <div className="absolute -right-36 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(76,157,142,.6),transparent_65%)]" />
            <Monument className="absolute bottom-5 right-6 -z-10 h-28 w-28 opacity-15" />
            <span className="eyebrow text-brand-goldsoft">{t(T.community)}</span>
            <h3 className="display-sm text-white">{t(T.shareH)}</h3>
            <p className="text-white/80">{t(T.shareP)}</p>
            <div className="mt-2"><Button asChild variant="light"><Link to="/community#submit">{t(T.shareBtn)} <i className="fa-solid fa-feather" aria-hidden="true" /></Link></Button></div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3.5 rounded-[5px] bg-brand-paper p-8 lg:p-12">
            <span className="eyebrow">{t({ en: 'Newsletter', bn: 'নিউজলেটার' })}</span>
            <h3 className="display-sm">{t(T.nlH)}</h3>
            <p className="text-brand-ink2">{t(T.nlP)}</p>
            <NewsletterForm inline buttonVariant="default" className="mt-2" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
