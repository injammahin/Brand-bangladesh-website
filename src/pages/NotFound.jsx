import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Button } from '@/components/ui/button';
import { Monument } from '@/components/shared/Monument';

export default function NotFound() {
  const { t, u } = useLang();
  useDocumentTitle(u('notFound'));
  return (
    <section className="container grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="flex flex-col items-center gap-5">
        <Monument animated className="h-28 w-28 overflow-visible" />
        <h1 className="display-md">{u('notFound')}</h1>
        <p className="max-w-md text-brand-muted">{t({ en: 'The page may have moved. Try the search, or start again from the home page.', bn: 'পাতাটি হয়তো সরানো হয়েছে। খুঁজে দেখুন, অথবা প্রচ্ছদ থেকে আবার শুরু করুন।' })}</p>
        <Button asChild><Link to="/">{u('home')} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link></Button>
      </div>
    </section>
  );
}
