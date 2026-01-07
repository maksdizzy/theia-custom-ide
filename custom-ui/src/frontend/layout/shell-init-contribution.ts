import {
    DefaultFrontendApplicationContribution
} from '@theia/core/lib/browser';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { CommandService } from '@theia/core/lib/common';
import { inject, injectable } from '@theia/core/shared/inversify';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
import { OutputContribution } from '@theia/output/lib/browser/output-contribution';
import { SearchInWorkspaceFrontendContribution } from '@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution';

@injectable()
export class ShellInitContribution extends DefaultFrontendApplicationContribution {
    @inject(FileNavigatorContribution)
    protected readonly navigatorContribution: FileNavigatorContribution;

    @inject(SearchInWorkspaceFrontendContribution)
    protected readonly searchContribution: SearchInWorkspaceFrontendContribution;

    @inject(OutputContribution)
    protected readonly outputContribution: OutputContribution;

    @inject(FrontendApplicationStateService)
    protected readonly appStateService: FrontendApplicationStateService;

    @inject(CommandService)
    protected readonly commandService: CommandService;

    async onDidInitializeLayout(): Promise<void> {
        await this.openDefaultLayout();
    }

    async onStart(): Promise<void> {
        this.appStateService.onStateChanged((state) => {
            if (state === 'ready') {
                document.body.classList.add('theia-app-ready');
            }
        });
    }

    /**
     * Open default layout on theia load
     */
    protected async openDefaultLayout(): Promise<void> {
        // Force activate files + search + output (bottom)
        await this.navigatorContribution.openView({
            area: 'left',
            reveal: true,
            rank: 100,
        });

        await this.searchContribution.openView({
            area: 'left',
            reveal: false,
            rank: 200,
        });

        // Reveal output widget
        void this.outputContribution.openView({
            area: 'bottom',
            reveal: true,
        });

        // Auto-open Claude Code in right sidebar after plugins are loaded
        this.openClaudeCodePanel();
    }

    /**
     * Opens AI Panel in right sidebar.
     * Uses timeout to wait for plugin system to initialize.
     */
    protected openClaudeCodePanel(): void {
        setTimeout(async () => {
            try {
                // Open AI Panel container which will discover and show AI widgets
                await this.commandService.executeCommand('ai-panel.reveal-claude');
            } catch {
                // AI Panel not available, ignore silently
            }
        }, 1500);
    }
}
