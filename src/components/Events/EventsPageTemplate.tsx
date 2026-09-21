import React from 'react';
import type { EventPageData } from '@/types/events';
import EventsHero from './EventsHero';
import AgeGroupCardsSection from './AgeGroupCardsSection';
import InfoCardsSection from './InfoCardsSection';

export const EventsPageTemplate: React.FC<{ pageData: EventPageData }> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {pageData.hero && <EventsHero hero={pageData.hero} />}
      {pageData.ageGroups && <AgeGroupCardsSection data={pageData.ageGroups} />}
      {pageData.infoCards && <InfoCardsSection data={pageData.infoCards} />}
    </main>
  );
};

export default EventsPageTemplate;
