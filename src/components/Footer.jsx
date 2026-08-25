import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FaLocationDot, FaClock } from 'react-icons/fa6';
import { useState } from 'react';
import bgImage from '../assets/bg.svg';
import symbol from '../assets/Symbol.svg'
import symbol2 from '../assets/Symbol2.svg'
import mail from '../assets/mail.svg'
import chat from '../assets/chat.svg'
import fb from '../assets/facebook (6).svg'
import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';

import mic from '../assets/mic.svg'
const logo = '/assets/logo.svg'
const insta = '/assets/instagram (2).svg'
const avtar = '/assets/avtar.svg'

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: footerSiteContent } = useSiteContent('footer');

    const footerData = footerSiteContent?.content?.data || footerSiteContent?.data;
    const companyInfo = footerData?.companyInfo;
    const socialMediaLinks = footerData?.socialMediaLinks;

    const officeAddress = companyInfo?.officeAddress || '';
    const phoneNumber = companyInfo?.phoneNumber || '';
    const copyrightText = companyInfo?.copyrightText || '';

    const facebookUrl = socialMediaLinks?.facebookUrl || '';
    const instagramUrl = socialMediaLinks?.instagramUrl || '';
    const tiktokUrl = socialMediaLinks?.tiktokUrl || '';

    return (
        <footer
            className="bg-cover bg-center text-white relative overflow-hidden"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Links */}
            <div
                className="font-noir-pro font-bold flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-4 border-b border-[#FFE6D8]/30 border-t py-8 px-6 md:px-12"
            >
                {[
                    { label: 'About Us', to: '/about' },
                    { label: 'Privacy Policy', to: '/privacy' },
                    { label: 'Terms and Conditions', to: '/terms' },
                    // { label: 'Family Source', to: '/family' },
                    { label: 'Waiver', to: '/waiver' },
                    { label: 'Contact Us', to: '/contact' }
                ].map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="hover:underline text-sm md:text-base uppercase tracking-wider transition-all"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>


            {/* Middle Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 py-12 px-6 md:px-12">
                {/* Logo and Address */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
                    <img src={logo} alt="Team Up Logo" className="w-[160px] md:w-[200px] h-auto drop-shadow-lg" />
                    <div className="space-y-4">
                        {officeAddress && (
                            <div>
                                <p className="font-noir font-bold text-white text-sm uppercase tracking-widest opacity-60 mb-1">
                                    Office Address
                                </p>
                                <p className="font-noir font-bold text-[#ABABAB] text-sm md:text-base leading-relaxed">
                                    {officeAddress}
                                </p>
                            </div>
                        )}

                        {phoneNumber && (
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                <p className="font-noir font-bold flex items-center gap-3 text-[#ABABAB] text-sm md:text-base">
                                    <img src={symbol2} className="w-5 h-5 opacity-80" alt="Phone" />
                                    <span className="text-white font-bold">Phone:</span> {phoneNumber}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Optional: Add social or other info here if needed, currently empty to keep it clean */}
            </div>

            {/* Bottom Bar */}
            <div
                className="font-noir font-bold flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-12 py-8 border-t border-[#FFE6D8]/10"
            >
                <p className="text-xs text-[#FFE6D8]/60 text-center md:text-left tracking-wide">
                    {copyrightText}
                </p>

                <div className="hidden md:block flex-1 h-px bg-[#FFE6D8]/10 mx-8" />

                <div className="flex gap-6 text-white text-2xl md:pr-24">
                    {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AACB] transition-colors"><FaFacebookF /></a>}
                    {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1017D] transition-colors"><FaInstagram /></a>}
                    {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AACB] transition-colors"><FaTiktok /></a>}
                </div>
            </div>

            {/* Chat Box */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 w-[90%] sm:w-[360px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden font-sans border border-gray-100">
                    <div
                        style={{
                            background: 'linear-gradient(180.11deg, #E1017D 0.1%, #FFFFFF 85.42%)',
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem',
                        }}
                        className="px-6 pt-6 pb-8 text-white"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="font-posterama text-[18px] sm:text-[20px] font-bold leading-tight"
                            >
                                PHILLIP DOKIDIS <br />
                                <span className="text-xs font-normal opacity-80">(YOUR PERSONAL ASSISTANCE)</span>
                            </div>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <img src={insta} alt="Instagram" className="w-auto h-8 hover:scale-110 transition-transform" />
                            <a href="#" className="text-[#000000] bg-white rounded-full p-2 hover:scale-110 transition-transform shadow-sm"><FaTiktok className="w-5 h-5" /></a>
                            <img src={fb} alt="Facebook" className="w-auto h-8 hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="font-posterama text-xl font-bold text-[#292524] mt-6">HELLO</h2>
                        <p className="font-posterama text-xl font-bold text-[#292524]">HOW CAN WE HELP?</p>
                    </div>

                    <div className="px-6 py-6 bg-white">
                        <div className="flex items-start mb-6">
                            <img src={avtar} alt="Avatar" className="w-8 h-8 rounded-full mr-3 shadow-sm" />
                            <div className="font-noir-semi bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-700 shadow-sm">
                                Welcome to Team-Up. How can I assist you today?
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {["I need help with my order", "I want to know about Team Up"].map((txt, i) => (
                                <button
                                    key={i}
                                    className="px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                >
                                    {txt}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center text-black bg-gray-50 rounded-full px-4 py-3 border border-gray-100">
                            <input
                                type="text"
                                placeholder="Enter your message..."
                                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                            />
                            <button className="hover:scale-110 transition-transform">
                                <img src={mic} alt="Send" className="w-6 h-6 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 bg-[#E1017D] shadow-2xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                    <img src={chat} alt="Chat Icon" className="w-9 h-9" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
