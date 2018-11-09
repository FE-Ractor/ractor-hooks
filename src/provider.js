"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var context_1 = require("./context");
function Provider(_a) {
    var system = _a.system, _b = _a.stores, stores = _b === void 0 ? [] : _b, children = _a.children;
    stores.forEach(function (store) { return system.actorOf(new store); });
    return React.createElement(context_1.RactorContext.Provider, { value: { system: system, stores: stores } }, children);
}
exports.Provider = Provider;
