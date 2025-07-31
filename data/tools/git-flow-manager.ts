export default {
  id: 'git-flow-manager',
  title: 'Git Flow Manager',
  slug: 'git-flow-manager',
  tagline: 'Advanced Git workflow automation with branch management and release orchestration',
  description: 'Advanced Git workflow automation with branch management, release orchestration, and team collaboration tools for enterprise development.',
  category: 'Tools & CLI',
  type: 'CLI',
  url: 'https://github.com/enterprise/git-flow-manager',
  tags: ['git', 'workflow', 'automation', 'branching', 'release-management', 'team-collaboration', 'enterprise'],
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  stats: {
    votes: 0,
    copies: 0
  },
  difficulty: 'ADVANCED',
  lastUpdated: '2024-01-31' Git Flow Manager

Advanced Git workflow automation tool for managing complex branching strategies, release processes, and team collaboration in enterprise environments.

## Installation and Setup

\`\`\`bash
# Install Git Flow Manager
npm install -g @enterprise/git-flow-manager

# Or using a shell script
curl -fsSL https://raw.githubusercontent.com/enterprise/git-flow-manager/main/install.sh | bash

# Initialize in repository
gfm init

# Configure team workflow
gfm config setup
\`\`\`

## Core Commands

### Branch Management

\`\`\`bash
# Feature branch workflow
gfm feature start FEATURE-123 "Add user authentication"
gfm feature sync                    # Sync with latest develop
gfm feature review                  # Create pull request
gfm feature finish FEATURE-123     # Merge and cleanup

# Hotfix workflow
gfm hotfix start v1.2.3 "Critical security fix"
gfm hotfix finish v1.2.3           # Deploy to production

# Release workflow
gfm release start v2.0.0
gfm release prepare                 # Run tests, update versions
gfm release finish v2.0.0          # Tag and merge to main

# Environment branching
gfm env promote staging production  # Promote staging to production
gfm env status                      # Show environment status
gfm env rollback production v1.2.2 # Rollback production
\`\`\`

### Advanced Workflows

\`\`\`bash
# Multi-repository management
gfm workspace init                  # Initialize workspace
gfm workspace sync                  # Sync all repositories
gfm workspace status               # Status across repos
gfm workspace feature start "cross-repo-feature"

# Dependency management
gfm deps check                     # Check cross-repo dependencies
gfm deps update service-a          # Update dependencies
gfm deps graph                     # Show dependency graph

# Conflict resolution
gfm conflicts detect              # Detect potential conflicts
gfm conflicts resolve FEATURE-123 # Interactive conflict resolution
gfm conflicts preview             # Preview merge conflicts
\`\`\`

## Configuration System

### Global Configuration

\`\`\`yaml
# ~/.gfm/config.yml
workflow:
  type: 'gitflow'              # gitflow, github-flow, custom
  main_branch: 'main'
  develop_branch: 'develop'
  feature_prefix: 'feature/'
  release_prefix: 'release/'
  hotfix_prefix: 'hotfix/'

branching:
  auto_delete: true            # Delete merged branches
  sync_before_start: true      # Sync with remote before creating
  require_issue: true          # Require issue number
  naming_convention: 'kebab-case'

automation:
  auto_pr: true               # Auto-create pull requests
  auto_assign: true           # Auto-assign reviewers
  auto_label: true            # Auto-apply labels
  run_tests: true             # Run tests on branch creation

team:
  reviewers:
    - 'senior-dev-1'
    - 'senior-dev-2'
  approvals_required: 2
  enforce_linear_history: true
  require_status_checks: true

notifications:
  slack:
    webhook: 'https://hooks.slack.com/...'
    channel: '#engineering'
  email:
    enabled: true
    recipients: ['team@company.com']

integrations:
  jira:
    url: 'https://company.atlassian.net'
    token: '${JIRA_TOKEN}'
    project: 'ENG'
  github:
    token: '${GITHUB_TOKEN}'
    org: 'company'
  jenkins:
    url: 'https://jenkins.company.com'
    token: '${JENKINS_TOKEN}'
\`\`\`

### Repository Configuration

\`\`\`yaml
# .gfm/repo.yml
repository:
  name: 'user-service'
  type: 'microservice'
  criticality: 'high'
  
environments:
  development:
    branch: 'develop'
    auto_deploy: true
    tests_required: ['unit', 'integration']
  
  staging:
    branch: 'staging'
    auto_deploy: false
    tests_required: ['unit', 'integration', 'e2e']
    approval_required: true
  
  production:
    branch: 'main'
    auto_deploy: false
    tests_required: ['unit', 'integration', 'e2e', 'performance']
    approvals_required: 2
    deployment_window: '09:00-17:00 UTC'

quality_gates:
  code_coverage: 80
  security_scan: true
  performance_threshold: '200ms'
  dependency_scan: true

hooks:
  pre_feature_start: './scripts/pre-feature.sh'
  post_feature_finish: './scripts/post-feature.sh'
  pre_release: './scripts/pre-release.sh'
  post_release: './scripts/post-release.sh'
\`\`\`

## Advanced Features

### Smart Branch Analysis

\`\`\`bash
# Analyze branch health
gfm analyze branch FEATURE-123
# Output:
# Branch Health Report for feature/FEATURE-123
# ├── Commits ahead of develop: 5
# ├── Commits behind develop: 12
# ├── Potential conflicts: 2 files
# ├── Test coverage: 85% (+5% from baseline)
# ├── Code quality score: 8.2/10
# ├── Last activity: 2 hours ago
# └── Estimated merge difficulty: Medium

# Analyze repository health
gfm analyze repo
# Output:
# Repository Health Dashboard
# ├── Active branches: 15
# ├── Stale branches: 3 (older than 30 days)
# ├── Hotfix branches: 1
# ├── Release candidates: 1
# ├── Merge conflicts: 0
# ├── Failed CI builds: 2
# └── Next release: v2.1.0 (estimated: 5 days)

# Team productivity analysis
gfm analyze team --period=30d
# Output:
# Team Productivity Report (Last 30 days)
# ├── Features completed: 12
# ├── Average feature cycle time: 5.2 days
# ├── Hotfixes deployed: 2
# ├── Code review turnaround: 4.3 hours
# ├── Deployment frequency: 2.1 per day
# └── Lead time for changes: 2.8 days
\`\`\`

### Automated Release Management

\`\`\`bash
# Smart release planning
gfm release plan v2.1.0
# Output:
# Release Plan for v2.1.0
# ├── Target date: 2024-02-15
# ├── Features included: 8
# ├── Bug fixes included: 12  
# ├── Breaking changes: 0
# ├── Dependencies updated: 5
# ├── Migration scripts: 2
# ├── Rollback plan: Available
# └── Risk assessment: Low

# Automated changelog generation
gfm changelog generate --from=v2.0.0 --to=HEAD
# Output generates structured changelog:
# # Changelog v2.1.0
# 
# ## Features
# - FEATURE-123: Add user authentication (#145)
# - FEATURE-124: Implement rate limiting (#147)
# 
# ## Bug Fixes
# - BUG-456: Fix memory leak in user cache (#149)
# - BUG-457: Resolve race condition in order processing (#151)
# 
# ## Dependencies
# - Updated express from 4.18.0 to 4.19.0
# - Updated typescript from 4.9.0 to 5.0.0

# Deployment coordination
gfm deploy coordinate v2.1.0
# Orchestrates:
# 1. Pre-deployment checks
# 2. Database migrations
# 3. Service deployment order
# 4. Health checks
# 5. Rollback triggers
\`\`\`

### Conflict Prevention and Resolution

\`\`\`bash
# Predictive conflict detection
gfm conflicts predict
# Output:
# Potential Conflict Analysis
# ├── feature/FEATURE-123 ↔ feature/FEATURE-124
# │   ├── Files: src/auth/userService.ts
# │   ├── Probability: 85%
# │   └── Recommendation: Coordinate with team
# └── feature/FEATURE-125 ↔ develop
#     ├── Files: package.json, yarn.lock
#     ├── Probability: 60%
#     └── Recommendation: Rebase before merge

# Interactive conflict resolution
gfm conflicts resolve --interactive
# Launches guided resolution interface:
# 1. Shows conflict context
# 2. Suggests resolution strategies
# 3. Provides merge preview
# 4. Validates resolution
# 5. Runs automated tests

# Conflict history and patterns
gfm conflicts history --analyze
# Output:
# Conflict Pattern Analysis
# ├── Most conflicted files:
# │   ├── package.json (12 conflicts)
# │   ├── src/config/database.ts (8 conflicts)
# │   └── src/types/user.ts (6 conflicts)
# ├── Peak conflict times: Thu 2-4 PM
# ├── Average resolution time: 23 minutes
# └── Success rate: 94%
\`\`\`

## Integration Scripts

### CI/CD Integration

\`\`\`yaml
# .github/workflows/git-flow.yml
name: Git Flow Automation

on:
  push:
    branches: ['feature/*', 'hotfix/*', 'release/*']
  pull_request:
    branches: ['develop', 'main']

jobs:
  validate_branch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate Git Flow
        run: |
          gfm validate branch
          gfm analyze conflicts
          gfm check quality-gates
      
      - name: Update Branch Status
        run: |
          gfm status update --ci-status=passing
          gfm notify team --event=branch-validated

  auto_merge:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request' && github.event.action == 'closed' && github.event.pull_request.merged == true
    steps:
      - name: Post-merge Cleanup
        run: |
          gfm feature finish ${{ github.head_ref }} --auto
          gfm analyze impact --branch=${{ github.head_ref }}
          gfm update dependencies
\`\`\`

### Custom Workflow Scripts

\`\`\`bash
#!/bin/bash
# scripts/pre-feature.sh - Run before feature branch creation

echo "🚀 Starting feature development setup..."

# Validate issue exists and is assigned
if ! gfm validate issue "$1"; then
    echo "❌ Issue $1 not found or not assigned"
    exit 1
fi

# Check for related features
RELATED=$(gfm deps find-related "$1")
if [ -n "$RELATED" ]; then
    echo "⚠️  Related features found: $RELATED"
    echo "Consider coordinating development"
fi

# Setup development environment
gfm env setup feature
docker-compose up -d
npm install

# Create tracking branch
gfm tracking create "$1"

echo "✅ Feature environment ready"
\`\`\`

\`\`\`bash
#!/bin/bash
# scripts/post-release.sh - Run after release completion

echo "🎉 Post-release automation starting..."

RELEASE_TAG="$1"
ENVIRONMENT="production"

# Update documentation
gfm docs update --version="$RELEASE_TAG"
gfm changelog publish --version="$RELEASE_TAG"

# Deploy to production
gfm deploy trigger "$ENVIRONMENT" --version="$RELEASE_TAG"

# Monitor deployment
gfm monitor deployment --timeout=600 --environment="$ENVIRONMENT"

# Update issue tracker
gfm issues close --release="$RELEASE_TAG"
gfm issues create --type=retrospective --release="$RELEASE_TAG"

# Notify stakeholders
gfm notify stakeholders --event=release-complete \
    --version="$RELEASE_TAG" \
    --environment="$ENVIRONMENT"

# Cleanup old releases
gfm cleanup releases --keep=5

echo "✅ Post-release automation complete"
\`\`\`

## Team Collaboration Features

### Code Review Orchestration

\`\`\`bash
# Smart reviewer assignment
gfm review assign --auto
# Uses:
# - File ownership (CODEOWNERS)
# - Expertise mapping
# - Workload balancing
# - Time zone considerations

# Review progress tracking
gfm review status
# Output:
# Pull Request Review Status
# ├── feature/FEATURE-123
# │   ├── Reviewers: 2/3 approved
# │   ├── Status checks: 4/4 passing
# │   ├── Merge conflicts: None
# │   └── Ready to merge: Yes
# └── feature/FEATURE-124
#     ├── Reviewers: 1/2 approved
#     ├── Status checks: 3/4 passing
#     ├── Merge conflicts: 1 file
#     └── Ready to merge: No

# Review reminders
gfm review remind --overdue
# Sends targeted reminders based on:
# - Review age
# - Reviewer availability
# - Pull request priority
# - Team agreements
\`\`\`

### Knowledge Sharing

\`\`\`bash
# Generate development insights
gfm insights generate --period=sprint
# Output:
# Sprint Development Insights
# ├── Code hotspots: 3 files changed in >50% of PRs
# ├── Knowledge distribution: 2 single-owner files detected
# ├── Review patterns: Backend changes need 2.3x more review time
# ├── Testing gaps: 12% of changes lack corresponding tests
# └── Recommendations: 
#     ├── Add automated tests for user authentication flow
#     ├── Share knowledge on payment processing module
#     └── Consider pairing on database optimization features

# Team health metrics
gfm team health
# Output:
# Team Health Dashboard
# ├── Bus factor: 3.2 (healthy)
# ├── Code ownership distribution: Balanced
# ├── Review load: Evenly distributed
# ├── Merge conflicts: Below threshold
# ├── Feature delivery predictability: 87%
# └── Technical debt trend: Decreasing
\`\`\`

## Monitoring and Alerting

\`\`\`bash
# Real-time workflow monitoring
gfm monitor start
# Watches for:
# - Long-running feature branches
# - Failed deployments
# - Security vulnerabilities
# - Merge conflicts
# - Performance regressions

# Custom alerts
gfm alert create "stale-branches" \
    --condition="age > 30 days AND commits = 0" \
    --action="notify-owner"

gfm alert create "hotfix-ready" \
    --condition="branch = hotfix/* AND ci = passing" \
    --action="auto-deploy staging"

# Performance monitoring
gfm perf monitor --baseline=main
# Tracks:
# - Build times
# - Test execution time
# - Deployment duration
# - Code complexity metrics
# - Repository size
\`\`\`

## Usage Examples

### Daily Development Workflow

\`\`\`bash
# Morning routine
gfm sync all                    # Sync all repositories
gfm status dashboard           # Check team status
gfm conflicts check            # Check for potential conflicts

# Start feature work
gfm feature start PROJ-123 "Add user preferences"
# Auto-creates branch, assigns reviewers, updates issue tracker

# During development
gfm feature sync               # Keep up to date with develop
gfm test run --affected        # Run tests for changed files
gfm quality check              # Check code quality

# Ready for review
gfm feature review             # Create PR with context
# Auto-fills description, adds labels, assigns reviewers

# End of day
gfm feature save               # Save progress and sync
gfm status report              # Generate daily report
\`\`\`

### Release Management

\`\`\`bash
# Release preparation
gfm release plan v2.0.0
gfm release validate           # Check all features are ready
gfm release create v2.0.0

# During release
gfm release deploy staging     # Deploy to staging
gfm release test staging       # Run release tests
gfm release deploy production  # Deploy to production

# Post-release
gfm release monitor            # Monitor production deployment
gfm release report             # Generate release report
gfm release retrospective      # Schedule team retrospective
\`\`\`

};