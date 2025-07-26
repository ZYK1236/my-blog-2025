# RPC 客户端使用说明

## 设置

1. 确保 Go 服务正在运行并监听端口 50051
2. 运行 `npm run proto:generate` 生成最新的 protobuf 代码
3. 如果需要自动监听 proto 文件变化，运行 `npm run proto:watch`

## 使用示例

```javascript
import { add, getBlog } from './rpc-client';

// 执行加法运算
const performAdd = async () => {
  try {
    const response = await add({ a: 1, b: 2 });
    console.log('Add Result:', response.result);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 获取博客内容
const fetchBlog = async () => {
  try {
    const response = await getBlog({ name: 'index' });
    console.log('Blog Content:', response.content);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 开发流程

1. 当 Go 服务更新了 proto 定义时，将新的 .proto 文件复制到 `proto/` 目录
2. 运行 `npm run proto:generate` 重新生成 JavaScript 代码
3. 在前端代码中使用新生成的代码与 Go 服务通信

## 注意事项

- 确保 proto 文件的语法正确
- 生成的代码会放在 `proto/pb/` 目录下
- 如果遇到生成错误，检查 proto 文件是否符合 protobuf 语法规范