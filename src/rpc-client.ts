// 仅在 Node.js 环境中导入和使用 gRPC 客户端
let client: any;
let calculatorProto: any;

if (typeof window === 'undefined') {
  const grpc = await import('@grpc/grpc-js');
  const protoLoader = await import('@grpc/proto-loader');
  const path = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 定义选项
  const PROTO_OPTIONS = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

  // 加载 calculator proto 文件
  const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../proto/calculator.proto'),
    PROTO_OPTIONS
  );

  // 获取包定义
  calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

  // 创建客户端
  client = new calculatorProto.Calculator(
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

export const getBlog = (request: any): Promise<any> => {
  if (typeof window !== 'undefined') {
    // 在浏览器环境中返回一个模拟的响应或抛出错误
    return Promise.reject(new Error('gRPC client is not available in browser environment'));
  }
  
  return new Promise((resolve, reject) => {
    client.GetBlog(request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};