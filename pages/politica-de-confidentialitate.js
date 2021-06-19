import dynamic from "next/dynamic";
import { getPolicyPrivacyData, getSlugsOfCategories } from '../lib/api';

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
  const [policyPrivacy, categories] = await Promise.all([
    getPolicyPrivacyData(), 
    getSlugsOfCategories(),
  ]);

  return {
    props: { policyPrivacy, categories }
  };
}

// Render page
const PolicyOfPrivacy = ({ policyPrivacy, categories }) => {
  const seo = {
    metaTitle: policyPrivacy.title,
    metaDescription: policyPrivacy.description,
  };

  return (
    <Layout categories={categories}>
      
      <Seo seo={seo} />

      <GdprInfo 
        gdprInfo={policyPrivacy} 
        hasExternalLinks={false} 
      />

    </Layout>
  );
};

export default PolicyOfPrivacy;