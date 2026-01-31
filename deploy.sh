#!/bin/bash
git add .
git commit -m "Fix: Add prisma generate to build script for Vercel"
git push origin main
echo "Prisma fix pushed!"
