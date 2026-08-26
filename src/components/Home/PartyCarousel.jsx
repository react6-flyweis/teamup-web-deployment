import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import { resolveImageUrl } from '../../hooks/useSiteContent';
import { handleNavigation } from '../../utils/navigation';

const PartyCarousel = ({ currentItem, partyData, current, setCurrent }) => {
  const navigate = useNavigate();
  const handleBooking = useBooking();

  if (!currentItem) return null;

  const handleButtonClick = () => {
    if (currentItem.buttonLink) {
      handleNavigation(currentItem.buttonLink, navigate);
    } else {
      handleBooking();
    }
  };

  const imageUrl = resolveImageUrl(currentItem.image || currentItem.imageUrl);

  return (
    <div className="max-w-6xl mx-auto mt-20 mb-0 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px] md:h-[450px]">
        {/* Left Side: Image */}
        <div className="w-full md:w-[60%] h-[200px] md:h-full relative overflow-hidden">
            <img
                src={imageUrl}
                alt={currentItem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
            />
        </div>

        {/* Right Side: Content Box */}
        <div className="w-full md:w-[40%] bg-black text-white p-6 md:p-10 flex flex-col justify-center items-center text-center relative">
            <h2
                className="font-posterama text-2xl sm:text-3xl md:text-[40px] font-bold mb-4 leading-tight uppercase tracking-tighter"
            >
                {currentItem.title}
            </h2>
            <p
                className="font-noir-pro text-xs sm:text-sm md:text-[18px] mb-8 leading-snug text-gray-300"
            >
                {currentItem.description}
            </p>
            
            <div className="mb-12">
                <button
                    onClick={handleButtonClick}
                    className="font-posterama bg-[#00AACB] hover:bg-[#E1017D] text-white font-bold py-3 px-8 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-widest text-sm md:text-base"
                >
                    {currentItem.buttonText || 'BOOK MY BUNDLE'}
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center gap-3">
                {partyData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                            current === index ? 'bg-white scale-125' : 'bg-transparent'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default PartyCarousel;
