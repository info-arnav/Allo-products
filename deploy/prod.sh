#!/bin/bash
docker system prune -af
set -e

cd /var/www/Allo-products

git checkout main
git pull origin main

echo "Syncing database..."
cd server
ENV=production npm run sync
cd ..

docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up -d --build
