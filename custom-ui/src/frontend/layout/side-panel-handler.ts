import '@/frontend/style/side-panel.less';

import { Panel, SidePanel, SidePanelHandler as TheiaSidePanelHandler, type SideTabBar } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

/**
 * Move side panel to top
 */
@injectable()
export class SidePanelHandler extends TheiaSidePanelHandler {
    protected override createSideBar(): SideTabBar {
        const sideBar = super.createSideBar();

        // Dont allow to move icons
        sideBar.tabsMovable = false;

        return sideBar;
    }

    protected override createContainer(): Panel {
        const container = super.createContainer();

        // Add class for custom styles
        container.addClass('theia-custom-icon-bar');

        // Add toggle logic
        this.tabBar.node.addEventListener('click', (event) => {
            const tab = (event.target as HTMLElement).closest('.lm-TabBar-tab');
            if (!tab) return;

            const index = Array.from(this.tabBar.node.querySelectorAll('.lm-TabBar-tab')).indexOf(tab);
            const title = this.tabBar.titles[index];

            if (!title) return;

            // If clicked on already active tab
            if (title === this.tabBar.currentTitle) {
                // Toggle panel visibility
                if (this.state.expansion === SidePanel.ExpansionState.expanded) {
                    // Collapse panel
                    super.collapse();
                } else {
                    // Expand panel
                    this.refresh();
                }
                event.stopPropagation();
                event.preventDefault();
            }
            // Otherwise: click on inactive tab - base class handles activation
        });

        return container;
    }
}
