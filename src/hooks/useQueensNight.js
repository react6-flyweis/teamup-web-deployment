import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch a single queens night page or item by id or slug from the API using TanStack Query.
 * If no parameter is provided, defaults to 'queens-night' or fetches queens night data.
 */
export const useQueensNight = (nightIdOrSlug = 'queens-night') => {
  return useQuery({
    queryKey: ['queensNight', nightIdOrSlug],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/queens-nights/${nightIdOrSlug}`);
        return response.data?.queensNight || response.data;
      } catch (err) {
        // Fallback to list endpoint if direct endpoint fails
        const response = await api.get('/api/queens-nights');
        const list = response.data?.queensNights || response.data?.queensNight || response.data;
        if (Array.isArray(list) && list.length > 0) {
          return list.find(item => item.slug === nightIdOrSlug || item._id === nightIdOrSlug) || list[0];
        }
        if (list && typeof list === 'object') {
          return list;
        }
        throw err;
      }
    },
    enabled: !!nightIdOrSlug,
  });
};
