import { System, Store } from "ractor";

export function name(system: System, store: new () => Store<any>) {
  return system.getRoot().getContext().child(store.name) ? undefined : store.name
}