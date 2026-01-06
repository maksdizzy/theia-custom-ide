# Architecture Patterns

## InversifyJS Dependency Injection

### Rebinding Services
```typescript
// Replace Theia service with custom implementation
export default new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(ApplicationShell).to(CustomApplicationShell).inSingletonScope();
});
```

### Contribution Filters Pattern
```typescript
// Disable a Theia contribution
export const bindContributionFilterDebug = (bind: interfaces.Bind): void => {
    bind(ContributionFilterRegistry).toConstantValue({
        registerContributionFilters(registry: ContributionFilterRegistry): void {
            registry.addFilter(ContributionType.Command, (contribution) => {
                // Return false to filter out
                return contribution !== DebugCommandContribution;
            });
        }
    });
};
```

## Theia Extension Points

### Frontend Module Registration
```typescript
// custom-ui/package.json
{
    "theiaExtensions": [{
        "frontendPreload": "lib/frontendPreload/index.js",
        "frontend": "lib/frontend/index.js",
        "backend": "lib/backend/index.js"
    }]
}
```

### Widget Factory Override
```typescript
@injectable()
export class CustomNavigatorWidgetFactory extends NavigatorWidgetFactory {
    // Override methods to customize widget behavior
}
```

## WebSocket Architecture

### Preload Phase
- `frontendPreload/ws-connection-source.ts` - Initializes WebSocket before main frontend
- Establishes connection to custom backend endpoint

### Backend Endpoint
- `backend/websocket-endpoint.ts` - Custom WebSocket server endpoint
- Handles custom communication protocol

## Build Pipeline

```
Turbo (npm run build)
├── custom-ui/
│   └── Vite build → lib/
│       ├── React components
│       ├── TypeScript compilation
│       └── Declaration files (npm run dts)
│
└── browser-app/
    └── Theia CLI build
        ├── Native dependency rebuild
        ├── Webpack bundling
        ├── Plugin integration
        └── Production bundle
```

## Feature Filtering Approach

1. Identify Theia contribution class to disable
2. Create filter file: `filter-{feature}.ts`
3. Register in `contribution-filters/index.ts`
4. Use ContributionFilterRegistry to return false for filtered contributions
