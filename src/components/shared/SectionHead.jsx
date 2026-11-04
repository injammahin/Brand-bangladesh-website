import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/** Eyebrow + display heading (+ optional sub and right-hand action) */
export function SectionHead({ eyebrow, title, sub, action, center = false, className, dark = false }) {
  if (center) {
    return (
      <Reveal className={cn('mb-10 flex flex-col items-center gap-3 text-center', dark && 'on-dark', className)}>
        {eyebrow && <span className={cn('eyebrow', dark && 'text-brand-goldsoft')}>{eyebrow}</span>}
        <h2 className={cn('display-md', dark && 'text-white')} dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className={cn('mx-auto max-w-xl', dark ? 'text-white/70' : 'text-brand-muted')}>{sub}</p>}
      </Reveal>
    );
  }
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-4 border-b border-brand-line pb-5 md:flex-row md:items-end md:justify-between', dark && 'on-dark border-white/15', className)}>
      <div className="flex flex-col gap-3">
        {eyebrow && <span className={cn('eyebrow', dark && 'text-brand-goldsoft')}>{eyebrow}</span>}
        <h2 className={cn('display-md', dark && 'text-white')} dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="max-w-xl text-brand-muted">{sub}</p>}
      </div>
      {action}
    </Reveal>
  );
}
