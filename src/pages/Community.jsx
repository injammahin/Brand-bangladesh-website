import { useEffect, useRef, useState } from 'react';
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
import { NativeSelect } from '@/components/ui/native-select';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { NewsletterForm, validEmail } from '@/components/shared/NewsletterForm';

const T = {
  title: { en: 'Community', bn: 'কমিউনিটি' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  ey: { en: 'Your Bangladesh', bn: 'আপনার বাংলাদেশ' },
  h1: { en: 'Everyone has <em>a story to tell</em>', bn: 'সবার কাছেই আছে <em>বলার মতো একটি গল্প</em>' },
  lead: { en: 'At home or abroad, help tell the story of Bangladesh. Share a moment, a memory, a person or a place.', bn: 'দেশে বা প্রবাসে—বাংলাদেশের গল্প বলায় অংশ নিন। একটি মুহূর্ত, একটি স্মৃতি, একজন মানুষ বা একটি জায়গার কথা লিখুন।' },
  share: { en: 'Share your story', bn: 'আপনার গল্প বলুন' },
  wall: { en: 'See the story wall', bn: 'গল্পের দেয়াল দেখুন' },
  howEy: { en: 'How it works', bn: 'কীভাবে অংশ নেবেন' },
  howH: { en: 'Three <em>simple steps</em>', bn: 'তিনটি <em>সহজ ধাপ</em>' },
  steps: [
    { icon: 'fa-pen-nib', h: { en: 'You submit', bn: 'আপনি পাঠান' }, p: { en: 'Write your story in English or Bangla and add up to three photos.', bn: 'ইংরেজি বা বাংলায় গল্প লিখুন, যোগ করুন সর্বোচ্চ তিনটি ছবি।' } },
    { icon: 'fa-user-check', h: { en: 'We review', bn: 'আমরা দেখি' }, p: { en: 'A moderator reads every submission and may lightly edit it for length.', bn: 'একজন মডারেটর প্রতিটি লেখা পড়েন; দৈর্ঘ্যের জন্য সামান্য সম্পাদনা হতে পারে।' } },
    { icon: 'fa-bullhorn', h: { en: 'It goes live', bn: 'প্রকাশিত হয়' }, p: { en: 'Approved stories appear on the public story wall, and the best may reach the magazine.', bn: 'অনুমোদিত গল্প প্রকাশ পায় গল্পের দেয়ালে; সেরাগুলো জায়গা পেতে পারে ম্যাগাজিনেও।' } },
  ],
  formEy: { en: 'Submit', bn: 'পাঠান' },
  formH: { en: 'Share <em>your story</em>', bn: 'আপনার <em>গল্প পাঠান</em>' },
  name: { en: 'Your name', bn: 'আপনার নাম' },
  email: { en: 'Email', bn: 'ইমেইল' },
  emailHint: { en: 'Never published. Only used to contact you about your story.', bn: 'এটি প্রকাশ করা হবে না; কেবল আপনার গল্পের বিষয়ে যোগাযোগের জন্য।' },
  region: { en: 'Region in Bangladesh', bn: 'বাংলাদেশের অঞ্চল' },
  regionNone: { en: 'Not tied to a region', bn: 'কোনো নির্দিষ্ট অঞ্চলের নয়' },
  country: { en: 'Where you live now', bn: 'বর্তমানে যেখানে থাকেন' },
  countryPh: { en: 'e.g. Dhaka, Toronto, London', bn: 'যেমন: ঢাকা, টরন্টো, লন্ডন' },
  topic: { en: 'Topic', bn: 'বিষয়' },
  storyTitle: { en: 'Story title', bn: 'গল্পের শিরোনাম' },
  story: { en: 'Your story', bn: 'আপনার গল্প' },
  storyHint: { en: 'Between 50 and 1,500 characters.', bn: '৫০ থেকে ১,৫০০ অক্ষরের মধ্যে।' },
  photos: { en: 'Photos (optional)', bn: 'ছবি (ঐচ্ছিক)' },
  drop: { en: 'Drag photos here or click to choose', bn: 'ছবি এখানে টেনে আনুন বা ক্লিক করে বেছে নিন' },
  dropHint: { en: 'Up to 3 images, 5 MB each. Please only send photos you took or have permission to share.', bn: 'সর্বোচ্চ ৩টি ছবি, প্রতিটি ৫ মেগাবাইট পর্যন্ত। শুধু নিজের তোলা বা অনুমতিপ্রাপ্ত ছবি পাঠান।' },
  remove: { en: 'Remove photo', bn: 'ছবি সরান' },
  consent: { en: 'I agree that Brand Bangladesh may review, lightly edit and publish my story and photos, and store my details as described in the privacy policy.', bn: 'আমি সম্মতি দিচ্ছি যে ব্র্যান্ড বাংলাদেশ আমার গল্প ও ছবি পর্যালোচনা, সামান্য সম্পাদনা ও প্রকাশ করতে পারবে এবং গোপনীয়তা নীতি অনুযায়ী আমার তথ্য সংরক্ষণ করবে।' },
  reviewNote: { en: 'Every submission is reviewed by our team before it appears publicly.', bn: 'প্রকাশের আগে প্রতিটি লেখা আমাদের দল পর্যালোচনা করে।' },
  submit: { en: 'Send for review', bn: 'পর্যালোচনার জন্য পাঠান' },
  sending: { en: 'Sending…', bn: 'পাঠানো হচ্ছে…' },
  required: { en: 'This field is required.', bn: 'এই ঘরটি পূরণ করুন।' },
  tooShort: { en: 'Please write at least 50 characters.', bn: 'অন্তত ৫০ অক্ষর লিখুন।' },
  badEmail: { en: 'Please enter a valid email address.', bn: 'সঠিক ইমেইল ঠিকানা লিখুন।' },
  mustConsent: { en: 'Please agree before sending.', bn: 'পাঠানোর আগে সম্মতি দিন।' },
  fixErrors: { en: 'Please check the highlighted fields.', bn: 'চিহ্নিত ঘরগুলো আরেকবার দেখে নিন।' },
  thanks: { en: 'Thank you for sharing', bn: 'গল্প পাঠানোর জন্য ধন্যবাদ' },
  thanksP: { en: 'Your story is now in our review queue. We will email you when it is published, usually within a week.', bn: 'আপনার গল্প এখন পর্যালোচনার তালিকায়। প্রকাশিত হলে আমরা ইমেইলে জানাব—সাধারণত এক সপ্তাহের মধ্যে।' },
  another: { en: 'Share another story', bn: 'আরেকটি গল্প পাঠান' },
  wallEy: { en: 'Story wall', bn: 'গল্পের দেয়াল' },
  wallH: { en: 'Voices from <em>home and abroad</em>', bn: 'দেশ-বিদেশ থেকে <em>মানুষের কথা</em>' },
  reviewed: { en: 'Reviewed', bn: 'পর্যালোচিত' },
  campEy: { en: 'Campaigns', bn: 'ক্যাম্পেইন' },
  campH: { en: 'Join <em>the conversation</em>', bn: 'আলাপে <em>যোগ দিন</em>' },
  soon: { en: 'Coming later', bn: 'শিগগিরই আসছে' },
  nlH: { en: 'Stay connected', bn: 'যুক্ত থাকুন' },
  nlP: { en: 'New stories, campaigns and the monthly magazine, in one email.', bn: 'নতুন গল্প, ক্যাম্পেইন আর মাসিক ম্যাগাজিন—একটি ইমেইলে।' },
};

const CAMPAIGNS = [
  { seed: 'bb-c-mybd', hash: '#MyBangladesh', p: { en: 'One photo that shows what Bangladesh means to you.', bn: 'এমন একটি ছবি, যা বলে দেয় আপনার কাছে বাংলাদেশ মানে কী।' } },
  { seed: 'bb-c-taste', hash: '#TasteOfHome', p: { en: 'The dish that takes you home, wherever you are.', bn: 'যেখানেই থাকুন, যে খাবারের স্বাদ আপনাকে ফিরিয়ে নেয় ঘরে।' } },
  { seed: 'bb-c-photo', hash: { en: 'Photo contest', bn: 'আলোকচিত্র প্রতিযোগিতা' }, soon: true, p: { en: 'Seasonal contests with the magazine cover as the prize.', bn: 'ঋতুভিত্তিক প্রতিযোগিতা—বিজয়ীর ছবি জায়গা পাবে ম্যাগাজিনের প্রচ্ছদে।' } },
  { seed: 'bb-c-amb', hash: { en: 'Ambassadors', bn: 'অ্যাম্বাসেডর' }, soon: true, p: { en: 'Volunteer ambassadors representing Bangladesh abroad.', bn: 'প্রবাসে বাংলাদেশের মুখ হয়ে উঠবেন যে স্বেচ্ছাসেবী দূতেরা।' } },
  { seed: 'bb-c-poll', hash: { en: 'Polls', bn: 'জনমত' }, soon: true, p: { en: 'Vote on the theme of a future magazine issue.', bn: 'ম্যাগাজিনের আগামী সংখ্যার বিষয় ঠিক করুন আপনার ভোটে।' } },
];

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}{required && <span className="text-destructive"> *</span>}</Label>
      {children}
      {error ? <p id={`${id}-err`} className="text-xs font-medium text-destructive">{error}</p> : hint ? <p id={`${id}-hint`} className="text-xs text-brand-muted">{hint}</p> : null}
    </div>
  );
}

function SubmitForm() {
  const { t, num } = useLang();
  const [params] = useSearchParams();
  const initialRegion = content.regions.some((r) => r.id === params.get('region')) ? params.get('region') : '';
  const empty = { name: '', email: '', region: initialRegion, country: '', topic: 'people', title: '', story: '', website: '' };
  const [v, setV] = useState(empty);
  const [files, setFiles] = useState([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done
  const [over, setOver] = useState(false);
  const fileRef = useRef(null);
  const top = useRef(null);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })); };
  const addFiles = (list) => {
    const ok = [...list].filter((f) => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024);
    setFiles((prev) => [...prev, ...ok.map((f) => ({ file: f, url: URL.createObjectURL(f) }))].slice(0, 3));
  };

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = t(T.required);
    if (!validEmail(v.email)) e.email = t(T.badEmail);
    if (!v.title.trim()) e.title = t(T.required);
    if (v.story.trim().length < 50) e.story = t(T.tooShort);
    if (!consent) e.consent = t(T.mustConsent);
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (v.website) return; // honeypot: bots fill hidden fields
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0] === 'consent' ? 'st-consent' : `st-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setState('sending');
    // TODO: POST multipart/form-data to the CMS moderation queue
    await new Promise((r) => setTimeout(r, 1100));
    setState('done');
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reset = () => { setV(empty); setFiles([]); setConsent(false); setErrors({}); setState('idle'); };
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `st-${k}-err` : undefined });

  return (
    <div ref={top} className="scroll-mt-28 rounded-[5px] border border-brand-line bg-white p-6 shadow-brand md:p-10">
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center" role="status">
            <motion.i className="fa-solid fa-circle-check mb-4 text-5xl text-brand-teal" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }} aria-hidden="true" />
            <h3 className="display-sm">{t(T.thanks)}</h3>
            <p className="mx-auto mt-3 max-w-md text-brand-ink2">{t(T.thanksP)}</p>
            <Button variant="outline" className="mt-6" onClick={reset}>{t(T.another)}</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 md:grid-cols-2">
            <div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} /></label></div>
            <Field id="st-name" label={t(T.name)} required error={errors.name}><Input id="st-name" value={v.name} onChange={set('name')} autoComplete="name" {...aria('name')} /></Field>
            <Field id="st-email" label={t(T.email)} required error={errors.email} hint={t(T.emailHint)}><Input id="st-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" {...aria('email')} /></Field>
            <Field id="st-region" label={t(T.region)}>
              <NativeSelect id="st-region" value={v.region} onChange={set('region')}>
                <option value="">{t(T.regionNone)}</option>
                {content.regions.map((r) => <option key={r.id} value={r.id}>{t(r.name)}</option>)}
              </NativeSelect>
            </Field>
            <Field id="st-country" label={t(T.country)}><Input id="st-country" value={v.country} onChange={set('country')} placeholder={t(T.countryPh)} autoComplete="address-level2" /></Field>
            <div className="md:col-span-2">
              <Field id="st-topic" label={t(T.topic)}>
                <NativeSelect id="st-topic" value={v.topic} onChange={set('topic')}>
                  {content.pillars.map((p) => <option key={p.id} value={p.id}>{t(p.name)}</option>)}
                </NativeSelect>
              </Field>
            </div>
            <div className="md:col-span-2"><Field id="st-title" label={t(T.storyTitle)} required error={errors.title}><Input id="st-title" value={v.title} onChange={set('title')} maxLength={120} {...aria('title')} /></Field></div>
            <div className="md:col-span-2">
              <Field id="st-story" label={t(T.story)} required error={errors.story} hint={`${t(T.storyHint)} ${num(v.story.length)}/${num('1,500')}`}>
                <Textarea id="st-story" value={v.story} onChange={set('story')} maxLength={1500} rows={7} {...aria('story')} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Label>{t(T.photos)}</Label>
              <div
                className={cn('relative mt-2 cursor-pointer rounded-[5px] border-2 border-dashed bg-brand-cream p-7 text-center transition', over ? 'border-brand-teal bg-brand-tealsoft' : 'border-brand-line hover:border-brand-teal')}
                onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                onDragLeave={() => setOver(false)}
                onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} id="st-photos" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} aria-describedby="st-photos-hint" />
                <i className="fa-solid fa-cloud-arrow-up mb-2 text-3xl text-brand-teal" aria-hidden="true" />
                <p className="font-semibold">{t(T.drop)}</p>
                <p id="st-photos-hint" className="mt-1 text-xs text-brand-muted">{t(T.dropHint)}</p>
              </div>
              {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {files.map((f, i) => (
                    <div key={f.url} className="relative">
                      <img src={f.url} alt="" className="h-20 w-20 rounded-[5px] object-cover" />
                      <button type="button" onClick={() => setFiles((s) => s.filter((_, k) => k !== i))} aria-label={t(T.remove)} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand-ink text-[10px] text-white"><i className="fa-solid fa-xmark" aria-hidden="true" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <div className="flex items-start gap-3">
                <Checkbox id="st-consent" checked={consent} onCheckedChange={(c) => { setConsent(!!c); setErrors((er) => ({ ...er, consent: undefined })); }} aria-invalid={!!errors.consent} />
                <Label htmlFor="st-consent" className="text-[13.5px] font-normal leading-relaxed text-brand-ink2">{t(T.consent)}</Label>
              </div>
              {errors.consent && <p className="pl-8 text-xs font-medium text-destructive">{errors.consent}</p>}
            </div>
            <div className="md:col-span-2 flex gap-3 rounded-[5px] bg-brand-tealsoft p-4 text-sm text-brand-deep"><i className="fa-solid fa-shield-halved mt-0.5" aria-hidden="true" /> {t(T.reviewNote)}</div>
            <div className="md:col-span-2 flex flex-wrap items-center gap-4">
              <Button type="submit" variant="teal" size="lg" disabled={state === 'sending'}>
                {state === 'sending' ? <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> {t(T.sending)}</> : <><i className="fa-solid fa-paper-plane" aria-hidden="true" /> {t(T.submit)}</>}
              </Button>
              {Object.values(errors).some(Boolean) && <p className="text-sm font-medium text-destructive" role="alert">{t(T.fixErrors)}</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Community() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  return (
    <>
      <PageHero image={img('bb-community', 1920, 1200)} crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} eyebrow={t(T.ey)} title={t(T.h1)} lead={t(T.lead)}>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button asChild variant="light"><a href="#submit"><i className="fa-solid fa-feather" aria-hidden="true" /> {t(T.share)}</a></Button>
          <Button asChild variant="outline-light"><a href="#wall">{t(T.wall)}</a></Button>
        </div>
      </PageHero>

      <section className="sec">
        <div className="container">
          <SectionHead center eyebrow={t(T.howEy)} title={t(T.howH)} />
          <div className="grid gap-4 md:grid-cols-3">
            {T.steps.map((s, i) => (
              <Reveal key={s.icon} delay={i * 100} className="relative flex flex-col gap-3 rounded-[5px] border border-brand-line p-7">
                <span className="absolute right-6 top-5 text-5xl text-brand-goldsoft" style={{ fontFamily: "'Bodoni Moda', serif" }}>{t({ en: `0${i + 1}`, bn: `০${'১২৩'[i]}` })}</span>
                <span className="grid h-12 w-12 place-items-center rounded-[5px] bg-brand-tealsoft text-lg text-brand-deep"><i className={`fa-solid ${s.icon}`} aria-hidden="true" /></span>
                <h3 className="serif-title text-2xl">{t(s.h)}</h3>
                <p className="text-brand-muted">{t(s.p)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-brand-cream scroll-mt-20" id="submit">
        <div className="container max-w-4xl">
          <SectionHead center eyebrow={t(T.formEy)} title={t(T.formH)} />
          <SubmitForm />
        </div>
      </section>

      <section className="sec scroll-mt-20" id="wall">
        <div className="container">
          <SectionHead eyebrow={t(T.wallEy)} title={t(T.wallH)} />
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {content.wall.map((w, i) => (
              <Reveal key={w.seed} delay={(i % 3) * 80} className="mb-5 break-inside-avoid overflow-hidden rounded-[5px] border border-brand-line bg-white transition-shadow hover:shadow-brand">
                {i % 2 === 0 && <div className="overflow-hidden" style={{ aspectRatio: i % 4 === 0 ? '4/5' : '4/3' }}><img src={img(w.seed, 700, i % 4 === 0 ? 875 : 525)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>}
                <div className="flex flex-col gap-3 p-6">
                  <i className="fa-solid fa-quote-left text-brand-gold2" aria-hidden="true" />
                  <blockquote className="font-serif text-[21px] leading-snug [html[lang=bn]_&]:text-lg [html[lang=bn]_&]:leading-relaxed">{t(w.q)}</blockquote>
                  <div className="flex items-center justify-between text-[13px] text-brand-muted">
                    <strong className="text-brand-ink">{t(w.name)}</strong>
                    <span className="inline-flex items-center gap-1.5"><i className="fa-solid fa-circle-check text-brand-teal" aria-hidden="true" /> {t(T.reviewed)}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-brand-paper">
        <div className="container">
          <SectionHead eyebrow={t(T.campEy)} title={t(T.campH)} />
          <div className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {CAMPAIGNS.map((c, i) => (
              <Reveal key={c.seed} delay={i * 70} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                <div className={cn('group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[5px] p-6 text-white', c.soon && 'grayscale-[.4]')}>
                  <img src={img(c.seed, 600, 760)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-20% to-black/80" />
                  {c.soon && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-ink">{t(T.soon)}</span>}
                  <strong className="font-mag text-[26px] font-medium leading-tight">{t(c.hash)}</strong>
                  <p className="text-sm text-white/85">{t(c.p)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="container max-w-2xl text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <h2 className="display-sm">{t(T.nlH)}</h2>
            <p className="text-brand-muted">{t(T.nlP)}</p>
            <NewsletterForm inline buttonVariant="default" className="w-full max-w-lg" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
