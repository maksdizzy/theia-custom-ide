import { WebsocketEndpoint as TheiaWebsocketEndpoint } from '@theia/core/lib/node/messaging/websocket-endpoint';
import { injectable } from '@theia/core/shared/inversify';
import * as http from 'http';
import * as https from 'https';
import { Server, Socket } from 'socket.io';

@injectable()
export class WebsocketEndpoint extends TheiaWebsocketEndpoint {
    // Add cors for any origin
    onStart(server: http.Server | https.Server): void {
        const socketServer = new Server(server, {
            pingInterval: this.checkAliveTimeout,
            pingTimeout: this.checkAliveTimeout * 2,
            maxHttpBufferSize: this.maxHttpBufferSize,
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });

        // Accept every namespace by using /.*/
        socketServer.of(/.*/).on('connection', async(socket: Socket) => {
            const request = socket.request;

            // Socket.io strips the `origin` header of the incoming request
            // We provide a `fix-origin` header in the `WebSocketConnectionProvider`
            request.headers.origin = request.headers['fix-origin'] as string;

            if (await this.allowConnect(socket.request)) {
                await this.handleConnection(socket);
                void this.messagingListener.onDidWebSocketUpgrade(socket.request, socket);
            }
            else {
                socket.disconnect(true);
            }
        });
    }
}
