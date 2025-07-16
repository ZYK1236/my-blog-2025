import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MdParse = () => {
  const [markdown, setMarkDown] = useState('');

  useEffect(() => {
    fetch('/api/blogs/index.md').then(res => res.text()).then(res => {
      setMarkDown(res);
    })
  }, []);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MdParse;