# 🐳 OPTIONAL_DOCKER_DEPLOYMENT.md: Docker and Containerization Strategy

## 1. Next.js Docker Strategy (Multi-Stage Build)

To ensure small, secure images, the project must use a **multi-stage Docker build**. This separates the resource-intensive build process (Node and dependencies) from the minimal runtime environment required to serve the final static assets and Next.js server.

### 🎯 Key Steps

1.  **Builder Stage:** Installs all development dependencies, runs the Next.js build (`next build`), and compiles static assets.
2.  **Runner Stage:** Copies only the essential build output (`.next`), production dependencies, and the necessary entry script, resulting in a minimal final image.

## 2. Dockerfile Template and Rationale

The following template should be placed in the project root (`./Dockerfile`):

```dockerfile
# ------------------ STAGE 1: BUILDER ------------------
FROM node:20-alpine AS builder

# Set working directory for the application source
WORKDIR /app

# Install dependencies (only production dependencies are needed for final runner)
# Use a separate step to cache layer if package.json/lockfile hasn't changed
COPY package.json package-lock.json ./
RUN npm ci

# Copy all application files (including i18n messages, components, pages)
COPY . .

# Next.js build command
# This creates the optimized build output in the .next folder
RUN npm run build

# ------------------ STAGE 2: RUNNER ------------------
# Use a slim, secure base image for runtime
FROM node:20-alpine AS runner

# Environment variable for Next.js to run as non-root user
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Set the user to run the application (best practice for security)
RUN addgroup --system appgroup && adduser --system appuser
USER appuser
WORKDIR /app

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules /app/node_modules

# Copy the build output and public assets
# .next folder contains the server and client bundles
COPY --from=builder --chown=appuser:appgroup /app/.next /app/.next
COPY --from=builder --chown=appuser:appgroup /app/public /app/public

# Expose the port Next.js will listen on (default is 3000)
EXPOSE 3000

# Start the Next.js production server
CMD ["node_modules/.bin/next", "start"]