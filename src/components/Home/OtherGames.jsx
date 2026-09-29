import { useGames } from "../../hooks/useGames";
import { useBooking } from "../../hooks/useBooking";
import { resolveImageUrl } from "../../hooks/useSiteContent";
import GameCard from "./GameCard";

const isVideoUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
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

  const normalizeTitle = (title = '') => (title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const findMatchedGame = (game) => {
    if (!apiGames.length) return null;
    const titleA = normalizeTitle(game.title || game.name);
    return apiGames.find((g) => {
      if (game.gameId && (game.gameId === g._id || game.gameId === g.id)) return true;
      if (game.slug && g.slug && (game.slug === g.slug || game.slug === `/games/${g.slug}` || `/games/${game.slug}` === g.slug)) return true;
      if (game.buttonLink && g.slug && (game.buttonLink === `/games/${g.slug}` || game.buttonLink === g.slug)) return true;
      const titleB = normalizeTitle(g.name || g.title);
      if (titleA && titleB && (titleA === titleB || titleA.includes(titleB) || titleB.includes(titleA))) return true;
      return false;
    });
  };

  const formatGame = (game) => {
    const matchedGame = findMatchedGame(game);

    const rawVideo =
      (game.videoUrl && typeof game.videoUrl === 'string' ? game.videoUrl : '') ||
      (isVideoUrl(game.imageUrl) ? game.imageUrl : '') ||
      (isVideoUrl(game.mediaUrl) ? game.mediaUrl : '') ||
      (isVideoUrl(game.image) ? game.image : '') ||
      (matchedGame?.videoUrl && typeof matchedGame.videoUrl === 'string' ? matchedGame.videoUrl : '');

    const rawImage =
      (game.cardImageUrl && typeof game.cardImageUrl === 'string' && !isVideoUrl(game.cardImageUrl) ? game.cardImageUrl : '') ||
      (game.imageUrl && typeof game.imageUrl === 'string' && !isVideoUrl(game.imageUrl) ? game.imageUrl : '') ||
      (game.image && typeof game.image === 'string' && !isVideoUrl(game.image) ? game.image : '') ||
      (matchedGame?.cardImageUrl && typeof matchedGame.cardImageUrl === 'string' && !isVideoUrl(matchedGame.cardImageUrl) ? matchedGame.cardImageUrl : '') ||
      (matchedGame?.imageUrl && typeof matchedGame.imageUrl === 'string' && !isVideoUrl(matchedGame.imageUrl) ? matchedGame.imageUrl : '');

    const videoUrl = rawVideo ? resolveImageUrl(rawVideo) : '';
    const cardImageUrl = rawImage ? resolveImageUrl(rawImage) : '';

    const learnMoreLink =
      game.learnMoreLink ||
      (game.slug ? `/games/${game.slug}` : matchedGame?.slug ? `/games/${matchedGame.slug}` : '');

    return {
      id: game._id || game.id || matchedGame?._id || matchedGame?.id,
      title: game.title || game.name || matchedGame?.name,
      videoUrl,
      imageUrl: cardImageUrl,
      cardImageUrl,
      buttonLink: game.buttonLink || '',
      learnMoreLink,
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
