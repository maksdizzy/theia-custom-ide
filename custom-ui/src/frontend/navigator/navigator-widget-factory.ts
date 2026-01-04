import { WidgetFactory, type ViewContainer } from '@theia/core/lib/browser';
import { nls } from '@theia/core/lib/common/nls';
import { injectable, type interfaces } from '@theia/core/shared/inversify';
import { createFileTreeContainer } from '@theia/filesystem/lib/browser';
import { EXPLORER_VIEW_CONTAINER_ID, EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS, FILE_NAVIGATOR_ID, FileNavigatorModel, FileNavigatorWidget as TheiaFileNavigatorWidget, NavigatorDecoratorService, NavigatorWidgetFactory as TheiaNavigatorWidgetFactory } from '@theia/navigator/lib/browser';

import { FILE_NAVIGATOR_PROPS } from '@theia/navigator/lib/browser/navigator-container';
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree';

export function initFileNavigator({ bind, rebind }: { bind: interfaces.Bind; rebind: interfaces.Rebind }): void {
    // EXPLORER: Rebind Navigation factory to remove open editors widget
    rebind(TheiaNavigatorWidgetFactory).to(NavigatorWidgetFactory).inSingletonScope();

    // EXPLORER: Patched files widget
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: FILE_NAVIGATOR_ID,
        createWidget: () => {
            return createFileTreeContainer(container, {
                tree: FileNavigatorTree,
                model: FileNavigatorModel,
                widget: FileNavigatorWidget,
                decoratorService: NavigatorDecoratorService,
                props: FILE_NAVIGATOR_PROPS,
            }).get(FileNavigatorWidget);
        },
    })).inSingletonScope();
}

/**
 * Remove open editors widget
 */
@injectable()
export class NavigatorWidgetFactory extends TheiaNavigatorWidgetFactory {
    protected fileNavigatorWidgetOptions: ViewContainer.Factory.WidgetOptions = {
        order: 0,
        canHide: false,
        initiallyCollapsed: false,
        weight: 120,
        disableDraggingToOtherContainers: true,
    };

    override async createWidget(): Promise<ViewContainer> {
        const viewContainer = this.viewContainerFactory({
            id: EXPLORER_VIEW_CONTAINER_ID,
            progressLocationId: 'explorer',
        });

        viewContainer.setTitleOptions({
            ...EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS,
            label: '',
            closeable: false,
        });

        const navigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID);

        viewContainer.addWidget(navigatorWidget, this.fileNavigatorWidgetOptions);

        // NOTE Removed open editors widget
        // const openEditorsWidget = await this.widgetManager.getOrCreateWidget(OpenEditorsWidget.ID);
        // viewContainer.addWidget(openEditorsWidget, this.openEditorsWidgetOptions);

        return viewContainer;
    }
}

@injectable()
export class FileNavigatorWidget extends TheiaFileNavigatorWidget {
    protected override doUpdateRows(): void {
        super.doUpdateRows();

        this.title.label = nls.localizeByDefault('Files');
    }
}
