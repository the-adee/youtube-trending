import React, { useState } from 'react';
import './ShareModal.css';

const ShareModal = ({ video, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(video.url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out this trending video: ${video.title} by ${video.channelTitle}\n${video.url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out this trending video: ${video.title} by ${video.channelTitle}`);
    const url = encodeURIComponent(video.url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(video.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(`Check out this trending video: ${video.title} by ${video.channelTitle}`);
    const url = encodeURIComponent(video.url);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(video.url);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this trending video: ${video.title}`);
    const body = encodeURIComponent(`I thought you might like this trending video:\n\n${video.title}\nby ${video.channelTitle}\n\nWatch it here: ${video.url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share</h3>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div className="video-preview">
          <img src={video.thumbnails?.medium?.url} alt={video.title} className="video-thumbnail" />
          <div className="video-details">
            <h4>{video.title}</h4>
            <p>{video.channelTitle}</p>
          </div>
        </div>

        <div className="share-options">
          <button className="share-option" onClick={handleWhatsAppShare}>
            <div className="share-icon whatsapp">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.25 7.24c-.21-.44-.61-.84-1.05-1.05-.44-.21-1.27-.48-1.48-.53-.21-.05-.36-.08-.52.08-.16.16-.61.77-.75.93-.14.16-.27.18-.5.06-.23-.12-.96-.35-1.83-1.13-.68-.6-1.14-1.34-1.27-1.57-.14-.23-.02-.36.1-.47.1-.1.23-.27.35-.4.12-.14.16-.23.24-.38.08-.16.04-.3-.02-.42-.06-.12-.52-1.26-.72-1.72-.2-.46-.4-.4-.52-.4-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.23.23-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.3z"/>
              </svg>
            </div>
            <span>WhatsApp</span>
          </button>

          <button className="share-option" onClick={handleTwitterShare}>
            <div className="share-icon twitter">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span>Twitter</span>
          </button>

          <button className="share-option" onClick={handleFacebookShare}>
            <div className="share-icon facebook">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span>Facebook</span>
          </button>

          <button className="share-option" onClick={handleTelegramShare}>
            <div className="share-icon telegram">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <span>Telegram</span>
          </button>

          <button className="share-option" onClick={handleLinkedInShare}>
            <div className="share-icon linkedin">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span>LinkedIn</span>
          </button>

          <button className="share-option" onClick={handleEmailShare}>
            <div className="share-icon email">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <span>Email</span>
          </button>
        </div>

        <div className="copy-link-section">
          <div className="copy-input-group">
            <input
              type="text"
              value={video.url}
              readOnly
              className="copy-input"
            />
            <button 
              className={`copy-button ${copySuccess ? 'copied' : ''}`}
              onClick={handleCopyLink}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
