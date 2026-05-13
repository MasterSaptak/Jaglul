import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GalleryProvider } from './context/GalleryContext';
import { PostsProvider } from './src/features/posts/context/PostsContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NewsArchive } from './pages/NewsArchive';
import { NewsPost } from './pages/NewsPost';
import { ImpactPage } from './pages/ImpactPage';
import { MediaGallery } from './pages/MediaGallery';
import { CommentPolicy } from './pages/CommentPolicy';
import { AdminLogin } from './pages/AdminLogin';
import { VisionGallery } from './pages/VisionGallery';
import { Feed } from './src/features/posts/pages/Feed';
import { AdminDashboard } from './src/features/posts/pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <GalleryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/feed" element={<Feed />} />
              
              {/* Flexible Update Routes */}
              <Route path="/news/:id" element={<NewsPost />} />
              <Route path="/update/:slug" element={<NewsPost />} />
              
              <Route path="/impact/:theme" element={<ImpactPage />} />
              <Route path="/vision/:slug" element={<VisionGallery />} />
              
              {/* Legacy / Catch-all filtered routes redirected to Feed */}
              <Route path="/news" element={<NewsArchive />} />
              <Route path="/gallery" element={<MediaGallery />} />
              
              <Route path="/comment-policy" element={<CommentPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Jaglul Studio Admin */}
              <Route path="/admin/studio" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </GalleryProvider>
      </PostsProvider>
    </AuthProvider>
  );
};

export default App;
