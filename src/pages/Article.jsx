import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { toast } from 'sonner';
import content from '@/data/content';
import { issueById, pillarById, regionById, storyById } from '@/data/helpers';
import { articleBody } from '@/data/articleBody';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { img } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { StoryCard } from '@/components/shared/StoryCard';
import { IssueCover } from '@/components/shared/IssueCover';

const T = {
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  pub: { en: 'Publication', bn: 'প্রকাশনা' },
  stories: { en: 'Stories', bn: 'গল্প' },
  staff: { en: 'Brand Bangladesh editorial team', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয় দল' },
  words: { en: 'Words & photographs', bn: 'লেখা ও ছবি' },
  caption: { en: 'Photograph: Brand Bangladesh. Approved for media use with credit.', bn: 'ছবি: ব্র্যান্ড বাংলাদেশ। কৃতজ্ঞতা স্বীকার সাপেক্ষে গণমাধ্যমে ব্যবহারযোগ্য।' },
  listen: { en: 'Listen', bn: 'শুনুন' },
  stop: { en: 'Stop', bn: 'থামুন' },
  related: { en: 'Keep reading', bn: 'আরও পড়ুন' },
  relatedH: { en: 'Related <em>stories</em>', bn: 'সংশ্লিষ্ট <em>গল্প</em>' },
  fromIssue: { en: 'From the issue', bn: 'যে সংখ্যা থেকে' },
  connected: { en: 'Connected to', bn: 'সংশ্লিষ্ট' },
  sample: { en: 'Sample article text for the design. Real articles are published from the CMS.', bn: 'ডিজাইনের জন্য নমুনা লেখা। আসল লেখা সিএমএস থেকে প্রকাশিত হবে।' },
};

export default function Article() {
  const { id, issueId, n } = useParams();
  const { t, u, mins, lang } = useLang();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // Two sources: a website story (/article/:id) or a magazine feature (/publication/:issueId/:n)
  let a = null;
  if (id) {
    const s = storyById(id);
    if (s) a = { title: s.title, dek: s.ex, kicker: pillarById(s.pillar).name, seed: s.seed, min: s.min, pillar: s.pillar, region: s.region, issue: s.issue && issueById(s.issue) };
  } else if (issueId) {
    const iss = issueById(issueId);
    const art = iss?.articles[+n];
    if (art) a = { title: art.t, dek: iss.dek, kicker: art.k, seed: `${iss.seed}-${n}`, min: art.min, pillar: iss.pillars[0], region: iss.region, issue: iss };
  }
  useDocumentTitle(a ? t(a.title) : '', a ? t(a.dek) : undefined);
  if (!a) return <Navigate to="/publication" replace />;

  const body = articleBody(a.title);
  const p = pillarById(a.pillar);
  const r = regionById(a.region);
  const related = content.stories.filter((s) => s.id !== id && (s.pillar === a.pillar || s.region === a.region)).slice(0, 3);
  const crumbs = issueId
    ? [{ label: t(T.home), to: '/' }, { label: t(T.pub), to: '/publication' }, { label: t(a.issue.title), to: `/publication/${a.issue.id}` }]
    : [{ label: t(T.home), to: '/' }, { label: t(p.name), to: `/pillars/${p.id}` }];

  const listen = () => {
    if (!('speechSynthesis' in window)) return;
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
    const text = [t(a.title), t(body.intro), ...body.paras.map(t), t(body.h2), ...body.paras2.map(t)].join('. ');
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang === 'bn' ? 'bn-BD' : 'en-GB';
    speechSynthesis.speak(utt);
  };
  const share = async (kind) => {
    const url = window.location.href;
    if (kind === 'copy') { try { await navigator.clipboard.writeText(url); toast(u('copied')); } catch (e) { /* ignore */ } return; }
    const map = { fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(t(a.title))}`, li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` };
    window.open(map[kind], '_blank', 'noopener,width=600,height=500');
  };

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="stripe fixed inset-x-0 top-0 z-[200] h-[3px] origin-left" aria-hidden="true" />
      <article>
        <header className="pt-10">
          <motion.div className="container flex max-w-3xl flex-col gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Breadcrumb items={crumbs} />
            <span className="kicker" style={{ color: p.c }}>{t(a.kicker)}</span>
            <h1 className="display-md">{t(a.title)}</h1>
            <p className="lead">{t(a.dek)}</p>
            <div className="flex flex-wrap items-center justify-between gap-3 border-y border-brand-line py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-deep text-white"><i className="fa-solid fa-feather" aria-hidden="true" /></span>
                <div className="leading-tight"><strong className="block text-[15px]">{t(T.staff)}</strong><small className="text-brand-muted">{t(T.words)} · {mins(a.min)}</small></div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" onClick={listen} aria-label={t(T.listen)}><i className="fa-solid fa-headphones-simple" aria-hidden="true" /></Button>
                <Button size="icon" onClick={() => share('fb')} aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></Button>
                <Button size="icon" onClick={() => share('x')} aria-label="X"><i className="fa-brands fa-x-twitter" aria-hidden="true" /></Button>
                <Button size="icon" onClick={() => share('li')} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></Button>
                <Button size="icon" onClick={() => share('copy')} aria-label={u('copied')}><i className="fa-solid fa-link" aria-hidden="true" /></Button>
              </div>
            </div>
          </motion.div>
          <motion.figure className="container mt-9" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.15 }}>
            <div className="aspect-[16/9] overflow-hidden rounded-[5px] bg-brand-paper"><img src={img(a.seed, 1800, 1000)} alt={t(a.title)} width="1800" height="1000" className="h-full w-full object-cover" /></div>
            <figcaption className="mt-2.5 text-[13px] text-brand-muted">{t(T.caption)}</figcaption>
          </motion.figure>
        </header>

        <div className="container prose-bb max-w-3xl py-12">
          <p className="dropcap">{t(body.intro)}</p>
          {body.paras.map((x, i) => <p key={i}>{t(x)}</p>)}
          <blockquote className="my-9 border-l-4 border-brand-gold py-2.5 pl-6 font-mag text-[clamp(24px,2.6vw,32px)] italic leading-snug [html[lang=bn]_&]:not-italic [html[lang=bn]_&]:leading-relaxed">{t(body.quote)}</blockquote>
          <h2>{t(body.h2)}</h2>
          {body.paras2.map((x, i) => <p key={i}>{t(x)}</p>)}
          <p className="!font-sans !text-xs !text-brand-muted"><i className="fa-solid fa-circle-info" aria-hidden="true" /> {t(T.sample)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-brand-line pt-6">
            <span className="mr-1 text-sm font-semibold">{t(T.connected)}:</span>
            <Link to={`/pillars/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-brand-line px-3 py-1 text-[13px] font-semibold hover:border-brand-deep"><i className={`fa-solid ${p.icon}`} style={{ color: p.c }} aria-hidden="true" /> {t(p.name)}</Link>
            <Link to={`/regions/${r.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-brand-line px-3 py-1 text-[13px] font-semibold hover:border-brand-deep"><i className="fa-solid fa-location-dot text-brand-gold" aria-hidden="true" /> {t(r.name)}</Link>
          </div>
        </div>
      </article>

      {a.issue && (
        <section className="pb-16">
          <div className="container max-w-3xl">
            <Link to={`/publication/${a.issue.id}`} className="group grid grid-cols-[110px_1fr] items-center gap-5 rounded-[5px] bg-brand-cream p-5 [perspective:1000px]">
              <IssueCover issue={a.issue} small className="tilt" />
              <div>
                <span className="kicker">{t(T.fromIssue)}</span>
                <strong className="serif-title block text-2xl leading-tight">{t(a.issue.title)}</strong>
                <span className="text-sm text-brand-muted">{t(a.issue.dek)}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="sec bg-brand-cream">
          <div className="container">
            <SectionHead eyebrow={t(T.related)} title={t(T.relatedH)} />
            <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{related.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
