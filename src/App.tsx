import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GalleryProvider } from './context/GalleryContext';
import { PostsProvider } from './features/posts/context/PostsContext';
import { VideosProvider } from './context/VideosContext';

// ── Lazy-loaded pages (route-level code splitting) ──────────
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NewsArchive = lazy(() => import('./pages/NewsArchive').then(m => ({ default: m.NewsArchive })));
const NewsPost = lazy(() => import('./pages/NewsPost').then(m => ({ default: m.NewsPost })));
const ImpactPage = lazy(() => import('./pages/ImpactPage').then(m => ({ default: m.ImpactPage })));
const MediaGallery = lazy(() => import('./pages/MediaGallery').then(m => ({ default: m.MediaGallery })));
const CommentPolicy = lazy(() => import('./pages/CommentPolicy').then(m => ({ default: m.CommentPolicy })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const VisionGallery = lazy(() => import('./pages/VisionGallery').then(m => ({ default: m.VisionGallery })));
const Feed = lazy(() => import('./features/posts/pages/Feed').then(m => ({ default: m.Feed })));
const AdminDashboard = lazy(() => import('./features/posts/pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// ── Page loader (shown during lazy chunk download) ──────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-army-cream/10">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-army-green/20 border-t-army-green rounded-full animate-spin mx-auto mb-4" />
      <p className="text-army-olive/60 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <GalleryProvider>
          <VideosProvider>
            <Router>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/feed" element={<Feed />} />

                  {/* Flexible Update Routes */}
                  <Route path="/news/:id" element={<NewsPost />} />
                  <Route path="/update/:slug" element={<NewsPost />} />

                  <Route path="/impact/:theme" element={<ImpactPage />} />
                  <Route path="/vision/:slug" element={<VisionGallery />} />

                  {/* Legacy / Catch-all filtered routes */}
                  <Route path="/news" element={<NewsArchive />} />
                  <Route path="/gallery" element={<MediaGallery />} />

                  <Route path="/comment-policy" element={<CommentPolicy />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Jaglul Studio Admin */}
                  <Route path="/admin/studio" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </Router>
          </VideosProvider>
        </GalleryProvider>
      </PostsProvider>
    </AuthProvider>
  );
};

export default App;
