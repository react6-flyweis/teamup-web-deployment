import React, { useState, useRef, useEffect } from 'react';
import type { EventsHeroData } from '@/types/events';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const isVideoUrl = (url?: string) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};

interface EventsHeroProps {
  hero: EventsHeroData;
}

export const EventsHero: React.FC<EventsHeroProps> = ({ hero }) => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If videoUrl is provided, use it for the video, and bgMediaUrl as the fallback / poster image.
  // Backward compatibility: If videoUrl is not provided, check if bgMediaUrl is a video or bgMediaType === 'video'.
  const rawVideoUrl = hero.videoUrl || (
    hero.bgMediaType === 'video' || isVideoUrl(hero.bgMediaUrl)
      ? hero.bgMediaUrl
      : ''
  );
  const rawImageUrl = isVideoUrl(hero.bgMediaUrl)
    ? ''
    : (hero.bgMediaUrl || '');

  const videoUrl = rawVideoUrl ? resolveImageUrl(rawVideoUrl) : '';
  const imageUrl = rawImageUrl ? resolveImageUrl(rawImageUrl) : '';

  useEffect(() => {
    setIsVideoPlaying(false);
    setVideoError(false);

    if (videoRef.current && videoUrl) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Events hero video autoplay prevented:', err);
        });
      }
    }
  }, [videoUrl]);

  return (
    <section className="relative w-full h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image (Initial / Fallback Poster) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={hero.title || 'Hero Banner'}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Background Video (Optional with poster fallback) */}
      {videoUrl && !videoError && (
        <video
          ref={videoRef}
          key={videoUrl}
          src={videoUrl}
          poster={imageUrl || undefined}
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
            isVideoPlaying || !imageUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Atmospheric Contrast Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/50 to-black/30 pointer-events-none z-10" />

      {/* Hero Typography */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-lg uppercase font-posterama">
          {hero.title}
        </h1>
        {hero.subtitle && (
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
            {hero.subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default EventsHero;
