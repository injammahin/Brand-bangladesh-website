import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex min-h-[50px] w-full rounded-[5px] border border-input bg-brand-cream px-4 py-3 text-[15px] transition-colors placeholder:text-muted-foreground focus-visible:border-brand-teal focus-visible:bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';
export { Input };
