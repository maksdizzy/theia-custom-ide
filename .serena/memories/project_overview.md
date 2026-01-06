# Theia Custom IDE - Project Overview

## Project Identity
- **Name**: Flexbe IDE
- **Type**: Custom Theia-based browser IDE
- **Framework**: Eclipse Theia 1.62.2
- **Language**: TypeScript 5.8.3
- **Purpose**: Specialized IDE with reduced feature set and custom UI/UX

## Architecture
- **Monorepo**: Turbo-managed workspace with npm workspaces
- **Structure**: browser-app (main IDE) + custom-ui (Theia extension) + plugins (VS Code extensions)
- **Build**: Vite for custom-ui, Theia CLI for browser-app
- **Target**: Browser-only (no Electron)

## Key Components

### browser-app/
Main Theia application with extensive configuration:
- Application name: "Flexbe IDE"
- Port: 4000
- Theme: One Dark Pro Night Flat
- Icons: Material Icon Theme
- Opinionated editor preferences (formatOnSave, renderWhitespace, etc.)

### custom-ui/ (@flexbe/custom-ui)
Theia extension providing UI/UX customization:
- **Contribution Filters**: Remove debug, SCM, tasks, tests, notebooks, outline, problems, hierarchy
- **Layout Customization**: Disable panel dragging, vertical splits, custom sidebar positioning
- **Widget Overrides**: Remove Open Editors, customize Output/Terminal/Search/Navigator
- **Command Management**: Unregister unwanted commands, add custom commands
- **Menu Customization**: Remove/recreate View menu, remove Help menu

### plugins/
Downloaded VS Code extensions from Open VSX:
- Language support: TypeScript, JavaScript, HTML, CSS, JSON, Markdown
- Themes: Material Theme, Material Icons

## Customization Patterns

### InversifyJS Dependency Injection
Primary customization method via `rebind()`:
```typescript
rebind(TheiaService).to(CustomService).inSingletonScope();
```

### Contribution Filtering
Systematic feature removal via `FilterContribution`:
```typescript
registry.addFilters('*', [
    (contrib) => !filtered.some(c => contrib instanceof c)
]);
```

### Widget Factory Override
Custom widget creation via factory rebinding:
```typescript
rebind(WidgetFactory).to(CustomWidgetFactory);
```

### Lumino Layout Customization
Direct layout manipulation in ApplicationShell:
- Panel spacing for "many island" style
- Custom SidePanelHandler for horizontal tabs
- BoxLayout/SplitLayout composition

## Development Workflow
1. Install: `npm install`
2. Download plugins: `npm run download:plugins`
3. Development: `npm run watch` (custom-ui) + `npm run start` (browser-app)
4. Production: `npm run build` → `npm run start`

## Recent Work (2026-01-04)
Generated comprehensive documentation in `claudedocs/`:
- PROJECT_INDEX.md: Complete architecture and structure
- API_REFERENCE.md: Technical API documentation
- CUSTOMIZATION_GUIDE.md: Advanced patterns from DZone articles
- README.md: Documentation index and quick start
