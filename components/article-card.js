import Link from "next/link";
import ImageNextJs from "./image-next";

const ArticleCard = ({ article, showDescription }) => {
  // Intl Date Object specific to Ro date format for publishing date view
  const intlDateObj = new Intl.DateTimeFormat('ro-RO', {year: 'numeric', month: 'long', day:'2-digit'});

  return (
    <Link href="/articol/[slug]" as={`/articol/${article.slug}`}>
      <a className="mx-8 mb-10">
        <div className="bg-white hover:bg-primary-extralight dark:bg-gray-900 dark:hover:bg-gray-700 max-w-full rounded overflow-hidden xl:shadow-lg xl:dark:shadow-none">
          
          <ImageNextJs 
            image={article.image}
            imageCss="xl:transition xl:duration-500 xl:ease-in-out xl:transform xl:hover:-translate-y-1 xl:hover:scale-110"
            srcsetSizes="(max-width: 640px) 90vw, (max-width: 1280px) 40vw, 30vw"
            priority={false}
            layout="responsive"
          />

          <div className="px-6 2xl:px-12 py-4">

            <p className="font-bold text-xl mb-2">
              {article.title}
            </p>

            {showDescription && (
              <p className="mb-2">
                {article.description}
              </p>
            )}

            <ul className="text-sm mt-4">
              {article.publishedAt && (
                <li className="flex flex-row flex-wrap mb-2">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time>
                    {intlDateObj.format(new Date(article.publishedAt))}
                  </time>
                </li>
              )}
              
              {(article.category && article.category.name) && (
                <li className="flex flex-row flex-wrap mb-2">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                  <span className="uppercase">
                    {article.category.name}
                  </span>
                </li>
              )}

              {(article.labels && article.labels.some(label => label.name)) && (
                <li className="flex flex-row flex-wrap">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                    />
                  </svg>
                  {article.labels.map((label) => {
                    return (
                      <span key={`label__${label.name}`} className="mr-2">
                        {`@${label.name} `}
                      </span>
                    );
                  })}
                </li>
              )}
            </ul>
          
          </div>

        </div>
      </a>
    </Link>
  );
};

export default ArticleCard;