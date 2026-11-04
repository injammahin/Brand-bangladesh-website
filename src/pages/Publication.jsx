import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { img, pad } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NativeSelect } from '@/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { IssueCard, IssueCover } from '@/components/shared/IssueCover';

const T = {
  title: { en: 'Publication', bn: 'প্রকাশনা' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'Brand Bangladesh Magazine', bn: 'ব্র্যান্ড বাংলাদেশ ম্যাগাজিন' },
  h1: { en: 'A country, <em>one issue at a time</em>', bn: 'একটি দেশ, <em>প্রতি সংখ্যায় নতুন করে</em>' },
  lead: { en: 'Themed monthly issues with strong photography and long-form features. Read them online like a real magazine, or download the PDF.', bn: 'প্রতি মাসে একটি বিষয় ঘিরে নতুন সংখ্যা—চোখ জুড়ানো আলোকচিত্র আর গভীর ফিচারে সাজানো। আসল ম্যাগাজিনের মতো অনলাইনে পাতা উল্টে পড়ুন, অথবা পিডিএফ নামিয়ে নিন।' },
  latest: { en: 'Latest issue', bn: 'সর্বশেষ সংখ্যা' },
  archiveEy: { en: 'Archive', bn: 'আর্কাইভ' },
  archiveH: { en: 'All <em>issues</em>', bn: 'সব <em>সংখ্যা</em>' },
  year: { en: 'Year', bn: 'বছর' },
  month: { en: 'Month', bn: 'মাস' },
  theme: { en: 'Theme', bn: 'বিষয়' },
  allYears: { en: 'All years', bn: 'সব বছর' },
  allMonths: { en: 'All months', bn: 'সব মাস' },
  searchIssues: { en: 'Search issues and articles', bn: 'সংখ্যা ও লেখা খুঁজুন' },
  found: { en: '{n} issues', bn: '{n}টি সংখ্যা' },
  none: { en: 'No issues match. Try another theme or year.', bn: 'কোনো সংখ্যা মেলেনি। অন্য বিষয় বা বছর বেছে দেখুন।' },
  reset: { en: 'Reset filters', bn: 'ফিল্টার মুছুন' },
  reportsEy: { en: 'Other publications', bn: 'অন্যান্য প্রকাশনা' },
  reportsH: { en: 'Reports, brochures <em>and press</em>', bn: 'প্রতিবেদন, ব্রোশিওর <em>ও প্রেস</em>' },
  all: { en: 'All', bn: 'সব' },
  report: { en: 'Reports', bn: 'প্রতিবেদন' },
  brochure: { en: 'Brochures', bn: 'ব্রোশিওর' },
  press: { en: 'Press releases', bn: 'প্রেস বিজ্ঞপ্তি' },
  download: { en: 'Download', bn: 'ডাউনলোড' },
  kitEy: { en: 'For journalists', bn: 'সাংবাদিকদের জন্য' },
  kitH: { en: 'Media <em>kit</em>', bn: 'মিডিয়া <em>কিট</em>' },
  kitSub: { en: 'Approved logos, photographs and guidelines you can use with confidence. Please credit the photographer.', bn: 'অনুমোদিত লোগো, ছবি ও নির্দেশিকা—নিশ্চিন্তে ব্যবহার করুন। আলোকচিত্রীর নাম উল্লেখ করুন।' },
  logos: { en: 'Logos', bn: 'লোগো' },
  logosP: { en: 'PNG and SVG, full colour, one colour and reversed.', bn: 'পিএনজি ও এসভিজি ফরম্যাটে—পূর্ণ রঙিন, এক রঙা ও গাঢ় পটভূমির সংস্করণ।' },
  photos: { en: 'Approved photos', bn: 'অনুমোদিত ছবি' },
  photosP: { en: 'High-resolution images of people, places and industry.', bn: 'মানুষ, স্থান ও শিল্পের উচ্চ রেজোলিউশনের ছবি।' },
  guide: { en: 'Brand guidelines', bn: 'ব্র্যান্ড নির্দেশিকা' },
  guideP: { en: 'How to use the identity, colours and typography correctly.', bn: 'লোগো, রং ও টাইপোগ্রাফি সঠিকভাবে ব্যবহারের নিয়ম।' },
  pressContact: { en: 'Media enquiry', bn: 'গণমাধ্যম যোগাযোগ' },
};

const ICONS = { report: ['fa-chart-pie', 'bg-[#FDEBE6] text-brand-red'], brochure: ['fa-map', 'bg-[#FFF3DE] text-brand-orange'], press: ['fa-newspaper', 'bg-brand-tealsoft text-brand-deep'] };

export default function Publication() {
  const { t, u, num, monthName, mins } = useLang();
  useDocumentTitle(t(T.title));
  const [year, setYear] = useState('all');
  const [month, setMonth] = useState('all');
  const [theme, setTheme] = useState('all');
  const [q, setQ] = useState('');
  const latest = content.issues[0];

  const years = [...new Set(content.issues.map((i) => i.year))].sort((a, b) => b - a);
  const issues = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return content.issues.filter((i) =>
      (year === 'all' || i.year === +year) &&
      (month === 'all' || i.month === +month) &&
      (theme === 'all' || i.theme === theme) &&
      (!ql || [i.title, i.dek, ...i.articles.map((a) => a.t)].some((o) => `${o.en} ${o.bn}`.toLowerCase().includes(ql)))
    );
  }, [year, month, theme, q]);
  const reset = () => { setYear('all'); setMonth('all'); setTheme('all'); setQ(''); };
  const dl = (name) => toast(`${name} — ${u('downloading')}`);

  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)} />

      {/* Latest issue spotlight */}
      <section className="pb-20">
        <div className="container">
          <Reveal className="grid items-center gap-8 overflow-hidden rounded-[5px] bg-brand-night p-6 text-white md:grid-cols-[300px_1fr] md:p-12 lg:gap-14">
            <Link to={`/publication/${latest.id}`} className="group mx-auto block w-full max-w-[300px] [perspective:1400px]"><IssueCover issue={latest} className="tilt" /></Link>
            <div className="on-dark flex flex-col gap-4">
              <span className="eyebrow text-brand-goldsoft">{t(T.latest)} · {u('issue')} {num(pad(latest.no))}</span>
              <h2 className="display-md text-white">{t(latest.title)}</h2>
              <p className="lead text-white/80">{t(latest.dek)}</p>
              <ul className="grid gap-2 text-white/80 sm:grid-cols-2">
                {latest.articles.map((a, k) => (
                  <li key={k}><Link to={`/publication/${latest.id}/${k}`} className="flex gap-2 hover:text-white"><i className="fa-solid fa-angle-right mt-1.5 text-xs text-brand-gold2" aria-hidden="true" />{t(a.t)}</Link></li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild variant="light"><Link to={`/publication/${latest.id}#flipbook`}><i className="fa-solid fa-book-open-reader" aria-hidden="true" /> {u('readOnline')}</Link></Button>
                <Button variant="outline-light" onClick={() => dl(`${t(latest.title)}.pdf`)}><i className="fa-solid fa-file-arrow-down" aria-hidden="true" /> {u('pdf')}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Archive */}
      <section className="sec bg-brand-cream" id="archive">
        <div className="container">
          <SectionHead eyebrow={t(T.archiveEy)} title={t(T.archiveH)} />
          <div className="mb-4 hide-scrollbar flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t(T.theme)}>
            {content.themes.map((th) => (
              <button key={th.id} type="button" aria-pressed={theme === th.id} onClick={() => setTheme(th.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${theme === th.id ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-line bg-white hover:border-brand-ink'}`}>
                {t(th)}
              </button>
            ))}
          </div>
          <div className="mb-8 flex flex-col gap-2.5 md:flex-row">
            <div className="relative flex-1">
              <label htmlFor="iss-q" className="sr-only">{t(T.searchIssues)}</label>
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
              <input id="iss-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(T.searchIssues)} className="min-h-[46px] w-full rounded-full border border-brand-line bg-white pl-11 pr-4 outline-none focus:border-brand-teal" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:w-[360px]">
              <div>
                <label htmlFor="iss-y" className="sr-only">{t(T.year)}</label>
                <NativeSelect id="iss-y" value={year} onChange={(e) => setYear(e.target.value)} className="min-h-[46px] rounded-full bg-white">
                  <option value="all">{t(T.allYears)}</option>
                  {years.map((y) => <option key={y} value={y}>{num(y)}</option>)}
                </NativeSelect>
              </div>
              <div>
                <label htmlFor="iss-m" className="sr-only">{t(T.month)}</label>
                <NativeSelect id="iss-m" value={month} onChange={(e) => setMonth(e.target.value)} className="min-h-[46px] rounded-full bg-white">
                  <option value="all">{t(T.allMonths)}</option>
                  {Array.from({ length: 12 }, (_, k) => <option key={k} value={k + 1}>{monthName(k + 1)}</option>)}
                </NativeSelect>
              </div>
            </div>
          </div>
          <p className="mb-6 text-sm text-brand-muted" aria-live="polite">{t(T.found).replace('{n}', num(issues.length))}</p>
          <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            <AnimatePresence mode="popLayout">
              {issues.map((i, k) => (
                <motion.div key={i.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, delay: k * 0.04 }}>
                  <IssueCard issue={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {!issues.length && (
            <div className="rounded-[5px] border border-dashed border-brand-line p-12 text-center text-brand-muted">
              <p>{t(T.none)}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={reset}>{t(T.reset)}</Button>
            </div>
          )}
        </div>
      </section>

      {/* Reports */}
      <section className="sec" id="reports">
        <div className="container">
          <SectionHead eyebrow={t(T.reportsEy)} title={t(T.reportsH)} />
          <Tabs defaultValue="all">
            <TabsList aria-label={t(T.reportsEy)}>
              {['all', 'report', 'brochure', 'press'].map((k) => <TabsTrigger key={k} value={k}>{t(T[k])}</TabsTrigger>)}
            </TabsList>
            {['all', 'report', 'brochure', 'press'].map((k) => (
              <TabsContent key={k} value={k}>
                <div className="grid gap-3 md:grid-cols-2">
                  {content.reports.filter((r) => k === 'all' || r.type === k).map((r) => (
                    <div key={r.title.en} className="grid grid-cols-[52px_1fr] items-center gap-4 rounded-[5px] border border-brand-line bg-white p-4 transition hover:border-brand-deep md:grid-cols-[52px_1fr_auto]">
                      <span className={`grid h-[52px] w-[52px] place-items-center rounded-[5px] text-xl ${ICONS[r.type][1]}`}><i className={`fa-solid ${ICONS[r.type][0]}`} aria-hidden="true" /></span>
                      <div>
                        <h3 className="serif-title text-xl leading-snug">{t(r.title)}</h3>
                        <span className="text-[12.5px] text-brand-muted">{t(T[r.type])} · {t(r.date)} · PDF {r.size}</span>
                      </div>
                      <Button variant="outline" size="sm" className="col-span-2 justify-self-start md:col-span-1" onClick={() => dl(`${t(r.title)}.pdf`)}>
                        <i className="fa-solid fa-download" aria-hidden="true" /> {t(T.download)}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Media kit */}
      <section className="sec bg-brand-paper scroll-mt-24" id="media-kit">
        <div className="container">
          <SectionHead center eyebrow={t(T.kitEy)} title={t(T.kitH)} sub={t(T.kitSub)} />
          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal className="flex flex-col gap-3 rounded-[5px] border border-brand-line bg-white p-7">
              <div className="grid h-[130px] place-items-center rounded-[5px] bg-brand-cream p-5"><img src="/logo.png" alt={t({ en: 'Brand Bangladesh logo', bn: 'ব্র্যান্ড বাংলাদেশ লোগো' })} className="max-h-20 w-auto" /></div>
              <h3 className="serif-title text-2xl">{t(T.logos)}</h3>
              <p className="text-[14.5px] text-brand-muted">{t(T.logosP)}</p>
              <Button asChild variant="outline" size="sm" className="mt-auto self-start"><a href="/logo.png" download="brand-bangladesh-logo.png"><i className="fa-solid fa-download" aria-hidden="true" /> PNG</a></Button>
            </Reveal>
            <Reveal delay={80} className="flex flex-col gap-3 rounded-[5px] border border-brand-line bg-white p-7">
              <div className="grid h-[130px] grid-cols-3 gap-1 overflow-hidden rounded-[5px]">
                {['bb-hero-tea', 'bb-hero-coast', 'bb-p-culture'].map((s) => <img key={s} src={img(s, 300, 300)} alt="" loading="lazy" className="h-full w-full object-cover" />)}
              </div>
              <h3 className="serif-title text-2xl">{t(T.photos)}</h3>
              <p className="text-[14.5px] text-brand-muted">{t(T.photosP)}</p>
              <Button variant="outline" size="sm" className="mt-auto self-start" onClick={() => dl('Brand-Bangladesh-Photos.zip')}><i className="fa-solid fa-images" aria-hidden="true" /> ZIP</Button>
            </Reveal>
            <Reveal delay={160} className="flex flex-col gap-3 rounded-[5px] border border-brand-line bg-white p-7">
              <div className="grid h-[130px] grid-cols-4 overflow-hidden rounded-[5px]">
                {['#D71920', '#F38020', '#FBC111', '#0E5B5C', '#141414', '#EE1B5B', '#A4CB3A', '#C9A062'].map((c) => <span key={c} style={{ background: c }} />)}
              </div>
              <h3 className="serif-title text-2xl">{t(T.guide)}</h3>
              <p className="text-[14.5px] text-brand-muted">{t(T.guideP)}</p>
              <Button variant="outline" size="sm" className="mt-auto self-start" onClick={() => dl('Brand-Bangladesh-Guidelines.pdf')}><i className="fa-solid fa-file-pdf" aria-hidden="true" /> PDF</Button>
            </Reveal>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="teal"><Link to="/about?topic=media#contact"><i className="fa-solid fa-envelope" aria-hidden="true" /> {t(T.pressContact)}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
