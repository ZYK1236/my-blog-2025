import ReactMarkdown from 'react-markdown';

const MdParse = (props: { data: string, loading: boolean, error: string | null }) => {
  const { data, loading, error } = props;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="markdown-container">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
};

export default MdParse;