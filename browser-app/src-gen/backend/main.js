// @ts-check
const { BackendApplicationConfigProvider } = require('@theia/core/lib/node/backend-application-config-provider');
const main = require('@theia/core/lib/node/main');

BackendApplicationConfigProvider.set({
    "singleInstance": true,
    "frontendConnectionTimeout": 3000,
    "configurationFolder": ".theia-ide",
    "warnOnPotentiallyInsecureHostPattern": false,
    "startupTimeout": -1,
    "resolveSystemPlugins": false
});

globalThis.extensionInfo = [
    {
        "name": "@theia/core",
        "version": "1.62.2"
    },
    {
        "name": "@theia/variable-resolver",
        "version": "1.62.2"
    },
    {
        "name": "@theia/editor",
        "version": "1.62.2"
    },
    {
        "name": "@theia/filesystem",
        "version": "1.62.2"
    },
    {
        "name": "@theia/workspace",
        "version": "1.62.2"
    },
    {
        "name": "@theia/markers",
        "version": "1.62.2"
    },
    {
        "name": "@theia/messages",
        "version": "1.62.2"
    },
    {
        "name": "@theia/outline-view",
        "version": "1.62.2"
    },
    {
        "name": "@theia/monaco",
        "version": "1.62.2"
    },
    {
        "name": "@theia/navigator",
        "version": "1.62.2"
    },
    {
        "name": "@theia/userstorage",
        "version": "1.62.2"
    },
    {
        "name": "@theia/preferences",
        "version": "1.62.2"
    },
    {
        "name": "@theia/process",
        "version": "1.62.2"
    },
    {
        "name": "@theia/file-search",
        "version": "1.62.2"
    },
    {
        "name": "@theia/terminal",
        "version": "1.62.2"
    },
    {
        "name": "@theia/bulk-edit",
        "version": "1.62.2"
    },
    {
        "name": "@theia/callhierarchy",
        "version": "1.62.2"
    },
    {
        "name": "@theia/console",
        "version": "1.62.2"
    },
    {
        "name": "@theia/output",
        "version": "1.62.2"
    },
    {
        "name": "@theia/task",
        "version": "1.62.2"
    },
    {
        "name": "@theia/test",
        "version": "1.62.2"
    },
    {
        "name": "@theia/debug",
        "version": "1.62.2"
    },
    {
        "name": "@theia/editor-preview",
        "version": "1.62.2"
    },
    {
        "name": "@theia/notebook",
        "version": "1.62.2"
    },
    {
        "name": "@theia/scm",
        "version": "1.62.2"
    },
    {
        "name": "@theia/search-in-workspace",
        "version": "1.62.2"
    },
    {
        "name": "@theia/timeline",
        "version": "1.62.2"
    },
    {
        "name": "@theia/typehierarchy",
        "version": "1.62.2"
    },
    {
        "name": "@theia/plugin-ext",
        "version": "1.62.2"
    },
    {
        "name": "@theia/plugin-ext-vscode",
        "version": "1.62.2"
    },
    {
        "name": "@flexbe/custom-ui",
        "version": "0.0.0"
    }
];

const serverModule = require('./server');
const serverAddress = main.start(serverModule());

serverAddress.then((addressInfo) => {
    if (process && process.send && addressInfo) {
        process.send(addressInfo);
    }
});

globalThis.serverAddress = serverAddress;
