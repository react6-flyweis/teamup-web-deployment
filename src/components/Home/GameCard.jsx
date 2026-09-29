import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleNavigation, isExternalUrl, getHref } from '../../utils/navigation';

const GameCard = ({ game, onBook }) => {
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const showVideo = Boolean(game.videoUrl) && !videoError;
  const imageSource = game.imageUrl || game.cardImageUrl;

  const handlePrimaryClick = () => {
    if (game.buttonLink && game.buttonLink !== '#' && game.buttonLink !== '') {
      handleNavigation(game.buttonLink, navigate);
    } else if (onBook) {
      onBook();
    }
  };

  const learnMoreLink = game.learnMoreLink || (game.buttonLink ? undefined : game.link);

  return (
    <div className="relative group overflow-hidden rounded-md h-[300px] sm:h-[350px] md:h-[400px] cursor-pointer">
      {showVideo ? (
        <video
          src={game.videoUrl}
          poster={imageSource || undefined}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      ) : imageSource ? (
        <img
          src={imageSource}
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
              onClick={handlePrimaryClick}
              className="flex-1 bg-[#00AACB] hover:bg-cyan-600 text-white py-3 text-[14px] md:text-[16px] font-bold rounded uppercase tracking-tighter"
            >
              {game.buttonText || 'BOOK NOW'}
            </button>
            {learnMoreLink && (
              isExternalUrl(learnMoreLink) ? (
                <a
                  href={getHref(learnMoreLink)}
                  className="flex-1 bg-[#292524] hover:bg-black text-white py-3 text-[14px] md:text-[16px] font-bold rounded text-center uppercase tracking-tighter border border-white/20"
                >
                  {game.learnMoreText || 'LEARN MORE'}
                </a>
              ) : (
                <Link
                  to={learnMoreLink}
                  className="flex-1 bg-[#292524] hover:bg-black text-white py-3 text-[14px] md:text-[16px] font-bold rounded text-center uppercase tracking-tighter border border-white/20"
                >
                  {game.learnMoreText || 'LEARN MORE'}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
