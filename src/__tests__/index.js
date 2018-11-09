import * as React from "react"
import { useEffect, useState } from "react"
import { render, fireEvent, cleanup, wait } from 'react-testing-library'
import { System, Store } from "ractor";
import { useStore } from "../useStore";
import { Provider } from "../provider";

afterEach(cleanup)


test("render counter with local store", () => {
  /* ractor parts */
  const system = new System("test")

  class Increment { }
  class Decrement { }

  class CounterStore extends Store {
    constructor() {
      super()
      this.state = { value: 0 }
    }
    createReceive() {
      return this.receiveBuilder()
        .match(Increment, () => this.setState({ value: this.state.value++ }))
        .match(Decrement, () => this.setState({ value: this.state.value-- }))
        .build()
    }
  }

  /* react parts */
  function Counter() {
    const [state, dispatch] = useStore(CounterStore)
    return (
      <div>
        <h1 data-testid="h1">{state.value}</h1>
        <button data-testid="increment" onClick={() => dispatch(new Increment)}>increment</button>
        <button onClick={() => dispatch(new Decrement)}>decrement</button>
      </div>
    )
  }

  function App() {
    return (
      <Provider system={system}>
        <Counter />
      </Provider>
    )
  }

  /* test parts */
  const { getByText, getByTestId, container, asFragment, rerender } = render(<App />)

  // this triggers the effect to fire
  rerender(<App />)

  // const incrementButton = getByTestId('increment')
  // const h1 = getByTestId('h1')
  // expect(h1.firstChild.textContent).toBe('0')

  // fireEvent.click(incrementButton)

  // expect(h1.firstChild.textContent).toBe("1")
})

// test("render counter with global store", () => {
//   let i = 0
//   let fn = jest.fn()
//   /* react parts */
//   function Counter() {
//     const [state, setState] = useState(i)
//     console.log(111)
//     return (
//       <div>
//         <h1 data-testid="h1">{state}</h1>
//         <button data-testid="increment" onClick={() => (setState(1), i = 5)}>increment</button>
//         <button onClick={() => { }}>decrement</button>
//       </div>
//     )
//   }

//   function App() {
//     return (
//       <Counter />
//     )
//   }

//   /* test parts */
//   const { getByText, getByTestId, container, asFragment, rerender } = render(<App />)

//   // this triggers the effect to fire
//   // rerender(<App />)

//   const incrementButton = getByTestId('increment')
//   const h1 = getByTestId('h1')
//   expect(h1.firstChild.textContent).toBe('0')
  
//   fireEvent.click(incrementButton)

//   expect(h1.firstChild.textContent).toBe("2")
// })