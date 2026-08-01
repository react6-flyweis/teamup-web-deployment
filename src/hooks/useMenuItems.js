import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

/**
 * Fetch all menu items from the API using TanStack Query and axios.
 */
export const useMenuItems = (params = {}) => {
  return useQuery({
    queryKey: ['menuItems', params],
    queryFn: async () => {
      const response = await api.get('/api/menu-items', { params });
      return response.data;
    },
  });
};

export const useMenuItem = (slugOrId) => {
  return useQuery({
    queryKey: ['menuItem', slugOrId],
    queryFn: async () => {
      const response = await api.get(`/api/menu-items/${slugOrId}`);
      return response.data?.menuItem;
    },
    enabled: !!slugOrId,
  });
};

export const useMenuCategoryItems = (categorySlug) => {
  return useQuery({
    queryKey: ['menuCategoryItems', categorySlug],
    queryFn: async () => {
      const response = await api.get('/api/menu/items', {
        params: { categorySlug },
      });
      return response.data;
    },
    enabled: !!categorySlug,
  });
};

export const useMenuCategories = (params = {}) => {
  return useQuery({
    queryKey: ['menuCategories', params],
    queryFn: async () => {
      const response = await api.get('/api/menu-items/categories', { params });
      return response.data;
    },
  });
};

