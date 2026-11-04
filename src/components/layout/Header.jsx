import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { useLang } from '@/context/LanguageContext';
import { NAV } from '@/data/ui';
import { cn, img } from '@/lib/utils';
import { LanguageSwitch } from './LanguageSwitch';

const MENU_IMG = { story: 'bb-story-delta', pillars: 'bb-p-tourism', regions: 'bb-r-sylhet', numbers: 'bb-p-invest', publication: 'bb-i-heritage', community: 'bb-community', about: 'bb-about', home: 'bb-hero-coast' };
const ease = [0.22, 0.8, 0.2, 1];

export function Header({ onSearch }) {
  const { t, u } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(null);
  const [preview, setPreview] = useState('home');
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  const items = [{ id: 'home', to: '/', en: 'Home', bn: 'প্রচ্ছদ' }, ...NAV];

  return (
    <>
      <a href="#main" className="fixed left-4 top-[-60px] z-[2000] rounded-[5px] bg-white px-4 py-2.5 text-black transition-all focus:top-3">{u('skip')}</a>
      <header
        className={cn(
          'sticky top-0 z-[100] text-white transition-[transform,background-color,box-shadow] duration-500 ease-brand',
          scrolled ? 'bg-black/[.88] shadow-[0_18px_40px_-24px_rgba(0,0,0,.9)] backdrop-blur-xl backdrop-saturate-150' : 'bg-black'
        )}
      >
        <div className="stripe-run h-[3px]" aria-hidden="true" />
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link to="/" aria-label={`Brand Bangladesh — ${u('home')}`} className="group relative shrink-0">
            <img src="/logo-light.png" alt="Brand Bangladesh" width="918" height="285" className={cn('w-auto transition-all duration-500 ease-brand group-hover:scale-[1.03]', scrolled ? 'h-9 xl:h-[40px]' : 'h-10 xl:h-[50px]')} />
          </Link>

          <nav aria-label="Main" className="hidden xl:flex xl:items-center" onMouseLeave={() => setHover(null)}>
            {NAV.map((n) => (
              <NavLink
                key={n.id}
                to={n.to}
                onMouseEnter={() => setHover(n.id)}
                onFocus={() => setHover(n.id)}
                className={({ isActive }) => cn(
                  'relative whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[.01em] transition-colors duration-300 [html[lang=bn]_&]:text-[15px]',
                  isActive ? 'text-white' : 'text-white/65 hover:text-white'
                )}
              >
                {({ isActive }) => (
                  <>
                    {hover === n.id && <motion.span layoutId="nav-hover" className="absolute inset-0 -z-[1] rounded-full bg-white/[.09]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="relative">{t(n)}</span>
                    {isActive && <motion.span layoutId="nav-active" className="stripe absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={onSearch} aria-label={u('search')} className="hdr-btn"><i className="fa-solid fa-magnifying-glass" aria-hidden="true" /></button>
            <LanguageSwitch dark />
            <Link to="/community#submit" className="btn-shine hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 2xl:inline-flex">
              {u('shareStory')} <i className="fa-solid fa-arrow-right text-[11px]" aria-hidden="true" />
            </Link>
            <button type="button" className="hdr-btn xl:hidden" onClick={() => setMenu(true)} aria-label={u('menu')} aria-expanded={menu}>
              <span className="flex w-[18px] flex-col items-end gap-[5px]" aria-hidden="true"><i className="block h-[1.5px] w-full bg-current" /><i className="block h-[1.5px] w-3/4 bg-current" /><i className="block h-[1.5px] w-1/2 bg-current" /></span>
            </button>
          </div>
        </div>
        <motion.div className="stripe absolute inset-x-0 bottom-0 h-[2px] origin-left" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <Dialog.Root open={menu} onOpenChange={setMenu}>
        <AnimatePresence>
          {menu && (
            <Dialog.Portal forceMount>
              <Dialog.Content forceMount asChild aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-0 z-[300] flex flex-col overflow-y-auto bg-black text-white"
                  initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
                  animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
                  exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Dialog.Title className="sr-only">{u('menu')}</Dialog.Title>
                  <div className="stripe-run h-[3px] shrink-0" />
                  <div className="container flex h-[var(--header-h)] shrink-0 items-center justify-between">
                    <img src="/logo-light.png" alt="" className="h-9 w-auto" />
                    <Dialog.Close className="hdr-btn" aria-label={u('close')}><i className="fa-solid fa-xmark" aria-hidden="true" /></Dialog.Close>
                  </div>
                  <div className="container grid flex-1 items-center gap-10 py-8 md:grid-cols-[1fr_.8fr]">
                    <nav aria-label="Mobile" className="flex flex-col">
                      {items.map((n, i) => (
                        <motion.div key={n.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.035, duration: 0.5, ease }}>
                          <NavLink
                            to={n.to} end={n.to === '/'}
                            onMouseEnter={() => setPreview(n.id)} onFocus={() => setPreview(n.id)}
                            className={({ isActive }) => cn('group flex items-baseline gap-4 border-b border-white/10 py-3.5 font-mag text-[clamp(30px,6vw,52px)] font-medium leading-tight transition-colors [html[lang=bn]_&]:font-normal', isActive ? 'text-brand-gold2' : 'text-white hover:text-brand-gold2')}
                          >
                            <small className="font-sans text-xs font-semibold tracking-[.2em] text-white/40">{String(i + 1).padStart(2, '0')}</small>
                            <span className="transition-transform duration-500 ease-brand group-hover:translate-x-3">{t(n)}</span>
                          </NavLink>
                        </motion.div>
                      ))}
                    </nav>
                    <motion.div className="relative hidden aspect-[4/5] overflow-hidden rounded-[5px] md:block" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9, ease }}>
                      <AnimatePresence mode="popLayout">
                        <motion.img key={preview} src={img(MENU_IMG[preview], 960)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }} />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="eyebrow absolute bottom-6 left-6 text-white">{u('tagline')}</span>
                    </motion.div>
                  </div>
                  <motion.div className="container flex flex-wrap items-center justify-between gap-4 pb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <Link to="/community#submit" className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black">{u('shareStory')} <i className="fa-solid fa-feather" aria-hidden="true" /></Link>
                    <LanguageSwitch dark id="menu" />
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
