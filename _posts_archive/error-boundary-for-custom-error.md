---
created_date: 2021-12-09 21:48
updated_date: 2023-03-05 23:22
archive:
tags:

  - react
title: ErrorBoundary 处理自定义错误
slug: error-boundary-for-custom-error
brief: 如何使用 react 的 error boundary 处理所有错误？
---


## 背景

[错误边界](https://zh-hans.reactjs.org/docs/error-boundaries.html)是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI。

错误边界在==渲染期间、生命周期方法和整个组件树的构造函数==中捕获错误。

## 问题

`react` 强调了只有上面 3 种实现下才会捕获错误。

无法自动捕获下面 4 种实现

- 事件处理
- 异步代码（例如 `setTimeout` 、`Promise`回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件）

通常希望业务代码能够复用 `ErrorBoundary` 的错误处理逻辑。

## 实现

如果要 `ErrorBoundary` 能处理业务代码的自定义错误，只要在渲染期间抛出错误即可。

### class component

```javascript
try {
  const res = await fetchMayError()
} catch (err) {
  this.setState(() => {
    throw err
  })
}
```

### hooks

```typescript
function useErrorHandler() {
  const [error, setError] = React.useState(null)
  if (error != null) throw error
  return setError
}

function Foo() {
  const handleError = useErrorHandler()
  fetchMayError().catch(handleError)
  return <div></div>
}
```

## Inspired

1. https://github.com/bvaughn/react-error-boundary

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
