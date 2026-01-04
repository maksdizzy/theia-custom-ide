import { WebsocketEndpoint as TheiaWebsocketEndpoint } from '@theia/core/lib/node/messaging/websocket-endpoint';
import * as http from 'http';
import * as https from 'https';
export declare class WebsocketEndpoint extends TheiaWebsocketEndpoint {
    onStart(server: http.Server | https.Server): void;
}
//# sourceMappingURL=websocket-endpoint.d.ts.map