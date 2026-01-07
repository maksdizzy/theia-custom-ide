import { ApplicationShell } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';

/**
 * Handles VS Code-style toggle behavior for the AI panel.
 *
 * Toggle logic:
 * - Click on currently active icon → toggle panel (expand/collapse)
 * - Click on different icon → switch widget (keep panel open)
 */
@injectable()
export class AIPanelToggleHandler {
    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    private lastActiveWidgetId: string | undefined;

    /**
     * Handles icon click in the right panel activity bar.
     * Implements VS Code-style toggle behavior.
     *
     * @param widgetId The ID of the clicked widget
     */
    async handleIconClick(widgetId: string): Promise<void> {
        const isCurrentlyActive = this.lastActiveWidgetId === widgetId;
        const isPanelExpanded = this.shell.isExpanded('right');

        if (isCurrentlyActive && isPanelExpanded) {
            // Clicking active icon: toggle panel off
            await this.shell.collapsePanel('right');
        } else {
            // Clicking different icon or panel collapsed: activate widget and expand
            await this.shell.activateWidget(widgetId);
            this.shell.expandPanel('right');
            this.lastActiveWidgetId = widgetId;
        }
    }

    /**
     * Tracks widget activation from other sources (keyboard shortcuts, commands, etc.)
     * Ensures lastActiveWidgetId stays synchronized with panel state.
     *
     * @param widgetId The ID of the activated widget
     */
    handleWidgetActivated(widgetId: string): void {
        if (this.isRightPanelWidget(widgetId)) {
            this.lastActiveWidgetId = widgetId;
        }
    }

    /**
     * Checks if a widget belongs to the right panel.
     *
     * @param widgetId The widget ID to check
     * @returns True if widget is in right panel
     */
    private isRightPanelWidget(widgetId: string): boolean {
        const widget = this.shell.getWidgetById(widgetId);
        return widget !== undefined && this.shell.getAreaFor(widget) === 'right';
    }

    /**
     * Gets the currently active widget ID in the right panel.
     *
     * @returns The active widget ID or undefined
     */
    getActiveWidgetId(): string | undefined {
        return this.lastActiveWidgetId;
    }

    /**
     * Resets the toggle handler state.
     * Useful for testing or panel reinitialization.
     */
    reset(): void {
        this.lastActiveWidgetId = undefined;
    }
}
