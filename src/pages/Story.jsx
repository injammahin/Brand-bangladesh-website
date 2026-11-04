import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Reveal, RevealImage } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { LinkArrow } from '@/components/shared/LinkArrow';
import { Watermark } from '@/components/shared/Watermark';

const T = {
  title: { en: 'The Brand Story', bn: 'ব্র্যান্ডের গল্প' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  h1: { en: 'A nation <em>born of rivers</em>', bn: 'নদীর বুকে <em>জন্ম নেওয়া এক জাতি</em>' },
  lead: { en: 'For a thousand years, people on this delta of silt and water have built, lost and built again. This is that story, and it is still being written.', bn: 'পলিমাটির এই ব-দ্বীপে হাজার বছর ধরে মানুষ গড়েছে, হারিয়েছে, আবার গড়েছে। এ সেই গল্প, যার নতুন অধ্যায় লেখা হচ্ছে আজও।' },
  inStory: { en: 'In this story', bn: 'এই গল্পে' },
  chapter: { en: 'Chapter', bn: 'অধ্যায়' },
  facts: { en: 'Key facts', bn: 'মূল তথ্য' },
  quote: { en: 'We fought for our language and we fought for our freedom. Now we work to become the best version of ourselves.', bn: 'ভাষার জন্য লড়েছি, স্বাধীনতার জন্য লড়েছি। আজ আমাদের সংগ্রাম নিজেদের শ্রেষ্ঠ রূপে গড়ে তোলার।' },
  quoteBy: { en: '— The Bangladesh story', bn: '— বাংলাদেশের গল্প' },
  quoteImg: { en: 'Shaheed Minar, Dhaka', bn: 'শহীদ মিনার, ঢাকা' },
  tlEy: { en: 'Key moments', bn: 'গুরুত্বপূর্ণ মুহূর্ত' },
  tlH: { en: "A nation's <em>timeline</em>", bn: 'একটি জাতির <em>সময়রেখা</em>' },
  visionEy: { en: 'The vision', bn: 'ভবিষ্যতের স্বপ্ন' },
  visionH: { en: 'The road ahead, <em>together</em>', bn: 'সামনের পথ, <em>একসঙ্গে</em>' },
  visionP: { en: 'A confident, connected and creative Bangladesh that speaks to the world as an equal.', bn: 'আত্মবিশ্বাসী, সংযুক্ত ও উদ্ভাবনী এক বাংলাদেশ—যে বিশ্বের সঙ্গে কথা বলে সমানে সমান।' },
  film: { en: 'The Brand Film', bn: 'ব্র্যান্ড ফিল্ম' },
  filmMeta: { en: '2:30 · with Bangla and English captions', bn: '২:৩০ মিনিট · বাংলা ও ইংরেজি সাবটাইটেলসহ' },
  filmToast: { en: 'The brand film plays here (add the video file)', bn: 'ব্র্যান্ড ফিল্ম এখানে চলবে (ভিডিও যুক্ত করুন)' },
  valuesEy: { en: 'Values and promise', bn: 'মূল্যবোধ ও প্রতিশ্রুতি' },
  valuesH: { en: 'What we <em>stand for</em>', bn: 'আমরা যা <em>বিশ্বাস করি</em>' },
  promise: { en: '<strong>Our promise:</strong> to tell the story of Bangladesh honestly, beautifully and with confidence, so every visitor leaves with a more accurate and positive picture.', bn: '<strong>আমাদের প্রতিশ্রুতি:</strong> বাংলাদেশের গল্প সততা, সৌন্দর্য আর আত্মবিশ্বাসের সঙ্গে বলা—যাতে প্রত্যেক পাঠক ও দর্শক এ দেশ সম্পর্কে আরও সঠিক ও ইতিবাচক ধারণা নিয়ে ফেরেন।' },
  kitEy: { en: 'For partners', bn: 'সহযোগীদের জন্য' },
  kitH: { en: 'Brand guidelines and logo kit', bn: 'ব্র্যান্ড নির্দেশিকা ও লোগো কিট' },
  kitP: { en: 'Logo files, colours, typography and usage rules: everything you need to use the identity correctly.', bn: 'লোগো, রং, টাইপোগ্রাফি আর ব্যবহারের নিয়ম—ব্র্যান্ডের পরিচয় সঠিকভাবে তুলে ধরতে যা যা প্রয়োজন, সব এক জায়গায়।' },
  guide: { en: 'Guidelines (PDF)', bn: 'নির্দেশিকা (পিডিএফ)' },
  logoKit: { en: 'Logo kit', bn: 'লোগো কিট' },
  seeNumbers: { en: 'See it in numbers', bn: 'সংখ্যায় দেখুন' },
  scroll: { en: 'Begin the story', bn: 'গল্প শুরু করুন' },
};

// TODO: facts to be confirmed by the editorial team before launch
const CHAPTERS = [
  {
    id: 'land', seed: 'bb-ch-land', no: { en: '01', bn: '০১' }, c: '#0E5B5C',
    ey: { en: 'The land and the delta', bn: 'ভূমি ও ব-দ্বীপ' },
    h: { en: 'Where three great rivers <em>meet the sea</em>', bn: 'যেখানে তিন মহানদী <em>মিশেছে সাগরে</em>' },
    alt: { en: 'River char farmland seen from above', bn: 'ওপর থেকে দেখা নদীর চর আর কৃষিজমি' },
    p: [
      { en: 'The Padma, the Meghna and the Jamuna carry silt down from the Himalayas to build one of the largest deltas on Earth. Here, rivers are not just geography. They are roads, livelihoods, songs and identity.', bn: 'পদ্মা, মেঘনা আর যমুনা হিমালয় থেকে পলি বয়ে এনে গড়েছে বিশ্বের অন্যতম বৃহৎ ব-দ্বীপ। এখানে নদী কেবল মানচিত্রের রেখা নয়—নদীই পথ, নদীই জীবিকা, নদীই গান আর আমাদের পরিচয়।' },
      { en: 'From the northern plains to the southern mangroves, from the eastern hills to the longest natural sea beach, this compact country holds a remarkable range of landscapes.', bn: 'উত্তরের সমতল থেকে দক্ষিণের ম্যানগ্রোভ, পূর্বের পাহাড় থেকে বিশ্বের দীর্ঘতম প্রাকৃতিক সৈকত—ছোট্ট এই দেশের বুকে প্রকৃতি সাজিয়েছে বিস্ময়কর বৈচিত্র্য।' },
    ],
    facts: [
      { en: 'Padma · Meghna · Jamuna, the three great rivers', bn: 'পদ্মা · মেঘনা · যমুনা—তিন মহানদী' },
      { en: 'Home to the Sundarban, the largest mangrove forest', bn: 'বৃহত্তম ম্যানগ্রোভ বন সুন্দরবনের ঠিকানা' },
    ],
  },
  {
    id: 'history', seed: 'bb-ch-history', no: { en: '02', bn: '০২' }, c: '#D71920',
    ey: { en: 'History and the Liberation War', bn: 'ইতিহাস ও মুক্তিযুদ্ধ' },
    h: { en: 'From a language <em>to a nation</em>', bn: 'ভাষা থেকে <em>স্বাধীনতা</em>' },
    alt: { en: "National Martyrs' Memorial, Savar", bn: 'জাতীয় স্মৃতিসৌধ, সাভার' },
    p: [
      { en: "In 1952, a movement to defend the Bangla language awakened a people's sense of who they were. In 1971, through the Liberation War, the independent nation of Bangladesh was born.", bn: '১৯৫২ সালে মাতৃভাষার মর্যাদার দাবিতে শুরু হওয়া আন্দোলন একটি জাতির আত্মপরিচয় জাগিয়ে তুলেছিল। ১৯৭১ সালের মুক্তিযুদ্ধের মধ্য দিয়ে জন্ম নেয় স্বাধীন বাংলাদেশ।' },
      { en: "Today, 21 February is marked around the world as International Mother Language Day, a small country's gift to everyone.", bn: 'আজ ২১ ফেব্রুয়ারি সারা বিশ্বে পালিত হয় আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে—বিশ্বকে দেওয়া ছোট্ট এক দেশের অমূল্য উপহার।' },
    ],
    facts: [
      { en: '16 December 1971, Victory Day', bn: '১৬ ডিসেম্বর ১৯৭১—বিজয় দিবস' },
      { en: '21 February, International Mother Language Day', bn: '২১ ফেব্রুয়ারি—আন্তর্জাতিক মাতৃভাষা দিবস' },
    ],
  },
  {
    id: 'people', seed: 'bb-ch-people', no: { en: '03', bn: '০৩' }, c: '#F38020',
    ey: { en: 'The resilience of its people', bn: 'মানুষের অদম্য প্রাণশক্তি' },
    h: { en: 'Standing up <em>after every storm</em>', bn: 'প্রতিটি ঝড়ের পর <em>আবার উঠে দাঁড়ানো</em>' },
    alt: { en: 'Fishers hauling a net together on the river', bn: 'নদীতে একসঙ্গে জাল টানছেন জেলেরা' },
    p: [
      { en: 'Cyclones, floods and river erosion have taught Bangladeshis to live with nature. Shelters, early warnings and strong communities have made the country an example to the world in disaster preparedness.', bn: 'ঘূর্ণিঝড়, বন্যা আর নদীভাঙন—বাংলাদেশের মানুষ প্রকৃতির সঙ্গে বাঁচতে শিখেছে। আশ্রয়কেন্দ্র, আগাম সতর্কবার্তা আর মানুষের সম্মিলিত শক্তিতে দুর্যোগ মোকাবিলায় বাংলাদেশ আজ বিশ্বের কাছে দৃষ্টান্ত।' },
    ],
    facts: [
      { en: 'Community cyclone preparedness since 1972', bn: '১৯৭২ সাল থেকে ঘূর্ণিঝড় প্রস্তুতি কর্মসূচি' },
      { en: 'Volunteers in every coastal union', bn: 'উপকূলের প্রতিটি ইউনিয়নে স্বেচ্ছাসেবক' },
    ],
  },
  {
    id: 'economy', seed: 'bb-ch-economy', no: { en: '04', bn: '০৪' }, c: '#C9A062', numbersLink: true,
    ey: { en: 'The rise of an economy', bn: 'অর্থনীতির উত্থান' },
    h: { en: 'From the loom <em>to the world</em>', bn: 'তাঁতের সুতো থেকে <em>বিশ্ববাজারে</em>' },
    alt: { en: 'The Padma Bridge over the Padma river', bn: 'পদ্মা নদীর ওপর পদ্মা সেতু' },
    p: [
      { en: 'Ready-made garments, remittances, agriculture and a fast-growing technology sector have transformed the economy in a few decades. At the centre of that change is a young workforce.', bn: 'তৈরি পোশাক, প্রবাসী আয়, কৃষি আর দ্রুত বেড়ে ওঠা প্রযুক্তি খাতের হাত ধরে মাত্র কয়েক দশকে আমূল বদলে গেছে বাংলাদেশের অর্থনীতি। আর এই বদলের প্রাণকেন্দ্রে রয়েছে দেশের তরুণ কর্মশক্তি।' },
    ],
    facts: [
      { en: "World's 2nd largest garment exporter", bn: 'পোশাক রপ্তানিতে বিশ্বে দ্বিতীয়' },
      { en: 'Padma Bridge, 6.15 km, opened in 2022', bn: 'পদ্মা সেতু—৬.১৫ কিমি, চালু ২০২২ সালে' },
    ],
  },
];
const INDEX = [...CHAPTERS.map((c) => ({ id: c.id, no: c.no, ey: c.ey })), { id: 'vision', no: { en: '05', bn: '০৫' }, ey: T.visionEy }];

const VALUES = [
  { c: '#D71920', icon: 'fa-shield-heart', h: { en: 'Resilience', bn: 'দৃঢ়তা' }, p: { en: 'Coming back stronger from every challenge.', bn: 'প্রতিটি বাধা পেরিয়ে আরও শক্তিশালী হয়ে ফেরা।' } },
  { c: '#F38020', icon: 'fa-palette', h: { en: 'Creativity', bn: 'সৃজনশীলতা' }, p: { en: 'Finding new ways in art, craft and innovation.', bn: 'শিল্প, কারুকাজ আর উদ্ভাবনে নিত্যনতুন পথের খোঁজ।' } },
  { c: '#0E5B5C', icon: 'fa-hand-holding-heart', h: { en: 'Warmth', bn: 'আন্তরিকতা' }, p: { en: 'A hospitality that makes every guest family.', bn: 'অতিথিকে আপন করে নেওয়ার চিরায়ত আতিথেয়তা।' } },
  { c: '#EE1B5B', icon: 'fa-circle-check', h: { en: 'Credibility', bn: 'বিশ্বাসযোগ্যতা' }, p: { en: 'Saying what we can prove.', bn: 'যা বলি, তা প্রমাণসহ বলি।' } },
];
const TL_IMG = ['shaheed_1', 'smriti_1', 'sangsad_0', 'sunddeer_0', 'student_3', 'metro_3'];
const ease = [0.22, 0.8, 0.2, 1];

function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  return (
    <section ref={ref} className="grain on-dark relative isolate flex min-h-[calc(100svh-var(--header-h)-3px)] flex-col justify-start overflow-hidden bg-black text-white">
      <motion.img src={img('bb-story-delta', 1920)} srcSet="/photos/riversun-960.jpg 960w, /photos/riversun-1920.jpg 1920w, /photos/riversun-2880.jpg 2880w" sizes="100vw" fetchpriority="high" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_72%]" style={{ y, scale: 1.04 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.2)_38%,rgba(0,0,0,0)_60%,rgba(0,0,0,.25)_100%)]" />
      <div className="container relative z-[2] pb-16 pt-[9vh]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="flex max-w-5xl flex-col gap-4">
          <Breadcrumb items={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} light />
          <span className="eyebrow text-brand-goldsoft">{t(T.title)}</span>
          <h1 className="display" dangerouslySetInnerHTML={{ __html: t(T.h1) }} />
          <p className="lead max-w-2xl text-white/85">{t(T.lead)}</p>
        </motion.div>

      </div>
    </section>
  );
}

/** Desktop side rail that marks the chapter being read */
function ChapterRail() {
  const { t } = useLang();
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = INDEX.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label={t(T.inStory)} className={cn('fixed left-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-500 2xl:flex', active ? 'opacity-100' : 'pointer-events-none opacity-0')}>
      {INDEX.map((c) => {
        const on = c.id === active;
        return (
          <a key={c.id} href={`#${c.id}`} className="group flex items-center gap-3" aria-current={on ? 'step' : undefined}>
            <span className={cn('h-[2px] rounded-full transition-all duration-500 ease-brand', on ? 'stripe w-10' : 'w-5 bg-brand-ink/25 group-hover:w-8 group-hover:bg-brand-ink/60')} />
            <span className={cn('font-mag text-sm transition-colors', on ? 'text-brand-ink' : 'text-brand-ink/40 group-hover:text-brand-ink')}>{t(c.no)}</span>
            <span className={cn('whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-xs shadow-sm transition-all duration-300', on ? 'opacity-100' : 'pointer-events-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100')}>{t(c.ey)}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Chapter({ ch, flip }) {
  const { t } = useLang();
  return (
    <section id={ch.id} className="sec scroll-mt-24">
      <div className="container">
        {/* ruled chapter header */}
        <Reveal className="mb-10 flex items-end gap-5 border-b border-brand-line pb-6 lg:mb-14">
          <span className="font-mag text-[clamp(64px,8vw,120px)] font-medium leading-[.8]" style={{ color: ch.c }}>{t(ch.no)}</span>
          <span className="flex flex-col gap-2 pb-1">
            <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-brand-muted [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[13px]">{t(T.chapter)} {t(ch.no)}</span>
            <span className="eyebrow">{t(ch.ey)}</span>
          </span>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className={cn('lg:col-span-7', flip && 'lg:order-2')}>
            <RevealImage src={img(ch.seed, 1920)} alt={t(ch.alt)} className="aspect-[4/3] overflow-hidden rounded-[5px] bg-brand-paper" imgClassName="h-full w-full object-cover" />
            <figcaption className="mt-3 flex items-center gap-2 text-[13px] text-brand-muted"><span className="h-px w-6" style={{ background: ch.c }} /> {t(ch.alt)}</figcaption>
          </figure>
          <Reveal delay={120} className="flex flex-col gap-5 lg:col-span-5 lg:pt-4">
            <h2 className="display-md" dangerouslySetInnerHTML={{ __html: t(ch.h) }} />
            <div className="prose-bb">
              {ch.p.map((p, i) => <p key={i} className={cn('!mb-4', i === 0 && 'dropcap')}>{t(p)}</p>)}
            </div>
            <div className="relative overflow-hidden rounded-[5px] border border-brand-line bg-white p-6">
              <span className="absolute inset-y-0 left-0 w-1" style={{ background: ch.c }} />
              <span className="kicker">{t(T.facts)}</span>
              <ul className="mt-3 flex flex-col gap-3">
                {ch.facts.map((f) => (
                  <li key={f.en} className="flex gap-3 text-[15px] text-brand-ink2">
                    <i className="fa-solid fa-circle-check mt-1 text-sm" style={{ color: ch.c }} aria-hidden="true" /> {t(f)}
                  </li>
                ))}
              </ul>
            </div>
            {ch.numbersLink && <LinkArrow to="/numbers">{t(T.seeNumbers)}</LinkArrow>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden py-28 text-center text-white lg:py-40">
      <motion.img src={img('shaheed_1', 1920)} alt="" className="absolute inset-0 -z-20 h-[125%] w-full object-cover" style={{ y }} />
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <Reveal as="blockquote" className="container max-w-4xl">
        <span className="block h-[60px] font-mag text-[140px] leading-[.6] text-brand-gold2" aria-hidden="true">“</span>
        <p className="font-mag text-[clamp(26px,3.6vw,50px)] italic leading-[1.28] [html[lang=bn]_&]:not-italic [html[lang=bn]_&]:leading-relaxed">{t(T.quote)}</p>
        <cite className="mt-8 inline-flex flex-col items-center gap-3.5 text-[13px] not-italic uppercase tracking-[.16em] text-white/70 [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal">
          <span className="stripe h-[3px] w-[60px]" />{t(T.quoteBy)}
        </cite>
      </Reveal>
      <span className="absolute bottom-5 right-6 inline-flex items-center gap-1.5 text-xs text-white/60"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {t(T.quoteImg)}</span>
    </section>
  );
}

/** Horizontal photo timeline; the line fills as it scrolls into view */
function Timeline() {
  const { t, num } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const items = content.timeline;
  return (
    <div ref={ref} className="relative">
      {/* connecting line (desktop) */}
      <span className="absolute left-0 right-0 top-[7px] hidden h-0.5 bg-brand-line lg:block" />
      <motion.span className="absolute left-0 right-0 top-[7px] hidden h-0.5 origin-left bg-gradient-to-r from-brand-red via-brand-yellow to-brand-deep lg:block" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }} />
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
        {items.map((x, k) => {
          return (
            <motion.li key={x.y} className="flex flex-col gap-5" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + k * 0.18, duration: 0.8, ease }}>
              <span className="relative hidden h-4 w-4 rounded-full border-[3px] border-white bg-brand-deep shadow-[0_0_0_4px_#E7F2EF] lg:block" />
              <div className="group h-full overflow-hidden rounded-[5px] border border-brand-line bg-white shadow-[0_20px_40px_-30px_rgba(21,32,31,.5)]">
                <div className="aspect-[4/3] overflow-hidden"><img src={img(TL_IMG[k], 960)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" /></div>
                <div className="p-4">
                  <span className="font-mag text-[34px] font-medium leading-none text-brand-deep">{num(x.y)}</span>
                  <h3 className="serif-title mt-1.5 text-[19px] leading-snug">{t(x.t)}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-brand-muted">{t(x.d)}</p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Story() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));

  return (
    <>
      <Hero />
      <ChapterRail />

      <Chapter ch={CHAPTERS[0]} />
      <Quote />
      <Chapter ch={CHAPTERS[1]} flip />

      <section className="sec relative isolate overflow-hidden bg-brand-cream">
        <Watermark className="-left-16 -top-10 h-[420px] w-[420px]" opacity={0.08} />
        <div className="container">
          <SectionHead center eyebrow={t(T.tlEy)} title={t(T.tlH)} />
          <Timeline />
        </div>
      </section>

      <Chapter ch={CHAPTERS[2]} />
      <div className="bg-brand-paper"><Chapter ch={CHAPTERS[3]} flip /></div>

      <section id="vision" className="sec scroll-mt-24">
        <div className="container">
          <SectionHead center eyebrow={`${t({ en: '05', bn: '০৫' })} · ${t(T.visionEy)}`} title={t(T.visionH)} sub={t(T.visionP)} />
          <Reveal>
            <button type="button" onClick={() => toast(t(T.filmToast))} className="group relative isolate grid aspect-video w-full place-items-center overflow-hidden rounded-[5px] bg-brand-night text-center text-white" aria-label={t(T.film)}>
              <img src={img('bb-film', 1920)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80 transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(0,0,0,.1),rgba(0,0,0,.6))]" />
              <span>
                <span className="play-ring relative mx-auto mb-4 grid h-[84px] w-[84px] place-items-center rounded-full bg-white text-2xl text-brand-ink transition-transform duration-500 group-hover:scale-110"><i className="fa-solid fa-play" aria-hidden="true" /></span>
                <strong className="font-mag text-[clamp(22px,3vw,34px)] font-medium">{t(T.film)}</strong>
                <small className="mt-1 block text-[13px] opacity-80">{t(T.filmMeta)}</small>
              </span>
            </button>
          </Reveal>
        </div>
      </section>

      <section className="sec relative isolate overflow-hidden bg-brand-cream">
        <Watermark className="-bottom-20 -right-10 h-[460px] w-[460px]" opacity={0.08} />
        <div className="container">
          <SectionHead center eyebrow={t(T.valuesEy)} title={t(T.valuesH)} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.h.en} delay={i * 80} className="group relative flex flex-col gap-3 overflow-hidden rounded-[5px] border border-brand-line bg-white p-7 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(21,32,31,.45)]">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[.3] transition-transform duration-500 ease-brand group-hover:scale-x-100" style={{ background: v.c }} />
                <span className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full text-lg text-white" style={{ background: v.c }}><i className={`fa-solid ${v.icon}`} aria-hidden="true" /></span>
                  <b className="font-mag text-[34px] font-medium leading-none text-brand-ink/15">{t({ en: `0${i + 1}`, bn: `০${'১২৩৪'[i]}` })}</b>
                </span>
                <h3 className="serif-title mt-2 text-[26px]">{t(v.h)}</h3>
                <p className="text-[15px] text-brand-muted">{t(v.p)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="lead mx-auto mt-12 max-w-3xl text-center"><span dangerouslySetInnerHTML={{ __html: t(T.promise) }} /></Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <Reveal className="grid items-center gap-6 overflow-hidden rounded-[5px] bg-brand-deep p-7 text-white lg:grid-cols-[1.2fr_.8fr] lg:p-14">
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-brand-goldsoft">{t(T.kitEy)}</span>
              <h2 className="display-sm text-white">{t(T.kitH)}</h2>
              <p className="text-white/80">{t(T.kitP)}</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="light" onClick={() => toast(`Brand-Bangladesh-Guidelines.pdf — ${t({ en: 'download starts (demo)', bn: 'ডাউনলোড শুরু হবে (ডেমো)' })}`)}><i className="fa-solid fa-file-pdf" aria-hidden="true" /> {t(T.guide)}</Button>
                <Button asChild variant="outline-light"><a href="/logo.png" download="brand-bangladesh-logo.png"><i className="fa-solid fa-download" aria-hidden="true" /> {t(T.logoKit)}</a></Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-[5px] bg-white p-6"><img src="/logo.png" alt={t({ en: 'Brand Bangladesh logo', bn: 'ব্র্যান্ড বাংলাদেশ লোগো' })} width="918" height="285" loading="lazy" /></div>
              <div className="flex flex-wrap gap-2" aria-label={t({ en: 'Brand colours', bn: 'ব্র্যান্ডের রং' })}>
                {['#D71920', '#F38020', '#FBC111', '#0E5B5C', '#141414', '#EE1B5B', '#A4CB3A', '#C9A062'].map((c) => (
                  <span key={c} title={c} className="h-11 w-11 rounded-[5px] border-2 border-white/25" style={{ background: c }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
