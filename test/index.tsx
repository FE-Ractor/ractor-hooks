// import 'jsdom-global/register'
import * as React from "react"
import test from 'ava'
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { System, Store } from "ractor";
import { useStores } from "../src/useStores";
import { Provider } from "../src/provider";

/* ractor parts */
const system = new System("test")

class Increment { }
class Decrement { }

class CounterStore extends Store<{ value: number }> {
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
  console.log(222222222)
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
  console.log(111111111111)
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

configure({ adapter: new Adapter() })

test.cb("render counter", t => {
  const wrapper = shallow(<App />)

  setTimeout(() => {
    t.is(wrapper.find(".header").text(), "0")
    t.end()

  }, 3000)
})