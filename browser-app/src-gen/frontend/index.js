// @ts-check
require('reflect-metadata');
const { Container } = require('@theia/core/shared/inversify');
const { FrontendApplicationConfigProvider } = require('@theia/core/lib/browser/frontend-application-config-provider');

FrontendApplicationConfigProvider.set({
    "applicationName": "Flexbe IDE",
    "defaultTheme": {
        "light": "light",
        "dark": "dark"
    },
    "defaultIconTheme": "theia-file-icons",
    "electron": {
        "windowOptions": {},
        "showWindowEarly": true,
        "splashScreenOptions": {},
        "uriScheme": "theia"
    },
    "defaultLocale": "",
    "validatePreferencesSchema": true,
    "reloadOnReconnect": true,
    "uriScheme": "theia",
    "preferences": {
        "toolbar.showToolbar": false,
        "breadcrumbs.enabled": false,
        "window.menuBarVisibility": "compact",
        "files.enableTrash": true,
        "security.workspace.trust.enabled": false,
        "application.confirmExit": "always",
        "terminal.integrated.confirmOnExit": "always",
        "files.insertFinalNewline": true,
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true,
        "problems.decorations.tabbar.enabled": false,
        "editor.minimap.enabled": false,
        "editor.renderWhitespace": "all",
        "files.exclude": {
            "**/.git": true,
            "**/.svn": true,
            "**/.hg": true,
            "**/CVS": true,
            "**/.DS_Store": true,
            "**/vscode": true,
            "**/node_modules": true
        },
        "workbench.statusBar.visible": true,
        "editor.bracketPairColorization.enabled": true,
        "editor.bracketPairColorization.independentColorPoolPerBracketType": false,
        "editor.codeActionWidget.showHeaders": true,
        "editor.codeLens": false,
        "editor.colorDecoratorsActivatedOn": "click",
        "editor.colorDecoratorsLimit": 20,
        "editor.definitionLinkOpensInPeek": false,
        "editor.dragAndDrop": false,
        "editor.glyphMargin": false,
        "editor.gotoLocation.alternativeDeclarationCommand": "editor.action.goToReferences",
        "editor.gotoLocation.alternativeImplementationCommand": "editor.action.goToTypeDefinition",
        "editor.gotoLocation.alternativeReferenceCommand": "editor.action.goToImplementation",
        "editor.gotoLocation.multipleDeclarations": "goto",
        "editor.gotoLocation.multipleDefinitions": "goto",
        "editor.gotoLocation.multipleReferences": "goto",
        "editor.gotoLocation.multipleTypeDefinitions": "goto",
        "editor.guides.bracketPairs": false,
        "editor.guides.bracketPairsHorizontal": "active",
        "editor.guides.highlightActiveBracketPair": true,
        "editor.guides.indentation": false,
        "editor.hideCursorInOverviewRuler": false,
        "editor.history.persistClosedEditors": true,
        "editor.hover.above": true,
        "editor.hover.hidingDelay": 150,
        "editor.inlayHints.enabled": "on",
        "editor.inlayHints.padding": false,
        "editor.lightbulb.enabled": "off",
        "editor.lineNumbers": "on",
        "editor.linkedEditing": true,
        "editor.pasteAs.showPasteSelector": "never",
        "editor.renderLineHighlight": "line",
        "editor.renderLineHighlightOnlyWhenFocus": false,
        "editor.roundedSelection": true,
        "editor.screenReaderAnnounceInlineSuggestion": false,
        "editor.scrollbar.horizontalScrollbarSize": 10,
        "editor.scrollbar.verticalScrollbarSize": 10,
        "editor.scrollbar.ignoreHorizontalScrollbarInContentHeight": false,
        "editor.scrollBeyondLastLine": false,
        "editor.scrollPredominantAxis": true,
        "editor.selectionHighlight": true,
        "editor.showFoldingControls": "mouseover",
        "editor.smartSelect.selectLeadingAndTrailingWhitespace": true,
        "editor.smartSelect.selectSubwords": true,
        "editor.smoothScrolling": false,
        "editor.stickyScroll.defaultModel": "foldingProviderModel",
        "editor.stickyScroll.maxLineCount": 2,
        "editor.tabCompletion": "onlySnippets",
        "editor.tabFocusMode": false,
        "editor.unfoldOnClickAfterEndOfLine": true,
        "editor.unusualLineTerminators": "auto",
        "editor.cursorBlinking": "smooth",
        "editor.cursorSmoothCaretAnimation": "off",
        "editor.find.addExtraSpaceOnTop": true,
        "editor.fontSize": 13,
        "editor.suggest.showStatusBar": false,
        "workbench.commandPalette.history": 10,
        "workbench.silentNotifications": true,
        "workbench.tab.maximize": false,
        "workbench.tab.shrinkToFit.enabled": false,
        "workbench.colorTheme": "One Dark Pro Night Flat",
        "workbench.iconTheme": "material-icon-theme",
        "workbench.tree.indent": 13,
        "workbench.tree.renderIndentGuides": "none",
        "workbench.editor.closeOnFileDelete": true,
        "workbench.editor.decorations.badges": false,
        "workbench.editor.highlightModifiedTabs": false,
        "window.secondaryWindowAlwaysOnTop": true,
        "window.secondaryWindowPlacement": "halfWidth",
        "window.tabbar.enhancedPreview": "classic",
        "window.title": "Flexbe - ${activeEditorShort}",
        "window.titleSeparator": " - ",
        "debug.confirmOnExit": "always",
        "debug.disassemblyView.showSourceCode": false,
        "debug.internalConsoleOptions": "neverOpen",
        "debug.openDebug": "neverOpen",
        "debug.showInStatusBar": "never",
        "explorer.autoReveal": true,
        "explorer.decorations.colors": false,
        "problems.decorations.enabled": false,
        "search.collapseResults": "alwaysExpand",
        "search.smartCase": true,
        "security.workspace.trust.startupPrompt": "never",
        "astro.content-intellisense": true,
        "javascript.experimental.updateImportsOnPaste": true
    }
});


self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        return './editor.worker.js';
    }
}

function load(container, jsModule) {
    return Promise.resolve(jsModule)
        .then(containerModule => container.load(containerModule.default));
}

async function preload(container) {
    try {
        await load(container, require('@theia/core/lib/browser/preload/preload-module'));
        await load(container, require('@flexbe/custom-ui/lib/frontendPreload/index.js'));
        const { Preloader } = require('@theia/core/lib/browser/preload/preloader');
        const preloader = container.get(Preloader);
        await preloader.initialize();
    } catch (reason) {
        console.error('Failed to run preload scripts.');
        if (reason) {
            console.error(reason);
        }
    }
}

module.exports = (async () => {
    const { messagingFrontendModule } = require('@theia/core/lib/browser/messaging/messaging-frontend-module');
    const container = new Container();
    container.load(messagingFrontendModule);
    

    await preload(container);

    
    const { MonacoInit } = require('@theia/monaco/lib/browser/monaco-init');
    ;

    const { FrontendApplication } = require('@theia/core/lib/browser');
    const { frontendApplicationModule } = require('@theia/core/lib/browser/frontend-application-module');    
    const { loggerFrontendModule } = require('@theia/core/lib/browser/logger-frontend-module');

    container.load(frontendApplicationModule);
    undefined
    
    container.load(loggerFrontendModule);
    

    try {
        await load(container, require('@theia/core/lib/browser/i18n/i18n-frontend-module'));
        await load(container, require('@theia/core/lib/browser/menu/browser-menu-module'));
        await load(container, require('@theia/core/lib/browser/window/browser-window-module'));
        await load(container, require('@theia/core/lib/browser/keyboard/browser-keyboard-module'));
        await load(container, require('@theia/core/lib/browser/request/browser-request-module'));
        await load(container, require('@theia/variable-resolver/lib/browser/variable-resolver-frontend-module'));
        await load(container, require('@theia/editor/lib/browser/editor-frontend-module'));
        await load(container, require('@theia/filesystem/lib/browser/filesystem-frontend-module'));
        await load(container, require('@theia/filesystem/lib/browser/download/file-download-frontend-module'));
        await load(container, require('@theia/filesystem/lib/browser/file-dialog/file-dialog-module'));
        await load(container, require('@theia/workspace/lib/browser/workspace-frontend-module'));
        await load(container, require('@theia/markers/lib/browser/problem/problem-frontend-module'));
        await load(container, require('@theia/messages/lib/browser/messages-frontend-module'));
        await load(container, require('@theia/outline-view/lib/browser/outline-view-frontend-module'));
        await load(container, require('@theia/monaco/lib/browser/monaco-frontend-module'));
        await load(container, require('@theia/navigator/lib/browser/navigator-frontend-module'));
        await load(container, require('@theia/userstorage/lib/browser/user-storage-frontend-module'));
        await load(container, require('@theia/preferences/lib/browser/preference-frontend-module'));
        await load(container, require('@theia/process/lib/common/process-common-module'));
        await load(container, require('@theia/file-search/lib/browser/file-search-frontend-module'));
        await load(container, require('@theia/terminal/lib/browser/terminal-frontend-module'));
        await load(container, require('@theia/bulk-edit/lib/browser/bulk-edit-frontend-module'));
        await load(container, require('@theia/callhierarchy/lib/browser/callhierarchy-frontend-module'));
        await load(container, require('@theia/console/lib/browser/console-frontend-module'));
        await load(container, require('@theia/output/lib/browser/output-frontend-module'));
        await load(container, require('@theia/task/lib/browser/task-frontend-module'));
        await load(container, require('@theia/test/lib/browser/view/test-view-frontend-module'));
        await load(container, require('@theia/debug/lib/browser/debug-frontend-module'));
        await load(container, require('@theia/editor-preview/lib/browser/editor-preview-frontend-module'));
        await load(container, require('@theia/notebook/lib/browser/notebook-frontend-module'));
        await load(container, require('@theia/scm/lib/browser/scm-frontend-module'));
        await load(container, require('@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-module'));
        await load(container, require('@theia/timeline/lib/browser/timeline-frontend-module'));
        await load(container, require('@theia/typehierarchy/lib/browser/typehierarchy-frontend-module'));
        await load(container, require('@theia/plugin-ext/lib/plugin-ext-frontend-module'));
        await load(container, require('@theia/plugin-ext-vscode/lib/browser/plugin-vscode-frontend-module'));
        await load(container, require('@flexbe/custom-ui/lib/frontend/index.js'));
        
        MonacoInit.init(container);
        ;
        await start();
    } catch (reason) {
        console.error('Failed to start the frontend application.');
        if (reason) {
            console.error(reason);
        }
    }

    function start() {
        (window['theia'] = window['theia'] || {}).container = container;
        return container.get(FrontendApplication).start();
    }
})();
