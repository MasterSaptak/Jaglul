import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QuickStats } from '../components/QuickStats';
import { VisionSection } from '../components/VisionSection';
import { ImpactAreas } from '../components/ImpactAreas';
import { LatestUpdates } from '../components/LatestUpdates';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { usePosts } from '../src/features/posts/context/PostsContext';

export const Home: React.FC = () => {
  const { posts, deletePost } = usePosts();
  
  // Filter for published posts to display on home
  const recentPosts = posts.filter(p => p.visibility === 'published').slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-army-cream/10">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VisionSection />
        <QuickStats />
        <ImpactAreas />
        <LatestUpdates posts={recentPosts} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};