---
created_date: 2022-02-27 11:48
updated_date: 2023-03-05 20:36
title: 使用 Next.js 搭建个人博客
slug: build-blog-with-nextjs
brief: 用 next.js 搭建个人静态博客
tags:

---

现阶段有非常非常多的静态博客生成工具（[site generators](https://jamstack.org/generators/)），Hexo、VuePress、Docusaurus 等等，基本只需把 markdown 文件配置到指定目录，无需编写其他代码即可建站。

本文记录一下使用 next.js 从 0 到 1 搭建一个博客网站的流程。

## 初始化项目

使用 blog-starter-typescript 作为模板创建一个项目

`npx create-next-app my-blog --use-yarn --example "https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript"`

> 模版 [example](https://github.com/vercel/next.js/tree/canary/examples) 是个大仓库，包含了 next.js 与各种技术集成的样例

## 目录结构

```shell
.
├── @types
├── README.md
├── _posts # 博客 .md 文件
│   ├── dynamic-routing.md
│   ├── hello-world.md
│   └── preview.md
├── components
├── lib # 解析 .md 文件，提取文章数据
│   ├── api.ts
│   ├── constants.ts
│   └── markdownToHtml.ts
├── next-env.d.ts
├── package.json
├── pages # blog 各个页面
│   ├── _app.tsx # 自定义初始化页面
│   ├── _document.tsx #自定义 html body
│   ├── index.tsx
│   └── posts
├── postcss.config.js
├── public
├── styles
├── tailwind.config.js
├── tsconfig.json
└── types
```

模版是简单的 blog 样例，包含读取解析 markdown 文件、加载文章数据、生成首页、生成 blog 文章页面。

用到的 npm 包：

- `gray-matter` 处理 yaml front matter
- `remark` 解析 markdown，把 markdown 转成 ast
- `remark-html` 把 ast 转成 html
- `tailwindcss` 原子化样式 class，无需头疼组件 class 的命名

## 生成页面

生成的页面对应 pages 目录下的文件，页面的路由为文件路径名，例如 `pages/about.tsx` ，则页面路由为 `/about`。

一般项目的目录都会有 src 目录，所以 next.js 也支持 src/pages 目录。

很明显，不可能为每篇 blog 文章都创建一个文件，那么就需用到**动态路由（dynamic routes）**。

### getStaticPaths

**动态路由**形如 `pages/posts/[slug].tsx`，然后就会生成 `posts/1`, `posts/2`，slug 可以理解为前端路由的路径参数 params。

页面需定义 `getStaticPaths` 方法，必须返回 `params` 参数。

```tsx
// pages/posts/[slug].tsx
const Post = () => {...}
export default Post

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
  }
}
```

## 获取数据

### getStaticProps

`getStaticProps` 会在服务端执行，因此可以使用 node api，读取文件系统，获取 markdown 内容。

返回值会作为页面组件的 props，入参为 `getStaticPaths`的返回值。

```ts
const Post = ({ post, morePosts }: Props) => {
  return <Layout>...</Layout>;
};

export default Post;

export async function getStaticProps({ params }) {
  const post = getPostBySlug();
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
```

## 定制化

在 pages 下还有 `_app.tsx` 和 `_document.tsx`，这两个文件用于定制化页面。

next.js 默认使用 `next/app` 初始化页面，`_app.tsx`会替代`next/app`初始化页面，因此可以在 `_app.tsx`放一些公共逻辑，公共的布局，导入样式等。

```tsx
import { AppProps } from 'next/app';
import 'github-markdown-css/github-markdown-light.css';
import '../styles/index.css';

import Layout from '@/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

同样，`_document.tsx` 用于为 html、body 做定制化

```tsx
import { Html, Head, Main, NextScript } from 'next/document';
// 必须导入 Html、Head、Main、NextScript，不能省略
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## 结语

一个 blog 的原型基本就搭建起来了，剩余就是部署到静态托管服务上（Vercel、GitHub Page 等），另外可以参照 [example](https://github.com/vercel/next.js/tree/canary/examples)，与其他技术集成，继续美化 blog。

## 参考链接

- [Next.js 官方文档](https://nextjs.org/docs)
- [学习 Next.js](https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website)