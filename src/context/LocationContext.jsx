import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocations } from '../hooks/useLocations';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useLocations();
  const apiLocations = data?.locations || [];

  const [selectedLocation, setSelectedLocationState] = useState(() => {
    const saved = localStorage.getItem('selectedLocation');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return null;
  });

  const setSelectedLocation = useCallback(
    (locationOrFn) => {
      setSelectedLocationState((prev) => {
        const next = typeof locationOrFn === 'function' ? locationOrFn(prev) : locationOrFn;
        if (next) {
          localStorage.setItem('selectedLocation', JSON.stringify(next));
        } else {
          localStorage.removeItem('selectedLocation');
        }
        // Invalidate all queries across the app so all data re-fetches for the new location
        queryClient.invalidateQueries();
        return next;
      });
    },
    [queryClient]
  );

  useEffect(() => {
    if (apiLocations.length > 0) {
      const saved = localStorage.getItem('selectedLocation');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const found = apiLocations.find(
            (loc) => loc.city === parsed.city && loc.state === parsed.state
          );
          if (found) {
            setSelectedLocationState(found);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
      setSelectedLocationState(apiLocations[0]);
    }
  }, [apiLocations]);

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
    }
  }, [selectedLocation]);

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        locations: apiLocations,
        isLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

