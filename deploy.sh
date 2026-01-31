#!/bin/bash
git add .
git commit -m "Fix Vercel build lint errors: clean up unused vars and types"
git push origin main
echo "Fixes pushed! Vercel should auto-redeploy."
