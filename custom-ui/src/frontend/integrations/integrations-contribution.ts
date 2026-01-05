import { injectable } from '@theia/core/shared/inversify';
import {
    AbstractViewContribution,
    FrontendApplicationContribution,
} from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common';
import { IntegrationsWidget, INTEGRATIONS_WIDGET_ID } from './integrations-widget';

export namespace IntegrationsCommands {
    export const TOGGLE: Command = {
        id: 'flexbe.integrations.toggle',
        label: 'Toggle Integrations Panel',
    };

    export const REFRESH: Command = {
        id: 'flexbe.integrations.refresh',
        label: 'Refresh Integrations',
    };
}

@injectable()
export class IntegrationsContribution extends AbstractViewContribution<IntegrationsWidget>
    implements FrontendApplicationContribution {

    constructor() {
        super({
            widgetId: INTEGRATIONS_WIDGET_ID,
            widgetName: 'Integrations',
            defaultWidgetOptions: {
                area: 'left',
                rank: 200,
            },
            toggleCommandId: IntegrationsCommands.TOGGLE.id,
        });
    }

    async onStart(): Promise<void> {
        // Integrations panel is available but not opened by default
        // User can open it via the activity bar
    }

    registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);

        commands.registerCommand(IntegrationsCommands.TOGGLE, {
            execute: () => this.toggleView(),
        });

        commands.registerCommand(IntegrationsCommands.REFRESH, {
            execute: async () => {
                // TODO: Refresh integrations from Composio
                const widget = await this.widget;
                widget.update();
            },
        });
    }
}
