import React from 'react'
import Navbar from '../Navbar'
 import { Link } from 'react-router-dom';
import per from '../../assets/per.svg'
import clock2 from '../../assets/clock2.svg'
import min from '../../assets/min.svg'
import lane from '../../assets/Vector (16).svg'
import { motion } from 'framer-motion';
import Footer from '../Footer'
import dollar from '../../assets/dollar.svg'
import wheel from '../../assets/wheel.svg'
import Blogcards from './Blogcards'
const duck = '/assets/blog.svg'
const texture = '/assets/texture.svg'
const Duckpin = () => {
   
    return (
        <>
   
            <div className="relative w-full overflow-hidden h-dvh min-h-dvh bg-[#121212] flex flex-col">
                <Navbar />

                {/* Hero Body taking up only the remaining space below Navbar */}
                <div className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-center">
                    <div
                        style={{ backgroundImage: `url(${duck})` }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center object-cover z-0"
                    ></div>

                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center py-6 md:py-0 text-center px-4 text-white">
                        <h1 style={{ fontFamily: 'Posterama2001W04' }} className="text-3xl md:text-[64px] font-semibold mb-4">
                            Team up blogs
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
            </div>

   
            <div className="w-full bg-fixed bg-cover bg-center"
                style={{ backgroundImage: `url(${texture})` }}>

                <section className="text-center pt-12 px-4">
                    <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide">
                      Our Blogs
                    </h2>

                    <p style={{ fontFamily: 'Noir Semi' }} className="max-w-5xl mx-auto text-sm md:text-base text-[#292524]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </section>
               <Blogcards/>
            </div>



            <Footer />

        </>
    )
}

export default Duckpin