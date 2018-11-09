"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ractor_1 = require("ractor");
var StateCacheStore = /** @class */ (function (_super) {
    __extends(StateCacheStore, _super);
    function StateCacheStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stateCache: new Map()
        };
        return _this;
    }
    StateCacheStore.prototype.createReceive = function () {
        var _this = this;
        return this.receiveBuilder()
            .match(SetState, function (_a) {
            var key = _a.key, state = _a.state;
            var stateCache = _this.state.stateCache;
            stateCache.set(key, state);
            _this.setState({ stateCache: stateCache });
        })
            .build();
    };
    return StateCacheStore;
}(ractor_1.Store));
exports.StateCacheStore = StateCacheStore;
var SetState = /** @class */ (function () {
    function SetState(key, state) {
        this.key = key;
        this.state = state;
    }
    return SetState;
}());
exports.SetState = SetState;
