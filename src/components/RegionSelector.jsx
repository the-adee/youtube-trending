import React, { useState } from 'react';
import './RegionSelector.css';

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
    <div className="region-selector">
      <button 
        className={`region-selector-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select country for trending videos"
      >
        <span className="region-text">
          <span className="region-flag">{getCurrentSelection().flag}</span>
          {getCurrentSelection().name}
        </span>
        <svg 
          className={`chevron ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="region-dropdown">
          <div className="region-dropdown-content">
            <div className="region-header">
              <h3>Select Country</h3>
              <p>Choose a country to see its trending videos</p>
            </div>

            <div className="countries-grid">
              {countries.map((country) => (
                <button
                  key={country.code}
                  className={`country-item ${selectedRegion === country.code ? 'selected' : ''}`}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="country-flag">{country.flag}</span>
                  <span className="country-name">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
