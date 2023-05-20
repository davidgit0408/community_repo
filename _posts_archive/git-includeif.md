---
created_date: 2021-08-12 19:28
updated_date: 2023-03-05 23:53
archive:
tags:

  - git
keywords:
  -
title: Git 多用户配置
slug: git-includeif
brief: 用 git includeif 实现多用户信息管理
---

## 前言

安装 Git 后会设置一个全局的用户名/邮箱，Git 的全局配置保存在 `~/.gitconfig`。

这样，公司项目和个人项目的 `git commit` 信息都会用全局的用户名/邮箱，很明显个人项目最好不要包含公司的任何信息。

那如何单独为项目设置的用户名？  
可以用 `git config user.name "your name"` 为项目单独设置，也可以用 `includeIf` 特性为部分项目设置

## includeIf

Git v2.13 提供 `includeIf` 条件配置，可以指定某个目录所使用的 `gitconfig`

首先，创建 `.gitconfig-work` 文件，用于存放公司项目的目录

```shell
# ~/.gitconfig-work
[user]
  name = my work
  email = work@company.net
```

然后，创建 `.gitconfig-me` 文件，为存放个人项目的目录

```shell
# ~/.gitconfig-me
[user]
  name = my github
  email = me@gmail.net
```

最后，修改 `.gitconfig` 文件

```shell
# ~/.gitconfig
[includeIf "gitdir:~/work/"]
  path = .gitconfig-work
[includeIf "gitdir:~/me/"]
  path = .gitconfig-me
```

个人项目放到 `~/me/` 下，工作项目放到 `~/work/`，这样就不用每个项目单独设置了。

### 参考

1. https://stackoverflow.com/questions/8801729/is-it-possible-to-have-different-git-configuration-for-different-projects

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
