import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QuickStats } from '../components/QuickStats';
import { VisionSection } from '../components/VisionSection';
import { ImpactAreas } from '../components/ImpactAreas';
import { LifeSketch } from '../components/LifeSketch';
import { LatestUpdates } from '../components/LatestUpdates';
import { GalleryPreview } from '../components/GalleryPreview';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { usePosts } from '../src/features/posts/context/PostsContext';

export const Home: React.FC = () => {
  const { posts } = usePosts();

  return (
    <div className="min-h-screen flex flex-col bg-army-cream/10">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <QuickStats />
        <VisionSection />
        <ImpactAreas />
        <LifeSketch />
        <LatestUpdates posts={posts} />
        <GalleryPreview />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
