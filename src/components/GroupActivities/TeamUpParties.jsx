import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTeamParty } from '../../hooks/useTeamParty';
import { useBooking } from '../../hooks/useBooking';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { motion } from 'framer-motion';

const defaultHero = '/assets/team.svg';
const texture = '/assets/texture.svg';

const checkIcon = (
  <img 
    src="https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/2/2022/04/TICK2.svg" 
    alt="tick" 
    className="w-10 h-10 mt-[-5px]" 
  />
);

const TeamUpParties = () => {
  const { slug } = useParams();
  const handleBooking = useBooking();
  const { data: teamParty, isLoading, error } = useTeamParty(slug || 'team-party');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const data = teamParty || {};
  const pageHeadline = data.pageHeadline || data.name || 'TEAM UP PARTIES';
  const pageHeroImage = data.pageHeroImage || defaultHero;
  const sectionHeadline = data.sectionHeadline || 'WHY TEAM UP WITH US?';
  const sectionDescription = data.sectionDescription;
  const checklistItems = data.checklistItems || [];
  const eventsDateHeading = data.eventsDateHeading;
  const featuredEvents = data.featuredEvents || [];
  const chooseGamesHeading = data.chooseGamesHeading || 'CHOOSE YOUR GAMES';
  const chooseGameIds = data.chooseGameIds || [];
  const bundleCards = data.bundleCards || [];
  const statsBlocks = data.statsBlocks || [];

  return (
    <div className="min-h-screen font-noir-pro text-white bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative md:h-screen w-full overflow-hidden">
        <div
          style={{ backgroundImage: `url(${pageHeroImage})` }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center object-cover z-0"
        ></div>

        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center md:h-full py-24 text-center px-4 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'Posterama2001W04' }}
            className="text-4xl sm:text-6xl md:text-[84px] font-semibold mb-8 uppercase tracking-tighter drop-shadow-2xl"
          >
            {pageHeadline}
          </motion.h1>

          <div className="mb-8">
            <button 
              onClick={handleBooking}
              className="bg-[#00AACB] hover:bg-cyan-600 text-white font-bold py-3 px-8 text-lg rounded-full uppercase tracking-tighter w-56 transition-all shadow-[0_0_20px_rgba(0,170,203,0.5)]"
            >
              BOOK NOW
            </button>
          </div>

          <div className="mt-6 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 md:w-10 md:h-10 text-white"
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

      {/* Featured Events & Activities Section */}
      {(eventsDateHeading || featuredEvents.length > 0) && (
        <div 
          className="w-full bg-fixed bg-cover bg-center py-12"
          style={{ backgroundImage: `url(${texture})` }}
        >
          {eventsDateHeading && (
            <section className="text-center pt-8 px-4 mb-12">
              <h2 
                style={{ fontFamily: 'Posterama2001W04' }} 
                className="text-2xl md:text-[44px] font-bold text-[#292524] uppercase leading-tight tracking-wide"
              >
                {eventsDateHeading}
              </h2>
            </section>
          )}

          {featuredEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={event.id || index}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center text-white w-full pb-8 px-4 md:px-8 overflow-hidden max-w-7xl mx-auto`}
              >
                <motion.div
                  initial={{ x: isEven ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="w-full md:w-[500px] h-64 sm:h-80 md:h-[500px]"
                >
                  <img
                    src={event.image || defaultHero}
                    alt={event.title || 'Event'}
                    className="w-full h-full object-cover rounded-t-lg md:rounded-none"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: isEven ? 100 : -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="w-full md:w-[660px] md:h-[500px] p-6 md:p-12 bg-black text-white flex flex-col justify-between"
                >
                  <div>
                    {event.title && (
                      <h2
                        style={{ fontFamily: 'Posterama2001W04' }}
                        className="text-xl sm:text-2xl md:text-[40px] font-bold mb-2 uppercase"
                      >
                        {event.title}
                      </h2>
                    )}
                    {event.subtitle && (
                      <h3
                        style={{ fontFamily: 'Posterama2001W04' }}
                        className="text-[#E1017D] text-[20px] sm:text-[26px] md:text-[32px] font-semibold mb-4"
                      >
                        {event.subtitle}
                      </h3>
                    )}
                    {event.description && (
                      <p
                        style={{ fontFamily: 'Noir Pro' }}
                        className="text-sm sm:text-base md:text-[20px] text-gray-300 leading-snug mt-4"
                      >
                        {event.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    {event.button1Text && (
                      <button
                        onClick={handleBooking}
                        style={{ fontFamily: 'Posterama2001W04' }}
                        className="bg-[#E1017D] hover:bg-pink-700 text-base sm:text-lg md:text-[22px] text-white font-semibold py-2 px-6 rounded transition-all"
                      >
                        {event.button1Text}
                      </button>
                    )}
                    {event.button2Text && (
                      <a
                        href={event.button2Link || '#'}
                        onClick={(e) => {
                          if (!event.button2Link || event.button2Link === '#') {
                            e.preventDefault();
                            handleBooking();
                          }
                        }}
                        style={{ fontFamily: 'Posterama2001W04' }}
                        className="bg-[#00AACB] hover:bg-cyan-600 text-base sm:text-lg md:text-[22px] text-white font-semibold py-2 px-6 rounded inline-block text-center transition-all"
                      >
                        {event.button2Text}
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details & Checklist Section */}
      {(sectionHeadline || sectionDescription || checklistItems.length > 0 || bundleCards.length > 0 || statsBlocks.length > 0) && (
        <div 
          className="bg-fixed bg-cover bg-center py-20 text-black"
          style={{ backgroundImage: `url(https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/30/2022/03/BG-Steel2.jpg)` }}
        >
          <section className="max-w-5xl mx-auto px-4 text-center">
            {sectionHeadline && (
              <h2 className="font-posterama text-4xl md:text-6xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
                {sectionHeadline}
              </h2>
            )}

            {sectionDescription && (
              <p className="font-noir-pro text-lg md:text-xl text-black font-bold mb-16 max-w-4xl mx-auto leading-tight">
                {sectionDescription}
              </p>
            )}

            {/* Checklist Items */}
            {checklistItems.length > 0 && (
              <div className="max-w-3xl mx-auto space-y-12 text-left mb-20">
                {checklistItems.map((item, index) => (
                  <motion.div
                    key={item.id || item._id || index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6"
                  >
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="w-10 h-10 mt-[-5px] object-contain" />
                    ) : (
                      checkIcon
                    )}
                    <div>
                      <h3 className="font-posterama text-3xl text-black font-bold uppercase leading-none">
                        {item.title}
                      </h3>
                      {item.subtext && (
                        <p className="text-black italic font-bold text-sm mt-1">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bundle Cards */}
            {bundleCards.length > 0 && (
              <div className="mb-20">
                <h3 className="font-posterama text-3xl md:text-4xl font-black text-black mb-10 uppercase">
                  PACKAGES & BUNDLES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {bundleCards.map((bundle, index) => (
                    <motion.div
                      key={bundle._id || index}
                      whileHover={{ scale: 1.03 }}
                      className="bg-black text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between items-center text-center border border-gray-800 hover:border-[#E1017D] transition-all duration-300"
                    >
                      {bundle.image && (
                        <img src={bundle.image} alt={bundle.title} className="h-28 w-auto mb-4 object-contain" />
                      )}
                      <div>
                        <h4 className="font-posterama text-lg font-bold text-[#00AACB] mb-2 uppercase">
                          {bundle.title}
                        </h4>
                        {bundle.description && (
                          <p className="text-xs text-gray-400 font-noir-pro">{bundle.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* How to Book Section */}
            {(data.howToBookHeadline || data.howToBookBody || data.howToBookEmail || data.howToBookPhone) && (
              <div className="border-t-2 border-black/10 pt-16">
                {data.howToBookHeadline && (
                  <h2 className="font-posterama text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
                    {data.howToBookHeadline}
                  </h2>
                )}
                <p className="font-noir-pro text-lg text-black font-bold mb-8">
                  {data.howToBookBody && <span>{data.howToBookBody} </span>}
                  {data.howToBookLink && (
                    <span>
                      To book this package, <Link to={data.howToBookLink} className="underline cursor-pointer">click here</Link>
                    </span>
                  )}
                  {data.howToBookEmail && (
                    <span>
                      {data.howToBookLink ? ', email us on ' : 'Email us on '}
                      <a href={`mailto:${data.howToBookEmail}`} className="underline cursor-pointer font-black">
                        {data.howToBookEmail}
                      </a>
                    </span>
                  )}
                  {data.howToBookPhone && (
                    <span>
                      {' or give us a call on '}
                      <a href={`tel:${data.howToBookPhone.replace(/\s+/g, '')}`} className="underline cursor-pointer font-black">
                        {data.howToBookPhone}
                      </a>
                    </span>
                  )}
                  .
                </p>
                <p className="font-noir-pro text-base text-black font-bold italic">
                  Don't worry, it's quick and easy. We promise not to keep you on the phone for hours!
                </p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Games Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-posterama text-4xl md:text-6xl font-black text-black text-center mb-16 tracking-tighter uppercase leading-none">
            {chooseGamesHeading}
          </h2>
          <OtherGames showHeading={false} filterGameIds={chooseGameIds} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamUpParties;
