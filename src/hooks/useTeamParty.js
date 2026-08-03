import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch a single team party by id or slug from the API using TanStack Query.
 * If no parameter is provided, defaults to 'team-party' or fetches team party data.
 */
export const useTeamParty = (teamupIdOrSlug = 'team-party') => {
  return useQuery({
    queryKey: ['teamParty', teamupIdOrSlug],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/team-parties/${teamupIdOrSlug}`);
        return response.data?.teamParty || response.data;
      } catch (err) {
        // If single item route fails, try root list endpoint
        const response = await api.get('/api/team-parties');
        const list = response.data?.teamParties || response.data;
        if (Array.isArray(list) && list.length > 0) {
          return list.find(item => item.slug === teamupIdOrSlug || item._id === teamupIdOrSlug) || list[0];
        }
        throw err;
      }
    },
    enabled: !!teamupIdOrSlug,
  });
};
