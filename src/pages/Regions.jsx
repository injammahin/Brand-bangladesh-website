import { useState } from 'react';
import { Link } from 'react-router-dom';
import content from '@/data/content';
import { pillarById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { img } from '@/lib/utils';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { BdMap, RegionPanel } from '@/components/shared/BdMap';

const T = {
  title: { en: 'Regions', bn: 'অঞ্চল' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'Eight divisions', bn: 'আটটি বিভাগ' },
  h1: { en: 'Every corner <em>has its own story</em>', bn: 'প্রতিটি প্রান্তের আছে <em>নিজস্ব গল্প</em>' },
  lead: { en: 'Pick a division on the map, or open one straight from the list below. The map also works with Tab and Enter on a keyboard.', bn: 'মানচিত্রে একটি বিভাগ বেছে নিন, অথবা নিচের তালিকা থেকে সরাসরি খুলুন। কিবোর্ডের Tab ও Enter দিয়েও মানচিত্রটি ব্যবহার করা যায়।' },
  allEy: { en: 'All divisions', bn: 'সব বিভাগ' },
  allH: { en: 'Browse <em>by region</em>', bn: 'অঞ্চল ধরে <em>ঘুরে দেখুন</em>' },
  later: { en: 'District-level pages will be added in a later phase.', bn: 'জেলাভিত্তিক পাতা পরবর্তী ধাপে যুক্ত হবে।' },
};

export default function Regions() {
  const { t } = useLang();
  const [active, setActive] = useState('dhaka');
  useDocumentTitle(t(T.title));
  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)} />
      <section className="pb-24 pt-2">
        <div className="container grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <BdMap active={active} onSelect={setActive} />
          <RegionPanel id={active} />
        </div>
      </section>
      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead eyebrow={t(T.allEy)} title={t(T.allH)} />
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {content.regions.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 80}>
                <Link to={`/regions/${r.id}`} className="group flex flex-col gap-2.5">
                  <div className="img-zoom aspect-[4/3] overflow-hidden rounded-[5px] bg-brand-paper">
                    <img src={img(`bb-r-${r.id}`, 800, 600)} alt={t(r.name)} loading="lazy" width="800" height="600" className="h-full w-full object-cover" />
                  </div>
                  <span className="kicker">{r.pillars.map((pid) => t(pillarById(pid).name)).join(' · ')}</span>
                  <h3 className="serif-title text-2xl transition-colors group-hover:text-brand-deep">{t(r.name)}</h3>
                  <p className="text-[15px] text-brand-muted">{t(r.line)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-brand-muted"><i className="fa-solid fa-circle-info" aria-hidden="true" /> {t(T.later)}</p>
        </div>
      </section>
    </>
  );
}
