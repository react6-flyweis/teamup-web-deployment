import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch all games from the API using TanStack Query and axios.
 */
export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await api.get('/api/games');
      return response.data;
    },
  });
};

/**
 * Fetch a single game by slug from the API using TanStack Query.
 */
export const useGame = (slug) => {
  return useQuery({
    queryKey: ['game', slug],
    queryFn: async () => {
      const response = await api.get(`/api/games/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};

/**
 * Fetch attribute icons for games from the API using TanStack Query.
 */
export const useGameAttributeIcons = () => {
  return useQuery({
    queryKey: ['gameAttributeIcons'],
    queryFn: async () => {
      const response = await api.get('/api/games/attribute-icons');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};


