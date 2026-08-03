import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch a single boom bundle page or item by id or slug from the API using TanStack Query.
 * If no parameter is provided, defaults to 'boom-bundles' or fetches boom bundle data.
 */
export const useBoomBundle = (boomIdOrSlug = 'boom-bundles') => {
  return useQuery({
    queryKey: ['boomBundle', boomIdOrSlug],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/boom-bundles/${boomIdOrSlug}`);
        return response.data?.boomBundle || response.data;
      } catch (err) {
        // Fallback to list endpoint if direct endpoint fails
        const response = await api.get('/api/boom-bundles');
        const list = response.data?.boomBundles || response.data?.boomBundle || response.data;
        if (Array.isArray(list) && list.length > 0) {
          return list.find(item => item.slug === boomIdOrSlug || item._id === boomIdOrSlug) || list[0];
        }
        if (list && typeof list === 'object') {
          return list;
        }
        throw err;
      }
    },
    enabled: !!boomIdOrSlug,
  });
};
