#!/bin/bash
# Script to amend commit messages

# This script will interactively rebase and update the poor commit messages
# Run this from your local repo: bash fix-commit-messages.sh

echo "Starting interactive rebase for last 10 commits..."
git rebase -i HEAD~10

echo ""
echo "After the rebase completes, force push with:"
echo "git push --force-with-lease"
