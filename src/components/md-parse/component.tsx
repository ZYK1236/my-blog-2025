import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MdParseProps {
  data?: string;
  loading?: boolean;
  error?: string | null;
}

const MdParse: React.FC<MdParseProps> = ({ data = '', loading = false, error = null }) => {
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