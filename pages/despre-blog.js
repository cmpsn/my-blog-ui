import dynamic from "next/dynamic";
import { getAboutPageData, getSlugsOfCategories } from '../lib/api';

// Components
import Layout from '../components/layout';
import Hero from "../components/hero";

const Seo = dynamic(
  () => import("../components/seo")
);

// Modules for page content
const ReactMarkdown = dynamic(
  () => import("react-markdown")
);
const MediaFilteredByType = dynamic(
  () => import("../components/media-filteredby-type")
);
const Slider = dynamic(
  () => import("../components/slider")
);

// Get Static Props
export async function getStaticProps() {
  // Run API calls in parallel
  const [aboutPage, categories] = await Promise.all([
    getAboutPageData(), 
    getSlugsOfCategories(),
  ]);

  return {
    props: { aboutPage, categories }
  };
}

// Render About page
const AboutPage = ({ aboutPage, categories }) => {
  const seo = {
    metaTitle: aboutPage.title,
    metaDescription: aboutPage.description,
  };

  return (
    <Layout categories={categories}>

      <Seo seo={seo} />

      <main>
        
        <Hero 
          title={aboutPage.title} 
          description={null} 
          bgColorCSS='bg-gradient-to-t from-gray-200 via-purple-300 to-gray-200 dark:from-gray-800 dark:via-purple-900 dark:to-gray-900'
        />

        <div className="mx-10 sm:mx-16 md:mx-24 lg:mx-16 2xl:mx-36 py-3">
          <div className="lg:grid lg:grid-cols-2">

            {aboutPage.aboutContentBlocks.map(contentBlock => {
              return (
                <div key={contentBlock.id} className="pb-10 lg:px-12 xl:px-16 2xl:px-20">

                  {contentBlock.content && (
                    <div className="prose max-w-none xl:prose-lg dark:prose-dark">
                      <ReactMarkdown 
                        children={contentBlock.content} 
                        components={{ 
                          'h1': 'h2'
                        }} 
                      />
                    </div>
                  )}

                  {contentBlock.mediaGroup?.length === 1 && (
                    <div className="pt-6 pb-3">
                      <div className="flex justify-center">
                        <MediaFilteredByType 
                          media={contentBlock.mediaGroup[0]}
                          imageCss="pointer-events-none"
                          srcsetSizes="(min-width: 1024px) 50vw, 95vw"
                          imagePriority={false}
                          imageLayout="responsive"
                          linkCSS = "px-3 py-2 font-semibold border border-current rounded-md hover:bg-gray-500 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-900"
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
                                srcsetSizes="(min-width: 1024px) 50vw, 95vw"
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

                </div>
              );
            })}

          </div>
        </div>
      </main>

    </Layout>
  );
};

export default AboutPage;
