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
exports.AppFrontContribution = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const output_channel_1 = require("@theia/output/lib/browser/output-channel");
let AppFrontContribution = class AppFrontContribution {
    outputChannelManager;
    outputChannel;
    constructor(outputChannelManager) {
        this.outputChannelManager = outputChannelManager;
    }
    onStart() {
        console.log('\n\n', 'flexbe-api', 'onStart()');
        this.initializeOutputChannel();
    }
    initializeOutputChannel() {
        this.outputChannel = this.outputChannelManager.getChannel('App');
        this.outputChannel.clear();
        this.outputChannel.show();
        this.outputChannel.appendLine('Starting App');
        // Subscribe to backend messages
        // this.appService.greet().then((message) => {
        //     this.outputChannel.appendLine(message);
        // }).catch((error) => {
        //     this.outputChannel.appendLine(`Error: ${ error }`);
        // });
    }
    output(message) {
        this.outputChannel.appendLine(message);
    }
};
exports.AppFrontContribution = AppFrontContribution;
exports.AppFrontContribution = AppFrontContribution = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(output_channel_1.OutputChannelManager)),
    __metadata("design:paramtypes", [output_channel_1.OutputChannelManager])
], AppFrontContribution);
//# sourceMappingURL=app.front.js.map