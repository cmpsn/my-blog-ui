import dynamic from "next/dynamic";
import Link from "next/link";
import { getArticleBySlug, getSlugsOfArticles, getSlugsOfCategories } from "../../lib/api";

// Components
import Layout from "../../components/layout";
import DisplayDate from "../../components/display-date";

// Components Dynamic import/ in separate bundles
const Seo = dynamic(
  () => import("../../components/seo")
);
const MediaFilteredByType = dynamic(
  () => import("../../components/media-filteredby-type")
);
const Slider = dynamic(
  () => import("../../components/slider")
);
const NestedOutlinks = dynamic(
  () => import("../../components/nested-outlinks")
);
const Promos = dynamic(
  () => import("../../components/promos")
);
const ArticleContent = dynamic(
  () => import("../../components/article-content")
);


// Articles have dynamic routes
export async function getStaticPaths() {
  const articles = await getSlugsOfArticles();

  return {
    paths: articles.map((article) => {
      return {
        params: { slug: article.slug }
      }
    }),
    fallback: false,
  };
}

// Get static props of articles.
export async function getStaticProps({ params }) {
  const article = (await getArticleBySlug(params.slug))[0];
  const categories = await getSlugsOfCategories();

  return {
    props: { article, categories }
  }
}

// ===== Render Article
const Article = ({ article, categories }) => {

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };
  
  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <main className="container mx-auto px-8 sm:px-12 md:px-28 lg:px-0 2xl:px-8 pb-12 md:pb-14 lg:pb-16 xl:pb-20 2xl:pb-24">
        
        <div className="lg:grid lg:grid-cols-12">

          <article className="lg:col-start-4 lg:col-span-6">

            <header className="py-12 md:py-14 lg:py-16 xl:py-20 2xl:py-24 text-center">
              <h1 className="pb-10 font-extrabold text-3xl md:text-4xl lg:text-5xl lg:leading-tight text-gray-900 dark:text-gray-300">
                {article.title}
              </h1>

              <div className="text-base">
                <DisplayDate 
                  createdDateISO={article.publishedAt} 
                  updatedDateISO={article.updatedAt}
                />

                {(article.labels && article.labels.some(label => label.name)) && (
                  <p className="pt-4 pb-3">
                    {article.labels.map((label) => {
                      return (
                        <span key={`label__${label.slug}`} className="mr-2">
                          <Link href="/eticheta/[slug]" as={`/eticheta/${label.slug}`}>
                            <a className="py-1 px-3 rounded-full shadow-md text-sm border border-gray-500 dark:border-gray-400 bg-transparent dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-400 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-900">
                              {`@${label.name}`}
                            </a>
                          </Link>
                          <span> </span>
                        </span>
                      );
                    })}
                  </p>
                )}
              </div>

              <hr className="my-6 border-gray-400" />

              {article.description && (
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  {article.description}
                </p>
              )}
            </header>

            {article.contentBlocks.map(contentBlock => {
              return (
                <div key={contentBlock.id} className="">

                  {contentBlock.content && (
                    <div className="prose max-w-none xl:prose-lg dark:prose-dark">
                      <ArticleContent 
                        content={contentBlock.content} 
                      />
                    </div>
                  )}

                  {contentBlock.mediaGroup?.length === 1 && (
                    <div className="pt-6 pb-3">
                      <div className="flex justify-center">
                        <MediaFilteredByType 
                          media={contentBlock.mediaGroup[0]}
                          imageCss="pointer-events-none" 
                          srcsetSizes="(min-width: 1024px) 50vw, (min-width: 1980px) 40vw, 95vw"
                          imagePriority={false}
                          imageLayout="intrinsic"
                          linkCSS="px-3 py-2 font-semibold border border-current rounded-md hover:bg-gray-500 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-900"
                        />
                      </div>

                      {contentBlock.mediaGroup[0].caption && (
                        <p className="py-1 text-gray-700 dark:text-gray-200 text-center italic text-sm xl:text-base">
                          {contentBlock.mediaGroup[0].caption}
                        </p>
                      )}
                    </div>
                  )}

                  {contentBlock.mediaGroup?.length > 1 && (
                    <Slider time={4000}>
                      {contentBlock.mediaGroup.map(mediaItem => {
                          return (
                            <div key={mediaItem.id} className="shadow-lg dark:shadow-none">
                              <MediaFilteredByType 
                                media={mediaItem}
                                imageCss="pointer-events-none"
                                srcsetSizes="(min-width: 1024px) 50vw, (min-width: 1980px) 40vw, 95vw"
                                imagePriority={false}
                                imageLayout="intrinsic"
                                linkCSS="px-3 py-2 font-semibold border border-current rounded-md hover:bg-gray-500 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-900"
                              />

                              {mediaItem.caption && (
                                <p className="py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-center text-sm xl:text-base">
                                  {mediaItem.caption}
                                </p>
                              )}                              
                            </div>
                          );
                      })}
                    </Slider>
                  )}

                  {contentBlock.outlinksBlocks?.length > 0 && (
                    <aside>
                      <hr className="mt-12 mb-6 border-gray-400" />
                      <NestedOutlinks 
                        outlinksBlocks={contentBlock.outlinksBlocks} 
                        outlinksCSS={"-mb-6"}
                      />
                    </aside>
                  )}

                  {contentBlock.promos?.length > 0 && (
                    <aside>
                      <Promos 
                        promos={contentBlock.promos}
                        imagePriority={false}
                        imageLayout="intrinsic"
                        srcsetSizes="(min-width: 1024px) 50vw, (min-width: 1980px) 40vw, 95vw"
                        promoBlockCSS="flex flex-initial justify-center pt-6 pb-3"
                        promoItemCSS="py-6"
                      />
                    </aside>
                  )}

                </div>
              );
            })}

            <hr className="mt-12 mb-6 border-gray-400" />

            <aside>
              {article.category && (
                <p className="flex-row flex-wrap mb-4">
                  <span className="text-lg mr-2">Categorie: </span>
                  <Link href="/categorie/[slug]" as={`/categorie/${article.category.slug}`}>
                    <a className="uppercase text-lg text-primary-dark hover:text-primary dark:text-secondary dark:hover:text-secondary-light">
                      {article.category.name}
                    </a>
                  </Link>
                </p>
                )}

              {article.labels && (article.labels.length > 0) && (
                <div className="flex flex-row">
                  <p className="text-lg mr-2">Etichete: </p>
                  <ul className="flex flex-row flex-wrap flex-initial items-start">
                    {article.labels.map((label) => {
                      return (
                        <li key={`label__${label.slug}`} className="mr-3 pb-4">

                          <Link href="/eticheta/[slug]" as={`/eticheta/${label.slug}`}>
                            <a className="py-1 px-3 rounded-full shadow-md text-sm border border-gray-500 dark:border-gray-400 bg-transparent dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-400 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-900">
                              {`@${label.name}`}
                            </a>
                          </Link>

                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="flex flex-col max-w-xs mt-4">

                <div className="flex-initial">
                  {article.author?.picture && (
                    <MediaFilteredByType 
                      media={article.author.picture}
                      imageCss="rounded-full w-12 lg:w-max pointer-events-none"
                      srcsetSizes="(min-width: 1024px) 5vw, 15vw"
                      imagePriority={false}
                      imageLayout="intrinsic"
                      linkCSS={null}
                    />
                  )}
                </div>

                <div className="flex-initial">
                  {article.author?.name && (
                    <p className="pt-1">
                      {`Autor: ${article.author.name}`}
                    </p>
                  )}

                </div>

              </div>
            </aside>
            
          </article>

        </div>
      </main>

    </Layout>
  );
};

export default Article;
