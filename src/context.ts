import { createContext } from 'react'
import { System, Store } from 'ractor';

export type Context = {
  system: System,
  stores?: (new () => Store<object>)[]
}

export const RactorContext = createContext({} as Context)
