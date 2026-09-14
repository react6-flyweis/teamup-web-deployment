import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import bg from '../../assets/stepdown2.jpg'
import cocktailIcon from '../../assets/glass3.svg';
import { useDrinks } from '../../hooks/useDrinks';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';

const bgImage = '/assets/bg3.svg';

const CheckoutPage = () => {
  const { data, isLoading, error } = useDrinks();
  const { data: siteContentData } = useSiteContent('food-drinks');

  const contentData = siteContentData?.content?.data || siteContentData?.data || siteContentData;
  const drinksSection = contentData?.drinksSection || contentData?.cocktailsSection || contentData?.drinks;
  const topBanner = contentData?.topBanner;

  const heroBgImage = drinksSection?.backgroundImage
    ? resolveImageUrl(drinksSection.backgroundImage)
    : drinksSection?.imageUrl
    ? resolveImageUrl(drinksSection.imageUrl)
    : null;

  const heroTitle = drinksSection?.title;
  const heroDescription = drinksSection?.description;

  const drinksList = data?.drinks || [];
  const cocktails = drinksList
    .filter((drink) => drink.category === 'cocktails' && drink.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((drink) => ({
      name: drink.name,
      desc: drink.description || '',
    }));

  return (
    <>
      <Navbar topBanner={topBanner} />
      {/* Hero Banner */}
      {(heroBgImage || heroTitle || heroDescription) && (
        <div
          className="relative h-[300px] md:h-[350px] bg-cover bg-center"
          style={heroBgImage ? { backgroundImage: `url(${heroBgImage})` } : {}}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
            {heroTitle && (
              <h1
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-white text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider drop-shadow-md"
              >
                {heroTitle}
              </h1>
            )}
            {heroDescription && (
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-white/90 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto drop-shadow"
              >
                {heroDescription}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="w-full bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 ps-4 pe-4">
          
          <div
            className="w-full max-w-[1260px] h-auto md:h-[822px] bg-no-repeat bg-cover bg-center p-4 sm:p-6"
            style={{ backgroundImage: `url(${bgImage})`, fontFamily: 'Arial, sans-serif' }}
          >
            <div className="px-4 sm:px-8 md:pl-24 md:pr-14">

              {/* Header with icon */}
              <div style={{ fontFamily: 'Posterama2001W04' }} className="flex flex-col sm:flex-row sm:items-start gap-2 mb-3">
                <h2 className="text-[32px] sm:text-[40px] md:text-[46px] tracking-wide text-[#292524] uppercase">Cocktails</h2>
                <img
                  src={cocktailIcon}
                  alt="Cocktail Icon"
                  className="w-[60px] h-[80px] sm:w-[80px] sm:h-[100px] md:w-[104px] md:h-[137px] sm:mt-[-32px] md:mt-[-64px]"
                />
              </div>

              {/* Cocktail items */}
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E1017D]"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-8 font-semibold">
                  Failed to load cocktails. Please try again later.
                </div>
              ) : cocktails.length === 0 ? (
                <div className="text-center text-gray-500 py-8 font-semibold">
                  No cocktails available at the moment.
                </div>
              ) : (
                cocktails.map((item, index) => (
                  <div key={index} className="mb-3">
                    <h3
                      style={{ fontFamily: 'Noir Semi' }}
                      className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#292524] uppercase leading-tight"
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ fontFamily: 'Noir Pro' }}
                      className="text-[16px] sm:text-[18px] md:text-[20px] text-[#292524] leading-tight"
                    >
                      {item.desc}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
