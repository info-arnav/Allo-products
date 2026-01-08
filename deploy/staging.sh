#!/bin/bash
set -e

cd /var/www/Allo-products

git checkout deploy
git pull origin deploy

docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --build
