import React from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const Hero = ({ handleClick, heroData, topBanner }) => {
  const { selectedLocation } = useLocationContext();
  const navigate = useNavigate();

  const title = heroData?.title;
  const locationText = selectedLocation?.city && selectedLocation?.state 
    ? `${selectedLocation.city}, ${selectedLocation.state}` 
    : '';
  const subtitle = heroData?.subtitle;

  const primaryText = heroData?.primaryButton?.text;
  const primaryLink = heroData?.primaryButton?.link;
  const secondaryText = heroData?.secondaryButton?.text;
  const secondaryLink = heroData?.secondaryButton?.link;

  const handlePrimaryClick = () => {
    if (primaryLink) {
      navigate(primaryLink);
    } else {
      handleClick();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryLink) {
      navigate(secondaryLink);
    } else {
      handleClick();
    }
  };

  const mediaUrl = heroData?.backgroundMediaUrl ? resolveImageUrl(heroData.backgroundMediaUrl) : null;
  const isVideo = mediaUrl && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm'));

  return (
    <div className="relative w-full overflow-hidden min-h-fit md:h-screen">
      <Navbar topBanner={topBanner} />

      {/* Background Media */}
      {mediaUrl && (
        isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-10 left-0 w-full h-full object-cover z-0"
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt="Hero Background"
            className="absolute top-10 left-0 w-full h-full object-cover z-0"
          />
        )
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-2 md:px-8 text-center text-white py-12 md:py-0 h-full md:mt-8">
        {title && (
          <h1
            className="font-posterama text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-semibold mb-4 leading-tight uppercase"
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            className="font-noir-pro text-sm sm:text-base md:text-[36px] leading-normal mt-2 md:mt-8"
          >
            {subtitle}
          </p>
        )}

        <div
          className="font-posterama mt-4 sm:mt-12 grid grid-cols-2 sm:flex gap-4 justify-center md:items-center"
        >
          {primaryText && (
            <button onClick={handlePrimaryClick} className="text-sm sm:text-lg md:text-[26px] bg-[#00AACB] hover:bg-[#E1017D] text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg uppercase">
              {primaryText}
            </button>
          )}
          {secondaryText && (
            <button onClick={handleSecondaryClick} className="text-sm sm:text-lg md:text-[26px] bg-[#00AACB] hover:bg-[#E1017D] text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg uppercase">
              {secondaryText}
            </button>
          )}
        </div>

        <div className="mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
