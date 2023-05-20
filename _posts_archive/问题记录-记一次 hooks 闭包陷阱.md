---
created_date: 2022-01-07 21:45
updated_date: 2023-03-07 17:18
archive:
tags:

  - react-hook
keywords:
  -
title: 问题记录-记一次 react hooks 闭包陷阱
slug: log-of-reack-hooks-trap
brief: 使用 react hooks 遇到状态是旧的，没有更新闭包陷阱，总结出现的场景和修改方法
---


### 出现闭包陷阱的场景

- 函数里面更新 state 同时使用了 state

```JavaScript
    const [val, setVal] = useState(0)
    const fn0 = () => {
      saveLatestVal(val)
    }
    const fn1 = () => {
      setVal(1)
      fn0()
    }
```

- 有异步，多次变更复杂 state 时

```JavaScript
const handleClick = async (key) => {
	setLoadingMap({ ...loadingMap, [key]: true });
	await delay(3000);
	setLoadingMap({ ...loadingMap, [key]: false });
};
```

### 解决方案

- 使用 useRef，ref 具有穿透性
- 用 useEffect，例如在嵌套函数里变更另一个 state，在 useEffect 里执行 saveLatestVal

```JavaScript
    const [val, setVal] = useState(0)
    const [version, setVersion] = useState(0)
    const fn0 = () => {
      setVersion(1)
    }
    const fn1 = () => {
      setVal(1)
      fn0()
    }
    useEffect(() => saveLatestVal(val), [version])
```

- 使用 useReducer，分离 state，对异步，多次变更复杂 state 时

```JavaScript
const handleClick = async (key) =>
	dispatch({ [key]: true });
	await delay(3000);
	dispatch({ [key]: false });
};
```

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
