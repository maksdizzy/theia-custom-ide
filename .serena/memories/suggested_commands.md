# Suggested Commands

## Initial Setup
```bash
npm install                    # Install all dependencies
npm run download:plugins       # Download VS Code plugins from Open VSX
```

## Development
```bash
npm run watch                  # Watch mode for all workspaces (Turbo)
npm run start                  # Start IDE on http://localhost:4000
```

## Build
```bash
npm run build                  # Production build all workspaces (Turbo)
```

## Clean
```bash
npm run clean                  # Clean all + remove root node_modules
```

## Workspace-Specific Commands

### browser-app/
```bash
npm run build                  # Rebuild + Theia production build
npm run rebuild                # Rebuild native dependencies only
npm run start                  # Start IDE (port 4000, workspace: ../workspace)
npm run watch                  # Development watch mode
npm run clean                  # Clean artifacts
```

### custom-ui/
```bash
npm run build                  # Vite build + TypeScript declarations
npm run watch                  # Vite watch mode (hot reload)
npm run dev                    # Alias for watch
npm run dts                    # Generate .d.ts files only
npm run clean                  # Remove lib/ and node_modules/
```

### theia-api/
```bash
npm run build                  # TypeScript compilation
npm run watch                  # TypeScript watch mode
```

## Nuclear Clean (Build Issues)
```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

## System Commands (Linux)
- `git` - Version control
- `ls`, `cd`, `grep`, `find` - Standard Unix utilities
