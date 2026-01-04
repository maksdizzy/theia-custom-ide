"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppManagerImpl = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const node_1 = require("@theia/process/lib/node");
const terminal_server_1 = require("@theia/terminal/lib/node/terminal-server");
let AppManagerImpl = class AppManagerImpl {
    terminalServer;
    processManager;
    client;
    constructor(terminalServer, processManager) {
        this.terminalServer = terminalServer;
        this.processManager = processManager;
    }
    // Optional: spawn when backend starts
    // initialize(): void {
    //     void this.runApp();
    // }
    async startApp() {
        console.log('\n\n', 'flexbe-api', 'startApp()');
        const pid = await this.terminalServer.create({
            command: 'npm',
            args: ['run', 'dev'],
            options: {
                cwd: '/Users/vit/flexbe/dev-sandbox/demo-app',
            },
        });
        console.log('\n\n', 'pid', pid);
        const termProcess = this.processManager.get(pid);
        if (termProcess instanceof node_1.TerminalProcess) {
            const output = termProcess.createOutputStream();
            output.on('data', (chunk) => {
                // outputChannel.appendLine(chunk.toString());
                console.log('\n\n', 'flexbe-api', 'output', chunk.toString());
                this.client?.log(chunk.toString());
            });
            output.on('end', () => {
                // outputChannel.appendLine('Process output stream ended');
                console.log('\n\n', 'flexbe-api', 'output', 'Process output stream ended');
                this.client?.log('Process output stream ended');
            });
            output.on('error', (err) => {
                // outputChannel.appendLine(`Process output stream error: ${ err.message }`);
                console.log('\n\n', 'flexbe-api', 'output', `Process output stream error: ${err.message}`);
                this.client?.log(`Process output stream error: ${err.message}`);
            });
        }
        setInterval(async () => {
            console.log('\n\n', 'flexbe-api', 'sending message to client');
            this.client?.log('Log from backend');
        }, 1000);
    }
    dispose() {
        // do nothing
    }
    setClient(client) {
        this.client = client;
    }
};
exports.AppManagerImpl = AppManagerImpl;
exports.AppManagerImpl = AppManagerImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(terminal_server_1.TerminalServer)),
    __param(1, (0, inversify_1.inject)(node_1.ProcessManager)),
    __metadata("design:paramtypes", [terminal_server_1.TerminalServer,
        node_1.ProcessManager])
], AppManagerImpl);
//# sourceMappingURL=app.service.js.map