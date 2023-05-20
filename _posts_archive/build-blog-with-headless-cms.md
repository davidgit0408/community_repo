---
created_date: 2022-03-17 00:40
updated_date: 2023-03-07 18:00
archive:
tags:

  - Others
keywords:
  -
title: 用 Headless CMS 管理博客
slug: build-blog-with-headless-cms
brief: 简单介绍用 keystone 作为博客的内容管理器
---

## 背景

上一篇[使用 Next.js 搭建个人博客](https://marsk6.github.io/posts/build-blog-with-nextjs)已经搭建起前端界面，但管理和组织博客内容还很原始，缺少持久化和分类统计，因此需要一个管理后台来管理博客内容，并提供 API 给前端页面调用。
实现一个管理后台需要
- 数据库表结构设计
- 业务逻辑设计及实现（CRUD）
- 接口设计及实现
- 产品运营管理后台设计及开发
- ...
但我目前不想投入时间从 0-1 实现一个管理后台，因此这里选用 Headless CMS

## 什么是 Headless CMS

如果有了解 Headless Browser（无头浏览器，没有前端界面），那么也可以把 Headless CMS 理解为没有内容展示界面，只有管理后台的 CMS。那意味着同一套 api 服务多个终端。
![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/build-blog-with-headless-cms-1.png)

## Keystone

keystone 和多数 Headless CMS 类似，提供一个管理后台界面和 GraphQL API 用于内容查询。

keystone 开源，有完善的文档，灵活的关系，强大的过滤功能。

## 集成 keystone

```shell
yarn add @keystone-6/core
```

修改 `.gitignore`，添加

```
.keystone
```

更新 npm script

```json
"scripts": {
  ...
	"keystone:start": "keystone start",
  "next:dev": "next dev -p 4000",
  "postinstall": "keystone postinstall",
},

```

```shell
yarn keystone:start
```

```shell
yarn next:dev
```

## 使用 keystone

创建 `keystone.ts`

### 配置 Lists

先定义一个实体，Post、User 都可以被设计成实体，多个实体组成 lists。

定义 Post，包括 slug、title、tags 等字段（[fields](https://keystonejs.com/docs/fields/overview)）

```javascript
const Post: Lists.Post = list({
  fields: {
    /* 字段名: 字段类型  */
    slug: text({ isIndexed: 'unique' }),
    title: text({ validation: { isRequired: true } }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
      ui: { displayMode: 'select' },
    }),
  },
});
```

![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/build-blog-with-headless-cms-3.png)

定义 Tag

```JavaScript
const Tag = list({
	fields: {
		name: text(),
		posts: relationship({
			ref: 'Post.tags',
			many: true,
			ui: { hideCreate: true },
		}),
	},
})
```

最后加到 lists 上

```javascript
export default config({
	...
	lists: { Post, Tag },
})
```

![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/build-blog-with-headless-cms-4.png)

### 调用查询 API

keystone 对 GraphQL API 进行了封装，对外提供一套函数进行 CRUD

```JavaScript
{
	findOne({ where: { id }, query }),
	findMany({ where, take, skip, orderBy, query }),
	count({ where }),
	createOne({ data, query }),
	createMany({ data, query }),
	updateOne({ where: { id }, data, query }),
	updateMany({ data, query }),
	deleteOne({ where: { id }, query }),
	deleteMany({ where, query }),
}
```

调用方式 `query.<listName>`，`listName` 即实体名，例如 `query.Post`、`query.Tag`

获取所有文章

```javascript
import { query } from '.keystone/api'; // .keystone 会自动生成

export async function getAllPosts() {
  const posts = await query.Post.findMany({
    orderBy: [{ ctime: 'desc' }],
    query: 'slug title tags { name } ctime date',
  });
  return posts;
}
```

### field - relationships

relationships 是实体的一种 field，用于在不同实体 field 之间建立关联关系
例如一篇博文会包含 date，tag、category、author 等元信息，当要分开管理时就可以用到 relationships
例如 Post 可以关联多个 Tag，一个 author 可以有多个 Post

```ts
const Post: Lists.Post = list({
  fields: {
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
    }),
  },
});
```

![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/build-blog-with-headless-cms-5.png)

Tag 也可以关联多个 Post

```ts
const Tag = list({
  fields: {
    name: text(),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
    }),
  },
});
```

![](https://cdn.jsdelivr.net/gh/marsk6/image-center@master/build-blog-with-headless-cms-2.png)

这样就可以通过 keystone 的 api 获取 tag 的种类和一篇 post 关联了哪些 tag 了

## 部署

部署没有变化

## 参考

- [keystone 与 nextjs 集成](https://keystonejs.com/docs/walkthroughs/embedded-mode-with-sqlite-nextjs)

> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
