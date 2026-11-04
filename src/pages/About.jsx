import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import content from '@/data/content';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn, img } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { validEmail } from '@/components/shared/NewsletterForm';

const T = {
  title: { en: 'About', bn: 'আমাদের কথা' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'About Brand Bangladesh', bn: 'ব্র্যান্ড বাংলাদেশ সম্পর্কে' },
  h1: { en: 'Telling the world <em>who we are</em>', bn: 'বিশ্বকে জানাই, <em>আমরা কারা</em>' },
  lead: { en: 'Brand Bangladesh is a national identity initiative: a storytelling platform that presents the country with confidence, pride and credibility.', bn: 'ব্র্যান্ড বাংলাদেশ দেশের জাতীয় পরিচয় তুলে ধরার একটি উদ্যোগ—গল্পের মধ্য দিয়ে আত্মবিশ্বাস, গর্ব আর সত্যনিষ্ঠার সঙ্গে বিশ্বের সামনে বাংলাদেশকে উপস্থাপন করাই এর কাজ।' },
  missionEy: { en: 'Our mission', bn: 'আমাদের লক্ষ্য' },
  missionH: { en: 'A stronger, truer <em>picture of Bangladesh</em>', bn: 'বিশ্বের চোখে <em>আরও উজ্জ্বল, আরও সঠিক বাংলাদেশ</em>' },
  missionP: { en: 'When an investor, a tourist, a buyer, a journalist or a member of the diaspora visits, they should leave with a more positive and more accurate picture of Bangladesh, and a clear next step to engage with it.', bn: 'একজন বিনিয়োগকারী, পর্যটক, ক্রেতা, সাংবাদিক বা প্রবাসী যখন এখানে আসবেন, তিনি যেন বাংলাদেশ সম্পর্কে আরও ইতিবাচক ও সঠিক ধারণা নিয়ে ফেরেন—আর জানেন পরের ধাপে কী করবেন।' },
  missionP2: { en: 'We are not a government information portal. We are closer in spirit to a national magazine: editorial, photography-led and built around real people.', bn: 'এটি কোনো সরকারি তথ্য বাতায়ন নয়। চরিত্রে এটি অনেকটা একটি জাতীয় ম্যাগাজিন—যত্নে লেখা, ছবিতে বলা, আর বাস্তব মানুষের গল্পে গাঁথা।' },
  partnersEy: { en: 'Who is behind it', bn: 'পেছনে যাঁরা' },
  partnersH: { en: 'Partners <em>and supporters</em>', bn: 'অংশীদার <em>ও সহযোগী</em>' },
  partner: { en: 'Partner logo', bn: 'অংশীদারের লোগো' },
  contactEy: { en: 'Contact', bn: 'যোগাযোগ' },
  contactH: { en: 'How can <em>we help?</em>', bn: 'আমরা কীভাবে <em>সাহায্য করতে পারি?</em>' },
  contactSub: { en: 'Choose a topic and your message goes straight to the right team.', bn: 'একটি বিষয় বেছে নিন—আপনার বার্তা সরাসরি সঠিক দলের কাছে যাবে।' },
  routed: { en: 'Your message will go to: ', bn: 'আপনার বার্তা যাবে: ' },
  name: { en: 'Full name', bn: 'পুরো নাম' },
  email: { en: 'Email', bn: 'ইমেইল' },
  org: { en: 'Organisation (optional)', bn: 'প্রতিষ্ঠান (ঐচ্ছিক)' },
  country: { en: 'Country', bn: 'দেশ' },
  message: { en: 'Message', bn: 'বার্তা' },
  consent: { en: 'I agree that my details are used to answer this inquiry, as described in the privacy policy.', bn: 'এই জিজ্ঞাসার উত্তর দেওয়ার জন্য গোপনীয়তা নীতি অনুযায়ী আমার দেওয়া তথ্য ব্যবহারে আমি সম্মতি দিচ্ছি।' },
  send: { en: 'Send message', bn: 'বার্তা পাঠান' },
  sending: { en: 'Sending…', bn: 'পাঠানো হচ্ছে…' },
  required: { en: 'This field is required.', bn: 'এই ঘরটি পূরণ করুন।' },
  badEmail: { en: 'Please enter a valid email address.', bn: 'সঠিক ইমেইল ঠিকানা লিখুন।' },
  mustConsent: { en: 'Please agree before sending.', bn: 'পাঠানোর আগে সম্মতি দিন।' },
  sent: { en: 'Message sent', bn: 'বার্তা পাঠানো হয়েছে' },
  sentP: { en: 'Thank you. The {team} will reply within two working days.', bn: 'ধন্যবাদ। {team} দুই কর্মদিবসের মধ্যে উত্তর দেবে।' },
  again: { en: 'Send another message', bn: 'আরেকটি বার্তা পাঠান' },
  direct: { en: 'Or reach us directly', bn: 'অথবা সরাসরি যোগাযোগ করুন' },
  address: { en: 'Dhaka, Bangladesh', bn: 'ঢাকা, বাংলাদেশ' },
  faqEy: { en: 'FAQ', bn: 'সাধারণ প্রশ্ন' },
  faqH: { en: 'Frequently <em>asked</em>', bn: 'যা <em>অনেকেই জানতে চান</em>' },
};

const TOPICS = [
  { id: 'general', icon: 'fa-comments', name: { en: 'General', bn: 'সাধারণ' }, team: { en: 'Brand Bangladesh team', bn: 'ব্র্যান্ড বাংলাদেশ দল' } },
  { id: 'investment', icon: 'fa-chart-line', name: { en: 'Investment', bn: 'বিনিয়োগ' }, team: { en: 'Investment desk', bn: 'বিনিয়োগ ডেস্ক' } },
  { id: 'exports', icon: 'fa-ship', name: { en: 'Exports', bn: 'রপ্তানি' }, team: { en: 'Exports & trade desk', bn: 'রপ্তানি ও বাণিজ্য ডেস্ক' } },
  { id: 'tourism', icon: 'fa-mountain-sun', name: { en: 'Tourism', bn: 'পর্যটন' }, team: { en: 'Tourism desk', bn: 'পর্যটন ডেস্ক' } },
  { id: 'media', icon: 'fa-microphone-lines', name: { en: 'Media', bn: 'গণমাধ্যম' }, team: { en: 'Media & press office', bn: 'গণমাধ্যম ও প্রেস অফিস' } },
];

function ContactForm() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const start = TOPICS.some((x) => x.id === params.get('topic')) ? params.get('topic') : 'general';
  const [topic, setTopic] = useState(start);
  const [v, setV] = useState({ name: '', email: '', org: '', country: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const team = TOPICS.find((x) => x.id === topic).team;

  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })); };
  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = t(T.required);
    if (!validEmail(v.email)) er.email = t(T.badEmail);
    if (!v.message.trim()) er.message = t(T.required);
    if (!consent) er.consent = t(T.mustConsent);
    setErrors(er);
    if (Object.keys(er).length) { document.getElementById(`ct-${Object.keys(er)[0]}`)?.focus(); return; }
    setState('sending');
    // TODO: POST { topic, ...v } to the inquiries endpoint, which routes by topic
    await new Promise((r) => setTimeout(r, 1000));
    setState('done');
  };
  const err = (k) => errors[k] && <p id={`ct-${k}-err`} className="text-xs font-medium text-destructive">{errors[k]}</p>;
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `ct-${k}-err` : undefined });

  return (
    <div className="rounded-[5px] border border-brand-line bg-white p-6 shadow-brand md:p-10">
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
            <i className="fa-solid fa-envelope-circle-check mb-4 text-5xl text-brand-teal" aria-hidden="true" />
            <h3 className="display-sm">{t(T.sent)}</h3>
            <p className="mx-auto mt-3 max-w-md text-brand-ink2">{t(T.sentP).replace('{team}', t(team))}</p>
            <Button variant="outline" className="mt-6" onClick={() => { setState('idle'); setV({ name: '', email: '', org: '', country: '', message: '' }); setConsent(false); }}>{t(T.again)}</Button>
          </motion.div>
        ) : (
          <motion.form key="f" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
            <fieldset>
              <legend className="mb-3 text-[13.5px] font-semibold">{t({ en: 'Topic', bn: 'বিষয়' })}</legend>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-5" role="radiogroup">
                {TOPICS.map((x) => (
                  <label key={x.id} className={cn('relative flex cursor-pointer flex-col gap-2 rounded-[5px] border p-4 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand-yellow', topic === x.id ? 'border-brand-deep bg-brand-tealsoft' : 'border-brand-line hover:border-brand-ink')}>
                    <input type="radio" name="topic" value={x.id} checked={topic === x.id} onChange={() => setTopic(x.id)} className="sr-only" />
                    <i className={cn(`fa-solid ${x.icon} text-xl`, topic === x.id ? 'text-brand-deep' : 'text-brand-muted')} aria-hidden="true" />
                    <span className="text-[14.5px] font-semibold">{t(x.name)}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-[13.5px] text-brand-deep" aria-live="polite"><i className="fa-solid fa-route" aria-hidden="true" /> {t(T.routed)}<strong>{t(team)}</strong></p>
            </fieldset>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2"><Label htmlFor="ct-name">{t(T.name)} <span className="text-destructive">*</span></Label><Input id="ct-name" value={v.name} onChange={set('name')} autoComplete="name" {...aria('name')} />{err('name')}</div>
              <div className="flex flex-col gap-2"><Label htmlFor="ct-email">{t(T.email)} <span className="text-destructive">*</span></Label><Input id="ct-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" {...aria('email')} />{err('email')}</div>
              <div className="flex flex-col gap-2"><Label htmlFor="ct-org">{t(T.org)}</Label><Input id="ct-org" value={v.org} onChange={set('org')} autoComplete="organization" /></div>
              <div className="flex flex-col gap-2"><Label htmlFor="ct-country">{t(T.country)}</Label><Input id="ct-country" value={v.country} onChange={set('country')} autoComplete="country-name" /></div>
              <div className="flex flex-col gap-2 md:col-span-2"><Label htmlFor="ct-message">{t(T.message)} <span className="text-destructive">*</span></Label><Textarea id="ct-message" value={v.message} onChange={set('message')} {...aria('message')} />{err('message')}</div>
            </div>
            <div>
              <div className="flex items-start gap-3">
                <Checkbox id="ct-consent" checked={consent} onCheckedChange={(c) => { setConsent(!!c); setErrors((er) => ({ ...er, consent: undefined })); }} aria-invalid={!!errors.consent} />
                <Label htmlFor="ct-consent" className="text-[13.5px] font-normal leading-relaxed text-brand-ink2">{t(T.consent)}</Label>
              </div>
              {errors.consent && <p className="mt-1.5 pl-8 text-xs font-medium text-destructive">{errors.consent}</p>}
            </div>
            <div>
              <Button type="submit" variant="teal" size="lg" disabled={state === 'sending'}>
                {state === 'sending' ? <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> {t(T.sending)}</> : <><i className="fa-solid fa-paper-plane" aria-hidden="true" /> {t(T.send)}</>}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)} />

      <section className="pb-24 pt-4">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="aspect-[4/3] overflow-hidden rounded-[5px]"><img src={img('bb-about', 1100, 820)} alt="" loading="lazy" className="h-full w-full object-cover" /></Reveal>
          <Reveal delay={120} className="flex flex-col gap-4">
            <span className="eyebrow">{t(T.missionEy)}</span>
            <h2 className="display-md" dangerouslySetInnerHTML={{ __html: t(T.missionH) }} />
            <p className="lead">{t(T.missionP)}</p>
            <p className="text-brand-ink2">{t(T.missionP2)}</p>
          </Reveal>
        </div>
      </section>

      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead center eyebrow={t(T.partnersEy)} title={t(T.partnersH)} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Reveal key={i} delay={i * 50} className="grid h-24 place-items-center rounded-[5px] border border-brand-line bg-white font-serif text-lg text-brand-muted">
                {t(T.partner)} {i + 1}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec scroll-mt-20" id="contact">
        <div className="container max-w-5xl">
          <SectionHead center eyebrow={t(T.contactEy)} title={t(T.contactH)} sub={t(T.contactSub)} />
          <ContactForm />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[['fa-phone', '+880 9600-000000'], ['fa-envelope', 'hello@example.com'], ['fa-location-dot', t(T.address)]].map(([icon, val]) => (
              <div key={icon} className="flex items-center gap-3 rounded-[5px] bg-brand-cream p-4">
                <i className={`fa-solid ${icon} grid h-10 w-10 place-items-center rounded-full bg-brand-deep text-white`} aria-hidden="true" />
                <span className="text-[15px]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-brand-paper scroll-mt-20" id="faq">
        <div className="container max-w-4xl">
          <SectionHead eyebrow={t(T.faqEy)} title={t(T.faqH)} />
          <Accordion type="single" collapsible defaultValue="q0">
            {content.faq.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger>{t(f.q)}</AccordionTrigger>
                <AccordionContent>{t(f.a)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
