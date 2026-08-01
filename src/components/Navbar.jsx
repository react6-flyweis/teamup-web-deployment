

import React, { useState, useRef } from 'react';

import LocationSelector from './LocationSelector';
import { useBooking } from '../hooks/useBooking';

import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/bg.svg';
import hour from '../assets/Traced Image (1).svg';
import confetti from '../assets/Vector (47).svg';
import crown from '../assets/Vector (48).svg';
import King from '../assets/Vector (49).svg';
import food from '../assets/Vector (50).svg';
import birds from '../assets/date3.svg';
import combo from '../assets/Vector (54).svg';
import fb3 from '../assets/fb3.svg';
import insta2 from '../assets/insta2.svg';
import google from '../assets/google.svg';
import arrow from '../assets/arrow.svg';
// import blaster from '../assets/Traced.svg';
// import golf2 from '../assets/golfd.svg';
// import arcade from '../assets/Vector (46).svg';
// import pool from '../assets/shuffles.svg';
// import live from '../assets/Vector (51).svg';
// import wine from '../assets/Vector (52).svg';
// import glass from '../assets/Vector (53).svg';
// import cart from '../assets/cart.svg';
// import twitter from '../assets/twitter.svg';
// import insta from '../assets/insta.svg';
// import fb from '../assets/fb.svg';
// import link from '../assets/fb.svg';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import drinks_cocktails from '../assets/drinks_cocktails.svg';
import { useMenuCategories } from '../hooks/useMenuItems';

const logo = '/assets/logo.svg';
const baseball = '/assets/ball.svg';
const texture = '/assets/texture.svg';


const Navbar = ({ topBanner }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showOtpModal2, setShowOtpModal2] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const handleBooking = useBooking();

  const { data: categoriesData, isLoading } = useMenuCategories({ search: '', sortBy: 'order', sortOrder: 'asc' });
  const apiCategories = categoriesData?.categories || [];

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setHoveredMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsMobileMenuOpen(false);
    handleBooking();
  };

  const menuItems = apiCategories
    .filter(cat => cat.isActive !== false && cat.isHidden !== true)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .reduce((acc, cat) => {
      const isChooseGame = cat.section === 'choose-game';
      const isGroupActivities = cat.section === 'group-activities';
      const activeSubItems = (cat.subItems || [])
        .filter(sub => sub.isHidden !== true)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(sub => {
          let link = sub.path || '';
          const subSlug = sub.slug || sub.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          const cleanSlug = subSlug ? (subSlug.startsWith('/') ? subSlug.slice(1) : subSlug) : '';

          if (isChooseGame) {
            link = `/games/${cleanSlug}`;
          } else if (isGroupActivities) {
            link = `/activities/${cleanSlug}`;
          }
          return {
            id: sub.id,
            name: sub.name,
            icon: sub.icon,
            link: link,
          };
        });

      const slugPath = '/' + cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

      acc[cat.name] = {
        id: cat.id,
        path: cat.path || (activeSubItems.length === 0 ? slugPath : undefined),
        subItems: activeSubItems
      };
      return acc;
    }, {});

  const handleMenuClick = (menuName) => {
    const menuObj = menuItems[menuName];
    if (menuObj?.path) {
      navigate(menuObj.path);
      setHoveredMenu(null);
      setIsMobileMenuOpen(false);
    } else {
      setHoveredMenu(prev => (prev === menuName ? null : menuName));
    }
  };

  const handleSubItemClick = () => {
    setHoveredMenu(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <>
      <style>
        {`
          @media (min-width: 850px) {
            .mobile-only { display: none; }
            .desktop-only { display: flex; }
          }
          @media (max-width: 849px) {
            .mobile-only { display: block; }
            .desktop-only { display: none; }
          }
        `}
      </style>
      <div ref={navbarRef} className="w-full relative z-50">
        {/* Topbar */}
        <div
          style={{ fontFamily: 'Noir Pro' }}
          className="bg-[#292524] text-white text-[14px] font-normal text-xs px-4 sm:px-12 py-1 flex flex-col sm:flex-row justify-between items-center flex-wrap"
        >
          <div className="mb-1 sm:mb-0 text-center sm:text-left">
          </div>
          <div className="flex items-center gap-4 text-white">
            {/* <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-sm" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTiktok className="text-sm" /></a> */}
            {/* <button
              onClick={() => setIsOpen2(true)}
              className="bg-[#E1017D] px-2 py-1 rounded text-white text-xs"
            >
              Log In
            </button>
            <button
              onClick={() => setIsOpen3(true)}
              className="bg-[#E1017D] px-2 py-1 rounded text-white text-xs"
            >
              Sign Up
            </button> */}
          </div>
        </div>

        {/* Login Modal */}
        {isOpen2 && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-0">
            <div
              style={{ backgroundImage: `url(${texture})` }}
              className="bg-cover bg-center text-center text-black w-full max-w-[600px] max-h-screen sm:h-[600px] p-4 sm:p-6 rounded shadow-lg relative overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen2(false)}
                className="absolute top-3 right-4 text-black text-xl font-bold"
              >
                ✕
              </button>
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-[24px] sm:text-[34px] text-[#292524] font-bold mb-2 mt-16 sm:mt-14"
              >
                WELCOME BACK!
              </h2>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] leading-[1.4] text-[#292524] mb-6"
              >
                Log in to unlock epic games, good vibes, and unforgettable nights at Team UP!
              </p>
              <div style={{ fontFamily: 'Noir Semi' }} className="mb-6 text-left">
                <label className="text-[16px] sm:text-[18px] block mb-2 text-[#292524]">
                  Enter your email address/phone number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none"
                />
              </div>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-sm text-left mb-2 flex items-center gap-3 mb-8"
              >
                <span className="text-[18px] font-semibold text-[#292524]">
                  Log in with social media.
                </span>
                <div className="flex items-center gap-2">
                  <img src={google} alt="Google" className="w-6 h-6 rounded-full" />
                  <img
                    src={insta2}
                    alt="Instagram"
                    className="w-6 h-6 rounded-full bg-white p-1"
                  />
                  <img src={fb3} alt="Facebook" className="w-6 h-6 rounded-full" />
                </div>
              </p>
              <div
                style={{ fontFamily: 'Noir Semi' }}
                className="flex items-start sm:items-center text-left mb-6"
              >
                <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />
                <label className="text-[16px] sm:text-[18px] text-white">
                  I have read and accept the{' '}
                  <span className="font-semibold underline text-[#292524]">
                    Terms and Conditions
                  </span>
                </label>
              </div>
              <button
                onClick={() => {
                  setShowOtpModal(true);
                  setIsOpen2(false);
                }}
                style={{ fontFamily: 'Posterama2001W04' }}
                className="w-full bg-[#E1017D] text-[16px] sm:text-[18px] md:mt-24 text-white py-3 rounded font-semibold"
              >
                NEXT
              </button>
            </div>
          </div>
        )}

        {/* Sign Up Modal */}
        {isOpen3 && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div
              style={{ backgroundImage: `url(${texture})` }}
              className="bg-cover bg-center text-center text-black w-full max-w-[600px] h-[600px] sm:h-auto sm:rounded sm:p-6 p-4 rounded-md shadow-lg relative overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen3(false)}
                className="absolute top-3 right-4 text-black text-xl font-bold"
              >
                ✕
              </button>
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-[28px] sm:text-[34px] text-[#292524] font-bold mb-1 mt-10 sm:mt-8"
              >
                SIGN UP WITH TEAM UP
              </h2>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] mt-4 leading-[1.3] text-[#292524] mb-4"
              >
                Sign up now to book parties, play epic games, and be part of the ultimate nightlife experience at Team UP!
              </p>
              <div style={{ fontFamily: 'Noir Semi' }} className="mt-10 sm:mt-12 mb-4 text-left">
                <label className="text-[16px] sm:text-[18px] block mb-1 text-[#292524]">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none"
                />
              </div>
              <div style={{ fontFamily: 'Noir Semi' }} className="mb-4 text-left">
                <label className="text-[16px] sm:text-[18px] block mb-1 text-[#292524]">
                  Enter your email address/phone number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none"
                />
              </div>
              <div style={{ fontFamily: 'Noir Semi' }} className="mb-4 text-left">
                <label className="text-[16px] sm:text-[18px] block mb-1 text-[#292524]">
                  Enter your date of birth (optional)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none"
                />
              </div>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-left mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <span className="text-[16px] sm:text-[18px] font-semibold text-[#292524]">
                  Sign up with social media.
                </span>
                <div className="flex items-center gap-2">
                  <img src={google} alt="Google" className="w-6 h-6 rounded-full" />
                  <img
                    src={insta2}
                    alt="Instagram"
                    className="w-6 h-6 rounded-full bg-white p-1"
                  />
                  <img src={fb3} alt="Facebook" className="w-6 h-6 rounded-full" />
                </div>
              </p>
              <div
                style={{ fontFamily: 'Noir Semi' }}
                className="flex items-start sm:items-center text-left mb-4 mt-10 sm:mt-14"
              >
                <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />
                <label className="text-[16px] sm:text-[18px] text-white">
                  I have read and accept the{' '}
                  <span className="font-semibold underline text-[#292524]">
                    Terms and Conditions
                  </span>
                </label>
              </div>
              <button
                onClick={() => {
                  setShowOtpModal2(true);
                  setIsOpen3(false);
                }}
                style={{ fontFamily: 'Posterama2001W04' }}
                className="w-full bg-[#E1017D] text-[16px] sm:text-[18px] mt-6 sm:mt-8 text-white py-3 sm:py-4 rounded font-semibold"
              >
                NEXT
              </button>
            </div>
          </div>
        )}

        {/* OTP Modal for Login */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div
              style={{ backgroundImage: `url(${texture})` }}
              className="bg-cover bg-center w-full max-w-[600px] h-auto sm:h-[600px] rounded-lg p-4 sm:p-6 text-center relative"
            >
              <button
                className="absolute top-4 left-4 text-black text-xl font-bold"
                onClick={() => {
                  setShowOtpModal(false);
                  setIsOpen2(true);
                }}
              >
                <img className="w-6 sm:w-8" src={arrow} alt="Back" />
              </button>
              <button
                className="absolute top-4 right-4 text-black text-xl font-bold"
                onClick={() => setShowOtpModal(false)}
              >
                ✕
              </button>
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-[24px] sm:text-[34px] mt-20 sm:mt-24 text-[#292524] font-bold mb-2"
              >
                ENTER ONE TIME PASSWORD
              </h2>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] leading-[1.1] text-[#292524] mb-4 mt-4 sm:mt-6"
              >
                Check your mail messages for a code. Codes requested via EMAIL may take up to a minute to appear.
              </p>
              <div className="flex justify-center gap-2 sm:gap-3 mb-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    className="w-12 h-12 sm:w-20 sm:h-12 text-center border border-gray-300 rounded-lg bg-white text-black text-lg font-bold mt-4"
                    type="text"
                  />
                ))}
              </div>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] mb-4 text-[#292524]"
              >
                Did not receive a code{' '}
                <button className="text-[#292524] font-semibold underline">Send Again</button>
              </p>
              <button
                onClick={() => setShowOtpModal(false)}
                style={{ fontFamily: 'Posterama2001W04' }}
                className="bg-[#E1017D] text-white w-full p-3 sm:p-4 text-[16px] sm:text-[18px] rounded font-semibold mt-8 sm:mt-32"
              >
                LOG IN
              </button>
            </div>
          </div>
        )}

        {/* OTP Modal for Sign Up */}
        {showOtpModal2 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div
              style={{ backgroundImage: `url(${texture})` }}
              className="bg-cover bg-center w-full max-w-[600px] h-auto sm:h-[600px] rounded-lg p-4 sm:p-6 text-center relative"
            >
              <button
                className="absolute top-4 left-4 text-black text-xl font-bold"
                onClick={() => {
                  setShowOtpModal2(false);
                  setIsOpen3(true);
                }}
              >
                <img className="w-6 sm:w-8" src={arrow} alt="Back" />
              </button>
              <button
                className="absolute top-4 right-4 text-black text-xl font-bold"
                onClick={() => setShowOtpModal2(false)}
              >
                ✕
              </button>
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-[24px] sm:text-[34px] mt-20 sm:mt-24 text-[#292524] font-bold mb-2"
              >
                ENTER ONE TIME PASSWORD
              </h2>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] leading-[1.1] text-[#292524] mb-4 mt-4 sm:mt-6"
              >
                Check your mail messages for a code. Codes requested via EMAIL may take up to a minute to appear.
              </p>
              <div className="flex justify-center gap-2 sm:gap-3 mb-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    className="w-12 h-12 sm:w-20 sm:h-12 text-center border border-gray-300 rounded-lg bg-white text-black text-lg font-bold mt-4"
                    type="text"
                  />
                ))}
              </div>
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-[16px] sm:text-[20px] mb-4 text-[#292524]"
              >
                Did not receive a code{' '}
                <button className="text-[#292524] font-semibold underline">Send Again</button>
              </p>
              <button
                onClick={() => setShowOtpModal2(false)}
                style={{ fontFamily: 'Posterama2001W04' }}
                className="bg-[#E1017D] text-white w-full p-3 sm:p-4 text-[16px] sm:text-[18px] rounded font-semibold mt-8 sm:mt-32"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Navbar */}
        <div className="bg-cover bg-center text-white relative" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="relative">
            {/* Main Menu */}
            <div className="mx-auto flex flex-wrap items-center justify-between px-4 sm:px-12 py-3 gap-2 relative z-20">
              {/* Logo */}
              <Link to={'/'} className="flex items-center gap-2 cursor-pointer">
                <img src={logo} alt="Team Up" className="w-32 sm:w-48" />
              </Link>

              {/* Hamburger Icon */}
              <button className="mobile-only text-white focus:outline-none" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>

              {/* Desktop Menu */}
              <div className="desktop-only flex-wrap items-center gap-8 sm:gap-16">
                <LocationSelector />
                <div className="flex flex-wrap items-center gap-4 text-[16px] abyssinica-sil-regular">
                  {isLoading ? (
                    <div className="flex items-center gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-5 w-24 bg-gray-600/50 animate-pulse rounded"></div>
                      ))}
                    </div>
                  ) : (
                    Object.keys(menuItems).map((menu, idx) => {
                      const subItems = menuItems[menu]?.subItems || [];
                      const hasSubMenu = subItems.length > 0;

                      return (
                        <div
                          key={idx}
                          className="relative group flex items-center gap-1 cursor-pointer"
                          onClick={() => handleMenuClick(menu)}
                        >
                          <span
                            className={`transition-colors duration-200 ${hoveredMenu === menu ? 'text-[#E1017D]' : 'text-white'
                              }`}
                          >
                            {menu}
                          </span>
                          {hasSubMenu && (
                            <svg
                              className={`w-4 h-4 transform transition-transform duration-300 ${hoveredMenu === menu ? 'rotate-180 text-[#E1017D]' : 'text-white'
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Desktop Booking Buttons */}
              <div style={{ fontFamily: 'Noir' }} className="desktop-only flex gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBooking();
                  }}
                  className="bg-[#E1017D] hover:bg-pink-600 text-white py-1 w-20 items-center rounded text-xs"
                >
                  BOOK <br />GAMES
                </button>
                <button
                  onClick={() => {
                    handleBooking();
                  }}
                  className="bg-[#00AACB] hover:bg-cyan-500 text-white py-1 w-20 rounded text-xs"
                >
                  BOOK <br />EVENTS
                </button>
              </div>
            </div>

            {/* Desktop Dropdown */}
            {hoveredMenu && !isMobileMenuOpen && (
              <div
                className="desktop-only w-full z-20 pb-4 pt-6 animate-dropdown"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="max-w-screen-xl mx-auto">
                  {menuItems[hoveredMenu]?.subItems?.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-6">
                      {menuItems[hoveredMenu].subItems.map((item, index) => {
                        const content = (
                          <div className="flex flex-col items-center gap-2 text-white hover:bg-gray-700/50 rounded-lg ps-4 pe-4">
                            {item.icon ? (
                              <img src={item.icon} alt={item.name} className="w-full h-[78px] object-contain" />
                            ) : (
                              <div className="w-full h-[78px] bg-gray-700/30 rounded flex items-center justify-center text-xs text-gray-400">
                                No Icon
                              </div>
                            )}
                            <span style={{ fontFamily: 'Noir' }} className="text-[18px] text-center">
                              {item.name}
                            </span>
                          </div>
                        );
                        return item.link ? (
                          <Link to={item.link} key={index} onClick={handleSubItemClick}>
                            {content}
                          </Link>
                        ) : (
                          <div key={index}>{content}</div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="mobile-only bg-black/90 w-full px-4 py-4 relative z-20 animate-mobile-dropdown">
                <div className="flex flex-col gap-4">
                  <LocationSelector isMobile onSelect={() => setIsMobileMenuOpen(false)} />
                  {isLoading ? (
                    <div className="flex flex-col gap-3 py-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-6 w-32 bg-gray-700/50 animate-pulse rounded"></div>
                      ))}
                    </div>
                  ) : (
                    Object.keys(menuItems).map((menu, idx) => {
                      const subItems = menuItems[menu]?.subItems || [];
                      const hasSubMenu = subItems.length > 0;

                      return (
                        <div key={idx} className="flex flex-col">
                          <div
                            className="text-white text-[16px] py-2 cursor-pointer flex items-center justify-between"
                            onClick={() => handleMenuClick(menu)}
                          >
                            <span>{menu}</span>
                            {hasSubMenu && (
                              <svg
                                className={`w-4 h-4 transform transition-transform ${hoveredMenu === menu ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </div>
                          {hoveredMenu === menu && hasSubMenu && (
                            <div className="pl-4 flex flex-col gap-2 animate-mobile-dropdown">
                              {subItems.map((item, index) => (
                                item.link ? (
                                  <Link
                                    to={item.link}
                                    key={index}
                                    className="flex items-center gap-2 text-white hover:text-[#E1017D]"
                                    onClick={handleSubItemClick}
                                  >
                                    {item.icon && <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />}
                                    <span className="text-sm">{item.name}</span>
                                  </Link>
                                ) : (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-white hover:text-[#E1017D]"
                                  >
                                    {item.icon && <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />}
                                    <span className="text-sm">{item.name}</span>
                                  </div>
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                  <div style={{ fontFamily: 'Noir' }} className="flex gap-2">
                    <button
                      className="bg-[#E1017D] hover:bg-pink-600 text-white py-1 w-1/2 rounded text-xs"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleBooking();
                      }}
                    >
                      BOOK GAMES
                    </button>
                    <button
                      className="bg-[#00AACB] hover:bg-cyan-500 text-white py-1 w-1/2 rounded text-xs"
                      onClick={handleClick}
                    >
                      BOOK TABLES
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Top Banner Section */}
            {topBanner?.isActive !== false && topBanner?.text && (
              <div className="w-full py-2 px-4 text-center text-white animated-stripes-container animated-stripes">
                <div className="stripes-content">
                  <Link to="/coming-soon">
                    <span style={{ fontFamily: 'Noir' }} className="text-[16px] sm:text-[18px] uppercase">
                      {topBanner.text}
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;