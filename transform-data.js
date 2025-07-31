#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Category name to ID mapping
const categoryMapping = {
  'Claude.md Configurations': 'claude-configs',
  'Prompt Templates': 'prompt-templates', 
  'Tools & CLI': 'tools-cli'
};

// Transform claude configs
function transformClaudeConfigs() {
  const configsDir = path.join(__dirname, 'data/claude-configs');
  const configs = [];
  
  const files = fs.readdirSync(configsDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(configsDir, file), 'utf8');
    
    // Extract config objects (simplified parsing)
    const matches = content.match(/export\s+(?:const|default)\s+[\w\s:[\]]+?=\s*(\[[\s\S]*?\]);?/);
    if (!matches) continue;
    
    try {
      // Basic transformation to extract data
      const configStr = matches[1];
      const configData = eval(configStr); // Note: eval is used for simplicity, not recommended for production
      
      if (Array.isArray(configData)) {
        for (const config of configData) {
          configs.push(transformResource(config, 'CONFIGURATION'));
        }
      } else {
        configs.push(transformResource(configData, 'CONFIGURATION'));
      }
    } catch (e) {
      console.log(`Skipping ${file}: ${e.message}`);
    }
  }
  
  return configs;
}

// Transform individual prompt files
function transformPrompts() {
  const promptsDir = path.join(__dirname, 'data/prompts');
  const prompts = [];
  
  const files = fs.readdirSync(promptsDir).filter(f => f.endsWith('.ts') && f !== 'prompts.ts');
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(promptsDir, file), 'utf8');
    
    const matches = content.match(/export\s+default\s+({[\s\S]*?});?$/);
    if (!matches) continue;
    
    try {
      const promptData = eval(`(${matches[1]})`);
      prompts.push(transformResource(promptData, 'PROMPT_TEMPLATE', promptData.prompt));
    } catch (e) {
      console.log(`Skipping ${file}: ${e.message}`);
    }
  }
  
  return prompts;
}

// Transform individual tool files
function transformTools() {
  const toolsDir = path.join(__dirname, 'data/tools');
  const tools = [];
  
  const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.ts') && f !== 'tools.ts');
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(toolsDir, file), 'utf8');
    
    const matches = content.match(/export\s+default\s+({[\s\S]*?});?$/);
    if (!matches) continue;
    
    try {
      const toolData = eval(`(${matches[1]})`);
      tools.push(transformResource(toolData, 'EXTERNAL'));
    } catch (e) {
      console.log(`Skipping ${file}: ${e.message}`);
    }
  }
  
  return tools;
}

// Transform a resource to StaticResource format
function transformResource(resource, type, content = null) {
  const tagline = resource.description.split('.')[0] + '.'; // First sentence as tagline
  
  return {
    id: resource.id,
    title: resource.title,
    slug: resource.slug || resource.id,
    tagline: resource.tagline || tagline,
    description: resource.description,
    categoryId: categoryMapping[resource.category] || 'claude-configs',
    type: type,
    content: content || resource.content,
    url: resource.url,
    tags: Array.isArray(resource.tags) ? resource.tags : [],
    author: resource.author || {
      name: 'Claude Code Directory',
      url: 'https://claudecode.directory'
    },
    stats: resource.stats || {
      votes: 0,
      copies: 0
    },
    difficulty: resource.difficulty || 'ADVANCED',
    language: resource.language,
    framework: resource.framework,
    lastUpdated: resource.lastUpdated || '2024-01-31',
    featured: resource.featured || false
  };
}

// Transform categories
function transformCategories() {
  const categoriesPath = path.join(__dirname, 'data/categories.ts');
  const content = fs.readFileSync(categoriesPath, 'utf8');
  
  // Extract categories array (simplified)
  const matches = content.match(/const\s+categories:\s*StaticCategory\[\]\s*=\s*(\[[\s\S]*?\]);/);
  if (!matches) return [];
  
  try {
    const categoriesData = eval(matches[1]);
    return categoriesData.map(cat => ({
      ...cat,
      featured: cat.featured || false
    }));
  } catch (e) {
    console.log(`Error transforming categories: ${e.message}`);
    return [];
  }
}

// Main transformation
function main() {
  console.log('Transforming data...');
  
  const resources = [
    ...transformClaudeConfigs(),
    ...transformPrompts(),
    ...transformTools()
  ];
  
  const categories = transformCategories();
  
  // Create output directory
  const outputDir = path.join(__dirname, 'api');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write transformed data
  fs.writeFileSync(
    path.join(outputDir, 'resources.json'),
    JSON.stringify({
      data: resources,
      meta: {
        total: resources.length,
        generated_at: new Date().toISOString(),
        version: '1.0.0'
      }
    }, null, 2)
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'categories.json'),
    JSON.stringify({
      data: categories,
      meta: {
        total: categories.length,
        generated_at: new Date().toISOString(),
        version: '1.0.0'
      }
    }, null, 2)
  );
  
  const stats = {
    totalResources: resources.length,
    totalCategories: categories.length,
    totalContributors: 1,
    totalCopies: 0,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'stats.json'),
    JSON.stringify({
      data: stats,
      meta: {
        generated_at: new Date().toISOString(),
        version: '1.0.0'
      }
    }, null, 2)
  );
  
  console.log(`✅ Transformed ${resources.length} resources and ${categories.length} categories`);
  console.log(`📁 Output written to ${outputDir}`);
}

if (require.main === module) {
  main();
}