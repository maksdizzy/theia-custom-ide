import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { OutputChannelManager } from '@theia/output/lib/browser/output-channel';

@injectable()
export class AppFrontContribution implements FrontendApplicationContribution {
    private outputChannel: any;

    constructor(
        @inject(OutputChannelManager) protected readonly outputChannelManager: OutputChannelManager
    ) {}

    onStart(): void {
        console.log('\n\n', 'flexbe-api', 'onStart()');
        this.initializeOutputChannel();
    }

    private initializeOutputChannel(): void {
        this.outputChannel = this.outputChannelManager.getChannel('App');
        this.outputChannel.clear();
        this.outputChannel.show();

        this.outputChannel.appendLine('Starting App');

        // Subscribe to backend messages
        // this.appService.greet().then((message) => {
        //     this.outputChannel.appendLine(message);
        // }).catch((error) => {
        //     this.outputChannel.appendLine(`Error: ${ error }`);
        // });
    }

    public output(message: string): void {
        this.outputChannel.appendLine(message);
    }
}
