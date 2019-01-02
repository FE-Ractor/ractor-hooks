import * as React from "react"
import { RactorContext, Context } from "./context"
import { name } from "./name"

export function Provider({ system, stores = [], children }: React.Props<Context> & Context) {
  stores.forEach(store => system.actorOf(new store, name(system, store)))
  return <RactorContext.Provider value={{ system, stores }}>{children}</RactorContext.Provider>
}