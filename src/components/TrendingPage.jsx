import React, { useState, useEffect, useCallback } from 'react';
import VideoCard from './VideoCard';
import CategoryTabs from './CategoryTabs';
import RegionSelector from './RegionSelector';
import api from '../services/api';

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

  const fetchTrendingVideos = useCallback(async (categoryId = '', regionData = selectedRegion) => {
    setLoading(true);
    setError(null);
    
    // Mock data function
    const setMockData = () => {
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
    };
    
    try {
      const result = await api.getTrending(
        regionData.region,
        categoryId || null,
        20
      );
      
      if (result && result.success) {
        setVideos(result.data.videos || []);
        setCacheInfo(result.meta);
      } else {
        throw new Error(result?.error || 'Failed to fetch videos');
      }
    } catch (err) {
      setError(err.message);
      
      // Fallback: Set mock data for development
      setMockData();
    } finally {
      setLoading(false);
    }
  }, [selectedRegion]); // Include selectedRegion for default parameter

  useEffect(() => {
    fetchTrendingVideos(activeCategory, selectedRegion);
  }, [activeCategory, selectedRegion, fetchTrendingVideos]); // Now fetchTrendingVideos is stable

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleRegionChange = (regionData) => {
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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 sm:py-4 lg:py-6 gap-3 sm:gap-4">
            {/* Header Text */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                🔥 Trending
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                See what's trending on YouTube in{' '}
                <span className="font-semibold text-youtube-red">{selectedRegion.regionName}</span>
              </p>
              
              {/* Cache Info */}
              {cacheInfo && (
                <div className="mt-3 mb-4 sm:mb-0 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Updated {formatLastUpdated()}</span>
                  </div>
                  
                  {cacheInfo.isFallback && (
                    <div className="flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 sm:px-3 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Global data</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full">
                    <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="hidden sm:inline">{getNextUpdateInfo()}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Region Selector */}
            <div className="flex-shrink-0 w-full lg:w-auto mt-3 lg:mt-0">
              <RegionSelector 
                onRegionChange={handleRegionChange} 
                selectedRegion={selectedRegion.region}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="sticky top-32 lg:top-36 z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="w-full relative">
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
      </div>
      
      {/* Main Content - Optimized container */}
      <main className="w-full px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6 scroll-container">
        
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-12 lg:py-20">
            <div className="relative">
              <div className="w-12 h-12 lg:w-16 lg:h-16 border-4 border-gray-200 dark:border-gray-700 border-t-youtube-red rounded-full animate-spin"></div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 border-4 border-transparent border-t-youtube-red/50 rounded-full animate-spin absolute top-2 left-2 animate-reverse"></div>
            </div>
            <h3 className="mt-4 lg:mt-6 text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Loading trending videos...
            </h3>
            <p className="mt-2 text-sm lg:text-base text-gray-600 dark:text-gray-400 text-center">
              Fetching the latest content from {selectedRegion.regionName}
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center py-12 lg:py-20">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 lg:mb-6">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 text-center max-w-md px-4">
              {error}
            </p>
            <button 
              onClick={() => fetchTrendingVideos(activeCategory, selectedRegion)}
              className="mt-4 lg:mt-6 bg-youtube-red hover:bg-youtube-red-dark text-white font-semibold py-2.5 lg:py-3 px-5 lg:px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm lg:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        ) : videos.length === 0 ? (
          /* No Videos State */
          <div className="flex flex-col items-center justify-center py-12 lg:py-20">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 lg:mb-6">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No trending videos found
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 text-center">
              Try selecting a different category or region to discover more content.
            </p>
          </div>
        ) : (
          /* Videos List - Optimized for performance */
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className="video-card bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-150 border border-gray-200 dark:border-gray-800"
              >
                <VideoCard 
                  video={video} 
                  index={index}
                  layout="row"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrendingPage;