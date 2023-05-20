---
created_date: 2021-11-23 23:27
updated_date: 2023-03-05 17:51
title: CSS 自定义属性
tags:
  - CSS
slug: css-custom-var
brief: css 自定义属性的使用方式和使用场景
---


## 背景

1. 原生 CSS 在代码复用方面有所欠缺，例如典型的例子 - 主题，每一个 `font-size`、`color`、`border` 等属性值必须重复编写，若有改动则每一处都要修改。
2.  `font-size`、`color` 等单纯就是一个值，就像魔术数字，没有语义。
3. 比较难使用 JS 动态修改，使用 class 不够明确，使用 style 又不能修改 `::after` 等伪元素。



## 自定义属性(变量)

属性名能够自定义，属性值是任意合法 CSS 值。

属性名以 `--` 开头，大小写敏感，如 `--custom: 15px`，通过 `var(--custom, defaultValue)` 引用

```css
element {
  --main-custom-name: 90px;
}
child {
  width: var(--main-custom-name, 40px)
}
```

默认会被继承，所以定义在 `:root` 伪类下，则所有子元素都可以获取到。

若自定义属性不合法或不存在，会被该属性的默认值替换，例如

```CSS
div {
  display: var(--layout) // block
}
```



## 通过 JS 设置

```javascript
document.querySelector('.foo').style.getPropertyValue('--primary')
document.querySelector('.foo').style.setProperty('--primary', 'blue')
```



## 使用场景

1. 主题
2. 依赖某个元素或配合一些如 `IntersectionObserver`、`getBoundingClientRect` 动态设置一个元素的样式

## 参考

1. https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties



> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
