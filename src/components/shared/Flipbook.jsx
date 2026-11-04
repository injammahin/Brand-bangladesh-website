import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { articleBody } from '@/data/articleBody';
import { cn, img, pad } from '@/lib/utils';
import { IssueCover } from './IssueCover';

function useIsDesktop() {
  const q = '(min-width: 760px)';
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

function PageNo({ n, side }) {
  const { num } = useLang();
  return <span className={cn('absolute bottom-[3%] text-[11px] text-brand-muted', side === 'left' ? 'left-[8%]' : 'right-[8%]')}>{num(n)}</span>;
}

/** Builds the page list for an issue (in production: rendered from the uploaded PDF) */
function usePages(issue) {
  const { t, u, num, monthYear } = useLang();
  return useMemo(() => {
    const pages = [];
    pages.push({ key: 'cover', render: () => <IssueCover issue={issue} className="!h-full !rounded-none" /> });
    pages.push({
      key: 'toc',
      render: (n, side) => (
        <div className="absolute inset-0 flex flex-col gap-3 bg-white px-[8%] py-[7%]">
          <span className="kicker">{t({ en: 'Contents', bn: 'সূচিপত্র' })}</span>
          <h5 className="font-mag text-[clamp(20px,2.6vw,32px)] font-medium leading-tight">{t(issue.title)}</h5>
          <ol className="mt-2">
            {issue.articles.map((a, k) => (
              <li key={k} className="flex gap-3 border-b border-brand-line py-2 text-[clamp(11px,1.3vw,15px)]">
                <b className="min-w-[26px] text-brand-gold" style={{ fontFamily: "'Bodoni Moda', serif" }}>{num(pad(a.p))}</b>
                <span>{t(a.t)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-auto text-[clamp(10px,1.1vw,13px)] text-brand-muted">{u('issue')} {num(pad(issue.no))} · {monthYear(issue.month, issue.year)}</p>
          <PageNo n={n} side={side} />
        </div>
      ),
    });
    if (issue.note) {
      pages.push({
        key: 'note',
        render: (n, side) => (
          <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-brand-cream px-[10%] py-[8%]">
            <span className="kicker">{t({ en: "Editor's note", bn: 'সম্পাদকের কথা' })}</span>
            <p className="font-serif text-[clamp(13px,1.7vw,21px)] leading-relaxed text-brand-ink2">{t(issue.note)}</p>
            <span className="font-mag italic text-brand-gold">— {t({ en: 'The Editor', bn: 'সম্পাদক' })}</span>
            <PageNo n={n} side={side} />
          </div>
        ),
      });
    }
    issue.articles.forEach((a, k) => {
      const body = articleBody(a.t);
      pages.push({
        key: `a${k}img`,
        render: (n, side) => (
          <div className="absolute inset-0 flex flex-col gap-2.5 bg-white px-[7%] py-[7%]">
            <div className="min-h-0 flex-1 overflow-hidden rounded-md"><img src={img(`${issue.seed}-${k}`, 700, 900)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
            <span className="kicker">{t(a.k)}</span>
            <h5 className="font-mag text-[clamp(18px,2.4vw,30px)] font-medium leading-tight [html[lang=bn]_&]:font-normal">{t(a.t)}</h5>
            <PageNo n={n} side={side} />
          </div>
        ),
      });
      pages.push({
        key: `a${k}txt`,
        render: (n, side) => (
          <div className="absolute inset-0 flex flex-col gap-2.5 bg-white px-[9%] py-[8%]">
            <p className="dropcap font-serif text-[clamp(11px,1.35vw,16px)] leading-relaxed text-brand-ink2">{t(body.intro)}</p>
            {body.paras.map((p, j) => <p key={j} className="font-serif text-[clamp(11px,1.35vw,16px)] leading-relaxed text-brand-ink2">{t(p)}</p>)}
            <blockquote className="mt-auto border-l-4 border-brand-gold pl-3 font-mag text-[clamp(13px,1.7vw,20px)] italic">{t(body.quote)}</blockquote>
            <PageNo n={n} side={side} />
          </div>
        ),
      });
    });
    pages.push({
      key: 'back',
      render: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-brand-cream p-[10%] text-center">
          <img src="/logo.png" alt="Brand Bangladesh" className="w-[70%]" />
          <p className="font-serif text-[clamp(12px,1.5vw,18px)] italic text-brand-muted">{t({ en: 'The story of a nation', bn: 'একটি জাতির গল্প' })}</p>
          <span className="stripe absolute inset-x-0 bottom-0 h-1.5" />
        </div>
      ),
    });
    if (pages.length % 2) pages.splice(pages.length - 1, 0, { key: 'blank', render: () => <div className="absolute inset-0 bg-white" /> });
    return pages;
  }, [issue, t, u, num, monthYear]);
}

export function Flipbook({ issue }) {
  const { t, num } = useLang();
  const desktop = useIsDesktop();
  const pages = usePages(issue);
  const leaves = pages.length / 2;
  const [turned, setTurned] = useState(0); // desktop: leaves turned
  const [page, setPage] = useState(0); // mobile: current page index
  const [dir, setDir] = useState(1);

  const max = desktop ? leaves : pages.length - 1;
  const pos = desktop ? turned : page;
  const go = useCallback((d) => {
    setDir(d);
    if (desktop) setTurned((v) => Math.min(leaves, Math.max(0, v + d)));
    else setPage((v) => Math.min(pages.length - 1, Math.max(0, v + d)));
  }, [desktop, leaves, pages.length]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  let label;
  if (desktop) {
    if (turned === 0) label = t({ en: 'Cover', bn: 'প্রচ্ছদ' });
    else if (turned === leaves) label = t({ en: 'Back cover', bn: 'পেছনের প্রচ্ছদ' });
    else label = `${num(turned * 2)}–${num(turned * 2 + 1)} / ${num(pages.length)}`;
  } else label = `${num(page + 1)} / ${num(pages.length)}`;

  return (
    <div className="rounded-[5px] bg-brand-night px-3.5 py-7 text-white md:px-8 md:py-12" tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="flipbook" aria-label={t({ en: 'Online magazine. Use the arrow keys to turn pages.', bn: 'অনলাইন ম্যাগাজিন। পাতা উল্টাতে অ্যারো কী ব্যবহার করুন।' })}>
      {desktop ? (
        <div className={cn('flip-stage', turned === 0 && 'at-start', turned === leaves && 'at-end')}>
          <div className="flip-book">
            {Array.from({ length: leaves }, (_, k) => {
              const isTurned = k < turned;
              const z = isTurned ? k + 1 : leaves - k;
              return (
                <div key={k} className={cn('leaf', isTurned && 'turned')} style={{ zIndex: z }} onClick={() => go(isTurned ? -1 : 1)}>
                  <div className="face front cursor-pointer shadow-xl">{pages[2 * k].render(2 * k + 1, 'right')}</div>
                  <div className="face back cursor-pointer shadow-xl">{pages[2 * k + 1].render(2 * k + 2, 'left')}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flip-stage">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={page}
              custom={dir}
              className="absolute inset-0 overflow-hidden rounded-[5px] bg-white text-brand-ink shadow-xl"
              initial={{ x: dir > 0 ? '100%' : '-100%', opacity: 0.4 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir > 0 ? '-100%' : '100%', opacity: 0.4 }}
              transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
              onDragEnd={(e, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
            >
              {pages[page].render(page + 1, 'right')}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-3.5">
        <button type="button" onClick={() => go(-1)} disabled={pos === 0} aria-label={t({ en: 'Previous page', bn: 'আগের পাতা' })} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-brand-ink disabled:pointer-events-none disabled:opacity-30">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        </button>
        <span className="min-w-[120px] text-center text-[13px] text-white/75" aria-live="polite">{label}</span>
        <button type="button" onClick={() => go(1)} disabled={pos === max} aria-label={t({ en: 'Next page', bn: 'পরের পাতা' })} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-brand-ink disabled:pointer-events-none disabled:opacity-30">
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-center text-[12.5px] text-white/50">
        {desktop ? t({ en: 'Click a page or use the ← → keys', bn: 'পাতায় ক্লিক করুন বা ← → কী চাপুন' }) : t({ en: 'Swipe to turn the page', bn: 'পাতা উল্টাতে সোয়াইপ করুন' })}
      </p>
    </div>
  );
}
