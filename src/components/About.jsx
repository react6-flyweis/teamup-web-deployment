// import { FaGamepad, FaCalendarAlt, FaUtensils, FaPlayCircle } from 'react-icons/fa';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import video from '../assets/video.svg'
import OtherGames from './Home/OtherGames'
import tick from '../assets/tick.svg'
import Footer from './Footer';
import { motion } from "framer-motion";
import { useContentPage } from '../hooks/useContentPage';
import { parseHtmlToReact } from '../utils/htmlParser';

const duck = '/assets/about.svg'
const texture = '/assets/texture.svg'
const about = '/assets/about2.svg'
const map = '/assets/map.svg'
const about2 = '/assets/about3.svg'

const Duckpin = () => {
  const { data, isLoading, isError } = useContentPage('about-us');
  const content = data?.page?.content;

  return (
    <>
{/* ... */}
      <div className="relative md:h-screen w-full overflow-hidden">
        <Navbar />
        <div
          style={{ backgroundImage: `url(${duck})` }}
          className="absolute top-12 left-0 w-full h-full bg-cover bg-center object-cover z-0"
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center md:h-full py-20 text-center px-4 text-white">
          <h1 style={{ fontFamily: 'Posterama2001W04' }} className="text-3xl md:text-[64px] font-semibold mb-4">
            ABOUT US
          </h1>

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


      <div className="w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${texture})` }}>

        <section className="text-center pt-12 px-4">
          <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
            About Team up
          </h2>

          <div style={{ fontFamily: 'Noir Semi' }} className="max-w-5xl mx-auto text-sm md:text-base text-[#292524] break-words overflow-hidden">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? null : content ? (
              parseHtmlToReact(content)
            ) : null}
          </div>
        </section>
        {/* <div className=" py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">


          <div className="relative w-full md:w-1/2 h-[300px] flex items-center justify-center mb-12 mt-4 md:mb-0">

            <motion.img
              src={about2}
              alt="Party 1"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[350px] h-[290px] object-cover shadow-lg absolute top-32 right-4 z-20"
            />

            <motion.img
              src={about}
              alt="Party 2"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="w-[402px] h-[450px] object-cover shadow-lg absolute bottom-1 left-12 z-10"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left py-4">
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-[40px] font-bold text-gray-800 mb-4">PARTY HARD. PLAY HARDER.</h2>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-gray-600 mb-6">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-white mb-6">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-gray-600 mb-6">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <ul style={{ fontFamily: 'Noir Semi' }} className="space-y-3 text-lg">
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2" /> Game & Activity Booking
              </li>
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2" /> Event Booking
              </li>
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2" /> Food & Drinks
              </li>
              <li className="flex items-center justify-center md:justify-start text-pink-600 font-semibold">
                <img src={video} className="mr-2" /> Video Intro <br />About Team-Up
              </li>
            </ul>
          </div>
        </div> */}
        <div className="py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between mt-6">

          <div className="relative w-full md:w-1/2 h-[300px] flex items-center justify-center mb-12 mt-4 md:mb-0">
            <motion.img
              src={about2}
              alt="Party 1"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="w-[250px] sm:w-[300px] md:w-[350px] h-[200px] sm:h-[250px] md:h-[290px] object-cover shadow-lg absolute top-16 sm:top-24 md:top-32 right-2 sm:right-3 md:right-4 z-20"
            />
            <motion.img
              src={about}
              alt="Party 2"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[280px] sm:w-[350px] md:w-[402px] h-[300px] sm:h-[400px] md:h-[450px] object-cover shadow-lg absolute bottom-0 sm:bottom-1 md:bottom-1 left-4 sm:left-8 md:left-12 z-10"
            />
          </div>

          {/* Right - Text Content */}
          <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left py-4">
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-2xl sm:text-3xl md:text-[40px] font-bold text-gray-800 mb-4">PARTY HARD. PLAY HARDER.</h2>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-white mb-6 text-sm sm:text-base md:text-lg sm:block hidden">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <p style={{ fontFamily: 'Noir Semi' }} className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg md:block hidden">
              Gather your crew for unforgettable nights filled with <strong>games</strong>, laughter,
              and next-level party vibes — only at Team UP.
            </p>
            <ul style={{ fontFamily: 'Noir Semi' }} className="space-y-3 text-sm sm:text-base md:text-lg">
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> Game & Activity Booking
              </li>
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> Event Booking
              </li>
              <li className="flex items-center justify-center md:justify-start text-[#006E8C] font-semibold">
                <img src={tick} className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> Food & Drinks
              </li>
              <li className="flex items-center justify-center md:justify-start text-pink-600 font-semibold">
                <img src={video} className="mr-2 w-4 h-4 sm:w-5 sm:h-5 " /> Video Intro <br />About Team-Up
              </li>
            </ul>
          </div>
        </div>
        <section className="text-center mt-24 px-4 sm:px-6">
          <h2
            style={{ fontFamily: 'Posterama2001W04' }}
            className=" text-[44px] font-bold text-[#292524] mb-4 uppercase tracking-wide leading-tight"
          >
            CHOOSE YOUR GAME
          </h2>

          <p
            style={{ fontFamily: 'Noir Pro' }}
            className="max-w-6xl mx-auto text-xs sm:text-sm md:text-base text-[#292524] mb-4 leading-relaxed"
          >
            Ready to elevate your game night?<br />
            Step into The Battleground — where curated chaos meets cutting-edge fun.<br />
            Challenge your circle (or spark something new) with AR Axe Throwing, Immersive Mini Golf, Smart Darts, Craft Beer Pong, Luxe Shuffleboard & more.<br />
            Why wait? Lock in your experience. The night won’t play itself. 🎯✨🍸
          </p>
        </section>

        <OtherGames showHeading={false} />
        <div
          className="relative w-full h-80 bg-cover bg-center mt-8"
          style={{ backgroundImage: `url(${map})` }}
        >
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded p-6 w-[300px]">
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-lg font-bold mb-2">DO YOU HAVE REQUEST?</h2>
            <p style={{ fontFamily: 'Posterama2001W04' }} className="text-sm font-medium mb-1">CALL OR VISIT US.</p>
            <p className="text-orange-500 font-semibold text-lg mb-4">Call: 1800 123 4567</p>

            <p className="text-sm font-semibold">Address:</p>
            <p className="text-sm mb-3">office address: Lorem is simply dummy text</p>

            <p className="text-sm font-semibold">Opening Hours:</p>
            <p className="text-sm">Mon – Fri: 9:00 am – 4:00 pm</p>
          </div>
        </div>

      </div>



      <Footer />

    </>
  )
}

export default Duckpin