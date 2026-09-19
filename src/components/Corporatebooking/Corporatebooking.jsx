import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import OtherGames from '../Home/OtherGames';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';
import { useBooking } from '../../hooks/useBooking';
import { handleNavigation } from '../../utils/navigation';

import gameIcon from '../../assets/corporate/Game-play-40x40px.png';
import cocktailIcon from '../../assets/corporate/Cocktails_40x40px.png';
import bevvyIcon from '../../assets/corporate/Bevvys_40x40px.png';
import burgerIcon from '../../assets/corporate/Burger_40x40px.png';
import shotsIcon from '../../assets/corporate/Shots_40x40px.png';
import moneyIcon from '../../assets/corporate/Money_40x40px.png';

const texture = '/assets/texture.svg';

const formatPrice = (price) => {
  if (!price && price !== 0) return 'N/A';
  const str = String(price).trim();
  if (/^\d+(\.\d+)?$/.test(str)) {
    return `£${str} PP`;
  }
  return str;
};

const DEFAULT_CORPORATE_PACKAGES = [
  {
    title: "JINGLE & MINGLE",
    games: "2 HOURS OF GAMES",
    welcomeBevvy: "PROSECCO, WINE OR BOTTLED BEER/CIDER/0% ON ARRIVAL",
    bevvies: "2 HOUSE BEVVIES",
    bevviesUpgrade: "(COCKTAIL UPGRADE AVAILABLE)",
    scran: "N/A",
    somethingFun: "N/A",
    price: "35",
  },
  {
    title: "MISTLETOE MADNESS",
    games: "2 HOURS OF GAMES",
    welcomeBevvy: "PROSECCO, WINE OR BOTTLED BEER/CIDER/0% ON ARRIVAL",
    bevvies: "3 HOUSE BEVVIES",
    bevviesUpgrade: "(COCKTAIL UPGRADE AVAILABLE)",
    scran: "BOOM BITES - STREET FOOD BUFFET",
    somethingFun: "FESTIVE GROUP SHOT",
    funSubtitle: "(SWITCH TO JOE & SEPHS\nPOPCORN TO TAKE HOME)",
    price: "55",
  },
  {
    title: "THE CHRISTMAS CRACKER",
    games: "3 HOURS OF GAMES",
    welcomeBevvy: "PROSECCO, WINE OR BOTTLED BEER/CIDER/0% ON ARRIVAL",
    bevvies: "4 HOUSE BEVVIES",
    bevviesUpgrade: "(COCKTAIL UPGRADE AVAILABLE)",
    scran: "BOOM BITES - STREET FOOD BUFFET",
    somethingFun: "FESTIVE GROUP SHOT",
    funSubtitle: "(SWITCH TO JOE & SEPHS\nPOPCORN TO TAKE HOME)",
    price: "70",
  },
  {
    title: "BUILD YOUR OWN",
    games: "CHOOSE YOUR GAME TIME",
    welcomeBevvy: "CHOOSE YOUR WELCOME DRINKS",
    bevvies: "CHOOSE YOUR DRINKS PACKAGE",
    scran: "CHOOSE YOUR FOOD PACKAGE",
    somethingFun: "ADD OPTIONAL EXTRAS",
    price: "BUILT AROUND YOUR BUDGET",
  },
];

const TABLE_ROWS = [
  {
    id: 'games',
    label: 'GAMES',
    icon: gameIcon,
    render: (pkg) => (
      <span className="font-extrabold text-xs sm:text-sm md:text-[14px] text-black uppercase tracking-tight">
        {pkg.games || pkg.gameTime || 'N/A'}
      </span>
    ),
  },
  {
    id: 'welcomeBevvy',
    label: 'WELCOME BEVVY',
    icon: cocktailIcon,
    render: (pkg) => (
      <span className="font-extrabold text-[11px] sm:text-xs md:text-[13px] text-black uppercase tracking-tight leading-snug px-1 block">
        {pkg.welcomeBevvy || 'N/A'}
      </span>
    ),
  },
  {
    id: 'bevvies',
    label: 'BEVVIES',
    icon: bevvyIcon,
    render: (pkg) => {
      const val = pkg.bevvies || 'N/A';
      const upgrade = pkg.bevviesUpgrade || (
        val.toUpperCase().includes('HOUSE BEVVIES') && !val.toUpperCase().includes('COCKTAIL UPGRADE')
          ? '(COCKTAIL UPGRADE AVAILABLE)'
          : null
      );
      return (
        <div className="flex flex-col items-center justify-center space-y-0.5 px-1">
          <span className="font-extrabold text-xs sm:text-sm md:text-[14px] text-black uppercase tracking-tight leading-snug">
            {val}
          </span>
          {upgrade && (
            <span className="font-bold text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-tight leading-tight">
              {upgrade}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: 'scran',
    label: 'SCRAN',
    icon: burgerIcon,
    render: (pkg) => (
      <span className="font-extrabold text-xs sm:text-sm md:text-[14px] text-black uppercase tracking-tight leading-snug px-1 block">
        {pkg.scran || 'N/A'}
      </span>
    ),
  },
  {
    id: 'somethingFun',
    label: 'SOMETHING FUN',
    icon: shotsIcon,
    render: (pkg) => {
      const val = pkg.somethingFun || pkg.fun || 'N/A';
      if (val === 'N/A') {
        return <span className="font-extrabold text-xs sm:text-sm md:text-[14px] text-black">N/A</span>;
      }
      const sub = pkg.funSubtitle || (
        val.toUpperCase().includes('FESTIVE GROUP SHOT') && !val.toUpperCase().includes('JOE & SEPHS')
          ? '(SWITCH TO JOE & SEPHS\nPOPCORN TO TAKE HOME)'
          : null
      );
      return (
        <div className="flex flex-col items-center justify-center space-y-0.5 px-1">
          <span className="font-extrabold text-xs sm:text-sm md:text-[14px] text-black uppercase tracking-tight leading-snug">
            {val}
          </span>
          {sub && (
            <span className="font-bold text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-tight leading-tight whitespace-pre-line">
              {sub}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: 'price',
    label: 'PRICE £ PP',
    icon: moneyIcon,
    render: (pkg) => (
      <span className="font-black text-xs sm:text-sm md:text-[15px] text-black uppercase tracking-tight">
        {formatPrice(pkg.price)}
      </span>
    ),
  },
];

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

  const hasNewPackageFormat = Array.isArray(corporates?.packages) &&
    corporates.packages.length > 0 &&
    corporates.packages.some(p => p.games || p.welcomeBevvy || p.scran || p.bevvies);

  const packagesList = hasNewPackageFormat ? corporates.packages : DEFAULT_CORPORATE_PACKAGES;
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

        {/* Package Comparison Table */}
        {packagesList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4 my-8 md:my-14"
          >
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-400">
              <table className="w-full min-w-[780px] lg:min-w-[960px] border-collapse table-fixed">
                <thead>
                  <tr>
                    {/* Top-left empty cell */}
                    <th className="w-[22%] min-w-[180px] border-r border-black p-2 bg-transparent"></th>
                    {packagesList.map((pkg, idx) => (
                      <th
                        key={idx}
                        className="w-[19.5%] border-r border-black p-3 md:p-4 text-center font-black text-xs sm:text-sm md:text-base text-black uppercase tracking-wider bg-transparent align-bottom"
                      >
                        {pkg.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row.id}>
                      {/* Left Pink Header Cell */}
                      <td className="border-t border-b border-l border-r border-black bg-[#E1017D] p-3 md:p-4 align-middle">
                        <div className="flex items-center gap-2.5 sm:gap-3.5">
                          <img
                            src={row.icon}
                            alt={row.label}
                            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0"
                          />
                          <span className="font-black text-white text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-tight leading-tight">
                            {row.label}
                          </span>
                        </div>
                      </td>

                      {/* Package Data Cells */}
                      {packagesList.map((pkg, pIdx) => (
                        <td
                          key={pIdx}
                          className={`border-t border-b border-r border-black bg-white p-3 md:p-4 text-center align-middle ${
                            row.id === 'price' ? 'cursor-pointer hover:bg-neutral-50 transition-colors' : ''
                          }`}
                          onClick={
                            row.id === 'price'
                              ? () => {
                                  if (pkg.buttonLink) {
                                    handleNavigation(pkg.buttonLink, navigate);
                                  } else {
                                    handleBooking();
                                  }
                                }
                              : undefined
                          }
                        >
                          {row.render(pkg)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Book A Package Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleHeroBooking}
                className="bg-[#00AACB] hover:bg-[#E1017D] hover:scale-105 transition-all duration-300 text-white rounded-full px-10 py-3.5 md:py-4 text-base md:text-xl font-extrabold uppercase shadow-[0_0_20px_rgba(0,170,203,0.4)] cursor-pointer"
              >
                Book A Package
              </button>
            </div>
          </motion.div>
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