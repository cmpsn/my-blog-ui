import { useState, useEffect } from 'react';

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
// For code style to work in next-js, must use: 
// 'react-syntax-highlighter/dist/cjs/...' INSTEAD OF 'react-syntax-highlighter/dist/esm/...'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// For Light version, languages must be imported and registered individually.
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

// ========= Light Highlight.JS ========
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// // For code style to work in next-js, must use: 'react-syntax-highlighter/dist/cjs/...' 
// import { tomorrowNightEighties }  from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// // For Light version, languages must be imported and registered individually.
// import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
// SyntaxHighlighter.registerLanguage('python', python);

const CodeHighlighter = ({node, inline, className, children, ...props}) => {
  
  const [hasMounted, setHasMounted] = useState(false);
  
  // When mounted on client, show highlighting
  useEffect(() => {
    setHasMounted(true)
  }, [])
  // In case not mounted.
  if (!hasMounted) {
    return !inline ? (
      <div style={{fontSize:'0.888889rem', lineHeight:'1.5', wordBreak:'normal', overflowWrap:'normal', hyphens:'none', padding:'0', margin:'0', overflow:'auto'}}>
        <code {...props}>
          {children}
        </code>
      </div>
      ) : (
      <code {...props}>
        {children}
      </code>
    );
  }
  
  const match = /language-(\w+)/.exec(className || '');
  
  return !inline && match ? (
    <SyntaxHighlighter 
      language={match[1]} 
      PreTag="div" 
      children={String(children).replace(/\n$/, '')} 
      style={tomorrow} 
      customStyle={{fontSize:'0.8888889rem', padding:'0', margin:'0'}} 
      {...props} 
    />
    ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export default CodeHighlighter;
