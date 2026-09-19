import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import bg from '../../assets/stepdown2.jpg';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';
import { useLocationContext } from '../../context/LocationContext';

const DEFAULT_COCKTAIL_IMAGE = 'https://teamup-live.s3.us-west-1.amazonaws.com/uploads/1789818247319-5d2b37ec-7a7f-47c6-99b3-ebf2f3661777.webp';
const DEFAULT_BEER_IMAGE = 'https://teamup-live.s3.us-west-1.amazonaws.com/uploads/1789818251871-0256cdcd-a844-4425-854d-393c1cfc8138.webp';

const DrinksMenu = () => {
  const [activeTab, setActiveTab] = useState('cocktails');
  const { selectedLocation } = useLocationContext();

  const { data: siteContentData, isLoading } = useSiteContent('food-drinks', {
    params: selectedLocation?.slug ? { locationSlug: selectedLocation.slug } : undefined,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const contentData = siteContentData?.content?.data || siteContentData?.data || siteContentData;
  const topBanner = contentData?.topBanner;

  const menuImages = contentData?.menuImages || {};
  const cocktailImg = resolveImageUrl(menuImages.cocktails || menuImages.cocktail) || DEFAULT_COCKTAIL_IMAGE;
  const beerImg = resolveImageUrl(menuImages.beer || menuImages.beers) || DEFAULT_BEER_IMAGE;

  const currentImage = activeTab === 'cocktails' ? cocktailImg : beerImg;

  return (
    <div className="min-h-screen">
      <Navbar topBanner={topBanner} />

      {/* Main Content: Full Card Size Image without outer container */}
      <div className="w-full bg-fixed bg-cover bg-center py-12" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col items-center">
          {/* Simplified Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('cocktails')}
              className={`px-8 py-3 rounded-full font-bold text-base sm:text-lg uppercase transition-all shadow-lg ${
                activeTab === 'cocktails'
                  ? 'bg-[#E1017D] text-white scale-105'
                  : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
              }`}
            >
              Cocktails
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('beer')}
              className={`px-8 py-3 rounded-full font-bold text-base sm:text-lg uppercase transition-all shadow-lg ${
                activeTab === 'beer'
                  ? 'bg-[#00AACB] text-white scale-105'
                  : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
              }`}
            >
              Beer
            </button>
          </div>

          {/* Menu Image: Sized to full card width */}
          <div className="w-full flex justify-center">
            {currentImage ? (
              <img
                src={currentImage}
                alt={`${activeTab} menu`}
                className="w-full h-auto rounded-[2rem] shadow-2xl object-contain"
              />
            ) : (
              <div className="w-full py-16 text-center text-white/80 bg-black/50 backdrop-blur-md rounded-[2rem] font-semibold text-lg">
                No menu image available for {activeTab}.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DrinksMenu;
