#!/bin/bash

# Claude Code Directory Data - Git Hooks Setup Script
# Configures local Git hooks for automated API generation

set -e

echo "🔧 Setting up Git hooks for Claude Code Directory Data..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a Git repository"
    echo "Please run this script from the root of your Git repository"
    exit 1
fi

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy and make hooks executable
echo "📁 Installing hooks..."

# Post-commit hook
if [ -f ".githooks/post-commit" ]; then
    cp .githooks/post-commit .git/hooks/post-commit
    chmod +x .git/hooks/post-commit
    echo "✅ Installed post-commit hook"
else
    echo "⚠️  Warning: .githooks/post-commit not found"
fi

# Pre-push hook  
if [ -f ".githooks/pre-push" ]; then
    cp .githooks/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    echo "✅ Installed pre-push hook"
else
    echo "⚠️  Warning: .githooks/pre-push not found"
fi

# Verify installations
echo ""
echo "🔍 Verifying hook installations..."

if [ -x ".git/hooks/post-commit" ]; then
    echo "✅ post-commit hook: Installed and executable"
else
    echo "❌ post-commit hook: Not found or not executable"
fi

if [ -x ".git/hooks/pre-push" ]; then
    echo "✅ pre-push hook: Installed and executable"
else
    echo "❌ pre-push hook: Not found or not executable"
fi

echo ""
echo "🎉 Git hooks setup complete!"
echo ""
echo "📋 What the hooks do:"
echo "  🔄 post-commit: Automatically regenerates JSON API after data file changes"
echo "  🚀 pre-push: Ensures API is up to date before pushing to remote"
echo ""
echo "🛠️  To manually build the API anytime:"
echo "  npm run build      # Using npm"
echo "  bun run build      # Using bun" 
echo "  yarn build         # Using yarn"
echo ""
echo "🔍 To check API status:"
echo "  npm run stats      # Show resource statistics"
echo "  npm run endpoints  # List available endpoints"
echo "  npm run validate   # Validate JSON files"
echo ""
echo "⚡ To start development with auto-rebuild:"
echo "  npm run dev        # Watches data/ folder for changes"