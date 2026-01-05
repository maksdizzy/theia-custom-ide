import { injectable, inject } from '@theia/core/shared/inversify';
import {
    AbstractViewContribution,
    FrontendApplication,
    FrontendApplicationContribution,
} from '@theia/core/lib/browser';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { Command, CommandRegistry } from '@theia/core/lib/common';
import { AIPanelWidget, AI_PANEL_WIDGET_ID } from './ai-panel-widget';

export namespace AIPanelCommands {
    export const TOGGLE: Command = {
        id: 'flexbe.aiPanel.toggle',
        label: 'Toggle AI Panel',
    };

    export const CLEAR: Command = {
        id: 'flexbe.aiPanel.clear',
        label: 'Clear AI Chat',
    };
}

@injectable()
export class AIPanelContribution extends AbstractViewContribution<AIPanelWidget>
    implements FrontendApplicationContribution {

    @inject(ContextKeyService)
    protected readonly contextKeyService: ContextKeyService;

    constructor() {
        super({
            widgetId: AI_PANEL_WIDGET_ID,
            widgetName: 'AI Panel',
            defaultWidgetOptions: {
                area: 'right',
                rank: 100,
            },
            toggleCommandId: AIPanelCommands.TOGGLE.id,
        });
    }

    async initializeLayout(app: FrontendApplication): Promise<void> {
        // Set Claude context to make its view visible
        // The extension package.json is modified to use 'right' container directly
        this.contextKeyService.setContext('claude-code:sidebarVisible', true);

        // Open AI panel by default on the right side
        await this.openView({ reveal: true });
    }

    registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);

        commands.registerCommand(AIPanelCommands.TOGGLE, {
            execute: () => this.toggleView(),
        });

        commands.registerCommand(AIPanelCommands.CLEAR, {
            execute: async () => {
                const widget = await this.widget;
                widget.clearMessages();
            },
            isEnabled: () => true,
        });
    }
}
