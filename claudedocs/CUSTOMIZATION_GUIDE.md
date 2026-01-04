# Theia IDE Customization Guide

> **Generated**: 2026-01-04
> **Based on**: DZone Deep Dive Series + Codebase Analysis
> **Audience**: Developers customizing Theia IDE

## Table of Contents

- [Introduction](#introduction)
- [Core Customization Patterns](#core-customization-patterns)
- [Contribution Filtering](#contribution-filtering)
- [Command & Menu Management](#command--menu-management)
- [Widget Customization](#widget-customization)
- [Layout & Shell Customization](#layout--shell-customization)
- [Lumino Framework Patterns](#lumino-framework-patterns)
- [Advanced Techniques](#advanced-techniques)
- [Best Practices](#best-practices)

---

## Introduction

This guide demonstrates advanced Theia IDE customization techniques used in the Flexbe IDE project, based on proven patterns from production implementations.

### Customization Philosophy

**Goals**:
- Strip unnecessary UI elements for focused user experience
- Prevent unwanted user actions (e.g., panel dragging, vertical splits)
- Create distinctive "product feel" beyond stock Theia
- Implement custom layout patterns (e.g., "many island style")

**Approach**:
- Use InversifyJS dependency injection for clean overrides
- Patch Theia services via `rebind()` pattern
- Filter unwanted contributions systematically
- Leverage Lumino framework for custom layouts

---

## Core Customization Patterns

### InversifyJS Dependency Injection

Theia uses InversifyJS for all service management. Understanding this is critical for customization.

#### Basic Pattern: Rebind Service

```typescript
import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { NavigatorWidgetFactory as TheiaNavigatorWidgetFactory } from '@theia/navigator/lib/browser';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Replace Theia's service with custom implementation
    rebind(TheiaNavigatorWidgetFactory).to(CustomNavigatorWidgetFactory);
});
```

**How it works**:
- `rebind(ServiceId)` → Find existing service by identifier
- `.to(CustomClass)` → Replace with custom implementation
- Service ID can be: class itself, Symbol, or string

#### Container Context API

```typescript
interface ContainerContext {
    bind: interfaces.Bind;           // Register new service
    unbind: interfaces.Unbind;       // Remove service
    isBound: interfaces.IsBound;     // Check if service exists
    rebind: interfaces.Rebind;       // Replace existing service
}
```

**Usage patterns**:

```typescript
// 1. Add new service
bind(MyService).toSelf().inSingletonScope();

// 2. Replace Theia service
rebind(TheiaService).to(MyCustomService);

// 3. Bind to existing service (alias)
bind(NewIdentifier).toService(ExistingService);

// 4. Conditional binding
if (!isBound(ServiceId)) {
    bind(ServiceId).to(Implementation);
}

// 5. Factory pattern
rebind(WidgetFactory).toFactory(context => {
    return () => new CustomWidget();
});
```

---

## Contribution Filtering

### What Are Contributions?

Contributions are classes that extend IDE functionality:

| Type | Purpose | Example |
|------|---------|---------|
| `FrontendApplicationContribution` | Lifecycle hooks | Startup logic, UI initialization |
| `CommandContribution` | Register commands | Add executable actions |
| `MenuContribution` | Menu items | File, Edit, View menus |
| `KeybindingContribution` | Keyboard shortcuts | Ctrl+S, Ctrl+P, etc. |
| `WidgetFactory` | Widget creation | Custom panels, views |

### Filtering Unwanted Contributions

**File**: [custom-ui/src/frontend/contribution-filters/](../custom-ui/src/frontend/contribution-filters/)

```typescript
import { ContributionFilterRegistry, FilterContribution } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';

// Example: Filter out test-related contributions
import { TestViewContribution } from '@theia/test/lib/browser/view/test-view-contribution';
import { TestRunViewContribution } from '@theia/test/lib/browser/view/test-run-view-contribution';

const filtered = [
    TestViewContribution,
    TestRunViewContribution,
    // Add more contributions to filter
];

@injectable()
export class FilterTestContributions implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilters('*', [
            (contrib) => {
                // Return false to filter out contribution
                return !filtered.some(c => contrib instanceof c);
            },
        ]);
    }
}

// Register in container
export function registerFilters({ bind }: { bind: interfaces.Bind }): void {
    bind(FilterContribution).to(FilterTestContributions).inSingletonScope();
}
```

### Filtered Modules in Flexbe IDE

**Implementation**: See individual filter files in [contribution-filters/](../custom-ui/src/frontend/contribution-filters/)

| Module | Filter File | Contributions Removed |
|--------|-------------|----------------------|
| Debug | [filter-debug.ts](../custom-ui/src/frontend/contribution-filters/filter-debug.ts) | Debug views, breakpoints, debug console |
| SCM/Git | [filter-scm.ts](../custom-ui/src/frontend/contribution-filters/filter-scm.ts) | Git integration, source control panel |
| Tasks | [filter-tasks.ts](../custom-ui/src/frontend/contribution-filters/filter-tasks.ts) | Task runner, task configuration |
| Tests | [filter-test.ts](../custom-ui/src/frontend/contribution-filters/filter-test.ts) | Test explorer, test results |
| Notebooks | [filter-notebook.ts](../custom-ui/src/frontend/contribution-filters/filter-notebook.ts) | Jupyter notebook support |
| Outline | [filter-outline.ts](../custom-ui/src/frontend/contribution-filters/filter-outline.ts) | Code outline view |
| Problems | [filter-problems.ts](../custom-ui/src/frontend/contribution-filters/filter-problems.ts) | Problems panel, diagnostics |
| Hierarchy | [filter-hierarchy.ts](../custom-ui/src/frontend/contribution-filters/filter-hierarchy.ts) | Call hierarchy, type hierarchy |

**Important**: After filtering, run **"Reset Workbench Layout"** command for changes to take effect.

---

## Command & Menu Management

### Command Spy Pattern

Log all executed commands for debugging:

```typescript
import { CommandContribution, CommandRegistry } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class CommandSpy implements CommandContribution {
    registerCommands(registry: CommandRegistry): void {
        const original = registry.executeCommand.bind(registry);

        registry.executeCommand = async (name: string, ...args: any[]) => {
            console.log('[Command]', name, args);
            return original(name, ...args);
        };
    }
}
```

**Usage**: Helps identify command IDs to unregister or override.

### Unregistering Commands

```typescript
import { CommonCommands } from '@theia/core/lib/browser';
import { CommandRegistry } from '@theia/core';

export class MyCommandsContribution implements CommandContribution {
    registerCommands(registry: CommandRegistry): void {
        // Remove About command
        registry.unregisterCommand(CommonCommands.ABOUT_COMMAND);

        // Remove workspace commands
        registry.unregisterCommand(WorkspaceCommands.OPEN_WORKSPACE);
        registry.unregisterCommand(WorkspaceCommands.SAVE_WORKSPACE_AS);

        // Disable split commands (except horizontal)
        registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_VERTICAL);
        registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_DOWN);
    }
}
```

### Registering Custom Commands

```typescript
export const SHOW_EXPLORER_COMMAND = Command.toLocalizedCommand({
    id: 'fileNavigator:activate',
    label: 'Files',
});

@injectable()
export class MyCommandsContribution implements CommandContribution {
    @inject(FileNavigatorContribution)
    protected readonly fileNavigatorContribution!: FileNavigatorContribution;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SHOW_EXPLORER_COMMAND, {
            execute: async () => {
                await this.fileNavigatorContribution.openView({
                    activate: true,
                    reveal: true
                });
            }
        });
    }
}
```

### Menu Customization

```typescript
import { MenuModelRegistry, nls } from '@theia/core';
import { CommonMenus } from '@theia/core/lib/browser';

export class MyMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        // Remove entire Help menu
        menus.unregisterMenuAction(
            CommonMenus.HELP.at(-1) as string,
            CommonMenus.HELP.slice(0, -1)
        );

        // Remove View menu (will recreate custom version)
        menus.unregisterMenuAction(
            CommonMenus.VIEW.at(-1) as string,
            CommonMenus.VIEW.slice(0, -1)
        );

        // Recreate View menu
        menus.registerSubmenu(CommonMenus.VIEW, nls.localizeByDefault('View'));

        // Add custom menu items
        menus.registerMenuAction(CommonMenus.VIEW_VIEWS, {
            commandId: SHOW_EXPLORER_COMMAND.id,
            label: SHOW_EXPLORER_COMMAND.label,
            order: 'a',  // Menu item order
        });
    }
}
```

---

## Widget Customization

### Rebinding Widget Factories

**Pattern**: Override widget factory to customize widget creation.

**Example**: Remove "Open Editors" from Navigator

**File**: [custom-ui/src/frontend/navigator/navigator-widget-factory.ts](../custom-ui/src/frontend/navigator/navigator-widget-factory.ts)

```typescript
import { injectable } from '@theia/core/shared/inversify';
import { NavigatorWidgetFactory as TheiaNavigatorWidgetFactory } from '@theia/navigator/lib/browser';

@injectable()
export class NavigatorWidgetFactory extends TheiaNavigatorWidgetFactory {
    protected override fileNavigatorWidgetOptions = {
        order: 0,
        canHide: false,  // Prevent hiding widget
        initiallyCollapsed: false,
        weight: 120,
        disableDraggingToOtherContainers: true,  // Lock in place
    };

    override async createWidget(): Promise<ViewContainer> {
        const viewContainer = this.viewContainerFactory({
            id: EXPLORER_VIEW_CONTAINER_ID,
            progressLocationId: 'explorer',
        });

        // Customize title options
        viewContainer.setTitleOptions({
            ...EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS,
            label: '',  // Remove label
            closeable: false,  // Prevent closing
        });

        // Add only Navigator widget (skip Open Editors)
        const navigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID);
        viewContainer.addWidget(navigatorWidget, this.fileNavigatorWidgetOptions);

        // ❌ Commented out: Open Editors widget
        // const openEditorsWidget = await this.widgetManager.getOrCreateWidget(OpenEditorsWidget.ID);
        // viewContainer.addWidget(openEditorsWidget, this.openEditorsWidgetOptions);

        return viewContainer;
    }
}

// Register
export function initFileNavigator({ rebind }: { rebind: interfaces.Rebind }): void {
    rebind(TheiaNavigatorWidgetFactory).to(NavigatorWidgetFactory).inSingletonScope();
}
```

### Customizing Widget Titles

**Pattern**: Override widget methods to change display behavior.

```typescript
import { FileNavigatorWidget as TheiaFileNavigatorWidget } from '@theia/navigator/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class FileNavigatorWidget extends TheiaFileNavigatorWidget {
    protected override doUpdateRows(): void {
        super.doUpdateRows();

        // Force custom title (instead of folder name)
        this.title.label = 'Files';
    }
}
```

**Challenge**: Some widgets require special binding patterns:

```typescript
import { WidgetFactory } from '@theia/core/lib/browser';
import { createFileTreeContainer } from '@theia/filesystem/lib/browser';
import { FILE_NAVIGATOR_ID, FILE_NAVIGATOR_PROPS } from '@theia/navigator/lib/browser';

export function initFileNavigator({ bind }: { bind: interfaces.Bind }): void {
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: FILE_NAVIGATOR_ID,
        createWidget: () => {
            return createFileTreeContainer(container, {
                widget: FileNavigatorWidget,  // ← Custom widget
                tree: FileNavigatorTree,
                model: FileNavigatorModel,
                decoratorService: NavigatorDecoratorService,
                props: FILE_NAVIGATOR_PROPS,
            }).get(FileNavigatorWidget);
        },
    })).inSingletonScope();
}
```

### Customizing Toolbars

**Example**: Remove toolbar buttons from Output panel

**File**: [custom-ui/src/frontend/output/output-toolbar-contribution.ts](../custom-ui/src/frontend/output/output-toolbar-contribution.ts)

```typescript
import { injectable } from '@theia/core/shared/inversify';
import { OutputToolbarContribution as TheiaOutputToolbarContribution } from '@theia/output/lib/browser';
import { TabBarToolbarRegistry } from '@theia/core/lib/browser';
import { OutputCommands } from '@theia/output/lib/browser';

@injectable()
export class OutputToolbarContribution extends TheiaOutputToolbarContribution {
    override registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): void {
        super.registerToolbarItems(toolbarRegistry);

        // Remove specific toolbar buttons
        toolbarRegistry.unregisterItem(OutputCommands.CLEAR__WIDGET.id);
        toolbarRegistry.unregisterItem(OutputCommands.LOCK__WIDGET.id);
        toolbarRegistry.unregisterItem(OutputCommands.UNLOCK__WIDGET.id);
    }
}
```

### Widget State Customization

```typescript
import { OutputWidget as TheiaOutputWidget } from '@theia/output/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class OutputWidget extends TheiaOutputWidget {
    // Set default state (locked scrolling)
    protected _state: TheiaOutputWidget.State = { locked: true };

    constructor() {
        super();
        // Prevent closing widget
        this.title.closable = false;
    }
}
```

---

## Layout & Shell Customization

### ApplicationShell Overview

`ApplicationShell` is the root widget managing the entire IDE layout.

**Default Structure**:
```
ApplicationShell
├── Top Panel (title bar, menu)
├── Left Side Panel (Explorer, Search)
├── Main Panel (editors)
├── Right Side Panel (usually empty)
└── Bottom Panel (Terminal, Output)
```

### Disabling Panel Movement

**Goal**: Prevent users from dragging widgets between panels.

**File**: [custom-ui/src/frontend/layout/application-shell.ts](../custom-ui/src/frontend/layout/application-shell.ts)

```typescript
import { ApplicationShell as TheiaApplicationShell } from '@theia/core/lib/browser';
import { injectable, postConstruct } from '@theia/core/shared/inversify';

@injectable()
export class ApplicationShell extends TheiaApplicationShell {
    @postConstruct()
    protected init(): void {
        // Configure panel options
        this.options = {
            leftPanel: {
                ...this.options.leftPanel,
                initialSizeRatio: 0.25,  // 25% of window width
            },
            bottomPanel: {
                ...this.options.bottomPanel,
                emptySize: 0,  // Prevent dragging when empty
                expandDuration: 0,
                initialSizeRatio: 0.2,  // 20% of window height
            },
            rightPanel: {
                ...this.options.rightPanel,
                emptySize: 0,  // Disable right panel
                expandThreshold: 0,
                initialSizeRatio: 0,
            },
        };

        super.init();
        this.restrictDragging();
    }

    // Redirect right panel widgets to left
    override getInsertionOptions(options?: TheiaApplicationShell.WidgetOptions) {
        if (options?.area === 'right') {
            options.area = 'left';
        }
        return super.getInsertionOptions(options);
    }

    // Block drag-and-drop events
    override handleEvent(event: Event): void {
        switch (event.type) {
            case 'lm-dragenter':
            case 'lm-dragleave':
            case 'lm-dragover':
            case 'lm-drop':
                return;  // Prevent all drag events
        }
        return super.handleEvent(event);
    }

    protected restrictDragging(): void {
        // Advanced DockPanel prototype patching (see full implementation)
        // ...
    }
}
```

### Patching DockPanel (Advanced)

**Problem**: `DockPanel` is not injectable, created by Lumino framework.

**Solution**: Patch prototype directly.

```typescript
protected restrictDragging(): void {
    const proto = TheiaDockPanel.prototype as any;

    if (proto._patchedDropBlocker) return;  // Prevent double-patching

    const originalHandleEvent = proto.handleEvent;

    proto.handleEvent = function(event: Event & { source?: TheiaDockPanel }): any {
        const el = this.node;
        const toBottomPanel = !!el.closest('[id="theia-bottom-content-panel"]');
        const fromBottomPanel = !!(event.source?.id === 'theia-bottom-content-panel');

        // Block dragging from/to bottom panel
        if (fromBottomPanel || toBottomPanel) {
            return;
        }

        return originalHandleEvent.call(this, event);
    };

    proto._patchedDropBlocker = true;  // Mark as patched
}
```

**Warnings**:
- Prototype patching is fragile (breaks on Theia updates)
- Use only when no injectable alternative exists
- Document thoroughly for maintainability

### Redirecting Split Commands

**Goal**: Disable vertical splits, allow only horizontal.

```typescript
import { EditorCommands } from '@theia/editor/lib/browser';
import { CommandRegistry } from '@theia/core';

registerCommands(registry: CommandRegistry): void {
    // Disable vertical splits
    registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_VERTICAL);
    registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_UP);
    registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_DOWN);
    registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_LEFT);
    registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_RIGHT);

    // Keep horizontal split
    // ✅ EditorCommands.SPLIT_EDITOR_HORIZONTAL
}
```

**Combine with DockPanel patch**:

```typescript
// In _showOverlay override
proto._showOverlay = function(clientX: number, clientY: number): string {
    const zone = originalShowOverlay.call(this, clientX, clientY);

    // Convert vertical zones to horizontal
    if (['widget-top', 'widget-bottom', 'root-top', 'root-bottom'].includes(zone)) {
        return 'widget-all';  // Show full overlay instead
    }

    return zone;
};

// In addWidget override
proto.addWidget = function(widget: Widget, options?: DockPanel.IAddOptions): void {
    // Convert vertical split modes to tabs
    if (options?.mode === 'split-top' || options?.mode === 'split-bottom') {
        options.mode = 'tab-after';
    }

    return originalAddWidget.call(this, widget, options);
};
```

### Setting Default Layout

**Goal**: Ensure specific panels are open on first launch.

**File**: [custom-ui/src/frontend/layout/shell-init-contribution.ts](../custom-ui/src/frontend/layout/shell-init-contribution.ts)

```typescript
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { injectable, inject } from '@theia/core/shared/inversify';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser';
import { OutputContribution } from '@theia/output/lib/browser';

@injectable()
export class ShellInitContribution implements FrontendApplicationContribution {
    @inject(FileNavigatorContribution)
    protected readonly navigatorContribution!: FileNavigatorContribution;

    @inject(OutputContribution)
    protected readonly outputContribution!: OutputContribution;

    async onDidInitializeLayout(): Promise<void> {
        await this.openDefaultLayout();
    }

    protected async openDefaultLayout(): Promise<void> {
        // Force open Explorer (revealed)
        await this.navigatorContribution.openView({
            area: 'left',
            reveal: true,  // Make visible
            rank: 100,
        });

        // Force open Search (hidden)
        await this.searchContribution.openView({
            area: 'left',
            reveal: false,  // Add but don't show
            rank: 200,
        });

        // Force open Output (revealed)
        await this.outputContribution.openView({
            area: 'bottom',
            reveal: true,
        });
    }
}
```

**Lifecycle hooks**:
- `onDidInitializeLayout()` → Called on first launch or after "Reset Workbench Layout"
- `onStart()` → Called every time IDE opens

---

## Lumino Framework Patterns

### Understanding Lumino

Theia's UI is built on **Lumino** (formerly Phosphor), a framework for building complex desktop-style UIs in browsers.

**Key Concepts**:

| Concept | Purpose | Example |
|---------|---------|---------|
| **Widget** | Basic UI building block | Panel, Tab, Editor |
| **Layout** | Positions child widgets | BoxLayout, DockLayout, SplitLayout |
| **Message** | Event communication | `onAfterAttach`, `onResize` |
| **Signal** | Observable events | `widgetAdded`, `currentChanged` |

### Widget Lifecycle

```typescript
import { Widget } from '@lumino/widgets';
import { Message } from '@lumino/messaging';

export class MyWidget extends Widget {
    // Called when widget attached to DOM
    protected onAfterAttach(msg: Message): void {
        super.onAfterAttach(msg);
        // Initialize DOM, add event listeners
    }

    // Called before widget removed from DOM
    protected onBeforeDetach(msg: Message): void {
        super.onBeforeDetach(msg);
        // Cleanup: remove listeners, dispose resources
    }

    // Called when widget resized
    protected onResize(msg: Widget.ResizeMessage): void {
        super.onResize(msg);
        // Handle resize logic
    }

    // Called when widget closed
    protected onCloseRequest(msg: Message): void {
        super.onCloseRequest(msg);
        this.dispose();  // Cleanup
    }

    // Called when update requested
    protected onUpdateRequest(msg: Message): void {
        super.onUpdateRequest(msg);
        // Re-render content
    }
}
```

### Layout Types

#### BoxLayout (FlexBox-like)

```typescript
import { BoxLayout, BoxPanel, Widget } from '@lumino/widgets';

// Create vertical layout
const layout = new BoxLayout({ direction: 'top-to-bottom', spacing: 5 });

const container = new BoxPanel({ layout });

const header = new Widget();
const content = new Widget();
const footer = new Widget();

BoxPanel.setStretch(header, 0);  // Fixed size
BoxPanel.setStretch(content, 1);  // Stretch to fill
BoxPanel.setStretch(footer, 0);  // Fixed size

layout.addWidget(header);
layout.addWidget(content);
layout.addWidget(footer);
```

#### SplitLayout (Resizable Panels)

```typescript
import { SplitLayout, SplitPanel } from '@lumino/widgets';

// Create horizontal split
const leftPanel = new Widget();
const rightPanel = new Widget();

const splitLayout = new SplitLayout({
    renderer: SplitPanel.defaultRenderer,
    orientation: 'horizontal',
    spacing: 4
});

splitLayout.addWidget(leftPanel);
splitLayout.addWidget(rightPanel);

// Set initial sizes (ratios)
splitLayout.setRelativeSizes([1, 2]);  // 1:2 ratio
```

#### DockLayout (Tabbed + Resizable)

```typescript
import { DockPanel, Widget } from '@lumino/widgets';

const dockPanel = new DockPanel();

const widget1 = new Widget();
const widget2 = new Widget();

// Add as tabs
dockPanel.addWidget(widget1);
dockPanel.addWidget(widget2, { mode: 'tab-after', ref: widget1 });

// Add with split
dockPanel.addWidget(widget3, { mode: 'split-right', ref: widget1 });
```

### Custom SidePanel (Advanced Example)

**Goal**: Move sidebar from left to top (like Cursor IDE).

**File**: [custom-ui/src/frontend/layout/side-panel-handler.ts](../custom-ui/src/frontend/layout/side-panel-handler.ts)

```typescript
import { SidePanelHandler as TheiaSidePanelHandler, BoxLayout, BoxPanel, Panel } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class SidePanelHandler extends TheiaSidePanelHandler {
    protected override createSideBar(): SideTabBar {
        const sideBar = super.createSideBar();

        // Prevent tab reordering
        sideBar.tabsMovable = false;

        // Change orientation classes
        sideBar.removeClass('theia-app-left');
        sideBar.removeClass('theia-app-right');
        sideBar.addClass('theia-app-top');  // Custom class for styling

        return sideBar;
    }

    protected override createContainer(): Panel {
        // Change tab orientation to horizontal
        this.tabBar.orientation = 'horizontal';

        // Create vertical layout
        const sidePanelLayout = new BoxLayout({ direction: 'top-to-bottom', spacing: 0 });
        const container = new BoxPanel({ layout: sidePanelLayout });

        // Header panel (tabs + menu)
        const headerPanel = new Panel();
        BoxPanel.setStretch(headerPanel, 0);  // Fixed height
        sidePanelLayout.addWidget(headerPanel);

        // Toolbar (widget title + actions)
        BoxPanel.setStretch(this.toolBar, 0);  // Fixed height
        sidePanelLayout.addWidget(this.toolBar);

        // Dock panel (widget content)
        BoxPanel.setStretch(this.dockPanel, 1);  // Stretch to fill
        sidePanelLayout.addWidget(this.dockPanel);

        // Add tabs to header
        BoxPanel.setStretch(this.tabBar, 1);  // Stretch tabs
        headerPanel.addWidget(this.tabBar);

        // Add menu to header
        BoxPanel.setStretch(this.topMenu, 0);  // Fixed width
        headerPanel.addWidget(this.topMenu);

        headerPanel.addClass('theia-header-panel');
        container.id = `theia-${this.side}-content-panel`;

        return container;
    }

    // Disable panel collapsing
    override async collapse(): Promise<void> {}
}
```

**CSS Styling**: [custom-ui/src/frontend/style/side-panel.less](../custom-ui/src/frontend/style/side-panel.less)

```less
:root {
    --theia-private-sidebar-tab-width: 30px;
    --theia-private-sidebar-tab-height: 30px;
    --theia-private-sidebar-icon-size: 16px;
    --theia-private-sidebar-tab-gap: 5px;
}

.theia-header-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 36px;
    background-color: var(--theia-activityBar-background);
    padding-inline: var(--theia-private-sidebar-tab-gap);
}

.lm-TabBar.theia-app-sides {
    display: flex;
    flex-direction: row;
    align-items: center;

    .lm-TabBar-tab {
        padding: 0;
        min-width: 0;
        border-radius: 7px;
        cursor: pointer;
        transition: all 0.18s ease;
        background-color: transparent;
    }

    .lm-TabBar-tab:hover {
        background-color: var(--theia-tab-hoverBackground);
    }

    .lm-TabBar-tab.lm-mod-current {
        background-color: var(--theia-tab-activeBackground);
    }

    .lm-TabBar-tabLabel {
        display: inline-flex;
        margin-left: 8px;
    }
}
```

### "Many Island" Style Layout

**Goal**: Add spacing between panels with rounded corners (IntelliJ IDEA-style).

**Challenge**: Lumino uses absolute positioning, margins don't work.

**Solution**: Wrap panels in containers with padding.

```typescript
protected override createLayout(): Layout {
    const SPACING = 6;  // Gap between panels

    // Bottom split (main + bottom panel)
    const bottomSplitLayout = this.createSplitLayout(
        [this.mainPanel, this.bottomPanel],
        [1, 0],
        { orientation: 'vertical', spacing: SPACING }
    );
    const bottomSplitPanel = new SplitPanel({ layout: bottomSplitLayout });
    bottomSplitPanel.id = 'theia-bottom-split-panel';

    // Left-right split (left + main/bottom)
    const leftRightSplitLayout = this.createSplitLayout(
        [this.leftPanelHandler.container, bottomSplitPanel],
        [0, 1],
        { orientation: 'horizontal', spacing: SPACING }
    );
    const leftRightSplitPanel = new SplitPanel({ layout: leftRightSplitLayout });
    leftRightSplitPanel.id = 'theia-left-right-split-panel';

    return new BoxLayout({
        direction: 'top-to-bottom',
        spacing: 0,
        children: [
            { widget: this.topPanel, stretch: 0 },
            { widget: leftRightSplitPanel, stretch: 1 }
        ]
    });
}
```

**CSS for rounded corners**:

```less
:root {
    --theia-panel-border-radius: 10px;
}

#theia-left-content-panel,
#theia-main-content-panel,
#theia-bottom-content-panel {
    border-radius: var(--theia-panel-border-radius);
    overflow: hidden;
}

body {
    background-color: var(--theia-window-background);  // Shows through gaps
}
```

---

## Advanced Techniques

### Creating React Widgets

Theia provides `ReactWidget` base class for React components.

```typescript
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import * as React from 'react';

@injectable()
export class MyReactWidget extends ReactWidget {
    static readonly ID = 'my-react-widget';
    static readonly LABEL = 'My Widget';

    constructor() {
        super();
        this.id = MyReactWidget.ID;
        this.title.label = MyReactWidget.LABEL;
        this.title.closable = true;
    }

    protected render(): React.ReactNode {
        return (
            <div>
                <h1>Hello from React!</h1>
                <button onClick={() => this.handleClick()}>Click Me</button>
            </div>
        );
    }

    protected handleClick(): void {
        console.log('Button clicked!');
        this.update();  // Trigger re-render
    }
}
```

**Registration**:

```typescript
bind(MyReactWidget).toSelf();
bind(WidgetFactory).toDynamicValue(ctx => ({
    id: MyReactWidget.ID,
    createWidget: () => ctx.container.get(MyReactWidget)
})).inSingletonScope();
```

### WebSocket Backend Communication

**Backend Endpoint**: [custom-ui/src/backend/websocket-endpoint.ts](../custom-ui/src/backend/websocket-endpoint.ts)

```typescript
import { injectable } from '@theia/core/shared/inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node';

@injectable()
export class CustomWebSocketEndpoint implements BackendApplicationContribution {
    configure(app: Application): void {
        // Add custom WebSocket endpoint
        app.ws('/custom-ws', (ws, req) => {
            ws.on('message', (msg) => {
                console.log('[Backend] Received:', msg);
                ws.send(`Echo: ${msg}`);
            });
        });
    }
}
```

**Frontend Connection**: [custom-ui/src/frontendPreload/ws-connection-source.ts](../custom-ui/src/frontendPreload/ws-connection-source.ts)

```typescript
import { injectable, postConstruct } from '@theia/core/shared/inversify';

@injectable()
export class CustomWebSocketConnectionSource {
    private ws?: WebSocket;

    @postConstruct()
    protected init(): void {
        this.connectWebSocket();
    }

    protected connectWebSocket(): void {
        const wsUrl = `ws://${window.location.host}/custom-ws`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('[Frontend] WebSocket connected');
        };

        this.ws.onmessage = (event) => {
            console.log('[Frontend] Received:', event.data);
        };
    }

    sendMessage(msg: string): void {
        this.ws?.send(msg);
    }
}
```

---

## Best Practices

### 1. Use Contribution Filtering Over Direct Removal

✅ **Good**: Filter contributions systematically
```typescript
registry.addFilters('*', [
    (contrib) => !unwantedContributions.some(c => contrib instanceof c)
]);
```

❌ **Bad**: Manually hide/remove UI elements with CSS
```css
.debug-panel { display: none !important; }
```

**Reason**: Filtering prevents contribution from loading entirely (better performance, cleaner architecture).

### 2. Prefer Rebinding Over Prototype Patching

✅ **Good**: Use InversifyJS rebinding
```typescript
rebind(NavigatorWidgetFactory).to(CustomNavigatorWidgetFactory);
```

❌ **Bad**: Patch prototypes directly
```typescript
NavigatorWidgetFactory.prototype.createWidget = function() { /* ... */ };
```

**Reason**: Rebinding is maintainable, testable, and survives Theia updates better.

**Exception**: Prototype patching OK for non-injectable classes (e.g., `DockPanel`), but document thoroughly.

### 3. Document All Customizations

**Create internal docs** explaining:
- **Why**: Business/UX reason for customization
- **What**: Which Theia services/widgets modified
- **How**: Implementation approach
- **Risks**: Potential breakage on Theia upgrades

**Example**:

```typescript
/**
 * CUSTOMIZATION: Remove "Open Editors" widget from Navigator
 *
 * WHY: Simplifies UI for cloud IDE users who work with single projects
 * WHAT: Overrides NavigatorWidgetFactory.createWidget()
 * HOW: Comments out openEditorsWidget.addWidget() call
 * RISK: Breaks if NavigatorWidgetFactory.createWidget() signature changes
 *
 * @see https://github.com/eclipse-theia/theia/blob/master/packages/navigator/src/browser/navigator-widget-factory.ts
 */
```

### 4. Test After Theia Upgrades

**Upgrade checklist**:
1. Review [Theia CHANGELOG](https://github.com/eclipse-theia/theia/blob/master/CHANGELOG.md)
2. Search for breaking changes in customized services
3. Test all custom widgets manually
4. Verify contribution filters still work
5. Check for console errors/warnings

### 5. Avoid Over-Customization

**Rule of thumb**: If you're customizing >50% of Theia, consider:
- Building custom IDE from scratch (Monaco + custom framework)
- Using VS Code extension API (if targeting desktop)
- Contributing improvements back to Theia project

**Flexbe IDE customizations** (~20% of Theia):
- ✅ Reasonable: Filtered 10 modules, customized 5 widgets, modified layout
- ❌ Too much: Would be rewriting editor, LSP integration, file system

### 6. Keep Customizations Modular

**Good structure**:
```
custom-ui/src/frontend/
├── commands/           # Command management
├── contribution-filters/  # Module filtering
├── layout/             # Shell & panel customization
├── navigator/          # Explorer customization
├── output/             # Output panel customization
└── search/             # Search customization
```

**Each module**:
- Single responsibility
- Clear init function
- Minimal dependencies
- Well-documented

### 7. Use Command Spy During Development

Always enable command logging during customization:

```typescript
const original = registry.executeCommand.bind(registry);
registry.executeCommand = async (name: string, ...args: any[]) => {
    console.log('[Command]', name, args);  // See what's being called
    return original(name, ...args);
};
```

**Benefits**:
- Discover command IDs to unregister
- Debug menu item issues
- Understand Theia internals

### 8. Reset Workbench Layout Frequently

After ANY customization change:
1. Run **"Reset Workbench Layout"** command
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear local storage if issues persist

**Why**: Theia caches layout state in browser storage, causing stale behavior.

---

## Resources

### Official Documentation
- [Theia Documentation](https://theia-ide.org/docs/)
- [Theia Extension Development](https://theia-ide.org/docs/composing_applications/)
- [Lumino Documentation](https://lumino.readthedocs.io/)
- [InversifyJS Documentation](https://inversify.io/)

### Source Code References
- [Theia GitHub](https://github.com/eclipse-theia/theia)
- [Theia API Docs](https://eclipse-theia.github.io/theia/docs/next/)
- [Lumino Examples](https://github.com/jupyterlab/lumino/tree/main/examples)

### Community
- [Theia Discussions](https://github.com/eclipse-theia/theia/discussions)
- [Theia Spectrum Chat](https://spectrum.chat/theia)

### Articles
- [DZone: Theia Deep Dive Part 1 - Build Your Own IDE](https://dzone.com/articles/theia-deep-dive-build-your-own-ide)
- [DZone: Theia Deep Dive Part 2 - Mastering Customization](https://dzone.com/articles/theia-deep-dive-mastering-customization)

---

**Guide Version**: 1.0.0
**Last Updated**: 2026-01-04
**Based On**: DZone Series + Flexbe IDE Implementation
**Maintained By**: Claude Code
