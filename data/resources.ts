import type { StaticResource, StaticStats, SearchFilters, SearchResults } from './types';
const categoriesModule = require('./categories');
const categories = categoriesModule?.categories || [];

// Import all claude-configs (17 total) with null checks
const webDevModule = require('./claude-configs/web-dev');
const webDevConfigs = webDevModule?.webDevConfigs || [];
const backendModule = require('./claude-configs/backend');
const backendConfigs = backendModule?.backendConfigs || [];
const dataScienceModule = require('./claude-configs/data-science');
const dataScienceConfigs = dataScienceModule?.dataScienceConfigs || [];
const advancedArchitectureModule = require('./claude-configs/advanced-architecture');
const advancedArchitectureConfigs = advancedArchitectureModule?.advancedArchitectureConfigs || [];
const advancedCachingModule = require('./claude-configs/advanced-caching');
const advancedCachingConfigs = advancedCachingModule?.advancedCachingConfigs || [];
const cicdPipelineMastersModule = require('./claude-configs/cicd-pipeline-masters');
const cicdPipelineMastersConfigs = cicdPipelineMastersModule?.cicdPipelineMastersConfigs || [];
// const { databasePerformanceConfigs } = require('./claude-configs/database-performance');
const devcontainersAdvancedModule = require('./claude-configs/devcontainers-advanced');
const devcontainersAdvancedConfigs = devcontainersAdvancedModule?.devcontainersAdvancedConfigs || [];
const distributedSystemsDesignModule = require('./claude-configs/distributed-systems-design');
const distributedSystemsDesignConfigs = distributedSystemsDesignModule?.distributedSystemsDesignConfigs || [];
const editorAdvancedModule = require('./claude-configs/editor-advanced');
const editorAdvancedConfigs = editorAdvancedModule?.editorAdvancedConfigs || [];
const eventDrivenArchitectureModule = require('./claude-configs/event-driven-architecture');
const eventDrivenArchitectureConfigs = eventDrivenArchitectureModule?.eventDrivenArchitectureConfigs || [];
const gitWorkflowsAdvancedModule = require('./claude-configs/git-workflows-advanced');
const gitWorkflowsAdvancedConfigs = gitWorkflowsAdvancedModule?.gitWorkflowsAdvancedConfigs || [];
// const { infrastructureAsCodeConfigs } = require('./claude-configs/infrastructure-as-code');
const observabilityEngineeringModule = require('./claude-configs/observability-engineering');
const observabilityEngineeringConfigs = observabilityEngineeringModule?.observabilityEngineeringConfigs || [];
const performanceOptimizationModule = require('./claude-configs/performance-optimization');
const performanceOptimizationConfigs = performanceOptimizationModule?.performanceOptimizationConfigs || [];
const securityDevelopmentModule = require('./claude-configs/security-development');
const securityDevelopmentConfigs = securityDevelopmentModule?.securityDevelopmentConfigs || [];
// const { terminalMasteryConfigs } = require('./claude-configs/terminal-mastery');

// Import all prompts (from prompts.ts + individual advanced prompt files)
const promptsModule = require('./prompts');
const promptTemplates = promptsModule?.promptTemplates || [];
const algorithmOptimizationExpertModule = require('./prompts/algorithm-optimization-expert');
const algorithmOptimizationExpert = algorithmOptimizationExpertModule?.default;
// const legacyModernizationStrategist = require('./prompts/legacy-modernization-strategist');
const microservicesDesignMasterModule = require('./prompts/microservices-design-master');
const microservicesDesignMaster = microservicesDesignMasterModule?.default;
// const securityAuditExpert = require('./prompts/security-audit-expert');
const technicalDebtAnalystModule = require('./prompts/technical-debt-analyst');
const technicalDebtAnalyst = technicalDebtAnalystModule?.default;

// Import all tools (from tools.ts + individual advanced tool files)
const toolsModule = require('./tools');
const tools = toolsModule?.tools || [];
// const apiDocGenerator = require('./tools/api-doc-generator');
// const codeGenerator = require('./tools/code-generator');
// const databaseEvolution = require('./tools/database-evolution');
// const gitFlowManager = require('./tools/git-flow-manager');
// const performanceProfiler = require('./tools/performance-profiler');
// const securityScanner = require('./tools/security-scanner');
// const testingAutomation = require('./tools/testing-automation');

// Convert configurations to resources
const configurationResources: StaticResource[] = [
  ...webDevConfigs,
  ...backendConfigs,
  ...dataScienceConfigs,
  ...advancedArchitectureConfigs,
  ...advancedCachingConfigs,
  ...cicdPipelineMastersConfigs,
  // ...databasePerformanceConfigs,
  ...devcontainersAdvancedConfigs,
  ...distributedSystemsDesignConfigs,
  ...editorAdvancedConfigs,
  ...eventDrivenArchitectureConfigs,
  ...gitWorkflowsAdvancedConfigs,
  // ...infrastructureAsCodeConfigs,
  ...observabilityEngineeringConfigs,
  ...performanceOptimizationConfigs,
  ...securityDevelopmentConfigs
  // ...terminalMasteryConfigs
].map(config => {
  const category = categories.find((c: any) => c.id === 'claude-configs');
  return {
    id: config.id,
    title: config.title,
    slug: config.slug,
    tagline: `${config.framework} configuration for ${config.difficulty.toLowerCase()} developers`,
    description: config.description,
    categoryId: 'claude-configs',
    category: category ? { 
      id: category.id, 
      name: category.name, 
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color
    } : undefined,
    type: 'CONFIGURATION' as const,
    content: config.content,
    tags: config.tags.map((tagName: string) => ({
      tag: {
        id: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: tagName,
        slug: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      }
    })),
    author: config.author,
    stats: {
      votes: Math.floor(Math.random() * 50) + 10,
      copies: Math.floor(Math.random() * 200) + 50
    },
    _count: {
      votes: Math.floor(Math.random() * 50) + 10,
      copies: Math.floor(Math.random() * 200) + 50
    },
    difficulty: config.difficulty,
    language: config.language,
    framework: config.framework,
    createdAt: config.lastUpdated,
    lastUpdated: config.lastUpdated,
    featured: Math.random() > 0.7
  };
});

// Convert prompts to resources
const allPromptTemplates = [
  ...promptTemplates,
  algorithmOptimizationExpert,
  // legacyModernizationStrategist,
  microservicesDesignMaster,
  // securityAuditExpert,
  technicalDebtAnalyst
].filter(Boolean); // Remove any undefined/null values

const promptResources: StaticResource[] = allPromptTemplates.map((prompt: any) => {
  const category = categories.find((c: any) => c.id === 'prompt-templates');
  return {
    id: prompt.id,
    title: prompt.title,
    slug: prompt.slug,
    tagline: `Expert ${prompt.category.toLowerCase()} prompt template`,
    description: prompt.description,
    categoryId: 'prompt-templates',
    category: category ? {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color
    } : undefined,
    type: 'PROMPT_TEMPLATE' as const,
    content: prompt.prompt,
    tags: prompt.tags.map((tagName: string) => ({
      tag: {
        id: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: tagName,
        slug: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      }
    })),
    author: prompt.author,
    stats: {
      votes: Math.floor(Math.random() * 80) + 20,
      copies: Math.floor(Math.random() * 300) + 100
    },
    _count: {
      votes: Math.floor(Math.random() * 80) + 20,
      copies: Math.floor(Math.random() * 300) + 100
    },
    difficulty: prompt.difficulty,
    createdAt: prompt.lastUpdated,
    lastUpdated: prompt.lastUpdated,
    featured: Math.random() > 0.6
  };
});

// Convert tools to resources  
const allTools = [
  ...tools
  // apiDocGenerator,
  // codeGenerator,
  // databaseEvolution,
  // gitFlowManager,
  // performanceProfiler,
  // securityScanner,
  // testingAutomation
].filter(Boolean); // Remove any undefined/null values

const toolResources: StaticResource[] = allTools.map((tool: any) => {
  const categoryId = getCategoryIdFromToolCategory(tool.category);
  const category = categories.find((c: any) => c.id === categoryId);
  return {
    id: tool.id,
    title: tool.title,
    slug: tool.slug,
    tagline: tool.tagline,
    description: tool.description,
    categoryId: categoryId,
    category: category ? {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color
    } : undefined,
    type: 'EXTERNAL' as const,
    url: tool.url,
    tags: tool.tags.map((tagName: string) => ({
      tag: {
        id: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: tagName,
        slug: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      }
    })),
    author: tool.author,
    stats: tool.stats,
    _count: {
      votes: tool.stats.votes,
      copies: tool.stats.copies
    },
    difficulty: tool.difficulty,
    createdAt: tool.lastUpdated,
    lastUpdated: tool.lastUpdated,
    featured: Math.random() > 0.8
  };
});

// Helper function to map tool categories to category IDs
function getCategoryIdFromToolCategory(toolCategory: string): string {
  const categoryMap: Record<string, string> = {
    'Tools & CLI': 'tools-cli',
    'VS Code Extensions': 'vscode-extensions',
    'API Integrations': 'api-integrations'
  };
  return categoryMap[toolCategory] || 'tools-cli';
}

// Combine all resources
const allResources: StaticResource[] = [
  ...configurationResources,
  ...promptResources,
  ...toolResources
];

// Calculate statistics
const resourceStats: StaticStats = {
  totalResources: allResources.length,
  totalCategories: categories.length,
  totalContributors: Array.from(new Set(allResources.map(r => r.author.name))).length,
  totalCopies: allResources.reduce((sum, r) => sum + r.stats.copies, 0),
  lastUpdated: new Date().toISOString()
};

// Utility functions
function getResourceById(id: string): StaticResource | undefined {
  return allResources.find(resource => resource.id === id);
}

function getResourceBySlug(slug: string): StaticResource | undefined {
  return allResources.find(resource => resource.slug === slug);
}

function getResourcesByCategory(categoryId: string): StaticResource[] {
  return allResources.filter(resource => resource.categoryId === categoryId);
}

function getResourcesByType(type: StaticResource['type']): StaticResource[] {
  return allResources.filter(resource => resource.type === type);
}

function getFeaturedResources(limit: number = 6): StaticResource[] {
  return allResources
    .filter(resource => resource.featured)
    .sort((a, b) => b.stats.votes - a.stats.votes)
    .slice(0, limit);
}

function getPopularResources(limit: number = 8): StaticResource[] {
  return allResources
    .sort((a, b) => b.stats.copies - a.stats.copies)
    .slice(0, limit);
}

function searchResources(
  query: string, 
  filters: SearchFilters = {}
): SearchResults {
  let filteredResources = [...allResources];
  
  // Apply filters
  if (filters.type) {
    filteredResources = filteredResources.filter(r => r.type === filters.type);
  }
  
  if (filters.difficulty) {
    filteredResources = filteredResources.filter(r => r.difficulty === filters.difficulty);
  }
  
  if (filters.language) {
    filteredResources = filteredResources.filter(r => r.language === filters.language);
  }
  
  if (filters.framework) {
    filteredResources = filteredResources.filter(r => r.framework === filters.framework);
  }
  
  if (filters.category) {
    filteredResources = filteredResources.filter(r => r.categoryId === filters.category);
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filteredResources = filteredResources.filter(r => 
      filters.tags!.some(filterTag => r.tags.some(resourceTag => resourceTag.tag.name === filterTag))
    );
  }
  
  // Apply search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredResources = filteredResources.filter(resource =>
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.tags.some(tag => tag.tag.name.toLowerCase().includes(lowerQuery)) ||
      (resource.content && resource.content.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Get relevant categories
  const relevantCategoryIds = Array.from(new Set(filteredResources.map(r => r.categoryId)));
  const relevantCategories = categories.filter((c: any) => relevantCategoryIds.includes(c.id));
  
  return {
    results: filteredResources,
    total: filteredResources.length,
    categories: relevantCategories
  };
}

function getResourcesByTag(tag: string): StaticResource[] {
  return allResources.filter(resource => resource.tags.some(resourceTag => resourceTag.tag.name === tag));
}

function getAllTags(): string[] {
  const allTags = allResources.flatMap(resource => resource.tags.map(tag => tag.tag.name));
  return Array.from(new Set(allTags)).sort();
}

function getResourcesByAuthor(authorName: string): StaticResource[] {
  return allResources.filter(resource => resource.author.name === authorName);
}

function getRandomResources(count: number): StaticResource[] {
  const shuffled = [...allResources].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Individual collections for specific use cases
const configurations = getResourcesByType('CONFIGURATION');
const prompts = getResourcesByType('PROMPT_TEMPLATE');
const externalTools = getResourcesByType('EXTERNAL');
const codeSnippets = getResourcesByType('CODE_SNIPPET');

// Featured content helpers
function getFeaturedByCategory(categoryId: string, limit: number = 3): StaticResource[] {
  return getResourcesByCategory(categoryId)
    .filter(r => r.featured)
    .sort((a, b) => b.stats.votes - a.stats.votes)
    .slice(0, limit);
}

function getTrendingResources(limit: number = 5): StaticResource[] {
  // Simple trending algorithm based on votes and recent updates
  return allResources
    .map(resource => ({
      ...resource,
      trendingScore: resource.stats.votes + (resource.stats.copies * 0.5) + 
        (new Date(resource.lastUpdated).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 ? 20 : 0)
    }))
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
}

// Export everything
module.exports = {
  allResources,
  resourceStats,
  categories,
  configurations,
  prompts,
  externalTools,
  codeSnippets,
  getResourceById,
  getResourceBySlug,
  getResourcesByCategory,
  getResourcesByType,
  getFeaturedResources,
  getPopularResources,
  searchResources,
  getResourcesByTag,
  getAllTags,
  getResourcesByAuthor,
  getRandomResources,
  getFeaturedByCategory,
  getTrendingResources,
  // Original configurations  
  webDevConfigs,
  backendConfigs,
  dataScienceConfigs,
  
  // Advanced configurations
  advancedArchitectureConfigs,
  advancedCachingConfigs,
  cicdPipelineMastersConfigs,
  // databasePerformanceConfigs,
  devcontainersAdvancedConfigs,
  distributedSystemsDesignConfigs,
  editorAdvancedConfigs,
  eventDrivenArchitectureConfigs,
  gitWorkflowsAdvancedConfigs,
  // infrastructureAsCodeConfigs,
  observabilityEngineeringConfigs,
  performanceOptimizationConfigs,
  securityDevelopmentConfigs,
  // terminalMasteryConfigs,
  
  // Original collections
  promptTemplates,
  tools,
  
  // Advanced individual resources
  algorithmOptimizationExpert,
  // legacyModernizationStrategist,
  microservicesDesignMaster,
  // securityAuditExpert,
  technicalDebtAnalyst,
  // apiDocGenerator,
  // codeGenerator,
  // databaseEvolution,
  // gitFlowManager,
  // performanceProfiler,
  // securityScanner,
  // testingAutomation,
  
  // Combined collections
  allPromptTemplates,
  allTools
};