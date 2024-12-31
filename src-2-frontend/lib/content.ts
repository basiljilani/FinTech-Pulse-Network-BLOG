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
    console.log('Loading article with id:', id);
    // First, get the article metadata from index.json
    const response = await fetch('/content/index.json');
    if (!response.ok) {
      throw new Error('Failed to load article index');
    }
    const data = await response.json();
    console.log('Found articles:', data.articles.map((a: ArticleContent) => a.id));
    const article = data.articles.find((a: ArticleContent) => a.id === id);
    
    if (!article) {
      console.log('Article not found in index.json');
      return null;
    }

    // Then, get the article content from the markdown file
    const contentResponse = await fetch(`/content/${id}.md`);
    if (!contentResponse.ok) {
      console.log('Failed to load markdown file:', id);
      throw new Error('Failed to load article content');
    }
    const rawContent = await contentResponse.text();
    console.log('Loaded markdown content length:', rawContent.length);
    
    // Simple front matter parsing
    const content = rawContent
      .split('---')
      .slice(2)
      .join('---')
      .trim();
    
    console.log('Parsed content length:', content.length);
    
    return {
      ...article,
      content
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}
