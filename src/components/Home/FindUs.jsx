import React from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { getMapEmbedUrl } from '../../utils/mapUtils';

const FindUs = () => {
  const { selectedLocation } = useLocationContext();

  const currentAddress = selectedLocation
    ? [selectedLocation.address, selectedLocation.city, selectedLocation.state]
        .filter(Boolean)
        .join(', ')
    : '';

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
              {mapSrc && (
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={mapSrc}
                  allowFullScreen
                ></iframe>
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
                      {oh.isClosed ? 'Closed' : `${oh.open} - ${oh.close}`}
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
