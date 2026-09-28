import  { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/photos'
        );
        if (!res.ok) throw new Error('Failed to fetch photos');
        const data = await res.json();
        setPhotos(data.slice(0, 100));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const filteredPhotos = photos.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchAlbum =
      selectedAlbum === 'all' || p.albumId === Number(selectedAlbum);
    return matchSearch && matchAlbum;
  });

  const albumIds = [...new Set(photos.map((p) => p.albumId))];

  return (
    <section className="gallery-section">
      <div className="controls">
        <input
          type="text"
          placeholder="Search photos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
          className="album-select"
        >
          <option value="all">All Albums</option>
          {albumIds.map((id) => (
            <option key={id} value={id}>
              Album {id}
            </option>
          ))}
        </select>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode((p) => !p)}
        >
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>

      <p className="results-count">
        Showing <strong>{filteredPhotos.length}</strong> of {photos.length} photos
      </p>

      {loading && (
        <div className="status-container">
          <div className="spinner"></div>
          <p>Loading photos...</p>
        </div>
      )}

      {error && (
        <div className="status-container error">
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredPhotos.length > 0 ? (
            <div className="photo-grid">
              {filteredPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          ) : (
            <div className="status-container">
              <p>No photos found. Try a different search.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PhotoGallery;