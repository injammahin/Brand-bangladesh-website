import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[.08em] [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[13px]',
  {
    variants: {
      variant: {
        default: 'bg-brand-tealsoft text-brand-deep',
        glass: 'bg-white/15 text-white backdrop-blur',
        outline: 'border border-brand-line bg-white text-brand-ink',
        gold: 'bg-brand-gold text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { Badge, badgeVariants };
