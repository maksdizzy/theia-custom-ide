/* eslint-disable ts/no-redeclare */
import { RpcServer } from '@theia/core/lib/common/messaging';

export const AppManager = Symbol('AppManager');
export const APP_MANAGER_PATH = '/services/app-manager';

export interface AppManager extends RpcServer<AppClient> {
    startApp: () => Promise<void>;
}

export interface AppClient {
    log: (message: string) => void;
    error: (message: string) => void;
}
