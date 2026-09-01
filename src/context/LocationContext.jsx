import { createContext, useState, useContext, useEffect } from 'react';
import { useLocations } from '../hooks/useLocations';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { data, isLoading } = useLocations();
  const apiLocations = data?.locations || [];

  const [selectedLocation, setSelectedLocation] = useState(() => {
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
            setSelectedLocation(found);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
      setSelectedLocation(apiLocations[0]);
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

