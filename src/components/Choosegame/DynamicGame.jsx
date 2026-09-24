import React, { useState, useRef, useEffect } from 'react'; 
import { useBooking } from '../../hooks/useBooking';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import per from '../../assets/per.svg';
import clock2 from '../../assets/clock2.svg';
import lane from '../../assets/sing.svg';
import { motion } from 'framer-motion';
import Footer from '../Footer';
import dollar from '../../assets/dollar.svg';
import OtherGames from '../Home/OtherGames';
import { useGame } from '../../hooks/useGames';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const duck = '/assets/dance.svg';
const texture = '/assets/texture.svg';

const isVideoUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url.trim());
};

const DynamicGame = () => {
  const handleBooking = useBooking();
  const { slug } = useParams();
  const { data, isLoading, error } = useGame(slug);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const game = data?.game;
  const gameName = game?.name || game?.gameName || 'Game';

  const rawVideoUrl = game?.videoUrl?.trim ? game.videoUrl.trim() : (game?.videoUrl || '');
  const rawBgMediaUrl = game?.imageUrl?.trim
    ? game.imageUrl.trim()
    : (game?.imageUrl || game?.image || game?.mediaUrl || '');

  let videoUrl = null;
  let heroImage = duck;

  if (rawVideoUrl) {
    videoUrl = resolveImageUrl(rawVideoUrl);
    heroImage = (rawBgMediaUrl ? resolveImageUrl(rawBgMediaUrl) : null) || duck;
  } else if (rawBgMediaUrl) {
    if (isVideoUrl(rawBgMediaUrl) || game?.bgMediaType === 'video' || game?.mediaType === 'video') {
      videoUrl = resolveImageUrl(rawBgMediaUrl);
      heroImage = duck;
    } else {
      heroImage = resolveImageUrl(rawBgMediaUrl) || duck;
    }
  } else if (game?.video) {
    videoUrl = resolveImageUrl(game.video);
  }

  useEffect(() => {
    setIsVideoPlaying(false);
    setVideoError(false);

    if (videoRef.current && videoUrl) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy may restrict unmuted playback before user gesture
          console.warn('Game video autoplay prevented:', err);
        });
      }
    }
  }, [videoUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || !data || !data.game) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h2 className="text-2xl mb-4 font-bold">Game Not Found</h2>
        <Link to="/" className="bg-[#E1017D] px-6 py-2 rounded-full text-white">
          Back to Home
        </Link>
      </div>
    );
  }

  const headlineText = game.headline || '';

  const isNotEmpty = (val) =>
    val !== undefined &&
    val !== null &&
    String(val).trim() !== '' &&
    String(val).trim() !== '-';

  const hasCapacity = isNotEmpty(game.peopleAllowedPerLane);
  const capacityRaw = hasCapacity ? String(game.peopleAllowedPerLane).trim() : '';
  const capacityText = hasCapacity
    ? (/people|person/i.test(capacityRaw) ? capacityRaw : `${capacityRaw} People`)
    : '';

  const hasLanes = isNotEmpty(game.totalLanes);
  const lanesRaw = hasLanes ? String(game.totalLanes).trim() : '';
  const lanesText = hasLanes
    ? (/lanes?/i.test(lanesRaw) ? lanesRaw : `${lanesRaw} Lanes`)
    : '';

  const rawDuration = isNotEmpty(game.duration)
    ? game.duration
    : isNotEmpty(game.timeOption)
    ? game.timeOption
    : null;
  const hasDuration = Boolean(rawDuration);
  const durationText = hasDuration ? String(rawDuration).trim() : '';

  const hasPrice = isNotEmpty(game.pricePerPerson);
  const priceRaw = hasPrice ? String(game.pricePerPerson).trim() : '';
  const priceText = hasPrice
    ? (priceRaw.startsWith('$') ? priceRaw : `$${priceRaw}`)
    : '';

  const hasCol1 = hasCapacity || hasLanes;
  const hasCol2 = hasDuration || hasPrice;

  const columnVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      <div className="relative md:h-screen w-full overflow-hidden bg-[#121212]">
        <Navbar />

        {/* Fallback & Background Image:
            - Shows immediately while video is buffering/loading
            - Shows as the sole background if no video is provided or if video encounters an error
        */}
        {heroImage && (
          <img
            src={heroImage}
            alt={gameName || "Game Background"}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Background Video:
            - Keeps opacity-0 until onPlaying fires (guaranteeing rendered frames and avoiding gray box)
            - Smoothly fades in once playback is actively running
        */}
        {videoUrl && !videoError && (
          <video
            ref={videoRef}
            key={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onPlaying={() => setIsVideoPlaying(true)}
            onError={() => {
              setVideoError(true);
              setIsVideoPlaying(false);
            }}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 bg-transparent ${
              isVideoPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center md:h-full py-20 text-center px-4 text-white">
          <h1 style={{ fontFamily: 'Posterama2001W04' }} className="text-3xl md:text-[64px] font-semibold mb-4 leading-snug">
            {gameName}
          </h1>
          <button
            onClick={handleBooking}
            style={{ fontFamily: 'Posterama2001W04' }}
            className="text-base bg-[#00AACB] hover:bg-[#E1017D] hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-4 mt-14 md:text-[26px]"
          >
            Book Now
          </button>

          <div className="mt-6 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 md:w-10 md:h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${texture})` }}>
        <section className="text-center pt-12 px-4">
          {headlineText && (
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
              {headlineText}
            </h2>
          )}

          <p style={{ fontFamily: 'Noir Semi' }} className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]">
            {game.description}
          </p>
        </section>

        {(hasCol1 || hasCol2) && (
          <div className="flex flex-col md:flex-row justify-center gap-4 p-4 mt-4">
            {hasCol1 && (
              <motion.div
                className="flex flex-col"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={columnVariants}
              >
                <div className="bg-black text-[#00AACB] w-full min-[820px]:w-[280px] p-4 space-y-4 h-full flex flex-col justify-center">
                  {hasCapacity && (
                    <div className="flex items-center gap-3">
                      <img src={per} alt="user" className="w-auto h-[90px] min-[820px]:h-[110px]" />
                      <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                        <div className="text-xs min-[820px]:text-sm uppercase">Capacity</div>
                        <div className="text-lg min-[820px]:text-xl font-bold mb-2 uppercase">
                          {capacityText}
                        </div>
                        <div className="text-xs min-[820px]:text-sm uppercase">Per Lane</div>
                      </div>
                    </div>
                  )}

                  {hasCapacity && hasLanes && (
                    <div className="border-b border-[#00AACB] mx-2"></div>
                  )}

                  {hasLanes && (
                    <div className="flex items-center gap-3">
                      <img src={lane} alt="lanes" className="w-auto h-[90px] min-[820px]:h-[105px]" />
                      <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                        <div className="text-xs min-[820px]:text-sm uppercase">Lanes</div>
                        <div className="text-lg min-[820px]:text-xl font-bold uppercase">
                          {lanesText}
                        </div>
                        <div className="text-xs min-[820px]:text-sm uppercase">Total Lanes</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {hasCol2 && (
              <motion.div
                className="flex flex-col"
                custom={hasCol1 ? 1 : 0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={columnVariants}
              >
                <div className="bg-black text-[#00AACB] w-full min-[820px]:w-[280px] p-4 space-y-4 h-full flex flex-col justify-center">
                  {hasDuration && (
                    <div className="flex items-center gap-3">
                      <img src={clock2} alt="clock" className="w-auto h-[90px] min-[820px]:h-[110px]" />
                      <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                        <div className="text-xs min-[820px]:text-sm uppercase">Time</div>
                        <div className="text-lg min-[820px]:text-xl font-bold mb-2">{durationText}</div>
                        <div className="text-xs min-[820px]:text-sm uppercase">Duration</div>
                      </div>
                    </div>
                  )}

                  {hasDuration && hasPrice && (
                    <div className="border-b border-[#00AACB]"></div>
                  )}

                  {hasPrice && (
                    <div className="flex items-center gap-6">
                      <img src={dollar} alt="dollar" className="w-auto h-[90px] min-[820px]:h-[105px]" />
                      <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                        <div className="text-xs min-[820px]:text-sm uppercase">Price</div>
                        <div className="text-lg min-[820px]:text-xl font-bold mb-2">{priceText}</div>
                        <div className="text-xs min-[820px]:text-sm uppercase">Per Person</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            style={{ fontFamily: 'Posterama2001W04' }}
            onClick={handleBooking}
            className="bg-[#00AACB] w-[180px] h-[60px] text-[15px] md:text-[17px] hover:bg-[#E1017D] hover:text-white text-white font-bold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            BOOK NOW
          </button>
        </div>

        <OtherGames excludeSlug={slug} />
      </div>

      <Footer />
    </>
  );
};

export default DynamicGame;
