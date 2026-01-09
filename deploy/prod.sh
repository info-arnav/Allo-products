#!/bin/bash
set -e

LOCKFILE=/tmp/allo-deploy.lock
exec 9>$LOCKFILE || exit 1
flock -n 9 || exit 0

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

# Load build env into shell for compose
set -a
source /etc/allo/websites/main/.env.production
set +a

docker compose -f docker-compose.production.yml down
docker system prune -af --volumes
docker compose -f docker-compose.production.yml build --no-cache
docker compose -f docker-compose.production.yml up -d
