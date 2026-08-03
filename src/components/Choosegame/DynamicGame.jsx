import React from 'react'; 
import { useBooking } from '../../hooks/useBooking';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import per from '../../assets/per.svg';
import clock2 from '../../assets/clock2.svg';
import min from '../../assets/min.svg';
import lane from '../../assets/sing.svg';
import { motion } from 'framer-motion';
import Footer from '../Footer';
import dollar from '../../assets/dollar.svg';
import wheel from '../../assets/wheel.svg';
import OtherGames from '../Home/OtherGames';
import { useGame } from '../../hooks/useGames';
import { resolveImageUrl } from '../../hooks/useSiteContent';

const duck = '/assets/dance.svg';
const texture = '/assets/texture.svg';

const DynamicGame = () => {
  const handleBooking = useBooking();
  const { slug } = useParams();
  const { data, isLoading, error } = useGame(slug);

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

  const game = data.game;
  const gameName = game.name || game.gameName || 'Game';
  const heroImage = resolveImageUrl(game.imageUrl || game.image) || duck;
  const headlineText = game.headline || '';
  const durationText = game.duration || game.timeOption || '-';
  const priceText = game.pricePerPerson !== undefined ? `$${game.pricePerPerson}` : '-';
  const minAgeText = game.minimumAgeRequirement || '-';
  const wheelchairText = game.wheelchairAccessible !== undefined ? (game.wheelchairAccessible ? 'Yes' : 'No') : '-';
  const idRequirementText = game.idRequired !== undefined ? (game.idRequired ? 'ID Required' : 'No ID Required') : '';
  const capacityText = game.peopleAllowedPerLane !== undefined ? `${game.peopleAllowedPerLane} People` : '-';
  const lanesText = game.totalLanes !== undefined ? `${game.totalLanes} Lanes` : '-';

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
      <div className="relative md:h-screen w-full overflow-hidden">
        <Navbar />
        <div
          style={{ backgroundImage: `url(${heroImage})` }}
          className="absolute top-12 left-0 w-full h-full bg-cover bg-center object-cover z-0"
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

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

        <div className="flex flex-col md:flex-row justify-center gap-4 p-4 mt-4">
          <motion.div
            className="flex flex-col"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
          >
            <div className="bg-black text-[#00AACB] w-full min-[820px]:w-[280px] p-4 space-y-4">
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
              <div className="border-b border-[#00AACB] mx-2"></div>
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
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
          >
            <div className="bg-black text-[#00AACB] w-full min-[820px]:w-[280px] p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src={clock2} alt="clock" className="w-auto h-[90px] min-[820px]:h-[110px]" />
                <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                  <div className="text-xs min-[820px]:text-sm uppercase">Time</div>
                  <div className="text-lg min-[820px]:text-xl font-bold mb-2">{durationText}</div>
                  <div className="text-xs min-[820px]:text-sm uppercase">Duration</div>
                </div>
              </div>
              <div className="border-b border-[#00AACB]"></div>
              <div className="flex items-center gap-6">
                <img src={dollar} alt="dollar" className="w-auto h-[90px] min-[820px]:h-[105px]" />
                <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                  <div className="text-xs min-[820px]:text-sm uppercase">Price</div>
                  <div className="text-lg min-[820px]:text-xl font-bold mb-2">{priceText}</div>
                  <div className="text-xs min-[820px]:text-sm uppercase">Per Person</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
          >
            <div className="bg-black text-[#00AACB] w-full min-[820px]:w-[280px] p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src={min} alt="group" className="w-auto h-[90px] min-[820px]:h-[110px]" />
                <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                  <div className="text-xs min-[820px]:text-sm uppercase">Minimum Age</div>
                  <div className="text-lg min-[820px]:text-xl font-bold mb-2">{minAgeText}</div>
                  <div className="text-xs min-[820px]:text-sm uppercase">Requirement</div>
                </div>
              </div>
              <div className="border-b border-[#00AACB]"></div>
              <div className="flex items-center gap-3">
                <img src={wheel} alt="wheelchair" className="w-auto h-[90px] min-[820px]:h-[105px]" />
                <div style={{ fontFamily: 'Posterama2001W04' }} className="leading-[1.4]">
                  <div className="text-xs min-[820px]:text-sm uppercase">Wheelchair Access</div>
                  <div className="text-lg min-[820px]:text-xl font-bold mb-2">{wheelchairText}</div>
                  {idRequirementText && (
                    <div className="text-xs min-[820px]:text-sm uppercase">{idRequirementText}</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
