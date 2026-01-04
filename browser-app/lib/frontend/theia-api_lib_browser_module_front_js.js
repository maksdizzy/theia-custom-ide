"use strict";
(self["webpackChunkbrowser_app"] = self["webpackChunkbrowser_app"] || []).push([["theia-api_lib_browser_module_front_js"],{

/***/ "../theia-api/lib/browser/app.command.js":
/*!***********************************************!*\
  !*** ../theia-api/lib/browser/app.command.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppCommandContribution = void 0;
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../theia-api/lib/common/protocol.js");
const StartAppCommand = {
    id: 'startApp.command',
    label: 'Start App',
};
let AppCommandContribution = class AppCommandContribution {
    appManager;
    constructor(appManager) {
        this.appManager = appManager;
    }
    registerCommands(registry) {
        registry.registerCommand(StartAppCommand, {
            execute: async () => this.appManager.startApp(),
        });
    }
};
exports.AppCommandContribution = AppCommandContribution;
exports.AppCommandContribution = AppCommandContribution = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(protocol_1.AppManager)),
    __metadata("design:paramtypes", [Object])
], AppCommandContribution);


/***/ }),

/***/ "../theia-api/lib/browser/app.front.js":
/*!*********************************************!*\
  !*** ../theia-api/lib/browser/app.front.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFrontContribution = void 0;
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");
const output_channel_1 = __webpack_require__(/*! @theia/output/lib/browser/output-channel */ "../node_modules/@theia/output/lib/browser/output-channel.js");
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


/***/ }),

/***/ "../theia-api/lib/browser/module.front.js":
/*!************************************************!*\
  !*** ../theia-api/lib/browser/module.front.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js");
const command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "../node_modules/@theia/core/lib/common/command.js");
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");
const output_channel_1 = __webpack_require__(/*! @theia/output/lib/browser/output-channel */ "../node_modules/@theia/output/lib/browser/output-channel.js");
const app_command_1 = __webpack_require__(/*! ./app.command */ "../theia-api/lib/browser/app.command.js");
const app_front_1 = __webpack_require__(/*! ./app.front */ "../theia-api/lib/browser/app.front.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../theia-api/lib/common/protocol.js");
exports["default"] = new inversify_1.ContainerModule((bind) => {
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


/***/ }),

/***/ "../theia-api/lib/common/protocol.js":
/*!*******************************************!*\
  !*** ../theia-api/lib/common/protocol.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_MANAGER_PATH = exports.AppManager = void 0;
exports.AppManager = Symbol('AppManager');
exports.APP_MANAGER_PATH = '/services/app-manager';


/***/ })

}]);
//# sourceMappingURL=theia-api_lib_browser_module_front_js.js.map