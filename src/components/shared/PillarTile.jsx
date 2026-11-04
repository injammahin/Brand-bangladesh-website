import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { cn, img } from '@/lib/utils';
import { Reveal } from './Reveal';

export function PillarTile({ pillar, index = 0, big = false, className }) {
  const { t, u } = useLang();
  return (
    <Reveal delay={index * 70} className={cn('min-h-[300px]', className)}>
      <Link
        to={`/pillars/${pillar.id}`}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`); }}
        className="spotlight group relative isolate flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[5px] text-white ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-[0_40px_60px_-30px_rgba(0,0,0,.6)] lg:min-h-0"
      >
        <img src={img(pillar.seed, big ? 1920 : 960)} alt="" loading="lazy" width="1000" height="800" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-20% to-[rgba(8,16,15,.86)]" />
        <span className="absolute inset-x-0 bottom-0 h-[5px] origin-left scale-x-[.25] transition-transform duration-500 ease-brand group-hover:scale-x-100" style={{ background: pillar.c }} />
        <div className="relative z-[2] flex flex-col gap-2 p-6 transition-transform duration-500 ease-brand group-hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="grid h-[46px] w-[46px] place-items-center rounded-[5px] bg-white/15 text-lg backdrop-blur"><i className={`fa-solid ${pillar.icon}`} aria-hidden="true" /></span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur">{t(pillar.aud)}</span>
          </div>
          <h3 className={cn('mt-2 font-mag font-medium leading-[1.05] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug', big ? 'text-[clamp(30px,3.6vw,48px)]' : 'text-[clamp(26px,2.8vw,34px)]')}>{t(pillar.name)}</h3>
          <p className="max-w-sm text-[14.5px] text-white/80">{t(pillar.line)}</p>
          <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white/0 py-1 text-[13.5px] font-semibold transition-all duration-500 group-hover:bg-white group-hover:px-4 group-hover:text-black">
            {u('explore')} <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
