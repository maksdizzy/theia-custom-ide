import { DefaultFrontendApplicationContribution } from '@theia/core/lib/browser';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
import { OutputContribution } from '@theia/output/lib/browser/output-contribution';
import { SearchInWorkspaceFrontendContribution } from '@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution';
export declare class ShellInitContribution extends DefaultFrontendApplicationContribution {
    protected readonly navigatorContribution: FileNavigatorContribution;
    protected readonly searchContribution: SearchInWorkspaceFrontendContribution;
    protected readonly outputContribution: OutputContribution;
    protected readonly appStateService: FrontendApplicationStateService;
    onDidInitializeLayout(): Promise<void>;
    onStart(): Promise<void>;
    /**
     * Open default layout on theia load
     */
    protected openDefaultLayout(): Promise<void>;
}
//# sourceMappingURL=shell-init-contribution.d.ts.map