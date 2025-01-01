import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Article from './pages/Article';
import AiCompanion from './pages/AiCompanion';
import Community from './pages/Community';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import FinancialNews from './pages/FinancialNews';
import About from './pages/About';
import FinTechHub from './pages/FinTechHub';
import Chatbot from './pages/Chatbot';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const isChatbot = location.pathname === '/chatbot';

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          {/* Primary Meta Tags */}
          <title>FinTech Pulse Network | AI-Driven Financial Technology Insights</title>
          <meta name="title" content="FinTech Pulse Network | AI-Driven Financial Technology Insights" />
          <meta name="description" content="FinTech Pulse Network (FPN) is a leading platform providing AI-driven insights, analysis, and networking opportunities in the financial technology sector. Founded by Basil Jilani." />
          <meta name="keywords" content="FinTech Pulse Network, FPN, fintech, financial technology, Basil Jilani, AI insights, financial analysis, digital banking, blockchain, machine learning" />
          <meta name="author" content="Basil Jilani" />
          <link rel="canonical" href="https://fintechpulsenetwork.com" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fintechpulsenetwork.com" />
          <meta property="og:title" content="FinTech Pulse Network | AI-Driven Financial Technology Insights" />
          <meta property="og:description" content="FinTech Pulse Network (FPN) is a leading platform providing AI-driven insights, analysis, and networking opportunities in the financial technology sector. Founded by Basil Jilani." />
          <meta property="og:image" content="https://fintechpulsenetwork.com/social-preview.png" />
          <meta property="og:site_name" content="FinTech Pulse Network" />

          {/* Social Media */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="FinTech Pulse Network | AI-Driven Financial Technology Insights" />
          <meta name="twitter:description" content="FinTech Pulse Network (FPN) is a leading platform providing AI-driven insights, analysis, and networking opportunities in the financial technology sector." />
          <meta name="twitter:image" content="https://fintechpulsenetwork.com/social-preview.png" />
          <meta property="og:see_also" content="https://www.linkedin.com/company/fintechpulse-net/" />

          {/* Site-wide Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FinTech Pulse Network",
              "alternateName": "FPN",
              "url": "https://fintechpulsenetwork.com",
              "logo": "https://fintechpulsenetwork.com/pulse-logo.svg",
              "description": "FinTech Pulse Network (FPN) is a leading platform providing AI-driven insights, analysis, and networking opportunities in the financial technology sector.",
              "founder": {
                "@type": "Person",
                "name": "Basil Jilani",
                "jobTitle": "CEO & Founder",
                "sameAs": "https://www.linkedin.com/in/basiljilani/"
              },
              "sameAs": [
                "https://www.linkedin.com/company/fintechpulse-net/"
              ]
            })}
          </script>
        </Helmet>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/ai-companion" element={<AiCompanion />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/community" element={<Community />} />
            <Route path="/fintech-hub" element={<FinTechHub />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financial-news" element={<FinancialNews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isChatbot && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
