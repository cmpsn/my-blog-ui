import { getStrapiMedia } from '../lib/media';
// import Image from 'next/image';
import dynamic from 'next/dynamic';
const Image = dynamic(
  () => import('next/image')
);

// Custom loader for next-image
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Render next-image
const ImageNextJs = ({
  image,
  imageCss,
  srcsetSizes,
  priority,
  layout }) => {

  const imageUrl = getStrapiMedia(image);
  const backupBlur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMU2NlYDwAD9gHLEkj80wAAAABJRU5ErkJggg==";
  const blurDataURL = image.formats?.base64 ? getStrapiMedia(image.formats.base64) : backupBlur;

  return (
    <Image 
      loader={myLoader}
      src={imageUrl} 
      alt={image.alternativeText || image.name} 
      width={image.width} 
      height={image.height} 
      className={imageCss} 
      sizes={srcsetSizes} 
      priority={priority} 
      layout={layout}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

export default ImageNextJs;