---
created_date: 2021-10-15 20:12
updated_date: 2023-03-07 16:39
tags:
  - react-native

title: Expo 简介
slug: expo-intro
brief: expo 是什么？expo 集成了 React Native 生态，用于快速开发和部署 React Native 应用，开发者只需懂 React Native
---

# Expo 简介

> Expo 是一个用于 React 应用的框架和平台。其 Expo SDK 提供了 React Native 和 Native 的组件或工具，帮助开发者仅使用 JavaScript/TypeScript，在 iOS、Android 和 Web 应用上开发、构建、部署和快速迭代。 -- https://docs.expo.dev/

## 背景

开发、构建、发布基于 React Native 的 App 时，可能要修改 Native 的代码或 App 配置，这就需要安装 Xcode 或 Android Studio，配置环境，以及熟悉 iOS 或 Android 开发。这对开发者来说存在相当大的成本。

Expo 已经帮你集成了这些，你只需专注 JavaScript/TypeScript 的代码开发，你可以从 Expo SDK 引入 React Native 或 Native 的组件，另外可以下载 Expo Go App，便于在真机上调试代码、预览效果。

## 开发

#### 初始化项目

```shell
npm install --global expo-cli
# 创建新项目
expo init my-project
```

#### 目录结构

```shell
├── App.tsx
├── app.json # app 配置如图标、名称、版本等等
├── assets
├── babel.config.js
├── node_modules
├── package.json
├── tsconfig.json
└── yarn.lock
```

#### 修改默认入口

```json
// app.json
{
  "expo": {
    "description": "",
    "entryPoint": "./index.ts"
  }
}
```

```javascript
// index.ts
import { registerRootComponent } from 'expo';
import App from '@src/App';

registerRootComponent(App);
```

#### 安装功能模块

```shell
expo install expo-camera
```

有 `yarn.lock` 时，`expo install` 使用 yarn 安装

有 `package-lock.json` 时， `expo install` 使用 npm 安装

## 发布

Expo 也是个沙盒平台，可以在 Expo Go App 访问开发者发布的代码，例如 React Native 官方文档里样例 demo

![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/expo-intro-1.png)

最后，Expo 的一套集成工具让前端开发者无需过多关注 Native 的配置，大大降低了开发成本，使 App 可以快速迭代。

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
