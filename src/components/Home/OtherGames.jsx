
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "../../hooks/useGames";
import { useBooking } from "../../hooks/useBooking";
import { resolveImageUrl } from "../../hooks/useSiteContent";
import { handleNavigation, isExternalUrl, getHref } from "../../utils/navigation";

const isVideoUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};


const GameCard = ({ game, onBook }) => {
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const showVideo = Boolean(game.videoUrl) && !videoError;

  return (
    <div className="relative group overflow-hidden rounded-md h-[300px] sm:h-[350px] md:h-[400px] cursor-pointer">
      {showVideo ? (
        <video
          src={game.videoUrl}
          poster={game.cardImageUrl || undefined}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      ) : game.cardImageUrl ? (
        <img
          src={game.cardImageUrl}
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
                  handleNavigation(game.link, navigate);
                } else {
                  onBook();
                }
              }}
              className="flex-1 bg-[#00AACB] hover:bg-cyan-600 text-white py-3 text-[14px] md:text-[16px] font-bold rounded uppercase tracking-tighter"
            >
              {game.buttonText}
            </button>
            {game.link && (
              isExternalUrl(game.link) ? (
                <a
                  href={getHref(game.link)}
                  className="flex-1 bg-[#292524] hover:bg-black text-white py-3 text-[14px] md:text-[16px] font-bold rounded text-center uppercase tracking-tighter border border-white/20"
                >
                  LEARN MORE
                </a>
              ) : (
                <Link
                  to={game.link}
                  className="flex-1 bg-[#292524] hover:bg-black text-white py-3 text-[14px] md:text-[16px] font-bold rounded text-center uppercase tracking-tighter border border-white/20"
                >
                  LEARN MORE
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const OtherGames = ({ excludeSlug, showHeading = true, items, filterGameIds }) => {
  const { data, isLoading, error } = useGames();
  const handleBooking = useBooking();
  const apiGames = data?.games || [];

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

  const findMatchedGame = (game) => {
    if (!apiGames.length) return null;
    return apiGames.find((g) => {
      if (game.slug && g.slug && (game.slug === g.slug || game.slug === `/games/${g.slug}` || `/games/${game.slug}` === g.slug)) return true;
      if (game.buttonLink && g.slug && (game.buttonLink === `/games/${g.slug}` || game.buttonLink === g.slug)) return true;
      if (game.gameId && (game.gameId === g._id || game.gameId === g.id)) return true;
      if (game._id && (game._id === g._id || game._id === g.id)) return true;
      if (game.id && (game.id === g._id || game.id === g.id)) return true;
      const titleA = (game.title || game.name || '').trim().toLowerCase();
      const titleB = (g.name || g.title || '').trim().toLowerCase();
      return titleA && titleB && titleA === titleB;
    });
  };

  const formatGame = (game) => {
    const matchedGame = findMatchedGame(game);

    const rawVideo =
      (game.videoUrl && typeof game.videoUrl === 'string' ? game.videoUrl : '') ||
      (matchedGame?.videoUrl && typeof matchedGame.videoUrl === 'string' ? matchedGame.videoUrl : '') ||
      (isVideoUrl(game.mediaUrl) ? game.mediaUrl : '') ||
      (isVideoUrl(game.image) ? game.image : '');

    const rawImage =
      (game.cardImageUrl && typeof game.cardImageUrl === 'string' && !isVideoUrl(game.cardImageUrl) ? game.cardImageUrl : '') ||
      (matchedGame?.cardImageUrl && typeof matchedGame.cardImageUrl === 'string' && !isVideoUrl(matchedGame.cardImageUrl) ? matchedGame.cardImageUrl : '') ||
      (game.imageUrl && typeof game.imageUrl === 'string' && !isVideoUrl(game.imageUrl) ? game.imageUrl : '') ||
      (matchedGame?.imageUrl && typeof matchedGame.imageUrl === 'string' && !isVideoUrl(matchedGame.imageUrl) ? matchedGame.imageUrl : '') ||
      (game.image && typeof game.image === 'string' && !isVideoUrl(game.image) ? game.image : '');

    const videoUrl = rawVideo ? resolveImageUrl(rawVideo) : '';
    const cardImageUrl = rawImage ? resolveImageUrl(rawImage) : '';

    return {
      id: game._id || game.id || matchedGame?._id || matchedGame?.id,
      title: game.title || game.name || matchedGame?.name,
      videoUrl,
      cardImageUrl,
      link: game.buttonLink || (game.slug ? `/games/${game.slug}` : matchedGame?.slug ? `/games/${matchedGame.slug}` : ''),
      buttonText: game.buttonText || 'BOOK NOW',
    };
  };

  let games = [];
  if (items && Array.isArray(items) && items.length > 0) {
    games = items
      .filter((game) => game.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(formatGame);
  } else {
    games = apiGames
      .filter((game) => {
        if (game.isActive === false) return false;
        if (game.slug === excludeSlug) return false;
        if (Array.isArray(filterGameIds) && filterGameIds.length > 0) {
          return filterGameIds.includes(game._id) || filterGameIds.includes(game.id);
        }
        return true;
      })
      .map(formatGame);
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
          <GameCard
            key={game.id || index}
            game={game}
            onBook={handleBooking}
          />
        ))}
      </div>
    </>
  );
};

export default OtherGames;
