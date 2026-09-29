import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch a content page by its slug using TanStack Query and axios.
 * 
 * @param {string} slug - The page slug (e.g. 'about-us', 'privacy-policy', 'terms-and-conditions', 'waiver')
 */
export const useContentPage = (slug) => {
  return useQuery({
    queryKey: ['contentPage', slug],
    queryFn: async () => {
      const response = await api.get(`/api/content-pages/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};

/**
 * Fetch all active content pages.
 */
export const useContentPages = () => {
  return useQuery({
    queryKey: ['contentPages'],
    queryFn: async () => {
      const response = await api.get('/api/content-pages');
      return response.data;
    },
  });
};
