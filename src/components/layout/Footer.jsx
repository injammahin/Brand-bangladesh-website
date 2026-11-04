import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { NAV } from '@/data/ui';
import { img } from '@/lib/utils';
import { NewsletterForm } from '@/components/shared/NewsletterForm';
import { Watermark } from '@/components/shared/Watermark';

const SOCIAL = [
  ['fa-facebook-f', 'Facebook'], ['fa-instagram', 'Instagram'], ['fa-youtube', 'YouTube'], ['fa-linkedin-in', 'LinkedIn'], ['fa-x-twitter', 'X'],
];
const GALLERY = ['ratar_0', 'cox_2', 'boishakh_2', 'tea_3', 'paharpur_1', 'hilsa_1', 'sunddeer_0', 'kaptai_2'];

const T = {
  ctaEy: { en: 'Your next journey', bn: 'আপনার পরের যাত্রা' },
  ctaH: { en: 'Come and see it <em>for yourself.</em>', bn: 'নিজের চোখে দেখুন <em>বাংলাদেশ।</em>' },
  plan: { en: 'Plan your visit', bn: 'ভ্রমণ পরিকল্পনা করুন' },
  gallery: { en: 'Shared by our community', bn: 'কমিউনিটির পাঠানো ছবি' },
  made: { en: 'Made with', bn: '' },
  in: { en: 'in Bangladesh', bn: 'ভালোবাসায় তৈরি, বাংলাদেশে' },
  where: { en: 'Dhaka, Bangladesh', bn: 'ঢাকা, বাংলাদেশ' },
};

function FootLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
      <i className="fa-solid fa-arrow-right -ml-5 w-3 text-[10px] text-brand-yellow opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" aria-hidden="true" />
      <span>{children}</span>
    </Link>
  );
}

function Heading({ children }) {
  return (
    <h3 className="serif-title mb-5 text-[21px] text-white">
      {children}
      <span className="stripe mt-2 block h-[2px] w-8" />
    </h3>
  );
}

export function Footer({ onCookieSettings }) {
  const { t, u } = useLang();
  return (
    <footer className="nakshi-dark relative isolate overflow-hidden bg-black text-white">
      <div className="stripe-run h-[3px]" />
      <Watermark className="-right-10 bottom-24 h-[460px] w-[460px]" opacity={0.09} />

      {/* call to action */}
      <div className="container flex flex-col gap-6 pb-12 pt-16 lg:flex-row lg:items-end lg:justify-between lg:pt-20">
        <div className="on-dark flex flex-col gap-3">
          <span className="eyebrow text-brand-goldsoft">{t(T.ctaEy)}</span>
          <h2 className="display-md max-w-3xl text-white" dangerouslySetInnerHTML={{ __html: t(T.ctaH) }} />
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/pillars/tourism" className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">{t(T.plan)} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
          <Link to="/community#submit" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold transition hover:bg-white hover:text-black">{u('shareStory')} <i className="fa-solid fa-feather" aria-hidden="true" /></Link>
        </div>
      </div>

      {/* #MyBangladesh photo strip */}
      <div className="container">
        <div className="flex items-center justify-between pb-4 text-[12.5px] text-white/50">
          <span className="inline-flex items-center gap-2"><i className="fa-brands fa-instagram text-brand-pink" aria-hidden="true" /> #MyBangladesh</span>
          <span>{t(T.gallery)}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {GALLERY.map((g, k) => (
            <motion.div key={g} initial={{ opacity: 0, y: 30, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: k % 2 ? 1.5 : -1.5 }} viewport={{ once: true }} transition={{ delay: k * 0.06, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}>
              <Link to="/community" className="group relative block aspect-square overflow-hidden rounded-[5px] ring-1 ring-white/10 transition-all duration-500 ease-brand hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:ring-white/60">
                <img src={img(g, 400)} alt="" loading="lazy" className="h-full w-full object-cover grayscale-[35%] transition duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:grayscale-0" />
                <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"><i className="fa-brands fa-instagram text-xl" aria-hidden="true" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* columns */}
      <div className="container mt-14 grid gap-10 border-t border-white/10 pb-14 pt-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <img src="/logo-light.png" alt="Brand Bangladesh" width="918" height="285" loading="lazy" className="mb-4 h-14 w-auto" />
          <p className="max-w-[340px] text-[14.5px] text-white/55">{u('tagline')}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-white/55"><i className="fa-solid fa-location-dot text-brand-yellow" aria-hidden="true" /> {t(T.where)}</p>
          <div className="mt-5 flex gap-2.5">
            {SOCIAL.map(([icon, label]) => (
              <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black">
                <i className={`fa-brands ${icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <Heading>{u('explore')}</Heading>
          <ul className="space-y-3 text-[14.5px]">
            {NAV.slice(0, 5).map((n) => <li key={n.id}><FootLink to={n.to}>{t(n)}</FootLink></li>)}
          </ul>
        </div>
        <div>
          <Heading>{u('engage')}</Heading>
          <ul className="space-y-3 text-[14.5px]">
            <li><FootLink to="/community#submit">{u('shareStory')}</FootLink></li>
            <li><FootLink to="/about#contact">{u('contact')}</FootLink></li>
            <li><FootLink to="/publication#media-kit">{u('mediaKit')}</FootLink></li>
            <li><FootLink to="/about#faq">{u('faq')}</FootLink></li>
          </ul>
        </div>
        <div>
          <Heading>{u('newsletter')}</Heading>
          <p className="mb-4 text-[14.5px] text-white/55">{u('nlText')}</p>
          <NewsletterForm dark buttonVariant="light" />
        </div>
      </div>

      {/* bottom bar */}
      <div className="container flex flex-col gap-3 border-t border-white/10 pb-8 pt-5 text-[13px] text-white/55 lg:flex-row lg:items-center lg:justify-between">
        <span>{u('rights')}</span>
        <span className="inline-flex items-center gap-1.5">
          {t(T.made)} <i className="fa-solid fa-heart animate-pulse text-brand-red" aria-hidden="true" /> {t(T.in)}
          <span className="ml-1 inline-flex h-3 w-5 items-center justify-center rounded-[2px] bg-[#006A4E]" aria-hidden="true"><span className="h-1.5 w-1.5 -translate-x-[1px] rounded-full bg-[#F42A41]" /></span>
        </span>
        <nav aria-label="Legal" className="flex flex-wrap gap-4">
          <Link className="transition-colors hover:text-brand-gold2" to="/legal#privacy">{u('privacy')}</Link>
          <Link className="transition-colors hover:text-brand-gold2" to="/legal#terms">{u('terms')}</Link>
          <Link className="transition-colors hover:text-brand-gold2" to="/about#faq">{u('faq')}</Link>
          <button type="button" className="transition-colors hover:text-brand-gold2" onClick={onCookieSettings}>{u('cookieSet')}</button>
        </nav>
      </div>
    </footer>
  );
}
