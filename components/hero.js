const Hero = ({ title, description, bgColorCSS }) => {
  
  return (
    <div className={`${bgColorCSS} pt-4 mb-1 md:pt-6 md:mb-6 h-36 md:h-44 lg:h-48 xl:h-56 2xl:h-60 w-full block`}>

      {title && (
        <div className="mx-6">
            <h1 className="pt-4 md:pt-8 xl:pt-10 2xl:pt-12 text-gray-700 dark:text-gray-300 text-center font-extrabold text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>

          {description && (
            <p className="py-2 sm:py-4 text-gray-800 dark:text-gray-200 text-center text-lg md:text-xl lg:text-2xl">
              {description}
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default Hero;
