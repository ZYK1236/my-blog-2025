// src/entry-server.js
import { createElement } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server'
import App from './app'
import { rpcLoader } from './components/md-parse/dataLoader';

const cache = createCache();

export async function render(url: string) {
  // 在服务端执行 RPC 请求获取数据
  let initialData = '';
  try {
    initialData = await rpcLoader();
  } catch (error) {
    console.error('Server-side RPC request failed:', error);
    // 如果 RPC 请求失败，initialData 将为空字符串
    // 客户端会自动执行 HTTP 兜底请求
  }

  // 将初始数据传递给 App 组件
  const appWithInitialData = createElement(App, { initialData });
  
  const html = renderToString(
    <StyleProvider cache={cache}>
      {appWithInitialData}
    </StyleProvider>,
  );

  const styleText = extractStyle(cache);

  return { html, styleText, initialData }
}