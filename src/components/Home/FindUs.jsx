import React from 'react';
import { useLocationContext } from '../../context/LocationContext';

const FindUs = () => {

  const { selectedLocation } = useLocationContext();

  const addresses = {
    'Citrus Heights': '7683 Sunrise Blvd, Citrus Heights, CA 95610, USA',
    'Folsom': '13405 Folsom Blvd, Folsom, CA 95630, USA',
    'Eastvale': 'Eastvale, CA, USA'
  };

  const currentAddress = selectedLocation?.address
    ? `${selectedLocation.address}, ${selectedLocation.city}, ${selectedLocation.state}`
    : (selectedLocation?.city ? (addresses[selectedLocation.city] || '7683 Sunrise Blvd, Citrus Heights, CA 95610, USA') : '7683 Sunrise Blvd, Citrus Heights, CA 95610, USA');

  const latitude = selectedLocation?.latitude;
  const longitude = selectedLocation?.longitude;
  const mapSrc = (typeof latitude === 'number' && typeof longitude === 'number')
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : (selectedLocation?.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(currentAddress)}&output=embed`);

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
            <div
              className="font-noir text-sm mb-2 px-2 md:px-0"
            >
              {currentAddress}
            </div>
            <div className="w-full flex-grow rounded-lg overflow-hidden border border-gray-200 shadow-sm min-h-[300px]">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={mapSrc}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="w-full md:w-[40%] flex flex-col justify-center">
            <div className="space-y-4 px-2 md:px-0">
              {selectedLocation?.openingHours && selectedLocation.openingHours.length > 0 ? (
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
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      MONDAY
                    </span>
                    <span>11:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      TUESDAY
                    </span>
                    <span>11:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      WEDNESDAY
                    </span>
                    <span>11:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      THURSDAY
                    </span>
                    <span>11:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      FRIDAY
                    </span>
                    <span>10:00 AM - 2:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      SATURDAY
                    </span>
                    <span>10:00 AM - 2:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-noir font-semibold">
                      SUNDAY
                    </span>
                    <span>10:00 AM - 12:00 AM</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
