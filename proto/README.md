# Protocol Buffers

这个目录包含项目使用的 Protocol Buffers 文件。

## 目录结构

- `proto/`: 存放 .proto 定义文件
- `pb/`: 存放生成的 JavaScript 代码

## 生成 JavaScript 代码

运行以下命令生成 JavaScript 代码：

```bash
npm run proto:generate
```

## 自动监听和生成

在开发过程中，可以运行以下命令自动监听 proto 文件变化并重新生成代码：

```bash
npm run proto:watch
```

这将监听 `proto/` 目录下的文件变化，并在文件更改时自动重新生成 JavaScript 代码。