import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import bg from '../../assets/stepdown2.jpg'
import cocktailIcon from '../../assets/glass3.svg';
import { useDrinks } from '../../hooks/useDrinks';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';

const bgImage = '/assets/bg3.svg';

const Drinks = () => {
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

  const beers = drinksList
    .filter((drink) => (drink.category === 'beers' || drink.category === 'beer') && drink.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((drink) => ({
      name: drink.name,
      desc: drink.description || '',
    }));

  return (
    <div className="min-h-screen">
      <Navbar topBanner={topBanner} />
      
      {/* Hero Banner */}
      {(heroBgImage || heroTitle || heroDescription) && (
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={heroBgImage ? { backgroundImage: `url(${heroBgImage})` } : {}}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
            {heroTitle && (
              <h1 className="font-posterama text-5xl md:text-8xl text-white font-black tracking-tighter uppercase drop-shadow-md">
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

      <div className="w-full bg-fixed bg-cover bg-center py-12" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col gap-12">
          
          {/* Unified Drinks & Cocktails Section */}
          <div className="w-full bg-no-repeat bg-cover bg-center p-8 md:p-16 relative rounded-[2rem] shadow-2xl" style={{ backgroundImage: `url(${bgImage})` }}>
             <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12 border-b border-black/10 pb-6">
                <h2 className="font-posterama text-5xl md:text-7xl text-[#292524] uppercase tracking-tighter leading-none">
                  DRINKS <span className="text-[#00AACB]">&</span> <br className="md:hidden" /> COCKTAILS
                </h2>
                <img src={cocktailIcon} alt="icon" className="w-24 md:w-32 mt-2 md:mt-[-20px] drop-shadow-xl" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Cocktails Column */}
                <div>
                   <h3 className="font-posterama text-3xl text-[#E1017D] mb-8 uppercase tracking-widest border-l-4 border-[#E1017D] pl-4">Cocktails</h3>
                   <div className="space-y-8">
                      {isLoading ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E1017D]"></div>
                        </div>
                      ) : error ? (
                        <div className="text-red-500 py-4 font-semibold">Failed to load cocktails.</div>
                      ) : cocktails.length === 0 ? (
                        <div className="text-gray-500 py-4 font-semibold">No cocktails available.</div>
                      ) : (
                        cocktails.map((item, idx) => (
                          <div key={idx} className="group">
                              <h4 className="font-noir-semi text-xl md:text-2xl font-black text-[#292524] uppercase mb-2 group-hover:text-[#E1017D] transition-colors">{item.name}</h4>
                              <p className="font-noir-pro text-sm md:text-base text-[#292524]/80 leading-relaxed">{item.desc}</p>
                          </div>
                        ))
                      )}
                   </div>
                </div>

                {/* Beers Column */}
                <div>
                   <h3 className="font-posterama text-3xl text-[#00AACB] mb-8 uppercase tracking-widest border-l-4 border-[#00AACB] pl-4">Beers & Draught</h3>
                   <div className="space-y-8">
                      {isLoading ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00AACB]"></div>
                        </div>
                      ) : error ? (
                        <div className="text-red-500 py-4 font-semibold">Failed to load beers.</div>
                      ) : beers.length === 0 ? (
                        <div className="text-gray-500 py-4 font-semibold">No beers available.</div>
                      ) : (
                        beers.map((item, idx) => (
                          <div key={idx} className="group">
                              <h4 className="font-noir-semi text-xl md:text-2xl font-black text-[#292524] uppercase mb-2 group-hover:text-[#00AACB] transition-colors">{item.name}</h4>
                              <p className="font-noir-pro text-sm md:text-base text-[#292524]/80 leading-relaxed">{item.desc}</p>
                          </div>
                        ))
                      )}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Drinks;

