import React, { useState, useEffect, useCallback } from 'react';
import './TrendingPage.css';
import VideoCard from './VideoCard';
import CategoryTabs from './CategoryTabs';
import RegionSelector from './RegionSelector';

const TrendingPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [cacheInfo, setCacheInfo] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState({
    country: 'IN',
    region: 'IN',
    countryName: 'India',
    regionName: 'India'
  });

  // Backend API configuration
  const API_BASE_URL = 'http://localhost:3000/api';

  const fetchTrendingVideos = useCallback(async (categoryId = '', regionData = selectedRegion) => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${API_BASE_URL}/trending`;
      const params = new URLSearchParams();
      
      // Use the region from regionData (either country or sub-region)
      params.set('region', regionData.region);
      params.set('maxResults', '20');
      
      if (categoryId) {
        params.set('category', categoryId);
      }
      
      url += '?' + params.toString();

      console.log('🔍 Fetching from:', url);
      console.log('📍 Region details:', regionData);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setVideos(result.data.videos || []);
        setCacheInfo(result.meta);
        console.log('✅ Fetched videos:', result.data.videos?.length || 0);
        console.log('📊 Cache info:', result.meta);
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
  }, [selectedRegion]); // Include selectedRegion as dependency

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
      await fetchTrendingVideos(activeCategory, selectedRegion);
    };
    
    loadTrendingVideos();
  }, [activeCategory, selectedRegion, fetchTrendingVideos]); // Include all dependencies

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleRegionChange = (regionData) => {
    console.log('🌍 Region changed to:', regionData);
    setSelectedRegion(regionData);
  };

  // Helper function to format last updated time
  const formatLastUpdated = () => {
    if (!cacheInfo?.lastUpdated) return '';
    
    const lastUpdated = new Date(cacheInfo.lastUpdated);
    const now = new Date();
    const diffMinutes = Math.floor((now - lastUpdated) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Helper function to get next update info
  const getNextUpdateInfo = () => {
    if (!cacheInfo?.minutesToNextUpdate) return '';
    
    const minutes = cacheInfo.minutesToNextUpdate;
    if (minutes <= 0) return 'Updating soon...';
    if (minutes < 60) return `Next update in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `Next update in ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `Next update in ${hours}h ${remainingMinutes}m`;
  };

  if (error && videos.length === 0) {
    return (
      <div className="trending-page">
        <div className="page-header">
          <div className="header-content">
            <div className="header-text">
              <h1>Trending</h1>
              <p>See what's trending on YouTube in {selectedRegion.regionName}</p>
              {cacheInfo && (
                <div className="cache-info">
                  <span className="last-updated">
                    📊 Updated {formatLastUpdated()}
                  </span>
                  {cacheInfo.isFallback && (
                    <span className="fallback-notice">
                      • Showing global trending data
                    </span>
                  )}
                  <span className="next-update">
                    • {getNextUpdateInfo()}
                  </span>
                </div>
              )}
            </div>
            <div className="header-controls">
              <RegionSelector 
                onRegionChange={handleRegionChange} 
                selectedRegion={selectedRegion.region}
              />
            </div>
          </div>
        </div>
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <div className="error-message">
          <h2>Unable to load trending videos</h2>
          <p>Error: {error}</p>
          <p>Make sure the backend server is running on port 3000.</p>
          <button onClick={() => fetchTrendingVideos(activeCategory, selectedRegion)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Trending</h1>
            <p>See what's trending on YouTube in {selectedRegion.regionName}</p>
            {cacheInfo && (
              <div className="cache-info">
                <span className="last-updated">
                  📊 Updated {formatLastUpdated()}
                </span>
                {cacheInfo.isFallback && (
                  <span className="fallback-notice">
                    • Showing global trending data
                  </span>
                )}
                <span className="next-update">
                  • {getNextUpdateInfo()}
                </span>
              </div>
            )}
          </div>
          <div className="header-controls">
            <RegionSelector 
              onRegionChange={handleRegionChange} 
              selectedRegion={selectedRegion.region}
            />
          </div>
        </div>
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
