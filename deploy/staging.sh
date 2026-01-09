#!/bin/bash
set -e

LOCKFILE=/tmp/allo-deploy.lock
exec 9>$LOCKFILE || exit 1
flock 9

exec >> /var/log/allo-deploy.log 2>&1
set -x
date

cd /var/www/Allo-products
git checkout deploy
git pull origin deploy

# DB sync
cd server
cp /etc/allo/server/.env.staging .env
ENV=staging npm run sync
rm .env
cd ..

# Load build env into shell for compose
set -a
source /etc/allo/websites/main/.env.staging
set +a

# Build and deploy one service at a time to avoid RAM issues
docker compose -f docker-compose.staging.yml up -d --build --no-deps backend
docker compose -f docker-compose.staging.yml up -d --build --no-deps website
docker compose -f docker-compose.staging.yml up -d --build --no-deps admin

# Clean up old images
docker image prune -af
