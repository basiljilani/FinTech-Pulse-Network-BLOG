import matter from 'gray-matter';

export interface ArticleContent {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  content?: string;
}

export async function getArticleContent(id: string): Promise<ArticleContent | null> {
  try {
    // First, get the article metadata from index.json
    const response = await fetch('/content/index.json');
    if (!response.ok) {
      throw new Error('Failed to load article index');
    }
    const data = await response.json();
    const article = data.articles.find((a: ArticleContent) => a.id === id);
    
    if (!article) {
      return null;
    }

    // Then, get the article content from the markdown file
    const contentResponse = await fetch(`/content/${id}.md`);
    if (!contentResponse.ok) {
      throw new Error('Failed to load article content');
    }
    const content = await contentResponse.text();
    
    return {
      ...article,
      content
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}
