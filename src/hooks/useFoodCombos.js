import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch all food combos from the API using TanStack Query and axios.
 */
export const useFoodCombos = () => {
  return useQuery({
    queryKey: ['foodCombos'],
    queryFn: async () => {
      const response = await api.get('/api/food-combos');
      return response.data;
    },
  });
};
