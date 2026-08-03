import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch a single group activity by id or slug from the API using TanStack Query.
 */
export const useGroupActivity = (activityIdOrSlug) => {
  return useQuery({
    queryKey: ['groupActivity', activityIdOrSlug],
    queryFn: async () => {
      const response = await api.get(`/api/group-activities/${activityIdOrSlug}`);
      return response.data?.groupActivity;
    },
    enabled: !!activityIdOrSlug,
  });
};
