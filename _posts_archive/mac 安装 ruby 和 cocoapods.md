---
created_date: 2023-04-27 22:52
updated_date: 2023-04-29 16:41
archive:
tags:
  - 开发工具
keywords:
  - mac 安装 ruby
title: mac 安装 ruby 和 cocoapods
slug: install-ruby-cocoapods-on-mac
brief: 苹果 Mac 系统安装 ruby 和 cocoapods 的过程，碰到的问题
---

### 查看 ruby 版本

```shell
ruby -version
# 输出
ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin22]
```

这是 Mac 系统自带的 ruby

### 安装指定 ruby 版本

先安装 `rvm`，`rvm` 是 ruby 版本管理器，类似 NodeJS 的是 `nvm`

```shell
curl -sSL https://get.rvm.io | bash -s stable --ruby
```

安装指定版本

```shell
rvm install 3.2.2
```

设置默认版本

```shell
rvm use 3.2.2 --default
```

### 安装 cocoapods

```shell
sudo gem install cocoapods

pod --version
```

### 常见问题

#### 用 brew 安装 ruby 后版本还是默认的？

查看 brew 安装的包的位置

```shell
brew config
...
HOMEBREW_PREFIX: /opt/homebrew
```

因此 brew 安装的包位于 `/opt/homebrew/Cellar/`，如果配置环境变量难，那就用 `rvm`

#### 安装 cocoapods 后 pod 命令还是失败？

可能安装到其他 ruby 版本下了

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
