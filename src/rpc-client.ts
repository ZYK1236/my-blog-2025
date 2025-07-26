import type { calculator as calculatorType } from '../proto/pb/calculator';

// 仅在 Node.js 环境中导入和使用 gRPC 客户端
let client: calculatorType.CalculatorClient | null = null;
let calculator: typeof import('../proto/pb/calculator').calculator | null = null;

if (typeof window === 'undefined') {
  const grpc = await import('@grpc/grpc-js');
  const calculatorModule = await import('../proto/pb/calculator');
  calculator = calculatorModule.calculator;

  // 创建客户端
  client = new calculator.CalculatorClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
}

// Calculator 服务客户端方法
export const add = (request: any): Promise<any> => {
  if (typeof window !== 'undefined') {
    // 在浏览器环境中返回一个模拟的响应或抛出错误
    return Promise.reject(new Error('gRPC client is not available in browser environment'));
  }
  
  if (!client) {
    return Promise.reject(new Error('gRPC client is not initialized'));
  }
  
  return new Promise((resolve, reject) => {
    client.Add(request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const getBlog = (request: { name: string }): Promise<any> => {
  if (typeof window !== 'undefined') {
    // 在浏览器环境中返回一个模拟的响应或抛出错误
    return Promise.reject(new Error('gRPC client is not available in browser environment'));
  }
  
  if (!client || !calculator) {
    return Promise.reject(new Error('gRPC client or calculator is not initialized'));
  }
  
  // 构造 BlogRequest 对象
  const blogRequest = new calculator.BlogRequest(request);
  
  return new Promise((resolve, reject) => {
    client.GetBlog(blogRequest, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};