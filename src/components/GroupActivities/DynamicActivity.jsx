import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGroupActivity } from '../../hooks/useGroupActivity';
import { useBooking } from '../../hooks/useBooking';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { motion } from 'framer-motion';

const defaultHero = 'https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/30/2022/04/BOOM-Birthdays-Web-Hero-Banner-1905x805-3.jpg.webp';

const checkIcon = (
  <img 
    src="https://s40091.pcdn.co/uk/london-oxford-street/wp-content/uploads/sites/2/2022/04/TICK2.svg" 
    alt="tick" 
    className="w-10 h-10 mt-[-5px]" 
  />
);

const DynamicActivity = () => {
  const { slug } = useParams();
  const handleBooking = useBooking();
  const { data: activity, isLoading, error } = useGroupActivity(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h2 className="text-2xl mb-4 font-bold">Activity Not Found</h2>
        <Link to="/" className="bg-[#E1017D] px-6 py-2 rounded-full text-white">
          Back to Home
        </Link>
      </div>
    );
  }

  const heroImage = activity.pageHeroImage || activity.heroImageUrl || activity.imageUrl || defaultHero;
  const pageHeadline = activity.pageHeadline || activity.name || activity.title || 'GROUP ACTIVITY';
  const sectionHeadline = activity.sectionHeadline || activity.tagline;
  const sectionDescription = activity.sectionDescription || activity.taglineDescription || activity.description;
  const checklistItems = activity.checklistItems || [];
  const chooseGamesHeading = activity.chooseGamesHeading || 'CHOOSE YOUR GAMES';
  const chooseGameIds = activity.chooseGameIds || [];
  const bundleCards = activity.bundleCards || [];

  return (
    <div className="min-h-screen font-noir-pro text-white bg-black">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 px-4 mt-20 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-posterama text-7xl md:text-[120px] font-black text-white mb-2 tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] uppercase"
          >
            {pageHeadline}
          </motion.h1>
          
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handleBooking}
              className="bg-[#00AACB] hover:bg-cyan-600 text-white font-bold py-3 px-8 text-lg rounded-full uppercase tracking-tighter w-56 transition-all"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </section>

      {/* Details Section with Metallic Texture */}
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
          {(activity.howToBookHeadline || activity.howToBookBody || activity.howToBookEmail || activity.howToBookPhone) && (
            <div className="border-t-2 border-black/10 pt-16">
              {activity.howToBookHeadline && (
                <h2 className="font-posterama text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
                  {activity.howToBookHeadline}
                </h2>
              )}
              <p className="font-noir-pro text-lg text-black font-bold mb-8">
                {activity.howToBookBody && <span>{activity.howToBookBody} </span>}
                {activity.howToBookLink && (
                  <span>
                    To book this package, <Link to={activity.howToBookLink} className="underline cursor-pointer">click here</Link>
                  </span>
                )}
                {activity.howToBookEmail && (
                  <span>
                    {activity.howToBookLink ? ', email us on ' : 'Email us on '}
                    <a href={`mailto:${activity.howToBookEmail}`} className="underline cursor-pointer font-black">
                      {activity.howToBookEmail}
                    </a>
                  </span>
                )}
                {activity.howToBookPhone && (
                  <span>
                    {' or give us a call on '}
                    <a href={`tel:${activity.howToBookPhone.replace(/\s+/g, '')}`} className="underline cursor-pointer font-black">
                      {activity.howToBookPhone}
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

export default DynamicActivity;

