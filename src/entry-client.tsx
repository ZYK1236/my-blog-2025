// src/entry-client.js
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './app';

// 从服务端渲染时注入的脚本中获取初始数据
const initialData = (window as any).__INITIAL_DATA__ || '';

const root = document.getElementById('root') as Element;

// 接管 SSR 渲染的 HTML，使其可交互
hydrateRoot(
  root,
  <App initialData={initialData} />
)