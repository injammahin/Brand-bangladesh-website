import { Link } from 'react-router-dom';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHero } from '@/components/shared/PageHero';
import { PillarTile } from '@/components/shared/PillarTile';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';

const T = {
  title: { en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'Six pillars', bn: 'ছয়টি স্তম্ভ' },
  h1: { en: 'One country, <em>six doors in</em>', bn: 'একটি দেশ, <em>চেনার ছয়টি পথ</em>' },
  lead: { en: 'Whether you are a traveller, a buyer, an investor or part of the diaspora, start here.', bn: 'আপনি ভ্রমণপ্রেমী, ক্রেতা, বিনিয়োগকারী কিংবা প্রবাসী—যে-ই হোন না কেন, যাত্রা শুরু হোক এখান থেকে।' },
  pathEy: { en: 'Find your path', bn: 'আপনার পথ খুঁজুন' },
  pathH: { en: 'I am <em>a…</em>', bn: 'আমি <em>একজন…</em>' },
};

const PATHS = [
  { icon: 'fa-briefcase', who: { en: 'Investor', bn: 'বিনিয়োগকারী' }, need: { en: 'Sectors, incentives and economic zones', bn: 'খাত, প্রণোদনা ও অর্থনৈতিক অঞ্চল' }, to: '/pillars/investment' },
  { icon: 'fa-boxes-stacked', who: { en: 'Buyer or trade partner', bn: 'ক্রেতা বা বাণিজ্য অংশীদার' }, need: { en: 'What Bangladesh makes and how to source', bn: 'বাংলাদেশে কী তৈরি হয়, কীভাবে আমদানি করবেন' }, to: '/pillars/exports' },
  { icon: 'fa-suitcase-rolling', who: { en: 'Traveller', bn: 'ভ্রমণকারী' }, need: { en: 'Places, seasons and itineraries', bn: 'জায়গা, ঋতু ও ভ্রমণসূচি' }, to: '/pillars/tourism' },
  { icon: 'fa-earth-asia', who: { en: 'Member of the diaspora', bn: 'প্রবাসী' }, need: { en: 'Stay connected and share your story', bn: 'যুক্ত থাকুন, গল্প বলুন' }, to: '/community' },
  { icon: 'fa-microphone-lines', who: { en: 'Journalist or researcher', bn: 'সাংবাদিক বা গবেষক' }, need: { en: 'Facts, reports and approved images', bn: 'তথ্য, প্রতিবেদন ও অনুমোদিত ছবি' }, to: '/publication#media-kit' },
  { icon: 'fa-graduation-cap', who: { en: 'Citizen or student', bn: 'নাগরিক বা শিক্ষার্থী' }, need: { en: "Help tell the country's story", bn: 'দেশের গল্প বলায় অংশ নিন' }, to: '/community#submit' },
];

export default function Pillars() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)} />
      <section className="pb-24 pt-5">
        <div className="container grid gap-3.5 sm:grid-cols-2 lg:auto-rows-[360px] lg:grid-cols-3">
          {content.pillars.map((p, i) => <PillarTile key={p.id} pillar={p} index={i} />)}
        </div>
      </section>
      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead center eyebrow={t(T.pathEy)} title={t(T.pathH)} />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {PATHS.map((p, i) => (
              <Reveal key={p.to} delay={i * 60}>
                <Link to={p.to} className="group grid grid-cols-[48px_1fr_auto] items-center gap-3.5 rounded-[5px] border border-brand-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-deep hover:shadow-brand">
                  <span className="grid h-12 w-12 place-items-center rounded-[5px] bg-brand-tealsoft text-lg text-brand-deep"><i className={`fa-solid ${p.icon}`} aria-hidden="true" /></span>
                  <span><strong className="serif-title block text-[21px] leading-tight">{t(p.who)}</strong><small className="text-[13.5px] text-brand-muted">{t(p.need)}</small></span>
                  <i className="fa-solid fa-arrow-right text-brand-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
