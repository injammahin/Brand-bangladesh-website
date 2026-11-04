import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { articleBody } from '@/data/articleBody';
import { cn, img, pad } from '@/lib/utils';
import { IssueCover } from './IssueCover';
import { Monument } from './Monument';

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
  return <span className={cn('absolute bottom-[3.5%] z-[4] font-mag text-[12px] text-brand-muted', side === 'left' ? 'left-[8%]' : 'right-[8%]')}>{num(n)}</span>;
}

/** Small running header like a printed magazine */
function RunHead({ issue, side }) {
  const { u, num } = useLang();
  return (
    <span className={cn('absolute top-[4%] z-[4] flex items-center gap-2 text-[9.5px] uppercase tracking-[.2em] text-brand-muted [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal [html[lang=bn]_&]:text-[11px]', side === 'left' ? 'left-[8%]' : 'right-[8%]')}>
      <span className="stripe h-[2px] w-4" /> Brand Bangladesh · {u('issue')} {num(pad(issue.no))}
    </span>
  );
}

/** Builds the page list for an issue (in production: rendered from the uploaded PDF) */
function usePages(issue) {
  const { t, u, num, monthYear, mins } = useLang();
  return useMemo(() => {
    const pages = [];
    pages.push({ key: 'cover', render: () => <IssueCover issue={issue} className="!h-full !rounded-none !shadow-none" /> });
    pages.push({
      key: 'toc',
      render: (n, side) => (
        <div className="absolute inset-0 flex flex-col px-[8%] pb-[8%] pt-[11%]">
          <RunHead issue={issue} side={side} />
          <span className="kicker">{t({ en: 'Contents', bn: 'সূচিপত্র' })}</span>
          <h5 className="mt-1 font-mag text-[clamp(22px,2.8vw,36px)] font-medium leading-tight [html[lang=bn]_&]:font-normal">{t(issue.title)}</h5>
          <span className="stripe mt-3 h-[3px] w-12" />
          <ol className="mt-4 flex flex-1 flex-col justify-center gap-[3%]">
            {issue.articles.map((a, k) => (
              <li key={k} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-brand-line/80 pb-[3%]">
                <span className="h-[clamp(34px,4.2vw,52px)] w-[clamp(34px,4.2vw,52px)] overflow-hidden rounded-[3px]"><img src={img(`${issue.seed}-${k}`, 400)} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                <span className="min-w-0">
                  <small className="block text-[clamp(9px,.9vw,11px)] font-semibold uppercase tracking-[.14em] text-brand-gold [html[lang=bn]_&]:normal-case [html[lang=bn]_&]:tracking-normal">{t(a.k)} · {mins(a.min)}</small>
                  <span className="block font-serif text-[clamp(12px,1.35vw,17px)] font-semibold leading-snug [html[lang=bn]_&]:font-normal">{t(a.t)}</span>
                </span>
                <b className="font-mag text-[clamp(18px,2vw,26px)] font-medium text-brand-gold">{num(pad(a.p))}</b>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[clamp(10px,1vw,12px)] text-brand-muted">{u('issue')} {num(pad(issue.no))} · {monthYear(issue.month, issue.year)}</p>
          <PageNo n={n} side={side} />
        </div>
      ),
    });
    if (issue.note) {
      pages.push({
        key: 'note',
        render: (n, side) => (
          <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-[#FBF5EA] px-[11%] py-[10%]">
            <RunHead issue={issue} side={side} />
            <span className="font-mag text-[clamp(60px,8vw,110px)] leading-[.6] text-brand-gold/70">&ldquo;</span>
            <span className="kicker">{t({ en: "Editor's note", bn: 'সম্পাদকের কথা' })}</span>
            <p className="font-serif text-[clamp(13px,1.65vw,20px)] leading-relaxed text-brand-ink2">{t(issue.note)}</p>
            <span className="mt-2 flex items-center gap-3 font-mag italic text-brand-gold [html[lang=bn]_&]:not-italic"><span className="h-px w-10 bg-brand-gold" /> {t({ en: 'The Editor', bn: 'সম্পাদক' })}</span>
            <Monument className="absolute bottom-[7%] right-[9%] h-[12%] w-[12%] opacity-25" />
            <PageNo n={n} side={side} />
          </div>
        ),
      });
    }
    issue.articles.forEach((a, k) => {
      const body = articleBody(a.t);
      pages.push({
        key: `a${k}img`,
        render: () => (
          <div className="absolute inset-0 text-white">
            <img src={img(`${issue.seed}-${k}`, 960)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
            <span className="absolute left-[8%] top-[6%] z-[4] font-mag text-[clamp(28px,3.6vw,48px)] font-medium leading-none text-white/90">{num(pad(a.p))}</span>
            <div className="absolute inset-x-[8%] bottom-[8%] z-[4] flex flex-col gap-2">
              <span className="w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[clamp(9px,.95vw,12px)] font-semibold backdrop-blur">{t(a.k)} · {mins(a.min)}</span>
              <h5 className="font-mag text-[clamp(20px,2.6vw,34px)] font-medium leading-[1.1] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug">{t(a.t)}</h5>
              <span className="stripe mt-1 h-[3px] w-12" />
            </div>
          </div>
        ),
      });
      pages.push({
        key: `a${k}txt`,
        render: (n, side) => (
          <div className="absolute inset-0 flex flex-col gap-[2.5%] px-[9%] pb-[9%] pt-[11%]">
            <RunHead issue={issue} side={side} />
            <span className="kicker">{t(a.k)}</span>
            <p className="dropcap font-serif text-[clamp(11px,1.3vw,16px)] leading-relaxed text-brand-ink2">{t(body.intro)}</p>
            {body.paras.map((p, j) => <p key={j} className="font-serif text-[clamp(11px,1.3vw,16px)] leading-relaxed text-brand-ink2">{t(p)}</p>)}
            <blockquote className="relative mt-auto overflow-hidden rounded-[3px] bg-brand-paper px-[6%] py-[4%] font-mag text-[clamp(13px,1.6vw,20px)] italic leading-snug [html[lang=bn]_&]:not-italic">
              <span className="stripe absolute inset-y-0 left-0 w-[3px]" />
              {t(body.quote)}
            </blockquote>
            <PageNo n={n} side={side} />
          </div>
        ),
      });
    });
    pages.push({
      key: 'back',
      render: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#FBF5EA] p-[10%] text-center">
          <Monument className="h-[16%] w-[16%]" />
          <img src="/logo.png" alt="Brand Bangladesh" className="w-[62%]" />
          <p className="font-serif text-[clamp(12px,1.5vw,18px)] italic text-brand-muted [html[lang=bn]_&]:not-italic">{t({ en: 'The story of a nation', bn: 'একটি জাতির গল্প' })}</p>
          <span className="stripe absolute inset-x-0 bottom-0 h-1.5" />
        </div>
      ),
    });
    if (pages.length % 2) pages.splice(pages.length - 1, 0, { key: 'blank', render: () => <div className="absolute inset-0 grid place-items-center"><Monument className="h-[10%] w-[10%] opacity-10" /></div> });
    return pages;
  }, [issue, t, u, num, monthYear, mins]);
}

export function Flipbook({ issue }) {
  const { t, num } = useLang();
  const desktop = useIsDesktop();
  const pages = usePages(issue);
  const leaves = pages.length / 2;
  const [turned, setTurned] = useState(0); // desktop: leaves turned
  const [page, setPage] = useState(0); // mobile: current page index
  const [dir, setDir] = useState(1);
  const [flipping, setFlipping] = useState(-1); // leaf currently turning, kept on top and given a sheen
  const [fs, setFs] = useState(false);
  const wrap = useRef(null);

  const max = desktop ? leaves : pages.length - 1;
  const pos = desktop ? turned : page;
  const jump = useCallback((to) => {
    if (desktop) {
      const next = Math.min(leaves, Math.max(0, to));
      if (next === turned) return;
      setDir(next > turned ? 1 : -1);
      setFlipping(next > turned ? turned : next);
      setTurned(next);
    } else {
      const next = Math.min(pages.length - 1, Math.max(0, to));
      setDir(next > page ? 1 : -1);
      setPage(next);
    }
  }, [desktop, leaves, pages.length, turned, page]);
  const go = useCallback((d) => jump(pos + d), [jump, pos]);

  useEffect(() => {
    if (flipping < 0) return;
    const id = setTimeout(() => setFlipping(-1), 1150);
    return () => clearTimeout(id);
  }, [flipping, turned]);

  useEffect(() => {
    const on = () => setFs(document.fullscreenElement === wrap.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggleFs = () => (document.fullscreenElement ? document.exitFullscreen() : wrap.current?.requestFullscreen?.());

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

  const btn = 'grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-[0_12px_24px_-12px_rgba(0,0,0,.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep disabled:pointer-events-none disabled:opacity-25';
  const edgeL = 2 + turned * 1.4;
  const edgeR = 2 + (leaves - turned) * 1.4;

  return (
    <div ref={wrap} className={cn('flip-desk rounded-[5px] px-4 pb-8 pt-10 md:px-10 md:pb-10 md:pt-14', fs && 'flex flex-col justify-center !rounded-none')} tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="flipbook" aria-label={t({ en: 'Online magazine. Use the arrow keys to turn pages.', bn: 'অনলাইন ম্যাগাজিন। পাতা উল্টাতে অ্যারো কী ব্যবহার করুন।' })}>
      {desktop ? (
        <div className={cn('flip-stage', turned === 0 && 'at-start', turned === leaves && 'at-end', fs && '!max-w-[min(1400px,140vh)]')}>
          <div className="flip-book">
            {/* stacked page edges: pages already read on the left, pages still to come on the right */}
            <span className="flip-edges rounded-l-[3px]" style={{ left: `calc(-100% - ${edgeL}px)`, width: edgeL, opacity: turned === 0 ? 0 : 1 }} />
            <span className="flip-edges rounded-r-[3px]" style={{ right: -edgeR, width: edgeR, opacity: turned === leaves ? 0 : 1 }} />
            {Array.from({ length: leaves }, (_, k) => {
              const isTurned = k < turned;
              const z = flipping === k ? leaves + 2 : isTurned ? k + 1 : leaves - k;
              return (
                <div key={k} className={cn('leaf', isTurned && 'turned', flipping === k && 'flipping')} style={{ zIndex: z }} onClick={() => go(isTurned ? -1 : 1)}>
                  <div className="face front cursor-pointer">{pages[2 * k].render(2 * k + 1, 'right')}<span className="sheen" /><span className="curl" /></div>
                  <div className="face back cursor-pointer">{pages[2 * k + 1].render(2 * k + 2, 'left')}<span className="sheen" /><span className="curl" /></div>
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
              className="face front absolute inset-0 overflow-hidden"
              initial={{ x: dir > 0 ? '100%' : '-100%', rotateY: dir > 0 ? -25 : 25, opacity: 0.4 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              exit={{ x: dir > 0 ? '-100%' : '100%', rotateY: dir > 0 ? 25 : -25, opacity: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
              onDragEnd={(e, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
            >
              {pages[page].render(page + 1, 'right')}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* controls */}
      <div className="mx-auto mt-12 flex max-w-[980px] flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} disabled={pos === 0} aria-label={t({ en: 'Previous page', bn: 'আগের পাতা' })} className={btn}><i className="fa-solid fa-arrow-left" aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} disabled={pos === max} aria-label={t({ en: 'Next page', bn: 'পরের পাতা' })} className={btn}><i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
          <span className="ml-2 min-w-[110px] font-mag text-[15px] text-brand-ink" aria-live="polite">{label}</span>
        </div>

        {/* spread tracker: one tick per spread, click to jump */}
        <div className="order-last flex w-full items-center gap-1 md:order-none md:w-auto md:flex-1 md:px-8">
          {Array.from({ length: max + 1 }, (_, k) => (
            <button
              key={k} type="button" onClick={() => jump(k)} aria-label={`${t({ en: 'Go to', bn: 'যান' })} ${num(k + 1)}`}
              className={cn('h-1.5 flex-1 rounded-full transition-all duration-500', k === pos ? 'stripe h-2' : k < pos ? 'bg-brand-ink/50 hover:bg-brand-ink' : 'bg-brand-ink/15 hover:bg-brand-ink/40')}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[12.5px] text-brand-muted lg:inline">
            {desktop ? t({ en: 'Click a page or use ← →', bn: 'পাতায় ক্লিক করুন বা ← → চাপুন' }) : t({ en: 'Swipe to turn the page', bn: 'পাতা উল্টাতে সোয়াইপ করুন' })}
          </span>
          <button type="button" onClick={toggleFs} aria-label={fs ? t({ en: 'Exit full screen', bn: 'পূর্ণ পর্দা বন্ধ' }) : t({ en: 'Read full screen', bn: 'পূর্ণ পর্দায় পড়ুন' })} className="grid h-12 w-12 place-items-center rounded-full border border-brand-line bg-white text-brand-ink transition hover:border-black">
            <i className={`fa-solid ${fs ? 'fa-compress' : 'fa-expand'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
