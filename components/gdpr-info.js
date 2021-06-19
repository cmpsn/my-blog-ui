import dynamic from "next/dynamic";
const ReactMarkdown = dynamic(
  () => import("react-markdown")
);

const GdprInfo = ({ gdprInfo, hasExternalLinks }) => {
  return (
    <main className="container mx-auto px-8 sm:px-12 md:px-28 lg:px-0 2xl:px-8 pb-12 md:pb-14 lg:pb-16 xl:pb-20 2xl:pb-24">
      <div className="lg:grid lg:grid-cols-12">
        <article className="lg:col-start-4 lg:col-span-6">

          <header className="py-12 md:py-14 lg:py-16 xl:py-20 2xl:py-24 text-center">
            <h1 className="pb-10 font-extrabold text-3xl md:text-4xl lg:text-5xl lg:leading-tight text-gray-900 dark:text-gray-300">
              {gdprInfo.title}
            </h1>
          </header>

          <div className="prose max-w-none xl:prose-lg dark:prose-dark">
            {hasExternalLinks ? (
              <ReactMarkdown 
                children={gdprInfo.content} 
                components={{
                  'a': ({node, ...props}) => <a {...props} rel="noopener noreferrer nofollow" target="_blank" />
                }}
              />
              ) : (
              <ReactMarkdown 
                children={gdprInfo.content} 
              />
            )}
          </div>

        </article>
      </div>
    </main>
  );
};

export default GdprInfo;