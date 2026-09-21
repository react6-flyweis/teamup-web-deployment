import React from 'react';
import type { InfoCardsSectionData } from '@/types/events';
import { resolveImageUrl } from '../../hooks/useSiteContent';

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
          const mediaUrl = resolveImageUrl(card.mediaUrl);
          const isVideo =
            card.mediaType === 'video' ||
            /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(card.mediaUrl || '');

          return (
            <div
              key={card.id}
              className="bg-[#1C1C1C] border border-[#33302B] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Media */}
                <div className="h-52 w-full bg-black overflow-hidden relative">
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfoCardsSection;
