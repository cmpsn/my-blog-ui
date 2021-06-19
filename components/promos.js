import dynamic from "next/dynamic";
const MediaFilteredByType = dynamic(
  () => import("./media-filteredby-type")
);

// A component having title + description + URL + media(image, video, file)
const Promos = ({ 
  promos, 
  imagePriority, 
  imageLayout, 
  srcsetSizes, 
  promoBlockCSS, 
  promoItemCSS }) => {

  return (
    <ul className={promoBlockCSS}>
      {promos.map(promo => {
        return (
          <li key={promo.id} className={promoItemCSS}>

            {promo.title && (
              <p className="mb-3 font-semibold text-center text-xl 2xl:text-2xl ">
                {promo.title}
              </p>
            )}

            {(promo.url && promo.medium) && (
              <div>
                <a href={promo.url} rel="noopener noreferrer nofollow" target="_blank">
                  <div className="flex flex-initial justify-center">
                    <MediaFilteredByType 
                      media={promo.medium}
                      imageCss={null}
                      srcsetSizes={srcsetSizes}
                      imagePriority={imagePriority}
                      imageLayout={imageLayout}
                      linkCSS={null}
                    />
                  </div>
                  
                  {promo.medium.caption && (
                    <p className="mt-2 text-sm leading-tight text-center">
                      {promo.medium.caption}
                    </p>
                  )}
                </a>
              </div>
            )}

            {promo.description && (
              <p className="mt-2 italic text-sm leading-tight lg:text-base lg:leading-tight text-center">
                {promo.description}
              </p>
            )}

          </li>
        );
      })}
    </ul>
  );
};

export default Promos;