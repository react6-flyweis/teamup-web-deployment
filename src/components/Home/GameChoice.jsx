import React from 'react';
import OtherGames from './OtherGames';

const GameChoice = ({ chooseGameData }) => {
  const title = chooseGameData?.title;
  const subtitle = chooseGameData?.subtitle;

  return (
    <>
      <section className="text-center mt-20 px-4 sm:px-6">
        {title && (
          <h2
            className="font-posterama text-[44px] font-bold text-[#292524] mb-4 uppercase tracking-wide leading-tight"
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="font-noir-pro max-w-6xl mx-auto text-xs sm:text-sm md:text-base text-[#292524] mb-4 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        )}
      </section>

      <OtherGames items={chooseGameData?.items} showHeading={false} />
    </>
  );
};

export default GameChoice;
