// src/entry-server.js
import { createElement } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server'
import App from './app'
import { executeAllLoaders } from './rpc-loaders';

const cache = createCache();

export async function render(url: string) {
  // 在服务端执行所有注册的 RPC 请求获取数据
  let initialData = {};
  try {
    initialData = await executeAllLoaders();
  } catch (error) {
    console.error('Server-side RPC requests failed:', error);
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