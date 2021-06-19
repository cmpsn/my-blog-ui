import dynamic from "next/dynamic";
import { getCategoryBySlug, getSlugsOfCategories } from "../../lib/api";

// Components
import Layout from "../../components/layout";
import Hero from '../../components/hero';
import ArticlesPagination from "../../components/articles-pagination";
import NestedOutlinks from "../../components/nested-outlinks";

const Seo = dynamic(
  () => import("../../components/seo")
);
const Promos = dynamic(
  () => import("../../components/promos")
);

// Category has dynamic route.
export async function getStaticPaths() {

  const categories = await getSlugsOfCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

// Category props
export async function getStaticProps({ params }) {
  
  const category = (await getCategoryBySlug(params.slug))[0];
  const categories = await getSlugsOfCategories();

  return {
    props: { category, categories }
  };
}

// Render Category
const Category = ({ category, categories }) => {
  
  const seo = {
    metaTitle: category.name,
    metaDescription: category.description,
    shareImage: category.image,
  };
  
  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <main>

        <Hero 
          title={category.name} 
          description={category.description} 
          bgColorCSS="bg-gradient-to-t from-gray-200 via-blue-300 to-gray-200 dark:from-gray-800 dark:via-blue-900 dark:to-gray-900"
        />

        <div className="mx-2 sm:mx-4 md:mx-10 lg:mx-16 xl:mx-20 2xl:mx-56 py-3">

          <div className="xl:grid xl:grid-cols-4 gap-3">

            <div className="xl:col-start-1 xl:col-span-3">

              <ArticlesPagination 
                articles={category.articles} 
                showDescription={true}  
                articlesIndexCss="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center" 
              />

            </div>

            <aside className="xl:col-start-4 xl:col-span-1 xl:ml-8 2xl:ml-12">
              {category.promos.length > 0 && (
                <div className="mx-6 xl:mx-3 2xl:mx-6">
                  <Promos 
                    promos={category.promos} 
                    imagePriority={false}
                    imageLayout="intrinsic" 
                    srcsetSizes="(max-width: 640px) 60vw, (max-width: 1280px) 30vw, 20vw"
                    promoBlockCSS="mx-auto w-3/5 max-w-xs sm:w-auto sm:max-w-none sm:grid sm:grid-cols-3 xl:grid xl:grid-cols-1 xl:-mt-3"
                    promoItemCSS="pt-6 pb-6 md:pb-12 xl:pt-3 sm:mx-6"
                  />
                </div>
              )}

              {category.outlinksBlocks.length > 0 && (
                <div className="mx-6 xl:mx-3 2xl:mx-4">
                  <NestedOutlinks 
                    outlinksBlocks={category.outlinksBlocks} 
                    outlinksCSS="xl:ml-4 2xl:ml-8 grid grid-cols-1 sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-1"
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

export default Category;