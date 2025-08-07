// API configuration for YouTube Trending Analytics
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  API_KEY: import.meta.env.VITE_API_KEY || 'yta_demo_key_123456789abcdef', // Demo key for development
};

// API client class with authentication
class YouTubeAnalyticsAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
    
    console.log('🔧 API Configuration:', {
      baseURL: this.baseURL,
      hasApiKey: !!this.apiKey,
      apiKeyLength: this.apiKey?.length,
      envVarApiKey: import.meta.env.VITE_API_KEY,
      envVarBaseUrl: import.meta.env.VITE_API_BASE_URL
    });
  }

  // Private method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🚀 Making API request:', {
      url,
      apiKey: this.apiKey,
      endpoint
    });
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers
      }
    });
    
    console.log('📡 API response status:', response.status);

    console.log('📡 API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
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
    console.log('✅ API response data:', {
      success: result.success,
      videoCount: result.data?.videos?.length,
      requestId: result.meta?.requestId
    });
    
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
