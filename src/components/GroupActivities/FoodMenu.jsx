import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';
import { useLocationContext } from '../../context/LocationContext';

const texture = '/assets/texture.svg';

const FoodMenu = () => {
  const [activeTab, setActiveTab] = useState('flatbreads');
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
  const menuImages = contentData?.menuImages || {};
  const topBanner = contentData?.topBanner;

  const flatbreadsImg = resolveImageUrl(menuImages.flatbreads || menuImages.flatbread);
  const appetizersImg = resolveImageUrl(menuImages.appetizers || menuImages.appetizer);

  const currentImage = activeTab === 'flatbreads' ? flatbreadsImg : appetizersImg;

  return (
    <div className="min-h-screen">
      <Navbar topBanner={topBanner} />

      {/* Main Content: Full Card Size Image without outer container */}
      <div className="w-full bg-fixed bg-cover bg-center py-12" style={{ backgroundImage: `url(${texture})` }}>
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col items-center">
          {/* Simplified Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('flatbreads')}
              className={`px-8 py-3 rounded-full font-bold text-base sm:text-lg uppercase transition-all shadow-lg ${
                activeTab === 'flatbreads'
                  ? 'bg-[#E1017D] text-white scale-105'
                  : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
              }`}
            >
              Flatbreads
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('appetizers')}
              className={`px-8 py-3 rounded-full font-bold text-base sm:text-lg uppercase transition-all shadow-lg ${
                activeTab === 'appetizers'
                  ? 'bg-[#00AACB] text-white scale-105'
                  : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
              }`}
            >
              Appetizers
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
              <div className="w-full py-16 text-center text-white/80 bg-black/60 backdrop-blur-md rounded-[2rem] font-semibold text-lg">
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

export default FoodMenu;
