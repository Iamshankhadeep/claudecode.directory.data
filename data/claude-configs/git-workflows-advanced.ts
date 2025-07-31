import { ClaudeMdConfig } from '../types';

export const gitWorkflowsAdvancedConfigs: ClaudeMdConfig[] = [
  {
    id: 'git-workflows-advanced',
    title: 'Advanced Git Workflows + GitOps',
    slug: 'advanced-git-workflows-gitops-automation',
    description: 'Comprehensive Git workflow automation with GitOps principles, release automation, advanced branching strategies, and CI/CD integration for enterprise-scale development teams.',
    category: 'Claude.md Configurations',
    tags: ['git', 'gitops', 'cicd', 'automation', 'workflows', 'branching', 'release-management'],
    difficulty: 'ADVANCED',
    language: 'Shell',
    framework: 'Git + GitHub Actions + ArgoCD',
    content: `# Claude.md - Advanced Git Workflows + GitOps

## Project Overview

This is an advanced Git workflow configuration designed for enterprise-scale development teams that require sophisticated branching strategies, automated release management, GitOps principles, and comprehensive CI/CD integration. It provides battle-tested patterns for managing complex codebases with multiple teams and deployment environments.

## Development Philosophy

### GitOps Principles
1. **Declarative Configuration**: Infrastructure and applications defined declaratively
2. **Version Controlled**: All configuration stored in Git repositories
3. **Automated Deployment**: Changes automatically deployed via Git operations
4. **Convergence**: Systems automatically converge to desired state
5. **Observability**: Full audit trail of all changes

### Advanced Git Workflow Benefits
- **Parallel Development**: Multiple features developed simultaneously
- **Release Management**: Automated versioning and changelog generation
- **Quality Gates**: Automated testing and approval processes
- **Rollback Capability**: Safe rollback to any previous state
- **Branch Protection**: Enforced code review and testing requirements
- **Semantic Versioning**: Automated version bumping based on commit messages

## Technology Stack

- **Version Control**: Git with advanced hooks and automation
- **Repository Platform**: GitHub/GitLab with enterprise features
- **CI/CD**: GitHub Actions / GitLab CI / Jenkins
- **GitOps**: ArgoCD / Flux for Kubernetes deployments
- **Release Management**: Semantic Release / Release Please
- **Code Quality**: Pre-commit hooks, SonarQube, CodeClimate
- **Security**: Dependabot, Snyk, Git secret scanning

## Project Structure

\`\`\`
enterprise-git-workflows/
├── .github/                          # GitHub-specific configurations
│   ├── workflows/                    # GitHub Actions CI/CD
│   │   ├── ci.yml                   # Continuous Integration
│   │   ├── cd.yml                   # Continuous Deployment
│   │   ├── release.yml              # Automated releases
│   │   ├── security.yml             # Security scanning
│   │   └── gitops-sync.yml          # GitOps synchronization
│   ├── PULL_REQUEST_TEMPLATE.md     # PR template
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   └── CODEOWNERS                   # Code ownership rules
├── .gitops/                         # GitOps configurations
│   ├── applications/                # Application definitions
│   │   ├── staging/                 # Staging environment
│   │   ├── production/              # Production environment
│   │   └── development/             # Development environment
│   ├── infrastructure/              # Infrastructure as Code
│   │   ├── terraform/               # Terraform configurations
│   │   ├── helm/                    # Helm charts
│   │   └── kustomize/               # Kustomize overlays
│   └── policies/                    # OPA policies
├── scripts/                         # Automation scripts
│   ├── git-hooks/                   # Git hook scripts
│   │   ├── pre-commit               # Pre-commit validation
│   │   ├── pre-push                 # Pre-push validation
│   │   ├── commit-msg               # Commit message validation
│   │   └── post-merge               # Post-merge actions
│   ├── release/                     # Release automation
│   │   ├── prepare-release.sh       # Release preparation
│   │   ├── generate-changelog.sh    # Changelog generation
│   │   └── tag-version.sh          # Version tagging
│   ├── quality/                     # Code quality scripts
│   │   ├── run-tests.sh            # Test execution
│   │   ├── lint-code.sh            # Code linting
│   │   └── security-scan.sh        # Security scanning
│   └── gitops/                      # GitOps utilities
│       ├── sync-manifests.sh        # Manifest synchronization
│       ├── promote-release.sh       # Release promotion
│       └── rollback.sh              # Rollback automation
├── docs/                            # Documentation
│   ├── git-workflow-guide.md        # Workflow documentation
│   ├── branching-strategy.md        # Branching strategy
│   ├── release-process.md           # Release process
│   └── troubleshooting.md           # Common issues
├── .pre-commit-config.yaml          # Pre-commit configuration
├── .releaserc.json                  # Semantic release config
├── BRANCHING_STRATEGY.md            # Branching strategy doc
└── GIT_WORKFLOW.md                  # Workflow guide
\`\`\`

## Branching Strategy

### GitFlow Enhanced Model
\`\`\`
main (production)           ──●──────●──────●──────●──
                              │      │      │      │
release/v2.1.0               ●──●──●──●      │      │
                             │     │         │      │
develop (integration)    ──●──●──●──●──●──●──●──●──●──
                           │  │     │  │     │  │
feature/user-auth       ──●──●──●──│  │     │  │
                              │     │  │     │  │
feature/payment-flow       ──●──●──●──│     │  │
                                     │     │  │
hotfix/security-patch             ──●──●──●──│
                                           │
bugfix/login-issue                    ──●──●──
\`\`\`

### Branch Types and Rules
1. **main**: Production-ready code, protected, requires PR
2. **develop**: Integration branch, automated testing
3. **feature/***: Feature development, created from develop
4. **release/***: Release preparation, version bumping
5. **hotfix/***: Critical fixes, created from main
6. **bugfix/***: Bug fixes, created from develop

## Git Hooks Configuration

### Pre-commit Hook
\`\`\`bash
#!/bin/bash
# .git/hooks/pre-commit

set -e

echo "🔍 Running pre-commit checks..."

# Check for merge conflicts
if grep -r "<<<<<<< HEAD" . --exclude-dir=.git; then
    echo "❌ Merge conflict markers found. Please resolve conflicts."
    exit 1
fi

# Prevent commits to protected branches
BRANCH=\$(git rev-parse --abbrev-ref HEAD)
PROTECTED_BRANCHES="^(main|master|develop)$"

if [[ \$BRANCH =~ \$PROTECTED_BRANCHES ]]; then
    echo "❌ Direct commits to \$BRANCH are not allowed. Please use a feature branch."
    exit 1
fi

# Check commit message format
COMMIT_MSG=\$(cat .git/COMMIT_EDITMSG 2>/dev/null || echo "")
if [[ ! \$COMMIT_MSG =~ ^(feat|fix|docs|style|refactor|test|chore|ci|build|perf)(\(.+\))?: .+ ]]; then
    echo "❌ Commit message must follow Conventional Commits format:"
    echo "   <type>[optional scope]: <description>"
    echo "   Example: feat(auth): add OAuth2 login"
    exit 1
fi

# Run code quality checks
echo "🧹 Running code quality checks..."

# ESLint for JavaScript/TypeScript
if command -v npx &> /dev/null && [ -f "package.json" ]; then
    npx eslint . --ext .js,.jsx,.ts,.tsx --fix
fi

# Black for Python
if command -v black &> /dev/null && find . -name "*.py" | grep -q .; then
    black --check .
fi

# Go fmt for Go
if command -v go &> /dev/null && find . -name "*.go" | grep -q .; then
    go fmt ./...
fi

# Rust fmt for Rust
if command -v cargo &> /dev/null && [ -f "Cargo.toml" ]; then
    cargo fmt --check
fi

# Run tests
echo "🧪 Running tests..."
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    npm test -- --passWithNoTests
fi

if [ -f "Cargo.toml" ]; then
    cargo test
fi

if find . -name "*.py" | grep -q . && [ -f "requirements.txt" ]; then
    python -m pytest --tb=short
fi

# Security checks
echo "🔒 Running security checks..."

# Check for secrets
if command -v truffleHog &> /dev/null; then
    truffleHog --regex --entropy=False .
fi

# Dependency vulnerability check
if command -v npm &> /dev/null && [ -f "package.json" ]; then
    npm audit --audit-level=moderate
fi

if command -v cargo &> /dev/null && [ -f "Cargo.toml" ]; then
    cargo audit
fi

echo "✅ All pre-commit checks passed!"
\`\`\`

### Commit Message Hook
\`\`\`bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG_FILE=\$1
COMMIT_MSG=\$(cat \$COMMIT_MSG_FILE)

# Conventional Commits pattern
PATTERN="^(feat|fix|docs|style|refactor|test|chore|ci|build|perf)(\(.+\))?: .{1,50}"

if [[ ! \$COMMIT_MSG =~ \$PATTERN ]]; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "Commit message must follow Conventional Commits specification:"
    echo ""
    echo "Format: <type>[optional scope]: <description>"
    echo ""
    echo "Types:"
    echo "  feat:     A new feature"
    echo "  fix:      A bug fix"
    echo "  docs:     Documentation only changes"
    echo "  style:    Code style changes (formatting, etc.)"
    echo "  refactor: Code refactoring"
    echo "  test:     Adding or updating tests"
    echo "  chore:    Maintenance tasks"
    echo "  ci:       CI/CD related changes"
    echo "  build:    Build system changes"
    echo "  perf:     Performance improvements"
    echo ""
    echo "Examples:"
    echo "  feat(auth): add OAuth2 login support"
    echo "  fix(api): resolve user validation bug"
    echo "  docs: update README with new setup instructions"
    echo ""
    exit 1
fi

# Check description length
DESCRIPTION=\$(echo "\$COMMIT_MSG" | head -n1 | sed 's/^[^:]*: //')
if [ \${#DESCRIPTION} -gt 50 ]; then
    echo "⚠️  Warning: Commit message description is longer than 50 characters"
    echo "   Consider making it more concise for better readability"
fi

# Check for body separation
if [ \$(echo "\$COMMIT_MSG" | wc -l) -gt 1 ]; then
    SECOND_LINE=\$(echo "\$COMMIT_MSG" | sed -n '2p')
    if [ -n "\$SECOND_LINE" ]; then
        echo "❌ Second line of commit message must be blank"
        echo "   Use: <title>\\n\\n<body>"
        exit 1
    fi
fi

echo "✅ Commit message format is valid"
\`\`\`

## GitHub Actions Workflows

### Continuous Integration
\`\`\`yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [ develop, 'feature/*', 'bugfix/*' ]
  pull_request:
    branches: [ main, develop ]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality-checks:
    name: Code Quality & Security
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Prettier
        run: npm run format:check

      - name: Type checking
        run: npm run type-check

      - name: Security audit
        run: npm audit --audit-level=moderate

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

  build:
    name: Build & Test
    runs-on: ubuntu-latest
    needs: quality-checks
    
    strategy:
      matrix:
        node-version: [18, 20, 22]
        
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    name: End-to-End Tests
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Start application
        run: npm run dev &

      - name: Wait for application
        run: npx wait-on http://localhost:3000

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  security-scan:
    name: Security Scanning
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
\`\`\`

### Continuous Deployment
\`\`\`yaml
# .github/workflows/cd.yml
name: Continuous Deployment

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Build Docker image
        run: |
          docker build -t myapp:staging .
          docker tag myapp:staging myregistry.com/myapp:staging

      - name: Login to registry
        uses: docker/login-action@v2
        with:
          registry: myregistry.com
          username: \${{ secrets.REGISTRY_USERNAME }}
          password: \${{ secrets.REGISTRY_PASSWORD }}

      - name: Push Docker image
        run: docker push myregistry.com/myapp:staging

      - name: Update GitOps repository
        run: |
          git clone https://\${{ secrets.GITOPS_TOKEN }}@github.com/myorg/gitops-repo.git
          cd gitops-repo
          sed -i 's|image:.*|image: myregistry.com/myapp:staging|' applications/staging/deployment.yaml
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "chore(staging): update image to staging"
          git push

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    environment: production
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Get version from tag
        id: version
        run: echo "version=\${GITHUB_REF#refs/tags/}" >> \$GITHUB_OUTPUT

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ steps.version.outputs.version }} .
          docker tag myapp:\${{ steps.version.outputs.version }} myregistry.com/myapp:\${{ steps.version.outputs.version }}
          docker tag myapp:\${{ steps.version.outputs.version }} myregistry.com/myapp:latest

      - name: Login to registry
        uses: docker/login-action@v2
        with:
          registry: myregistry.com
          username: \${{ secrets.REGISTRY_USERNAME }}
          password: \${{ secrets.REGISTRY_PASSWORD }}

      - name: Push Docker images
        run: |
          docker push myregistry.com/myapp:\${{ steps.version.outputs.version }}
          docker push myregistry.com/myapp:latest

      - name: Update GitOps repository
        run: |
          git clone https://\${{ secrets.GITOPS_TOKEN }}@github.com/myorg/gitops-repo.git
          cd gitops-repo
          sed -i 's|image:.*|image: myregistry.com/myapp:\${{ steps.version.outputs.version }}|' applications/production/deployment.yaml
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "chore(production): deploy version \${{ steps.version.outputs.version }}"
          git push

      - name: Create GitHub release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/*.tar.gz
            dist/*.zip
          generate_release_notes: true
\`\`\`

### Automated Release Management
\`\`\`yaml
# .github/workflows/release.yml
name: Release Management

on:
  push:
    branches: [ main ]

jobs:
  release:
    name: Create Release
    runs-on: ubuntu-latest
    if: "!contains(github.event.head_commit.message, 'chore(release)')"
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: \${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build

      - name: Release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
\`\`\`

## GitOps Configuration

### ArgoCD Application
\`\`\`yaml
# .gitops/applications/staging/application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-staging
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/gitops-repo.git
    targetRevision: HEAD
    path: applications/staging
  destination:
    server: https://kubernetes.default.svc
    namespace: staging
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10
\`\`\`

### Kustomize Overlay
\`\`\`yaml
# .gitops/applications/staging/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: staging

resources:
  - ../../base

images:
  - name: myapp
    newName: myregistry.com/myapp
    newTag: staging

patchesStrategicMerge:
  - deployment-patch.yaml
  - service-patch.yaml

configMapGenerator:
  - name: app-config
    files:
      - config.yaml
    options:
      disableNameSuffixHash: true

secretGenerator:
  - name: app-secrets
    envs:
      - secrets.env
    options:
      disableNameSuffixHash: true
\`\`\`

## Release Automation Scripts

### Semantic Release Configuration
\`\`\`json
{
  "branches": [
    "main",
    {
      "name": "develop",
      "prerelease": "beta"
    }
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": [
          "CHANGELOG.md",
          "package.json",
          "package-lock.json"
        ],
        "message": "chore(release): \${nextRelease.version} [skip ci]\\n\\n\${nextRelease.notes}"
      }
    ]
  ],
  "preset": "conventionalcommits",
  "releaseRules": [
    { "type": "feat", "release": "minor" },
    { "type": "fix", "release": "patch" },
    { "type": "perf", "release": "patch" },
    { "type": "revert", "release": "patch" },
    { "type": "docs", "scope": "README", "release": "patch" },
    { "type": "refactor", "release": "patch" },
    { "type": "style", "release": false },
    { "type": "chore", "release": false },
    { "type": "test", "release": false },
    { "scope": "no-release", "release": false }
  ]
}
\`\`\`

### Release Preparation Script
\`\`\`bash
#!/bin/bash
# scripts/release/prepare-release.sh

set -e

VERSION_TYPE=\${1:-"auto"}
BRANCH=\$(git rev-parse --abbrev-ref HEAD)

echo "🚀 Preparing release from branch: \$BRANCH"

# Ensure we're on the right branch
if [ "\$BRANCH" != "main" ] && [ "\$BRANCH" != "develop" ]; then
    echo "❌ Releases can only be prepared from main or develop branch"
    exit 1
fi

# Ensure working directory is clean
if [ -n "\$(git status --porcelain)" ]; then
    echo "❌ Working directory is not clean. Please commit or stash changes."
    exit 1
fi

# Fetch latest changes
git fetch origin

# Ensure branch is up to date
if [ "\$(git rev-parse HEAD)" != "\$(git rev-parse @{u})" ]; then
    echo "❌ Local branch is not up to date with remote. Please pull latest changes."
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm run test

# Run linting
echo "🧹 Running linting..."
npm run lint

# Run build
echo "🏗️  Building application..."
npm run build

# Generate changelog
echo "📝 Generating changelog..."
npm run changelog

# Determine version bump
if [ "\$VERSION_TYPE" = "auto" ]; then
    # Analyze commits since last release
    LAST_TAG=\$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    
    if [ -n "\$LAST_TAG" ]; then
        COMMITS=\$(git log \$LAST_TAG..HEAD --oneline)
    else
        COMMITS=\$(git log --oneline)
    fi
    
    if echo "\$COMMITS" | grep -q "^[a-f0-9]\\+ feat"; then
        VERSION_TYPE="minor"
    elif echo "\$COMMITS" | grep -q "^[a-f0-9]\\+ fix"; then
        VERSION_TYPE="patch"
    else
        VERSION_TYPE="patch"
    fi
fi

echo "📦 Version bump type: \$VERSION_TYPE"

# Bump version
npm version \$VERSION_TYPE --no-git-tag-version

NEW_VERSION=\$(node -p "require('./package.json').version")

echo "✅ Prepared release version: v\$NEW_VERSION"
echo "   Next steps:"
echo "   1. Review changes"
echo "   2. Commit version bump: git commit -am 'chore(release): v\$NEW_VERSION'"
echo "   3. Create and push tag: git tag v\$NEW_VERSION && git push origin v\$NEW_VERSION"
\`\`\`

## Advanced Git Commands and Utilities

### Git Aliases Configuration
\`\`\`bash
# Add to ~/.gitconfig or run as commands

# Workflow aliases
git config --global alias.sw 'switch'
git config --global alias.co 'checkout'
git config --global alias.br 'branch'
git config --global alias.st 'status --short --branch'
git config --global alias.ci 'commit'
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'

# Enhanced logging
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.lga "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all"

# Branch management
git config --global alias.bra 'branch -a'
git config --global alias.brd 'branch -d'
git config --global alias.brD 'branch -D'
git config --global alias.brc 'checkout -b'

# Stash operations
git config --global alias.sl 'stash list'
git config --global alias.sa 'stash apply'
git config --global alias.ss 'stash save'
git config --global alias.sp 'stash pop'

# Advanced operations
git config --global alias.amend 'commit --amend --no-edit'
git config --global alias.amendm 'commit --amend'
git config --global alias.pushf 'push --force-with-lease'
git config --global alias.pullr 'pull --rebase'

# Find operations
git config --global alias.find 'log --all --full-history -- '
git config --global alias.grep 'grep --break --heading --line-number'

# Cleanup operations
git config --global alias.cleanup 'remote prune origin'
git config --global alias.prune-branches '!git branch --merged | grep -v "\\*\\|main\\|develop" | xargs -n 1 git branch -d'
\`\`\`

### GitOps Sync Script
\`\`\`bash
#!/bin/bash
# scripts/gitops/sync-manifests.sh

set -e

ENVIRONMENT=\${1:-"staging"}
IMAGE_TAG=\${2:-"latest"}
GITOPS_REPO=\${3:-"git@github.com:myorg/gitops-repo.git"}

echo "🔄 Syncing GitOps manifests for \$ENVIRONMENT"

# Clone or update GitOps repository
if [ -d "gitops-repo" ]; then
    cd gitops-repo
    git pull origin main
else
    git clone \$GITOPS_REPO gitops-repo
    cd gitops-repo
fi

# Update application manifests
MANIFEST_PATH="applications/\$ENVIRONMENT"

if [ ! -d "\$MANIFEST_PATH" ]; then
    echo "❌ Environment \$ENVIRONMENT not found in GitOps repository"
    exit 1
fi

# Update image tag in Kustomization
sed -i "s|newTag:.*|newTag: \$IMAGE_TAG|" \$MANIFEST_PATH/kustomization.yaml

# Validate manifests
echo "✅ Validating Kubernetes manifests..."
kubectl kustomize \$MANIFEST_PATH > /tmp/manifest-validation.yaml
kubectl --dry-run=client apply -f /tmp/manifest-validation.yaml

# Commit and push changes
git add .
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    git commit -m "chore(\$ENVIRONMENT): update image to \$IMAGE_TAG"
    git push origin main
    echo "✅ GitOps manifests updated successfully"
fi

cd ..
rm -rf gitops-repo
\`\`\`

## Workflow Documentation

### Developer Workflow
1. **Feature Development**:
   - Create feature branch from develop: \`git checkout -b feature/new-feature develop\`
   - Implement feature with regular commits using conventional commit format
   - Run local tests and quality checks
   - Push branch and create Pull Request

2. **Code Review Process**:
   - Automated CI checks must pass
   - Require at least 2 approvals from code owners
   - All conversations must be resolved
   - Branch must be up to date with target branch

3. **Release Process**:
   - Merge develop to main triggers release preparation
   - Semantic versioning automatically determined from commit messages
   - Automated testing in staging environment
   - Manual approval required for production deployment

4. **Hotfix Process**:
   - Create hotfix branch from main: \`git checkout -b hotfix/critical-fix main\`
   - Implement fix and test thoroughly
   - Fast-track review process for critical issues
   - Deploy to production and back-merge to develop

This advanced Git workflow provides enterprise-grade automation, quality control, and deployment capabilities while maintaining developer productivity and code quality standards.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];