// Core interfaces for the static data system

export interface StaticCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  resourceCount: number;
}

export interface StaticResource {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  categoryId: string;
  type: 'CONFIGURATION' | 'PROMPT_TEMPLATE' | 'CODE_SNIPPET' | 'EXTERNAL';
  url?: string;
  content?: string;
  tags: string[];
  author: {
    name: string;
    url?: string;
  };
  stats: {
    votes: number;
    copies: number;
  };
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language?: string;
  framework?: string;
  lastUpdated: string;
  featured: boolean;
}

export interface ClaudeMdConfig {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language: string;
  framework: string;
  content: string;
  author: {
    name: string;
    url?: string;
  };
  lastUpdated: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  prompt: string;
  variables: string[];
  examples: {
    input: string;
    output: string;
  }[];
  author: {
    name: string;
    url?: string;
  };
  lastUpdated: string;
}

export interface Tool {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  type: 'CLI' | 'EXTENSION' | 'INTEGRATION' | 'SERVICE';
  url: string;
  tags: string[];
  author: {
    name: string;
    url?: string;
  };
  stats: {
    votes: number;
    copies: number;
  };
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  lastUpdated: string;
}

export interface StaticStats {
  totalResources: number;
  totalCategories: number;
  totalContributors: number;
  totalCopies: number;
  lastUpdated: string;
}

// Helper types for filtering and searching
export interface SearchFilters {
  type?: StaticResource['type'];
  tags?: string[];
  difficulty?: StaticResource['difficulty'];
  language?: string;
  framework?: string;
  category?: string;
}

export interface SearchResults {
  results: StaticResource[];
  total: number;
  categories: StaticCategory[];
}