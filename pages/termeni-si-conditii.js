import dynamic from "next/dynamic";
import { getTermsUseData, getSlugsOfCategories } from '../lib/api';

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
  const [termsOfUse, categories] = await Promise.all([
    getTermsUseData(), 
    getSlugsOfCategories(),
  ]);

  return {
    props: { termsOfUse, categories }
  };
}

// Render page
const TermsOfUse = ({ termsOfUse, categories }) => {
  const seo = {
    metaTitle: termsOfUse.title,
    metaDescription: termsOfUse.description,
  };

  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <GdprInfo 
        gdprInfo={termsOfUse} 
        hasExternalLinks={false} 
      />

    </Layout>
  );
};

export default TermsOfUse;