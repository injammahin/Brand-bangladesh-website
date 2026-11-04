import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Monument } from './Monument';

/** Large, faint brand mark behind content; its stripes rise into place when it scrolls into view */
export function Watermark({ className, opacity = 0.12 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} className={cn('pointer-events-none absolute -z-[1] select-none', className)} style={{ opacity }} aria-hidden="true">
      {inView && <Monument animated className="h-full w-full overflow-visible" />}
    </div>
  );
}
