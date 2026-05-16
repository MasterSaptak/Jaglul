import React, { lazy, Suspense } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QuickStats } from '../components/QuickStats';
import { usePosts } from '../features/posts/context/PostsContext';
import { Footer } from '../components/Footer';

// ── Lazy load below-the-fold sections ───────────────────────
const VisionSection = lazy(() => import('../components/VisionSection').then(m => ({ default: m.VisionSection })));
const ImpactAreas = lazy(() => import('../components/ImpactAreas').then(m => ({ default: m.ImpactAreas })));
const LifeSketch = lazy(() => import('../components/LifeSketch').then(m => ({ default: m.LifeSketch })));
const LatestUpdates = lazy(() => import('../components/LatestUpdates').then(m => ({ default: m.LatestUpdates })));
const GalleryPreview = lazy(() => import('../components/GalleryPreview').then(m => ({ default: m.GalleryPreview })));
const ContactSection = lazy(() => import('../components/ContactSection').then(m => ({ default: m.ContactSection })));

// Minimal section placeholder during lazy load
const SectionLoader = () => (
  <div className="w-full py-16 flex justify-center">
    <div className="w-8 h-8 border-3 border-army-green/15 border-t-army-green/60 rounded-full animate-spin" />
  </div>
);

export const Home: React.FC = () => {
  const { posts } = usePosts();

  return (
    <div className="min-h-screen flex flex-col bg-army-cream/10">
      <Navbar />
      <main className="flex-grow">
        {/* Above the fold — loaded eagerly */}
        <Hero />
        <QuickStats />

        {/* Below the fold — lazy loaded on demand */}
        <Suspense fallback={<SectionLoader />}>
          <VisionSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ImpactAreas />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LifeSketch />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LatestUpdates posts={posts} />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <GalleryPreview />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
