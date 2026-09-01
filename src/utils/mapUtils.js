/**
 * Resolves a map embed URL from the backend location data.
 * If the backend URL contains a placeholder key like 'YOUR_API_KEY',
 * it will use VITE_GOOGLE_MAPS_API_KEY if configured, or automatically convert
 * the coordinates/query to a keyless Google Maps embed URL so it loads without error.
 */
export const getMapEmbedUrl = (url, address = '') => {
  if (!url) {
    if (address) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    }
    return '';
  }

  const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (url.includes('YOUR_API_KEY') || url.includes('key=undefined') || url.includes('key=null')) {
    if (envKey) {
      return url.replace(/key=(YOUR_API_KEY|undefined|null)/g, `key=${envKey}`);
    }
    try {
      const parsed = new URL(url);
      const center = parsed.searchParams.get('center');
      const q = parsed.searchParams.get('q');
      const zoom = parsed.searchParams.get('zoom') || parsed.searchParams.get('z') || '14';
      const target = center || q || address;
      if (target) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(target)}&z=${zoom}&output=embed`;
      }
    } catch {
      if (address) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
      }
    }
  }

  return url;
};
