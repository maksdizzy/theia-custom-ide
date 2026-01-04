import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { inject, injectable } from '@theia/core/shared/inversify';

import { AppManager } from '../common/protocol';

const StartAppCommand: Command = {
    id: 'startApp.command',
    label: 'Start App',
};

@injectable()
export class AppCommandContribution implements CommandContribution {
    constructor(
        @inject(AppManager) protected readonly appManager: AppManager
    ) {}

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(StartAppCommand, {
            execute: async() => this.appManager.startApp(),
        });
    }
}
