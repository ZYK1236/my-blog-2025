import React, { useEffect, useState } from 'react';

// 定义数据加载器类型
interface DataLoader {
  (): Promise<any>;
}

// 定义包装器的属性
interface DataLoaderWrapperProps {
  httpLoader?: DataLoader;
  rpcLoader?: DataLoader;
  children: (data: any, loading: boolean, error: string | null) => React.ReactNode;
}

// 创建数据加载包装器组件
const DataLoaderWrapper: React.FC<DataLoaderWrapperProps> = ({
  httpLoader,
  rpcLoader,
  children,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (httpLoader) {
          // 使用 HTTP 加载器
          const result = await httpLoader();
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [httpLoader]);

  return <>{children(data, loading, error)}</>;
};

// 创建 HOC（高阶组件）版本
const withDataLoader = (
  httpLoader?: DataLoader,
  rpcLoader?: DataLoader
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    return (props: P) => (
      <DataLoaderWrapper httpLoader={httpLoader} rpcLoader={rpcLoader}>
        {(data, loading, error) => (
          <WrappedComponent
            {...props}
            data={data}
            loading={loading}
            error={error}
          />
        )}
      </DataLoaderWrapper>
    );
  };

export { DataLoaderWrapper, withDataLoader };