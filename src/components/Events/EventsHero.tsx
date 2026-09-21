import React from 'react';
import type { EventsHeroData } from '@/types/events';
import { resolveImageUrl } from '../../hooks/useSiteContent';

interface EventsHeroProps {
  hero: EventsHeroData;
}

export const EventsHero: React.FC<EventsHeroProps> = ({ hero }) => {
  const mediaUrl = resolveImageUrl(hero.bgMediaUrl);
  const isVideo =
    hero.bgMediaType === 'video' ||
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(hero.bgMediaUrl || '');

  return (
    <section className="relative w-full h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Media */}
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={mediaUrl}
          alt={hero.title || 'Hero Banner'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Atmospheric Contrast Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/50 to-black/30 pointer-events-none" />

      {/* Hero Typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
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
