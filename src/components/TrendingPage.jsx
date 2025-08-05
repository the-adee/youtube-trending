import React, { useState, useEffect } from 'react';
import './TrendingPage.css';
import VideoCard from './VideoCard';
import CategoryTabs from './CategoryTabs';

const TrendingPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');

  // Backend API configuration
  const API_BASE_URL = 'http://localhost:3000/api';

  const fetchTrendingVideos = async (categoryId = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${API_BASE_URL}/trending`;
      const params = new URLSearchParams();
      
      params.set('region', 'IN');
      params.set('maxResults', '20');
      
      if (categoryId) {
        params.set('category', categoryId);
      }
      
      url += '?' + params.toString();

      console.log('🔍 Fetching from:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setVideos(result.data.videos || []);
        console.log('✅ Fetched videos:', result.data.videos?.length || 0);
      } else {
        throw new Error(result.error || 'Failed to fetch videos');
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching trending videos:', err);
      
      // Fallback: Set mock data for development
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    // Mock data for development/demo purposes
    const mockVideos = Array.from({ length: 20 }, (_, index) => ({
      id: `mock-${index}`,
      title: `Trending Video #${index + 1} - Amazing Content That's Currently Viral`,
      channelTitle: `Creator Channel ${index + 1}`,
      channelId: `mock-channel-${index}`,
      channelThumbnail: `https://ui-avatars.com/api/?name=Creator+Channel+${index + 1}&background=0066cc&color=fff&size=88`,
      publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: `This is a sample description for trending video ${index + 1}. It contains interesting content that people are watching right now.`,
      thumbnails: {
        medium: {
          url: `https://picsum.photos/320/180?random=${index}`
        }
      },
      viewCount: Math.floor(Math.random() * 10000000),
      likeCount: Math.floor(Math.random() * 100000),
      commentCount: Math.floor(Math.random() * 10000),
      duration: `PT${Math.floor(Math.random() * 20 + 1)}M${Math.floor(Math.random() * 60)}S`,
      rank: index + 1,
      categoryName: 'Entertainment',
      url: `https://www.youtube.com/watch?v=mock-${index}`
    }));
    
    setVideos(mockVideos);
    console.log('📝 Using mock data for development');
  };

  useEffect(() => {
    const loadTrendingVideos = async () => {
      await fetchTrendingVideos(activeCategory);
    };
    
    loadTrendingVideos();
  }, [activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (error && videos.length === 0) {
    return (
      <div className="trending-page">
        <div className="page-header">
          <h1>Trending</h1>
          <p>See what's trending on YouTube in India</p>
        </div>
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <div className="error-message">
          <h2>Unable to load trending videos</h2>
          <p>Error: {error}</p>
          <p>Make sure the backend server is running on port 3000.</p>
          <button onClick={() => fetchTrendingVideos(activeCategory)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-page">
      <div className="page-header">
        <h1>Trending</h1>
        <p>See what's trending on YouTube in India</p>
      </div>
      
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading trending videos...</p>
        </div>
      ) : (
        <div className="videos-container">
          {videos.map((video, index) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              index={index}
            />
          ))}
        </div>
      )}
      
      {!loading && videos.length === 0 && (
        <div className="no-videos">
          <h2>No trending videos found</h2>
          <p>Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
