// src/entry-server.js
import { useMemo } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { renderToString } from 'react-dom/server'
import App from './app'

const cache = createCache();

export function render(url: string) {
  const html = renderToString(
    <StyleProvider cache={cache}>
      <App />
    </StyleProvider>,
  );

  const styleText = extractStyle(cache);

  return { html, styleText }
}