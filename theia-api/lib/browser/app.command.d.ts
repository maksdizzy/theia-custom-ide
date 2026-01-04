import { CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { AppManager } from '../common/protocol';
export declare class AppCommandContribution implements CommandContribution {
    protected readonly appManager: AppManager;
    constructor(appManager: AppManager);
    registerCommands(registry: CommandRegistry): void;
}
//# sourceMappingURL=app.command.d.ts.map