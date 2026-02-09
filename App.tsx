import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NewsArchive } from './pages/NewsArchive';
import { NewsPost } from './pages/NewsPost';
import { ImpactPage } from './pages/ImpactPage';
import { MediaGallery } from './pages/MediaGallery';
import { CommentPolicy } from './pages/CommentPolicy';
import { AdminLogin } from './pages/AdminLogin';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<NewsArchive />} />
          <Route path="/news/:id" element={<NewsPost />} />
          <Route path="/impact/:theme" element={<ImpactPage />} />
          <Route path="/gallery" element={<MediaGallery />} />
          <Route path="/comment-policy" element={<CommentPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;