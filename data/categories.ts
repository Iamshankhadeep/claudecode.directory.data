import type { StaticCategory } from './types';

const categories: StaticCategory[] = [
  {
    id: 'claude-configs',
    name: 'Claude.md Configurations',
    slug: 'claude-configs',
    description: 'Ready-to-use Claude.md configuration files for different tech stacks and project types, including advanced enterprise-grade configurations.',
    icon: '📋',
    color: '#F59E0B',
    order: 1,
    resourceCount: 17  // Updated: Actual count of config files
  },
  {
    id: 'prompt-templates',
    name: 'Prompt Templates',
    slug: 'prompts',
    description: 'Carefully crafted prompt templates for common development tasks and workflows, featuring expert-level architectural and optimization guidance.',
    icon: '💬',
    color: '#10B981',
    order: 2,
    resourceCount: 14  // Updated: 9 in prompts.ts + 5 individual files
  },
  {
    id: 'tools-cli',
    name: 'Tools & CLI',
    slug: 'tools',
    description: 'Command-line tools, utilities, and scripts to enhance your Claude development workflow, including enterprise-grade automation platforms.',
    icon: '🛠️',
    color: '#8B5CF6',
    order: 3,
    resourceCount: 19  // Updated: 12 in tools.ts + 7 individual files
  },
  {
    id: 'expert-resources',
    name: 'Expert Resources',
    slug: 'expert',
    description: 'Advanced configurations, tools, and prompts for experienced developers and enterprise teams. Includes architectural patterns, performance optimization, and complex system design.',
    icon: '🎯',
    color: '#7C3AED',
    order: 4,
    resourceCount: 27  // 15 advanced configs + 5 advanced prompts + 7 advanced tools
  },
  {
    id: 'vscode-extensions',
    name: 'VS Code Extensions',
    slug: 'vscode',
    description: 'Extensions and configurations to integrate Claude seamlessly into VS Code.',
    icon: '🔧',
    color: '#3B82F6',
    order: 5,
    resourceCount: 2
  },
  {
    id: 'api-integrations',
    name: 'API Integrations',
    slug: 'integrations',
    description: 'Examples and libraries for integrating Claude API into various platforms.',
    icon: '🔗',
    color: '#EF4444',
    order: 6,
    resourceCount: 3
  },
  {
    id: 'claude-code-projects',
    name: 'Claude Code Projects',
    slug: 'projects',
    description: 'Complete projects and examples built with Claude Code CLI.',
    icon: '🚀',
    color: '#F97316',
    order: 7,
    resourceCount: 2
  },
  {
    id: 'documentation-guides',
    name: 'Documentation & Guides',
    slug: 'docs',
    description: 'Comprehensive guides, tutorials, and best practices for Claude development.',
    icon: '📚',
    color: '#06B6D4',
    order: 8,
    resourceCount: 0
  },
  {
    id: 'templates-starters',
    name: 'Templates & Starters',
    slug: 'templates',
    description: 'Project templates and starter kits preconfigured for Claude development.',
    icon: '📦',
    color: '#84CC16',
    order: 9,
    resourceCount: 0
  },
  {
    id: 'productivity-scripts',
    name: 'Productivity Scripts',
    slug: 'scripts',
    description: 'Automation scripts and workflows to boost your development productivity.',
    icon: '⚡',
    color: '#F59E0B',
    order: 10,
    resourceCount: 1
  },
  {
    id: 'development-workflows',
    name: 'Development Workflows',
    slug: 'workflows',
    description: 'GitHub Actions, CI/CD pipelines, and other workflow automations.',
    icon: '🔄',
    color: '#8B5CF6',
    order: 11,
    resourceCount: 0
  },
  {
    id: 'testing-quality',
    name: 'Testing & Quality',
    slug: 'testing',
    description: 'Testing frameworks, quality assurance tools, and code review helpers.',
    icon: '🧪',
    color: '#10B981',
    order: 12,
    resourceCount: 1  // Updated: Testing Automation tool
  },
  {
    id: 'deployment-devops',
    name: 'Deployment & DevOps',
    slug: 'devops',
    description: 'Deployment scripts, Docker configurations, and DevOps best practices.',
    icon: '📡',
    color: '#3B82F6',
    order: 13,
    resourceCount: 3  // Updated: CI/CD Pipeline Masters, Infrastructure as Code Masters, Database Evolution
  },
  {
    id: 'database-storage',
    name: 'Database & Storage',
    slug: 'database',
    description: 'Database integrations, storage solutions, and data management tools.',
    icon: '🗄️',
    color: '#EF4444',
    order: 14,
    resourceCount: 2  // Updated: Database Performance Engineering, Database Evolution
  },
  {
    id: 'auth-security',
    name: 'Authentication & Security',
    slug: 'security',
    description: 'Authentication systems, security tools, and privacy-focused solutions.',
    icon: '🔐',
    color: '#F97316',
    order: 15,
    resourceCount: 2  // Updated: Security-First Development, Security Scanner
  },
  {
    id: 'ui-ux-resources',
    name: 'UI/UX Resources',
    slug: 'design',
    description: 'Design systems, UI components, and user experience resources.',
    icon: '🎨',
    color: '#EC4899',
    order: 16,
    resourceCount: 0
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    slug: 'mobile',
    description: 'React Native, Flutter, and other mobile development resources.',
    icon: '📱',
    color: '#06B6D4',
    order: 17,
    resourceCount: 0
  },
  {
    id: 'data-science-ml',
    name: 'Data Science & ML',
    slug: 'datascience',
    description: 'Machine learning models, data analysis tools, and AI integrations.',
    icon: '🤖',
    color: '#84CC16',
    order: 18,
    resourceCount: 0
  },
  {
    id: 'community-resources',
    name: 'Community Resources',
    slug: 'community',
    description: 'Community-contributed resources, examples, and collaborative projects.',
    icon: '👥',
    color: '#8B5CF6',
    order: 19,
    resourceCount: 0
  }
];

// Helper functions for working with categories
const getCategoryById = (id: string): StaticCategory | undefined => {
  return categories.find(category => category.id === id);
};

const getCategoryBySlug = (slug: string): StaticCategory | undefined => {
  return categories.find(category => category.slug === slug);
};

const getCategoriesByType = (hasResources: boolean = true): StaticCategory[] => {
  return hasResources 
    ? categories.filter(category => category.resourceCount > 0)
    : categories;
};

const getTotalResourceCount = (): number => {
  return categories.reduce((total, category) => total + category.resourceCount, 0);
};

module.exports = {
  categories,
  getCategoryById,
  getCategoryBySlug,
  getCategoriesByType,
  getTotalResourceCount
};