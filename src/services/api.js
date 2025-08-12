// API configuration for YouTube Trending Analytics
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_KEY: import.meta.env.VITE_API_KEY, // Demo key for development
};

// API client class with authentication
class YouTubeAnalyticsAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
  }

  // Private method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('API key is required. Please check your configuration.');
      } else if (response.status === 403) {
        throw new Error('Invalid API key. Please check your credentials.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    }

    const result = await response.json();
    
    return result;
  }

  // Get trending videos
  async getTrending(region = 'IN', category = null, maxResults = 20) {
    const params = new URLSearchParams({
      region,
      maxResults: maxResults.toString()
    });
    
    if (category) {
      params.set('category', category);
    }
    
    return this.makeRequest(`/trending?${params.toString()}`);
  }

  // Get video categories
  async getCategories() {
    return this.makeRequest('/categories');
  }

  // Get supported countries
  async getCountries() {
    return this.makeRequest('/countries');
  }

  // Get cache status (for debugging)
  async getCacheStatus() {
    return this.makeRequest('/cache-status');
  }

  // Get API health
  async getHealth() {
    // Health endpoint is public, so no API key needed
    const response = await fetch(`${this.baseURL}/health`);
    return response.json();
  }
}

// Create and export a singleton instance
const api = new YouTubeAnalyticsAPI();

export default api;
