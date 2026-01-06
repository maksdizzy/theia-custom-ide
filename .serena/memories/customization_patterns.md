# Theia Customization Patterns - Quick Reference

## InversifyJS Patterns

### Basic Rebinding
```typescript
rebind(TheiaService).to(CustomService).inSingletonScope();
```

### Factory Rebinding
```typescript
rebind(WidgetFactory).toDynamicValue(({ container }) => ({
    id: WIDGET_ID,
    createWidget: () => container.get(CustomWidget)
})).inSingletonScope();
```

### Service Aliasing
```typescript
bind(NewIdentifier).toService(ExistingService);
```

## Contribution Filtering

### Pattern
```typescript
@injectable()
export class FilterContribution implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilters('*', [
            (contrib) => !filtered.some(c => contrib instanceof c)
        ]);
    }
}
```

### Filtered in Flexbe IDE
- Debug: TestViewContribution, DebugFrontendApplicationContribution
- SCM: ScmContribution
- Tasks: TaskContribution
- Tests: All test-related contributions
- Notebooks: NotebookContribution
- Outline: OutlineViewContribution
- Problems: ProblemContribution
- Hierarchy: CallHierarchyContribution

## Widget Customization

### Override Widget Factory
```typescript
@injectable()
export class CustomWidgetFactory extends TheiaWidgetFactory {
    override async createWidget(): Promise<Widget> {
        // Custom implementation
    }
}

rebind(TheiaWidgetFactory).to(CustomWidgetFactory);
```

### Override Widget Methods
```typescript
@injectable()
export class CustomWidget extends TheiaWidget {
    protected override doSomething(): void {
        // Custom behavior
    }
}
```

## Layout Customization

### ApplicationShell Layout Override
```typescript
protected override createLayout(): Layout {
    const SPACING = 6;
    
    const bottomSplit = this.createSplitLayout(
        [this.mainPanel, this.bottomPanel],
        [1, 0],
        { orientation: 'vertical', spacing: SPACING }
    );
    
    // Return custom layout
}
```

### SidePanelHandler Customization
```typescript
@injectable()
export class CustomSidePanelHandler extends SidePanelHandler {
    protected override createContainer(): Panel {
        // Custom panel structure with BoxLayout
    }
}
```

## Command Management

### Unregister Commands
```typescript
registry.unregisterCommand(CommonCommands.ABOUT_COMMAND);
registry.unregisterCommand(EditorCommands.SPLIT_EDITOR_VERTICAL);
```

### Register Custom Commands
```typescript
export const CUSTOM_COMMAND = Command.toLocalizedCommand({
    id: 'custom.command',
    label: 'Custom Command'
});

registry.registerCommand(CUSTOM_COMMAND, {
    execute: async () => { /* implementation */ }
});
```

## Menu Management

### Remove Menu
```typescript
menus.unregisterMenuAction(
    CommonMenus.HELP.at(-1) as string,
    CommonMenus.HELP.slice(0, -1)
);
```

### Add Menu Item
```typescript
menus.registerMenuAction(CommonMenus.VIEW_VIEWS, {
    commandId: SHOW_EXPLORER_COMMAND.id,
    label: SHOW_EXPLORER_COMMAND.label,
    order: 'a',
});
```

## Lumino Framework

### Widget Lifecycle
```typescript
protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    // Initialize when attached to DOM
}

protected onBeforeDetach(msg: Message): void {
    super.onBeforeDetach(msg);
    // Cleanup before removal
}
```

### BoxLayout Pattern
```typescript
const layout = new BoxLayout({ direction: 'top-to-bottom', spacing: 0 });
const container = new BoxPanel({ layout });

BoxPanel.setStretch(fixedWidget, 0);  // Fixed size
BoxPanel.setStretch(flexWidget, 1);   // Stretch to fill

layout.addWidget(fixedWidget);
layout.addWidget(flexWidget);
```

## Best Practices

1. **Prefer Rebinding**: Use `rebind()` over prototype patching
2. **Filter Contributions**: Remove unwanted features via ContributionFilterRegistry
3. **Reset Layout**: Run "Reset Workbench Layout" after customization changes
4. **Document Patches**: Comment all prototype patches with WHY/WHAT/HOW/RISK
5. **Test Upgrades**: Check Theia CHANGELOG before upgrading versions
6. **Command Spy**: Enable command logging during development
7. **Modular Code**: Keep customizations in separate files by concern
8. **Avoid Over-Customization**: If >50% customized, consider alternative approaches
