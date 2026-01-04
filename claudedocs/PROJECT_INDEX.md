# Theia Custom IDE - Project Documentation Index

> **Generated**: 2026-01-04
> **Status**: Active Development
> **Application**: Flexbe IDE - Custom Theia-based Browser IDE

## 📋 Quick Navigation

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Workspace Structure](#workspace-structure)
- [Key Components](#key-components)
- [Development Workflows](#development-workflows)
- [Related Documentation](#related-documentation)

---

## Project Overview

**Name**: Flexbe IDE
**Type**: Browser-based IDE built on Eclipse Theia 1.62.2
**Target Environment**: Browser (no Electron dependency)
**Primary Language**: TypeScript
**Package Manager**: npm@11.0.0
**Build Tool**: Turbo (monorepo management)

### Purpose
Custom IDE implementation extending Theia framework with tailored UI/UX, reduced feature set, and specialized configurations for Flexbe development workflows.

### Key Characteristics
- **Browser-only**: No desktop application (target: browser)
- **Custom UI**: Extensive UI/UX customization via `@flexbe/custom-ui` extension
- **Minimal Features**: Filtered modules (no debug, SCM, tasks, tests, notebooks)
- **Opinionated Config**: Pre-configured editor settings, themes, and plugins

---

## Architecture

### Technology Stack

```yaml
Framework: Eclipse Theia 1.62.2
Runtime: Node.js >=20, npm >=10
Build System: Turbo + Vite
Frontend: React (via Vite plugin)
Language: TypeScript 5.8.3
Module System: InversifyJS (Theia dependency injection)
```

### Monorepo Structure

```
theia-custom-ide/
├── browser-app/         # Main Theia browser application
├── custom-ui/           # Custom UI/UX Theia extension
├── theia-api/          # (Legacy/experimental API module)
├── plugins/            # VS Code plugins (language support, themes)
└── package.json        # Workspace root configuration
```

**Workspace Configuration**: [package.json:15-18](../package.json#L15-L18)

---

## Workspace Structure

### 1. Browser App (`browser-app/`)

**Role**: Main Theia IDE application
**Config**: [browser-app/package.json](../browser-app/package.json)
**Key Files**:
- Build scripts: [package.json:26-32](../browser-app/package.json#L26-L32)
- App config: [package.json:33-164](../browser-app/package.json#L33-L164)

#### Theia Dependencies
```typescript
Core: @theia/core, @theia/monaco
Workspace: @theia/workspace, @theia/filesystem, @theia/navigator
Features: @theia/editor, @theia/terminal, @theia/search-in-workspace
Plugins: @theia/plugin, @theia/plugin-ext, @theia/plugin-ext-vscode
Custom: @flexbe/custom-ui (local workspace package)
```

#### Application Configuration
- **Name**: "Flexbe IDE" ([browser-app/package.json:42](../browser-app/package.json#L42))
- **Port**: 4000 ([browser-app/package.json:29](../browser-app/package.json#L29))
- **Workspace**: `/project/workspace`
- **Theme**: One Dark Pro Night Flat ([browser-app/package.json:127](../browser-app/package.json#L127))
- **Icons**: Material Icon Theme ([browser-app/package.json:128](../browser-app/package.json#L128))

#### Editor Preferences (Highlights)
See: [browser-app/package.json:44-152](../browser-app/package.json#L44-L152)

```yaml
UI Simplification:
  - toolbar.showToolbar: false
  - breadcrumbs.enabled: false
  - editor.minimap.enabled: false
  - workbench.statusBar.visible: true

Code Formatting:
  - editor.formatOnSave: true
  - editor.formatOnPaste: true
  - files.insertFinalNewline: true

Visual Enhancements:
  - editor.bracketPairColorization.enabled: true
  - editor.renderWhitespace: "all"
  - editor.fontSize: 13
```

### 2. Custom UI Extension (`custom-ui/`)

**Role**: Theia extension for UI/UX customization
**Package**: `@flexbe/custom-ui`
**Config**: [custom-ui/package.json](../custom-ui/package.json)
**Build**: Vite + TypeScript declaration files

#### Module Structure
```
custom-ui/
├── src/
│   ├── frontend/           # Frontend customizations
│   │   ├── commands/       # Command registration/unregistration
│   │   ├── contribution-filters/  # Feature filtering (debug, SCM, etc.)
│   │   ├── layout/         # Shell and application layout
│   │   ├── navigator/      # File explorer customization
│   │   ├── output/         # Output panel customization
│   │   └── search/         # Search widget customization
│   ├── backend/            # Backend WebSocket endpoint
│   └── frontendPreload/    # Preload WebSocket connection
└── lib/                    # Build output (Vite)
```

#### Extension Points
See: [custom-ui/package.json:21-27](../custom-ui/package.json#L21-L27)

```typescript
frontendPreload: lib/frontendPreload/index.js  // WebSocket initialization
frontend: lib/frontend/index.js                 // Main frontend module
backend: lib/backend/index.js                   // Backend services
```

#### Key Customizations

**Frontend Module**: [custom-ui/src/frontend/index.ts](../custom-ui/src/frontend/index.ts)

```typescript
registerFilters()        // Filter unwanted modules
initCommands()          // Command management
initSearchWidget()      // Disable search widget dragging
initFileNavigator()     // Remove open editors widget
initOutputContribution()// Disable output panel closing
initApplicationShell()  // Disable panel collapsing/drag-and-drop
```

**Filtered Modules**: [custom-ui/src/frontend/contribution-filters/](../custom-ui/src/frontend/contribution-filters/)
- Debug (`filter-debug.ts`)
- SCM/Git (`filter-scm.ts`)
- Tasks (`filter-tasks.ts`)
- Tests (`filter-test.ts`)
- Notebooks (`filter-notebook.ts`)
- Outline (`filter-outline.ts`)
- Problems (`filter-problems.ts`)
- Output (partial) (`filter-output.ts`)
- Window (partial) (`filter-window.ts`)
- Plugins (partial) (`filter-plugin.ts`)
- Hierarchy (`filter-hierarchy.ts`)

#### Pending Features
See: [custom-ui/TODO.md](../custom-ui/TODO.md)

- ✅ Close button for bottom panel
- ⏳ Lighter tab styles (Cursor-like) for output/terminal
- ⏳ Custom themes (limit to 2 options)
- ⏳ Custom icon set

### 3. Plugins (`plugins/`)

**Source**: Open VSX Registry
**Download**: [package.json:13](../package.json#L13) (`npm run download:plugins`)
**Config**: [package.json:20-31](../package.json#L20-L31)

#### Language Support
```yaml
JavaScript: vscode.javascript@1.95.3
TypeScript:
  - vscode.typescript@1.95.3
  - vscode.typescript-language-features@1.95.3
JSON: vscode.json@1.95.3
CSS: vscode.css@1.95.3
HTML: vscode.html@1.95.3
Markdown: vscode.markdown@1.95.3
```

#### Themes
```yaml
Color Theme: zhuangtongfa.material-theme@3.19.0
Icon Theme: PKief.material-icon-theme@5.23.0
```

### 4. Theia API (`theia-api/`)

**Status**: Legacy/Experimental
**Purpose**: Custom API extensions (exact purpose unclear from structure)
**Files**:
- [src/browser/app.command.ts](../theia-api/src/browser/app.command.ts)
- [src/browser/app.front.ts](../theia-api/src/browser/app.front.ts)
- [src/common/protocol.ts](../theia-api/src/common/protocol.ts)
- [src/node/app.service.ts](../theia-api/src/node/app.service.ts)

> **Note**: This module appears experimental. Check with team for removal candidacy.

---

## Key Components

### Dependency Injection (InversifyJS)

Theia uses InversifyJS for dependency injection. Custom UI extension follows this pattern:

```typescript
// custom-ui/src/frontend/index.ts
export default new ContainerModule((bind, unbind, isBound, rebind) => {
    registerFilters({ bind, rebind });
    initCommands({ bind, rebind });
    // ...
});
```

**Pattern**: Use `rebind()` to override default Theia services.

### WebSocket Architecture

**Preload Module**: [custom-ui/src/frontendPreload/ws-connection-source.ts](../custom-ui/src/frontendPreload/ws-connection-source.ts)
**Backend Endpoint**: [custom-ui/src/backend/websocket-endpoint.ts](../custom-ui/src/backend/websocket-endpoint.ts)

Enables custom backend communication before main frontend initialization.

### Layout Management

**Application Shell**: [custom-ui/src/frontend/layout/application-shell.ts](../custom-ui/src/frontend/layout/application-shell.ts)
**Frontend Application**: [custom-ui/src/frontend/layout/frontend-application.ts](../custom-ui/src/frontend/layout/frontend-application.ts)
**Shell Init**: [custom-ui/src/frontend/layout/shell-init-contribution.ts](../custom-ui/src/frontend/layout/shell-init-contribution.ts)
**Side Panel Handler**: [custom-ui/src/frontend/layout/side-panel-handler.ts](../custom-ui/src/frontend/layout/side-panel-handler.ts)

Controls panel behavior, drag-and-drop, collapsing, and initial layout.

### Widget Customization

**Navigator**: [custom-ui/src/frontend/navigator/navigator-widget-factory.ts](../custom-ui/src/frontend/navigator/navigator-widget-factory.ts)
**Output**: [custom-ui/src/frontend/output/output-toolbar-contribution.ts](../custom-ui/src/frontend/output/output-toolbar-contribution.ts)
**Search**: [custom-ui/src/frontend/search/search-in-workspace-factory.ts](../custom-ui/src/frontend/search/search-in-workspace-factory.ts)

Overrides default widget factories to customize behavior (e.g., disable dragging, remove close buttons).

### Command Management

**Registration**: [custom-ui/src/frontend/commands/register-command-contribution.ts](../custom-ui/src/frontend/commands/register-command-contribution.ts)
**Unregistration**: [custom-ui/src/frontend/commands/unregister-commands-contribution.ts](../custom-ui/src/frontend/commands/unregister-commands-contribution.ts)
**Command Spy**: [custom-ui/src/frontend/commands/command-spy.ts](../custom-ui/src/frontend/commands/command-spy.ts)

Allows selective command enabling/disabling and command execution monitoring.

---

## Development Workflows

### Initial Setup

```bash
# Install dependencies
npm install

# Download VS Code plugins
npm run download:plugins
```

### Development

```bash
# Start in watch mode (development)
npm run watch

# Clean rebuild
npm run clean
npm install
npm run build
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Workspace Commands

**Root**: [package.json:7-13](../package.json#L7-L13)
```bash
npm run build         # Turbo build all workspaces
npm run start         # Turbo start all workspaces
npm run watch         # Turbo watch all workspaces
npm run clean         # Clean all workspaces + root node_modules
npm run download:plugins  # Download VS Code plugins
```

**Browser App**: [browser-app/package.json:26-32](../browser-app/package.json#L26-L32)
```bash
npm run build         # Rebuild + production build
npm run rebuild       # Rebuild native dependencies
npm run start         # Start IDE on port 4000
npm run watch         # Rebuild + development watch
npm run clean         # Clean build artifacts
```

**Custom UI**: [custom-ui/package.json:14-19](../custom-ui/package.json#L14-L19)
```bash
npm run build         # Vite build + TypeScript declarations
npm run watch         # Vite watch mode
npm run dev           # Alias for watch
npm run dts           # Generate TypeScript declarations
npm run clean         # Remove lib/ and node_modules/
```

### Turbo Configuration

**Config**: [turbo.json](../turbo.json)

Turbo manages monorepo task orchestration for parallel builds and caching.

---

## Related Documentation

### Internal Documentation
- [Browser App Extensions README](../browser-app/extensions/README.md)
- [Custom UI TODO](../custom-ui/TODO.md)
- [Theia API README](../theia-api/README.md)

### External Resources
- [Eclipse Theia Documentation](https://theia-ide.org/docs/)
- [Theia Extension Development](https://theia-ide.org/docs/composing_applications/)
- [InversifyJS Documentation](https://inversify.io/)
- [Vite Documentation](https://vitejs.dev/)
- [Open VSX Registry](https://open-vsx.org/)

### Configuration Files
- [Root package.json](../package.json) - Workspace configuration
- [Browser App package.json](../browser-app/package.json) - IDE application config
- [Custom UI package.json](../custom-ui/package.json) - Extension config
- [Turbo config](../turbo.json) - Monorepo task management
- [ESLint config](../eslint.config.mjs) - Code quality

---

## Architecture Diagrams

### Component Relationships

```
┌─────────────────────────────────────────────────────┐
│                  Browser Client                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         Theia Frontend Application           │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │      @flexbe/custom-ui (Frontend)      │  │  │
│  │  │  • Command filters                      │  │  │
│  │  │  • Contribution filters                 │  │  │
│  │  │  • Layout customizations                │  │  │
│  │  │  • Widget overrides                     │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │      Theia Core Services               │  │  │
│  │  │  @theia/core, @theia/monaco            │  │  │
│  │  │  @theia/workspace, @theia/editor       │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │      VS Code Plugins                   │  │  │
│  │  │  Language servers (TS, JS, HTML, CSS)  │  │  │
│  │  │  Themes (Material, Icons)              │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                      ▲                              │
│                      │ WebSocket                    │
│                      ▼                              │
│  ┌──────────────────────────────────────────────┐  │
│  │      @flexbe/custom-ui (Backend)             │  │
│  │  • WebSocket endpoint                        │  │
│  │  • Custom services                           │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Build Pipeline

```
Developer Command (npm run build)
        │
        ▼
    Turbo (orchestration)
        │
        ├──► custom-ui/
        │    │
        │    └──► Vite build
        │         ├─► React components
        │         ├─► TypeScript compilation
        │         └─► lib/ output
        │
        └──► browser-app/
             │
             └──► Theia CLI build
                  ├─► Rebuild native dependencies
                  ├─► Webpack bundling
                  ├─► Plugin integration
                  └─► Production bundle
```

---

## Development Guidelines

### File Organization
- **Source**: `custom-ui/src/` - All TypeScript source code
- **Build Output**: `custom-ui/lib/` - Vite compiled output (gitignored)
- **Plugins**: `plugins/` - Downloaded VS Code plugins (gitignored)
- **Documentation**: `claudedocs/` - Project documentation

### Code Style
- **Linting**: ESLint with `@flexbe/eslint-config@^1.0.11`
- **TypeScript**: Strict mode enabled
- **Formatting**: Editor auto-format on save (Theia preference)

### Adding New Customizations

1. **Identify Extension Point**: Check Theia documentation for service binding
2. **Create Module**: Add new file in appropriate `custom-ui/src/frontend/` subdirectory
3. **Register in Container**: Update `custom-ui/src/frontend/index.ts`
4. **Rebuild**: `npm run watch` in `custom-ui/` for hot reload
5. **Test**: Verify in browser-app (`npm run start` in `browser-app/`)

### Filtering Unwanted Features

1. **Locate Contribution**: Find Theia contribution class (e.g., `DebugFrontendApplicationContribution`)
2. **Create Filter**: Copy pattern from existing filters in `custom-ui/src/frontend/contribution-filters/`
3. **Register Filter**: Add to `registerFilters()` in `contribution-filters/index.ts`

---

## Common Issues & Solutions

### Build Failures
```bash
# Nuclear option - clean everything
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Plugin Download Issues
```bash
# Manual download with rate limiting
npm run download:plugins
```

### WebSocket Connection Issues
- Check backend WebSocket endpoint: [custom-ui/src/backend/websocket-endpoint.ts](../custom-ui/src/backend/websocket-endpoint.ts)
- Verify preload initialization: [custom-ui/src/frontendPreload/ws-connection-source.ts](../custom-ui/src/frontendPreload/ws-connection-source.ts)

### TypeScript Errors in Extension
```bash
# Regenerate declaration files
cd custom-ui
npm run dts
```

---

## Next Steps

### Recommended Exploration Order
1. **Start IDE**: `npm run start` → Open http://localhost:4000
2. **Explore Custom UI**: Review [custom-ui/src/frontend/index.ts](../custom-ui/src/frontend/index.ts)
3. **Understand Filters**: Check [custom-ui/src/frontend/contribution-filters/](../custom-ui/src/frontend/contribution-filters/)
4. **Review Config**: Study [browser-app/package.json](../browser-app/package.json) preferences
5. **Implement TODO**: Address [custom-ui/TODO.md](../custom-ui/TODO.md) items

### Learning Resources
- **Theia Architecture**: Read [Theia Architecture Guide](https://theia-ide.org/docs/architecture/)
- **Extension Development**: Follow [Theia Extension Authoring](https://theia-ide.org/docs/authoring_extensions/)
- **InversifyJS**: Understand [Dependency Injection Basics](https://inversify.io/)

---

**Documentation Maintained By**: Claude Code
**Last Updated**: 2026-01-04
**Version**: 1.0.0
