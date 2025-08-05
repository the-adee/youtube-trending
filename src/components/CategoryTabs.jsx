import React from 'react';
import './CategoryTabs.css';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All', value: '' },
    { id: 'music', label: 'Music', value: '10' },
    { id: 'gaming', label: 'Gaming', value: '20' },
    { id: 'entertainment', label: 'Entertainment', value: '24' },
    { id: 'news', label: 'News & Politics', value: '25' },
    { id: 'howto', label: 'Howto & Style', value: '26' },
    { id: 'education', label: 'Education', value: '27' },
    { id: 'sports', label: 'Sports', value: '17' },
    { id: 'people', label: 'People & Blogs', value: '22' },
    { id: 'comedy', label: 'Comedy', value: '23' },
    { id: 'pets', label: 'Pets & Animals', value: '15' },
    { id: 'autos', label: 'Autos & Vehicles', value: '2' }
  ];

  return (
    <div className="category-tabs">
      <div className="tabs-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`tab-button ${activeCategory === category.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
