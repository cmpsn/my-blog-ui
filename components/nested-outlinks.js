const NestedOutlinks = ({ outlinksBlocks, outlinksCSS }) => {
  return (
    <ul className={outlinksCSS}>
    {outlinksBlocks.map(outlinksBlock => {
      return (
        <li key={outlinksBlock.id} className="pb-6">
          {outlinksBlock.title && (
            <p className="mb-1 font-bold text-lg leading-tight md:leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight">
              {outlinksBlock.title}
            </p>
          )}
          <ul className="flex-col items-start list-inside text-base leading-tight">
            {outlinksBlock.outlinks.map(outlink => {
              return (
                <li key={outlink.id} className="ml-6 py-3 xl:py-1">
                  <a 
                    href={outlink.url} 
                    rel="noopener noreferrer nofollow" 
                    target="_blank" 
                    className="hover:text-primary dark:hover:text-primary-light"
                  >
                    {outlink.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      );
    })}
  </ul>
  );
};

export default NestedOutlinks;