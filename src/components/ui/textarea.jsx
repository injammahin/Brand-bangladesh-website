import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[150px] w-full resize-y rounded-[5px] border border-input bg-brand-cream px-4 py-3 text-[15px] placeholder:text-muted-foreground focus-visible:border-brand-teal focus-visible:bg-white focus-visible:outline-none aria-[invalid=true]:border-destructive',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
export { Textarea };
