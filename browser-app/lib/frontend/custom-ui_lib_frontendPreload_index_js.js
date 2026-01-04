"use strict";
(self["webpackChunkbrowser_app"] = self["webpackChunkbrowser_app"] || []).push([["custom-ui_lib_frontendPreload_index_js"],{

/***/ "../custom-ui/lib/frontendPreload/index.js":
/*!*************************************************!*\
  !*** ../custom-ui/lib/frontendPreload/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=__webpack_require__(/*! ./module.js */ "../custom-ui/lib/frontendPreload/module.js");exports["default"]=e.default;


/***/ }),

/***/ "../custom-ui/lib/frontendPreload/module.js":
/*!**************************************************!*\
  !*** ../custom-ui/lib/frontendPreload/module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const o=__webpack_require__(/*! @theia/core/lib/browser/messaging/ws-connection-source */ "../node_modules/@theia/core/lib/browser/messaging/ws-connection-source.js"),n=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js"),t=__webpack_require__(/*! ./ws-connection-source.js */ "../custom-ui/lib/frontendPreload/ws-connection-source.js"),i=new n.ContainerModule((u,c,r,e)=>{e(o.WebSocketConnectionSource).to(t.WebSocketConnectionSource).inSingletonScope()});exports["default"]=i;


/***/ }),

/***/ "../custom-ui/lib/frontendPreload/ws-connection-source.js":
/*!****************************************************************!*\
  !*** ../custom-ui/lib/frontendPreload/ws-connection-source.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=__webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js"),u=__webpack_require__(/*! @theia/core/lib/browser/messaging/ws-connection-source */ "../node_modules/@theia/core/lib/browser/messaging/ws-connection-source.js"),S=__webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");var b=Object.getOwnPropertyDescriptor,a=(o,e,i,t)=>{for(var n=t>1?void 0:t?b(e,i):e,r=o.length-1,c;r>=0;r--)(c=o[r])&&(n=c(n)||n);return n};exports.WebSocketConnectionSource=class extends u.WebSocketConnectionSource{createEndpoint(e){return new s.Endpoint({path:e})}};exports.WebSocketConnectionSource=a([S.injectable()],exports.WebSocketConnectionSource);


/***/ })

}]);
//# sourceMappingURL=custom-ui_lib_frontendPreload_index_js.js.map