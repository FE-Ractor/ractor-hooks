import { useContext, useEffect, useState } from "react"
import { Store } from "ractor"
import { RactorContext } from "./context";
import shallowPartialEqual from "./shallowPartialEqual";

export function useStore<T>(storeClass: new (...args: any[]) => Store<T>): [T, (message: object) => void] {
  const { system } = useContext(RactorContext)
  const storeRef = system.get(storeClass)
  const store: Store<T> & { [key: string]: any } = storeRef ? storeRef.getInstance() : system.actorOf(new storeClass).getInstance()
  store["__mountStatus__"] = store["__mountStatus__"] || (storeRef ? "global" : "local")

  const [state, setState] = useState(store.state)

  useEffect(() => {
    if (store["__mountStatus__"] === "local") {
      store.context.stop()
    }
  }, [])

  useEffect(() => {
    const subscription = store.subscribe(nextState => {
      if (!shallowPartialEqual(nextState, state)) {
        setState(nextState)
      }
    })
    return subscription.unsubscribe
  })
  return [state, system.dispatch.bind(system)]
}