import { RpcServer } from '@theia/core/lib/common/messaging';
export declare const AppManager: unique symbol;
export declare const APP_MANAGER_PATH = "/services/app-manager";
export interface AppManager extends RpcServer<AppClient> {
    startApp: () => Promise<void>;
}
export interface AppClient {
    log: (message: string) => void;
    error: (message: string) => void;
}
//# sourceMappingURL=protocol.d.ts.map