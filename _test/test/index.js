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
// import 'jsdom-global/register'
var React = require("react");
var ava_1 = require("ava");
var enzyme_1 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var ractor_1 = require("ractor");
var useStores_1 = require("../src/useStores");
var provider_1 = require("../src/provider");
/* ractor parts */
var system = new ractor_1.System("test");
var Increment = /** @class */ (function () {
    function Increment() {
    }
    return Increment;
}());
var Decrement = /** @class */ (function () {
    function Decrement() {
    }
    return Decrement;
}());
var CounterStore = /** @class */ (function (_super) {
    __extends(CounterStore, _super);
    function CounterStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { value: 0 };
        return _this;
    }
    CounterStore.prototype.createReceive = function () {
        var _this = this;
        return this.receiveBuilder()
            .match(Increment, function () { return _this.setState({ value: _this.state.value++ }); })
            .match(Decrement, function () { return _this.setState({ value: _this.state.value-- }); })
            .build();
    };
    return CounterStore;
}(ractor_1.Store));
/* react parts */
function Counter() {
    console.log(222222222);
    var _a = useStores_1.useStores([CounterStore]), state = _a[0], dispatch = _a[1];
    console.log(state, 6666666666666);
    return (React.createElement("div", null,
        React.createElement("h1", { className: "header" }, state.value),
        React.createElement("button", { onClick: function () { return dispatch(new Increment); } }, "increment"),
        React.createElement("button", { onClick: function () { return dispatch(new Decrement); } }, "decrement")));
}
function App() {
    console.log(111111111111);
    return (React.createElement(provider_1.Provider, { system: system, stores: [] },
        React.createElement(Counter, null)));
}
function Foo() {
    var state = { value: 0 };
    return React.createElement("h1", null, state.value);
}
enzyme_1.configure({ adapter: new Adapter() });
ava_1.default.cb("render counter", function (t) {
    var wrapper = enzyme_1.shallow(React.createElement(App, null));
    setTimeout(function () {
        t.is(wrapper.find(".header").text(), "0");
        t.end();
    }, 3000);
});
