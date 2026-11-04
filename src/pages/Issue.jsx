import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import content from '@/data/content';
import { issueById, pillarById, regionById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { img, pad } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHead } from '@/components/shared/SectionHead';
import { IssueCard, IssueCover } from '@/components/shared/IssueCover';
import { Flipbook } from '@/components/shared/Flipbook';

const T = {
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  pub: { en: 'Publication', bn: 'প্রকাশনা' },
  note: { en: "Editor's note", bn: 'সম্পাদকের কথা' },
  editor: { en: '— The Editor', bn: '— সম্পাদক' },
  pages: { en: 'pages', bn: 'পৃষ্ঠা' },
  inside: { en: 'Inside this issue', bn: 'এই সংখ্যায়' },
  insideH: { en: 'Featured <em>articles</em>', bn: 'নির্বাচিত <em>লেখা</em>' },
  flipEy: { en: 'Read it like a magazine', bn: 'ম্যাগাজিনের মতো পড়ুন' },
  flipH: { en: 'Turn <em>the pages</em>', bn: 'পাতা <em>উল্টে দেখুন</em>' },
  more: { en: 'More issues', bn: 'আরও সংখ্যা' },
  share: { en: 'Share', bn: 'শেয়ার' },
  defaultNote: { en: 'Every issue of Brand Bangladesh picks one theme and follows it deep: into the places, the people and the ideas that shape the country. We hope you enjoy reading it as much as we enjoyed making it.', bn: 'ব্র্যান্ড বাংলাদেশের প্রতিটি সংখ্যা একটি বিষয় বেছে নিয়ে গভীরে যায়—সেই জায়গা, মানুষ আর ভাবনার কাছে, যা দেশটিকে গড়ে তোলে। যতটা ভালোবাসা নিয়ে আমরা এটি তৈরি করেছি, পড়তে গিয়ে আপনিও ততটাই আনন্দ পাবেন—এই আমাদের প্রত্যাশা।' },
};

export default function Issue() {
  const { id } = useParams();
  const { t, u, num, monthYear, mins } = useLang();
  const issue = issueById(id);
  useDocumentTitle(issue ? `${t(issue.title)} · ${u('issue')} ${num(pad(issue.no))}` : '');
  if (!issue) return <Navigate to="/publication" replace />;
  const region = regionById(issue.region);
  const more = content.issues.filter((i) => i.id !== issue.id).slice(0, 4);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: t(issue.title), url });
      else { await navigator.clipboard.writeText(url); toast(u('copied')); }
    } catch (e) { /* cancelled */ }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute -left-40 top-20 -z-10 h-[520px] w-[520px] rounded-full opacity-25 blur-[100px]" style={{ background: issue.c }} />
        <div className="container grid items-center gap-10 pb-20 pt-10 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="group mx-auto w-full max-w-[380px] [perspective:1400px]"><IssueCover issue={issue} className="tilt" /></div>
          </Reveal>
          <Reveal delay={100} className="order-1 flex flex-col gap-5 lg:order-2">
            <Breadcrumb items={[{ label: t(T.home), to: '/' }, { label: t(T.pub), to: '/publication' }, { label: t(issue.title) }]} />
            <span className="eyebrow">{u('issue')} {num(pad(issue.no))} · {monthYear(issue.month, issue.year)}</span>
            <h1 className="display">{t(issue.title)}</h1>
            <p className="lead">{t(issue.dek)}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline"><i className="fa-regular fa-file-lines" aria-hidden="true" /> {num(issue.pages)} {t(T.pages)}</Badge>
              <Badge variant="outline"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {t(region.name)}</Badge>
              {issue.pillars.map((pid) => { const p = pillarById(pid); return <Badge key={pid} variant="outline"><i className={`fa-solid ${p.icon}`} style={{ color: p.c }} aria-hidden="true" /> {t(p.name)}</Badge>; })}
            </div>
            <div className="rounded-[5px] border-l-4 border-brand-gold bg-brand-cream p-6">
              <span className="kicker">{t(T.note)}</span>
              <p className="mt-2 font-serif text-[20px] leading-relaxed text-brand-ink2 [html[lang=bn]_&]:text-[17px]">{t(issue.note || T.defaultNote)}</p>
              <cite className="mt-2 block font-mag italic text-brand-gold">{t(T.editor)}</cite>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild><a href="#flipbook"><i className="fa-solid fa-book-open-reader" aria-hidden="true" /> {u('readOnline')}</a></Button>
              <Button variant="outline" onClick={() => toast(`${t(issue.title)}.pdf ${u('downloading')}`)}><i className="fa-solid fa-file-arrow-down" aria-hidden="true" /> {u('pdf')}</Button>
              <Button variant="ghost" onClick={share}><i className="fa-solid fa-share-nodes" aria-hidden="true" /> {t(T.share)}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec bg-brand-cream">
        <div className="container">
          <SectionHead eyebrow={t(T.inside)} title={t(T.insideH)} />
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
            {issue.articles.map((a, k) => (
              <Reveal key={k} delay={k * 70}>
                <Link to={`/publication/${issue.id}/${k}`} className="group grid grid-cols-[110px_1fr] items-center gap-4 lg:grid-cols-[150px_1fr]">
                  <div className="img-zoom aspect-square overflow-hidden rounded-[5px] bg-brand-paper"><img src={img(`${issue.seed}-${k}`, 400, 400)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                  <div className="flex flex-col gap-1.5">
                    <span className="kicker">{t(a.k)} · {t({ en: 'p.', bn: 'পৃ.' })} {num(a.p)}</span>
                    <h3 className="serif-title text-[22px] leading-tight transition-colors group-hover:text-brand-deep">{t(a.t)}</h3>
                    <span className="text-[12.5px] text-brand-muted"><i className="fa-regular fa-clock" aria-hidden="true" /> {mins(a.min)}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec scroll-mt-20" id="flipbook">
        <div className="container">
          <SectionHead center eyebrow={t(T.flipEy)} title={t(T.flipH)} />
          <Reveal><Flipbook issue={issue} /></Reveal>
        </div>
      </section>

      <section className="sec !pt-0">
        <div className="container">
          <SectionHead title={t(T.more)} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:gap-x-8">{more.map((i) => <IssueCard key={i.id} issue={i} />)}</div>
        </div>
      </section>
    </>
  );
}
