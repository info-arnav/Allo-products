#!/bin/bash
exec >> /var/log/allo-deploy.log 2>&1
set -x
date
docker system prune -af

cd /var/www/Allo-products

git checkout main
git pull origin main

echo "Syncing database..."
cd server
cp /etc/allo/server/.env.production .env
ENV=production npm run sync
rm .env
cd ..

docker compose -f docker-compose.production.yml up -d --build --no-deps backend website admin
