import React from 'react'
import Navbar from '../Navbar'
import { motion } from 'framer-motion';
import check from '../../assets/check.svg'
import pro from '../../assets/pro.svg'
import calendar from '../../assets/calender.svg'
import clock from '../../assets/clock.svg'
import OtherGames from '../Home/OtherGames'
import Footer from '../Footer';
const team = '/assets/liveSports.svg';
const duckpin = '/assets/duckpin.svg'
const snooker = '/assets/snooker3.svg'
const darts = '/assets/darts6.svg'
const throws = '/assets/throw.svg';
const karaoke3 = '/assets/karaoke6.svg'
const texture = '/assets/texture.svg'
const Teamup = () => {
    const items = [
        {
            title: 'MULTI-SCREEN EXPERIENCE',
            description: 'Catch all the action with 6 screens and a GIANT 150inch hi res projector.',
        },
        {
            title: 'TABLE RESERVATIONS AVAILABLE',
            description: 'Book a table for your group to secure your spot!',
        },
        {
            title: 'PRIVATE VIEWING OPTION FOR UP TO 15 GUESTS',
            description: 'Book our private room to experience the action in style for upto 15 guests.',
        },

    ];
    return (
        <>
            <div className="relative w-full overflow-hidden h-dvh min-h-dvh bg-[#121212] flex flex-col">
                <Navbar />

                {/* Hero Body taking up only the remaining space below Navbar */}
                <div className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-center">
                    <div
                        style={{ backgroundImage: `url(${team})` }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center object-cover z-0"
                    ></div>

                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center py-6 md:py-0 text-center px-4 text-white">
                        <h1 style={{ fontFamily: 'Posterama2001W04' }} className="text-3xl md:text-[64px] font-semibold mb-4">
                            Live Sport with TEam-Up
                        </h1>
                        <button style={{ fontFamily: 'Posterama2001W04' }} className="text-base bg-[#00AACB] text-white rounded-xl p-4 mt-8 md:text-[26px]">
                            Book Tables
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
            </div>
            <div className="w-full bg-fixed bg-cover bg-center"
                style={{ backgroundImage: `url(${texture})` }}>

                <section className="text-center pt-12 px-4">


                    <p style={{ fontFamily: 'Noir Semi' }} className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]">
                        Whether you’re the quiet technical fan who watches the player’s every  move, the screaming at the TV and your mates, or the ‘I’m only here for  the atmosphere’ with a cocktail in hand fan… there’s no better place to  soak up the vibes and watch live sport.
                    </p>

                    <p style={{ fontFamily: 'Noir Semi' }} className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]">
                        From the F1 to the World Cup, we’re showing it all and we’ve got epic  drinks deals and street food to keep you fuelled too… Be sure to book  your table in plenty of time so we can get the beers chilled and waiting for you.
                    </p>

                </section>
                <div className=" p-4 sm:p-6 space-y-6 max-w-[800px] mx-auto mt-8">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <img src={check} alt="Check" className="w-[40px] h-[40px] mt-4" />
                            <div>
                                <h3 style={{ fontFamily: 'Posterama2001W04' }} className="text-[#292524] font-extrabold text-base sm:text-[42px] leading-tight">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p style={{ fontFamily: 'Noir Pro' }} className="text-[22px] italic text-gray-800 mt-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center md:h-[300px] gap-0.5 px-2 py-6">
                    {/* Left Content */}
                    <div className="w-full md:w-[623px] bg-[#2f2f2f] text-white px-2 py-6 rounded-lg flex flex-col justify-evenly">
                        <div>
                            <h3
                                style={{ fontFamily: 'Posterama2001W04' }}
                                className="text-[28px] md:text-[36px] text-center font-bold mb-3"
                            >
                                WANT TO BOOK A TABLE?
                            </h3>
                            <p
                                style={{ fontFamily: 'Noir Pro' }}
                                className="text-[16px] md:text-[20px] text-center px-4 md:px-12 mb-2 leading-[1.4]"
                            >
                                {/* Online table bookings are for up to{' '}
                                <span className="text-[#FF3366]">12 people*</span>.<br />
                                If your group is more than 12 people,<br /> please contact us for options. Left it last<br /> minute? We’ve been there, first
                                come, first served.<br /> We have a limited number available for walk-ins. */}
                                Online table bookings are for up to 12 people*. If your group is more than 12 people, please <span className="text-[#FF3366]">contact us</span> for options. Left it last minute? We’ve been there. We have a limited  number of first come, first served tables available for walk-ins.

                            </p>
                        </div>
                        <p
                            style={{ fontFamily: 'Noir Pro' }}
                            className="text-[13px] md:text-[15px] px-4 md:px-12 text-center leading-[1.4]"
                        >
                            *Please note, we take credit card details to secure your table booking.<br /> We will charge £10 per person if you don’t
                            turn up or do not<br /> cancel within 24 hours of your booking.
                        </p>
                    </div>

                    {/* Right Form */}
                    <div
                        style={{ fontFamily: 'Noir' }}
                        className="w-full md:w-auto md:h-[325px] bg-[#2f2f2f] text-white px-6 py-8 rounded-lg flex flex-col"
                    >
                        <div className="flex flex-col gap-3 w-full md:w-[400px]">
                            <div className="relative">
                                <input
                                    type="number"
                                    defaultValue="4"
                                    className="w-full h-[40px] bg-white text-black ps-3 text-[14px] rounded pr-10"
                                />
                                <img src={pro} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue="April 19, 2025"
                                    className="w-full h-[40px] bg-white text-black ps-3 text-[14px] rounded pr-10"
                                />
                                <img src={calendar} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue="4:00 PM"
                                    className="w-full h-[40px] bg-white text-black ps-3 text-[14px] rounded pr-10"
                                />
                                <img src={clock} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                            </div>
                        </div>
                        <button
                            style={{ fontFamily: 'Posterama2001W04' }}
                            className="bg-[#00AACB] w-full md:w-[150px] h-[40px] text-[16px] hover:bg-cyan-600 text-black font-bold rounded mt-6 self-center"
                        >
                            RESERVE NOW
                        </button>
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
                        className="max-w-5xl mx-auto text-xs sm:text-sm md:text-base text-[#292524] mb-4 leading-relaxed"
                    >
                        Pucker up Buttercup! Are you ready to FEEL THE BOOM™? Get set for the time of your life,
                        the Battleground has arrived! Battle it out with a mate or a date with our selection of
                        games including Augmented Reality Axe Throwing, American Pool, Augmented Reality Darts,
                        Beer Pong, Shuffleboard & much more! Why are you still reading this? It’s time to get booking.
                    </p>

                    <p
                        style={{ fontFamily: 'Noir Pro' }}
                        className="text-xs sm:text-sm md:text-base leading-snug"
                    >
                        <span style={{ fontFamily: 'Noir' }} className="text-[#E1017D] font-bold">
                            PLEASE NOTE:
                        </span>{' '}
                        We are strictly an over 18’s venue after 9pm.
                    </p>
                </section>
                <OtherGames showHeading={false} />
            </div>
            <Footer />
        </>
    )
}

export default Teamup