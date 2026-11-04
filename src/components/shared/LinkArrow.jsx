import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function LinkArrow({ to, children, className, light = false, ...props }) {
  return (
    <Link to={to} className={cn('group inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold', light ? 'text-white' : 'text-brand-deep', className)} {...props}>
      <span>{children}</span>
      <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
