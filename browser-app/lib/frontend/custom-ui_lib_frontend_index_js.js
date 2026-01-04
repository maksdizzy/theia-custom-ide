"use strict";
(self["webpackChunkbrowser_app"] = self["webpackChunkbrowser_app"] || []).push([["custom-ui_lib_frontend_index_js"],{

/***/ "../custom-ui/lib/frontend/commands/command-spy.js":
/*!*********************************************************!*\
  !*** ../custom-ui/lib/frontend/commands/command-spy.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");var m=Object.getOwnPropertyDescriptor,s=(t,e,r,n)=>{for(var o=n>1?void 0:n?m(e,r):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(o=a(o)||o);return o};exports.CommandSpyContribution=class{registerCommands(e){const r=e.executeCommand.bind(e);e.executeCommand=async(n,...o)=>(console.log("[FLEXBE-UI] Command executed: %c%s%c with args:","color: #1976d2; font-weight: bold;",n,"",o),r(n,...o))}};exports.CommandSpyContribution=s([c.injectable()],exports.CommandSpyContribution);


/***/ }),

/***/ "../custom-ui/lib/frontend/commands/index.js":
/*!***************************************************!*\
  !*** ../custom-ui/lib/frontend/commands/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/core/lib/common/command */ "../node_modules/@theia/core/lib/common/command.js"),e=__webpack_require__(/*! ./command-spy.js */ "../custom-ui/lib/frontend/commands/command-spy.js"),i=__webpack_require__(/*! ./register-command-contribution.js */ "../custom-ui/lib/frontend/commands/register-command-contribution.js"),r=__webpack_require__(/*! ./unregister-commands-contribution.js */ "../custom-ui/lib/frontend/commands/unregister-commands-contribution.js");function m({bind:n,rebind:o}){r.unregisterCommands({bind:n,rebind:o}),i.registerCommands({bind:n,rebind:o}),n(t.CommandContribution).to(e.CommandSpyContribution).inSingletonScope()}exports.initCommands=m;


/***/ }),

/***/ "../custom-ui/lib/frontend/commands/register-command-contribution.js":
/*!***************************************************************************!*\
  !*** ../custom-ui/lib/frontend/commands/register-command-contribution.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),i=__webpack_require__(/*! @theia/core/lib/common */ "../node_modules/@theia/core/lib/common/index.js"),r=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),d=__webpack_require__(/*! @theia/editor/lib/browser */ "../node_modules/@theia/editor/lib/browser/index.js"),p=__webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "../node_modules/@theia/navigator/lib/browser/navigator-contribution.js"),E=__webpack_require__(/*! @theia/output/lib/browser/output-contribution */ "../node_modules/@theia/output/lib/browser/output-contribution.js"),_=__webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution */ "../node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js"),M=__webpack_require__(/*! @theia/terminal/lib/browser/terminal-frontend-contribution */ "../node_modules/@theia/terminal/lib/browser/terminal-frontend-contribution.js"),I=__webpack_require__(/*! @theia/workspace/lib/browser */ "../node_modules/@theia/workspace/lib/browser/index.js");var O=Object.defineProperty,g=Object.getOwnPropertyDescriptor,a=(n,e,C,m)=>{for(var t=m>1?void 0:m?g(e,C):e,s=n.length-1,b;s>=0;s--)(b=n[s])&&(t=(m?b(e,C,t):b(t))||t);return m&&t&&O(e,C,t),t};const u=i.Command.toLocalizedCommand({id:"fileNavigator:activate",label:"Files"}),l=i.Command.toLocalizedCommand({id:"searchInWorkspace:activate",label:"Search"}),c=i.Command.toLocalizedCommand({id:"output:toggle",label:"Toggle Output"});exports.FlexbeUiCommandContribution=class{shell;messageService;fileNavigatorContribution;searchInWorkspaceFrontendContribution;outputContribution;registerCommands(e){e.registerCommand(u,{execute:async()=>this.fileNavigatorContribution.openView({activate:!0,reveal:!0})}),e.registerCommand(l,{execute:async()=>this.searchInWorkspaceFrontendContribution.openView({activate:!0,reveal:!0})}),e.registerCommand(o.CommonCommands.NEW_UNTITLED_TEXT_FILE,{execute:()=>null})}};a([r.inject(o.ApplicationShell)],exports.FlexbeUiCommandContribution.prototype,"shell",2);a([r.inject(i.MessageService)],exports.FlexbeUiCommandContribution.prototype,"messageService",2);a([r.inject(p.FileNavigatorContribution)],exports.FlexbeUiCommandContribution.prototype,"fileNavigatorContribution",2);a([r.inject(_.SearchInWorkspaceFrontendContribution)],exports.FlexbeUiCommandContribution.prototype,"searchInWorkspaceFrontendContribution",2);a([r.inject(E.OutputContribution)],exports.FlexbeUiCommandContribution.prototype,"outputContribution",2);exports.FlexbeUiCommandContribution=a([r.injectable()],exports.FlexbeUiCommandContribution);exports.FlexbeUiMenuContribution=class{registerMenus(e){e.registerSubmenu(o.CommonMenus.VIEW,i.nls.localizeByDefault("View")),e.registerMenuAction(o.CommonMenus.FILE_NEW_TEXT,{commandId:I.WorkspaceCommands.NEW_FILE.id,order:"a"}),e.registerMenuAction(o.CommonMenus.VIEW_VIEWS,{commandId:u.id,label:u.label,order:"a"}),e.registerMenuAction(o.CommonMenus.VIEW_VIEWS,{commandId:l.id,label:l.label,order:"b"}),e.registerMenuAction(o.CommonMenus.VIEW_VIEWS,{commandId:c.id,label:c.label,order:"c"}),e.registerMenuAction(o.CommonMenus.VIEW_VIEWS,{commandId:M.TerminalCommands.TOGGLE_TERMINAL.id,label:M.TerminalCommands.TOGGLE_TERMINAL.label,order:"d"}),e.registerMenuAction(o.CommonMenus.VIEW_LAYOUT,{commandId:d.EditorCommands.SPLIT_EDITOR_HORIZONTAL.id,label:d.EditorCommands.SPLIT_EDITOR_HORIZONTAL.label})}};exports.FlexbeUiMenuContribution=a([r.injectable()],exports.FlexbeUiMenuContribution);function T({bind:n,rebind:e}){n(i.CommandContribution).to(exports.FlexbeUiCommandContribution).inSingletonScope(),n(i.MenuContribution).to(exports.FlexbeUiMenuContribution).inSingletonScope()}exports.SHOW_EXPLORER_COMMAND=u;exports.SHOW_SEARCH_COMMAND=l;exports.TOGGLE_OUTPUT_COMMAND=c;exports.registerCommands=T;


/***/ }),

/***/ "../custom-ui/lib/frontend/commands/unregister-commands-contribution.js":
/*!******************************************************************************!*\
  !*** ../custom-ui/lib/frontend/commands/unregister-commands-contribution.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),g=__webpack_require__(/*! @theia/core/lib/common */ "../node_modules/@theia/core/lib/common/index.js"),T=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),r=__webpack_require__(/*! @theia/editor/lib/browser */ "../node_modules/@theia/editor/lib/browser/index.js"),L=__webpack_require__(/*! @theia/filesystem/lib/browser/download/file-download-command-contribution */ "../node_modules/@theia/filesystem/lib/browser/download/file-download-command-contribution.js"),i=__webpack_require__(/*! @theia/monaco/lib/browser/monaco-menu */ "../node_modules/@theia/monaco/lib/browser/monaco-menu.js"),E=__webpack_require__(/*! @theia/navigator/lib/browser/file-navigator-commands */ "../node_modules/@theia/navigator/lib/browser/file-navigator-commands.js"),s=__webpack_require__(/*! @theia/navigator/lib/browser/open-editors-widget/navigator-open-editors-commands */ "../node_modules/@theia/navigator/lib/browser/open-editors-widget/navigator-open-editors-commands.js"),a=__webpack_require__(/*! @theia/preferences/lib/browser/util/preference-types */ "../node_modules/@theia/preferences/lib/browser/util/preference-types.js"),o=__webpack_require__(/*! @theia/terminal/lib/browser/terminal-frontend-contribution */ "../node_modules/@theia/terminal/lib/browser/terminal-frontend-contribution.js"),C=__webpack_require__(/*! @theia/workspace/lib/browser */ "../node_modules/@theia/workspace/lib/browser/index.js");var A=Object.getOwnPropertyDescriptor,S=(m,e,O,_)=>{for(var t=_>1?void 0:_?A(e,O):e,u=m.length-1,d;u>=0;u--)(d=m[u])&&(t=d(t)||t);return t};exports.UnregisterCommandsContribution=class{registerCommands(e){e.unregisterCommand(n.CommonCommands.ABOUT_COMMAND),e.unregisterCommand(n.CommonCommands.OPEN_VIEW),e.unregisterCommand(L.FileDownloadCommands.COPY_DOWNLOAD_LINK),e.unregisterCommand(C.WorkspaceCommands.OPEN),e.unregisterCommand(C.WorkspaceCommands.OPEN_FILE),e.unregisterCommand(C.WorkspaceCommands.OPEN_FOLDER),e.unregisterCommand(C.WorkspaceCommands.ADD_FOLDER),e.unregisterCommand(C.WorkspaceCommands.CLOSE),e.unregisterCommand(C.WorkspaceCommands.OPEN_WORKSPACE),e.unregisterCommand(C.WorkspaceCommands.OPEN_WORKSPACE_FILE),e.unregisterCommand(C.WorkspaceCommands.OPEN_RECENT_WORKSPACE),e.unregisterCommand(C.WorkspaceCommands.SAVE_WORKSPACE_AS),e.unregisterCommand(E.FileNavigatorCommands.TOGGLE_HIDDEN_FILES),e.unregisterCommand(E.FileNavigatorCommands.TOGGLE_AUTO_REVEAL),e.unregisterCommand(E.FileNavigatorCommands.OPEN_WITH),e.unregisterCommand(n.KeyboardCommands.CHOOSE_KEYBOARD_LAYOUT),e.unregisterCommand(o.TerminalCommands.PROFILE_NEW),e.unregisterCommand(o.TerminalCommands.PROFILE_DEFAULT),e.unregisterCommand(o.TerminalCommands.NEW_ACTIVE_WORKSPACE),e.unregisterCommand(o.TerminalCommands.TERMINAL_CONTEXT),e.unregisterCommand(o.TerminalCommands.SPLIT),e.unregisterCommand(o.TerminalCommands.SELECT_ALL),e.unregisterCommand(o.TerminalCommands.SHOW_ALL_OPENED_TERMINALS),e.unregisterCommand(n.CommonCommands.ABOUT_COMMAND),e.unregisterCommand(n.CommonCommands.NEW_UNTITLED_TEXT_FILE),e.unregisterCommand(n.CommonCommands.PICK_NEW_FILE),e.unregisterCommand(n.CommonCommands.COPY_PATH),e.unregisterCommand(n.CommonCommands.AUTO_SAVE),e.unregisterCommand(n.CommonCommands.NEXT_TAB),e.unregisterCommand(n.CommonCommands.PREVIOUS_TAB),e.unregisterCommand(n.CommonCommands.CLOSE_OTHER_TABS),e.unregisterCommand(n.CommonCommands.CLOSE_OTHER_MAIN_TABS),e.unregisterCommand(n.CommonCommands.CLOSE_SAVED_TABS),e.unregisterCommand(n.CommonCommands.CLOSE_RIGHT_TABS),e.unregisterCommand(n.CommonCommands.CLOSE_MAIN_TAB),e.unregisterCommand(n.CommonCommands.CLOSE_ALL_TABS),e.unregisterCommand(n.CommonCommands.CLOSE_ALL_MAIN_TABS),e.unregisterCommand(n.CommonCommands.COLLAPSE_PANEL),e.unregisterCommand(n.CommonCommands.COLLAPSE_ALL_PANELS),e.unregisterCommand(n.CommonCommands.TOGGLE_LEFT_PANEL),e.unregisterCommand(n.CommonCommands.TOGGLE_RIGHT_PANEL),e.unregisterCommand(n.CommonCommands.PIN_TAB),e.unregisterCommand(n.CommonCommands.UNPIN_TAB),e.unregisterCommand(n.CommonCommands.SHOW_MENU_BAR),e.unregisterCommand(n.CommonCommands.CONFIGURE_DISPLAY_LANGUAGE),e.unregisterCommand("workbench.action.reloadWindow"),e.unregisterCommand("workbench.action.focusFirstEditorGroup"),e.unregisterCommand("workbench.action.focusSecondEditorGroup"),e.unregisterCommand("workbench.action.focusThirdEditorGroup"),e.unregisterCommand("workbench.action.focusFourthEditorGroup"),e.unregisterCommand("workbench.action.focusFifthEditorGroup"),e.unregisterCommand(n.CommonCommands.NEXT_TAB_GROUP),e.unregisterCommand(n.CommonCommands.NEXT_TAB_IN_GROUP),e.unregisterCommand(n.CommonCommands.PREVIOUS_TAB_GROUP),e.unregisterCommand(n.CommonCommands.PREVIOUS_TAB_IN_GROUP),e.unregisterCommand(n.CommonCommands.TOGGLE_MAXIMIZED),e.unregisterCommand(n.CommonCommands.TOGGLE_BREADCRUMBS),e.unregisterCommand(r.EditorCommands.TOGGLE_RENDER_WHITESPACE),e.unregisterCommand(r.EditorCommands.TOGGLE_WORD_WRAP),e.unregisterCommand(r.EditorCommands.TOGGLE_MINIMAP),e.unregisterCommand(r.EditorCommands.TOGGLE_STICKY_SCROLL),e.unregisterCommand(r.EditorCommands.CONFIG_EOL),e.unregisterCommand(r.EditorCommands.REVERT_AND_CLOSE),e.unregisterCommand(r.EditorCommands.SHOW_ALL_OPENED_EDITORS),e.unregisterCommand(r.EditorCommands.SPLIT_EDITOR_LEFT),e.unregisterCommand(r.EditorCommands.SPLIT_EDITOR_RIGHT),e.unregisterCommand(r.EditorCommands.SPLIT_EDITOR_DOWN),e.unregisterCommand(r.EditorCommands.SPLIT_EDITOR_UP),e.unregisterCommand(r.EditorCommands.SPLIT_EDITOR_VERTICAL),e.unregisterCommand(s.OpenEditorsCommands.CLOSE_ALL_TABS_FROM_TOOLBAR),e.unregisterCommand(s.OpenEditorsCommands.SAVE_ALL_TABS_FROM_TOOLBAR),e.unregisterCommand(s.OpenEditorsCommands.CLOSE_ALL_EDITORS_IN_GROUP_FROM_ICON),e.unregisterCommand(s.OpenEditorsCommands.SAVE_ALL_IN_GROUP_FROM_ICON),e.unregisterCommand("editor.action.toggleHighContrast"),e.unregisterCommand("editor.toggleImportFold"),e.unregisterCommand("editor.createFoldingRangeFromSelection"),e.unregisterCommand("editor.action.wordHighlight.trigger"),e.unregisterCommand("editor.action.transposeLetters"),e.unregisterCommand(a.PreferencesCommands.OPEN_WORKSPACE_PREFERENCES),e.unregisterCommand(a.PreferencesCommands.OPEN_WORKSPACE_PREFERENCES_JSON),e.unregisterCommand(a.PreferencesCommands.OPEN_FOLDER_PREFERENCES),e.unregisterCommand(a.PreferencesCommands.OPEN_FOLDER_PREFERENCES_JSON)}registerMenus(e){e.unregisterMenuAction(o.TerminalMenus.TERMINAL.at(-1),o.TerminalMenus.TERMINAL.slice(0,-1)),e.unregisterMenuAction(n.CommonMenus.HELP.at(-1),n.CommonMenus.HELP.slice(0,-1)),e.unregisterMenuAction(n.CommonMenus.FILE_SETTINGS_SUBMENU.at(-1),n.CommonMenus.FILE_SETTINGS_SUBMENU.slice(0,-1)),e.unregisterMenuAction(r.EditorMainMenu.PANE_GROUP.at(-1),r.EditorMainMenu.PANE_GROUP.slice(0,-1)),e.unregisterMenuAction(i.MonacoMenus.MARKERS_GROUP.at(-1),i.MonacoMenus.MARKERS_GROUP.slice(0,-1)),e.unregisterMenuAction(i.MonacoMenus.SELECTION.at(-1),i.MonacoMenus.SELECTION.slice(0,-1)),e.unregisterMenuAction(i.MonacoMenus.PEEK_CONTEXT_SUBMENU.at(-1),i.MonacoMenus.PEEK_CONTEXT_SUBMENU.slice(0,-1)),e.unregisterMenuAction(E.FileNavigatorCommands.ADD_ROOT_FOLDER),e.unregisterMenuAction(n.CommonMenus.VIEW.at(-1),n.CommonMenus.VIEW.slice(0,-1))}};exports.UnregisterCommandsContribution=S([T.injectable()],exports.UnregisterCommandsContribution);function N({bind:m,rebind:e}){m(g.CommandContribution).to(exports.UnregisterCommandsContribution).inSingletonScope(),m(g.MenuContribution).to(exports.UnregisterCommandsContribution).inSingletonScope()}exports.unregisterCommands=N;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-debug.js":
/*!**********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-debug.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=__webpack_require__(/*! @theia/debug/lib/browser/console/debug-console-contribution */ "../node_modules/@theia/debug/lib/browser/console/debug-console-contribution.js"),t=__webpack_require__(/*! @theia/debug/lib/browser/debug-frontend-application-contribution */ "../node_modules/@theia/debug/lib/browser/debug-frontend-application-contribution.js"),n=[t.DebugFrontendApplicationContribution,o.DebugConsoleContribution];exports.filterContributions=n;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-hierarchy.js":
/*!**************************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-hierarchy.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=__webpack_require__(/*! @theia/callhierarchy/lib/browser/callhierarchy-contribution */ "../node_modules/@theia/callhierarchy/lib/browser/callhierarchy-contribution.js"),t=__webpack_require__(/*! @theia/typehierarchy/lib/browser/typehierarchy-contribution */ "../node_modules/@theia/typehierarchy/lib/browser/typehierarchy-contribution.js"),i=[r.CallHierarchyContribution,t.TypeHierarchyContribution];exports.filterContributions=i;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-notebook.js":
/*!*************************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-notebook.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-actions-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-actions-contribution.js"),t=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-cell-actions-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-cell-actions-contribution.js"),n=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-color-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-color-contribution.js"),i=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-label-provider-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-label-provider-contribution.js"),e=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-outline-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-outline-contribution.js"),r=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-output-action-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-output-action-contribution.js"),b=__webpack_require__(/*! @theia/notebook/lib/browser/contributions/notebook-status-bar-contribution */ "../node_modules/@theia/notebook/lib/browser/contributions/notebook-status-bar-contribution.js"),u=[o.NotebookActionsContribution,t.NotebookCellActionContribution,n.NotebookColorContribution,i.NotebookLabelProviderContribution,e.NotebookOutlineContribution,r.NotebookOutputActionContribution,b.NotebookStatusBarContribution];exports.filterContributions=u;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-outline.js":
/*!************************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-outline.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/outline-view/lib/browser/outline-view-contribution */ "../node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js"),i=[t.OutlineViewContribution];exports.filterContributions=i;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-output.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-output.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=[];exports.filterContributions=t;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-plugin.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-plugin.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/plugin-ext/lib/main/browser/plugin-frontend-view-contribution */ "../node_modules/@theia/plugin-ext/lib/main/browser/plugin-frontend-view-contribution.js"),i=[t.PluginFrontendViewContribution];exports.filterContributions=i;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-problems.js":
/*!*************************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-problems.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/markers/lib/browser/problem/problem-contribution */ "../node_modules/@theia/markers/lib/browser/problem/problem-contribution.js"),o=[t.ProblemContribution];exports.filterContributions=o;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-scm.js":
/*!********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-scm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/scm/lib/browser/scm-contribution */ "../node_modules/@theia/scm/lib/browser/scm-contribution.js"),i=[t.ScmContribution];exports.filterContributions=i;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-tasks.js":
/*!**********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-tasks.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/task/lib/browser/process/process-task-contribution */ "../node_modules/@theia/task/lib/browser/process/process-task-contribution.js"),o=__webpack_require__(/*! @theia/task/lib/browser/task-frontend-contribution */ "../node_modules/@theia/task/lib/browser/task-frontend-contribution.js"),n=[o.TaskFrontendContribution,t.ProcessTaskContribution];exports.filterContributions=n;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-test.js":
/*!*********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-test.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/test/lib/browser/view/test-output-view-contribution */ "../node_modules/@theia/test/lib/browser/view/test-output-view-contribution.js"),i=__webpack_require__(/*! @theia/test/lib/browser/view/test-result-view-contribution */ "../node_modules/@theia/test/lib/browser/view/test-result-view-contribution.js"),e=__webpack_require__(/*! @theia/test/lib/browser/view/test-run-view-contribution */ "../node_modules/@theia/test/lib/browser/view/test-run-view-contribution.js"),n=__webpack_require__(/*! @theia/test/lib/browser/view/test-view-contribution */ "../node_modules/@theia/test/lib/browser/view/test-view-contribution.js"),o=[n.TestViewContribution,e.TestRunViewContribution,i.TestResultViewContribution,t.TestOutputViewContribution];exports.filterContributions=o;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/filter-window.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/filter-window.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=__webpack_require__(/*! @theia/core/lib/browser/window-contribution */ "../node_modules/@theia/core/lib/browser/window-contribution.js"),i=[t.WindowContribution];exports.filterContributions=i;


/***/ }),

/***/ "../custom-ui/lib/frontend/contribution-filters/index.js":
/*!***************************************************************!*\
  !*** ../custom-ui/lib/frontend/contribution-filters/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=__webpack_require__(/*! @theia/core/lib/common */ "../node_modules/@theia/core/lib/common/index.js"),u=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),f=__webpack_require__(/*! ./filter-debug.js */ "../custom-ui/lib/frontend/contribution-filters/filter-debug.js"),b=__webpack_require__(/*! ./filter-hierarchy.js */ "../custom-ui/lib/frontend/contribution-filters/filter-hierarchy.js"),c=__webpack_require__(/*! ./filter-notebook.js */ "../custom-ui/lib/frontend/contribution-filters/filter-notebook.js"),C=__webpack_require__(/*! ./filter-outline.js */ "../custom-ui/lib/frontend/contribution-filters/filter-outline.js"),m=__webpack_require__(/*! ./filter-output.js */ "../custom-ui/lib/frontend/contribution-filters/filter-output.js"),F=__webpack_require__(/*! ./filter-plugin.js */ "../custom-ui/lib/frontend/contribution-filters/filter-plugin.js"),q=__webpack_require__(/*! ./filter-problems.js */ "../custom-ui/lib/frontend/contribution-filters/filter-problems.js"),v=__webpack_require__(/*! ./filter-scm.js */ "../custom-ui/lib/frontend/contribution-filters/filter-scm.js"),a=__webpack_require__(/*! ./filter-tasks.js */ "../custom-ui/lib/frontend/contribution-filters/filter-tasks.js"),g=__webpack_require__(/*! ./filter-test.js */ "../custom-ui/lib/frontend/contribution-filters/filter-test.js"),d=__webpack_require__(/*! ./filter-window.js */ "../custom-ui/lib/frontend/contribution-filters/filter-window.js");var p=Object.getOwnPropertyDescriptor,O=(r,t,o,e)=>{for(var i=e>1?void 0:e?p(t,o):t,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(i)||i);return i};const y=[...f.filterContributions,...g.filterContributions,...v.filterContributions,...C.filterContributions,...b.filterContributions,...m.filterContributions,...q.filterContributions,...F.filterContributions,...a.filterContributions,...c.filterContributions,...d.filterContributions];exports.RemoveFromUIFilterContribution=class{registerContributionFilters(t){t.addFilters("*",[o=>!y.some(e=>o instanceof e)])}};exports.RemoveFromUIFilterContribution=O([u.injectable()],exports.RemoveFromUIFilterContribution);function I({bind:r,rebind:t}){r(l.FilterContribution).to(exports.RemoveFromUIFilterContribution).inSingletonScope()}exports.registerFilters=I;


/***/ }),

/***/ "../custom-ui/lib/frontend/index.js":
/*!******************************************!*\
  !*** ../custom-ui/lib/frontend/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const i=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),o=__webpack_require__(/*! ./commands/index.js */ "../custom-ui/lib/frontend/commands/index.js"),r=__webpack_require__(/*! ./contribution-filters/index.js */ "../custom-ui/lib/frontend/contribution-filters/index.js"),n=__webpack_require__(/*! ./layout/application-shell.js */ "../custom-ui/lib/frontend/layout/application-shell.js"),u=__webpack_require__(/*! ./navigator/navigator-widget-factory.js */ "../custom-ui/lib/frontend/navigator/navigator-widget-factory.js"),a=__webpack_require__(/*! ./output/output-toolbar-contribution.js */ "../custom-ui/lib/frontend/output/output-toolbar-contribution.js"),s=__webpack_require__(/*! ./search/search-in-workspace-factory.js */ "../custom-ui/lib/frontend/search/search-in-workspace-factory.js"),c=new i.ContainerModule((t,l,p,e)=>{r.registerFilters({bind:t,rebind:e}),o.initCommands({bind:t,rebind:e}),s.initSearchWidget({rebind:e}),u.initFileNavigator({bind:t,rebind:e}),a.initOutputContribution({bind:t,rebind:e}),n.initApplicationShell({bind:t,rebind:e})});exports["default"]=c;


/***/ }),

/***/ "../custom-ui/lib/frontend/layout/application-shell.js":
/*!*************************************************************!*\
  !*** ../custom-ui/lib/frontend/layout/application-shell.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});__webpack_require__(/*! ../style/application-shell.css */ "../custom-ui/lib/frontend/style/application-shell.css");;/* empty css                               */const r=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),m=__webpack_require__(/*! @theia/core/lib/browser/shell/theia-dock-panel */ "../node_modules/@theia/core/lib/browser/shell/theia-dock-panel.js"),P=__webpack_require__(/*! @theia/core/shared/@lumino/domutils */ "../node_modules/@theia/core/shared/@lumino/domutils/index.js"),u=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),f=__webpack_require__(/*! ./frontend-application.js */ "../custom-ui/lib/frontend/layout/frontend-application.js"),d=__webpack_require__(/*! ./shell-init-contribution.js */ "../custom-ui/lib/frontend/layout/shell-init-contribution.js"),h=__webpack_require__(/*! ./side-panel-handler.js */ "../custom-ui/lib/frontend/layout/side-panel-handler.js");var y=Object.defineProperty,b=Object.getOwnPropertyDescriptor,g=(l,t,a,n)=>{for(var o=n>1?void 0:n?b(t,a):t,e=l.length-1,i;e>=0;e--)(i=l[e])&&(o=(n?i(t,a,o):i(o))||o);return n&&o&&y(t,a,o),o};function v({bind:l,rebind:t}){t(r.ApplicationShell).to(exports.ApplicationShell).inSingletonScope(),t(r.FrontendApplication).to(f.FrontendApplication).inSingletonScope(),l(d.ShellInitContribution).toSelf().inSingletonScope(),l(r.FrontendApplicationContribution).toService(d.ShellInitContribution),l(h.SidePanelHandler).toSelf(),t(r.SidePanelHandlerFactory).toAutoFactory(h.SidePanelHandler)}exports.ApplicationShell=class extends r.ApplicationShell{init(){this.options={leftPanel:{...this.options.leftPanel,initialSizeRatio:.25},bottomPanel:{...this.options.bottomPanel,emptySize:0,expandDuration:0,initialSizeRatio:.2},rightPanel:{...this.options.rightPanel,emptySize:0,expandThreshold:0,initialSizeRatio:0}},super.init(),this.restrictDragging()}getInsertionOptions(t){return t?.area==="right"&&(t.area="left"),super.getInsertionOptions(t)}handleEvent(t){switch(t.type){case"lm-dragenter":case"lm-dragleave":case"lm-dragover":case"lm-drop":return}return super.handleEvent(t)}restrictDragging(){const t=m.TheiaDockPanel.prototype;if(t._patchedDropBlocker)return;const a=t.handleEvent,n=t._showOverlay,o=t.addWidget;t.handleEvent=function(e){const i=this.node,c=!!i.closest(".theia-side-panel"),p=!!i.closest('[id="theia-bottom-content-panel"]'),s=!e.source,S=e.source?.id==="theia-bottom-content-panel";if(!s&&!(S||p)&&!(c&&["lm-dragenter","lm-dragleave","lm-dragover","lm-drop"].includes(e.type)))return a.call(this,e)},t._showOverlay=function(e,i){const c=n.call(this,e,i),p=this.overlay;if(["widget-top","widget-bottom","root-top","root-bottom","widget-tab"].includes(c)){const s=P.ElementExt.boxSizing(this.node);return p.show({top:s.paddingTop,left:s.paddingLeft,right:s.paddingRight,bottom:s.paddingBottom}),"widget-all"}return c},t.addWidget=function(e,i){return(i?.mode==="split-top"||i?.mode==="split-bottom")&&(i.mode="tab-after"),o.call(this,e,i)},t._patchedDropBlocker=!0}createLayout(){const a=this.createSplitLayout([this.mainPanel,this.bottomPanel],[1,0],{orientation:"vertical",spacing:6}),n=new r.TheiaSplitPanel({layout:a});n.id="theia-bottom-split-panel";const o=this.createSplitLayout([this.leftPanelHandler.container,n,this.rightPanelHandler.container],[0,1,0],{orientation:"horizontal",spacing:6}),e=new r.TheiaSplitPanel({layout:o});return e.id="theia-main-ide-panel",this.createBoxLayout([this.topPanel,e,this.statusBar],[0,1,0],{direction:"top-to-bottom",spacing:0})}};g([u.postConstruct()],exports.ApplicationShell.prototype,"init",1);exports.ApplicationShell=g([u.injectable()],exports.ApplicationShell);exports.initApplicationShell=v;


/***/ }),

/***/ "../custom-ui/lib/frontend/layout/frontend-application.js":
/*!****************************************************************!*\
  !*** ../custom-ui/lib/frontend/layout/frontend-application.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),a=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");var p=Object.getOwnPropertyDescriptor,d=(n,e,r,i)=>{for(var t=i>1?void 0:i?p(e,r):e,o=n.length-1,s;o>=0;o--)(s=n[o])&&(t=s(t)||t);return t};exports.FrontendApplication=class extends c.FrontendApplication{async getHost(){const e=()=>document.getElementById("theia-app")||document.body;return e()?e():new Promise(r=>window.addEventListener("load",()=>r(e()),{once:!0}))}};exports.FrontendApplication=d([a.injectable()],exports.FrontendApplication);


/***/ }),

/***/ "../custom-ui/lib/frontend/layout/shell-init-contribution.js":
/*!*******************************************************************!*\
  !*** ../custom-ui/lib/frontend/layout/shell-init-contribution.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),c=__webpack_require__(/*! @theia/core/lib/browser/frontend-application-state */ "../node_modules/@theia/core/lib/browser/frontend-application-state.js"),e=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),s=__webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "../node_modules/@theia/navigator/lib/browser/navigator-contribution.js"),b=__webpack_require__(/*! @theia/output/lib/browser/output-contribution */ "../node_modules/@theia/output/lib/browser/output-contribution.js"),C=__webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution */ "../node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js");var S=Object.defineProperty,h=Object.getOwnPropertyDescriptor,i=(r,n,a,o)=>{for(var t=o>1?void 0:o?h(n,a):n,u=r.length-1,p;u>=0;u--)(p=r[u])&&(t=(o?p(n,a,t):p(t))||t);return o&&t&&S(n,a,t),t};exports.ShellInitContribution=class extends l.DefaultFrontendApplicationContribution{navigatorContribution;searchContribution;outputContribution;appStateService;async onDidInitializeLayout(){await this.openDefaultLayout()}async onStart(){this.appStateService.onStateChanged(n=>{n==="ready"&&document.body.classList.add("theia-app-ready")})}async openDefaultLayout(){await this.navigatorContribution.openView({area:"left",reveal:!0,rank:100}),await this.searchContribution.openView({area:"left",reveal:!1,rank:200}),this.outputContribution.openView({area:"bottom",reveal:!0})}};i([e.inject(s.FileNavigatorContribution)],exports.ShellInitContribution.prototype,"navigatorContribution",2);i([e.inject(C.SearchInWorkspaceFrontendContribution)],exports.ShellInitContribution.prototype,"searchContribution",2);i([e.inject(b.OutputContribution)],exports.ShellInitContribution.prototype,"outputContribution",2);i([e.inject(c.FrontendApplicationStateService)],exports.ShellInitContribution.prototype,"appStateService",2);exports.ShellInitContribution=i([e.injectable()],exports.ShellInitContribution);


/***/ }),

/***/ "../custom-ui/lib/frontend/layout/side-panel-handler.js":
/*!**************************************************************!*\
  !*** ../custom-ui/lib/frontend/layout/side-panel-handler.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});__webpack_require__(/*! ../style/side-panel.css */ "../custom-ui/lib/frontend/style/side-panel.css");;/* empty css                        */const a=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),l=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");var d=Object.getOwnPropertyDescriptor,c=(s,e,r,n)=>{for(var t=n>1?void 0:n?d(e,r):e,i=s.length-1,o;i>=0;i--)(o=s[i])&&(t=o(t)||t);return t};exports.SidePanelHandler=class extends a.SidePanelHandler{createSideBar(){const e=super.createSideBar();return e.tabsMovable=!1,e.removeClass("theia-app-left"),e.removeClass("theia-app-right"),e.addClass("theia-app-top"),e}createContainer(){this.tabBar.orientation="horizontal";const e=this.side,r=new a.BoxLayout({direction:"top-to-bottom",spacing:0}),n=new a.BoxPanel({layout:r}),t=new a.Panel;return a.BoxPanel.setStretch(t,0),r.addWidget(t),a.BoxPanel.setStretch(this.toolBar,0),r.addWidget(this.toolBar),a.BoxPanel.setStretch(this.dockPanel,1),r.addWidget(this.dockPanel),a.BoxPanel.setStretch(this.tabBar,1),t.addWidget(this.tabBar),a.BoxPanel.setStretch(this.topMenu,0),t.addWidget(this.topMenu),t.addClass("theia-header-panel"),n.id=`theia-${e}-content-panel`,n}async collapse(){}};exports.SidePanelHandler=c([l.injectable()],exports.SidePanelHandler);


/***/ }),

/***/ "../custom-ui/lib/frontend/navigator/navigator-widget-factory.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/navigator/navigator-widget-factory.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const d=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),c=__webpack_require__(/*! @theia/core/lib/common/nls */ "../node_modules/@theia/core/lib/common/nls.js"),l=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),v=__webpack_require__(/*! @theia/filesystem/lib/browser */ "../node_modules/@theia/filesystem/lib/browser/index.js"),e=__webpack_require__(/*! @theia/navigator/lib/browser */ "../node_modules/@theia/navigator/lib/browser/index.js"),N=__webpack_require__(/*! @theia/navigator/lib/browser/navigator-container */ "../node_modules/@theia/navigator/lib/browser/navigator-container.js"),F=__webpack_require__(/*! @theia/navigator/lib/browser/navigator-tree */ "../node_modules/@theia/navigator/lib/browser/navigator-tree.js");var W=Object.getOwnPropertyDescriptor,s=(i,t,r,g)=>{for(var a=g>1?void 0:g?W(t,r):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(a=n(a)||a);return a};function u({bind:i,rebind:t}){t(e.NavigatorWidgetFactory).to(exports.NavigatorWidgetFactory).inSingletonScope(),i(d.WidgetFactory).toDynamicValue(({container:r})=>({id:e.FILE_NAVIGATOR_ID,createWidget:()=>v.createFileTreeContainer(r,{tree:F.FileNavigatorTree,model:e.FileNavigatorModel,widget:exports.FileNavigatorWidget,decoratorService:e.NavigatorDecoratorService,props:N.FILE_NAVIGATOR_PROPS}).get(exports.FileNavigatorWidget)})).inSingletonScope()}exports.NavigatorWidgetFactory=class extends e.NavigatorWidgetFactory{fileNavigatorWidgetOptions={order:0,canHide:!1,initiallyCollapsed:!1,weight:120,disableDraggingToOtherContainers:!0};async createWidget(){const t=this.viewContainerFactory({id:e.EXPLORER_VIEW_CONTAINER_ID,progressLocationId:"explorer"});t.setTitleOptions({...e.EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS,label:"",closeable:!1});const r=await this.widgetManager.getOrCreateWidget(e.FILE_NAVIGATOR_ID);return t.addWidget(r,this.fileNavigatorWidgetOptions),t}};exports.NavigatorWidgetFactory=s([l.injectable()],exports.NavigatorWidgetFactory);exports.FileNavigatorWidget=class extends e.FileNavigatorWidget{doUpdateRows(){super.doUpdateRows(),this.title.label=c.nls.localizeByDefault("Files")}};exports.FileNavigatorWidget=s([l.injectable()],exports.FileNavigatorWidget);exports.initFileNavigator=u;


/***/ }),

/***/ "../custom-ui/lib/frontend/output/output-toolbar-contribution.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/output/output-toolbar-contribution.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),p=__webpack_require__(/*! @theia/output/lib/browser/output-toolbar-contribution */ "../node_modules/@theia/output/lib/browser/output-toolbar-contribution.js"),l=__webpack_require__(/*! @theia/output/lib/browser/output-widget */ "../node_modules/@theia/output/lib/browser/output-widget.js"),i=__webpack_require__(/*! @theia/output/lib/browser/output-commands */ "../node_modules/@theia/output/lib/browser/output-commands.js");var b=Object.getOwnPropertyDescriptor,O=(u,t,a,n)=>{for(var o=n>1?void 0:n?b(t,a):t,e=u.length-1,r;e>=0;e--)(r=u[e])&&(o=r(o)||o);return o};function c({bind:u,rebind:t}){u(exports.OutputToolbarContribution).toSelf().inSingletonScope(),t(p.OutputToolbarContribution).toService(exports.OutputToolbarContribution),t(l.OutputWidget).to(exports.OutputWidget).inSingletonScope()}exports.OutputWidget=class extends l.OutputWidget{_state={locked:!0};constructor(){super(),this.title.closable=!1}};exports.OutputWidget=O([s.injectable()],exports.OutputWidget);exports.OutputToolbarContribution=class extends p.OutputToolbarContribution{registerToolbarItems(t){super.registerToolbarItems(t),t.unregisterItem(i.OutputCommands.CLEAR__WIDGET.id),t.unregisterItem(i.OutputCommands.LOCK__WIDGET.id),t.unregisterItem(i.OutputCommands.UNLOCK__WIDGET.id)}};exports.OutputToolbarContribution=O([s.injectable()],exports.OutputToolbarContribution);exports.initOutputContribution=c;


/***/ }),

/***/ "../custom-ui/lib/frontend/search/search-in-workspace-factory.js":
/*!***********************************************************************!*\
  !*** ../custom-ui/lib/frontend/search/search-in-workspace-factory.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),a=__webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-factory */ "../node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-factory.js"),g=__webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-widget */ "../node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-widget.js");var l=Object.getOwnPropertyDescriptor,W=(r,e,c,s)=>{for(var t=s>1?void 0:s?l(e,c):e,o=r.length-1,i;o>=0;o--)(i=r[o])&&(t=i(t)||t);return t};function d({rebind:r}){r(a.SearchInWorkspaceFactory).to(exports.CustomSearchInWorkspaceFactory).inSingletonScope()}exports.CustomSearchInWorkspaceFactory=class extends a.SearchInWorkspaceFactory{async createWidget(){const e=this.viewContainerFactory({id:a.SEARCH_VIEW_CONTAINER_ID,progressLocationId:"search"});e.setTitleOptions({...a.SEARCH_VIEW_CONTAINER_TITLE_OPTIONS,closeable:!1});const c=await this.widgetManager.getOrCreateWidget(g.SearchInWorkspaceWidget.ID);return e.addWidget(c,{...this.searchWidgetOptions,canHide:!1,initiallyCollapsed:!1,disableDraggingToOtherContainers:!0}),e}};exports.CustomSearchInWorkspaceFactory=W([n.injectable()],exports.CustomSearchInWorkspaceFactory);exports.initSearchWidget=d;


/***/ }),

/***/ "../custom-ui/lib/frontend/style/application-shell.css":
/*!*************************************************************!*\
  !*** ../custom-ui/lib/frontend/style/application-shell.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_application_shell_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!./application-shell.css */ "../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/application-shell.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_application_shell_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_application_shell_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "../custom-ui/lib/frontend/style/side-panel.css":
/*!******************************************************!*\
  !*** ../custom-ui/lib/frontend/style/side-panel.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_side_panel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!./side-panel.css */ "../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/side-panel.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_side_panel_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_side_panel_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/application-shell.css":
/*!****************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/application-shell.css ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body{--theia-island-outer: 6px;--theia-island-spacing: 5px;--theia-island-border-radius: 10px;--theia-island-border-radius-xs: 5px;--theia-island-border-radius-sm: 7px;--theia-island-background: linear-gradient(135deg, #000000, #1c2526, #1a1313, #1a1313, #000000);--theia-titleBar-activeBackground: transparent;--theia-titleBar-inactiveBackground: transparent;--theia-statusBar-background: transparent;--theia-statusBar-noFolderBackground: transparent;--theia-editorGroupHeader-tabsBackground: transparent;--theia-activityBar-background: transparent;--theia-private-sidebar-tab-width: 30px;--theia-private-sidebar-tab-height: 30px;--theia-private-sidebar-tabicon-width: 30px;--theia-private-sidebar-tab-gap: var(--theia-island-spacing);--theia-private-sidebar-icon-size: 16px;--theia-close-button-size: 20px;--theia-private-sidebar-tab-padding-top-and-bottom: 7px;--theia-private-sidebar-tab-padding-left-and-right: 7px;--theia-private-horizontal-tab-scrollbar-rail-height: 0px;--theia-private-horizontal-tab-height: 30px;--theia-horizontal-toolbar-height: calc(var(--theia-private-horizontal-tab-height) + var(--theia-island-spacing) * 2);--theia-override-toolbar-height: 30px;--theia-tab-activeBackground: rgba(255, 255, 255, .1);--theia-tab-hoverBackground: rgba(255, 255, 255, .07);--theia-list-inactiveSelectionBackground: rgba(255, 255, 255, .1);--theia-list-activeSelectionBackground: rgba(255, 255, 255, .1);--theia-list-hoverBackground: rgba(255, 255, 255, .07);--theia-tab-inactiveBackground: transparent}body,.monaco-editor,.monaco-diff-editor,.monaco-component{--vscode-editor-background: transparent !important;--vscode-editorGutter-background: transparent !important}#theia-app-shell{background:var(--theia-island-background)}#theia-main-ide-panel{border:var(--theia-island-outer) solid transparent;border-top:none}#theia-main-ide-panel:has(+#theia-statusBar:not(.lm-mod-hidden)){border-bottom:none}#theia-top-panel .lm-Widget.lm-MenuBar{padding-inline:var(--theia-island-outer)}#theia-statusBar{border:0!important}#theia-left-content-panel,#theia-main-content-panel,#theia-bottom-content-panel{border-radius:var(--theia-island-border-radius);overflow:hidden}@supports (overflow: clip){#theia-left-content-panel,#theia-main-content-panel,#theia-bottom-content-panel{overflow:clip}}.theia-TreeContainer{padding-inline:var(--theia-island-spacing)}.theia-TreeContainer [data-item-index]{margin-bottom:1px}.theia-TreeContainer .theia-TreeNode{height:28px;line-height:28px;border-radius:var(--theia-island-border-radius-sm)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-Widget.lm-TabBar{border:0!important}:is(#theia-main-content-panel,#theia-bottom-content-panel) .theia-tabBar-tab-row{display:flex;align-items:center}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-content{padding:var(--theia-island-spacing);gap:var(--theia-island-spacing)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab{border:0!important;box-shadow:none!important;height:var(--theia-private-horizontal-tab-height);border-radius:var(--theia-island-border-radius-sm)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.lm-mod-current{background:var(--theia-tab-activeBackground)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.lm-mod-closable>.lm-TabBar-tabCloseIcon,:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.theia-mod-pinned>.lm-TabBar-tabCloseIcon{display:flex;align-items:center;justify-content:center;margin:0 0 0 var(--theia-island-spacing);padding:0;width:var(--theia-close-button-size);height:var(--theia-close-button-size);box-sizing:border-box}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab:not(.lm-mod-closable)>.lm-TabBar-tabCloseIcon{display:none}#theia-main-content-panel{background:transparent}#theia-main-content-panel .lm-TabBar-content{padding-inline:0}#theia-main-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab:hover{background:var(--theia-tab-hoverBackground)}#theia-main-content-panel .lm-TabBar .lm-TabBar-tab.lm-mod-current{background:var(--theia-tab-activeBackground)!important}#theia-main-content-panel .lm-Widget.lm-DockPanel-widget{border-radius:var(--theia-island-border-radius) var(--theia-island-border-radius) 0 0;overflow:hidden}#theia-bottom-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab{font-size:12px;font-weight:500}#theia-bottom-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab .lm-TabBar-tabIcon{display:none}.monaco-editor,.monaco-diff-editor{padding-block:var(--theia-island-spacing);outline:0!important}.lm-TabBar-toolbar{margin:0;padding:0 var(--theia-island-spacing)}.theia-select-component{min-height:24px;border-radius:var(--theia-island-border-radius-sm)}.action-label{min-width:18px;min-height:18px;line-height:18px;padding:2px;box-sizing:content-box}.t-siw-search-container .searchHeader{padding:0 9px}.t-siw-search-container .searchHeader .search-field-container{border-radius:var(--theia-island-border-radius-sm)}.t-siw-search-container .theia-input{border-radius:var(--theia-island-border-radius-sm);padding:3px 9px}.xterm .xterm-viewport{background:transparent!important}.theia-icon{display:none!important}
`, "",{"version":3,"sources":["webpack://./../custom-ui/lib/frontend/style/application-shell.css"],"names":[],"mappings":"AAAA,KAAK,yBAAyB,CAAC,2BAA2B,CAAC,kCAAkC,CAAC,oCAAoC,CAAC,oCAAoC,CAAC,+FAA+F,CAAC,8CAA8C,CAAC,gDAAgD,CAAC,yCAAyC,CAAC,iDAAiD,CAAC,qDAAqD,CAAC,2CAA2C,CAAC,uCAAuC,CAAC,wCAAwC,CAAC,2CAA2C,CAAC,4DAA4D,CAAC,uCAAuC,CAAC,+BAA+B,CAAC,uDAAuD,CAAC,uDAAuD,CAAC,yDAAyD,CAAC,2CAA2C,CAAC,qHAAqH,CAAC,qCAAqC,CAAC,qDAAqD,CAAC,qDAAqD,CAAC,iEAAiE,CAAC,+DAA+D,CAAC,sDAAsD,CAAC,2CAA2C,CAAC,0DAA0D,kDAAkD,CAAC,wDAAwD,CAAC,iBAAiB,yCAAyC,CAAC,sBAAsB,kDAAkD,CAAC,eAAe,CAAC,iEAAiE,kBAAkB,CAAC,uCAAuC,wCAAwC,CAAC,iBAAiB,kBAAkB,CAAC,gFAAgF,+CAA+C,CAAC,eAAe,CAAC,2BAA2B,gFAAgF,aAAa,CAAC,CAAC,qBAAqB,0CAA0C,CAAC,uCAAuC,iBAAiB,CAAC,qCAAqC,WAAW,CAAC,gBAAgB,CAAC,kDAAkD,CAAC,gFAAgF,kBAAkB,CAAC,iFAAiF,YAAY,CAAC,kBAAkB,CAAC,8EAA8E,mCAAmC,CAAC,+BAA+B,CAAC,0EAA0E,kBAAkB,CAAC,yBAAyB,CAAC,iDAAiD,CAAC,kDAAkD,CAAC,yFAAyF,4CAA4C,CAAC,qOAAqO,YAAY,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,wCAAwC,CAAC,SAAS,CAAC,oCAAoC,CAAC,qCAAqC,CAAC,qBAAqB,CAAC,wHAAwH,YAAY,CAAC,0BAA0B,sBAAsB,CAAC,6CAA6C,gBAAgB,CAAC,oEAAoE,2CAA2C,CAAC,mEAAmE,sDAAsD,CAAC,yDAAyD,qFAAqF,CAAC,eAAe,CAAC,gEAAgE,cAAc,CAAC,eAAe,CAAC,mFAAmF,YAAY,CAAC,mCAAmC,yCAAyC,CAAC,mBAAmB,CAAC,mBAAmB,QAAQ,CAAC,qCAAqC,CAAC,wBAAwB,eAAe,CAAC,kDAAkD,CAAC,cAAc,cAAc,CAAC,eAAe,CAAC,gBAAgB,CAAC,WAAW,CAAC,sBAAsB,CAAC,sCAAsC,aAAa,CAAC,8DAA8D,kDAAkD,CAAC,qCAAqC,kDAAkD,CAAC,eAAe,CAAC,uBAAuB,gCAAgC,CAAC,YAAY,sBAAsB","sourcesContent":["body{--theia-island-outer: 6px;--theia-island-spacing: 5px;--theia-island-border-radius: 10px;--theia-island-border-radius-xs: 5px;--theia-island-border-radius-sm: 7px;--theia-island-background: linear-gradient(135deg, #000000, #1c2526, #1a1313, #1a1313, #000000);--theia-titleBar-activeBackground: transparent;--theia-titleBar-inactiveBackground: transparent;--theia-statusBar-background: transparent;--theia-statusBar-noFolderBackground: transparent;--theia-editorGroupHeader-tabsBackground: transparent;--theia-activityBar-background: transparent;--theia-private-sidebar-tab-width: 30px;--theia-private-sidebar-tab-height: 30px;--theia-private-sidebar-tabicon-width: 30px;--theia-private-sidebar-tab-gap: var(--theia-island-spacing);--theia-private-sidebar-icon-size: 16px;--theia-close-button-size: 20px;--theia-private-sidebar-tab-padding-top-and-bottom: 7px;--theia-private-sidebar-tab-padding-left-and-right: 7px;--theia-private-horizontal-tab-scrollbar-rail-height: 0px;--theia-private-horizontal-tab-height: 30px;--theia-horizontal-toolbar-height: calc(var(--theia-private-horizontal-tab-height) + var(--theia-island-spacing) * 2);--theia-override-toolbar-height: 30px;--theia-tab-activeBackground: rgba(255, 255, 255, .1);--theia-tab-hoverBackground: rgba(255, 255, 255, .07);--theia-list-inactiveSelectionBackground: rgba(255, 255, 255, .1);--theia-list-activeSelectionBackground: rgba(255, 255, 255, .1);--theia-list-hoverBackground: rgba(255, 255, 255, .07);--theia-tab-inactiveBackground: transparent}body,.monaco-editor,.monaco-diff-editor,.monaco-component{--vscode-editor-background: transparent !important;--vscode-editorGutter-background: transparent !important}#theia-app-shell{background:var(--theia-island-background)}#theia-main-ide-panel{border:var(--theia-island-outer) solid transparent;border-top:none}#theia-main-ide-panel:has(+#theia-statusBar:not(.lm-mod-hidden)){border-bottom:none}#theia-top-panel .lm-Widget.lm-MenuBar{padding-inline:var(--theia-island-outer)}#theia-statusBar{border:0!important}#theia-left-content-panel,#theia-main-content-panel,#theia-bottom-content-panel{border-radius:var(--theia-island-border-radius);overflow:hidden}@supports (overflow: clip){#theia-left-content-panel,#theia-main-content-panel,#theia-bottom-content-panel{overflow:clip}}.theia-TreeContainer{padding-inline:var(--theia-island-spacing)}.theia-TreeContainer [data-item-index]{margin-bottom:1px}.theia-TreeContainer .theia-TreeNode{height:28px;line-height:28px;border-radius:var(--theia-island-border-radius-sm)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-Widget.lm-TabBar{border:0!important}:is(#theia-main-content-panel,#theia-bottom-content-panel) .theia-tabBar-tab-row{display:flex;align-items:center}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-content{padding:var(--theia-island-spacing);gap:var(--theia-island-spacing)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab{border:0!important;box-shadow:none!important;height:var(--theia-private-horizontal-tab-height);border-radius:var(--theia-island-border-radius-sm)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.lm-mod-current{background:var(--theia-tab-activeBackground)}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.lm-mod-closable>.lm-TabBar-tabCloseIcon,:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab.theia-mod-pinned>.lm-TabBar-tabCloseIcon{display:flex;align-items:center;justify-content:center;margin:0 0 0 var(--theia-island-spacing);padding:0;width:var(--theia-close-button-size);height:var(--theia-close-button-size);box-sizing:border-box}:is(#theia-main-content-panel,#theia-bottom-content-panel) .lm-TabBar-tab:not(.lm-mod-closable)>.lm-TabBar-tabCloseIcon{display:none}#theia-main-content-panel{background:transparent}#theia-main-content-panel .lm-TabBar-content{padding-inline:0}#theia-main-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab:hover{background:var(--theia-tab-hoverBackground)}#theia-main-content-panel .lm-TabBar .lm-TabBar-tab.lm-mod-current{background:var(--theia-tab-activeBackground)!important}#theia-main-content-panel .lm-Widget.lm-DockPanel-widget{border-radius:var(--theia-island-border-radius) var(--theia-island-border-radius) 0 0;overflow:hidden}#theia-bottom-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab{font-size:12px;font-weight:500}#theia-bottom-content-panel .lm-Widget.lm-TabBar .lm-TabBar-tab .lm-TabBar-tabIcon{display:none}.monaco-editor,.monaco-diff-editor{padding-block:var(--theia-island-spacing);outline:0!important}.lm-TabBar-toolbar{margin:0;padding:0 var(--theia-island-spacing)}.theia-select-component{min-height:24px;border-radius:var(--theia-island-border-radius-sm)}.action-label{min-width:18px;min-height:18px;line-height:18px;padding:2px;box-sizing:content-box}.t-siw-search-container .searchHeader{padding:0 9px}.t-siw-search-container .searchHeader .search-field-container{border-radius:var(--theia-island-border-radius-sm)}.t-siw-search-container .theia-input{border-radius:var(--theia-island-border-radius-sm);padding:3px 9px}.xterm .xterm-viewport{background:transparent!important}.theia-icon{display:none!important}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/side-panel.css":
/*!*********************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../custom-ui/lib/frontend/style/side-panel.css ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.theia-header-panel{display:flex;align-items:center;justify-content:space-between;min-height:var(--theia-horizontal-toolbar-height);padding:var(--theia-island-spacing) 0;border:0!important}#theia-left-content-panel{min-width:220px!important}.lm-TabBar.theia-app-sides{display:flex;flex-direction:row;align-items:center;max-width:100%;background:unset}.lm-TabBar.theia-app-sides .theia-tabBar-tab-row{overflow-x:auto;scrollbar-width:none;--theia-scrollbar-width: 0px}.lm-TabBar.theia-app-sides .lm-TabBar-content{display:flex;gap:var(--theia-island-spacing);cursor:default}.lm-TabBar.theia-app-sides .lm-TabBar-tab{padding:0;min-width:0;min-height:0!important;max-height:var(--theia-private-sidebar-tab-height);border-radius:var(--theia-island-border-radius-sm);cursor:pointer;background-color:transparent;transition:all .18s ease}.lm-TabBar.theia-app-sides .lm-TabBar-tab:hover{background-color:var(--theia-tab-hoverBackground)}.lm-TabBar.theia-app-sides .lm-TabBar-tab.lm-mod-current{background-color:var(--theia-tab-activeBackground)}.lm-TabBar.theia-app-sides .lm-TabBar-tab .theia-tab-icon-label{display:flex;align-items:center;justify-content:center;padding:0 10px}.lm-TabBar.theia-app-sides .lm-TabBar-tabIcon{width:var(--theia-private-sidebar-icon-size);height:var(--theia-private-sidebar-icon-size)}.lm-TabBar.theia-app-sides .lm-TabBar-tabLabel{display:inline-flex;white-space:nowrap;margin-left:8px}.theia-sidepanel-toolbar{min-height:calc(var(--theia-override-toolbar-height) + var(--theia-island-spacing) * 2);padding:var(--theia-island-spacing) 0;border-radius:var(--theia-island-border-radius) var(--theia-island-border-radius) 0 0}
`, "",{"version":3,"sources":["webpack://./../custom-ui/lib/frontend/style/side-panel.css"],"names":[],"mappings":"AAAA,oBAAoB,YAAY,CAAC,kBAAkB,CAAC,6BAA6B,CAAC,iDAAiD,CAAC,qCAAqC,CAAC,kBAAkB,CAAC,0BAA0B,yBAAyB,CAAC,2BAA2B,YAAY,CAAC,kBAAkB,CAAC,kBAAkB,CAAC,cAAc,CAAC,gBAAgB,CAAC,iDAAiD,eAAe,CAAC,oBAAoB,CAAC,4BAA4B,CAAC,8CAA8C,YAAY,CAAC,+BAA+B,CAAC,cAAc,CAAC,0CAA0C,SAAS,CAAC,WAAW,CAAC,sBAAsB,CAAC,kDAAkD,CAAC,kDAAkD,CAAC,cAAc,CAAC,4BAA4B,CAAC,wBAAwB,CAAC,gDAAgD,iDAAiD,CAAC,yDAAyD,kDAAkD,CAAC,gEAAgE,YAAY,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,cAAc,CAAC,8CAA8C,4CAA4C,CAAC,6CAA6C,CAAC,+CAA+C,mBAAmB,CAAC,kBAAkB,CAAC,eAAe,CAAC,yBAAyB,uFAAuF,CAAC,qCAAqC,CAAC,qFAAqF","sourcesContent":[".theia-header-panel{display:flex;align-items:center;justify-content:space-between;min-height:var(--theia-horizontal-toolbar-height);padding:var(--theia-island-spacing) 0;border:0!important}#theia-left-content-panel{min-width:220px!important}.lm-TabBar.theia-app-sides{display:flex;flex-direction:row;align-items:center;max-width:100%;background:unset}.lm-TabBar.theia-app-sides .theia-tabBar-tab-row{overflow-x:auto;scrollbar-width:none;--theia-scrollbar-width: 0px}.lm-TabBar.theia-app-sides .lm-TabBar-content{display:flex;gap:var(--theia-island-spacing);cursor:default}.lm-TabBar.theia-app-sides .lm-TabBar-tab{padding:0;min-width:0;min-height:0!important;max-height:var(--theia-private-sidebar-tab-height);border-radius:var(--theia-island-border-radius-sm);cursor:pointer;background-color:transparent;transition:all .18s ease}.lm-TabBar.theia-app-sides .lm-TabBar-tab:hover{background-color:var(--theia-tab-hoverBackground)}.lm-TabBar.theia-app-sides .lm-TabBar-tab.lm-mod-current{background-color:var(--theia-tab-activeBackground)}.lm-TabBar.theia-app-sides .lm-TabBar-tab .theia-tab-icon-label{display:flex;align-items:center;justify-content:center;padding:0 10px}.lm-TabBar.theia-app-sides .lm-TabBar-tabIcon{width:var(--theia-private-sidebar-icon-size);height:var(--theia-private-sidebar-icon-size)}.lm-TabBar.theia-app-sides .lm-TabBar-tabLabel{display:inline-flex;white-space:nowrap;margin-left:8px}.theia-sidepanel-toolbar{min-height:calc(var(--theia-override-toolbar-height) + var(--theia-island-spacing) * 2);padding:var(--theia-island-spacing) 0;border-radius:var(--theia-island-border-radius) var(--theia-island-border-radius) 0 0}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

}]);
//# sourceMappingURL=custom-ui_lib_frontend_index_js.js.map