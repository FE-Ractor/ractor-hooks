import { useContext, useEffect, useState } from "react"
import { Store } from "ractor"
import { RactorContext } from "./context";
import { ActorRef } from "js-actor";
import shallowPartialEqual from "./shallowPartialEqual";

export function useStore<T>(storeClass: new () => Store<T>): [T, (message: object) => void, (message: object) => void] {
  const { system } = useContext(RactorContext)
  const storeRef = system.actorOf(new storeClass) as ActorRef<Store<T>>
  const store = storeRef.getInstance()
  const [state, setState] = useState(store.state)

  useEffect(() => {
    const subscription = store.subscribe(nextState => {
      if (!shallowPartialEqual(nextState, state)) {
        setState(nextState)
      }
    })
    return subscription.unsubscribe
  })
  return [state, storeRef.tell, system.dispatch]
}