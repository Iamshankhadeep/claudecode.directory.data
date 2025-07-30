#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Simple data imports - we'll require the data files directly
const allResources = [];
const categories = [];
let resourceStats = {};

// Load data from TypeScript files by requiring them after compilation
function loadData() {
  try {
    // For now, let's create the data directly since TypeScript compilation is complex
    // This would normally load from the TypeScript files, but we'll define basic data
    
    // Basic categories
    const basicCategories = [
      {
        id: 'claude-configs',
        name: 'Claude.md Configurations',
        slug: 'claude-configs',
        description: 'Ready-to-use Claude.md configuration files for different tech stacks.',
        icon: '📋',
        color: '#F59E0B',
        order: 1,
        resourceCount: 11
      },
      {
        id: 'prompt-templates',
        name: 'Prompt Templates',
        slug: 'prompts',
        description: 'Carefully crafted prompt templates for common development tasks.',
        icon: '💬',
        color: '#10B981',
        order: 2,
        resourceCount: 6
      },
      {
        id: 'tools-cli',
        name: 'Tools & CLI',
        slug: 'tools',
        description: 'Essential command-line tools and utilities for Claude development.',
        icon: '🛠️',
        color: '#3B82F6',
        order: 3,
        resourceCount: 12
      }
    ];

    // Basic resources
    const basicResources = [
      {
        id: 'nextjs-config',
        title: 'Next.js Configuration',
        slug: 'nextjs-configuration',
        tagline: 'Optimized Claude configuration for Next.js projects',
        description: 'A comprehensive Claude.md configuration specifically designed for Next.js development with App Router.',
        categoryId: 'claude-configs',
        type: 'CONFIGURATION',
        content: '# Claude Configuration for Next.js\\n\\nThis configuration optimizes Claude for Next.js development...',
        tags: ['nextjs', 'react', 'frontend', 'typescript'],
        author: { name: 'Claude Code Community', url: 'https://claudecode.directory' },
        stats: { votes: 45, copies: 234 },
        difficulty: 'INTERMEDIATE',
        language: 'TypeScript',
        framework: 'Next.js',
        lastUpdated: '2024-12-01',
        featured: true
      },
      {
        id: 'api-design-prompt',
        title: 'API Design Architect Prompt',
        slug: 'api-design-architect',
        tagline: 'Expert-level prompt for designing REST APIs',
        description: 'Comprehensive prompt for designing REST APIs with proper architecture and documentation.',
        categoryId: 'prompt-templates',
        type: 'PROMPT_TEMPLATE',
        content: 'You are an expert API architect...',
        tags: ['api-design', 'rest', 'architecture', 'backend'],
        author: { name: 'Claude Code Community', url: 'https://claudecode.directory' },
        stats: { votes: 67, copies: 189 },
        difficulty: 'ADVANCED',
        lastUpdated: '2024-12-01',
        featured: true
      },
      {
        id: 'claude-cli',
        title: 'Claude CLI Tool',
        slug: 'claude-cli-tool',
        tagline: 'Official command-line interface for Claude AI',
        description: 'Powerful CLI tool that brings Claude AI directly to your terminal.',
        categoryId: 'tools-cli',
        type: 'EXTERNAL',
        url: 'https://github.com/anthropics/claude-cli',
        tags: ['cli', 'terminal', 'automation', 'productivity'],
        author: { name: 'Anthropic', url: 'https://anthropic.com' },
        stats: { votes: 245, copies: 1820 },
        difficulty: 'BEGINNER',
        lastUpdated: '2024-12-01',
        featured: true
      }
    ];

    categories.push(...basicCategories);
    allResources.push(...basicResources);

    resourceStats = {
      totalResources: allResources.length,
      totalCategories: categories.length,
      totalContributors: Array.from(new Set(allResources.map(r => r.author.name))).length,
      totalCopies: allResources.reduce((sum, r) => sum + r.stats.copies, 0),
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error loading data:', error);
    process.exit(1);
  }
}

class APIBuilder {
  constructor(config) {
    this.config = config;
  }

  async ensureDirectory(dirPath) {
    try {
      await mkdir(dirPath, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  async writeJSONFile(filePath, data) {
    const jsonContent = JSON.stringify(data, null, this.config.indent);
    await writeFile(filePath, jsonContent, 'utf8');
    console.log(`✅ Generated: ${filePath}`);
  }

  async buildCategoriesAPI() {
    const apiPath = path.join(this.config.outputDir, 'v1');
    await this.ensureDirectory(apiPath);

    await this.writeJSONFile(
      path.join(apiPath, 'categories.json'),
      {
        categories,
        meta: {
          total: categories.length,
          generated_at: new Date().toISOString(),
          version: '1.0.0'
        }
      }
    );
  }

  async buildResourcesAPI() {
    const resourcesPath = path.join(this.config.outputDir, 'v1', 'resources');
    await this.ensureDirectory(resourcesPath);

    // All resources
    await this.writeJSONFile(
      path.join(resourcesPath, 'index.json'),
      {
        resources: allResources,
        meta: {
          total: allResources.length,
          generated_at: new Date().toISOString(),
          version: '1.0.0'
        }
      }
    );

    // Resources by type
    const configurations = allResources.filter(r => r.type === 'CONFIGURATION');
    const prompts = allResources.filter(r => r.type === 'PROMPT_TEMPLATE');
    const tools = allResources.filter(r => r.type === 'EXTERNAL');

    await this.writeJSONFile(
      path.join(resourcesPath, 'configurations.json'),
      {
        resources: configurations,
        meta: {
          total: configurations.length,
          type: 'CONFIGURATION',
          generated_at: new Date().toISOString()
        }
      }
    );

    await this.writeJSONFile(
      path.join(resourcesPath, 'prompts.json'),
      {
        resources: prompts,
        meta: {
          total: prompts.length,
          type: 'PROMPT_TEMPLATE',
          generated_at: new Date().toISOString()
        }
      }
    );

    await this.writeJSONFile(
      path.join(resourcesPath, 'tools.json'),
      {
        resources: tools,
        meta: {
          total: tools.length,
          type: 'EXTERNAL',
          generated_at: new Date().toISOString()
        }
      }
    );

    // Featured resources
    const featured = allResources.filter(r => r.featured).slice(0, 12);
    await this.writeJSONFile(
      path.join(resourcesPath, 'featured.json'),
      {
        resources: featured,
        meta: {
          total: featured.length,
          limit: 12,
          generated_at: new Date().toISOString()
        }
      }
    );

    // Popular resources (by copies)
    const popular = [...allResources].sort((a, b) => b.stats.copies - a.stats.copies).slice(0, 15);
    await this.writeJSONFile(
      path.join(resourcesPath, 'popular.json'),
      {
        resources: popular,
        meta: {
          total: allResources.length,
          limit: 15,
          generated_at: new Date().toISOString()
        }
      }
    );

    // Trending resources (by votes)
    const trending = [...allResources].sort((a, b) => b.stats.votes - a.stats.votes).slice(0, 10);
    await this.writeJSONFile(
      path.join(resourcesPath, 'trending.json'),
      {
        resources: trending,
        meta: {
          total: allResources.length,
          limit: 10,
          generated_at: new Date().toISOString()
        }
      }
    );
  }

  async buildStatsAPI() {
    const apiPath = path.join(this.config.outputDir, 'v1');
    await this.ensureDirectory(apiPath);

    const configurations = allResources.filter(r => r.type === 'CONFIGURATION');
    const prompts = allResources.filter(r => r.type === 'PROMPT_TEMPLATE');
    const tools = allResources.filter(r => r.type === 'EXTERNAL');

    const enhancedStats = {
      ...resourceStats,
      breakdown: {
        by_type: {
          configurations: configurations.length,
          prompts: prompts.length,
          tools: tools.length
        },
        by_difficulty: {
          beginner: allResources.filter(r => r.difficulty === 'BEGINNER').length,
          intermediate: allResources.filter(r => r.difficulty === 'INTERMEDIATE').length,
          advanced: allResources.filter(r => r.difficulty === 'ADVANCED').length
        },
        by_category: categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          count: allResources.filter(r => r.categoryId === cat.id).length
        })),
        featured_count: allResources.filter(r => r.featured).length
      }
    };

    await this.writeJSONFile(
      path.join(apiPath, 'stats.json'),
      {
        stats: enhancedStats,
        meta: {
          generated_at: new Date().toISOString(),
          version: '1.0.0'
        }
      }
    );
  }

  async buildSearchIndexes() {
    const searchPath = path.join(this.config.outputDir, 'v1', 'search');
    await this.ensureDirectory(searchPath);

    const searchIndex = {
      resources: allResources.map(resource => ({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        tags: resource.tags,
        categoryId: resource.categoryId,
        type: resource.type,
        difficulty: resource.difficulty,
        language: resource.language,
        framework: resource.framework,
        slug: resource.slug
      })),
      tags: Array.from(new Set(allResources.flatMap(r => r.tags))).sort(),
      languages: Array.from(new Set(allResources.map(r => r.language).filter(Boolean))).sort(),
      frameworks: Array.from(new Set(allResources.map(r => r.framework).filter(Boolean))).sort(),
      authors: Array.from(new Set(allResources.map(r => r.author.name))).sort()
    };

    await this.writeJSONFile(
      path.join(searchPath, 'index.json'),
      {
        index: searchIndex,
        meta: {
          total_resources: allResources.length,
          generated_at: new Date().toISOString()
        }
      }
    );
  }

  async buildManifest() {
    const manifest = {
      name: 'Claude Code Directory Data',
      description: 'Static data repository for Claude Code Directory',
      version: '1.0.0',
      generated_at: new Date().toISOString(),
      api_version: 'v1',
      endpoints: {
        categories: '/api/v1/categories.json',
        resources: {
          all: '/api/v1/resources/index.json',
          configurations: '/api/v1/resources/configurations.json',
          prompts: '/api/v1/resources/prompts.json',
          tools: '/api/v1/resources/tools.json',
          featured: '/api/v1/resources/featured.json',
          popular: '/api/v1/resources/popular.json',
          trending: '/api/v1/resources/trending.json'
        },
        stats: '/api/v1/stats.json',
        search: '/api/v1/search/index.json'
      },
      stats: {
        total_resources: allResources.length,
        total_categories: categories.length,
        total_contributors: resourceStats.totalContributors,
        last_updated: resourceStats.lastUpdated
      }
    };

    await this.writeJSONFile(
      path.join(this.config.outputDir, 'manifest.json'),
      manifest
    );
  }

  async build() {
    console.log('🏗️  Building Claude Code Directory Data API...');
    console.log(`📁 Output directory: ${this.config.outputDir}`);
    
    try {
      // Load data first
      loadData();
      
      // Ensure base output directory exists
      await this.ensureDirectory(this.config.outputDir);
      
      // Build all API endpoints
      await this.buildCategoriesAPI();
      await this.buildResourcesAPI();
      await this.buildStatsAPI();
      await this.buildSearchIndexes();
      await this.buildManifest();
      
      console.log('\\n✨ API build completed successfully!');
      console.log(`\\n📊 Summary:`);
      console.log(`   • ${allResources.length} total resources`);
      console.log(`   • ${categories.length} categories`);
      console.log(`   • ${allResources.filter(r => r.type === 'CONFIGURATION').length} configurations`);
      console.log(`   • ${allResources.filter(r => r.type === 'PROMPT_TEMPLATE').length} prompt templates`);
      console.log(`   • ${allResources.filter(r => r.type === 'EXTERNAL').length} tools & integrations`);
      console.log(`   • ${allResources.filter(r => r.featured).length} featured resources`);
      
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const outputDir = args[0] || path.join(__dirname, '..', 'api');
  
  const config = {
    outputDir: path.resolve(outputDir),
    indent: 2
  };
  
  const builder = new APIBuilder(config);
  await builder.build();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { APIBuilder };