#!/usr/bin/env node

/**
 * 同步 Go 服务的 proto 文件到项目中
 * 
 * 用法: node scripts/sync-proto.js [go-proto-path]
 * 默认 Go proto 路径: /Users/zykmxw/go/src/rpc-server/proto
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 获取命令行参数或使用默认路径
const goProtoPath = process.argv[2] || '/Users/zykmxw/go/src/rpc-server/proto';
const projectProtoPath = path.join(process.cwd(), 'proto');

console.log('正在同步 proto 文件...');
console.log('源路径:', goProtoPath);
console.log('目标路径:', projectProtoPath);

// 检查源路径是否存在
if (!fs.existsSync(goProtoPath)) {
  console.error('错误: Go proto 路径不存在:', goProtoPath);
  process.exit(1);
}

// 创建项目 proto 目录（如果不存在）
if (!fs.existsSync(projectProtoPath)) {
  fs.mkdirSync(projectProtoPath, { recursive: true });
}

try {
  // 同步文件
  const files = fs.readdirSync(goProtoPath);
  let copiedCount = 0;
  
  for (const file of files) {
    if (file.endsWith('.proto')) {
      const srcPath = path.join(goProtoPath, file);
      const destPath = path.join(projectProtoPath, file);
      
      // 复制文件
      fs.copyFileSync(srcPath, destPath);
      console.log('已复制:', file);
      copiedCount++;
    }
  }
  
  console.log(`同步完成，共复制了 ${copiedCount} 个 proto 文件。`);
  
  // 生成 JavaScript 代码
  console.log('正在生成 JavaScript 代码...');
  execSync('npm run proto:generate', { stdio: 'inherit' });
  
  console.log('JavaScript 代码生成完成!');
} catch (error) {
  console.error('同步过程中出现错误:', error.message);
  process.exit(1);
}