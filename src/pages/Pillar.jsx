import { Link, Navigate, NavLink, useParams } from 'react-router-dom';
import content from '@/data/content';
import { pillarById, regionById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img, pad } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { StatNumber, SourceLine } from '@/components/shared/Stat';
import { StoryCard } from '@/components/shared/StoryCard';
import { IssueCard } from '@/components/shared/IssueCover';
import { CtaBand } from '@/components/shared/CtaBand';

const T = {
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  pillars: { en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' },
  facts: { en: 'Key facts', bn: 'মূল তথ্য' },
  factsH: { en: 'In <em>numbers</em>', bn: 'সংখ্যায় <em>দেখুন</em>' },
  explore: { en: 'Go deeper', bn: 'আরও গভীরে' },
  exploreH: { en: 'Topics <em>to explore</em>', bn: 'আরও যা <em>জানার আছে</em>' },
  steps: { en: 'Setting up a business', bn: 'ব্যবসা শুরুর ধাপ' },
  stepsH: { en: 'Four <em>basic steps</em>', bn: 'চারটি <em>মূল ধাপ</em>' },
  stepsNote: { en: 'Details on incentives, visas and work permits come from the official authorities. We link to them directly.', bn: 'প্রণোদনা, ভিসা ও ওয়ার্ক পারমিটের বিস্তারিত তথ্য দেয় সংশ্লিষ্ট সরকারি কর্তৃপক্ষ। নিচে তাদের ওয়েবসাইটের লিংক দেওয়া হলো।' },
  official: { en: 'Official authorities', bn: 'সরকারি কর্তৃপক্ষ' },
  stories: { en: 'Featured stories', bn: 'নির্বাচিত গল্প' },
  storiesH: { en: 'Stories <em>from this pillar</em>', bn: 'এই স্তম্ভের <em>গল্প</em>' },
  regions: { en: 'Related regions', bn: 'সংশ্লিষ্ট অঞ্চল' },
  issues: { en: 'From the magazine', bn: 'ম্যাগাজিন থেকে' },
  ready: { en: 'Ready to take the next step?', bn: 'পরের ধাপে যেতে প্রস্তুত?' },
  readyP: { en: 'Our team will point you to the right people and the right information.', bn: 'আমাদের দল আপনাকে সঠিক মানুষ আর সঠিক তথ্যের কাছে পৌঁছে দেবে।' },
};

export default function Pillar() {
  const { id } = useParams();
  const { t, num } = useLang();
  const p = pillarById(id);
  useDocumentTitle(p ? t(p.name) : '');
  if (!p) return <Navigate to="/pillars" replace />;

  const stats = content.stats.filter((s) => s.pillar === p.id);
  const own = content.stories.filter((s) => s.pillar === p.id);
  const stories = [...own, ...content.stories.filter((s) => s.pillar !== p.id)].slice(0, 3);
  const issues = content.issues.filter((i) => i.pillars.includes(p.id)).slice(0, 4);
  const ctaTo = p.ctaHref ? p.ctaHref.replace('publication.html', '/publication').replace('community.html', '/community') : `/about?topic=${p.ctaTopic}#contact`;

  return (
    <>
      <PageHero
        key={p.id}
        image={img(p.seed, 1920, 1200)}
        crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.pillars), to: '/pillars' }, { label: t(p.name) }]}
        eyebrow={<><i className={`fa-solid ${p.icon}`} aria-hidden="true" /> {t(p.aud)}</>}
        title={t(p.name)}
        lead={t(p.line)}
      />

      <nav aria-label={t(T.pillars)} className="sticky top-[var(--header-h)] z-20 border-b border-brand-line bg-white/95 backdrop-blur">
        <div className="container hide-scrollbar flex gap-2 overflow-x-auto py-3">
          {content.pillars.map((x) => (
            <NavLink key={x.id} to={`/pillars/${x.id}`} className={({ isActive }) => cn('inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all', isActive ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-line bg-white hover:border-brand-ink')}>
              {({ isActive }) => <><i className={`fa-solid ${x.icon}`} style={{ color: isActive ? '#fff' : x.c }} aria-hidden="true" />{t(x.name)}</>}
            </NavLink>
          ))}
        </div>
      </nav>

      <section className="sec">
        <Reveal className="container max-w-3xl"><p className="lead !text-[clamp(22px,2.6vw,30px)]">{t(p.intro)}</p></Reveal>
      </section>

      {stats.length > 0 && (
        <section className="sec bg-brand-cream">
          <div className="container">
            <SectionHead eyebrow={t(T.facts)} title={t(T.factsH)} />
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.id} delay={i * 80} className="flex flex-col gap-2 rounded-[5px] border border-brand-line bg-white p-6">
                  <StatNumber stat={s} color={p.c} />
                  <p>{t(s.label)}</p>
                  <SourceLine stat={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="container">
          <SectionHead eyebrow={t(T.explore)} title={t(T.exploreH)} />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {p.subs.map((s, i) => (
              <Reveal key={s.en} delay={i * 60}>
                <a href="#" className="group flex items-center justify-between gap-3 rounded-[5px] border border-brand-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-brand" style={{ '--c': p.c }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = p.c)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}>
                  <span className="serif-title text-[22px]"><b className="mr-3 font-medium" style={{ color: p.c, fontFamily: "'Bodoni Moda', serif" }}>{num(pad(i + 1))}</b>{t(s)}</span>
                  <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" style={{ color: p.c }} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.steps && (
        <section className="sec bg-brand-paper">
          <div className="container">
            <SectionHead eyebrow={t(T.steps)} title={t(T.stepsH)} sub={t(T.stepsNote)} />
            <ol className="grid gap-3.5 lg:grid-cols-4">
              {p.steps.map((s, i) => (
                <Reveal as="li" key={s.en} delay={i * 80} className="rounded-[5px] border border-brand-line bg-white p-6">
                  <span className="mb-2 block text-[32px] text-brand-red" style={{ fontFamily: "'Bodoni Moda', serif" }}>{num(pad(i + 1))}</span>
                  <strong className="serif-title text-[21px]">{t(s)}</strong>
                </Reveal>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {['BIDA', 'BEZA', 'BEPZA'].map((a) => (
                <Button key={a} asChild variant="outline" size="sm"><a href="#" rel="noopener">{a} <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" /></a></Button>
              ))}
              <span className="self-center text-xs text-brand-muted">{t(T.official)}</span>
            </div>
          </div>
        </section>
      )}

      <section className={cn('sec', !p.steps && 'bg-brand-cream')}>
        <div className="container">
          <SectionHead eyebrow={t(T.stories)} title={t(T.storiesH)} />
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
          </div>
        </div>
      </section>

      <section className="sec !pt-0">
        <div className="container grid gap-12">
          <div>
            <Reveal as="h2" className="display-sm mb-4">{t(T.regions)}</Reveal>
            <Reveal className="flex flex-wrap gap-2.5">
              {p.regions.map((rid) => {
                const r = regionById(rid);
                return (
                  <Link key={rid} to={`/regions/${rid}`} className="inline-flex items-center gap-2 rounded-full border border-brand-line px-4 py-2.5 font-medium transition hover:border-brand-deep hover:text-brand-deep">
                    <i className="fa-solid fa-location-dot text-brand-gold" aria-hidden="true" />{t(r.name)}
                  </Link>
                );
              })}
            </Reveal>
          </div>
          {issues.length > 0 && (
            <div>
              <Reveal as="h2" className="display-sm mb-6">{t(T.issues)}</Reveal>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">{issues.map((i) => <IssueCard key={i.id} issue={i} />)}</div>
            </div>
          )}
          <CtaBand color={p.id === 'people' ? '#8A6A3B' : p.c} title={t(T.ready)} text={t(T.readyP)}>
            <Button asChild variant="light"><Link to={ctaTo}>{t(p.cta)} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link></Button>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
