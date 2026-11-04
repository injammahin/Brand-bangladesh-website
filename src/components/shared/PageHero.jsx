import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Breadcrumb } from './Breadcrumb';

/** Inner-page hero: image (dark) or plain (soft glow) */
export function PageHero({ image, eyebrow, title, lead, crumbs, children, className }) {
  const dark = Boolean(image);
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        dark ? 'on-dark flex min-h-[62svh] items-end bg-brand-night pb-14 pt-32 text-white' : 'pb-12 pt-14',
        className
      )}
    >
      {dark ? (
        <>
          <motion.img
            src={image} alt="" width="1920" height="1200"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.22, 0.8, 0.2, 1] }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(8,16,15,.3)] to-[rgba(8,16,15,.85)]" />
        </>
      ) : (
        <>
          <div className="absolute -right-52 -top-52 -z-10 h-[520px] w-[520px] rounded-full bg-brand-goldsoft opacity-55 blur-[90px]" />
        </>
      )}
      <motion.div
        className="container flex flex-col gap-4"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
      >
        {crumbs && <Breadcrumb items={crumbs} light={dark} />}
        {eyebrow && <span className={cn('eyebrow', dark && 'text-brand-goldsoft')}>{eyebrow}</span>}
        <h1 className="display max-w-5xl" dangerouslySetInnerHTML={{ __html: title }} />
        {lead && <p className={cn('lead max-w-2xl', dark && 'text-white/85')}>{lead}</p>}
        {children}
      </motion.div>
    </section>
  );
}
