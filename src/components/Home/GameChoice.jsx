import { useBooking } from '../../hooks/useBooking';
import { resolveImageUrl } from '../../hooks/useSiteContent';
import GameCard from './GameCard';

const isVideoUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};

const formatChooseGame = (item) => {
  // Dedicated videoUrl, or imageUrl if it points to video media
  const rawVideo =
    (item.videoUrl && typeof item.videoUrl === 'string' ? item.videoUrl : '') ||
    (isVideoUrl(item.imageUrl) ? item.imageUrl : '');

  // Fallback / poster image (non-video imageUrl or cardImageUrl)
  const rawImage =
    (!isVideoUrl(item.imageUrl) ? item.imageUrl : '') ||
    (item.cardImageUrl && !isVideoUrl(item.cardImageUrl) ? item.cardImageUrl : '') ||
    (item.image && !isVideoUrl(item.image) ? item.image : '');

  return {
    id: item._id || item.id,
    title: item.title,
    videoUrl: rawVideo ? resolveImageUrl(rawVideo) : '',
    imageUrl: rawImage ? resolveImageUrl(rawImage) : '',
    buttonText: item.buttonText || 'Book',
    buttonLink: item.buttonLink || '',
    learnMoreText: item.learnMoreText || 'LEARN MORE',
    learnMoreLink: item.learnMoreLink || '',
  };
};

const GameChoice = ({ chooseGameData }) => {
  const handleBooking = useBooking();

  const title = chooseGameData?.title;
  const subtitle = chooseGameData?.subtitle;
  const items = chooseGameData?.items || [];

  const displayGames = Array.isArray(items)
    ? items
        .filter((item) => item.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(formatChooseGame)
    : [];

  if (displayGames.length === 0) {
    return null;
  }

  return (
    <>
      <section className="text-center mt-20 px-4 sm:px-6">
        {title && (
          <h2 className="font-posterama text-[44px] font-bold text-[#292524] mb-4 uppercase tracking-wide leading-tight">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="font-noir-pro max-w-6xl mx-auto text-xs sm:text-sm md:text-base text-[#292524] mb-4 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 max-w-screen-xl mx-auto">
        {displayGames.map((game, index) => (
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

export default GameChoice;
