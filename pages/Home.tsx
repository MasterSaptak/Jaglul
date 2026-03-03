import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { NewsTicker } from '../components/NewsTicker';
import { Hero } from '../components/Hero';
import { QuickStats } from '../components/QuickStats';
import { VisionSection } from '../components/VisionSection';
import { ImpactAreas } from '../components/ImpactAreas';
import { VideoGallery } from '../components/VideoGallery';
import { NewsSection } from '../components/NewsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { INITIAL_POSTS, INITIAL_VIDEOS } from '../constants';
import { Post, Video } from '../types';

export const Home: React.FC = () => {
  // Local state to simulate database updates
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [tickerItems, setTickerItems] = useState([
    "Colonel (Retd.) Md. Jaglul Ahsan — 30+ years of distinguished military service",
    "Sena Utkarsh Padak (SUP) recipient 2019 — Recognized for military excellence",
    "UN Peacekeeping missions — Sierra Leone & Mali with 'Outstanding' evaluation",
    "Advocate for veterans welfare, anti-corruption, and institutional reform"
  ]);

  const handleAddVideo = (url: string, title: string) => {
    // Extract ID (simple regex for demo)
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;

    if (id) {
        const newVideo: Video = {
            id: Date.now().toString(),
            title: title,
            thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            youtubeId: id
        };
        setVideos([newVideo, ...videos]);
    } else {
        alert("Invalid YouTube URL");
    }
  };

  const handleDeleteVideo = (id: string) => {
    if(window.confirm("Are you sure you want to remove this video?")) {
        setVideos(videos.filter(v => v.id !== id));
    }
  };

  const handleDeletePost = (id: string) => {
    if(window.confirm("Are you sure you want to remove this post?")) {
        setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker updates={tickerItems} />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VisionSection />
        <QuickStats />
        <ImpactAreas />
        <VideoGallery 
            videos={videos} 
            onAddVideo={handleAddVideo} 
            onDeleteVideo={handleDeleteVideo}
        />
        <NewsSection 
            posts={posts}
            onDeletePost={handleDeletePost}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};