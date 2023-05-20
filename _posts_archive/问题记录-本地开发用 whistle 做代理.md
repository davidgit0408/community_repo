---
created_date: 2021-03-06 18:55
updated_date: 2023-03-06 23:26
archive:
tags:

  - 问题记录
keywords:
  -
title: 问题记录-本地开发用 whistle 做代理
slug: whistle-proxy-in-local-dev
---

## 背景

在本地用 localhost 开发时，由于 `SameSite cookies` 的限制，请求跨域的后端 API 浏览器不会自动带上 cookie。

一种解决办法是在本地用 whistle 做反向代理，开发时访问对外域名而绕过跨域的限制，下面记录遇到的问题。

## 问题 1  net::ERR_SSL_PROTOCOL_ERROR

```
https://test.foo.com http://localhost:4900
```

配置 whistle rule，用 @vue/cli-service 启动项目后，访问  `https://test.foo.com`  出现下面的错误   `net::ERR_SSL_PROTOCOL_ERROR`
![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/20230307110309.png)

`https://localhost:4900/sockjs-node/info` 是热更新添加的链接，用来检测 WebSocket 服务可用性，由于我访问的 web 是 https，所以 WebSocket 也必须是 wss

![](https://confluence.shopee.io/download/attachments/1659227106/image2023-3-6_16-33-2.png?version=1&modificationDate=1678091583000&api=v2)

### 处理方法

配置 webpack-dev-server，让 `https://localhost:4900/sockjs-node/info` 变成 `https://test.foo.com/sockjs-node/info`

```js
devServer: {
  ...,
  public: 'test.foo.com'
}
```

添加 whistle rule

```
wss://test.foo.com ws://localhost:4900
```

## 问题 2  Invalid Host/Origin header

wss 请求会返回  `Invalid Host/Origin header`

为了防止 DNS Rebinding 攻击，webpack-dev-server 会取请求头的 host/orign 和配置的 devServer.host 或 devServer.public 做比较，只允许配置相同的请求

### 处理方法

方法 1

配置 webpack-dev-server 的  allowedHosts

```js
devServer: {
  allowedHosts:  'all',// webpack 4.0+
}
```

方法 2

配置 whistle rule，修改请求头的 host/origin

```
  wss://seller-cms.test.shopee.com ws://localhost:4900 reqHeaders://{wss-header}
```

**wss-header**

```
{
  "Host": "localhost:4900",
  "Origin": "http://localhost:4900"
}
```

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
