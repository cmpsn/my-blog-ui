import ImageNextJs from "./image-next";
import MediaDownloadable from './media-downloadable';

const MediaFilteredByType = ({ 
  media,
  imageCss,
  srcsetSizes,
  imagePriority,
  imageLayout,
  linkCSS }) => {

  if (media.mime.startsWith('image/')) {
    return (
      <ImageNextJs 
        image={media} 
        imageCss={imageCss}  
        srcsetSizes={srcsetSizes}
        priority={imagePriority}
        layout={imageLayout}
      />
    );
  }
  else if (media.mime.startsWith('application/') || 
    media.mime.startsWith('text/') || 
    media.mime.startsWith('audio/')) {
    return (
      <MediaDownloadable 
        mediaFile={media} 
        linkCSS={linkCSS}
      />
    );
  }
  else {
    return null;
  }
};

export default MediaFilteredByType;