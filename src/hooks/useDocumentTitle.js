import { useEffect } from 'react';

/** Sets <title> and meta description — in production use SSR/prerender for SEO */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title.includes('Brand Bangladesh') || title.includes('ব্র্যান্ড বাংলাদেশ') ? title : `${title} — Brand Bangladesh`;
    if (description) {
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', description);
    }
  }, [title, description]);
}
