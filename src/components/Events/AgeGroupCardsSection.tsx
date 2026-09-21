import React, { useState } from 'react';
import type { AgeGroupsSectionData, AgeGroupCardItem } from '@/types/events';
import BookNowMenuModal from './BookNowMenuModal';

export const AgeGroupCardsSection: React.FC<{ data: AgeGroupsSectionData }> = ({ data }) => {
  const [activeBookingCard, setActiveBookingCard] = useState<AgeGroupCardItem | null>(null);

  if (!data?.cards || data.cards.length === 0) return null;

  const validCards = data.cards
    .filter((card) => card.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (validCards.length === 0) return null;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Titles */}
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validCards.map((card) => {
          const isContact = card.actionType === 'contact_us';

          return (
            <div
              key={card.id}
              className="bg-[#1C1C1C] border border-[#33302B] hover:border-[#E1017D]/50 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-lg hover:shadow-[#E1017D]/5"
            >
              <div>
                {/* Badge */}
                {card.badge && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E1017D]/15 text-[#E1017D] border border-[#E1017D]/30 mb-4">
                    {card.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-[#2A2A2A]">
                {isContact ? (
                  <a
                    href={card.contactLink || '/contact'}
                    className="block w-full text-center bg-[#252525] hover:bg-[#303030] text-white border border-[#3A3530] hover:border-gray-500 py-3 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer"
                  >
                    {card.contactButtonText || 'Contact Us'}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveBookingCard(card)}
                    className="w-full bg-[#E1017D] hover:bg-[#c2016c] text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-md shadow-[#E1017D]/20"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal popup when Book Now is clicked */}
      {activeBookingCard && (
        <BookNowMenuModal
          isOpen={!!activeBookingCard}
          onClose={() => setActiveBookingCard(null)}
          cardTitle={activeBookingCard.title}
          aLaCarteLink={activeBookingCard.aLaCarteMenuLink}
          preselectLink={activeBookingCard.preselectMenuLink}
        />
      )}
    </section>
  );
};

export default AgeGroupCardsSection;
