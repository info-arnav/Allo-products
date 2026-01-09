# Use Node ARG for flexibility
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create uploads folder with correct ownership before switching user
RUN addgroup -S app && adduser -S -G app app && \
    mkdir -p /app/uploads && \
    chown -R app:app /app

USER app

EXPOSE 4000

CMD ["npm", "run", "start"]
