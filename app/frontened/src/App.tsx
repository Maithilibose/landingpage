import { Toaster } from './components/Ui/sonner';
import { TooltipProvider } from './components/Ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogRoutes from './blog-routes';
import Index from './pages/Index';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';
import RestorePage from './pages/sih/RestorePage';
import ExplorePage from './pages/sih/ExplorePage';
import ExploreArchivePage from './pages/sih/ExploreArchivePage';
import AboutPage from './pages/sih/AboutPage';

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* 1. Primary Landing Page — Cinematic Editorial Manuscript Restoration */}
    <Route path="/" element={<Index />} />

    {/* 2. SIH 06 Main Functional Application & Restoration Desk */}
    <Route path="/app" element={<RestorePage />} />
    <Route path="/restore" element={<RestorePage />} />

    {/* 3. SIH 06 Living Archive & Manuscript Catalogue */}
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/explore/archive" element={<ExploreArchivePage />} />

    {/* 4. SIH 06 Regional Manuscript Heritage & Interactive India Map */}
    <Route path="/about" element={<AboutPage />} />
    <Route path="/map" element={<AboutPage />} />

    {/* Blog & Auth */}
    <Route path="/blog/*" element={<BlogRoutes />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/auth/error" element={<AuthError />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
export { AppRoutes };
