import { useState, useEffect } from 'react';
import ArticlesIndex from './articles-index';

const ArticlesPagination = ({ 
  articles, 
  showDescription, 
  articlesIndexCss }) => {

  // Articles per view ('+' is the assurance it's a number)
  const articlesPerView = 6;
  const articlesArrayLength = +(articles.length);

  const [numVisibleArticles, setNumVisibleArticles] = useState(articlesPerView);
  const [readMore, setReadMore] = useState(true);

  // Every time the 'articles' prop is changing, 
  // reset all states to initial values.
  useEffect(() => {
    setNumVisibleArticles(articlesPerView);
    setReadMore(true);
  }, [articles]);

  const handleReadMore = () => {
    if (numVisibleArticles < articlesArrayLength) {
      setNumVisibleArticles(prevNumOfArticles => prevNumOfArticles + articlesPerView);
    }
    else {
      setReadMore(false);
    }
  };

  // Render
  return (
    <>
      <ArticlesIndex 
        articles={articles.slice(0, numVisibleArticles)} 
        showDescription={showDescription} 
        articlesIndexCss={articlesIndexCss} 
      />
      
      <div className="mb-10 grid grid-cols-1">
        {readMore ? (
          <button 
            className="py-2 px-4 inline-flex place-self-center border rounded bg-transparent font-semibold border-gray-500 dark:border-gray-400 hover:bg-gray-500 dark:hover:bg-gray-400 hover:text-white dark:hover:text-gray-900"  
            aria-label="Mai multe articole"
            onClick={handleReadMore}
          >
            <span className="mr-2">
              Mai multe articole
            </span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="https://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )
        :
        (
          <p className="my-2 mx-4 p-px place-self-center font-semibold">
            Listă de articole epuizată.
          </p>
        )
        }
      </div>
      
    </>

  );
};

export default ArticlesPagination;