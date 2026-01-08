#!/bin/bash
LOCKFILE=/tmp/allo-deploy.lock

exec 9>$LOCKFILE || exit 1
flock -n 9 || {
  echo "Another deploy already running, exiting."
  exit 0
}

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

# Copy env files into build contexts
cp /etc/allo/websites/main/.env.staging websites/main/.env.production
cp /etc/allo/websites/admin/.env.staging websites/admin/.env.production

docker compose -f docker-compose.staging.yml up -d --build --no-deps backend
docker compose -f docker-compose.staging.yml up -d --build --no-deps website
docker compose -f docker-compose.staging.yml up -d --build --no-deps admin

# Clean up env files from build contexts
rm websites/main/.env.production
rm websites/admin/.env.production
