import React, { useState } from 'react';
import ShareModal from './ShareModal';

const VideoCard = ({ video, index, layout = 'row' }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const formatViewCount = (viewCount) => {
    const count = parseInt(viewCount);
    if (count >= 1000000000) {
      return `${(count / 1000000000).toFixed(1)}B`;
    } else if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    
    // Parse ISO 8601 duration (PT#M#S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const getTimeAgo = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  // Handle both backend API format and original YouTube API format
  const videoData = {
    id: video.id,
    title: video.title || video.snippet?.title,
    channelTitle: video.channelTitle || video.snippet?.channelTitle,
    channelId: video.channelId || video.snippet?.channelId,
    channelThumbnail: video.channelThumbnail || 
                     (video.snippet?.channelId ? 
                       `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelTitle || video.snippet?.channelTitle || 'Channel')}&background=0066cc&color=fff&size=88` : 
                       'https://ui-avatars.com/api/?name=Channel&background=0066cc&color=fff&size=88'),
    publishedAt: video.publishedAt || video.snippet?.publishedAt,
    description: video.description || video.snippet?.description,
    thumbnails: video.thumbnails || video.snippet?.thumbnails,
    viewCount: video.viewCount || video.statistics?.viewCount,
    likeCount: video.likeCount || video.statistics?.likeCount,
    duration: video.duration || video.contentDetails?.duration,
    rank: video.rank || (index + 1),
    categoryName: video.categoryName || 'Unknown',
    url: video.url || `https://www.youtube.com/watch?v=${video.id}`
  };

  return (
    <>
      {layout === 'row' ? (
        // YouTube-style row layout with improved mobile design
        <div className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-youtube-red/20 dark:hover:border-youtube-red/20">
          <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
            {/* Rank Badge */}
            <div className="flex-shrink-0 flex items-start">
              <div className="bg-youtube-red text-white text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-1 rounded-lg shadow-sm min-w-[2rem] sm:min-w-[2.5rem] text-center">
                #{videoData.rank}
              </div>
            </div>
            
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <a 
                  href={videoData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={videoData.thumbnails?.medium?.url || videoData.thumbnails?.default?.url || `https://picsum.photos/320/180?random=${index}`}
                    alt={videoData.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  {videoData.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                      {formatDuration(videoData.duration)}
                    </div>
                  )}
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              {/* Title */}
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm sm:text-base lg:text-lg leading-tight group-hover:text-youtube-red transition-colors duration-200">
                <a 
                  href={videoData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {videoData.title}
                </a>
              </h3>
              
              {/* Channel Info */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={videoData.channelThumbnail}
                    alt={videoData.channelTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(videoData.channelTitle || 'Channel')}&background=0066cc&color=fff&size=24`;
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium truncate">
                    {videoData.channelTitle}
                  </span>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10,0,1,0,22,12,10.01,10.01,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l5.293-4.793a1,1,0,1,1,1.414,1.414Z"/>
                  </svg>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-medium">
                    {formatViewCount(videoData.viewCount || '0')} views
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {getTimeAgo(videoData.publishedAt)}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              {videoData.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed hidden sm:block">
                  {videoData.description.substring(0, 150)}
                  {videoData.description.length > 150 && '...'}
                </p>
              )}
              
              {/* Category & Actions */}
              <div className="flex items-center justify-between pt-1">
                {videoData.categoryName && videoData.categoryName !== 'Unknown' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {videoData.categoryName}
                  </span>
                )}
                
                <button 
                  onClick={handleShare}
                  className="ml-auto p-2 text-gray-400 hover:text-youtube-red hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  title="Share video"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Original card layout (for other uses)
        <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-youtube-red/20 dark:hover:border-youtube-red/20">
          {/* Rank Badge */}
          <div className="absolute top-3 left-3 z-10 bg-youtube-red text-white text-sm font-bold px-2 py-1 rounded-lg shadow-lg">
            #{videoData.rank}
          </div>
          
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <a 
              href={videoData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={videoData.thumbnails?.medium?.url || videoData.thumbnails?.default?.url || `https://picsum.photos/320/180?random=${index}`}
                alt={videoData.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              {/* Duration Badge */}
              {videoData.duration && (
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
                  {formatDuration(videoData.duration)}
                </div>
              )}
            </a>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight group-hover:text-youtube-red transition-colors duration-200">
              <a 
                href={videoData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {videoData.title}
              </a>
            </h3>
            
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={videoData.channelThumbnail}
                  alt={videoData.channelTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(videoData.channelTitle || 'Channel')}&background=0066cc&color=fff&size=32`;
                  }}
                />
              </div>
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium truncate">
                  {videoData.channelTitle}
                </span>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10,0,1,0,22,12,10.01,10.01,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l5.293-4.793a1,1,0,1,1,1.414,1.414Z"/>
                </svg>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">
                  {formatViewCount(videoData.viewCount || '0')} views
                </span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {getTimeAgo(videoData.publishedAt)}
                </span>
              </div>
            </div>
            
            {/* Description */}
            {videoData.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {videoData.description.substring(0, 120)}
                {videoData.description.length > 120 && '...'}
              </p>
            )}
            
            {/* Category & Actions */}
            <div className="flex items-center justify-between pt-2">
              {videoData.categoryName && videoData.categoryName !== 'Unknown' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {videoData.categoryName}
                </span>
              )}
              
              <button 
                onClick={handleShare}
                className="ml-auto p-2 text-gray-400 hover:text-youtube-red hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                title="Share video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showShareModal && (
        <ShareModal
          video={videoData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
};

export default VideoCard;
