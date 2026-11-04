import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { LinkArrow } from '@/components/shared/LinkArrow';

const T = {
  title: { en: 'The Brand Story', bn: 'ব্র্যান্ডের গল্প' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  h1: { en: 'A nation <em>born of rivers</em>', bn: 'নদীর বুকে <em>জন্ম নেওয়া এক জাতি</em>' },
  lead: { en: 'For a thousand years, people on this delta of silt and water have built, lost and built again. This is that story, and it is still being written.', bn: 'পলিমাটির এই ব-দ্বীপে হাজার বছর ধরে মানুষ গড়েছে, হারিয়েছে, আবার গড়েছে। এ সেই গল্প, যার নতুন অধ্যায় লেখা হচ্ছে আজও।' },
  quote: { en: 'We fought for our language and we fought for our freedom. Now we work to become the best version of ourselves.', bn: 'ভাষার জন্য লড়েছি, স্বাধীনতার জন্য লড়েছি। আজ আমাদের সংগ্রাম নিজেদের শ্রেষ্ঠ রূপে গড়ে তোলার।' },
  quoteBy: { en: '— The Bangladesh story', bn: '— বাংলাদেশের গল্প' },
  tlEy: { en: 'Key moments', bn: 'গুরুত্বপূর্ণ মুহূর্ত' },
  tlH: { en: "A nation's <em>timeline</em>", bn: 'একটি জাতির <em>সময়রেখা</em>' },
  visionEy: { en: '05 · The vision', bn: '০৫ · ভবিষ্যতের স্বপ্ন' },
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
};

const CHAPTERS = [
  {
    seed: 'bb-ch-land', no: { en: '01', bn: '০১' },
    ey: { en: 'The land and the delta', bn: 'ভূমি ও ব-দ্বীপ' },
    h: { en: 'Where three great rivers <em>meet the sea</em>', bn: 'যেখানে তিন মহানদী <em>মিশেছে সাগরে</em>' },
    alt: { en: 'River char farmland seen from above', bn: 'ওপর থেকে দেখা নদীর চর আর কৃষিজমি' },
    p: [
      { en: 'The Padma, the Meghna and the Jamuna carry silt down from the Himalayas to build one of the largest deltas on Earth. Here, rivers are not just geography. They are roads, livelihoods, songs and identity.', bn: 'পদ্মা, মেঘনা আর যমুনা হিমালয় থেকে পলি বয়ে এনে গড়েছে বিশ্বের অন্যতম বৃহৎ ব-দ্বীপ। এখানে নদী কেবল মানচিত্রের রেখা নয়—নদীই পথ, নদীই জীবিকা, নদীই গান আর আমাদের পরিচয়।' },
      { en: 'From the northern plains to the southern mangroves, from the eastern hills to the longest natural sea beach, this compact country holds a remarkable range of landscapes.', bn: 'উত্তরের সমতল থেকে দক্ষিণের ম্যানগ্রোভ, পূর্বের পাহাড় থেকে বিশ্বের দীর্ঘতম প্রাকৃতিক সৈকত—ছোট্ট এই দেশের বুকে প্রকৃতি সাজিয়েছে বিস্ময়কর বৈচিত্র্য।' },
    ],
  },
  {
    seed: 'bb-ch-history', no: { en: '02', bn: '০২' },
    ey: { en: 'History and the Liberation War', bn: 'ইতিহাস ও মুক্তিযুদ্ধ' },
    h: { en: 'From a language <em>to a nation</em>', bn: 'ভাষা থেকে <em>স্বাধীনতা</em>' },
    alt: { en: 'National Martyrs\' Memorial, Savar', bn: 'জাতীয় স্মৃতিসৌধ, সাভার' },
    p: [
      { en: "In 1952, a movement to defend the Bangla language awakened a people's sense of who they were. In 1971, through the Liberation War, the independent nation of Bangladesh was born.", bn: '১৯৫২ সালে মাতৃভাষার মর্যাদার দাবিতে শুরু হওয়া আন্দোলন একটি জাতির আত্মপরিচয় জাগিয়ে তুলেছিল। ১৯৭১ সালের মুক্তিযুদ্ধের মধ্য দিয়ে জন্ম নেয় স্বাধীন বাংলাদেশ।' },
      { en: "Today, 21 February is marked around the world as International Mother Language Day, a small country's gift to everyone.", bn: 'আজ ২১ ফেব্রুয়ারি সারা বিশ্বে পালিত হয় আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে—বিশ্বকে দেওয়া ছোট্ট এক দেশের অমূল্য উপহার।' },
    ],
  },
  {
    seed: 'bb-ch-people', no: { en: '03', bn: '০৩' },
    ey: { en: 'The resilience of its people', bn: 'মানুষের অদম্য প্রাণশক্তি' },
    h: { en: 'Standing up <em>after every storm</em>', bn: 'প্রতিটি ঝড়ের পর <em>আবার উঠে দাঁড়ানো</em>' },
    alt: { en: 'Fishers hauling a net together on the river', bn: 'নদীতে একসঙ্গে জাল টানছেন জেলেরা' },
    p: [
      { en: 'Cyclones, floods and river erosion have taught Bangladeshis to live with nature. Shelters, early warnings and strong communities have made the country an example to the world in disaster preparedness.', bn: 'ঘূর্ণিঝড়, বন্যা আর নদীভাঙন—বাংলাদেশের মানুষ প্রকৃতির সঙ্গে বাঁচতে শিখেছে। আশ্রয়কেন্দ্র, আগাম সতর্কবার্তা আর মানুষের সম্মিলিত শক্তিতে দুর্যোগ মোকাবিলায় বাংলাদেশ আজ বিশ্বের কাছে দৃষ্টান্ত।' },
    ],
  },
  {
    seed: 'bb-ch-economy', no: { en: '04', bn: '০৪' }, numbersLink: true,
    ey: { en: 'The rise of an economy', bn: 'অর্থনীতির উত্থান' },
    h: { en: 'From the loom <em>to the world</em>', bn: 'তাঁতের সুতো থেকে <em>বিশ্ববাজারে</em>' },
    alt: { en: 'The Padma Bridge over the Padma river', bn: 'পদ্মা নদীর ওপর পদ্মা সেতু' },
    p: [
      { en: 'Ready-made garments, remittances, agriculture and a fast-growing technology sector have transformed the economy in a few decades. At the centre of that change is a young workforce.', bn: 'তৈরি পোশাক, প্রবাসী আয়, কৃষি আর দ্রুত বেড়ে ওঠা প্রযুক্তি খাতের হাত ধরে মাত্র কয়েক দশকে আমূল বদলে গেছে বাংলাদেশের অর্থনীতি। আর এই বদলের প্রাণকেন্দ্রে রয়েছে দেশের তরুণ কর্মশক্তি।' },
    ],
  },
];

const VALUES = [
  { c: '#D71920', h: { en: 'Resilience', bn: 'দৃঢ়তা' }, p: { en: 'Coming back stronger from every challenge.', bn: 'প্রতিটি বাধা পেরিয়ে আরও শক্তিশালী হয়ে ফেরা।' } },
  { c: '#F38020', h: { en: 'Creativity', bn: 'সৃজনশীলতা' }, p: { en: 'Finding new ways in art, craft and innovation.', bn: 'শিল্প, কারুকাজ আর উদ্ভাবনে নিত্যনতুন পথের খোঁজ।' } },
  { c: '#0E5B5C', h: { en: 'Warmth', bn: 'আন্তরিকতা' }, p: { en: 'A hospitality that makes every guest family.', bn: 'অতিথিকে আপন করে নেওয়ার চিরায়ত আতিথেয়তা।' } },
  { c: '#EE1B5B', h: { en: 'Credibility', bn: 'বিশ্বাসযোগ্যতা' }, p: { en: 'Saying what we can prove.', bn: 'যা বলি, তা প্রমাণসহ বলি।' } },
];

function Chapter({ ch, flip }) {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <div ref={ref} className="container grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
      <Reveal className={cn('aspect-[4/5] overflow-hidden rounded-[5px] bg-brand-paper', flip && 'lg:order-2')}>
        <motion.img style={{ y, scale: 1.14 }} src={img(ch.seed, 900, 1120)} alt={t(ch.alt)} loading="lazy" width="900" height="1120" className="h-full w-full object-cover" />
      </Reveal>
      <Reveal delay={120} className="flex flex-col gap-4">
        <span className="font-[Bodoni_Moda] text-[90px] leading-[.8] text-brand-goldsoft" style={{ fontFamily: "'Bodoni Moda', serif" }}>{t(ch.no)}</span>
        <span className="eyebrow">{t(ch.ey)}</span>
        <h2 className="display-md" dangerouslySetInnerHTML={{ __html: t(ch.h) }} />
        <div className="prose-bb">{ch.p.map((p, i) => <p key={i} className="!mb-0 mt-2">{t(p)}</p>)}</div>
        {ch.numbersLink && <LinkArrow to="/numbers">{t(T.seeNumbers)}</LinkArrow>}
      </Reveal>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const { t, num } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const odd = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      className={cn('tl-dot relative pb-10 pl-[18px] lg:w-1/2 lg:pl-0', inView && 'in', odd ? 'lg:ml-[50%] lg:pl-[60px] lg:text-left' : 'lg:pr-[60px] lg:text-right')}
      initial={{ opacity: 0, x: odd ? 30 : -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
    >
      <span className="block font-[Bodoni_Moda] text-[clamp(40px,5vw,64px)] leading-none text-brand-deep" style={{ fontFamily: "'Bodoni Moda', serif" }}>{num(item.y)}</span>
      <h3 className="serif-title mb-0.5 mt-1.5 text-2xl">{t(item.t)}</h3>
      <p className={cn('max-w-[520px] text-brand-muted', !odd && 'lg:ml-auto')}>{t(item.d)}</p>
    </motion.div>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className="relative pl-7 lg:pl-0">
      <span className="absolute bottom-1.5 left-1.5 top-1.5 w-0.5 bg-brand-line lg:left-1/2" />
      <motion.span style={{ scaleY }} className="absolute bottom-1.5 left-1.5 top-1.5 w-0.5 origin-top bg-gradient-to-b from-brand-red via-brand-yellow to-brand-deep lg:left-1/2" />
      {content.timeline.map((x, i) => <TimelineItem key={x.y} item={x} index={i} />)}
    </div>
  );
}

export default function Story() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="stripe fixed inset-x-0 top-0 z-[200] h-[3px] origin-left" aria-hidden="true" />
      <PageHero image={img('bb-story-delta', 1920, 1200)} crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.title)} title={t(T.h1)} lead={t(T.lead)} />

      <section className="sec"><Chapter ch={CHAPTERS[0]} /></section>

      <section className="bg-brand-cream py-24 text-center">
        <Reveal as="blockquote" className="container max-w-4xl">
          <span className="block h-[60px] font-[Bodoni_Moda] text-[140px] leading-[.6] text-brand-gold2" style={{ fontFamily: "'Bodoni Moda', serif" }} aria-hidden="true">“</span>
          <p className="font-mag text-[clamp(26px,3.6vw,48px)] italic leading-[1.28] [html[lang=bn]_&]:not-italic [html[lang=bn]_&]:leading-relaxed">{t(T.quote)}</p>
          <cite className="mt-6 inline-flex flex-col items-center gap-3.5 text-[13px] not-italic uppercase tracking-[.16em] text-brand-muted [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal">
            <span className="stripe h-[3px] w-[60px]" />{t(T.quoteBy)}
          </cite>
        </Reveal>
      </section>

      <section className="sec"><Chapter ch={CHAPTERS[1]} flip /></section>

      <section className="sec overflow-hidden bg-brand-cream">
        <div className="container">
          <SectionHead center eyebrow={t(T.tlEy)} title={t(T.tlH)} />
          <Timeline />
        </div>
      </section>

      <section className="sec"><Chapter ch={CHAPTERS[2]} /></section>
      <section className="sec bg-brand-paper"><Chapter ch={CHAPTERS[3]} flip /></section>

      <section className="sec">
        <div className="container">
          <SectionHead center eyebrow={t(T.visionEy)} title={t(T.visionH)} sub={t(T.visionP)} />
          <Reveal>
            <button type="button" onClick={() => toast(t(T.filmToast))} className="group relative isolate grid aspect-video w-full place-items-center overflow-hidden rounded-[5px] bg-brand-night text-center text-white" aria-label={t(T.film)}>
              <img src={img('bb-film', 1600, 900)} alt="" loading="lazy" width="1600" height="900" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-75 transition-transform duration-[1.2s] group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(0,0,0,.1),rgba(0,0,0,.6))]" />
              <span>
                <span className="play-ring relative mx-auto mb-4 grid h-[84px] w-[84px] place-items-center rounded-full bg-white text-2xl text-brand-ink"><i className="fa-solid fa-play" aria-hidden="true" /></span>
                <strong className="font-mag text-[clamp(22px,3vw,34px)] font-medium">{t(T.film)}</strong>
                <small className="mt-1 block text-[13px] opacity-80">{t(T.filmMeta)}</small>
              </span>
            </button>
          </Reveal>
        </div>
      </section>

      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead center eyebrow={t(T.valuesEy)} title={t(T.valuesH)} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.h.en} delay={i * 80} className="relative flex flex-col gap-2.5 overflow-hidden rounded-[5px] border border-brand-line bg-white p-7">
                <span className="absolute inset-y-0 left-0 w-1" style={{ background: v.c }} />
                <b className="font-[Bodoni_Moda] text-[40px] font-medium leading-none" style={{ color: v.c, fontFamily: "'Bodoni Moda', serif" }}>{t({ en: `0${i + 1}`, bn: `০${'১২৩৪'[i]}` })}</b>
                <h3 className="serif-title text-[26px]">{t(v.h)}</h3>
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
