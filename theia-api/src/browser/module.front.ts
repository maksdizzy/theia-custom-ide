import { FrontendApplicationContribution, RemoteConnectionProvider, ServiceConnectionProvider } from '@theia/core/lib/browser';
import { CommandContribution } from '@theia/core/lib/common/command';
import { ContainerModule } from '@theia/core/shared/inversify';

import { OutputChannelManager, OutputChannelSeverity } from '@theia/output/lib/browser/output-channel';

import { AppCommandContribution } from './app.command';
import { AppFrontContribution } from './app.front';
import { APP_MANAGER_PATH, AppClient, AppManager } from '../common/protocol';

export default new ContainerModule((bind) => {
    bind(FrontendApplicationContribution).to(AppFrontContribution).inSingletonScope();
    bind(CommandContribution).to(AppCommandContribution).inSingletonScope();
    bind(ServiceConnectionProvider).toSelf().inSingletonScope();

    bind(AppManager).toDynamicValue((ctx) => {
        const connection = ctx.container.get<ServiceConnectionProvider>(RemoteConnectionProvider);
        const outputChannelManager = ctx.container.get(OutputChannelManager);
        const client: AppClient = {
            error: (message) => {
                const channel = outputChannelManager.getChannel('App');

                channel.appendLine(message, OutputChannelSeverity.Error);
            },
            log: (message) => {
                const channel = outputChannelManager.getChannel('App');

                channel.appendLine(message, OutputChannelSeverity.Info);
            },
        };

        return connection.createProxy<AppManager>(APP_MANAGER_PATH, client);
    }).inSingletonScope();
});
