# Code Style and Conventions

## ESLint Configuration
- Uses `@flexbe/eslint-config@^1.0.11`
- Combines: baseConfig + reactConfig + typescriptConfig
- Config file: `eslint.config.mjs`

## TypeScript Configuration
- **Target**: ES2022
- **Module**: CommonJS
- **JSX**: React
- **Strict Mode**: Yes (noImplicitAny, strictNullChecks, noImplicitThis)
- **Decorators**: Enabled (experimentalDecorators, emitDecoratorMetadata)
- **Path Aliases**: `@/*` → `./src/*` (in custom-ui)

## Naming Conventions
- **Files**: kebab-case (e.g., `application-shell.ts`, `filter-debug.ts`)
- **Classes**: PascalCase (e.g., `CustomApplicationShell`)
- **Variables/Functions**: camelCase
- **Contribution Filters**: `filter-{feature}.ts` pattern

## Theia Extension Patterns
```typescript
// Container Module pattern (InversifyJS)
export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Use rebind() to override Theia defaults
    rebind(ApplicationShell).to(CustomApplicationShell).inSingletonScope();
});
```

## Code Organization (custom-ui)
```
src/
├── frontend/
│   ├── index.ts                 # Main container module
│   ├── commands/                # Command registration/unregistration
│   ├── contribution-filters/    # Feature filtering
│   ├── layout/                  # Shell/panel customization
│   ├── navigator/               # File explorer customization
│   ├── output/                  # Output panel customization
│   ├── search/                  # Search widget customization
│   └── style/                   # LESS stylesheets
├── backend/                     # Backend services
└── frontendPreload/             # Preload WebSocket setup
```

## Import Style
- Absolute imports from `@theia/*` packages
- Relative imports within custom-ui modules
- Use `@/*` path alias for cross-module imports

## Comments
- Russian comments in TODO.md (project team language)
- English preferred for code documentation
