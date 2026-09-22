import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { resolveImageUrl } from '../../hooks/useSiteContent';
import { handleNavigation } from '../../utils/navigation';

const isVideoUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url.trim());
};

const Hero = ({ heroData, topBanner, vid, handleClick }) => {
  // const { selectedLocation } = useLocationContext();
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const title = heroData?.title;
  // const locationText = selectedLocation?.city && selectedLocation?.state 
  //   ? `${selectedLocation.city}, ${selectedLocation.state}` 
  //   : '';
  const subtitle = heroData?.subtitle;

  const primaryText = heroData?.primaryButton?.text;
  const primaryLink = heroData?.primaryButton?.link;
  const secondaryText = heroData?.secondaryButton?.text;
  const secondaryLink = heroData?.secondaryButton?.link;

  const handlePrimaryClick = () => {
    if (primaryLink) {
      handleNavigation(primaryLink, navigate);
    } else if (handleClick) {
      handleClick();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryLink) {
      handleNavigation(secondaryLink, navigate);
    }
  };

  const rawVideoUrl = heroData?.videoUrl?.trim ? heroData.videoUrl.trim() : (heroData?.videoUrl || '');
  const rawBgMediaUrl = heroData?.backgroundMediaUrl?.trim
    ? heroData.backgroundMediaUrl.trim()
    : (heroData?.backgroundMediaUrl || heroData?.mediaUrl || heroData?.imageUrl || '');

  // Media resolution:
  // If videoUrl is provided, use it for the video, and backgroundMediaUrl as the fallback / poster.
  // If videoUrl is not provided, use backgroundMediaUrl only (as image or video depending on media type).
  let videoUrl = null;
  let posterUrl = null;
  let imageUrl = null;

  if (rawVideoUrl) {
    videoUrl = resolveImageUrl(rawVideoUrl);
    posterUrl = rawBgMediaUrl ? resolveImageUrl(rawBgMediaUrl) : null;
    imageUrl = posterUrl;
  } else if (rawBgMediaUrl) {
    if (isVideoUrl(rawBgMediaUrl) || heroData?.bgMediaType === 'video' || heroData?.mediaType === 'video') {
      videoUrl = resolveImageUrl(rawBgMediaUrl);
    } else {
      imageUrl = resolveImageUrl(rawBgMediaUrl);
    }
  } else if (vid) {
    videoUrl = resolveImageUrl(vid);
  }

  useEffect(() => {
    setIsVideoPlaying(false);
    setVideoError(false);

    if (videoRef.current && videoUrl) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy may restrict unmuted playback before user gesture
          console.warn('Hero video autoplay prevented:', err);
        });
      }
    }
  }, [videoUrl]);

  return (
    <div className="relative w-full overflow-hidden min-h-fit md:h-screen bg-[#121212]">
      <Navbar topBanner={topBanner} />

      {/* Fallback & Background Image:
          - Shows immediately while video is buffering/loading
          - Shows as the sole background if no video is provided or if video encounters an error
      */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || "Hero Background"}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Background Video:
          - Keeps opacity-0 until onPlaying fires (guaranteeing rendered frames and avoiding gray box)
          - Smoothly fades in once playback is actively running
      */}
      {videoUrl && !videoError && (
        <video
          ref={videoRef}
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoPlaying(true)}
          onError={() => {
            setVideoError(true);
            setIsVideoPlaying(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 bg-transparent ${
            isVideoPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

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
