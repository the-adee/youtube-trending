import React from 'react';

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
    <div className="py-2">
      {/* Horizontal Scrollable Tabs for All Screen Sizes */}
      <div className="overflow-x-auto px-3 sm:px-4 lg:px-8 py-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 
                ${activeCategory === category.value 
                  ? 'bg-youtube-red text-white shadow-youtube' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;