import 'jest-dom/extend-expect'
import * as React from "react"
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
// import test from 'jest'
import { System, Store } from "ractor";
import { useStores } from "../src/useStores";
import { Provider } from "../src/provider";

/* ractor parts */
const system = new System("test")

class Increment { }
class Decrement { }

class CounterStore extends Store {
  state = { value: 0 }
  createReceive() {
    return this.receiveBuilder()
      .match(Increment, () => this.setState({ value: this.state.value++ }))
      .match(Decrement, () => this.setState({ value: this.state.value-- }))
      .build()
  }
}

/* react parts */
function Counter() {
  const [state, dispatch] = useStores([CounterStore])
  console.log(state, 6666666666666)
  return (
    <div>
      <h1 className="header">{state.value}</h1>
      <button onClick={() => dispatch(new Increment)}>increment</button>
      <button onClick={() => dispatch(new Decrement)}>decrement</button>
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

function Foo() {
  const state = { value: 0 }
  return <h1>{state.value}</h1>
}

/* test parts */
test.afterEach(cleanup)

test.cb("render counter", () => {
  const { getByText, getByTestId, container, asFragment } = render(<App />)

  const h1 = container.getElementsByTagName("h1")
  console.log(h1)


})
