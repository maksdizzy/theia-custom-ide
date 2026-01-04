import { inject, injectable } from '@theia/core/shared/inversify';

import { ProcessManager, TerminalProcess } from '@theia/process/lib/node';
import { TerminalServer } from '@theia/terminal/lib/node/terminal-server';

import { AppClient, AppManager } from '../common/protocol';

@injectable()
export class AppManagerImpl implements AppManager {
    private client?: AppClient;

    constructor(
        @inject(TerminalServer) protected readonly terminalServer: TerminalServer,
        @inject(ProcessManager) protected readonly processManager: ProcessManager
    ) {}

    // Optional: spawn when backend starts
    // initialize(): void {
    //     void this.runApp();
    // }

    async startApp(): Promise<void> {
        console.log('\n\n', 'flexbe-api', 'startApp()');

        const pid = await this.terminalServer.create({
            command: 'npm',
            args: ['run', 'dev'],
            options: {
                cwd: '/Users/vit/flexbe/dev-sandbox/demo-app',
            },
        });

        console.log('\n\n', 'pid', pid);

        const termProcess = this.processManager.get(pid);

        if (termProcess instanceof TerminalProcess) {
            const output = termProcess.createOutputStream();

            output.on('data', (chunk: Buffer) => {
                // outputChannel.appendLine(chunk.toString());
                console.log('\n\n', 'flexbe-api', 'output', chunk.toString());
                this.client?.log(chunk.toString());
            });
            output.on('end', () => {
                // outputChannel.appendLine('Process output stream ended');
                console.log('\n\n', 'flexbe-api', 'output', 'Process output stream ended');
                this.client?.log('Process output stream ended');
            });
            output.on('error', (err) => {
                // outputChannel.appendLine(`Process output stream error: ${ err.message }`);
                console.log('\n\n', 'flexbe-api', 'output', `Process output stream error: ${ err.message }`);
                this.client?.log(`Process output stream error: ${ err.message }`);
            });
        }

        setInterval(async() => {
            console.log('\n\n', 'flexbe-api', 'sending message to client');
            this.client?.log('Log from backend');
        }, 1000);
    }

    dispose(): void {
        // do nothing
    }

    setClient(client: AppClient): void {
        this.client = client;
    }
}
