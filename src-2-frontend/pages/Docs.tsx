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
  'overview': `# **Pulse AI Documentation**
## **The Non-Judgmental Financial Assistant**

### **Overview**
**PulseAI: Transforming Financial Management with AI**
In today’s fast-paced financial environment, individuals and small businesses often face challenges in managing their finances efficiently. The high costs of traditional accounting services, coupled with the complexity of financial systems, have created a gap for innovative, accessible, and intelligent solutions. PulseAI bridges this gap by providing an advanced conversational chatbot designed to make financial management simpler, more intuitive, and affordable for all users.

**What is PulseAI?**
PulseAI is an intelligent finance consulting chatbot that revolutionizes the way individuals and businesses approach their financial management. It enables users to generate accurate financial reports, including income statements and balance sheets, through seamless, natural language interactions. Powered by DeepSeek R1 technology, PulseAI combines the latest AI advancements with an easy-to-use platform that eliminates the need for extensive financial knowledge.

**Key Features of PulseAI:**
1. **Conversational Engagement:** PulseAI adopts a user-friendly, conversational interface that simplifies data collection. Through intuitive prompts and natural language understanding, it enables users to provide essential financial details without the intimidation of traditional financial tools. This feature makes financial management accessible even to users with minimal expertise.

2. **Real-Time Data Processing:** The chatbot processes financial inputs immediately, delivering near-instantaneous insights and reports. It also ensures user privacy by eliminating data storage, allowing for a seamless interaction without compromising security.

3. **Integration with QuickBooks:** PulseAI integrates directly with QuickBooks via its API, automating data entry and enabling the generation of up-to-date financial reports. This feature is particularly beneficial for small businesses and freelancers, as it streamlines accounting processes and minimizes errors.

4. **Automated Report Generation:** With a few simple inputs, users can generate detailed financial documents like income statements and balance sheets. The chatbot leverages QuickBooks functionality to provide comprehensive, accurate, and professional-grade reports, all while maintaining a clean and easy-to-read format.

5. **Enhanced User Experience:** PulseAI’s clean interface and digestible report presentations cater to a wide range of users. By prioritizing simplicity and clarity, it ensures that users can understand their financial standing at a glance, fostering better financial literacy and confidence.

**Who Can Benefit from PulseAI?**
PulseAI serves a diverse audience, including individuals, small business owners, and freelancers. It caters to those who seek assistance with financial management but lack the expertise or resources to hire professional accountants. Entrepreneurs and independent professionals also find it invaluable for tracking expenses, generating reports, and preparing for tax filings.

**Why PulseAI?**
PulseAI offers a cost-effective alternative to traditional accounting services, making it an ideal choice for users who want to save time and money. It not only simplifies financial reporting but also promotes financial literacy by providing actionable insights in an easily understandable manner. By leveraging AI-driven technology, PulseAI empowers users to take control of their finances confidently and effectively.

**Conclusion:**
PulseAI represents a transformative step in financial management, addressing the pain points of traditional methods with a smart, efficient, and user-focused solution. Whether for individuals striving to better understand their finances or small businesses looking for affordable reporting tools, PulseAI delivers unparalleled value and accessibility. With its innovative features and focus on user empowerment, it is poised to redefine financial consulting in the digital age.`,

  'features': `### Features

**Key Features of PulseAI**
PulseAI is designed to address the diverse financial management needs of individuals, freelancers, and small businesses. Its innovative features combine cutting-edge AI technology with an intuitive user experience, making financial reporting and decision-making accessible to everyone. Below is an in-depth overview of the key features of PulseAI:

1. **Conversational Engagement**
PulseAI offers a seamless, natural language interface that simplifies financial management. Instead of navigating complex software, users can engage in intuitive conversations with the chatbot to input data and request insights.
* **User-Friendly Interaction:** The AI chatbot communicates in plain language, breaking down technical financial terms into simple, understandable instructions.
* **Guided Data Collection:** Through intelligent prompts, users are guided step-by-step to provide the necessary financial details without requiring prior accounting expertise.
This conversational feature reduces barriers for users unfamiliar with traditional accounting methods.

2. **Real-Time Data Processing**
One of PulseAI’s standout features is its ability to process financial inputs in real time. Users can receive immediate feedback and insights without waiting for data to be manually processed.
* **Instant Report Generation:** Once data is entered, PulseAI processes it instantly to produce accurate financial reports.
* **Enhanced Privacy:** The platform does not store sensitive user data, ensuring complete privacy and compliance with security standards.
This capability is particularly valuable for users who need quick, actionable financial insights.

3. **Integration with QuickBooks**
PulseAI integrates seamlessly with QuickBooks, one of the most popular accounting platforms. This integration enhances its capabilities, enabling users to automate tasks and access real-time data from their QuickBooks accounts.
* **Automated Data Entry:** Users can sync their QuickBooks accounts, eliminating the need for manual data input.
* **Up-to-Date Financial Reports:** With QuickBooks integration, users receive real-time updates and access to comprehensive reports, ensuring accuracy and efficiency.
This feature makes PulseAI an ideal tool for small business owners and freelancers who already use QuickBooks for their accounting needs.

4. **Automated Report Generation**
PulseAI’s automated report generation feature simplifies the creation of essential financial documents such as income statements, balance sheets, and cash flow statements.
* **Professional-Grade Reports:** The platform generates polished, professional reports that are ready for use in business presentations or audits.
* **Easy-to-Digest Format:** Reports are designed to be visually appealing and easy to understand, even for users without a financial background.
This feature is particularly helpful for users preparing for tax filings, financial reviews, or investor meetings.

5. **User-Friendly Interface**
The design of PulseAI prioritizes user experience, ensuring that even first-time users can navigate the platform effortlessly.
* **Clean and Intuitive Design:** The interface is organized and easy to use, with clear instructions and visual aids.
* **Customizable Output:** Users can tailor the format of reports and insights to suit their preferences, making the data more actionable.
This accessibility ensures that users of all technical skill levels can leverage the platform to its fullest potential.

6. **Financial Literacy and Empowerment**
Beyond report generation, PulseAI is a tool for enhancing financial literacy. By providing actionable insights and breaking down complex financial concepts, it empowers users to make informed decisions.
* **Simplified Financial Concepts:** Users learn key financial principles as they interact with the chatbot.
* **Confidence Building:** By eliminating the intimidation of traditional financial tools, PulseAI helps users gain confidence in managing their finances.
This feature positions PulseAI as not just a tool, but a financial mentor for its users.

7. **Cost-Effective Solution**
PulseAI offers a cost-efficient alternative to hiring professional accountants or purchasing expensive financial software.
* **Affordable Pricing Plans:** Designed to suit individuals and small businesses, the platform provides high-value features at a fraction of the cost of traditional solutions.
* **Time-Saving Efficiency:** Automated processes reduce the time spent on manual data entry and report creation.
This affordability makes financial management accessible to a broader audience.

**Conclusion**
PulseAI’s features are carefully crafted to address the unique challenges of modern financial management. Whether it’s the ease of conversational engagement, the precision of real-time data processing, or the power of QuickBooks integration, PulseAI empowers users to take control of their financial health with confidence and clarity. This innovative solution bridges the gap between complex financial tools and user-friendly technology, making it a game-changer for individuals and businesses alike.
`,

  'getting-started': `### How It Works

**Getting Started with PulseAI**
PulseAI is designed to make financial management simple and accessible for everyone, from individuals to small business owners. By following a few straightforward steps, users can set up their accounts, input data, and start generating actionable insights in no time. This guide walks you through the process of getting started with PulseAI.

**Step 1: Sign Up for PulseAI**
To begin using PulseAI, you first need to create an account on the platform.
1. **Visit the PulseAI Website:**
    * Go to the official PulseAI website and click on the "Sign Up" button on the homepage.
2. **Create Your Account:**
    * Enter your email address, choose a secure password, and complete the registration form.
    * Verify your email address by clicking on the confirmation link sent to your inbox.
3. **Select Your Plan:**
    * Choose from the available pricing plans:
        * Free Plan: Limited features for personal use.
        * Pro Plan: Full access to PulseAI for individuals and small businesses.
        * Enterprise Plan: Advanced features for professionals and SMEs.

**Step 2: Onboarding Questionnaire**
After signing up, you will be guided through a quick onboarding process to tailor the PulseAI experience to your needs.
1. **Provide Your Financial Goals:**
    * Answer simple questions about your financial objectives, such as managing expenses, generating reports, or preparing for taxes.
2. **Choose Your User Type:**
    * Specify whether you are an individual, freelancer, or small business owner.
3. **Set Up Preferences:**
    * Customize your experience by selecting your preferred report formats and data presentation style.

**Step 3: Connect Your Financial Tools (Optional)**
For users who want to leverage PulseAI’s integration capabilities, connecting financial tools such as QuickBooks enhances functionality.
1. **QuickBooks Integration:**
    * Navigate to the "Settings" panel on your PulseAI dashboard.
    * Click on "Integrations" and select "QuickBooks."
    * Authorize PulseAI to access your QuickBooks account by following the on-screen prompts.
2. **Third-Party Tools (Coming Soon):**
    * Stay tuned for additional integrations with platforms like Xero and Zoho Books.

**Step 4: Start a Conversation with the Chatbot**
Once your account is set up, you’re ready to use PulseAI’s conversational interface.
1. **Launch the Chatbot:**
    * Access the chatbot from your dashboard and begin a conversation.
    * Use simple language to ask questions or input financial data (e.g., “What is my monthly expense breakdown?”).
2. **Provide Financial Details:**
    * Enter your income, expenses, and other relevant data as prompted by the chatbot.
    * PulseAI will guide you step-by-step to ensure all necessary information is collected.
3. **Explore Insights:**
    * Once the chatbot processes your inputs, you’ll receive real-time insights and personalized recommendations.

**Step 5: Generate Financial Reports**
PulseAI’s automated report generation feature allows you to create essential financial documents with ease.
1. **Select the Report Type:**
    * Choose from options like income statements, balance sheets, or cash flow statements.
2. **Customize Your Reports:**
    * Apply filters and customize the data range or layout to suit your needs.
3. **Download or Share:**
    * Download your reports in professional formats (PDF or Excel) or share them directly with stakeholders.

**Step 6: Leverage Additional Resources**
PulseAI offers more than just chatbot interactions. Use the platform’s additional tools and resources to maximize its value.
1. **Knowledge Hub:**
    * Access bite-sized financial insights, templates, and case studies to deepen your understanding of financial concepts.
2. **Community Access:**
    * Join the PulseAI community on Discord to collaborate with other users, share tips, and get support from financial experts.

**Tips for Success**
* **Start Small:** Begin with basic tasks like tracking expenses before diving into advanced features like QuickBooks integration.
* **Explore Frequently:** Use the chatbot regularly to familiarize yourself with its capabilities and features.
* **Utilize Help Resources:** Refer to the FAQs and tutorials on the platform if you encounter any issues.
`,

  'pulse-ai-v2-overview': `### Pulse AI V2 Overview

Stay tuned for exciting updates! **Coming Soon**.
`,

  'pulse-ai-v2-features': `### Pulse AI V2 Features

We're working on something amazing! **Coming Soon**.
`,

  'pulse-ai-v2-getting-started': `### Getting Started with Pulse AI V2

Prepare for the next generation of financial management. **Coming Soon**.
`,

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
      { id: 'getting-started', title: 'Getting Started' }
    ]
  },
  {
    id: 'pulseai-v2',
    title: 'PulseAI V2',
    items: [
      { id: 'pulse-ai-v2-overview', title: 'Overview' },
      { id: 'pulse-ai-v2-features', title: 'Features' },
      { id: 'pulse-ai-v2-getting-started', title: 'Getting Started' },
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
