import { Store } from "ractor";

export class StateCacheStore extends Store<any> {
  state = {
    stateCache: new Map()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(SetState, ({ key, state }) => {
        const stateCache = this.state.stateCache
        stateCache.set(key, state)
        this.setState({ stateCache })
      })
      .build()
  }
}

export class SetState {
  constructor(public key: new () => Store<object>, public state: object) { }
}