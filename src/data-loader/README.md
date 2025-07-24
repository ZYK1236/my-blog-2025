# DataLoader 包装器

这是一个通用的数据加载包装器，支持 HTTP 和 RPC 两种数据加载方式，并且兼容 SSR（服务端渲染）和 CSR（客户端渲染）。

## 特性

- 支持 HTTP 和 RPC 数据加载
- 优先使用 RPC 加载器（如果提供）
- 支持 SSR 和 CSR
- 提供两种使用方式：
  1. 作为组件包装器使用
  2. 作为高阶组件（HOC）使用

## 使用方式

### 1. 作为组件包装器使用

```jsx
import { DataLoaderWrapper } from './data-loader';

// 定义数据加载器
const httpLoader = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

const rpcLoader = async () => {
  // 调用 RPC 方法
  return rpcClient.getData();
};

// 在组件中使用
const MyComponent = () => {
  return (
    <DataLoaderWrapper httpLoader={httpLoader} rpcLoader={rpcLoader}>
      {(data, loading, error) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return <div>Data: {JSON.stringify(data)}</div>;
      }}
    </DataLoaderWrapper>
  );
};
```

### 2. 作为高阶组件（HOC）使用

```jsx
import { withDataLoader } from './data-loader';

// 定义数据加载器
const httpLoader = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

const rpcLoader = async () => {
  // 调用 RPC 方法
  return rpcClient.getData();
};

// 创建一个接收数据作为 props 的组件
const MyComponent = ({ data, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};

// 使用 HOC 包装组件
const MyComponentWithData = withDataLoader(httpLoader, rpcLoader)(MyComponent);

export default MyComponentWithData;
```

## API

### DataLoaderWrapper Props

- `httpLoader` (可选): HTTP 数据加载函数，应返回一个 Promise
- `rpcLoader` (可选): RPC 数据加载函数，应返回一个 Promise
- `children`: 一个函数，接收 `(data, loading, error)` 参数并返回 React 元素

### withDataLoader 参数

- `httpLoader` (可选): HTTP 数据加载函数
- `rpcLoader` (可选): RPC 数据加载函数

## 注意事项

1. 如果同时提供了 `httpLoader` 和 `rpcLoader`，优先使用 `rpcLoader`
2. 数据加载器函数应该返回 Promise，解析为要传递给包装组件的数据
3. 包装后的组件会接收到 `data`、`loading` 和 `error` 三个 props