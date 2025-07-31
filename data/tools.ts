const { Tool } = require('./types');

const tools = [
  {
    id: 'claude-cli',
    title: 'Claude CLI Tool',
    slug: 'claude-cli-tool',
    tagline: 'Official command-line interface for Claude AI',
    description: 'Powerful CLI tool that brings Claude AI directly to your terminal. Execute queries, process files, and integrate Claude into your development workflow with simple commands.',
    category: 'Tools & CLI',
    type: 'CLI',
    url: 'https://github.com/anthropics/claude-cli',
    tags: ['cli', 'terminal', 'automation', 'productivity'],
    author: {
      name: 'Anthropic',
      url: 'https://anthropic.com'
    },
    stats: {
      votes: 245,
      copies: 1820
    },
    difficulty: 'BEGINNER',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-code-vscode',
    title: 'Claude Code for VS Code',
    slug: 'claude-code-vscode-extension',
    tagline: 'VS Code extension for seamless Claude integration',
    description: 'Transform your VS Code experience with Claude AI. Get intelligent code suggestions, explanations, and assistance directly in your editor with this powerful extension.',
    category: 'Tools & CLI',
    type: 'EXTENSION',
    url: 'https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code',
    tags: ['vscode', 'extension', 'ide', 'code-assistance'],
    author: {
      name: 'Anthropic',
      url: 'https://anthropic.com'
    },
    stats: {
      votes: 892,
      copies: 4521
    },
    difficulty: 'BEGINNER',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-slack-bot',
    title: 'Claude Slack Bot',
    slug: 'claude-slack-bot',
    tagline: 'Bring Claude AI to your Slack workspace',
    description: 'Integrate Claude AI into your team\'s Slack workspace. Ask questions, get code reviews, and collaborate with AI assistance directly in your chat channels.',
    category: 'Tools & CLI',
    type: 'INTEGRATION',
    url: 'https://slack.com/apps/claude-ai-bot',
    tags: ['slack', 'bot', 'team-collaboration', 'integration'],
    author: {
      name: 'Claude Community',
      url: 'https://github.com/claude-community/slack-bot'
    },
    stats: {
      votes: 156,
      copies: 789
    },
    difficulty: 'INTERMEDIATE',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-docker-assistant',
    title: 'Claude Docker Assistant',
    slug: 'claude-docker-assistant',
    tagline: 'Docker containerization made easy with Claude',
    description: 'Intelligent Docker assistant that helps you create, optimize, and troubleshoot Docker containers. Generate Dockerfiles, docker-compose configurations, and best practices.',
    category: 'Tools & CLI',
    type: 'CLI',
    url: 'https://github.com/docker-community/claude-docker-assistant',
    tags: ['docker', 'containers', 'devops', 'automation'],
    author: {
      name: 'Docker Community',
      url: 'https://github.com/docker-community'
    },
    stats: {
      votes: 324,
      copies: 1245
    },
    difficulty: 'INTERMEDIATE',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-github-action',
    title: 'Claude GitHub Action',
    slug: 'claude-github-action',
    tagline: 'Automated code reviews with Claude AI',
    description: 'GitHub Action that automatically reviews pull requests using Claude AI. Get intelligent feedback on code quality, security issues, and improvement suggestions.',
    category: 'Tools & CLI',
    type: 'INTEGRATION',
    url: 'https://github.com/marketplace/actions/claude-code-review',
    tags: ['github', 'actions', 'code-review', 'automation'],
    author: {
      name: 'GitHub Community',
      url: 'https://github.com/github-community'
    },
    stats: {
      votes: 478,
      copies: 2134
    },
    difficulty: 'INTERMEDIATE',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-api-wrapper',
    title: 'Claude API SDK',
    slug: 'claude-api-sdk',
    tagline: 'Multi-language SDK for Claude API integration',
    description: 'Comprehensive SDK supporting Python, JavaScript, Go, and Ruby for easy Claude API integration. Includes rate limiting, error handling, and streaming support.',
    category: 'Tools & CLI',
    type: 'SERVICE',
    url: 'https://github.com/anthropics/claude-sdk-multi',
    tags: ['api', 'sdk', 'integration', 'multi-language'],
    author: {
      name: 'Anthropic',
      url: 'https://anthropic.com'
    },
    stats: {
      votes: 567,
      copies: 3421
    },
    difficulty: 'INTERMEDIATE',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-jupyter-kernel',
    title: 'Claude Jupyter Kernel',
    slug: 'claude-jupyter-kernel',
    tagline: 'AI-powered Jupyter notebook experience',
    description: 'Custom Jupyter kernel that integrates Claude AI for data science and research. Get intelligent code suggestions, data analysis insights, and explanation of complex algorithms.',
    category: 'Tools & CLI',
    type: 'INTEGRATION',
    url: 'https://github.com/jupyter-community/claude-kernel',
    tags: ['jupyter', 'data-science', 'kernel', 'analysis'],
    author: {
      name: 'Jupyter Community',
      url: 'https://github.com/jupyter-community'
    },
    stats: {
      votes: 289,
      copies: 1056
    },
    difficulty: 'ADVANCED',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-terraform-provider',
    title: 'Claude Terraform Provider',
    slug: 'claude-terraform-provider',
    tagline: 'Infrastructure as Code with Claude AI assistance',
    description: 'Terraform provider that uses Claude AI to generate, validate, and optimize infrastructure code. Automatically create secure and efficient Terraform configurations.',
    category: 'Tools & CLI',
    type: 'CLI',
    url: 'https://registry.terraform.io/providers/anthropic/claude',
    tags: ['terraform', 'infrastructure', 'iac', 'devops'],
    author: {
      name: 'Terraform Community',
      url: 'https://github.com/terraform-community'
    },
    stats: {
      votes: 198,
      copies: 654
    },
    difficulty: 'ADVANCED',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-postman-collection',
    title: 'Claude API Postman Collection',
    slug: 'claude-api-postman-collection',
    tagline: 'Complete Postman collection for Claude API',
    description: 'Comprehensive Postman collection with all Claude API endpoints, example requests, and automated tests. Perfect for API testing and integration development.',
    category: 'Tools & CLI',
    type: 'SERVICE',
    url: 'https://www.postman.com/anthropic/workspace/claude-api',
    tags: ['postman', 'api', 'testing', 'collection'],
    author: {
      name: 'Anthropic',
      url: 'https://anthropic.com'
    },
    stats: {
      votes: 145,
      copies: 892
    },
    difficulty: 'BEGINNER',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-discord-bot',
    title: 'Claude Discord Bot',
    slug: 'claude-discord-bot',
    tagline: 'AI-powered Discord community assistant',
    description: 'Smart Discord bot powered by Claude AI. Help community members with coding questions, provide explanations, and facilitate technical discussions in your server.',
    category: 'Tools & CLI',
    type: 'INTEGRATION',
    url: 'https://github.com/discord-community/claude-bot',
    tags: ['discord', 'bot', 'community', 'chat'],
    author: {
      name: 'Discord Community',
      url: 'https://github.com/discord-community'
    },
    stats: {
      votes: 367,
      copies: 1567
    },
    difficulty: 'INTERMEDIATE',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-raycast-extension',
    title: 'Claude for Raycast',
    slug: 'claude-raycast-extension',
    tagline: 'Quick Claude AI access on macOS',
    description: 'Raycast extension that brings Claude AI to your fingertips on macOS. Quick queries, code explanations, and AI assistance without leaving your workflow.',
    category: 'Tools & CLI',
    type: 'EXTENSION',
    url: 'https://www.raycast.com/extensions/claude-ai',
    tags: ['raycast', 'macos', 'productivity', 'quick-access'],
    author: {
      name: 'Raycast Community',
      url: 'https://raycast.com'
    },
    stats: {
      votes: 421,
      copies: 1893
    },
    difficulty: 'BEGINNER',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'claude-obsidian-plugin',
    title: 'Claude Obsidian Plugin',
    slug: 'claude-obsidian-plugin',
    tagline: 'AI-enhanced note-taking and knowledge management',
    description: 'Obsidian plugin that integrates Claude AI for intelligent note-taking. Generate summaries, create connections between notes, and enhance your knowledge management workflow.',
    category: 'Tools & CLI',
    type: 'EXTENSION',
    url: 'https://obsidian.md/plugins/claude-ai-assistant',
    tags: ['obsidian', 'notes', 'knowledge-management', 'productivity'],
    author: {
      name: 'Obsidian Community',
      url: 'https://obsidian.md'
    },
    stats: {
      votes: 298,
      copies: 1124
    },
    difficulty: 'BEGINNER',
    lastUpdated: '2024-12-01'
  }
];

module.exports = { tools };