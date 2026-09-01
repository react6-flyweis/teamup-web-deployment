import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE || '').replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available in local storage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach global location parameters from localStorage if not an excluded route
    const isExcluded =
      config.url?.includes('/api/locations') ||
      config.url?.includes('/api/auth') ||
      config.url?.includes('/api/uploads');

    if (!isExcluded) {
      try {
        const savedLoc = localStorage.getItem('selectedLocation');
        if (savedLoc) {
          const location = JSON.parse(savedLoc);
          const slug = location.slug || (location.city ? location.city.toLowerCase().replace(/\s+/g, '-') : null);
          const id = location._id || location.id || slug;

          config.params = {
            ...(slug && { locationSlug: slug }),
            ...(id && { locationId: id }),
            ...config.params,
          };
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global responses or errors (like token expiration) here
    return Promise.reject(error);
  }
);

export default api;
