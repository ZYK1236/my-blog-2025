import React from 'react';
import { ConfigProvider } from 'antd'
import Home from './pages/home';

const App = () => (
  <ConfigProvider theme={{
    token: {
      // Seed Token，影响范围大
    },
  }}>
    <div className="App">
      <Home />
    </div>
  </ConfigProvider>
);

export default App;