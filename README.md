# Brand Bangladesh — Frontend

National identity website for Brand Bangladesh, built from the *Website Requirements Specification*.
Bilingual (English / বাংলা), mobile-first, editorial magazine look.

**Stack:** React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · shadcn/ui (Radix) · Framer Motion · Font Awesome 6 · Sonner toasts

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the build locally
```

Requires Node 18 or newer.

## Deploy

- **Vercel:** import the repo; framework preset "Vite". `vercel.json` already rewrites all routes to `index.html`.
- **Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing.

## Pages (routes)

| Route | Section in the spec |
|---|---|
| `/` | Home: hero showcase, at-a-glance numbers, 6 pillar tiles, featured stories, latest issue, regions map, share/newsletter |
| `/story` | The Brand Story: scrolling chapters, pull quote, animated timeline, brand film, values, brand kit download |
| `/pillars`, `/pillars/:id` | Six Brand Pillars: intro, key facts, sub-topics, setup steps (investment), stories, regions, issues, CTA |
| `/regions`, `/regions/:id` | Interactive keyboard-accessible map of 8 divisions + region pages |
| `/numbers` | Numbers & Stories: figure cards with source + year, mini charts, pillar/region filters, PNG infographic download |
| `/publication` | Magazine archive (filter by year, month, theme, search), reports/brochures/press, media kit |
| `/publication/:id` | Issue page: cover, editor's note, articles, **online flipbook**, PDF download |
| `/publication/:issueId/:n`, `/article/:id` | Feature article as a normal web page (reading progress, listen, share) |
| `/community` | Story submission form (validation, photo upload, consent, review notice), story wall, campaigns |
| `/about` | Mission, partners, contact form that routes by topic (investment, exports, tourism, media), FAQ |
| `/legal` | Privacy policy and terms |

## Project structure

```
src/
  components/
    ui/        shadcn/ui components (button, input, sheet, tabs, accordion, checkbox…)
    layout/    Header, Footer, Loader, LanguageSwitch, SearchDialog, CookieConsent, Layout
    shared/    StoryCard, IssueCover, PillarTile, BdMap, Flipbook, CountUp, Reveal…
  context/     LanguageContext (EN/BN, Bangla numerals, month names)
  data/        content.js (all bilingual demo content), ui.js (interface strings), helpers.js
  pages/       one file per route
  index.css    Tailwind + brand tokens + custom animations
```

## Language

- Every string is an `{ en, bn }` object. `t(obj)` picks the current language; `num()` converts digits to Bangla numerals.
- The switch keeps you on the same page. The choice is saved in `localStorage`, and `?lang=bn` in a URL opens the Bangla version.
- Bangla uses Tiro Bangla / Hind Siliguri and gets slightly larger type and line height.

## Accessibility & privacy

- Skip link, visible focus rings, keyboard map, flipbook arrow keys, labelled forms with inline errors.
- `prefers-reduced-motion` is respected (animations and the slideshow stop).
- No analytics run until the visitor accepts in the cookie banner (`loadAnalytics()` in `CookieConsent.jsx`).

## Before launch — replace the demo parts

1. **Images** are real Bangladesh photos from Wikimedia Commons (free licences, mostly CC BY-SA), self-hosted in `public/photos` at 960/1920px. `src/data/photos.js` maps each content seed to a photo and lists its Commons file name for credits. Before launch, replace them with approved photography or add photographer credits.
2. **Numbers** in `src/data/content.js` are placeholders. Verify every figure against its official source.
3. **Forms** (story submission, contact, newsletter) simulate sending. Look for `TODO` comments and connect them to the CMS / API.
4. **Downloads** (PDFs, media kit) show a toast. Point them to real files from the CMS.
5. **Flipbook pages** are generated from issue data. In production, render them from the uploaded PDF (e.g. with pdf.js).
6. **SEO:** this is a client-side SPA. For Google indexing in both languages, prerender or move to SSR (e.g. Next.js), and add `hreflang` tags per page.
7. **Contact details**, partner logos and official authority links (BIDA, BEZA, BEPZA) are placeholders.
