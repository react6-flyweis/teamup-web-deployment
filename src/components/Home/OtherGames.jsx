import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "../../hooks/useGames";
import { useBooking } from "../../hooks/useBooking";
import { resolveImageUrl } from "../../hooks/useSiteContent";

const OtherGames = ({ excludeSlug, showHeading = true, items, filterGameIds }) => {
  const { data, isLoading, error } = useGames();
  const handleBooking = useBooking();
  const navigate = useNavigate();

  if (!items && isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E1017D]"></div>
      </div>
    );
  }

  if (!items && error) {
    return null;
  }

  let games = [];
  if (items && Array.isArray(items) && items.length > 0) {
    games = items
      .filter((game) => game.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((game) => ({
        title: game.title || game.name,
        image: resolveImageUrl(game.imageUrl || game.image || ""),
        link: game.buttonLink || (game.slug ? `/games/${game.slug}` : ""),
        buttonText: game.buttonText || "BOOK NOW",
      }));
  } else {
    const apiGames = data?.games || [];
    games = apiGames
      .filter((game) => {
        if (game.isActive === false) return false;
        if (game.slug === excludeSlug) return false;
        if (Array.isArray(filterGameIds) && filterGameIds.length > 0) {
          return filterGameIds.includes(game._id) || filterGameIds.includes(game.id);
        }
        return true;
      })
      .map((game) => ({
        title: game.name,
        image: resolveImageUrl(game.imageUrl || ""),
        link: `/games/${game.slug}`,
        buttonText: "BOOK NOW",
      }));
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <>
      {showHeading && (
        <h1 style={{ fontFamily: 'Posterama2001W04' }} className="text-center text-2xl md:text-[44px] text-[#292524] mt-12 font-bold mb-4 uppercase">
          OTHER GAMES
        </h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 max-w-screen-xl mx-auto">
        {games.map((game, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-md h-[300px] sm:h-[350px] md:h-[400px] cursor-pointer"
          >
            {game.image ? (
              <img
                src={game.image}
                alt={game.title}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                No Image Available
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full z-10">
              <div className="bg-black/80 w-full pt-6 pb-4 px-4 flex flex-col items-center">
                <h3 className="font-posterama text-white font-bold text-[18px] md:text-[24px] lg:text-[28px] uppercase tracking-tighter text-center mb-4 leading-none drop-shadow-lg">
                  {game.title}
                </h3>
                <div className="w-full flex flex-row items-center gap-3">
                  <button 
                    onClick={() => {
                      if (game.link) {
                        navigate(game.link);
                      } else {
                        handleBooking();
                      }
                    }}
                    className="flex-1 bg-[#00AACB] hover:bg-cyan-600 text-white py-3 text-[14px] md:text-[16px] font-bold rounded uppercase tracking-tighter"
                  >
                    {game.buttonText}
                  </button>
                  {game.link && (
                    <Link 
                      to={game.link}
                      className="flex-1 bg-[#292524] hover:bg-black text-white py-3 text-[14px] md:text-[16px] font-bold rounded text-center uppercase tracking-tighter border border-white/20"
                    >
                      LEARN MORE
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OtherGames;
