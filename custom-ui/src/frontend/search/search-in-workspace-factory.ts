import {
    ViewContainer
} from '@theia/core/lib/browser';
import { injectable, type interfaces } from '@theia/core/shared/inversify';
import { SEARCH_VIEW_CONTAINER_ID, SEARCH_VIEW_CONTAINER_TITLE_OPTIONS, SearchInWorkspaceFactory } from '@theia/search-in-workspace/lib/browser/search-in-workspace-factory';
import { SearchInWorkspaceWidget } from '@theia/search-in-workspace/lib/browser/search-in-workspace-widget';

export function initSearchWidget({ rebind }: { rebind: interfaces.Rebind }): void {
    rebind(SearchInWorkspaceFactory).to(CustomSearchInWorkspaceFactory).inSingletonScope();
}

@injectable()
export class CustomSearchInWorkspaceFactory extends SearchInWorkspaceFactory {
    async createWidget(): Promise<ViewContainer> {
        const viewContainer = this.viewContainerFactory({
            id: SEARCH_VIEW_CONTAINER_ID,
            progressLocationId: 'search',
        });

        viewContainer.setTitleOptions({
            ...SEARCH_VIEW_CONTAINER_TITLE_OPTIONS,
            closeable: false,
        });

        const widget = await this.widgetManager.getOrCreateWidget(SearchInWorkspaceWidget.ID);

        viewContainer.addWidget(widget, {
            ...this.searchWidgetOptions,
            canHide: false,
            initiallyCollapsed: false,
            disableDraggingToOtherContainers: true,
        });

        return viewContainer;
    }
}
