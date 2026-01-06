import '@/frontend/style/side-panel.less';

import { Panel, SidePanel, SidePanelHandler as TheiaSidePanelHandler, type SideTabBar } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

/**
 * Custom side panel handler with toggle behavior for right panel only.
 * Left panel keeps standard Theia behavior (horizontal tabs, no toggle).
 * Right panel gets vertical icon bar with click-to-toggle functionality.
 */
@injectable()
export class SidePanelHandler extends TheiaSidePanelHandler {
    protected override createSideBar(): SideTabBar {
        const sideBar = super.createSideBar();

        // Don't allow to move icons
        sideBar.tabsMovable = false;

        return sideBar;
    }

    protected override createContainer(): Panel {
        const container = super.createContainer();

        // Only add toggle behavior for RIGHT panel (AI agents)
        if (this.side === 'right') {
            container.addClass('theia-custom-icon-bar');
            this.setupToggleBehavior();
        }

        return container;
    }

    /**
     * Setup click-to-toggle behavior for right panel.
     * Click on active icon collapses panel, click again expands it.
     */
    private setupToggleBehavior(): void {
        this.tabBar.node.addEventListener('click', (event) => {
            const tab = (event.target as HTMLElement).closest('.lm-TabBar-tab');
            if (!tab) return;

            const index = Array.from(this.tabBar.node.querySelectorAll('.lm-TabBar-tab')).indexOf(tab);
            const title = this.tabBar.titles[index];

            if (!title) return;

            // Toggle only on active tab click
            if (title === this.tabBar.currentTitle) {
                if (this.state.expansion === SidePanel.ExpansionState.expanded) {
                    // Collapse panel
                    super.collapse();
                } else {
                    // Expand panel - use expand() to properly set currentTitle
                    // This triggers onCurrentTabChanged -> refresh() -> CSS class update
                    this.expand(title.owner.id);
                }
                event.stopPropagation();
                event.preventDefault();
            }
            // Otherwise: click on inactive tab - base class handles activation
        });
    }
}
