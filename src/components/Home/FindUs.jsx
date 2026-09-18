import { useLocationContext } from '../../context/LocationContext';
import { getMapEmbedUrl } from '../../utils/mapUtils';

const formatTime12Hour = (timeStr) => {
  if (timeStr == null || timeStr === '') return '';

  const str = String(timeStr).trim();
  if (/[a-zA-Z]/.test(str)) {
    return str;
  }

  const match = str.match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?$/);
  if (!match) return str;

  let hour = parseInt(match[1], 10);
  if (isNaN(hour) || hour < 0 || hour > 23) return str;

  const minute = match[2] || '00';
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${period}`;
};

const FindUs = () => {
  const { selectedLocation } = useLocationContext();

  const currentAddress = selectedLocation
    ? [selectedLocation.address, selectedLocation.city, selectedLocation.state]
        .filter(Boolean)
        .join(', ')
    : '';

  const mapImage =
    typeof selectedLocation?.mapImage === 'string'
      ? selectedLocation.mapImage
      : selectedLocation?.mapImage?.url || selectedLocation?.mapImage?.src || null;

  const mapLink =
    selectedLocation?.mapLink ||
    selectedLocation?.mapUrl ||
    selectedLocation?.mapEmbedUrl ||
    (currentAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentAddress)}`
      : '');

  const mapSrc = getMapEmbedUrl(selectedLocation?.mapEmbedUrl, currentAddress);

  return (
    <div id="find-us" className="flex justify-center mt-20 px-4">
      <div className="max-w-6xl w-full px-6">
        <h1
          className="font-posterama text-[34px] md:text-[44px] font-bold text-center md:mb-6"
        >
          WHERE TO FIND US
        </h1>
        <div className="flex flex-col md:flex-row gap-8 mt-4 md:mt-12 items-stretch">
          {/* Map Container */}
          <div className="w-full md:w-[60%] rounded-lg relative flex flex-col">
            {currentAddress && (
              <div
                className="font-noir text-sm mb-2 px-2 md:px-0"
              >
                {currentAddress}
              </div>
            )}
            <div className="w-full flex-grow rounded-lg overflow-hidden border border-gray-200 shadow-sm min-h-[300px]">
              {mapImage ? (
                <a
                  href={mapLink || '#'}
                  target={mapLink ? '_blank' : undefined}
                  rel={mapLink ? 'noopener noreferrer' : undefined}
                  className="w-full h-full block group cursor-pointer"
                >
                  <img
                    src={mapImage}
                    alt={selectedLocation?.name || currentAddress || 'Location Map'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </a>
              ) : (
                mapSrc && (
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={mapSrc}
                    allowFullScreen
                  ></iframe>
                )
              )}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="w-full md:w-[40%] flex flex-col justify-center">
            <div className="space-y-4 px-2 md:px-0">
              {selectedLocation?.openingHours && selectedLocation.openingHours.length > 0 && (
                selectedLocation.openingHours.map((oh, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-noir font-semibold uppercase">
                      {oh.day}
                    </span>
                    <span>
                      {oh.isClosed ? 'Closed' : `${formatTime12Hour(oh.open)} - ${formatTime12Hour(oh.close)}`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
