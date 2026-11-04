import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Header } from './Header';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { SearchDialog } from './SearchDialog';
import { CookieConsent } from './CookieConsent';
import { BackToTop, SmoothScroll } from './Effects';

/** Scroll to top on route change, or to the #hash target when there is one */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const lenis = window.__lenis;
    if (hash) {
      const id = hash.slice(1);
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) lenis ? lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 20) setTimeout(tryScroll, 60);
      };
      tryScroll();
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const [search, setSearch] = useState(false);
  const [consent, setConsent] = useState(false);
  const location = useLocation();

  return (
    <>
      <SmoothScroll />
      <Loader />
      <ScrollManager />
      <Header onSearch={() => setSearch(true)} />
      <motion.main
        id="main"
        key={location.pathname}
        tabIndex={-1}
        className="outline-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center"><span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-line border-t-black" /></div>}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer onCookieSettings={() => setConsent(true)} />
      <SearchDialog open={search} onOpenChange={setSearch} />
      <CookieConsent open={consent} setOpen={setConsent} />
      <BackToTop />
      <Toaster position="bottom-center" toastOptions={{ style: { borderRadius: 999, background: '#0A0A0A', color: '#fff', border: 0 } }} />
    </>
  );
}
