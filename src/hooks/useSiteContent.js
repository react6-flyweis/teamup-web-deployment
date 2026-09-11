import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Helper to resolve image URL with backend base path if needed.
 */
export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const apiBase = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
  return `${apiBase}${url}`;
};

/**
 * Fetch site content by section (e.g. 'home') using TanStack Query and axios.
 * 
 * @param {string} section - The section name (e.g. 'home')
 */
export const useSiteContent = (section = 'home', options = {}) => {
  return useQuery({
    queryKey: ['siteContent', section, options?.params || {}],
    queryFn: async () => {
      const response = await api.get(`/api/site-content/${section}`, {
        params: options?.params,
      });
      return response.data;
    },
    enabled: options.enabled !== undefined ? options.enabled : !!section,
    ...options,
  });
};
