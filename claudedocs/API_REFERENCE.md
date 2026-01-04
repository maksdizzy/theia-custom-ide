# Theia Custom IDE - API Reference

> **Generated**: 2026-01-04
> **Scope**: Custom UI Extension API & Theia Integration Points

## Table of Contents

- [Module Overview](#module-overview)
- [Frontend API](#frontend-api)
- [Backend API](#backend-api)
- [Frontend Preload API](#frontend-preload-api)
- [Extension Points](#extension-points)
- [Type Definitions](#type-definitions)

---

## Module Overview

### Package Information
- **Name**: `@flexbe/custom-ui`
- **Version**: 0.0.0
- **Type**: Theia Extension
- **Dependencies**: `@theia/core@1.62.2`

### Module Exports

#### Frontend
```typescript
// custom-ui/src/frontend/index.ts
export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // InversifyJS container configuration
});
```

#### Backend
```typescript
// custom-ui/src/backend/index.ts
export { default } from './module';
export * from './module';
```

#### Frontend Preload
```typescript
// custom-ui/src/frontendPreload/index.ts
export { default } from './module';
export * from './module';
```

---

## Frontend API

### Entry Point: Container Module

**File**: [custom-ui/src/frontend/index.ts:10-28](../../custom-ui/src/frontend/index.ts#L10-L28)

```typescript
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Register contribution filters
    registerFilters({ bind, rebind });

    // Initialize command management
    initCommands({ bind, rebind });

    // Customize search widget
    initSearchWidget({ rebind });

    // Customize file navigator
    initFileNavigator({ bind, rebind });

    // Customize output panel
    initOutputContribution({ bind, rebind });

    // Customize application shell
    initApplicationShell({ bind, rebind });
});
```

**Purpose**: Main dependency injection configuration for frontend customizations.

---

### Commands API

**Location**: `custom-ui/src/frontend/commands/`

#### `initCommands()`

**File**: [custom-ui/src/frontend/commands/index.ts](../../custom-ui/src/frontend/commands/index.ts)

```typescript
interface ContainerContext {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}

export function initCommands(context: ContainerContext): void;
```

**Purpose**: Register custom command contributions and unregister unwanted commands.

**Dependencies**:
- `RegisterCommandContribution` - Registers custom commands
- `UnregisterCommandsContribution` - Filters out default commands

#### `CommandSpy`

**File**: [custom-ui/src/frontend/commands/command-spy.ts](../../custom-ui/src/frontend/commands/command-spy.ts)

```typescript
@injectable()
export class CommandSpy implements CommandContribution {
    registerCommands(registry: CommandRegistry): void;
}
```

**Purpose**: Monitor and log command executions for debugging.

**Usage**:
```typescript
// Bind to container
bind(CommandContribution).to(CommandSpy).inSingletonScope();
```

---

### Contribution Filters API

**Location**: `custom-ui/src/frontend/contribution-filters/`

#### `registerFilters()`

**File**: [custom-ui/src/frontend/contribution-filters/index.ts](../../custom-ui/src/frontend/contribution-filters/index.ts)

```typescript
interface ContainerContext {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}

export function registerFilters(context: ContainerContext): void;
```

**Purpose**: Apply filters to remove unwanted Theia contributions.

**Filtered Modules**:
- Debug (filter-debug)
- SCM/Git (filter-scm)
- Tasks (filter-tasks)
- Tests (filter-test)
- Notebooks (filter-notebook)
- Outline (filter-outline)
- Problems (filter-problems)
- Output (partial) (filter-output)
- Window (partial) (filter-window)
- Plugins (partial) (filter-plugin)
- Hierarchy (filter-hierarchy)

#### Filter Pattern

```typescript
@injectable()
export class FilterDebugContribution implements BackendApplicationContribution {
    filterContributions<T>(
        contributionFilter: ContributionFilterRegistry,
        contributions: T[]
    ): T[] {
        // Return filtered contributions
        return contributions.filter(c =>
            !contributionFilter.isFiltered(ContributionType, c)
        );
    }
}
```

**Example**: [custom-ui/src/frontend/contribution-filters/filter-debug.ts](../../custom-ui/src/frontend/contribution-filters/filter-debug.ts)

---

### Layout API

**Location**: `custom-ui/src/frontend/layout/`

#### `initApplicationShell()`

**File**: [custom-ui/src/frontend/layout/application-shell.ts](../../custom-ui/src/frontend/layout/application-shell.ts)

```typescript
interface ContainerContext {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}

export function initApplicationShell(context: ContainerContext): void;
```

**Purpose**: Customize Theia ApplicationShell behavior (disable drag-and-drop, collapsing).

**Rebinds**:
- `ApplicationShell` - Main shell interface
- `SidePanelHandler` - Side panel behavior
- `ShellLayoutRestorer` - Layout persistence

#### `SidePanelHandler`

**File**: [custom-ui/src/frontend/layout/side-panel-handler.ts](../../custom-ui/src/frontend/layout/side-panel-handler.ts)

```typescript
@injectable()
export class CustomSidePanelHandler extends SidePanelHandler {
    // Override default panel behavior
}
```

**Customizations**:
- Disable panel collapsing
- Prevent drag-and-drop between panels
- Lock panel positions

#### `ShellInitContribution`

**File**: [custom-ui/src/frontend/layout/shell-init-contribution.ts](../../custom-ui/src/frontend/layout/shell-init-contribution.ts)

```typescript
@injectable()
export class ShellInitContribution implements FrontendApplicationContribution {
    onStart(app: FrontendApplication): void;
}
```

**Purpose**: Initialize shell state on application startup.

---

### Widget Customization API

#### Navigator Widget Factory

**File**: [custom-ui/src/frontend/navigator/navigator-widget-factory.ts](../../custom-ui/src/frontend/navigator/navigator-widget-factory.ts)

```typescript
export function initFileNavigator(context: ContainerContext): void;
```

**Purpose**: Customize file navigator widget (remove "Open Editors" section).

**Rebinds**:
- `FileNavigatorWidgetFactory` - Widget creation factory

#### Output Toolbar Contribution

**File**: [custom-ui/src/frontend/output/output-toolbar-contribution.ts](../../custom-ui/src/frontend/output/output-toolbar-contribution.ts)

```typescript
export function initOutputContribution(context: ContainerContext): void;
```

**Purpose**: Customize output panel toolbar (disable close button).

**Rebinds**:
- `OutputToolbarContribution` - Toolbar item provider

#### Search Widget Factory

**File**: [custom-ui/src/frontend/search/search-in-workspace-factory.ts](../../custom-ui/src/frontend/search/search-in-workspace-factory.ts)

```typescript
export function initSearchWidget(context: ContainerContext): void;
```

**Purpose**: Customize search widget (disable dragging to other containers).

**Rebinds**:
- `SearchInWorkspaceWidgetFactory` - Widget creation factory

---

## Backend API

### Entry Point: Backend Module

**File**: [custom-ui/src/backend/module.ts](../../custom-ui/src/backend/module.ts)

```typescript
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Backend service bindings
});
```

### WebSocket Endpoint

**File**: [custom-ui/src/backend/websocket-endpoint.ts](../../custom-ui/src/backend/websocket-endpoint.ts)

```typescript
@injectable()
export class CustomWebSocketEndpoint {
    // Custom WebSocket server endpoint
}
```

**Purpose**: Provide custom backend WebSocket communication channel.

**Usage**:
```typescript
// Bind to container
bind(BackendApplicationContribution).to(CustomWebSocketEndpoint);
```

---

## Frontend Preload API

### Entry Point: Preload Module

**File**: [custom-ui/src/frontendPreload/module.ts](../../custom-ui/src/frontendPreload/module.ts)

```typescript
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Preload service bindings
});
```

### WebSocket Connection Source

**File**: [custom-ui/src/frontendPreload/ws-connection-source.ts](../../custom-ui/src/frontendPreload/ws-connection-source.ts)

```typescript
@injectable()
export class CustomWebSocketConnectionSource {
    // Initialize WebSocket connection before main frontend
}
```

**Purpose**: Establish WebSocket connection during frontend preload phase.

**Timing**: Executes before main Theia frontend initialization.

---

## Extension Points

### Theia Extension Configuration

**File**: [custom-ui/package.json:21-27](../../custom-ui/package.json#L21-L27)

```json
{
  "theiaExtensions": [
    {
      "frontendPreload": "lib/frontendPreload/index.js",
      "frontend": "lib/frontend/index.js",
      "backend": "lib/backend/index.js"
    }
  ]
}
```

**Extension Lifecycle**:
1. **Backend**: Server-side services initialization
2. **Frontend Preload**: Pre-initialization setup (WebSocket connection)
3. **Frontend**: Main application UI customizations

### InversifyJS Container Context

```typescript
interface ContainerContext {
    bind: interfaces.Bind;           // Bind new service
    unbind: interfaces.Unbind;       // Remove service binding
    isBound: interfaces.IsBound;     // Check if service bound
    rebind: interfaces.Rebind;       // Replace existing service
}
```

**Common Patterns**:

```typescript
// Bind new service
bind(ServiceIdentifier).to(Implementation).inSingletonScope();

// Rebind existing Theia service
rebind(TheiaServiceIdentifier).to(CustomImplementation);

// Conditional binding
if (!isBound(ServiceIdentifier)) {
    bind(ServiceIdentifier).to(Implementation);
}
```

---

## Type Definitions

### Command Contribution

```typescript
import { CommandContribution, CommandRegistry } from '@theia/core';

@injectable()
export class CustomCommandContribution implements CommandContribution {
    registerCommands(registry: CommandRegistry): void {
        // Register commands
    }
}
```

### Menu Contribution

```typescript
import { MenuContribution, MenuModelRegistry } from '@theia/core';

@injectable()
export class CustomMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        // Register menu items
    }
}
```

### Keybinding Contribution

```typescript
import { KeybindingContribution, KeybindingRegistry } from '@theia/core';

@injectable()
export class CustomKeybindingContribution implements KeybindingContribution {
    registerKeybindings(keybindings: KeybindingRegistry): void {
        // Register keybindings
    }
}
```

### Widget Factory

```typescript
import { WidgetFactory } from '@theia/core/lib/browser';

@injectable()
export class CustomWidgetFactory implements WidgetFactory {
    readonly id: string = 'custom-widget-id';

    createWidget(): Widget {
        // Create and return widget
    }
}
```

### Frontend Application Contribution

```typescript
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';

@injectable()
export class CustomFrontendContribution implements FrontendApplicationContribution {
    onStart(app: FrontendApplication): void {
        // Execute on application start
    }

    onStop(app: FrontendApplication): void {
        // Execute on application stop
    }
}
```

### Backend Application Contribution

```typescript
import { BackendApplicationContribution } from '@theia/core/lib/node';

@injectable()
export class CustomBackendContribution implements BackendApplicationContribution {
    initialize(): void {
        // Initialize backend services
    }

    configure(app: Application): void {
        // Configure Express application
    }
}
```

---

## Usage Examples

### Example 1: Register Custom Command

```typescript
// custom-command.ts
import { injectable } from '@theia/core/shared/inversify';
import { CommandContribution, CommandRegistry, Command } from '@theia/core';

const MY_COMMAND: Command = {
    id: 'my-custom-command',
    label: 'My Custom Command'
};

@injectable()
export class MyCommandContribution implements CommandContribution {
    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MY_COMMAND, {
            execute: () => {
                console.log('Custom command executed!');
            }
        });
    }
}

// In frontend module
bind(CommandContribution).to(MyCommandContribution);
```

### Example 2: Filter Unwanted Service

```typescript
// filter-my-service.ts
import { injectable } from '@theia/core/shared/inversify';
import { ContributionFilterRegistry } from '@theia/core/lib/common';

@injectable()
export class FilterMyServiceContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilter('MyUnwantedService', {
            filterContributions: (contributions) => {
                return contributions.filter(c =>
                    c.constructor.name !== 'UnwantedServiceContribution'
                );
            }
        });
    }
}
```

### Example 3: Rebind Widget Factory

```typescript
// custom-widget-factory.ts
import { injectable } from '@theia/core/shared/inversify';
import { NavigatorWidgetFactory } from '@theia/navigator/lib/browser';

@injectable()
export class CustomNavigatorWidgetFactory extends NavigatorWidgetFactory {
    protected createOpenEditorsWidget(): Widget | undefined {
        // Return undefined to skip "Open Editors" widget
        return undefined;
    }
}

// In frontend module
rebind(NavigatorWidgetFactory).to(CustomNavigatorWidgetFactory);
```

### Example 4: Custom WebSocket Service

```typescript
// custom-websocket.ts
import { injectable } from '@theia/core/shared/inversify';
import { WebSocketChannel } from '@theia/core';

@injectable()
export class CustomWebSocketService {
    constructor(
        @inject(WebSocketChannel)
        private readonly wsChannel: WebSocketChannel
    ) {}

    sendMessage(message: string): void {
        this.wsChannel.getWriteBuffer().writeString(message);
    }
}

// In backend module
bind(CustomWebSocketService).toSelf().inSingletonScope();
```

---

## Development Workflow

### Adding New Frontend Customization

1. **Create TypeScript file** in `custom-ui/src/frontend/<category>/`
2. **Implement contribution interface** (e.g., `CommandContribution`)
3. **Export initialization function** (e.g., `initMyFeature()`)
4. **Register in main module**: Update `custom-ui/src/frontend/index.ts`
5. **Build**: Run `npm run build` in `custom-ui/`
6. **Test**: Run `npm run start` in `browser-app/`

### Debugging Tips

```typescript
// Enable debug logging
console.log('[CustomUI]', 'Message', data);

// Inspect container bindings
console.log('Container bindings:', container.getAll(ServiceIdentifier));

// Track command executions
@injectable()
export class CommandLogger implements CommandContribution {
    registerCommands(registry: CommandRegistry): void {
        const originalExecute = registry.executeCommand.bind(registry);
        registry.executeCommand = (command: string, ...args: any[]) => {
            console.log('[Command]', command, args);
            return originalExecute(command, ...args);
        };
    }
}
```

---

## API Stability & Versioning

### Current Status
- **Extension**: Custom (@flexbe/custom-ui) - Internal, unstable
- **Theia Core**: 1.62.2 - Stable, semantic versioning

### Breaking Change Risk
- **High Risk**: Layout customizations (ApplicationShell, SidePanelHandler)
- **Medium Risk**: Widget factories (Navigator, Output, Search)
- **Low Risk**: Command/menu contributions

### Upgrade Strategy
When upgrading Theia version:
1. Review [Theia Changelog](https://github.com/eclipse-theia/theia/blob/master/CHANGELOG.md)
2. Test all customizations in `custom-ui/src/frontend/`
3. Update rebind targets if Theia internals changed
4. Run integration tests on `browser-app`

---

## External Dependencies

### Theia Core APIs

**Documentation**: https://eclipse-theia.github.io/theia/docs/next/

```typescript
import { injectable } from '@theia/core/shared/inversify';
import { CommandContribution, CommandRegistry } from '@theia/core';
import { FrontendApplication } from '@theia/core/lib/browser';
import { BackendApplicationContribution } from '@theia/core/lib/node';
```

### InversifyJS

**Documentation**: https://inversify.io/

```typescript
import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { inject, injectable } from '@theia/core/shared/inversify';
```

---

**API Documentation Version**: 1.0.0
**Last Updated**: 2026-01-04
**Theia Version**: 1.62.2
**Maintained By**: Claude Code
