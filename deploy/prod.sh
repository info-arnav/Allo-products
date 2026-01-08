#!/bin/bash
set -e

cd /var/www/Allo-products

git checkout main
git pull origin main

docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up -d --build
