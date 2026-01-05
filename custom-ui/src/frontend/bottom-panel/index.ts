import { interfaces } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { CommandContribution } from '@theia/core/lib/common';
import { BottomPanelCloseContribution } from './bottom-panel-close-contribution';

export function bindBottomPanelClose(bind: interfaces.Bind): void {
    bind(BottomPanelCloseContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(BottomPanelCloseContribution);
    bind(TabBarToolbarContribution).toService(BottomPanelCloseContribution);
    bind(CommandContribution).toService(BottomPanelCloseContribution);
}
