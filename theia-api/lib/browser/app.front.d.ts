import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { OutputChannelManager } from '@theia/output/lib/browser/output-channel';
export declare class AppFrontContribution implements FrontendApplicationContribution {
    protected readonly outputChannelManager: OutputChannelManager;
    private outputChannel;
    constructor(outputChannelManager: OutputChannelManager);
    onStart(): void;
    private initializeOutputChannel;
    output(message: string): void;
}
//# sourceMappingURL=app.front.d.ts.map