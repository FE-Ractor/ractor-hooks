"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("./context");
var shallowPartialEqual_1 = require("./shallowPartialEqual");
var stateCache = new Map();
function useStore(storeClass) {
    var system = react_1.useContext(context_1.RactorContext).system;
    var storeRef = system.get(storeClass);
    var store = storeRef ? storeRef.getInstance() : system.actorOf(new storeClass).getInstance();
    // _store["__mountStatus__"] = _store["__mountStatus__"] || (storeRef ? "global" : "local")
    // if (_store["__mountStatus__"] === "local") {
    //   const cachedState = stateCache.get(storeClass)
    //   if (cachedState) {
    //     _store.state = cachedState
    //   } else {
    //     stateCache.set(storeClass, _store.state)
    //   }
    // }
    var _a = react_1.useState(store), _store = _a[0], setStore = _a[1];
    var _b = react_1.useState(_store.state), state = _b[0], setState = _b[1];
    react_1.useEffect(function () {
    });
    react_1.useEffect(function () {
        var subscription = _store.subscribe(function (nextState) {
            if (!shallowPartialEqual_1.default(nextState, state)) {
                console.log(1111);
                stateCache.set(storeClass, nextState);
                setState(nextState);
            }
        });
        return function () {
            if (_store["__mountStatus__"] === "local") {
                if (system.get(storeClass)) {
                    console.log(222);
                    stateCache.delete(storeClass);
                    console.log(3333, _store.context.path);
                    system.getRoot().getContext().stop(_store.context.self);
                    console.log(system.getRoot().getContext().children);
                }
            }
            subscription.unsubscribe();
        };
    });
    return [state, system.dispatch.bind(system)];
}
exports.useStore = useStore;
