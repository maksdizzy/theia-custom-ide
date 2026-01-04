import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { type interfaces } from '@theia/core/shared/inversify';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
import { OutputContribution } from '@theia/output/lib/browser/output-contribution';
import { SearchInWorkspaceFrontendContribution } from '@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution';
import { ApplicationShell } from '../layout/application-shell';
export declare const SHOW_EXPLORER_COMMAND: Command;
export declare const SHOW_SEARCH_COMMAND: Command;
export declare const TOGGLE_OUTPUT_COMMAND: Command;
export declare class FlexbeUiCommandContribution implements CommandContribution {
    protected readonly shell: ApplicationShell;
    protected readonly messageService: MessageService;
    protected readonly fileNavigatorContribution: FileNavigatorContribution;
    protected readonly searchInWorkspaceFrontendContribution: SearchInWorkspaceFrontendContribution;
    protected readonly outputContribution: OutputContribution;
    registerCommands(commands: CommandRegistry): void;
}
export declare class FlexbeUiMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void;
}
export declare function registerCommands({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
//# sourceMappingURL=register-command-contribution.d.ts.map