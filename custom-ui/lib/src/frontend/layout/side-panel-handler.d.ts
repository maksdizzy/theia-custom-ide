import '@/frontend/style/side-panel.less';
import { Panel, SidePanelHandler as TheiaSidePanelHandler, type SideTabBar } from '@theia/core/lib/browser';
/**
 * Move side panel to top
 */
export declare class SidePanelHandler extends TheiaSidePanelHandler {
    protected createSideBar(): SideTabBar;
    protected createContainer(): Panel;
    collapse(): Promise<void>;
}
//# sourceMappingURL=side-panel-handler.d.ts.map