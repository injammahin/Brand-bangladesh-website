import * as React from 'react';
import { cn } from '@/lib/utils';

/** Native select styled like shadcn inputs — best for mobile & accessibility */
const NativeSelect = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        'flex min-h-[50px] w-full appearance-none rounded-[5px] border border-input bg-brand-cream pl-4 pr-10 text-[15px] focus-visible:border-brand-teal focus-visible:bg-white focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" aria-hidden="true" />
  </div>
));
NativeSelect.displayName = 'NativeSelect';
export { NativeSelect };
