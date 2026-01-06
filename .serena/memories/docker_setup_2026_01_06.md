# Docker Setup Session - 2026-01-06

## Completed Work

### Docker Containerization
- Created multi-stage `Dockerfile` (builder + runtime)
- Base image: `node:20-alpine`
- Builder deps: python3, py3-setuptools, make, g++, libsecret-dev, linux-headers, eudev-dev
- Runtime deps: libsecret, curl
- Non-root user: `flexbe`
- Health check included

### Docker Compose
- Service: `flexbe-ide`
- Port: `${PORT:-4000}:4000`
- Volume: `workspace_data:/workspace`
- Auto-loads `.env` if exists

### Script Consolidation
- Created unified `scripts/start.sh` replacing:
  - `full-start.sh` (removed)
  - `quick-start.sh` (removed)
  - `rebuild-all.sh` (removed)
- Flags: `--quick`, `--build`, `--docker`, `--help`

### Environment Configuration
- Created `.env.example` with PORT, HOST, WORKSPACE_PATH, PLUGINS_DIR
- Updated `.npmrc` to be platform-agnostic (removed macOS-specific Python path)
- Added `.env` to `.gitignore`

### Cleanup
- Removed `theia-api/` directory (legacy, unused)
- Removed `index.js` (CodeSandbox artifact)
- Updated `scripts/README.md`

### New npm Scripts
```json
"start": "./scripts/start.sh",
"start:quick": "./scripts/start.sh --quick",
"start:docker": "docker compose up -d",
"docker:build": "docker compose build",
"docker:down": "docker compose down",
"docker:logs": "docker compose logs -f",
"docker:rebuild": "docker compose build --no-cache"
```

## Key Findings

### Build Dependencies for Alpine
Native modules (drivelist, keytar, node-pty) require:
- `linux-headers` - kernel headers
- `eudev-dev` - udev alternative for Alpine
- `py3-setuptools` - Python setuptools

### npm Workspaces
- node_modules are hoisted to root (not in browser-app/)
- COPY in Dockerfile only needs root node_modules

### Image Size
- Final image: ~4.8GB (due to Theia's large dependency tree)
- Could optimize with production-only deps, but complex

## Usage

```bash
# First time
docker compose up -d

# Subsequent
docker compose up -d  # Uses cache, starts in seconds

# After code changes
docker compose build && docker compose up -d

# Full rebuild
docker compose build --no-cache
```

## Files Created/Modified

| File | Action |
|------|--------|
| Dockerfile | Created |
| docker-compose.yml | Created |
| .dockerignore | Created |
| .env.example | Created |
| scripts/start.sh | Created |
| package.json | Modified scripts |
| .npmrc | Modified (platform-agnostic) |
| .gitignore | Added .env |
| scripts/README.md | Updated |
| scripts/full-start.sh | Deleted |
| scripts/quick-start.sh | Deleted |
| scripts/rebuild-all.sh | Deleted |
| theia-api/ | Deleted |
| index.js | Deleted |
