import dynamic from "next/dynamic";
import Link from "next/link";
import { getHomepageData, getSlugsOfCategories, getSlugsOfLabels, getArticlesForHomeCards } from "../lib/api";

// Components
import Layout from "../components/layout";
import Hero from "../components/hero";
import ArticlesIndex from "../components/articles-index";
const Seo = dynamic(
  () => import("../components/seo")
);
const Promos = dynamic(
  () => import("../components/promos")
);
import ImageNextJs from '../components/image-next';


// Get homepage static props.
export async function getStaticProps() {
  const [articles, categories, labels, homepage] = await Promise.all([
    getArticlesForHomeCards(), 
    getSlugsOfCategories(), 
    getSlugsOfLabels(), 
    getHomepageData(), 
  ]);

  return {
    props: { articles, categories, labels, homepage }
  };
}

// Render Home component.
const Home = ({ articles, categories, labels, homepage }) => {
  return (
    <Layout categories={categories}>

      <Seo seo={homepage.seo}></Seo>

      <main>

        <Hero 
          title={homepage.hero.title} 
          description={null} 
          bgColorCSS="bg-gradient-to-t from-gray-200 via-purple-300 to-gray-200 dark:from-gray-800 dark:via-purple-900 dark:to-gray-900"
        />

        {homepage.hero.image && (
          <div className="container mx-auto mb-6">
            <div className="mx-16 xl:mx-28 2xl:mx-56 grid grid-cols-1 sm:grid sm:grid-cols-2 sm:gap-3 justify-items-center">

              <ImageNextJs 
                image={homepage.hero.image} 
                imageCss={null}
                srcsetSizes="(max-width: 640px) 80vw, (max-width: 1280px) 50vw, 20vw"
                priority={true}
                layout="intrinsic"
              />

              <div className="place-self-center">
                <hr className="my-3 border-primary-light" />
                <p className="xl:text-lg place-self-center">
                  {homepage.seo.metaDescription}
                </p>
                <hr className="my-3 border-primary-light" />
              </div>

            </div>
          </div>
        )}

        <div className="mx-2 sm:mx-4 md:mx-10 lg:mx-16 xl:mx-20 2xl:mx-56 py-3">

          <div className="xl:grid xl:grid-cols-4 gap-3">

            <div className="xl:col-start-1 xl:col-span-3">

              <h2 className="text-center font-bold pb-4 md:pb-6 lg:pb-4 xl:pb-12 text-2xl sm:text-3xl lg:text-4xl">
                Cele mai recente articole
              </h2>

              <ArticlesIndex 
                articles={articles} 
                showDescription={true} 
                articlesIndexCss="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center" 
              />

              <h2 className="text-center font-bold mt-8 md:mt-12 xl:mt-20 2xl:mt-24 pb-2 xl:pb-6 text-2xl sm:text-3xl lg:text-4xl">
                Etichete pentru articole
              </h2>
              
              <ul className="flex flex-row flex-wrap flex-initial justify-center mt-3 mx-3 mb-16">
                {labels.map((label) => {
                  return (
                    <li key={label.slug} className="mx-3 my-4 md:my-6">
                      <Link href="/eticheta/[slug]" as={`/eticheta/${label.slug}`}>
                        <a className="py-2 px-4 rounded-full shadow-md font-semibold text-sm border border-gray-500 dark:border-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-400 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-900">
                          {label.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>

            <aside className="xl:col-start-4 xl:col-span-1 xl:ml-8 2xl:ml-12">
                {homepage.homePromos.length > 0 && (
                  <div className="mx-6 xl:mx-6">
                    <h2 className="text-center font-bold pb-0 md:pb-2 xl:pb-12 text-2xl sm:text-3xl lg:text-4xl">
                      Diverse
                    </h2>
                    <Promos 
                      promos={homepage.homePromos}
                      imagePriority={false}
                      imageLayout="intrinsic"
                      srcsetSizes="(max-width: 640px) 60vw, (max-width: 1280px) 30vw, 20vw"
                      promoBlockCSS="mx-auto w-3/5 max-w-xs sm:w-auto sm:max-w-none sm:grid sm:grid-cols-3 xl:grid xl:grid-cols-1 xl:-mt-3"
                      promoItemCSS="pt-6 pb-6 md:pb-12 xl:pt-3 sm:mx-6"
                    />
                  </div>
                )}
            </aside>

          </div>

        </div>
      </main>

    </Layout>
  );
};

export default Home;