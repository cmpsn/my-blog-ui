import dynamic from "next/dynamic";
import { getPolicyCookiesData, getSlugsOfCategories } from '../lib/api';

// Components
import Layout from '../components/layout';

const GdprInfo = dynamic(
  () => import("../components/gdpr-info")
);
const Seo = dynamic(
  () => import("../components/seo")
);

// Get Static Props
export async function getStaticProps() {
  // Run API calls in parallel
  const [policyCookies, categories] = await Promise.all([
    getPolicyCookiesData(), 
    getSlugsOfCategories(),
  ]);

  return {
    props: { policyCookies, categories }
  };
}

// Render page
const PolicyOfCookies = ({ policyCookies, categories }) => {
  const seo = {
    metaTitle: policyCookies.title,
    metaDescription: policyCookies.description,
  };

  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <GdprInfo 
        gdprInfo={policyCookies} 
        hasExternalLinks={true} 
      />

    </Layout>
  );
};

export default PolicyOfCookies;