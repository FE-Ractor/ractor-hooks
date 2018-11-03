import * as React from "react"
import { System, Store } from "ractor";
import { useStore } from "../useStore";
import { Provider } from "../provider";

/* ractor parts */
const system = new System("test")

class Increment { }
class Decrement { }

class CounterStore extends Store<{ value: number }> {
  createReceive() {
    return this.receiveBuilder()
      .match(Increment, () => this.setState({ value: this.state.value++ }))
      .match(Decrement, () => this.setState({ value: this.state.value-- }))
      .build()
  }
}

/* react parts */
function Counter() {
  const [state, tell, dispatch] = useStore(CounterStore)

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => dispatch(new Increment)}>increment</button>
      <button onClick={() => tell(new Decrement)}>decrement</button>
    </div>
  )
}

function App() {
  return (
    <Provider system={system} stores={[]}>
      <Counter />
    </Provider>
  )
}