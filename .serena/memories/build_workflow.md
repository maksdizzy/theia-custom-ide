# Build Workflow - Clean Rebuild Process

## Full Clean Rebuild (When CSS/Layout Changes)

**Use when**: CSS/LESS changes, layout modifications, dependency updates

```bash
npm run clean           # Clear turbo cache + node_modules
npm run docker:build    # Build fresh Docker image
npm run start:docker    # Start container
```

**Time**: ~5-8 minutes (full rebuild)  
**Impact**: Complete clean slate, ensures no cache issues

## Quick Rebuild (Code changes only)

**Use when**: TypeScript code changes, minor updates

```bash
npm run docker:rebuild  # Rebuild without cache
npm run start:docker    # Start container
```

**Time**: ~3-5 minutes  
**Impact**: Faster rebuild without cleaning node_modules

## Development Mode (Local testing)

**Use when**: Active development, rapid iteration

```bash
# Terminal 1: Watch for custom-ui changes
npm run watch

# Terminal 2: Start Theia browser app
npm run start
```

**Time**: Initial build ~2-3 min, then instant hot reload  
**Port**: http://localhost:4000

## Verify Changes

After any build, verify IDE is working:

```bash
# Check container status
docker ps

# View logs
npm run docker:logs

# Access IDE
open http://localhost:4000
```

## Common Issues

### Cache Problems
**Symptom**: CSS changes not reflected, old styles persist  
**Fix**: `npm run clean` then rebuild

### Container Already Running
**Symptom**: Port 4000 already in use  
**Fix**: `npm run docker:down` then restart

### Node Modules Corruption
**Symptom**: Build errors, missing dependencies  
**Fix**: `npm run clean && npm install` then rebuild

## User's Successful Workflow (2026-01-07)

```bash
# This workflow fixed icon display issues
npm run clean
npm run docker:build
npm run start:docker
# Result: Icons displayed correctly at configured size
```

## Build Scripts Reference

From `package.json`:
- `clean`: Clears turbo cache and node_modules
- `docker:build`: Standard Docker image build
- `docker:rebuild`: No-cache Docker rebuild
- `start:docker`: Start container in detached mode
- `docker:down`: Stop and remove container
- `docker:logs`: View container logs
- `watch`: Watch custom-ui for changes (dev mode)
- `start`: Start Theia locally (dev mode)
