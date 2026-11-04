import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-[14.5px] font-semibold transition-all duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-ink text-white hover:bg-brand-deep hover:-translate-y-0.5',
        teal: 'bg-brand-deep text-white hover:bg-brand-teal',
        gold: 'bg-brand-gold text-white hover:bg-[#A37740]',
        outline: 'border border-brand-line bg-white hover:border-brand-ink',
        light: 'bg-white text-brand-ink hover:bg-brand-goldsoft',
        'outline-light': 'border border-white/45 text-white hover:bg-white hover:text-brand-ink',
        ghost: 'hover:bg-brand-cream',
        link: 'text-brand-deep underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-[50px] px-6',
        sm: 'min-h-[42px] px-4 text-[13.5px]',
        lg: 'min-h-[56px] px-8 text-base',
        icon: 'h-[42px] w-[42px] shrink-0 border border-brand-line bg-white text-brand-ink hover:translate-y-0 hover:border-brand-teal hover:bg-white hover:text-brand-teal',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
