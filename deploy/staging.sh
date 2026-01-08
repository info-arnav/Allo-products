#!/bin/bash
docker system prune -af
set -e

cd /var/www/Allo-products

git checkout deploy
git pull origin deploy

echo "Syncing database..."
cd server
ENV=staging npm run sync
cd ..

docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --build
