import { getStrapiURL } from "../lib/api";

import dynamic from 'next/dynamic';
// MARKDOWN
const ReactMarkdown = dynamic(
  () => import('react-markdown')
);
const rehypeKatex = dynamic(
  () => import('rehype-katex')
);
import 'katex/dist/katex.min.css';

// Cannot be imported dynamically
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';

// Syntax Highlighter
const CodeHighlighter = dynamic(
  () => import('./syntax-highlight')
);

// Render article content
const ArticleContent = ({ content }) => {
  return (
    <ReactMarkdown 
      children={content}  
      components={{
        'code': CodeHighlighter, 
        'h1': 'h2',
        'img': ({node, ...props}) => <img {...props} loading="lazy" decoding="async" />
      }} 
      transformImageUri={uri =>
        uri.startsWith("http") ? uri : getStrapiURL(uri)} 
      remarkPlugins={[
        [gfm, {singleTilde: false, tablePipeAlign: false}], 
        [remarkMath]
      ]} 
      rehypePlugins={[rehypeKatex]} 
    />
  );
};

export default ArticleContent;