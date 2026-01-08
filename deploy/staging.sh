#!/bin/bash
exec >> /var/log/allo-deploy.log 2>&1
set -x
date
docker system prune -af

cd /var/www/Allo-products

git checkout deploy
git pull origin deploy

echo "Syncing database..."
cd server
cp /etc/allo/server/.env.staging .env
ENV=staging npm run sync
rm .env
cd ..

docker compose -f docker-compose.staging.yml up -d --build --no-deps backend
docker compose -f docker-compose.staging.yml up -d --build --no-deps website
docker compose -f docker-compose.staging.yml up -d --build --no-deps admin
