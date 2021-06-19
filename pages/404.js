import Link from 'next/link';
import { getSlugsOfCategories } from '../lib/api';

// Components
import Layout from '../components/layout';

// Get Static Props
export async function getStaticProps() {

  const categories = await getSlugsOfCategories();

  return {
    props: { categories }
  };
}

// Render 404 Page
const PageNotFound = ({ categories }) => {

  return (
    <Layout categories={categories}>
      
      <div className="container mx-auto h-screen">
        <div className="grid grid-cols-1 h-4/5 place-content-center">

        <h1 className="text-center my-1 lg:my-3 font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {'Ooops...'}
        </h1>
        <p className="text-center my-1 lg:my-3 text-xl md:text-2xl lg:text-3xl">
          {'Această pagină nu poate fi găsită.'}
        </p>
        <p className="text-center my-1 lg:my-3 text-lg md:text-xl lg:text-2xl">
          {'Întoarce-te la '}
          <Link href="/">
            <a className="text-primary-dark hover:text-primary dark:text-secondary-light dark:hover:text-secondary">
              pagina principală.
            </a>
          </Link>
        </p>

        </div>
      </div>
    
    </Layout>
  );
};

export default PageNotFound;