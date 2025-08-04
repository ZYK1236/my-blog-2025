import React from 'react';
import { ConfigProvider } from 'antd'
import Home from './pages/home';

interface AppProps {
  initialData?: Record<string, any>;
}

const App: React.FC<AppProps> = ({ initialData }) => (
  <ConfigProvider theme={{
    token: {
      // Seed Token，影响范围大
    },
  }}>
    <div className="App">
      <Home initialData={initialData?.MdParse?.data} />
    </div>
  </ConfigProvider>
);

export default App;