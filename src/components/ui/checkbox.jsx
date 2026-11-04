import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer mt-0.5 h-5 w-5 shrink-0 rounded-md border border-brand-line bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow data-[state=checked]:border-brand-deep data-[state=checked]:bg-brand-deep data-[state=checked]:text-white aria-[invalid=true]:border-destructive',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-[11px]">
      <i className="fa-solid fa-check" aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
