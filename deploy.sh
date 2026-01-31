#!/bin/bash
echo "Initializing Git repository..."
git init

echo "Adding files..."
git add .

echo "Committing changes..."
git commit -m "Modern UI Redesign: Glassmorphism, 3D Effects, and SEO Infrastructure"

echo "Renaming branch to main..."
git branch -M main

echo "Adding remote origin..."
# Remove origin if it exists to avoid errors on re-run
git remote remove origin 2>/dev/null
git remote add origin https://github.com/gax8627/Dataz

echo "Pushing to GitHub..."
git push -u origin main

echo "Deployment complete!"
