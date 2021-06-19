import dynamic from "next/dynamic";
import { getLabelBySlug, getSlugsOfLabels, getSlugsOfCategories } from "../../lib/api";

// Components
import Layout from "../../components/layout";
import ArticlesPagination from "../../components/articles-pagination";
// import Seo from "../../components/seo";
const Seo = dynamic(
  () => import("../../components/seo")
);

// Label has dynamic route.
export async function getStaticPaths() {

  const labels = await getSlugsOfLabels();

  return {
    paths: labels.map((label) => ({
      params: {
        slug: label.slug,
      },
    })),
    fallback: false,
  };
}

// Fetch Label static props
export async function getStaticProps({ params }) {

  const label = (await getLabelBySlug(params.slug))[0];
  const categories = await getSlugsOfCategories();

  return {
    props: { label, categories }
  };
}

// Render Label
const Label = ({ label, categories }) => {
  
  const seo = {
    metaTitle: label.name,
    metaDescription: label.description,
  };

  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <main className="mx-2 sm:mx-4 md:mx-10 lg:mx-16 xl:mx-20 2xl:mx-56">

        <div className="pb-6 xl:pb-10 pt-8 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 text-center">
          <h1 className="pb-4 md:pb-6 lg:pb-8 text-2xl md:text-3xl lg:text-4xl">
            @{label.name}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl">
            {label.description}
          </p>
        </div>

        <ArticlesPagination 
          articles={label.articles} 
          showDescription={true}  
          articlesIndexCss="my-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-center" 
        />

      </main>

    </Layout>
  );
};

export default Label;