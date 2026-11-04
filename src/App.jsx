import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

// Code-split every page except Home so first load stays fast
const Story = lazy(() => import('@/pages/Story'));
const Pillars = lazy(() => import('@/pages/Pillars'));
const Pillar = lazy(() => import('@/pages/Pillar'));
const Regions = lazy(() => import('@/pages/Regions'));
const Region = lazy(() => import('@/pages/Region'));
const Numbers = lazy(() => import('@/pages/Numbers'));
const Publication = lazy(() => import('@/pages/Publication'));
const Issue = lazy(() => import('@/pages/Issue'));
const Article = lazy(() => import('@/pages/Article'));
const Community = lazy(() => import('@/pages/Community'));
const About = lazy(() => import('@/pages/About'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="story" element={<Story />} />
            <Route path="pillars" element={<Pillars />} />
            <Route path="pillars/:id" element={<Pillar />} />
            <Route path="regions" element={<Regions />} />
            <Route path="regions/:id" element={<Region />} />
            <Route path="numbers" element={<Numbers />} />
            <Route path="publication" element={<Publication />} />
            <Route path="publication/:id" element={<Issue />} />
            <Route path="publication/:issueId/:n" element={<Article />} />
            <Route path="article/:id" element={<Article />} />
            <Route path="community" element={<Community />} />
            <Route path="about" element={<About />} />
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </MotionConfig>
  );
}
