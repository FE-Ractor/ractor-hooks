# Ractor-hooks

## Provider
在这里注入 system

```ts
  import { Provider } from "ractor-hooks"
  import { System } from "ractor"

  function App() {
    return <Provider system={new System("app")}><Counter /></Provider>
  }
```

## useStore
输入 Ractor Store 的子类作为参数，输出实例化之后的状态。

```ts
function Counter() {
  const counter = useStore(CounterStore)
  return jsx
}
```

## useSystem
输出 `Provider` 注入的 system。建议直接倒入 system，不太建议使用这种方式获取 system。

```ts
function Counter() {
  const system = useSystem(CounterStore)
  system.dispatch(new Increment)
  return jsx
}
```