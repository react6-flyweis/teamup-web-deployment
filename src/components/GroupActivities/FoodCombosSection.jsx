
import { motion } from 'framer-motion';
import { useFoodCombos } from '../../hooks/useFoodCombos';

// Category icons for combos
import pizza from '../../assets/pizza.svg';
import beer from '../../assets/beer.svg';
import burger from '../../assets/burger.svg';
import glass from '../../assets/glasses.svg';
import pint from '../../assets/pint.svg';

const FoodCombosSection = () => {
  const { data, isLoading, error } = useFoodCombos();

  const slideFromLeft = {
    hidden: { x: '-100vw', opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const combos = (data?.combos || [])
    .filter((combo) => combo.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (combos.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center lg:justify-center items-start gap-4 p-6 mt-12">
      {/* Category Sidebar Column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-black text-[#00AACB] w-full max-w-[280px] lg:w-[280px] h-[450px] p-6 rounded-[40px] flex flex-col justify-between text-[20px] font-semibold overflow-hidden mx-auto lg:mx-0"
        style={{ fontFamily: 'Posterama2001W04' }}
      >
        {[
          { icon: pizza, text: 'PIZZA' },
          { icon: beer, text: 'BEVVIES' },
          { icon: burger, text: 'BURGER' },
          { icon: glass, text: 'WELCOME BEVV!', className: 'ps-2' },
          { icon: pint, text: 'SHOTS!!!' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-3 h-[45px] ${item.className || ''}`}
            variants={slideFromLeft}
            custom={i}
          >
            <img src={item.icon} alt={item.text} className="w-8 h-8 object-contain shrink-0" />
            <span className="truncate">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Dynamic Combo Cards */}
      {combos.map((combo) => {
        const comboItems = [
          combo.pizza,
          combo.bevvies,
          combo.burger,
          combo.welcomeBevy,
          combo.shots,
        ];

        return (
          <div key={combo._id || combo.title} className="flex flex-col items-center w-full max-w-[280px] lg:w-[280px] mx-auto lg:mx-0">
            <h3 style={{ fontFamily: 'Posterama2001W04' }} className="text-black font-bold mt-[18px] md:mt-[-50px] text-center uppercase">
              {combo.title}
            </h3>
            <p style={{ fontFamily: 'Posterama2001W04' }} className="text-black text-sm mb-2 text-center uppercase">
              {combo.subtitle || "HERE’S WHAT’S INCLUDED"}
            </p>
            <div style={{ fontFamily: 'Noir Semi' }} className="bg-black text-[#00AACB] p-6 rounded-[40px] w-full text-center h-[450px] overflow-y-auto">
              <motion.div
                className="flex flex-col justify-between h-full text-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {comboItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={slideFromLeft}
                    custom={idx}
                    className="h-[45px] flex items-center justify-center text-center text-[14px] sm:text-[15px] md:text-[16px] leading-tight overflow-hidden"
                  >
                    {item || '-'}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FoodCombosSection;
