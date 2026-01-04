"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("@theia/core/lib/browser");
const command_1 = require("@theia/core/lib/common/command");
const inversify_1 = require("@theia/core/shared/inversify");
const output_channel_1 = require("@theia/output/lib/browser/output-channel");
const app_command_1 = require("./app.command");
const app_front_1 = require("./app.front");
const protocol_1 = require("../common/protocol");
exports.default = new inversify_1.ContainerModule((bind) => {
    bind(browser_1.FrontendApplicationContribution).to(app_front_1.AppFrontContribution).inSingletonScope();
    bind(command_1.CommandContribution).to(app_command_1.AppCommandContribution).inSingletonScope();
    bind(browser_1.ServiceConnectionProvider).toSelf().inSingletonScope();
    bind(protocol_1.AppManager).toDynamicValue((ctx) => {
        const connection = ctx.container.get(browser_1.RemoteConnectionProvider);
        const outputChannelManager = ctx.container.get(output_channel_1.OutputChannelManager);
        const client = {
            error: (message) => {
                const channel = outputChannelManager.getChannel('App');
                channel.appendLine(message, output_channel_1.OutputChannelSeverity.Error);
            },
            log: (message) => {
                const channel = outputChannelManager.getChannel('App');
                channel.appendLine(message, output_channel_1.OutputChannelSeverity.Info);
            },
        };
        return connection.createProxy(protocol_1.APP_MANAGER_PATH, client);
    }).inSingletonScope();
});
//# sourceMappingURL=module.front.js.map