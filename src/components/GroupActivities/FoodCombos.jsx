import React from 'react'
import { useBooking } from '../../hooks/useBooking';
import { motion } from 'framer-motion';
import Navbar from '../Navbar'

// Category icons
import pizza from '../../assets/pizza.svg'
import beer from '../../assets/beer.svg'
import burger from '../../assets/burger.svg'
import glass from '../../assets/glasses.svg'
import pint from '../../assets/pint.svg'
import heart from '../../assets/heart.svg'
import wings from '../../assets/wings.svg'
import burger2 from '../../assets/burger2.svg'
import tube from '../../assets/tube.svg'
import chicken from '../../assets/chicken.svg'
import Footer from '../Footer'


// public url
const texture = '/assets/texture.svg'
const bg = '/assets/bg3.svg'
const arrow = '/assets/arrow2.svg'

import { useMenuCategoryItems } from '../../hooks/useMenuItems';

const FoodCombos = () => {
  const handleBooking = useBooking();
  const { data, isLoading, error } = useMenuCategoryItems();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
        <h2 className="text-2xl mb-4 font-bold">Failed to load street food menu</h2>
        <p className="text-gray-400 mb-6">{error.message || 'Something went wrong.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#E1017D] px-6 py-2 rounded-full text-white font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  const apiItems = data?.items || (Array.isArray(data) ? data : []);

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

  // Static Combos Data (fallback)
  const staticCombos = [
    {
      title: "BOOM COMBO 1",
      items: ["1x Pizza or Burger", "1x Drink", "1x Shot"]
    },
    {
      title: "BOOM COMBO 2",
      items: ["2x Pizzas or Burgers", "2x Drinks", "2x Shots"]
    }
  ];

  // Category to Icon Mapping
  const CATEGORY_ICON_MAP = {
    'street-food': heart,
    'street food': heart,
    'wings-sides': wings,
    'wings & sides': wings,
    'burgers': burger2,
    'burger': burger2,
    'mains': chicken,
    'sides': tube,
    'drinks': pint,
    'beverages': glass,
    'food-combos': pizza,
    'food combos': pizza,
  };

  const getCategoryIcon = (key, index) => {
    if (!key) return iconsList[index % iconsList.length];
    const normalizedKey = key.toString().toLowerCase().trim();
    if (CATEGORY_ICON_MAP[normalizedKey]) {
      return CATEGORY_ICON_MAP[normalizedKey];
    }
    const matchedKey = Object.keys(CATEGORY_ICON_MAP).find(
      (k) => normalizedKey.includes(k) || k.includes(normalizedKey)
    );
    return matchedKey ? CATEGORY_ICON_MAP[matchedKey] : iconsList[index % iconsList.length];
  };

  const combosList = [];
  const nonComboGroupsMap = {};
  const iconsList = [heart, wings, burger2, tube, chicken, arrow];
  let comboCategoryDescription = '';

  apiItems.forEach((apiItem) => {
    const catObj = apiItem.categoryId;
    const catSlug = (typeof catObj === 'object' ? catObj?.slug : (typeof catObj === 'string' ? catObj : '')) || '';
    const catName = (typeof catObj === 'object' ? catObj?.name : '') || '';

    const isCombo = catSlug === 'food-combos' || catName.toLowerCase().includes('combo') || apiItem.slug?.includes('combo');

    if (isCombo) {
      if (typeof catObj === 'object' && catObj?.description && !comboCategoryDescription) {
        comboCategoryDescription = catObj.description;
      }

      let parsedItems = [];
      if (Array.isArray(apiItem.items) && apiItem.items.length > 0) {
        parsedItems = apiItem.items;
      } else if (apiItem.description) {
        parsedItems = apiItem.description
          .split(/(?<=\.)\s+|\n+/)
          .map((s) => s.trim().replace(/\.$/, ''))
          .filter(Boolean);
      }

      combosList.push({
        title: apiItem.name,
        items: parsedItems.length > 0 ? parsedItems : [apiItem.description || apiItem.name],
      });
    } else {
      let groupKey = catName || (apiItem.tags && apiItem.tags.length > 0 && apiItem.tags[0] ? apiItem.tags[0].toString().trim() : 'STREET FOOD');

      const remainingTags = apiItem.tags && apiItem.tags.length > 0
        ? apiItem.tags.join(', ')
        : '';

      const mappedItem = {
        name: apiItem.name,
        tags: remainingTags ? ` (${remainingTags})` : '',
        description: apiItem.description,
        calories: apiItem.calories
      };

      if (!nonComboGroupsMap[groupKey]) {
        nonComboGroupsMap[groupKey] = [];
      }
      nonComboGroupsMap[groupKey].push(mappedItem);
    }
  });

  const categoryDescription = comboCategoryDescription || apiItems[0]?.categoryId?.description || '';

  const dynamicCombos = combosList.length > 0 ? combosList : staticCombos;

  const menuData = Object.keys(nonComboGroupsMap).map((groupTitle, index) => ({
    icon: getCategoryIcon(groupTitle, index),
    iconStyle: "top-[-34px] right-[36px]",
    title: groupTitle.toUpperCase(),
    items: nonComboGroupsMap[groupTitle],
    sizeClass: { width: "w-full", height: "auto" },
    positionStyle: "translate-x-0 translate-y-0",
  }));

  return (
    <>
      <Navbar />

      <div className="w-full bg-fixed bg-cover bg-center pb-8"
        style={{ backgroundImage: `url(${texture})` }}>
        <section className="text-center pt-12 px-4">
          <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
            Our Street Food
          </h2>

          <p style={{ fontFamily: 'Noir Semi' }} className="max-w-5xl mx-auto text-sm md:text-base text-[#292524]">
            {categoryDescription || "Discover our delicious selection of street food items, combos, and sides."}
          </p>
        </section>

        {/* Combo Section UI */}
        <div className="flex flex-wrap justify-center lg:justify-center items-start gap-4 p-6 mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-black text-[#00AACB] w-full max-w-[280px] lg:w-[280px] h-[500px] p-6 rounded-[40px] flex flex-col gap-8 text-[20px] font-semibold overflow-hidden mx-auto lg:mx-0"
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
                className={`flex items-center gap-3 ${item.className || ''}`}
                variants={slideFromLeft}
                custom={i}
              >
                <img src={item.icon} alt={item.text} />
                {item.text}
              </motion.div>
            ))}
          </motion.div>

          {dynamicCombos.map((combo, index) => (
            <div key={index} className="flex flex-col items-center w-full max-w-[280px] lg:w-[280px] mx-auto lg:mx-0">
              <h3 style={{ fontFamily: 'Posterama2001W04' }} className="text-black font-bold mt-[18px] md:mt-[-50px] text-center">
                {combo.title}
              </h3>
              <p style={{ fontFamily: 'Posterama2001W04' }} className="text-black text-sm mb-2 text-center">
                HERE’S WHAT’S INCLUDED
              </p>
              <div style={{ fontFamily: 'Noir Semi' }} className="bg-black text-[#00AACB] p-6 rounded-[40px] w-full text-center h-[500px] overflow-y-auto">
                <motion.ul
                  className="space-y-6 text-[20px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {combo.items.map((item, idx) => (
                    <motion.li key={idx} variants={slideFromLeft} custom={idx}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          ))}
        </div>

        <section className="text-center pt-12 px-4">
          <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
            Explore Our Menu!
          </h2>

          <p style={{ fontFamily: 'Noir Semi' }} className="max-w-5xl mx-auto text-sm md:text-base text-[#292524]">
            Explore our selection of wings, sauces, burgers, sides, and loaded fries.
          </p>
        </section>

        <div className="py-12 px-24 max-sm:py-4 max-sm:px-4 md:py-8 md:px-8 box-border overflow-x-hidden">
          <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mx-auto max-w-[1400px]">
            {menuData.map((card, index) => (
              <div
                key={index}
                className={`relative bg-cover bg-no-repeat bg-center pt-2 px-4 pb-2 custom-drop-shadow w-full max-sm:min-h-[200px] sm:${card.sizeClass.width} sm:${card.sizeClass.height} max-sm:transform-none transform ${card.positionStyle} box-border`}
                style={{ backgroundImage: `url(${bg})` }}
              >
                <img
                  src={card.icon}
                  alt="icon"
                  className={`absolute z-10 ${card.iconStyle} max-sm:w-24 max-sm:top-[10px] max-sm:h-12 max-sm:icon-scaled`}
                />

                <h2
                  style={{ fontFamily: 'Posterama2001W04' }}
                  className="text-[38px] max-sm:text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#292524] ps-10 max-sm:ps-4 sm:ps-8"
                >
                  {card.title}
                </h2>

                <ul className="space-y-1 text-gray-800 pe-4 ps-10 max-sm:ps-4 max-sm:pe-2 sm:ps-8 sm:pe-3">
                  {card.items.map((item, idx) => (
                    <li key={idx}>
                      <p
                        style={{ fontFamily: 'Posterama2001W04' }}
                        className="text-[24px] max-sm:text-[18px] sm:text-[22px] md:text-[24px] font-semibold"
                      >
                        {item.name} <span className="text-[12px] max-sm:text-[10px]">{item.tags}</span>
                      </p>
                      {item.description && (
                        <p
                          style={{ fontFamily: 'Noir Pro' }}
                          className="text-[19px] max-sm:text-[14px] sm:text-[16px] md:text-[18px] text-gray-700 leading-[1.2]"
                        >
                          <span>{item.description}</span>
                          {item.calories && (
                            <span className="text-[12px] max-sm:text-[9px] text-gray-600 ps-1 font-normal whitespace-nowrap">
                              ({item.calories})
                            </span>
                          )}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default FoodCombos