import { injectable, inject } from '@theia/core/shared/inversify';
import {
    FrontendApplicationContribution,
    WidgetFactory,
} from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common';
import { AIPanelViewContainer } from './ai-panel-view-container';
import { AIPanelToggleHandler } from './ai-panel-toggle-handler';

export namespace AIPanelCommands {
    export const TOGGLE: Command = {
        id: 'ai-panel.toggle',
        label: 'Toggle AI Panel',
    };

    export const REVEAL_CLAUDE: Command = {
        id: 'ai-panel.reveal-claude',
        label: 'Open Claude Code',
    };

    export const REVEAL_GEMINI: Command = {
        id: 'ai-panel.reveal-gemini',
        label: 'Open Gemini Code Assist',
    };

    export const REVEAL_CHATGPT: Command = {
        id: 'ai-panel.reveal-chatgpt',
        label: 'Open ChatGPT',
    };

    export const REVEAL_COMPOSIO: Command = {
        id: 'ai-panel.reveal-composio',
        label: 'Open Composio Skills',
    };
}

/**
 * Contribution for AI Panel in the right sidebar.
 *
 * Responsibilities:
 * - Register AI Panel ViewContainer
 * - Register commands for revealing specific AI widgets
 * - Initialize panel on application startup
 */
@injectable()
export class AIPanelContribution implements FrontendApplicationContribution {
    @inject(AIPanelToggleHandler)
    protected readonly toggleHandler: AIPanelToggleHandler;

    /**
     * Called during application initialization.
     * Sets up widget factory for AI Panel container.
     */
    onStart(): void {
        // Widget factory is registered via DI binding
        // Panel will be opened by ShellInitContribution
    }

    /**
     * Registers commands for AI panel operations.
     */
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(AIPanelCommands.TOGGLE, {
            execute: async () => {
                const activeWidgetId = this.toggleHandler.getActiveWidgetId();
                if (activeWidgetId) {
                    await this.toggleHandler.handleIconClick(activeWidgetId);
                }
            },
        });

        // Command to reveal Claude Code
        commands.registerCommand(AIPanelCommands.REVEAL_CLAUDE, {
            execute: async () => {
                await this.toggleHandler.handleIconClick('claude-sidebar');
            },
        });

        // Command to reveal Gemini Code Assist
        commands.registerCommand(AIPanelCommands.REVEAL_GEMINI, {
            execute: async () => {
                await this.toggleHandler.handleIconClick('geminicodeassist-panel');
            },
        });

        // Command to reveal ChatGPT
        commands.registerCommand(AIPanelCommands.REVEAL_CHATGPT, {
            execute: async () => {
                await this.toggleHandler.handleIconClick('chatgpt-view');
            },
        });

        // Command to reveal Composio Skills
        commands.registerCommand(AIPanelCommands.REVEAL_COMPOSIO, {
            execute: async () => {
                await this.toggleHandler.handleIconClick('composioSkills.skillsWebviewView');
            },
        });
    }
}

/**
 * Factory function for creating AIPanelViewContainer instances.
 */
export const AIPanelViewContainerFactory: WidgetFactory = {
    id: AIPanelViewContainer.ID,
    createWidget: () => {
        throw new Error('AIPanelViewContainer must be created via DI container');
    },
};
