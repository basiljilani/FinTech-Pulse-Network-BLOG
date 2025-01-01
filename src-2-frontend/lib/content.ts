// Global cache for article index
let articleIndexPromise: Promise<ArticleContent[]> | null = null;
let articleCache = new Map<string, ArticleContent>();

export interface ArticleContent {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  author: {
    name: string;
    role: string;
  };
  content?: string;
}

export function prefetchArticleIndex() {
  if (!articleIndexPromise) {
    articleIndexPromise = fetch('/content/index.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load article index');
        return res.json();
      })
      .then(data => data.articles)
      .catch(error => {
        articleIndexPromise = null; // Reset on error
        throw error;
      });
  }
  return articleIndexPromise;
}

// Start prefetching as soon as possible
if (typeof window !== 'undefined') {
  prefetchArticleIndex();
}

export async function getArticleContent(id: string): Promise<ArticleContent | null> {
  try {
    // Check memory cache first
    if (articleCache.has(id)) {
      return articleCache.get(id)!;
    }

    // Use the pre-fetched index
    const articles = await prefetchArticleIndex();
    const article = articles.find(a => a.id === id);
    
    if (!article) return null;

    // Fetch content if not in cache
    const contentResponse = await fetch(`/content/${id}.md`);
    if (!contentResponse.ok) {
      console.error(`Failed to load article content for ${id}`);
      return null;
    }
    
    const rawContent = await contentResponse.text();
    
    try {
      // Simple frontmatter parser
      const content = rawContent.split('---').slice(2).join('---').trim();
      const fullArticle = { ...article, content };
      
      // Cache the result
      articleCache.set(id, fullArticle);
      
      return fullArticle;
    } catch (error) {
      console.error('Error parsing article content:', error);
      return null;
    }
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

// Calculate similarity score between two articles
export function calculateSimilarityScore(article1: ArticleContent, article2: ArticleContent): number {
  let score = 0;
  
  // Category match gives highest weight
  if (article1.category === article2.category) {
    score += 0.5;
  }
  
  // Compare titles using word overlap
  const title1Words = new Set(article1.title.toLowerCase().split(/\W+/));
  const title2Words = new Set(article2.title.toLowerCase().split(/\W+/));
  const titleOverlap = [...title1Words].filter(word => title2Words.has(word)).length;
  score += (titleOverlap / Math.max(title1Words.size, title2Words.size)) * 0.3;
  
  // Compare excerpts using word overlap
  const excerpt1Words = new Set(article1.excerpt.toLowerCase().split(/\W+/));
  const excerpt2Words = new Set(article2.excerpt.toLowerCase().split(/\W+/));
  const excerptOverlap = [...excerpt1Words].filter(word => excerpt2Words.has(word)).length;
  score += (excerptOverlap / Math.max(excerpt1Words.size, excerpt2Words.size)) * 0.2;
  
  return score;
}
