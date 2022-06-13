---
description: '博客特性演示！'
date: 2011-9-10 14:36:00
---

import Callout from 'nextra-theme-docs/callout'
import Bleed from 'nextra-theme-docs/bleed'

import Authors, { Author } from 'components/authors'

# Hello World

<Authors date="2021年8月27日">
  <Author name="Shu Ding" link="https://twitter.com/shuding_" />
  <Author name="terwer" link="https://github.com/terwer" />
</Authors>

## SWR 1.0 发布

<Callout emoji="💡">
文章更新历史<br/>
2022/05/29 fix:Deepin 20.6也验证通过。
</Callout>

大约两年前，我们 [开源了](https://twitter.com/vercel/status/1188911002626097157) SWR——广受大家喜爱的小巧 React 数据请求库。今天，我们迎来了另一个里程碑：SWR 1.0 版本发布了！

## 新变化

### 更轻量

[性能](/docs/advanced/performance)是 SWR 最重要的特性之一。在 1.0 中，我们在**没有删除任何现有功能**的前提下，将库变得更轻量：

- 核心减小为 41%（压缩后为 24%，**3.9 kB**）
- 安装包减小为 52%
- 改进 tree-shaking

让库更轻量的原因有很多：比如你的应用程序包将更小、运行时更精简，以及 `node_modules` 目录更小。

我们还改进了打包方式，现在支持路径导入：

```js
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
```

如果你不使用 `useSWRInfinite`，它将不会包含在你的应用程序中。

### 预请求数据

在 1.0 中，有一个新的 `fallback` 选项，你可以提供任何预请求数据作为带有特定 key 的所有 SWR hook 的初始值：

```jsx
<SWRConfig value={{
  fallback: {
    '/api/user': { name: 'Bob', ... },
    '/api/items': ...,
    ...
  }
}}>
  <App/>
</SWRConfig>
```

这对于 SSG、SSR 和测试中的数据模拟等场景非常有帮助。查看文档 [Next.js SSG 和 SSR](/docs/with-nextjs) 了解更多细节。

为了更好的一致性以及避免混淆，旧的 `initialData` 现已被重命名为 `fallbackData`，它仍然为给定的 hook 提供一个预请求值。

### 不可变模式

有时你希望将永远不会改变的资源标记为**不可变的**。最好是禁用它的自动重新请求且只发出一次请求。现在有了这样一个辅助 hook 就更容易了：

```jsx
import useSWRImmutable from 'swr/immutable'

// ...

useSWRImmutable(key, fetcher, options)
```

它具有与 `useSWR` hook 完全相同的 API，但它永远不会在浏览器标签页获得焦点或网络恢复时重新请求。还有一个新选项 `revalidateIfStale`，你可以使用它来精确地控制行为。了解更多信息请查看[这里](/docs/revalidation#disable-automatic-revalidations)。

### 自定义缓存 Provider

默认情况下，SWR 使用单个全局缓存来存储所有数据。在 1.0 中，你可以使用新的 `provider` 选项自定义：

```jsx
<SWRConfig value={{
  provider: () => myCache
}}>
  <App/>
</SWRConfig>
```

你可以使用这个新功能做很多强大的事情。这里有几个例子：[_根据正则更改多个 Key_](/docs/advanced/cache#mutate-multiple-keys-from-regex)、[_基于 LocalStorage 的持久缓存_](/docs/advanced/cache#localstorage-based-persistent-cache)、[_重置测试用例之间的缓存_](/docs/advanced/cache#reset-cache-between-test-cases)。

这个新的缓存 provider API 也更兼容 React 18 的并发渲染。如果你正要添加一个缓存 provider，请确保使用从 `useSWRConfig()` 返回的全局 `mutate` 函数。

请阅读文档[缓存 Provider](/docs/advanced/cache) 了解更多细节。

### useSWRConfig()

一个新的 Hook API 来返回所有的全局配置，包括当前缓存 provider 和全局 `mutate` 函数：

```jsx
import { useSWRConfig } from 'swr'

function Foo () {
  const { refreshInterval, cache, mutate, ...restConfig } = useSWRConfig()

  // ...
}
```

更多信息请查看[这里](/docs/global-configuration#access-to-global-configurations)。

### 中间件

SWR 中间件为你提供了一种在 SWR hook 之上构建和重用抽象的新方法：

```jsx
<SWRConfig value={{ use: [...middleware] }}>

// ... 或直接在 `useSWR` 中：
useSWR(key, fetcher, { use: [...middleware] })
```

使用该功能可以实现很多新想法，我们已经构建了一些示例：[_请求日志记录器_](/docs/middleware#request-logger)、[_Key 变化时仍保留之前的结果_](/docs/middleware#keep-previous-result)以及[_序列化对象 key_](/docs/middleware#serialize-object-keys)

查看 [中间件 API](/docs/middleware) 以了解更多细节。

### 改进以及更好的测试覆盖率

从 0.x 开始，我们已经做了数百个小改进和 bug 修复。现在 SWR 有 157 个测试，覆盖了数据请求中的大多数边界情况。请阅读[更新日志](https://github.com/vercel/swr/releases)了解更多细节。

### 文档翻译

感谢我们的 [contributor](https://github.com/vercel/swr-site/graphs/contributors) 和 Nextra 的 [i18n 功能](https://nextra.vercel.app/features/i18n)，SWR 文档现在有六种不同的语言：

- [英语](https://swr.vercel.app)
- [西班牙语](https://swr.vercel.app/es-ES)
- [简体中文](https://swr.vercel.app/zh-CN)
- [日语](https://swr.vercel.app/ja)
- [韩语](https://swr.vercel.app/ko)
- [俄语](https://swr.vercel.app/ru)

## 迁移指南

### 更新 `useSWRInfinite` 导入

`useSWRInfinite` 需要从 `swr/infinite` 导入:

```diff
- import { useSWRInfinite } from 'swr'
+ import useSWRInfinite from 'swr/infinite'
```

如果你正在使用相应的类型，也要更新导入路径：

```diff
- import { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr'
+ import { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite'
```

### 将 `revalidate` 改为 `mutate`

`useSWR` 不再返回 `revalidate` 方法，请改为 `mutate`：

```diff
- const { revalidate } = useSWR(key, fetcher, options)
+ const { mutate } = useSWR(key, fetcher, options)


  // ...


- revalidate()
+ mutate()
```

### 将 `initialData` 重命名为 `fallbackData`

```diff
- useSWR(key, fetcher, { initialData: ... })
+ useSWR(key, fetcher, { fallbackData: ... })
```

### 取消默认 Fetcher

SWR 不再提供默认的 fetcher（将数据解析为 JSON 的 `fetch` 调用）。迁移更改的最简单方法是使用 `<SWRConfig>` 组件：

```jsx
<SWRConfig value={{ fetcher: (url) => fetch(url).then(res => res.json()) }}>
  <App/>
</SWRConfig>

// ... 或
useSWR(key, (url) => fetch(url).then(res => res.json()))
```

### 建议使用 Hook 返回的 `mutate`

这**不是**一个破坏性的更改，但我们*建议*一直使用从 `useSWRConfig` hook 返回的 `mutate`：

```diff
- import { mutate } from 'swr'
+ import { useSWRConfig } from 'swr'


  function Foo () {
+   const { mutate } = useSWRConfig()

    return <button onClick={() => mutate('key')}>
      Mutate Key
    </button>
  }
```

如果你没有使用缓存 provider，当前的全局导入 `import { mutate } from 'swr'` 仍然有效。

### 重命名类型

如果你使用 TypeScript，为了保持一致，以下类型名已更改：

| 0.x （废弃）                   | 1.0                        | Note                |
| ------------------------------ | -------------------------- | ------------------- |
| `ConfigInterface`              | `SWRConfiguration`         |                     |
| `keyInterface`                 | `Key`                      |                     |
| `responseInterface`            | `SWRResponse`              |                     |
| `RevalidateOptionInterface`    | `RevalidatorOptions`       |                     |
| `revalidateType`               | `Revalidator`              |                     |
| `SWRInfiniteResponseInterface` | `SWRInfiniteResponse`      | 移到 `swr/infinite` |
| `SWRInfiniteConfigInterface`   | `SWRInfiniteConfiguration` | 移到 `swr/infinite` |

### Beta 及非官方功能用户

如果你使用的是 SWR 的 Beta 版本，或使用任何未公开的 API，请注意以下更改：

- `import { cache } from 'swr'` 已经移除；使用新的 [`useSWRConfig` API](#useswrconfig)。
- `import { createCache } from 'swr'` 已经移除；使用新的 [Cache Provider API](/docs/advanced/cache)。
- `revalidateWhenStale` 已重命名为 `revalidateIfStale`。
- `middlewares` 已重命名为 `use`。

### 更新日志

去 [GitHub](https://github.com/vercel/swr/releases) 阅读完整更新日志。

## 未来

在未来的版本中，我们将在保持稳定性的同时不断改进。我们还打算拥抱未来的 React 版本，1.0 中的一些新功能和改进已经在为此做准备了。此外，我们仍在开发新功能，以改善在 React 中进行数据请求的体验以及使用 SWR 的体验。

如果你对该版本有任何意见，请[告诉我们](https://github.com/vercel/swr/discussions)。

## 致谢！

特别感谢 [Toru Kobayashi](https://twitter.com/koba04) 和 [Yixuan Xu](https://twitter.com/yixuanxu94) 对 SWR 的贡献，同时感谢 [Paco Coursey](https://twitter.com/pacocoursey)、[uttk](https://github.com/uttk)、[Tomohiro SHIOYA](https://github.com/shioyang)、[Markoz Peña](https://github.com/markozxuu)、[SeulGi Choi](https://github.com/cs09g)、[Fang Lu](https://github.com/huzhengen)、[Valentin Politov](https://github.com/valentinpolitov) 在翻译和文档方面的贡献。没有他们就没有这个版本。

我们还要感谢整个社区、我们的 [110 个 contributor](https://github.com/vercel/swr/graphs/contributors)（+ [45 个文档 contributor](https://github.com/vercel/swr-site/graphs/contributors)）以及所有帮助过我们以及给过我们意见的人！
