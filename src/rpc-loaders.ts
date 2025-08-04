// src/rpc-loaders.ts
// 集中管理所有组件的 RPC 加载器

import { rpcLoader as mdParseRpcLoader } from './components/md-parse/dataLoader';

// 定义加载器的类型
export interface RpcLoader {
  (): Promise<any>;
}

// 定义组件与加载器的映射关系
export const componentLoaders: Record<string, RpcLoader> = {
  'MdParse': mdParseRpcLoader,
  // 可以在这里添加更多组件的加载器
  // 'OtherComponent': otherComponentRpcLoader,
};

// 统一执行所有注册的 RPC 加载器
export const executeAllLoaders = async (): Promise<Record<string, any>> => {
  const results: Record<string, any> = {};
  
  // 创建所有加载器的 Promise 数组
  const loaderPromises = Object.entries(componentLoaders).map(async ([componentName, loader]) => {
    try {
      const data = await loader();
      return { componentName, data, error: null };
    } catch (error) {
      console.error(`RPC request failed for ${componentName}:`, error);
      return { componentName, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });
  
  // 并行执行所有加载器
  const loaderResults = await Promise.all(loaderPromises);
  
  // 将结果组织成对象
  for (const { componentName, data, error } of loaderResults) {
    results[componentName] = { data, error };
  }
  
  return results;
};