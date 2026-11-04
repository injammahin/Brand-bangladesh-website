import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { NAV } from '@/data/ui';
import { NewsletterForm } from '@/components/shared/NewsletterForm';

const SOCIAL = [
  ['fa-facebook-f', 'Facebook'], ['fa-instagram', 'Instagram'], ['fa-youtube', 'YouTube'], ['fa-linkedin-in', 'LinkedIn'], ['fa-x-twitter', 'X'],
];

export function Footer({ onCookieSettings }) {
  const { t, u } = useLang();
  return (
    <footer className="relative isolate overflow-hidden bg-black text-white">
      <div className="stripe-run h-[3px]" />
      <div className="container grid gap-9 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <img src="/logo-light.png" alt="Brand Bangladesh" width="918" height="285" loading="lazy" className="mb-4 h-14 w-auto" />
          <p className="max-w-[340px] text-[14.5px] text-white/55">{u('tagline')}</p>
          <div className="mt-5 flex gap-2.5">
            {SOCIAL.map(([icon, label]) => (
              <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-sm transition-all hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black">
                <i className={`fa-brands ${icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="serif-title mb-3.5 text-[21px]">{u('explore')}</h3>
          <ul className="space-y-2.5 text-[14.5px] text-white/75">
            {NAV.slice(0, 5).map((n) => <li key={n.id}><Link className="transition-colors hover:text-brand-gold2" to={n.to}>{t(n)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="serif-title mb-3.5 text-[21px]">{u('engage')}</h3>
          <ul className="space-y-2.5 text-[14.5px] text-white/75">
            <li><Link className="transition-colors hover:text-brand-gold2" to="/community#submit">{u('shareStory')}</Link></li>
            <li><Link className="transition-colors hover:text-brand-gold2" to="/about#contact">{u('contact')}</Link></li>
            <li><Link className="transition-colors hover:text-brand-gold2" to="/publication#media-kit">{u('mediaKit')}</Link></li>
            <li><Link className="transition-colors hover:text-brand-gold2" to="/about#faq">{u('faq')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="serif-title mb-3.5 text-[21px]">{u('newsletter')}</h3>
          <p className="mb-3 text-[14.5px] text-white/55">{u('nlText')}</p>
          <NewsletterForm dark buttonVariant="light" />
        </div>
      </div>
      <div className="container select-none overflow-hidden" aria-hidden="true">
        <p className="text-outline-white whitespace-nowrap text-center font-mag text-[clamp(56px,15vw,220px)] font-medium leading-[.9] tracking-tight transition-colors duration-700 hover:text-white/10">Bangladesh</p>
      </div>
      <div className="container flex flex-col gap-3 border-t border-white/10 pb-8 pt-5 text-[13px] text-white/55 lg:flex-row lg:justify-between">
        <span>{u('rights')}</span>
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
