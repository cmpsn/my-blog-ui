import dynamic from 'next/dynamic';
const ArticleCard = dynamic(
  () => import('./article-card')
);

const ArticlesIndex = ({ 
  articles, 
  showDescription, 
  articlesIndexCss }) => {

  return (
    <div className={articlesIndexCss}>

      {articles.map((article, i) => {
        return (
          <ArticleCard 
            key={`article__${article.slug}`} 
            article={article} 
            showDescription={showDescription}
          />
        );
      })}
      
    </div>
  );
};

export default ArticlesIndex;