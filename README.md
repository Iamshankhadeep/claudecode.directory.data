# 📊 Claude Code Directory - Static Data Repository

> **Automated TypeScript → JSON API generation for the Claude Code Directory**

This repository contains the curated static data for [claudecode.directory](https://claudecode.directory) - including Claude.md configurations, prompt templates, tools, and resources - with automated JSON API generation.

## 🎯 What's Inside

- **🔧 11 Claude.md Configurations** - Ready-to-use configs for different tech stacks
- **📝 6 Expert Prompt Templates** - Professional prompts for various development tasks  
- **🛠️ 12 Tools & Integrations** - Essential Claude development tools
- **📚 18 Categories** - Organized resource classification
- **🤖 Automated API Generation** - TypeScript data → JSON API with Git hooks

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/your-username/claudecode-directory-data.git
cd claudecode-directory-data

# Install dependencies
npm install

# Setup Git hooks for automated builds  
npm run setup-hooks

# Build the JSON API
npm run build
```

### 2. Development Workflow

```bash
# Start development with auto-rebuild on data changes
npm run dev

# Make changes to files in data/
# The API will automatically rebuild when you save files!

# Commit your changes - API will auto-update
git add data/
git commit -m "feat: add new React configuration"
git push  # Hooks ensure API is always up to date
```

## 📁 Repository Structure

```
claudecode-directory-data/
├── 📊 data/                    # TypeScript source data
│   ├── categories.ts           # Resource categories
│   ├── types.ts               # TypeScript interfaces
│   ├── resources.ts           # Combined resources & utilities
│   ├── claude-configs/        # Claude.md configurations
│   │   ├── web-dev.ts         # Frontend configurations
│   │   ├── backend.ts         # Backend configurations
│   │   └── data-science.ts    # Data science configurations
│   ├── prompts.ts             # Expert prompt templates
│   └── tools.ts               # Tools and integrations
├── 🏗️ scripts/                 # Build automation
│   ├── build-api.ts           # Main API generator
│   └── setup-hooks.sh         # Git hooks installer
├── 🔄 .githooks/               # Git automation hooks
│   ├── post-commit            # Auto-rebuild after commits
│   └── pre-push               # Verify before pushing
├── ⚙️ .github/workflows/       # GitHub Actions
│   └── build-api.yml          # Automated CI/CD
└── 📦 api/                     # Generated JSON API (auto-created)
    ├── manifest.json           # API manifest & metadata
    └── v1/                     # Versioned API endpoints
        ├── categories.json     # All categories
        ├── stats.json          # Resource statistics
        ├── resources/          # Resource endpoints
        │   ├── index.json      # All resources
        │   ├── configurations.json
        │   ├── prompts.json
        │   ├── tools.json
        │   ├── featured.json
        │   ├── popular.json
        │   └── trending.json
        └── search/
            └── index.json      # Search index
```

## 🔄 Automated Workflows

### Git Hooks (Local Development)

- **🔄 post-commit**: Automatically regenerates JSON API when data files change
- **🚀 pre-push**: Ensures API is up to date before pushing to remote

### GitHub Actions (CI/CD)

- **🏗️ build-api.yml**: Automatically builds and commits API updates on push
- **🔍 Validation**: Ensures all generated JSON is valid
- **💬 PR Comments**: Shows API preview URLs in pull requests

## 📖 Usage Examples

### Adding a New Configuration

```typescript
// data/claude-configs/web-dev.ts
export const webDevConfigs: ClaudeConfiguration[] = [
  // ... existing configs
  {
    id: 'nextjs-app-router',
    title: 'Next.js 14 App Router Configuration',
    slug: 'nextjs-14-app-router',
    description: 'Optimized Claude configuration for Next.js 14 projects using App Router',
    content: `# Claude Configuration for Next.js 14 App Router

## Project Context
This is a Next.js 14 project using the App Router pattern...`,
    tags: ['nextjs', 'react', 'app-router', 'frontend'],
    author: { name: 'Your Name', url: 'https://github.com/yourusername' },
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'Next.js 14',
    lastUpdated: '2024-12-01'
  }
];
```

### Adding a New Prompt Template

```typescript  
// data/prompts.ts
export const promptTemplates: PromptTemplate[] = [
  // ... existing prompts
  {
    id: 'api-security-audit',
    title: 'API Security Audit Prompt',
    slug: 'api-security-audit',
    description: 'Comprehensive security analysis for REST APIs',
    category: 'Security Analysis',
    prompt: `You are a security expert auditing a REST API...

    ## API Details
    **Endpoints:** {{ENDPOINTS}}
    **Authentication:** {{AUTH_METHOD}}
    
    Please analyze for:
    1. Common vulnerabilities (OWASP Top 10)
    2. Authentication/authorization flaws
    3. Input validation issues
    ...`,
    variables: ['ENDPOINTS', 'AUTH_METHOD'],
    tags: ['security', 'api', 'audit', 'owasp'],
    difficulty: 'ADVANCED',
    author: { name: 'Security Team' },
    lastUpdated: '2024-12-01'
  }
];
```

## 🛠️ Available Scripts

```bash
# Build & Development
npm run build           # Generate JSON API from TypeScript
npm run build:bun       # Use Bun instead of ts-node
npm run dev             # Watch mode - auto-rebuild on changes
npm run clean           # Remove generated API files

# Validation & Testing  
npm run validate        # Validate all generated JSON files
npm run test            # Build + validate (full test)

# Information & Stats
npm run stats           # Show resource statistics
npm run endpoints       # List all available API endpoints

# Setup & Maintenance
npm run setup-hooks     # Install local Git hooks
```

## 🌐 API Endpoints

Once built, the JSON API provides these endpoints:

### 📚 Core Data
- `GET /api/v1/categories.json` - All resource categories
- `GET /api/v1/resources/index.json` - All resources
- `GET /api/v1/stats.json` - Resource statistics

### 🎯 Resources by Type
- `GET /api/v1/resources/configurations.json` - Claude.md configs
- `GET /api/v1/resources/prompts.json` - Prompt templates  
- `GET /api/v1/resources/tools.json` - Tools & integrations

### ⭐ Curated Collections
- `GET /api/v1/resources/featured.json` - Featured resources
- `GET /api/v1/resources/popular.json` - Most copied resources
- `GET /api/v1/resources/trending.json` - Trending resources

### 🔍 Search & Discovery
- `GET /api/v1/search/index.json` - Search index for client-side search
- `GET /api/manifest.json` - API manifest with metadata

## 🔗 Raw GitHub URLs

Access the API directly via GitHub's raw content:

```
https://raw.githubusercontent.com/your-username/claudecode-directory-data/main/api/v1/categories.json
https://raw.githubusercontent.com/your-username/claudecode-directory-data/main/api/v1/resources/index.json
https://raw.githubusercontent.com/your-username/claudecode-directory-data/main/api/manifest.json
```

## 🤝 Contributing

1. **Fork** this repository
2. **Clone** your fork locally
3. **Run** `npm run setup-hooks` to install automation
4. **Make changes** to files in `data/`
5. **Commit** - API will auto-update via hooks
6. **Push** and create a **Pull Request**

### Contribution Guidelines

- ✅ **Quality First**: All resources should be tested and production-ready
- ✅ **Complete Data**: Include all required fields (title, description, tags, etc.)
- ✅ **Proper Attribution**: Credit original authors appropriately  
- ✅ **TypeScript**: Maintain type safety throughout
- ✅ **Testing**: Ensure `npm run test` passes

## 🔧 Technical Details

### Build Process

1. **TypeScript Analysis**: Reads all data files in `data/`
2. **Resource Aggregation**: Combines configs, prompts, tools into unified format
3. **API Generation**: Creates JSON endpoints with metadata
4. **Search Indexing**: Builds client-side search indexes
5. **Validation**: Ensures all JSON is valid and complete

### Type Safety

All data is fully typed with TypeScript interfaces:

```typescript
interface StaticResource {
  id: string;
  title: string; 
  slug: string;
  description: string;
  type: 'CONFIGURATION' | 'PROMPT_TEMPLATE' | 'EXTERNAL';
  tags: string[];
  author: { name: string; url?: string };
  // ... more fields
}
```

### Caching Strategy

The main website caches API responses for **5 minutes** with:
- ✅ Automatic retry with exponential backoff
- ✅ Graceful fallback to dynamic data
- ✅ Error handling and logging

## 📊 Current Statistics

- **📁 29 Total Resources** (11 configs + 6 prompts + 12 tools)
- **🏷️ 18 Categories** across different technology areas
- **👥 15+ Contributors** from the Claude developer community
- **🔄 Auto-updated** via Git hooks and GitHub Actions

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/claudecode-directory-data/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/claudecode-directory-data/discussions)
- 📧 **Email**: support@claudecode.directory

---

<div align="center">

**Built with ❤️ for the Claude developer community**

[🌐 claudecode.directory](https://claudecode.directory) • [📚 Main Repository](https://github.com/your-username/claudecode-directory) • [🤖 Claude AI](https://claude.ai)

</div>