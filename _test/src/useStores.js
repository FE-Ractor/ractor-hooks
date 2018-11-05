"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("./context");
var shallowPartialEqual_1 = require("./shallowPartialEqual");
function useStores(storeClasss) {
    var _a = react_1.useContext(context_1.RactorContext), system = _a.system, stores = _a.stores;
    var _stores = storeClasss.map(function (storeClass) {
        for (var _i = 0, stores_1 = stores; _i < stores_1.length; _i++) {
            var store = stores_1[_i];
            if (store instanceof storeClass) {
                return store;
            }
        }
        var newStoreRef = system.actorOf(new storeClass);
        var newStore = newStoreRef.getInstance();
        return newStore;
    });
    var storeHooks = _stores.map(function (store) { return react_1.useState(store.state); });
    react_1.useEffect(function () {
        var subscriptions = [];
        _stores.forEach(function (store, index) {
            var _a = storeHooks[index], prevState = _a[0], setState = _a[1];
            var subscription = store.subscribe(function (nextState) {
                if (!shallowPartialEqual_1.default(nextState, prevState)) {
                    setState(nextState);
                }
            });
            subscriptions.push(subscription);
        });
        return function () { return subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); }); };
    });
    var states = storeHooks.map(function (storeHook) { return storeHook[0]; });
    return states.concat([system.dispatch]);
}
exports.useStores = useStores;
