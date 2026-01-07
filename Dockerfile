# =============================================================================
# Flexbe IDE - Multi-Stage Docker Build
# =============================================================================
# Stage 1 (builder): Full build environment with all dependencies
# Stage 2 (runtime): Minimal production image with only built artifacts
# =============================================================================

# =============================================================================
# Stage 1: BUILDER
# =============================================================================
FROM node:20-alpine AS builder

# Install build dependencies for native modules (node-gyp)
# - python3: Required by node-gyp for native module compilation
# - make, g++: Build tools for native modules
# - libsecret-dev: For keytar (credential storage)
# - linux-headers: For drivelist and other native modules
# - libudev-zero-dev: Alternative to systemd-dev for drivelist
RUN apk add --no-cache \
    python3 \
    py3-setuptools \
    make \
    g++ \
    libsecret-dev \
    linux-headers \
    eudev-dev

WORKDIR /app

# Copy package files first for better layer caching
# Changes to source code won't invalidate npm install layer
COPY package*.json ./
COPY turbo.json ./
COPY browser-app/package*.json ./browser-app/
COPY custom-ui/package*.json ./custom-ui/

# Install all dependencies (including devDependencies for build)
# Mount GitHub token as secret to avoid rate limiting during @vscode/ripgrep download
RUN --mount=type=secret,id=github_token \
    export GITHUB_TOKEN=$(cat /run/secrets/github_token 2>/dev/null || echo "") && \
    npm ci --legacy-peer-deps

# Copy source code
COPY browser-app/ ./browser-app/
COPY custom-ui/ ./custom-ui/
COPY scripts/ ./scripts/

# Build the application
# Turbo respects dependency order: custom-ui builds before browser-app
RUN npm run build

# Download and patch plugins
# This runs: theia download:plugins && node scripts/patch-ai-plugins.js
RUN npm run download:plugins

# =============================================================================
# Stage 2: RUNTIME
# =============================================================================
FROM node:20-alpine AS runtime

# Install minimal runtime dependencies
# - libsecret: For keytar credential storage (runtime library)
# - curl: For health checks
RUN apk add --no-cache \
    libsecret \
    curl \
    git

# Install Claude Code globally for IDE extension support
RUN npm install -g @anthropic-ai/claude-code && npm cache clean --force

# Create non-root user for security
RUN addgroup -S flexbe && adduser -S flexbe -G flexbe

WORKDIR /app

# Copy only necessary files from builder
# Node modules (hoisted to root in npm workspaces)
COPY --from=builder /app/node_modules ./node_modules

# Browser app (main IDE) - note: node_modules hoisted to root
COPY --from=builder /app/browser-app/lib ./browser-app/lib
COPY --from=builder /app/browser-app/package.json ./browser-app/package.json

# Custom UI extension
COPY --from=builder /app/custom-ui/lib ./custom-ui/lib
COPY --from=builder /app/custom-ui/package.json ./custom-ui/package.json

# Plugins (all downloaded and patched)
COPY --from=builder /app/plugins ./plugins

# Fix Claude Code native binary (Alpine musl can't run glibc binary from plugin)
# Symlink to globally installed Claude CLI instead
RUN rm -f /app/plugins/Anthropic.claude-code/extension/resources/native-binary/claude && \
    ln -sf /usr/local/bin/claude /app/plugins/Anthropic.claude-code/extension/resources/native-binary/claude

# Root package.json for metadata
COPY --from=builder /app/package.json ./

# Create workspace directory
RUN mkdir -p /workspace && chown -R flexbe:flexbe /app /workspace

# =============================================================================
# Environment Configuration
# =============================================================================
ENV PORT=4000
ENV HOST=0.0.0.0
ENV WORKSPACE_PATH=/workspace
ENV PLUGINS_DIR=/app/plugins
ENV NODE_ENV=production

# =============================================================================
# Runtime Configuration
# =============================================================================
# Switch to non-root user
USER flexbe

# Expose the IDE port
EXPOSE ${PORT}

# Health check - verify IDE is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${PORT}/ || exit 1

# Set working directory for startup
WORKDIR /app/browser-app

# Start the IDE
# Note: Using shell form to allow environment variable expansion
CMD ["sh", "-c", "node lib/backend/main.js ${WORKSPACE_PATH} -p ${PORT} --hostname ${HOST} --plugins=local-dir:${PLUGINS_DIR}"]
