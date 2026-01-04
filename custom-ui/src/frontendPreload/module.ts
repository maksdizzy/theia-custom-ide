import { WebSocketConnectionSource as TheiaWebSocketConnectionSource } from '@theia/core/lib/browser/messaging/ws-connection-source';
import { ContainerModule } from '@theia/core/shared/inversify';

import { WebSocketConnectionSource } from './ws-connection-source';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TheiaWebSocketConnectionSource).to(WebSocketConnectionSource).inSingletonScope();
});
