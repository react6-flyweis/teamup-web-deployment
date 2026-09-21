import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import EventsPageTemplate from './EventsPageTemplate';
import { useSiteContent } from '../../hooks/useSiteContent';

const CorporateEvents = () => {
  const { data: siteContentData, isLoading } = useSiteContent('home');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E1017D]"></div>
      </div>
    );
  }

  const contentData = siteContentData?.content?.data || siteContentData?.data || siteContentData;
  const corporateEvents = contentData?.corporateEvents;
  const topBanner = contentData?.topBanner;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar topBanner={topBanner} />
      {corporateEvents ? (
        <EventsPageTemplate pageData={corporateEvents} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
          <h2 className="text-2xl font-bold font-posterama text-white mb-2">
            Corporate Events Coming Soon
          </h2>
          <p className="text-gray-400 max-w-md">
            We are designing high-impact team packages for this location. Check back soon!
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CorporateEvents;
