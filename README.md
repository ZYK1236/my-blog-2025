# React SSR 框架与 gRPC 集成

这是一个基于 React 和 Vite 构建的服务器端渲染(SSR)框架，集成了 gRPC 客户端以支持与后端服务的高效通信。

## 特性

- **React SSR**: 基于 Vite 的服务器端渲染实现
- **gRPC 集成**: 与 Go 后端服务通过 gRPC 进行通信
- **同构架构**: 支持服务端渲染和客户端渲染
- **自动代码生成**: 从 proto 文件自动生成 JavaScript 客户端代码
- **统一数据加载**: 提供统一的数据加载器组件，支持 HTTP 和 RPC 两种方式

## 项目结构

```
proto/
  ├── calculator.proto   # gRPC 服务定义
  └── pb/                # 自动生成的 JavaScript 代码

scripts/
  └── sync-proto.js      # proto 文件同步脚本

server/
  └── index.js           # Express 服务器实现

src/
  ├── app.tsx            # 主应用组件
  ├── entry-client.tsx   # 客户端入口
  ├── entry-server.tsx   # 服务端入口
  ├── rpc-client.ts      # gRPC 客户端实现
  └── components/        # React 组件

```

## 开发指南

### 启动开发服务器

```bash
# 启动开发服务器
npm run dev
```

### 构建项目

```bash
# 构建客户端和服务端代码
npm run build

# 分别构建客户端和服务端
npm run build:client
npm run build:server
```

### gRPC 集成

#### 同步和生成代码

1. 当 Go 服务的 proto 文件有更新时，运行以下命令同步并生成代码：
   ```bash
   npm run proto:sync
   ```

2. 或者，如果只想监听 proto 文件变化并自动生成代码，运行：
   ```bash
   npm run proto:watch
   ```

#### 手动操作

1. 将 `.proto` 文件复制到 `proto/` 目录
2. 运行以下命令生成 JavaScript 代码：
   ```bash
   npm run proto:generate
   ```

#### 使用 gRPC 客户端

在组件中使用 `rpc-client.ts` 中的函数直接调用 RPC 方法：

```javascript
import { add, getBlog } from './rpc-client';

// 执行加法运算
const result = await add({ a: 1, b: 2 });

// 获取博客内容
const blog = await getBlog({ name: 'index' });
```

### 添加新的 RPC 方法

1. 在 `proto/calculator.proto` 文件中定义新的服务方法
2. 重新生成 JavaScript 代码：
   ```bash
   npm run proto:generate
   ```
3. 在 `src/rpc-client.ts` 中添加新的客户端方法
4. 在需要的组件中使用新的 RPC 方法

## 详细文档

有关 gRPC 集成的更多详细信息，请查看：
- [RPC 集成说明](RPC_INTEGRATION.md)
- [RPC 客户端使用说明](src/README.md)
- [Proto 文件说明](proto/README.md)
- [脚本说明](scripts/README.md)