# RPC 集成方案

## 概述

本文档说明了如何在前端项目中集成和使用 RPC 服务，包括 proto 文件管理、代码生成、客户端使用等。

## 目录结构

```
proto/
  ├── README.md          # Proto 文件说明
  ├── calculator.proto   # Calculator 服务 proto 文件
  └── pb/                # 生成的 JavaScript 代码

scripts/
  ├── README.md          # 脚本说明
  └── sync-proto.js      # proto 文件同步脚本

src/
  ├── README.md          # RPC 客户端使用说明
  ├── rpc-client.ts      # RPC 客户端实现
  └── data-loader/       # 数据加载器组件
```

## 工作流程

### 1. Go 服务更新 proto 文件

当 Go 服务更新了 proto 定义时：

1. 将新的 .proto 文件复制到 Go 服务的 proto 目录
2. 重新启动 Go 服务以应用新的 proto 定义

### 2. 前端项目同步和生成代码

在前端项目中：

1. 运行同步命令将 Go 服务的 proto 文件同步到项目中：
   ```bash
   npm run proto:sync
   ```

2. 或者手动将 .proto 文件复制到项目的 `proto/` 目录

3. 生成 JavaScript 代码：
   ```bash
   npm run proto:generate
   ```

4. 或者运行监听命令自动重新生成：
   ```bash
   npm run proto:watch
   ```

### 3. 在前端代码中使用 RPC

#### 使用 RPC 客户端

```javascript
import { add, getBlog } from './rpc-client';

const performAdd = async () => {
  try {
    const response = await add({ a: 1, b: 2 });
    console.log('Add Result:', response.result);
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchBlog = async () => {
  try {
    const response = await getBlog({ name: 'index' });
    console.log('Blog Content:', response.content);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 使用数据加载器组件

```jsx
import { DataLoaderWrapper } from './data-loader';
import { getBlog } from './rpc-client';

const rpcLoader = async () => {
  return await getBlog({ name: 'index' });
};

const MyComponent = () => {
  return (
    <DataLoaderWrapper rpcLoader={rpcLoader}>
      {(data, loading, error) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return <div>Blog Content: {data}</div>;
      }}
    </DataLoaderWrapper>
  );
};
```

## 开发建议

1. **保持同步**: 定期运行 `npm run proto:sync` 确保前端使用的 proto 文件与 Go 服务一致
2. **版本管理**: 在 Git 中提交生成的 JavaScript 代码，便于版本控制和团队协作
3. **错误处理**: 在 RPC 调用中始终包含适当的错误处理逻辑
4. **类型安全**: 利用 TypeScript 提供的类型检查确保数据结构正确

## 故障排除

### 常见问题

1. **protoc 命令未找到**
   - 确保已安装 Protocol Buffers 编译器
   - 在 macOS 上可以通过 `brew install protobuf` 安装

2. **生成代码失败**
   - 检查 proto 文件语法是否正确
   - 确保已安装所有必要的依赖

3. **RPC 调用失败**
   - 检查 Go 服务是否正在运行
   - 确认端口配置是否正确（默认 50051）
   - 检查网络连接是否正常

### 调试技巧

1. 使用 `console.log` 输出 RPC 请求和响应数据
2. 检查浏览器开发者工具中的网络请求
3. 在 Go 服务端添加日志输出

## 扩展功能

1. **添加新的 RPC 方法**:
   - 在 `proto/calculator.proto` 文件中定义新的服务方法
   - 重新生成 JavaScript 代码: `npm run proto:generate`
   - 在 `src/rpc-client.ts` 中添加新的客户端方法

2. **添加新的 proto 文件**:
   - 在 `proto/` 目录下创建新的 `.proto` 文件
   - 运行 `npm run proto:generate` 命令生成对应的 JavaScript 和 TypeScript 文件
   - 在 `src/rpc-client.ts` 中加载新的 proto 文件并创建客户端实例
   - 添加新的客户端方法

3. **添加认证**:
   - 在 RPC 客户端中添加认证头
   - 在 Go 服务中实现认证逻辑