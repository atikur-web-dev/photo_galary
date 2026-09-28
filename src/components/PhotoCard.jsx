const PhotoCard = ({ photo }) => {
  return (
    <article className="photo-card">
      <div className="photo-image-wrapper">
        <img src={photo.url} alt={photo.title} loading="lazy" />
      </div>
      <div className="photo-info">
        <h3 className="photo-title">{photo.title}</h3>
        <div className="photo-meta">
          <span className="badge">ID: {photo.id}</span>
          <span className="badge">Album: {photo.albumId}</span>
        </div>
      </div>
    </article>
  );
};

export default PhotoCard;