"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@theia/core");
const node_1 = require("@theia/core/lib/node");
const inversify_1 = require("@theia/core/shared/inversify");
const terminal_server_1 = require("@theia/terminal/lib/node/terminal-server");
const app_service_1 = require("./app.service");
const protocol_1 = require("../common/protocol");
exports.default = new inversify_1.ContainerModule((bind) => {
    // Bind TerminalServer
    bind(terminal_server_1.TerminalServer).toSelf().inSingletonScope();
    // ProcessControl
    bind(node_1.BackendApplicationContribution).to(app_service_1.AppManagerImpl).inSingletonScope();
    bind(protocol_1.AppManager).to(app_service_1.AppManagerImpl).inSingletonScope();
    // Communication between backend and frontend
    bind(core_1.ConnectionHandler).toDynamicValue(ctx => new core_1.RpcConnectionHandler(protocol_1.APP_MANAGER_PATH, (client) => {
        const appServer = ctx.container.get(protocol_1.AppManager);
        appServer.setClient(client);
        return appServer;
    })).inSingletonScope();
});
//# sourceMappingURL=module.node.js.map