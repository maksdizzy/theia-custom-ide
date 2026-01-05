# Design Specification: Flexbe IDE for Non-Technical Users

> **Version**: 1.0.0
> **Date**: 2026-01-04
> **Status**: Design Approved

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Implementation Phases](#3-implementation-phases)
4. [Phase 1: Light Theme & Menu Bar Hiding](#4-phase-1-light-theme--menu-bar-hiding)
5. [Phase 2: AI Panel Widget](#5-phase-2-ai-panel-widget)
6. [Phase 3: Activity Bar & Integrations](#6-phase-3-activity-bar--integrations)
7. [Phase 4: Status Bar Simplification](#7-phase-4-status-bar-simplification)
8. [File Changes Summary](#8-file-changes-summary)
9. [Plugin Integration](#9-plugin-integration)
10. [Testing Strategy](#10-testing-strategy)

---

## 1. Executive Summary

### Goal
Transform the Flexbe IDE into a simplified, user-friendly interface for non-technical users who work with files and AI agents.

### Key Changes
- **Light theme** as default with clean, minimal design
- **Hidden menu bar** (File, Edit, View, Help completely removed)
- **Simplified Activity Bar** with 4 items: Files, Integrations, Search, Settings
- **Right AI Panel** with model selector dropdown and chat interface
- **Integrated Composio panel** for third-party integrations
- **Minimal status bar** showing only essential info

### Design Philosophy
- Less is more: Remove all developer-focused features
- Visual clarity: Clean colors, clear hierarchy
- AI-first: Right panel as primary interaction point

---

## 2. Architecture Overview

### Current Structure
```
theia-custom-ide/
├── browser-app/           # Main Theia application
│   └── package.json       # Preferences & configuration
├── custom-ui/             # Custom UI extension
│   └── src/
│       ├── frontend/      # Frontend customizations
│       │   ├── contribution-filters/  # Feature filtering
│       │   ├── layout/    # Shell customization
│       │   ├── commands/  # Command management
│       │   ├── navigator/ # File explorer
│       │   ├── output/    # Output panel
│       │   ├── search/    # Search widget
│       │   └── style/     # LESS stylesheets
│       ├── backend/       # Backend services
│       └── frontendPreload/  # Preload scripts
└── plugins/               # VS Code extensions
```

### New Components to Add
```
custom-ui/src/frontend/
├── ai-panel/              # NEW: AI Panel widget
│   ├── ai-panel-widget.tsx
│   ├── ai-panel-contribution.ts
│   ├── ai-panel-factory.ts
│   ├── components/
│   │   ├── ModelSelector.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   └── QuickCommands.tsx
│   └── style/
│       └── ai-panel.less
├── integrations/          # NEW: Integrations panel
│   ├── integrations-widget.tsx
│   ├── integrations-contribution.ts
│   └── components/
│       ├── ConnectedList.tsx
│       └── AvailableCategories.tsx
├── theme/                 # NEW: Theme configuration
│   └── light-theme.less
└── status-bar/            # NEW: Status bar customization
    └── status-bar-contribution.ts
```

---

## 3. Implementation Phases

| Phase | Priority | Description | Effort |
|-------|----------|-------------|--------|
| 1 | HIGH | Light theme + Hide menu bar | 2-3 days |
| 2 | HIGH | AI Panel widget with dropdown | 4-5 days |
| 3 | MEDIUM | Activity Bar + Integrations | 3-4 days |
| 4 | LOW | Status Bar simplification | 1-2 days |

**Total Estimated Effort**: 10-14 days

---

## 4. Phase 1: Light Theme & Menu Bar Hiding

### 4.1 Hide Menu Bar

**File**: `browser-app/package.json`

Change the preference:
```json
{
  "theia": {
    "frontend": {
      "config": {
        "preferences": {
          "window.menuBarVisibility": "hidden"
        }
      }
    }
  }
}
```

**File**: `custom-ui/src/frontend/style/application-shell.less`

Add CSS to ensure complete hiding:
```less
// Hide menu bar completely
#theia-top-panel .lm-Widget.lm-MenuBar {
    display: none !important;
}
```

### 4.2 Light Theme Configuration

**New File**: `custom-ui/src/frontend/style/light-theme.less`

```less
// Flexbe Light Theme
body.theia-light {
    // Core colors
    --flexbe-background: #ffffff;
    --flexbe-sidebar-bg: #f8fafc;
    --flexbe-activity-bar-bg: #f1f5f9;
    --flexbe-accent: #3b82f6;
    --flexbe-text-primary: #334155;
    --flexbe-text-secondary: #64748b;
    --flexbe-border: #e2e8f0;
    --flexbe-hover: #f1f5f9;
    --flexbe-active: #e2e8f0;

    // Override Theia variables
    --theia-editor-background: var(--flexbe-background);
    --theia-sideBar-background: var(--flexbe-sidebar-bg);
    --theia-activityBar-background: var(--flexbe-activity-bar-bg);
    --theia-panel-background: var(--flexbe-background);
    --theia-statusBar-background: var(--flexbe-sidebar-bg);
    --theia-tab-activeBackground: var(--flexbe-background);
    --theia-tab-inactiveBackground: var(--flexbe-sidebar-bg);
    --theia-focusBorder: var(--flexbe-accent);
    --theia-foreground: var(--flexbe-text-primary);
    --theia-descriptionForeground: var(--flexbe-text-secondary);
    --theia-widget-border: var(--flexbe-border);
    --theia-list-hoverBackground: var(--flexbe-hover);
    --theia-list-activeSelectionBackground: var(--flexbe-accent);

    // Remove dark theme gradient
    --theia-island-background: var(--flexbe-background);
}

// Active tab indicator (blue line on top)
body.theia-light {
    .lm-TabBar-tab.lm-mod-current {
        border-top: 2px solid var(--flexbe-accent) !important;
    }
}
```

**File**: `browser-app/package.json`

Update default theme preference:
```json
{
  "preferences": {
    "workbench.colorTheme": "light"
  }
}
```

### 4.3 Import Light Theme

**File**: `custom-ui/src/frontend/index.ts`

Add import at the top:
```typescript
import '@/frontend/style/light-theme.less';
```

---

## 5. Phase 2: AI Panel Widget

### 5.1 Architecture

The AI Panel is a custom Theia widget that:
- Registers in the right sidebar area
- Contains React components for the chat interface
- Communicates with VS Code AI extensions via extension API
- Provides a toggle button when collapsed

### 5.2 Widget Implementation

**New File**: `custom-ui/src/frontend/ai-panel/ai-panel-widget.tsx`

```typescript
import * as React from 'react';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core/lib/common/message-service';

export const AI_PANEL_WIDGET_ID = 'flexbe-ai-panel';

interface AIModel {
    id: string;
    name: string;
    provider: string;
    extensionCommand: string;
}

const AI_MODELS: AIModel[] = [
    { id: 'claude', name: 'Claude Code', provider: 'Anthropic', extensionCommand: 'claude-code.openChat' },
    { id: 'chatgpt', name: 'ChatGPT', provider: 'OpenAI', extensionCommand: 'chatgpt.openChat' },
    { id: 'gemini', name: 'Gemini', provider: 'Google', extensionCommand: 'gemini.openChat' },
];

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

@injectable()
export class AIPanelWidget extends ReactWidget {
    static readonly ID = AI_PANEL_WIDGET_ID;
    static readonly LABEL = 'AI Panel';

    @inject(MessageService)
    protected readonly messageService: MessageService;

    protected selectedModel: AIModel = AI_MODELS[0];
    protected messages: ChatMessage[] = [];
    protected inputValue: string = '';

    @postConstruct()
    protected init(): void {
        this.id = AIPanelWidget.ID;
        this.title.label = AIPanelWidget.LABEL;
        this.title.caption = AIPanelWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'codicon codicon-hubot';
        this.addClass('flexbe-ai-panel');
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div className="ai-panel-container">
                {/* Header with model selector */}
                <div className="ai-panel-header">
                    <select
                        className="ai-model-selector"
                        value={this.selectedModel.id}
                        onChange={(e) => this.handleModelChange(e.target.value)}
                    >
                        {AI_MODELS.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.name} ({model.provider})
                            </option>
                        ))}
                    </select>
                    <button
                        className="ai-panel-close"
                        onClick={() => this.hide()}
                    >
                        &times;
                    </button>
                </div>

                {/* Chat messages area */}
                <div className="ai-chat-messages">
                    {this.messages.length === 0 ? (
                        <div className="ai-chat-empty">
                            <span className="ai-chat-icon">🤖</span>
                            <p>Start a conversation with AI</p>
                        </div>
                    ) : (
                        this.messages.map(msg => (
                            <div key={msg.id} className={`ai-message ai-message-${msg.role}`}>
                                <div className="ai-message-content">{msg.content}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Quick commands */}
                <div className="ai-quick-commands">
                    {['/edit', '/run', '/workflow'].map(cmd => (
                        <button
                            key={cmd}
                            className="ai-quick-command"
                            onClick={() => this.insertQuickCommand(cmd)}
                        >
                            {cmd}
                        </button>
                    ))}
                </div>

                {/* Input area */}
                <div className="ai-chat-input-container">
                    <button className="ai-attach-button" title="Attach file">
                        📎
                    </button>
                    <input
                        type="text"
                        className="ai-chat-input"
                        placeholder="Ask AI..."
                        value={this.inputValue}
                        onChange={(e) => this.handleInputChange(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && this.sendMessage()}
                    />
                    <button
                        className="ai-send-button"
                        onClick={() => this.sendMessage()}
                    >
                        ➤
                    </button>
                </div>
            </div>
        );
    }

    protected handleModelChange(modelId: string): void {
        const model = AI_MODELS.find(m => m.id === modelId);
        if (model) {
            this.selectedModel = model;
            this.update();
        }
    }

    protected handleInputChange(value: string): void {
        this.inputValue = value;
        this.update();
    }

    protected insertQuickCommand(command: string): void {
        this.inputValue = command + ' ';
        this.update();
    }

    protected sendMessage(): void {
        if (!this.inputValue.trim()) return;

        // Add user message
        this.messages.push({
            id: Date.now().toString(),
            role: 'user',
            content: this.inputValue,
            timestamp: new Date(),
        });

        // TODO: Send to selected AI model via extension command
        // commandService.executeCommand(this.selectedModel.extensionCommand, this.inputValue);

        this.inputValue = '';
        this.update();
    }
}
```

### 5.3 Widget Contribution

**New File**: `custom-ui/src/frontend/ai-panel/ai-panel-contribution.ts`

```typescript
import { injectable, inject } from '@theia/core/shared/inversify';
import {
    AbstractViewContribution,
    FrontendApplication,
    FrontendApplicationContribution,
    Widget
} from '@theia/core/lib/browser';
import { Command, CommandRegistry, MenuModelRegistry } from '@theia/core/lib/common';
import { AIPanelWidget, AI_PANEL_WIDGET_ID } from './ai-panel-widget';

export const AI_PANEL_TOGGLE_COMMAND: Command = {
    id: 'flexbe.aiPanel.toggle',
    label: 'Toggle AI Panel'
};

@injectable()
export class AIPanelContribution extends AbstractViewContribution<AIPanelWidget>
    implements FrontendApplicationContribution {

    constructor() {
        super({
            widgetId: AI_PANEL_WIDGET_ID,
            widgetName: 'AI Panel',
            defaultWidgetOptions: {
                area: 'right',
                rank: 100
            },
            toggleCommandId: AI_PANEL_TOGGLE_COMMAND.id
        });
    }

    async initializeLayout(app: FrontendApplication): Promise<void> {
        // Open AI panel by default on the right
        await this.openView({ reveal: true });
    }

    registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);
        commands.registerCommand(AI_PANEL_TOGGLE_COMMAND, {
            execute: () => this.toggleView()
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        // No menu registration needed - menu bar is hidden
    }
}
```

### 5.4 Widget Factory

**New File**: `custom-ui/src/frontend/ai-panel/ai-panel-factory.ts`

```typescript
import { injectable, inject, interfaces } from '@theia/core/shared/inversify';
import { WidgetFactory } from '@theia/core/lib/browser';
import { AIPanelWidget, AI_PANEL_WIDGET_ID } from './ai-panel-widget';

@injectable()
export class AIPanelWidgetFactory implements WidgetFactory {
    readonly id = AI_PANEL_WIDGET_ID;

    @inject(AIPanelWidget)
    protected readonly widget: AIPanelWidget;

    createWidget(): AIPanelWidget {
        return this.widget;
    }
}

export function bindAIPanelWidget(bind: interfaces.Bind): void {
    bind(AIPanelWidget).toSelf().inSingletonScope();
    bind(WidgetFactory).to(AIPanelWidgetFactory).inSingletonScope();
}
```

### 5.5 AI Panel Styles

**New File**: `custom-ui/src/frontend/ai-panel/style/ai-panel.less`

```less
.flexbe-ai-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--flexbe-background, #ffffff);
}

.ai-panel-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 12px;
}

.ai-panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--flexbe-border, #e2e8f0);
}

.ai-model-selector {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--flexbe-border, #e2e8f0);
    border-radius: 6px;
    background: var(--flexbe-background, #ffffff);
    color: var(--flexbe-text-primary, #334155);
    font-size: 13px;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--flexbe-accent, #3b82f6);
    }
}

.ai-panel-close {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: var(--flexbe-text-secondary, #64748b);
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
    }
}

.ai-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
}

.ai-chat-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--flexbe-text-secondary, #64748b);

    .ai-chat-icon {
        font-size: 48px;
        margin-bottom: 12px;
    }
}

.ai-message {
    padding: 10px 14px;
    margin-bottom: 8px;
    border-radius: 8px;
    max-width: 85%;

    &.ai-message-user {
        background: var(--flexbe-accent, #3b82f6);
        color: white;
        margin-left: auto;
    }

    &.ai-message-assistant {
        background: var(--flexbe-sidebar-bg, #f8fafc);
        color: var(--flexbe-text-primary, #334155);
    }
}

.ai-quick-commands {
    display: flex;
    gap: 6px;
    padding: 8px 0;
}

.ai-quick-command {
    padding: 4px 10px;
    border: 1px solid var(--flexbe-border, #e2e8f0);
    border-radius: 4px;
    background: transparent;
    color: var(--flexbe-text-secondary, #64748b);
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
        color: var(--flexbe-text-primary, #334155);
    }
}

.ai-chat-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--flexbe-border, #e2e8f0);
}

.ai-attach-button {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
    }
}

.ai-chat-input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid var(--flexbe-border, #e2e8f0);
    border-radius: 8px;
    background: var(--flexbe-background, #ffffff);
    color: var(--flexbe-text-primary, #334155);
    font-size: 13px;

    &:focus {
        outline: none;
        border-color: var(--flexbe-accent, #3b82f6);
    }

    &::placeholder {
        color: var(--flexbe-text-secondary, #64748b);
    }
}

.ai-send-button {
    width: 36px;
    height: 36px;
    border: none;
    background: var(--flexbe-accent, #3b82f6);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        opacity: 0.9;
    }
}

// Right panel toggle button (when collapsed)
.theia-right-panel-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    background: var(--flexbe-sidebar-bg, #f8fafc);
    border-left: 1px solid var(--flexbe-border, #e2e8f0);
    cursor: pointer;
    writing-mode: vertical-rl;
    text-orientation: mixed;

    .toggle-icon {
        font-size: 20px;
        margin-bottom: 8px;
    }

    .toggle-text {
        font-size: 12px;
        color: var(--flexbe-text-secondary, #64748b);
    }

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
    }
}
```

### 5.6 Register AI Panel Module

**File**: `custom-ui/src/frontend/index.ts`

Add to the container module:
```typescript
import { bindAIPanelWidget } from '@/frontend/ai-panel/ai-panel-factory';
import { AIPanelContribution } from '@/frontend/ai-panel/ai-panel-contribution';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // ... existing bindings ...

    // AI Panel
    bindAIPanelWidget(bind);
    bind(AIPanelContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(AIPanelContribution);
});
```

---

## 6. Phase 3: Activity Bar & Integrations

### 6.1 Activity Bar Customization

The existing `SidePanelHandler` in [custom-ui/src/frontend/layout/side-panel-handler.ts](../custom-ui/src/frontend/layout/side-panel-handler.ts) already creates a horizontal layout for the activity bar. We need to:

1. **Filter out unwanted activity bar items**
2. **Add custom items** (Integrations, Settings)
3. **Style according to light theme**

**File**: `custom-ui/src/frontend/contribution-filters/filter-activity-bar.ts` (NEW)

```typescript
import { SearchInWorkspaceFrontendContribution } from '@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution';

// Keep only these view contributions in activity bar:
// - FileNavigatorContribution (Files)
// - SearchInWorkspaceFrontendContribution (Search)
// - Custom: IntegrationsContribution
// - Custom: SettingsContribution

// Filter out:
export const filterActivityBarContributions = [
    // Most view contributions will be filtered by existing filters
    // (debug, scm, test, problems, outline, etc.)
];
```

### 6.2 Integrations Panel Widget

**New File**: `custom-ui/src/frontend/integrations/integrations-widget.tsx`

```typescript
import * as React from 'react';
import { injectable, postConstruct } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';

export const INTEGRATIONS_WIDGET_ID = 'flexbe-integrations';

interface Integration {
    id: string;
    name: string;
    icon: string;
    connected: boolean;
    category: string;
}

interface Category {
    id: string;
    name: string;
    integrations: Integration[];
}

const MOCK_CONNECTED: Integration[] = [
    { id: 'google-calendar', name: 'Google Calendar', icon: '📅', connected: true, category: 'productivity' },
    { id: 'google-sheets', name: 'Google Sheets', icon: '📊', connected: true, category: 'productivity' },
    { id: 'slack', name: 'Slack', icon: '💬', connected: true, category: 'communication' },
];

const MOCK_CATEGORIES: Category[] = [
    {
        id: 'ai-ml',
        name: 'AI & Machine Learning',
        integrations: [
            { id: 'openai', name: 'OpenAI', icon: '🤖', connected: false, category: 'ai-ml' },
            { id: 'anthropic', name: 'Anthropic', icon: '🧠', connected: false, category: 'ai-ml' },
        ]
    },
    {
        id: 'crm',
        name: 'CRM',
        integrations: [
            { id: 'salesforce', name: 'Salesforce', icon: '☁️', connected: false, category: 'crm' },
            { id: 'hubspot', name: 'HubSpot', icon: '🔶', connected: false, category: 'crm' },
        ]
    },
    {
        id: 'communication',
        name: 'Communication',
        integrations: [
            { id: 'discord', name: 'Discord', icon: '🎮', connected: false, category: 'communication' },
            { id: 'teams', name: 'Microsoft Teams', icon: '👥', connected: false, category: 'communication' },
        ]
    },
];

@injectable()
export class IntegrationsWidget extends ReactWidget {
    static readonly ID = INTEGRATIONS_WIDGET_ID;
    static readonly LABEL = 'Integrations';

    protected expandedCategories: Set<string> = new Set();

    @postConstruct()
    protected init(): void {
        this.id = IntegrationsWidget.ID;
        this.title.label = IntegrationsWidget.LABEL;
        this.title.caption = IntegrationsWidget.LABEL;
        this.title.closable = false;
        this.title.iconClass = 'codicon codicon-plug';
        this.addClass('flexbe-integrations-panel');
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div className="integrations-container">
                {/* Connected Section */}
                <div className="integrations-section">
                    <h3 className="integrations-section-title">
                        Connected
                        <span className="integrations-count">{MOCK_CONNECTED.length}</span>
                    </h3>
                    <div className="integrations-list">
                        {MOCK_CONNECTED.map(integration => (
                            <div key={integration.id} className="integration-item connected">
                                <span className="integration-icon">{integration.icon}</span>
                                <span className="integration-name">{integration.name}</span>
                                <span className="integration-status connected">●</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Section */}
                <div className="integrations-section">
                    <h3 className="integrations-section-title">Available</h3>
                    {MOCK_CATEGORIES.map(category => (
                        <div key={category.id} className="integrations-category">
                            <div
                                className="category-header"
                                onClick={() => this.toggleCategory(category.id)}
                            >
                                <span className={`category-chevron ${this.expandedCategories.has(category.id) ? 'expanded' : ''}`}>
                                    ▶
                                </span>
                                <span className="category-name">{category.name}</span>
                                <span className="category-count">{category.integrations.length}</span>
                            </div>
                            {this.expandedCategories.has(category.id) && (
                                <div className="category-integrations">
                                    {category.integrations.map(integration => (
                                        <div key={integration.id} className="integration-item available">
                                            <span className="integration-icon">{integration.icon}</span>
                                            <span className="integration-name">{integration.name}</span>
                                            <button className="integration-connect">Connect</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    protected toggleCategory(categoryId: string): void {
        if (this.expandedCategories.has(categoryId)) {
            this.expandedCategories.delete(categoryId);
        } else {
            this.expandedCategories.add(categoryId);
        }
        this.update();
    }
}
```

### 6.3 Settings Panel

For the Settings tab, we can reuse Theia's built-in preferences widget but simplify it.

**File**: `custom-ui/src/frontend/settings/settings-contribution.ts` (NEW)

```typescript
import { injectable } from '@theia/core/shared/inversify';
import { AbstractViewContribution, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { CommonCommands } from '@theia/core/lib/browser';

@injectable()
export class SettingsContribution implements FrontendApplicationContribution {
    // Use existing Theia preferences widget
    // Just add it to the activity bar with simplified view

    async onStart(): Promise<void> {
        // Configure settings view for non-technical users
    }
}
```

### 6.4 Integrations Styles

**New File**: `custom-ui/src/frontend/integrations/style/integrations.less`

```less
.flexbe-integrations-panel {
    background: var(--flexbe-background, #ffffff);
}

.integrations-container {
    padding: 12px;
}

.integrations-section {
    margin-bottom: 20px;
}

.integrations-section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--flexbe-text-secondary, #64748b);
    margin-bottom: 8px;

    .integrations-count {
        background: var(--flexbe-hover, #f1f5f9);
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
    }
}

.integrations-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.integration-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
    }

    .integration-icon {
        font-size: 18px;
    }

    .integration-name {
        flex: 1;
        font-size: 13px;
        color: var(--flexbe-text-primary, #334155);
    }

    .integration-status {
        font-size: 8px;

        &.connected {
            color: #22c55e;
        }
    }

    .integration-connect {
        padding: 4px 10px;
        border: 1px solid var(--flexbe-border, #e2e8f0);
        border-radius: 4px;
        background: transparent;
        color: var(--flexbe-accent, #3b82f6);
        font-size: 11px;
        cursor: pointer;

        &:hover {
            background: var(--flexbe-accent, #3b82f6);
            color: white;
            border-color: var(--flexbe-accent, #3b82f6);
        }
    }
}

.integrations-category {
    margin-bottom: 4px;
}

.category-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
        background: var(--flexbe-hover, #f1f5f9);
    }

    .category-chevron {
        font-size: 8px;
        color: var(--flexbe-text-secondary, #64748b);
        transition: transform 0.2s;

        &.expanded {
            transform: rotate(90deg);
        }
    }

    .category-name {
        flex: 1;
        font-size: 13px;
        color: var(--flexbe-text-primary, #334155);
    }

    .category-count {
        font-size: 11px;
        color: var(--flexbe-text-secondary, #64748b);
    }
}

.category-integrations {
    padding-left: 20px;
}
```

---

## 7. Phase 4: Status Bar Simplification

### 7.1 Filter Status Bar Items

**New File**: `custom-ui/src/frontend/status-bar/status-bar-contribution.ts`

```typescript
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { StatusBar, StatusBarAlignment } from '@theia/core/lib/browser/status-bar';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

// Items to hide:
const ITEMS_TO_HIDE = [
    'editor-status-encoding',
    'editor-status-eol',
    'editor-status-language',
    'editor-status-cursor',
    'scm-status',
    'git-branch-status',
    'problems-status',
];

@injectable()
export class StatusBarSimplification implements FrontendApplicationContribution {
    @inject(StatusBar)
    protected readonly statusBar: StatusBar;

    @postConstruct()
    protected init(): void {
        // Hide technical status bar items
        this.hideItems();
    }

    async onStart(): Promise<void> {
        // Delay to ensure items are registered
        setTimeout(() => this.hideItems(), 1000);
    }

    protected hideItems(): void {
        ITEMS_TO_HIDE.forEach(itemId => {
            try {
                this.statusBar.removeElement(itemId);
            } catch {
                // Item might not exist yet
            }
        });

        // Add simplified items
        this.statusBar.setElement('flexbe-project', {
            text: '$(folder) Workspace',
            alignment: StatusBarAlignment.LEFT,
            priority: 1000
        });

        this.statusBar.setElement('flexbe-connection', {
            text: '$(cloud) Connected',
            alignment: StatusBarAlignment.RIGHT,
            priority: 1000
        });
    }
}
```

### 7.2 Status Bar Styles

**File**: `custom-ui/src/frontend/style/application-shell.less`

Add:
```less
// Simplified status bar
#theia-statusBar {
    background: var(--flexbe-sidebar-bg, #f8fafc) !important;
    border-top: 1px solid var(--flexbe-border, #e2e8f0);

    .element {
        font-size: 12px;
        color: var(--flexbe-text-secondary, #64748b);
    }
}
```

---

## 8. File Changes Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `custom-ui/src/frontend/style/light-theme.less` | Light theme CSS variables |
| `custom-ui/src/frontend/ai-panel/ai-panel-widget.tsx` | AI Panel React widget |
| `custom-ui/src/frontend/ai-panel/ai-panel-contribution.ts` | AI Panel view contribution |
| `custom-ui/src/frontend/ai-panel/ai-panel-factory.ts` | AI Panel widget factory |
| `custom-ui/src/frontend/ai-panel/style/ai-panel.less` | AI Panel styles |
| `custom-ui/src/frontend/integrations/integrations-widget.tsx` | Integrations panel widget |
| `custom-ui/src/frontend/integrations/integrations-contribution.ts` | Integrations view contribution |
| `custom-ui/src/frontend/integrations/style/integrations.less` | Integrations styles |
| `custom-ui/src/frontend/status-bar/status-bar-contribution.ts` | Status bar simplification |

### Files to Modify

| File | Changes |
|------|---------|
| `browser-app/package.json` | Update preferences for light theme, hide menu bar |
| `custom-ui/src/frontend/index.ts` | Register new modules and imports |
| `custom-ui/src/frontend/style/application-shell.less` | Add light theme overrides |
| `custom-ui/src/frontend/layout/application-shell.ts` | Enable right panel for AI |
| `custom-ui/src/frontend/contribution-filters/index.ts` | Add new filters |

---

## 9. Plugin Integration

### 9.1 AI Plugins (Open VSX)

Add to `package.json` theiaPlugins:

```json
{
  "theiaPlugins": {
    "Anthropic.claude-code": "https://open-vsx.org/api/Anthropic/claude-code/latest/file/Anthropic.claude-code.vsix",
    "Google.geminicodeassist": "https://open-vsx.org/api/Google/geminicodeassist/latest/file/Google.geminicodeassist.vsix",
    "openai.chatgpt": "https://open-vsx.org/api/openai/chatgpt/latest/file/openai.chatgpt.vsix"
  }
}
```

### 9.2 Composio Integration Plugin

The `composio-skills-0.1.0.vsix` should be placed in the `plugins/` directory:

```bash
cp composio-skills-0.1.0.vsix plugins/
```

The Integrations panel will communicate with this plugin via VS Code extension API.

---

## 10. Testing Strategy

### 10.1 Visual Testing

1. **Light theme consistency** - All panels match design colors
2. **Menu bar hidden** - No File/Edit/View menus visible
3. **Activity bar** - Shows only 4 items: Files, Integrations, Search, Settings
4. **AI Panel** - Opens on right, dropdown works, messages display
5. **Status bar** - Shows simplified info only

### 10.2 Functional Testing

1. **AI Panel toggle** - Panel opens/closes correctly
2. **Model selection** - Dropdown switches between AI models
3. **Quick commands** - /edit, /run, /workflow insert correctly
4. **Integrations expand** - Categories expand/collapse
5. **File navigation** - File tree works as expected

### 10.3 Build Testing

```bash
npm run clean
npm install
npm run build
npm run start
```

Verify at http://localhost:4000

---

## Appendix A: Color Reference

| Variable | Light Theme Value | Usage |
|----------|------------------|-------|
| `--flexbe-background` | `#ffffff` | Editor, panels |
| `--flexbe-sidebar-bg` | `#f8fafc` | Sidebars, tabs |
| `--flexbe-activity-bar-bg` | `#f1f5f9` | Activity bar |
| `--flexbe-accent` | `#3b82f6` | Active states, buttons |
| `--flexbe-text-primary` | `#334155` | Main text |
| `--flexbe-text-secondary` | `#64748b` | Secondary text |
| `--flexbe-border` | `#e2e8f0` | Borders, dividers |
| `--flexbe-hover` | `#f1f5f9` | Hover states |
| `--flexbe-active` | `#e2e8f0` | Active states |

---

## Appendix B: Component Hierarchy

```
TheiaApplicationShell
├── TopPanel (hidden - menu bar)
├── LeftPanelHandler
│   ├── HeaderPanel (Activity Bar - horizontal)
│   │   └── TabBar [Files, Integrations, Search, Settings]
│   ├── ToolBar (Widget title)
│   └── DockPanel
│       ├── FileNavigatorWidget (Files)
│       ├── IntegrationsWidget (Integrations)
│       ├── SearchInWorkspaceWidget (Search)
│       └── PreferencesWidget (Settings)
├── MainPanel
│   ├── TabBar (Editor tabs)
│   └── DockPanel (Editor content)
├── RightPanelHandler
│   └── AIPanelWidget
│       ├── ModelSelector (dropdown)
│       ├── ChatMessages
│       ├── QuickCommands
│       └── ChatInput
├── BottomPanel (hidden by default)
└── StatusBar (simplified)
```

---

**Document Prepared By**: Claude Code
**Last Updated**: 2026-01-04
