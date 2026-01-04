import { ProcessManager } from '@theia/process/lib/node';
import { TerminalServer } from '@theia/terminal/lib/node/terminal-server';
import { AppClient, AppManager } from '../common/protocol';
export declare class AppManagerImpl implements AppManager {
    protected readonly terminalServer: TerminalServer;
    protected readonly processManager: ProcessManager;
    private client?;
    constructor(terminalServer: TerminalServer, processManager: ProcessManager);
    startApp(): Promise<void>;
    dispose(): void;
    setClient(client: AppClient): void;
}
//# sourceMappingURL=app.service.d.ts.map