import { WebsocketEndpoint as TheiaWebsocketEndpoint } from '@theia/core/lib/node/messaging/websocket-endpoint';
import { ContainerModule } from '@theia/core/shared/inversify';

import { WebsocketEndpoint } from './websocket-endpoint';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TheiaWebsocketEndpoint).to(WebsocketEndpoint).inSingletonScope();
});
