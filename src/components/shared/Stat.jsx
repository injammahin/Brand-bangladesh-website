import { useLang } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { CountUp } from './CountUp';

export function StatNumber({ stat, className, color }) {
  const { t } = useLang();
  const dec = Number.isInteger(stat.v) ? 0 : 1;
  return (
    <span className={cn('flex flex-wrap items-baseline gap-1.5 font-mag text-[clamp(36px,5vw,54px)] font-medium leading-none text-brand-deep', className)} style={color ? { color } : undefined}>
      {stat.pre}
      <CountUp value={stat.v} decimals={dec} />
      {stat.suf && <span>{t(stat.suf)}</span>}
      {stat.unit && <small className="font-sans text-sm font-semibold text-brand-gold">{t(stat.unit)}</small>}
    </span>
  );
}

export function SourceLine({ stat, className }) {
  const { t, u, num } = useLang();
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs text-brand-muted', className)}>
      <i className="fa-solid fa-circle-info" aria-hidden="true" />
      {u('source')}: {t(stat.src)}, {num(stat.year)}
    </span>
  );
}
