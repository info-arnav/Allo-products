# Use Node ARG for flexibility
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ENV NODE_ENV=production

# Build-time env injection
ARG NEXT_PUBLIC_PROXY_BASE
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER

ENV NEXT_PUBLIC_PROXY_BASE=$NEXT_PUBLIC_PROXY_BASE
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS=$NEXT_PUBLIC_GOOGLE_ANALYTICS
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER=$NEXT_PUBLIC_GOOGLE_TAG_MANAGER

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S -G app app

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

USER app

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
