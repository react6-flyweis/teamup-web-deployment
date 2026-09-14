import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';
import { useBooking } from '../../hooks/useBooking';
import { handleNavigation } from '../../utils/navigation';

const texture = '/assets/texture.svg';

const Corporatebooking = () => {
  const navigate = useNavigate();
  const handleBooking = useBooking();

  const { data: siteContentData, isLoading } = useSiteContent('home');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E1017D]"></div>
      </div>
    );
  }

  const contentData = siteContentData?.content?.data || siteContentData?.data || siteContentData;
  const corporates = contentData?.corporates;
  const topBanner = contentData?.topBanner;

  const heroBgImage = resolveImageUrl(corporates?.heroImageUrl);
  const heroHeading = corporates?.heroHeading || 'CORPORATE BOOKING';
  const heroSubtitle = corporates?.heroTitle;

  const packagesList = Array.isArray(corporates?.packages) ? corporates.packages : [];
  const packagesTitle = corporates?.packagesTitle;
  const packagesDescription = corporates?.packagesDescription;
  const budgetText = corporates?.budgetText;

  const bookOnline = corporates?.bookOnline;
  const bookOnlineImage = resolveImageUrl(bookOnline?.imageUrl);

  const privateHire = corporates?.privateHire;
  const privateHireImage = resolveImageUrl(privateHire?.imageUrl);

  const otherGames = corporates?.otherGames;

  const handleHeroBooking = () => {
    const link = corporates?.packages?.[0]?.buttonLink || bookOnline?.buttonLink;
    if (link) {
      handleNavigation(link, navigate);
    } else {
      handleBooking();
    }
  };

  return (
    <>
      <div className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-black">
        <Navbar topBanner={topBanner} />
        {heroBgImage && (
          <div
            style={{ backgroundImage: `url(${heroBgImage})` }}
            className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          ></div>
        )}

        {/* Gradient Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full text-white">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col items-center"
          >
            <h1 className="text-white text-4xl sm:text-[80px] font-bold mb-6 uppercase tracking-tighter leading-none drop-shadow-2xl">
              {heroHeading.includes(' ') && !heroHeading.includes('<br') ? (
                <>
                  {heroHeading.split(' ')[0]} <br className="md:hidden" /> {heroHeading.split(' ').slice(1).join(' ')}
                </>
              ) : (
                heroHeading
              )}
            </h1>

            {heroSubtitle && (
              <p className="text-lg md:text-2xl font-semibold mb-8 max-w-2xl drop-shadow-lg">
                {heroSubtitle}
              </p>
            )}

            <button 
              onClick={handleHeroBooking}
              className="text-lg bg-[#00AACB] hover:bg-[#E1017D] hover:scale-110 transition-all duration-300 text-white rounded-full px-12 py-5 md:text-[28px] font-extrabold uppercase shadow-[0_0_20px_rgba(0,170,203,0.5)] cursor-pointer"
            >
              Book Now
            </button>

            {/* Bouncing SVG Arrow */}
            <div className="mt-16 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <div 
        className="w-full bg-fixed bg-cover bg-center pb-8"
        style={{ backgroundImage: `url(${texture})` }}
      >
        {(packagesTitle || packagesDescription) && (
          <section className="text-center pt-12 px-4">
            {packagesTitle && (
              <h2 className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
                {packagesTitle}
              </h2>
            )}

            {packagesDescription && (
              <p className="max-w-5xl mx-auto text-sm md:text-base text-[#292524]">
                {packagesDescription}
              </p>
            )}
          </section>
        )}

        {/* Pricing Boxes */}
        {packagesList.length > 0 && (
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 p-4 mt-12 max-w-6xl mx-auto">
            {packagesList.map((box, index) => {
              const iconSrc = resolveImageUrl(box.iconUrl);
              const heading = box.title;
              const price = box.price;
              const details = Array.isArray(box.details) ? box.details : (box.details ? [box.details] : []);
              const buttonText = box.buttonText || 'BOOK NOW';
              const buttonLink = box.buttonLink;

              return (
                <motion.div
                  key={index}
                  className="flex flex-col justify-between bg-black text-[#00AACB] w-full md:w-[320px] text-center p-8 rounded-2xl shadow-xl"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: i => ({
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' }
                    })
                  }}
                >
                  <div className="flex flex-col items-center space-y-4">
                    {iconSrc && (
                      <img 
                        src={iconSrc} 
                        alt={heading || ''} 
                        className="w-auto h-[80px] object-contain" 
                      />
                    )}
                    <div className="space-y-4 w-full">
                      {heading && (
                        <div className="text-base min-[820px]:text-lg uppercase text-white font-bold tracking-tight">
                          {heading}
                        </div>
                      )}
                      {price && (
                        <div className="text-3xl min-[820px]:text-5xl font-extrabold text-[#00AACB]">
                          {price}
                        </div>
                      )}
                      <div className="text-white text-opacity-60 font-semibold text-sm">
                        PER PERSON
                      </div>
                      {details.length > 0 && (
                        <div className="text-xs min-[820px]:text-sm text-white mt-4 leading-relaxed space-y-1">
                          {details.map((item, dIdx) => (
                            <div key={dIdx}>{item}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {buttonText && (
                    <div className="pt-6 mt-auto">
                      <button
                        onClick={() => {
                          if (buttonLink) {
                            handleNavigation(buttonLink, navigate);
                          } else {
                            handleBooking();
                          }
                        }}
                        className="w-full bg-[#00AACB] hover:bg-[#E1017D] hover:scale-105 transition-all duration-300 text-white rounded-full py-3 px-6 text-sm font-bold uppercase tracking-wider shadow cursor-pointer"
                      >
                        {buttonText}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {budgetText && (
          <section className="text-center pt-12 px-4 mb-12">
            <p className="max-w-6xl mx-auto text-sm font-semibold md:text-[20px] text-[#292524] italic">
              {budgetText}
            </p>
          </section>
        )}

        {/* Book Online Section */}
        {bookOnline && (
          <div className="flex flex-col md:flex-row items-center justify-center text-white w-full py-12 px-4 md:px-8 overflow-hidden">
            {bookOnlineImage && (
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="w-full md:w-[500px] h-64 sm:h-80 md:h-[500px]"
              >
                <img
                  src={bookOnlineImage}
                  alt={bookOnline.title || 'Book Online'}
                  className="w-full h-full object-cover rounded-l-3xl md:rounded-l-none"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-full md:w-[660px] md:h-[500px] p-8 md:p-12 bg-black text-white flex flex-col justify-center"
            >
              {bookOnline.title && (
                <h2 className="text-2xl md:text-[40px] font-bold mb-6 uppercase tracking-tighter">
                  {bookOnline.title}
                </h2>
              )}
              {bookOnline.body && (
                <p className="text-base md:text-[20px] leading-relaxed text-gray-300 mb-8">
                  {bookOnline.body}
                </p>
              )}
              {bookOnline.buttonText && (
                <button 
                  onClick={() => {
                    if (bookOnline.buttonLink) {
                      handleNavigation(bookOnline.buttonLink, navigate);
                    } else {
                      handleBooking();
                    }
                  }}
                  className="bg-[#00AACB] hover:bg-[#E1017D] hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-3 text-lg font-bold w-max uppercase cursor-pointer"
                >
                  {bookOnline.buttonText}
                </button>
              )}
            </motion.div>
          </div>
        )}

        {/* Private Hire Section */}
        {privateHire && (
          <div className="flex flex-col md:flex-row-reverse items-center justify-center text-white w-full py-12 px-4 md:px-8 overflow-hidden">
            {privateHireImage && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="w-full md:w-[500px] h-64 sm:h-80 md:h-[500px]"
              >
                <img
                  src={privateHireImage}
                  alt={privateHire.title || 'Private Hire'}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-full md:w-[660px] md:h-[500px] p-8 md:p-12 bg-black text-white flex flex-col justify-center"
            >
              {privateHire.title && (
                <h2 className="text-2xl md:text-[40px] font-bold mb-6 uppercase tracking-tighter">
                  {privateHire.title}
                </h2>
              )}
              {privateHire.body && (
                <p className="text-base md:text-[20px] leading-relaxed text-gray-300 mb-8">
                  {privateHire.body}
                </p>
              )}
              {privateHire.buttonText && (
                <button 
                  onClick={() => {
                    if (privateHire.buttonLink) {
                      handleNavigation(privateHire.buttonLink, navigate);
                    } else {
                      navigate('/contact');
                    }
                  }}
                  className="bg-[#E1017D] hover:bg-[#00AACB] hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-3 text-lg font-bold w-max uppercase cursor-pointer"
                >
                  {privateHire.buttonText}
                </button>
              )}
            </motion.div>
          </div>
        )}

        {/* Other Games Section */}
        {otherGames && (
          <>
            {otherGames.title && (
              <h1 className="text-center text-2xl md:text-[44px] text-[#292524] mt-24 font-bold mb-8 uppercase tracking-tight">
                {otherGames.title}
              </h1>
            )}
            <OtherGames items={otherGames.items} showHeading={false} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Corporatebooking;