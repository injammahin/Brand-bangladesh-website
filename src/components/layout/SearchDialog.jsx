import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useLang } from '@/context/LanguageContext';
import { buildSearchIndex } from '@/data/helpers';
import { UI } from '@/data/ui';

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function Highlight({ text, terms }) {
  const words = terms.filter((w) => w.length > 1);
  if (!words.length) return text;
  const parts = text.split(new RegExp(`(${words.map(escRe).join('|')})`, 'gi'));
  return parts.map((p, i) => (words.some((w) => w.toLowerCase() === p.toLowerCase()) ? <mark key={i} className="rounded bg-brand-goldsoft text-inherit">{p}</mark> : p));
}

/** Full-screen bilingual search (opens with the header button or "/") */
export function SearchDialog({ open, onOpenChange }) {
  const { t, u } = useLang();
  const index = useMemo(buildSearchIndex, []);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); onOpenChange(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const hits = terms.length ? index.filter((it) => terms.every((w) => it.hay.includes(w))).slice(0, 12) : [];

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setQ(''); }}>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-[300] flex flex-col bg-white/[.98] backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Title className="sr-only">{u('search')}</Dialog.Title>
          <Dialog.Description className="sr-only">{u('searchHint')}</Dialog.Description>
          <div className="flex justify-end p-4">
            <Dialog.Close className="grid h-[42px] w-[42px] place-items-center rounded-full border border-brand-line hover:border-brand-teal hover:text-brand-teal" aria-label={u('close')}>
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <div className="mx-auto mt-[4vh] flex min-h-0 w-[min(820px,100%-32px)] flex-1 flex-col gap-5">
            <label htmlFor="bb-search" className="sr-only">{u('search')}</label>
            <input
              id="bb-search" type="search" autoFocus autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={u('searchPh')}
              className="w-full border-0 border-b-2 border-brand-ink bg-transparent py-2 text-[clamp(26px,4vw,46px)] outline-none"
              style={{ fontFamily: 'var(--f-serif)' }}
            />
            <p className="text-sm text-brand-muted">{u('searchHint')}</p>
            <div className="flex-1 overflow-y-auto pb-10" role="list" aria-live="polite">
              {terms.length > 0 && hits.length === 0 && <p className="text-sm text-brand-muted">{u('noResults')}</p>}
              {hits.map((h) => (
                <Dialog.Close asChild key={h.to + h.type + h.title.en}>
                  <Link role="listitem" to={h.to} className="flex items-center gap-3.5 border-b border-brand-line py-3.5 hover:text-brand-deep">
                    <i className={`fa-solid ${h.icon} grid h-10 w-10 shrink-0 place-items-center rounded-[5px] bg-brand-cream text-brand-deep`} aria-hidden="true" />
                    <span>
                      <small className="text-brand-muted">{t(UI.types[h.type])}</small>
                      <strong className="serif-title block text-xl"><Highlight text={t(h.title)} terms={terms} /></strong>
                    </span>
                  </Link>
                </Dialog.Close>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
