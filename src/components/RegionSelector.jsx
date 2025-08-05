import React, { useState } from 'react';
import './RegionSelector.css';

const RegionSelector = ({ onRegionChange, selectedRegion = 'IN' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Countries with their regions/cities for more personalized trending
  const regions = {
    // India - Major regions with different cultural preferences
    'IN': {
      name: 'India',
      flag: '🇮🇳',
      subRegions: [
        { code: 'IN-DL', name: 'Delhi/NCR', description: 'Hindi, English content' },
        { code: 'IN-MH', name: 'Mumbai/Maharashtra', description: 'Hindi, Marathi content' },
        { code: 'IN-KA', name: 'Bangalore/Karnataka', description: 'Kannada, English content' },
        { code: 'IN-TN', name: 'Chennai/Tamil Nadu', description: 'Tamil content' },
        { code: 'IN-WB', name: 'Kolkata/West Bengal', description: 'Bengali content' },
        { code: 'IN-KL', name: 'Kerala', description: 'Malayalam content' },
        { code: 'IN-AP', name: 'Hyderabad/Andhra Pradesh', description: 'Telugu content' },
        { code: 'IN-PB', name: 'Punjab', description: 'Punjabi content' },
        { code: 'IN-GJ', name: 'Gujarat', description: 'Gujarati content' },
        { code: 'IN-RJ', name: 'Rajasthan', description: 'Hindi, Rajasthani content' }
      ]
    },
    
    // United States - Major regions
    'US': {
      name: 'United States',
      flag: '🇺🇸',
      subRegions: [
        { code: 'US-CA', name: 'California', description: 'West Coast trending' },
        { code: 'US-NY', name: 'New York', description: 'East Coast trending' },
        { code: 'US-TX', name: 'Texas', description: 'Southern trending' },
        { code: 'US-FL', name: 'Florida', description: 'Southeast trending' },
        { code: 'US-IL', name: 'Illinois', description: 'Midwest trending' }
      ]
    },

    // United Kingdom
    'GB': {
      name: 'United Kingdom',
      flag: '🇬🇧',
      subRegions: [
        { code: 'GB-ENG', name: 'England', description: 'English trending' },
        { code: 'GB-SCT', name: 'Scotland', description: 'Scottish trending' },
        { code: 'GB-WLS', name: 'Wales', description: 'Welsh trending' },
        { code: 'GB-NIR', name: 'Northern Ireland', description: 'Northern Irish trending' }
      ]
    },

    // Canada
    'CA': {
      name: 'Canada',
      flag: '🇨🇦',
      subRegions: [
        { code: 'CA-ON', name: 'Ontario', description: 'Central Canada trending' },
        { code: 'CA-QC', name: 'Quebec', description: 'French Canadian trending' },
        { code: 'CA-BC', name: 'British Columbia', description: 'West Coast trending' },
        { code: 'CA-AB', name: 'Alberta', description: 'Prairie trending' }
      ]
    },

    // Australia
    'AU': {
      name: 'Australia',
      flag: '🇦🇺',
      subRegions: [
        { code: 'AU-NSW', name: 'New South Wales', description: 'Sydney region' },
        { code: 'AU-VIC', name: 'Victoria', description: 'Melbourne region' },
        { code: 'AU-QLD', name: 'Queensland', description: 'Brisbane region' },
        { code: 'AU-WA', name: 'Western Australia', description: 'Perth region' }
      ]
    },

    // Germany
    'DE': {
      name: 'Germany',
      flag: '🇩🇪',
      subRegions: [
        { code: 'DE-BY', name: 'Bavaria', description: 'Southern Germany' },
        { code: 'DE-NW', name: 'North Rhine-Westphalia', description: 'Western Germany' },
        { code: 'DE-BE', name: 'Berlin', description: 'Capital region' },
        { code: 'DE-HH', name: 'Hamburg', description: 'Northern Germany' }
      ]
    },

    // France
    'FR': {
      name: 'France',
      flag: '🇫🇷',
      subRegions: [
        { code: 'FR-IDF', name: 'Île-de-France', description: 'Paris region' },
        { code: 'FR-ARA', name: 'Auvergne-Rhône-Alpes', description: 'Lyon region' },
        { code: 'FR-PAC', name: 'Provence-Alpes-Côte d\'Azur', description: 'Marseille region' },
        { code: 'FR-OCC', name: 'Occitanie', description: 'Toulouse region' }
      ]
    },

    // Japan
    'JP': {
      name: 'Japan',
      flag: '🇯🇵',
      subRegions: [
        { code: 'JP-13', name: 'Tokyo', description: 'Kanto region' },
        { code: 'JP-27', name: 'Osaka', description: 'Kansai region' },
        { code: 'JP-01', name: 'Hokkaido', description: 'Northern Japan' },
        { code: 'JP-40', name: 'Fukuoka', description: 'Kyushu region' }
      ]
    },

    // Brazil
    'BR': {
      name: 'Brazil',
      flag: '🇧🇷',
      subRegions: [
        { code: 'BR-SP', name: 'São Paulo', description: 'Southeast trending' },
        { code: 'BR-RJ', name: 'Rio de Janeiro', description: 'Southeast coastal' },
        { code: 'BR-MG', name: 'Minas Gerais', description: 'Interior southeast' },
        { code: 'BR-RS', name: 'Rio Grande do Sul', description: 'Southern Brazil' }
      ]
    },

    // South Korea
    'KR': {
      name: 'South Korea',
      flag: '🇰🇷',
      subRegions: [
        { code: 'KR-11', name: 'Seoul', description: 'Capital region' },
        { code: 'KR-26', name: 'Busan', description: 'Southern coast' },
        { code: 'KR-27', name: 'Daegu', description: 'Central region' },
        { code: 'KR-28', name: 'Incheon', description: 'Western region' }
      ]
    }
  };

  const handleRegionSelect = (regionCode, subRegionCode = null) => {
    const selectedData = {
      country: regionCode,
      region: subRegionCode || regionCode,
      countryName: regions[regionCode]?.name || 'Unknown',
      regionName: subRegionCode ? 
        regions[regionCode]?.subRegions?.find(r => r.code === subRegionCode)?.name || 'Unknown' :
        regions[regionCode]?.name || 'Unknown'
    };
    
    onRegionChange(selectedData);
    setIsOpen(false);
  };

  const getCurrentSelection = () => {
    // Find current selection
    for (const [countryCode, countryData] of Object.entries(regions)) {
      if (selectedRegion === countryCode) {
        return `${countryData.flag} ${countryData.name}`;
      }
      
      const subRegion = countryData.subRegions?.find(r => r.code === selectedRegion);
      if (subRegion) {
        return `${countryData.flag} ${subRegion.name}`;
      }
    }
    return '🌍 Select Region';
  };

  return (
    <div className="region-selector">
      <button 
        className="region-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="region-text">{getCurrentSelection()}</span>
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
              <h3>Select Country & Region</h3>
              <p>Get trending videos for your specific location</p>
            </div>

            {Object.entries(regions).map(([countryCode, countryData]) => (
              <div key={countryCode} className="country-section">
                <button
                  className="country-button"
                  onClick={() => handleRegionSelect(countryCode)}
                >
                  <span className="country-flag">{countryData.flag}</span>
                  <span className="country-name">{countryData.name}</span>
                  <span className="country-subtitle">National trending</span>
                </button>

                {countryData.subRegions && (
                  <div className="sub-regions">
                    {countryData.subRegions.map((subRegion) => (
                      <button
                        key={subRegion.code}
                        className="sub-region-button"
                        onClick={() => handleRegionSelect(countryCode, subRegion.code)}
                      >
                        <span className="sub-region-name">{subRegion.name}</span>
                        <span className="sub-region-description">{subRegion.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
