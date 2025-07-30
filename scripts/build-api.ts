#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { 
  allResources, 
  resourceStats, 
  categories,
  configurations,
  prompts,
  externalTools,
  getFeaturedResources,
  getPopularResources,
  getTrendingResources
} from '../data/resources';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

interface BuildConfig {
  outputDir: string;
  indent: number;
}

class APIBuilder {
  private config: BuildConfig;

  constructor(config: BuildConfig) {
    this.config = config;
  }

  async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory might already exist
      if ((error as any).code !== 'EEXIST') {
        throw error;
      }
    }
  }

  async writeJSONFile(filePath: string, data: any): Promise<void> {
    const jsonContent = JSON.stringify(data, null, this.config.indent);
    await writeFile(filePath, jsonContent, 'utf8');
    console.log(`✅ Generated: ${filePath}`);
  }

  async buildCategoriesAPI(): Promise<void> {
    const apiPath = path.join(this.config.outputDir, 'v1');
    await this.ensureDirectory(apiPath);

    // Main categories endpoint
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

  async buildResourcesAPI(): Promise<void> {
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
        resources: externalTools,
        meta: {
          total: externalTools.length,
          type: 'EXTERNAL',
          generated_at: new Date().toISOString()
        }
      }
    );

    // Featured resources
    await this.writeJSONFile(
      path.join(resourcesPath, 'featured.json'),
      {
        resources: getFeaturedResources(12),
        meta: {
          total: getFeaturedResources(100).length,
          limit: 12,
          generated_at: new Date().toISOString()
        }
      }
    );

    // Popular resources
    await this.writeJSONFile(
      path.join(resourcesPath, 'popular.json'),
      {
        resources: getPopularResources(15),
        meta: {
          total: allResources.length,
          limit: 15,
          generated_at: new Date().toISOString()
        }
      }
    );

    // Trending resources
    await this.writeJSONFile(
      path.join(resourcesPath, 'trending.json'),
      {
        resources: getTrendingResources(10),
        meta: {
          total: allResources.length,
          limit: 10,
          generated_at: new Date().toISOString()
        }
      }
    );
  }

  async buildStatsAPI(): Promise<void> {
    const apiPath = path.join(this.config.outputDir, 'v1');
    await this.ensureDirectory(apiPath);

    // Enhanced stats with breakdowns
    const enhancedStats = {
      ...resourceStats,
      breakdown: {
        by_type: {
          configurations: configurations.length,
          prompts: prompts.length,
          tools: externalTools.length
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
        featured_count: getFeaturedResources(100).length
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

  async buildSearchIndexes(): Promise<void> {
    const searchPath = path.join(this.config.outputDir, 'v1', 'search');
    await this.ensureDirectory(searchPath);

    // Build search indexes for better client-side search
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

  async buildManifest(): Promise<void> {
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

  async build(): Promise<void> {
    console.log('🏗️  Building Claude Code Directory Data API...');
    console.log(`📁 Output directory: ${this.config.outputDir}`);
    
    try {
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
      console.log(`   • ${configurations.length} configurations`);
      console.log(`   • ${prompts.length} prompt templates`);
      console.log(`   • ${externalTools.length} tools & integrations`);
      console.log(`   • ${getFeaturedResources(100).length} featured resources`);
      
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
  
  const config: BuildConfig = {
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

export { APIBuilder };