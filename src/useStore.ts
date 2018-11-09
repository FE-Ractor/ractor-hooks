import { useContext, useEffect, useState } from "react"
import { Store } from "ractor"
import { RactorContext } from "./context";
import shallowPartialEqual from "./shallowPartialEqual";

const stateCache = new Map<new () => Store<any>, any>()

export type StoreClass<T> = new (...args: any[]) => Store<T>

export function useStore<T>(storeClass: StoreClass<T>): [T, (message: object) => void] {
  const { system } = useContext(RactorContext)
  // _store["__mountStatus__"] = _store["__mountStatus__"] || (storeRef ? "global" : "local")
  // if (_store["__mountStatus__"] === "local") {
  //   const cachedState = stateCache.get(storeClass)
  //   if (cachedState) {
  //     _store.state = cachedState
  //   } else {
  //     stateCache.set(storeClass, _store.state)
  //   }
  // }
  // const [_store, setStore] = useState(store)
  const [state, setState] = useState(null)

  if (state === null) {
    const storeRef = system.get(storeClass)
    const store = storeRef ? storeRef.getInstance() : system.actorOf(new storeClass).getInstance() as Store<T>
    setState(store.state)
  }

  useEffect(() => {
    const subscription = _store.subscribe(nextState => {
      if (!shallowPartialEqual(nextState, state)) {
        console.log(1111)
        stateCache.set(storeClass, nextState)
        setState(nextState)
      }
    })
    return () => {
      if (_store["__mountStatus__"] === "local") {
        if (system.get(storeClass)) {
          console.log(222)
          stateCache.delete(storeClass)
          console.log(3333, _store.context.path)
          system.getRoot().getContext().stop(_store.context.self)
          console.log(system.getRoot().getContext().children)
        }
      }
      subscription.unsubscribe()
    }
  })
  return [state, system.dispatch.bind(system)]
}