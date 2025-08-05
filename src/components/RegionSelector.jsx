import React, { useState } from 'react';

const RegionSelector = ({ onRegionChange, selectedRegion = 'IN' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Countries supported by YouTube API
  const countries = [
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'KR', name: 'South Korea', flag: '��' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'NL', name: 'Netherlands', flag: '��' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '��' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'IE', name: 'Ireland', flag: '��' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
    { code: 'TH', name: 'Thailand', flag: '��' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'AR', name: 'Argentina', flag: '�🇷' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'EG', name: 'Egypt', flag: '��' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'AE', name: 'UAE', flag: '��' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    { code: 'HU', name: 'Hungary', flag: '��' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴' }
  ];

  const handleCountrySelect = (country) => {
    const selectedData = {
      country: country.code,
      region: country.code,
      countryName: country.name,
      regionName: country.name
    };
    
    onRegionChange(selectedData);
    setIsOpen(false);
  };

  const getCurrentSelection = () => {
    const country = countries.find(c => c.code === selectedRegion);
    return country ? { flag: country.flag, name: country.name } : { flag: '🌍', name: 'Select Country' };
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.region-selector')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="region-selector relative inline-block w-full lg:w-80 z-50">
      <button 
        className={`
          flex items-center justify-between w-full px-4 py-3 
          bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 
          rounded-xl text-sm font-semibold text-gray-900 dark:text-white
          transition-all duration-300 min-h-12 gap-3
          shadow-md hover:shadow-lg
          ${isOpen 
            ? 'border-youtube-red shadow-youtube ring-2 ring-youtube-red/20' 
            : 'hover:border-youtube-red/30 hover:shadow-md'
          }
          group relative overflow-hidden
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select country for trending videos"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-youtube-red/5 to-youtube-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <span className="flex items-center gap-3 flex-1 truncate relative z-10">
          <span className="text-xl filter drop-shadow-sm">{getCurrentSelection().flag}</span>
          <span className="truncate">{getCurrentSelection().name}</span>
        </span>
        
        <svg 
          className={`w-5 h-5 transition-transform duration-300 relative z-10 ${
            isOpen ? 'transform rotate-180 text-youtube-red' : 'text-gray-400 group-hover:text-youtube-red'
          }`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"></div>
          
          {/* Dropdown */}
          <div className={`
            absolute top-full left-0 mt-2 z-[60]
            bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
            rounded-xl shadow-2xl overflow-hidden
            animate-slide-down
            w-full min-w-[320px] max-w-md
            max-h-80
            transform transition-all duration-200 ease-out
          `}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  🌍 Select Country
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Choose a country to see its trending videos
                </p>
              </div>

              {/* Countries List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-64">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    className={`
                      w-full flex items-center gap-3 p-2.5 rounded-lg text-left 
                      transition-all duration-200 group text-sm
                      ${selectedRegion === country.code 
                        ? 'bg-youtube-red/10 text-youtube-red font-medium' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }
                    `}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className={`text-lg transition-transform duration-200 ${
                      selectedRegion === country.code ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {country.flag}
                    </span>
                    <span className="truncate flex-1">
                      {country.name}
                    </span>
                    {selectedRegion === country.code && (
                      <svg className="w-4 h-4 text-youtube-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegionSelector;
