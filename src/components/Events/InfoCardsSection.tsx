import React, { useState, useRef, useEffect } from 'react';
import type { InfoCardsSectionData, InfoCardItem } from '@/types/events';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const isVideoUrl = (url?: string) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};

const InfoCardMedia: React.FC<{ card: InfoCardItem }> = ({ card }) => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasExplicitVideo = Boolean(card.videoUrl?.trim());
  const hasLegacyVideo = !hasExplicitVideo && (card.mediaType === 'video' || isVideoUrl(card.mediaUrl));
  const rawVideoSrc = hasExplicitVideo ? card.videoUrl : (hasLegacyVideo ? card.mediaUrl : null);
  const rawPosterSrc = hasExplicitVideo && card.mediaUrl ? card.mediaUrl : (!hasLegacyVideo ? card.mediaUrl : null);

  const videoUrl = rawVideoSrc ? resolveImageUrl(rawVideoSrc) : null;
  const imageUrl = rawPosterSrc ? resolveImageUrl(rawPosterSrc) : null;

  const showVideo = Boolean(videoUrl) && !videoError;

  useEffect(() => {
    setIsVideoPlaying(false);
    setVideoError(false);

    if (videoRef.current && videoUrl) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [videoUrl]);

  return (
    <div className="h-52 w-full bg-black overflow-hidden relative">
      {/* Primary Image / Fallback Poster */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Video with poster and smooth play transition */}
      {showVideo && (
        <video
          ref={videoRef}
          key={videoUrl!}
          src={videoUrl!}
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
          className={`w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-500 bg-transparent ${
            isVideoPlaying || !imageUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoUrl!} type="video/mp4" />
        </video>
      )}

      {/* Fallback when neither image nor video is available */}
      {!imageUrl && !showVideo && (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500 text-sm">
          No Media Available
        </div>
      )}
    </div>
  );
};

export const InfoCardsSection: React.FC<{ data: InfoCardsSectionData }> = ({ data }) => {
  if (!data?.cards || data.cards.length === 0) return null;

  const validCards = data.cards
    .filter((card) => card.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (validCards.length === 0) return null;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#2A2A2A]">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-posterama">
          {data.sectionTitle}
        </h2>
        {data.sectionSubtitle && (
          <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto">
            {data.sectionSubtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validCards.map((card) => {
          return (
            <div
              key={card.id}
              className="group bg-[#1C1C1C] border border-[#33302B] hover:border-[#E1017D]/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#E1017D]/5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Media with Video + Poster Fallback */}
                <InfoCardMedia card={card} />

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Action Button if specified */}
              {card.buttonText && card.buttonLink && (
                <div className="p-6 pt-0 mt-auto">
                  <a
                    href={card.buttonLink}
                    className="inline-block bg-[#E1017D] hover:bg-[#c2016c] text-white py-2.5 px-5 rounded-xl font-bold text-sm tracking-wide transition-colors cursor-pointer"
                  >
                    {card.buttonText}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfoCardsSection;
