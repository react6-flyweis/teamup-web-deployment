import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQueensNight } from '../../hooks/useQueensNight';
import { useBooking } from '../../hooks/useBooking';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { motion } from 'framer-motion';
import check from '../../assets/check.svg';
import clock2 from '../../assets/clock2.svg';
import min from '../../assets/min.svg';
import dollar from '../../assets/dollar.svg';

const queenDefault = '/assets/Doe.svg';
const queenbgDefault = '/assets/queenbg.svg';
const texture = '/assets/texture.svg';

const iconMap = {
  age: min,
  price: dollar,
  duration: clock2,
  clock: clock2,
  min: min,
  dollar: dollar,
};

const QueensNight = () => {
  const { slug } = useParams();
  const handleBooking = useBooking();
  const { data: rawData, isLoading, error } = useQueensNight(slug || 'queens-night');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const data = rawData || {};

  const pageHeadline = data.pageHeadline || data.name || 'QUEENS NIGHT';
  const pageHeroImage = data.pageHeroImage || queenbgDefault;
  const heroBookNowLink = data.heroBookNowLink;
  
  const sectionHeadline = data.sectionHeadline || 'CELEBRATE HER LAST FLING BEFORE THE RING WITH A BOOM';
  const sectionDescription = data.sectionDescription || 'Chat to our expert party planners today to plan a stag party full of fizz and fun. What does the price include?';
  const checklistItems = data.checklistItems || [];

  const howToBookHeadline = data.howToBookHeadline || "HERE'S HOW TO BOOK";
  const howToBookBody = data.howToBookBody;
  const howToBookLink = data.howToBookLink;
  const howToBookEmail = data.howToBookEmail;
  const howToBookPhone = data.howToBookPhone;

  const statsBlocks = data.statsBlocks || [];
  const chooseGamesHeading = data.chooseGamesHeading;
  const chooseGameIds = data.chooseGameIds || [];
  const featuredEvents = data.featuredEvents || [];
  const eventsDateHeading = data.eventsDateHeading;

  const columnVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const defaultStats = [
    { icon: min, heading: 'AGE', value: '18+' },
    { icon: dollar, heading: 'FROM', value: '$30', sub: 'PER PERSON\nMINIMUM 6 PEOPLE PER BOOKING' },
    { icon: clock2, heading: 'FOR', value: '2–3', sub: 'HOURS' }
  ];

  return (
    <>
      <div className="relative md:h-screen w-full overflow-hidden">
        <Navbar />

        <div
          style={{ backgroundImage: `url(${pageHeroImage})` }}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        ></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-20 text-white">
          {/* Queen Image */}
          <img
            src={queenDefault}
            alt="Queen"
            className="max-w-[440px] w-full h-auto z-10"
          />

          {/* Text, Button and Arrow */}
          <div className="relative z-20 mt-8 flex flex-col items-center">
            <h1 className="text-white text-3xl sm:text-[64px] font-bold mb-4 uppercase tracking-tighter">
              {pageHeadline}
            </h1>
            <button 
              onClick={() => {
                if (heroBookNowLink && heroBookNowLink.startsWith('/')) {
                  window.location.href = heroBookNowLink;
                } else {
                  handleBooking();
                }
              }}
              className="text-base bg-[#00AACB] hover:bg-[#E1017D] hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-4 mt-8 md:text-[26px] font-bold"
            >
              Book Now
            </button>

            {/* Bouncing SVG Arrow */}
            <div className="mt-12 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
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
      </div>

      <div 
        className="w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${texture})` }}
      >
        <section className="text-center pt-12 px-4">
          <h2 className="text-xl md:text-[36px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
            {sectionHeadline}
          </h2>

          {sectionDescription && (
            <p className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]">
              {sectionDescription}
            </p>
          )}
        </section>

        {checklistItems.length > 0 && (
          <div className="p-4 sm:p-6 space-y-6 max-w-[800px] mx-auto mt-8">
            {checklistItems.map((item, index) => (
              <div key={item.id || item._id || index} className="flex items-start gap-4">
                <img src={item.icon || check} alt="Check" className="w-[40px] h-[40px] mt-4" />
                <div>
                  <h3 className="text-[#292524] font-bold text-base sm:text-[28px] leading-tight uppercase">
                    {item.title}
                  </h3>
                  {(item.subtext || item.description) && (
                    <p className="text-base sm:text-lg text-gray-800 mt-1">
                      {item.subtext || item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Events Section if available */}
        {featuredEvents.length > 0 && (
          <section className="py-12 max-w-7xl mx-auto px-4">
            {eventsDateHeading && (
              <h2 className="font-posterama text-3xl md:text-5xl font-black text-[#292524] text-center mb-10 uppercase">
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

        <section className="text-center pt-12 px-4">
          <h2 className="text-xl md:text-[36px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
            {howToBookHeadline}
          </h2>

          <p className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]">
            {howToBookBody || "To book this package, either click here, email us on USA@teamup.com or give us a call on 0207 286 0404. Don’t worry, it’s quick and easy. We promise not to keep you on the phone for hours!"}
            {howToBookLink && (
              <span> <Link to={howToBookLink} className="underline cursor-pointer">click here</Link></span>
            )}
            {howToBookEmail && (
              <span>, email us on <a href={`mailto:${howToBookEmail}`} className="underline font-bold">{howToBookEmail}</a></span>
            )}
            {howToBookPhone && (
              <span> or give us a call on <a href={`tel:${howToBookPhone.replace(/\s+/g, '')}`} className="underline font-bold">{howToBookPhone}</a></span>
            )}
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 p-4 mt-4">
            {statsBlocks.length > 0 ? (
              statsBlocks.map((box, index) => {
                const iconSrc = iconMap[box.iconType] || (box.iconType && box.iconType.startsWith('http') ? box.iconType : min);
                const headingText = (box.topText || (box.iconType === 'age' ? 'AGE' : box.iconType === 'price' ? 'FROM' : '')).trim() || 'INFO';
                const mainVal = box.mainText || box.value || '';
                const subVal = box.subText || box.sub || '';

                return (
                  <motion.div
                    key={box.id || index}
                    className="flex flex-col bg-black text-[#00AACB] w-full min-[820px]:w-[280px] text-center p-6"
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={columnVariants}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <img src={iconSrc} alt={headingText} className="w-auto h-[80px]" />
                      <div className="space-y-2">
                        <div className="text-sm min-[820px]:text-base uppercase text-white">{headingText}</div>
                        <div className="text-2xl min-[820px]:text-4xl font-extrabold">{mainVal}</div>
                        {subVal && (
                          <div className="text-xs min-[820px]:text-sm text-white mt-1 whitespace-pre-line">
                            {subVal}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              defaultStats.map((box, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col bg-black text-[#00AACB] w-full min-[820px]:w-[280px] text-center p-6"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={columnVariants}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <img src={box.icon} alt={box.heading} className="w-auto h-[80px]" />
                    <div className="space-y-2">
                      <div className="text-sm min-[820px]:text-base uppercase text-white">{box.heading}</div>
                      <div className="text-2xl min-[820px]:text-4xl font-extrabold">{box.value}</div>
                      {box.sub && (
                        <div className="text-xs min-[820px]:text-sm text-white mt-1 whitespace-pre-line">
                          {box.sub}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        <h1 className="text-center text-2xl md:text-[36px] text-[#292524] mt-12 font-bold mb-4 uppercase">
          {chooseGamesHeading || 'OTHER GAMES'}
        </h1>
        <OtherGames filterGameIds={chooseGameIds.length > 0 ? chooseGameIds : undefined} showHeading={false} />
      </div>
      <Footer />
    </>
  );
};

export default QueensNight;