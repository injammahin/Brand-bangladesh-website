import { Link, Navigate, NavLink, useParams } from 'react-router-dom';
import content from '@/data/content';
import { pillarById, regionById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img } from '@/lib/utils';
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
  regions: { en: 'Regions', bn: 'অঞ্চল' },
  division: { en: 'Division', bn: 'বিভাগ' },
  land: { en: 'Landscape', bn: 'প্রকৃতি' },
  sights: { en: 'Attractions', bn: 'দর্শনীয় স্থান' },
  econ: { en: 'Economy', bn: 'অর্থনীতি' },
  food: { en: 'Food', bn: 'খাবার' },
  pillars: { en: 'Connected pillars', bn: 'সংশ্লিষ্ট স্তম্ভ' },
  stories: { en: 'Stories from <em>{r}</em>', bn: '<em>{r}</em>-এর গল্প' },
  issues: { en: 'In the magazine', bn: 'ম্যাগাজিনে' },
  local: { en: 'Are you from here?', bn: 'আপনি কি এই অঞ্চলের?' },
  localP: { en: 'Share a story or photo from your district. Our team reviews every submission.', bn: 'আপনার জেলার একটি গল্প বা ছবি পাঠান। আমাদের দল প্রতিটি লেখা পড়ে দেখে।' },
  share: { en: 'Share a local story', bn: 'স্থানীয় গল্প পাঠান' },
  none: { en: 'More stories from this region are on the way.', bn: 'এই অঞ্চলের আরও গল্প শিগগিরই আসছে।' },
};

export default function Region() {
  const { id } = useParams();
  const { t } = useLang();
  const r = regionById(id);
  useDocumentTitle(r ? t(r.name) : '');
  if (!r) return <Navigate to="/regions" replace />;

  const stories = content.stories.filter((s) => s.region === r.id);
  const issues = content.issues.filter((i) => i.region === r.id);
  const stats = content.stats.filter((s) => s.region === r.id);
  const facts = [
    ['fa-mountain-sun', T.land, t(r.land)],
    ['fa-landmark', T.sights, r.tags.map((x) => t(x)).join(', ')],
    ['fa-industry', T.econ, t(r.econ)],
    ['fa-bowl-food', T.food, t(r.food)],
  ];

  return (
    <>
      <PageHero key={r.id} image={img(`bb-r-${r.id}`, 1920, 1200)} crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.regions), to: '/regions' }, { label: t(r.name) }]} eyebrow={t(T.division)} title={t(r.name)} lead={t(r.line)} />

      <nav aria-label={t(T.regions)} className="sticky top-[var(--header-h)] z-20 border-b border-brand-line bg-white/95 backdrop-blur">
        <div className="container hide-scrollbar flex gap-2 overflow-x-auto py-3">
          {content.regions.map((x) => (
            <NavLink key={x.id} to={`/regions/${x.id}`} className={({ isActive }) => cn('shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium', isActive ? 'border-brand-deep bg-brand-deep text-white' : 'border-brand-line bg-white hover:border-brand-ink')}>
              {t(x.name)}
            </NavLink>
          ))}
        </div>
      </nav>

      <section className="sec">
        <div className="container">
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {facts.map(([icon, label, val], i) => (
              <Reveal key={icon} delay={i * 80} className="flex gap-3.5 rounded-[5px] bg-brand-cream p-6">
                <i className={`fa-solid ${icon} grid h-11 w-11 shrink-0 place-items-center rounded-[5px] bg-white text-brand-deep`} aria-hidden="true" />
                <div>
                  <small className="kicker block">{t(label)}</small>
                  <strong className="serif-title text-[21px] leading-snug">{val}</strong>
                </div>
              </Reveal>
            ))}
          </div>
          {stats.length > 0 && (
            <div className="mt-4 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {stats.map((s) => (
                <Reveal key={s.id} className="flex flex-col gap-2 rounded-[5px] border border-brand-line bg-white p-6">
                  <StatNumber stat={s} color={pillarById(s.pillar).c} />
                  <p>{t(s.label)}</p>
                  <SourceLine stat={s} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead title={t(T.stories).replace('{r}', t(r.name))} />
          {stories.length ? (
            <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{stories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}</div>
          ) : (
            <p className="rounded-[5px] border border-dashed border-brand-line p-12 text-center text-brand-muted">{t(T.none)}</p>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="container grid gap-12">
          <div>
            <Reveal as="h2" className="display-sm mb-4">{t(T.pillars)}</Reveal>
            <div className="flex flex-wrap gap-2.5">
              {r.pillars.map((pid) => {
                const p = pillarById(pid);
                return (
                  <Link key={pid} to={`/pillars/${pid}`} className="inline-flex items-center gap-2 rounded-full border border-brand-line px-4 py-2.5 font-medium transition hover:border-brand-deep">
                    <i className={`fa-solid ${p.icon}`} style={{ color: p.c }} aria-hidden="true" />{t(p.name)}
                  </Link>
                );
              })}
            </div>
          </div>
          {issues.length > 0 && (
            <div>
              <Reveal as="h2" className="display-sm mb-6">{t(T.issues)}</Reveal>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">{issues.map((i) => <IssueCard key={i.id} issue={i} />)}</div>
            </div>
          )}
          <CtaBand title={t(T.local)} text={t(T.localP)}>
            <Button asChild variant="light"><Link to={`/community?region=${r.id}#submit`}>{t(T.share)} <i className="fa-solid fa-feather" aria-hidden="true" /></Link></Button>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
