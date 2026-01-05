import { injectable, inject } from '@theia/core/shared/inversify';
import {
    FrontendApplicationContribution,
    FrontendApplication,
    ApplicationShell,
    Widget
} from '@theia/core/lib/browser';
import { TabBarToolbarRegistry, TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { Command, CommandRegistry, CommandContribution } from '@theia/core/lib/common';

export namespace BottomPanelCommands {
    export const CLOSE_BOTTOM_PANEL: Command = {
        id: 'flexbe.bottomPanel.close',
        label: 'Close Bottom Panel',
        iconClass: 'codicon codicon-close'
    };
}

@injectable()
export class BottomPanelCloseContribution implements FrontendApplicationContribution, TabBarToolbarContribution, CommandContribution {

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    async onStart(_app: FrontendApplication): Promise<void> {
        // Nothing to do on start
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(BottomPanelCommands.CLOSE_BOTTOM_PANEL, {
            execute: () => this.closeBottomPanel(),
            isEnabled: () => this.isBottomPanelVisible(),
            isVisible: () => true
        });
    }

    registerToolbarItems(toolbar: TabBarToolbarRegistry): void {
        toolbar.registerItem({
            id: BottomPanelCommands.CLOSE_BOTTOM_PANEL.id,
            command: BottomPanelCommands.CLOSE_BOTTOM_PANEL.id,
            tooltip: 'Close Panel',
            priority: -1000, // Show at the end (rightmost)
            isVisible: (widget: Widget) => this.isInBottomPanel(widget),
            onDidChange: () => ({ dispose: () => {} }) // No-op disposable
        });
    }

    protected isInBottomPanel(widget: Widget | undefined): boolean {
        if (!widget || !widget.node) {
            return false;
        }
        return !!widget.node.closest('#theia-bottom-content-panel');
    }

    protected isBottomPanelVisible(): boolean {
        return this.shell.isExpanded('bottom');
    }

    protected closeBottomPanel(): void {
        this.shell.collapsePanel('bottom');
    }
}
