#!/bin/bash
set -e

LOCKFILE=/tmp/allo-deploy.lock
exec 9>$LOCKFILE || exit 1
flock 9

exec >> /var/log/allo-deploy.log 2>&1
set -x
date

cd /var/www/Allo-products
git checkout main
git pull origin main

# DB sync
cd server
cp /etc/allo/server/.env.production .env
ENV=production npm run sync
rm .env
cd ..

# Build and deploy one service at a time to avoid RAM issues
docker compose -p allo-production -f docker-compose.production.yml up -d --build --no-deps backend

# Load website env vars and build
set -a
source /etc/allo/websites/main/.env.production
set +a
docker compose -p allo-production -f docker-compose.production.yml up -d --build --no-deps website

# Load admin env vars and build
set -a
source /etc/allo/websites/admin/.env.production
set +a
docker compose -p allo-production -f docker-compose.production.yml up -d --build --no-deps admin

# Clean up old images
docker image prune -af
