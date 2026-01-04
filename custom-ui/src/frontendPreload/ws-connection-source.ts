import { Endpoint } from '@theia/core/lib/browser';
import { WebSocketConnectionSource as TheiaWebSocketConnectionSource } from '@theia/core/lib/browser/messaging/ws-connection-source';
import { injectable } from '@theia/core/shared/inversify';
// import { Socket, io } from 'socket.io-client';

@injectable()
export class WebSocketConnectionSource extends TheiaWebSocketConnectionSource {
    override createEndpoint(path: string): Endpoint {
        return new Endpoint({
            path,
            // host: 'localhost:3000',
        });
    }
}
