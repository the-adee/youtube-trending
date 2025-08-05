import React, { useState } from 'react';
import './VideoCard.css';
import ShareModal from './ShareModal';

const VideoCard = ({ video, index }) => {
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
      <div className="video-card">
        <div className="rank-number">
          #{videoData.rank}
        </div>
        
        <div className="thumbnail-container">
          <a href={videoData.url} target="_blank" rel="noopener noreferrer">
            <img
              src={videoData.thumbnails?.medium?.url || videoData.thumbnails?.default?.url || `https://picsum.photos/320/180?random=${index}`}
              alt={videoData.title}
              className="thumbnail"
            />
            <div className="duration">
              {formatDuration(videoData.duration)}
            </div>
          </a>
        </div>
        
        <div className="video-info">
          <h3 className="video-title">
            <a href={videoData.url} target="_blank" rel="noopener noreferrer">
              {videoData.title}
            </a>
          </h3>
          
          <div className="channel-info">
            <div className="channel-avatar">
              <img
                src={videoData.channelThumbnail}
                alt={videoData.channelTitle}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(videoData.channelTitle || 'Channel')}&background=0066cc&color=fff&size=88`;
                }}
              />
            </div>
            <span className="channel-name">
              {videoData.channelTitle}
            </span>
            <svg className="verified-icon" viewBox="0 0 24 24" width="14" height="14">
              <path d="M12,2A10,10,0,1,0,22,12,10.01,10.01,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l5.293-4.793a1,1,0,1,1,1.414,1.414Z"/>
            </svg>
          </div>
          
          <div className="video-stats">
            <span className="view-count">
              {formatViewCount(videoData.viewCount || '0')} views
            </span>
            <span className="upload-time">
              {getTimeAgo(videoData.publishedAt)}
            </span>
          </div>
          
          <div className="video-description">
            {videoData.description?.substring(0, 100)}
            {videoData.description?.length > 100 && '...'}
          </div>
          
          {videoData.categoryName && (
            <div className="video-category">
              <span className="category-badge">{videoData.categoryName}</span>
            </div>
          )}
        </div>
        
        <div className="video-actions">
          <button className="action-button share-button" onClick={handleShare} title="Share">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15,5.63,20.66,12,15,18.37V14.54c-1.66.11-3.42.73-5.17,1.91C8.33,17.74,7.15,19.21,6.38,21A18.25,18.25,0,0,1,9.3,9.71C11.14,7.42,13.16,6.3,15,5.63Z"/>
            </svg>
          </button>
        </div>
      </div>
      
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
