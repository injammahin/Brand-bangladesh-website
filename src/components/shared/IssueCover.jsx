import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { cn, img, pad } from '@/lib/utils';

/** Magazine cover built in HTML/CSS (photo + masthead + cover lines) */
export function IssueCover({ issue, small = false, className }) {
  const { t, u, num, monthYear } = useLang();
  return (
    <div className={cn('cover', className)} style={{ background: issue.c }}>
      <img src={img(issue.seed, 700, 940)} alt="" loading="lazy" width="700" height="940" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute left-[8%] right-[6%] top-[6%]">
        <span className={cn('block font-[Bodoni_Moda] font-semibold leading-none tracking-wide', small ? 'text-[15px]' : 'text-[clamp(18px,2.4vw,30px)]')} style={{ fontFamily: "'Bodoni Moda', serif" }}>
          BRAND BANGLADESH
        </span>
        <span className="mt-1.5 flex justify-between border-t border-white/50 pt-1 text-[10px] uppercase tracking-[.16em] [html[lang=bn]_&]:text-[11px] [html[lang=bn]_&]:tracking-normal">
          <span>{u('issue')} {num(pad(issue.no))}</span>
          <span>{monthYear(issue.month, issue.year)}</span>
        </span>
      </div>
      <div className="absolute bottom-[8%] left-[8%] right-[7%]">
        <div className={cn('cover-title', small ? 'text-[26px]' : 'text-[clamp(34px,4.6vw,60px)]')}>{t(issue.title)}</div>
        <div className={cn('mt-2 leading-snug opacity-90', small ? 'text-[11.5px]' : 'text-[13px]')}>{t(issue.dek)}</div>
      </div>
      <span className="stripe absolute inset-x-0 bottom-0 h-1.5" />
      <span className="cover-gloss" />
    </div>
  );
}

export function IssueCard({ issue }) {
  const { t, u, num, monthYear } = useLang();
  return (
    <Link to={`/publication/${issue.id}`} className="group flex flex-col gap-3 [perspective:1200px]">
      <IssueCover issue={issue} small className="transition-transform duration-500 ease-brand group-hover:[transform:rotateY(-10deg)_translateY(-6px)]" />
      <span>
        <small className="text-[13px] text-brand-muted">{u('issue')} {num(pad(issue.no))} · {monthYear(issue.month, issue.year)}</small>
        <strong className="serif-title block text-xl leading-tight">{t(issue.title)}</strong>
      </span>
    </Link>
  );
}
