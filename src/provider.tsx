import * as React from "react"
import { RactorContext, Context } from "./context"

export function Provider({ system, stores = [], children }: React.Props<Context> & Context) {
  return <RactorContext.Provider value={{ system, stores }}>{children}</RactorContext.Provider>
}