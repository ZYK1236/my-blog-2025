# 脚本说明

## proto 文件同步脚本

### 功能

该脚本用于从 Go 服务的 proto 目录同步 .proto 文件到项目中，并自动生成对应的 JavaScript 代码。

### 使用方法

1. 确保 Go 服务的 proto 文件位于 `/Users/zykmxw/go/src/rpc-server/proto` 目录下
2. 运行同步命令：

```bash
npm run proto:sync
```

3. 如果 Go 服务的 proto 路径不同，可以指定路径：

```bash
npm run proto:sync /path/to/your/go/proto/directory
```

### 工作流程

1. 脚本会检查指定的 Go proto 目录是否存在
2. 将所有 .proto 文件复制到项目的 `proto/` 目录
3. 自动运行 `proto:generate` 命令生成 JavaScript 代码

### 注意事项

- 确保系统已安装 protoc 编译器
- 确保已安装项目依赖（`npm install`）
- 脚本会覆盖项目中已存在的同名 proto 文件
- 生成的 JavaScript 代码会放在 `proto/pb/` 目录下