import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Article from './pages/Article';
import AiCompanion from './pages/AiCompanion';
import NewCommunity from './pages/NewCommunity';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import FinancialNews from './pages/FinancialNews';
import About from './pages/About';
import FinTechHub from './pages/FinTechHub';
import Chatbot from './pages/Chatbot';
import Docs from './pages/Docs';
import PulseAI from './pages/docs/PulseAI';
import PulseAIV2 from './pages/docs/PulseAIV2';
import Directory from './pages/Directory';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import ProfileDashboard from './pages/ProfileDashboard';
import Checkout from './pages/Checkout';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/chatbot' || location.pathname === '/';

  return (
    <AuthProvider>
      <HelmetProvider>
        <div className="flex flex-col min-h-screen">
          <Helmet>
            {/* Primary Meta Tags */}
            <title>FinTech Pulse Network</title>
            <meta name="title" content="FinTech Pulse Network" />
            <meta name="description" content="FinTech Pulse Network (FPN) emerges as the ultimate solution for financial empowerment." />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://fintechpulsenetwork.com/" />
            <meta property="og:title" content="FinTech Pulse Network" />
            <meta property="og:description" content="FinTech Pulse Network (FPN) emerges as the ultimate solution for financial empowerment." />
            <meta property="og:image" content="/social-preview.png" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://fintechpulsenetwork.com/" />
            <meta property="twitter:title" content="FinTech Pulse Network" />
            <meta property="twitter:description" content="FinTech Pulse Network (FPN) emerges as the ultimate solution for financial empowerment." />
            <meta property="twitter:image" content="/social-preview.png" />

            {/* Schema.org markup */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "FinTech Pulse Network",
                "description": "FinTech Pulse Network (FPN) emerges as the ultimate solution for financial empowerment.",
                "url": "https://fintechpulsenetwork.com",
                "logo": "/pulse-logo.png",
                "sameAs": [
                  "https://twitter.com/fintechpulse",
                  "https://linkedin.com/company/fintech-pulse-network"
                ]
              })}
            </script>
          </Helmet>
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow bg-black">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/articles/:id" element={<Article />} />
              <Route path="/ai-companion" element={<AiCompanion />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/community" element={<NewCommunity />} />
              <Route path="/fintech-hub" element={<FinTechHub />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/docs/pulse-ai" element={<PulseAI />} />
              <Route path="/docs/pulse-ai-v2" element={<PulseAIV2 />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial-news" element={<FinancialNews />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfileDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!hideFooter && <Footer />}
        </div>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
