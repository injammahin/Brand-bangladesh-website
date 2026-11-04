import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHero } from '@/components/shared/PageHero';

const T = {
  title: { en: 'Privacy & terms', bn: 'গোপনীয়তা ও শর্তাবলি' },
  home: { en: 'Home', bn: 'প্রচ্ছদ' },
  h1: { en: 'Privacy <em>and terms</em>', bn: 'গোপনীয়তা <em>ও শর্তাবলি</em>' },
  lead: { en: 'Template text for the design. Final wording must be approved by legal counsel.', bn: 'ডিজাইনের জন্য নমুনা লেখা। চূড়ান্ত ভাষ্য আইন বিশেষজ্ঞের অনুমোদন সাপেক্ষ।' },
};

const SECTIONS = [
  {
    id: 'privacy', h: { en: 'Privacy policy', bn: 'গোপনীয়তা নীতি' },
    items: [
      { h: { en: 'What we collect', bn: 'আমরা কী সংগ্রহ করি' }, p: { en: 'Only what you give us through forms (name, email, your story and photos) and, if you agree, anonymous analytics about how the site is used.', bn: 'শুধু ফরমের মাধ্যমে আপনি যা দেন (নাম, ইমেইল, গল্প ও ছবি) এবং আপনি সম্মতি দিলে সাইট ব্যবহারের বেনামি পরিসংখ্যান।' } },
      { h: { en: 'Consent before tracking', bn: 'ট্র্যাকিংয়ের আগে সম্মতি' }, p: { en: 'No analytics run until you accept. You can change your choice at any time from "Cookie settings" in the footer.', bn: 'আপনি সম্মতি না দেওয়া পর্যন্ত কোনো অ্যানালিটিক্স চলে না। ফুটারের "কুকি সেটিংস" থেকে যেকোনো সময় সিদ্ধান্ত বদলাতে পারেন।' } },
      { h: { en: 'How we use it', bn: 'কীভাবে ব্যবহার করি' }, p: { en: 'To answer inquiries, review and publish stories you send, and send the newsletter if you subscribe. We never sell personal data.', bn: 'প্রশ্নের উত্তর দিতে, আপনার পাঠানো গল্প পর্যালোচনা ও প্রকাশ করতে, আর সাবস্ক্রাইব করলে নিউজলেটার পাঠাতে। আমরা কখনো ব্যক্তিগত তথ্য বিক্রি করি না।' } },
      { h: { en: 'Your rights', bn: 'আপনার অধিকার' }, p: { en: 'You can ask to see, correct or delete your data by contacting us. We follow applicable data protection rules.', bn: 'যোগাযোগ করে আপনার তথ্য দেখতে, সংশোধন বা মুছে ফেলতে বলতে পারেন। আমরা প্রযোজ্য তথ্য সুরক্ষা বিধি মেনে চলি।' } },
    ],
  },
  {
    id: 'terms', h: { en: 'Terms of use', bn: 'ব্যবহারের শর্তাবলি' },
    items: [
      { h: { en: 'Using our content', bn: 'আমাদের কনটেন্ট ব্যবহার' }, p: { en: 'Text and images are protected. Media kit assets may be used with credit and in line with the brand guidelines.', bn: 'লেখা ও ছবি সুরক্ষিত। মিডিয়া কিটের উপকরণ কৃতজ্ঞতা স্বীকার করে ও ব্র্যান্ড নির্দেশিকা মেনে ব্যবহার করা যাবে।' } },
      { h: { en: 'Community submissions', bn: 'কমিউনিটির লেখা' }, p: { en: 'By submitting, you confirm the work is yours and grant us the right to review, edit lightly and publish it.', bn: 'লেখা পাঠিয়ে আপনি নিশ্চিত করছেন যে এটি আপনার নিজের, এবং আমাদের পর্যালোচনা, সামান্য সম্পাদনা ও প্রকাশের অধিকার দিচ্ছেন।' } },
      { h: { en: 'External links', bn: 'বাইরের লিংক' }, p: { en: 'We link to official authorities for regulations, visas and permits. Those sites are responsible for their own content.', bn: 'বিধিমালা, ভিসা ও অনুমতির জন্য আমরা সরকারি কর্তৃপক্ষের লিংক দিই। সেসব সাইটের কনটেন্টের দায় তাদের নিজেদের।' } },
    ],
  },
];

export default function Legal() {
  const { t } = useLang();
  useDocumentTitle(t(T.title));
  return (
    <>
      <PageHero crumbs={[{ label: t(T.home), to: '/' }, { label: t(T.title) }]} title={t(T.h1)} lead={t(T.lead)} />
      <div className="container max-w-3xl pb-24">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-brand-line py-10">
            <h2 className="display-sm mb-6">{t(s.h)}</h2>
            {s.items.map((it) => (
              <div key={it.h.en} className="mb-6">
                <h3 className="serif-title mb-1.5 text-2xl">{t(it.h)}</h3>
                <p className="text-brand-ink2">{t(it.p)}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
