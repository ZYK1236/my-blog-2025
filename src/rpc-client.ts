import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

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
const calculatorProto: any = grpc.loadPackageDefinition(packageDefinition).calculator;

// 创建客户端
const client = new calculatorProto.Calculator(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Calculator 服务客户端方法
export const add = (request: any): Promise<any> => {
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