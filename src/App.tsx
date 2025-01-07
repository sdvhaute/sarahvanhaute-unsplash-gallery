import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ImageModal from './components/ImageModal';
import Filter from './components/Filter';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface Thumbnail {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  color: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchThumbnails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ results: Thumbnail[] }>(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query: searchTerm || 'random',
            per_page: 15,
            page,
            color: selectedColor || undefined,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
          },
        }
      );

      const newThumbnails = response.data.results;
      setThumbnails((prevThumbnails) =>
        page === 1 ? newThumbnails : [...prevThumbnails, ...newThumbnails]
      );

      // If less than `per_page` results are returned, there are no more results.
      setHasMore(newThumbnails.length === 15);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setError(
          'Too many requests to the Unsplash API. Please wait an hour and try again.'
        );
      } else {
        setError('Failed to load images. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedColor, page]);



  useEffect(() => {
    setThumbnails([]);
    setPage(1);
    fetchThumbnails();
  }, [searchTerm, selectedColor]);

  useEffect(() => {
    if (page > 1) fetchThumbnails();
  }, [page]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedColor('');
    setPage(1);
  };

  const colorOptions = [
    { label: 'All', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Red', value: 'red' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Teal', value: 'teal' },
  ];


  return (
    <div className="app">
      <header>
        <h1>Unsplash Gallery</h1>
      </header>

      <main>
        <div className="filter-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for images..."
          />
          <Filter
            label="Color:"
            options={colorOptions}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />

          <button className="clear-filters-button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        {loading && <div className="spinner">Loading...</div>}
        {error && <div className="alert">{error}</div>}

        <InfiniteScroll
          dataLength={thumbnails.length}
          next={loadMoreImages}
          hasMore={hasMore && !loading}
          loader={thumbnails.length > 0 ? <div className="spinner">Loading...</div> : null}
          endMessage={<div>No more images to load</div>}
        >
          <div className="grid">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={`${thumbnail.id}-${index}`}
                src={thumbnail.urls.small}
                alt={thumbnail.alt_description}
                className="thumbnail"
                onClick={() => handleThumbnailClick(thumbnail.urls.full)}
              />
            ))}
          </div>
        </InfiniteScroll>

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            altText="Fullscreen image"
            onClose={closeImageModal}
          />
        )}
      </main>
    </div>

  );
}

export default App;
