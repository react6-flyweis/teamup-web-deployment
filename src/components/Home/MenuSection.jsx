import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const MenuSection = ({ bits, drinks, bitesData, drinksData }) => {
  const navigate = useNavigate();

  const bitesImage = bitesData?.imageUrl ? resolveImageUrl(bitesData.imageUrl) : bits;
  const bitesTitle = bitesData?.title;
  const bitesLink = bitesData?.menuLink;

  const drinksImage = drinksData?.imageUrl ? resolveImageUrl(drinksData.imageUrl) : drinks;
  const drinksTitle = drinksData?.title;
  const drinksLink = drinksData?.menuLink;

  if (bitesData?.isActive === false && drinksData?.isActive === false) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 px-4 sm:px-6 md:flex-row md:gap-6 lg:gap-10 lg:py-8 lg:px-12 md:mb-0 mt-20">
      {/* BITES Card */}
      {bitesData?.isActive !== false && bitesTitle && (
        <div className="relative w-full max-w-[600px]">
          <img
            src={bitesImage}
            alt={bitesTitle}
            className="w-full h-[200px] sm:h-[280px] md:h-[320px] lg:h-[365px] object-cover rounded-lg shadow-md"
          />
          <div
            className="font-posterama absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-center justify-center p-2"
          >
            <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-[64px] font-bold mt-8 sm:mt-12 lg:mt-24 mb-2 sm:mb-4 uppercase text-center">
              {bitesTitle}
            </h2>

            <button
              onClick={() => bitesLink && navigate(bitesLink)}
              className="bg-cyan-500 hover:bg-[#E1017D] w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mt-4 sm:mt-8 lg:mt-24 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 lg:py-4 rounded transition-colors uppercase"
            >
              VIEW MENU
            </button>
          </div>
        </div>
      )}

      {/* Ampersand */}
      {bitesData?.isActive !== false && drinksData?.isActive !== false && bitesTitle && drinksTitle && (
        <div className="text-2xl sm:text-3xl font-bold text-gray-700 hidden md:block">
          &
        </div>
      )}

      {/* DRINKS Card */}
      {drinksData?.isActive !== false && drinksTitle && (
        <div className="relative w-full max-w-[600px]">
          <img
            src={drinksImage}
            alt={drinksTitle}
            className="w-full h-[200px] sm:h-[280px] md:h-[320px] lg:h-[365px] object-cover rounded-lg shadow-md"
          />
          <div
            className="font-posterama absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-center justify-center p-2"
          >
            <h2 className="text-white text-center text-xl sm:text-3xl md:text-4xl lg:text-[54px] font-bold mt-8 sm:mt-12 lg:mt-24 mb-2 sm:mb-4 leading-none uppercase">
              {drinksTitle.includes('&') ? (
                <>
                  {drinksTitle.split('&')[0]} <span className="text-[#00AACB]">&</span><br /> {drinksTitle.split('&')[1]}
                </>
              ) : (
                drinksTitle
              )}
            </h2>

            <button
              onClick={() => drinksLink && navigate(drinksLink)}
              className="font-posterama bg-cyan-500 hover:bg-[#E1017D] w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mt-4 sm:mt-8 lg:mt-24 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 lg:py-4 rounded transition-colors uppercase"
            >
              VIEW MENU
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSection;
