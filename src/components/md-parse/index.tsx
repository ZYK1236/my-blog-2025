import React, { useEffect, useState } from 'react';
import MdParse from './Component';
import { httpLoader } from './dataLoader';
import { processData, formatData, handleError } from './dataHandler';

interface MdParseWrapperProps {
  initialData?: string;
}

const MdParseWrapper: React.FC<MdParseWrapperProps> = ({ initialData }) => {
  const [data, setData] = useState<string>(initialData || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 如果有初始数据（来自服务端渲染的 RPC 结果），直接使用
    if (initialData) {
      try {
        const processedData = processData(initialData);
        const formattedData = formatData(processedData);
        setData(formattedData);
      } catch (err) {
        const errorMessage = handleError(err as Error);
        setError(errorMessage);
      }
      return;
    }

    // 如果没有初始数据，说明 RPC 失败了，执行 HTTP 兜底请求
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawData = await httpLoader();
        const processedData = processData(rawData);
        const formattedData = formatData(processedData);
        setData(formattedData);
      } catch (err) {
        const errorMessage = handleError(err as Error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  return <MdParse data={data} loading={loading} error={error} />;
};

export default MdParseWrapper;