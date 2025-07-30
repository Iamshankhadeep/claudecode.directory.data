#!/bin/bash

# Deploy Static API to GitHub Repository
# This script copies the generated API to a GitHub repository for hosting

set -e

echo "🚀 Deploying Claude Code Directory Static API to GitHub..."

# Configuration
GITHUB_REPO_PATH="${1:-../github-repo}"  # First argument or default path
API_SOURCE_PATH="./api"
BUILD_REQUIRED=true

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if API directory exists
if [ ! -d "$API_SOURCE_PATH" ]; then
    print_error "API directory not found. Running build first..."
    npm run build
fi

# Verify API was built successfully
if [ ! -f "$API_SOURCE_PATH/manifest.json" ]; then
    print_error "No manifest.json found. Build may have failed."
    exit 1
fi

# Read stats from manifest
TOTAL_RESOURCES=$(jq -r '.stats.total_resources' "$API_SOURCE_PATH/manifest.json")
TOTAL_CATEGORIES=$(jq -r '.stats.total_categories' "$API_SOURCE_PATH/manifest.json")
GENERATED_AT=$(jq -r '.generated_at' "$API_SOURCE_PATH/manifest.json")

print_status "📊 Local API Stats:"
echo "   📁 Total Resources: $TOTAL_RESOURCES"
echo "   🏷️  Total Categories: $TOTAL_CATEGORIES"
echo "   ⏰ Generated: $GENERATED_AT"
echo ""

# Check if GitHub repo path exists
if [ ! -d "$GITHUB_REPO_PATH" ]; then
    print_error "GitHub repository path not found: $GITHUB_REPO_PATH"
    echo "Usage: $0 [path-to-github-repo]"
    echo "Example: $0 ../claudecode-directory-data"
    exit 1
fi

# Verify it's a git repository
if [ ! -d "$GITHUB_REPO_PATH/.git" ]; then
    print_error "Path is not a git repository: $GITHUB_REPO_PATH"
    exit 1
fi

print_status "📂 Copying API files to GitHub repository..."

# Create api directory in GitHub repo if it doesn't exist
mkdir -p "$GITHUB_REPO_PATH/api"

# Copy all API files
rsync -av --delete "$API_SOURCE_PATH/" "$GITHUB_REPO_PATH/api/"

print_success "✅ Files copied successfully!"

# Verify the copy
if [ ! -f "$GITHUB_REPO_PATH/api/manifest.json" ]; then
    print_error "Copy verification failed - manifest.json not found in destination"
    exit 1
fi

# Read stats from copied manifest
COPIED_RESOURCES=$(jq -r '.stats.total_resources' "$GITHUB_REPO_PATH/api/manifest.json")
COPIED_CATEGORIES=$(jq -r '.stats.total_categories' "$GITHUB_REPO_PATH/api/manifest.json")

print_status "📊 Copied API Stats:"
echo "   📁 Total Resources: $COPIED_RESOURCES"
echo "   🏷️  Total Categories: $COPIED_CATEGORIES"
echo ""

# Verify data integrity
if [ "$TOTAL_RESOURCES" != "$COPIED_RESOURCES" ]; then
    print_error "Data integrity check failed! Resource count mismatch."
    exit 1
fi

print_success "✅ Data integrity verified!"

# Change to GitHub repo directory
cd "$GITHUB_REPO_PATH"

# Check git status
if [ -n "$(git status --porcelain)" ]; then
    print_status "📝 Git changes detected. Staging changes..."
    
    # Add all changes
    git add api/
    
    # Create commit message
    COMMIT_MSG="Update static API data

- Total resources: $TOTAL_RESOURCES (was $(git show HEAD:api/manifest.json 2>/dev/null | jq -r '.stats.total_resources // "unknown"'))
- Total categories: $TOTAL_CATEGORIES
- Generated at: $GENERATED_AT
- Complete data structure with nested tags and categories

🤖 Auto-deployed from build system"

    # Commit changes
    git commit -m "$COMMIT_MSG"
    
    print_success "✅ Changes committed!"
    
    # Ask if user wants to push
    echo ""
    print_warning "Ready to push to GitHub. Continue? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        print_status "🚀 Pushing to GitHub..."
        git push
        print_success "✅ Successfully pushed to GitHub!"
        
        # Show next steps
        echo ""
        echo "🎉 Deployment complete! Next steps:"
        echo ""
        echo "1. 🌐 Verify your data online:"
        echo "   https://raw.githubusercontent.com/[username]/[repo]/main/api/manifest.json"
        echo ""
        echo "2. 🔧 Configure your web app with these environment variables:"
        echo "   NEXT_PUBLIC_STATIC_ONLY=true"
        echo "   NEXT_PUBLIC_STATIC_DATA_URL=https://raw.githubusercontent.com/[username]/[repo]/main/api/v1"
        echo ""
        echo "3. 🧪 Test your website at /browse and /configs"
        
    else
        print_warning "⏸️  Changes committed but not pushed. Run 'git push' when ready."
    fi
else
    print_warning "⚪ No changes detected in the API data."
fi

print_success "🎊 Deployment script completed!"