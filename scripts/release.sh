#!/usr/bin/env bash
set -euo pipefail

# Synkra DS - Release Script
# Usage: ./scripts/release.sh [patch|minor|major]
# Example: ./scripts/release.sh minor

BUMP_TYPE="${1:-patch}"

if [[ "$BUMP_TYPE" != "patch" && "$BUMP_TYPE" != "minor" && "$BUMP_TYPE" != "major" ]]; then
  echo "Usage: $0 [patch|minor|major]"
  exit 1
fi

# Ensure clean working tree
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: Working tree is not clean. Commit or stash changes first."
  exit 1
fi

# Ensure on main branch
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" != "main" ]]; then
  echo "Error: Must be on main branch (currently on $BRANCH)"
  exit 1
fi

# Pull latest
git pull origin main

# Run quality gates
echo "Running quality gates..."
npm run lint
npm run typecheck
npm test
npm run build

# Bump version (triggers npm run version → changelog + git add)
echo "Bumping $BUMP_TYPE version..."
NEW_VERSION=$(npm version "$BUMP_TYPE" --message "release: v%s")

echo "Pushing to remote..."
git push origin main --tags

# Create GitHub release with changelog excerpt
echo "Creating GitHub release..."
CHANGELOG_BODY=$(sed -n "/^# ${NEW_VERSION#v}/,/^# /p" CHANGELOG.md | sed '1d;$d')
if [[ -z "$CHANGELOG_BODY" ]]; then
  CHANGELOG_BODY="Release ${NEW_VERSION}"
fi

gh release create "$NEW_VERSION" \
  --title "$NEW_VERSION" \
  --notes "$CHANGELOG_BODY" \
  --latest

echo ""
echo "Release $NEW_VERSION created successfully!"
echo "npm publish will be triggered automatically by GitHub Actions."
echo "Track at: https://github.com/fabiobrunning/Neoloop-Desing/actions"
