import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img } from '@/lib/utils';
import { Monument } from '@/components/shared/Monument';

// Story page follows the v2 design (brand-bangladesh-website-v2.vercel.app/en/story)
const SERIF = { fontFamily: "Georgia, 'Times New Roman', serif" };
const GOLD = '#D9AA66';
const ease = [0.22, 0.8, 0.2, 1];

const T = {
  title: { en: 'The Brand Story', bn: 'ব্র্যান্ডের গল্প' },
  h1: { en: 'Born of rivers. Raised by resilience.', bn: 'নদীর বুকে জন্ম, অদম্য প্রাণে বেড়ে ওঠা।' },
  lead: { en: 'The story of Bangladesh in five chapters — the land, the struggle, the people, the rise and the road ahead.', bn: 'পাঁচ অধ্যায়ে বাংলাদেশের গল্প — মাটি, সংগ্রাম, মানুষ, উত্থান আর সামনের পথ।' },
  tlEy: { en: 'Key moments', bn: 'গুরুত্বপূর্ণ মুহূর্ত' },
  tlH: { en: 'A timeline of the nation', bn: 'জাতির সময়রেখা' },
  film: { en: 'The brand film', bn: 'ব্র্যান্ড চলচ্চিত্র' },
  essEy: { en: 'Brand essence', bn: 'ব্র্যান্ডের সারকথা' },
  essH: { en: 'What we stand for', bn: 'আমরা যা ধারণ করি' },
  promiseEy: { en: 'Our promise', bn: 'আমাদের প্রতিশ্রুতি' },
  promise: { en: '“Bangladesh promises the world a partner that is resilient, warm and ready — a place to visit, to source from, to invest in and to believe in.”', bn: '“বাংলাদেশ বিশ্বকে প্রতিশ্রুতি দেয় এক অদম্য, আন্তরিক ও প্রস্তুত অংশীদারের — যেখানে বেড়ানো যায়, যেখান থেকে পণ্য কেনা যায়, বিনিয়োগ করা যায়, আর যাকে বিশ্বাস করা যায়।”' },
  kitEy: { en: 'For partners', bn: 'অংশীদারদের জন্য' },
  kitH: { en: 'Brand guidelines & logo kit', bn: 'ব্র্যান্ড নির্দেশিকা ও লোগো কিট' },
  kitP: { en: 'Use the identity correctly: the logo, colours and typography of Brand Bangladesh. The full guideline is shared with approved partners.', bn: 'পরিচয়টি সঠিকভাবে ব্যবহার করুন: ব্র্যান্ড বাংলাদেশের লোগো, রং ও টাইপোগ্রাফি। পূর্ণ নির্দেশিকা অনুমোদিত অংশীদারদের দেওয়া হয়।' },
  kitDl: { en: 'Download logo mark (SVG)', bn: 'ডাউনলোড লোগো মার্ক (SVG)' },
  kitReq: { en: 'Request the full guidelines', bn: 'পূর্ণ নির্দেশিকা চেয়ে নিন' },
  kitToast: { en: 'Guideline requests go to the Brand Bangladesh team (demo)', bn: 'নির্দেশিকার অনুরোধ ব্র্যান্ড বাংলাদেশ দলের কাছে যাবে (ডেমো)' },
};

const CHAPTERS = [
  { id: 'land', photo: 'story_barishal', no: { en: '01', bn: '০১' },
    h: { en: 'The land and the delta', bn: 'মাটি আর ব-দ্বীপ' },
    p: { en: 'Bangladesh is a gift of rivers. The Padma, the Meghna and the Jamuna carry the snow of the Himalaya to the Bay of Bengal, building the largest delta on Earth as they go. More than a thousand rivers cross this land. They feed its rice, carry its boats and shape the patience and the poetry of its people.', bn: 'বাংলাদেশ নদীর দান। পদ্মা, মেঘনা আর যমুনা হিমালয়ের বরফ বয়ে আনে বঙ্গোপসাগরে, আর পথে পথে গড়ে তোলে পৃথিবীর বৃহত্তম ব-দ্বীপ। এক হাজারেরও বেশি নদী বয়ে গেছে এই দেশের বুক চিরে। তারা ধান ফলায়, নৌকা বয়, আর গড়ে তোলে এ দেশের মানুষের ধৈর্য ও কবিতা।' },
    q: { en: 'Amar shonar Bangla, ami tomay bhalobashi — My golden Bengal, I love you.', bn: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।' },
    alt: { en: 'Relief map of Barishal division', bn: 'বরিশাল বিভাগের মানচিত্র' } },
  { id: 'history', photo: 'story_dhaka', no: { en: '02', bn: '০২' },
    h: { en: 'History and the Liberation War', bn: 'ইতিহাস ও মুক্তিযুদ্ধ' },
    p: { en: 'For two thousand years this delta was a crossroads of kingdoms, faiths and trade. In 1952, students in Dhaka gave their lives so that Bangla could be spoken freely — a sacrifice the world now honours every 21 February. In 1971, after nine months of the Liberation War, Bangladesh was born as an independent nation.', bn: 'দুই হাজার বছর ধরে এই ব-দ্বীপ ছিল রাজ্য, ধর্ম আর বাণিজ্যের মিলনস্থল। ১৯৫২ সালে ঢাকার ছাত্ররা প্রাণ দিয়েছিলেন, যেন বাংলায় মুক্তভাবে কথা বলা যায় — সেই আত্মত্যাগকে বিশ্ব আজ সম্মান জানায় প্রতি ২১ ফেব্রুয়ারি। ১৯৭১ সালে নয় মাসের মুক্তিযুদ্ধ শেষে জন্ম নেয় স্বাধীন বাংলাদেশ।' },
    alt: { en: 'Relief map of Dhaka division', bn: 'ঢাকা বিভাগের মানচিত্র' } },
  { id: 'people', photo: 'story_khulna', no: { en: '03', bn: '০৩' },
    h: { en: 'The resilience of its people', bn: 'মানুষের অদম্য শক্তি' },
    p: { en: 'Few nations have faced so much and given up so little. Bangladesh has learned to live with cyclones and floods, and has become a global teacher in disaster preparedness — cutting cyclone deaths dramatically through early warning, shelters and community volunteers.', bn: 'এত প্রতিকূলতার মুখে এত কম হার মানা জাতি পৃথিবীতে খুব কম। ঘূর্ণিঝড় আর বন্যার সঙ্গে বাঁচতে শিখেছে বাংলাদেশ, আর দুর্যোগ প্রস্তুতিতে হয়ে উঠেছে বিশ্বের শিক্ষক — আগাম সতর্কবার্তা, আশ্রয়কেন্দ্র আর স্বেচ্ছাসেবকদের মাধ্যমে ঘূর্ণিঝড়ে প্রাণহানি কমিয়ে এনেছে নাটকীয়ভাবে।' },
    q: { en: 'We do not wait for the storm to pass. We learn to sail in it.', bn: 'আমরা ঝড় থামার অপেক্ষায় থাকি না। ঝড়ের মধ্যেই নৌকা বাইতে শিখি।' },
    alt: { en: 'Relief map of Khulna division', bn: 'খুলনা বিভাগের মানচিত্র' } },
  { id: 'economy', photo: 'story_chittagong', no: { en: '04', bn: '০৪' },
    h: { en: 'The rise of an economy', bn: 'অর্থনীতির উত্থান' },
    p: { en: 'Once described as a basket case, Bangladesh became one of the fastest-growing economies in the world. It reached lower-middle-income status in 2015 and is scheduled to graduate from the UN’s Least Developed Country list in 2026. Garments, remittances, agriculture and a young digital workforce drive the change.', bn: 'একসময় যাকে বলা হয়েছিল “তলাবিহীন ঝুড়ি”, সেই বাংলাদেশ হয়ে ওঠে বিশ্বের দ্রুততম বর্ধনশীল অর্থনীতিগুলোর একটি। ২০১৫ সালে নিম্ন-মধ্যম আয়ের দেশে উন্নীত হয়, আর ২০২৬ সালে জাতিসংঘের স্বল্পোন্নত দেশের তালিকা থেকে উত্তরণের কথা। এই বদলের চালিকাশক্তি পোশাকশিল্প, প্রবাসী আয়, কৃষি আর তরুণ ডিজিটাল কর্মশক্তি।' },
    alt: { en: 'Relief map of Chattogram division', bn: 'চট্টগ্রাম বিভাগের মানচিত্র' } },
  { id: 'vision', photo: 'story_sylhet', no: { en: '05', bn: '০৫' },
    h: { en: 'A vision for the future', bn: 'ভবিষ্যতের স্বপ্ন' },
    p: { en: 'The next chapter is being written by a generation born after 2000: coders, climate scientists, designers and founders who see no limit to what Bangladesh can become. Green, digital, connected and proud — a country that welcomes the world, and is ready to lead.', bn: 'পরের অধ্যায় লিখছে ২০০০ সালের পরে জন্ম নেওয়া এক প্রজন্ম: কোডার, জলবায়ু বিজ্ঞানী, ডিজাইনার আর উদ্যোক্তা — বাংলাদেশ কী হতে পারে, তার কোনো সীমা যাঁরা দেখেন না। সবুজ, ডিজিটাল, সংযুক্ত আর গর্বিত — এমন এক দেশ, যে বিশ্বকে স্বাগত জানায় আর নেতৃত্ব দিতে প্রস্তুত।' },
    alt: { en: 'Relief map of Sylhet division', bn: 'সিলেট বিভাগের মানচিত্র' } },
];

const TIMELINE = [
  { y: 1952, t: { en: 'Language Movement', bn: 'ভাষা আন্দোলন' }, d: { en: 'Students give their lives for the right to speak Bangla.', bn: 'বাংলায় কথা বলার অধিকারের জন্য ছাত্রদের আত্মদান।' } },
  { y: 1971, t: { en: 'Independence', bn: 'স্বাধীনতা' }, d: { en: 'After the nine-month Liberation War, Bangladesh is born on 16 December.', bn: 'নয় মাসের মুক্তিযুদ্ধ শেষে ১৬ ডিসেম্বর বিজয়।' } },
  { y: 1974, t: { en: 'United Nations', bn: 'জাতিসংঘ' }, d: { en: 'Bangladesh becomes the 136th member of the UN.', bn: 'জাতিসংঘের ১৩৬তম সদস্য হয় বাংলাদেশ।' } },
  { y: 1997, t: { en: 'Sundarbans heritage', bn: 'সুন্দরবন বিশ্ব ঐতিহ্য' }, d: { en: 'UNESCO inscribes the Sundarbans as a World Heritage Site.', bn: 'ইউনেস্কো সুন্দরবনকে বিশ্ব ঐতিহ্য ঘোষণা করে।' } },
  { y: 1999, t: { en: 'Mother Language Day', bn: 'মাতৃভাষা দিবস' }, d: { en: 'UNESCO declares 21 February International Mother Language Day.', bn: 'ইউনেস্কো ২১ ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস ঘোষণা করে।' } },
  { y: 2015, t: { en: 'Lower-middle income', bn: 'নিম্ন-মধ্যম আয়' }, d: { en: 'The World Bank reclassifies Bangladesh as a lower-middle-income country.', bn: 'বিশ্বব্যাংক বাংলাদেশকে নিম্ন-মধ্যম আয়ের দেশ ঘোষণা করে।' } },
  { y: 2022, t: { en: 'Padma Bridge', bn: 'পদ্মা সেতু' }, d: { en: 'The 6.15 km bridge connects the south-west to the capital.', bn: '৬.১৫ কিলোমিটারের সেতু দক্ষিণ-পশ্চিমকে যুক্ত করে রাজধানীর সঙ্গে।' } },
  { y: 2026, t: { en: 'LDC graduation', bn: 'এলডিসি উত্তরণ' }, d: { en: 'Scheduled graduation from Least Developed Country status.', bn: 'স্বল্পোন্নত দেশের তালিকা থেকে নির্ধারিত উত্তরণ।' } },
];

const VALUES = [
  { c: '#4C9D8E', h: { en: 'Resilient', bn: 'অদম্য' }, p: { en: 'We rise with every tide.', bn: 'প্রতিটি জোয়ারে আমরা আবার জেগে উঠি।' } },
  { c: '#F38020', h: { en: 'Warm', bn: 'আন্তরিক' }, p: { en: 'A guest is a blessing.', bn: 'অতিথি আমাদের কাছে আশীর্বাদ।' } },
  { c: '#EE1B5B', h: { en: 'Enterprising', bn: 'উদ্যমী' }, p: { en: 'We make, trade and invent.', bn: 'আমরা গড়ি, বাণিজ্য করি, উদ্ভাবন করি।' } },
  { c: '#A4CB3A', h: { en: 'Creative', bn: 'সৃষ্টিশীল' }, p: { en: 'Language, music and craft run deep.', bn: 'ভাষা, সংগীত আর কারুশিল্প আমাদের রক্তে।' } },
];
const SWATCHES = ['#D71920', '#F38020', '#FBC111', '#0E5B5C', '#A4CB3A', '#EE1B5B'];

// TODO: replace with the official brand film once it is produced
const FILM_ID = 'vpWJjhLpjmU'; // "Bangladesh 4K - Scenic Relaxation Film With Traditional Music" by Scenic Relaxation on YouTube

/** Small gold uppercase label used above v2 headings */
function Kicker({ children, className }) {
  return <span className={cn('block text-[11px] uppercase tracking-[.22em] [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[13px]', className)} style={{ color: GOLD }}>{children}</span>;
}

function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  return (
    <>
      <section ref={ref} className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-[#0B0F0F] text-[#FBFAF7] md:min-h-[86svh]">
        <motion.img src={img('story_map', 1920)} srcSet="/photos/story_map-960.webp 960w, /photos/story_map-1920.webp 1920w" sizes="100vw" fetchpriority="high" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ y, scale: 1.05 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,15,15,0)_35%,rgba(11,15,15,.55)_75%,rgba(11,15,15,.85)_100%)]" />
        <motion.div className="w-full px-4 pb-16 sm:px-6 md:px-10 md:pb-24 lg:px-16" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}>
          <span className="mb-5 block h-px w-10" style={{ background: GOLD }} />
          <Kicker className="mb-6">{t(T.title)}</Kicker>
          <h1 className="max-w-[920px] text-[clamp(48px,7vw,101px)] leading-[.95] tracking-[-.05em] [html[lang=bn]_&]:text-[clamp(38px,5vw,72px)] [html[lang=bn]_&]:leading-[1.25] [html[lang=bn]_&]:tracking-normal" style={SERIF}>{t(T.h1)}</h1>
          <p className="mt-8 max-w-[660px] text-[17px] font-light leading-relaxed text-[#FBFAF7]/85">{t(T.lead)}</p>
        </motion.div>
      </section>
      {/* chapter strip */}
      <nav aria-label={t(T.title)} className="hide-scrollbar overflow-x-auto border-b border-black/[.07] bg-[#FBFAF7]">
        <ol className="flex min-w-max gap-10 px-4 py-5 sm:px-6 md:px-10 lg:px-16">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="group text-[12px] uppercase tracking-[.2em] text-[#5D6463] transition-colors hover:text-[#101414] [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[14px]">
                <span className="mr-2" style={{ color: GOLD }}>{t(c.no)}</span>{t(c.h)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

function Chapter({ ch, flip }) {
  const { t } = useLang();
  return (
    <section id={ch.id} className="scroll-mt-28 bg-[#FBFAF7] px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
        {/* the illustration never grows taller than the screen, so it shows in full on small laptops too */}
        <motion.div className={cn('mx-auto aspect-[4/5] w-full max-w-[min(100%,calc((100svh-180px)*.8))] overflow-hidden rounded-xl bg-[#E9E3D6]', flip && 'md:order-2')} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 1, ease }}>
          <img src={img(ch.photo, 960)} alt={t(ch.alt)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="flex flex-col" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 1, ease, delay: 0.12 }}>
          <span className="text-[72px] leading-none" style={{ ...SERIF, color: '#E5CFA5' }}>{t(ch.no)}</span>
          <h2 className="mt-3 text-[clamp(34px,3.6vw,56px)] leading-[1.1] tracking-[-.05em] text-[#101414] [html[lang=bn]_&]:leading-[1.35] [html[lang=bn]_&]:tracking-normal" style={SERIF}>{t(ch.h)}</h2>
          <p className="mt-7 max-w-[620px] text-[17px] font-light leading-[1.75] text-[#5D6463]">{t(ch.p)}</p>
          {ch.q && (
            <blockquote className="mt-10 border-l-2 pl-6 text-[clamp(22px,2.1vw,30px)] italic leading-[1.3] text-[#0E5B5C] [html[lang=bn]_&]:not-italic [html[lang=bn]_&]:leading-normal" style={{ ...SERIF, borderColor: GOLD }}>{t(ch.q)}</blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  const { t, num } = useLang();
  return (
    <section className="scroll-mt-28 bg-[#FBFAF7] px-4 py-24 sm:px-6 md:px-10 lg:px-16">
      <Kicker className="mb-4">{t(T.tlEy)}</Kicker>
      <h2 className="text-[clamp(38px,4.4vw,64px)] leading-[1.1] tracking-[-.05em] text-[#101414] [html[lang=bn]_&]:tracking-normal" style={SERIF}>{t(T.tlH)}</h2>
      <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
        {TIMELINE.map((x, k) => (
          <motion.li key={x.y} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: k * 0.06 }}>
            <span className="block h-[22px] w-[22px] rounded-full border-2" style={{ borderColor: GOLD }} />
            <span className="mt-8 block text-[34px] leading-none text-[#101414]" style={SERIF}>{num(x.y)}</span>
            <b className="mt-3 block text-[14px] font-semibold text-[#3B4644]">{t(x.t)}</b>
            <p className="mt-1.5 text-[14px] font-light leading-[1.65] text-[#7A8180]">{t(x.d)}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/** Poster with play button; clicking swaps in the YouTube player (no YouTube requests until then) */
function BrandFilm() {
  const { t } = useLang();
  const [play, setPlay] = useState(false);
  return (
    <section className="scroll-mt-28 bg-[#FBFAF7] px-4 py-16 sm:px-6 md:px-10 lg:px-16">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#A4A4A4]">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${FILM_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd2160`}
            title={t(T.film)} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group relative isolate grid h-full w-full place-items-center text-center text-white" aria-label={t(T.film)}>
            <img src={img('bb-film', 1920)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
            <span className="absolute inset-0 -z-10 bg-black/35" />
            <span>
              <span className="mx-auto mb-5 grid h-[66px] w-[66px] place-items-center rounded-full bg-[#FBFAF7] text-lg text-[#101414] transition-transform duration-500 group-hover:scale-110"><i className="fa-solid fa-play" aria-hidden="true" /></span>
              <strong className="text-[clamp(26px,2.6vw,38px)] font-normal" style={SERIF}>{t(T.film)}</strong>
            </span>
            <span className="absolute bottom-4 right-5 inline-flex items-center gap-1.5 text-[11px] text-white/60"><i className="fa-brands fa-youtube" aria-hidden="true" /> Video: Scenic Relaxation</span>
          </button>
        )}
      </div>
    </section>
  );
}

function Essence() {
  const { t } = useLang();
  return (
    <section className="scroll-mt-28 bg-[#FBFAF7] px-4 py-24 sm:px-6 md:px-10 lg:px-16">
      <Kicker className="mb-4">{t(T.essEy)}</Kicker>
      <h2 className="text-[clamp(38px,4.4vw,64px)] leading-[1.1] tracking-[-.05em] text-[#101414] [html[lang=bn]_&]:tracking-normal" style={SERIF}>{t(T.essH)}</h2>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, k) => (
          <motion.div key={v.h.en} className="rounded-xl border border-black/[.08] bg-white/40 px-8 py-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: k * 0.08 }}>
            <span className="block h-[3px] w-10" style={{ background: v.c }} />
            <h3 className="mt-7 text-[34px] leading-none text-[#101414]" style={SERIF}>{t(v.h)}</h3>
            <p className="mt-4 text-[13px] font-light text-[#5D6463]">{t(v.p)}</p>
          </motion.div>
        ))}
      </div>
      <Kicker className="mb-4 mt-20">{t(T.promiseEy)}</Kicker>
      <p className="max-w-[900px] text-[clamp(28px,3.4vw,48px)] leading-[1.05] tracking-[-.02em] text-[#101414] [html[lang=bn]_&]:leading-[1.45] [html[lang=bn]_&]:tracking-normal" style={SERIF}>{t(T.promise)}</p>
    </section>
  );
}

function LogoKit() {
  const { t } = useLang();
  return (
    <section className="bg-[#FBFAF7] px-4 pb-24 sm:px-6 md:px-10 lg:px-16">
      <div className="grid items-center gap-10 rounded-xl border border-black/[.08] bg-white/40 p-8 md:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Kicker className="mb-3">{t(T.kitEy)}</Kicker>
          <h2 className="text-[clamp(30px,2.8vw,40px)] leading-[1.15] text-[#101414]" style={SERIF}>{t(T.kitH)}</h2>
          <p className="mt-4 max-w-[560px] text-[14px] font-light leading-relaxed text-[#5D6463]">{t(T.kitP)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/favicon.svg" download="brand-bangladesh-mark.svg" className="inline-flex items-center gap-2 rounded-full bg-[#101414] px-6 py-3 text-[11px] uppercase tracking-[.18em] text-white transition hover:bg-[#0E5B5C] [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[13px]">{t(T.kitDl)} ↓</a>
            <button type="button" onClick={() => toast(t(T.kitToast))} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-[11px] uppercase tracking-[.18em] text-[#101414] transition hover:border-black [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[13px]">{t(T.kitReq)} <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 lg:items-end">
          <div className="rounded-xl border border-black/[.08] bg-[#FBFAF7] px-8 py-6"><img src="/logo.png" alt="Brand Bangladesh" width="918" height="285" loading="lazy" className="h-12 w-auto" /></div>
          <div className="flex items-center gap-3">
            <span className="grid h-[52px] w-[52px] place-items-center rounded-lg bg-[#101414]"><Monument className="h-9 w-9" /></span>
            {SWATCHES.map((c) => <span key={c} title={c} className="h-[52px] w-5 rounded-full" style={{ background: c }} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Story() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  return (
    <div className="bg-[#FBFAF7]">
      <Hero />
      {CHAPTERS.map((ch, k) => <Chapter key={ch.id} ch={ch} flip={k % 2 === 1} />)}
      <Timeline />
      <BrandFilm />
      <Essence />
      <LogoKit />
    </div>
  );
}
