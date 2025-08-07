import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Sample notifications data - User-facing features only
  const notifications = [
    {
      id: 1,
      title: "Welcome Message Added",
      description: "New users now get a personalized welcome note explaining the purpose of this platform",
      timestamp: "2 hours ago",
      isNew: true
    },
    {
      id: 2,
      title: "Improved Visual Design",
      description: "Enhanced button styling and visual elements for a more professional appearance",
      timestamp: "1 day ago",
      isNew: false
    },
    {
      id: 3,
      title: "Better User Experience",
      description: "Improved site performance and faster loading times for trending videos",
      timestamp: "2 days ago",
      isNew: false
    },
    {
      id: 4,
      title: "Dark Mode Available",
      description: "Toggle between light and dark themes for comfortable viewing any time of day",
      timestamp: "3 days ago",
      isNew: false
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-2 max-w-full mx-auto">
        {/* Header Left - Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
            <svg 
              className="w-[100px] h-[24px] cursor-pointer" 
              viewBox="0 0 90 20" 
              preserveAspectRatio="xMidYMid meet" 
              focusable="false"
              onClick={() => window.location.reload()}
            >
              <g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet">
                <g>
                  <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                  <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
                </g>
                <g>
                  <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                  <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.4506C82.3869 16.5827 82.1094 15.2259 82.1094 13.3804V11.2988C82.1094 9.43077 82.3987 8.06121 82.9772 7.18727C83.5558 6.31333 84.5459 5.875 85.9499 5.875C86.9165 5.875 87.6597 6.08101 88.1771 6.49303C88.6945 6.90504 89.0042 7.49808 89.1075 8.27993C89.2108 9.06177 89.2626 10.0765 89.2626 11.3266V13.8712H84.8657ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z" fill={isDarkMode ? '#fff' : '#030303'}/>
                </g>
              </g>
            </svg>
          </div>
        </div>
        
        {/* Header Center - Search */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
          <div className="flex items-center w-full max-w-lg">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search for trending videos..." 
                className="w-full px-4 py-2.5 pr-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-l-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-youtube-red focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full transition-colors duration-200 group">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-youtube-red transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10A7,7,0,1,0,10,17c1.75,0,3.35-.65,4.58-1.71l5.59,5.59ZM10,15A5,5,0,1,1,15,10,5,5,0,0,1,10,15Z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Header Right */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Mobile Search Button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 md:hidden">
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            onClick={toggleTheme} 
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-youtube-red transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,17,12,17L12,17z M13,0h-2v3h2V0z M13,21h-2v3h2V21z M5.22,4.22l-1.41,1.41l2.12,2.12l1.41-1.41L5.22,4.22z M18.78,4.22l-2.12,2.12l1.41,1.41l2.12-2.12L18.78,4.22z M3,13H0v-2h3V13z M24,13h-3v-2h3V13z M5.22,19.78l-1.41-1.41l2.12-2.12l1.41,1.41L5.22,19.78z M18.78,19.78l-2.12-2.12l-1.41,1.41l2.12,2.12L18.78,19.78z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-youtube-red transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"/>
              </svg>
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group relative" 
              title="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-youtube-red transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V4.16 C10,3.21,10.79,2.42,11.74,2.42s1.74,0.79,1.74,1.74v0.18c2.44,0.76,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"/>
              </svg>
              <div className="absolute top-1 right-1 w-2 h-2 bg-youtube-red rounded-full"></div>
            </button>

            {/* Notifications Overlay */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-youtube-red rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </h4>
                              {notification.isNew && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                  What's new
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          {/* Profile */}
          <div className="relative group">
            <button 
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-youtube-red transition-colors duration-200"
              title="Remember when YouTube had a Trending tab? 📈"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/2048px-YouTube_social_white_squircle_%282017%29.svg.png" 
                alt="YouTube Profile" 
                className="w-full h-full object-cover bg-red-600"
              />
            </button>
            
            {/* Easter Egg Tooltip */}
            <div className="absolute right-0 top-12 w-64 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <div className="flex items-start gap-2">
                <span className="text-lg">🎬</span>
                <div>
                  <p className="font-medium mb-1">YouTube Trending Memories</p>
                  <p className="text-xs text-gray-300 dark:text-gray-400">
                    "Back when discovering viral content was just a click away in the Trending tab. Those were simpler times!" 
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
                    - A nostalgic developer, 2025
                  </p>
                </div>
              </div>
              {/* Arrow pointing up */}
              <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
