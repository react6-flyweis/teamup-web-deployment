import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBoomBundle } from '../../hooks/useBoomBundle';
import { useBooking } from '../../hooks/useBooking';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { motion } from 'framer-motion';

const defaultHero = 'https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/30/2022/03/BG-Steel2.jpg';

const checkIcon = (
  <img 
    src="https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/2/2022/04/TICK2.svg" 
    alt="tick" 
    className="w-8 h-8 mr-3 mt-1" 
  />
);

const BoomBundle = () => {
  const { slug } = useParams();
  const handleBooking = useBooking();
  const { data: boomData, isLoading, error } = useBoomBundle(slug || 'boom-bundles');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const data = boomData || {};
  const pageHeadline = data.pageHeadline || data.name || 'BOOM BUNDLES';
  const pageHeroImage = data.pageHeroImage || defaultHero;
  const sectionHeadline = data.sectionHeadline;
  const sectionDescription = data.sectionDescription;
  const checklistItems = data.checklistItems || [];
  const eventsDateHeading = data.eventsDateHeading;
  const featuredEvents = data.featuredEvents || [];
  const chooseGamesHeading = data.chooseGamesHeading || 'CHOOSE YOUR GAMES';
  const chooseGameIds = data.chooseGameIds || [];
  const bundleCards = data.bundleCards || [];
  const statsBlocks = data.statsBlocks || [];

  return (
    <div className="min-h-screen font-noir-pro">
      <Navbar />

      <div 
        className="bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${pageHeroImage})` }}
      >
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            {/* Neon Banner */}
            <div className="inline-block bg-[#E1017D] text-white px-8 py-2 font-bold text-xl md:text-2xl mb-8 transform -rotate-1 shadow-[0_0_20px_rgba(225,1,125,0.6)]">
              MORE BOOM FOR YOUR BUCK! BUNDLES FROM $27.50PP
            </div>

            <h1 className="font-posterama text-6xl md:text-9xl font-black text-black mb-6 tracking-tighter drop-shadow-[0_2px_5px_rgba(255,255,255,0.5)] uppercase">
              {pageHeadline}
            </h1>

            {sectionDescription ? (
              <p className="font-noir-pro text-sm md:text-lg text-black max-w-4xl mx-auto mb-10 font-bold leading-tight">
                {sectionDescription}
              </p>
            ) : (
              <p className="font-noir-pro text-sm md:text-lg text-black max-w-4xl mx-auto mb-10 font-bold leading-tight">
                Get more BOOM for your buck with our all-inclusive activity package. Available all week in Eastvale, each BOOM BUNDLE includes:
              </p>
            )}

            {/* Checklist Inclusions */}
            {checklistItems.length > 0 && (
              <div className="max-w-3xl mx-auto space-y-12 text-left mb-20">
                {checklistItems.map((item, index) => (
                  <motion.div 
                    key={item.id || item._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    {item.icon ? (
                      <img src={item.icon} alt="icon" className="w-8 h-8 mr-3 mt-1 object-contain" />
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

            {/* Boring But Important / How to Book */}
            {(data.howToBookHeadline || data.howToBookBody || data.howToBookEmail || data.howToBookPhone) ? (
              <div className="max-w-4xl mx-auto text-center border-t-2 border-black/10 pt-10">
                {data.howToBookHeadline && (
                  <h3 className="text-[#E1017D] font-bold mb-2 uppercase tracking-tight text-lg md:text-xl">
                    {data.howToBookHeadline}
                  </h3>
                )}
                <p className="text-sm md:text-lg text-black font-bold leading-tight mb-2">
                  {data.howToBookBody && <span>{data.howToBookBody} </span>}
                  {data.howToBookLink && (
                    <span>
                      To book, <Link to={data.howToBookLink} className="underline cursor-pointer">click here</Link>
                    </span>
                  )}
                  {data.howToBookEmail && (
                    <span>
                      {data.howToBookLink ? ', email us on ' : 'Email us on '}
                      <a href={`mailto:${data.howToBookEmail}`} className="underline font-black">
                        {data.howToBookEmail}
                      </a>
                    </span>
                  )}
                  {data.howToBookPhone && (
                    <span>
                      {' or call '}
                      <a href={`tel:${data.howToBookPhone.replace(/\s+/g, '')}`} className="underline font-black">
                        {data.howToBookPhone}
                      </a>
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-[#E1017D] font-bold mb-2 uppercase tracking-tight text-lg md:text-xl">BORING BUT IMPORTANT:</h3>
                <p className="text-sm md:text-lg text-black font-bold leading-tight mb-2">
                  After 7pm, it's over-18s only. Before then, under 18s are welcome when accompanied by an adult.
                </p>
                <p className="text-[10px] md:text-xs text-black font-bold italic uppercase">
                  Minimum 2 people per booking Sun-Weds and 4 people Fri-Sat.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Events Section if available */}
        {featuredEvents.length > 0 && (
          <section className="py-12 max-w-7xl mx-auto px-4">
            {eventsDateHeading && (
              <h2 className="font-posterama text-3xl md:text-5xl font-black text-black text-center mb-10 uppercase">
                {eventsDateHeading}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredEvents.map((event, index) => (
                <div key={event.id || index} className="bg-black text-white p-6 rounded-xl flex flex-col justify-between">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <h3 className="font-posterama text-2xl font-bold mb-2">{event.title}</h3>
                  {event.subtitle && <h4 className="text-[#E1017D] font-semibold mb-2">{event.subtitle}</h4>}
                  {event.description && <p className="text-sm text-gray-300 mb-4">{event.description}</p>}
                  <div className="flex gap-4">
                    {event.button1Text && (
                      <button onClick={handleBooking} className="bg-[#E1017D] hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                        {event.button1Text}
                      </button>
                    )}
                    {event.button2Text && (
                      <a href={event.button2Link || '#'} className="bg-[#00AACB] hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                        {event.button2Text}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bundles Grid */}
        {bundleCards.length > 0 && (
          <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bundleCards.map((bundle, index) => (
                  <motion.div 
                    key={bundle.id || bundle._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-black overflow-hidden flex flex-col h-full shadow-2xl border-2 border-white/10"
                  >
                    {/* Jagged Image Border Effect */}
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 z-10 border-[12px] border-black pointer-events-none"></div>
                      <img 
                        src={bundle.image || defaultHero} 
                        alt={bundle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      {/* Neon Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#E1017D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h2 className="text-2xl md:text-3xl text-white mb-4 tracking-tighter leading-none text-center font-bold">
                        {bundle.title}
                      </h2>

                      {bundle.description && (
                        <p className="text-gray-300 text-sm text-center mb-6 font-noir-pro">
                          {bundle.description}
                        </p>
                      )}
                      
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={handleBooking}
                          className="flex-1 bg-[#00AACB] hover:bg-[#E1017D] text-white font-bold py-4 transition-colors duration-300 text-sm tracking-widest uppercase"
                        >
                          {bundle.button1Text || 'Book Now'}
                        </button>
                        <button 
                          onClick={() => {
                            if (bundle.button2Link && bundle.button2Link !== '#') {
                              window.location.href = bundle.button2Link;
                            } else {
                              handleBooking();
                            }
                          }}
                          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 transition-colors duration-300 text-sm tracking-widest uppercase"
                        >
                          {bundle.button2Text || 'Game Info'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Games / Games Section */}
        {chooseGameIds.length > 0 && (
          <section className="py-20 bg-white text-black">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="font-posterama text-4xl md:text-6xl font-black text-black text-center mb-16 tracking-tighter uppercase leading-none">
                {chooseGamesHeading}
              </h2>
              <OtherGames showHeading={false} filterGameIds={chooseGameIds} />
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BoomBundle;
