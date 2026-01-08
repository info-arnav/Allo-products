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

git checkout main
git pull origin main

echo "Syncing database..."
cd server
cp /etc/allo/server/.env.production .env
ENV=production npm run sync
rm .env
cd ..

# Copy env files into build contexts
cp /etc/allo/websites/main/.env.production websites/main/.env.production
cp /etc/allo/websites/admin/.env.production websites/admin/.env.production

# Export NEXT_PUBLIC_* variables for docker build
export $(grep "^NEXT_PUBLIC_" /etc/allo/websites/main/.env.production | sed 's/$/_PRODUCTION/' | xargs)
export $(grep "^NEXT_PUBLIC_" /etc/allo/websites/admin/.env.production | sed 's/$/_PRODUCTION/' | xargs)

docker compose -f docker-compose.production.yml up -d --build --no-deps backend
docker compose -f docker-compose.production.yml up -d --build --no-deps website
docker compose -f docker-compose.production.yml up -d --build --no-deps admin

# Clean up env files from build contexts
rm websites/main/.env.production
rm websites/admin/.env.production
