import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Download, Moon, Search, Home, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  items?: {
    id: string;
    title: string;
  }[];
}

const contentSections: Record<string, string | (() => JSX.Element)> = {
  'overview': `# Pulse AI Documentation
## The Non-Judgmental Financial Assistant

### Overview
PulseAI is a supportive financial guide tailored for individuals and small businesses. Its focus is on promoting positive financial habits, building user confidence, and simplifying financial management without judgment or complexity.`,

  'features': `### Features

#### Fix Poor Habits

**Progress Tracking**
- Continuously monitors user progress against financial goals.

**Tailored Advice**
- Offers actionable tips to improve spending, saving, and budgeting habits.

**Motivation System**
- Sends encouraging notifications and rewards users for achieving milestones.`,

  'getting-started': `### How It Works

#### User Profile Setup
- Users input basic financial information and goals.
- Pulse AI customizes its approach based on user preferences.`,

  'integration': `### Integration Guide
- Step by step guide for integrating PulseAI.`,

  'whats-new': `### What's New
- New features and updates.`,

  'migration': `### Migration Guide
- Guide for migrating to Pulse AI V2.`,

  'advanced-features': `### Advanced Features
- Advanced features of Pulse AI V2.`,

  'contribute': `### How to Contribute
- Guide for contributing to the Pulse AI community.`,

  'community-guidelines': `### Community Guidelines
- Guidelines for the Pulse AI community.`,

  'community-showcase': `### Community Showcase
- Showcase of community projects.`,

  'future-enhancements': `### Future Enhancements
- Future enhancements and roadmap.`,

  'beta-features': `### Beta Features
- Beta features and testing.`,

  'faqs': () => <FAQSection />
};

const sections: Section[] = [
  {
    id: 'pulseai',
    title: 'PulseAI',
    items: [
      { id: 'overview', title: 'Overview' },
      { id: 'features', title: 'Features' },
      { id: 'getting-started', title: 'Getting Started' },
      { id: 'integration', title: 'Integration Guide' }
    ]
  },
  {
    id: 'pulseai-v2',
    title: 'PulseAI V2',
    items: [
      { id: 'whats-new', title: "What's New" },
      { id: 'migration', title: 'Migration Guide' },
      { id: 'advanced-features', title: 'Advanced Features' }
    ]
  },
  {
    id: 'community',
    title: 'Community',
    items: [
      { id: 'contribute', title: 'How to Contribute' },
      { id: 'community-guidelines', title: 'Community Guidelines' },
      { id: 'community-showcase', title: 'Community Showcase' }
    ]
  },
  {
    id: 'faqs',
    title: 'FAQs'
  },
  {
    id: 'future-enhancements',
    title: 'Future Enhancements'
  },
  {
    id: 'beta-features',
    title: 'Beta Features'
  }
];

const FAQSection: React.FC = () => {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const faqQuestions = [
    {
      id: 'what-is-pulseai',
      question: 'What is PulseAI?',
      answer: 'PulseAI is an AI-powered financial assistant designed to help individuals and small businesses improve their financial health through supportive guidance, personalized advice, and habit-building tools.'
    },
    {
      id: 'how-does-ai-work',
      question: "How does PulseAI's AI technology work?",
      answer: "PulseAI uses advanced machine learning algorithms to analyze your financial patterns, predict future trends, and provide personalized recommendations. It continuously learns from user interactions to improve its advice and insights."
    },
    {
      id: 'data-security',
      question: 'How secure is my financial data with PulseAI?',
      answer: `We take security seriously with multiple layers of protection:
- Bank-level 256-bit encryption
- Two-factor authentication
- Regular security audits
- No storage of sensitive banking credentials
- Compliance with financial regulations`
    },
    {
      id: 'predictive-analysis',
      question: 'How is Predictive Analysis different from Regular Analysis?',
      answer: `PulseAI's predictive analysis differs in several key ways:
- Uses AI to forecast future financial patterns
- Provides proactive recommendations
- Adapts to your changing financial behavior
- Offers personalized risk assessments
- Identifies potential financial opportunities`
    },
    {
      id: 'tracking-system',
      question: 'What is the Financial Tracking System?',
      answer: `Our tracking system includes:
- Real-time transaction monitoring
- Custom budget categories
- Automated expense classification
- Goal progress tracking
- Spending pattern analysis`
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">General</h2>
        <button 
          onClick={() => setExpandedQuestions(prev => 
            prev.length === faqQuestions.length ? [] : faqQuestions.map(q => q.id)
          )}
          className="text-blue-500 hover:text-blue-400"
        >
          {expandedQuestions.length === faqQuestions.length ? 'Close all' : 'Open all'}
        </button>
      </div>
      {faqQuestions.map((faq) => (
        <div 
          key={faq.id}
          className="border border-gray-800 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleQuestion(faq.id)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/50"
          >
            <span className="text-lg text-white">{faq.question}</span>
            <Plus 
              className={`w-5 h-5 transform transition-transform ${
                expandedQuestions.includes(faq.id) ? 'rotate-45' : ''
              }`}
            />
          </button>
          {expandedQuestions.includes(faq.id) && (
            <div className="px-6 py-4 bg-gray-800/25">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {faq.answer}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Docs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['pulseai']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContent = (sectionId: string) => {
    return contentSections[sectionId as keyof typeof contentSections] || '';
  };

  const updateRightSidebar = (content: string) => {
    const headers = content.match(/#{1,6}\s+.+/g) || [];
    return headers.map(header => {
      const level = header.match(/#{1,6}/)?.[0].length || 1;
      const text = header.replace(/#{1,6}\s+/, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      return { level, text, id };
    });
  };

  const currentContent = getContent(activeSection);
  const sidebarItems = updateRightSidebar(typeof currentContent === 'string' ? currentContent : '');

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#0D1117] border-b border-gray-800 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-300">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300">
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 flex">
        {/* Left Sidebar */}
        <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#0D1117] border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search docs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#161B22] border border-gray-700 rounded text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <nav>
              {sections.map((section) => (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => {
                      toggleSection(section.id);
                      if (!section.items) {
                        setActiveSection(section.id);
                      }
                    }}
                    className={`flex items-center w-full text-left px-2 py-1.5 rounded-md text-sm ${
                      activeSection === section.id || (section.items && section.items.some(item => activeSection === item.id))
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {section.title}
                    {section.items && (
                      <ChevronRight 
                        className={`w-4 h-4 ml-auto transition-transform ${
                          expandedSections.includes(section.id) ? 'transform rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                  {section.items && expandedSections.includes(section.id) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`flex items-center w-full text-left px-2 py-1.5 text-sm ${
                            activeSection === item.id
                              ? 'text-blue-400 font-medium'
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          <ChevronRight className="w-3 h-3 mr-2" />
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 mr-64 flex-1 min-h-screen">
          <div className="max-w-[calc(100%-2rem)] mx-auto px-6 py-8">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert max-w-none"
            >
              {typeof currentContent === 'function' ? (
                currentContent()
              ) : (
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-3xl font-bold mb-8 text-white border-b border-gray-800 pb-4 break-words" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 className="text-2xl font-semibold mt-12 mb-6 text-white break-words" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h3 className="text-xl font-medium mt-8 mb-4 text-white break-words" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="text-gray-300 leading-relaxed mb-6 break-words max-w-[65ch]" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="list-disc list-inside space-y-3 mb-6 text-gray-300 ml-4 break-words" {...props} />
                    ),
                    li: ({ ...props }) => (
                      <li className="text-gray-300 leading-relaxed break-words" {...props} />
                    ),
                    code: ({ className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <div className="rounded-lg overflow-hidden my-8 w-full">
                          <div className="bg-[#1E2433] px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                            {match[1].toUpperCase()}
                          </div>
                          <div className="overflow-x-auto">
                            <SyntaxHighlighter
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                background: '#161B22',
                                padding: '1.5rem',
                                margin: 0,
                                borderRadius: '0 0 0.5rem 0.5rem',
                                fontSize: '0.9rem',
                                lineHeight: '1.5',
                                width: '100%'
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      ) : (
                        <code className="bg-[#161B22] rounded px-1.5 py-0.5 text-sm text-blue-400 font-mono break-words" {...props}>
                          {children}
                        </code>
                      );
                    },
                    strong: ({ ...props }) => (
                      <strong className="font-semibold text-blue-400 break-words" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 text-gray-400 italic break-words" {...props} />
                    ),
                    table: ({ ...props }) => (
                      <div className="overflow-x-auto my-8 w-full">
                        <table className="min-w-full border border-gray-700 rounded-lg" {...props} />
                      </div>
                    ),
                    th: ({ ...props }) => (
                      <th className="bg-[#1E2433] text-left px-4 py-3 text-sm font-medium text-gray-300 border-b border-gray-700 break-words" {...props} />
                    ),
                    td: ({ ...props }) => (
                      <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700 break-words" {...props} />
                    )
                  }}
                >
                  {currentContent}
                </ReactMarkdown>
              )}
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] bg-[#0D1117] border-l border-gray-800 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-white mb-2">On this page</h3>
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                className={`block text-sm text-gray-400 hover:text-gray-300 ${
                  item.level > 2 ? 'pl-' + (item.level - 2) * 4 : ''
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Docs;
