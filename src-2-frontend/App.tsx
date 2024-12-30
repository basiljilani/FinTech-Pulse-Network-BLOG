import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/ai-companion" element={<AiCompanion />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/community" element={<Community />} />
          <Route path="/fintech-hub" element={<FinTechHub />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/financial-news" element={<FinancialNews />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
