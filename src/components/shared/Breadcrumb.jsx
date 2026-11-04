import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/** items: [{ label, to? }] */
export function Breadcrumb({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-2 text-[13px]', light ? 'text-white/80' : 'text-brand-muted')}>
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />}
          {it.to ? <Link to={it.to} className="hover:text-brand-teal">{it.label}</Link> : <span aria-current="page">{it.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
