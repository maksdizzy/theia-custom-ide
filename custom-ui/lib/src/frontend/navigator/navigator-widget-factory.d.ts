import { type ViewContainer } from '@theia/core/lib/browser';
import { type interfaces } from '@theia/core/shared/inversify';
import { FileNavigatorWidget as TheiaFileNavigatorWidget, NavigatorWidgetFactory as TheiaNavigatorWidgetFactory } from '@theia/navigator/lib/browser';
export declare function initFileNavigator({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
/**
 * Remove open editors widget
 */
export declare class NavigatorWidgetFactory extends TheiaNavigatorWidgetFactory {
    protected fileNavigatorWidgetOptions: ViewContainer.Factory.WidgetOptions;
    createWidget(): Promise<ViewContainer>;
}
export declare class FileNavigatorWidget extends TheiaFileNavigatorWidget {
    protected doUpdateRows(): void;
}
//# sourceMappingURL=navigator-widget-factory.d.ts.map