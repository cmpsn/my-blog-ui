import { getStrapiMedia } from '../lib/media';

const MediaDownloadable = ({ mediaFile, linkCSS=null }) => {

  const mediaUrl = getStrapiMedia(mediaFile);

  return (
    <>
      <p className="italic py-4">
        {mediaFile.alternativeText || mediaFile.caption || mediaFile.name}
        
        {mediaFile.size && (
          <span> (aprox. {mediaFile.size} kb)</span>
        )}
      </p>

      <a 
        href={mediaUrl} 
        className={linkCSS}
        rel='noopener noreferrer nofollow' 
        target='_blank' 
        download
      >
        Descarcă
      </a>
    </>
  );
};

export default MediaDownloadable;
