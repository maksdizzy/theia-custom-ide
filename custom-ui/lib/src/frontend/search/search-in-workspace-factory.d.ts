import { ViewContainer } from '@theia/core/lib/browser';
import { type interfaces } from '@theia/core/shared/inversify';
import { SearchInWorkspaceFactory } from '@theia/search-in-workspace/lib/browser/search-in-workspace-factory';
export declare function initSearchWidget({ rebind }: {
    rebind: interfaces.Rebind;
}): void;
export declare class CustomSearchInWorkspaceFactory extends SearchInWorkspaceFactory {
    createWidget(): Promise<ViewContainer>;
}
//# sourceMappingURL=search-in-workspace-factory.d.ts.map