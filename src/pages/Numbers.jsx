import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import content from '@/data/content';
import { pillarById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn } from '@/lib/utils';
import { NativeSelect } from '@/components/ui/native-select';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/PageHero';
import { StatNumber, SourceLine } from '@/components/shared/Stat';

const T = {
  title: { en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'Facts you can trust', bn: 'যে তথ্যে ভরসা রাখা যায়' },
  h1: { en: 'Every number <em>has a story</em>', bn: 'প্রতিটি সংখ্যার <em>পেছনে একটি গল্প</em>' },
  lead: { en: 'Key national figures, each with its source and year, paired with the people who make them real.', bn: 'দেশের গুরুত্বপূর্ণ পরিসংখ্যান, প্রতিটির সঙ্গে উৎস ও সাল—আর সেই মানুষদের গল্প, যাঁদের হাত ধরে সংখ্যাগুলো সত্যি হয়ে উঠেছে।' },
  allPillars: { en: 'All pillars', bn: 'সব স্তম্ভ' },
  allRegions: { en: 'All regions', bn: 'সব অঞ্চল' },
  filterRegion: { en: 'Filter by region', bn: 'অঞ্চল অনুযায়ী' },
  filterPillar: { en: 'Filter by pillar', bn: 'স্তম্ভ অনুযায়ী' },
  showing: { en: 'Showing {n} figures', bn: '{n}টি পরিসংখ্যান দেখানো হচ্ছে' },
  infographic: { en: 'Infographic', bn: 'ইনফোগ্রাফিক' },
  none: { en: 'No figures match these filters yet.', bn: 'এই ফিল্টারে এখনো কোনো পরিসংখ্যান নেই।' },
  trend: { en: 'Indexed trend, latest year = 100', bn: 'সূচক প্রবণতা, সর্বশেষ বছর = ১০০' },
  note: { en: 'Placeholder figures for the design. Each one must be verified against its official source before launch.', bn: 'ডিজাইনের জন্য নমুনা পরিসংখ্যান। প্রকাশের আগে প্রতিটি সরকারি উৎসের সঙ্গে মিলিয়ে নিতে হবে।' },
};

/** Draw a shareable PNG card in the browser and download it */
async function downloadInfographic(stat, { t, fmt, num }) {
  await document.fonts?.ready;
  const p = pillarById(stat.pillar);
  const W = 1080, H = 1080;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#FBF8F2'; x.fillRect(0, 0, W, H);
  ['#D71920', '#F38020', '#FBC111', '#0E5B5C', '#141414', '#EE1B5B'].forEach((col, i) => { x.fillStyle = col; x.fillRect((W / 6) * i, H - 18, W / 6 + 1, 18); });
  x.fillStyle = p.c; x.fillRect(80, 120, 120, 8);
  const body = getComputedStyle(document.documentElement).getPropertyValue('--f-body');
  const mag = getComputedStyle(document.documentElement).getPropertyValue('--f-mag');
  x.fillStyle = '#B8894A'; x.font = `600 34px ${body}`; x.fillText(t(p.name).toUpperCase(), 80, 200);
  const value = `${stat.pre || ''}${fmt(stat.v, Number.isInteger(stat.v) ? 0 : 1)}${stat.suf ? t(stat.suf) : ''}`;
  x.fillStyle = p.c; x.font = `500 230px ${mag}`; x.fillText(value, 70, 470);
  if (stat.unit) { x.fillStyle = '#B8894A'; x.font = `600 54px ${body}`; x.fillText(t(stat.unit), 86, 560); }
  x.fillStyle = '#15201F'; x.font = `500 58px ${body}`;
  const words = t(stat.label).split(' ');
  let line = '', y = 690;
  words.forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (x.measureText(test).width > W - 160) { x.fillText(line, 80, y); line = w; y += 72; } else line = test;
  });
  x.fillText(line, 80, y);
  x.fillStyle = '#66706E'; x.font = `400 30px ${body}`;
  x.fillText(`${t({ en: 'Source', bn: 'উৎস' })}: ${t(stat.src)}, ${num(stat.year)}`, 80, H - 150);
  x.fillStyle = '#0E5B5C'; x.font = `600 38px 'Cormorant Garamond', serif`; x.fillText('BRAND BANGLADESH', 80, H - 80);
  const a = document.createElement('a');
  a.href = c.toDataURL('image/png');
  a.download = `brand-bangladesh-${stat.id}.png`;
  a.click();
}

function NumberCard({ stat, index }) {
  const L = useLang();
  const { t } = L;
  const p = pillarById(stat.pillar);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex flex-col gap-3 rounded-[5px] border border-brand-line bg-white p-7 transition-shadow hover:shadow-brand"
    >
      <Badge variant="outline" className="self-start" style={{ background: `color-mix(in srgb, ${p.c} 12%, #fff)`, borderColor: 'transparent' }}>
        <i className={`fa-solid ${p.icon}`} style={{ color: p.c }} aria-hidden="true" /> {t(p.name)}
      </Badge>
      <StatNumber stat={stat} color={p.c} />
      <p className="text-brand-ink2">{t(stat.label)}</p>
      {stat.chart && (
        <div className="mt-1" aria-label={t(T.trend)} role="img">
          <div className="flex h-16 items-end gap-1.5">
            {stat.chart.map((h, j) => (
              <motion.span
                key={j}
                className="flex-1 rounded-t"
                style={{ background: j === stat.chart.length - 1 ? p.c : `color-mix(in srgb, ${p.c} 30%, #fff)` }}
                initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: j * 0.07, ease: [0.22, 0.8, 0.2, 1] }}
              />
            ))}
          </div>
          <small className="mt-1 block text-[11px] text-brand-muted">{t(T.trend)}</small>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <SourceLine stat={stat} />
        <button type="button" onClick={() => downloadInfographic(stat, L)} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-deep hover:underline">
          <i className="fa-solid fa-image" aria-hidden="true" /> {t(T.infographic)}
        </button>
      </div>
      <Link to={stat.link || '/community'} className="group mt-auto flex items-center gap-2.5 border-t border-dashed border-brand-line pt-3.5 text-sm font-medium">
        <i className="fa-solid fa-feather" style={{ color: p.c }} aria-hidden="true" />
        <span className="flex-1">{t(stat.story)}</span>
        <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

export default function Numbers() {
  const { t, num } = useLang();
  const [pillar, setPillar] = useState('all');
  const [region, setRegion] = useState('all');
  useDocumentTitle(t(T.title));

  const list = useMemo(
    () => content.stats.filter((s) => (pillar === 'all' || s.pillar === pillar) && (region === 'all' || s.region === region)),
    [pillar, region]
  );

  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)} />
      <section className="pb-24 pt-2">
        <div className="container">
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label={t(T.filterPillar)} className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
              {[{ id: 'all', name: T.allPillars }, ...content.pillars].map((p) => (
                <button
                  key={p.id} type="button" aria-pressed={pillar === p.id} onClick={() => setPillar(p.id)}
                  className={cn('shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition', pillar === p.id ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-line bg-white hover:border-brand-ink')}
                >
                  {t(p.name)}
                </button>
              ))}
            </div>
            <div className="w-full lg:w-60">
              <label htmlFor="num-region" className="sr-only">{t(T.filterRegion)}</label>
              <NativeSelect id="num-region" value={region} onChange={(e) => setRegion(e.target.value)} className="min-h-[44px] rounded-full bg-white">
                <option value="all">{t(T.allRegions)}</option>
                {content.regions.map((r) => <option key={r.id} value={r.id}>{t(r.name)}</option>)}
              </NativeSelect>
            </div>
          </div>
          <p className="mb-5 text-sm text-brand-muted" aria-live="polite">{t(T.showing).replace('{n}', num(list.length))}</p>
          <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((s, i) => <NumberCard key={s.id} stat={s} index={i} />)}
            {!list.length && <p className="col-span-full rounded-[5px] border border-dashed border-brand-line p-12 text-center text-brand-muted">{t(T.none)}</p>}
          </motion.div>
          <p className="mt-10 inline-flex items-start gap-2 text-xs text-brand-muted"><i className="fa-solid fa-triangle-exclamation mt-0.5" aria-hidden="true" /> {t(T.note)}</p>
        </div>
      </section>
    </>
  );
}
