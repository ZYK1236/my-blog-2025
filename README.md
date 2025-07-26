## 尝试自己手写一个 react ssr 框架

### 1. 支持同构

### 2. 尝试写一个 rpc + http 统一请求工具用于 ssr + csr

### 3. 接入 CDN ER，支持容灾

## RPC 集成

项目已集成 gRPC 客户端，支持与 Go 服务进行 RPC 通信。

### 特性

- 自动同步 Go 服务的 proto 文件
- 自动生成 JavaScript 代码
- 提供统一的数据加载器组件
- 支持 HTTP 和 RPC 两种数据加载方式

### 使用说明

详细使用说明请查看 [RPC_INTEGRATION.md](RPC_INTEGRATION.md) 文件。

### 开发工作流

1. 确保 Go RPC 服务正在运行（默认端口 50051）
2. 当 Go 服务的 proto 文件有更新时，运行以下命令同步并生成代码：
   ```bash
   npm run proto:sync
   ```
3. 或者，如果只想监听 proto 文件变化并自动生成代码，运行：
   ```bash
   npm run proto:watch
   ```
4. 使用 `DataLoaderWrapper` 组件或 `withDataLoader` HOC 在组件中加载数据
5. 通过 `rpc-client.ts` 中的函数直接调用 RPC 方法

### 添加新的 proto 文件和 RPC 方法

1. 在 `proto/` 目录下添加新的 `.proto` 文件
2. 运行 `npm run proto:generate` 命令生成对应的 JavaScript 和 TypeScript 文件
3. 在 `src/rpc-client.ts` 中添加新的客户端方法
4. 在需要的组件中使用新的 RPC 方法