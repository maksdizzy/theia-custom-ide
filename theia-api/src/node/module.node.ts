import { ConnectionHandler, RpcConnectionHandler } from '@theia/core';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { ContainerModule } from '@theia/core/shared/inversify';
import { TerminalServer } from '@theia/terminal/lib/node/terminal-server';

import { AppManagerImpl } from './app.service';
import { APP_MANAGER_PATH, AppClient, AppManager } from '../common/protocol';

export default new ContainerModule((bind) => {
    // Bind TerminalServer
    bind(TerminalServer).toSelf().inSingletonScope();

    // ProcessControl
    bind(BackendApplicationContribution).to(AppManagerImpl).inSingletonScope();

    bind(AppManager).to(AppManagerImpl).inSingletonScope();
    // Communication between backend and frontend
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler<AppClient>(APP_MANAGER_PATH, (client) => {
            const appServer = ctx.container.get<AppManagerImpl>(AppManager);

            appServer.setClient(client);

            return appServer;
        })
    ).inSingletonScope();
});
