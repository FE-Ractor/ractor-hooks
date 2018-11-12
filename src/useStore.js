"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("./context");
var shallowPartialEqual_1 = require("./shallowPartialEqual");
function useStore(storeClass) {
    var system = react_1.useContext(context_1.RactorContext).system;
    var storeRef = system.get(storeClass);
    var store = storeRef ? storeRef.getInstance() : system.actorOf(new storeClass).getInstance();
    store["__mountStatus__"] = store["__mountStatus__"] || (storeRef ? "global" : "local");
    var _a = react_1.useState(store.state), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        if (store["__mountStatus__"] === "local") {
            store.context.stop();
        }
    }, []);
    react_1.useEffect(function () {
        var subscription = store.subscribe(function (nextState) {
            if (!shallowPartialEqual_1.default(nextState, state)) {
                setState(nextState);
            }
        });
        return subscription.unsubscribe;
    });
    return [state, system.dispatch.bind(system)];
}
exports.useStore = useStore;
