import { useContext, useEffect, useState } from "react"
import { Store, Subscription } from "ractor"
import { RactorContext } from "./context";
import { ActorRef } from "js-actor";
import shallowPartialEqual from "./shallowPartialEqual";

export type StoreClass<T> = new (...args: any[]) => Store<T>

export function useStores<T1, T2, T3, T4, T5>(storeClasss: [StoreClass<T1>, StoreClass<T2>, StoreClass<T3>, StoreClass<T4>, StoreClass<T5>]): [T1, T2, T3, T4, T5, (message: object) => void]
export function useStores<T1, T2, T3, T4>(storeClasss: [StoreClass<T1>, StoreClass<T2>, StoreClass<T3>, StoreClass<T4>]): [T1, T2, T3, T4, (message: object) => void]
export function useStores<T1, T2, T3>(storeClasss: [StoreClass<T1>, StoreClass<T2>, StoreClass<T3>]): [T1, T2, T3, (message: object) => void]
export function useStores<T1, T2>(storeClasss: [StoreClass<T1>, StoreClass<T2>]): [T1, T2, (message: object) => void]
export function useStores<T1>(storeClasss: [StoreClass<T1>]): [T1, (message: object) => void]
export function useStores(storeClasss: StoreClass<any>[]): any {
  const { system, stores } = useContext(RactorContext)
  const _stores = storeClasss.map(storeClass => {
    for (let store of stores) {
      if (store instanceof storeClass) {
        return store
      }
    }
    const newStoreRef = system.actorOf(new storeClass) as ActorRef<Store<any>>
    const newStore = newStoreRef.getInstance()
    return newStore
  })
  const storeHooks = _stores.map(store => useState(store.state))

  useEffect(() => {
    const subscriptions: Subscription[] = []
    _stores.forEach((store, index) => {
      const [prevState, setState] = storeHooks[index]
      const subscription = store.subscribe(nextState => {
        if (!shallowPartialEqual(nextState, prevState)) {
          setState(nextState)
        }
      })
      subscriptions.push(subscription)
    })

    return () => subscriptions.forEach(subscription => subscription.unsubscribe())
  })
  const states = storeHooks.map(storeHook => storeHook[0])
  return [...states, system.dispatch]
}