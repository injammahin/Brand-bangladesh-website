import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { pillarById, regionById } from '@/data/helpers';
import { cn, img } from '@/lib/utils';
import { Reveal } from './Reveal';

export function StoryCard({ story, feature = false, index = 0, className }) {
  const { t, mins } = useLang();
  const p = pillarById(story.pillar);
  const r = regionById(story.region);
  return (
    <Reveal delay={index * 80} className={cn(feature && 'lg:row-span-2', className)}>
      <Link to={`/article/${story.id}`} className="group flex flex-col gap-2.5">
        <div className={cn('img-zoom relative overflow-hidden rounded-[5px] bg-brand-paper after:absolute after:inset-0 after:bg-black/0 after:transition-colors after:duration-500 group-hover:after:bg-black/10', feature ? 'aspect-[16/11]' : 'aspect-[4/3]')}>
          <img src={img(story.seed, feature ? 1920 : 960)} alt={t(story.title)} loading="lazy" width="800" height="600" className="h-full w-full object-cover" />
        </div>
        <span className="kicker" style={{ color: p.c }}>{t(p.name)}</span>
        <h3 className={cn('transition-colors group-hover:text-brand-deep', feature ? 'font-mag text-[clamp(28px,3.2vw,40px)] font-medium leading-[1.1] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug' : 'serif-title text-2xl leading-tight')}>
          {t(story.title)}
        </h3>
        {feature && story.ex && <p className="text-[15px] text-brand-muted">{t(story.ex)}</p>}
        <div className="flex flex-wrap items-center gap-3.5 text-[12.5px] text-brand-muted">
          <span className="inline-flex items-center gap-1.5"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {t(r.name)}</span>
          <span className="inline-flex items-center gap-1.5"><i className="fa-regular fa-clock" aria-hidden="true" /> {mins(story.min)}</span>
        </div>
      </Link>
    </Reveal>
  );
}
