import type { TabBarToolbarRegistry } from "@theia/core/lib/browser/shell/tab-bar-toolbar";
import { type interfaces } from "@theia/core/shared/inversify";
import { OutputToolbarContribution as TheiaOutputToolbarContribution } from "@theia/output/lib/browser/output-toolbar-contribution";
import { OutputWidget as TheiaOutputWidget } from '@theia/output/lib/browser/output-widget';
export declare function initOutputContribution({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
export declare class OutputWidget extends TheiaOutputWidget {
    protected _state: TheiaOutputWidget.State;
    constructor();
}
export declare class OutputToolbarContribution extends TheiaOutputToolbarContribution {
    registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): void;
}
//# sourceMappingURL=output-toolbar-contribution.d.ts.map