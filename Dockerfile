# syntax=docker/dockerfile:1

# ---------- Build stage: compile the Vite/React app ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies first so this layer is cached across source changes.
COPY package.json package-lock.json ./
RUN npm ci

# Optional public contact-form config (Telegram). Vite inlines VITE_* values
# into the JS bundle at build time; leave empty to ship with the form disabled.
ARG VITE_TELEGRAM_BOT_TOKEN=""
ARG VITE_TELEGRAM_CHAT_ID=""
ENV VITE_TELEGRAM_BOT_TOKEN=$VITE_TELEGRAM_BOT_TOKEN \
    VITE_TELEGRAM_CHAT_ID=$VITE_TELEGRAM_CHAT_ID

# Build the static site into /app/dist
COPY . .
RUN npm run build

# ---------- Runtime stage: serve the static build with nginx ----------
FROM nginx:alpine

# SPA-aware server config (client-side fallback + long-cache for hashed assets)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
