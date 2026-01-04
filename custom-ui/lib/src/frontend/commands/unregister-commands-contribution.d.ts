import { CommandContribution, MenuContribution, type CommandRegistry, type MenuModelRegistry } from '@theia/core/lib/common';
import { type interfaces } from '@theia/core/shared/inversify';
export declare class UnregisterCommandsContribution implements CommandContribution, MenuContribution {
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
}
export declare function unregisterCommands({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
//# sourceMappingURL=unregister-commands-contribution.d.ts.map