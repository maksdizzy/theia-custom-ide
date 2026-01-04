import '@/frontend/style/application-shell.less';
import { ApplicationShell as TheiaApplicationShell, type Layout } from '@theia/core/lib/browser';
import { TheiaDockPanel } from '@theia/core/lib/browser/shell/theia-dock-panel';
import { type interfaces } from '@theia/core/shared/inversify';
export declare function initApplicationShell({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
export declare class ApplicationShell extends TheiaApplicationShell {
    protected init(): void;
    getInsertionOptions(options?: TheiaApplicationShell.WidgetOptions): {
        area: string;
        addOptions: TheiaDockPanel.AddOptions;
    };
    handleEvent(event: Event): void;
    /**
     * Restrict dragging from/to bottom panel
     */
    protected restrictDragging(): void;
    /**
     * Create a custom layout for the application shell
     */
    protected createLayout(): Layout;
}
//# sourceMappingURL=application-shell.d.ts.map