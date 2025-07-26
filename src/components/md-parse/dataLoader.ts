import { getBlog } from '../../rpc-client';

// HTTP 加载器
export const httpLoader = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/blogs');
    return await response.text();
  } catch (error) {
    throw new Error(`HTTP request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// RPC 加载器
export const rpcLoader = async (): Promise<string> => {
  try {
    // 调用 RPC 方法获取博客数据
    const response = await getBlog({ name: 'index.md'});

    if (!response.found) {
      throw new Error('Blog not found');
    }
    // 返回博客内容
    return response.content || '';
  } catch (error) {
    throw new Error(`RPC request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};