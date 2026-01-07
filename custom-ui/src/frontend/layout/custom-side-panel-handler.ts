import '@/frontend/style/ai-panel.less';

import { Panel, SidePanelHandler as TheiaSidePanelHandler, type SideTabBar } from '@theia/core/lib/browser';
import { inject, injectable, optional } from '@theia/core/shared/inversify';
import { AIPanelToggleHandler } from '../ai-panel/ai-panel-toggle-handler';

/**
 * Custom side panel handler that integrates AIPanelToggleHandler for right panel.
 * Clean implementation following Theia best practices:
 * - No RAF nesting
 * - No race conditions
 * - No prototype patching
 * - Uses ApplicationShell APIs directly
 */
@injectable()
export class CustomSidePanelHandler extends TheiaSidePanelHandler {
    @inject(AIPanelToggleHandler) @optional()
    protected readonly toggleHandler?: AIPanelToggleHandler;

    protected override createSideBar(): SideTabBar {
        const sideBar = super.createSideBar();

        // Disable tab dragging for cleaner UX
        sideBar.tabsMovable = false;

        return sideBar;
    }

    protected override createContainer(): Panel {
        const container = super.createContainer();

        // Add toggle behavior only for RIGHT panel (AI assistants)
        if (this.side === 'right' && this.toggleHandler) {
            container.addClass('theia-ai-panel');
            this.setupToggleBehavior();
        }

        return container;
    }

    /**
     * Setup VS Code-style toggle behavior for right panel.
     * Delegates logic to AIPanelToggleHandler for clean separation.
     */
    private setupToggleBehavior(): void {
        if (!this.toggleHandler) {
            return;
        }

        this.tabBar.node.addEventListener('click', (event) => {
            const tab = (event.target as HTMLElement).closest('.lm-TabBar-tab');
            if (!tab) {
                return;
            }

            // Stop event propagation to prevent Theia's default handling
            event.stopPropagation();
            event.preventDefault();

            const index = Array.from(this.tabBar.node.querySelectorAll('.lm-TabBar-tab')).indexOf(tab);
            const title = this.tabBar.titles[index];

            if (!title || !title.owner) {
                return;
            }

            // Delegate toggle logic to handler
            if (this.toggleHandler && title.owner) {
                this.toggleHandler.handleIconClick(title.owner.id).catch(error => {
                    console.error('[CustomSidePanelHandler] Toggle failed:', error);
                });
            }
        }, { capture: true });
    }
}
